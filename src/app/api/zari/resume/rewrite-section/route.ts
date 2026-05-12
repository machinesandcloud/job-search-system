import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime     = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const access = await requirePaidRouteAccess("zari_resume_rewrite_section");
  if (!access.ok) return access.response;

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

  const versionAngles: Record<number, string> = {
    2: "Try a different opening structure — if version 1 started with a leadership angle, try an outcomes/efficiency angle. If it led with years of experience, lead with a specific achievement instead.",
    3: "Completely different emphasis — if previous versions focused on scope and scale, focus on a specific transformation or business outcome. Change the first sentence entirely.",
    4: "Strip it down to the most essential signal and rebuild. Ruthlessly cut qualifiers. Lead with the single most impressive fact.",
  };

  const systemPrompt = `You are Zari, a resume expert. You're generating version ${attempt} of a rewrite — it must be MEANINGFULLY different from the previous version.

${jobContext}

Resume text for context:
${resumeText.slice(0, 4000)}

Version ${attempt} directive: ${versionAngles[attempt] ?? "Try a completely different angle, structure, or emphasis — don't just swap synonyms."}

Rules:
- Sound like a real person wrote it — no templates, no AI filler
- Use XYZ formula for bullets: [Strong Verb] + [Skill/Context] + [Quantified Result]
- No passive voice, no generic adjectives ("results-driven", "passionate", "detail-oriented", "seasoned")
- Every claim must tie to a real outcome visible in the resume — never fabricate
- Summary: lead with the single most relevant thing for the target role; include at least 2 specific metrics or achievements; 4–6 lines; paint the full picture — span of experience, domain depth, key skill areas, and what makes this candidate distinctive; NO "results-driven", "passionate", "detail-oriented", "team player", "self-starter", "seasoned"
- Bullets: DIFFERENT opening verb from all previous versions; find a different angle on the impact; use • for every bullet
- Skills: reorder toward what matters most for the target role; use "Category Label: skill1, skill2, skill3" format (no bullet prefix on skills lines); 5–7 lines
- No Markdown: never use **bold**, __bold__, *italic*, _italic_, # headings, or any Markdown syntax
- Job titles are NEVER bullets: if rewriting experience, the job title must appear as its own plain text line, never preceded by a •

TEMPLATE FORMAT TO FOLLOW for each section type:
- Summary: plain paragraph, left-aligned, 4–6 lines, no bullets.
- Skills: each line → "Category Label: skill1, skill2, skill3" — 5–7 lines total. No • prefix on skill lines.
- Experience bullets: "• [Strong Verb] + [Context] + [Quantified Result]" — 5–7 bullets for most recent role, 4–6 for second role, 3–5 for older roles.
- Job title (if included): plain text line directly below the company/date line — never a bullet.

Return ONLY valid JSON: { "text": "<the rewritten content>" }`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Rewrite this section (${section}) — version ${attempt}, must be different from:\n"${currentText}"` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.7 + (attempt * 0.05), // slightly more creative on each retry
    maxTokens: 1500,
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
