import { NextResponse } from "next/server";

import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

function cleanStr(v: unknown) { return typeof v === "string" ? v.trim() : ""; }
function cleanList(v: unknown, max = 6) {
  return Array.isArray(v) ? v.map(cleanStr).filter(Boolean).slice(0, max) : [];
}
function mapList<T>(v: unknown, fn: (r: Record<string,unknown>) => T | null, max = 5): T[] {
  if (!Array.isArray(v)) return [];
  return v.map(i => i && typeof i === "object" ? fn(i as Record<string,unknown>) : null).filter(Boolean).slice(0, max) as T[];
}

function buildFallback(body: { currentTitle: string; targetRole: string }) {
  const cur = body.currentTitle || "this leader";
  const target = body.targetRole || "the next executive level";
  return {
    execScore: 60,
    execVerdict: "Emerging exec",
    hardTruth: `The gap between strong operator and credible executive is almost always about narrative, not just performance. If the people who matter to ${target} cannot describe what you stand for and what problems you uniquely solve, the results alone will not get you there.`,
    executiveNarrative: `${cur} brings a combination of operational depth and strategic range that is still rare at this level. The strongest case for ${target} is not the volume of work delivered, but the quality of judgment shown when the path was genuinely unclear and the decisions had real organizational consequences.`,
    presenceGaps: [
      { area: "Executive narrative", severity: "critical" as const, action: "Build a short, repeatable story about your strategic orientation — what you see that others miss, and what you do about it." },
      { area: "External visibility", severity: "moderate" as const, action: "Establish one external signal of credibility in your domain — publishing, speaking, advisory work, or visible leadership." },
      { area: "Sponsor depth", severity: "moderate" as const, action: "Identify who at the most senior levels can speak credibly about your judgment under pressure, not just your results." },
    ],
    strengths: [
      "Track record of delivery at meaningful scale.",
      "Ability to operate across functions and lead without formal authority.",
      "Demonstrated judgment in high-stakes or ambiguous situations.",
    ],
    positioningMoves: [
      { title: "Clarify your strategic thesis", move: "Articulate in two sentences what problems you are uniquely equipped to solve and why — then use that framing consistently in every senior conversation.", why: "Executives get remembered for what they stand for, not what they have done." },
      { title: "Make your judgment visible", move: "In the next cross-functional situation that is genuinely unclear, write down your recommendation and the reasoning, share it upward before the decision is made.", why: "Judgment visibility is how senior leaders learn to trust you before formal authority changes." },
      { title: "Build one boardroom-level relationship", move: "Identify one person at board or C-suite level who could speak about your capability and find a way to be directly useful to them.", why: "Executive positioning is almost entirely driven by sponsorship from the level above target, not the level at target." },
    ],
    boardBio: `[Name] is a [function] executive with [X] years of experience building and scaling [relevant scope] across [industry/company type]. [He/She/They] is known for [distinctive leadership trait] and has led [key outcome] that produced [measurable business result]. [Name] brings particular expertise in [domain strength] and has a track record of [strategic contribution]. Currently [current role/scope] at [company type], [he/she/they] is focused on [current strategic priority].`,
    watchouts: [
      "Leading with achievements instead of judgment signals strong operator, not strategic executive.",
      "Waiting to be discovered. Executive positioning is active, not passive.",
      "Conflating busyness or impact volume with strategic value — they are not the same at the senior level.",
    ],
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    currentTitle?: string; targetRole?: string; currentScope?: string;
    teamSize?: string; businessOutcomes?: string; execExposure?: string;
    boardExperience?: string; specificGoal?: string; bioText?: string;
  };

  const currentTitle = (body.currentTitle ?? "").trim();
  if (!currentTitle) return NextResponse.json({ error: "Provide your current title" }, { status: 400 });

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) { try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ } }

  const systemPrompt = `You are Zari, a sharp executive positioning advisor. Assess this leader's executive presence and build a concrete positioning strategy for their target level.

${userContext ? `Profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "execScore": <0-100: current executive positioning strength>,
  "execVerdict": "<Board-ready | Emerging exec | Strong operator | Pre-executive>",
  "hardTruth": "<1-2 blunt sentences about the single biggest gap between where they are and executive credibility>",
  "executiveNarrative": "<2-3 sentences a board member or C-suite sponsor could say about this person in a room that matters>",
  "presenceGaps": [
    { "area": "<gap area>", "severity": "<critical | moderate>", "action": "<concrete action to close it>" }
  ],
  "strengths": ["<genuine executive strength>", "<strength>", "<strength>"],
  "positioningMoves": [
    { "title": "<short move name>", "move": "<exactly what to do>", "why": "<why it moves the needle at this level>" }
  ],
  "boardBio": "<a short, professional executive bio ready to use or adapt — third person, specific, strong opening>",
  "watchouts": ["<risk>", "<risk>", "<risk>"]
}

Rules:
- execVerdict must be honest. Do not default to "Board-ready" without clear evidence.
- hardTruth must name the real gap plainly. No softening.
- executiveNarrative should sound like something a real senior leader would say — not a template.
- presenceGaps should be specific to this person's situation, not a generic list.
- boardBio should be strong and specific — use their actual context, not placeholder sentences.
- Generate 3 presence gaps, 3 strengths, 3 positioning moves, 3 watchouts.
- CRITICAL: Everything must be anchored to their specific context — role, scope, outcomes, and goal.`;

  const userPrompt = [
    `CURRENT TITLE: ${currentTitle}`,
    body.targetRole ? `TARGET LEVEL/ROLE: ${body.targetRole}` : "",
    body.currentScope ? `CURRENT SCOPE: ${body.currentScope}` : "",
    body.teamSize ? `TEAM/ORG SIZE: ${body.teamSize}` : "",
    body.specificGoal ? `SPECIFIC GOAL: ${body.specificGoal}` : "",
    body.businessOutcomes ? `KEY BUSINESS OUTCOMES:\n${body.businessOutcomes.slice(0, 2500)}` : "",
    body.execExposure ? `EXEC-LEVEL EXPOSURE:\n${body.execExposure.slice(0, 1500)}` : "",
    body.boardExperience ? `BOARD EXPERIENCE: ${body.boardExperience}` : "",
    body.bioText ? `CURRENT BIO/RESUME:\n${body.bioText.slice(0, 2500)}` : "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt || "Assess executive positioning." },
    ],
    { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.28, maxTokens: 1500, jsonMode: true }
  );

  const fallback = buildFallback({ currentTitle, targetRole: body.targetRole ?? "" });
  if (!reply) return NextResponse.json(fallback);

  try {
    const p = JSON.parse(reply) as Record<string, unknown>;
    return NextResponse.json({
      execScore: typeof p.execScore === "number" ? Math.min(100, Math.max(0, Math.round(p.execScore))) : fallback.execScore,
      execVerdict: cleanStr(p.execVerdict) || fallback.execVerdict,
      hardTruth: cleanStr(p.hardTruth) || fallback.hardTruth,
      executiveNarrative: cleanStr(p.executiveNarrative) || fallback.executiveNarrative,
      presenceGaps: mapList(p.presenceGaps, i => {
        const area = cleanStr(i.area), severity = cleanStr(i.severity), action = cleanStr(i.action);
        return area ? { area, severity: (["critical","moderate"].includes(severity) ? severity : "moderate") as "critical"|"moderate", action } : null;
      }, 4).length ? mapList(p.presenceGaps, i => {
        const area = cleanStr(i.area), severity = cleanStr(i.severity), action = cleanStr(i.action);
        return area ? { area, severity: (["critical","moderate"].includes(severity) ? severity : "moderate") as "critical"|"moderate", action } : null;
      }, 4) : fallback.presenceGaps,
      strengths: cleanList(p.strengths, 4).length ? cleanList(p.strengths, 4) : fallback.strengths,
      positioningMoves: mapList(p.positioningMoves, i => {
        const title = cleanStr(i.title), move = cleanStr(i.move), why = cleanStr(i.why);
        return title && move ? { title, move, why } : null;
      }, 4).length ? mapList(p.positioningMoves, i => {
        const title = cleanStr(i.title), move = cleanStr(i.move), why = cleanStr(i.why);
        return title && move ? { title, move, why } : null;
      }, 4) : fallback.positioningMoves,
      boardBio: cleanStr(p.boardBio) || fallback.boardBio,
      watchouts: cleanList(p.watchouts, 4).length ? cleanList(p.watchouts, 4) : fallback.watchouts,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
