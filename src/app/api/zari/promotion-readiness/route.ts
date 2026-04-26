import { NextResponse } from "next/server";

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
  leadershipEvidence?: string;
  reviewSignal?: string;
  reviewSummary?: string;
  managerSupport?: string;
  visibilityLevel?: string;
  blockers?: string;
};

type DimensionScore = {
  label: string;
  score: number;
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

type RealitySignals = {
  managerTrack: boolean;
  seniorManagerPlus: boolean;
  stretchDistance: number;
  severeLeadershipGap: boolean;
  weakLeadershipGap: boolean;
  vagueEvidence: boolean;
  missingMetrics: boolean;
  weakSupport: boolean;
  unclearBar: boolean;
};

type LlmPayload = {
  calibrationAdjustment?: unknown;
  summary?: unknown;
  realityCheck?: unknown;
  scoreReason?: unknown;
  rationale?: unknown;
  strengths?: unknown;
  gaps?: unknown;
  managerQuestions?: unknown;
  nextMoves?: unknown;
  quickWins?: unknown;
  evidenceChecklist?: unknown;
  exampleEvidence?: unknown;
  managerPitchExample?: unknown;
  actionPlan?: unknown;
  riskFlags?: unknown;
  dimensionReasons?: unknown;
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
  leadershipEvidence: {
    managed_people: "Direct people leadership",
    led_cross_functional: "Cross-functional leadership",
    mentored_owned_stream: "Mentoring plus major ownership",
    mostly_individual: "Mostly individual execution",
    none_yet: "No real leadership proof yet",
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

const SCORE_MAPS = {
  timeInRole: {
    under_6m: 28,
    "6_12m": 56,
    "1_2y": 82,
    "2plus_y": 94,
  },
  rubricClarity: {
    exact_rubric: 100,
    main_expectations: 78,
    some_hints: 48,
    guessing: 20,
  },
  scopeLevel: {
    already_next_level: 100,
    bigger_than_role: 82,
    strong_in_role: 58,
    mostly_expected_scope: 40,
    still_growing: 22,
  },
  impactLevel: {
    repeatable_measured: 100,
    clear_some_measured: 80,
    some_wins: 52,
    hard_to_show: 22,
  },
  leadershipEvidence: {
    managed_people: 100,
    led_cross_functional: 78,
    mentored_owned_stream: 58,
    mostly_individual: 34,
    none_yet: 10,
  },
  reviewSignal: {
    explicit_next_level: 100,
    strong_stretch: 82,
    solid_but_neutral: 56,
    mixed: 34,
    weak: 14,
  },
  managerSupport: {
    actively_advocating: 100,
    supportive_with_more_proof: 72,
    unclear: 42,
    skeptical: 14,
  },
  visibilityLevel: {
    decision_makers_see_it: 100,
    manager_and_partners: 76,
    mostly_team: 48,
    low_visibility: 18,
  },
} as const;

const DIMENSION_TEMPLATES: Record<string, { strong: string; gap: string; action: string }> = {
  "Bar clarity": {
    strong: "You have a reasonably clear read on what the next level actually requires.",
    gap: "The promotion bar is still too fuzzy, which makes it hard to prove you clearly clear it.",
    action: "Get the level guide or your manager's exact criteria, then map your strongest wins to it line by line.",
  },
  "Scope and impact": {
    strong: "Your work shows real scope and business impact beyond simple solid execution.",
    gap: "The case still reads too much like strong in-role performance instead of next-level impact.",
    action: "Rewrite your top projects as proof points with stakes, ownership, and measurable outcomes.",
  },
  "Leadership signal": {
    strong: "There is evidence that you lead people, systems, or decisions beyond your own task list.",
    gap: "The case still leans too heavily on execution and not enough on leadership, leverage, or next-level influence.",
    action: "Collect examples that show you drove alignment, set direction, mentored others, or led work beyond your lane.",
  },
  "Support and visibility": {
    strong: "The support signals around you make the promotion case easier to trust.",
    gap: "Support and visibility are too weak or too ambiguous to make this feel like a low-risk promotion call.",
    action: "Pressure-test your manager's stance, tighten review language, and make the right people see the case.",
  },
  "Timing and realism": {
    strong: "The move itself looks realistic enough if you package the proof well.",
    gap: "The move still looks early, too thin, or too ambitious for the current level of proof.",
    action: "Close the biggest proof gaps before pushing timing or a formal promotion ask.",
  },
};

const METRIC_RE = /(?:\b\d+(?:[.,]\d+)?%|\$\s?\d+(?:[.,]\d+)?[kKmMbB]?|\b\d+\s?(?:x|hrs?|hours?|days?|weeks?|months?|people|teammates?|teams?|stakeholders?|customers?|clients?|deployments?|releases?)\b)/gi;
const STRONG_VERB_RE = /\b(led|launched|owned|drove|built|scaled|grew|cut|reduced|improved|saved|delivered|shipped|migrated|designed|negotiated|aligned|resolved|coached|managed|hired|mentored|automated)\b/gi;
const VAGUE_RE = /\b(helped|worked on|involved in|supported|participated in|responsible for|assisted with|contributed to)\b/gi;
const LEADERSHIP_RE = /\b(managed|manager|direct reports?|hired|fired|coached|mentored|performance review|one[- ]on[- ]one|delegated|set direction|ran the team|team planning|staffed|headcount|promotion case|calibration|skip[- ]level|cross-functional|aligned stakeholders|drove alignment)\b/gi;
const MANAGER_TRACK_RE = /\b(senior manager|sr\.?\s*manager|manager|director|head(?:\s+of)?|vice president|vp\b|chief)\b/i;
const SENIOR_MANAGER_PLUS_RE = /\b(senior manager|sr\.?\s*manager|director|head(?:\s+of)?|vice president|vp\b|chief)\b/i;

function trim(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function clip(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length)}…` : value;
}

function average(values: number[]) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function countRegex(text: string, pattern: RegExp) {
  const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
  return [...text.matchAll(new RegExp(pattern.source, flags))].length;
}

function keyedScore(group: keyof typeof SCORE_MAPS, value: string) {
  return SCORE_MAPS[group][value as keyof (typeof SCORE_MAPS)[typeof group]] ?? 30;
}

function labelFor(group: keyof typeof LABELS, value: string) {
  return LABELS[group][value as keyof (typeof LABELS)[typeof group]] ?? value;
}

function verdictForScore(score: number): PromotionReadinessVerdict {
  if (score >= 84) return "Ready now";
  if (score >= 70) return "Close, but not airtight";
  if (score >= 48) return "Needs more proof";
  return "Too early";
}

function titleRank(title: string) {
  const t = title.toLowerCase();
  if (!t) return 2;
  if (/\b(intern|trainee)\b/.test(t)) return 0;
  if (/\b(junior|jr\.?|associate|entry[- ]level)\b/.test(t)) return 1;
  if (/\b(chief|vice president|vp\b|svP|evp)\b/i.test(t)) return 8;
  if (/\b(director|head(?:\s+of)?)\b/.test(t)) return 7;
  if (/\b(senior manager|sr\.?\s*manager)\b/.test(t)) return 6;
  if (/\bmanager\b/.test(t)) return 5;
  if (/\b(staff|principal|architect)\b/.test(t)) return 4;
  if (/\b(senior|sr\.?)\b/.test(t)) return 3;
  return 2;
}

function roleJumpScore(currentTitle: string, desiredTitle: string) {
  const distance = Math.max(0, titleRank(desiredTitle) - titleRank(currentTitle));
  if (distance <= 1) return 88;
  if (distance === 2) return 62;
  if (distance === 3) return 38;
  return 18;
}

function isManagerTrack(desiredTitle: string, roleDescription: string) {
  return MANAGER_TRACK_RE.test(desiredTitle) || /\bmanage people|people manager|lead a team|hiring|coaching\b/i.test(roleDescription);
}

function clarityTextScore(text: string, min = 100, good = 260, great = 650) {
  const normalized = text.trim();
  if (!normalized) return 8;
  let score = 18;
  const length = normalized.length;
  if (length >= 40) score += 10;
  if (length >= min) score += 14;
  if (length >= good) score += 16;
  if (length >= great) score += 14;
  score += Math.min(12, countRegex(normalized, /(?:\n|-|•|:)/g) * 2);
  score += Math.min(14, countRegex(normalized, /\b(scope|owns?|responsible|decision|strategy|stakeholder|business|team|lead|bar|expectation|level|criteria)\b/gi) * 2);
  return clamp(score, 8, 100);
}

function specificityScore(text: string, min = 80, good = 220, great = 520) {
  const normalized = text.trim();
  if (!normalized) return 8;
  const length = normalized.length;
  const metrics = countRegex(normalized, METRIC_RE);
  const strongVerbs = countRegex(normalized, STRONG_VERB_RE);
  const vaguePhrases = countRegex(normalized, VAGUE_RE);
  let score = 14;
  if (length >= 30) score += 10;
  if (length >= min) score += 15;
  if (length >= good) score += 12;
  if (length >= great) score += 10;
  score += Math.min(24, strongVerbs * 4);
  score += Math.min(24, metrics * 8);
  score -= Math.min(20, vaguePhrases * 5);
  if (metrics === 0 && length > 140) score -= 8;
  return clamp(Math.round(score), 6, 100);
}

function reviewTextScore(text: string) {
  return average([
    clarityTextScore(text, 60, 160, 360),
    specificityScore(text, 60, 140, 300),
  ]);
}

function blockerScore(text: string) {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return 18;
  if (/^none\b|^none yet\b|^not sure\b/.test(normalized)) return 52;
  return average([
    clarityTextScore(text, 24, 80, 180),
    specificityScore(text, 24, 80, 180),
  ]);
}

function leadershipNarrativeScore(text: string, managerTrack: boolean) {
  const specificity = specificityScore(text, 90, 240, 560);
  const leadershipHits = countRegex(text, LEADERSHIP_RE);
  let score = average([
    specificity,
    clamp(22 + leadershipHits * 12, 10, 100),
  ]);
  if (managerTrack && leadershipHits === 0) {
    score = Math.min(score, 34);
  }
  return clamp(score, 8, 100);
}

function buildRealityCheck(currentTitle: string, desiredTitle: string, signals: RealitySignals) {
  if (signals.seniorManagerPlus && signals.severeLeadershipGap) {
    return `For ${desiredTitle || "this role"}, your answers do not show real people-leadership proof yet. Right now this reads as a stretch aspiration, not a promotion case a committee would back.`;
  }
  if (signals.managerTrack && signals.severeLeadershipGap) {
    return `For ${desiredTitle || "this manager role"}, the leadership evidence is not there yet. Strong execution is not enough if you cannot show that you already lead people, decisions, or cross-team work at the next level.`;
  }
  if (signals.managerTrack && signals.weakLeadershipGap) {
    return `You have some leadership hints, but not enough manager-level proof yet. Most promotion committees will want clearer evidence that you already lead beyond your own work.`;
  }
  if (signals.stretchDistance >= 3) {
    return `This target is more than a normal one-level jump from ${currentTitle || "your current role"}. Without unusually strong proof, most managers will see it as too big a leap right now.`;
  }
  if (signals.vagueEvidence && signals.missingMetrics) {
    return "The answers are still too vague to support a strong promotion case. Good work is not enough if you cannot show scope, outcomes, and what changed because of you.";
  }
  if (signals.unclearBar) {
    return "You cannot prove you are promotion-ready if the bar itself is still fuzzy. Right now too much of the case depends on assumption.";
  }
  if (signals.weakSupport) {
    return "Even a strong performer stalls when support is weak or unclear. Right now the case does not read like something your manager can defend upward easily.";
  }
  return "The gap is not effort. It is proof. Until the evidence is sharper, this stays debatable rather than obvious.";
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
      if (!area || !why || !nextStep) return null;
      return { area, why, nextStep };
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
      if (!label || !action) return null;
      return { label, action };
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
      if (!title || !body || !allowed.has(jumpTo)) return null;
      return { title, body, jumpTo };
    })
    .filter(Boolean) as QuickWin[];
  return items.length >= 3 ? items.slice(0, 3) : fallback;
}

function normalizeCalibrationAdjustment(value: unknown) {
  const parsed = typeof value === "number" ? value : Number.parseInt(cleanString(value), 10);
  if (!Number.isFinite(parsed)) return 0;
  return clamp(Math.round(parsed), -22, 0);
}

function fallbackDimensionReason(label: string, score: number) {
  const template = DIMENSION_TEMPLATES[label];
  if (!template) return score >= 70 ? "This area is helping your case." : "This area is holding the case back.";
  if (score >= 75) return template.strong;
  if (score >= 55) return `${template.strong} But it still needs to look more consistent before the ask feels easy to defend.`;
  return template.gap;
}

function buildFallbackResponse(params: {
  currentTitle: string;
  desiredTitle: string;
  verdict: PromotionReadinessVerdict;
  score: number;
  dimensions: DimensionScore[];
  realitySignals: RealitySignals;
}) {
  const { currentTitle, desiredTitle, verdict, score, dimensions, realitySignals } = params;
  const ordered = [...dimensions].sort((a, b) => b.score - a.score);
  const strongest = ordered.slice(0, 2);
  const weakest = ordered.slice(-2).reverse();
  const move = [currentTitle, desiredTitle].filter(Boolean).join(" -> ");
  const topLabels = strongest.map(item => item.label.toLowerCase()).join(" and ");
  const lowLabels = weakest.map(item => item.label.toLowerCase()).join(" and ");
  const realityCheck = buildRealityCheck(currentTitle, desiredTitle, realitySignals);

  const summary = verdict === "Ready now"
    ? `You have a credible promotion case for ${move || "the next role"} right now. The score is strong because the answers point to real proof, support, and a move that looks defensible.`
    : verdict === "Close, but not airtight"
      ? `You are close to having a credible case for ${move || "the next role"}, but it is not clean enough yet. The fundamentals are there, though a few weak spots still make the timing arguable.`
      : verdict === "Needs more proof"
        ? `There is a base to build on, but the current case for ${move || "the next role"} is not strong enough yet. The score says you still need better proof before the ask feels convincing.`
        : `Right now the promotion case for ${move || "the next role"} is too early. The score reflects missing proof, weak support, an unrealistic jump, or some combination of the three.`;

  const scoreReason = `Your score lands at ${score}/100 because ${topLabels} are helping the case, while ${lowLabels} are still dragging it down. Promotion decisions do not reward effort alone. They reward clear next-level proof that other people can repeat upward.`;

  const rationale = [
    `${strongest[0]?.label ?? "Your strongest area"} is the biggest reason the case has any traction right now.`,
    `${weakest[0]?.label ?? "Your weakest area"} is the clearest reason the score is not higher.`,
    realityCheck,
  ];

  const strengths = strongest.map(item => fallbackDimensionReason(item.label, Math.max(item.score, 75)));
  while (strengths.length < 3) strengths.push("You do have some raw material to work with, which is better than starting from nothing.");

  const gaps = weakest.map(item => ({
    area: item.label,
    why: fallbackDimensionReason(item.label, Math.min(item.score, 50)),
    nextStep: DIMENSION_TEMPLATES[item.label]?.action ?? "Turn this area into a concrete plan before you make the ask.",
  }));

  if (realitySignals.managerTrack && !gaps.some(item => item.area === "Leadership proof")) {
    gaps.unshift({
      area: "Leadership proof",
      why: "The target role expects stronger evidence that you already lead beyond your own output.",
      nextStep: "Collect and create proof that you are already leading people, decisions, or cross-team work at the next level.",
    });
  }

  while (gaps.length < 3) {
    gaps.push({
      area: "Promotion narrative",
      why: "The story still needs to feel tighter and easier for your manager to repeat upward.",
      nextStep: "Package your top proof points into a short, specific case that ties directly to the next-level bar.",
    });
  }

  const managerQuestions = [
    `What specific evidence would make you confident that I am already operating at the ${desiredTitle || "next"} level?`,
    "Which parts of my case already read as promotion-ready, and which parts still feel unproven?",
    realitySignals.managerTrack
      ? "What leadership proof is still missing if I want this to read as a real manager-track case?"
      : "Which examples still look like strong current-level work instead of next-level work?",
    "Who else needs to see stronger evidence before promotion timing becomes realistic?",
    "What would you want me to accomplish or show in the next review cycle to make this an easier yes?",
  ];

  const nextMoves = [
    weakest[0] ? DIMENSION_TEMPLATES[weakest[0].label]?.action ?? "Close the biggest gap first." : "Close the biggest gap first.",
    realitySignals.vagueEvidence
      ? "Rewrite your best wins with hard numbers, ownership, and what changed because of your work."
      : "Turn your best wins into short proof points with scope, outcome, and what changed because of your work.",
    realitySignals.managerTrack
      ? "Pressure-test whether your current leadership proof is good enough for the manager track you want."
      : "Use your next 1:1 to replace assumptions with explicit promotion criteria and timing guidance.",
    "Make the case visible to the people who influence promotion decisions, not just to your immediate team.",
  ];

  const quickWins: QuickWin[] = [
    { title: "Fix the weakest gap", body: `${weakest[0]?.label ?? "Your weakest area"} is the fastest way to move the score.`, jumpTo: "gaps" },
    { title: "Reality check", body: "Read the blunt assessment before you start polishing the case.", jumpTo: "overview" },
    { title: "Pressure-test your manager", body: "Do not guess where support stands. Get the answer directly.", jumpTo: "conversation" },
  ];

  const evidenceChecklist = [
    "Tie each win to the next-level bar, not just to effort or ownership.",
    "Use measurable outcomes where possible: revenue, savings, adoption, speed, quality, or risk reduction.",
    realitySignals.managerTrack
      ? "Show leadership proof, not just strong personal output: direction-setting, hiring, coaching, cross-team alignment, or ownership beyond your task list."
      : "Show leverage and influence beyond personal execution, not just good delivery.",
    "Use recent review language if it actually supports the promotion case.",
  ];

  const exampleEvidence = realitySignals.managerTrack
    ? [
        `Led a cross-functional initiative with multiple stakeholders, set the direction, kept the work moving through ambiguity, and delivered an outcome leadership cared about.`,
        `Coached teammates or delegated meaningful ownership while still being accountable for the final result, showing leadership beyond individual execution.`,
        `Took a high-visibility problem from ambiguity to decision, aligned multiple groups, and improved a business metric that mattered to senior leadership.`,
      ]
    : [
        `Led a cross-functional initiative that went beyond my current ${currentTitle || "role"}, aligned multiple stakeholders, and delivered a clear business outcome tied to the expectations of a ${desiredTitle || "next-level"} role.`,
        `Owned a high-visibility project from ambiguity to launch, influenced partner teams without direct authority, and improved a business metric leadership cared about.`,
        `Created a repeatable approach that other teammates now use, showing not just delivery but leverage and next-level influence.`,
      ];

  const managerPitchExample = `I want to pressure-test whether I have a credible case for ${desiredTitle || "the next level"}. I am not asking for encouragement. I want to know what still feels unproven, what evidence is already strong enough, and what would need to happen for this to become an easier yes.`;

  const actionPlan: ActionPlanItem[] = [
    { label: "This week", action: "Rewrite your strongest wins into short proof points tied directly to the next-level bar." },
    { label: "Next 2 weeks", action: realitySignals.managerTrack ? "Close the leadership proof gap with one concrete example or one stretch assignment that actually demonstrates it." : "Close the weakest proof gap with one stronger example, metric, or visible outcome." },
    { label: "This cycle", action: "Get sharper manager feedback and make the case more visible to the people who influence the decision." },
    { label: "Before the ask", action: "Do not pitch timing until your manager can say what would make the case an obvious yes." },
  ];

  const riskFlags = [
    realityCheck,
    `${weakest[0]?.label ?? "A weak area"} is still weak enough to make the case feel risky.`,
    "A strong performer can still get passed over if the right people do not see the case or cannot repeat it upward.",
  ];

  return { summary, realityCheck, scoreReason, rationale, strengths, gaps: gaps.slice(0, 5), managerQuestions, nextMoves, quickWins, evidenceChecklist, exampleEvidence, managerPitchExample, actionPlan, riskFlags };
}

function buildDimensionScores(body: {
  currentTitle: string;
  desiredTitle: string;
  timeInRole: string;
  roleDescription: string;
  rubricClarity: string;
  recentProjects: string;
  scopeLevel: string;
  impactLevel: string;
  leadershipEvidence: string;
  reviewSignal: string;
  reviewSummary: string;
  managerSupport: string;
  visibilityLevel: string;
  blockers: string;
}) {
  const managerTrack = isManagerTrack(body.desiredTitle, body.roleDescription);
  const seniorManagerPlus = SENIOR_MANAGER_PLUS_RE.test(body.desiredTitle);
  const stretchDistance = Math.max(0, titleRank(body.desiredTitle) - titleRank(body.currentTitle));
  const barTextScore = clarityTextScore(body.roleDescription, 100, 260, 680);
  const projectSpecificity = specificityScore(body.recentProjects, 90, 240, 560);
  const reviewScore = reviewTextScore(body.reviewSummary);
  const leadershipText = leadershipNarrativeScore(`${body.recentProjects}\n${body.reviewSummary}`, managerTrack);
  const blockersScore = blockerScore(body.blockers);
  const missingMetrics = countRegex(body.recentProjects, METRIC_RE) === 0 && body.impactLevel !== "hard_to_show";
  const vagueEvidence = projectSpecificity < 48;
  const unclearBar = body.rubricClarity === "some_hints" || body.rubricClarity === "guessing" || barTextScore < 56;
  const weakSupport =
    body.managerSupport === "skeptical" ||
    body.managerSupport === "unclear" ||
    body.reviewSignal === "mixed" ||
    body.reviewSignal === "weak" ||
    body.visibilityLevel === "low_visibility";
  const severeLeadershipGap = managerTrack && (body.leadershipEvidence === "none_yet" || body.leadershipEvidence === "mostly_individual");
  const weakLeadershipGap = managerTrack && body.leadershipEvidence === "mentored_owned_stream";

  const barClarity = average([
    keyedScore("rubricClarity", body.rubricClarity),
    barTextScore,
    body.currentTitle && body.desiredTitle ? 100 : 35,
  ]);

  const scopeImpact = average([
    keyedScore("scopeLevel", body.scopeLevel),
    keyedScore("impactLevel", body.impactLevel),
    projectSpecificity,
  ]);

  let leadershipSignal = average([
    keyedScore("leadershipEvidence", body.leadershipEvidence),
    leadershipText,
    keyedScore("scopeLevel", body.scopeLevel),
  ]);
  if (severeLeadershipGap) leadershipSignal = Math.min(leadershipSignal, 26);
  if (weakLeadershipGap) leadershipSignal = Math.min(leadershipSignal, 52);
  if (seniorManagerPlus && body.leadershipEvidence !== "managed_people") {
    leadershipSignal = Math.min(leadershipSignal, body.leadershipEvidence === "led_cross_functional" ? 56 : 30);
  }

  const supportVisibility = average([
    keyedScore("reviewSignal", body.reviewSignal),
    keyedScore("managerSupport", body.managerSupport),
    keyedScore("visibilityLevel", body.visibilityLevel),
    reviewScore,
  ]);

  let timingRealism = average([
    keyedScore("timeInRole", body.timeInRole),
    blockersScore,
    roleJumpScore(body.currentTitle, body.desiredTitle),
  ]);
  if (stretchDistance >= 3) timingRealism = Math.min(timingRealism, 42);
  if (body.timeInRole === "under_6m" && stretchDistance >= 1) timingRealism = Math.min(timingRealism, 44);

  const dimensions: DimensionScore[] = [
    { label: "Bar clarity", score: barClarity },
    { label: "Scope and impact", score: scopeImpact },
    { label: "Leadership signal", score: leadershipSignal },
    { label: "Support and visibility", score: supportVisibility },
    { label: "Timing and realism", score: timingRealism },
  ];

  let overallScore = Math.round(
    dimensions[0].score * 0.18 +
      dimensions[1].score * 0.29 +
      dimensions[2].score * 0.23 +
      dimensions[3].score * 0.18 +
      dimensions[4].score * 0.12,
  );

  if (vagueEvidence) overallScore -= 12;
  if (missingMetrics) overallScore -= 8;
  if (unclearBar) overallScore -= 7;
  if (weakSupport) overallScore -= 8;
  if (severeLeadershipGap) overallScore -= managerTrack ? 22 : 10;
  else if (weakLeadershipGap) overallScore -= managerTrack ? 10 : 4;
  if (stretchDistance === 2) overallScore -= 5;
  else if (stretchDistance >= 3) overallScore -= 10;
  if (body.timeInRole === "under_6m" && stretchDistance >= 1) overallScore -= 6;
  if (seniorManagerPlus && body.leadershipEvidence !== "managed_people") overallScore -= 12;

  overallScore = clamp(overallScore, 10, 100);
  if (severeLeadershipGap && managerTrack) overallScore = Math.min(overallScore, 42);
  if (seniorManagerPlus && body.leadershipEvidence !== "managed_people") {
    overallScore = Math.min(overallScore, body.leadershipEvidence === "led_cross_functional" ? 54 : 36);
  }
  if (vagueEvidence && missingMetrics && unclearBar) overallScore = Math.min(overallScore, 52);

  return {
    dimensions,
    overallScore,
    realitySignals: {
      managerTrack,
      seniorManagerPlus,
      stretchDistance,
      severeLeadershipGap,
      weakLeadershipGap,
      vagueEvidence,
      missingMetrics,
      weakSupport,
      unclearBar,
    },
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

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
    leadershipEvidence: trim(rawBody.leadershipEvidence),
    reviewSignal: trim(rawBody.reviewSignal),
    reviewSummary: trim(rawBody.reviewSummary),
    managerSupport: trim(rawBody.managerSupport),
    visibilityLevel: trim(rawBody.visibilityLevel),
    blockers: trim(rawBody.blockers),
  };

  if (!body.currentTitle || !body.desiredTitle || !body.roleDescription || !body.recentProjects || !body.reviewSummary) {
    return NextResponse.json({ error: "Missing key promotion-readiness inputs" }, { status: 400 });
  }

  const baseScoring = buildDimensionScores(body);

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try {
      userContext = await buildUserContext(userId);
    } catch {
      userContext = "";
    }
  }

  const scorePayload = {
    targetMove: `${body.currentTitle} -> ${body.desiredTitle}`,
    baseReadinessScore: baseScoring.overallScore,
    dimensions: baseScoring.dimensions,
    realitySignals: baseScoring.realitySignals,
    answers: {
      timeInRole: labelFor("timeInRole", body.timeInRole),
      rubricClarity: labelFor("rubricClarity", body.rubricClarity),
      scopeLevel: labelFor("scopeLevel", body.scopeLevel),
      impactLevel: labelFor("impactLevel", body.impactLevel),
      leadershipEvidence: labelFor("leadershipEvidence", body.leadershipEvidence),
      reviewSignal: labelFor("reviewSignal", body.reviewSignal),
      managerSupport: labelFor("managerSupport", body.managerSupport),
      visibilityLevel: labelFor("visibilityLevel", body.visibilityLevel),
      roleDescription: clip(body.roleDescription, 2200),
      recentProjects: clip(body.recentProjects, 2200),
      reviewSummary: clip(body.reviewSummary, 1600),
      blockers: clip(body.blockers, 1200),
    },
    knownProfileContext: clip(userContext, 1600),
  };

  const systemPrompt = `You are Zari, a blunt but fair promotion coach. Review the completed promotion-readiness questionnaire and the precomputed base score. You may LOWER the score if the written evidence is thinner, vaguer, or less realistic than the base score suggests. Never raise the score.

Return ONLY valid JSON:
{
  "calibrationAdjustment": <integer from -22 to 0>,
  "summary": "<2-3 sentence honest assessment>",
  "realityCheck": "<1-3 sentence blunt assessment of what is not believable yet>",
  "scoreReason": "<2-3 sentence plain-English explanation of why the score lands there>",
  "rationale": ["<specific reason>", "<specific reason>", "<specific reason>"],
  "strengths": ["<specific strength>"],
  "gaps": [
    { "area": "<gap area>", "why": "<why it matters>", "nextStep": "<specific next step>" }
  ],
  "managerQuestions": ["<question for manager>"],
  "nextMoves": ["<specific next move>"],
  "quickWins": [
    { "title": "<short title>", "body": "<one sentence>", "jumpTo": "<overview|gaps|plan|conversation|examples>" }
  ],
  "evidenceChecklist": ["<what strong evidence should contain>"],
  "exampleEvidence": ["<example proof bullet>"],
  "managerPitchExample": "<1 short paragraph to open the conversation>",
  "actionPlan": [
    { "label": "<time label>", "action": "<what to do>" }
  ],
  "riskFlags": ["<what could still sink the case>"],
  "dimensionReasons": [
    { "label": "<dimension label exactly as provided>", "reason": "<1-2 sentence explanation>" }
  ]
}

Rules:
- Talk to the user as "you".
- Use direct, easy language. No corporate filler.
- Do not protect feelings. Do not be cruel either. Just tell the truth plainly.
- Never mention ATS, resumes, recruiting, interviews, or job search.
- calibrationAdjustment must be 0 or a negative integer. Never increase the score.
- If the target role is manager/director and there is weak or no people-leadership proof, use a meaningful negative adjustment.
- If the answers are vague, missing metrics, or read like strong current-level work rather than next-level work, lower the score.
- Keep the advice grounded in the submitted answers.
- Give 3 rationale bullets, 3-5 strengths, 3-5 gaps, 4-6 manager questions, 4-6 next moves, 3 quickWins, 4-5 checklist items, 3 exampleEvidence bullets, 4 actionPlan items, and 3-4 riskFlags.
- The dimensionReasons list must cover every provided dimension label exactly once.`;

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: JSON.stringify(scorePayload) },
    ],
    {
      model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.3,
      maxTokens: 2400,
      jsonMode: true,
    },
  );

  let parsed: LlmPayload | null = null;
  if (reply) {
    try {
      parsed = JSON.parse(reply) as LlmPayload;
    } catch {
      parsed = null;
    }
  }

  const calibrationAdjustment = normalizeCalibrationAdjustment(parsed?.calibrationAdjustment);
  const finalScore = clamp(baseScoring.overallScore + calibrationAdjustment, 10, 100);
  const finalVerdict = verdictForScore(finalScore);

  const fallback = buildFallbackResponse({
    currentTitle: body.currentTitle,
    desiredTitle: body.desiredTitle,
    verdict: finalVerdict,
    score: finalScore,
    dimensions: baseScoring.dimensions,
    realitySignals: baseScoring.realitySignals,
  });

  const dimensionReasonMap = new Map<string, string>();
  if (Array.isArray(parsed?.dimensionReasons)) {
    parsed.dimensionReasons.forEach(item => {
      if (!item || typeof item !== "object") return;
      const label = cleanString((item as Record<string, unknown>).label);
      const reason = cleanString((item as Record<string, unknown>).reason);
      if (label && reason) dimensionReasonMap.set(label, reason);
    });
  }

  const finalDimensions = baseScoring.dimensions.map(item => ({
    ...item,
    reason: dimensionReasonMap.get(item.label) || fallbackDimensionReason(item.label, item.score),
  }));

  return NextResponse.json({
    readinessScore: finalScore,
    verdict: finalVerdict,
    summary: cleanString(parsed?.summary) || fallback.summary,
    realityCheck: cleanString(parsed?.realityCheck) || fallback.realityCheck,
    scoreReason: cleanString(parsed?.scoreReason) || fallback.scoreReason,
    dimensions: finalDimensions,
    rationale: normalizeStringArray(parsed?.rationale, fallback.rationale, 3, 4),
    strengths: normalizeStringArray(parsed?.strengths, fallback.strengths, 3, 5),
    gaps: normalizeGaps(parsed?.gaps, fallback.gaps),
    managerQuestions: normalizeStringArray(parsed?.managerQuestions, fallback.managerQuestions, 4, 6),
    nextMoves: normalizeStringArray(parsed?.nextMoves, fallback.nextMoves, 4, 6),
    quickWins: normalizeQuickWins(parsed?.quickWins, fallback.quickWins),
    evidenceChecklist: normalizeStringArray(parsed?.evidenceChecklist, fallback.evidenceChecklist, 4, 5),
    exampleEvidence: normalizeStringArray(parsed?.exampleEvidence, fallback.exampleEvidence, 3, 4),
    managerPitchExample: cleanString(parsed?.managerPitchExample) || fallback.managerPitchExample,
    actionPlan: normalizeActionPlan(parsed?.actionPlan, fallback.actionPlan),
    riskFlags: normalizeStringArray(parsed?.riskFlags, fallback.riskFlags, 3, 4),
  });
}
