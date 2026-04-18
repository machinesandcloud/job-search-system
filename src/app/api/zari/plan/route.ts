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
    stage?: string;
  };

  const stage = body.stage ?? "job-search";

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const systemPrompt = `You are Zari, an expert AI career coach. Generate a personalized action plan and return structured JSON.

${userContext ? `User context:\n${userContext}\n\n` : ""}

Return ONLY a valid JSON object with exactly this structure:
{
  "tasks": [
    { "text": "<specific actionable task>", "cat": "<category>", "pri": "<high|med|low>" }
  ],
  "coachNote": "<2-3 sentence coaching insight referencing something specific from their profile>"
}

Stage: ${stage}

Category options: Resume, Interview, LinkedIn, Job Search, Session, Planning, Research, Network, Docs, Preparation

Rules:
- Generate 7-9 tasks specific to this user's profile and goals
- Priority breakdown: 3-4 high, 2-3 med, 1-2 low
- Tasks must be specific and immediately actionable — no vague "work on X" tasks
- coachNote should name a specific thing from their profile or history (not generic advice)
- If no user profile available, generate strong tactical tasks for the ${stage} stage`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Generate my personalized action plan for the ${stage} stage.` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.5,
    maxTokens: 900,
    jsonMode: true,
  });

  if (!reply) {
    return NextResponse.json({ error: "Could not generate plan" }, { status: 503 });
  }

  try {
    const result = JSON.parse(reply);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not parse plan" }, { status: 500 });
  }
}
