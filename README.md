# Job Search System

Production-ready landing + assessment flow that generates a personalized job search plan, email gate, and a $49 Pro Pack upgrade.

## Stack
- Next.js App Router + TypeScript
- TailwindCSS + shadcn-style UI components
- Postgres + Prisma
- Resend (email)
- Stripe Checkout + webhook
- Server-side event tracking

## Setup
1. Install Node.js 20.19+
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file using the template below.
4. Run Prisma migrations and seed data:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```
5. Start the app:
   ```bash
   npm run dev
   ```

## Env vars
```
DATABASE_URL=postgresql://user:pass@localhost:5432/job_search
RESEND_API_KEY=your_resend_key
RESEND_FROM=your-verified-sender@yourdomain.com
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
STRIPE_PRICE_ID=price_123
CLEARBIT_API_KEY=
ADMIN_EMAIL_ALLOWLIST=you@company.com,admin@company.com
APP_SECRET=long_random_string
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_ENABLE_RAPID_REVIEW=false
NEXT_PUBLIC_ENABLE_COACHING_APPLY=false
```

## Webhook testing
Use the Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Then trigger a test checkout session.

## Scripts
- `npm run dev` - dev server
- `npm run build` - production build
- `npm run start` - start server
- `npm run lint` - lint
- `npm run typecheck` - typecheck
- `npm run test` - unit tests
- `npm run prisma:migrate` - apply migrations
- `npm run prisma:seed` - seed local company data

## Notes
- Company autocomplete uses Clearbit if `CLEARBIT_API_KEY` is set; otherwise it falls back to local seed data.
- Results are accessed via a tokenized link; users don't need accounts.
- Admin login uses magic links and an email allowlist.
