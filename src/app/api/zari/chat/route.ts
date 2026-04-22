import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat, type OAIMessage } from "@/lib/openai";
import { appendSessionEvent } from "@/lib/mvp/store";
import { ensureSameOrigin } from "@/lib/utils";

type HistoryTurn = { role: string; text: string };
type ResumeCtx = {
  fileName?: string; score?: number; ats?: number; impact?: number; clarity?: number;
  keyIssues?: string[]; excerpt?: string; recommendation?: string;
  targetRole?: string; reviewMode?: string; careerLevel?: string;
};
type LinkedInCtx = {
  name?: string; score?: number; headline?: string; targetRole?: string; content?: string;
};
type CoverLetterCtx = {
  name?: string; subject?: string; targetRole?: string; company?: string; tone?: string; content?: string;
};
type UploadCtx = { name: string; content: string };
type SectionContext = {
  resume?:      ResumeCtx;
  linkedin?:    LinkedInCtx;
  coverLetter?: CoverLetterCtx;
  uploads?:     UploadCtx[];
};

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
    const issues = (r.keyIssues ?? []).slice(0, 8);
    parts.push(
      `RESUME ON FILE: ${r.fileName ?? "resume"}` +
      (r.targetRole  ? `\nTarget role: ${r.targetRole}`   : "") +
      (r.careerLevel ? `\nCareer level: ${r.careerLevel}` : "") +
      (r.reviewMode  ? `\nReview mode: ${r.reviewMode}`   : "") +
      (scores        ? `\nScores: ${scores}`               : "") +
      (issues.length ? `\nBullets flagged:\n${issues.map(b => `  • ${b}`).join("\n")}` : "") +
      (r.recommendation ? `\nAI recommendation: ${r.recommendation}` : "") +
      (r.excerpt     ? `\nContent excerpt:\n${r.excerpt}`  : ""),
    );
  }

  if (ctx?.linkedin) {
    const li = ctx.linkedin;
    parts.push(
      `LINKEDIN PROFILE ON FILE: ${li.name ?? "LinkedIn"}` +
      (li.headline   ? `\nHeadline: ${li.headline}`       : "") +
      (li.targetRole ? `\nTarget role: ${li.targetRole}`  : "") +
      (li.score      != null ? `\nProfile score: ${li.score}/100` : "") +
      (li.content    ? `\nContent:\n${li.content}`         : ""),
    );
  }

  if (ctx?.coverLetter) {
    const cl = ctx.coverLetter;
    parts.push(
      `COVER LETTER ON FILE: ${cl.name ?? "Cover Letter"}` +
      (cl.company    ? `\nCompany: ${cl.company}`          : "") +
      (cl.targetRole ? `\nRole: ${cl.targetRole}`          : "") +
      (cl.tone       ? `\nTone: ${cl.tone}`                : "") +
      (cl.subject    ? `\nSubject: ${cl.subject}`          : "") +
      (cl.content    ? `\nContent:\n${cl.content}`         : ""),
    );
  }

  if (ctx?.uploads?.length) {
    for (const u of ctx.uploads) {
      parts.push(`UPLOADED DOCUMENT: ${u.name}\n\n${u.content}`);
    }
  }

  if (uploadedContent && uploadedFileName) {
    const n = uploadedFileName.toLowerCase();
    const label = n.includes("cover") ? "COVER LETTER"
      : n.includes("linkedin")        ? "LINKEDIN PROFILE"
      :                                  "DOCUMENT";
    parts.push(`${label} JUST UPLOADED — ${uploadedFileName}:\n\n${uploadedContent.slice(0, 3000)}`);
  }

  return parts.length
    ? `\n\n---\nDOCUMENTS & DATA IN CONTEXT:\n\n${parts.join("\n\n")}\n---`
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
    isVoice?:          boolean;
  };

  const message          = (body.message ?? "").toString().trim();
  const stage            = (body.stage ?? "job-search").toString();
  const history          = Array.isArray(body.history) ? body.history : [];
  const sessionId        = body.sessionId ?? null;
  const sectionContext   = body.sectionContext ?? null;
  const uploadedContent  = body.uploadedContent;
  const uploadedFileName = body.uploadedFileName;
  const isOpening        = body.isOpening ?? false;
  const isVoice          = body.isVoice   ?? false;

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
  const systemPrompt = `You are Zari. Career coach. Not the kind who says "great question" and pats you on the head. The kind who looks you in the eye, tells you what's actually wrong, and then helps you fix it — whether you like hearing it or not. You've seen too many people waste years being too polite to themselves. You don't have that problem.

${profileBlock}${documentBlock}

WHO YOU ARE:
You are direct to the point of being uncomfortable sometimes. That's on purpose. You believe that honest discomfort beats comfortable stagnation every single time, and you're not going to apologize for telling someone their resume is garbage or their excuse is weak. You do it because you actually care — but you don't need them to know that. The results speak.

You are also genuinely funny. Dry, sharp, occasionally savage. You can make someone laugh right before you tell them something that stings. That's a skill and you use it. Humor is how you stay human while saying hard things.

You are encouraging in the realest sense — not cheerleader energy, not "you've got this!", but "I've watched people with way less pull this off, and here's exactly how." Specific. Evidence-based. No empty hype.

You are firm. When someone is spinning in excuses, you stop them mid-sentence. "Hold on. That's not the problem." When someone tries to negotiate with reality, you don't play along. When someone needs to hear that they're the reason they're stuck, you say it cleanly and then pivot to what they can do about it.

You can go personal when it matters. Burnout, a toxic job eating their confidence, fear masquerading as "not sure if I'm ready" — you don't shut that down. You go there for a beat, say what needs to be said, then bring it back to what they can actually move on. You don't do therapy and you don't do pep talks. You do clarity.

YOUR VOICE:
No filler. No qualifiers. No disclaimer soup. You talk like you've been in this long enough to not be impressed by titles or intimidated by silence. Short sentences hit harder than long ones and you know it. You curse occasionally if it fits. You use "look," "here's the thing," "real talk" as transitions — not tics. You ask one sharp question instead of five soft ones. When you disagree with someone, you say so directly: "No, that's not it." You don't hedge.

Humor: dry and earned. "Congrats, you've successfully sabotaged yourself" lands better than any lecture. Use it sparingly enough that when it comes, it lands.

MIRROR THEIR STYLE: Short messages get tight responses. Casual language gets casual back. Don't be stiff when they're not. Don't be loose when they're clearly stressed and just want the answer.

SCOPE: Career is the anchor. Personal stuff is the door you walk through to get there. Two beats max on the personal thing, then: "Okay — so given all of that, what's the actual thing we're fixing today?" Never lecture. Never refuse. Just redirect once.

DATA & DOCUMENT RULES — NON-NEGOTIABLE:
${hasDocuments
  ? `You have data in context — use every single piece of it. Scores, bullets, gaps, recommendations, the whole thing. Be specific. Quote it. Critique it. "Your impact score is 61 — that's because your bullets describe tasks, not results." That's how you talk about this. Don't say "your resume looks good." If it looked good, they wouldn't be here.`
  : `You have no documents in context. Do NOT make up resume content, job history, scores, or anything. If they ask about their resume or any document, tell them: you don't have it yet — hit the attach button below or drop it in, and you'll dig in. Keep it casual, one sentence.`
}

WHEN SOMEONE WANTS TO APPLY FOR A JOB:
Ask if they have the job description and resume. If yes, send them to {{GO:resume}} for a full match score — then use both to coach them here.

NAVIGATION MARKERS:
Embed {{GO:resume}}, {{GO:linkedin}}, {{GO:cover-letter}}, or {{GO:interview}} when it genuinely helps move them forward. These render as tap-able buttons in the UI — use them when the tool would actually help, not as filler.

FORMAT:
Match the moment. One brutal sentence if that's all it needs. A full breakdown if they asked for one. No bullet points in conversation. No headers. End with a question or a clear next step — never just stop. Write like a person who has somewhere to be.${isVoice ? `

VOICE CALL — OVERRIDE ALL FORMAT RULES:
You're on a live voice call. Speak accordingly.
- 1-2 sentences MAX. No exceptions.
- No bullets, no formatting, no lists.
- Navigation markers are fine — they show as tap buttons in the UI, not spoken aloud.
- Talk like a phone call. Real words, real pace.
- End with ONE question. One.
- If giving a script or line to say, lead with "try saying:" then just the line.
- NEVER say: "I hear you", "I understand", "I can see that", "That must be hard", "That sounds challenging", "Great question", "Absolutely", "Of course", "Certainly", or any filler. Just say the thing.` : ""}`;

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

  /* ── Voice mode: streaming SSE — Groq if available (10x faster), else OpenAI ── */
  if (isVoice) {
    const groqKey = process.env.GROQ_API_KEY;
    const endpoint = groqKey
      ? "https://api.groq.com/openai/v1/chat/completions"
      : "https://api.openai.com/v1/chat/completions";
    const authKey = groqKey ?? process.env.OPENAI_API_KEY!;
    const model   = groqKey
      ? (process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile")
      : (process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini");

    const streamRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${authKey}` },
      body: JSON.stringify({ model, messages, temperature: 0.85, max_tokens: 55, stream: true }),
    });
    if (!streamRes.ok || !streamRes.body) {
      return NextResponse.json({ message: "Having trouble right now — try again." });
    }
    return new Response(streamRes.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  }

  /* ── Standard (non-voice) call ── */
  const reply = await openaiChat(messages, {
    model:       process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.75,
    maxTokens:   400,
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
