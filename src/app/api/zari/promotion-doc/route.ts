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
    contextText?: string;
    targetLevel?: string;
    audience?: "manager" | "committee" | "sponsor";
    tone?: "crisp" | "confident" | "strategic";
  };

  const evidenceText = (body.evidenceText ?? "").trim();
  const criteriaText = (body.criteriaText ?? "").trim();
  const contextText = (body.contextText ?? "").trim();
  const targetLevel = (body.targetLevel ?? "").trim();
  const audience = body.audience ?? "manager";
  const tone = body.tone ?? "strategic";

  if (!evidenceText && !criteriaText) {
    return NextResponse.json({ error: "Provide evidence or criteria" }, { status: 400 });
  }

  const toneGuide = {
    crisp: "tight, direct, and plainspoken. No filler. Every sentence earns its place.",
    confident: "clear and self-assured without sounding defensive or inflated.",
    strategic: "manager-ready and calibration-aware. Connects evidence to business priorities and next-level expectations.",
  }[tone];

  const audienceGuide = {
    manager: "Write a manager-ready self-review that makes it easy for the manager to advocate in calibration.",
    committee: "Write a promotion memo for a calibration or committee audience that will not know the person closely.",
    sponsor: "Write a sponsor brief that equips a senior leader to advocate with specific proof points.",
  }[audience];

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const systemPrompt = `You are Zari, an elite career coach helping someone build a promotion document.

${audienceGuide}
Tone: ${toneGuide}
${targetLevel ? `Target level: ${targetLevel}` : ""}
${userContext ? `Known profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "title": "<clear document title>",
  "summary": "<1-2 sentences on what the document argues>",
  "talkingPoints": ["<short proof theme>", "<short proof theme>", "<short proof theme>", "<short proof theme>"],
  "document": "<full self-review or promotion memo>"
}

Document requirements:
- This is NOT a cover letter. Never address a hiring manager or mention applying.
- Build the case around next-level scope, business impact, influence, and readiness.
- Use only evidence that can be traced back to the material provided.
- If evidence is thin, write the strongest honest version and avoid inventing numbers.
- Make the structure easy for a manager or committee to scan and reuse.
- Prefer short section headers over long wall-of-text paragraphs.
- Make the closing explicitly state why the person is ready now, not someday.`;

  const userPrompt = [
    evidenceText ? `PROMOTION EVIDENCE:\n${evidenceText.slice(0, 5000)}` : "",
    criteriaText ? `NEXT-LEVEL CRITERIA:\n${criteriaText.slice(0, 2500)}` : "",
    contextText ? `PROMOTION CONTEXT:\n${contextText.slice(0, 1500)}` : "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt || "Build the strongest honest promotion document from the available information." },
    ],
    {
      model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.45,
      maxTokens: 1800,
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
