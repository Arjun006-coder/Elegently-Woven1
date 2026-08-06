# ElegantlyWoven — Production Delivery Roadmap

> **Company:** LumaScale | **Product:** ElegantlyWoven  
> **Architecture:** TanStack Start + Supabase + Razorpay + Cloudflare

---

## Phase 1 — Frontend UI ✅ COMPLETE

**Status:** Done — fully working on localhost with placeholder data.

### What was done
- Removed all Lovable branding, files, and dependencies
- Rebranded to ElegantlyWoven by LumaScale
- Clean `vite.config.ts` using native Vite + TanStack plugins
- All 29 pages working: Home, Collections, Product Detail, Cart, Checkout, Payment, Orders, Wishlist, Account
- Complete PostgreSQL schema delivered (`database/schema.sql`)
- No external network calls — fully offline-capable

### Run locally
```bash
npm install
npm run dev   # → http://localhost:3000
```

---

## Phase 2 — Supabase Integration + Authentication

**Goal:** Connect frontend to real Supabase backend. All data flows through Supabase.

### 2.1 Setup
```bash
npm install @supabase/supabase-js @supabase/auth-ui-react @supabase/auth-ui-shared
```

Create `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2.2 Supabase Client
Create `src/lib/supabase.ts`:
```ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

Generate types from your schema:
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts
```

### 2.3 Auth System
**Provider:** Supabase Auth (JWT-based, RS256)

| Feature | Method |
|---|---|
| Email/Password | `supabase.auth.signUp()` + `signInWithPassword()` |
| Google Login | `supabase.auth.signInWithOAuth({ provider: 'google' })` |
| Phone/OTP | `supabase.auth.signInWithOtp({ phone })` |
| Magic Link | `supabase.auth.signInWithOtp({ email })` |
| Password Reset | `supabase.auth.resetPasswordForEmail()` |
| Session Refresh | Auto-handled by Supabase client |

**New routes to build:**
- `/auth` — Login / Sign up / OTP
- `/auth/reset-password` — Password reset
- `/auth/verify` — Email verification callback
- `/account` — Protected dashboard (redirect to `/auth` if not logged in)

### 2.4 Auth Guard
```ts
// src/lib/auth.ts
export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw redirect({ to: '/auth' })
  return session
}
```

Use in route loaders:
```ts
export const Route = createFileRoute('/account')({
  loader: () => requireAuth(),
  component: AccountPage,
})
```

### 2.5 Profile Sync
On first sign-up, create the `profiles` row (trigger in DB already handles this via `auth.users`).

---

## Phase 3 — Real Product Data + Storage

**Goal:** Replace all placeholder images and local `data.ts` with Supabase tables.

### 3.1 Supabase Storage Buckets
Create buckets in Supabase dashboard:
```
product-images/     → public, 10MB limit per file, image/* only
review-images/      → public, 5MB limit
brand-logos/        → public
user-avatars/       → private (RLS: users own their folder)
```

### 3.2 Image Upload Pipeline
```ts
const { data } = await supabase.storage
  .from('product-images')
  .upload(`${productId}/${filename}`, file, {
    contentType: file.type,
    upsert: true,
  })
```

Store the returned URL in `product_images.url`.

### 3.3 CDN Setup
Supabase Storage uses Cloudflare CDN automatically.  
For custom domain: configure `images.elegantlywoven.com` → Supabase Storage endpoint.

### 3.4 Replace data.ts
- Fetch products from `v_active_products` view
- Fetch collections from `collections` table
- Fetch categories from `categories` table
- Use TanStack Query for caching + background refetch

```ts
// src/lib/queries/products.ts
export const useProducts = (categorySlug?: string) =>
  useQuery({
    queryKey: ['products', categorySlug],
    queryFn: () =>
      supabase.from('v_active_products')
        .select('*')
        .eq('category_slug', categorySlug ?? '')
        .limit(24),
    staleTime: 5 * 60 * 1000,
  })
```

### 3.5 Image Optimization
Use Supabase image transform:
```ts
const url = supabase.storage.from('product-images')
  .getPublicUrl(path, {
    transform: { width: 400, height: 600, quality: 80, format: 'webp' }
  }).data.publicUrl
```

---

## Phase 4 — Payment Gateway Integration

**Primary:** Razorpay | **Fallback:** Stripe | **COD:** Native

### 4.1 Install
```bash
npm install razorpay   # backend only
# Frontend uses Razorpay checkout.js (CDN script)
```

### 4.2 Payment Flow
```
1. User clicks "Pay Now"
2. Backend creates Razorpay order → returns { orderId, amount, currency }
3. Frontend opens Razorpay checkout modal
4. User pays → Razorpay sends payment_id + signature to frontend
5. Frontend POSTs to backend /api/payment/verify
6. Backend verifies HMAC signature (never trust frontend)
7. Backend updates orders.payment_status = 'success'
8. Backend triggers inventory deduction + notification
```

### 4.3 Backend API Routes (TanStack Start Server Functions)
```
POST /api/payment/create-order     → Create Razorpay order
POST /api/payment/verify           → Verify HMAC signature
POST /api/payment/webhook          → Razorpay webhook (signed)
POST /api/payment/refund           → Initiate refund
```

### 4.4 Security Rules
- ✅ Verify Razorpay HMAC signature on every payment (`razorpay_signature`)
- ✅ Never expose `key_secret` to frontend
- ✅ Store only `gateway_payment_id` and `card_token` (no raw card data)
- ✅ Idempotency keys on all payment API calls
- ✅ Webhook signature validation with `X-Razorpay-Signature`

### 4.5 Stripe (International Customers)
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

Use Stripe Payment Elements for PCI-DSS compliant card collection.

### 4.6 UPI Deep Links
```ts
const upiLink = `upi://pay?pa=hello@elegantlywoven&pn=ElegantlyWoven&am=${amount}&cu=INR&tn=Order ${orderNumber}`
```

### 4.7 Environment Variables
```env
# Server-side only (never VITE_ prefix)
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Client-side
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

---

## Phase 5 — Security Hardening

**Goal:** Enterprise-grade security. Zero known vulnerabilities.

### 5.1 Application Security
| Threat | Mitigation |
|---|---|
| SQL Injection | Supabase parameterized queries — never raw SQL from client |
| XSS | React's default JSX escaping + CSP headers |
| CSRF | SameSite cookies + CSRF tokens on state-changing requests |
| Clickjacking | `X-Frame-Options: DENY` header |
| MITM | HTTPS-only, HSTS with preload |
| Sensitive data exposure | RLS on all tables, encrypted env vars |
| Mass assignment | Typed Supabase queries, never `*` on sensitive tables |
| Broken auth | JWT expiry 1h, refresh token rotation, session blacklist |

### 5.2 Rate Limiting
Use Cloudflare Workers or Supabase Edge Functions:
```ts
// Per IP: 100 req/min for public routes
// Per user: 10 req/min for cart/order mutations
// Per IP: 5 req/min for /auth routes (brute-force protection)
```

### 5.3 Security Headers (Cloudflare or _headers file)
```
Content-Security-Policy: default-src 'self'; img-src 'self' https://your-project.supabase.co data:; script-src 'self' 'unsafe-inline' https://checkout.razorpay.com
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### 5.4 Error Monitoring
```bash
npm install @sentry/react @sentry/tracing
```

Replace `src/lib/error-reporting.ts` stub with Sentry:
```ts
import * as Sentry from '@sentry/react'
export function reportError(error: unknown, context = {}) {
  Sentry.captureException(error, { extra: context })
}
```

### 5.5 Input Validation
Use Zod on every form + server function:
```ts
const CheckoutSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/),
  pincode: z.string().regex(/^\d{6}$/),
  email: z.string().email(),
})
```

### 5.6 File Upload Security
- Accept only `image/jpeg`, `image/png`, `image/webp`
- Max size: 10MB
- Scan with Supabase Storage policies
- Serve from CDN (never directly from server)

---

## Phase 6 — Performance Optimization

**Goal:** Core Web Vitals all green. LCP < 2.5s, FID < 100ms, CLS < 0.1.

### 6.1 Caching Strategy
| Layer | Tool | TTL |
|---|---|---|
| CDN (static assets) | Cloudflare | 1 year (immutable) |
| CDN (product images) | Cloudflare | 30 days |
| API responses | TanStack Query | 5 min (stale-while-revalidate) |
| Product pages | Cloudflare Cache Rules | 10 min |
| User-specific data | No cache (RLS-protected) | — |

### 6.2 Database Performance
- Use `v_active_products` view — pre-joined, indexed
- Paginate with cursor-based pagination (not OFFSET):
```sql
WHERE created_at < :cursor ORDER BY created_at DESC LIMIT 24
```
- Use `mv_daily_sales` materialized view for admin dashboard
- Schedule: `SELECT refresh_daily_sales()` via Supabase cron (`pg_cron`)

### 6.3 Image Optimization
- Serve WebP via Supabase transform API
- Use `loading="lazy"` on all non-hero images
- Use `srcset` for responsive images
- Preload LCP image (`<link rel="preload">`)

### 6.4 Code Splitting
TanStack Router auto-splits by route. Additionally:
```ts
const ProductGallery = lazy(() => import('./ProductGallery'))
const ReviewSection  = lazy(() => import('./ReviewSection'))
```

### 6.5 Connection Pooling
Use Supabase's built-in PgBouncer (Transaction mode):
```
DIRECT_URL=postgresql://postgres:pass@db.project.supabase.co:5432/postgres
DATABASE_URL=postgresql://postgres:pass@db.project.supabase.co:6543/postgres?pgbouncer=true
```

---

## Phase 7 — Domain, Deployment & Load Balancing

**Goal:** Production deployment with zero-downtime deploys, auto-scaling, and global CDN.

### 7.1 Domain Setup
1. Buy domain: `elegantlywoven.com` (GoDaddy / Namecheap / Google Domains)
2. Move DNS to **Cloudflare** (free plan sufficient)
3. Cloudflare handles: SSL, CDN, DDoS protection, WAF, rate limiting

DNS records:
```
A     @           → Cloudflare Proxy (your server IP)
CNAME www         → elegantlywoven.com (proxied)
CNAME images      → your-project.supabase.co (CDN images)
MX    @           → your email provider
TXT   @           → SPF, DKIM for email deliverability
```

### 7.2 Deployment Options

#### Option A — Cloudflare Pages (Recommended)
```bash
npm run build
# Deploy dist/ to Cloudflare Pages
# Auto-deploys on git push via GitHub integration
```
- Free SSL, global CDN in 200+ cities
- Preview deployments for every PR
- Zero cold starts (edge network)

#### Option B — Railway / Render (if SSR required)
```bash
# railway.toml
[build]
  builder = "NIXPACKS"
  buildCommand = "npm run build"
[deploy]
  startCommand = "npm run preview"
```

#### Option C — VPS (DigitalOcean / Hetzner) + PM2
```bash
npm run build
pm2 start ecosystem.config.js
pm2 save && pm2 startup
```

### 7.3 Load Balancing
- **Cloudflare Load Balancer** (paid): Route traffic across multiple origins
- **Health checks:** Every 60s on `/api/health`
- **Failover:** Automatic if origin fails 3 consecutive checks
- **Geographic routing:** India traffic → Mumbai region; fallback → Singapore

### 7.4 CI/CD Pipeline (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
name: Deploy ElegantlyWoven
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: elegantly-woven
          directory: dist
```

### 7.5 Environment Management
| Environment | Branch | Domain |
|---|---|---|
| Production | `main` | elegantlywoven.com |
| Staging | `staging` | staging.elegantlywoven.com |
| Preview | PR branches | pr-123.elegantlywoven.pages.dev |

### 7.6 Monitoring & Observability
| Tool | Purpose |
|---|---|
| Sentry | Error tracking + performance |
| Cloudflare Analytics | Traffic, CDN, threats |
| Supabase Dashboard | DB performance, slow queries |
| UptimeRobot (free) | Uptime alerts |
| Cloudflare Logpush | Centralized logs → Datadog/Logtail |

### 7.7 Backup Strategy
- Supabase: Daily automated backups (paid plan) + Point-in-time recovery
- Manual: Weekly `pg_dump` to S3-compatible storage

---

## Delivery Timeline (Suggested)

| Week | Milestone |
|---|---|
| Week 1 | ✅ Phase 1 done — frontend on localhost |
| Week 2 | Phase 2 — Supabase connected + auth live |
| Week 3 | Phase 3 — Real products + image uploads |
| Week 4 | Phase 4 — Razorpay payments working |
| Week 5 | Phase 5 — Security audit + hardening |
| Week 6 | Phase 6 — Performance tuning |
| Week 7 | Phase 7 — Domain + deployment + load balancing |
| Week 8 | UAT + client handoff |

---

## Cost Estimate (Monthly)

| Service | Plan | Cost |
|---|---|---|
| Supabase | Pro | $25/mo |
| Cloudflare Pages | Free | $0 |
| Cloudflare Load Balancer | Basic | $5/mo |
| Sentry | Free tier | $0 |
| Domain | Annual | ~₹900/yr |
| Razorpay | 2% per transaction | Variable |
| **Total fixed** | | **~$30/mo** |

---

*Built with ❤️ by LumaScale — elegantlywoven.com*
