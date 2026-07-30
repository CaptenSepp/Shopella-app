create type public.order_status as enum (
  'pending', 'paid', 'processing', 'shipped', 'cancelled', 'refunded'
);

alter table public.orders
  add column status public.order_status not null default 'pending',
  add column payment_intent_id text unique,
  add column receipt_number text unique,
  add column receipt_url text;

create table public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status public.order_status not null,
  note text,
  created_at timestamptz not null default now()
);

create table public.product_inventory (
  product_id integer primary key,
  available integer not null check (available >= 0),
  updated_at timestamptz not null default now()
);

create table public.stripe_webhook_events (
  event_id text primary key,
  processed_at timestamptz not null default now()
);

create index order_history_order_created_index
  on public.order_status_history (order_id, created_at);

alter table public.order_status_history enable row level security;
alter table public.product_inventory enable row level security;
alter table public.stripe_webhook_events enable row level security;
revoke all on table public.order_status_history, public.product_inventory, public.stripe_webhook_events from anon, authenticated;

create or replace function public.create_pending_order(
  order_user_id uuid,
  order_customer_name text,
  order_customer_email text,
  order_shipping_address text,
  order_items jsonb,
  order_subtotal numeric,
  order_shipping numeric,
  order_total numeric
) returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  new_order_id uuid;
  item jsonb;
begin
  for item in select * from jsonb_array_elements(order_items)
  loop
    insert into product_inventory(product_id, available)
      values ((item->>'id')::integer, (item->>'availableStock')::integer)
      on conflict (product_id) do nothing;
  end loop;

  insert into orders(user_id, customer_name, customer_email, shipping_address, items, subtotal, shipping, total)
    values (order_user_id, order_customer_name, order_customer_email, order_shipping_address,
      (select jsonb_agg(value - 'availableStock') from jsonb_array_elements(order_items)),
      order_subtotal, order_shipping, order_total)
    returning id into new_order_id;
  insert into order_status_history(order_id, status, note)
    values (new_order_id, 'pending', 'Order created; awaiting payment');
  return new_order_id;
end;
$$;

create or replace function public.apply_stripe_payment(
  stripe_event_id text,
  order_id uuid,
  payment_intent_id text,
  receipt_url text
) returns boolean
language plpgsql security definer set search_path = public
as $$
declare
  current_order orders%rowtype;
  item jsonb;
begin
  insert into stripe_webhook_events(event_id) values (stripe_event_id)
    on conflict do nothing;
  if not found then return false; end if;

  select * into current_order from orders where id = order_id for update;
  if current_order.status <> 'pending' then return false; end if;

  for item in select * from jsonb_array_elements(current_order.items)
  loop
    update product_inventory
      set available = available - (item->>'quantity')::integer, updated_at = now()
      where product_id = (item->>'id')::integer
        and available >= (item->>'quantity')::integer;
    if not found then raise exception 'Insufficient stock for product %', item->>'id'; end if;
  end loop;

  update orders set
    status = 'paid',
    payment_intent_id = apply_stripe_payment.payment_intent_id,
    receipt_number = 'SHOP-' || upper(substr(replace(order_id::text, '-', ''), 1, 10)),
    receipt_url = apply_stripe_payment.receipt_url
  where id = order_id;
  insert into order_status_history(order_id, status, note)
    values (order_id, 'paid', 'Stripe payment verified');
  return true;
end;
$$;
