# Zari — Release Backlog
**Generated from:** Production QA Audit · 2026-05-19  
**Codebase:** `/Users/stevengoumnai/Desktop/Repositories/job-search-system`  
**Stack:** Next.js 15 · TypeScript · Prisma 6.9 · PostgreSQL (Neon) · Stripe 20 · Resend · Netlify · Zoho CRM

> **Status legend:**  
> `FIXED` — resolved in commit `18f02eb` (2026-05-20)  
> `OPEN` — not yet implemented  

---

## 1. P0 — Launch Blockers

All five P0 tickets have been resolved. They are documented here in full for regression testing and audit trail purposes.

---

### TICKET-001 — Unauthenticated `/api/coach/chat` exposes full user PII
**Status:** FIXED (`18f02eb`)  
**Priority:** P0  
**Severity:** Critical  
**Area:** AI Coach / Authentication  

**User impact:** Any actor with network access could retrieve another user's full resume, LinkedIn profile, AI insights, and career assessment data by sending a POST with a known `assessmentId`.

**Business impact:** Immediate GDPR/CCPA liability. One public disclosure voids trust and likely triggers regulatory notification requirements. A breach of this endpoint leaks every user's private career data.

**Current behavior (before fix):** `POST /api/coach/chat` with any `assessmentId` returns the assessment owner's resume, LinkedIn, and AI data to the caller regardless of whether the caller is logged in.

**Expected behavior:** Returns `401 Unauthorized` for any caller who does not have a valid `zari_session` cookie. The session must be validated against the `AppSession` table; legacy bare-userId cookies must be accepted for backwards compatibility but cannot bypass DB validation when the DB is available.

**Steps to reproduce (before fix):**
1. Create user A and complete their assessment.
2. Note the `assessmentId` from user A's dashboard URL.
3. In a fresh browser session (not logged in), open DevTools and run:
   ```js
   fetch('/api/coach/chat', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json', 'Origin': window.location.origin },
     body: JSON.stringify({ assessmentId: '<user_A_id>', message: 'summarize my resume' })
   }).then(r => r.json()).then(console.log)
   ```
4. Observe: full AI response using user A's private data is returned.

**Fix approach:** Import `getCurrentUserId` from `@/lib/mvp/auth` and call it at the top of the POST handler. Return `401` if it returns `null`.

**File:** `src/app/api/coach/chat/route.ts`

**Acceptance criteria:**
- [ ] Unauthenticated POST returns `{ error: "Unauthorized" }` with status `401`
- [ ] Authenticated POST (valid `zari_session` cookie) returns AI response as before
- [ ] Session-expired users get `401`, not `500`

**Recommended test coverage:**
- Unit test: mock `getCurrentUserId` returning `null` → expect 401
- Unit test: mock `getCurrentUserId` returning a userId → expect normal 200 path
- Integration test: call without cookie → 401; call with valid cookie → 200

**Retest steps:**
1. `curl -X POST /api/coach/chat -H 'Origin: https://app.zaricoach.com' -d '{"assessmentId":"any","message":"test"}'` → must return 401
2. Log in, capture `zari_session` cookie, repeat with `-H 'Cookie: zari_session=...'` → must return 200 with AI message

**Definition of done:** Endpoint returns 401 for all unauthenticated callers regardless of `assessmentId` value. Existing authenticated users see no change in behaviour. Tests pass.

---

### TICKET-002 — `APP_SECRET` falls back to well-known value — sessions forgeable
**Status:** FIXED (`18f02eb`)  
**Priority:** P0  
**Severity:** Critical  
**Area:** Authentication / Session Management  

**User impact:** Any user who knows the value `"local-dev-secret"` (publicly visible in source code) can forge a valid signed session cookie and impersonate any other user.

**Business impact:** Full account takeover of any user. Attacker can access billing, change subscription, view all coaching data, and send messages as that user.

**Current behavior (before fix):** `getSecret()` in `auth.ts`, `coach-admin-auth.ts`, and `mvp/auth.ts` returns `process.env.APP_SECRET || "local-dev-secret"`. If `APP_SECRET` is not set in the Netlify environment, `"local-dev-secret"` is silently used to sign all HMAC session tokens.

**Expected behavior:** If `process.env.APP_SECRET` is not set and `NODE_ENV === "production"`, throw an error at first use rather than silently degrading. In non-production, the fallback is acceptable.

**Steps to reproduce (before fix):**
1. Confirm `APP_SECRET` is absent from the Netlify environment.
2. Sign a session payload with the key `"local-dev-secret"` using the same HMAC-SHA256 algorithm in `signSession()`.
3. Set that token as the `admin_session` or `zari_session` cookie.
4. Access any authenticated route — request succeeds as the target user.

**Fix approach:** Update `getSecret()` in all three auth files to: `if (!secret && process.env.NODE_ENV === "production") throw new Error("APP_SECRET required")`.

**Files:** `src/lib/auth.ts`, `src/lib/coach-admin-auth.ts`, `src/lib/mvp/auth.ts`

**Acceptance criteria:**
- [ ] In production with `APP_SECRET` set: all auth flows work normally
- [ ] In production without `APP_SECRET`: first authenticated request throws and returns 500 (not a forged-session 200)
- [ ] In development without `APP_SECRET`: falls back to `"local-dev-secret"` with no error

**Recommended test coverage:**
- Unit test: mock `NODE_ENV=production`, unset `APP_SECRET`, call `getSecret()` → expect thrown Error
- Unit test: mock `NODE_ENV=production`, set `APP_SECRET`, call `getSecret()` → returns secret
- Unit test: mock `NODE_ENV=development`, unset `APP_SECRET` → returns `"local-dev-secret"`

**Retest steps:**
1. Deploy to staging with `APP_SECRET` unset. Attempt to log in → server logs show thrown error, client gets 500 (not a usable session).
2. Set `APP_SECRET` in staging → login succeeds, session is valid.

**Definition of done:** No deployment can silently use the fallback secret in production. Error is thrown and logged immediately on first use, not silently accepted.

---

### TICKET-003 — Hardcoded `sk_test_123` Stripe key in production source
**Status:** FIXED (`18f02eb`)  
**Priority:** P0  
**Severity:** Critical  
**Area:** Billing / Stripe Integration  

**User impact:** None directly. Risk is to platform integrity: hardcoded test key signals poor secret hygiene and could mislead future maintainers into thinking this is the real key.

**Business impact:** `sk_test_123` is committed to source control and visible to anyone with repo access. Stripe's production webhooks were verified using a module-level instance of `new Stripe("sk_test_123")` — meaning if STRIPE_SECRET_KEY was ever unset in production, the Stripe client would silently use this non-functional key rather than failing loudly. Additionally, the key is visible in any code audit, security scan, or repo leak.

**Current behavior (before fix):** `src/lib/stripe-webhook.ts` line 3: `const stripe = new Stripe("sk_test_123")`.

**Expected behavior:** The Stripe client used for webhook verification reads its key from `process.env.STRIPE_SECRET_KEY`. Since `webhooks.constructEvent` is a pure HMAC operation (no API call), the key is only needed to satisfy the constructor.

**Steps to reproduce:** `grep -r "sk_test" src/` returns results in production source.

**Fix approach:** Replace the module-level `new Stripe("sk_test_123")` with `new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder")` inside `verifyStripeSignature`. The placeholder is recognisable as non-real and acceptable because `constructEvent` never makes an API call.

**File:** `src/lib/stripe-webhook.ts`

**Acceptance criteria:**
- [ ] `grep -r "sk_test_123" src/lib/` returns zero results
- [ ] `stripe-webhook.test.ts` still passes (test file uses its own `sk_test_123` instance which is acceptable)
- [ ] In production with valid `STRIPE_SECRET_KEY`, webhook verification works

**Recommended test coverage:**
- Existing test verifies signature verification still works

**Retest steps:** `grep -r "sk_test_123" src/` → zero results. Run `npm test` → all pass.

**Definition of done:** No hardcoded Stripe key in any production source file. Secret management via env var only.

---

### TICKET-004 — Timing-vulnerable password comparison in coach admin auth
**Status:** FIXED (`18f02eb`)  
**Priority:** P0  
**Severity:** High  
**Area:** Coach Admin / Authentication  

**User impact:** An attacker timing responses to login attempts could byte-by-byte determine the `COACH_ADMIN_PASSWORD` value, enabling brute-force login to the coach admin panel.

**Business impact:** Coach admin panel has full access to all user accounts, subscription management, billing controls, and mass email broadcast. A compromised admin password gives full platform control.

**Current behavior (before fix):** `verifyCoachAdminPassword` in `coach-admin-auth.ts`: `return Boolean(expected) && password === expected`. The `===` operator returns early on the first mismatched character, leaking timing information about the password length and prefix.

**Expected behavior:** Comparison uses `crypto.timingSafeEqual(Buffer.from(input), Buffer.from(expected))` which takes constant time regardless of where the mismatch occurs.

**File:** `src/lib/coach-admin-auth.ts`

**Steps to reproduce:** Measure response time for `/api/coach-admin/login` with progressively longer matching prefixes. With enough samples, the timing difference between "correct length wrong char" vs "wrong length entirely" reveals the password.

**Fix approach:** Replace `password === expected` with `crypto.timingSafeEqual`. Handle length mismatch by comparing equal-length buffers (comparing different-length buffers throws; return false early for mismatched lengths after checking that `expected` is set).

**Acceptance criteria:**
- [ ] `verifyCoachAdminPassword("wrong")` returns false
- [ ] `verifyCoachAdminPassword("correct_password")` returns true when env var matches
- [ ] No `===` string comparison on secret values
- [ ] `timingSafeEqual` is used with equal-length buffers

**Recommended test coverage:**
- Unit test: correct password → true
- Unit test: wrong password → false
- Unit test: empty `COACH_ADMIN_PASSWORD` env var → false

**Retest steps:** Code review: `grep -n "=== expected\|== expected" src/lib/coach-admin-auth.ts` → zero results.

**Definition of done:** All secret comparisons in the auth layer use constant-time comparison.

---

### TICKET-005 — Cleanup cron never runs — expired sessions accumulate forever
**Status:** FIXED (`18f02eb`)  
**Priority:** P0  
**Severity:** High  
**Area:** Infrastructure / Data Management  

**User impact:** Expired `AppSession` rows and used `PasswordResetToken` rows accumulate without bound. At scale this degrades DB query performance for session lookup and can inflate storage costs.

**Business impact:** Without cleanup, the `AppSession` table will grow indefinitely. On Neon's free tier, table bloat could hit storage limits and disable the database entirely.

**Current behavior (before fix):** `POST /api/cron/cleanup` exists and works, but there is no Netlify scheduled function to call it. The cleanup never runs.

**Expected behavior:** A Netlify scheduled function (`cron-cleanup.mts`) calls `/api/cron/cleanup` daily at 3am UTC, authenticated with `CRON_SECRET`.

**Fix approach:** Create `netlify/functions/cron-cleanup.mts` with `schedule: "0 3 * * *"` that POSTs to `${URL}/api/cron/cleanup` with `Authorization: Bearer ${CRON_SECRET}`. Fail loudly (log and return) if either env var is absent.

**Acceptance criteria:**
- [ ] `netlify/functions/cron-cleanup.mts` exists and is valid Netlify function syntax
- [ ] Schedule is `"0 3 * * *"` (3am UTC daily)
- [ ] Calls the cleanup endpoint with the correct auth header
- [ ] Logs result including deleted counts

**Recommended test coverage:** Manual trigger test via Netlify CLI (`netlify functions:invoke cron-cleanup`) in staging.

**Retest steps:**
1. Set `CRON_SECRET` and `URL` in staging env.
2. Invoke `netlify functions:invoke cron-cleanup --no-identity` → should log `status=200` and `deleted.expiredSessions` count.
3. Wait 24h or manually trigger — confirm `AppSession` expired rows are gone.

**Definition of done:** Netlify dashboard shows `cron-cleanup` function in the scheduled functions list. Manual invocation deletes expired rows successfully.

---

## 2. P1 — Pre-Launch Required Fixes

### TICKET-006 — `accounts` Prisma relation doesn't exist on User — video review credit never applied
**Status:** FIXED (`18f02eb`)  
**Priority:** P1  
**Severity:** High  
**Area:** Coach Admin / Billing  

**User impact:** When a coach admin approves a video review, the Stripe subscription extension silently fails because `user.accounts` is undefined (the correct relation is `user.ownedAccounts`). Users never receive their free month credit.

**Business impact:** Broken promise to users who submitted video testimonials. Also breaks the video review incentive program entirely.

**Current behavior (before fix):** `prisma.user.findUnique({ select: { accounts: { ... } } })` — Prisma accepts this because `prisma` is exported as `any` in `db.ts`. At runtime, `user.accounts` is `undefined`, so `subscription` is `undefined`, and the Stripe subscription update is silently skipped.

**Expected behavior:** `user.ownedAccounts[0].subscription` resolves correctly to the user's subscription and the trial extension is applied.

**File:** `src/app/api/coach-admin/video-reviews/route.ts` (lines 47, 50)

**Steps to reproduce:**
1. Create a video review record in the DB for a paid user.
2. POST `{ reviewId, action: "approve" }` to `/api/coach-admin/video-reviews` as an admin.
3. Observe: response is `{ ok: true }` but the Stripe subscription `trial_end` is not extended.

**Fix approach:** Change `accounts` to `ownedAccounts` in both the `select` clause and the result access (`user?.ownedAccounts?.[0]?.subscription`).

**Acceptance criteria:**
- [ ] Approving a video review for a user with an active Stripe subscription calls `stripe.subscriptions.update` with `trial_end: now + 30 days`
- [ ] User receives the confirmation email
- [ ] `videoReview.creditGranted` is set to `true`

**Recommended test coverage:**
- Integration test: mock Prisma and Stripe; approve review → verify `stripe.subscriptions.update` is called with correct `trial_end`
- Integration test: user without subscription → approve → `stripe.subscriptions.update` not called, review still marked approved

**Retest steps:**
1. Approve a video review for a test user with an active subscription.
2. Check Stripe dashboard — subscription trial end should be 30 days from now.
3. Check the user's email — should receive confirmation.

**Definition of done:** Stripe trial extension fires correctly on approval. No `undefined` access in the subscription path.

---

### TICKET-007 — `RouteContext` type used but undefined in 3 coach-admin routes
**Status:** OPEN  
**Priority:** P1  
**Severity:** Medium  
**Area:** Coach Admin / TypeScript  

**User impact:** No runtime impact currently. Routes function correctly because TypeScript infers `RouteContext` as `any`, but type safety on path parameters is completely absent.

**Business impact:** Any future refactor touching these route signatures will not get TypeScript errors if `params` is misused, leading to silent runtime failures.

**Current behavior:** Three route files use `{ params }: RouteContext<"...">` as the second argument type. `RouteContext` is not imported from anywhere and is not defined in the project. TypeScript silently widens it to `any`.

**Expected behavior:** These routes use the standard Next.js 15 App Router pattern: `{ params }: { params: Promise<{ ticketId: string }> }` (or `accountId`, etc.) with `const { ticketId } = await params`.

**Files:**
- `src/app/api/coach-admin/accounts/[accountId]/notes/route.ts:8`
- `src/app/api/coach-admin/tickets/[ticketId]/route.ts:10`
- `src/app/api/coach-admin/tickets/[ticketId]/notes/route.ts:8`

**Steps to reproduce:** `grep -r "RouteContext" src/` returns results; running `tsc --strict --noEmit` fails on these files.

**Fix approach:** In each file, replace `RouteContext<"...">` with the inline type `{ params: Promise<{ accountId: string }> }` (substituting the correct param name). Await the params before destructuring: `const { accountId } = await params`.

**Acceptance criteria:**
- [ ] `grep -r "RouteContext" src/` returns zero results
- [ ] `tsc --noEmit` passes with no type errors on these files
- [ ] The routes still function correctly at runtime (params resolve to the correct path segment values)

**Recommended test coverage:**
- Spot-check: call `GET /api/coach-admin/accounts/[real-id]/notes` in staging → returns notes for that account
- Spot-check: call `GET /api/coach-admin/tickets/[real-id]` → returns ticket

**Retest steps:**
1. Run `tsc --noEmit` → zero errors on the three files.
2. In staging, navigate to a ticket detail or account notes page in the coach admin UI — data loads correctly.

**Definition of done:** All three files use the correct Next.js 15 `params: Promise<{...}>` type. TypeScript strict mode passes. No `RouteContext` references remain.

---

### TICKET-008 — Weekly digest MRR delta hardcoded at $39 per subscriber
**Status:** OPEN  
**Priority:** P1  
**Severity:** High  
**Area:** Cron / Analytics  

**User impact:** None directly.

**Business impact:** The weekly digest email sent to the founder shows an incorrect MRR delta. For any Growth ($89) or Executive ($179) subscriber, the previous-week MRR calculation uses $39/subscriber regardless of actual plan. This makes the delta metric unreliable for business decisions.

**Current behavior:** `const mrrLastWeek = prevActiveSubs * 39`. This multiplies the count of all pre-existing active subscriptions by a flat $39, regardless of plan.

**Expected behavior:** Previous-week MRR is calculated using the same `planPrices` lookup applied to current MRR — by querying `planName` for subscriptions active before last week and summing their actual prices.

**File:** `src/app/api/cron/digest/route.ts` (lines 101–103)

**Steps to reproduce:**
1. Create one Search ($39) and one Executive ($179) subscriber more than 7 days ago.
2. Trigger the weekly digest.
3. Observe: `mrrLastWeek = 2 * 39 = $78`. Actual previous MRR was $218. Delta is wrong by $140.

**Fix approach:** Replace the flat `count × 39` with a proper query:
```typescript
const prevActiveSubs = await prisma.subscription.findMany({
  where: { status: "active", createdAt: { lt: weekAgo } },
  select: { planName: true },
});
const mrrLastWeek = prevActiveSubs.reduce((sum, s) => {
  const planKey = Object.keys(planPrices).find(k => s.planName?.includes(k));
  return sum + (planKey ? planPrices[planKey] : 39);
}, 0);
```

**Acceptance criteria:**
- [ ] `mrrLastWeek` for a mix of Search + Growth + Executive subscribers matches the sum of their actual plan prices
- [ ] `mrrDelta` is correct for all plan combinations
- [ ] No hardcoded `* 39` multiplier in the previous-week MRR calculation

**Recommended test coverage:**
- Unit test: mock subscriptions with mixed plans from before `weekAgo`; verify `mrrLastWeek` equals the sum of correct plan prices

**Retest steps:**
1. Seed staging with known subscribers (1 Search, 1 Growth, 1 Executive) all created > 7 days ago.
2. Trigger digest. Verify `mrrLastWeek = 39 + 89 + 179 = $307` and `mrrDelta = currentMrr - 307`.

**Definition of done:** MRR delta in weekly digest is accurate for all plan tiers. Hardcoded `* 39` is removed.

---

### TICKET-009 — `ensureSameOrigin` bypassed when `Origin` header is absent
**Status:** FIXED (`18f02eb`)  
**Priority:** P1  
**Severity:** High  
**Area:** Security / API  

**User impact:** CSRF protection on all routes guarded by `ensureSameOrigin` is nullified for any caller that omits the `Origin` header — including curl, server-side scripts, and Postman.

**Business impact:** All routes using `ensureSameOrigin` (coach chat, video reviews, and others) are reachable cross-origin without any CSRF guard, relying solely on session authentication.

**Current behavior (before fix):** `if (!origin || !host) return true` — absent `Origin` silently passes the check.

**Expected behavior:** Absent `Origin` is rejected for state-changing methods (POST, PUT, PATCH, DELETE). Safe methods (GET, HEAD, OPTIONS) are allowed through because CSRF for read-only operations is low-risk and many server-side callers omit `Origin` on GET.

**File:** `src/lib/utils.ts`

**Fix approach:** Replace the early-return with method-aware logic:
```typescript
if (!origin) return request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS";
```

**Acceptance criteria:**
- [ ] `curl -X POST /api/coach/chat` without `Origin` header → 403
- [ ] Browser POST with matching `Origin` header → proceeds to auth layer
- [ ] Browser POST with mismatched `Origin` header → 403
- [ ] GET requests without `Origin` continue to work (admin panel data fetches)

**Recommended test coverage:**
- Unit test: `ensureSameOrigin` with absent Origin on POST → returns false
- Unit test: `ensureSameOrigin` with absent Origin on GET → returns true
- Unit test: matching origin → returns true
- Unit test: mismatched origin → returns false

**Retest steps:**
```bash
curl -X POST https://staging.zaricoach.com/api/coach/chat \
  -H 'Content-Type: application/json' \
  -d '{"assessmentId":"x","message":"test"}' 
# Must return 403

curl -X POST https://staging.zaricoach.com/api/coach/chat \
  -H 'Origin: https://staging.zaricoach.com' \
  -H 'Content-Type: application/json' \
  -d '{"assessmentId":"x","message":"test"}'
# Must return 401 (unauthenticated, but past the CSRF check)
```

**Definition of done:** All state-changing routes return 403 for `Origin`-absent requests. Read routes unaffected.

---

### TICKET-010 — Annual upsell email states incorrect savings ($84 instead of $69)
**Status:** FIXED (`18f02eb`)  
**Priority:** P1  
**Severity:** Medium  
**Area:** Email / Billing Messaging  

**User impact:** Users told they'll save $84 by switching to annual; actual savings at $399/year vs $468/year monthly is $69. When they complete checkout, the receipt shows a different amount.

**Business impact:** Potential misrepresentation of pricing. Could cause chargebacks if users feel misled. Also a compliance risk in jurisdictions requiring accurate advertised prices.

**Current behavior (before fix):** `annualMonthlyPrice: 32` → savings = `(39 - 32) * 12 = $84`. The Search annual plan is $399/year ($33.25/month equivalent, not $32).

**Expected behavior:** `annualMonthlyPrice: 33.25` → savings = `(39 - 33.25) * 12 = $69`. Annual total = `$33.25 × 12 = $399`.

**Files:** `src/lib/email-sequences/index.ts`, `src/app/api/email/preview/route.ts`

**Acceptance criteria:**
- [ ] Email subject line reads "Save $69" not "Save $84"
- [ ] In-email savings callout shows "$69"
- [ ] "Per year" line shows "$399"
- [ ] Preview route renders same corrected values

**Retest steps:**
1. `GET /api/email/preview?id=annual_upsell` in development → confirm "Save $69" and "$399" appear in the rendered HTML.
2. Trigger the `annual_upsell` sequence in staging for a test user → verify email content.

**Definition of done:** Email savings matches the actual pricing catalog at $399/year. No reference to $84 or $32/month in this email.

---

### TICKET-011 — `/api/email/preview` is accessible in production
**Status:** FIXED (`18f02eb`)  
**Priority:** P1  
**Severity:** Medium  
**Area:** Email / Infrastructure  

**User impact:** Internal tool exposure. Anyone who knows the URL can preview all application email templates, including content that reveals product roadmap, messaging strategy, and customer segmentation logic.

**Business impact:** Competitive intelligence leak; also renders any email with placeholder data (e.g., `firstName: "Alex"`) which could confuse users who discover it.

**Current behavior (before fix):** `GET /api/email/preview?id=*` is publicly accessible in all environments.

**Expected behavior:** Returns 404 in any environment other than `development`.

**File:** `src/app/api/email/preview/route.ts`

**Fix approach:** At the top of the `GET` handler: `if (process.env.NODE_ENV !== "development") return NextResponse.json({ error: "Not found" }, { status: 404 })`.

**Acceptance criteria:**
- [ ] In production/staging: `GET /api/email/preview` returns 404
- [ ] In development: `GET /api/email/preview` renders the email list and individual previews as before

**Retest steps:** `curl https://app.zaricoach.com/api/email/preview` → 404.

**Definition of done:** No email template content is accessible in production.

---

### TICKET-012 — `prisma` exported as `any` — all Prisma type safety disabled app-wide
**Status:** OPEN  
**Priority:** P1  
**Severity:** High  
**Area:** Data Access / TypeScript  

**User impact:** No direct runtime impact today, but this is the root cause that allowed BUG-006 (`accounts` vs `ownedAccounts`) and BUG-008 (wrong digest fields) to compile and deploy without TypeScript errors.

**Business impact:** Any future Prisma schema change that renames a field, adds a required parameter, or changes a return type will not produce a compile-time error. Bugs will only appear at runtime in production.

**Current behavior:** `src/lib/db.ts` line 28: `export const prisma = prismaClient as any`. The comment explains this was done because legacy routes reference retired models.

**Expected behavior:** `prisma` is exported with its full Prisma type: `export const prisma: PrismaClient = prismaClient`. Legacy routes that reference retired models should be updated to not use `prisma` for those models (use raw SQL or delete the dead code).

**File:** `src/lib/db.ts`

**Steps to reproduce:** Write `prisma.user.nonExistentField` anywhere in the codebase → TypeScript does not error.

**Fix approach:**
1. Remove the `as any` cast: `export const prisma = prismaClient`.
2. Run `tsc --noEmit` to surface all type errors caused by retired model references.
3. For each failing reference: either delete the dead route, replace with a working query, or comment it out with a `// TODO: remove` marker.
4. Keep iterating until `tsc --noEmit` passes cleanly.

**Acceptance criteria:**
- [ ] `export const prisma = prismaClient` with no `as any`
- [ ] `tsc --noEmit` passes with zero errors
- [ ] All existing tests continue to pass
- [ ] No runtime errors on existing routes (test full app in staging after this change)

**Recommended test coverage:**
- Full `tsc --noEmit` as part of CI
- Run all existing Vitest tests after type restoration

**Retest steps:**
1. `grep "prisma as any" src/lib/db.ts` → zero results
2. `tsc --noEmit` → zero errors
3. Full staging smoke test of every route that touches Prisma

**Definition of done:** Prisma is fully typed throughout the application. TypeScript will catch wrong field names, missing required arguments, and schema changes at compile time. CI enforces `tsc --noEmit` on every push.

---

### TICKET-013 — Newsletter cron sends to admin/support accounts
**Status:** FIXED (`18f02eb`)  
**Priority:** P1  
**Severity:** Low  
**Area:** Email / Cron  

**User impact:** Internal team members (admin, support role) receive the monthly newsletter intended for customers. Minor annoyance; also pollutes suppression list if they unsubscribe.

**Business impact:** Inaccurate send counts; admin accounts receiving user-facing emails looks unprofessional.

**Current behavior (before fix):** `prisma.user.findMany({ select: { email, firstName } })` — fetches all users regardless of role.

**Expected behavior:** `prisma.user.findMany({ where: { role: "member" }, ... })` — only targets paying/trial/free member-role users.

**Acceptance criteria:**
- [ ] Newsletter is sent only to users with `role = "member"`
- [ ] Admin and support accounts are excluded from the recipient list
- [ ] Suppression list check still applies to the filtered list

**Retest steps:** Check the Resend broadcast dashboard after the next newsletter send. Verify no `@zaricoach.com` or founder email addresses in the recipient list.

**Definition of done:** Role filter applied. Internal accounts never receive customer-facing email broadcasts.

---

### TICKET-024 — `COACH_ADMIN_BETA_AUTO_LOGIN` bypasses coach admin auth in production
**Status:** FIXED (`18f02eb`)  
**Priority:** P1  
**Severity:** Critical  
**Area:** Coach Admin / Authentication  

**User impact:** If this env var is present in production (e.g., copied from a staging config), any visitor to `/coach-admin` gets full admin access without any password prompt.

**Business impact:** Unrestricted access to all user accounts, billing controls, subscription management, and mass email broadcast. Complete platform compromise.

**Current behavior (before fix):** `getCoachAdminBetaAutoLoginConfig()` reads the env var and returns an auto-login config regardless of `NODE_ENV`.

**Expected behavior:** Function returns `null` immediately when `NODE_ENV === "production"`.

**File:** `src/lib/coach-admin-auth.ts`

**Acceptance criteria:**
- [ ] In production: `getCoachAdminBetaAutoLoginConfig()` always returns `null`
- [ ] In development: function works as before when var is set
- [ ] `/coach-admin` in production always requires password, even if `COACH_ADMIN_BETA_AUTO_LOGIN` is set

**Retest steps:**
1. Deploy to staging with `COACH_ADMIN_BETA_AUTO_LOGIN=true` in env.
2. Visit `/coach-admin` → should NOT auto-login; must prompt for password.

**Definition of done:** Production deployments cannot be trivially bypassed by env var. Auto-login is development-only.

---

## 3. P2 — Accepted Post-Launch Improvements

These bugs are real but do not block the initial launch. They should be scheduled into the first post-launch sprint.

---

### TICKET-014 — NPS submission endpoint has no rate limiting
**Status:** OPEN  
**Priority:** P2  
**Severity:** Medium  
**Area:** NPS / Data Integrity  

**User impact:** NPS scores can be artificially manipulated by automated submissions. Founder sees meaningless NPS data in the weekly digest.

**Business impact:** Poisoned NPS dataset undermines a core business metric used for product decisions.

**Current behavior:** `POST /api/nps` accepts unlimited submissions with no rate limiting. The `email` field is accepted from the request body without verifying it matches the session user.

**Expected behavior:** Rate-limited to 1 NPS submission per authenticated user per 30 days. If the user is logged in, the email must match their session. If unauthenticated, rate-limit by IP (5 per hour per IP).

**File:** `src/app/api/nps/route.ts`

**Steps to reproduce:**
```bash
for i in {1..100}; do
  curl -X POST /api/nps -d '{"score":10,"email":"fake@example.com"}' -H 'Content-Type: application/json'
done
# All 100 succeed
```

**Fix approach:**
1. Import `rateLimit` from `@/lib/rate-limit`.
2. For authenticated users: check `getCurrentUserId()` and validate email matches.
3. Apply `rateLimit("nps:" + (userId || ip), 1, 86400000 * 30)` before processing.

**Acceptance criteria:**
- [ ] Authenticated user can submit NPS once per 30 days
- [ ] Second submission within 30 days returns 429
- [ ] Unauthenticated IP limited to 5 per hour
- [ ] Email in request body validated against session user when authenticated

**Recommended test coverage:**
- Unit test: first submission → 200; second submission same user → 429
- Unit test: unauthenticated rate limit triggers after 5 attempts

**Retest steps:** Submit NPS twice as the same user within 30 days → second returns 429.

**Definition of done:** NPS dataset is protected from automated manipulation. Rate limiting applies to both authenticated and unauthenticated paths.

---

### TICKET-015 — Google OAuth `state` parameter is unsigned — weak CSRF protection
**Status:** OPEN  
**Priority:** P2  
**Severity:** Medium  
**Area:** Authentication / Security  

**User impact:** OAuth CSRF attacks are theoretically possible: an attacker could initiate an OAuth flow and inject their own state parameter into a victim's session.

**Business impact:** Account linkage hijacking possible in targeted scenarios. Low exploitability but zero cost to fix.

**Current behavior:** `state = base64url(JSON{ nonce, mode, next, redirectUri })`. The nonce is random per request but the state blob is not signed, so any party can construct a syntactically valid state blob.

**Expected behavior:** `state = base64url(payload) + "." + HMAC(APP_SECRET, base64url(payload))`. Callback handler verifies the HMAC before trusting `next`, `mode`, or `redirectUri` from the state.

**File:** `src/app/api/auth/google/start/route.ts` (state generation), `src/app/api/auth/google/callback/route.ts` (state verification)

**Fix approach:**
1. In `start/route.ts`: after building the state JSON, append `.` + `HMAC-SHA256(APP_SECRET, base64urlPayload)`.
2. In `callback/route.ts`: split the state at the last `.`, verify HMAC before parsing the payload.

**Acceptance criteria:**
- [ ] State parameter includes an HMAC suffix
- [ ] Callback rejects state with invalid/missing HMAC with a 400 error
- [ ] Callback accepts state with correct HMAC and proceeds normally
- [ ] Google OAuth login flow works end-to-end after this change

**Recommended test coverage:**
- Unit test: valid state HMAC → accepted
- Unit test: tampered state → rejected with 400
- E2E test: full Google OAuth signup flow succeeds

**Retest steps:** Manually test Google OAuth login in staging — should complete successfully. Manually construct a state blob without a valid HMAC, submit to callback → 400.

**Definition of done:** OAuth state is cryptographically bound to `APP_SECRET`. Forged state parameters are rejected before any payload is trusted.

---

### TICKET-016 — In-memory rate limit fallback is not globally shared across serverless instances
**Status:** OPEN  
**Priority:** P2  
**Severity:** Medium  
**Area:** Security / Infrastructure  

**User impact:** Auth endpoints (signup, login, forgot-password, reset-password) may receive more than the stated rate-limit attempts if Upstash Redis is not configured, because each Netlify function container has an independent in-memory store.

**Business impact:** Brute-force protection on auth flows is silently non-functional unless Upstash is configured. Without Redis, concurrent requests across containers bypass the limit.

**Current behavior:** `src/lib/rate-limit.ts` falls back to an in-memory `Map` when `UPSTASH_REDIS_REST_URL` or `UPSTASH_REDIS_REST_TOKEN` are absent. In serverless, this map is per-container.

**Expected behavior:** Production must use the Upstash Redis backend. If Upstash is not reachable at startup in production, the app should fail with a clear error rather than silently falling back to a non-functional in-memory store.

**File:** `src/lib/rate-limit.ts`

**Fix approach:**
1. Add a startup check (or first-request check): if `NODE_ENV === "production"` and Upstash env vars are absent, throw.
2. Document in `DEPLOYMENT.md` that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are required production env vars.
3. Verify Upstash env vars are set in the Netlify environment dashboard.

**Acceptance criteria:**
- [ ] `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set in Netlify production env
- [ ] Rate limiting on auth endpoints verified by triggering the limit and receiving 429 responses
- [ ] In development without Upstash: in-memory fallback still works (no change)

**Retest steps:**
1. Remove Upstash vars from staging → first auth request should throw/500 in production mode.
2. Re-add vars → rate limiting verified by sending 10+ rapid requests to `/api/auth/login` → 429 after limit.

**Definition of done:** Rate limiting is globally enforced in production via Upstash Redis. Configuration error is caught at startup, not silently at runtime.

---

### TICKET-017 — Plan tier DB enum conflates Search and Growth subscribers
**Status:** OPEN  
**Priority:** P2  
**Severity:** Medium  
**Area:** Billing / Data Model  

**User impact:** Any feature gate that reads `planTier` from the DB to determine access will treat Search ($39) and Growth ($89) subscribers identically, potentially granting wrong entitlements.

**Business impact:** Entitlement bugs that grant Growth features to Search subscribers (revenue loss) or deny Growth features to Growth subscribers (support tickets, churn).

**Current behavior:** The `PlanTier` DB enum is `free | pro | premium | team`. `mapStripePlanTier()` maps both `"search"` and `"growth"` plan names to `"pro"`. When feature gates query `planTier = "pro"`, they cannot distinguish between Search and Growth.

**Expected behavior:** Either: (A) the DB enum is expanded to `free | search | growth | executive` with a migration, OR (B) all feature gate logic reads from `planName` (raw Stripe plan name) instead of the coerced `planTier`, and this is enforced consistently.

**Files:** `src/lib/subscription-sync.ts`, `prisma/schema.prisma`, `src/lib/plan-entitlements.ts`

**Fix approach (recommended Option B for minimal migration risk):**
1. Audit all places in the codebase that read `planTier` to gate features.
2. Replace each with a check against `planName` using `plan-entitlements.ts` helper functions.
3. Deprecate direct `planTier` reads for feature gating.
4. Document the mapping in a `PLAN_TIERS.md` or code comment.

**Acceptance criteria:**
- [ ] Feature gates use `planName`-based entitlement helpers, not raw `planTier` DB column
- [ ] A Search subscriber cannot access Growth-only features
- [ ] A Growth subscriber has all Growth features available
- [ ] No regression in existing entitlement checks

**Recommended test coverage:**
- Unit test: entitlement check with Search planName → cannot access Growth feature
- Unit test: entitlement check with Growth planName → can access Growth feature

**Retest steps:** Create test accounts for each plan tier; verify feature access matches the pricing page for each tier.

**Definition of done:** Feature entitlements are unambiguously mapped to plan names, not the coerced enum. No two plan tiers share the same entitlement level unless intentionally equivalent.

---

### TICKET-018 — `getCurrentSubscriptionAccess()` is fail-open on DB error
**Status:** OPEN  
**Priority:** P2  
**Severity:** Medium  
**Area:** Billing / Access Control  

**User impact:** During a database outage, paid users are degraded to free tier (their paid features stop working). The intention of fail-open is "be permissive" but it actually harms paying customers most.

**Business impact:** DB instability causes paying users to lose access to features they're paying for. Likely triggers support tickets and potentially chargebacks.

**Current behavior:** `getCurrentSubscriptionAccess()` catch block returns a free-tier access object on any DB error, degrading paid subscribers to free tier silently.

**Expected behavior:** On DB error, return a `503 Service Unavailable` response to the client with a user-friendly message ("We're experiencing issues — please try again in a moment"). Don't silently degrade paid users.

**File:** `src/lib/billing.ts`

**Fix approach:** In the catch block, rethrow the error (or return `{ error: "service_unavailable" }`) and let the calling route return a 503. Alternatively, cache the last known subscription state in Redis with a short TTL and serve the cache during DB outages.

**Acceptance criteria:**
- [ ] DB error → calling route returns 503 with user-friendly message
- [ ] Paid users are not downgraded to free tier during DB outages
- [ ] Free tier users also get 503 during DB outages (consistent behavior)

**Recommended test coverage:**
- Unit test: mock DB to throw → function rethrows (or returns error sentinel)
- Integration test: verify calling route returns 503 on DB failure

**Retest steps:** Mock DB failure in staging; attempt to use a paid feature → should return 503 not a free-tier feature response.

**Definition of done:** DB errors surface as 503 responses, not silent feature downgrades.

---

### TICKET-019 — Signup reveals whether email is already registered (account enumeration)
**Status:** OPEN  
**Priority:** P2  
**Severity:** Low  
**Area:** Authentication / Privacy  

**User impact:** An attacker can determine whether any given email address has a Zari account by observing the difference between "email exists" and "signup failed for another reason" error messages.

**Business impact:** GDPR Article 25 (privacy by design) consideration. Low severity but straightforward to fix.

**Current behavior:** `POST /api/auth/signup` with an existing email propagates the exception message from `createPlatformUser`, which says "Account already exists. Sign in instead." — directly confirming the account exists.

**Expected behavior:** For any signup failure due to a duplicate email, return the same generic message: `"If this email is not registered, check your inbox for a confirmation. Otherwise, try signing in."` — making it impossible to distinguish "email exists" from "check your spam".

**File:** `src/app/api/auth/signup/route.ts`

**Fix approach:** Catch the specific Prisma error code `P2002` (unique constraint violation) and the `"Account already exists"` message, and return a generic response that doesn't confirm existence.

**Acceptance criteria:**
- [ ] Signup with existing email: response does not contain the word "exists" or "already registered"
- [ ] Signup with new email: proceeds normally
- [ ] User experience: existing users are nudged toward the login page without confirmation that their account exists

**Recommended test coverage:**
- Unit test: duplicate email → generic error message returned
- Unit test: new email → normal signup flow

**Retest steps:** Attempt to sign up with a known-existing email. Error message must not confirm the account exists.

**Definition of done:** Signup error messages are indistinguishable between "email exists" and other generic failures.

---

### TICKET-020 — Session message inserted before ownership verified — orphaned rows possible
**Status:** OPEN  
**Priority:** P2  
**Severity:** Low  
**Area:** Sessions / Data Integrity  

**User impact:** Minor. If a user submits a message to a session ID they don't own (or a non-existent session), an orphaned `SessionMessage` row is written to the DB before the ownership check fails and returns an error.

**Business impact:** DB table bloat if this is triggered maliciously. Also represents a write-before-verify pattern that is a code quality concern.

**Current behavior:** `appendSessionEvent` in `src/app/api/sessions/[id]/events/route.ts` inserts the `SessionMessage`, then calls `getSessionForUser(userId, sessionId)`. If that check fails, the orphaned message remains.

**Expected behavior:** Ownership is verified before any write. Alternatively, both operations are wrapped in a single transaction that rolls back if ownership verification fails.

**File:** `src/app/api/sessions/[id]/events/route.ts`

**Fix approach:** Reorder to: verify ownership → insert message. Or wrap in `prisma.$transaction([verifyQuery, insertQuery])` so both succeed or both roll back.

**Acceptance criteria:**
- [ ] No `SessionMessage` row is created if the session ownership check fails
- [ ] Valid session + valid user → message created as before
- [ ] Invalid session ID → 404, no message in DB

**Recommended test coverage:**
- Unit test: invalid session ID → 404, DB insert not called
- Unit test: valid session, valid user → 200, message inserted

**Retest steps:** POST to `/api/sessions/fake-id/events` as a logged-in user → 404. Verify DB has no new `SessionMessage` row.

**Definition of done:** Write operations only occur after authorization is confirmed. No orphaned rows on invalid requests.

---

## 4. P3 — Polish

Low-priority improvements that improve developer experience, long-term maintainability, and operational health.

---

### TICKET-021 — `middleware.ts` file triggers Next.js deprecation warning on every build
**Status:** OPEN  
**Priority:** P3  
**Severity:** Low  
**Area:** Infrastructure  

**User impact:** None.

**Business impact:** Clean builds. Deprecation warnings in the build log obscure real issues and indicate technical debt.

**Current behavior:** `src/middleware.ts` is an empty (no-op) file. Next.js 16 emits "The 'middleware' file convention is deprecated. Please use 'proxy' instead." on every build.

**Expected behavior:** Either the file is renamed to `src/proxy.ts`, or it is deleted entirely since it contains no logic.

**Fix approach:** If no middleware logic is needed: delete `src/middleware.ts`. If middleware is needed in the future: rename to `src/proxy.ts` following the new convention.

**Acceptance criteria:**
- [ ] `npm run build` produces zero deprecation warnings related to middleware
- [ ] No `src/middleware.ts` exists (or it is renamed to `src/proxy.ts` with working logic)

**Retest steps:** `npm run build` → grep output for "deprecated" → zero results.

**Definition of done:** Build output is warning-free on the middleware convention.

---

### TICKET-022 — Node.js version mismatch: local v24, Netlify configured v20
**Status:** OPEN  
**Priority:** P3  
**Severity:** Low  
**Area:** Infrastructure  

**User impact:** None directly. Subtle runtime differences between major Node.js versions (crypto API, fetch, V8) can cause hard-to-reproduce bugs.

**Business impact:** Developer time lost debugging issues that only reproduce on the server.

**Current behavior:** `netlify.toml` sets `NODE_VERSION = "20"`. Local development uses Node.js v24 (confirmed via `.nvm/versions/node/v24.13.0`).

**Expected behavior:** Local and production Node.js versions match. Either pin local to v20 via `.nvmrc`, or upgrade `netlify.toml` to v22 (LTS) and update local.

**Fix approach:**
1. Check Netlify's supported Node.js versions.
2. Choose one version (v22 LTS recommended).
3. Update `netlify.toml`: `NODE_VERSION = "22"`.
4. Add `.nvmrc` with content `22` to the repo root.
5. Update `package.json` engines field: `"engines": { "node": ">=22" }`.

**Acceptance criteria:**
- [ ] `.nvmrc` exists with the target version
- [ ] `netlify.toml` matches `.nvmrc`
- [ ] `package.json` engines field is set
- [ ] Build succeeds on Netlify with the new version

**Retest steps:** Trigger a Netlify deploy — build log shows the configured Node version matching the specified one.

**Definition of done:** All environments run the same Node.js major version. Documented in `CONTRIBUTING.md`.

---

### TICKET-023 — Free token limit exhausted in a single sitting — high conversion friction
**Status:** OPEN  
**Priority:** P3  
**Severity:** Low  
**Area:** Free Tier UX / Product  

**User impact:** Free users who try multiple features in one session hit the token limit before experiencing the core value of the product, reducing the motivation to upgrade.

**Business impact:** Conversion rate impact. Users who can't experience value won't convert. The current free tier may be too restrictive for trial effectiveness.

**Current behavior:** `FREE_TOKEN_LIMIT = 18_000` (approximately 2–3 feature uses). `FREE_MAX_USES_PER_FEATURE = 1` (one use per feature type). A user who tries resume review, LinkedIn optimization, and interview prep in one session can exhaust the limit entirely.

**Expected behavior (proposal):** A/B test two configurations:
- Control: current `18_000` limit
- Variant A: `50_000` limit (5–7 feature uses)
- Variant B: `FREE_MAX_USES_PER_FEATURE = 3` with lower per-call token cap

**File:** `src/lib/plan-entitlements.ts` (line 19)

**Fix approach:** This is a product decision before a code decision. Recommended path:
1. Review conversion data after first 100 signups.
2. If free→paid conversion is below 5%, increase `FREE_TOKEN_LIMIT` to `50_000`.
3. Add an analytics event `free_limit_reached` to measure how often users hit the wall.

**Acceptance criteria:**
- [ ] An analytics event `free_limit_reached` fires when a user hits the limit
- [ ] The limit value is configurable via environment variable (not hardcoded) so it can be adjusted without a deploy
- [ ] Product decision on limit value is made based on conversion data

**Recommended test coverage:** No unit test needed for the limit value itself. Test that `free_limit_reached` event is fired correctly.

**Retest steps:** Create a free account, exhaust the limit → verify `free_limit_reached` appears in `AppEvent` table.

**Definition of done:** Analytics event exists. Limit is env-var configurable. Product team has baseline conversion data to inform the final limit value.

---

## 5. Regression Testing Tasks

Manual test cases to verify that the 11 P0/P1 fixes in commit `18f02eb` did not introduce regressions.

---

### REGRESSION-001 — Coach chat still works for authenticated users
**Area:** AI Coach  
**Prerequisite:** Valid logged-in session  

**Steps:**
1. Log in as a member-role user.
2. Navigate to the dashboard and open a coaching chat session.
3. Send a message about your resume.
4. Verify: AI response is returned, `{ message: "...", aiEnabled: true }`.

**Pass criteria:** Chat works normally for authenticated users. No unexpected 401 or 500.

---

### REGRESSION-002 — Admin session still works after APP_SECRET change
**Area:** Authentication  
**Prerequisite:** `APP_SECRET` is set in the environment  

**Steps:**
1. Log in to the coach admin panel at `/coach-admin`.
2. Perform an action (view users, approve a video review).
3. Log out, log back in.
4. Verify session is re-established correctly.

**Pass criteria:** Session sign/verify works with the real `APP_SECRET`. No 500s.

---

### REGRESSION-003 — Stripe webhook still processes subscription events
**Area:** Billing  
**Prerequisite:** Stripe CLI or webhook tester  

**Steps:**
1. Send a test `checkout.session.completed` event via Stripe CLI: `stripe trigger checkout.session.completed`.
2. Verify the event is processed (subscription updated in DB, `AppEvent` created).

**Pass criteria:** Webhook returns 200. Subscription record updated. No errors related to Stripe key.

---

### REGRESSION-004 — Coach admin password login still works
**Area:** Coach Admin / Authentication  

**Steps:**
1. Navigate to `/coach-admin`.
2. Enter the correct `COACH_ADMIN_PASSWORD`.
3. Verify login succeeds and admin panel loads.
4. Enter an incorrect password → verify rejected.

**Pass criteria:** Correct password → 200, session set. Wrong password → 401. No timing issues.

---

### REGRESSION-005 — Cleanup cron can be manually triggered
**Area:** Infrastructure  

**Steps:**
1. Create an expired `AppSession` row in staging (set `expiresAt` to 1 hour ago).
2. POST to `/api/cron/cleanup` with `Authorization: Bearer <CRON_SECRET>`.
3. Verify: response `{ ok: true, deleted: { expiredSessions: N } }`.
4. Verify the expired row is deleted from the DB.

**Pass criteria:** Cleanup endpoint returns 200. Expired session row removed. `resetTokens` count reflects any used reset tokens.

---

### REGRESSION-006 — Video review approval grants Stripe trial extension
**Area:** Coach Admin / Billing  

**Steps:**
1. Find a test user with an active Stripe subscription.
2. Create a `VideoReview` record for that user in staging.
3. In coach admin, approve the review.
4. Check Stripe dashboard → subscription `trial_end` extended by 30 days.
5. Check that the user received the confirmation email.

**Pass criteria:** Stripe trial end updated. Email sent. `videoReview.creditGranted = true`.

---

### REGRESSION-007 — Annual upsell email shows $69 savings
**Area:** Email  

**Steps:**
1. In development: `GET /api/email/preview?id=annual_upsell`.
2. Verify: "Save $69" appears in the email body.
3. Verify: "$399" appears as the annual price.
4. Verify: "$33.25/month" appears as the monthly equivalent.

**Pass criteria:** No reference to $84 or $32/month. Savings and pricing are accurate.

---

### REGRESSION-008 — Email preview 404s in production, works in development
**Area:** Email / Infrastructure  

**Steps:**
1. In production: `curl https://app.zaricoach.com/api/email/preview` → must return 404.
2. In development: `GET http://localhost:3000/api/email/preview` → must return email list HTML.

**Pass criteria:** 404 in production. Functional in development.

---

### REGRESSION-009 — Newsletter excludes admin/support users
**Area:** Email / Cron  

**Steps:**
1. Trigger the newsletter cron in staging.
2. Check the Resend API log or `AppEvent` table for all emails sent with `sequence: "newsletter"`.
3. Verify no email was sent to any admin or support role account.

**Pass criteria:** Zero admin/support emails in the newsletter send list. All member-role emails are included (minus suppressed).

---

### REGRESSION-010 — Coach admin auto-login disabled in production
**Area:** Coach Admin / Authentication  

**Steps:**
1. Set `COACH_ADMIN_BETA_AUTO_LOGIN=true` in the Netlify production environment (temporarily for the test).
2. Visit `/coach-admin` without any session cookie.
3. Verify: shows the login prompt, not the admin dashboard.
4. Remove the env var after testing.

**Pass criteria:** No auto-login in production even with the env var set.

---

### REGRESSION-011 — CSRF check rejects POST without Origin header
**Area:** Security / API  

**Steps:**
```bash
curl -X POST https://staging.zaricoach.com/api/coach/chat \
  -H 'Content-Type: application/json' \
  -d '{"assessmentId":"test","message":"hello"}'
# Expect: 403
  
curl -X POST https://staging.zaricoach.com/api/coach/chat \
  -H 'Origin: https://staging.zaricoach.com' \
  -H 'Content-Type: application/json' \
  -d '{"assessmentId":"test","message":"hello"}'
# Expect: 401 (authenticated check, not CSRF check)
```

**Pass criteria:** No-origin POST → 403. Origin-present but unauthenticated POST → 401.

---

## 6. Automated Testing Tasks

Gaps in automated coverage that should be filled before or shortly after launch.

---

### TEST-001 — Unit tests for `ensureSameOrigin`
**Priority:** P1  
**Area:** Security / Utils  
**File:** `src/lib/utils.ts`  

**Required cases:**
- POST with no Origin → `false`
- GET with no Origin → `true`
- POST with matching Origin → `true`
- POST with mismatched Origin → `false`
- POST with malformed Origin URL → `false`
- POST with no Host header → `false`

**Target file:** `src/lib/utils.test.ts` (create if absent)

---

### TEST-002 — Unit tests for `verifyCoachAdminPassword`
**Priority:** P1  
**Area:** Authentication  
**File:** `src/lib/coach-admin-auth.ts`  

**Required cases:**
- Correct password → `true`
- Wrong password → `false`
- Empty `COACH_ADMIN_PASSWORD` env var → `false`
- Empty string submitted as password → `false`
- Unset env var → `false`

---

### TEST-003 — Unit tests for `getCoachAdminBetaAutoLoginConfig`
**Priority:** P1  
**Area:** Authentication  

**Required cases:**
- `NODE_ENV=production` → `null` regardless of env var value
- `NODE_ENV=development`, env var unset → `null`
- `NODE_ENV=development`, env var set to an email → returns config with that email

---

### TEST-004 — Unit tests for `getSecret()` production guard
**Priority:** P1  
**Area:** Authentication  

**Required cases (for each of the three auth files):**
- `NODE_ENV=production`, `APP_SECRET` set → returns secret
- `NODE_ENV=production`, `APP_SECRET` unset → throws `Error`
- `NODE_ENV=development`, `APP_SECRET` unset → returns `"local-dev-secret"`

---

### TEST-005 — Integration test for `/api/coach/chat` authentication
**Priority:** P0  
**Area:** AI Coach  
**File:** `src/app/api/coach/chat/route.test.ts` (create)  

**Required cases:**
- Unauthenticated POST → 401
- Authenticated POST with valid `assessmentId` → 200 with `{ message, aiEnabled }`
- Authenticated POST with missing `assessmentId` → 400
- Authenticated POST with missing `message` → 400

---

### TEST-006 — Unit tests for digest MRR delta calculation (after BUG-008 fix)
**Priority:** P1  
**Area:** Cron / Analytics  
**File:** `src/app/api/cron/digest/route.test.ts` (create or extend)  

**Required cases:**
- Mix of Search ($39) + Growth ($89) + Executive ($179) previous-week subs → `mrrLastWeek = 307`
- All Search subs → correct total
- Empty previous-week subs → `mrrLastWeek = 0`, `mrrDelta = currentMrr`

---

### TEST-007 — Add `tsc --noEmit` to CI pipeline
**Priority:** P1  
**Area:** TypeScript / CI  

**Task:** Add a CI step that runs `tsc --noEmit` on every pull request and push to main. This catches type regressions before they can reach production. This is the systemic fix to prevent a recurrence of BUG-006, BUG-007, BUG-008.

**Implementation:** In `netlify.toml` or a GitHub Actions workflow:
```yaml
- name: Type check
  run: npx tsc --noEmit
```

This step must complete before the Vitest test run.

---

### TEST-008 — NPS rate limiting tests (after TICKET-014 fix)
**Priority:** P2  
**Area:** NPS / Data Integrity  

**Required cases:**
- Authenticated user first NPS submission → 200
- Authenticated user second submission within 30 days → 429
- Unauthenticated IP: 5 submissions → 429 on 6th

---

### TEST-009 — Google OAuth state HMAC verification tests (after TICKET-015 fix)
**Priority:** P2  
**Area:** Authentication  

**Required cases:**
- Valid state HMAC in callback → accepted, flow continues
- Tampered state (modified payload, correct HMAC) → 400
- Valid state, invalid HMAC → 400
- Missing HMAC suffix → 400

---

### TEST-010 — Session event ownership ordering test (after TICKET-020 fix)
**Priority:** P2  
**Area:** Sessions  

**Required cases:**
- Invalid session ID → 404, `SessionMessage.create` not called
- Valid session, wrong user → 403, no insert
- Valid session, correct user → 200, message inserted

---

## 7. Production Monitoring & Support Tasks

Observability, alerting, and on-call preparation tasks that should be in place before launch day.

---

### MONITOR-001 — Set up Netlify function error alerting
**Priority:** P0 (before launch)  
**Area:** Infrastructure  

**Task:** Configure Netlify to send error alerts (function crashes, 5xx spikes) to a Slack channel or email inbox. Without this, production errors are only discoverable by manually checking the Netlify function logs.

**Suggested implementation:** Use Netlify's log drains or a third-party error tracker (Sentry, LogDNA) pointed at the Netlify function log stream. Add `SENTRY_DSN` env var and wrap route handlers with Sentry's `captureException` on unhandled errors.

**Acceptance criteria:**
- [ ] Any unhandled exception in a Next.js API route generates a Slack/email alert within 5 minutes
- [ ] Alert includes: route path, error message, stack trace, and request timestamp

---

### MONITOR-002 — Stripe webhook delivery monitoring
**Priority:** P0 (before launch)  
**Area:** Billing  

**Task:** Configure Stripe to alert on webhook delivery failures. A failed webhook (e.g., subscription activated but `checkout.session.completed` not processed) means a user paid but got no access.

**Suggested implementation:** In Stripe Dashboard → Developers → Webhooks → enable email alerts for failed deliveries. Set alert threshold to 1 failure (not 10%).

**Acceptance criteria:**
- [ ] Stripe sends an email/Slack alert on any webhook delivery failure
- [ ] Runbook created: what to do when a webhook fails (manual replay steps)

---

### MONITOR-003 — Cron job execution monitoring
**Priority:** P1  
**Area:** Infrastructure / Email  

**Task:** Confirm that the three scheduled crons (weekly digest, monthly newsletter, daily cleanup) actually run on schedule. Netlify does not alert if a scheduled function silently fails.

**Suggested implementation:**
1. Add a final log line in each cron handler with a unique marker: `console.log("[cron-cleanup] SUCCESS:", { deleted })`
2. Set up a dead-man's switch: use a service like Cronitor or Healthchecks.io. Have each cron handler ping a heartbeat URL at the end of a successful run.
3. Cronitor sends an alert if the heartbeat is not received within the expected window.

**Acceptance criteria:**
- [ ] Each cron has a registered heartbeat check
- [ ] Missed heartbeat sends an alert within 2 hours of the expected run time
- [ ] Cron results (sent/skipped counts) are logged and searchable

---

### MONITOR-004 — Database connection health check
**Priority:** P1  
**Area:** Infrastructure  

**Task:** Ensure the application degrades gracefully and alerts on Neon database connectivity issues. Current `isDatabaseReady()` only checks if the URL is configured, not if the connection is alive.

**Suggested implementation:**
1. The existing `/api/health` (or create one) should execute a lightweight Prisma query: `prisma.$queryRaw\`SELECT 1\`` with a 2s timeout.
2. Netlify uptime monitoring or an external service (Pingdom, BetterUptime) pings `/api/health` every 5 minutes.
3. On failure: alert fires within 1 check interval.

**Acceptance criteria:**
- [ ] `/api/health` returns `{ ok: true, db: true }` when DB is connected
- [ ] `/api/health` returns `{ ok: false, db: false }` with status 503 when DB is unreachable
- [ ] External uptime monitor is configured with alert to Slack/email

---

### MONITOR-005 — Resend email delivery rate monitoring
**Priority:** P1  
**Area:** Email  

**Task:** Track email delivery rates for the sequence engine. A bounce rate above 5% or a complaint rate above 0.1% can cause Resend to suspend the sending domain.

**Suggested implementation:**
1. Configure Resend webhook for `email.delivered`, `email.bounced`, `email.complained` events.
2. Store these events in `AppEvent` with the sequence/step reference.
3. Weekly digest (or a separate dashboard) should show: sent / delivered / bounced / complained rates.
4. Alert if bounce rate exceeds 3% or complaint rate exceeds 0.08%.

**Acceptance criteria:**
- [ ] Resend delivery events are stored in `AppEvent`
- [ ] Weekly digest includes delivery rate metrics
- [ ] Alert configured for bounce/complaint thresholds

---

### MONITOR-006 — Upstash Redis connectivity check
**Priority:** P1  
**Area:** Security / Infrastructure  

**Task:** Confirm that Upstash rate limiting is functioning (not silently falling back to in-memory) in production. Without this, auth brute-force protection is non-functional.

**Suggested implementation:**
1. Add a `/api/health` check item: attempt a Redis ping and include `{ redis: true/false }` in the response.
2. Alert if `redis: false` appears in a health check response in production.

**Acceptance criteria:**
- [ ] Health check endpoint reports Redis status
- [ ] Alert fires if Redis is unreachable in production
- [ ] Rate limiting verified end-to-end by triggering the limit on `/api/auth/login` in staging

---

### MONITOR-007 — Define and document the launch-day runbook
**Priority:** P0 (before launch)  
**Area:** Operations  

**Task:** Create a `RUNBOOK.md` in the repository root with step-by-step procedures for the most likely launch-day incidents.

**Required sections:**
1. **Stripe webhook failure** — how to replay, how to manually grant access
2. **Database unreachable** — how to check Neon status, how to notify users
3. **Email sending stopped** — how to verify Resend status, how to re-queue failed sequences
4. **Cron job missed** — how to manually trigger, how to verify results
5. **Coach admin locked out** — password reset procedure without the web flow
6. **Emergency: disable AI chat** — how to set a feature flag or env var to disable Groq/LLM calls
7. **Rollback procedure** — how to revert to the previous Netlify deploy

**Acceptance criteria:**
- [ ] `RUNBOOK.md` exists in the project root
- [ ] Each section has: trigger condition, immediate action, resolution steps, and escalation path
- [ ] At least one team member has dry-run each procedure in staging

---

### MONITOR-008 — Add structured logging with correlation IDs
**Priority:** P2  
**Area:** Observability  

**Task:** All API routes currently log with `console.error("[route-name] message", error)`. Without correlation IDs, tracing a single user's request through logs is impossible when debugging production issues.

**Suggested implementation:**
1. Add a `requestId` (UUID) to each incoming request via middleware/proxy.
2. Pass the `requestId` to all log statements within that request.
3. Include the `requestId` in error responses so users can provide it to support.

**Acceptance criteria:**
- [ ] Each API request generates a unique `requestId`
- [ ] All `console.error` and `console.log` calls within a request include the `requestId`
- [ ] Error responses include `{ error: "...", requestId: "..." }` so users can reference it

---

## Summary Table

| Ticket | Title | Priority | Status |
|--------|-------|----------|--------|
| TICKET-001 | Unauthenticated `/api/coach/chat` | P0 | FIXED |
| TICKET-002 | `APP_SECRET` forgeability | P0 | FIXED |
| TICKET-003 | Hardcoded `sk_test_123` | P0 | FIXED |
| TICKET-004 | Timing-vulnerable password comparison | P0 | FIXED |
| TICKET-005 | Cleanup cron never runs | P0 | FIXED |
| TICKET-006 | `accounts` vs `ownedAccounts` | P1 | FIXED |
| TICKET-007 | `RouteContext` undefined type | P1 | **OPEN** |
| TICKET-008 | MRR delta hardcoded $39 | P1 | **OPEN** |
| TICKET-009 | `ensureSameOrigin` bypass | P1 | FIXED |
| TICKET-010 | Annual upsell savings $84 vs $69 | P1 | FIXED |
| TICKET-011 | Email preview in production | P1 | FIXED |
| TICKET-012 | `prisma as any` disables type safety | P1 | **OPEN** |
| TICKET-013 | Newsletter sends to admin accounts | P1 | FIXED |
| TICKET-024 | Beta auto-login in production | P1 | FIXED |
| TICKET-014 | NPS endpoint no rate limit | P2 | OPEN |
| TICKET-015 | OAuth state unsigned | P2 | OPEN |
| TICKET-016 | In-memory rate limit not global | P2 | OPEN |
| TICKET-017 | Plan tier DB enum mismatch | P2 | OPEN |
| TICKET-018 | Subscription access fail-open on DB error | P2 | OPEN |
| TICKET-019 | Signup reveals email enumeration | P2 | OPEN |
| TICKET-020 | Session message write before verify | P2 | OPEN |
| TICKET-021 | middleware.ts deprecation warning | P3 | OPEN |
| TICKET-022 | Node.js version mismatch | P3 | OPEN |
| TICKET-023 | Free token limit too restrictive | P3 | OPEN |
| TEST-001–010 | Automated test coverage gaps | P1–P2 | OPEN |
| MONITOR-001–008 | Monitoring & observability | P0–P2 | OPEN |

**Launch gate:** All P0s FIXED. Three P1s remain open (TICKET-007, TICKET-008, TICKET-012). These must be completed before production traffic is directed to the application.
