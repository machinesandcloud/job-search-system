import { NextResponse } from "next/server";

import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime     = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    action?: "generate-questions" | "score-answer";
    question?: string;
    answer?: string;
    stage?: string;
    category?: string;
    round?: string;
    resumeText?: string;
    jobDescription?: string;
  };

  const action = body.action ?? "score-answer";
  const stage  = body.stage ?? "job-search";
  const round  = body.round ?? "hiring-manager";

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  /* ── Generate questions by round and section ── */
  if (action === "generate-questions") {
    const resumeText     = (body.resumeText     ?? "").trim();
    const jobDescription = (body.jobDescription ?? "").trim();

    const ROUND_SECTIONS: Record<string, { sections: { name: string; description: string; count: number }[] }> = {
      "recruiter": { sections: [
        { name:"Background & Motivation", description:"Why you're making this move and what drives you", count:5 },
        { name:"Logistics & Expectations",description:"Salary, timeline, location, and role logistics",   count:4 },
      ]},
      "hiring-manager": { sections: [
        { name:"Behavioral",              description:"Past situations that reveal how you work",                 count:6 },
        { name:"Leadership & Influence",  description:"How you lead, influence, and navigate org dynamics",      count:5 },
        { name:"Situational Judgment",    description:"How you'd handle specific scenarios in this role",        count:4 },
      ]},
      "technical": { sections: [
        { name:"Technical Depth",         description:"Core technical knowledge required for the role",          count:5 },
        { name:"Problem Solving",         description:"Approach to ambiguous or complex technical challenges",   count:4 },
        { name:"Domain Knowledge",        description:"Industry and domain-specific expertise",                  count:4 },
      ]},
      "panel": { sections: [
        { name:"Behavioral",              description:"Stories that show how you operate and handle challenges",  count:4 },
        { name:"Technical",               description:"Role-specific technical depth and credibility",           count:4 },
        { name:"Strategic Thinking",      description:"How you think about the bigger picture and long-term",    count:3 },
        { name:"Culture & Values",        description:"How you collaborate, communicate, and fit the team",      count:3 },
      ]},
    };

    const roundConfig = ROUND_SECTIONS[round] ?? ROUND_SECTIONS["hiring-manager"];

    const systemPrompt = `You are Zari, a sharp career coach. Generate interview questions organized by section for a ${round.replace("-"," ")} interview.

${userContext ? `What you know about them:\n${userContext}\n\n` : ""}
${resumeText     ? `Candidate background:\n${resumeText.slice(0, 2500)}\n\n`        : ""}
${jobDescription ? `Job they're targeting:\n${jobDescription.slice(0, 1500)}\n\n` : ""}

Return ONLY valid JSON:
{
  "sections": [
    {
      "name": "<section name>",
      "description": "<what this section tests — 1 sentence>",
      "questions": [
        { "cat": "<specific topic>", "level": "<seniority or type>", "q": "<the question>" }
      ]
    }
  ]
}

Sections to generate (in this order):
${roundConfig.sections.map(s => `- "${s.name}" (${s.count} questions): ${s.description}`).join("\n")}

Rules:
- Every question must be specific to this person's actual background — reference real companies, roles, technologies, or experiences from their resume
- Questions must match the seniority and domain of the target job, NOT generic textbook questions
- For behavioral sections, use STAR-probing language ("Tell me about a time…", "Walk me through…", "Give me a specific example…")
- For technical sections, ask about tools/technologies mentioned in BOTH the resume and job description
- Include at least one tough or challenging question per section (gap, failure, conflict, or hard tradeoff)
- Level field should match the actual role seniority (e.g. "Senior", "Manager", "IC", "Director")
- Write questions as a real hiring manager would — direct, no preamble, no softening`;

    const reply = await openaiChat(
      [
        { role: "system" as const, content: systemPrompt },
        { role: "user"   as const, content: "Generate my personalized interview questions by section." },
      ],
      { model: process.env.OPENAI_MODEL ?? "gpt-4o-mini", temperature: 0.55, maxTokens: 2500, jsonMode: true }
    );

    if (!reply) return NextResponse.json({ error: "Could not generate questions" }, { status: 503 });

    try {
      return NextResponse.json(JSON.parse(reply));
    } catch {
      return NextResponse.json({ error: "Could not parse questions" }, { status: 500 });
    }
  }

  /* ── Score an answer ── */
  const question = (body.question ?? "").trim();
  const answer = (body.answer ?? "").trim();
  const category = body.category ?? "";
  const resumeText = (body.resumeText ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();

  if (!question || !answer) {
    return NextResponse.json({ error: "Question and answer required" }, { status: 400 });
  }

  const systemPrompt = `You are Zari, a career coach who feels like a sharp, honest friend. Score this interview answer and give feedback that's real and actionable — not generic coaching-speak.

${userContext ? `What you know about this person:\n${userContext}\n\n` : ""}
${resumeText ? `Their resume:\n${resumeText.slice(0, 1500)}\n\n` : ""}
${jobDescription ? `Role they're interviewing for:\n${jobDescription.slice(0, 800)}\n\n` : ""}

Return ONLY a valid JSON object:
{
  "overallScore": <number 0-100>,
  "dimensions": [
    { "label": "STAR Structure",    "score": <number 0-100> },
    { "label": "Evidence",          "score": <number 0-100> },
    { "label": "Impact clarity",    "score": <number 0-100> },
    { "label": "Concision",         "score": <number 0-100> },
    { "label": "Leadership signal", "score": <number 0-100> },
    { "label": "Stakeholder lens",  "score": <number 0-100> }
  ],
  "coachNote": "<2-3 sentences in a warm, direct voice — name what landed, what's missing, what to do about it. Refer to specific things they said.>",
  "suggestedResult": "<a complete, specific Result statement they could say verbatim in the interview>"
}

Scoring rules:
- Be honest — most answers score 55-80, not 90+
- The Result is almost always the weakest — if they didn't give a number or specific outcome, call it out
- coachNote must reference something specific they said (quote it if useful)
- suggestedResult should sound like them, just sharper
- Stage: ${stage} · Category: ${category}`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Question: ${question}\n\nAnswer: ${answer}` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.3,
    maxTokens: 700,
    jsonMode: true,
  });

  if (!reply) return NextResponse.json({ error: "Scoring failed — try again" }, { status: 503 });

  try {
    return NextResponse.json(JSON.parse(reply));
  } catch {
    return NextResponse.json({ error: "Could not parse scoring" }, { status: 500 });
  }
}
