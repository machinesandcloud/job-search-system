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
    candidateName?: string;
  };

  const profileText    = (body.profileText    ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();
  const company        = (body.company        ?? "").trim();
  const targetRole     = (body.targetRole     ?? "").trim();
  const tone           = body.tone ?? "professional";
  const candidateName  = (body.candidateName  ?? "").trim();

  if (!profileText && !jobDescription) {
    return NextResponse.json({ error: "Provide at least a profile or job description" }, { status: 400 });
  }

  const toneGuide = {
    professional:   "confident and direct — precise word choices, no filler, no corporate-speak. Sounds like a sharp professional, not a template",
    conversational: "warm and human — the way a smart, self-aware person actually writes. Natural sentences, slight informality, genuine personality",
    enthusiastic:   "energetic and specific — real excitement grounded in detail. Never desperate or generic. Reads like someone who's done their homework and can't wait to contribute",
  }[tone];

  const systemPrompt = `You are an expert cover letter writer known for writing letters that sound genuinely human — not like they came from a template or an AI. Every letter you write is specific, confident, and reads like the candidate wrote it themselves on a good day.

Tone: ${toneGuide}
${company    ? `Company: ${company}`      : ""}
${targetRole ? `Target role: ${targetRole}` : ""}
${candidateName ? `Candidate name: ${candidateName}` : ""}

Return ONLY valid JSON:
{
  "subject": "<concise email subject line, ~60 chars>",
  "coverLetter": "<complete cover letter including salutation, 3-4 body paragraphs, and closing signature — see structure below>",
  "tailoringNotes": ["<specific thing Zari did to personalize this letter to this role/company>", "<another specific tailoring decision>", "<another>"],
  "keyStrengths": ["<specific strength from the candidate's profile that was highlighted>", "<another strength>", "<another>"],
  "openingHook": "<the first sentence of the letter — what makes it stand out>"
}

Letter structure (write the full text including all of these):
1. Salutation: "Dear Hiring Manager," (or "Dear [First Name]," if the hiring manager's name appears in the job description)
2. Blank line after salutation
3. Opening paragraph: Lead with your strongest relevant achievement or a compelling angle on fit — NOT 'I am applying for...' or 'I am excited to...' or 'I would love to...'
4. Body (2 paragraphs): Connect 2-3 specific experiences from the profile directly to what the role needs — name actual projects, tools, outcomes, and numbers
5. Company fit paragraph: Show you've thought about why THIS company — reference something specific about their product, mission, culture, or moment in time
6. Closing paragraph: Confident, direct ask — what you want to happen next (one short, clear sentence)
7. Sign-off: "Best regards," on its own line, then a blank line, then the candidate's name${candidateName ? ` (${candidateName})` : " (or '[Your Name]' if no name was provided)"}

Human voice rules — these are non-negotiable:
- Vary sentence length. Mix short punchy sentences with longer ones. Never three sentences the same length in a row.
- No word should appear twice in the same paragraph
- Ban these phrases entirely: 'I am excited to', 'I am passionate about', 'leveraging my expertise', 'dynamic', 'synergy', 'results-driven', 'proven track record', 'I would love to', 'it is with great interest'
- Every claim must trace back to something in the provided profile — do not invent experience
- The opening line must be impossible to use in any other cover letter
- Max one exclamation point in the entire letter`;


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
      temperature: 0.55,
      maxTokens: 1400,
      jsonMode:  true,
    }
  );

  if (!reply) return NextResponse.json({ error: "Generation failed" }, { status: 503 });

  try {
    const p = JSON.parse(reply) as Record<string, unknown>;
    const cleanStr = (v: unknown) => typeof v === "string" ? v.trim() : "";
    const cleanList = (v: unknown, max = 4) => Array.isArray(v) ? (v as unknown[]).map(cleanStr).filter(Boolean).slice(0, max) : [];
    return NextResponse.json({
      subject: cleanStr(p.subject),
      coverLetter: cleanStr(p.coverLetter),
      tailoringNotes: cleanList(p.tailoringNotes, 4),
      keyStrengths: cleanList(p.keyStrengths, 4),
      openingHook: cleanStr(p.openingHook),
    });
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
