import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { getUserById as getMvpUserById } from "@/lib/mvp/store";
import { getBaseUrl } from "@/lib/utils";

export type CoachAdminRole = "admin" | "support";

export const ACTIVE_SUBSCRIPTION_STATUSES = new Set(["active", "trialing"]);
export const RESTRICTED_SUBSCRIPTION_STATUSES = new Set([
  "past_due",
  "unpaid",
  "canceled",
  "incomplete_expired",
]);

function splitFullName(name?: string | null) {
  const trimmed = (name || "").trim();
  if (!trimmed) return { firstName: null as string | null, lastName: null as string | null };
  const parts = trimmed.split(/\s+/);
  return {
    firstName: parts[0] || null,
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : null,
  };
}

function uniqueStrings(value: string | undefined) {
  return (value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function getCoachAdminRole(email: string): CoachAdminRole | null {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;
  if (uniqueStrings(process.env.COACH_ADMIN_EMAIL_ALLOWLIST).includes(normalized)) return "admin";
  if (uniqueStrings(process.env.COACH_SUPPORT_EMAIL_ALLOWLIST).includes(normalized)) return "support";
  return null;
}

export function canAccessSubscriptionStatus(status?: string | null) {
  return ACTIVE_SUBSCRIPTION_STATUSES.has(`${status || ""}`.toLowerCase());
}

export function getBillingBlockReason(status?: string | null) {
  const normalized = `${status || ""}`.toLowerCase();
  if (normalized === "past_due") return "Subscription payment is past due.";
  if (normalized === "unpaid") return "Subscription is unpaid.";
  if (normalized === "canceled") return "Subscription has been canceled.";
  if (normalized === "incomplete_expired") return "Subscription setup expired before payment completed.";
  return "Active subscription required.";
}

export function mapStripeStatusToAccountStatus(status?: string | null) {
  const normalized = `${status || ""}`.toLowerCase();
  if (normalized === "active") return "active";
  if (normalized === "trialing") return "trialing";
  if (normalized === "past_due") return "past_due";
  if (normalized === "unpaid") return "unpaid";
  if (normalized === "canceled") return "canceled";
  if (normalized === "incomplete_expired") return "incomplete_expired";
  return "incomplete";
}

export function stripeTimestampToDate(value?: number | null) {
  return typeof value === "number" && Number.isFinite(value) ? new Date(value * 1000) : null;
}

export function getBillingSuccessUrl() {
  return `${getBaseUrl()}/dashboard?billing=success`;
}

export function getBillingCancelUrl() {
  return `${getBaseUrl()}/pricing?billing=cancelled`;
}

export function getPlanNameFromStripe(subscription: Stripe.Subscription) {
  const firstItem = subscription.items.data[0];
  const price = firstItem?.price;
  return price?.nickname || price?.lookup_key || (typeof price?.product === "string" ? price.product : null) || "Pro Monthly";
}

function parseTokenLimit(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(`${value || ""}`, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getPlanTokenLimit(planName?: string | null, priceId?: string | null) {
  const normalizedPlan = `${planName || ""}`.toLowerCase();
  const normalizedPrice = `${priceId || ""}`.toLowerCase();

  if (normalizedPlan.includes("premium") || normalizedPrice.includes("premium")) {
    return parseTokenLimit(process.env.PLAN_TOKEN_LIMIT_PREMIUM, 10_000_000);
  }
  if (normalizedPlan.includes("team") || normalizedPrice.includes("team")) {
    return parseTokenLimit(process.env.PLAN_TOKEN_LIMIT_TEAM, 15_000_000);
  }
  if (normalizedPlan.includes("pro") || normalizedPrice.includes("pro") || normalizedPrice.includes("monthly")) {
    return parseTokenLimit(process.env.PLAN_TOKEN_LIMIT_PRO, 3_000_000);
  }
  return parseTokenLimit(process.env.PLAN_TOKEN_LIMIT_FREE, 150_000);
}

export function getPlanMonthlyAmountCents(planName?: string | null, priceId?: string | null) {
  const normalizedPlan = `${planName || ""}`.toLowerCase();
  const normalizedPrice = `${priceId || ""}`.toLowerCase();

  if (normalizedPlan.includes("premium") || normalizedPrice.includes("premium")) {
    return parseTokenLimit(process.env.PLAN_AMOUNT_PREMIUM_CENTS, 9900);
  }
  if (normalizedPlan.includes("team") || normalizedPrice.includes("team")) {
    return parseTokenLimit(process.env.PLAN_AMOUNT_TEAM_CENTS, 19900);
  }
  if (normalizedPlan.includes("pro") || normalizedPrice.includes("pro") || normalizedPrice.includes("monthly")) {
    return parseTokenLimit(process.env.PLAN_AMOUNT_PRO_CENTS, 1900);
  }
  return 0;
}

function getSubscriptionPeriodBounds(subscription: Stripe.Subscription) {
  const starts = subscription.items.data
    .map((item) => stripeTimestampToDate(item.current_period_start))
    .filter((value): value is Date => Boolean(value))
    .map((value) => value.getTime());
  const ends = subscription.items.data
    .map((item) => stripeTimestampToDate(item.current_period_end))
    .filter((value): value is Date => Boolean(value))
    .map((value) => value.getTime());

  return {
    currentPeriodStart: starts.length ? new Date(Math.min(...starts)) : null,
    currentPeriodEnd: ends.length ? new Date(Math.max(...ends)) : null,
  };
}

export function buildSubscriptionSnapshot(subscription: Stripe.Subscription) {
  const firstItem = subscription.items.data[0];
  const price = firstItem?.price;
  const period = getSubscriptionPeriodBounds(subscription);
  return {
    stripeCustomerId: typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id || "",
    stripeSubscriptionId: subscription.id,
    stripePriceId: price?.id || null,
    planName: getPlanNameFromStripe(subscription),
    status: `${subscription.status || "incomplete"}`.toLowerCase(),
    currentPeriodStart: period.currentPeriodStart,
    currentPeriodEnd: period.currentPeriodEnd,
    cancelAtPeriodEnd: Boolean(subscription.cancel_at_period_end),
    canceledAt: stripeTimestampToDate(subscription.canceled_at),
    trialEnd: stripeTimestampToDate(subscription.trial_end),
    paymentIssue: !canAccessSubscriptionStatus(subscription.status),
  };
}

async function ensureAccountForUser(user: any, preferredName?: string | null) {
  if (user.accountId) {
    const existing = await prisma.account.findUnique({
      where: { id: user.accountId },
      include: { subscription: true },
    });
    if (existing) return existing;
  }

  const owned = await prisma.account.findFirst({
    where: { ownerUserId: user.id },
    include: { subscription: true },
    orderBy: { createdAt: "asc" },
  });

  if (owned) {
    if (user.accountId !== owned.id) {
      await prisma.user.update({
        where: { id: user.id },
        data: { accountId: owned.id },
      });
    }
    return owned;
  }

  const created = await prisma.account.create({
    data: {
      name: preferredName?.trim() || `${user.firstName || user.email?.split("@")[0] || "Customer"} Account`,
      ownerUserId: user.id,
      status: "incomplete",
      paymentIssue: false,
    },
    include: { subscription: true },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { accountId: created.id },
  });

  return created;
}

export async function syncMvpUserToBillingIdentity(mvpUserId: string) {
  if (!isDatabaseReady()) return null;
  const mvpUser = await getMvpUserById(mvpUserId);
  if (!mvpUser) return null;

  const email = mvpUser.email.trim().toLowerCase();
  const { firstName, lastName } = splitFullName(mvpUser.profile?.name);
  const desiredRole = getCoachAdminRole(email) ?? "member";

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ externalAuthId: mvpUser.id }, { email }],
    },
  });

  const user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: {
          email,
          externalAuthId: mvpUser.id,
          firstName,
          lastName,
          role: existing.role === "admin" || existing.role === "support" ? existing.role : desiredRole,
        },
      })
    : await prisma.user.create({
        data: {
          email,
          externalAuthId: mvpUser.id,
          firstName,
          lastName,
          role: desiredRole,
          planTier: "free",
        },
      });

  const account = await ensureAccountForUser(user, mvpUser.profile?.name);
  const subscription = account.subscription
    ? account.subscription
    : await prisma.subscription.findUnique({ where: { accountId: account.id } });

  return { mvpUser, user, account, subscription };
}

export async function ensureCoachAdminUser(email: string, role: CoachAdminRole) {
  if (!isDatabaseReady()) return null;
  const normalized = email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalized } });
  if (existing) {
    return prisma.user.update({
      where: { id: existing.id },
      data: { role },
    });
  }
  return prisma.user.create({
    data: {
      email: normalized,
      role,
      planTier: "free",
    },
  });
}

export async function syncCurrentUserToBillingIdentity() {
  const currentUserId = await getCurrentUserId();
  if (!currentUserId) return null;
  return syncMvpUserToBillingIdentity(currentUserId);
}

export async function logAppEvent(eventName: string, input: { accountId?: string | null; userId?: string | null; metadataJson?: Record<string, unknown> } = {}) {
  if (!isDatabaseReady()) return null;
  return prisma.appEvent.create({
    data: {
      eventName,
      accountId: input.accountId || null,
      userId: input.userId || null,
      metadataJson: input.metadataJson || undefined,
    },
  });
}

export async function recordAiTokenUsage(input: {
  accountId?: string | null;
  userId?: string | null;
  model: string;
  featureName?: string | null;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  metadataJson?: Record<string, unknown>;
}) {
  if (!isDatabaseReady()) return null;
  const inputTokens = Math.max(0, Math.round(input.inputTokens || 0));
  const outputTokens = Math.max(0, Math.round(input.outputTokens || 0));
  const totalTokens = Math.max(0, Math.round(input.totalTokens || inputTokens + outputTokens));
  return prisma.aiTokenUsage.create({
    data: {
      accountId: input.accountId || null,
      userId: input.userId || null,
      model: input.model,
      featureName: input.featureName || null,
      inputTokens,
      outputTokens,
      totalTokens,
      metadataJson: input.metadataJson || undefined,
    },
  });
}

export async function getCurrentPeriodTokenUsage(accountId: string) {
  if (!isDatabaseReady()) return null;
  const subscription = await prisma.subscription.findUnique({ where: { accountId } });
  if (!subscription) return null;

  const createdAtFilter = subscription.currentPeriodStart
    ? { gte: subscription.currentPeriodStart, lte: subscription.currentPeriodEnd || undefined }
    : undefined;

  const aggregate = await prisma.aiTokenUsage.aggregate({
    where: {
      accountId,
      ...(createdAtFilter ? { createdAt: createdAtFilter } : {}),
    },
    _sum: { inputTokens: true, outputTokens: true, totalTokens: true },
  });

  const limit = getPlanTokenLimit(subscription.planName, subscription.stripePriceId);
  const used = aggregate._sum.totalTokens || 0;
  return {
    limit,
    used,
    remaining: Math.max(0, limit - used),
    inputTokens: aggregate._sum.inputTokens || 0,
    outputTokens: aggregate._sum.outputTokens || 0,
    subscription,
  };
}

export async function hasActiveSubscription(accountId: string) {
  if (!isDatabaseReady()) return false;
  const subscription = await prisma.subscription.findUnique({ where: { accountId } });
  return canAccessSubscriptionStatus(subscription?.status);
}

export async function getCurrentSubscriptionAccess() {
  // If billing DB is not configured, allow access (fail-open for unset environments).
  if (!isDatabaseReady()) {
    return { ok: true as const, user: null, account: null, subscription: null };
  }

  let identity;
  try {
    identity = await syncCurrentUserToBillingIdentity();
  } catch (err) {
    console.error("[billing] syncCurrentUserToBillingIdentity threw:", err);
    // DB is configured but unreachable — fail-open so users aren't locked out by infrastructure issues.
    return { ok: true as const, user: null, account: null, subscription: null };
  }

  if (!identity) {
    return { ok: false as const, status: 401, error: "Sign in required." };
  }

  let subscription;
  try {
    subscription = identity.subscription || (await prisma.subscription.findUnique({ where: { accountId: identity.account.id } }));
  } catch (err) {
    console.error("[billing] subscription lookup threw:", err);
    // DB flaky mid-request — fail-open.
    return { ok: true as const, user: identity.user, account: identity.account, subscription: null };
  }

  if (!subscription || !canAccessSubscriptionStatus(subscription.status)) {
    return {
      ok: false as const,
      status: 402,
      error: getBillingBlockReason(subscription?.status),
      user: identity.user,
      account: identity.account,
      subscription: subscription || null,
    };
  }

  return {
    ok: true as const,
    user: identity.user,
    account: identity.account,
    subscription,
  };
}

export async function requirePaidRouteAccess(
  featureName: string,
  metadataJson: Record<string, unknown> = {},
  options: { enforceTokenLimit?: boolean } = {}
) {
  const enforceTokenLimit = options.enforceTokenLimit ?? true;

  let access;
  try {
    access = await getCurrentSubscriptionAccess();
  } catch (err) {
    console.error("[billing] getCurrentSubscriptionAccess threw:", err);
    return {
      ok: false as const,
      response: NextResponse.json(
        { ok: false, error: "Service temporarily unavailable. Please try again." },
        { status: 503 }
      ),
    };
  }

  if (!access.ok) {
    return {
      ok: false as const,
      response: NextResponse.json(
        {
          ok: false,
          error: access.error,
          subscriptionStatus: access.subscription?.status || null,
        },
        { status: access.status }
      ),
    };
  }

  let usage = null;
  if (access.account) {
    try {
      usage = await getCurrentPeriodTokenUsage(access.account.id);
    } catch {
      // non-fatal — skip token enforcement if DB is flaky
    }
  }

  if (enforceTokenLimit && usage && usage.used >= usage.limit) {
    try {
      await logAppEvent("subscription_token_limit_reached", {
        accountId: access.account?.id,
        userId: access.user?.id,
        metadataJson: { featureName, used: usage.used, limit: usage.limit, ...metadataJson },
      });
    } catch { /* non-fatal */ }

    return {
      ok: false as const,
      response: NextResponse.json(
        {
          ok: false,
          error: "Monthly token limit reached for the current subscription plan.",
          tokenUsage: usage,
        },
        { status: 429 }
      ),
    };
  }

  try {
    if (access.account) {
      await logAppEvent("feature_used", {
        accountId: access.account.id,
        userId: access.user?.id,
        metadataJson: { featureName, ...metadataJson },
      });
    }
  } catch { /* non-fatal */ }

  return {
    ok: true as const,
    access,
    usage,
  };
}

export async function recordFeatureUsage(featureName: string, metadataJson: Record<string, unknown> = {}) {
  const access = await getCurrentSubscriptionAccess();
  if (!access.ok) return access;
  await logAppEvent("feature_used", {
    accountId: access.account.id,
    userId: access.user.id,
    metadataJson: { featureName, ...metadataJson },
  });
  return access;
}
