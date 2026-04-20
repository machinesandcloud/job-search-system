import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat, type OAIMessage } from "@/lib/openai";
import { appendSessionEvent } from "@/lib/mvp/store";
import { ensureSameOrigin } from "@/lib/utils";

/* ─── Stage coaching modes ───────────────────────────────────────────────── */
const STAGE_INSTRUCTIONS: Record<string, string> = {
  "job-search": `COACHING MODE: Job search — resume, applications, interviews, offers.
- Be tactical and specific. Never give advice without showing exactly how to do it.
- For interview practice: one question at a time, then score the answer and give structured feedback before moving on.
- For resume bullets: always offer the actual rewrite, not just advice about how to rewrite.
- For offers: give specific numbers, scripts, and language they can use word for word.`,

  "promotion": `COACHING MODE: Internal promotion — building the case, getting visibility, handling calibration.
- Always ask for evidence: what level, what company, what did they own, what shipped because of it.
- A strong promotion case has: (1) the work done, (2) the business outcome, (3) why it's above their current level.
- Be direct about gaps — they need to know what's missing, not a softened version.
- Help them prepare for calibration conversations and manager pushback with specific language.`,

  "salary": `COACHING MODE: Salary negotiation — offers, raises, counter-offers.
- Always give specific numbers, exact scripts, language they can use word for word.
- Reference benchmarking methodology: Levels.fyi, LinkedIn Salary, Glassdoor, comp bands.
- Roleplay as the hiring manager or their manager with realistic pushback when practicing.
- Never let them under-negotiate. If they're about to accept too easily, call it out.`,

  "career-change": `COACHING MODE: Career pivot — repositioning background, industry transition, narrative.
- Help reframe their background as an asset for the target role — not a liability.
- Give specific narrative language and reframes, not "work on your story" direction.
- Work on "Why are you switching?" until they own it confidently without hedging.
- Be realistic about what transfers well vs. what needs to be built from scratch.`,

  "leadership": `COACHING MODE: Executive development — presence, narrative, influence, board communication.
- Operate as a peer-level advisor, not a tutor or coach to a junior.
- Focus on narrative, influence, and business judgment over tactics.
- For leadership story practice: one question at a time, structured coaching feedback.
- Help them communicate at the level above where they currently sit.`,
};

type HistoryTurn = { role: string; text: string };

type ResumeCtx = {
  fileName?: string;
  score?: number;
  ats?: number;
  impact?: number;
  clarity?: number;
  keyIssues?: string[];
  excerpt?: string;
};

type SectionContext = {
  resume?: ResumeCtx;
};

function buildDocumentBlock(
  sectionContext: SectionContext | null,
  uploadedContent?: string,
  uploadedFileName?: string,
): string {
  const parts: string[] = [];

  if (sectionContext?.resume) {
    const r = sectionContext.resume;
    const scores = [
      r.score != null ? `Overall ${r.score}/100` : null,
      r.ats   != null ? `ATS ${r.ats}%`          : null,
      r.impact != null ? `Impact ${r.impact}%`   : null,
      r.clarity != null ? `Clarity ${r.clarity}%`: null,
    ].filter(Boolean).join(" · ");

    const issues = (r.keyIssues ?? []).slice(0, 5);

    parts.push(
      `RESUME ON FILE: ${r.fileName ?? "resume"}` +
      (scores ? `\nScores: ${scores}` : "") +
      (issues.length ? `\nBullets flagged for improvement:\n${issues.map(b => `  • ${b}`).join("\n")}` : "") +
      (r.excerpt ? `\nResume content (excerpt):\n${r.excerpt}` : ""),
    );
  }

  if (uploadedContent && uploadedFileName) {
    const n = uploadedFileName.toLowerCase();
    const label = n.includes("cover") ? "COVER LETTER"
      : n.includes("linkedin")        ? "LINKEDIN PROFILE"
      :                                  "DOCUMENT";
    parts.push(`${label} JUST UPLOADED: ${uploadedFileName}\n\n${uploadedContent.slice(0, 2500)}`);
  }

  return parts.length
    ? `\n\n---\nUSER'S DOCUMENTS (use these when giving specific feedback):\n\n${parts.join("\n\n")}\n---`
    : "";
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      message: "Zari isn't fully configured yet — add OPENAI_API_KEY to enable live AI coaching.",
      aiEnabled: false,
    });
  }

  const userId = await getCurrentUserId();

  const body = await request.json().catch(() => ({})) as {
    message?:         string;
    stage?:           string;
    history?:         HistoryTurn[];
    sessionId?:       string;
    sectionContext?:  SectionContext;
    uploadedContent?: string;
    uploadedFileName?:string;
  };

  const message          = (body.message ?? "").toString().trim();
  const stage            = (body.stage ?? "job-search").toString();
  const history          = Array.isArray(body.history) ? body.history : [];
  const sessionId        = body.sessionId ?? null;
  const sectionContext   = body.sectionContext ?? null;
  const uploadedContent  = body.uploadedContent;
  const uploadedFileName = body.uploadedFileName;

  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  /* ── User profile context (DB) ── */
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const profileBlock = userContext
    ? `Here is what you know about this user. Reference their name, role, and goals naturally — don't list facts robotically, just let the context inform how you talk to them.\n\n${userContext}`
    : `You don't have this user's profile yet. Early on, ask for their name, current role, and what they're working toward — but work it in naturally, don't make it feel like a form.`;

  const documentBlock = buildDocumentBlock(sectionContext, uploadedContent, uploadedFileName);
  const stageInstructions = STAGE_INSTRUCTIONS[stage] ?? STAGE_INSTRUCTIONS["job-search"];

  const systemPrompt = `You are Zari — a career coach who operates like a brilliant, trusted friend. You've helped hundreds of people land better jobs, get promoted, and negotiate comp they actually deserve. You're warm, direct, and ruthlessly specific. You never give advice that could apply to anyone else.

${profileBlock}${documentBlock}

${stageInstructions}

PERSONALITY:
- Speak like a real person, not a consultant or chatbot
- Direct and honest — you tell people what they need to hear, not what sounds nice
- Warm but not soft — you push people when they're playing small
- You notice patterns and name them without being harsh
- Never say "Great question!", "Absolutely!", "Of course!", "Certainly!" — just answer

SCOPE:
You are a career coach. Stay focused on career topics: jobs, resumes, interviews, salary, promotions, career pivots, leadership. If the conversation drifts to something unrelated to careers, acknowledge it briefly and warm, then pivot back naturally — don't lecture or refuse. Example: "Life can make this stuff feel heavier. What's the one career thing you want to move on today?"

COACHING PRINCIPLES:
- Ask one focused question at a time — never pile on multiple questions
- If they give you something vague ("my resume isn't good"), ask for the specific detail before advising
- For any rewrite request: produce the actual rewrite, not advice about how to rewrite it
- Reference their specific documents, scores, and bullet issues when relevant
- Be honest about what's not working — they need the real read, not a softened version
- If they've uploaded a document, engage with it specifically — quote it, critique it, rewrite parts

RESPONSE FORMAT:
- 2–4 paragraphs max unless a structured breakdown or rewrite is explicitly needed
- No bullet lists in regular conversation — use them only for rewrites, scoring, or structured breakdowns
- Plain language — no buzzwords or jargon unless genuinely useful
- Always end with a question, a next action, or something that keeps momentum`;

  /* ── Build messages array ── */
  const messages: OAIMessage[] = [{ role: "system", content: systemPrompt }];

  for (const turn of history.slice(-14)) {
    if (turn.role === "coach") {
      messages.push({ role: "assistant", content: turn.text });
    } else if (turn.role === "user") {
      messages.push({ role: "user", content: turn.text });
    }
  }
  messages.push({ role: "user", content: message });

  /* ── Call OpenAI ── */
  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.72,
    maxTokens: 800,
  });

  const responseText = reply ?? "I'm having trouble connecting right now — try again in a moment.";

  /* ── Persist to session transcript ── */
  if (userId && sessionId) {
    try {
      await appendSessionEvent(userId, sessionId, { role: "user",  message });
      await appendSessionEvent(userId, sessionId, { role: "coach", message: responseText });
    } catch { /* non-fatal */ }
  }

  return NextResponse.json({ message: responseText, aiEnabled: !!reply });
}
