import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const access = await requirePaidRouteAccess("zari_linkedin");
  if (!access.ok) return access.response;

  const body = await request.json().catch(() => ({})) as {
    headline?: string;
    about?: string;
    skills?: string;
    stage?: string;
    targetRole?: string;
    resumeText?: string;
  };

  const stage = body.stage ?? "job-search";
  const targetRole = body.targetRole ?? "";
  const currentHeadline = (body.headline ?? "").trim();
  const currentAbout = (body.about ?? "").trim();
  const currentSkills = (body.skills ?? "").trim();
  const resumeText = (body.resumeText ?? "").trim();

  if (!currentHeadline && !currentAbout && !currentSkills && !resumeText) {
    return NextResponse.json({ error: "Provide your LinkedIn sections or upload your resume" }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const systemPrompt = `You are Zari, a career coach who's also great at LinkedIn. You write like a real person — direct, confident, zero fluff. Your rewrites sound human, not like they were written by a marketing team.

${userContext ? `What you know about this person:\n${userContext}\n\n` : ""}
${resumeText ? `Their resume (use this to inform everything):\n${resumeText.slice(0, 2500)}\n\n` : ""}

Return ONLY a valid JSON object:
{
  "headline": "<LinkedIn headline — confident, role-signal clear, max 220 chars>",
  "about": "<About section — 3-4 sentences, sounds like a real person talking, includes a specific outcome with a number, ends with what they're looking for>",
  "skills": ["skill1", "skill2", "...12-15 skills"],
  "scores": {
    "recruiterVisibility": <number 0-100, after your rewrites>,
    "keywordDensity": <number 0-100, after your rewrites>,
    "profileStrength": <number 0-100, after your rewrites>
  },
  "previousScores": {
    "recruiterVisibility": <number 0-100, honest assessment of current content>,
    "keywordDensity": <number 0-100>,
    "profileStrength": <number 0-100>
  },
  "issues": {
    "headline": "<one sentence about what's wrong, like you'd tell a friend>",
    "about": "<one sentence about what's missing>",
    "skills": "<one sentence about the gap>"
  },
  "missingKeywords": ["keyword (94%)", "...6-8 keywords with frequency in job postings"]
}

Target role: ${targetRole || "infer from resume and profile"}
Stage: ${stage}

Voice rules:
- Headline: use | to separate ideas, don't start with "Experienced" or "Results-driven"
- About: first sentence should hook a recruiter in 5 seconds. Use "I" — it's a human profile
- Skills: prioritize what hiring managers actually search for
- previousScores: be realistic. Generic profiles score 35-60.`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Current LinkedIn profile:

Headline: ${currentHeadline || "(not provided)"}

About: ${currentAbout || "(not provided)"}

Skills: ${currentSkills || "(not provided)"}` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.4,
    maxTokens: 1200,
    jsonMode: true,
  });

  if (!reply) {
    return NextResponse.json({ error: "Optimization failed — try again" }, { status: 503 });
  }

  try {
    const result = JSON.parse(reply);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not parse optimization" }, { status: 500 });
  }
}
