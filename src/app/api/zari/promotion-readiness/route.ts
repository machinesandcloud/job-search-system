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
  return /\b(not sure|don't know|do not know|no idea|n\/a|na|none|nothing yet|unknown|tbd)\b/.test(cleaned);
}

function estimateFallbackScore(body: PromotionReadinessBody) {
  let score = 18;

  const addFromMap = (value: string | undefined, map: Record<string, number>, fallback = 0) => {
    score += map[value ?? ""] ?? fallback;
  };

  addFromMap(body.timeInRole, { under_6m: 2, "6_12m": 6, "1_2y": 10, "2plus_y": 12 });
  addFromMap(body.rubricClarity, { exact_rubric: 14, main_expectations: 10, some_hints: 5, guessing: 1 });
  addFromMap(body.scopeLevel, { already_next_level: 19, bigger_than_role: 14, strong_in_role: 8, mostly_expected_scope: 4, still_growing: 1 });
  addFromMap(body.impactLevel, { repeatable_measured: 18, clear_some_measured: 12, some_wins: 7, hard_to_show: 2 });
  addFromMap(body.reviewSignal, { explicit_next_level: 14, strong_stretch: 10, solid_but_neutral: 6, mixed: 2, weak: -4 });
  addFromMap(body.managerSupport, { actively_advocating: 13, supportive_with_more_proof: 8, unclear: 3, skeptical: -5 });
  addFromMap(body.visibilityLevel, { decision_makers_see_it: 12, manager_and_partners: 8, mostly_team: 4, low_visibility: -3 });

  const roleDescription = trim(body.roleDescription);
  const recentProjects = trim(body.recentProjects);
  const reviewSummary = trim(body.reviewSummary);
  const blockers = trim(body.blockers);

  if (wordCount(roleDescription) >= 90) score += 3;
  if (wordCount(recentProjects) >= 80) score += 4;
  if (wordCount(reviewSummary) >= 30) score += 2;
  if (wordCount(trim(body.blockers)) >= 3 && !/\bnone|nothing\b/i.test(trim(body.blockers))) score -= 2;

  if (wordCount(roleDescription) < 30 || isPlaceholderLike(roleDescription)) score -= 16;
  if (wordCount(recentProjects) < 25 || isPlaceholderLike(recentProjects)) score -= 18;
  if (reviewSummary && (wordCount(reviewSummary) < 8 || isPlaceholderLike(reviewSummary))) score -= 5;
  if (blockers && isPlaceholderLike(blockers)) score -= 3;

  const managerTrack = looksLikeManagerTrack(trim(body.desiredTitle), trim(body.roleDescription));
  if (managerTrack && !hasLeadershipSignals(`${trim(body.recentProjects)} ${trim(body.reviewSummary)}`)) {
    score -= 16;
  }

  const targetTitle = trim(body.desiredTitle).toLowerCase();
  const currentTitle = trim(body.currentTitle).toLowerCase();
  const levelJump =
    (/\bdirector|head|vp\b/.test(targetTitle) && !/\bdirector|head|vp\b/.test(currentTitle)) ||
    (/\bprincipal|staff\b/.test(targetTitle) && !/\bprincipal|staff|lead\b/.test(currentTitle));
  if (levelJump) score -= 7;

  return clamp(score, 8, 92);
}

function buildFallback(body: PromotionReadinessBody & {
  currentTitle: string;
  desiredTitle: string;
}, readinessScore: number) {
  const target = body.desiredTitle || "the next role";
  const managerTrack = looksLikeManagerTrack(body.desiredTitle, body.roleDescription ?? "");
  const roleFitReason = managerTrack && !hasLeadershipSignals(`${body.recentProjects ?? ""} ${body.reviewSummary ?? ""}`)
    ? `The target role sounds like it expects clear leadership proof, and your current evidence does not show enough of that yet.`
    : `Your target role is believable only to the extent that your current work already looks like ${target}.`;
  const barReason = body.rubricClarity
    ? `Right now your clarity on the bar is "${labelFor("rubricClarity", body.rubricClarity)}", which affects how accurately you can judge readiness.`
    : "The next-level bar is still too fuzzy, which makes it easy to overestimate the case.";
  const evidenceReason = body.impactLevel
    ? `Your impact signal reads as "${labelFor("impactLevel", body.impactLevel)}", so the case rises or falls on how concrete the outcomes actually are.`
    : "The evidence is only useful if it proves scope, outcomes, and next-level judgment clearly.";
  const supportReason = [body.managerSupport ? labelFor("managerSupport", body.managerSupport) : "", body.visibilityLevel ? labelFor("visibilityLevel", body.visibilityLevel) : ""]
    .filter(Boolean)
    .join(" / ");
  const timingReason = body.timeInRole
    ? `You have been in role for ${labelFor("timeInRole", body.timeInRole)}, so timing only helps if the proof already reads as next-level.`
    : "Time in seat does not matter much if the case still lacks proof.";

  return {
    summary: `Here’s my blunt read: your case for ${target} lands at ${readinessScore}/100 today because I can only defend what your evidence actually proves. If the proof does not clearly read as next-level scope, impact, and judgment, I am not going to pretend the case is stronger than it is.`,
    realityCheck: `Wanting ${target} is not the same as being ready for ${target}. If your examples are vague, thin, or still read like strong work at your current level, I need to score the case low and tell you that directly.`,
    scoreReason: "I scored what you showed me, not the potential version of you. The dropdowns help with context, but the written proof, clarity of the promotion bar, and visible support are what really move the number.",
    rationale: [
      "You only get credit for proof that would still hold up if someone challenged it in calibration.",
      "Promotion readiness is about defendable evidence, not effort, intent, or how badly you want the title.",
      "Even genuinely strong work gets blocked when the outcomes, scope jump, or sponsorship still sound fuzzy.",
    ],
    strengths: [
      "You gave me a specific target role to judge instead of a vague growth goal.",
      "There is at least enough context here for me to tell you where the case bends and where it breaks.",
      "You gave me real promotion inputs to work with, which is already better than guessing in the dark.",
    ],
    gaps: [
      { area: "Proof quality", why: "Your strongest examples still need to read like next-level evidence, not just solid execution.", nextStep: "Rewrite your best wins around ownership, scope, judgment, and business effect." },
      { area: "Promotion bar", why: "If you are fuzzy on the real bar, you are probably over-crediting parts of the case.", nextStep: "Get the clearest internal expectations you can and map your proof against them line by line." },
      { area: "Support", why: "A promotion case stalls fast when the right people cannot repeat it upward with confidence.", nextStep: "Pressure-test manager support and visibility before you push timing or ask for backing." },
    ],
    managerQuestions: [
      `If you had to defend my case for ${target} tomorrow, what exact proof would still be missing?`,
      "Which parts of my case already sound next-level to you, and which parts still sound like strong current-level work?",
      "What would I need to show in the next cycle to make this feel like an easier yes instead of a stretch?",
      "Who else would need stronger evidence before promotion timing becomes realistic?",
    ],
    nextMoves: [
      "Rewrite your best wins into tight proof points with outcomes, stakes, and ownership.",
      "Close the weakest evidence gap before you spend time polishing the rest of the story.",
      "Get direct feedback on what still feels unproven instead of guessing where the resistance is.",
      "Make the case more visible to the people who actually influence the decision.",
    ],
    quickWins: [
      { title: "Start with the weak spots", body: "Do not polish the happy parts first. Fix the part of the case that would collapse under pushback.", jumpTo: "gaps" as const },
      { title: "Pressure-test support", body: "Get an honest manager signal before you tell yourself the timing is good.", jumpTo: "conversation" as const },
      { title: "Tighten the proof", body: "Sharpen the examples before you sharpen the pitch.", jumpTo: "plan" as const },
    ],
    evidenceChecklist: [
      "Tie every example to next-level behavior, not just effort or reliability.",
      "Use business outcomes, metrics, or meaningful consequences whenever you honestly can.",
      "Make ownership, judgment, and scope obvious enough that another person could repeat the story upward.",
      "Use review language only when it truly helps the case instead of decorating it.",
    ],
    exampleEvidence: [
      `I owned work that clearly went beyond my current level and changed a result leadership actually cared about.`,
      `I took a messy, high-visibility problem from ambiguity to outcome and I can explain exactly what changed because of my decisions.`,
      `I created leverage beyond my own output through strategy, influence, or repeatable systems that other people benefited from.`,
    ],
    managerPitchExample: `I want to pressure-test whether I actually have a credible case for ${target}. I am not looking for encouragement. I want the blunt version of what already reads as next-level and what still does not.`,
    actionPlan: [
      { label: "This week", action: "Rewrite your strongest examples into crisp proof points that can survive challenge." },
      { label: "Next 2 weeks", action: "Close the weakest evidence gap with a sharper example, a harder metric, or stronger outside proof." },
      { label: "This cycle", action: "Make the case clearer to your manager and the people who will influence the promotion call." },
      { label: "Before the ask", action: "Leave the manager conversation with a clear proof bar, owner, and timing signal." },
    ],
    riskFlags: [
      "A weak case often feels stronger from the inside than it does to a reviewer.",
      "Promotion timing falls apart fast when the evidence is vague or the support is thin.",
      "Good performers still get blocked when the case is hard for someone else to repeat upward.",
    ],
    dimensions: [
      { label: "Role fit", score: clamp(readinessScore + (managerTrack ? -6 : 2), 15, 95), reason: roleFitReason },
      { label: "Bar clarity", score: clamp(readinessScore + (body.rubricClarity === "exact_rubric" ? 10 : body.rubricClarity === "guessing" ? -15 : 0), 10, 95), reason: barReason },
      { label: "Evidence & impact", score: clamp(readinessScore + (body.impactLevel === "repeatable_measured" ? 8 : body.impactLevel === "hard_to_show" ? -12 : 0), 10, 95), reason: evidenceReason },
      { label: "Support & visibility", score: clamp(readinessScore + (body.managerSupport === "actively_advocating" ? 8 : body.managerSupport === "skeptical" ? -12 : 0) + (body.visibilityLevel === "low_visibility" ? -8 : 0), 10, 95), reason: supportReason ? `Your current support picture is ${supportReason}. That affects how easily the case can be defended by other people.` : "Support matters because promotion cases are repeated upward, not judged in private." },
      { label: "Timing & risk", score: clamp(readinessScore + (body.timeInRole === "2plus_y" ? 5 : body.timeInRole === "under_6m" ? -8 : 0), 10, 95), reason: `${timingReason}${body.blockers ? ` Current blockers: ${clip(body.blockers, 180)}.` : ""}` },
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
  "managerQuestions": ["<question for manager>", "<question for manager>", "<question for manager>", "<question for manager>"],
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
- Never mention resumes, recruiting, or job search.`;

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
