import { NextResponse } from "next/server";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    resumeText?: string;
    targetRole?: string;
    jobDescription?: string;
  };

  const resumeText = (body.resumeText ?? "").trim();
  const targetRole = (body.targetRole ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();

  if (!resumeText) {
    return NextResponse.json({ error: "resumeText required" }, { status: 400 });
  }

  const jobContext = jobDescription
    ? `Job Description:\n${jobDescription.slice(0, 3000)}`
    : targetRole
    ? `Target Role: "${targetRole}"`
    : "No specific role provided — optimize for general strength.";

  const systemPrompt = `You are Zari, an elite resume writer. Your job is to perform a Power Optimization of a resume — aggressively rewriting specific sections to closely match a target job description while staying as close as possible to the person's real experience.

${jobContext}

WHAT TO REWRITE (only these sections — leave everything else word-for-word):
1. Professional Summary — Lead with the top 3 requirements from the JD. Include at least one strong metric. 3-5 lines max. No generic adjectives ("results-driven", "passionate", etc.). Sound like a real senior professional.
2. Skills section — Reorder and reweight to put JD-required skills first. Add any required JD skills the person demonstrably has based on their experience bullets. Remove vague soft skills.
3. Most recent 2 jobs in Experience — Rewrite the bullet points to: (a) use strong XYZ-formula verbs, (b) naturally embed the most critical JD keywords alongside real achievements, (c) add metric placeholders like "[X%]" or "[N users]" where numbers are missing but context makes them plausible. You may embellish within reason — if someone "worked on" a system, they can "architected and maintained" it. But do not invent roles, companies, or entirely fabricated achievements.

CRITICAL RULES:
- The input text may have been extracted from a PDF and could be in a garbled order. You MUST output the resume in canonical order: Name → Contact info → Professional Summary → Skills → Professional Experience (most recent job first) → Education → Certifications/Licenses → any remaining sections.
- Reconstruct the correct section order even if the input is disordered. Do not preserve PDF extraction ordering errors.
- Use ALL-CAPS for section headers (e.g. PROFESSIONAL SUMMARY, SKILLS, PROFESSIONAL EXPERIENCE, EDUCATION, CERTIFICATIONS).
- Each job in Experience must include: company name, job title, dates, and bullet points. Dates on their own line after the job title.
- Bullets start with • character.
- Do NOT include any footer notes, "optimized by" text, or meta-commentary in the resume body itself.
- Sound like a real person wrote this. Never use "results-driven", "passionate", "detail-oriented", "team player".
- Bullet formula: [Strong Action Verb] + [Skill/Context] + [Quantified Result]

Return ONLY valid JSON: { "resumeText": "<complete rewritten resume as a string with \\n newlines>" }`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Power-optimize this resume:\n\n${resumeText.slice(0, 5000)}` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.5,
    maxTokens: 4000,
    jsonMode: true,
  });

  if (!reply) return NextResponse.json({ error: "Optimization failed" }, { status: 503 });

  try {
    const result = JSON.parse(reply) as { resumeText?: string };
    return NextResponse.json({ resumeText: result.resumeText ?? "" });
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
