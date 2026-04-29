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

function buildFallback(body: { evidenceText: string; targetLevel: string; stakeholders: string; blockers: string }) {
  const target = body.targetLevel || "the next level";
  return {
    overallFocus: `This plan is about making your ${target} case easy for the right people to understand and defend. Visibility only helps when it builds belief in your readiness, not when it just creates more noise.`,
    hardTruth: `If the decision-makers do not trust your next-level readiness before the room gets serious, late visibility will feel like lobbying instead of proof.`,
    executiveNarrative: `This person is already operating in ways that suggest readiness for ${target}, and the remaining work is making that proof visible, repeatable, and easy for leadership to defend.`,
    visibilityMoves: [
      { title: "Package the strongest wins", move: "Turn your best work into a short, repeatable update that highlights scope, impact, and what changed because of you.", why: "Decision-makers need a crisp story, not a pile of effort." },
      { title: "Target the real audience", move: "Make sure the people who influence promotion timing actually hear the strongest proof, not just your immediate team.", why: "Local visibility is not the same as promotion visibility." },
      { title: "Use existing forums", move: "Share impact in status updates, cross-functional reviews, or readouts that already matter instead of creating performative new ones.", why: "The right signal lands better when it fits normal operating rhythms." },
      { title: "Pressure-test support", move: "Ask your manager or likely sponsor what still feels unproven before you assume they are fully behind the case.", why: "Support that is vague now will disappear under pressure later." },
    ],
    sponsorMap: [
      { audience: "Manager", goal: `Believe the ${target} case is real now, not merely promising.`, ask: "What still feels unproven, and what evidence would make this easier to advocate for?" },
      { audience: "Skip-level or calibration lead", goal: "Recognize the scope and business impact behind your strongest work.", ask: "What examples would be most useful for you to understand the next-level case clearly?" },
      { audience: "Cross-functional leader", goal: "Be able to speak credibly about your influence and operating range.", ask: "Would you be willing to reference the outcomes and collaboration impact you saw directly?" },
    ],
    missingSupport: [
      { gap: "Decision-maker visibility above your manager", impact: "Promotions are approved by people who need to have seen your work — not just your manager's summary of it.", fix: "Get your work in front of the people who influence the decision through real project exposure, not just status updates." },
      { gap: "Sponsor prepared to defend under pressure", impact: "A manager who likes your work but deflects hard questions will lose the vote when it matters.", fix: "Test your sponsor: ask them to describe your strongest proof point in two sentences. If they struggle, they need more context before the room." },
      { gap: "Written external proof from peers or partners", impact: "Without corroboration, your case rests entirely on one person's subjective assessment.", fix: "Ask 2-3 people who witnessed your scope and impact directly for a few specific written sentences you can reference." },
    ],
    weeklyCadence: [
      { action: "Ship one crisp update tying current work to business outcomes", why: "Decision-makers need a pattern, not a packet — consistent visibility compounds over the weeks before the decision.", frequency: "Every week" },
      { action: "Use one existing meeting to make a strong result visible to the right audience", why: "Inserting into existing rhythms lands more credibly than creating new ones.", frequency: "Weekly or bi-weekly" },
      { action: "Check in with your sponsor on what still feels weak", why: "Surprises in calibration happen because nobody said the quiet part out loud before the room.", frequency: "Every 2-3 weeks" },
    ],
    watchouts: [
      { risk: "Increasing visibility before the proof is solid", impact: "More noise on weak evidence makes the case harder to defend, not easier.", instead: "Nail your two strongest examples first. Then make them visible — not before." },
      { risk: "Mistaking being well-liked for being advocate-backed", impact: "Social capital and promotion capital are different — people vote with their professional reputation at stake.", instead: "Ask your sponsor directly: 'What would you say if someone challenged my case in the room?'" },
      { risk: "Waiting until calibration to find out what's still unconvincing", impact: "By then there's no time to close gaps that could have been addressed weeks earlier.", instead: "Force a direct, blunt checkpoint conversation before the decision cycle opens." },
    ],
  };
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
  "missingSupport": [
    { "gap": "<what support or belief is missing>", "impact": "<why it matters for the promotion decision>", "fix": "<concrete action to close it>" }
  ],
  "weeklyCadence": [
    { "action": "<what to do>", "why": "<why this builds the case>", "frequency": "<when/how often>" }
  ],
  "watchouts": [
    { "risk": "<what to avoid>", "impact": "<how it backfires>", "instead": "<what to do instead>" }
  ]
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
- Generate 4-5 visibility moves, 3-4 sponsor map entries, 3-4 weekly cadence actions, and 3 watchouts.
- CRITICAL: Every visibility move, sponsor map entry, and weekly cadence item must be specific to this person's actual situation — their target level, the evidence they provided, and the stakeholders they named. Generic moves like "be more visible" or "build relationships" are not acceptable. Reference actual work, specific audiences, and concrete behaviors.
- The executiveNarrative should sound like something a real leader could say in a calibration meeting about this specific person — not a template about "this candidate".`;

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
      temperature: 0.28,
      maxTokens: 1500,
      jsonMode: true,
    }
  );

  const fallback = buildFallback({ evidenceText, targetLevel, stakeholders, blockers });

  if (!reply) return NextResponse.json(fallback);

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
      missingSupport: (() => {
        const r = cleanObjectList(parsed.missingSupport, item => {
          const gap = cleanString(item.gap), impact = cleanString(item.impact), fix = cleanString(item.fix);
          return gap ? { gap, impact, fix } : null;
        }).slice(0, 5);
        return r.length ? r : fallback.missingSupport;
      })(),
      weeklyCadence: (() => {
        const r = cleanObjectList(parsed.weeklyCadence, item => {
          const action = cleanString(item.action), why = cleanString(item.why), frequency = cleanString(item.frequency);
          return action ? { action, why, frequency } : null;
        }).slice(0, 4);
        return r.length ? r : fallback.weeklyCadence;
      })(),
      watchouts: (() => {
        const r = cleanObjectList(parsed.watchouts, item => {
          const risk = cleanString(item.risk), impact = cleanString(item.impact), instead = cleanString(item.instead);
          return risk ? { risk, impact, instead } : null;
        }).slice(0, 4);
        return r.length ? r : fallback.watchouts;
      })(),
    };
    result.overallFocus ||= fallback.overallFocus;
    result.hardTruth ||= fallback.hardTruth;
    result.executiveNarrative ||= fallback.executiveNarrative;
    result.visibilityMoves = result.visibilityMoves.length ? result.visibilityMoves : fallback.visibilityMoves;
    result.sponsorMap = result.sponsorMap.length ? result.sponsorMap : fallback.sponsorMap;
    result.missingSupport = (result.missingSupport as unknown[]).length ? result.missingSupport : fallback.missingSupport;
    result.weeklyCadence = (result.weeklyCadence as unknown[]).length ? result.weeklyCadence : fallback.weeklyCadence;
    result.watchouts = (result.watchouts as unknown[]).length ? result.watchouts : fallback.watchouts;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(fallback);
  }
}
