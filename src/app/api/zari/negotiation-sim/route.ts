import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    type?: "open" | "reply" | "coaching" | "debrief";
    scenario?: string;
    role?: string;
    company?: string;
    targetComp?: string;
    currentComp?: string;
    difficulty?: string;
    leverage?: string;
    conversation?: Array<{ role: "user" | "assistant"; text: string }>;
    lastUserMessage?: string;
    lastAssistantMessage?: string;
  };

  const role = (body.role ?? "").trim();
  const type = body.type ?? "open";

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) { try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ } }

  const difficultyMap: Record<string, string> = {
    friendly: "You are warm and collaborative — genuinely want to find a good number. Still push back professionally but are easy to work with.",
    realistic: "You are a professional recruiter — realistic pushback, budget-conscious, open to negotiation but won't cave easily. Ask why, probe their reasoning.",
    tough: "You are a tough, skeptical negotiator. Push hard on every number. Ask 'why that number?', bring up budget constraints aggressively, act skeptical of their reasoning. Professional but high-pressure.",
  };

  const scenarioMap: Record<string, string> = {
    "new-offer": "new job offer negotiation — you just extended an offer and they want to discuss compensation",
    raise: "annual raise review — this is their current employer and they're asking for a raise",
    counter: "counter-offer conversation — they received your initial offer and are coming back with a counter",
    lowball: "lowball offer recovery — you made a low offer and they're pushing back significantly",
  };

  const difficultyDesc = difficultyMap[body.difficulty ?? "realistic"] ?? difficultyMap.realistic;
  const scenarioDesc = scenarioMap[body.scenario ?? "new-offer"] ?? scenarioMap["new-offer"];

  if (type === "open") {
    const systemPrompt = `You are playing the role of a Hiring Manager in a salary negotiation roleplay practice session.

${userContext ? `Profile context:\n${userContext}\n` : ""}
SCENARIO: ${scenarioDesc}
ROLE BEING NEGOTIATED: ${role}
${body.company ? `COMPANY: ${body.company}` : ""}
${body.targetComp ? `CANDIDATE'S TARGET: ${body.targetComp}` : ""}
${body.currentComp ? `CANDIDATE'S CURRENT COMP: ${body.currentComp}` : ""}
${body.leverage ? `CONTEXT: ${body.leverage}` : ""}

PERSONALITY: ${difficultyDesc}

Rules:
- Keep responses SHORT — 2-4 sentences max. Real conversation, not an essay.
- Stay 100% in character as the hiring manager throughout.
- Open the negotiation naturally — present the offer or ask for their expectations.
- After 5-7 exchanges, move toward resolution.
- NEVER break character to give advice or coaching.`;

    const reply = await openaiChat(
      [
        { role: "system" as const, content: systemPrompt },
        { role: "user" as const, content: "Start the negotiation. Open as the hiring manager." },
      ],
      { model: process.env.OPENAI_MODEL ?? "gpt-4o-mini", temperature: 0.65, maxTokens: 200 }
    );

    return NextResponse.json({
      reply: reply ?? "Great to connect with you. We're excited about the role — we'd like to extend an offer and wanted to talk through the compensation details. What were you expecting?",
    });
  }

  if (type === "reply") {
    const conv = body.conversation ?? [];
    const systemPrompt = `You are playing a Hiring Manager in a salary negotiation roleplay for ${role}${body.company ? ` at ${body.company}` : ""}.
SCENARIO: ${scenarioDesc}
TARGET COMP: ${body.targetComp ?? "not specified"}
PERSONALITY: ${difficultyDesc}
Keep responses SHORT — 2-4 sentences. Stay in character. Never give coaching advice.`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...conv.map(m => ({ role: m.role as "user" | "assistant", content: m.text })),
    ];

    const reply = await openaiChat(messages, { model: process.env.OPENAI_MODEL ?? "gpt-4o-mini", temperature: 0.65, maxTokens: 200 });
    return NextResponse.json({ reply: reply ?? "That's a strong point. Let me take that back to the team and see what we can do." });
  }

  if (type === "coaching") {
    const systemPrompt = `You are Zari, a sharp salary negotiation coach. You just watched one exchange in a practice negotiation.

${userContext ? `Profile context:\n${userContext}\n` : ""}
CONTEXT: ${scenarioDesc} for ${role}
TARGET: ${body.targetComp ?? "not specified"}

Return ONLY valid JSON:
{
  "coaching": "<1-2 sentence specific insight about what the candidate just said — what worked or what to improve>",
  "betterPhrasing": "<a stronger version of what they said, or null if their phrasing was already strong>"
}

Be specific to what they actually said. Not generic advice.`;

    const userPrompt = `HIRING MANAGER SAID: "${body.lastAssistantMessage}"
CANDIDATE SAID: "${body.lastUserMessage}"

Coach the candidate on their response.`;

    const reply = await openaiChat(
      [
        { role: "system" as const, content: systemPrompt },
        { role: "user" as const, content: userPrompt },
      ],
      { model: process.env.OPENAI_MODEL ?? "gpt-4o-mini", temperature: 0.3, maxTokens: 220, jsonMode: true }
    );

    const fallback = { coaching: "Good instinct — keep anchoring to market value and the outcomes you bring, not just your current number.", betterPhrasing: null };
    if (!reply) return NextResponse.json(fallback);

    try {
      const p = JSON.parse(reply) as Record<string, unknown>;
      return NextResponse.json({
        coaching: typeof p.coaching === "string" ? p.coaching.trim() : fallback.coaching,
        betterPhrasing: typeof p.betterPhrasing === "string" && p.betterPhrasing.trim() ? p.betterPhrasing.trim() : null,
      });
    } catch {
      return NextResponse.json(fallback);
    }
  }

  if (type === "debrief") {
    const conv = body.conversation ?? [];
    const systemPrompt = `You are Zari, an expert salary negotiation coach. A candidate just finished a full practice session.

${userContext ? `Profile context:\n${userContext}\n` : ""}
CONTEXT: ${scenarioDesc} for ${role}
TARGET: ${body.targetComp ?? "not specified"}
DIFFICULTY: ${body.difficulty ?? "realistic"}

Analyze their full negotiation performance honestly.

Return ONLY valid JSON:
{
  "score": <0-100: negotiation effectiveness>,
  "verdict": "<Strong negotiator | Getting there | Needs more practice>",
  "summary": "<2 honest sentences: overall read on how they did and what defines their current level>",
  "nailed": ["<specific thing from the conversation they did well>", "<thing>", "<thing>"],
  "improve": ["<specific gap with concrete reason why it matters>", "<gap>", "<gap>"],
  "phrases": [
    { "original": "<exact or close paraphrase of what they said>", "better": "<stronger version with explanation of why>" },
    { "original": "<what they said>", "better": "<stronger version>" }
  ]
}

Rules:
- "nailed" and "improve" MUST reference what actually happened in the conversation.
- "phrases" must rewrite actual things they said — not hypothetical examples.
- Score honestly: 0-40 = struggled, 41-65 = getting there, 66-85 = solid, 86-100 = strong.
- If they performed poorly, say so clearly. Honest feedback is the point.`;

    const conversationText = conv.map(m => `${m.role === "user" ? "CANDIDATE" : "HIRING MANAGER"}: ${m.text}`).join("\n\n");

    const reply = await openaiChat(
      [
        { role: "system" as const, content: systemPrompt },
        { role: "user" as const, content: `Full negotiation session:\n\n${conversationText}\n\nGive the debrief.` },
      ],
      { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.25, maxTokens: 900, jsonMode: true }
    );

    const fallback = {
      score: 52,
      verdict: "Getting there",
      summary: "You showed up and engaged — that counts. The gap between where you are and a strong negotiator is mostly about anchoring with confidence and defending with value instead of conceding under the first sign of pressure.",
      nailed: ["You stayed professional and kept the conversation constructive.", "You made a clear ask and didn't completely cave on the number.", "You maintained composure when pushed back on."],
      improve: ["Anchor higher earlier — don't let them set the first number if you can avoid it.", "Lead with market data when defending your number, not just tenure or experience.", "When they push back, ask a clarifying question before conceding anything."],
      phrases: [
        { original: "I was thinking somewhere around that range.", better: "Based on market benchmarks for this role and level, I'm targeting $[X]. That reflects what the data shows for this scope. What does your range look like?" },
        { original: "That makes sense, I understand the constraints.", better: "I hear you on the constraints — can you help me understand what would need to be true to get closer to $[X]? I want to find a way to make this work." },
      ],
    };

    if (!reply) return NextResponse.json(fallback);

    try {
      const p = JSON.parse(reply) as Record<string, unknown>;
      const str = (k: string) => typeof p[k] === "string" ? (p[k] as string).trim() : "";
      const list = (k: string, max: number) => Array.isArray(p[k]) ? (p[k] as unknown[]).map(v => typeof v === "string" ? v.trim() : "").filter(Boolean).slice(0, max) : [];
      const phrases = Array.isArray(p.phrases) ? (p.phrases as unknown[]).map(item => {
        if (item && typeof item === "object") {
          const o = item as Record<string, unknown>;
          const original = typeof o.original === "string" ? o.original.trim() : "";
          const better = typeof o.better === "string" ? o.better.trim() : "";
          return original && better ? { original, better } : null;
        }
        return null;
      }).filter(Boolean).slice(0, 3) as { original: string; better: string }[] : [];

      return NextResponse.json({
        score: typeof p.score === "number" ? Math.min(100, Math.max(0, Math.round(p.score))) : fallback.score,
        verdict: str("verdict") || fallback.verdict,
        summary: str("summary") || fallback.summary,
        nailed: list("nailed", 4).length ? list("nailed", 4) : fallback.nailed,
        improve: list("improve", 4).length ? list("improve", 4) : fallback.improve,
        phrases: phrases.length ? phrases : fallback.phrases,
      });
    } catch {
      return NextResponse.json(fallback);
    }
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}
