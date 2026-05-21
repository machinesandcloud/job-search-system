import { describe, it, expect } from "vitest";
import {
  normalizeProductPlanId,
  getPlanRank,
  getRequiredPlanForStage,
  getRequiredPlanForFeature,
  canAccessStage,
  canAccessFeature,
  getPlanDisplayName,
  getUpgradePrompt,
  FREE_ACCESSIBLE_FEATURES,
  FREE_TOKEN_LIMIT,
  FREE_MAX_USES_PER_FEATURE,
} from "./plan-entitlements";

describe("normalizeProductPlanId", () => {
  it("normalizes known plan IDs", () => {
    expect(normalizeProductPlanId("search")).toBe("search");
    expect(normalizeProductPlanId("growth")).toBe("growth");
    expect(normalizeProductPlanId("executive")).toBe("executive");
  });

  it("normalizes legacy aliases", () => {
    expect(normalizeProductPlanId("pro")).toBe("growth");
    expect(normalizeProductPlanId("premium")).toBe("executive");
    expect(normalizeProductPlanId("team")).toBe("executive");
  });

  it("is case-insensitive", () => {
    expect(normalizeProductPlanId("SEARCH")).toBe("search");
    expect(normalizeProductPlanId("Growth")).toBe("growth");
  });

  it("returns null for unknown values", () => {
    expect(normalizeProductPlanId("free")).toBeNull();
    expect(normalizeProductPlanId("unknown")).toBeNull();
    expect(normalizeProductPlanId("")).toBeNull();
    expect(normalizeProductPlanId(null)).toBeNull();
    expect(normalizeProductPlanId(undefined)).toBeNull();
  });
});

describe("getPlanRank", () => {
  it("returns correct ranks in ascending order", () => {
    expect(getPlanRank("search")).toBeLessThan(getPlanRank("growth"));
    expect(getPlanRank("growth")).toBeLessThan(getPlanRank("executive"));
  });

  it("returns 0 for null/undefined (no plan)", () => {
    expect(getPlanRank(null)).toBe(0);
    expect(getPlanRank(undefined)).toBe(0);
    expect(getPlanRank("")).toBe(0);
  });
});

describe("getRequiredPlanForStage", () => {
  it("returns search for job-search stage", () => {
    expect(getRequiredPlanForStage("job-search")).toBe("search");
  });

  it("returns growth for promotion/salary/career-change stages", () => {
    expect(getRequiredPlanForStage("promotion")).toBe("growth");
    expect(getRequiredPlanForStage("salary")).toBe("growth");
    expect(getRequiredPlanForStage("career-change")).toBe("growth");
  });

  it("returns executive for leadership stage", () => {
    expect(getRequiredPlanForStage("leadership")).toBe("executive");
  });

  it("returns null for unknown stage", () => {
    expect(getRequiredPlanForStage("unknown")).toBeNull();
    expect(getRequiredPlanForStage(null)).toBeNull();
    expect(getRequiredPlanForStage(undefined)).toBeNull();
  });
});

describe("getRequiredPlanForFeature", () => {
  it("returns correct plan for executive-only features", () => {
    expect(getRequiredPlanForFeature("zari_exec_positioning")).toBe("executive");
    expect(getRequiredPlanForFeature("zari_market_intel")).toBe("executive");
  });

  it("returns growth for growth-only features", () => {
    expect(getRequiredPlanForFeature("zari_chat")).toBe("growth");
    expect(getRequiredPlanForFeature("zari_negotiation_sim")).toBe("growth");
    expect(getRequiredPlanForFeature("zari_promotion_readiness")).toBe("growth");
    expect(getRequiredPlanForFeature("zari_salary_analysis")).toBe("growth");
    expect(getRequiredPlanForFeature("zari_pivot_analysis")).toBe("growth");
  });

  it("returns search for search-tier features", () => {
    expect(getRequiredPlanForFeature("zari_resume_review")).toBe("search");
    expect(getRequiredPlanForFeature("zari_linkedin_review")).toBe("search");
    expect(getRequiredPlanForFeature("zari_cover_letter")).toBe("search");
  });

  it("returns search as default for unknown feature names", () => {
    expect(getRequiredPlanForFeature("completely_unknown_feature")).toBe("search");
  });

  it("returns null for empty feature name", () => {
    expect(getRequiredPlanForFeature(null)).toBeNull();
    expect(getRequiredPlanForFeature(undefined)).toBeNull();
    expect(getRequiredPlanForFeature("")).toBeNull();
  });
});

describe("canAccessFeature", () => {
  it("grants access when user plan meets requirement", () => {
    expect(canAccessFeature({ planId: "growth", featureName: "zari_promotion_readiness" }).ok).toBe(true);
    expect(canAccessFeature({ planId: "executive", featureName: "zari_exec_positioning" }).ok).toBe(true);
    expect(canAccessFeature({ planId: "executive", featureName: "zari_chat" }).ok).toBe(true);
  });

  it("denies access when user plan is below requirement", () => {
    expect(canAccessFeature({ planId: "search", featureName: "zari_promotion_readiness" }).ok).toBe(false);
    expect(canAccessFeature({ planId: "search", featureName: "zari_exec_positioning" }).ok).toBe(false);
    expect(canAccessFeature({ planId: "growth", featureName: "zari_exec_positioning" }).ok).toBe(false);
    expect(canAccessFeature({ planId: null, featureName: "zari_resume_review" }).ok).toBe(false);
  });

  it("grants admin role full access regardless of plan", () => {
    expect(canAccessFeature({ planId: null, role: "admin", featureName: "zari_exec_positioning" }).ok).toBe(true);
    expect(canAccessFeature({ planId: "search", role: "admin", featureName: "zari_market_intel" }).ok).toBe(true);
  });

  it("grants support role full access regardless of plan", () => {
    expect(canAccessFeature({ planId: null, role: "support", featureName: "zari_exec_positioning" }).ok).toBe(true);
  });

  it("does not grant regular user role admin access", () => {
    expect(canAccessFeature({ planId: "search", role: "user", featureName: "zari_exec_positioning" }).ok).toBe(false);
    expect(canAccessFeature({ planId: "search", role: "member", featureName: "zari_exec_positioning" }).ok).toBe(false);
  });

  it("returns required planId in the response for upgrade prompts", () => {
    const result = canAccessFeature({ planId: "search", featureName: "zari_exec_positioning" });
    expect(result.ok).toBe(false);
    expect(result.requiredPlanId).toBe("executive");
    expect(result.currentPlanId).toBe("search");
  });
});

describe("canAccessStage", () => {
  it("grants access when plan meets stage requirement", () => {
    expect(canAccessStage({ planId: "growth", stage: "promotion" }).ok).toBe(true);
    expect(canAccessStage({ planId: "executive", stage: "leadership" }).ok).toBe(true);
  });

  it("denies access when plan is below stage requirement", () => {
    expect(canAccessStage({ planId: "search", stage: "promotion" }).ok).toBe(false);
    expect(canAccessStage({ planId: "growth", stage: "leadership" }).ok).toBe(false);
  });

  it("admin bypasses stage gates", () => {
    expect(canAccessStage({ planId: null, role: "admin", stage: "leadership" }).ok).toBe(true);
  });
});

describe("FREE_ACCESSIBLE_FEATURES", () => {
  it("includes job-search basics", () => {
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_resume_review")).toBe(true);
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_linkedin_review")).toBe(true);
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_cover_letter")).toBe(true);
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_interview")).toBe(true);
  });

  it("excludes premium features", () => {
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_chat")).toBe(false);
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_speak")).toBe(false);
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_negotiation_sim")).toBe(false);
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_promotion_readiness")).toBe(false);
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_salary_analysis")).toBe(false);
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_exec_positioning")).toBe(false);
    expect(FREE_ACCESSIBLE_FEATURES.has("zari_market_intel")).toBe(false);
  });
});

describe("free tier constants", () => {
  it("FREE_TOKEN_LIMIT is a positive number", () => {
    expect(FREE_TOKEN_LIMIT).toBeGreaterThan(0);
  });

  it("FREE_MAX_USES_PER_FEATURE is 1", () => {
    expect(FREE_MAX_USES_PER_FEATURE).toBe(1);
  });
});

describe("getPlanDisplayName", () => {
  it("returns human-readable names", () => {
    expect(getPlanDisplayName("search")).toBe("Search");
    expect(getPlanDisplayName("growth")).toBe("Growth");
    expect(getPlanDisplayName("executive")).toBe("Executive");
  });

  it("returns fallback for null/unknown", () => {
    expect(getPlanDisplayName(null)).toBe("paid");
    expect(getPlanDisplayName("unknown")).toBe("paid");
  });
});

describe("getUpgradePrompt", () => {
  it("mentions the required plan name", () => {
    const prompt = getUpgradePrompt({ featureName: "zari_exec_positioning" });
    expect(prompt).toMatch(/executive/i);
  });

  it("uses stage-based messaging when requiredPlanId matches the stage plan", () => {
    const prompt = getUpgradePrompt({ stage: "promotion", requiredPlanId: "growth" });
    expect(prompt).toMatch(/stage/i);
    expect(prompt).toMatch(/growth/i);
  });

  it("returns generic fallback for unknown feature", () => {
    const prompt = getUpgradePrompt({ featureName: null });
    expect(typeof prompt).toBe("string");
    expect(prompt.length).toBeGreaterThan(0);
  });
});
