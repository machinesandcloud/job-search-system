/**
 * Integration-level tests for requirePaidRouteAccess — the access gate every
 * paid Zari feature route calls before any AI work.  We drive it through
 * its real code path by mocking the external dependencies it reaches:
 *   - getCurrentUserId      (@/lib/mvp/auth)
 *   - getPlatformIdentityByUserId (@/lib/platform-users)
 *   - isDatabaseReady + prisma  (@/lib/db)
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getCurrentUserId: vi.fn(),
  getPlatformIdentityByUserId: vi.fn(),
  getMvpUserById: vi.fn(),
  isDatabaseReady: vi.fn(),
  prisma: {
    subscription: { findUnique: vi.fn() },
    account: { findFirst: vi.fn(), update: vi.fn() },
    user: { update: vi.fn(), findFirst: vi.fn() },
    aiTokenUsage: { aggregate: vi.fn(), count: vi.fn() },
    appEvent: { create: vi.fn() },
    usageEvent: { count: vi.fn() },
  },
}));

vi.mock("@/lib/mvp/auth", () => ({ getCurrentUserId: mocks.getCurrentUserId }));
vi.mock("@/lib/platform-users", () => ({ getPlatformIdentityByUserId: mocks.getPlatformIdentityByUserId }));
vi.mock("@/lib/mvp/store", () => ({ getUserById: mocks.getMvpUserById }));
vi.mock("@/lib/db", () => ({
  isDatabaseReady: () => mocks.isDatabaseReady(),
  prisma: mocks.prisma,
}));

import { requirePaidRouteAccess } from "@/lib/billing";

// ── Identity fixtures ─────────────────────────────────────────────────────────

function makeIdentity(overrides: { role?: string; planName?: string; subscriptionStatus?: string } = {}) {
  const { role = "user", planName = null, subscriptionStatus = null } = overrides;
  const hasActiveSub = subscriptionStatus === "active" || subscriptionStatus === "trialing";
  return {
    mvpUser: { id: "mvp_1" },
    user: { id: "user_1", email: "u@example.com", role, accountId: "acc_1", planTier: null },
    account: { id: "acc_1", ownerUserId: "user_1" },
    subscription: hasActiveSub
      ? { id: "sub_1", accountId: "acc_1", status: subscriptionStatus, planName, stripePriceId: null }
      : null,
  };
}

// ── beforeEach: safe defaults ─────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  mocks.isDatabaseReady.mockReturnValue(true);
  mocks.getCurrentUserId.mockResolvedValue("user_1");
  mocks.getPlatformIdentityByUserId.mockResolvedValue(makeIdentity());
  mocks.prisma.subscription.findUnique.mockResolvedValue(null);
  mocks.prisma.account.findFirst.mockResolvedValue(null);
  mocks.prisma.account.update.mockResolvedValue({});
  mocks.prisma.user.update.mockResolvedValue({});
  mocks.prisma.user.findFirst.mockResolvedValue(null);
  mocks.prisma.aiTokenUsage.aggregate.mockResolvedValue({ _sum: { totalTokens: 0 } });
  mocks.prisma.aiTokenUsage.count.mockResolvedValue(0);
  mocks.prisma.appEvent.create.mockResolvedValue({});
  mocks.prisma.usageEvent.count.mockResolvedValue(0);
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("requirePaidRouteAccess — authentication gate", () => {
  it("returns 401 subscription_required for unauthenticated users", async () => {
    mocks.getCurrentUserId.mockResolvedValue(null);
    const result = await requirePaidRouteAccess("zari_resume_review");
    expect(result.ok).toBe(false);
    expect(result.response.status).toBe(401);
    const body = await result.response.json();
    expect(body.code).toBe("subscription_required");
  });

  it("returns ok:true for an authenticated user on the search plan", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(
      makeIdentity({ planName: "Search Monthly", subscriptionStatus: "active" })
    );
    const result = await requirePaidRouteAccess("zari_resume_review");
    expect(result.ok).toBe(true);
  });

  it("returns a response object when access is denied", async () => {
    mocks.getCurrentUserId.mockResolvedValue(null);
    const result = await requirePaidRouteAccess("zari_resume_review");
    if (!result.ok) {
      expect(result.response).toBeDefined();
      expect(typeof result.response.json).toBe("function");
    }
  });
});

describe("requirePaidRouteAccess — free tier gating", () => {
  it("allows free users to access free-tier features", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(makeIdentity());
    for (const feature of ["zari_resume_review", "zari_linkedin_review", "zari_cover_letter", "zari_interview"]) {
      const result = await requirePaidRouteAccess(feature);
      expect(result.ok).toBe(true);
    }
  });

  it("blocks free users from premium features with 402 plan_upgrade_required", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(makeIdentity());
    const premiumFeatures = [
      "zari_chat",
      "zari_negotiation_sim",
      "zari_promotion_readiness",
      "zari_salary_analysis",
      "zari_exec_positioning",
      "zari_market_intel",
      "zari_pivot_analysis",
    ];
    for (const feature of premiumFeatures) {
      const result = await requirePaidRouteAccess(feature);
      expect(result.ok).toBe(false);
      expect(result.response.status).toBe(402);
      const body = await result.response.json();
      expect(body.code).toBe("plan_upgrade_required");
    }
  });

  it("blocked response includes requiredPlanId and featureName", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(makeIdentity());
    const result = await requirePaidRouteAccess("zari_exec_positioning");
    expect(result.ok).toBe(false);
    const body = await result.response.json();
    expect(body.requiredPlanId).toBeDefined();
    expect(body.featureName).toBe("zari_exec_positioning");
  });

  it("blocks free user who has exhausted their per-feature preview", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(makeIdentity());
    mocks.prisma.aiTokenUsage.aggregate.mockResolvedValue({ _sum: { totalTokens: 0 } });
    mocks.prisma.aiTokenUsage.count.mockResolvedValue(1); // already used once
    const result = await requirePaidRouteAccess("zari_resume_review");
    expect(result.ok).toBe(false);
    expect(result.response.status).toBe(402);
    const body = await result.response.json();
    expect(body.code).toBe("plan_upgrade_required");
  });

  it("blocks free user who has hit the token limit", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(makeIdentity());
    mocks.prisma.aiTokenUsage.aggregate.mockResolvedValue({ _sum: { totalTokens: 20_000 } }); // over 18k limit
    const result = await requirePaidRouteAccess("zari_resume_review");
    expect(result.ok).toBe(false);
    expect(result.response.status).toBe(429);
    const body = await result.response.json();
    expect(body.code).toBe("credit_limit_reached");
  });
});

describe("requirePaidRouteAccess — plan tier enforcement", () => {
  it("blocks search-plan user from executive features", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(
      makeIdentity({ planName: "Search Monthly", subscriptionStatus: "active" })
    );
    const result = await requirePaidRouteAccess("zari_exec_positioning");
    expect(result.ok).toBe(false);
    expect(result.response.status).toBe(402);
    const body = await result.response.json();
    expect(body.code).toBe("plan_upgrade_required");
    expect(body.requiredPlanId).toBe("executive");
  });

  it("allows executive-plan user to access executive features", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(
      makeIdentity({ planName: "Executive Monthly", subscriptionStatus: "active" })
    );
    const result = await requirePaidRouteAccess("zari_exec_positioning");
    expect(result.ok).toBe(true);
  });

  it("allows executive-plan user to access lower-tier features", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(
      makeIdentity({ planName: "Executive Monthly", subscriptionStatus: "active" })
    );
    for (const feature of ["zari_resume_review", "zari_promotion_readiness", "zari_salary_analysis"]) {
      const result = await requirePaidRouteAccess(feature);
      expect(result.ok).toBe(true);
    }
  });

  it("blocks user with lapsed subscription (past_due)", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(
      makeIdentity({ planName: "Search Monthly", subscriptionStatus: "past_due" })
    );
    const result = await requirePaidRouteAccess("zari_exec_positioning");
    expect(result.ok).toBe(false);
  });
});

describe("requirePaidRouteAccess — admin bypass", () => {
  it("admin bypasses plan gating for all features including executive", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(makeIdentity({ role: "admin" }));
    const features = [
      "zari_exec_positioning",
      "zari_market_intel",
      "zari_chat",
      "zari_salary_analysis",
      "zari_resume_review",
    ];
    for (const feature of features) {
      const result = await requirePaidRouteAccess(feature);
      expect(result.ok).toBe(true);
    }
  });

  it("support role bypasses plan gating", async () => {
    mocks.getPlatformIdentityByUserId.mockResolvedValue(makeIdentity({ role: "support" }));
    const result = await requirePaidRouteAccess("zari_exec_positioning");
    expect(result.ok).toBe(true);
  });
});

describe("requirePaidRouteAccess — service failure handling", () => {
  it("billing catches DB errors and fails open — falls through to plan check with no plan info", async () => {
    // billing.ts catches the getPlatformIdentityByUserId error and returns ok:true with null
    // identity. With no plan info, the plan check fails with 402 (not 503 — billing does not
    // re-throw; it intentionally avoids hard errors to prevent infrastructure outages from
    // locking users out, but can't grant access without plan verification).
    mocks.getPlatformIdentityByUserId.mockRejectedValue(new Error("DB connection failed"));
    const result = await requirePaidRouteAccess("zari_exec_positioning");
    expect(result.ok).toBe(false);
    expect(result.response.status).toBe(402);
  });

  it("when DB is not ready getCurrentSubscriptionAccess returns anonymous access — plan check fails without plan info", async () => {
    // When isDatabaseReady() is false, billing returns {ok:true, user:null, account:null,
    // subscription:null} with no isFreeTier flag. The plan check runs with null planId → 402.
    mocks.isDatabaseReady.mockReturnValue(false);
    const result = await requirePaidRouteAccess("zari_exec_positioning");
    expect(result.ok).toBe(false);
    expect(result.response.status).toBe(402);
  });
});
