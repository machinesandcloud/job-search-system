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
    headline?: string;
    about?: string;
    skills?: string;
    stage?: string;
    targetRole?: string;
  };

  const stage = body.stage ?? "job-search";
  const targetRole = body.targetRole ?? "";
  const currentHeadline = (body.headline ?? "").trim();
  const currentAbout = (body.about ?? "").trim();
  const currentSkills = (body.skills ?? "").trim();

  if (!currentHeadline && !currentAbout && !currentSkills) {
    return NextResponse.json({ error: "Paste at least one LinkedIn section to optimize" }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const systemPrompt = `You are Zari, an expert AI career coach and LinkedIn optimization specialist. Rewrite the user's LinkedIn sections and return structured JSON.

${userContext ? `User context:\n${userContext}\n\n` : ""}

Return ONLY a valid JSON object with exactly this structure:
{
  "headline": "<optimized LinkedIn headline, max 220 chars>",
  "about": "<optimized About section, 3-4 punchy sentences>",
  "skills": ["skill1", "skill2", "...up to 15 skills"],
  "scores": {
    "recruiterVisibility": <number 0-100, score AFTER your rewrites>,
    "keywordDensity": <number 0-100, score AFTER your rewrites>,
    "profileStrength": <number 0-100, score AFTER your rewrites>
  },
  "previousScores": {
    "recruiterVisibility": <number 0-100, score of the CURRENT content>,
    "keywordDensity": <number 0-100, score of the CURRENT content>,
    "profileStrength": <number 0-100, score of the CURRENT content>
  },
  "issues": {
    "headline": "<what's wrong with the current headline>",
    "about": "<what's wrong with the current about>",
    "skills": "<what's wrong with the current skills>"
  },
  "missingKeywords": ["keyword1 (94%)", "keyword2 (88%)", "...6-8 keywords with % frequency in job postings"]
}

Target role: ${targetRole || "infer from current profile and user context"}
Stage: ${stage}

Rules:
- Headline: keyword-rich, signals career direction, uses | separator for sections
- About: lead with value prop, include 1-2 specific outcomes with numbers, end with what you're looking for
- Skills: mix hard and soft skills optimized for target role, 12-15 total
- missingKeywords: 6-8 terms found in 68%+ of relevant job descriptions
- previousScores: be realistic — weak profiles score 40-65
- scores after rewrite: should be meaningfully higher, typically 75-92`;

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
