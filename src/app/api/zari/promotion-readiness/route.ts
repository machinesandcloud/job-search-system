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

function buildFallback(body: {
  currentTitle: string;
  desiredTitle: string;
}) {
  const target = body.desiredTitle || "the next role";
  return {
    summary: `This is a real promotion question, not a confidence exercise. Zari judged how believable your case for ${target} is today, based on the proof and context you gave.`,
    realityCheck: `If the evidence is vague, thin, or below the level expected for ${target}, the score should stay low no matter how ambitious the target is.`,
    scoreReason: "The score reflects current proof, not future potential. Strong intent does not close a weak case.",
    rationale: [
      "The next-level bar matters only if you can show proof against it.",
      "Promotion readiness is about defendable evidence, not effort alone.",
      "Weak support or vague outcomes can sink a case even when the work feels strong.",
    ],
    strengths: [
      "You gave enough context for a direct readiness review instead of a generic answer.",
      "The audit is anchored to a specific target role, not a vague growth goal.",
      "The output is designed to tell you what is true now, not what might be true later.",
    ],
    gaps: [
      { area: "Proof quality", why: "The current evidence still needs to read as clear next-level proof.", nextStep: "Rewrite your strongest wins with ownership, scope, and business outcomes." },
      { area: "Promotion bar", why: "If the bar is fuzzy, the case is easier to overrate.", nextStep: "Get the clearest internal expectations you can and map your proof to them." },
      { area: "Support", why: "Even strong work stalls when the right people cannot defend it upward.", nextStep: "Pressure-test manager support and visibility before pushing timing." },
    ],
    managerQuestions: [
      `What specific evidence would make you confident I am already operating at the ${target} level?`,
      "Which parts of my case already read as next-level and which parts still feel weak?",
      "What would I need to show in the next cycle to make this an easier yes?",
      "Who else needs to see stronger evidence before promotion timing is realistic?",
    ],
    nextMoves: [
      "Rewrite your best wins into tight proof points with hard outcomes.",
      "Close the clearest evidence gap before you spend time polishing the rest.",
      "Get direct feedback on what still feels unproven.",
      "Make the case more visible to the people who influence the decision.",
    ],
    quickWins: [
      { title: "Read the gaps", body: "Start with what is still weak instead of what already sounds good.", jumpTo: "gaps" as const },
      { title: "Pressure-test support", body: "Get an honest manager signal before assuming timing is good.", jumpTo: "conversation" as const },
      { title: "Tighten the proof", body: "Make your best examples sharper before you make the ask.", jumpTo: "plan" as const },
    ],
    evidenceChecklist: [
      "Tie each example to next-level behavior, not just effort.",
      "Use business outcomes, metrics, or meaningful consequences.",
      "Show ownership, judgment, and scope clearly.",
      "Use review language only when it actually supports the case.",
    ],
    exampleEvidence: [
      `Owned work that went beyond the expectations of my current role and changed a result leadership cared about.`,
      `Led a high-visibility problem from ambiguity to outcome and can explain exactly what changed because of my work.`,
      `Created leverage beyond my own output through strategy, influence, or repeatable systems.`,
    ],
    managerPitchExample: `I want to pressure-test whether I really have a credible case for ${target}. I am not looking for encouragement. I want to understand what already reads as next-level and what still does not.`,
    actionPlan: [
      { label: "This week", action: "Rewrite your strongest examples into crisp proof points." },
      { label: "Next 2 weeks", action: "Close the weakest evidence gap with a stronger example, metric, or visible outcome." },
      { label: "This cycle", action: "Make the case clearer to your manager and the people who influence promotion decisions." },
      { label: "Before the ask", action: "Leave a manager conversation with a clear proof bar and timing signal." },
    ],
    riskFlags: [
      "A weak case can feel stronger to you than it looks to a reviewer.",
      "Promotion timing is fragile when the evidence is vague or support is thin.",
      "A good performer still gets blocked when the case is hard to repeat upward.",
    ],
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
    reviewSignal: trim(rawBody.reviewSignal),
    reviewSummary: trim(rawBody.reviewSummary),
    managerSupport: trim(rawBody.managerSupport),
    visibilityLevel: trim(rawBody.visibilityLevel),
    blockers: trim(rawBody.blockers),
  };

  if (!body.currentTitle || !body.desiredTitle || !body.roleDescription || !body.recentProjects || !body.reviewSummary) {
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

  const systemPrompt = `You are Zari, a blunt, realistic promotion coach. Review the full questionnaire and judge how defensible the promotion case is today.

Important:
- You must infer whether this target is an IC step, a technical leadership step, or a people-manager step from the title, rubric, and evidence.
- Do NOT force people-management criteria onto IC promotions.
- If the target clearly requires people leadership, organizational influence, or broader management scope, then demand that proof.
- Score current readiness, not future potential.
- Be honest and unsentimental. Do not inflate scores to be encouraging.
- Vague answers, missing metrics, unclear promotion bars, weak support, and big level jumps should lower the score.
- If the evidence is strong for a Staff/Principal/IC leadership track without direct reports, do not punish that just because there is no people management.

Return ONLY valid JSON:
{
  "readinessScore": <integer 0-100>,
  "verdict": "<Ready now|Close, but not airtight|Needs more proof|Too early>",
  "summary": "<2-3 sentence honest assessment>",
  "realityCheck": "<1-3 sentence blunt truth about what is not believable yet>",
  "scoreReason": "<2-3 sentence plain-English explanation of why the score lands there>",
  "dimensions": [
    { "label": "Role fit", "score": <0-100>, "reason": "<1-2 sentence explanation>" },
    { "label": "Bar clarity", "score": <0-100>, "reason": "<1-2 sentence explanation>" },
    { "label": "Evidence & impact", "score": <0-100>, "reason": "<1-2 sentence explanation>" },
    { "label": "Support & visibility", "score": <0-100>, "reason": "<1-2 sentence explanation>" },
    { "label": "Timing & risk", "score": <0-100>, "reason": "<1-2 sentence explanation>" }
  ],
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
  "riskFlags": ["<what could still sink the case>"]
}

Rules:
- Talk to the user as "you".
- Never mention resumes, recruiting, or job search.
- 3 rationale bullets, 3-5 strengths, 3-5 gaps, 4-6 manager questions, 4-6 next moves, 3 quickWins, 4-5 checklist items, 3 exampleEvidence bullets, 4 actionPlan items, and 3-4 riskFlags.
- The dimension labels must be exactly: Role fit, Bar clarity, Evidence & impact, Support & visibility, Timing & risk.`;

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: JSON.stringify(payload) },
    ],
    {
      model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.28,
      maxTokens: 2400,
      jsonMode: true,
    },
  );

  if (!reply) {
    return NextResponse.json({ error: "Could not generate the readiness audit" }, { status: 503 });
  }

  let parsed: LlmPayload | null = null;
  try {
    parsed = JSON.parse(reply) as LlmPayload;
  } catch {
    parsed = null;
  }

  if (!parsed) {
    return NextResponse.json({ error: "Could not parse the readiness audit" }, { status: 500 });
  }

  const readinessScore = normalizeScore(parsed.readinessScore);
  const verdict = normalizeVerdict(parsed.verdict, readinessScore);
  const fallback = buildFallback({
    currentTitle: body.currentTitle,
    desiredTitle: body.desiredTitle,
  });

  return NextResponse.json({
    readinessScore,
    verdict,
    summary: cleanString(parsed.summary) || fallback.summary,
    realityCheck: cleanString(parsed.realityCheck) || fallback.realityCheck,
    scoreReason: cleanString(parsed.scoreReason) || fallback.scoreReason,
    dimensions: normalizeDimensions(parsed.dimensions, readinessScore),
    rationale: normalizeStringArray(parsed.rationale, fallback.rationale, 3, 4),
    strengths: normalizeStringArray(parsed.strengths, fallback.strengths, 3, 5),
    gaps: normalizeGaps(parsed.gaps, fallback.gaps),
    managerQuestions: normalizeStringArray(parsed.managerQuestions, fallback.managerQuestions, 4, 6),
    nextMoves: normalizeStringArray(parsed.nextMoves, fallback.nextMoves, 4, 6),
    quickWins: normalizeQuickWins(parsed.quickWins, fallback.quickWins),
    evidenceChecklist: normalizeStringArray(parsed.evidenceChecklist, fallback.evidenceChecklist, 4, 5),
    exampleEvidence: normalizeStringArray(parsed.exampleEvidence, fallback.exampleEvidence, 3, 4),
    managerPitchExample: cleanString(parsed.managerPitchExample) || fallback.managerPitchExample,
    actionPlan: normalizeActionPlan(parsed.actionPlan, fallback.actionPlan),
    riskFlags: normalizeStringArray(parsed.riskFlags, fallback.riskFlags, 3, 4),
  });
}
