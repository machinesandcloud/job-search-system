import { NextResponse } from "next/server";

import { requirePaidRouteAccess } from "@/lib/billing";
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
    // Intake fields
    timeline?: string;
    employed?: string;
    weeklyHours?: string;
    mainChallenge?: string;
  };

  const stage             = body.stage ?? "job-search";
  const resumeSnippet     = (body.resumeSnippet     ?? "").trim();
  const liHeadline        = (body.liHeadline        ?? "").trim();
  const liScore           = (body.liScore           ?? "").trim();
  const resumeScore       = (body.resumeScore       ?? "").trim();
  const readinessVerdict  = (body.readinessVerdict  ?? "").trim();
  const targetRole        = (body.targetRole        ?? "").trim();
  const completedSections = body.completedSections  ?? [];
  const timeline          = (body.timeline          ?? "").trim();
  const employed          = (body.employed          ?? "").trim();
  const weeklyHours       = (body.weeklyHours       ?? "").trim();
  const mainChallenge     = (body.mainChallenge     ?? "").trim();

  const access = await requirePaidRouteAccess("zari_plan", { stage }, { stage });
  if (!access.ok) return access.response;

  const scoreLabel  = stage === "promotion" ? "Readiness score" : "Resume score";
  const targetLabel = stage === "promotion" ? "Target level"    : "Target role";

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  // Assess timeline feasibility
  const rscore = parseInt(resumeScore, 10);
  const lisc   = parseInt(liScore, 10);
  const hasResume = !isNaN(rscore);
  const hasLI     = !isNaN(lisc);

  type FeasibilityLevel = "impossible" | "aggressive" | "feasible" | "comfortable";
  let timelineFeasibility: FeasibilityLevel = "feasible";
  let timelinePushback = "";

  if (timeline === "asap" || timeline === "1-3months") {
    if (hasResume && rscore < 55) {
      timelineFeasibility = "aggressive";
      timelinePushback = `Resume score is ${rscore}/100 — this needs significant work before applications will convert. A fast timeline is possible but only if the resume gets overhauled in the first 1-2 weeks.`;
    }
    if (weeklyHours === "under5") {
      timelineFeasibility = "impossible";
      timelinePushback = `Under 5 hours per week is not enough to run a real job search. At this bandwidth, a ${timeline === "asap" ? "fast" : "1-3 month"} timeline is not realistic. Either increase hours or extend the timeline.`;
    }
    if (!hasResume && !hasLI && timeline === "asap") {
      timelineFeasibility = "aggressive";
      timelinePushback = "No resume or LinkedIn data yet — can't send applications without fixing these first. 'ASAP' means the resume and LinkedIn need to be done this week.";
    }
  }

  if (timeline === "asap" && weeklyHours === "5-10" && hasResume && rscore < 65) {
    timelineFeasibility = "aggressive";
    timelinePushback = `With a ${rscore}/100 resume and only 5-10h/week, landing fast will be hard. Be honest with yourself — 3 months is more realistic. The plan below reflects that.`;
  }

  // Weekly task budget based on hours available
  const taskBudget = weeklyHours === "under5" ? "2-3 total tasks"
    : weeklyHours === "5-10" ? "4-6 total tasks (2-3 this week)"
    : weeklyHours === "10-20" ? "6-9 total tasks (3-4 this week)"
    : weeklyHours === "20plus" ? "10-14 total tasks (5-6 this week)"
    : "6-9 total tasks";

  const contextBlock = [
    userContext          ? `Profile context:\n${userContext}`                                               : "",
    resumeSnippet        ? `Resume snippet (first ~600 chars):\n${resumeSnippet}`                          : "",
    liHeadline           ? `LinkedIn headline: ${liHeadline}`                                              : "",
    resumeScore          ? `${scoreLabel}: ${resumeScore}/100`                                             : "",
    readinessVerdict     ? `Readiness verdict: ${readinessVerdict}`                                        : "",
    liScore              ? `LinkedIn score: ${liScore}/100`                                                : "",
    targetRole           ? `${targetLabel}: ${targetRole}`                                                 : "",
    completedSections.length ? `Sections completed: ${completedSections.join(", ")}`                      : "",
    timeline             ? `Target timeline: ${timeline}`                                                   : "",
    employed             ? `Employment status: ${employed}`                                                 : "",
    weeklyHours          ? `Hours/week available: ${weeklyHours}`                                          : "",
    mainChallenge        ? `Biggest current challenge: ${mainChallenge}`                                   : "",
    timelinePushback     ? `⚠ TIMELINE ASSESSMENT: ${timelinePushback}`                                   : "",
  ].filter(Boolean).join("\n\n");

  const systemPrompt = `You are Zari, a no-BS career coach. Build a real, personalized action plan for this person — specific, prioritized, calibrated to their actual situation. Not a motivational checklist. A plan that will actually work.

${contextBlock || "No profile data yet — build a strong general plan."}

Task budget for this plan: ${taskBudget}

Return ONLY a valid JSON object:
{
  "tasks": [
    { "text": "<specific, actionable task>", "cat": "<Resume|Interview|LinkedIn|Cover Letter|Job Search|Session|Network|Research|Case|Docs|Feedback|Sponsorship|Visibility|Planning|Milestone>", "pri": "<high|med|low>" }
  ],
  "coachNote": "<3-4 sentences: honest assessment of their situation, realistic expectations, what to do first and why. If the timeline is aggressive or the setup is under-resourced, say so directly — do not sugarcoat.>",
  "timelineVerdict": "<realistic|aggressive|not_feasible>",
  "timelineMessage": "<if aggressive or not_feasible: 1-2 sentences of honest pushback about why the timeline is hard and what needs to change. If realistic, empty string.>"
}

Stage: ${stage}

Rules — FOLLOW THESE STRICTLY:
1. REALISTIC CALIBRATION: Respect the task budget above. If they have 5h/week, give fewer tasks than if they have 20h/week. Do NOT give 15 tasks to someone with 5 hours.
2. NO SUGARCOATING: If their resume score is below 60, that's a serious problem — say so. If their timeline is too short for their current state, say so. Real coaches push back.
3. SPECIFICITY: Every task must reference their actual situation. "Rewrite the skills section based on your ${rscore ? `${rscore}/100 resume score` : "resume data"}" beats "Improve your resume." Generic tasks are useless.
4. CHALLENGE-FOCUSED: Weight tasks heavily toward their stated main challenge (${mainChallenge || "general"}).
5. EMPLOYMENT URGENCY: If they're not working (${employed.includes("not") ? "YES — unemployed" : "no"}) or need to leave urgently, bias toward highest-ROI tasks that generate interview activity fastest.
6. SEQUENCE MATTERS: Tasks should build on each other logically. You can't send applications with a broken resume. You can't interview well without prep. Order matters.
7. CATEGORY BALANCE: Don't put all tasks in one category. A job search needs resume, applications, network, and interview prep — all of them.
8. For promotion stage: bias toward proof points, rubric alignment, business impact documentation, sponsorship, and decision-maker visibility.`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Generate my personalized action plan for the ${stage} stage.` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.4,
    maxTokens: 1200,
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
