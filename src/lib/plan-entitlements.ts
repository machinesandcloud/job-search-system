import type { PricingPlanId } from "@/lib/pricing-catalog";

export type ProductPlanId = PricingPlanId;
export type CareerStage = "job-search" | "promotion" | "salary" | "career-change" | "leadership";

export type AccessDecision = {
  ok: boolean;
  currentPlanId: ProductPlanId | null;
  requiredPlanId: ProductPlanId | null;
};

const PLAN_RANK: Record<ProductPlanId, number> = {
  search: 1,
  growth: 2,
  executive: 3,
};

const STAGE_REQUIRED_PLAN: Record<CareerStage, ProductPlanId> = {
  "job-search": "search",
  promotion: "growth",
  salary: "growth",
  "career-change": "growth",
  leadership: "executive",
};

const FEATURE_REQUIRED_PLAN: Record<string, ProductPlanId> = {
  documents_list: "search",
  documents_upload: "search",
  sessions_list: "search",
  sessions_create: "search",
  sessions_complete: "search",
  sessions_events: "search",
  zari_resume_review: "search",
  zari_resume_power_optimize: "search",
  zari_resume_rewrite_section: "search",
  zari_resume_magic_write: "search",
  zari_linkedin: "search",
  zari_linkedin_review: "search",
  zari_linkedin_parse_profile: "search",
  zari_cover_letter: "search",
  sessions_realtime: "growth",
  sessions_avatar: "growth",
  zari_transcribe: "growth",
  zari_speak: "growth",
  zari_promotion_readiness: "growth",
  zari_promotion_doc: "growth",
  zari_promotion_visibility: "growth",
  zari_salary_analysis: "growth",
  zari_negotiation_sim: "growth",
  zari_negotiation_email: "growth",
  zari_pivot_analysis: "growth",
  zari_pivot_story: "growth",
  zari_bridge_network: "growth",
  zari_credibility_sprint: "growth",
  zari_exec_positioning: "executive",
  zari_market_intel: "executive",
};

function normalizeString(value?: string | null) {
  return `${value || ""}`.trim().toLowerCase();
}

export function normalizeProductPlanId(value?: string | null): ProductPlanId | null {
  const normalized = normalizeString(value);
  if (!normalized) return null;
  if (normalized === "search") return "search";
  if (normalized === "growth" || normalized === "pro") return "growth";
  if (normalized === "executive" || normalized === "premium" || normalized === "team") return "executive";
  return null;
}

export function getPlanRank(value?: string | null) {
  const planId = normalizeProductPlanId(value);
  return planId ? PLAN_RANK[planId] : 0;
}

export function getRequiredPlanForStage(stage?: string | null): ProductPlanId | null {
  const normalized = normalizeString(stage) as CareerStage;
  return STAGE_REQUIRED_PLAN[normalized] || null;
}

export function getRequiredPlanForFeature(featureName?: string | null, stage?: string | null): ProductPlanId | null {
  const normalizedFeature = normalizeString(featureName);
  if (!normalizedFeature) return null;

  if (normalizedFeature === "zari_chat" || normalizedFeature === "zari_plan" || normalizedFeature === "zari_interview") {
    return getRequiredPlanForStage(stage) || "search";
  }

  return FEATURE_REQUIRED_PLAN[normalizedFeature] || "search";
}

export function canAccessStage(input: {
  planId?: string | null;
  role?: string | null;
  stage?: string | null;
}): AccessDecision {
  const role = normalizeString(input.role);
  if (role === "admin" || role === "support") {
    return { ok: true, currentPlanId: normalizeProductPlanId(input.planId), requiredPlanId: null };
  }

  const currentPlanId = normalizeProductPlanId(input.planId);
  const requiredPlanId = getRequiredPlanForStage(input.stage);
  if (!requiredPlanId) {
    return { ok: true, currentPlanId, requiredPlanId: null };
  }

  return {
    ok: getPlanRank(currentPlanId) >= getPlanRank(requiredPlanId),
    currentPlanId,
    requiredPlanId,
  };
}

export function canAccessFeature(input: {
  planId?: string | null;
  role?: string | null;
  featureName?: string | null;
  stage?: string | null;
}): AccessDecision {
  const role = normalizeString(input.role);
  if (role === "admin" || role === "support") {
    return { ok: true, currentPlanId: normalizeProductPlanId(input.planId), requiredPlanId: null };
  }

  const currentPlanId = normalizeProductPlanId(input.planId);
  const requiredPlanId = getRequiredPlanForFeature(input.featureName, input.stage);
  if (!requiredPlanId) {
    return { ok: true, currentPlanId, requiredPlanId: null };
  }

  return {
    ok: getPlanRank(currentPlanId) >= getPlanRank(requiredPlanId),
    currentPlanId,
    requiredPlanId,
  };
}

export function getPlanDisplayName(planId?: string | null) {
  const normalized = normalizeProductPlanId(planId);
  if (normalized === "search") return "Search";
  if (normalized === "growth") return "Growth";
  if (normalized === "executive") return "Executive";
  return "paid";
}

export function getUpgradePrompt(input: {
  featureName?: string | null;
  stage?: string | null;
  requiredPlanId?: string | null;
}) {
  const requiredPlanId = normalizeProductPlanId(input.requiredPlanId) || getRequiredPlanForFeature(input.featureName, input.stage);
  if (!requiredPlanId) return "Upgrade required.";
  const planName = getPlanDisplayName(requiredPlanId);
  const stage = getRequiredPlanForStage(input.stage);
  if (stage && stage === requiredPlanId) {
    return `Upgrade to ${planName} to unlock this stage.`;
  }
  return `Upgrade to ${planName} to use this feature.`;
}
