# Shopella

Shopella is a portfolio storefront built with React 19, Vite, and TypeScript. It demonstrates a complete shopping journey: catalogue browsing, URL filters, product details, wishlist, cart, authenticated checkout, permanent order history, and a streamed AI shopping assistant.

**Live demo:** `https://your-shopella-project.vercel.app` *(replace after deployment)*

![Shopella home page](./docs/screenshots/home.png)

![Shopella product catalogue](./docs/screenshots/products.png)

## Main features

- Responsive home, catalogue, product gallery, cart, checkout, account, and orders pages
- DummyJSON catalogue data with React Query caching, retries, and abort signals
- Supabase email/password authentication with session restoration
- Protected checkout, account, order history, and confirmation routes
- Server-verified prices, discounts, stock, and authenticated order ownership
- Supabase order persistence with Row Level Security and server-only table access
- Streamed Groq shopping advice using AI SDK v6 and official AI Elements
- Five assistant requests per minute using a hashed client fingerprint
- Keyboard dialogs, focus trapping, skip navigation, reduced motion, and WCAG checks
- Lazy route and AI bundles, lazy below-the-fold images, skeletons, and stable media space

## Architecture

```text
React UI
├─ Redux Toolkit: cart, wishlist, safe mirrored user
├─ React Query: products, order reads, order mutations
└─ Supabase browser client: authentication session
        │ bearer access token
        ▼
Vercel TypeScript functions
├─ /api/orders ── verifies user + DummyJSON products ── Supabase orders
└─ /api/assistant ── validates + rate limits ── Groq GPT-OSS 120B
```

The local Vite development adapter calls the same shared order and assistant handlers as Vercel. The archived Express server remains unchanged as project history and is not part of the active app.

## Project structure

- `src/app` — router, Redux store, React Query client, and theme wiring
- `src/layouts` — shared header, main landmark, footer, and drawers
- `src/features` — feature services, hooks, helpers, pages, and components
- `src/components/ui` — reusable loading, dialog-focus, toast, and assistant UI
- `src/components/ai-elements` — official streamed conversation and message components
- `src/styles` — purpose-specific CSS/BEM files and shared theme tokens
- `api` — Vercel order and assistant functions plus shared server modules
- `supabase/migrations` — orders, rate-limit storage, indexes, checks, and RLS
- `e2e` — authenticated checkout, keyboard, and automated accessibility tests
- `archive` — inactive historical Express backend

## Local setup

Requirements: Node.js 20+, npm, a Supabase project, and a Groq API key.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Fill `.env.local` with:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SECRET_KEY=your_server_secret_key
GROQ_API_KEY=your_groq_key
RATE_LIMIT_SALT=a_long_random_private_value
```

Only variables beginning with `VITE_` are exposed to the browser. Keep the Supabase secret, Groq key, and rate-limit salt only in local/Vercel server environment settings. Never commit `.env.local`.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/migrations/202607190001_shopella_orders.sql`](./supabase/migrations/202607190001_shopella_orders.sql) in the Supabase SQL editor or with the Supabase CLI.
3. For this portfolio flow, disable email confirmation so registration can sign in immediately.
4. Add the browser and server environment values shown above.

The browser cannot read or write the `orders` or `assistant_requests` tables directly. Vercel verifies the access token and uses the server secret for scoped reads and writes.

## API contracts

### `GET /api/orders`

Requires `Authorization: Bearer <Supabase access token>` and returns only the authenticated user's orders.

### `POST /api/orders`

Requires the same token and accepts:

```json
{
  "items": [{ "id": 1, "quantity": 2 }],
  "customer": { "name": "Jane Doe", "address": "123 Main Street" }
}
```

The server fetches canonical product information before checking stock and calculating totals. Browser-supplied titles, prices, discounts, stock, and email are not trusted.

### `POST /api/assistant`

Accepts AI SDK `UIMessage[]` and returns a streamed UI message response. It uses the latest 10 messages, limits each text message to 800 characters, caps output, and provides catalogue-grounded advice only. It cannot add products, place orders, or complete purchases.

## Commands

```bash
npm run dev       # local Vite app and API adapter
npm run typecheck # TypeScript check
npm run lint      # ESLint
npm test          # Vitest unit/component tests with coverage
npm run test:e2e  # Playwright checkout and accessibility flows
npm run build     # production build
npm run preview   # preview the production build
```

Playwright needs a browser once per machine:

```bash
npx playwright install chromium
```

## AI-assisted development disclosure

This project was upgraded with AI assistance for architecture review, code generation, validation rules, tests, accessibility checks, and documentation. The developer selected the scope, reviewed the code, provided the product direction, and remains responsible for understanding, testing, and maintaining the result. This is meant to demonstrate responsible AI-assisted development—not to claim that every line was written manually.

## Honest project boundaries

- Product names, images, prices, and stock come from DummyJSON and are demonstration data.
- Checkout confirms a portfolio order; there is no payment processor or real fulfilment.
- Email confirmation is intentionally disabled for immediate portfolio registration.
- AI advice may be incomplete or imperfect and should not be treated as professional advice.
- The rate limiter needs the Supabase migration and server credentials to work across Vercel instances.
- A custom domain, newsletter provider, and separate active Express server are outside this project.
