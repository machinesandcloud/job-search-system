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
  askWindow?: string;
  roleDescription?: string;
  rubricClarity?: string;
  recentProjects?: string;
  scopeLevel?: string;
  impactLevel?: string;
  influenceLevel?: string;
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

type LlmPayload = {
  summary?: unknown;
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
  askWindow: {
    this_quarter: "This quarter",
    next_cycle: "Next review cycle",
    "6_12m": "Within 6 to 12 months",
    exploring: "Just exploring",
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
  influenceLevel: {
    org_wide: "Org-wide influence",
    cross_functional: "Cross-functional influence",
    within_team: "Mostly within team",
    mostly_individual: "Mostly individual execution",
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
    under_6m: 25,
    "6_12m": 55,
    "1_2y": 82,
    "2plus_y": 95,
  },
  askWindow: {
    this_quarter: 58,
    next_cycle: 86,
    "6_12m": 78,
    exploring: 72,
  },
  rubricClarity: {
    exact_rubric: 100,
    main_expectations: 78,
    some_hints: 52,
    guessing: 24,
  },
  scopeLevel: {
    already_next_level: 100,
    bigger_than_role: 82,
    strong_in_role: 62,
    mostly_expected_scope: 45,
    still_growing: 28,
  },
  impactLevel: {
    repeatable_measured: 100,
    clear_some_measured: 82,
    some_wins: 58,
    hard_to_show: 28,
  },
  influenceLevel: {
    org_wide: 100,
    cross_functional: 82,
    within_team: 56,
    mostly_individual: 30,
  },
  reviewSignal: {
    explicit_next_level: 100,
    strong_stretch: 82,
    solid_but_neutral: 60,
    mixed: 38,
    weak: 16,
  },
  managerSupport: {
    actively_advocating: 100,
    supportive_with_more_proof: 76,
    unclear: 46,
    skeptical: 20,
  },
  visibilityLevel: {
    decision_makers_see_it: 100,
    manager_and_partners: 76,
    mostly_team: 50,
    low_visibility: 22,
  },
} as const;

const DIMENSION_TEMPLATES: Record<string, { strong: string; gap: string; action: string }> = {
  "Bar clarity": {
    strong: "You have a clearer read on the next-level bar than most people do at this stage.",
    gap: "The promotion bar is still fuzzy, which makes it hard to prove that your work clearly clears it.",
    action: "Get the level guide or your manager's exact criteria and map your strongest wins to it line by line.",
  },
  "Scope and impact": {
    strong: "Your work already shows signs of bigger scope and meaningful business impact.",
    gap: "The case still needs clearer examples of bigger ownership and outcomes that feel different from solid in-role performance.",
    action: "Turn your strongest projects into short proof points with scope, stakes, and measurable outcomes.",
  },
  "Influence and leadership": {
    strong: "You have signs that you influence beyond your direct tasks and can move work across people or teams.",
    gap: "The story still leans too much on execution and not enough on influence, alignment, or next-level leadership.",
    action: "Collect examples where you drove decisions, aligned stakeholders, or moved work beyond your immediate lane.",
  },
  "Feedback and support": {
    strong: "You have real support signals, which makes the promotion case easier for decision-makers to trust.",
    gap: "Support and review signals are not yet strong enough to make the promotion feel low-risk.",
    action: "Pressure-test your manager's stance, get sharper feedback, and make the case more visible to the right people.",
  },
  "Timing and proof": {
    strong: "The timing is reasonable and the proof burden is manageable if you package the case well.",
    gap: "The timing still feels risky because the proof is thin, the story is not packaged, or more runway is needed.",
    action: "Use the next cycle to close the proof gaps and package your case before making the formal ask.",
  },
};

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

function textScore(text: string, min = 80, good = 220, great = 520) {
  const length = text.trim().length;
  if (length >= great) return 100;
  if (length >= good) return 82;
  if (length >= min) return 62;
  if (length >= 30) return 42;
  return 20;
}

function keyedScore(group: keyof typeof SCORE_MAPS, value: string) {
  return SCORE_MAPS[group][value as keyof (typeof SCORE_MAPS)[typeof group]] ?? 35;
}

function labelFor(group: keyof typeof LABELS, value: string) {
  return LABELS[group][value as keyof (typeof LABELS)[typeof group]] ?? value;
}

function verdictForScore(score: number): PromotionReadinessVerdict {
  if (score >= 82) return "Ready now";
  if (score >= 68) return "Close, but not airtight";
  if (score >= 50) return "Needs more proof";
  return "Too early";
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
}) {
  const { currentTitle, desiredTitle, verdict, score, dimensions } = params;
  const ordered = [...dimensions].sort((a, b) => b.score - a.score);
  const strongest = ordered.slice(0, 2);
  const weakest = ordered.slice(-2).reverse();
  const move = [currentTitle, desiredTitle].filter(Boolean).join(" -> ");
  const topLabels = strongest.map(item => item.label.toLowerCase()).join(" and ");
  const lowLabels = weakest.map(item => item.label.toLowerCase()).join(" and ");

  const summary = verdict === "Ready now"
    ? `You have a credible promotion case for ${move || "the next role"} right now. The score is strong because your answers point to real proof, not just ambition.`
    : verdict === "Close, but not airtight"
      ? `You are close to having a credible case for ${move || "the next role"}, but it is not airtight yet. The core case is there, though a few weak spots still make the timing debatable.`
      : verdict === "Needs more proof"
        ? `There is a base to build on, but the current case for ${move || "the next role"} is not strong enough yet. The score says you need clearer proof before the ask feels convincing.`
        : `Right now the promotion case for ${move || "the next role"} is too early. The score reflects missing proof, weak support, or too much uncertainty around the next-level bar.`;

  const scoreReason = `Your score lands at ${score}/100 because ${topLabels} are helping the case, while ${lowLabels} are still dragging it down. Promotion decisions usually require a clear bar, repeatable proof, and support from the people who matter.`;

  const rationale = [
    `${strongest[0]?.label ?? "Your strongest area"} is the biggest reason the case has traction right now.`,
    `${weakest[0]?.label ?? "Your weakest area"} is the clearest reason the score is not higher.`,
    `To raise the score, close the lowest-scoring areas before you spend time polishing what is already working.`,
  ];

  const strengths = strongest.map(item => fallbackDimensionReason(item.label, Math.max(item.score, 75)));
  while (strengths.length < 3) strengths.push("You already have some proof to build on, which is better than starting from a blank slate.");

  const gaps = weakest.map(item => ({
    area: item.label,
    why: fallbackDimensionReason(item.label, Math.min(item.score, 50)),
    nextStep: DIMENSION_TEMPLATES[item.label]?.action ?? "Turn this area into a concrete plan before you make the ask.",
  }));
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
    "Who else needs to see stronger evidence before promotion timing becomes realistic?",
    "What would you want me to accomplish or show in the next review cycle to make this an easier yes?",
  ];

  const nextMoves = [
    weakest[0] ? DIMENSION_TEMPLATES[weakest[0].label]?.action ?? "Close the biggest gap first." : "Close the biggest gap first.",
    weakest[1] ? DIMENSION_TEMPLATES[weakest[1].label]?.action ?? "Build supporting proof in the second-weakest area." : "Build supporting proof in the second-weakest area.",
    "Turn your best wins into short proof points with scope, outcome, and what changed because of your work.",
    "Use your next 1:1 to replace assumptions with explicit promotion criteria and timing guidance.",
  ];

  const quickWins: QuickWin[] = [
    { title: "Fix the weakest dimension", body: `${weakest[0]?.label ?? "Your weakest area"} is the fastest way to move the score.`, jumpTo: "gaps" },
    { title: "Package the case", body: "Turn your wins into a short, repeatable case your manager can use upward.", jumpTo: "plan" },
    { title: "Pressure-test your manager", body: "Use the right questions before you assume the timing is good.", jumpTo: "conversation" },
  ];

  const evidenceChecklist = [
    "Tie each win to the next-level bar, not just to effort or ownership.",
    "Use measurable outcomes where possible: revenue, savings, adoption, speed, quality, or risk reduction.",
    "Show cross-functional influence, not just strong individual delivery.",
    "Use recent review language if it supports the promotion case.",
  ];

  const exampleEvidence = [
    `Led a cross-functional initiative that went beyond my current ${currentTitle || "role"}, aligned multiple stakeholders, and delivered a clear business outcome tied to the expectations of a ${desiredTitle || "next-level"} role.`,
    `Owned a high-visibility project from ambiguity to launch, influenced partner teams without direct authority, and improved a business metric that leadership cared about.`,
    `Created a repeatable approach that other teammates now use, showing not just delivery but leverage and next-level influence.`,
  ];

  const managerPitchExample = `I want to pressure-test whether I have a credible case for ${desiredTitle || "the next level"}. Based on the projects I have led, the outcomes, and the feedback I am getting, I think I may be close, but I want to understand exactly what still feels unproven to you before I push timing.`;

  const actionPlan: ActionPlanItem[] = [
    { label: "This week", action: "Turn your strongest wins into short proof points tied to the next-level bar." },
    { label: "Next 2 weeks", action: "Close the weakest gap with one visible piece of evidence or stronger feedback." },
    { label: "This cycle", action: "Make the case more visible to the people who influence promotion decisions." },
    { label: "Before the ask", action: "Pressure-test the case with your manager and leave with explicit timing guidance." },
  ];

  const riskFlags = [
    `${weakest[0]?.label ?? "A weak area"} is still weak enough to make the case feel risky.`,
    "If the bar is unclear, your manager may interpret the same evidence very differently from you.",
    "A strong case can still stall if the right people do not see it or cannot repeat it upward.",
  ];

  return { summary, scoreReason, rationale, strengths, gaps, managerQuestions, nextMoves, quickWins, evidenceChecklist, exampleEvidence, managerPitchExample, actionPlan, riskFlags };
}

function buildDimensionScores(body: {
  currentTitle: string;
  desiredTitle: string;
  timeInRole: string;
  askWindow: string;
  roleDescription: string;
  rubricClarity: string;
  recentProjects: string;
  scopeLevel: string;
  impactLevel: string;
  influenceLevel: string;
  reviewSignal: string;
  reviewSummary: string;
  managerSupport: string;
  visibilityLevel: string;
  blockers: string;
}) {
  const titlesScore = body.currentTitle && body.desiredTitle ? 100 : 35;
  const roleDescriptionScore = textScore(body.roleDescription, 100, 280, 700);
  const recentProjectsScore = textScore(body.recentProjects, 120, 320, 800);
  const reviewSummaryScore = textScore(body.reviewSummary, 70, 180, 420);
  const blockersClarityScore = textScore(body.blockers, 30, 110, 260);
  const completenessScore = Math.round(
    ([body.roleDescription, body.recentProjects, body.reviewSummary, body.blockers].filter(value => value.trim().length > 0).length / 4) * 100,
  );

  const dimensions: DimensionScore[] = [
    {
      label: "Bar clarity",
      score: average([
        keyedScore("rubricClarity", body.rubricClarity),
        roleDescriptionScore,
        titlesScore,
      ]),
    },
    {
      label: "Scope and impact",
      score: average([
        keyedScore("scopeLevel", body.scopeLevel),
        keyedScore("impactLevel", body.impactLevel),
        recentProjectsScore,
      ]),
    },
    {
      label: "Influence and leadership",
      score: average([
        keyedScore("influenceLevel", body.influenceLevel),
        recentProjectsScore,
        reviewSummaryScore,
      ]),
    },
    {
      label: "Feedback and support",
      score: average([
        keyedScore("reviewSignal", body.reviewSignal),
        keyedScore("managerSupport", body.managerSupport),
        keyedScore("visibilityLevel", body.visibilityLevel),
        reviewSummaryScore,
      ]),
    },
    {
      label: "Timing and proof",
      score: average([
        keyedScore("timeInRole", body.timeInRole),
        keyedScore("askWindow", body.askWindow),
        blockersClarityScore,
        completenessScore,
      ]),
    },
  ];

  const overallScore = Math.round(
    dimensions[0].score * 0.18 +
      dimensions[1].score * 0.28 +
      dimensions[2].score * 0.18 +
      dimensions[3].score * 0.22 +
      dimensions[4].score * 0.14,
  );

  return { dimensions, overallScore };
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
    askWindow: trim(rawBody.askWindow),
    roleDescription: trim(rawBody.roleDescription),
    rubricClarity: trim(rawBody.rubricClarity),
    recentProjects: trim(rawBody.recentProjects),
    scopeLevel: trim(rawBody.scopeLevel),
    impactLevel: trim(rawBody.impactLevel),
    influenceLevel: trim(rawBody.influenceLevel),
    reviewSignal: trim(rawBody.reviewSignal),
    reviewSummary: trim(rawBody.reviewSummary),
    managerSupport: trim(rawBody.managerSupport),
    visibilityLevel: trim(rawBody.visibilityLevel),
    blockers: trim(rawBody.blockers),
  };

  if (!body.currentTitle || !body.desiredTitle || !body.roleDescription || !body.recentProjects || !body.reviewSummary) {
    return NextResponse.json({ error: "Missing key promotion-readiness inputs" }, { status: 400 });
  }

  const { dimensions, overallScore } = buildDimensionScores(body);
  const verdict = verdictForScore(overallScore);

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try {
      userContext = await buildUserContext(userId);
    } catch {
      userContext = "";
    }
  }

  const fallback = buildFallbackResponse({
    currentTitle: body.currentTitle,
    desiredTitle: body.desiredTitle,
    verdict,
    score: overallScore,
    dimensions,
  });

  const scorePayload = {
    targetMove: `${body.currentTitle} -> ${body.desiredTitle}`,
    verdict,
    readinessScore: overallScore,
    dimensions,
    answers: {
      timeInRole: labelFor("timeInRole", body.timeInRole),
      askWindow: labelFor("askWindow", body.askWindow),
      rubricClarity: labelFor("rubricClarity", body.rubricClarity),
      scopeLevel: labelFor("scopeLevel", body.scopeLevel),
      impactLevel: labelFor("impactLevel", body.impactLevel),
      influenceLevel: labelFor("influenceLevel", body.influenceLevel),
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

  const systemPrompt = `You are Zari, a pragmatic promotion coach. You are given a completed promotion-readiness questionnaire plus precomputed scores. Do not change the provided score, verdict, or dimension scores. Your job is to explain them clearly, tell the user what to do next, and give examples that make the advice easier to act on.

Return ONLY valid JSON:
{
  "summary": "<2-3 sentence honest assessment>",
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
- Never mention ATS, resumes, recruiting, interviews, or job search.
- Be honest if support is weak, visibility is low, or the promotion bar is unclear.
- Keep the advice grounded in the submitted answers.
- Give 3 rationale bullets, 3-5 strengths, 3-5 gaps, 4-6 manager questions, 4-6 next moves, 3 quickWins, 4-5 checklist items, 3 exampleEvidence bullets, 4 actionPlan items, and 3 riskFlags.
- The dimensionReasons list must cover every provided dimension label exactly once.`;

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: JSON.stringify(scorePayload) },
    ],
    {
      model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.35,
      maxTokens: 2200,
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

  const dimensionReasonMap = new Map<string, string>();
  if (Array.isArray(parsed?.dimensionReasons)) {
    parsed.dimensionReasons.forEach(item => {
      if (!item || typeof item !== "object") return;
      const label = cleanString((item as Record<string, unknown>).label);
      const reason = cleanString((item as Record<string, unknown>).reason);
      if (label && reason) dimensionReasonMap.set(label, reason);
    });
  }

  const finalDimensions = dimensions.map(item => ({
    ...item,
    reason: dimensionReasonMap.get(item.label) || fallbackDimensionReason(item.label, item.score),
  }));

  return NextResponse.json({
    readinessScore: overallScore,
    verdict,
    summary: cleanString(parsed?.summary) || fallback.summary,
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
