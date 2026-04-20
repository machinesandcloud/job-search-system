import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat, type OAIMessage } from "@/lib/openai";
import { appendSessionEvent } from "@/lib/mvp/store";
import { ensureSameOrigin } from "@/lib/utils";

type HistoryTurn = { role: string; text: string };
type ResumeCtx = {
  fileName?: string; score?: number; ats?: number; impact?: number; clarity?: number;
  keyIssues?: string[]; excerpt?: string;
};
type SectionContext = { resume?: ResumeCtx };

/* ─── Build document context block ──────────────────────────────────────── */
function buildDocumentBlock(
  ctx: SectionContext | null,
  uploadedContent?: string,
  uploadedFileName?: string,
): string {
  const parts: string[] = [];

  if (ctx?.resume) {
    const r = ctx.resume;
    const scores = [
      r.score   != null ? `Overall ${r.score}/100` : null,
      r.ats     != null ? `ATS ${r.ats}%`          : null,
      r.impact  != null ? `Impact ${r.impact}%`    : null,
      r.clarity != null ? `Clarity ${r.clarity}%`  : null,
    ].filter(Boolean).join(" · ");
    const issues = (r.keyIssues ?? []).slice(0, 6);
    parts.push(
      `RESUME ON FILE: ${r.fileName ?? "resume"}` +
      (scores ? `\nScores: ${scores}` : "") +
      (issues.length ? `\nBullets flagged:\n${issues.map(b => `  • ${b}`).join("\n")}` : "") +
      (r.excerpt ? `\nContent excerpt:\n${r.excerpt}` : ""),
    );
  }

  if (uploadedContent && uploadedFileName) {
    const n = uploadedFileName.toLowerCase();
    const label = n.includes("cover") ? "COVER LETTER"
      : n.includes("linkedin")        ? "LINKEDIN PROFILE"
      :                                  "DOCUMENT";
    parts.push(`${label} JUST UPLOADED — ${uploadedFileName}:\n\n${uploadedContent.slice(0, 3000)}`);
  }

  return parts.length
    ? `\n\n---\nDOCUMENTS IN CONTEXT:\n\n${parts.join("\n\n")}\n---`
    : "";
}

/* ─── Opening prompt by stage ────────────────────────────────────────────── */
const OPENING_PROMPT: Record<string, string> = {
  "job-search":    "Open the session naturally — no intro, no 'I'm Zari', no fluff. Ask one direct question to get a real picture of where they are in their job search right now. Make it feel like you're picking up a conversation, not starting a form. 1-2 sentences max.",
  "promotion":     "Open the session naturally. Ask one direct question to get into the promotion situation — what they're going for, where they're stuck, what's been the hold-up. No intro. 1-2 sentences.",
  "salary":        "Open the session. Get straight to it — ask what number is on the table and where they're trying to land. No intro. 1-2 sentences.",
  "career-change": "Open the session. Ask one focused question about the move they're trying to make — what they're moving toward and what's making it hard to explain or land so far. No intro. 1-2 sentences.",
  "leadership":    "Open the session. Ask what the most pressing thing on their plate is right now — the thing keeping them up. No intro. 1-2 sentences.",
};

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      message: "I'm not fully set up yet — add OPENAI_API_KEY to get started.",
      aiEnabled: false,
    });
  }

  const userId = await getCurrentUserId();

  const body = await request.json().catch(() => ({})) as {
    message?:          string;
    stage?:            string;
    history?:          HistoryTurn[];
    sessionId?:        string;
    sectionContext?:   SectionContext;
    uploadedContent?:  string;
    uploadedFileName?: string;
    isOpening?:        boolean;
  };

  const message          = (body.message ?? "").toString().trim();
  const stage            = (body.stage ?? "job-search").toString();
  const history          = Array.isArray(body.history) ? body.history : [];
  const sessionId        = body.sessionId ?? null;
  const sectionContext   = body.sectionContext ?? null;
  const uploadedContent  = body.uploadedContent;
  const uploadedFileName = body.uploadedFileName;
  const isOpening        = body.isOpening ?? false;

  if (!message && !isOpening) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  /* ── Profile context (DB, authenticated users) ── */
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const profileBlock = userContext
    ? `User profile:\n${userContext}`
    : "";

  const documentBlock = buildDocumentBlock(sectionContext, uploadedContent, uploadedFileName);
  const hasDocuments  = documentBlock.trim().length > 0;

  /* ── System prompt ── */
  const systemPrompt = `You are Zari — a career coach. Sharp, direct, warm. You've helped hundreds of people land better jobs, negotiate real comp, get promoted, make pivots that actually worked. You know the game and you're genuinely invested in helping people win it.

${profileBlock}${documentBlock}

YOUR VOICE AND STYLE:
You tell people the truth — not the version that makes them feel good, the version that actually moves them forward. Sometimes that stings. That's fine. You're not here to validate people, you're here to help them get results. A real friend with expertise doesn't sugarcoat; they tell you what you need to hear.

If someone's LinkedIn is weak, you say it's weak. If their resume reads like a job description, you say that. If they're underselling themselves, overpricing themselves, or blaming the market for something in their control — you call it. Directly. Not harshly, but clearly. "I'll be honest with you..." or "I can promise you, if I saw this profile I'd scroll right past it — and here's why." That's the level of candor you bring.

You check in naturally — "right?" mid-sentence, "does that make sense?" after landing something important. You redirect tangents smoothly: "before I cut you off — " or "let me stop you there, because here's what actually matters."

You ask ONE question at a time. Listen first, advise second. When someone's venting, acknowledge it briefly — bias is real, the market is tough, some situations are genuinely unfair — then pivot fast to what they can control. "I hear you. Now let's talk about what you can actually do about it."

You're specific. Numbers. Exact language. Scripts they can use word-for-word. "Here's how I'd say it:" followed by an actual example. Concrete analogies when they help a point land.

Casual but direct. Contractions. Short punchy sentences. No corporate softening. You say what you mean.

MIRROR THEIR STYLE:
Read how they write and match it — not mimic it, reflect it. If they're texting in short fragments, keep your responses tight. If they write in full sentences, you can open up more. If they use industry jargon or slang, use it back. If they're casual and loose, be loose. If they're formal, dial up slightly. Match their energy and pace while keeping your voice and directness. The goal is that talking to you feels natural to them — not like talking to a bot that picked one register and stayed there.

DOCUMENT RULES — NON-NEGOTIABLE:
${hasDocuments
  ? "You have documents in context above. Reference them specifically — quote them, critique them, rewrite actual sections. Be specific, not generic. Don't say 'your resume looks good overall' — point to what's weak, what's missing, what to fix."
  : `You do NOT have any documents. Do NOT invent, guess at, or fabricate resume bullets, job history, or any content. If they ask about their resume, tell them straight: you don't have it yet — drop it here using the attach button below, or go to {{GO:resume}} for a full scored analysis. Keep it casual, not robotic.`
}

WHEN SOMEONE WANTS TO APPLY FOR A JOB:
Ask if they have the job description and their resume on hand. If they share them, also send them to {{GO:resume}} for a full match score — then use both docs to guide them here.

NAVIGATION MARKERS:
Embed {{GO:resume}}, {{GO:linkedin}}, {{GO:cover-letter}}, or {{GO:interview}} when it makes natural sense to send someone to a specific tool. They render as clickable buttons. Use them when it adds value — not to fill space.

SCOPE:
Career. If they go off-topic, be human: "sounds like a lot going on — what's the career thing you want to move on today?" Bring it back naturally. No lectures, no refusals, just a smooth redirect.

FORMAT:
Short. 1–3 paragraphs max unless they ask for something structured. No bullet lists in regular conversation. End with a question or a clear next step. Write like a person, not a report.`;

  /* ── Build OpenAI messages ── */
  const messages: OAIMessage[] = [{ role: "system", content: systemPrompt }];

  for (const turn of history.slice(-14)) {
    if (turn.role === "coach") messages.push({ role: "assistant", content: turn.text });
    else if (turn.role === "user") messages.push({ role: "user",      content: turn.text });
  }

  if (isOpening) {
    messages.push({ role: "user", content: OPENING_PROMPT[stage] ?? OPENING_PROMPT["job-search"] });
  } else {
    messages.push({ role: "user", content: message });
  }

  /* ── Call OpenAI ── */
  const reply = await openaiChat(messages, {
    model:       process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.75,
    maxTokens:   600,
  });

  const responseText = reply ?? "Having trouble connecting right now — try again in a moment.";

  /* ── Persist to session (authenticated users only) ── */
  if (userId && sessionId && !isOpening) {
    try {
      await appendSessionEvent(userId, sessionId, { role: "user",  message });
      await appendSessionEvent(userId, sessionId, { role: "coach", message: responseText });
    } catch { /* non-fatal */ }
  }

  return NextResponse.json({ message: responseText, aiEnabled: !!reply });
}
