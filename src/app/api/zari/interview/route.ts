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
    action?: "generate-questions" | "score-answer";
    question?: string;
    answer?: string;
    stage?: string;
    category?: string;
    resumeText?: string;
    jobDescription?: string;
  };

  const action = body.action ?? "score-answer";
  const stage = body.stage ?? "job-search";

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  /* ── Generate personalized questions based on resume + JD ── */
  if (action === "generate-questions") {
    const resumeText = (body.resumeText ?? "").trim();
    const jobDescription = (body.jobDescription ?? "").trim();

    const systemPrompt = `You are Zari, a career coach who knows this person well. Generate interview questions tailored specifically to their background and the role they're going for.

${userContext ? `What you know about them:\n${userContext}\n\n` : ""}
${resumeText ? `Their resume:\n${resumeText.slice(0, 2500)}\n\n` : ""}
${jobDescription ? `Job they're targeting:\n${jobDescription.slice(0, 1500)}\n\n` : ""}

Return ONLY a valid JSON object:
{
  "questions": [
    { "cat": "<topic area>", "level": "<seniority>", "q": "<the question>" }
  ]
}

Generate 4 questions that:
- Are specific to their actual background (reference real things from their resume or profile)
- Match the seniority of the target role
- Cover the areas most likely to be tested in an interview for this specific role
- Include at least one question about a gap or challenge (not just strengths)
- Feel like real interview questions from a hiring manager, not a textbook

Stage context: ${stage}
Write the questions as a real interviewer would ask them — direct, no fluff.`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: "Generate my personalized interview questions." },
    ];

    const reply = await openaiChat(messages, {
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.6,
      maxTokens: 800,
      jsonMode: true,
    });

    if (!reply) return NextResponse.json({ error: "Could not generate questions" }, { status: 503 });

    try {
      return NextResponse.json(JSON.parse(reply));
    } catch {
      return NextResponse.json({ error: "Could not parse questions" }, { status: 500 });
    }
  }

  /* ── Score an answer ── */
  const question = (body.question ?? "").trim();
  const answer = (body.answer ?? "").trim();
  const category = body.category ?? "";
  const resumeText = (body.resumeText ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();

  if (!question || !answer) {
    return NextResponse.json({ error: "Question and answer required" }, { status: 400 });
  }

  const systemPrompt = `You are Zari, a career coach who feels like a sharp, honest friend. Score this interview answer and give feedback that's real and actionable — not generic coaching-speak.

${userContext ? `What you know about this person:\n${userContext}\n\n` : ""}
${resumeText ? `Their resume:\n${resumeText.slice(0, 1500)}\n\n` : ""}
${jobDescription ? `Role they're interviewing for:\n${jobDescription.slice(0, 800)}\n\n` : ""}

Return ONLY a valid JSON object:
{
  "overallScore": <number 0-100>,
  "dimensions": [
    { "label": "STAR Structure",    "score": <number 0-100> },
    { "label": "Evidence",          "score": <number 0-100> },
    { "label": "Impact clarity",    "score": <number 0-100> },
    { "label": "Concision",         "score": <number 0-100> },
    { "label": "Leadership signal", "score": <number 0-100> },
    { "label": "Stakeholder lens",  "score": <number 0-100> }
  ],
  "coachNote": "<2-3 sentences in a warm, direct voice — name what landed, what's missing, what to do about it. Refer to specific things they said.>",
  "suggestedResult": "<a complete, specific Result statement they could say verbatim in the interview>"
}

Scoring rules:
- Be honest — most answers score 55-80, not 90+
- The Result is almost always the weakest — if they didn't give a number or specific outcome, call it out
- coachNote must reference something specific they said (quote it if useful)
- suggestedResult should sound like them, just sharper
- Stage: ${stage} · Category: ${category}`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Question: ${question}\n\nAnswer: ${answer}` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.3,
    maxTokens: 700,
    jsonMode: true,
  });

  if (!reply) return NextResponse.json({ error: "Scoring failed — try again" }, { status: 503 });

  try {
    return NextResponse.json(JSON.parse(reply));
  } catch {
    return NextResponse.json({ error: "Could not parse scoring" }, { status: 500 });
  }
}
