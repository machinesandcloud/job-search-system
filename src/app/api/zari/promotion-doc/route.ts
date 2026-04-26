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

  if (!reply) return NextResponse.json({ error: "Generation failed" }, { status: 503 });

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
    if (!result.overview || !result.selfReview || !result.managerBrief) {
      return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
    }
    if (!result.realityCheck) {
      result.realityCheck = "The package is only as strong as the evidence you gave it. If the proof is vague, leadership will feel that immediately.";
    }
    if (!result.missingProof.length) {
      result.missingProof = [
        "Any business impact that still lacks hard numbers or concrete outcomes.",
        "Any next-level behavior you are claiming without a strong example behind it.",
        "Any leadership or influence proof that still sounds implied instead of demonstrated.",
      ];
    }
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
