import { NextResponse } from "next/server";

import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

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

  const systemPrompt = `You are Zari, a sharp promotion coach. Build a promotion visibility and sponsorship plan that makes real work easier to notice without sounding performative.

${targetLevel ? `Target level: ${targetLevel}` : ""}
${userContext ? `Known profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "overallFocus": "<1-2 sentences describing the visibility strategy>",
  "executiveNarrative": "<a short narrative leadership should associate with this person>",
  "visibilityMoves": [
    { "title": "<short move name>", "move": "<what to do>", "why": "<why it matters for promotion>" }
  ],
  "sponsorMap": [
    { "audience": "<manager / skip-level / xfn leader / sponsor type>", "goal": "<what they need to believe>", "ask": "<what to say or ask them for>" }
  ],
  "weeklyCadence": ["<recurring action>", "<recurring action>", "<recurring action>"],
  "watchouts": ["<risk to avoid>", "<risk to avoid>", "<risk to avoid>"]
}

Rules:
- This is for internal promotion, not job search or public branding.
- Anchor visibility to business outcomes, scope, and cross-functional impact.
- Include sponsorship, not just self-promotion.
- Keep moves concrete and low-drama. No fake networking advice.
- The executive narrative should sound like a sentence a leader could repeat in calibration.
- Generate 4-5 visibility moves, 3-4 sponsor map entries, 3-4 weekly cadence actions, and 3 watchouts.`;

  const userPrompt = [
    evidenceText ? `PROMOTION EVIDENCE:\n${evidenceText.slice(0, 4500)}` : "",
    stakeholders ? `STAKEHOLDERS / DECISION-MAKERS:\n${stakeholders.slice(0, 2200)}` : "",
    blockers ? `KNOWN BLOCKERS:\n${blockers.slice(0, 1500)}` : "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt || "Build a promotion visibility plan from the available information." },
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
    return NextResponse.json(JSON.parse(reply));
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
