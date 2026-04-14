# Askia Coach

Spec-aligned MVP rebuild for an AI career coach with:

- authentication and onboarding
- dashboard, saved sessions, and action plans
- live coaching room with realtime/avatar provider hooks
- resume and LinkedIn review workspaces
- mock interview setup and recap flows
- privacy, retention, and usage-limit foundations

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

## Important Notes

- The repo still contains legacy code outside the rebuilt surfaces. Some old modules and generated artifacts still fail repo-wide linting.
- `npm run typecheck` currently passes after the rebuild.
- The next major step is wiring real auth, storage, realtime, review generation, and persistence into the new MVP endpoints.
