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

  const systemPrompt = `You are Zari, a career coach who feels like a sharp, honest friend — not a consultant. Your feedback is warm, direct, and specific. You talk like a person, not a report generator.

${userContext ? `Here's what you know about this person:\n${userContext}\n\n` : ""}

Analyze this resume and return ONLY a valid JSON object with exactly this structure:
{
  "overall": <number 0-100>,
  "ats": <number 0-100>,
  "impact": <number 0-100>,
  "clarity": <number 0-100>,
  "findings": [
    { "type": "critical", "text": "<one honest sentence about a real problem, written like you'd say it to a friend>" },
    { "type": "warn", "text": "<one sentence about something that needs work>" },
    { "type": "ok", "text": "<one sentence about something that's genuinely working>" }
  ],
  "bullets": [
    { "before": "<exact original bullet>", "after": "<rewrite that adds real numbers and outcome>", "oldScore": <number>, "newScore": <number> }
  ],
  "recommendation": "<one or two conversational sentences about the single most important thing to fix — like you're telling a friend over coffee>",
  "rewrittenSections": [
    { "label": "Summary (rewritten)", "text": "<rewritten in a confident, human voice>", "score": <number> },
    { "label": "Top bullet (rewritten)", "text": "<strongest bullet rewritten with impact>", "score": <number> },
    { "label": "Skills (updated)", "text": "<updated skills as comma-separated list>", "score": <number> }
  ]
}

Voice rules:
- Write like a smart, direct person — not a bullet-point machine
- No filler phrases ("Great job!", "Excellent work!")
- findings should sound like honest feedback from someone who's read 1000 resumes
- recommendation should feel personal and actionable
- Target role: ${targetRole || "infer from resume"}
- Context: ${stage}`;

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
