import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

function cleanStr(v: unknown) { return typeof v === "string" ? v.trim() : ""; }
function mapList<T>(v: unknown, fn: (r: Record<string,unknown>) => T | null, max = 5): T[] {
  if (!Array.isArray(v)) return [];
  return v.map(i => i && typeof i === "object" ? fn(i as Record<string,unknown>) : null).filter(Boolean).slice(0, max) as T[];
}

function buildFallback(role: string) {
  return {
    marketVerdict: "Unclear",
    verdictNote: "Not enough data to benchmark accurately — add more context for a sharper read.",
    rangeFloor: "N/A",
    rangeMedian: "N/A",
    rangeCeiling: "N/A",
    keyFactors: [
      { factor: "Location & Remote Eligibility", impact: "Remote roles often benchmark against SF/NYC rates — this can shift your range 20-40% higher than local.", leverage: "Explicitly reference the remote market. Most local hiring managers forget they are competing with distributed employers." },
      { factor: "Company Stage & Funding", impact: "Series B startups and enterprise companies have completely different comp structures — base vs. equity split changes dramatically.", leverage: "Ask specifically about equity refreshes and performance multipliers, not just base. The package floor matters more than the base floor." },
      { factor: "Scope & Team Ownership", impact: "Two people with the same title can earn 30%+ apart based on how many direct reports and how much P&L they own.", leverage: "Define your scope in the first conversation. 'I currently own X and manage a team of Y' anchors you at the right level before any number is mentioned." },
    ],
    talkingPoints: [
      { title: "Market Variance by Stage", point: `Research shows ${role} roles have significant compensation variance depending on company size and funding stage.`, deploy: "Open with this to set the context before your anchor: 'Roles like this one have a wide market range — I'd love to understand how this is positioned.'" },
      { title: "Competing Signals", point: "If you have a competing offer, that is your strongest leverage point — use it transparently.", deploy: "Disclose early and factually: 'I'm currently in late stages with another company at $X — I wanted to give you the first right of refusal because this role is the one I want.'" },
      { title: "Full Package Ask", point: "Ask about the full package: equity refresh schedule, bonus structure, and review frequency matter.", deploy: "After the base is set: 'Can you walk me through the full package — equity refresh, bonus structure, and when the first review typically happens?'" },
    ],
    askStrategy: "Start at the top of your target range. Anchoring high is almost always the right move — you can always come down, but you can't go up.",
    redFlags: [
      { flag: "No equity at funded companies", signal: "Offers with no equity for senior roles at funded companies signal a below-market package or deliberate lowballing.", watch: "Ask directly: 'Is equity a part of this offer?' If they deflect or say no for a funded role, this is a red flag worth pushing on." },
      { flag: "Deflecting band questions", signal: "Vague answers about the band or 'we don't have room to move' before any discussion signals a hard ceiling or a tactic to test your reaction.", watch: "Do not accept 'this is our best offer' until you have named your number. Silence after your anchor is the most powerful next move." },
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
  "keyFactors": [
    { "factor": "<factor name>", "impact": "<how it shifts comp for this role>", "leverage": "<how to use this in the negotiation>" }
  ],
  "talkingPoints": [
    { "title": "<short name for this point>", "point": "<the talking point>", "deploy": "<how to use it in the actual conversation — exact framing>" }
  ],
  "askStrategy": "<1-2 sentences on how to position the ask given their market position>",
  "redFlags": [
    { "flag": "<the red flag>", "signal": "<what it signals about the offer or employer>", "watch": "<what to say or do when you see this>" }
  ]
}

Rules:
- Be honest. If you can't give precise salary figures, use realistic ranges or explain why.
- talkingPoints: each needs a short title, the actual point, and a deploy line with exact conversation framing.
- keyFactors: name the factor, explain its specific impact on comp, and give a concrete leverage tactic.
- redFlags: name the flag, explain what it signals, and say exactly what to do.
- askStrategy should tell them what angle to take given their specific situation.
- Be concise — this is a briefing, not an essay.
- Generate 3-4 keyFactors, 3-4 talkingPoints, 2-3 redFlags.`;

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
    { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.22, maxTokens: 1200, jsonMode: true }
  );

  const fallback = buildFallback(role);
  if (!reply) return NextResponse.json(fallback);

  try {
    const p = JSON.parse(reply) as Record<string, unknown>;
    const str = (k: string) => typeof p[k] === "string" ? (p[k] as string).trim() : "";
    return NextResponse.json({
      marketVerdict: str("marketVerdict") || fallback.marketVerdict,
      verdictNote: str("verdictNote") || fallback.verdictNote,
      rangeFloor: str("rangeFloor") || fallback.rangeFloor,
      rangeMedian: str("rangeMedian") || fallback.rangeMedian,
      rangeCeiling: str("rangeCeiling") || fallback.rangeCeiling,
      keyFactors: (() => {
        const parsed = mapList(p.keyFactors, i => {
          const factor = cleanStr(i.factor), impact = cleanStr(i.impact), leverage = cleanStr(i.leverage);
          return factor ? { factor, impact, leverage } : null;
        }, 4);
        return parsed.length ? parsed : fallback.keyFactors;
      })(),
      talkingPoints: (() => {
        const parsed = mapList(p.talkingPoints, i => {
          const title = cleanStr(i.title), point = cleanStr(i.point), deploy = cleanStr(i.deploy);
          return title ? { title, point, deploy } : null;
        }, 5);
        return parsed.length ? parsed : fallback.talkingPoints;
      })(),
      askStrategy: str("askStrategy") || fallback.askStrategy,
      redFlags: (() => {
        const parsed = mapList(p.redFlags, i => {
          const flag = cleanStr(i.flag), signal = cleanStr(i.signal), watch = cleanStr(i.watch);
          return flag ? { flag, signal, watch } : null;
        }, 3);
        return parsed.length ? parsed : fallback.redFlags;
      })(),
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
