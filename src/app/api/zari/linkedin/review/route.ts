import { NextResponse } from "next/server";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";

type ExperienceJob = { company: string; title: string; dateRange: string; description: string };

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    headline?: string;
    summary?: string;
    experienceJobs?: ExperienceJob[];
    education?: string;
    skills?: string;
    linkedinUrl?: string;
    hasPhoto?: boolean;
    targetRole?: string;
    recommendations?: string;
  };

  const headline      = (body.headline    ?? "").trim();
  const summary       = (body.summary     ?? "").trim();
  const experienceJobs: ExperienceJob[] = (Array.isArray(body.experienceJobs) ? body.experienceJobs : []).slice(0, 5);
  const education     = (body.education   ?? "").trim();
  const skills        = (body.skills      ?? "").trim();
  const linkedinUrl   = (body.linkedinUrl ?? "").trim();
  const hasPhoto      = body.hasPhoto ?? false;
  const targetRole    = (body.targetRole  ?? "").trim();
  const recommendations = (body.recommendations ?? "").trim();

  if (!headline && !summary && !experienceJobs.length) {
    return NextResponse.json({ error: "Provide at least headline, summary, or experience" }, { status: 400 });
  }

  const hasCustomUrl = linkedinUrl
    ? !/\/in\/[a-z]+-\d{8,}/i.test(linkedinUrl) && linkedinUrl.includes("/in/")
    : null;

  // Format jobs for the prompt
  const jobsText = experienceJobs.length
    ? experienceJobs.map((j, i) =>
        `JOB ${i + 1}: ${j.title} @ ${j.company} | ${j.dateRange}\n${j.description}`
      ).join("\n\n")
    : "(not provided)";

  const systemPrompt = `You are a LinkedIn profile expert — give direct, specific, actionable reviews. Reference actual content, not generic advice.
${targetRole ? `Target role: ${targetRole}` : ""}

Return ONLY valid JSON with this exact structure:
{
  "overall": <number 0-100>,
  "headline": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": "<optimized headline, max 220 chars, | separators, keyword-rich>",
    "rewriteRationale": ["<key change 1: what was weak + what was fixed>", "<key change 2>", "<key change 3>"],
    "checks": [
      { "name": "Headline length", "pass": <bool>, "detail": "<quote actual char count>" },
      { "name": "Hard skills present", "pass": <bool>, "detail": "<name skills found or missing>" },
      { "name": "No redundant words", "pass": <bool>, "detail": "<quote redundant words or confirm clean>" },
      { "name": "Job title visible", "pass": <bool>, "detail": "<is the exact title clear to a recruiter?>" },
      { "name": "Value proposition", "pass": <bool>, "detail": "<does it explain WHY someone should click?>" }
    ]
  },
  "summary": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": "<3-5 sentence About, first person, hook opener, 2 metrics, ends with CTA>",
    "rewriteRationale": ["<key change 1: what was weak + what was fixed>", "<key change 2>", "<key change 3>"],
    "checks": [
      { "name": "Summary length", "pass": <bool>, "detail": "<word count; 40-300 words is ideal>" },
      { "name": "Opens with a hook", "pass": <bool>, "detail": "<does the first sentence grab in 5 seconds?>" },
      { "name": "Uses metrics", "pass": <bool>, "detail": "<quote specific numbers found or note missing>" },
      { "name": "Hard skills mentioned", "pass": <bool>, "detail": "<list key skills present or absent>" },
      { "name": "Call to action", "pass": <bool>, "detail": "<does it end with what they want next?>" },
      { "name": "Active voice", "pass": <bool>, "detail": "<quote passive voice examples or confirm active>" }
    ]
  },
  "experience": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": null,
    "checks": [
      { "name": "Career progression visible", "pass": <bool>, "detail": "<do titles show growth over time?>" },
      { "name": "No employment gaps", "pass": <bool>, "detail": "<gaps or suspicious short stints?>" },
      { "name": "Keyword-rich titles", "pass": <bool>, "detail": "<do titles match what recruiters search?>" }
    ],
    "jobs": [
      ${experienceJobs.map((j, i) => `{
        "company": "${j.company.replace(/"/g, '\\"')}",
        "title": "${j.title.replace(/"/g, '\\"')}",
        "dateRange": "${j.dateRange.replace(/"/g, '\\"')}",
        "score": <1-10 for JOB ${i + 1}>,
        "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
        "rewrite": "<4-5 bullets for JOB ${i + 1}. Separate each bullet with \\n. Start each with • and a space. Write in a natural, conversational tone — not stiff template-speak. Lead with a strong action verb. Show impact through scope, context, outcomes, and numbers. IMPORTANT: every bullet must include at least one quantified signal — if specific numbers are absent from the original, add reasonable estimates based on context and seniority (e.g., '~40% reduction', 'team of 6', 'across 3 product lines', '$2M budget'). Full sentences, ~20-25 words each. Preserve ALL key details, tools, and metrics from the original. Based ONLY on what is described in JOB ${i + 1}>",
        "checks": [
          { "name": "Quantified impact", "pass": <bool>, "detail": "<count bullets with numbers vs total in JOB ${i + 1}>" },
          { "name": "Strong action verbs", "pass": <bool>, "detail": "<quote weak verbs found or confirm strong openers in JOB ${i + 1}>" },
          { "name": "Descriptions filled in", "pass": <bool>, "detail": "<are bullets present or is the role bare?>" }
        ]
      }`).join(",\n      ")}
    ]
  },
  "education": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": null,
    "checks": [
      { "name": "Education present", "pass": <bool>, "detail": "<is education filled in?>" },
      { "name": "Degree and institution", "pass": <bool>, "detail": "<school name + degree present?>" },
      { "name": "Dates included", "pass": <bool>, "detail": "<graduation year present?>" },
      { "name": "Relevant coursework or activities", "pass": <bool>, "detail": "<any skills or activities mentioned?>" }
    ]
  },
  "other": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": null,
    "checks": [
      { "name": "Custom profile URL", "pass": ${hasCustomUrl === null ? "<bool>" : hasCustomUrl}, "detail": "${hasCustomUrl === null ? "<custom URL improves memorability and SEO>" : hasCustomUrl ? "Your URL is clean and custom — great for sharing and memorability." : "Your URL still has a random number string. Go to linkedin.com/public-profile/settings to customize it."}" },
      { "name": "Profile photo", "pass": ${hasPhoto}, "detail": "${hasPhoto ? "Profile photo present — profiles with photos get 21x more views." : "No photo detected. Add a professional headshot — profiles with photos get 21x more views."}" },
      { "name": "Location visible", "pass": <bool>, "detail": "<is location set? Recruiters filter by location>" },
      { "name": "Skills section present", "pass": <bool>, "detail": "<skills list filled in?>" },
      { "name": "Certifications or awards", "pass": <bool>, "detail": "<any certifications, licenses, or publications?>" }
    ]
  },
  "networking": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": null,
    "checks": [
      { "name": "500+ connections", "pass": false, "detail": "Connection count isn't visible in the PDF export — aim for 500+ connections to unlock LinkedIn's full search algorithm visibility." },
      { "name": "Recommendations received", "pass": ${recommendations ? "true" : "false"}, "detail": "${recommendations ? `Recommendations found in profile: ${recommendations.slice(0, 120)}` : "No recommendations found. Request at least 3 from managers or close colleagues — they're the #1 trust signal on LinkedIn."}" },
      { "name": "Recommendations given", "pass": <bool>, "detail": "<have they given recommendations to others? Giving increases visibility and reciprocity>" },
      { "name": "Skills for endorsements", "pass": <bool>, "detail": "<do they have 5+ skills listed? Endorsed skills appear in recruiter searches>" },
      { "name": "Thought leadership signals", "pass": <bool>, "detail": "<any articles, publications, or featured content in their profile?>" }
    ]
  },
  "keywords": {
    "present": ["<up to 8 strong keywords already in the profile>"],
    "missing": ["<6-8 high-value keywords for this role/industry that are absent>"]
  },
  "missingKeywords": ["<keyword (XX% of similar job postings)>", "<6 keywords with frequency data>"]
}

Scoring: headline 20%, summary 20%, experience 35%, education 10%, other 10%, networking 5%.
overall = weighted average * 10.
Be specific — quote actual phrases. Generic feedback is useless.`;

  const content = [
    headline   ? `HEADLINE:\n${headline}` : "HEADLINE: (not provided)",
    summary    ? `\n\nSUMMARY/ABOUT:\n${summary.slice(0, 2000)}` : "\n\nSUMMARY: (not provided)",
    `\n\nEXPERIENCE:\n${jobsText.slice(0, 3000)}`,
    education  ? `\n\nEDUCATION:\n${education}` : "\n\nEDUCATION: (not provided)",
    skills     ? `\n\nSKILLS:\n${skills}` : "",
    linkedinUrl ? `\n\nLINKEDIN URL: ${linkedinUrl}` : "",
    recommendations ? `\n\nRECOMMENDATIONS:\n${recommendations}` : "",
  ].join("");

  const reply = await openaiChat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: content },
    ],
    {
      model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.25,
      maxTokens: 5000,
      // Note: gpt-4o at 5000 tokens takes ~15-20s — do not increase without testing timeout
      jsonMode: true,
    }
  );

  if (!reply) return NextResponse.json({ error: "Review failed" }, { status: 503 });

  try {
    const result = JSON.parse(reply);
    // Merge original job data (company/title/dateRange) into each job in the response
    if (Array.isArray(result.experience?.jobs)) {
      result.experience.jobs = result.experience.jobs.map(
        (j: Record<string, unknown>, i: number) => ({
          ...experienceJobs[i],
          ...j,
        })
      );
    }
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not parse review" }, { status: 500 });
  }
}
