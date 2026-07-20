create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_email text not null,
  shipping_address text not null,
  items jsonb not null check (jsonb_typeof(items) = 'array'),
  subtotal numeric(12, 2) not null check (subtotal >= 0),
  shipping numeric(12, 2) not null check (shipping >= 0),
  total numeric(12, 2) not null check (total >= 0)
);

create index if not exists orders_user_created_index
  on public.orders (user_id, created_at desc);

alter table public.orders enable row level security;

-- No public policies are added: only the verified server function uses the secret key.
revoke all on table public.orders from anon, authenticated;

create table if not exists public.assistant_requests (
  id bigint generated always as identity primary key,
  fingerprint text not null,
  created_at timestamptz not null default now()
);

create index if not exists assistant_requests_fingerprint_created_index
  on public.assistant_requests (fingerprint, created_at desc);

alter table public.assistant_requests enable row level security;
revoke all on table public.assistant_requests from anon, authenticated;
