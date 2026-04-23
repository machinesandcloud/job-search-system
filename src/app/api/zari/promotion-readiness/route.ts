import { NextResponse } from "next/server";

import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    evidenceText?: string;
    criteriaText?: string;
    targetLevel?: string;
    contextText?: string;
  };

  const evidenceText = (body.evidenceText ?? "").trim();
  const criteriaText = (body.criteriaText ?? "").trim();
  const targetLevel = (body.targetLevel ?? "").trim();
  const contextText = (body.contextText ?? "").trim();

  if (!evidenceText && !criteriaText) {
    return NextResponse.json({ error: "Provide evidence or criteria" }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const systemPrompt = `You are Zari, a sharp promotion coach. Audit whether someone has a real promotion case yet.

${targetLevel ? `Target level: ${targetLevel}` : ""}
${userContext ? `Known profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "verdict": "<Strong case|Close but needs proof|Too early>",
  "summary": "<2-3 sentence honest assessment>",
  "strengths": ["<what already supports the promotion case>"],
  "gaps": [
    { "area": "<gap category>", "why": "<why it weakens the case>", "nextStep": "<specific way to close it>" }
  ],
  "managerQuestions": ["<question to ask manager or skip-level>"],
  "nextMoves": ["<specific next step>"]
}

Rules:
- This is not a resume review. Never talk about ATS, job descriptions, recruiters, or interviewing.
- Judge the case on next-level scope, business impact, influence, consistency, and decision-maker confidence.
- Be honest. Not everyone is promotion-ready.
- If the evidence is vague, say so directly.
- Give 3-5 strengths, 3-5 gaps, 4-6 manager questions, and 4-6 next moves.
- Make the manager questions actionable and specific enough to ask in a real 1:1.`;

  const userPrompt = [
    evidenceText ? `PROMOTION EVIDENCE:\n${evidenceText.slice(0, 5000)}` : "",
    criteriaText ? `NEXT-LEVEL CRITERIA:\n${criteriaText.slice(0, 2500)}` : "",
    contextText ? `PROMOTION CONTEXT:\n${contextText.slice(0, 1500)}` : "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt || "Audit my promotion readiness from the available information." },
    ],
    {
      model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.4,
      maxTokens: 1400,
      jsonMode: true,
    }
  );

  if (!reply) return NextResponse.json({ error: "Generation failed" }, { status: 503 });

  try {
    return NextResponse.json(JSON.parse(reply));
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
