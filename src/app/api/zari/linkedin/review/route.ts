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
    skills?: string;
    targetRole?: string;
  };

  const headline   = (body.headline   ?? "").trim();
  const summary    = (body.summary    ?? "").trim();
  const experience = (body.experience ?? "").trim();
  const skills     = (body.skills     ?? "").trim();
  const targetRole = (body.targetRole ?? "").trim();

  if (!headline && !summary && !experience) {
    return NextResponse.json({ error: "Provide at least your headline or summary" }, { status: 400 });
  }

  const systemPrompt = `You are a LinkedIn profile expert. Analyze the provided LinkedIn profile content and return a detailed, honest score with actionable checks — exactly like a professional LinkedIn review tool would. Be direct and specific, not generic.

${targetRole ? `Target role: ${targetRole}` : ""}

Return ONLY valid JSON in this exact structure:
{
  "overall": <number 0-100, weighted average>,
  "headline": {
    "score": <number 1-10>,
    "verdict": <"Perfect" | "Good" | "Needs Review" | "Missing">,
    "rewrite": "<optimized headline — max 220 chars, use | separators, lead with role, end with value prop>",
    "checks": [
      { "name": "Headline length", "pass": <true|false>, "detail": "<specific feedback about their actual headline>" },
      { "name": "Hard skills present", "pass": <true|false>, "detail": "<name specific skills they have or are missing>" },
      { "name": "No redundant words", "pass": <true|false>, "detail": "<specific redundant words found or clean>" },
      { "name": "Job title visible", "pass": <true|false>, "detail": "<is their title clear?>" },
      { "name": "Value proposition", "pass": <true|false>, "detail": "<does it say why someone should care?>" }
    ]
  },
  "summary": {
    "score": <number 1-10>,
    "verdict": <"Perfect" | "Good" | "Needs Review" | "Missing">,
    "rewrite": "<optimized About section — 3-5 sentences, first person, hook in sentence 1, include a metric, end with CTA>",
    "checks": [
      { "name": "Summary length", "pass": <true|false>, "detail": "<word count and whether it's appropriate>" },
      { "name": "Uses metrics", "pass": <true|false>, "detail": "<specific numbers present or missing>" },
      { "name": "Strong opening hook", "pass": <true|false>, "detail": "<does the first sentence grab attention?>" },
      { "name": "Hard skills mentioned", "pass": <true|false>, "detail": "<key skills present or absent>" },
      { "name": "Call to action", "pass": <true|false>, "detail": "<does it end with what they want?>" },
      { "name": "Active voice", "pass": <true|false>, "detail": "<passive voice instances if found>" }
    ]
  },
  "experience": {
    "score": <number 1-10>,
    "verdict": <"Perfect" | "Good" | "Needs Review" | "Missing">,
    "rewrite": "<rewritten description for most recent role — XYZ bullets, strong verbs, metrics>",
    "checks": [
      { "name": "Quantified impact", "pass": <true|false>, "detail": "<how many bullets have numbers?>" },
      { "name": "Strong action verbs", "pass": <true|false>, "detail": "<weak verbs found or strong openers present>" },
      { "name": "Role descriptions present", "pass": <true|false>, "detail": "<are job descriptions filled in?>" },
      { "name": "Keyword-rich titles", "pass": <true|false>, "detail": "<do titles match recruiter search terms?>" },
      { "name": "Consistent formatting", "pass": <true|false>, "detail": "<formatting assessment>" }
    ]
  },
  "keywords": {
    "present": ["<keyword1>", "<keyword2>", "...up to 8 strong keywords already in the profile>"],
    "missing": ["<keyword1>", "<keyword2>", "...6-8 high-value keywords for this role that are absent>"]
  },
  "missingKeywords": ["<keyword (XX% of similar roles)>", "...6 keywords with estimated frequency>"]
}

Scoring rules:
- overall = headline*0.25 + summary*0.25 + experience*0.35 + (skills present ? 1 : 0)*0.15 * 10, all normalized to 0-100
- Be specific: reference actual content from the profile, not generic advice
- If a section is not provided, score it 0 and verdict "Missing"
- Checks: "pass": true = green checkmark, "pass": false = red X`;

  const userContent = [
    headline   ? `HEADLINE:\n${headline}` : "HEADLINE: (not provided)",
    summary    ? `\nSUMMARY/ABOUT:\n${summary.slice(0, 2000)}` : "\nSUMMARY: (not provided)",
    experience ? `\nEXPERIENCE:\n${experience.slice(0, 2000)}` : "\nEXPERIENCE: (not provided)",
    skills     ? `\nSKILLS:\n${skills}` : "",
  ].join("");

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: userContent },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: 0.3,
    maxTokens: 2000,
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
