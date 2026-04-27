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
  "managerBrief": "<third-person brief a manager could reuse>"
}

Requirements:
- This is NOT a cover letter. Never mention applying, hiring managers, or job search.
- The purpose is to help someone prepare for promotion with reusable material.
- "selfReview" must be in FIRST PERSON. Use "I", not the person's name.
- "managerBrief" must be in THIRD PERSON and sound like something a manager could adapt for calibration.
- "realityCheck" should be honest and unsentimental. Do not soften obvious gaps.
- "missingProof" should call out what is still too thin, too vague, or too unproven.
- "impactBullets" should be concise, evidence-led, and reusable in brag sheets or packets.
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
    };
    result.overview ||= fallback.overview;
    result.realityCheck ||= fallback.realityCheck;
    result.missingProof = result.missingProof.length ? result.missingProof : fallback.missingProof;
    result.impactBullets = result.impactBullets.length ? result.impactBullets : fallback.impactBullets;
    result.selfReview ||= fallback.selfReview;
    result.managerBrief ||= fallback.managerBrief;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(fallback);
  }
}
