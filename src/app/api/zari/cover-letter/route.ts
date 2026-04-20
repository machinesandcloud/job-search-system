import { NextResponse } from "next/server";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    profileText?: string;
    jobDescription?: string;
    company?: string;
    targetRole?: string;
    tone?: "professional" | "conversational" | "enthusiastic";
  };

  const profileText    = (body.profileText    ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();
  const company        = (body.company        ?? "").trim();
  const targetRole     = (body.targetRole     ?? "").trim();
  const tone           = body.tone ?? "professional";

  if (!profileText && !jobDescription) {
    return NextResponse.json({ error: "Provide at least a profile or job description" }, { status: 400 });
  }

  const toneGuide = {
    professional:   "formal, confident, results-oriented — every sentence earns its place, no filler",
    conversational: "warm, direct, and human — reads like a smart person talking, not a template",
    enthusiastic:   "energetic and genuine — shows real excitement for this specific role without sounding desperate",
  }[tone];

  const systemPrompt = `You are an expert cover letter writer. Write a compelling, tailored cover letter that gets callbacks.

Tone: ${toneGuide}
${company    ? `Company: ${company}`      : ""}
${targetRole ? `Target role: ${targetRole}` : ""}

Return ONLY valid JSON:
{
  "subject": "<concise email subject line, ~60 chars>",
  "coverLetter": "<full cover letter, 3-4 tight paragraphs, 280-360 words total>"
}

Letter structure:
1. Opening: Lead with your strongest relevant achievement or a compelling angle on fit — NOT 'I am applying for...' or 'I am excited to...'
2. Body: Connect 2-3 specific experiences from the profile directly to what the role needs — name actual projects, tools, outcomes
3. Company fit: Show you've thought about why THIS company, not just any company — reference something specific about their product, mission, or moment
4. Close: Confident, direct ask — what you want to happen next

Rules:
- Every claim must trace back to something in the provided profile — do not invent experience
- Cut any sentence that could appear in any cover letter for any job
- Use the person's authentic voice, not corporate-speak
- No more than one exclamation point`;

  const content = [
    profileText    ? `CANDIDATE PROFILE:\n${profileText.slice(0, 4000)}`       : "",
    jobDescription ? `\n\nJOB DESCRIPTION:\n${jobDescription.slice(0, 2000)}`  : "",
  ].filter(Boolean).join("");

  const reply = await openaiChat(
    [
      { role: "system", content: systemPrompt },
      { role: "user",   content },
    ],
    {
      model:     process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.35,
      maxTokens: 1200,
      jsonMode:  true,
    }
  );

  if (!reply) return NextResponse.json({ error: "Generation failed" }, { status: 503 });

  try {
    return NextResponse.json(JSON.parse(reply));
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
