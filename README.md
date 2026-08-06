# ElegantlyWoven

> **Premium Women's Fashion Platform** — Built by [LumaScale](https://lumascale.in)

ElegantlyWoven is a production-grade, enterprise-ready e-commerce platform for women's fashion. It supports the full lifecycle of a modern fashion storefront: browsing, discovery, cart, checkout, payments, order tracking, reviews, wishlists, and admin management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (React + SSR) |
| Routing | TanStack Router (file-based) |
| Styling | Tailwind CSS v4 + Radix UI |
| State | React Context + TanStack Query |
| Database | PostgreSQL via Supabase |
| Auth | Supabase Auth (JWT + RLS) |
| Payments | Razorpay + Stripe |
| Storage | Supabase Storage (CDN-backed) |
| Deployment | Cloudflare Pages + Workers |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Lint
npm run lint
```

---

## Project Structure

```
src/
├── assets/          # Static images
├── components/
│   ├── layout/      # Header, Footer, SearchDialog, SiteLayout
│   ├── shop/        # ProductCard, CollectionView, QuickView
│   └── ui/          # Radix-based design system components
├── hooks/           # Custom React hooks
├── lib/
│   ├── data.ts      # Local placeholder data (replaced by Supabase in Phase 2)
│   ├── error-reporting.ts  # Generic error capture (wire to Sentry in Phase 5)
│   ├── store.tsx    # Cart / Wishlist / Theme context
│   └── utils.ts     # Utility helpers
├── routes/          # TanStack Router file-based routes (29 pages)
│   ├── __root.tsx   # Root shell + SEO + providers
│   ├── index.tsx    # Home page
│   ├── product.$id.tsx  # Product detail page
│   ├── cart.tsx     # Cart
│   ├── checkout.tsx # Checkout
│   ├── payment.tsx  # Payment gateway page
│   └── ...          # All other category/collection pages
├── server.ts        # SSR server entry (Nitro/h3)
└── start.ts         # TanStack Start entry

database/
└── schema.sql       # Complete Supabase PostgreSQL schema (paste & run in Supabase SQL editor)

ROADMAP.md           # Phased delivery plan (Phase 2–7)
```

---

## Database Setup

See [`database/schema.sql`](./database/schema.sql) for the complete PostgreSQL schema.

To set up your Supabase project:

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor**
3. Paste the entire contents of `database/schema.sql`
4. Click **Run**

The schema creates all 60+ tables, indexes, triggers, RLS policies, functions, views, and seed data.

---

## Delivery Roadmap

| Phase | Description | Status |
|---|---|---|
| 1 | Frontend UI (current) — fully working on localhost | ✅ Done |
| 2 | Supabase integration + Auth system | 🔜 Next |
| 3 | Real product data + Supabase Storage | 🔜 |
| 4 | Payment gateway (Razorpay + Stripe) | 🔜 |
| 5 | Security hardening (rate limiting, WAF, OWASP) | 🔜 |
| 6 | Performance (Redis, CDN, image optimization) | 🔜 |
| 7 | Domain, deployment, load balancing (Cloudflare) | 🔜 |

See [`ROADMAP.md`](./ROADMAP.md) for full details.

---

## Environment Variables

Create a `.env` file (never commit it):

```env
# Supabase (Phase 2)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Razorpay (Phase 4)
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx

# Stripe (Phase 4)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# App
VITE_APP_URL=https://elegantlywoven.com
VITE_APP_NAME=ElegantlyWoven
```

---

## Security Notes

- All payment data is stored as **gateway tokens only** — no raw card numbers ever
- Row Level Security (RLS) is enabled on every Supabase table
- JWT validation is enforced server-side
- See `database/schema.sql` for all RLS policies

---

## License

Proprietary — © 2026 ElegantlyWoven by LumaScale. All rights reserved.
