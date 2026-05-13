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
  const access = await requirePaidRouteAccess("zari_resume_apply_fixes");
  if (!access.ok) return access.response;

  const body = await request.json().catch(() => ({})) as {
    resumeText?: string;
    targetRole?: string;
    jobDescription?: string;
    missingKeywords?: { word: string; importance: "required" | "preferred"; skillType?: string | null }[];
    criticalFindings?: string[];
    warnFindings?: string[];
    wordIssues?: { word: string; type: string; suggestion: string }[];
  };

  const resumeText      = (body.resumeText ?? "").trim();
  const targetRole      = (body.targetRole ?? "").trim();
  const jobDescription  = (body.jobDescription ?? "").trim();
  const missingKeywords = body.missingKeywords ?? [];
  const criticalFindings = (body.criticalFindings ?? []).slice(0, 10);
  const warnFindings    = (body.warnFindings ?? []).slice(0, 8);
  const wordIssues      = (body.wordIssues ?? []).slice(0, 12);

  if (!resumeText) {
    return NextResponse.json({ error: "resumeText required" }, { status: 400 });
  }

  const jobContext = jobDescription
    ? `Job Description:\n${jobDescription.slice(0, 3000)}`
    : targetRole
    ? `Target Role: "${targetRole}"`
    : "No specific role — fix all identified issues for general quality.";

  const requiredMissing  = missingKeywords.filter(k => k.importance === "required");
  const preferredMissing = missingKeywords.filter(k => k.importance === "preferred");

  const keywordBlock = missingKeywords.length > 0 ? `
MISSING KEYWORDS — INJECT ALL
${requiredMissing.length > 0 ? `REQUIRED:\n${requiredMissing.map(k => `  • ${k.word}${k.skillType ? ` [${k.skillType}]` : ""}`).join("\n")}` : ""}
${preferredMissing.length > 0 ? `PREFERRED:\n${preferredMissing.map(k => `  • ${k.word}${k.skillType ? ` [${k.skillType}]` : ""}`).join("\n")}` : ""}
- Technical tools/skills → skills array
- Soft skills/competencies → summary or bullet context
- Domain terms → embed in bullet context
- Never invent jobs, companies, or outcomes
- Every REQUIRED keyword must appear at least once` : "";

  const issueBlock = (criticalFindings.length > 0 || warnFindings.length > 0 || wordIssues.length > 0) ? `
IDENTIFIED ISSUES — FIX ALL
${criticalFindings.length > 0 ? `CRITICAL:\n${criticalFindings.map(f => `  ✗ ${f}`).join("\n")}` : ""}
${warnFindings.length > 0 ? `WARNINGS:\n${warnFindings.map(f => `  ! ${f}`).join("\n")}` : ""}
${wordIssues.length > 0 ? `WORD PROBLEMS (replace everywhere):\n${wordIssues.map(w => `  • "${w.word}" → ${w.suggestion}`).join("\n")}` : ""}` : "";

  const systemPrompt = `You are a professional resume editor. Extract and fix resume content — layout is handled by a separate template, so you must NEVER produce HTML, Markdown, bullets symbols, or line-spacing instructions.

TARGET: ${jobContext}
${keywordBlock}
${issueBlock}

YOUR JOB:
1. Fix every critical finding, warning, and word problem above
2. Inject all missing keywords naturally
3. Preserve exact company names, job titles, dates, education, certifications
4. Do not invent metrics — use only numbers present in the original resume
5. Keep experience in reverse chronological order

LANGUAGE RULES:
Match language to the candidate's actual background level.
Do NOT use: spearheaded, pioneered, leveraged, orchestrated, transformed, digital transformation, strategic vision, cloud environments, enterprise technology, vendor management, cybersecurity, KPIs, innovation initiatives — unless already in the source.
For lab/biomedical/public health: Prepared, Conducted, Maintained, Documented, Monitored, Applied, Participated, Assisted, Collaborated, Managed.
For tech: Designed, Built, Implemented, Deployed, Optimized, Automated, Resolved.
For executive (VP/C-level only): Led, Directed, Established, Scaled.

FIELD RULES:
- name: candidate's full name
- phone/email/location: exact from original
- summary: 3–5 sentences, no clichés, lead with strongest qualification for the target role
- skills: 3–6 categories relevant to the candidate's actual domain; items are short phrases, no symbols
  IMPORTANT: Do NOT add technology strategy, cloud environments, cybersecurity, vendor management,
  or enterprise technology into skills unless they explicitly appear in the source resume.
  For lab/biomedical candidates: categories should be things like Laboratory Techniques, Scientific Methods,
  Regulatory & Quality, Public Health, Software & Tools.
- experience.bullets: 3–5 per role, action verb + context + impact; plain text, no bullet symbols
- education: exact school name and degree as written in original
- certifications: IMPORTANT — scan the ENTIRE source resume for any certifications, licenses, or
  compliance credentials (e.g. GMP, BPF, HACCP, ISO, CPR, any professional license). Extract ALL of
  them into this array even if they appear in a skills section or elsewhere. Each cert as a separate string.
  If no certifications are mentioned anywhere, return an empty array.

Return ONLY valid JSON:
{
  "resumeData": {
    "name": "",
    "phone": "",
    "email": "",
    "location": "",
    "summary": "",
    "skills": [{"category": "", "items": []}],
    "experience": [{"company": "", "dates": "", "title": "", "bullets": []}],
    "education": [{"school": "", "degree": ""}],
    "certifications": []
  }
}`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    {
      role: "user" as const,
      content: `Apply all fixes to this resume. Fix every word problem, inject all missing keywords, address every critical and warning finding. Return structured JSON only.\n\nRESUME:\n${resumeText.slice(0, 6000)}`,
    },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.25,
    maxTokens: 4000,
    jsonMode: true,
  });

  if (!reply) return NextResponse.json({ error: "Fix failed" }, { status: 503 });

  try {
    const result = JSON.parse(reply) as { resumeData?: unknown };
    return NextResponse.json({ resumeData: result.resumeData ?? null });
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
