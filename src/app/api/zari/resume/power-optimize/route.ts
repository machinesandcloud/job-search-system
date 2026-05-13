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
  const access = await requirePaidRouteAccess("zari_resume_power_optimize");
  if (!access.ok) return access.response;

  const body = await request.json().catch(() => ({})) as {
    resumeText?: string;
    targetRole?: string;
    jobDescription?: string;
    missingKeywords?: { word: string; importance: "required" | "preferred"; skillType?: string | null }[];
    criticalFindings?: string[];
    warnFindings?: string[];
    wordIssues?: { word: string; type: string; suggestion: string }[];
    bulletRewrites?: { before: string; after: string }[];
    sectionRewrites?: { label: string; text: string }[];
  };

  const resumeText = (body.resumeText ?? "").trim();
  const targetRole = (body.targetRole ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();
  const missingKeywords = body.missingKeywords ?? [];
  const criticalFindings = (body.criticalFindings ?? []).slice(0, 10);
  const warnFindings = (body.warnFindings ?? []).slice(0, 8);
  const wordIssues = (body.wordIssues ?? []).slice(0, 12);
  const bulletRewrites = (body.bulletRewrites ?? []).slice(0, 15);
  const sectionRewrites = (body.sectionRewrites ?? []).slice(0, 4);

  if (!resumeText) {
    return NextResponse.json({ error: "resumeText required" }, { status: 400 });
  }

  const jobContext = jobDescription
    ? `Job Description:\n${jobDescription.slice(0, 3000)}`
    : targetRole
    ? `Target Role: "${targetRole}"`
    : "No specific role — optimize for general strength.";

  const requiredMissing = missingKeywords.filter(k => k.importance === "required");
  const preferredMissing = missingKeywords.filter(k => k.importance === "preferred");

  const keywordBlock = missingKeywords.length > 0 ? `
MISSING KEYWORDS — INJECT ALL
${requiredMissing.length > 0 ? `REQUIRED (must appear at least once):\n${requiredMissing.map(k => `  • ${k.word}${k.skillType ? ` [${k.skillType}]` : ""}`).join("\n")}` : ""}
${preferredMissing.length > 0 ? `PREFERRED (include where natural):\n${preferredMissing.map(k => `  • ${k.word}${k.skillType ? ` [${k.skillType}]` : ""}`).join("\n")}` : ""}
- Technical tools/skills → skills array
- Soft skills/competencies → summary or bullet context
- Domain terms → embed in bullet context
- Never invent jobs, companies, or outcomes` : "";

  const issueBlock = (criticalFindings.length > 0 || warnFindings.length > 0 || wordIssues.length > 0) ? `
IDENTIFIED ISSUES — FIX ALL
${criticalFindings.length > 0 ? `CRITICAL:\n${criticalFindings.map(f => `  ✗ ${f}`).join("\n")}` : ""}
${warnFindings.length > 0 ? `WARNINGS:\n${warnFindings.map(f => `  ! ${f}`).join("\n")}` : ""}
${wordIssues.length > 0 ? `WORD PROBLEMS (replace everywhere):\n${wordIssues.map(w => `  • "${w.word}" → ${w.suggestion}`).join("\n")}` : ""}` : "";

  const bulletRewriteBlock = bulletRewrites.length > 0 ? `
PRE-COMPUTED BULLET REWRITES — USE THESE AS THE BASELINE:
The analysis already computed validated rewrites for problematic bullets. Use these as your starting point — you may further improve them but must not regress to the original bad version.
${bulletRewrites.map((b, i) => `  ${i + 1}. ORIGINAL: "${b.before}"\n     BASELINE REWRITE: "${b.after}"`).join("\n")}` : "";

  const sectionRewriteBlock = sectionRewrites.length > 0 ? `
PRE-COMPUTED SECTION REWRITES — USE THESE AS THE BASELINE:
The analysis already produced these optimized section texts. Use them as your baseline for power optimization.
${sectionRewrites.map(s => `  ${s.label.toUpperCase()}:\n  ${s.text}`).join("\n\n")}` : "";

  const systemPrompt = `You are an expert resume writer and ATS optimization engine. Produce a power-optimized resume as structured data — layout is handled by a separate template, so you must NEVER produce HTML, Markdown, bullet symbols, or formatting instructions.

TARGET: ${jobContext}
${keywordBlock}
${issueBlock}
${bulletRewriteBlock}
${sectionRewriteBlock}

POWER OPTIMIZATION GOALS:
1. Fix every critical finding, warning, and word problem above — CRITICAL FINDINGS OVERRIDE THE SOURCE
2. Inject all missing keywords naturally — required keywords must appear at least once
3. Completely rewrite the summary — lead with the JD's top requirement; use the pre-computed summary as a baseline if provided
4. Rebuild skills from scratch — JD-required first, 5–6 categories, relevant to candidate's actual domain
5. Fully rewrite bullets for the 2 most recent roles: Verb + Context + Real Impact; use pre-computed bullet rewrites as baselines
6. Improve older role bullets using WORD PROBLEMS list above

CRITICAL FINDINGS ARE MANDATORY — NOT OPTIONAL:
If a critical finding says skills contain unrelated keywords (e.g. "Technology Strategy", "Cybersecurity",
"Cloud environments" for a lab/public health candidate) → REMOVE those skills entirely. Do not carry
forward content from the source resume that has been flagged as damaging.
If a critical finding calls out passive voice, weak verbs, missing metrics → fix each affected bullet.
NEVER copy a flagged problem from the source just because it was there originally.

STRICT PRESERVATION:
- All company names (exact spelling and casing — never all-caps a mixed-case brand)
- All job titles (exact)
- All employment dates
- All education institution names and degrees
- All certifications

METRIC RULE — STRICT:
Use ONLY metrics explicitly in the source resume.
Do NOT invent: percentages, counts, performance figures, efficiency gains.
If no metric exists, use qualitative impact instead.
You may add [~X% — confirm] ONLY if the source hints at an outcome without a number.

LANGUAGE RULES — STRICT:
Match verbs and language to the candidate's ACTUAL background level.
FORBIDDEN unless already in the source:
  spearheaded, pioneered, leveraged, orchestrated, visionary, dynamic, results-driven, passionate,
  digital transformation, strategic vision, technology leadership, cloud environments,
  enterprise technology, vendor management, cybersecurity, KPIs, innovation initiatives,
  customer-facing platforms, tech-stack decisions.

VERB GUIDE — follow strictly:
  Lab/scientific/public health: Prepared, Assisted, Participated, Managed, Conducted,
    Maintained, Documented, Monitored, Applied, Collaborated, Coordinated, Ensured.
  Tech professional: Designed, Built, Implemented, Deployed, Optimized, Automated, Resolved, Architected.
  Executive (VP/C-level ONLY): Led, Directed, Transformed, Established, Scaled.

BULLET COUNT:
  Most recent role: 5 bullets (use all 5)
  Second most recent: 4–5 bullets
  Older roles: 3–4 bullets
  Do NOT drop bullets from the source unless they are pure duplicate.

FIELD RULES:
- name: candidate's full name
- phone/email/location: exact from original
- summary: EXACTLY 5 sentences — (1) Role + years + 2-3 top skills for this JD. (2) Most relevant technical strength with evidence. (3) Quantified achievement from their actual experience. (4) Second key strength aligned to JD requirements. (5) What they will bring to this specific role. No clichés. Lead with the top JD requirement in sentence 1.
- skills: 5–6 categories with 4–7 items each. Inject JD-required skills that the candidate genuinely has. Items are short phrases, no symbols.
  CRITICAL: Do NOT inject technology strategy, cloud environments, cybersecurity, vendor management,
  enterprise technology, or digital transformation into skills for lab/biomedical/public health candidates.
  Appropriate categories for lab candidates: Laboratory Techniques, Scientific Methods, Regulatory & Quality,
  Analytical Equipment, Public Health, Languages.
- experience.bullets: plain sentences, action verb + context + impact, no bullet symbols, no Markdown
- company/dates/title: always separate fields, never merged
- experience: reverse chronological order (most recent first)
- education: exact school name and degree as in original
- certifications: IMPORTANT — scan the ENTIRE source resume for any certifications, licenses, or compliance
  credentials (GMP, BPF, HACCP, ISO, CPR, any professional license or training certificate). Extract ALL of
  them into this array even if they appear in a skills section or elsewhere. Each cert as a separate string.
  If none are found, return an empty array.

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
      content: `Power-optimize this resume. Fix ALL identified issues. Inject ALL missing keywords. Use ALL pre-computed rewrites as baselines. Rewrite the summary and recent role bullets aggressively. Return structured JSON only.\n\nRESUME:\n${resumeText.slice(0, 6000)}`,
    },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.3,
    maxTokens: 4000,
    jsonMode: true,
  });

  if (!reply) return NextResponse.json({ error: "Optimization failed" }, { status: 503 });

  try {
    const result = JSON.parse(reply) as { resumeData?: unknown };
    return NextResponse.json({ resumeData: result.resumeData ?? null });
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
