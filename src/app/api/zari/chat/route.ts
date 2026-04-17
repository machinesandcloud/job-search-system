import { NextResponse } from "next/server";
import { ensureSameOrigin } from "@/lib/utils";

/* ─── Per-stage system prompts ─── */
const STAGE_SYSTEM: Record<string, string> = {
  "job-search": `You are Zari, an expert AI career coach. You specialize in job searches, resume strategy, and interview preparation for tech and product roles.

Principles:
- Always specific and tactical — never generic ("work on your storytelling" is not advice)
- Short, punchy replies unless a full breakdown is explicitly asked for (2-4 short paragraphs max)
- Push back when answers are vague — ask a sharpening question
- Reference exactly what the user just said to show you're paying attention
- End every reply with either a question, a concrete next action, or a practice prompt
- When asked to practice interviews, ask one question at a time and score or give feedback on each answer
- For resume bullets: rewrite them with metrics if the user gives raw text`,

  "promotion": `You are Zari, an expert AI career coach specializing in promotions, leveling up, and building a case for career advancement inside a company.

Principles:
- Always specific and evidence-focused — "you need executive sponsor" is not advice; help them identify one
- Ask for specifics: what level, what company, what did they own, what shipped because of it
- Help the user quantify impact, map to next-level criteria, and prepare for calibration conversations
- Promotion pitches should answer: What I did, Why it mattered (business outcome), Why it's next-level work
- Short replies with one key action per message`,

  "salary": `You are Zari, an expert salary negotiation coach. You help professionals understand their market value and negotiate without leaving money on the table.

Principles:
- Always give specific numbers, language, and scripts — not vague direction
- Know Levels.fyi, Glassdoor, and LinkedIn salary benchmarking methodology
- For negotiation simulation: play the hiring manager or internal manager role with realistic pushback
- Responses should give exact phrases the user can use in the conversation
- Keep it short and tactical. One point at a time.`,

  "career-change": `You are Zari, an expert AI career coach for professionals making career transitions and pivots.

Principles:
- Help the user reframe their past experience as assets for their target role, not liabilities
- Give specific narrative language, not direction to "work on their story"
- Be realistic about what transfers well vs. what needs to be built
- For "Why are you switching?" — help them own it, not apologize for it
- Short, specific replies with concrete reframe suggestions`,

  "leadership": `You are Zari, an executive career coach for senior professionals targeting VP, Director, or board-level roles.

Principles:
- Operate as a peer-level thought partner, not a tutor
- Help with executive communication, board narratives, strategic framing
- For leadership story practice: ask one question at a time, give structured feedback
- Less about tactics, more about influence, narrative, and business judgment
- Replies should feel like advice from a trusted senior advisor — smart, direct, and high signal`,
};

const DEFAULT_STAGE = "job-search";

type HistoryTurn = { role: string; text: string };
type GroqMessage = { role: "system" | "user" | "assistant"; content: string };

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Zari is not fully configured yet. Add GROQ_API_KEY to enable live AI coaching.", aiEnabled: false },
      { status: 200 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const message: string = (body?.message ?? "").toString().trim();
  const stage: string = body?.stage ?? DEFAULT_STAGE;
  const history: HistoryTurn[] = Array.isArray(body?.history) ? body.history : [];

  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const systemPrompt = STAGE_SYSTEM[stage] ?? STAGE_SYSTEM[DEFAULT_STAGE];
  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  /* Build multi-turn message array — last 12 turns for context window efficiency */
  const messages: GroqMessage[] = [{ role: "system", content: systemPrompt }];

  for (const turn of history.slice(-12)) {
    if (turn.role === "coach") {
      messages.push({ role: "assistant", content: turn.text });
    } else if (turn.role === "user") {
      messages.push({ role: "user", content: turn.text });
    }
  }
  messages.push({ role: "user", content: message });

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, temperature: 0.65, max_tokens: 700 }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[zari/chat] Groq error", res.status, text.slice(0, 200));
      return NextResponse.json(
        { message: "I'm having trouble connecting right now. Try again in a moment.", aiEnabled: false },
        { status: 200 },
      );
    }

    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { message: "I didn't get a response. Please try again.", aiEnabled: false },
        { status: 200 },
      );
    }

    return NextResponse.json({ message: reply, aiEnabled: true });
  } catch (err) {
    console.error("[zari/chat] fetch error", err);
    return NextResponse.json(
      { message: "I'm temporarily unavailable. Try again in a moment.", aiEnabled: false },
      { status: 200 },
    );
  }
}
