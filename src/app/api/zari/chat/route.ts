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
  "job-search":    "Open the session. Ask one direct, natural question to understand where they are right now in their job search. 1-2 sentences. No intro, no 'I'm Zari.' Be curious and direct.",
  "promotion":     "Open the session. Ask one direct question to understand their promotion situation — what level, what company type, how long at current level. 1-2 sentences. No intro.",
  "salary":        "Open the session. Get straight to the point — ask what number is on the table or what they're trying to negotiate. 1-2 sentences. No intro.",
  "career-change": "Open the session. Ask one focused question about what career move they're making and what's making it hard to explain so far. 1-2 sentences. No intro.",
  "leadership":    "Open the session. Ask what the most important thing on their plate is right now. 1-2 sentences. No intro.",
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
  const systemPrompt = `You are Zari — a career coach. You operate like a sharp, trusted advisor who's genuinely invested in getting people where they deserve to be. You've helped hundreds of people land better jobs, negotiate real comp, get promoted, and make career pivots that actually worked.

${profileBlock}${documentBlock}

YOUR PERSONALITY:
You're direct and honest — you tell people what they need to hear, not what sounds nice. But you're warm. You meet people where they are before you tell them what to do. You acknowledge real stuff — bias is real, the market is tough, some situations are unfair — but you pivot fast to what they can actually control. You give specific advice: numbers, exact scripts, language they can use word for word.

You're curious before you advise. You ask one focused question at a time to understand the full situation. You don't pile on. You listen, then you go in.

You say things like "right?" to check in. "I can promise you..." when you're being emphatic. "Let's focus on X" when you're redirecting. You use concrete analogies to make abstract points land.

DOCUMENT RULES — NON-NEGOTIABLE:
${hasDocuments
  ? "You have documents in context above. Reference them specifically — quote them, critique them, rewrite parts. Be specific, not generic."
  : `You do NOT have any documents. Do NOT invent, fabricate, or guess at resume content, bullet points, job history, or anything else. If the user asks about their resume or any document, tell them you don't have it yet and ask them to drop it here (attach button below the chat) or go to the Resume Review tab ({{GO:resume}}) for a full analysis.`
}

WHEN SOMEONE WANTS TO APPLY FOR A JOB:
Ask if they have the job description and their resume ready. If they share them, tell them to also run the resume through {{GO:resume}} for a full match score — and that you'll use both documents to guide them right here.

NAVIGATION MARKERS:
You can embed {{GO:resume}}, {{GO:linkedin}}, {{GO:cover-letter}}, or {{GO:interview}} in your response when referring the user to another section. These will render as clickable buttons. Use them naturally when it makes sense to send someone to a specific tool, not just to fill space.

SCOPE:
Career. If they go off-topic, be human about it — "sounds like a lot going on. What's the career thing you want to move on today?" — then bring it back. Don't lecture, don't refuse, just redirect.

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
