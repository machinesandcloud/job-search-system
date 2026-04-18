import { NextResponse } from "next/server";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    section?: string;
    currentText?: string;
    resumeText?: string;
    targetRole?: string;
    jobDescription?: string;
    stage?: string;
    attempt?: number;
  };

  const section = (body.section ?? "").trim();
  const currentText = (body.currentText ?? "").trim();
  const resumeText = (body.resumeText ?? "").trim();
  const targetRole = (body.targetRole ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();
  const attempt = body.attempt ?? 2;

  if (!section || !resumeText) {
    return NextResponse.json({ error: "section and resumeText required" }, { status: 400 });
  }

  const jobContext = jobDescription
    ? `Target job description:\n${jobDescription.slice(0, 2000)}`
    : targetRole
    ? `Target role: "${targetRole}"`
    : "No specific role targeted — optimize for general quality.";

  const systemPrompt = `You are Zari, a resume expert. You're generating version ${attempt} of a rewrite — it must be MEANINGFULLY different from the previous version. Don't just swap synonyms; try a completely different angle, structure, or emphasis.

${jobContext}

Resume text for context:
${resumeText.slice(0, 3000)}

Rules:
- Sound like a real person wrote it, not a template
- Use XYZ formula for bullets: [Strong Verb] + [Skill/Context] + [Quantified Result]
- No generic adjectives: "results-driven", "passionate", "detail-oriented"
- Every claim should tie to a real outcome visible in the resume
- For summaries: lead with the most relevant thing for the target role, include at least one metric
- For bullets: use a DIFFERENT opening verb than the previous version, find a different angle on the impact
- For skills: reorder and reweight toward what matters most for the target role

Return ONLY valid JSON: { "text": "<the rewritten content>" }`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Rewrite this section (${section}) — version ${attempt}, must be different from:\n"${currentText}"` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.7 + (attempt * 0.05), // slightly more creative on each retry
    maxTokens: 600,
    jsonMode: true,
  });

  if (!reply) return NextResponse.json({ error: "Rewrite failed" }, { status: 503 });

  try {
    const result = JSON.parse(reply) as { text?: string };
    return NextResponse.json({ text: result.text ?? "" });
  } catch {
    return NextResponse.json({ error: "Could not parse rewrite" }, { status: 500 });
  }
}
