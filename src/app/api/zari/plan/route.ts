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

  const systemPrompt = `You are Zari, a career coach who knows this person well. Build them a real action plan — specific, prioritized, and tied to where they actually are right now. Not a generic checklist. A plan for *them*.

${userContext ? `Everything you know about this person:\n${userContext}\n\n` : "No profile data yet — build a strong general plan for the stage."}

Return ONLY a valid JSON object:
{
  "tasks": [
    { "text": "<specific, actionable task — not vague>", "cat": "<Resume|Interview|LinkedIn|Job Search|Session|Planning|Research|Network|Docs>", "pri": "<high|med|low>" }
  ],
  "coachNote": "<2-3 sentences that sound like a real coach talking to this specific person — reference their name, role, goals, or something specific from their history. Tell them what to focus on first and why.>"
}

Stage: ${stage}

How to build this plan:
- Look at their profile, sessions, documents, and action plan history
- Identify what's incomplete, what they've been avoiding, and what will move the needle most
- 3-4 high priority (this week), 2-3 medium (this month), 1-2 low (eventually)
- Every task should feel like it was written specifically for them — reference their actual role, company type, or goals when possible
- The coachNote should feel like a real message from Zari, not a summary
- If they've done sessions: reference something that came up
- If they have documents: reference the state of those docs
- Never write generic tasks like "work on your resume" — be specific about what to do and why`;

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
