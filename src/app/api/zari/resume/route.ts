import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    resumeText?: string;
    stage?: string;
    targetRole?: string;
  };

  const resumeText = (body.resumeText ?? "").trim();
  const stage = body.stage ?? "job-search";
  const targetRole = body.targetRole ?? "";

  if (!resumeText) {
    return NextResponse.json({ error: "Resume text required" }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const systemPrompt = `You are Zari, an expert AI career coach and resume strategist. Analyze the provided resume and return a structured JSON analysis.

${userContext ? `User context:\n${userContext}\n\n` : ""}

Return ONLY a valid JSON object with exactly this structure:
{
  "overall": <number 0-100>,
  "ats": <number 0-100>,
  "impact": <number 0-100>,
  "clarity": <number 0-100>,
  "findings": [
    { "type": "critical", "text": "<specific issue found>" },
    { "type": "warn", "text": "<improvement area>" },
    { "type": "ok", "text": "<what's working>" }
  ],
  "bullets": [
    { "before": "<original bullet verbatim>", "after": "<stronger rewrite with metrics>", "oldScore": <number>, "newScore": <number> }
  ],
  "recommendation": "<the single most important action to take now>",
  "rewrittenSections": [
    { "label": "Summary (rewritten)", "text": "<rewritten summary>", "score": <number> },
    { "label": "Top bullet (rewritten)", "text": "<best bullet rewritten>", "score": <number> },
    { "label": "Skills (updated)", "text": "<updated skills list>", "score": <number> }
  ]
}

Rules:
- findings: 4-6 items, mix of critical/warn/ok types
- bullets: rewrite the 3 weakest bullets, inject specific metrics and business impact
- Be direct — name exact issues, not vague generalizations
- Target role: ${targetRole || "infer from resume content"}
- Stage context: ${stage}`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Analyze this resume:\n\n${resumeText.slice(0, 4000)}` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.3,
    maxTokens: 1800,
    jsonMode: true,
  });

  if (!reply) {
    return NextResponse.json({ error: "Analysis failed — try again" }, { status: 503 });
  }

  try {
    const result = JSON.parse(reply);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not parse analysis" }, { status: 500 });
  }
}
