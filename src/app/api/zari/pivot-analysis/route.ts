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
      `Entry or mid-level ${to} roles at companies that value domain-diverse backgrounds`,
      `${to} adjacent roles that let you build credibility before the full pivot`,
      "Startups or growth-stage companies where versatility matters more than pedigree",
    ],
    pivotNarrative: `The through-line from ${from} to ${to} is not a leap — it is a translation. The core skills and outcomes from your background map directly to what ${to} roles require, specifically around [problem solving, delivery, and influencing outcomes]. The reframe is moving from functional identity to outcome identity: not what you were called, but what you consistently produced.`,
    resumeReframe: `Lead with outcomes, not titles or functions. For each role, rewrite the impact in language the target industry would recognize as directly relevant. Deprioritize or remove function-specific jargon that creates distance. Lead the resume with a short positioning statement that names the pivot explicitly — recruiters who see it framed confidently are less likely to screen it out.`,
    quickWins: [
      "Rewrite your LinkedIn headline to name the target role, not your current function.",
      "Get one referral conversation with someone who has made a similar pivot.",
      "Build or publish one artifact (case study, writeup, small project) in the target domain.",
      "Find 3 job descriptions in the target role and map your existing bullets to their language.",
    ],
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as {
    fromRole?: string; fromIndustry?: string; toRole?: string; toIndustry?: string;
    accomplishments?: string; skills?: string; timeline?: string;
    resumeText?: string; biggestConcern?: string;
  };

  const fromRole = (body.fromRole ?? "").trim();
  const toRole = (body.toRole ?? "").trim();
  if (!fromRole && !toRole) return NextResponse.json({ error: "Provide your current and target roles" }, { status: 400 });

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) { try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ } }

  const systemPrompt = `You are Zari, a sharp career pivot coach. Assess this person's career change readiness and give them a concrete, honest pivot strategy.

${userContext ? `Profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "pivotScore": <0-100: realistic pivot readiness>,
  "pivotVerdict": "<Strong pivot | Viable with work | Challenging | High risk>",
  "hardTruth": "<1-2 blunt sentences about the single biggest challenge in this pivot>",
  "transferableAssets": [
    { "skill": "<skill or capability>", "strength": "<Strong | Moderate | Weak>", "evidence": "<how it applies to target>" }
  ],
  "skillGaps": [
    { "gap": "<what is missing>", "severity": "<critical | moderate | minor>", "path": "<concrete way to close it>" }
  ],
  "targetRoles": ["<specific role to consider>", "<specific role>", "<specific role>"],
  "pivotNarrative": "<2-3 sentences that frame this pivot compellingly for a hiring conversation>",
  "resumeReframe": "<2-3 sentences of specific guidance on how to rewrite the resume for this pivot>",
  "quickWins": ["<action>", "<action>", "<action>", "<action>"]
}

Rules:
- Be specific to their actual from/to. Generic pivot advice is not acceptable.
- pivotVerdict must be honest. Do not default to "Strong pivot" unless the evidence clearly supports it.
- hardTruth must name the real challenge plainly. No hedging.
- transferableAssets should reference their actual background, not generic skills.
- skillGaps should be specific to THIS pivot, not a general list.
- Generate 3-4 transferable assets, 3-4 skill gaps, 3 target roles, 4 quick wins.
- pivotNarrative should sound like something they can say out loud in an interview.`;

  const userPrompt = [
    fromRole ? `FROM ROLE: ${fromRole}` : "",
    body.fromIndustry ? `FROM INDUSTRY: ${body.fromIndustry}` : "",
    toRole ? `TARGET ROLE: ${toRole}` : "",
    body.toIndustry ? `TARGET INDUSTRY: ${body.toIndustry}` : "",
    body.timeline ? `TIMELINE: ${body.timeline}` : "",
    body.accomplishments ? `KEY ACCOMPLISHMENTS:\n${body.accomplishments.slice(0, 2000)}` : "",
    body.skills ? `SKILLS TO LEVERAGE:\n${body.skills.slice(0, 1500)}` : "",
    body.biggestConcern ? `BIGGEST CONCERN: ${body.biggestConcern}` : "",
    body.resumeText ? `BACKGROUND:\n${body.resumeText.slice(0, 2500)}` : "",
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
      targetRoles: cleanList(p.targetRoles, 3).length ? cleanList(p.targetRoles, 3) : fallback.targetRoles,
      pivotNarrative: cleanStr(p.pivotNarrative) || fallback.pivotNarrative,
      resumeReframe: cleanStr(p.resumeReframe) || fallback.resumeReframe,
      quickWins: cleanList(p.quickWins, 4).length ? cleanList(p.quickWins, 4) : fallback.quickWins,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
