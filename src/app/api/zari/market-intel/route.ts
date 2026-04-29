import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

function buildFallback(role: string) {
  return {
    marketVerdict: "Unclear",
    verdictNote: "Not enough data to benchmark accurately — add more context for a sharper read.",
    rangeFloor: "N/A",
    rangeMedian: "N/A",
    rangeCeiling: "N/A",
    keyFactors: [
      "Location significantly affects compensation — remote roles often benchmark differently than in-person.",
      "Company stage (startup vs. enterprise) creates wide variance in base vs. equity splits.",
      "Scope and team size are frequently the biggest levers at senior levels.",
    ],
    talkingPoints: [
      `Research shows ${role} roles have significant compensation variance depending on company size and funding stage.`,
      "If you have a competing offer, that is your strongest leverage point — use it transparently.",
      "Ask about the full package: equity refresh schedule, bonus structure, and review frequency matter.",
    ],
    askStrategy: "Start at the top of your target range. Anchoring high is almost always the right move — you can always come down, but you can't go up.",
    redFlags: [
      "Offers with no equity for senior roles at funded companies.",
      "Vague answers about band or 'we don't have room to move' before any discussion.",
    ],
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    role?: string; industry?: string; location?: string;
    experience?: string; currentComp?: string; companySize?: string;
  };

  const role = (body.role ?? "").trim();
  if (!role) return NextResponse.json({ error: "Provide the role to benchmark" }, { status: 400 });

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) { try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ } }

  const systemPrompt = `You are Zari, a compensation expert. Give this person a sharp, specific market intelligence briefing for their salary negotiation.

${userContext ? `Profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "marketVerdict": "<Above market | At market | Below market | Unclear>",
  "verdictNote": "<1 sentence on their current position relative to market>",
  "rangeFloor": "<low end of market range for this role, e.g. '$95K' or 'N/A'>",
  "rangeMedian": "<median market rate, e.g. '$115K' or 'N/A'>",
  "rangeCeiling": "<high end, e.g. '$145K' or 'N/A'>",
  "keyFactors": ["<factor that affects comp for this role>", "<factor>", "<factor>"],
  "talkingPoints": ["<specific talking point for negotiation>", "<point>", "<point>", "<point>"],
  "askStrategy": "<1-2 sentences on how to position the ask given their market position>",
  "redFlags": ["<warning sign to watch for>", "<warning sign>"]
}

Rules:
- Be honest. If you can't give precise salary figures, use realistic ranges or explain why.
- Talking points must be actionable and specific — not generic advice.
- askStrategy should tell them what angle to take given their specific situation.
- keyFactors should explain what drives comp variance for this exact role/level.
- Be concise — this is a briefing, not an essay.`;

  const userPrompt = [
    `ROLE: ${role}`,
    body.industry ? `INDUSTRY: ${body.industry}` : "",
    body.location ? `LOCATION: ${body.location}` : "",
    body.experience ? `YEARS OF EXPERIENCE: ${body.experience}` : "",
    body.companySize ? `COMPANY SIZE/STAGE: ${body.companySize}` : "",
    body.currentComp ? `CURRENT COMP: ${body.currentComp}` : "",
  ].filter(Boolean).join("\n");

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt || "Give me a salary market intel briefing." },
    ],
    { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.22, maxTokens: 800, jsonMode: true }
  );

  const fallback = buildFallback(role);
  if (!reply) return NextResponse.json(fallback);

  try {
    const p = JSON.parse(reply) as Record<string, unknown>;
    const str = (k: string) => typeof p[k] === "string" ? (p[k] as string).trim() : "";
    const list = (k: string, max: number) => Array.isArray(p[k]) ? (p[k] as unknown[]).map(v => typeof v === "string" ? v.trim() : "").filter(Boolean).slice(0, max) : [];
    return NextResponse.json({
      marketVerdict: str("marketVerdict") || fallback.marketVerdict,
      verdictNote: str("verdictNote") || fallback.verdictNote,
      rangeFloor: str("rangeFloor") || fallback.rangeFloor,
      rangeMedian: str("rangeMedian") || fallback.rangeMedian,
      rangeCeiling: str("rangeCeiling") || fallback.rangeCeiling,
      keyFactors: list("keyFactors", 4).length ? list("keyFactors", 4) : fallback.keyFactors,
      talkingPoints: list("talkingPoints", 5).length ? list("talkingPoints", 5) : fallback.talkingPoints,
      askStrategy: str("askStrategy") || fallback.askStrategy,
      redFlags: list("redFlags", 3).length ? list("redFlags", 3) : fallback.redFlags,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
