import { NextResponse } from "next/server";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    headline?: string;
    summary?: string;
    experience?: string;
    education?: string;
    skills?: string;
    linkedinUrl?: string;
    hasPhoto?: boolean;
    targetRole?: string;
  };

  const headline    = (body.headline    ?? "").trim();
  const summary     = (body.summary     ?? "").trim();
  const experience  = (body.experience  ?? "").trim();
  const education   = (body.education   ?? "").trim();
  const skills      = (body.skills      ?? "").trim();
  const linkedinUrl = (body.linkedinUrl ?? "").trim();
  const hasPhoto    = body.hasPhoto ?? false;
  const targetRole  = (body.targetRole  ?? "").trim();

  if (!headline && !summary && !experience) {
    return NextResponse.json({ error: "Provide at least headline or summary" }, { status: 400 });
  }

  const hasCustomUrl = linkedinUrl
    ? !/\/in\/[a-z]+-\d{8,}/i.test(linkedinUrl) && linkedinUrl.includes("/in/")
    : null;

  const systemPrompt = `You are a LinkedIn profile expert who gives direct, specific, actionable reviews — like a top career coach would. Be honest and concrete: reference their actual content, not generic advice.
${targetRole ? `Target role: ${targetRole}` : ""}

Return ONLY valid JSON matching this exact structure:
{
  "overall": <number 0-100>,
  "headline": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": "<optimized headline, max 220 chars, use | separators, keyword-rich>",
    "checks": [
      { "name": "Headline length", "pass": <bool>, "detail": "<specific: mention actual char count or word count>" },
      { "name": "Hard skills present", "pass": <bool>, "detail": "<specific: name skills found or missing>" },
      { "name": "No redundant words", "pass": <bool>, "detail": "<specific: quote actual redundant words or confirm clean>" },
      { "name": "Job title visible", "pass": <bool>, "detail": "<is their exact title clear to a recruiter?>" },
      { "name": "Value proposition", "pass": <bool>, "detail": "<does it explain WHY someone should click?>" }
    ]
  },
  "summary": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": "<3-5 sentence About section, first person, opens with a hook, includes 2 metrics, ends with CTA>",
    "checks": [
      { "name": "Summary length", "pass": <bool>, "detail": "<mention word count; 40-300 words is ideal>" },
      { "name": "Opens with a hook", "pass": <bool>, "detail": "<does the first sentence grab attention in 5 seconds?>" },
      { "name": "Uses metrics", "pass": <bool>, "detail": "<quote specific numbers found or note they are missing>" },
      { "name": "Hard skills mentioned", "pass": <bool>, "detail": "<list key skills present or absent>" },
      { "name": "Call to action", "pass": <bool>, "detail": "<does it end with what they want next?>" },
      { "name": "Active voice", "pass": <bool>, "detail": "<passive voice examples if found, or confirm active>" }
    ]
  },
  "experience": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": "<rewritten description for most recent role — 3-4 XYZ-formula bullets with strong verbs and metrics>",
    "checks": [
      { "name": "Quantified impact", "pass": <bool>, "detail": "<count how many bullets have numbers vs total>" },
      { "name": "Strong action verbs", "pass": <bool>, "detail": "<quote weak verbs found or confirm strong openers>" },
      { "name": "Work descriptions present", "pass": <bool>, "detail": "<are job descriptions filled in with bullets?>" },
      { "name": "Keyword-rich job titles", "pass": <bool>, "detail": "<do titles match what recruiters search?>" },
      { "name": "No gaps or red flags", "pass": <bool>, "detail": "<employment gaps, short stints, vague roles?>" }
    ]
  },
  "education": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": null,
    "checks": [
      { "name": "Education section present", "pass": <bool>, "detail": "<is education filled in?>" },
      { "name": "Institution and degree listed", "pass": <bool>, "detail": "<do they have school name + degree?>" },
      { "name": "Dates included", "pass": <bool>, "detail": "<graduation year present?>" },
      { "name": "Keywords in education", "pass": <bool>, "detail": "<relevant skills or activities mentioned?>" }
    ]
  },
  "other": {
    "score": <1-10>,
    "verdict": <"Perfect"|"Good"|"Needs Review"|"Missing">,
    "rewrite": null,
    "checks": [
      { "name": "Custom profile URL", "pass": ${hasCustomUrl === null ? "<bool based on url pattern>" : hasCustomUrl}, "detail": "${hasCustomUrl === null ? "<custom URL improves memorability>" : hasCustomUrl ? "Great — your URL is clean and custom." : "Your URL still has a random number string. Customize it at linkedin.com/public-profile/settings."}" },
      { "name": "Profile photo", "pass": ${hasPhoto}, "detail": "${hasPhoto ? "You have a profile photo — LinkedIn shows you get 21x more views with a photo." : "No photo detected. Profiles with photos get 21x more views. Add a professional headshot."}" },
      { "name": "Location visible", "pass": <bool>, "detail": "<is location set? Recruiters filter by location>" },
      { "name": "Skills section present", "pass": <bool>, "detail": "<do they have a skills list?>" },
      { "name": "Honors or awards section", "pass": <bool>, "detail": "<any certifications, awards, or publications?>" }
    ]
  },
  "keywords": {
    "present": ["<up to 8 strong keywords already in the profile>"],
    "missing": ["<6-8 high-value keywords for this role/industry that are absent>"]
  },
  "missingKeywords": ["<keyword (XX% of similar job postings)>", "<6 keywords with frequency data>"]
}

Scoring weights: headline 25%, summary 25%, experience 35%, education 10%, other 5%.
overall = weighted average * 10 (so 7.5 avg → 75 overall).
Be specific: quote actual phrases from their content when giving feedback. Generic feedback is useless.`;

  const content = [
    headline   ? `HEADLINE:\n${headline}` : "HEADLINE: (not provided)",
    summary    ? `\n\nSUMMARY/ABOUT:\n${summary.slice(0, 2000)}` : "\n\nSUMMARY: (not provided)",
    experience ? `\n\nEXPERIENCE:\n${experience.slice(0, 2000)}` : "\n\nEXPERIENCE: (not provided)",
    education  ? `\n\nEDUCATION:\n${education}` : "\n\nEDUCATION: (not provided)",
    skills     ? `\n\nSKILLS:\n${skills}` : "",
    linkedinUrl ? `\n\nLINKEDIN URL: ${linkedinUrl}` : "",
  ].join("");

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: content },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.25,
    maxTokens: 2500,
    jsonMode: true,
  });

  if (!reply) return NextResponse.json({ error: "Review failed" }, { status: 503 });

  try {
    const result = JSON.parse(reply);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not parse review" }, { status: 500 });
  }
}
