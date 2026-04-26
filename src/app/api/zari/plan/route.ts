import { NextResponse } from "next/server";

import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime     = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    stage?: string;
    resumeSnippet?: string;
    liHeadline?: string;
    liScore?: string;
    resumeScore?: string;
    readinessVerdict?: string;
    targetRole?: string;
    completedSections?: string[];
  };

  const stage             = body.stage ?? "job-search";
  const resumeSnippet     = (body.resumeSnippet     ?? "").trim();
  const liHeadline        = (body.liHeadline        ?? "").trim();
  const liScore           = (body.liScore           ?? "").trim();
  const resumeScore       = (body.resumeScore       ?? "").trim();
  const readinessVerdict  = (body.readinessVerdict  ?? "").trim();
  const targetRole        = (body.targetRole        ?? "").trim();
  const completedSections = body.completedSections  ?? [];
  const scoreLabel = stage === "promotion" ? "Readiness score" : "Resume score";
  const targetLabel = stage === "promotion" ? "Target level" : "Target role";

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const contextBlock = [
    userContext          ? `Profile context:\n${userContext}`                                               : "",
    resumeSnippet        ? `Resume snippet (first ~600 chars):\n${resumeSnippet}`                          : "",
    liHeadline           ? `LinkedIn headline: ${liHeadline}`                                              : "",
    resumeScore          ? `${scoreLabel}: ${resumeScore}/100`                                             : "",
    readinessVerdict     ? `Readiness verdict: ${readinessVerdict}`                                        : "",
    liScore              ? `LinkedIn score: ${liScore}/100`                                                : "",
    targetRole           ? `${targetLabel}: ${targetRole}`                                                 : "",
    completedSections.length ? `Sections they've completed: ${completedSections.join(", ")}`              : "",
  ].filter(Boolean).join("\n\n");

  const systemPrompt = `You are Zari, a career coach who knows this person well. Build them a real action plan — specific, prioritized, and tied to where they actually are right now. Not a generic checklist. A plan for *them*.

${contextBlock || "No profile data yet — build a strong general plan for the stage."}

Return ONLY a valid JSON object:
{
  "tasks": [
    { "text": "<specific, actionable task — reference their actual situation>", "cat": "<Resume|Interview|LinkedIn|Cover Letter|Job Search|Session|Network|Research|Case|Docs|Feedback|Sponsorship|Visibility|Planning|Milestone>", "pri": "<high|med|low>" }
  ],
  "coachNote": "<2-3 sentences: what to focus on first and why, based on their actual scores and completed sections. Sound like a real coach, not a summary.>"
}

Stage: ${stage}

Rules:
- Use their real scores to call out specific gaps (e.g. "your resume scored 72 — the Impact section is dragging it down")
- Reference their LinkedIn headline or resume content when possible
- 3-4 high priority (this week), 2-3 medium (this month), 1-2 low (eventually)
- Never write tasks they've already fully addressed in their completed sections unless there's a clear next step
- Never write generic tasks — be specific about WHAT to do and WHY it matters for their situation
- If cover letter is missing and they have a target role, make that a high-priority task
- For the promotion stage, bias toward rubric alignment, business impact proof, actionable feedback, sponsorship, and decision-maker visibility
- If the promotion readiness verdict or score says the move is too early, focus the plan on closing proof gaps before any formal ask`;

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
