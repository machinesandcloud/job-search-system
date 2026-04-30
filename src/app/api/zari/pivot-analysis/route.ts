import { NextResponse } from "next/server";

import { requirePaidRouteAccess } from "@/lib/billing";
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

function buildFallback(body: { fromRole: string; toRole: string }) {
  const from = body.fromRole || "your current role";
  const to = body.toRole || "your target role";
  return {
    pivotScore: 55,
    pivotVerdict: "Viable with work",
    hardTruth: `The gap between ${from} and ${to} is real. The people who make this pivot successfully don't minimize the gap — they translate across it with specific, defensible proof that their work created outcomes the target industry recognizes as valuable.`,
    transferableAssets: [
      { skill: "Problem-solving depth", strength: "Strong", evidence: "Complex problems solved in your current domain translate if you can reframe them as business outcomes, not functional tasks." },
      { skill: "Stakeholder management", strength: "Moderate", evidence: "Cross-functional coordination and influencing without authority is universally valued." },
      { skill: "Execution track record", strength: "Strong", evidence: "Demonstrated ability to ship, deliver, and drive outcomes matters across industries." },
    ],
    skillGaps: [
      { gap: "Domain vocabulary", severity: "moderate" as const, path: "Immerse in target-industry content — use their language before you enter conversations." },
      { gap: "Network in target field", severity: "moderate" as const, path: "Prioritize informational conversations to build relationships and credibility before applying." },
      { gap: "Proof points in target context", severity: "critical" as const, path: "Build 1-2 visible projects, certifications, or contributions that show domain engagement." },
    ],
    targetRoles: [
      { role: `${to} (direct)`, why: `Companies that value domain-diverse backgrounds will see your ${from} foundation as an asset, not a liability.`, bridge: "Reframe every bullet around outcomes, not functions — results translate across domains." },
      { role: `${to} (adjacent bridge)`, why: "An adjacent role lets you build credibility and vocabulary in the target field before making the full leap.", bridge: "Use this role to accumulate 2-3 visible proof points that speak the language of your ultimate target." },
      { role: "Startup / growth-stage equivalent", why: "Early-stage companies hire for versatility and trajectory — pedigree matters less and demonstrated initiative matters more.", bridge: "Lead with impact and ownership, not title or tenure. Show what you shipped, not where you worked." },
    ],
    pivotNarrative: `The through-line from ${from} to ${to} is not a leap — it is a translation. The core skills and outcomes from your background map directly to what ${to} roles require, specifically around [problem solving, delivery, and influencing outcomes]. The reframe is moving from functional identity to outcome identity: not what you were called, but what you consistently produced.`,
    resumeReframe: `Lead with outcomes, not titles or functions. For each role, rewrite the impact in language the target industry would recognize as directly relevant. Deprioritize or remove function-specific jargon that creates distance. Lead the resume with a short positioning statement that names the pivot explicitly — recruiters who see it framed confidently are less likely to screen it out.`,
    quickWins: [
      { action: "Rewrite your LinkedIn headline to name the target role, not your current function.", impact: "High", timeframe: "Today — 15 minutes" },
      { action: "Get one referral conversation with someone who has made a similar pivot.", impact: "High", timeframe: "This week" },
      { action: "Build or publish one artifact (case study, writeup, small project) in the target domain.", impact: "High", timeframe: "Within 2 weeks" },
      { action: "Find 3 job descriptions in the target role and map your existing bullets to their language.", impact: "Medium", timeframe: "This weekend" },
    ],
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  let access;
  try {
    access = await requirePaidRouteAccess("zari_pivot_analysis");
  } catch (err) {
    console.error("[pivot-analysis] billing check failed:", err);
    return NextResponse.json({ error: "Service temporarily unavailable. Please try again." }, { status: 503 });
  }
  if (!access.ok) return access.response;

  const body = await request.json().catch(() => ({})) as {
    fromRole?: string; fromIndustry?: string; toRole?: string; toIndustry?: string;
    accomplishments?: string; skills?: string; timeline?: string;
    resumeText?: string; biggestConcern?: string; jobDescription?: string; currentStatus?: string;
  };

  const fromRole = (body.fromRole ?? "").trim();
  const toRole = (body.toRole ?? "").trim();
  if (!fromRole && !toRole) return NextResponse.json({ error: "Provide your current and target roles" }, { status: 400 });

  const hasBackground = !!(
    (body.resumeText ?? "").trim() ||
    (body.accomplishments ?? "").trim() ||
    (body.skills ?? "").trim()
  );

  if (!hasBackground) {
    return NextResponse.json({
      error: "not_enough_context",
      message: "Upload your resume or share your background so Zari can assess your actual readiness — not guess from job titles.",
    }, { status: 422 });
  }

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) { try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ } }

  const systemPrompt = `You are Zari, a sharp career pivot coach. Assess this person's career change readiness based ONLY on what they have explicitly told you.

${userContext ? `Profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "pivotScore": <0-100: realistic pivot readiness>,
  "pivotVerdict": "<Strong pivot | Viable with work | Challenging | High risk>",
  "hardTruth": "<1-2 blunt sentences about the single biggest challenge in this pivot>",
  "transferableAssets": [
    { "skill": "<skill or capability>", "strength": "<Strong | Moderate | Weak>", "evidence": "<how it applies to target — must reference something the person actually stated>" }
  ],
  "skillGaps": [
    { "gap": "<what is missing>", "severity": "<critical | moderate | minor>", "path": "<concrete way to close it>" }
  ],
  "targetRoles": [
    { "role": "<specific role title>", "why": "<why this role fits given their stated background>", "bridge": "<how to position for this role based on what they shared>" }
  ],
  "pivotNarrative": "<2-3 sentences that frame this pivot compellingly — use only facts they provided>",
  "resumeReframe": "<2-3 sentences of specific guidance based on their actual background>",
  "quickWins": [
    { "action": "<specific action>", "impact": "<High | Medium | Low>", "timeframe": "<e.g. Today, This week, Within 2 weeks>" }
  ]
}

STRICT RULES — NO EXCEPTIONS:
- Only reference skills, accomplishments, or experience the person EXPLICITLY stated. If you cannot ground a claim in their actual words, do not make it.
- transferableAssets.evidence must directly reference something from their stated accomplishments or skills. Start with phrases like "You mentioned...", "From your background in...", "Your stated experience with..." — not invented specifics.
- If their background is thin, reflect that honestly in the score (lower) and the hardTruth (acknowledge the gap). Do not compensate with generic-sounding assets.
- pivotVerdict must be honest. Only return "Strong pivot" if their stated background clearly supports it.
- hardTruth must name the real challenge plainly. No hedging, no invented positives.
- skillGaps should be specific to THIS pivot based on what they told you is — and is not — in their background.
- pivotNarrative must use facts from what they provided. No placeholder brackets. No invented achievements.
- Generate 3-4 transferable assets (only from stated background), 3-4 skill gaps, 3 target roles, 4 quick wins.`;

  const userPrompt = [
    fromRole ? `FROM ROLE: ${fromRole}` : "",
    body.fromIndustry ? `FROM INDUSTRY: ${body.fromIndustry}` : "",
    toRole ? `TARGET ROLE: ${toRole}` : "",
    body.toIndustry ? `TARGET INDUSTRY: ${body.toIndustry}` : "",
    body.timeline ? `TIMELINE: ${body.timeline}` : "",
    body.accomplishments ? `KEY ACCOMPLISHMENTS:\n${body.accomplishments.slice(0, 2000)}` : "",
    body.skills ? `SKILLS TO LEVERAGE:\n${body.skills.slice(0, 1500)}` : "",
    body.biggestConcern ? `BIGGEST CONCERN: ${body.biggestConcern}` : "",
    body.currentStatus ? `STEPS ALREADY TAKEN:\n${body.currentStatus.slice(0, 600)}` : "",
    body.resumeText ? `RESUME/BACKGROUND:\n${body.resumeText.slice(0, 2500)}` : "",
    body.jobDescription ? `TARGET JOB DESCRIPTION:\n${body.jobDescription.slice(0, 2000)}` : "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt || "Assess career pivot readiness." },
    ],
    { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.28, maxTokens: 1400, jsonMode: true }
  );

  const fallback = buildFallback({ fromRole, toRole });
  if (!reply) return NextResponse.json(fallback);

  try {
    const p = JSON.parse(reply) as Record<string, unknown>;
    return NextResponse.json({
      pivotScore: typeof p.pivotScore === "number" ? Math.min(100, Math.max(0, Math.round(p.pivotScore))) : fallback.pivotScore,
      pivotVerdict: cleanStr(p.pivotVerdict) || fallback.pivotVerdict,
      hardTruth: cleanStr(p.hardTruth) || fallback.hardTruth,
      transferableAssets: mapList(p.transferableAssets, i => {
        const skill = cleanStr(i.skill), strength = cleanStr(i.strength), evidence = cleanStr(i.evidence);
        return skill ? { skill, strength: strength || "Moderate", evidence } : null;
      }, 4).length ? mapList(p.transferableAssets, i => {
        const skill = cleanStr(i.skill), strength = cleanStr(i.strength), evidence = cleanStr(i.evidence);
        return skill ? { skill, strength: strength || "Moderate", evidence } : null;
      }, 4) : fallback.transferableAssets,
      skillGaps: mapList(p.skillGaps, i => {
        const gap = cleanStr(i.gap), severity = cleanStr(i.severity), path = cleanStr(i.path);
        return gap ? { gap, severity: (["critical","moderate","minor"].includes(severity) ? severity : "moderate") as "critical"|"moderate"|"minor", path } : null;
      }, 4).length ? mapList(p.skillGaps, i => {
        const gap = cleanStr(i.gap), severity = cleanStr(i.severity), path = cleanStr(i.path);
        return gap ? { gap, severity: (["critical","moderate","minor"].includes(severity) ? severity : "moderate") as "critical"|"moderate"|"minor", path } : null;
      }, 4) : fallback.skillGaps,
      targetRoles: (() => {
        const parsed = mapList(p.targetRoles, i => {
          const role = cleanStr(i.role), why = cleanStr(i.why), bridge = cleanStr(i.bridge);
          return role ? { role, why, bridge } : null;
        }, 3);
        return parsed.length ? parsed : fallback.targetRoles;
      })(),
      pivotNarrative: cleanStr(p.pivotNarrative) || fallback.pivotNarrative,
      resumeReframe: cleanStr(p.resumeReframe) || fallback.resumeReframe,
      quickWins: (() => {
        const parsed = mapList(p.quickWins, i => {
          const action = cleanStr(i.action), impact = cleanStr(i.impact), timeframe = cleanStr(i.timeframe);
          return action ? { action, impact: impact || "Medium", timeframe: timeframe || "This week" } : null;
        }, 4);
        return parsed.length ? parsed : fallback.quickWins;
      })(),
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
