import { NextResponse } from "next/server";

import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { saveResumeScore, getResumeScoreHistory } from "@/lib/mvp/store";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime     = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    resumeText?: string;
    filename?: string;
    stage?: string;
    targetRole?: string;
    jobDescription?: string;
    reviewMode?: string;
    careerLevel?: string;
  };

  const resumeText = (body.resumeText ?? "").trim();
  const filename = (body.filename ?? "resume").trim();
  const stage = body.stage ?? "job-search";
  const targetRole = (body.targetRole ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();
  const reviewMode = body.reviewMode === "targeted" ? "targeted" : "general";
  const careerLevel = (["entry","mid","senior","executive"].includes(body.careerLevel ?? "")) ? (body.careerLevel as string) : "mid";

  if (!resumeText) {
    return NextResponse.json({ error: "Resume text required" }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const hasJobContext = reviewMode === "targeted" && (jobDescription || targetRole);

  const CAREER_LEVEL_CALIBRATION = {
    entry: `CAREER LEVEL: Entry (0-2 years)
- Expect fewer quantified bullets (2-3 is fine) — flag missing metrics but don't penalize heavily
- Education, projects, internships, and coursework are valid content — don't penalize their presence
- ATS: focus on skills alignment and basic keyword coverage, not volume
- Impact: 40%+ bullets with some metric is excellent at this level
- Clarity: fresh graduates often over-explain — flag walls of text more aggressively
- Be encouraging but honest; this person needs actionable wins`,
    mid: `CAREER LEVEL: Mid-level (3-7 years)
- Standard expectations apply — use the full rubric without adjustment
- 60%+ bullets should have metrics; weak verbs are a real problem at this level
- Should see clear career progression in experience section — flag if absent
- Summary should lead with specialization, not generic descriptors`,
    senior: `CAREER LEVEL: Senior (8-15 years)
- Higher bar: 70%+ bullets should have quantified results
- ATS bar is higher — senior roles are competitive; 80%+ keyword coverage expected
- Leadership, mentorship, and strategic impact should appear — flag if only execution-level bullets
- Summary must communicate scope and scale — flag if it reads like a mid-level resume
- Watch for "senior smell": date-heavy resumes, outdated skills, or titles that don't match claimed seniority`,
    executive: `CAREER LEVEL: Executive / VP+
- Metrics must be business-level: revenue, P&L, headcount, market position, company scale
- Technical execution bullets are weak at this level — flag if resume is too tactical
- Board-level communication style: crisp, strategic, high-signal
- ATS less important for exec roles, but still check for industry keywords and board-familiar terminology
- Summary is everything — it must justify the compensation ask in 5 seconds
- Leadership philosophy and org impact should be evident — flag if absent`,
  };

  const CORE_RESUME_KNOWLEDGE = `
═══ RESUME SCIENCE — APPLY THIS TO EVERY ANALYSIS ═══

${CAREER_LEVEL_CALIBRATION[careerLevel as keyof typeof CAREER_LEVEL_CALIBRATION] ?? CAREER_LEVEL_CALIBRATION.mid}

ATS SYSTEMS (how they actually work):
- Modern ATS uses NLP + keyword matching. Score weight: ~40-50% keyword match, title relevance, skills alignment, format parseability
- Target scores: 75% minimum, 80% for standard roles, 85%+ for competitive positions
- Exact matches score higher than synonyms ("Salesforce" > "CRM platform") — but context matters
- Keywords score highest in: headline/title > summary > skills section > bullet points
- ATS ignores or garbles: tables, columns, text boxes, graphics, headers/footers, decorative fonts
- Standard section names REQUIRED: "Experience" not "Work History", "Skills" not "Toolbox"
- Contact info MUST be in the body, not in a header/footer

KEYWORD STRATEGY (targeted mode):
1. Extract the 15-20 most important keywords from the JD: required skills, tools, certifications, job title, verb patterns
2. Rank them: required skills > preferred skills > responsibilities language > soft skills
3. Embed primary keywords naturally 2-3x max across the resume (summary + skills + 1 relevant bullet)
4. Use contextual synonyms for secondary mentions — don't repeat the same exact phrase 4 times
5. Every keyword should appear alongside evidence of using it, not just listed ("Built CI/CD pipelines using Jenkins" not just "Jenkins")
6. Flag every required skill from the JD that is MISSING from the resume — this is a critical gap
7. Subtlety rule: keywords woven into achievement bullets feel natural; a keyword dump in skills looks suspicious to humans even if ATS loves it

BULLET POINT RULES (XYZ formula):
- Formula: [Strong Action Verb] + [Skill/Task with specifics] + [Quantified Result]
- Example: "Reduced deployment failures 40% by implementing automated testing pipelines across 12 microservices"
- 60-70% of bullets MUST include a quantified metric (%, $, time, volume, team size)
- The first bullet under each role gets 3.5x more recruiter attention — it must be the strongest achievement
- Vary verbs — never use the same verb twice in one role's bullets
- Weak verbs to flag as critical: "Responsible for", "Helped", "Assisted", "Participated in", "Worked with", "Supported", "Handled", "Involved in", "Engaged with", "Contributed to"
- Passive voice to flag: "was responsible", "was tasked", "were deployed", "was involved", "was assigned", "is responsible" — passive voice signals low ownership even with otherwise strong bullets
- Strong verbs by category:
  Leadership: Spearheaded, Orchestrated, Directed, Mentored, Championed, Delegated, Recruited, Aligned
  Growth: Scaled, Grew, Expanded, Launched, Drove, Boosted, Accelerated, Captured, Generated
  Efficiency: Optimized, Streamlined, Reduced, Cut, Automated, Eliminated, Consolidated, Accelerated
  Engineering/Build: Built, Architected, Engineered, Shipped, Deployed, Designed, Migrated, Integrated
  Analysis: Analyzed, Assessed, Quantified, Identified, Diagnosed, Modeled, Forecasted
  Strategy: Defined, Established, Implemented, Overhauled, Pioneered, Transformed
- Keep bullets to 1-2 lines max. Wall-of-text bullets get skipped in the 7-second scan.

INDIVIDUAL BULLET SCORING RUBRIC (use when setting oldScore and newScore):
- 85-100: Strong verb + specific context + quantified result with real number (%, $, users, time, scale)
- 70-84: Strong verb + good context, but metric is missing or very vague ("significantly", "dramatically")
- 50-69: Weak verb OR no real outcome stated (task description without result)
- 25-49: Passive language OR "responsible for" type phrasing AND no quantified outcome
- 0-24: No verb, pure description, or completely generic ("Worked on various projects")

PROFESSIONAL SUMMARY RULES:
- Formula: [Role] with [X years] + [2-3 key skills tied to target role] + [1+ quantified achievement]
- Must include at least ONE metric (%, $, time saved, scale)
- 3-5 lines maximum
- In targeted mode: the summary must speak DIRECTLY to what the job description is asking for — lead with the top 2-3 requirements from the JD
- Ban these words: "results-driven", "detail-oriented", "team player", "passionate", "dynamic", "go-getter", "self-motivated", "seasoned", "thought leader", "innovative", "proactive", "synergy", "leverage" (as a verb), "proven track record", "self-starter", "hardworking", "dedicated professional", "fast learner" — meaningless on every resume
- Summaries with metrics get 340% more interview callbacks than generic ones

READABILITY & FORMAT:
- Recruiter spends average 7.4 seconds on initial scan; 80% of rejection happens from the top third of the page
- F-shaped reading: across the top, then down the left margin — strongest content must be top-left
- White space target: 30-40% of page — cramped resumes signal disorganization
- Bullet length: 1-2 lines. Anything longer gets skimmed past.
- Consistent formatting: same date format throughout, same verb tense (past tense for past roles), same bullet style
- Section order: Contact → Summary → Skills → Experience → Education → Certifications

SCORING RUBRIC — BE HONEST AND STRICT. THESE ARE HARD THRESHOLDS:

Scores below 60 are normal for unoptimized resumes. 80+ means genuinely strong. 90+ is rare.
The average unseen resume scores 35-55. Do not inflate scores to make people feel good.

ATS (0-100) — count actual keyword/skill coverage:
- 88-100: 90%+ required keywords present with evidence, perfect standard formatting, keywords in high-value zones
- 72-87:  70-89% coverage, minor formatting issues acceptable
- 55-71:  50-69% coverage OR significant formatting issues (tables, graphics, non-standard headers)
- 35-54:  30-49% coverage OR major structural problems
- 0-34:   Less than 30% coverage or ATS-breaking formatting

Impact (0-100) — count bullets with real quantified results:
- 88-100: 80%+ of bullets have metrics (%, $, time, volume, scale, team size), all strong opening verbs
- 72-87:  60-79% have metrics, most verbs strong
- 55-71:  40-59% have metrics, some weak verbs present
- 35-54:  20-39% have metrics, weak verbs common ("responsible for", "helped", "worked with")
- 0-34:   Less than 20% have metrics or most bullets start with weak/passive language

Clarity (0-100) — summary quality, bullet length, consistency:
- 88-100: Summary has metric + no generic adjectives, all bullets 1-2 lines, consistent dates/tense, no vague language
- 72-87:  Good summary, minor inconsistencies
- 55-71:  Generic summary OR several long bullets OR inconsistent formatting throughout
- 35-54:  Generic summary AND multiple formatting/tense/length issues
- 0-34:   No summary or completely vague, pervasive formatting problems

Overall: Impact × 0.35 + ATS × 0.30 + Clarity × 0.35 (round to nearest integer)
═══════════════════════════════════════════════════════`;

  const targetedInstructions = hasJobContext ? `
═══ TARGETED MODE: SCORE AGAINST THIS SPECIFIC JOB ═══
${targetRole ? `Target role: "${targetRole}"` : ""}
${jobDescription ? `\nJob description:\n${jobDescription.slice(0, 3000)}` : ""}

WHAT TO DO:
1. Read the entire JD carefully. Extract the 15-20 most important keywords: job title, required skills, tools, certifications, verb patterns used in responsibilities.
2. Rank them by importance: required > preferred > responsibilities language > soft skills.
3. For each critical keyword: does it appear on the resume? Is it backed by real evidence or just listed? Flag every MISSING required keyword as a critical finding.
4. Identify the positioning gap: how is the person currently positioned vs. what this role requires? Name it honestly.
5. Rewrite the summary to lead directly with the top 3 requirements from this JD — make the reader immediately understand why this person fits.
6. Rewrite top bullets to naturally embed the most important JD keywords alongside real achievements — woven in, not bolted on.
7. Add keywords ONLY where the person's actual background supports them — never fabricate experience they don't have.
8. The skills section must include all required technical skills from the JD that the person genuinely has.
9. Score ATS specifically against this JD — if 8 of 15 required keywords are missing, that is a low ATS score.
10. If there is a significant repositioning gap (e.g., their current role is quite different from the target), call it out clearly and tell them exactly how to bridge it through framing, language, and emphasis — not by inventing experience.
═══════════════════════════════════════════════════════` : `
═══ GENERAL MODE: QUALITY CHECK AGAINST UNIVERSAL RESUME STANDARDS ═══
CRITICAL RULE: The user has NOT specified a target role. DO NOT infer, assume, guess, or invent any target role whatsoever.
Do NOT say things like "for a [X] role" or "to target [Y] positions". Evaluate ONLY what is on the page.

What to do:
- Take the person's resume at face value — evaluate it as-is for universal quality
- Check bullets: do they use strong verbs? Are 60%+ quantified? Is the first bullet of each role the strongest?
- Check the summary: does it have a metric? Does it avoid generic adjectives? Is the value prop clear in 5 seconds?
- Check ATS basics: standard section names, no tables/graphics, keywords in context not just listed
- Check readability: consistent tense, consistent date format, no wall-of-text bullets
- Flag the biggest actual problems on this specific resume — name the exact bullet, phrase, or section
═══════════════════════════════════════════════════════`;

  // In general mode: inject context for personalization (name, history) but
  // explicitly forbid using the stored targetRole as the scoring target.
  // In targeted mode: the provided JD/role overrides anything in the profile.
  const contextBlock = userContext
    ? hasJobContext
      ? `Here's what you know about this person (for personalization only — the job description above is the scoring target, not anything in this profile):\n${userContext}`
      : `Here's what you know about this person (use name/history for personalization only — DO NOT use their stored target role as the scoring target for this analysis — they have selected General Review):\n${userContext}`
    : "";

  const systemPrompt = `You are Zari, a career coach and resume expert who talks like a sharp, honest friend — not a consultant. Direct, specific, warm. You've read 10,000 resumes and know exactly what gets people interviews.

${contextBlock ? `${contextBlock}\n\n` : ""}${CORE_RESUME_KNOWLEDGE}
${targetedInstructions}

Return ONLY a valid JSON object with exactly this structure:
{
  "overall": <number 0-100, calculated as Impact×0.35 + ATS×0.30 + Clarity×0.35>,
  "ats": <number 0-100, use the hard threshold rubric above>,
  "impact": <number 0-100, use the hard threshold rubric above>,
  "clarity": <number 0-100, use the hard threshold rubric above>,
  "tailoredScore": <ONLY in targeted mode: number 0-100 measuring how well-positioned this resume is for THIS specific job. Score formula: title/seniority alignment (20%) + required skills coverage (35%) + years of experience match (25%) + industry/domain match (20%). Calibrate strictly: title is completely different=0-5pts; adjacent title=10-15pts; same title=18-20pts. Skills: count required skills present / total required skills × 35. Experience: off by 3+ years=0-10pts; within 2 years=20-25pts; perfect match=25pts. Domain: different industry=0-5pts; adjacent=10-15pts; same=18-20pts. Sum the components. Do NOT conflate enthusiasm or transferable skills with actual alignment — be honest. A lab technician applying for CTO should score 5-15. A senior engineer with all required skills applying for an engineering manager role at the same seniority should score 75-85. OMIT this field entirely in general mode — do not include it at all.>,
  "bulletStats": {
    "total": <exact count of all bullet points in the resume>,
    "withMetrics": <count of bullets containing a number, %, $, time period, or other quantified result>,
    "withStrongVerbs": <count of bullets starting with a strong action verb from the approved list>,
    "weak": <count of bullets with weak verbs ("responsible for", "helped", "assisted", etc.) OR no clear impact>
  },
  "sectionScores": [
    {
      "name": "<Summary|Experience|Skills|Education|Contact>",
      "present": <true if this section exists in the resume>,
      "score": <0-100>,
      "verdict": "<one of: Strong | Good | Needs work | Weak verbs | No metrics | Missing | Incomplete | Generic | Too long | Outdated>"
    }
  ],
  "quickWins": [
    {
      "title": "<3-5 word action title — e.g. 'Quantify your top bullet'>",
      "action": "<one specific, actionable sentence naming the exact bullet, phrase, or section — e.g. 'Add a metric to your first bullet under Company X: how many users, what % improvement, or what revenue impact?'>",
      "effort": "<5 min|15 min|30 min>",
      "impact": "<high|medium>",
      "tab": "<overview|bullets|rewrite|keywords>",
      "bulletRef": "<if tab=bullets: copy the first 50 chars of the exact bullet 'before' text this win refers to, so the UI can scroll to it. Empty string otherwise.>"
    }
  ],
  "wordIssues": [
    {
      "word": "<the overused or weak word/phrase>",
      "count": <exact count of occurrences in the resume text>,
      "type": "<repetition|filler|weak_verb|cliche>",
      "suggestion": "<what to use instead — e.g. 'Vary with: Built, Shipped, Deployed, Architected'>"
    }
  ],
  "findings": [
    {
      "type": "critical",
      "category": "<one of: weak_verbs | quantify_impact | summary | ats_keywords | repetition | readability | dates | unnecessary_words | contact | format>",
      "text": "<name the actual problem with specific section/word — e.g. 'Your summary opens with Strategic engineering leader which tells a recruiter nothing about your business impact.'>"
    },
    {
      "type": "warn",
      "category": "<category from the list above>",
      "text": "<something real that needs work — name the specific bullet or section>"
    },
    {
      "type": "ok",
      "category": "<category from the list above>",
      "text": "<something genuinely working — be specific>"
    }
  ],
  "bullets": [
    {
      "before": "<exact original bullet text copied verbatim from the resume>",
      "after": "<rewrite using XYZ formula. Strong verb + specific skill/context + quantified result. In targeted mode: embed JD keywords naturally where supported by evidence.>",
      "reason": "<one sentence: exactly why this bullet is weak — e.g. 'Starts with weak verb Responsible for and has no metric showing the outcome.'>",
      "oldScore": <number 0-100, score the original bullet honestly>,
      "newScore": <number 0-100, score your rewrite>,
      "difficulty": "<easy|medium|hard — easy = just add a metric or swap the verb; medium = needs restructuring; hard = needs new information from the person>"
    }
  ],
  "recommendation": "<2-3 sentences like a coach talking to this specific person. Name the single highest-impact change and exactly how to make it. Reference something real from their resume — not boilerplate.>",
  "rewrittenSections": [
    {
      "label": "Summary",
      "originalText": "<copy the exact original summary text from the resume, verbatim — used to show a before/after comparison>",
      "text": "<Rewrite: [Role] + [top 2-3 skills tied to target] + [quantified achievement]. No generic adjectives. Targeted mode: lead with the top JD requirements. Sound like a real person.>",
      "score": <number 0-100>
    },
    {
      "label": "Experience highlights",
      "originalText": "<copy the 3 original bullet lines from the resume's most recent role that you are rewriting, verbatim>",
      "text": "<Rewrite the 3 strongest bullets from their most recent/relevant role using XYZ formula. Number them 1, 2, 3. Targeted mode: embed the most important JD keywords alongside real achievements.>",
      "score": <number 0-100>
    },
    {
      "label": "Skills",
      "originalText": "<copy the exact original skills section text from the resume, verbatim>",
      "text": "<Optimized skills list as a comma-separated string. Targeted mode: include all required JD skills the person genuinely has. Remove vague soft skills. Order by relevance to target role.>",
      "score": <number 0-100>
    }
  ],
  "keywords": [
    {
      "word": "<keyword from JD>",
      "found": <STRICT RULE: true ONLY if the exact term, its direct well-known abbreviation (JS=JavaScript, ML=Machine Learning, K8s=Kubernetes), or a professionally synonymous term used in the same context appears explicitly in the resume text. Generic conceptual overlap does NOT count. Examples of what is NOT a match: a lab technician mentioning "teamwork" does NOT mean "cross-functional leadership" is found; someone "working with computers" does NOT mean "cloud infrastructure" is found; "managed a small team" does NOT mean "executive leadership" is found; "wrote reports" does NOT mean "executive communications" is found. When in doubt, mark false. ATS systems do literal keyword matching — so should you.>,
      "importance": "<required | preferred>",
      "skillType": "<technical|soft|tool|certification|domain>",
      "context": "<if found=true: exact phrase from resume proving it. If found=false: empty string>"
    }
  ]
}

FINDINGS CATEGORY DEFINITIONS (assign the most accurate one):
- weak_verbs: bullets starting with "Responsible for", "Helped", "Assisted", "Participated", "Worked with", "Supported", "Handled", "Contributed to"
- passive_voice: bullets using passive construction ("was deployed", "were managed", "is responsible for") — passive signals low ownership
- quantify_impact: bullets that describe tasks but lack any metric (%, $, time, volume, team size, headcount)
- summary: issues with the professional summary (missing, generic adjectives, no metric, too long, too generic)
- ats_keywords: missing keywords from the JD, non-standard section names, ATS formatting issues
- repetition: same verb, phrase, or concept used multiple times across the resume
- readability: bullets over 2 lines, inconsistent tense/dates, formatting inconsistencies, wall of text
- dates: missing dates, inconsistent date formats, unexplained gaps over 3 months
- unnecessary_words: filler phrases ("various", "multiple", "several", "and more"), redundant context, bloat
- contact: contact information issues (missing, wrong format, outdated, in header/footer only)
- format: tables, graphics, columns, fonts, text boxes that break ATS parsing

KEYWORDS INSTRUCTION: ${hasJobContext
  ? `Extract the 15-20 most critical keywords from the job description. Apply STRICT matching (see keyword rules above). For a highly mismatched resume (e.g., lab technician applying for CTO), you should have 12-18 keywords marked found=false — that is correct and honest. Required = explicitly stated as required/must-have in JD. Preferred = everything else.`
  : "Return an empty array [] — no job description provided."}

BULLETS INSTRUCTION: Score every bullet using the individual bullet scoring rubric above. Include ALL bullets scoring below 72 — this is a complete audit, not a sample. If more than 8 score below 72, return the 8 with the LOWEST oldScore (worst bullets first). Maximum 8. Difficulty: easy = swap verb or add metric placeholder (under 5 min); medium = restructure the core thought; hard = person needs to recall specific numbers not present in the text. Every "before" must be the verbatim text from the resume — do not paraphrase or combine bullets.

QUICK WINS INSTRUCTION: Return exactly 3 quick wins. Rank by: highest improvement to score / least effort. Be ruthlessly specific — name the exact section or bullet. Include the right tab so we can link to it.

WORD ISSUES INSTRUCTION: Scan the full resume text. Report any word or phrase that: (a) appears 3+ times across the resume (repetition), (b) is on the banned-adjective list ("results-driven", "passionate", "detail-oriented", "team player", "go-getter", "dynamic", "motivated", "seasoned", "innovative", "proactive", "thought leader", "synergy", "leverage"), or (c) is a weak verb ("responsible for", "helped", "assisted", "worked with", "supported") used multiple times. Count exact occurrences. Only report real problems — a single use of a weak verb is a bullet issue, not a word issue. A word issue means a systemic pattern.

SECTION SCORES INSTRUCTION: Score each major section found in the resume. If a section is missing, mark present=false and score=0. Verdict must be one specific label, not a full sentence — it's used as a badge.

Voice rules:
- findings must name the actual problem with the specific bullet, word, or section ("Your first bullet under Foundation Finance starts with 'Responsible for' — that's a dead verb") — never generic advice
- recommendation must feel personal — reference something specific from their resume, not boilerplate
- rewrites must sound like a real person wrote them, not a resume template
- In general mode: NEVER mention a target role. NEVER say "for a [X] role". Only evaluate what exists on the page.
- In targeted mode: every finding and rewrite must tie back to what the specific JD is asking for
- Context: ${stage}`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Analyze this resume:\n\n${resumeText.slice(0, 6500)}` },
  ];

  const model = process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o";
  console.log("[resume] calling model:", model, "maxTokens: 3500");
  const reply = await openaiChat(messages, {
    model,
    temperature: 0.2,
    maxTokens: 3500,
    jsonMode: true,
  });

  if (!reply) {
    console.error("[resume] openaiChat returned null — model:", model);
    return NextResponse.json({ error: "Analysis failed — try again" }, { status: 503 });
  }

  try {
    const result = JSON.parse(reply) as { overall: number; ats: number; impact: number; clarity: number; [key: string]: unknown };

    // Server-side: always recalculate overall from components to guarantee formula consistency
    const ats     = Math.min(100, Math.max(0, Math.round(result.ats     as number)));
    const impact  = Math.min(100, Math.max(0, Math.round(result.impact  as number)));
    const clarity = Math.min(100, Math.max(0, Math.round(result.clarity as number)));
    result.ats     = ats;
    result.impact  = impact;
    result.clarity = clarity;
    result.overall = Math.min(100, Math.max(0, Math.round(impact * 0.35 + ats * 0.30 + clarity * 0.35)));

    // Persist score to history and fetch previous for delta display
    let previousScores: { overall: number; ats: number; impact: number; clarity: number } | null = null;
    if (userId) {
      try {
        const history = await getResumeScoreHistory(userId);
        if (history.length > 0) previousScores = history[0].scores; // last submission before this one
        await saveResumeScore(userId, {
          filename,
          mode: reviewMode,
          targetRole: targetRole || undefined,
          scores: { overall: result.overall, ats: result.ats, impact: result.impact, clarity: result.clarity },
        });
      } catch { /* non-fatal */ }
    }

    return NextResponse.json({ ...result, previousScores });
  } catch {
    return NextResponse.json({ error: "Could not parse analysis" }, { status: 500 });
  }
}
