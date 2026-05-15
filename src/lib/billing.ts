import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { getUserById as getMvpUserById } from "@/lib/mvp/store";
import { getPlatformIdentityByUserId } from "@/lib/platform-users";
import { getPricingPlanById } from "@/lib/pricing-catalog";
import {
  canAccessFeature,
  getPlanDisplayName,
  getRequiredPlanForFeature,
  getUpgradePrompt,
  normalizeProductPlanId,
  FREE_TOKEN_LIMIT,
  FREE_MAX_USES_PER_FEATURE,
  FREE_ACCESSIBLE_FEATURES,
} from "@/lib/plan-entitlements";
import { getBaseUrl } from "@/lib/utils";

export type CoachAdminRole = "admin" | "support";
export const DEFAULT_COACH_ADMIN_EMAIL = "steve@zaricoach.com";

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

export function isPlaceholderCoachAdminEmail(email?: string | null) {
  const normalized = `${email || ""}`.trim().toLowerCase();
  if (!normalized) return false;
  return (
    normalized === "you@example.com" ||
    normalized.endsWith("@example.com") ||
    normalized.endsWith("@zari.local")
  );
}

export function normalizeCoachAdminIdentityEmail(email?: string | null) {
  const normalized = `${email || ""}`.trim().toLowerCase();
  if (!normalized) return "";
  return isPlaceholderCoachAdminEmail(normalized) ? DEFAULT_COACH_ADMIN_EMAIL : normalized;
}

export function getCoachAdminRole(email: string): CoachAdminRole | null {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;
  const adminEmails = uniqueStrings(process.env.COACH_ADMIN_EMAIL_ALLOWLIST);
  const supportEmails = uniqueStrings(process.env.COACH_SUPPORT_EMAIL_ALLOWLIST);
  if (adminEmails.includes(normalized)) return "admin";
  if (supportEmails.includes(normalized)) return "support";
  if (normalized === DEFAULT_COACH_ADMIN_EMAIL) return "admin";
  return null;
}

export function canAccessSubscriptionStatus(status?: string | null) {
  return ACTIVE_SUBSCRIPTION_STATUSES.has(`${status || ""}`.toLowerCase());
}

export function isPaymentIssueSubscriptionStatus(status?: string | null) {
  const normalized = `${status || ""}`.toLowerCase();
  return normalized === "past_due" || normalized === "unpaid";
}

export function getBillingBlockReason(status?: string | null) {
  const normalized = `${status || ""}`.toLowerCase();
  if (normalized === "past_due") return "Subscription payment is past due.";
  if (normalized === "unpaid") return "Subscription is unpaid.";
  if (normalized === "canceled") return "Subscription has been canceled.";
  if (normalized === "incomplete_expired") return "Subscription setup expired before payment completed.";
  return "Active subscription required.";
}

export function getCheckoutCompletionAccessStatus(input: {
  subscriptionStatus?: string | null;
  sessionStatus?: string | null;
  sessionPaymentStatus?: string | null;
  trialEnd?: Date | number | null;
}) {
  const normalizedSubscriptionStatus = `${input.subscriptionStatus || ""}`.toLowerCase();
  if (canAccessSubscriptionStatus(normalizedSubscriptionStatus)) {
    return normalizedSubscriptionStatus;
  }

  const normalizedSessionStatus = `${input.sessionStatus || ""}`.toLowerCase();
  const normalizedPaymentStatus = `${input.sessionPaymentStatus || ""}`.toLowerCase();
  const hasTrial =
    input.trialEnd instanceof Date
      ? Number.isFinite(input.trialEnd.getTime())
      : typeof input.trialEnd === "number";

  if (normalizedSessionStatus === "complete") {
    if (normalizedPaymentStatus === "paid") {
      return "active";
    }

    if (normalizedPaymentStatus === "no_payment_required" || hasTrial) {
      return "trialing";
    }
  }

  return normalizedSubscriptionStatus || null;
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

function getBillingBaseUrl(origin?: string | null) {
  const candidate = `${origin || ""}`.trim();
  if (candidate) {
    try {
      return new URL(candidate).origin;
    } catch {
      // fall through to configured base URL
    }
  }
  return getBaseUrl();
}

export function getBillingSuccessUrl(origin?: string | null) {
  return `${getBillingBaseUrl(origin)}/billing/success`;
}

export function getBillingCancelUrl(origin?: string | null) {
  return `${getBillingBaseUrl(origin)}/onboarding/plan?billing=cancelled`;
}

function matchesConfiguredPriceId(priceId: string | null | undefined, envKeys: string[]) {
  const normalizedPriceId = `${priceId || ""}`.trim().toLowerCase();
  if (!normalizedPriceId) return false;
  return envKeys.some((key) => `${process.env[key] || ""}`.trim().toLowerCase() === normalizedPriceId);
}

export function getPricingCatalogPlanId(planName?: string | null, priceId?: string | null) {
  const normalizedPlan = `${planName || ""}`.trim().toLowerCase();
  const normalizedPriceId = `${priceId || ""}`.trim().toLowerCase();

  if (
    normalizedPlan.includes("search") ||
    matchesConfiguredPriceId(normalizedPriceId, ["STRIPE_PRICE_ID_SEARCH_MONTHLY", "STRIPE_PRICE_ID_SEARCH"])
  ) {
    return "search" as const;
  }

  if (
    normalizedPlan.includes("growth") ||
    normalizedPlan.includes("pro") ||
    matchesConfiguredPriceId(normalizedPriceId, [
      "STRIPE_PRICE_ID_GROWTH_MONTHLY",
      "STRIPE_PRICE_ID_GROWTH",
      "STRIPE_PRICE_ID_MONTHLY",
    ])
  ) {
    return "growth" as const;
  }

  if (
    normalizedPlan.includes("executive") ||
    normalizedPlan.includes("premium") ||
    normalizedPlan.includes("team") ||
    matchesConfiguredPriceId(normalizedPriceId, ["STRIPE_PRICE_ID_EXECUTIVE_MONTHLY", "STRIPE_PRICE_ID_EXECUTIVE"])
  ) {
    return "executive" as const;
  }

  return null;
}

export function getReadablePlanName(planName?: string | null, priceId?: string | null) {
  const planId = getPricingCatalogPlanId(planName, priceId);
  if (planId === "search") return "Search";
  if (planId === "growth") return "Growth";
  if (planId === "executive") return "Executive";
  return planName || priceId || "Monthly plan";
}

export function getPlanIncludedMonthlyCredits(planName?: string | null, priceId?: string | null) {
  const planId = getPricingCatalogPlanId(planName, priceId);
  if (!planId) return null;
  return getPricingPlanById(planId)?.includedCredits ?? null;
}

export function getPlanNameFromStripe(subscription: Stripe.Subscription) {
  const requestedPlanId = `${subscription.metadata?.requestedPlanId || ""}`.trim().toLowerCase();
  const requestedPlan =
    requestedPlanId === "search" || requestedPlanId === "growth" || requestedPlanId === "executive"
      ? getPricingPlanById(requestedPlanId)
      : null;
  if (requestedPlan) {
    return requestedPlan.name;
  }

  const firstItem = subscription.items.data[0];
  const price = firstItem?.price;
  const fallbackName = price?.nickname || price?.lookup_key || (typeof price?.product === "string" ? price.product : null) || "Monthly plan";
  return getReadablePlanName(fallbackName, price?.id || null);
}

function parseTokenLimit(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(`${value || ""}`, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getBillingTokensPerCredit() {
  return parseTokenLimit(process.env.BILLING_TOKENS_PER_CREDIT, 1_000);
}

export function creditsToRawTokens(credits?: number | null) {
  const normalizedCredits = Number(credits || 0);
  if (!Number.isFinite(normalizedCredits) || normalizedCredits <= 0) return 0;
  return Math.round(normalizedCredits * getBillingTokensPerCredit());
}

export function rawTokensToCredits(rawTokens?: number | null, precision = 2) {
  const normalizedTokens = Math.max(0, Number(rawTokens || 0));
  if (!Number.isFinite(normalizedTokens) || normalizedTokens <= 0) return 0;
  const credits = normalizedTokens / getBillingTokensPerCredit();
  const factor = Math.pow(10, precision);
  return Math.round(credits * factor) / factor;
}

export function formatCreditAmount(value?: number | null) {
  const normalized = Number(value || 0);
  if (!Number.isFinite(normalized)) return "0";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: normalized % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(normalized);
}

export function getPlanTokenLimit(planName?: string | null, priceId?: string | null) {
  const planId = getPricingCatalogPlanId(planName, priceId);
  const pricingPlan = getPricingPlanById(planId);
  if (pricingPlan?.includedCredits) {
    return creditsToRawTokens(pricingPlan.includedCredits);
  }

  if (planId === "search") {
    return parseTokenLimit(process.env.PLAN_TOKEN_LIMIT_SEARCH, parseTokenLimit(process.env.PLAN_TOKEN_LIMIT_FREE, 150_000));
  }
  if (planId === "growth") {
    return parseTokenLimit(process.env.PLAN_TOKEN_LIMIT_GROWTH, parseTokenLimit(process.env.PLAN_TOKEN_LIMIT_PRO, 3_000_000));
  }
  if (planId === "executive") {
    return parseTokenLimit(process.env.PLAN_TOKEN_LIMIT_EXECUTIVE, parseTokenLimit(process.env.PLAN_TOKEN_LIMIT_PREMIUM, 10_000_000));
  }

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
  const planId = getPricingCatalogPlanId(planName, priceId);
  const pricingPlan = getPricingPlanById(planId);

  if (planId === "search") {
    return pricingPlan?.priceCents ?? 3900;
  }
  if (planId === "growth") {
    return pricingPlan?.priceCents ?? 8900;
  }
  if (planId === "executive") {
    return pricingPlan?.priceCents ?? 17900;
  }

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

type OpenAiTextRate = {
  match: RegExp;
  label: string;
  inputUsdPer1M: number;
  outputUsdPer1M: number;
};

const OPENAI_TEXT_MODEL_RATES: OpenAiTextRate[] = [
  {
    match: /^gpt-4o-mini(?:$|-)/i,
    label: "GPT-4o mini",
    inputUsdPer1M: 0.15,
    outputUsdPer1M: 0.6,
  },
  {
    match: /^gpt-4o(?:$|-)/i,
    label: "GPT-4o",
    inputUsdPer1M: 2.5,
    outputUsdPer1M: 10,
  },
];

export type AiUsageCostEstimate = {
  label: string | null;
  inputUsdPer1M: number;
  outputUsdPer1M: number;
  estimatedCostUsd: number;
};

export function getOpenAiTextRate(model?: string | null) {
  const normalized = `${model || ""}`.trim().toLowerCase();
  if (!normalized) return null;
  return OPENAI_TEXT_MODEL_RATES.find((entry) => entry.match.test(normalized)) || null;
}

export function estimateTrackedTokenCostUsd(input: {
  model?: string | null;
  inputTokens?: number | null;
  outputTokens?: number | null;
  totalTokens?: number | null;
}): AiUsageCostEstimate {
  const rate = getOpenAiTextRate(input.model);
  if (!rate) {
    return {
      label: null,
      inputUsdPer1M: 0,
      outputUsdPer1M: 0,
      estimatedCostUsd: 0,
    };
  }

  const inputTokens = Math.max(0, Math.round(input.inputTokens || 0));
  const outputTokens = Math.max(
    0,
    Math.round(
      input.outputTokens ??
      Math.max(0, Math.round(input.totalTokens || 0) - inputTokens)
    )
  );

  return {
    label: rate.label,
    inputUsdPer1M: rate.inputUsdPer1M,
    outputUsdPer1M: rate.outputUsdPer1M,
    estimatedCostUsd:
      (inputTokens / 1_000_000) * rate.inputUsdPer1M +
      (outputTokens / 1_000_000) * rate.outputUsdPer1M,
  };
}

export function formatUsdEstimate(amount: number) {
  const abs = Math.abs(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: abs < 100 ? 2 : 0,
    maximumFractionDigits: abs < 100 ? 2 : 0,
  }).format(amount);
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
    paymentIssue: isPaymentIssueSubscriptionStatus(subscription.status),
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
  const normalized = normalizeCoachAdminIdentityEmail(email);

  let existing = await prisma.user.findUnique({ where: { email: normalized } });
  if (!existing && normalized === DEFAULT_COACH_ADMIN_EMAIL) {
    const placeholder = await prisma.user.findFirst({
      where: {
        role: { in: ["admin", "support"] },
        OR: [
          { email: "you@example.com" },
          { email: { endsWith: "@example.com" } },
          { email: { endsWith: "@zari.local" } },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    if (placeholder) {
      existing = await prisma.user.update({
        where: { id: placeholder.id },
        data: {
          email: normalized,
          role,
          planTier: "free",
        },
      });
    }
  }

  const [firstNameRaw, ...lastParts] = normalized.split("@")[0].split(/[._+-]+/).filter(Boolean);
  const firstName = firstNameRaw ? firstNameRaw.charAt(0).toUpperCase() + firstNameRaw.slice(1) : "Steve";
  const lastName = lastParts.length ? lastParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") : "Admin";

  let user = existing;
  if (user) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        email: normalized,
        role,
        firstName: user.firstName || firstName,
        lastName: user.lastName || lastName,
        planTier: user.planTier || "free",
      },
    });
  } else {
    user = await prisma.user.create({
      data: {
        email: normalized,
        role,
        firstName,
        lastName,
        planTier: "free",
      },
    });
  }

  const account = await ensureAccountForUser(user, role === "admin" ? "Steve Admin Account" : `${firstName} Operator Account`);
  if (account.name === "you Account" || account.name === "you@example.com Account") {
    await prisma.account.update({
      where: { id: account.id },
      data: {
        name: role === "admin" ? "Steve Admin Account" : `${firstName} Operator Account`,
      },
    });
  }

  return user;
}

export async function syncCurrentUserToBillingIdentity() {
  const currentUserId = await getCurrentUserId();
  if (!currentUserId) return null;

  if (isDatabaseReady()) {
    const platformIdentity = await getPlatformIdentityByUserId(currentUserId);
    if (platformIdentity) {
      return platformIdentity;
    }
  }

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

  const planLimit  = getPlanTokenLimit(subscription.planName, subscription.stripePriceId);
  const bonusTokens = (subscription as { bonusTokens?: number }).bonusTokens ?? 0;
  const limit  = planLimit + bonusTokens;
  const used   = aggregate._sum.totalTokens || 0;
  const limitCredits = rawTokensToCredits(limit);
  const usedCredits  = rawTokensToCredits(used);
  return {
    limit,
    used,
    remaining: Math.max(0, limit - used),
    inputTokens: aggregate._sum.inputTokens || 0,
    outputTokens: aggregate._sum.outputTokens || 0,
    tokensPerCredit: getBillingTokensPerCredit(),
    limitCredits,
    usedCredits,
    remainingCredits: Math.max(0, limitCredits - usedCredits),
    bonusTokens,
    subscription,
  };
}

function buildCreatedAtFilter(input: { from?: Date | null; to?: Date | null }) {
  if (!input.from && !input.to) return undefined;
  return {
    ...(input.from ? { gte: input.from } : {}),
    ...(input.to ? { lte: input.to } : {}),
  };
}

export type AiUsageUserSummary = {
  userId: string | null;
  email: string;
  role: string;
  requestCount: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  creditsUsed: number;
  estimatedCostUsd: number;
  topModel: string | null;
  topFeature: string | null;
  lastSeenAt: Date | null;
};

export type AiUsageRollup = {
  requestCount: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  creditsUsed: number;
  estimatedCostUsd: number;
  trackedUsers: number;
  topModel: string | null;
};

export type AiUsageSummary = {
  total: AiUsageRollup;
  byUser: AiUsageUserSummary[];
};

export async function getAiUsageSummary(input: {
  accountId?: string;
  from?: Date | null;
  to?: Date | null;
  limit?: number;
} = {}): Promise<AiUsageSummary | null> {
  if (!isDatabaseReady()) return null;

  const where = {
    ...(input.accountId ? { accountId: input.accountId } : {}),
    ...(buildCreatedAtFilter(input) ? { createdAt: buildCreatedAtFilter(input) } : {}),
  };

  const [userGroups, modelGroups, featureGroups]: [
    Array<{
      userId: string | null;
      _sum: {
        inputTokens: number | null;
        outputTokens: number | null;
        totalTokens: number | null;
      };
      _count: { _all: number };
      _max: { createdAt: Date | null };
    }>,
    Array<{
      userId: string | null;
      model: string;
      _sum: {
        inputTokens: number | null;
        outputTokens: number | null;
        totalTokens: number | null;
      };
    }>,
    Array<{
      userId: string | null;
      featureName: string | null;
      _sum: { totalTokens: number | null };
    }>
  ] = await Promise.all([
    prisma.aiTokenUsage.groupBy({
      by: ["userId"],
      where,
      _sum: {
        inputTokens: true,
        outputTokens: true,
        totalTokens: true,
      },
      _count: { _all: true },
      _max: { createdAt: true },
    }),
    prisma.aiTokenUsage.groupBy({
      by: ["userId", "model"],
      where,
      _sum: {
        inputTokens: true,
        outputTokens: true,
        totalTokens: true,
      },
    }),
    prisma.aiTokenUsage.groupBy({
      by: ["userId", "featureName"],
      where,
      _sum: { totalTokens: true },
    }),
  ]);

  const userIds = userGroups
    .map((entry: { userId: string | null }) => entry.userId)
    .filter((value: string | null): value is string => Boolean(value));

  const users = userIds.length
    ? await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, email: true, role: true },
      })
    : [];

  const userMap = new Map<string, { id: string; email: string; role: string }>(
    users.map((user: { id: string; email: string; role: string }) => [user.id, user])
  );
  const costByUser = new Map<string | null, number>();
  const topModelByUser = new Map<string | null, { model: string; totalTokens: number }>();
  let globalTopModel: { model: string; totalTokens: number } | null = null;

  for (const group of modelGroups) {
    const estimate = estimateTrackedTokenCostUsd({
      model: group.model,
      inputTokens: group._sum.inputTokens || 0,
      outputTokens: group._sum.outputTokens || 0,
      totalTokens: group._sum.totalTokens || 0,
    });

    costByUser.set(group.userId, (costByUser.get(group.userId) || 0) + estimate.estimatedCostUsd);

    const totalTokens = group._sum.totalTokens || 0;
    const existingTop = topModelByUser.get(group.userId);
    if (!existingTop || totalTokens > existingTop.totalTokens) {
      topModelByUser.set(group.userId, { model: group.model, totalTokens });
    }

    if (!globalTopModel || totalTokens > globalTopModel.totalTokens) {
      globalTopModel = { model: group.model, totalTokens };
    }
  }

  const topFeatureByUser = new Map<string | null, { featureName: string | null; totalTokens: number }>();
  for (const group of featureGroups) {
    const totalTokens = group._sum.totalTokens || 0;
    const existingTop = topFeatureByUser.get(group.userId);
    if (!existingTop || totalTokens > existingTop.totalTokens) {
      topFeatureByUser.set(group.userId, {
        featureName: group.featureName,
        totalTokens,
      });
    }
  }

  const byUser = userGroups
    .map((group): AiUsageUserSummary => {
      const user = group.userId ? userMap.get(group.userId) : null;
      return {
        userId: group.userId,
        email: user?.email || "Unknown user",
        role: user?.role || "member",
        requestCount: group._count._all || 0,
        inputTokens: group._sum.inputTokens || 0,
        outputTokens: group._sum.outputTokens || 0,
        totalTokens: group._sum.totalTokens || 0,
        creditsUsed: rawTokensToCredits(group._sum.totalTokens || 0),
        estimatedCostUsd: costByUser.get(group.userId) || 0,
        topModel: topModelByUser.get(group.userId)?.model || null,
        topFeature: topFeatureByUser.get(group.userId)?.featureName || null,
        lastSeenAt: group._max.createdAt || null,
      };
    })
    .sort((a: AiUsageUserSummary, b: AiUsageUserSummary) => {
      if (b.estimatedCostUsd !== a.estimatedCostUsd) {
        return b.estimatedCostUsd - a.estimatedCostUsd;
      }
      return b.totalTokens - a.totalTokens;
    });

  const limitedUsers = typeof input.limit === "number" && input.limit > 0
    ? byUser.slice(0, input.limit)
    : byUser;

  return {
    total: {
      requestCount: byUser.reduce((sum: number, entry: AiUsageUserSummary) => sum + entry.requestCount, 0),
      inputTokens: byUser.reduce((sum: number, entry: AiUsageUserSummary) => sum + entry.inputTokens, 0),
      outputTokens: byUser.reduce((sum: number, entry: AiUsageUserSummary) => sum + entry.outputTokens, 0),
      totalTokens: byUser.reduce((sum: number, entry: AiUsageUserSummary) => sum + entry.totalTokens, 0),
      creditsUsed: rawTokensToCredits(byUser.reduce((sum: number, entry: AiUsageUserSummary) => sum + entry.totalTokens, 0)),
      estimatedCostUsd: byUser.reduce((sum: number, entry: AiUsageUserSummary) => sum + entry.estimatedCostUsd, 0),
      trackedUsers: byUser.length,
      topModel: globalTopModel?.model || null,
    },
    byUser: limitedUsers,
  };
}

export async function addBonusTokensToAccount(accountId: string, tokens: number) {
  if (!isDatabaseReady()) return null;
  return prisma.subscription.update({
    where: { accountId },
    data: { bonusTokens: { increment: tokens } },
  });
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

  if (identity.user.role === "admin" || identity.user.role === "support") {
    return {
      ok: true as const,
      user: identity.user,
      account: identity.account,
      subscription: identity.subscription || null,
    };
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
    const repairedAccount = await prisma.account.findFirst({
      where: {
        ownerUserId: identity.user.id,
        subscription: {
          is: {
            status: {
              in: Array.from(ACTIVE_SUBSCRIPTION_STATUSES),
            },
          },
        },
      },
      include: { subscription: true },
      orderBy: { updatedAt: "desc" },
    }).catch(() => null);

    if (repairedAccount?.subscription && canAccessSubscriptionStatus(repairedAccount.subscription.status)) {
      if (identity.user.accountId !== repairedAccount.id) {
        await prisma.user.update({
          where: { id: identity.user.id },
          data: { accountId: repairedAccount.id },
        }).catch((error: unknown) => {
          console.error("[billing] failed to relink user to active account", {
            userId: identity.user.id,
            currentAccountId: identity.user.accountId,
            repairedAccountId: repairedAccount.id,
            error,
          });
        });
      }

      return {
        ok: true as const,
        user: {
          ...identity.user,
          accountId: repairedAccount.id,
        },
        account: repairedAccount,
        subscription: repairedAccount.subscription,
      };
    }

    // No active paid subscription — allow as free tier (no expiry, limited access)
    return {
      ok: true as const,
      user: identity.user,
      account: identity.account,
      subscription: null,
      isFreeTier: true as const,
    };
  }

  return {
    ok: true as const,
    user: identity.user,
    account: identity.account,
    subscription,
    isFreeTier: false as const,
  };
}

export async function requirePaidRouteAccess(
  featureName: string,
  metadataJson: Record<string, unknown> = {},
  options: { enforceTokenLimit?: boolean; stage?: string | null } = {}
) {
  const enforceTokenLimit = options.enforceTokenLimit ?? true;
  const stage = options.stage || (typeof metadataJson.stage === "string" ? metadataJson.stage : null);

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
          code: "subscription_required",
          error: access.error,
          subscriptionStatus: null,
        },
        { status: access.status }
      ),
    };
  }

  // ── FREE TIER GATING ──────────────────────────────────────────────────────
  if (access.isFreeTier) {
    const role = access.user?.role;
    if (role !== "admin" && role !== "support") {
      // Block features not available on free plan
      if (!FREE_ACCESSIBLE_FEATURES.has(featureName)) {
        return {
          ok: false as const,
          response: NextResponse.json(
            {
              ok: false,
              code: "plan_upgrade_required",
              error: "Upgrade to Search to unlock this feature.",
              featureName,
              currentPlanId: null,
              currentPlanName: "Free",
              requiredPlanId: "search",
              requiredPlanName: "Search",
            },
            { status: 402 }
          ),
        };
      }

      if (access.account && isDatabaseReady()) {
        try {
          // Check lifetime token budget for free users (no period bounds — never resets)
          const freeTokenAgg = await prisma.aiTokenUsage.aggregate({
            where: { accountId: access.account.id },
            _sum: { totalTokens: true },
          });
          const usedFreeTokens = freeTokenAgg._sum.totalTokens || 0;
          if (usedFreeTokens >= FREE_TOKEN_LIMIT) {
            return {
              ok: false as const,
              response: NextResponse.json(
                {
                  ok: false,
                  code: "credit_limit_reached",
                  error: "You've used your free preview. Upgrade to Search to keep going.",
                  creditUsage: { used: usedFreeTokens, limit: FREE_TOKEN_LIMIT },
                },
                { status: 429 }
              ),
            };
          }

          // Enforce 1 use per feature on free plan
          const priorUses = await prisma.aiTokenUsage.count({
            where: { accountId: access.account.id, featureName },
          });
          if (priorUses >= FREE_MAX_USES_PER_FEATURE) {
            return {
              ok: false as const,
              response: NextResponse.json(
                {
                  ok: false,
                  code: "plan_upgrade_required",
                  error: "You've used your free preview of this feature. Upgrade to Search for unlimited access.",
                  featureName,
                  currentPlanId: null,
                  currentPlanName: "Free",
                  requiredPlanId: "search",
                  requiredPlanName: "Search",
                },
                { status: 402 }
              ),
            };
          }
        } catch {
          // non-fatal — allow through if DB check fails
        }
      }

      // Log and allow free-tier use
      try {
        if (access.account) {
          await logAppEvent("feature_used", {
            accountId: access.account.id,
            userId: access.user?.id,
            metadataJson: { featureName, tier: "free", ...metadataJson },
          });
        }
      } catch { /* non-fatal */ }

      return { ok: true as const, access, usage: null };
    }
  }
  // ── END FREE TIER GATING ──────────────────────────────────────────────────

  let usage = null;
  if (access.account) {
    try {
      usage = await getCurrentPeriodTokenUsage(access.account.id);
    } catch {
      // non-fatal — skip token enforcement if DB is flaky
    }
  }

  const planDecision = canAccessFeature({
    planId: getPricingCatalogPlanId(access.subscription?.planName, access.subscription?.stripePriceId),
    role: access.user?.role,
    featureName,
    stage,
  });

  if (!planDecision.ok) {
    const requiredPlanId = planDecision.requiredPlanId || getRequiredPlanForFeature(featureName, stage);
    const currentPlanId = planDecision.currentPlanId || normalizeProductPlanId(getPricingCatalogPlanId(access.subscription?.planName, access.subscription?.stripePriceId));

    try {
      await logAppEvent("subscription_upgrade_required", {
        accountId: access.account?.id,
        userId: access.user?.id,
        metadataJson: {
          featureName,
          stage,
          currentPlanId,
          requiredPlanId,
          ...metadataJson,
        },
      });
    } catch { /* non-fatal */ }

    return {
      ok: false as const,
      response: NextResponse.json(
        {
          ok: false,
          code: "plan_upgrade_required",
          error: getUpgradePrompt({ featureName, stage, requiredPlanId }),
          featureName,
          stage,
          currentPlanId,
          currentPlanName: getPlanDisplayName(currentPlanId),
          requiredPlanId,
          requiredPlanName: getPlanDisplayName(requiredPlanId),
          subscriptionStatus: access.subscription?.status || null,
        },
        { status: 402 }
      ),
    };
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
          code: "credit_limit_reached",
          error: "You have used all included monthly credits for this plan. Upgrade or buy more credits to continue.",
          tokenUsage: usage,
          creditUsage: {
            used: usage.usedCredits,
            limit: usage.limitCredits,
            remaining: usage.remainingCredits,
            tokensPerCredit: usage.tokensPerCredit,
          },
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
