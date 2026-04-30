# Askia Coach

Spec-aligned MVP rebuild for an AI career coach with:

- authentication and onboarding
- dashboard, saved sessions, and action plans
- live coaching room with realtime/avatar provider hooks
- resume and LinkedIn review workspaces
- mock interview setup and recap flows
- Stripe-backed subscription billing, admin support tooling, and token-usage tracking

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Prisma + Postgres
- OpenAI-ready realtime and document service abstractions
- Avatar provider adapter layer prepared for Tavus-style integrations

## Current State

The old assessment funnel has been retired from the primary app surface. Legacy `job-search-system` routes now redirect into the rebuilt coaching product.

The current implementation provides:

- the full MVP information architecture from the build spec
- spec-shaped API routes for dashboard, sessions, uploads, reviews, and provider session setup
- a new Prisma schema aligned to users, coach profiles, sessions, documents, reviews, memories, action plans, usage events, and feedback
- stubbed provider/session logic so real integrations can be wired without changing the app shape again

## Setup

1. Install dependencies
```bash
npm install
```
2. Configure environment variables
```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/askia_coach
DIRECT_URL=postgresql://user:pass@localhost:5432/askia_coach
NEXT_PUBLIC_BASE_URL=http://localhost:3000
APP_SECRET=replace_me
OPENAI_API_KEY=replace_me
OPENAI_MODEL=gpt-4o-mini
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_MONTHLY=price_...
STRIPE_TRIAL_DAYS=7
COACH_ADMIN_PASSWORD=replace_me
COACH_ADMIN_EMAIL_ALLOWLIST=ops@example.com,founder@example.com
COACH_SUPPORT_EMAIL_ALLOWLIST=support@example.com
COACH_ADMIN_BETA_AUTO_LOGIN=ops@example.com
PLAN_TOKEN_LIMIT_FREE=150000
PLAN_TOKEN_LIMIT_PRO=3000000
PLAN_TOKEN_LIMIT_PREMIUM=10000000
PLAN_TOKEN_LIMIT_TEAM=15000000
PLAN_AMOUNT_PRO_CENTS=1900
PLAN_AMOUNT_PREMIUM_CENTS=9900
PLAN_AMOUNT_TEAM_CENTS=19900
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
TAVUS_API_KEY=
POSTHOG_KEY=
SENTRY_DSN=
```
3. Generate the Prisma client
```bash
npm run prisma:generate
```
4. Start the app
```bash
npm run dev
```

## Billing And Admin

- Stripe is the source of truth for subscriptions and payment status.
- Monthly checkout runs through `/api/billing/checkout`.
- Stripe webhook sync runs through `/api/stripe/webhook` and verifies the Stripe signature before processing.
- Paid app access is granted only for `active` and `trialing` subscriptions.
- Paid app access is blocked for `past_due`, `unpaid`, `canceled`, and `incomplete_expired`.
- AI token usage is tracked per account and per user in `AiTokenUsage`, then compared against the current plan allowance.
- Internal support/admin tooling lives at `/coach-admin`.
- Beta shortcut: set `COACH_ADMIN_BETA_AUTO_LOGIN=you@example.com` and `/coach-admin` will auto-create and auto-sign-in that admin account.

## Important Notes

- The repo still contains legacy code outside the rebuilt surfaces. Some old modules and generated artifacts still fail repo-wide linting.
- `npm run typecheck` currently passes after the rebuild.
- Stripe retry behavior should be configured in the Stripe Dashboard under Billing → Revenue recovery → Retries.
