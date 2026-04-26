import { NextResponse } from "next/server";

import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanList(value: unknown, max = 6) {
  return Array.isArray(value)
    ? value.map(item => cleanString(item)).filter(Boolean).slice(0, max)
    : [];
}

function cleanObjectList<T>(value: unknown, mapper: (item: Record<string, unknown>) => T | null) {
  return Array.isArray(value)
    ? value
        .map(item => item && typeof item === "object" ? mapper(item as Record<string, unknown>) : null)
        .filter(Boolean) as T[]
    : [];
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    evidenceText?: string;
    targetLevel?: string;
    stakeholders?: string;
    blockers?: string;
  };

  const evidenceText = (body.evidenceText ?? "").trim();
  const targetLevel = (body.targetLevel ?? "").trim();
  const stakeholders = (body.stakeholders ?? "").trim();
  const blockers = (body.blockers ?? "").trim();

  if (!evidenceText && !stakeholders) {
    return NextResponse.json({ error: "Provide evidence or stakeholder context" }, { status: 400 });
  }

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  const systemPrompt = `You are Zari, a sharp promotion coach. Build a promotion sponsor strategy that helps someone get the right people aligned before promotion decisions happen.

${targetLevel ? `Target level: ${targetLevel}` : ""}
${userContext ? `Known profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "overallFocus": "<1-2 sentences describing the strategy>",
  "hardTruth": "<1-2 sentence blunt truth about what will keep this person from getting promoted if nothing changes>",
  "executiveNarrative": "<a short narrative leadership should associate with this person>",
  "visibilityMoves": [
    { "title": "<short move name>", "move": "<what to do>", "why": "<why it matters for promotion>" }
  ],
  "sponsorMap": [
    { "audience": "<manager / skip-level / xfn leader / sponsor type>", "goal": "<what they need to believe>", "ask": "<what to say or ask them for>" }
  ],
  "missingSupport": ["<what support is missing>", "<what support is missing>", "<what support is missing>"],
  "weeklyCadence": ["<recurring action>", "<recurring action>", "<recurring action>"],
  "watchouts": ["<risk to avoid>", "<risk to avoid>", "<risk to avoid>"]
}

Rules:
- This is for internal promotion, not job search or public branding.
- Anchor visibility to business outcomes, scope, and cross-functional impact.
- Include sponsorship, not just self-promotion.
- Keep moves concrete and low-drama. No fake networking advice.
- "hardTruth" should be plain, direct, and unsentimental.
- "missingSupport" should explain what belief, sponsorship, or decision-maker visibility is still absent.
- The executive narrative should sound like a sentence a leader could repeat in calibration.
- Make the sponsorMap especially practical: who matters, what they need to believe, and what to ask them for.
- Generate 4-5 visibility moves, 3-4 sponsor map entries, 3-4 weekly cadence actions, and 3 watchouts.`;

  const userPrompt = [
    evidenceText ? `PROMOTION EVIDENCE:\n${evidenceText.slice(0, 4500)}` : "",
    stakeholders ? `STAKEHOLDERS / DECISION-MAKERS:\n${stakeholders.slice(0, 2200)}` : "",
    blockers ? `KNOWN BLOCKERS:\n${blockers.slice(0, 1500)}` : "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt || "Build a promotion sponsor strategy from the available information." },
    ],
    {
      model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.45,
      maxTokens: 1500,
      jsonMode: true,
    }
  );

  if (!reply) return NextResponse.json({ error: "Generation failed" }, { status: 503 });

  try {
    const parsed = JSON.parse(reply) as Record<string, unknown>;
    const result = {
      overallFocus: cleanString(parsed.overallFocus),
      hardTruth: cleanString(parsed.hardTruth),
      executiveNarrative: cleanString(parsed.executiveNarrative),
      visibilityMoves: cleanObjectList(parsed.visibilityMoves, item => {
        const title = cleanString(item.title);
        const move = cleanString(item.move);
        const why = cleanString(item.why);
        return title && move && why ? { title, move, why } : null;
      }).slice(0, 5),
      sponsorMap: cleanObjectList(parsed.sponsorMap, item => {
        const audience = cleanString(item.audience);
        const goal = cleanString(item.goal);
        const ask = cleanString(item.ask);
        return audience && goal && ask ? { audience, goal, ask } : null;
      }).slice(0, 4),
      missingSupport: cleanList(parsed.missingSupport, 5),
      weeklyCadence: cleanList(parsed.weeklyCadence, 4),
      watchouts: cleanList(parsed.watchouts, 4),
    };
    if (!result.overallFocus || !result.executiveNarrative || !result.visibilityMoves.length || !result.sponsorMap.length) {
      return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
    }
    if (!result.hardTruth) {
      result.hardTruth = "If the right people do not trust your next-level readiness before the decision room, more visibility alone will not save the case.";
    }
    if (!result.missingSupport.length) {
      result.missingSupport = [
        "Any decision-maker who still does not really understand your scope or impact.",
        "Any sponsor who likes your work but is not yet willing to speak for your promotion.",
        "Any credibility gap between how you see your readiness and how leadership is likely to see it.",
      ];
    }
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
