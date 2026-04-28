import { NextResponse } from "next/server";

import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanList(value: unknown, max = 6) {
  return Array.isArray(value)
    ? value.map(item => cleanString(item)).filter(Boolean).slice(0, max)
    : [];
}

function pickEvidenceLines(source: string, max = 4) {
  return source
    .split(/\n+/)
    .map(line => line.replace(/^[-*•\s]+/, "").trim())
    .filter(line => line.length > 18)
    .slice(0, max);
}

type PromotionArtifact = {
  title: string;
  audience: string;
  channel: string;
  useCase: string;
  useWhen: string;
  subject?: string;
  body: string;
};

function cleanArtifacts(value: unknown, max = 5) {
  if (!Array.isArray(value)) return [];
  return value
    .map(item => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const title = cleanString(record.title);
      const audience = cleanString(record.audience);
      const channel = cleanString(record.channel);
      const useCase = cleanString(record.useCase ?? record.purpose);
      const useWhen = cleanString(record.useWhen);
      const subject = cleanString(record.subject);
      const body = cleanString(record.body);
      if (!title || !audience || !channel || !useCase || !useWhen || !body) return null;
      return { title, audience, channel, useCase, useWhen, subject, body };
    })
    .filter(Boolean)
    .slice(0, max) as PromotionArtifact[];
}

function detectReadinessScore(contextText: string) {
  const direct = contextText.match(/readiness audit:\s*(\d{1,3})/i);
  if (direct) return Number.parseInt(direct[1], 10);
  const short = contextText.match(/audit\s+(\d{1,3})\/100/i);
  if (short) return Number.parseInt(short[1], 10);
  return null;
}

function buildArtifactFallbacks(body: { targetLevel: string; evidenceText: string; contextText: string }, readinessScore: number | null) {
  const target = body.targetLevel || "the next level";
  const evidenceLines = pickEvidenceLines(body.evidenceText || body.contextText, 3);
  const proofLine = evidenceLines[0] ?? "I want to make sure I am using the clearest possible examples of my impact and scope.";
  const supportLine = evidenceLines[1] ?? "I would value blunt feedback on what still feels unproven for promotion.";
  const closingLine = evidenceLines[2] ?? "If there are specific gaps that still make the case hard to support, I would rather hear them directly now.";
  const earlyCase = readinessScore !== null && readinessScore < 62;

  const baseDocs = [
    {
      title: earlyCase ? "Manager checkpoint email" : "Promotion readiness email to manager",
      audience: "Direct manager",
      channel: "Email",
      useCase: earlyCase
        ? "Use this to get a blunt checkpoint before you act like the case is ready."
        : "Use this before a serious promotion-readiness conversation so your manager has context and cannot claim surprise.",
      useWhen: earlyCase
        ? "Use before you make a formal ask, especially if you still need the real bar and honest manager feedback."
        : "Use before your first explicit promotion conversation or before a review-cycle checkpoint.",
      subject: `Promotion readiness conversation for ${target}`,
      body: `Hi [Manager Name],\n\nI want to have a direct conversation about what it would take to make a credible case for ${target}.\n\nThe strongest evidence I would lead with today is:\n- ${proofLine}\n- ${supportLine}\n\nI do not want reassurance. I want a blunt read on whether this already sounds like ${target}-level work, what still feels weak or unproven, and what specific proof would make the case easier to support.\n\nIf you are open to it, I would appreciate 30 minutes to walk through the current evidence and leave with a clearer view of the gaps, timing, and next steps.\n\nThanks,\n[Your Name]`,
    },
    {
      title: "Peer feedback request",
      audience: "Cross-functional partner or peer",
      channel: "Email",
      useCase: "Use this when you need written proof from someone who saw your scope, influence, or outcomes directly.",
      useWhen: "Use after you know which project or working relationship best supports your case.",
      subject: "Quick request for specific feedback",
      body: `Hi [Name],\n\nI am preparing for a promotion conversation and I am collecting a few concrete examples from people who worked closely with me.\n\nWould you be willing to send me 3 to 5 sentences on any of the following?\n- where my work changed the outcome of a project or reduced risk\n- where I operated beyond my formal scope\n- where I influenced decisions, alignment, or execution across teams\n\nSpecific examples are much more useful than general praise. If anything still felt incomplete or could have been stronger, I am open to that feedback too.\n\nThank you,\n[Your Name]`,
    },
    {
      title: "Slack or Teams feedback ask",
      audience: "Peer, stakeholder, or project lead",
      channel: "Slack/Teams",
      useCase: "Use this when email is overkill and you just need a fast, specific proof point in writing.",
      useWhen: "Use when you need short written feedback from people who know the work well and respond better in chat.",
      body: `Hey [Name] — quick ask. I am getting my promotion case in shape and I am collecting a few concrete examples from people who saw the work up close. If anything stands out, could you send me 2-3 lines on where my work changed an outcome, unblocked something important, or showed next-level scope? Specific examples are much more useful than general praise. Totally fine if the answer is “not much comes to mind.”`,
    },
    {
      title: "Post-conversation follow-up",
      audience: "Direct manager",
      channel: "Email",
      useCase: "Use this right after the conversation so the gaps, timing, and next checkpoint are written down.",
      useWhen: "Use right after a promotion-readiness conversation so the bar and next steps are documented.",
      subject: "Follow-up on promotion readiness discussion",
      body: `Hi [Manager Name],\n\nThanks for the conversation today. My understanding is:\n- the strongest parts of the case right now are [fill in]\n- the main gaps still making promotion hard to support are [fill in]\n- the clearest proof to gather next is [fill in]\n- the right timing for the next checkpoint is [fill in]\n\nI am writing this down so I work against the real bar, not my own assumptions. If I missed anything important, please correct me directly.\n\nThanks,\n[Your Name]`,
    },
  ] satisfies PromotionArtifact[];

  if (earlyCase) {
    return baseDocs;
  }

  return [
    {
      title: "Promotion case one-pager",
      audience: "Manager, skip-level, or calibration reviewer",
      channel: "Doc",
      useCase: "Use this as the core written case when the evidence is strong enough to support a real promotion push.",
      useWhen: "Use after your manager agrees the timing is real and you need a short packet or memo.",
      body: `Promotion target: ${target}\n\nCore case:\nI am making the case that my work already reflects the scope, judgment, and impact expected at ${target}, not just strong performance at my current level.\n\nStrongest proof:\n- ${proofLine}\n- ${supportLine}\n- ${closingLine}\n\nWhat this demonstrates:\n- higher-level ownership, not just execution\n- impact that changed an outcome, reduced risk, or created leverage\n- influence that extended beyond my immediate tasks\n\nWhat still needs to be closed:\n- add sharper metrics where possible\n- tighten any examples that still sound like activity instead of business effect\n- gather outside proof from partners or reviewers who can confirm the scope\n`,
    },
    ...baseDocs,
    {
      title: "Calibration brief",
      audience: "Manager or sponsor",
      channel: "Talking points",
      useCase: "Use this when someone else needs to repeat your case upward without over-explaining it.",
      useWhen: "Use right before calibration, skip-level review, or any conversation where your manager needs crisp promotion language.",
      body: `[Name] is being considered for ${target}. The strongest case centers on work that already shows next-level scope, judgment, and business impact rather than simply strong execution at the current level.\n\nMost defensible proof:\n- ${proofLine}\n- ${supportLine}\n- ${closingLine}\n\nThis case is strongest when framed around repeatable pattern, not one-off heroics. The main risk is any example that cannot survive challenge on ownership, scale, or measurable effect.`,
    },
  ] satisfies PromotionArtifact[];
}

function buildFallback(body: { evidenceText: string; criteriaText: string; contextText: string; targetLevel: string }) {
  const target = body.targetLevel || "the next level";
  const readinessScore = detectReadinessScore(body.contextText);
  const earlyCase = readinessScore !== null && readinessScore < 62;

  return {
    coachTake: earlyCase
      ? `You are not at the “polish the packet” stage yet. Right now the move is to get sharper evidence, pressure-test the case with your manager, and gather written proof from people who actually saw the work.`
      : `You are close enough to turn the case into usable documents, but the writing only helps if it makes the proof easier for other people to trust and repeat upward. Think of this as a promotion document pack, not a branding exercise.`,
    strategy: earlyCase
      ? `Start with alignment and evidence-gathering docs, not a formal promotion packet. The order below is meant to help you learn the real bar, gather outside proof, and document the next checkpoint before you act like the case is already ready.`
      : `Lead with a short promotion case memo, then make it easy for your manager and partners to support it. The order below is designed to move from “here is the case” to “here is the support and follow-through that make it real.”`,
    redFlags: earlyCase
      ? [
          "Do not send a polished promotion memo if the real gap is still weak proof or unclear manager support.",
          "Do not ask for endorsement before you have concrete examples people can honestly back.",
          "Do not mistake activity or effort for a case that someone else can defend upward.",
        ]
      : [
          "A polished document will still fail if the underlying examples are vague or hard to verify.",
          "If your manager cannot repeat the case in two minutes, the packet is still doing too much work.",
          "Do not make the written case broader than the proof you can actually support in a live conversation.",
        ],
    documents: buildArtifactFallbacks(body, readinessScore),
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    evidenceText?: string;
    criteriaText?: string;
    contextText?: string;
    targetLevel?: string;
  };

  const evidenceText = (body.evidenceText ?? "").trim();
  const criteriaText = (body.criteriaText ?? "").trim();
  const contextText = (body.contextText ?? "").trim();
  const targetLevel = (body.targetLevel ?? "").trim();

  if (!evidenceText && !criteriaText) {
    return NextResponse.json({ error: "Provide evidence or criteria" }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const systemPrompt = `You are Zari, an elite career coach helping someone build a usable promotion evidence package.

${targetLevel ? `Target level: ${targetLevel}` : ""}
${userContext ? `Known profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "coachTake": "<2-4 sentence direct coach guidance written as Zari speaking to the user>",
  "strategy": "<2-4 sentence direct guidance on which documents matter now and what order to use them in>",
  "redFlags": ["<mistake to avoid>", "<mistake to avoid>", "<mistake to avoid>"],
  "documents": [
    {
      "title": "<artifact title>",
      "audience": "<who this is for>",
      "channel": "<Email | Slack/Teams | One-pager | Doc | Talking points>",
      "useCase": "<why this artifact is worth using right now>",
      "useWhen": "<when to use it>",
      "subject": "<email subject if relevant, otherwise empty string>",
      "body": "<full artifact body>"
    }
  ]
}

Requirements:
- This is NOT a cover letter. Never mention applying, hiring managers, or job search.
- The purpose is to help someone prepare for INTERNAL promotion with the right documents for their current stage.
- "coachTake" must sound like Zari coaching the user directly. Do not narrate in a detached product voice.
- "strategy" should tell the user which documents to use first and why.
- "redFlags" should call out mistakes that would make the documents backfire.
- "documents" should contain 3 to 5 practical internal-promotion artifacts someone would realistically use now.
- Prioritize artifacts such as: a manager checkpoint email, a promotion case memo, a peer-feedback request, a Slack/Teams message, a calibration brief, or a post-meeting follow-up.
- Do NOT default to LinkedIn messages. This is an internal promotion workflow, so external-networking artifacts are usually the wrong output unless the provided context makes them clearly relevant.
- The document mix must depend on the case strength.
- If the case is still early or weak, do NOT lead with a polished promotion packet. Prioritize feedback-gathering, manager alignment, and evidence-gathering documents instead.
- If the case is stronger and timing seems real, include more formal documents such as a promotion memo and a calibration brief.
- Use only evidence that can be traced back to the provided material.
- If evidence is thin, say so plainly and avoid inventing numbers.
- CRITICAL: Every single document must be anchored to specific evidence from the provided material. Do not write generic templates. If evidence mentions a specific project, outcome, or signal, reference it. If the evidence is thin, say so directly — do not pad with invented examples. The body of each document must feel like it was written for THIS person, not a sample user.
- Never write placeholder brackets like [Manager Name] in the coachTake, strategy, or redFlags. Only the document body should have [fill in] markers.`;

  const userPrompt = [
    evidenceText ? `PROMOTION EVIDENCE:\n${evidenceText.slice(0, 5000)}` : "",
    criteriaText ? `NEXT-LEVEL CRITERIA:\n${criteriaText.slice(0, 2500)}` : "",
    contextText ? `PROMOTION CONTEXT:\n${contextText.slice(0, 1500)}` : "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt || "Build the strongest honest promotion evidence pack from the available information." },
    ],
    {
      model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.28,
      maxTokens: 1900,
      jsonMode: true,
    }
  );

  const fallback = buildFallback({ evidenceText, criteriaText, contextText, targetLevel });

  if (!reply) return NextResponse.json(fallback);

  try {
    const parsed = JSON.parse(reply) as Record<string, unknown>;
    const result = {
      coachTake: cleanString(parsed.coachTake ?? parsed.overview),
      strategy: cleanString(parsed.strategy),
      redFlags: cleanList(parsed.redFlags ?? parsed.missingProof, 5),
      documents: cleanArtifacts(parsed.documents ?? parsed.feedbackRequests, 6),
    };
    result.coachTake ||= fallback.coachTake;
    result.strategy ||= fallback.strategy;
    result.redFlags = result.redFlags.length ? result.redFlags : fallback.redFlags;
    result.documents = result.documents.length ? result.documents : fallback.documents;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(fallback);
  }
}
