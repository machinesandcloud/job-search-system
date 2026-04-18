import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat, type OAIMessage } from "@/lib/openai";
import { appendSessionEvent } from "@/lib/mvp/store";
import { ensureSameOrigin } from "@/lib/utils";

/* ─── Stage-specific coaching instructions ───────────────────────────────── */
const STAGE_INSTRUCTIONS: Record<string, string> = {
  "job-search": `COACHING MODE: Job search, resume strategy, interview preparation, offer negotiation.

- Be tactical and specific — never give advice without showing exactly how
- For interview practice: ask one question at a time, then score the answer and give structured feedback before moving on
- For resume bullets: always offer to rewrite — ask for the raw text if not provided
- End every response with a question, a next action, or a prompt to keep momentum
- Short messages (2-4 paragraphs) unless a full breakdown is explicitly requested`,

  "promotion": `COACHING MODE: Internal promotion, leveling up, building a case for advancement.

- Always ask for evidence: what level, what company, what did they own, what shipped because of it
- Help quantify impact and map it to the company's next-level criteria
- A strong promotion case has three things: (1) the work done, (2) the business outcome, (3) why it's above their current level
- Prepare them for calibration conversations and manager pushback
- Be direct about gaps — they need to know what's missing`,

  "salary": `COACHING MODE: Salary negotiation, counter-offers, raise requests.

- Always give specific numbers, exact scripts, and language they can use word for word
- Reference real benchmarking methodology: Levels.fyi, LinkedIn Salary, Glassdoor, comp bands
- For negotiation practice: roleplay as the hiring manager or their manager with realistic pushback
- Never let them under-negotiate — push them to counter at least once
- If they accept too quickly, call it out`,

  "career-change": `COACHING MODE: Career pivots, industry transitions, repositioning experience.

- Help reframe their background as an asset — not a liability — for the target role
- Give specific narrative language and reframes, not vague "work on your story" direction
- Work on "Why are you switching?" until they own it confidently without hedging
- Be realistic about what transfers well vs. what needs to be built from scratch`,

  "leadership": `COACHING MODE: Executive presence, leadership development, board-level communication.

- Operate as a peer-level advisor, not a tutor
- Focus on narrative, influence, and business judgment over tactics
- For leadership story practice: one question at a time, structured coaching feedback
- Help them communicate at the level above where they currently are`,
};

type HistoryTurn = { role: string; text: string };

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  /* ── API key check ── */
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      message: "Zari isn't fully configured yet — add OPENAI_API_KEY to enable live AI coaching.",
      aiEnabled: false,
    });
  }

  /* ── Auth ── */
  const userId = await getCurrentUserId();

  /* ── Parse body ── */
  const body = await request.json().catch(() => ({})) as {
    message?: string;
    stage?: string;
    history?: HistoryTurn[];
    sessionId?: string;
  };

  const message   = (body.message ?? "").toString().trim();
  const stage     = (body.stage ?? "job-search").toString();
  const history   = Array.isArray(body.history) ? body.history : [];
  const sessionId = body.sessionId ?? null;

  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  /* ── Build user context (only if authenticated) ── */
  let userContext = "";
  if (userId) {
    try {
      userContext = await buildUserContext(userId);
    } catch {
      // non-fatal — continue without context
    }
  }

  /* ── Compose system prompt ── */
  const contextBlock = userContext
    ? `Here is everything you know about this user. Use it to personalise every response — reference their name, current role, target role, past work, and open action items when relevant.\n\n${userContext}`
    : `You don't have this user's profile yet. Early in the conversation, ask for their name, current role, and what they're working toward.`;

  const stageInstructions = STAGE_INSTRUCTIONS[stage] ?? STAGE_INSTRUCTIONS["job-search"];

  const systemPrompt = `You are Zari, an expert AI career coach. You are warm, direct, and deeply specific — you never give generic advice.

${contextBlock}

${stageInstructions}

Formatting rules:
- Write like a smart, direct advisor — not a chatbot
- No filler phrases ("Great question!", "Absolutely!", "Of course!")
- No bullet lists unless doing a structured analysis or rewrite
- Keep it concise unless a detailed breakdown is asked for`;

  /* ── Build messages array ── */
  const messages: OAIMessage[] = [{ role: "system", content: systemPrompt }];

  // Last 12 turns of current session for immediate conversation context
  for (const turn of history.slice(-12)) {
    if (turn.role === "coach") {
      messages.push({ role: "assistant", content: turn.text });
    } else if (turn.role === "user") {
      messages.push({ role: "user", content: turn.text });
    }
  }
  messages.push({ role: "user", content: message });

  /* ── Call OpenAI ── */
  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.7,
    maxTokens: 700,
  });

  const responseText = reply ?? "I'm having trouble connecting right now — try again in a moment.";

  /* ── Persist to session transcript ── */
  if (userId && sessionId) {
    try {
      await appendSessionEvent(userId, sessionId, { role: "user",  message });
      await appendSessionEvent(userId, sessionId, { role: "coach", message: responseText });
    } catch {
      // non-fatal — don't fail the response if persistence fails
    }
  }

  return NextResponse.json({
    message:   responseText,
    aiEnabled: !!reply,
  });
}
