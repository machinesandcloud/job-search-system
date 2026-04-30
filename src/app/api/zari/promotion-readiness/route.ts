import { NextResponse } from "next/server";

import { requirePaidRouteAccess } from "@/lib/billing";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

type PromotionReadinessVerdict = "Ready now" | "Close, but not airtight" | "Needs more proof" | "Too early";
type PromotionAuditTab = "overview" | "gaps" | "plan" | "conversation" | "examples";

type PromotionReadinessBody = {
  currentTitle?: string;
  desiredTitle?: string;
  timeInRole?: string;
  roleDescription?: string;
  rubricClarity?: string;
  recentProjects?: string;
  scopeLevel?: string;
  impactLevel?: string;
  reviewSignal?: string;
  reviewSummary?: string;
  managerSupport?: string;
  visibilityLevel?: string;
  blockers?: string;
};

type ReadinessGap = {
  area: string;
  why: string;
  nextStep: string;
};

type QuickWin = {
  title: string;
  body: string;
  jumpTo: PromotionAuditTab;
};

type ActionPlanItem = {
  label: string;
  action: string;
};

type DimensionReason = {
  label: string;
  score: number;
  reason: string;
};

type ConversationPair = {
  theyMightSay: string;
  yourResponse: string;
};

type LlmPayload = {
  readinessScore?: unknown;
  verdict?: unknown;
  summary?: unknown;
  realityCheck?: unknown;
  scoreReason?: unknown;
  dimensions?: unknown;
  rationale?: unknown;
  strengths?: unknown;
  gaps?: unknown;
  managerQuestions?: unknown;
  nextMoves?: unknown;
  conversationPairs?: unknown;
  quickWins?: unknown;
  evidenceChecklist?: unknown;
  exampleEvidence?: unknown;
  managerPitchExample?: unknown;
  actionPlan?: unknown;
  riskFlags?: unknown;
};

const LABELS = {
  timeInRole: {
    under_6m: "Under 6 months",
    "6_12m": "6 to 12 months",
    "1_2y": "1 to 2 years",
    "2plus_y": "2+ years",
  },
  rubricClarity: {
    exact_rubric: "I have the rubric",
    main_expectations: "I know the main bar",
    some_hints: "I have hints only",
    guessing: "I am mostly guessing",
  },
  scopeLevel: {
    already_next_level: "Already operating at next level",
    bigger_than_role: "Stretching beyond role",
    strong_in_role: "Strong in current role",
    mostly_expected_scope: "Mostly expected scope",
    still_growing: "Still growing into role",
  },
  impactLevel: {
    repeatable_measured: "Repeated and measurable",
    clear_some_measured: "Clear wins, some metrics",
    some_wins: "Good wins, weak proof",
    hard_to_show: "Hard to show impact",
  },
  reviewSignal: {
    explicit_next_level: "Reviews say next-level",
    strong_stretch: "Strong with stretch signals",
    solid_but_neutral: "Solid but neutral",
    mixed: "Mixed signal",
    weak: "Weak signal",
  },
  managerSupport: {
    actively_advocating: "Actively advocating",
    supportive_with_more_proof: "Supportive with more proof",
    unclear: "Unclear",
    skeptical: "Skeptical",
  },
  visibilityLevel: {
    decision_makers_see_it: "Decision-makers see it",
    manager_and_partners: "Manager and partners see it",
    mostly_team: "Mostly team-level visibility",
    low_visibility: "Low visibility",
  },
} as const;

const REQUIRED_DIMENSIONS = [
  "Role fit",
  "Bar clarity",
  "Evidence & impact",
  "Support & visibility",
  "Timing & risk",
] as const;

function trim(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function clip(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length)}…` : value;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function labelFor<T extends keyof typeof LABELS>(group: T, value: string) {
  return LABELS[group][value as keyof (typeof LABELS)[T]] ?? value;
}

function normalizeScore(value: unknown) {
  const parsed = typeof value === "number" ? value : Number.parseInt(cleanString(value), 10);
  if (!Number.isFinite(parsed)) return 50;
  return clamp(Math.round(parsed), 0, 100);
}

function verdictForScore(score: number): PromotionReadinessVerdict {
  if (score >= 84) return "Ready now";
  if (score >= 70) return "Close, but not airtight";
  if (score >= 48) return "Needs more proof";
  return "Too early";
}

function normalizeVerdict(value: unknown, score: number) {
  const cleaned = cleanString(value) as PromotionReadinessVerdict;
  if (cleaned === "Ready now" || cleaned === "Close, but not airtight" || cleaned === "Needs more proof" || cleaned === "Too early") {
    return cleaned;
  }
  return verdictForScore(score);
}

function normalizeStringArray(value: unknown, fallback: string[], min: number, max: number) {
  const items = Array.isArray(value)
    ? value.map(item => cleanString(item)).filter(Boolean).slice(0, max)
    : [];
  return items.length >= min ? items : fallback.slice(0, max);
}

function normalizeGaps(value: unknown, fallback: ReadinessGap[]) {
  if (!Array.isArray(value)) return fallback;
  const gaps = value
    .map(item => {
      if (!item || typeof item !== "object") return null;
      const area = cleanString((item as Record<string, unknown>).area);
      const why = cleanString((item as Record<string, unknown>).why);
      const nextStep = cleanString((item as Record<string, unknown>).nextStep);
      return area && why && nextStep ? { area, why, nextStep } : null;
    })
    .filter(Boolean) as ReadinessGap[];
  return gaps.length >= 3 ? gaps.slice(0, 5) : fallback;
}

function normalizeActionPlan(value: unknown, fallback: ActionPlanItem[]) {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .map(item => {
      if (!item || typeof item !== "object") return null;
      const label = cleanString((item as Record<string, unknown>).label);
      const action = cleanString((item as Record<string, unknown>).action);
      return label && action ? { label, action } : null;
    })
    .filter(Boolean) as ActionPlanItem[];
  return items.length >= 3 ? items.slice(0, 4) : fallback;
}

function normalizeQuickWins(value: unknown, fallback: QuickWin[]) {
  if (!Array.isArray(value)) return fallback;
  const allowed = new Set<PromotionAuditTab>(["overview", "gaps", "plan", "conversation", "examples"]);
  const items = value
    .map(item => {
      if (!item || typeof item !== "object") return null;
      const title = cleanString((item as Record<string, unknown>).title);
      const body = cleanString((item as Record<string, unknown>).body);
      const jumpTo = cleanString((item as Record<string, unknown>).jumpTo) as PromotionAuditTab;
      return title && body && allowed.has(jumpTo) ? { title, body, jumpTo } : null;
    })
    .filter(Boolean) as QuickWin[];
  return items.length >= 3 ? items.slice(0, 3) : fallback;
}

function normalizeConversationPairs(value: unknown, fallback: ConversationPair[]) {
  if (!Array.isArray(value)) return fallback;
  const pairs = value
    .map(item => {
      if (!item || typeof item !== "object") return null;
      const theyMightSay = cleanString((item as Record<string, unknown>).theyMightSay);
      const yourResponse = cleanString((item as Record<string, unknown>).yourResponse);
      return theyMightSay && yourResponse ? { theyMightSay, yourResponse } : null;
    })
    .filter(Boolean) as ConversationPair[];
  return pairs.length >= 3 ? pairs.slice(0, 5) : fallback;
}

function normalizeDimensions(value: unknown, fallbackScore: number) {
  const defaults = REQUIRED_DIMENSIONS.map(label => ({
    label,
    score: fallbackScore,
    reason: "Zari reviewed this area as part of the promotion case.",
  }));

  if (!Array.isArray(value)) return defaults;

  const items = value
    .map(item => {
      if (!item || typeof item !== "object") return null;
      const label = cleanString((item as Record<string, unknown>).label);
      const score = normalizeScore((item as Record<string, unknown>).score);
      const reason = cleanString((item as Record<string, unknown>).reason);
      return label && reason ? { label, score, reason } : null;
    })
    .filter(Boolean) as DimensionReason[];

  if (items.length < 3) return defaults;
  return items.slice(0, 5);
}

function safeParseLlmPayload(reply: string | null) {
  if (!reply) return null;
  const trimmed = reply.trim();
  const candidates = [trimmed];
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace > -1 && lastBrace > firstBrace) {
    candidates.push(trimmed.slice(firstBrace, lastBrace + 1));
  }

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as LlmPayload;
    } catch {
      continue;
    }
  }
  return null;
}

function parsePlainTextCore(reply: string | null): LlmPayload | null {
  if (!reply) return null;
  const text = reply.trim();
  if (!text) return null;

  const scoreMatch = text.match(/readiness\s*score\s*:\s*(\d{1,3})/i) ?? text.match(/score\s*:\s*(\d{1,3})/i);
  const verdictMatch = text.match(/verdict\s*:\s*(.+)/i);
  const summaryMatch = text.match(/summary\s*:\s*([\s\S]*?)(?:\n(?:reality\s*check|score\s*reason|dimensions)\s*:|$)/i);
  const realityMatch = text.match(/reality\s*check\s*:\s*([\s\S]*?)(?:\n(?:score\s*reason|dimensions)\s*:|$)/i);
  const scoreReasonMatch = text.match(/score\s*reason\s*:\s*([\s\S]*?)(?:\n(?:dimensions)\s*:|$)/i);
  const dimensionsBlock = text.match(/dimensions\s*:\s*([\s\S]*)/i)?.[1] ?? "";

  const dimensionLines = dimensionsBlock
    .split("\n")
    .map(line => line.replace(/^[-*\s]+/, "").trim())
    .filter(Boolean)
    .map(line => {
      const match = line.match(/^([^:]+):\s*(\d{1,3})\s*\|\s*(.+)$/);
      if (!match) return null;
      return { label: match[1].trim(), score: Number.parseInt(match[2], 10), reason: match[3].trim() };
    })
    .filter(Boolean);

  if (!scoreMatch || !summaryMatch || !realityMatch || !scoreReasonMatch || dimensionLines.length < 3) {
    return null;
  }

  return {
    readinessScore: Number.parseInt(scoreMatch[1], 10),
    verdict: verdictMatch?.[1]?.trim() ?? "",
    summary: summaryMatch[1].trim(),
    realityCheck: realityMatch[1].trim(),
    scoreReason: scoreReasonMatch[1].trim(),
    dimensions: dimensionLines,
  };
}

function hasStructuredReadinessPayload(parsed: LlmPayload | null) {
  if (!parsed) return false;
  const score = typeof parsed.readinessScore === "number"
    ? parsed.readinessScore
    : Number.parseInt(cleanString(parsed.readinessScore), 10);
  return Number.isFinite(score)
    && Boolean(cleanString(parsed.summary))
    && Boolean(cleanString(parsed.realityCheck))
    && Boolean(cleanString(parsed.scoreReason))
    && Array.isArray(parsed.dimensions) && parsed.dimensions.length >= 5
    && Array.isArray(parsed.rationale) && parsed.rationale.length >= 3
    && Array.isArray(parsed.strengths) && parsed.strengths.length >= 3
    && Array.isArray(parsed.gaps) && parsed.gaps.length >= 3
    && Array.isArray(parsed.managerQuestions) && parsed.managerQuestions.length >= 4
    && Array.isArray(parsed.nextMoves) && parsed.nextMoves.length >= 4
    && Array.isArray(parsed.conversationPairs) && parsed.conversationPairs.length >= 3
    && Array.isArray(parsed.quickWins) && parsed.quickWins.length >= 3
    && Array.isArray(parsed.evidenceChecklist) && parsed.evidenceChecklist.length >= 4
    && Array.isArray(parsed.exampleEvidence) && parsed.exampleEvidence.length >= 3
    && Boolean(cleanString(parsed.managerPitchExample))
    && Array.isArray(parsed.actionPlan) && parsed.actionPlan.length >= 4
    && Array.isArray(parsed.riskFlags) && parsed.riskFlags.length >= 3;
}

function hasCoreReadinessPayload(parsed: LlmPayload | null) {
  if (!parsed) return false;
  const score = typeof parsed.readinessScore === "number"
    ? parsed.readinessScore
    : Number.parseInt(cleanString(parsed.readinessScore), 10);
  return Number.isFinite(score)
    && Boolean(cleanString(parsed.summary))
    && Boolean(cleanString(parsed.realityCheck))
    && Boolean(cleanString(parsed.scoreReason))
    && Array.isArray(parsed.dimensions) && parsed.dimensions.length >= 3;
}

function looksLikeManagerTrack(title: string, roleDescription: string) {
  const haystack = `${title} ${roleDescription}`.toLowerCase();
  return /\b(manager|director|head|leadership|people leader|people management)\b/.test(haystack);
}

function hasLeadershipSignals(value: string) {
  return /\b(led|leading|managed|managing|mentor|mentored|coached|delegated|delegation|hired|performance review|cross-functional|owned strategy|set direction)\b/i.test(value);
}

function isPlaceholderLike(value: string) {
  const cleaned = trim(value).toLowerCase();
  if (!cleaned) return true;
  if (wordCount(cleaned) <= 2 && /\b(na|n\/a|idk|none|nothing|unknown|tbd)\b/.test(cleaned)) return true;
  return /\b(not sure|don’t know|do not know|no idea|n\/a|na|none|nothing yet|unknown|tbd)\b/.test(cleaned);
}

type JumpSeverity = "step" | "leap" | "reinvention";

function detectJumpSeverity(current: string, desired: string): JumpSeverity {
  const cur = current.toLowerCase();
  const des = desired.toLowerCase();
  if (/\b(cto|ceo|coo|cpo|cio|ciso|cfo|cmo|chief\s+\w+\s+officer|chief)\b/.test(des) && !/\b(cto|ceo|coo|cpo|cio|ciso|cfo|cmo|chief)\b/.test(cur)) return "reinvention";
  if (/\bsvp|evp\b|senior vice president/.test(des) && !/\bvp|svp|evp|vice president\b/.test(cur)) return "reinvention";
  if ((/\bvp\b|vice president/.test(des)) && !/\bvp\b|vice president|director|head of/.test(cur)) return "leap";
  if (/\bdirector\b/.test(des) && /\bengineer|analyst|developer|dev\b|designer|specialist|scientist|devops|sre|ops\b/.test(cur) && !/\bdirector|manager|lead|head\b/.test(cur)) return "leap";
  if (/\bmanager\b/.test(des) && !/\bmanager|director|lead|head\b/.test(cur)) return "step";
  if (/\bstaff|principal\b/.test(des) && !/\bstaff|principal|distinguished\b/.test(cur)) return "step";
  return "step";
}

function computeDimensionScores(body: PromotionReadinessBody, jump: JumpSeverity) {
  const jp: Record<JumpSeverity, number> = { step: 0, leap: -12, reinvention: -26 };
  const penalty = jp[jump];

  const roleFit = clamp(({ already_next_level: 86, bigger_than_role: 70, strong_in_role: 52, mostly_expected_scope: 35, still_growing: 20 }[body.scopeLevel ?? ""] ?? 45) + penalty, 8, 95);
  const barClarity = clamp({ exact_rubric: 88, main_expectations: 68, some_hints: 42, guessing: 20 }[body.rubricClarity ?? ""] ?? 38, 8, 95);
  const evidence = clamp(({ repeatable_measured: 84, clear_some_measured: 64, some_wins: 44, hard_to_show: 22 }[body.impactLevel ?? ""] ?? 40) + penalty, 8, 95);

  const supportMatrix: Record<string, Record<string, number>> = {
    actively_advocating:         { decision_makers_see_it: 90, manager_and_partners: 76, mostly_team: 58, low_visibility: 44 },
    supportive_with_more_proof:  { decision_makers_see_it: 72, manager_and_partners: 60, mostly_team: 46, low_visibility: 32 },
    unclear:                     { decision_makers_see_it: 52, manager_and_partners: 42, mostly_team: 34, low_visibility: 22 },
    skeptical:                   { decision_makers_see_it: 36, manager_and_partners: 28, mostly_team: 20, low_visibility: 14 },
  };
  const support = clamp((supportMatrix[body.managerSupport ?? ""]?.[body.visibilityLevel ?? ""] ?? 40) + Math.round(penalty / 2), 8, 95);

  const timing = clamp(({ "2plus_y": 78, "1_2y": 62, "6_12m": 44, under_6m: 24 }[body.timeInRole ?? ""] ?? 50) + penalty, 8, 95);
  return { roleFit, barClarity, evidence, support, timing };
}

function estimateFallbackScore(body: PromotionReadinessBody) {
  let score = 18;
  const add = (v: string | undefined, map: Record<string, number>) => { score += map[v ?? ""] ?? 0; };

  add(body.timeInRole,      { under_6m: 2, "6_12m": 6, "1_2y": 10, "2plus_y": 12 });
  add(body.rubricClarity,   { exact_rubric: 14, main_expectations: 10, some_hints: 5, guessing: 1 });
  add(body.scopeLevel,      { already_next_level: 19, bigger_than_role: 14, strong_in_role: 8, mostly_expected_scope: 4, still_growing: 1 });
  add(body.impactLevel,     { repeatable_measured: 18, clear_some_measured: 12, some_wins: 7, hard_to_show: 2 });
  add(body.reviewSignal,    { explicit_next_level: 14, strong_stretch: 10, solid_but_neutral: 6, mixed: 2, weak: -4 });
  add(body.managerSupport,  { actively_advocating: 13, supportive_with_more_proof: 8, unclear: 3, skeptical: -5 });
  add(body.visibilityLevel, { decision_makers_see_it: 12, manager_and_partners: 8, mostly_team: 4, low_visibility: -3 });

  const rd = trim(body.roleDescription), rp = trim(body.recentProjects), rs = trim(body.reviewSummary), bl = trim(body.blockers);
  if (wordCount(rd) >= 90) score += 3;
  if (wordCount(rp) >= 80) score += 4;
  if (wordCount(rs) >= 30) score += 2;
  if (wordCount(bl) >= 3 && !/\bnone|nothing\b/i.test(bl)) score -= 2;
  if (wordCount(rd) < 30 || isPlaceholderLike(rd)) score -= 16;
  if (wordCount(rp) < 25 || isPlaceholderLike(rp)) score -= 18;
  if (rs && (wordCount(rs) < 8 || isPlaceholderLike(rs))) score -= 5;

  const managerTrack = looksLikeManagerTrack(trim(body.desiredTitle), trim(body.roleDescription));
  if (managerTrack && !hasLeadershipSignals(`${trim(body.recentProjects)} ${trim(body.reviewSummary)}`)) score -= 16;

  const jump = detectJumpSeverity(trim(body.currentTitle), trim(body.desiredTitle));
  if (jump === "reinvention") score -= 22;
  else if (jump === "leap") score -= 12;

  return clamp(score, 8, 92);
}

function buildFallback(body: PromotionReadinessBody & {
  currentTitle: string;
  desiredTitle: string;
}, readinessScore: number) {
  const cur = body.currentTitle || "your current role";
  const target = body.desiredTitle || "the next level";
  const jump = detectJumpSeverity(body.currentTitle || "", body.desiredTitle || "");
  const dim = computeDimensionScores(body, jump);

  const barLabel = body.rubricClarity ? labelFor("rubricClarity", body.rubricClarity) : "unclear";
  const impactLabel = body.impactLevel ? labelFor("impactLevel", body.impactLevel) : "unclear";
  const managerLabel = body.managerSupport ? labelFor("managerSupport", body.managerSupport) : "unclear";
  const visLabel = body.visibilityLevel ? labelFor("visibilityLevel", body.visibilityLevel) : "unknown";
  const timeLabel = body.timeInRole ? labelFor("timeInRole", body.timeInRole) : "unknown";
  const scopeLabel = body.scopeLevel ? labelFor("scopeLevel", body.scopeLevel) : "unclear";
  const reviewLabel = body.reviewSignal ? labelFor("reviewSignal", body.reviewSignal) : "unclear";
  const hasProjects = body.recentProjects && wordCount(trim(body.recentProjects)) > 20;
  const projectSnippet = hasProjects ? `"${clip(trim(body.recentProjects), 80)}"` : "your recent work";

  const summaryByJump: Record<JumpSeverity, string> = {
    reinvention: `The move from ${cur} to ${target} is not a promotion — it is a career reinvention. ${target} requires organizational leadership, executive presence, business strategy ownership, and the ability to operate at board and C-suite level. Technical excellence in ${cur} gets you into the conversation; it does not close it. Your case sits at ${readinessScore}/100 because right now the evidence reflects strong ${cur} execution, not ${target}-level scope.`,
    leap: `Going from ${cur} to ${target} is a significant level jump, not a natural next step. At ${readinessScore}/100, the case has real structural gaps — most importantly around proof that you are already operating at ${target} scope and can show the organizational influence, strategic thinking, and cross-functional leadership that role demands.`,
    step: `Your case for ${target} lands at ${readinessScore}/100. The score reflects what the evidence actually proves today — not what you are capable of or what you are aiming for. The weakest areas are ${dim.roleFit < dim.barClarity ? "how clearly the case reads as next-level scope" : "the clarity of the bar and how tightly your evidence maps to it"}, and those are the things that move the number most.`,
  };

  const realityByJump: Record<JumpSeverity, string> = {
    reinvention: `The gap between ${cur} and ${target} is not just a title change — it is a fundamentally different job. ${target} roles are judged on whether you can run a company function, develop executives, set long-term technical or business direction, and carry credibility with investors, boards, or the full leadership team. Being the best ${cur} in the room is not a credible argument for that. The question is what your evidence shows about operating at that level today.`,
    leap: `Making the case for ${target} from ${cur} means proving you have already been doing ${target}-level work — not that you are ready to try it. Scope, organizational influence, and cross-functional decision-making at the right altitude are what the decision-makers will look for. If the strongest examples still read like excellent ${cur} execution, the case will not hold up.`,
    step: `The question is not whether you do good work. It is whether your evidence reads as clearly next-level to someone who has never seen you in action. If your examples still sound like strong ${cur} performance rather than ${target}-level thinking and scope, the case will not survive a hard calibration.`,
  };

  const scoreReasonByJump: Record<JumpSeverity, string> = {
    reinvention: `The score is this low because the jump from ${cur} to ${target} is enormous. Your impact signal is "${impactLabel}", your scope reads as "${scopeLabel}", and your visibility is "${visLabel}". None of those, individually or together, currently prove the organizational leadership and executive judgment that ${target} demands.`,
    leap: `The score reflects the size of this jump combined with what the evidence actually shows. Scope is "${scopeLabel}", impact is "${impactLabel}", and bar clarity is "${barLabel}". Closing this gap requires proving next-level operating range, not just strong current-level execution.`,
    step: `I scored what you gave me — not the version of you that might exist in your head. Scope is "${scopeLabel}", impact is "${impactLabel}", bar clarity is "${barLabel}", and support is "${managerLabel}". Those signals together produce this number. The written proof and the clarity of how it maps to the ${target} bar are what move it.`,
  };

  const gapsByJump: Record<JumpSeverity, { area: string; why: string; nextStep: string }[]> = {
    reinvention: [
      { area: "Executive leadership proof", why: `${target} requires evidence of organizational leadership at scale — setting direction for a function, developing other leaders, and operating with board or C-suite-level accountability. Your current evidence as a ${cur} does not yet demonstrate this.`, nextStep: `Document any experience leading orgs, setting company-level technical or product strategy, or managing managers. If that experience does not exist yet, you need to build it before the ${target} case becomes credible.` },
      { area: "Scope of decision-making", why: `The decisions that matter for ${target} are ones that shape the direction of the business, not just deliver within it. Right now your scope reads as "${scopeLabel}", which is ${dim.roleFit < 50 ? "below" : "at"} what a ${target} candidate needs to show.`, nextStep: "Find examples where your decisions changed the direction of something beyond your immediate team or product area. If none exist, that is the gap to close first." },
      { area: "External and executive visibility", why: `${target}-level candidates are usually known beyond their immediate manager — by the board, investors, or the full leadership team. Your visibility is currently "${visLabel}", which limits how many people can defend the case.`, nextStep: "Start building relationships and presence at the level above your current visibility ceiling. This is a long-term move, not a quick fix." },
    ],
    leap: [
      { area: "Operating scope", why: `${target} candidates need to show they are already working at that level — not just aspiring to it. Your current scope reads as "${scopeLabel}", and the gap to ${target} is real.`, nextStep: `Find or create opportunities to operate at ${target} scope before the ask. Proof that you already do the job makes the case far stronger than proof that you are ready to try.` },
      { area: "Evidence quality", why: `Your impact signal is "${impactLabel}". For a jump to ${target}, reviewers need to see business outcomes at significant scale — not just team wins or solid project delivery.`, nextStep: "Identify your three strongest examples and stress-test each one: does it prove next-level scope, judgment, and outcome? If not, sharpen it or find a better one." },
      { area: "Decision-maker visibility", why: `With visibility at "${visLabel}", the people who need to believe this case may not have enough direct exposure to your work to feel confident backing it.`, nextStep: "Get your work in front of the right people through legitimate channels — project readouts, cross-functional partnerships, or skip-level conversations where your work gets direct exposure." },
    ],
    step: [
      { area: "Proof quality", why: `Your impact reads as "${impactLabel}". The difference between ${cur} and ${target} often comes down to whether your evidence shows ownership, judgment, and scope beyond execution.`, nextStep: `Rewrite ${projectSnippet} to surface the decisions, stakes, and outcomes that prove next-level operating. Remove anything that sounds like activity.` },
      { area: "Bar clarity", why: `Your clarity on the ${target} bar is "${barLabel}". If you are fuzzy on what exactly is expected, you cannot tell how close or far you actually are.`, nextStep: "Get the clearest possible version of the next-level expectations — from your manager, skip-level, or internal rubrics — and map your strongest evidence against them explicitly." },
      { area: "Support and advocacy", why: `Your manager support is "${managerLabel}" and visibility is "${visLabel}". The case can be strong and still stall if the right people cannot repeat it upward with confidence.`, nextStep: "Pressure-test whether your manager is genuinely prepared to advocate, and whether the people who influence the decision have seen enough of your work to do the same." },
    ],
  };

  const managerPitchByJump: Record<JumpSeverity, string> = {
    reinvention: `I want a direct conversation about what a credible path to ${target} actually looks like from where I am as a ${cur}. I am not looking for encouragement. I want to know what the real gap is — what evidence of organizational leadership, executive scope, and strategic impact would need to exist before this becomes a defensible case — and whether you think that gap is closeable in a realistic timeframe.`,
    leap: `I want to pressure-test whether the case for ${target} is real or still premature. I can walk you through the strongest proof I have around scope and impact, and I want your honest read on how close it actually lands. Specifically, I want to know what still reads as ${cur}-level thinking and what I would need to show to close that gap.`,
    step: `I want to check whether my case for ${target} is actually ready or whether I am overestimating it. I am not looking for reassurance — I want the blunt version of what already reads as next-level and what still does not. If the timing is wrong, I would rather know now and work against the real gaps than push and get blocked.`,
  };

  const weakestDimKey = Object.entries(dim).sort((a, b) => a[1] - b[1])[0][0];
  const weakestLabel = { roleFit: "how your scope reads", barClarity: "bar clarity", evidence: "your impact evidence", support: "manager and decision-maker support", timing: "timing" }[weakestDimKey] ?? "your weakest area";

  const quickWins = [
    {
      title: jump === "reinvention" ? "Prove executive scope" : "Start with the gaps",
      body: jump === "reinvention"
        ? `The weakest part of the case is organizational leadership proof. Start building or documenting that before anything else.`
        : `Fix ${weakestLabel} first — that is where the case collapses under pressure.`,
      jumpTo: "gaps" as const,
    },
    {
      title: "Pressure-test support",
      body: `With support at ${dim.support < 50 ? "a concerning level" : "a reasonable level"}, you need a direct conversation before you assume the backing is real.`,
      jumpTo: "conversation" as const,
    },
    {
      title: "Sharpen the evidence",
      body: `Impact reads as "${impactLabel}". The strongest moves in the fix are about making your proof harder to challenge, not adding more of it.`,
      jumpTo: "plan" as const,
    },
  ];

  const evidenceChecklistByJump: Record<JumpSeverity, string[]> = {
    reinvention: [
      `Show organizational leadership: who did you develop, what direction did you set, what did leadership change because of your judgment?`,
      `Show business-level impact, not team-level impact: what changed at the company or function level because of decisions you made?`,
      `Show executive presence: can you operate with boards, investors, or the full leadership team with credibility?`,
      `Show that other leaders trust your technical and strategic judgment — not just your individual output.`,
    ],
    leap: [
      `Prove you are already operating at ${target} scope — not planning to. Find examples where you did the actual job at the higher level.`,
      `Show organizational influence: outcomes that happened because of your decisions, not just your execution.`,
      `Show cross-functional impact at significant scale — not just team collaboration.`,
      `Make the business effect of each example impossible to miss — outcomes, stakes, and why it mattered to leadership.`,
    ],
    step: [
      "Every example must show ownership, scope, and business effect — not just completion and effort.",
      `Tie your strongest win in ${projectSnippet} to a specific outcome that mattered beyond your immediate team.`,
      "Make next-level judgment visible: where did you take ownership of an ambiguous or high-stakes decision?",
      `Show the bar clearly: which ${target} expectations does each example satisfy, and which ones does it fall short of?`,
    ],
  };

  const exampleEvidenceByJump: Record<JumpSeverity, string[]> = {
    reinvention: [
      `I set the technical or product direction for an area of the business and the outcome changed how leadership made decisions about resourcing or strategy.`,
      `I built or transformed a team or function — not just led a project — and the results were defensible to leadership, investors, or the board.`,
      `I operated at the level above my title, and the people at that level treated my judgment as equivalent to theirs in high-stakes decisions.`,
    ],
    leap: [
      `I owned a high-stakes outcome that crossed team or org boundaries, and what changed because of my decisions is clear and specific.`,
      `I made decisions that a director or VP would normally make, and the outcome justified the trust — with evidence other people can repeat.`,
      `I drove cross-functional alignment on something complex and the result mattered at a level the business cared about.`,
    ],
    step: [
      `On ${projectSnippet}, the decision I made that reads as next-level is [specific decision] — and the outcome was [specific measurable result].`,
      `I operated beyond my formal scope when [specific situation], took ownership of [specific outcome], and the result changed [specific thing].`,
      `The proof that this is not just strong ${cur} execution is [specific evidence of scope, judgment, or business impact beyond the expected level].`,
    ],
  };

  const conversationPairs: ConversationPair[] = jump === "reinvention" ? [
    {
      theyMightSay: `${target} is a very different job from ${cur}. What makes you think you’re ready for that level?`,
      yourResponse: `I do not think I am fully ready yet — that is why I want to have this conversation. What I want to understand is what proof of organizational leadership and executive scope would need to exist before this becomes a defensible case. I want to work backward from that bar, not forward from where I am.`,
    },
    {
      theyMightSay: `Your technical depth is strong, but I’m not sure it translates to the organizational and strategic demands of ${target}.`,
      yourResponse: `That is a fair challenge. The question is whether I have shown enough evidence of organizational scope and business-level judgment, not just technical execution. I want to map my strongest examples against what you think the real ${target} bar looks like and hear directly where the gaps are.`,
    },
    {
      theyMightSay: "I’d need to see you operating at a much bigger level before I could support this.",
      yourResponse: `I agree that the bar is higher than where I am today. What I want to know is whether the path is realistic given my current role and what evidence would be most convincing. I would rather build toward the right thing than guess at what matters.`,
    },
    {
      theyMightSay: `The visibility at ${visLabel} level is not enough for a ${target} case. I can’t fully back someone leadership hasn’t seen operate.`,
      yourResponse: `That is one of the clearest gaps in my case right now. What would the right kind of visibility look like — specific people, specific contexts, or specific proof points I should be getting in front of them?`,
    },
  ] : jump === "leap" ? [
    {
      theyMightSay: `This feels like a bigger jump than you might realize. What makes you confident the case is ready now?`,
      yourResponse: `I am not entirely confident it is ready — that is part of why I want a direct conversation. What I want to pressure-test is whether my strongest examples around scope and impact already read as ${target}-level or whether they still sound like excellent ${cur} work. I want your honest read on that.`,
    },
    {
      theyMightSay: `Your impact has been strong but mostly at the team level. ${target} needs to see organizational scope.`,
      yourResponse: `That is the gap I want to close specifically. My strongest cross-org example is around ${projectSnippet}. I want to know if that reads as the right kind of scope or whether I need to find a bigger example before the case becomes defensible.`,
    },
    {
      theyMightSay: "I’d want to see more sustained evidence of operating above your level before I could support this.",
      yourResponse: `I understand. What specific behaviors, decisions, or outcomes would count as that evidence in your read? I would rather know what "sustained" means to you than assume I am on track when I might not be.`,
    },
    {
      theyMightSay: `Support at ${managerLabel} level might not be enough to carry this through calibration.`,
      yourResponse: `That is something I want to address directly. Who else needs to see stronger evidence, and what is the best way for me to get my work in front of those people through real work rather than just asking for face time?`,
    },
  ] : [
    {
      theyMightSay: `You’re doing strong work, but I’m not convinced you’re operating at ${target} level consistently yet.`,
      yourResponse: `I want to test that directly. The examples I would lead with are around ${projectSnippet}. Can you tell me where that reads as next-level and where it still sounds like strong ${cur} execution? I want the specific feedback, not the general read.`,
    },
    {
      theyMightSay: "What’s the strongest proof point you have that you’re ready for this level?",
      yourResponse: `The example I would lead with is ${projectSnippet}. The reason I think it reads as ${target}-level is [specific ownership, decision, outcome]. I want to hear whether that lands that way to you or whether the case needs a stronger example.`,
    },
    {
      theyMightSay: "Your bar clarity is still developing — I’m not sure you know exactly what’s expected at the next level.",
      yourResponse: `That is one of the things I want your help with. My current read on the bar is "${barLabel}". I would rather map my proof against what you think the actual expectations are than keep calibrating against my own guess. What should the strongest ${target} case look like to you?`,
    },
    {
      theyMightSay: `The timing feels slightly premature. I’d want to see this for one more cycle.`,
      yourResponse: `I can accept that — I just want to know what specifically would be different after one more cycle. Is it a single missing proof point, a visibility gap, or something about the consistency of the evidence? I would rather leave with a specific target than a general "not yet."`,
    },
  ];

  const actionPlanByJump: Record<JumpSeverity, { label: string; action: string }[]> = {
    reinvention: [
      { label: "This week", action: `Have a direct conversation about whether the ${target} path is realistic from ${cur} and what the organizational leadership proof bar actually requires. Leave with specific criteria, not encouragement.` },
      { label: "Next 30 days", action: "Identify experiences that prove leadership at an organizational level — people development, function-setting, business-level decisions — and document them in a way that would survive scrutiny from a board or executive team." },
      { label: "This quarter", action: "Build visibility beyond your manager by getting your work, your judgment, and your strategic thinking in front of the people who would need to believe the case before they would support it." },
      { label: "Before the ask", action: "Do not make a formal push for the role until the organizational leadership evidence exists and the right people have seen enough of your work to defend it independently." },
    ],
    leap: [
      { label: "This week", action: `Rewrite your three strongest examples around ${projectSnippet} to surface the organizational scope, decisions, and business impact — not just the delivery. Test whether each one reads as ${target}-level or still sounds like great ${cur} work.` },
      { label: "Next 30 days", action: `Close the biggest gap in ${weakestLabel}. If it is scope, find or create a concrete opportunity to operate at ${target} level. If it is visibility, get your work in front of the right people through real work.` },
      { label: "This quarter", action: "Have a direct, specific promotion-readiness conversation with your manager — not a general check-in. Come with the evidence, ask for the specific gaps, and leave with a clear bar and a timeline." },
      { label: "Before the ask", action: "Confirm that your manager is genuinely prepared to defend the case, not just supportive in the abstract. If the backing is soft, close that gap before you push timing." },
    ],
    step: [
      { label: "This week", action: `Take ${projectSnippet} and rewrite the strongest outcome as a proof point — ownership, decision, business effect, why it matters at the ${target} level. That one example done well is more useful than polishing five weak ones.` },
      { label: "Next 2 weeks", action: `Address ${weakestLabel} directly. Get the real bar from your manager or internal rubric, map your evidence against it specifically, and identify the single most important gap to close first.` },
      { label: "This cycle", action: "Make the case more visible to the people who actually influence the promotion call. Not through self-promotion, but through getting work in front of them that they can judge firsthand." },
      { label: "Before the ask", action: "Leave your next manager conversation with three clear things: the proof that already reads as next-level, the specific gap still missing, and a realistic timing signal." },
    ],
  };

  const riskFlagsByJump: Record<JumpSeverity, string[]> = {
    reinvention: [
      `The gap between ${cur} and ${target} is structural, not incremental. Technical credibility alone does not make the case — you need proof of organizational leadership that most ${cur} roles do not naturally produce.`,
      "If the people who need to support this have not seen you operate at the level the role requires, the backing will evaporate when it matters.",
      "Pushing before the organizational evidence exists makes the ask harder to land, not easier.",
    ],
    leap: [
      `Strong ${cur} execution looks different from ${target} scope to a calibration committee. The risk is having evidence that sounds impressive but still reads as one level below where it needs to be.`,
      `With support at "${managerLabel}", the backing may not hold under the scrutiny that a ${target} promotion typically gets.`,
      "Moving too fast without the right visibility means the decision-makers will not have enough direct proof to feel confident supporting it.",
    ],
    step: [
      `Bar clarity at "${barLabel}" means you may be over-crediting parts of the case that do not actually meet the ${target} bar. Get the real criteria before you finalize the evidence.`,
      `Impact at "${impactLabel}" means the evidence needs to be sharper, not just present. The risk is having the right stories but telling them at the wrong altitude.`,
      "Good performers still get blocked when the case is easy to question. Make sure every example would survive a hard challenge on ownership, scope, and business effect.",
    ],
  };

  return {
    summary: summaryByJump[jump],
    realityCheck: realityByJump[jump],
    scoreReason: scoreReasonByJump[jump],
    rationale: [
      `The case for ${target} from ${cur} requires proving ${jump === "reinvention" ? "organizational leadership and executive judgment" : jump === "leap" ? "you are already operating at that level" : "the evidence reads as next-level, not just strong at your current level"}.`,
      `Your impact signal is "${impactLabel}" and your scope reads as "${scopeLabel}" — those two signals together define how much work the case still needs.`,
      `Visibility at "${visLabel}" and manager support at "${managerLabel}" determine whether the right people can repeat the case upward without needing you in the room.`,
    ],
    strengths: [
      reviewLabel && reviewLabel !== "unclear" ? `Your review signal reads as "${reviewLabel}" — that is the most credible external proof source you have, and it matters.` : `You are clear-eyed enough about the gap to get a real diagnosis instead of just looking for validation.`,
      body.managerSupport === "actively_advocating" ? "Your manager is actively advocating — that is rare and meaningful. Do not waste it by presenting a case that is harder to defend than it needs to be." : `You have ${timeLabel} in this role, which means the evidence base is real, not thin.`,
      hasProjects ? `You have specific project work to point to in ${projectSnippet} — that is a better foundation than vague claims about general contributions.` : "You know exactly what role you are targeting, which makes the gap analysis possible.",
    ],
    gaps: gapsByJump[jump],
    conversationPairs,
    managerQuestions: [
      `If you had to defend my case for ${target} to the decision-makers right now, what specific proof would be hardest to justify?`,
      `Which parts of ${projectSnippet} already read as ${target}-level work to you, and which parts still sound like strong ${cur} execution?`,
      jump === "reinvention"
        ? `What does a credible ${target} candidate from an ${cur} background actually need to prove — and how far do you think I am from that bar?`
        : `What would change the timing from "not yet" to "this cycle" — is it one missing proof point, a visibility gap, or something else entirely?`,
      "Who else besides you needs to see stronger evidence before my promotion becomes easy to support in calibration — and how do I get my work in front of them through real work?",
    ],
    nextMoves: [
      `Take the strongest example from ${projectSnippet} and rewrite it so the ownership, decision, and business effect are impossible to miss.`,
      `Address ${weakestLabel} directly this week — that is the part of the case that would collapse first under real scrutiny.`,
      "Get a direct read from your manager on where the case is most vulnerable, not the general ‘you’re doing great’ version.",
      "Make sure the people who influence the decision have seen enough of your work firsthand to say something specific — not just be vaguely supportive.",
    ],
    quickWins,
    evidenceChecklist: evidenceChecklistByJump[jump],
    exampleEvidence: exampleEvidenceByJump[jump],
    managerPitchExample: managerPitchByJump[jump],
    actionPlan: actionPlanByJump[jump],
    riskFlags: riskFlagsByJump[jump],
    dimensions: [
      { label: "Role fit", score: dim.roleFit, reason: jump === "reinvention" ? `The scope gap between ${cur} and ${target} is substantial. Your current scope reads as "${scopeLabel}", and ${target} requires organizational leadership and executive-level operating range well beyond that.` : `Your scope reads as "${scopeLabel}". ${dim.roleFit < 55 ? `For ${target}, you need evidence that you are already operating above that level — not just aspiring to.` : `That is a reasonable foundation for the case, but it needs to be backed by clear outcome evidence to hold up.`}` },
      { label: "Bar clarity", score: dim.barClarity, reason: `Your clarity on the ${target} bar is "${barLabel}". ${dim.barClarity < 50 ? `That is one of the highest-risk gaps in your case — if you are guessing what the bar is, you cannot accurately judge how far your evidence actually goes.` : `That clarity helps, but make sure the criteria you think matter are the ones that actually move the decision.`}` },
      { label: "Evidence & impact", score: dim.evidence, reason: `Your impact signal is "${impactLabel}". ${dim.evidence < 50 ? `For the ${target} case to hold up, the evidence needs to show business-level outcomes, ownership, and scope — not just solid work.` : `That is a real foundation, but the evidence needs to be presented at the right altitude to read as ${target}-level rather than ${cur}-level.`}` },
      { label: "Support & visibility", score: dim.support, reason: `Manager support is "${managerLabel}" and visibility is "${visLabel}". ${dim.support < 50 ? `That combination makes the case hard to defend in calibration — the people who need to believe it may not have enough direct exposure to your work to back it with confidence.` : `That base is usable, but promotion cases are won or lost on advocacy quality, not just good intent from your manager.`}` },
      { label: "Timing & risk", score: dim.timing, reason: `You have been in role for "${timeLabel}". ${dim.timing < 50 ? `That timing, combined with the other gaps, makes a push this cycle high-risk.` : `Timing is not the bottleneck — the limiting factor is the strength of the evidence and the readiness of the support.`}${body.blockers && !isPlaceholderLike(body.blockers) ? ` Noted blockers: ${clip(trim(body.blockers), 160)}.` : ""}` },
    ],
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const access = await requirePaidRouteAccess("zari_promotion_readiness");
  if (!access.ok) return access.response;

  const rawBody = await request.json().catch(() => ({})) as PromotionReadinessBody;
  const body = {
    currentTitle: trim(rawBody.currentTitle),
    desiredTitle: trim(rawBody.desiredTitle),
    timeInRole: trim(rawBody.timeInRole),
    roleDescription: trim(rawBody.roleDescription),
    rubricClarity: trim(rawBody.rubricClarity),
    recentProjects: trim(rawBody.recentProjects),
    scopeLevel: trim(rawBody.scopeLevel),
    impactLevel: trim(rawBody.impactLevel),
    reviewSignal: trim(rawBody.reviewSignal),
    reviewSummary: trim(rawBody.reviewSummary),
    managerSupport: trim(rawBody.managerSupport),
    visibilityLevel: trim(rawBody.visibilityLevel),
    blockers: trim(rawBody.blockers),
  };

  if (!body.currentTitle || !body.desiredTitle || !body.roleDescription || !body.recentProjects) {
    return NextResponse.json({ error: "Missing key promotion-readiness inputs" }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try {
      userContext = await buildUserContext(userId);
    } catch {
      userContext = "";
    }
  }

  const payload = {
    targetMove: `${body.currentTitle} -> ${body.desiredTitle}`,
    answers: {
      currentTitle: body.currentTitle,
      desiredTitle: body.desiredTitle,
      timeInRole: labelFor("timeInRole", body.timeInRole),
      roleDescription: clip(body.roleDescription, 2200),
      rubricClarity: labelFor("rubricClarity", body.rubricClarity),
      recentProjects: clip(body.recentProjects, 2200),
      scopeLevel: labelFor("scopeLevel", body.scopeLevel),
      impactLevel: labelFor("impactLevel", body.impactLevel),
      reviewSignal: labelFor("reviewSignal", body.reviewSignal),
      reviewSummary: clip(body.reviewSummary, 1600),
      managerSupport: labelFor("managerSupport", body.managerSupport),
      visibilityLevel: labelFor("visibilityLevel", body.visibilityLevel),
      blockers: clip(body.blockers, 1200),
    },
    knownProfileContext: clip(userContext, 1600),
  };

  const coreSystemPrompt = `You are Zari, a blunt, realistic promotion coach. Review the full questionnaire and judge how defensible the promotion case is today.

Important:
- Review every single input together. Do not anchor too heavily on one field.
- The multiple-choice selections are self-reported signals, not proof by themselves.
- The written inputs carry the most weight: the target role bar, the project evidence, the review summary, and the blocker context.
- You must infer whether this target is an IC step, a technical leadership step, or a people-manager step from the title, rubric, and evidence.
- Do NOT force people-management criteria onto IC promotions.
- If the target clearly requires people leadership, organizational influence, or broader management scope, then demand that proof.
- Score current readiness, not future potential.
- Be honest and unsentimental. Do not inflate scores to be encouraging.
- Vague answers, missing metrics, unclear promotion bars, weak support, and big level jumps should lower the score.
- Placeholder answers like "not sure", "did a lot", "helped the team", short fragments, or generic filler are weak evidence and should drag the score down hard.
- If the written evidence is vague, contradictory, or not promotion-grade, say that plainly. Do not reward someone just for filling the form.
- Do not treat confidence, effort, or aspiration as evidence.
- If the evidence is strong for a Staff/Principal/IC leadership track without direct reports, do not punish that just because there is no people management.
- Each dimension score must reflect ONLY what the evidence shows for that specific dimension. Dimension scores should have meaningful variance — a 65 overall score might have Bar clarity at 40 if they're guessing the bar, but Evidence at 78 if they have strong measurable wins. Do NOT cluster all dimensions near the overall score.

Return ONLY valid JSON:
{
  "readinessScore": <integer 0-100>,
  "verdict": "<Ready now|Close, but not airtight|Needs more proof|Too early>",
  "summary": "<2-3 sentence direct coach read spoken to the user in second person>",
  "realityCheck": "<1-3 sentence blunt truth spoken to the user in second person>",
  "scoreReason": "<2-3 sentence plain-English explanation spoken to the user in second person>",
  "dimensions": [
    { "label": "Role fit", "score": <0-100>, "reason": "<1-2 sentence explanation>" },
    { "label": "Bar clarity", "score": <0-100>, "reason": "<1-2 sentence explanation>" },
    { "label": "Evidence & impact", "score": <0-100>, "reason": "<1-2 sentence explanation>" },
    { "label": "Support & visibility", "score": <0-100>, "reason": "<1-2 sentence explanation>" },
    { "label": "Timing & risk", "score": <0-100>, "reason": "<1-2 sentence explanation>" }
  ]
}

Rules:
- Talk to the user as "you".
- Sound like Zari speaking directly to the user, not like an assessment engine or detached product copy.
- Never say "Zari judged", "this candidate", "this person", or narrate in the third person.
- Never mention resumes, recruiting, or job search.
- The dimension labels must be exactly: Role fit, Bar clarity, Evidence & impact, Support & visibility, Timing & risk.
- If the target role is materially above the evidence provided, say so directly.
- If the input quality is weak, confusing, or incomplete, that should be visible in both the score and the written feedback.
- Never "round up" because the user seems ambitious or because one dropdown implies strength.`;

  const coreMessages = [
    { role: "system" as const, content: coreSystemPrompt },
    { role: "user" as const, content: JSON.stringify(payload) },
  ];

  let coreParsed = safeParseLlmPayload(await openaiChat(coreMessages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.18,
    maxTokens: 1600,
    jsonMode: true,
  }));

  if (!hasCoreReadinessPayload(coreParsed)) {
    coreParsed = safeParseLlmPayload(await openaiChat(
      [
        {
          role: "system" as const,
          content: `${coreSystemPrompt}

Your previous attempt was missing structure or was too generic.

Repair instructions:
- Re-evaluate the questionnaire from scratch if needed.
- Keep every field concise and specific.
- Do not output generic filler.
- If the written evidence is weak or incoherent, score it low and say that clearly.
- The response must still be valid JSON and include every required field.`,
        },
        {
          role: "user" as const,
          content: `QUESTIONNAIRE PAYLOAD:
${JSON.stringify(payload)}

PREVIOUS DRAFT:
${coreParsed ? JSON.stringify(coreParsed) : "No usable draft was produced."}`,
        },
      ],
      {
        model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
        temperature: 0.14,
        maxTokens: 1800,
        jsonMode: true,
      },
    ));
  }

  if (!hasCoreReadinessPayload(coreParsed)) {
    coreParsed = parsePlainTextCore(await openaiChat(
      [
        {
          role: "system" as const,
          content: `You are Zari, a blunt promotion coach. Review the questionnaire and return ONLY plain text in this exact format:

Readiness score: <0-100>
Verdict: <Ready now|Close, but not airtight|Needs more proof|Too early>
Summary: <2 short sentences spoken directly to the user>
Reality check: <1-2 blunt sentences spoken directly to the user>
Score reason: <2 short sentences spoken directly to the user>
Dimensions:
- Role fit: <0-100> | <short reason>
- Bar clarity: <0-100> | <short reason>
- Evidence & impact: <0-100> | <short reason>
- Support & visibility: <0-100> | <short reason>
- Timing & risk: <0-100> | <short reason>

Rules:
- Use the questionnaire exactly as given.
- Be harsh on vague or placeholder evidence.
- Sound like a human coach talking to the user directly.
- Never round up for ambition.`,
        },
        { role: "user" as const, content: JSON.stringify(payload) },
      ],
      {
        model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
        temperature: 0.12,
        maxTokens: 900,
      },
    ));
  }

  const fallbackScore = estimateFallbackScore(body);
  const fallback = buildFallback({
    currentTitle: body.currentTitle,
    desiredTitle: body.desiredTitle,
    timeInRole: body.timeInRole,
    roleDescription: body.roleDescription,
    rubricClarity: body.rubricClarity,
    recentProjects: body.recentProjects,
    scopeLevel: body.scopeLevel,
    impactLevel: body.impactLevel,
    reviewSignal: body.reviewSignal,
    reviewSummary: body.reviewSummary,
    managerSupport: body.managerSupport,
    visibilityLevel: body.visibilityLevel,
    blockers: body.blockers,
  }, fallbackScore);

  if (!hasCoreReadinessPayload(coreParsed)) {
    return NextResponse.json({
      readinessScore: fallbackScore,
      verdict: verdictForScore(fallbackScore),
      summary: fallback.summary,
      realityCheck: fallback.realityCheck,
      scoreReason: fallback.scoreReason,
      dimensions: fallback.dimensions,
      rationale: fallback.rationale,
      strengths: fallback.strengths,
      gaps: fallback.gaps,
      conversationPairs: fallback.conversationPairs,
      managerQuestions: fallback.managerQuestions,
      nextMoves: fallback.nextMoves,
      quickWins: fallback.quickWins,
      evidenceChecklist: fallback.evidenceChecklist,
      exampleEvidence: fallback.exampleEvidence,
      managerPitchExample: fallback.managerPitchExample,
      actionPlan: fallback.actionPlan,
      riskFlags: fallback.riskFlags,
    });
  }

  const completedCore = coreParsed!;
  const readinessScore = normalizeScore(completedCore.readinessScore);
  const verdict = normalizeVerdict(completedCore.verdict, readinessScore);
  const detailSystemPrompt = `You are Zari, a blunt, realistic promotion coach. You already judged the core readiness audit. Now produce the supporting material for the page.

Return ONLY valid JSON:
{
  "rationale": ["<specific reason>", "<specific reason>", "<specific reason>"],
  "strengths": ["<specific strength>", "<specific strength>", "<specific strength>"],
  "gaps": [
    { "area": "<gap area>", "why": "<why it matters>", "nextStep": "<specific next step>" },
    { "area": "<gap area>", "why": "<why it matters>", "nextStep": "<specific next step>" },
    { "area": "<gap area>", "why": "<why it matters>", "nextStep": "<specific next step>" }
  ],
  "conversationPairs": [
    { "theyMightSay": "<specific objection or pushback the decision-maker would raise based on THIS person's actual evidence weaknesses>", "yourResponse": "<specific, evidence-anchored response using actual proof points from their case — not generic advice>" },
    { "theyMightSay": "<specific objection or pushback>", "yourResponse": "<specific, evidence-anchored response>" },
    { "theyMightSay": "<specific objection or pushback>", "yourResponse": "<specific, evidence-anchored response>" },
    { "theyMightSay": "<specific objection or pushback>", "yourResponse": "<specific, evidence-anchored response>" },
    { "theyMightSay": "<specific objection or pushback>", "yourResponse": "<specific, evidence-anchored response>" }
  ],
  "managerQuestions": ["<specific question to ask your manager to pressure-test support or clarify the promotion bar, grounded in this person's actual situation>", "<specific question>", "<specific question>", "<specific question>"],
  "nextMoves": ["<specific next move>", "<specific next move>", "<specific next move>", "<specific next move>"],
  "quickWins": [
    { "title": "<short title>", "body": "<one sentence>", "jumpTo": "<overview|gaps|plan|conversation|examples>" },
    { "title": "<short title>", "body": "<one sentence>", "jumpTo": "<overview|gaps|plan|conversation|examples>" },
    { "title": "<short title>", "body": "<one sentence>", "jumpTo": "<overview|gaps|plan|conversation|examples>" }
  ],
  "evidenceChecklist": ["<what strong evidence should contain>", "<what strong evidence should contain>", "<what strong evidence should contain>", "<what strong evidence should contain>"],
  "exampleEvidence": ["<example proof bullet>", "<example proof bullet>", "<example proof bullet>"],
  "managerPitchExample": "<1 short paragraph to open the conversation>",
  "actionPlan": [
    { "label": "<time label>", "action": "<what to do>" },
    { "label": "<time label>", "action": "<what to do>" },
    { "label": "<time label>", "action": "<what to do>" },
    { "label": "<time label>", "action": "<what to do>" }
  ],
  "riskFlags": ["<what could still sink the case>", "<what could still sink the case>", "<what could still sink the case>"]
}

Rules:
- Keep every item concise and concrete.
- Tailor every item to the actual questionnaire and the core judgment below.
- If the input quality is weak, the strengths should stay modest and the gaps should be blunt.
- Never soften obvious lack of proof.
- Write every line like a coach who actually read the packet, not a template engine.
- Never mention resumes, recruiting, or job search.
- EVERY item must be specific to this person's actual case. Never write generic filler. If you write something that could apply to any promotion case, delete it and write something specific to THIS case.
- conversationPairs must be grounded in the actual weaknesses and evidence in this person's questionnaire. Each "theyMightSay" should reflect a real objection someone would raise given what they shared, and each "yourResponse" should reference actual proof points from their case.
- managerQuestions are questions the USER should ask their manager — not questions the manager asks the user. Frame them as questions to bring to a manager conversation to pressure-test support or clarify the bar.`;

  let detailParsed = safeParseLlmPayload(await openaiChat(
    [
      { role: "system" as const, content: detailSystemPrompt },
      {
        role: "user" as const,
        content: JSON.stringify({
          questionnaire: payload,
          coreAudit: {
            readinessScore,
            verdict,
            summary: cleanString(completedCore.summary),
            realityCheck: cleanString(completedCore.realityCheck),
            scoreReason: cleanString(completedCore.scoreReason),
            dimensions: normalizeDimensions(completedCore.dimensions, readinessScore),
          },
        }),
      },
    ],
    {
      model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.22,
      maxTokens: 2200,
      jsonMode: true,
    },
  ));

  if (!hasStructuredReadinessPayload({
    ...completedCore,
    ...(detailParsed ?? {}),
  })) {
    detailParsed = safeParseLlmPayload(await openaiChat(
      [
        { role: "system" as const, content: `${detailSystemPrompt}\n\nRepair any missing fields and keep the output compact.` },
        {
          role: "user" as const,
          content: JSON.stringify({
            questionnaire: payload,
            coreAudit: {
              readinessScore,
              verdict,
              summary: cleanString(completedCore.summary),
              realityCheck: cleanString(completedCore.realityCheck),
              scoreReason: cleanString(completedCore.scoreReason),
              dimensions: normalizeDimensions(completedCore.dimensions, readinessScore),
            },
            previousDetailDraft: detailParsed,
          }),
        },
      ],
      {
        model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
        temperature: 0.18,
        maxTokens: 2200,
        jsonMode: true,
      },
    ));
  }

  return NextResponse.json({
    readinessScore,
    verdict,
    summary: cleanString(completedCore.summary),
    realityCheck: cleanString(completedCore.realityCheck),
    scoreReason: cleanString(completedCore.scoreReason),
    dimensions: normalizeDimensions(completedCore.dimensions, readinessScore),
    rationale: normalizeStringArray(detailParsed?.rationale, fallback.rationale, 0, 4),
    strengths: normalizeStringArray(detailParsed?.strengths, fallback.strengths, 0, 5),
    gaps: normalizeGaps(detailParsed?.gaps, fallback.gaps),
    conversationPairs: normalizeConversationPairs(detailParsed?.conversationPairs, fallback.conversationPairs),
    managerQuestions: normalizeStringArray(detailParsed?.managerQuestions, fallback.managerQuestions, 0, 6),
    nextMoves: normalizeStringArray(detailParsed?.nextMoves, fallback.nextMoves, 0, 6),
    quickWins: normalizeQuickWins(detailParsed?.quickWins, fallback.quickWins),
    evidenceChecklist: normalizeStringArray(detailParsed?.evidenceChecklist, fallback.evidenceChecklist, 0, 5),
    exampleEvidence: normalizeStringArray(detailParsed?.exampleEvidence, fallback.exampleEvidence, 0, 4),
    managerPitchExample: cleanString(detailParsed?.managerPitchExample) || fallback.managerPitchExample,
    actionPlan: normalizeActionPlan(detailParsed?.actionPlan, fallback.actionPlan),
    riskFlags: normalizeStringArray(detailParsed?.riskFlags, fallback.riskFlags, 0, 4),
  });
}
