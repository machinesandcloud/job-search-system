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
These keywords were identified as missing. Embed them naturally without fabricating new experience.

${requiredMissing.length > 0 ? `REQUIRED (ATS will reject without these):\n${requiredMissing.map(k => `  • ${k.word}${k.skillType ? ` [${k.skillType}]` : ""}`).join("\n")}` : ""}
${preferredMissing.length > 0 ? `\nPREFERRED (include where they fit):\n${preferredMissing.map(k => `  • ${k.word}${k.skillType ? ` [${k.skillType}]` : ""}`).join("\n")}` : ""}

Strategy:
- Technical tools/skills → add to SKILLS section
- Soft skills/competencies → weave into SUMMARY or bullet context
- Domain terms/methodologies → embed in existing bullet context
- Never invent new jobs, companies, or project outcomes
- Every REQUIRED keyword must appear at least once` : "";

  const issueBlock = (criticalFindings.length > 0 || warnFindings.length > 0 || wordIssues.length > 0) ? `
IDENTIFIED ISSUES — FIX ALL
These problems were found by AI analysis. Address every one.

${criticalFindings.length > 0 ? `CRITICAL (must fix):\n${criticalFindings.map(f => `  ✗ ${f}`).join("\n")}` : ""}
${warnFindings.length > 0 ? `\nWARNINGS (fix where possible):\n${warnFindings.map(f => `  ! ${f}`).join("\n")}` : ""}
${wordIssues.length > 0 ? `\nWORD PROBLEMS (replace everywhere in the resume):\n${wordIssues.map(w => `  • "${w.word}" (${w.type}) → use: ${w.suggestion}`).join("\n")}` : ""}` : "";

  const systemPrompt = `You are a professional resume editor performing a TARGETED REVISION.

This is a fix-and-improve pass — not an aggressive rewrite. Your goal:
1. Fix EVERY critical finding, warning, and word problem identified by the AI analyzer
2. Inject ALL missing JD keywords naturally
3. Preserve the candidate's original voice, bullet structure, and section organization
4. Only rewrite bullets that are broken, weak, or contain flagged word problems
5. Do not dramatically change bullets that are already acceptable

TARGET: ${jobContext}
${keywordBlock}
${issueBlock}

REVISION RULES:
- Fix all word problems: replace flagged weak/cliché words with the suggested alternatives throughout the resume
- Inject required keywords: embed in Skills or naturally reframe existing bullets — do not fabricate experience
- Address critical findings: if it says "no quantified impact," add realistic context; if it says "passive voice," rewrite the bullet actively
- Address warnings: apply fixes where they fit without distorting the candidate's background
- PRESERVE: all company names (exact casing), all job titles, all dates, all education, all certifications
- PRESERVE: overall bullet count — don't add or remove bullets unless fixing a critical structural issue
- Match language to candidate's actual background level — no inflated executive language for non-executive roles

METRIC RULE — STRICT:
Use only metrics present in the original resume. Do not invent percentages, counts, or performance figures.
If no metric exists for a bullet, describe impact qualitatively. You may add [~X% — confirm] as a placeholder ONLY if the source hints at an outcome.

CANDIDATE-APPROPRIATE LANGUAGE:
Match verbs to candidate's actual background. Do NOT inject executive or tech-leadership language for lab, biomedical, or public health candidates.

Do NOT use unless explicitly in candidate's background:
- Technology strategy, customer-facing platforms, cloud environments, enterprise technology
- Vendor management, cybersecurity, KPIs, digital transformation, innovation initiatives

For lab/public health candidates, use grounded language:
- Laboratory techniques, reagent preparation, sample handling, analytical method validation
- Quality control, HACCP, GMP/BPF, scientific documentation
- Epidemiological monitoring, public health surveillance, patient tracing

Verbs by background:
- Lab/scientific roles: Prepared, Assisted, Participated, Managed, Conducted, Maintained, Documented
- Tech professional roles: Designed, Built, Implemented, Deployed, Optimized, Automated, Resolved
- Leadership/executive roles: Led, Directed, Established, Scaled, Drove (only if candidate is truly VP/C-level)
Never write "Spearheaded", "Pioneered", "Transformed", "Orchestrated" for lab technicians or interns.

DOCUMENT RULES — ABSOLUTE:
Output plain text only. Never output:
- Raw Markdown: **bold**, __bold__, *italic*, _italic_, # headings
- Fake divider lines: ====, ----, ════, ────
- Browser artifacts: about:blank, date/time stamps, page numbers (1/2, 2/2)
- Broken characters: high￾performance → write: high-performance
- Any preamble before the candidate's name

Use ONLY:
- Plain text
- • (U+2022) for every experience bullet
- · (U+00B7) as separator in contact line
- Blank lines for spacing
- ALL CAPS for section headers and candidate name

SECTION ORDER — DO NOT REORDER:
1. Candidate Name (ALL CAPS)
2. Contact Information
3. PROFESSIONAL SUMMARY
4. SKILLS
5. PROFESSIONAL EXPERIENCE
6. EDUCATION
7. CERTIFICATIONS

EXPERIENCE FORMAT — STRICT:
Company Name                                      Dates
Job Title

• Bullet
• Bullet

- Company name: left-aligned, proper brand casing — never all-caps a mixed-case brand
- Dates: right-aligned on same line as company
- Job title: own line below company/date — NEVER as a bullet (• or -); it is always plain text
- Reverse chronological order (most recent role first)
- Every bullet uses •

EDUCATION FORMAT — STRICT:
Each education entry uses a bullet for the school and plain text for the degree:

• School Name (line 1 — starts with •)
  Degree Name (line 2 — no bullet, indented)

Separate entries with one blank line. Example:
• Université Libre de Bruxelles
  Bachelier en Sciences Biomédicales

• Université de Dschang
  Master 2 en Santé Publique et Épidémiologie

SELF-CHECK BEFORE RETURNING:
1. Any Markdown syntax? → REMOVE
2. Any word problem still present? → REPLACE with suggestion
3. Every required keyword present at least once? → ADD if missing
4. Company + dates on same line, job title on next line? → FIX if not
5. Any job title as a bullet (• Job Title)? → CONVERT to plain text line (FIRST bullet must be a responsibility, never the job title)
6. Broken characters (high￾performance)? → FIX
7. Any consecutive blank lines (3+)? → COLLAPSE to one
8. All critical findings addressed? → FIX remaining
9. Company names properly cased? → FIX any all-capped mixed brands
10. No invented metrics? → REMOVE any fabricated numbers
11. Education: • School on line 1, degree (no bullet) on line 2? → FIX if not
12. Irrelevant tech/cloud/cybersecurity language in a lab or public health resume? → REMOVE

Return ONLY valid JSON: { "resumeText": "<complete revised resume, \\n for newlines>" }`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    {
      role: "user" as const,
      content: `Apply all identified fixes to this resume. Preserve the candidate's voice and structure. Fix all word problems, inject all missing keywords, address all critical and warning findings.\n\nRESUME:\n${resumeText.slice(0, 6000)}`,
    },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.25,
    maxTokens: 6000,
    jsonMode: true,
  });

  if (!reply) return NextResponse.json({ error: "Fix failed" }, { status: 503 });

  try {
    const result = JSON.parse(reply) as { resumeText?: string };
    return NextResponse.json({ resumeText: result.resumeText ?? "" });
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
