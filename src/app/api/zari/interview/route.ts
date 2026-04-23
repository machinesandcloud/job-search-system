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
    criteriaText?: string;
    contextText?: string;
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
    const criteriaText   = (body.criteriaText   ?? "").trim();
    const contextText    = (body.contextText    ?? "").trim();

    if (stage === "promotion") {
      const PROMOTION_SECTIONS: Record<string, { sections: { name: string; description: string; count: number }[] }> = {
        manager: { sections: [
          { name:"Promotion Case", description:"Frame the ask and why you're already operating at the next level", count:4 },
          { name:"Scope & Impact", description:"Pressure-test business outcomes, complexity, and ownership", count:4 },
          { name:"Gaps & Objections", description:"Handle missing proof, timing concerns, or manager pushback", count:3 },
        ]},
        committee: { sections: [
          { name:"Rubric Alignment", description:"Map concrete examples to next-level criteria", count:4 },
          { name:"Influence & Complexity", description:"Defend cross-functional leadership, judgment, and scale", count:4 },
          { name:"Calibration Risks", description:"Answer skepticism, comparison, or 'not yet' objections", count:3 },
        ]},
        sponsor: { sections: [
          { name:"Case Summary", description:"Explain the case crisply enough for an executive to repeat it", count:3 },
          { name:"Proof Points", description:"Surface the evidence a sponsor can actually advocate with", count:3 },
          { name:"Advocacy Ask", description:"Make the sponsorship request direct, specific, and low-drama", count:3 },
        ]},
        "self-review": { sections: [
          { name:"Narrative Arc", description:"State what changed, why it matters, and why now", count:4 },
          { name:"Evidence", description:"Back your claims with outcomes, scale, and stakeholder impact", count:4 },
          { name:"Forward Signal", description:"Show readiness for the next level, not just strong current-level work", count:3 },
        ]},
      };

      const roundConfig = PROMOTION_SECTIONS[round] ?? PROMOTION_SECTIONS.manager;

      const systemPrompt = `You are Zari, a sharp promotion coach. Generate promotion-practice questions organized by section for a ${round.replace("-", " ")} conversation.

${userContext ? `What you know about them:\n${userContext}\n\n` : ""}
${resumeText   ? `Promotion evidence and recent wins:\n${resumeText.slice(0, 2500)}\n\n` : ""}
${criteriaText ? `Next-level criteria / rubric:\n${criteriaText.slice(0, 1800)}\n\n` : ""}
${contextText  ? `Promotion context:\n${contextText.slice(0, 1000)}\n\n` : ""}

Return ONLY valid JSON:
{
  "sections": [
    {
      "name": "<section name>",
      "description": "<what this section tests — 1 sentence>",
      "questions": [
        { "cat": "<specific topic>", "level": "<target level or next-level signal>", "q": "<the question>" }
      ]
    }
  ]
}

Sections to generate (in this order):
${roundConfig.sections.map(s => `- "${s.name}" (${s.count} questions): ${s.description}`).join("\n")}

Rules:
- This is a promotion conversation, not a job interview. Never mention recruiters, job descriptions, or job search language.
- Questions must test next-level scope, business impact, influence, judgment, and promotion readiness.
- Reference actual evidence, projects, stakeholders, or themes from their material whenever possible.
- Include at least one hard question per section that exposes a weak metric, unclear scope jump, weak sponsorship, or timing risk.
- Ask like a real manager, calibration committee member, or sponsor would: direct, skeptical when needed, and concrete.
- "level" should describe the next-level signal being tested, not generic seniority labels unless the target level is explicit.`;

      const reply = await openaiChat(
        [
          { role: "system" as const, content: systemPrompt },
          { role: "user" as const, content: "Generate my promotion-practice questions by section." },
        ],
        { model: process.env.OPENAI_MODEL ?? "gpt-4o-mini", temperature: 0.5, maxTokens: 2400, jsonMode: true }
      );

      if (!reply) return NextResponse.json({ error: "Could not generate questions" }, { status: 503 });

      try {
        return NextResponse.json(JSON.parse(reply));
      } catch {
        return NextResponse.json({ error: "Could not parse questions" }, { status: 500 });
      }
    }

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
  const criteriaText = (body.criteriaText ?? "").trim();
  const contextText = (body.contextText ?? "").trim();

  if (!question || !answer) {
    return NextResponse.json({ error: "Question and answer required" }, { status: 400 });
  }

  if (stage === "promotion") {
    const systemPrompt = `You are Zari, a promotion coach who gives direct, useful feedback. Score this promotion answer based on whether it would actually strengthen a manager or committee case.

${userContext ? `What you know about this person:\n${userContext}\n\n` : ""}
${resumeText ? `Promotion evidence and wins:\n${resumeText.slice(0, 1800)}\n\n` : ""}
${criteriaText ? `Next-level rubric / criteria:\n${criteriaText.slice(0, 1200)}\n\n` : ""}
${contextText ? `Promotion context:\n${contextText.slice(0, 800)}\n\n` : ""}

Return ONLY a valid JSON object:
{
  "overallScore": <number 0-100>,
  "dimensions": [
    { "label": "Rubric alignment", "score": <number 0-100> },
    { "label": "Impact proof", "score": <number 0-100> },
    { "label": "Scope & complexity", "score": <number 0-100> },
    { "label": "Influence", "score": <number 0-100> },
    { "label": "Executive clarity", "score": <number 0-100> },
    { "label": "Confidence", "score": <number 0-100> }
  ],
  "coachNote": "<2-3 sentences in a warm but no-nonsense voice. Say what landed, what was vague, and what proof is still missing. Reference specifics from their answer.>",
  "suggestedResult": "<a tighter, stronger version of the answer they could say verbatim in the promotion conversation>"
}

Scoring rules:
- Be honest. Most answers should land between 55 and 82.
- Penalize vague scope, fuzzy ownership, missing metrics, unclear next-level signal, or generic leadership claims.
- Reward concrete business impact, expanded scope, cross-functional influence, and crisp framing.
- The suggestedResult should sound like a stronger version of them, not generic executive-speak.
- Stage: ${stage} · Mode: ${round} · Category: ${category}`;

    const reply = await openaiChat(
      [
        { role: "system" as const, content: systemPrompt },
        { role: "user" as const, content: `Question: ${question}\n\nAnswer: ${answer}` },
      ],
      {
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.3,
        maxTokens: 700,
        jsonMode: true,
      }
    );

    if (!reply) return NextResponse.json({ error: "Scoring failed — try again" }, { status: 503 });

    try {
      return NextResponse.json(JSON.parse(reply));
    } catch {
      return NextResponse.json({ error: "Could not parse scoring" }, { status: 500 });
    }
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
