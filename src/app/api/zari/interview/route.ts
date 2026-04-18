import { NextResponse } from "next/server";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    question?: string;
    answer?: string;
    stage?: string;
    category?: string;
  };

  const question = (body.question ?? "").trim();
  const answer = (body.answer ?? "").trim();
  const stage = body.stage ?? "job-search";
  const category = body.category ?? "";

  if (!question || !answer) {
    return NextResponse.json({ error: "Question and answer required" }, { status: 400 });
  }

  const systemPrompt = `You are Zari, an expert AI career coach. Score this interview answer and return structured JSON feedback.

Return ONLY a valid JSON object with exactly this structure:
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
  "coachNote": "<2-4 sentences: name what's strong, what's the key gap, what to fix>",
  "suggestedResult": "<a complete Result sentence they could use verbatim>"
}

Context:
- Stage: ${stage}
- Category: ${category}

Scoring rules:
- Be honest — most answers score 55-80, not 90+
- The Result is the most commonly weak component — probe for missing numbers, timelines, business outcomes
- coachNote must name a specific thing (not generic advice)
- suggestedResult should be something they could literally say in the interview`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Interview question: ${question}\n\nCandidate's answer: ${answer}` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.3,
    maxTokens: 700,
    jsonMode: true,
  });

  if (!reply) {
    return NextResponse.json({ error: "Scoring failed — try again" }, { status: 503 });
  }

  try {
    const result = JSON.parse(reply);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not parse scoring" }, { status: 500 });
  }
}
