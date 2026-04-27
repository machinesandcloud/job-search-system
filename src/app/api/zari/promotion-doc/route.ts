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
  purpose: string;
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
      const purpose = cleanString(record.purpose);
      const useWhen = cleanString(record.useWhen);
      const subject = cleanString(record.subject);
      const body = cleanString(record.body);
      if (!title || !audience || !channel || !purpose || !useWhen || !body) return null;
      return { title, audience, channel, purpose, useWhen, subject, body };
    })
    .filter(Boolean)
    .slice(0, max) as PromotionArtifact[];
}

function buildArtifactFallbacks(body: { targetLevel: string; evidenceText: string; contextText: string }) {
  const target = body.targetLevel || "the next level";
  const evidenceLines = pickEvidenceLines(body.evidenceText || body.contextText, 3);
  const proofLine = evidenceLines[0] ?? "I want to make sure I am using the clearest possible examples of my impact and scope.";
  const supportLine = evidenceLines[1] ?? "I would value blunt feedback on what still feels unproven for promotion.";
  const closingLine = evidenceLines[2] ?? "If there are specific gaps that still make the case hard to support, I would rather hear them directly now.";

  return [
    {
      title: "Promotion readiness email to manager",
      audience: "Direct manager",
      channel: "Email",
      purpose: "Ask for a focused promotion-readiness conversation with enough context to prepare seriously.",
      useWhen: "Use before your first explicit promotion conversation or before a review-cycle checkpoint.",
      subject: `Promotion readiness conversation for ${target}`,
      body: `Hi [Manager Name],\n\nI want to have a direct conversation about what it would take to make a credible case for ${target}.\n\nThe strongest evidence I would lead with today is:\n- ${proofLine}\n- ${supportLine}\n\nI do not want reassurance. I want a blunt read on whether this already sounds like ${target}-level work, what still feels weak or unproven, and what specific proof would make the case easier to support.\n\nIf you are open to it, I would appreciate 30 minutes to walk through the current evidence and leave with a clearer view of the gaps, timing, and next steps.\n\nThanks,\n[Your Name]`,
    },
    {
      title: "Peer feedback request",
      audience: "Cross-functional partner or peer",
      channel: "Email",
      purpose: "Request concrete promotion-relevant feedback that you can use in a packet, self-review, or manager conversation.",
      useWhen: "Use after you know which project or working relationship best supports your case.",
      subject: "Quick request for specific feedback",
      body: `Hi [Name],\n\nI am preparing for a promotion conversation and I am collecting a few concrete examples from people who worked closely with me.\n\nWould you be willing to send me 3 to 5 sentences on any of the following?\n- where my work changed the outcome of a project or reduced risk\n- where I operated beyond my formal scope\n- where I influenced decisions, alignment, or execution across teams\n\nSpecific examples are much more useful than general praise. If anything still felt incomplete or could have been stronger, I am open to that feedback too.\n\nThank you,\n[Your Name]`,
    },
    {
      title: "Slack or Teams feedback ask",
      audience: "Peer, stakeholder, or project lead",
      channel: "Slack/Teams",
      purpose: "Ask for fast, specific written proof without sending a formal email.",
      useWhen: "Use when you need short written feedback from people who know the work well and respond better in chat.",
      body: `Hey [Name] — quick ask. I am getting my promotion case in shape and I am collecting a few concrete examples from people who saw the work up close. If anything stands out, could you send me 2-3 lines on where my work changed an outcome, unblocked something important, or showed next-level scope? Specific examples are much more useful than general praise. Totally fine if the answer is “not much comes to mind.”`,
    },
    {
      title: "Promotion case one-pager",
      audience: "Manager, skip-level, or calibration reviewer",
      channel: "One-pager",
      purpose: "Summarize the case in a format someone else can scan and repeat upward.",
      useWhen: "Use after you have enough evidence to support a formal promotion discussion or packet.",
      body: `Promotion target: ${target}\n\nCore case:\nI am making the case that my work already reflects the scope, judgment, and impact expected at ${target}, not just strong performance at my current level.\n\nStrongest proof:\n- ${proofLine}\n- ${supportLine}\n- ${closingLine}\n\nWhat this demonstrates:\n- higher-level ownership, not just execution\n- impact that changed an outcome, reduced risk, or created leverage\n- influence that extended beyond my immediate tasks\n\nWhat still needs to be closed:\n- add sharper metrics where possible\n- tighten any examples that still sound like activity instead of business effect\n- gather outside proof from partners or reviewers who can confirm the scope\n`,
    },
    {
      title: "Post-conversation follow-up",
      audience: "Direct manager",
      channel: "Email",
      purpose: "Confirm what you heard, what is still missing, and what evidence will be used for the next checkpoint.",
      useWhen: "Use right after a promotion-readiness conversation so the bar and next steps are documented.",
      subject: "Follow-up on promotion readiness discussion",
      body: `Hi [Manager Name],\n\nThanks for the conversation today. My understanding is:\n- the strongest parts of the case right now are [fill in]\n- the main gaps still making promotion hard to support are [fill in]\n- the clearest proof to gather next is [fill in]\n- the right timing for the next checkpoint is [fill in]\n\nI am writing this down so I work against the real bar, not my own assumptions. If I missed anything important, please correct me directly.\n\nThanks,\n[Your Name]`,
    },
  ] satisfies PromotionArtifact[];
}

function buildFallback(body: { evidenceText: string; criteriaText: string; contextText: string; targetLevel: string }) {
  const target = body.targetLevel || "the next level";
  const evidenceLines = pickEvidenceLines(body.evidenceText || body.contextText, 4);
  const impactBullets = evidenceLines.length
    ? evidenceLines.map(line => line.endsWith(".") ? line : `${line}.`)
    : [
        `Summarize your strongest work in a way that clearly reads as ${target}-level scope, not just solid execution.`,
        "Make every proof point show ownership, judgment, and business effect instead of activity alone.",
        "Use metrics where you truly have them and plain language where you do not.",
      ];

  return {
    overview: `This pack is meant to turn scattered promotion evidence into reusable material for ${target}. It is only credible to the extent that the proof sounds specific, next-level, and easy for someone else to repeat upward.`,
    realityCheck: `If the current evidence still sounds like good current-level work instead of undeniable next-level proof, no amount of polish will rescue the case.`,
    missingProof: [
      "Any example that still lacks business impact, consequence, or measurable outcome.",
      "Any claim of next-level scope that is not backed by a clear situation, decision, or cross-functional effect.",
      "Any leadership or influence signal that still sounds implied rather than demonstrated.",
    ],
    impactBullets,
    selfReview: `I am building a promotion case for ${target}. My strongest evidence needs to show not just good execution, but that I am already operating with the scope, judgment, and impact expected at that level. The strongest examples I should lead with are the ones that changed a result, influenced other teams, or created leverage beyond my own output.`,
    managerBrief: `This promotion case for ${target} is strongest when framed around concrete outcomes, next-level scope, and evidence other reviewers can repeat upward. The work should be positioned as proof of readiness, not just strong performance in the current role.`,
    documents: buildArtifactFallbacks(body),
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
  "overview": "<1-2 sentence explanation of the case>",
  "realityCheck": "<1-2 sentence blunt truth about what is still weak or unconvincing>",
  "missingProof": ["<what is still missing>", "<what is still missing>", "<what is still missing>"],
  "impactBullets": ["<concise evidence bullet>", "<concise evidence bullet>", "<concise evidence bullet>"],
  "selfReview": "<first-person self-review draft>",
  "managerBrief": "<third-person brief a manager could reuse>",
  "documents": [
    {
      "title": "<artifact title>",
      "audience": "<who this is for>",
      "channel": "<Email | Slack/Teams | One-pager | Talking points>",
      "purpose": "<why this artifact exists>",
      "useWhen": "<when to use it>",
      "subject": "<email subject if relevant, otherwise empty string>",
      "body": "<full artifact body>"
    }
  ]
}

Requirements:
- This is NOT a cover letter. Never mention applying, hiring managers, or job search.
- The purpose is to help someone prepare for INTERNAL promotion with reusable material.
- "selfReview" must be in FIRST PERSON. Use "I", not the person's name.
- "managerBrief" must be in THIRD PERSON and sound like something a manager could adapt for calibration.
- "realityCheck" should be honest and unsentimental. Do not soften obvious gaps.
- "missingProof" should call out what is still too thin, too vague, or too unproven.
- "impactBullets" should be concise, evidence-led, and reusable in brag sheets or packets.
- "documents" should contain 3 to 5 practical internal-promotion artifacts that someone would realistically send or use.
- Prioritize artifacts such as: a manager email, a peer-feedback request, a Slack/Teams message, a sponsor/skip-level note, a promotion one-pager, or a post-meeting follow-up.
- Do NOT default to LinkedIn messages. This is an internal promotion workflow, so external-networking artifacts are usually the wrong output unless the provided context makes them clearly relevant.
- Build the case around next-level scope, business impact, influence, and readiness.
- Use only evidence that can be traced back to the provided material.
- If evidence is thin, say so plainly and avoid inventing numbers.`;

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
      temperature: 0.45,
      maxTokens: 1900,
      jsonMode: true,
    }
  );

  const fallback = buildFallback({ evidenceText, criteriaText, contextText, targetLevel });

  if (!reply) return NextResponse.json(fallback);

  try {
    const parsed = JSON.parse(reply) as Record<string, unknown>;
    const result = {
      overview: cleanString(parsed.overview),
      realityCheck: cleanString(parsed.realityCheck),
      missingProof: cleanList(parsed.missingProof, 5),
      impactBullets: cleanList(parsed.impactBullets, 6),
      selfReview: cleanString(parsed.selfReview),
      managerBrief: cleanString(parsed.managerBrief),
      documents: cleanArtifacts(parsed.documents, 5),
    };
    result.overview ||= fallback.overview;
    result.realityCheck ||= fallback.realityCheck;
    result.missingProof = result.missingProof.length ? result.missingProof : fallback.missingProof;
    result.impactBullets = result.impactBullets.length ? result.impactBullets : fallback.impactBullets;
    result.selfReview ||= fallback.selfReview;
    result.managerBrief ||= fallback.managerBrief;
    result.documents = result.documents.length ? result.documents : fallback.documents;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(fallback);
  }
}
