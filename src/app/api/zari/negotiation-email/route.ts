import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

function buildFallback(role: string, target: string) {
  return {
    subject: `Compensation Discussion — ${role}`,
    sendTips: [
      { tip: "Replace [Name] with the actual recipient's name", timing: "Before sending", why: "First-name personalization signals you're deliberate, not copy-pasting a template — it sets the tone for the negotiation." },
      { tip: `Send within 24-48 hours of receiving the offer on ${role}`, timing: "Immediately after receiving the offer", why: "Delay signals uncertainty or disengagement. A fast, confident response sets a professional tone and maintains momentum." },
      { tip: "Have your market data ready before they reply", timing: "While you wait for their response", why: "If they ask why that number, cite Levels.fyi, Glassdoor, or LinkedIn Salary for this exact role — specifics neutralize pushback." },
    ],
    email: `Hi [Name],

Thank you for the offer — I'm genuinely excited about the role and the team.

After reviewing the full package and benchmarking against current market rates for ${role} positions, I'd like to discuss the base compensation. Based on my experience and the scope of the role, I was expecting something closer to ${target || "[target figure]"}.

I'm confident this is a role where I'll add significant value quickly, and I'd like to find a number that reflects that. Is there flexibility to discuss the base?

Happy to connect at your convenience — looking forward to making this work.

Best,
[Your name]`,
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    role?: string; company?: string; currentComp?: string; targetComp?: string;
    reason?: string; competingOffer?: string; tone?: string; emailType?: string;
  };

  const role = (body.role ?? "").trim();
  if (!role) return NextResponse.json({ error: "Provide the role you are negotiating for" }, { status: 400 });

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) { try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ } }

  const toneMap: Record<string, string> = {
    professional: "professional and polished — respectful, clear, no fluff",
    confident: "confident and direct — no hedging, clear about the target",
    collaborative: "warm and collaborative — frame it as finding a mutual fit",
  };
  const toneDesc = toneMap[body.tone ?? "professional"] ?? toneMap.professional;
  const emailTypeDesc = body.emailType === "raise" ? "a salary raise request email to their current employer" :
    body.emailType === "counter" ? "a counter-offer email responding to an initial offer" :
    "a salary negotiation email";

  const systemPrompt = `You are Zari, an expert career coach. Write ${emailTypeDesc} for the user.

${userContext ? `Profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "subject": "<email subject line>",
  "email": "<the full email body, ready to send or lightly edit>",
  "sendTips": [
    { "tip": "<the actionable advice>", "timing": "<when exactly to do this — before, during, or after sending>", "why": "<why this matters for their specific situation>" }
  ]
}

Rules:
- Tone: ${toneDesc}
- Do NOT use generic filler phrases like "I hope this email finds you well"
- Open with the most important thing: the ask or the context
- Keep it under 200 words — brevity signals confidence
- Make it specific to their situation — no placeholders except [Name] for the recipient
- The email should be professional enough to send as-is with minor edits
- End with a clear, low-friction call to action
- sendTips: 3 specific tips for THIS person — each with tip (what to do), timing (when), and why (why it matters for their situation). Reference their role, company, leverage, and timing specifically.`;

  const userPrompt = [
    `ROLE: ${role}`,
    body.company ? `COMPANY: ${body.company}` : "",
    body.currentComp ? `CURRENT COMP: ${body.currentComp}` : "",
    body.targetComp ? `TARGET COMP: ${body.targetComp}` : "",
    body.competingOffer ? `COMPETING OFFER: ${body.competingOffer}` : "",
    body.reason ? `KEY REASONS / VALUE I BRING:\n${body.reason.slice(0, 1500)}` : "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt || "Write the negotiation email." },
    ],
    { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.35, maxTokens: 700, jsonMode: true }
  );

  const fallback = buildFallback(role, body.targetComp ?? "");
  if (!reply) return NextResponse.json(fallback);

  try {
    const p = JSON.parse(reply) as Record<string, unknown>;
    const subject = typeof p.subject === "string" ? p.subject.trim() : "";
    const email = typeof p.email === "string" ? p.email.trim() : "";
    const sendTips = (() => {
      if (!Array.isArray(p.sendTips)) return [];
      return (p.sendTips as unknown[]).map(i => {
        if (!i || typeof i !== "object") return null;
        const r = i as Record<string, unknown>;
        const tip = typeof r.tip === "string" ? r.tip.trim() : "";
        const timing = typeof r.timing === "string" ? r.timing.trim() : "";
        const why = typeof r.why === "string" ? r.why.trim() : "";
        return tip ? { tip, timing, why } : null;
      }).filter(Boolean).slice(0, 4);
    })() as { tip: string; timing: string; why: string }[];
    return NextResponse.json({
      subject: subject || fallback.subject,
      email: email || fallback.email,
      sendTips: sendTips.length ? sendTips : fallback.sendTips,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
