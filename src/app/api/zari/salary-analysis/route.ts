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

function buildFallback() {
  return {
    compensationScore: 58,
    marketPosition: "at",
    marketPositionDetail: "Based on the information provided, your compensation appears near market median. Precise benchmarks require specific role, level, and location data.",
    hardTruth: "Most professionals leave 10-25% on the table simply by not knowing the real range — or by accepting the first number before they've established their anchor.",
    leveragePoints: [
      { title: "Experience Trajectory", explanation: "Your experience trajectory and current scope carry more weight than your title. Hiring managers care about what you've shipped, not what your org calls you.", tactic: "Open with scope and outcomes, not years of experience. Say what you own and what would break without you." },
      { title: "Remote Market Access", explanation: "Remote eligibility expands your negotiable market beyond local comp bands — effectively putting you in competition for SF or NYC salaries from anywhere.", tactic: "Reference the remote market explicitly. 'I'm benchmarking against the full remote market for this role, which runs higher than local rates.'" },
      { title: "Replacement Cost", explanation: "The cost of replacing you is typically 50-200% of annual comp — recruiting fees, onboarding time, lost institutional knowledge. That's your leverage floor.", tactic: "Don't mention this directly, but use it as your internal anchor. You're not asking for a raise — you're asking them to not spend $200K replacing you." },
      { title: "Competing Signals", explanation: "Competing offers or active interviews — even early-stage — are the single strongest signal in any negotiation. It forces urgency and sets a real market floor.", tactic: "If you have any competing interest, disclose it early and factually. 'I'm in late stages elsewhere at $X — I wanted to give you the first right of refusal.'" },
      { title: "Specialized Depth", explanation: "Specialized depth commands premiums. Generalists get market rates; specialists get above-market rates because the supply is thin and the cost of a bad hire is high.", tactic: "Name the two or three things you do that are genuinely rare. Not 'I'm a strong communicator' — name the actual technical or domain expertise that's hard to find." },
    ],
    benchmarks: [
      { label: "Entry-band", value: "Market floor", context: "Minimum for qualified candidates in this function" },
      { label: "Median", value: "Market median", context: "Mid-point for experienced professionals at this level" },
      { label: "Top quartile", value: "Upper range", context: "What high-leverage candidates at top companies command" },
    ],
    negotiationMoves: [
      { title: "Anchor first", move: "Name your number before they do. Research shows the first number sets the frame — anchor 15-20% above your actual target.", when: "At the start of any comp conversation or before an offer is made." },
      { title: "Never accept on the spot", move: "Always ask for 48-72 hours to review any offer. Instant acceptance signals you were expecting less.", when: "When an offer or counter comes in." },
      { title: "Bundle the ask", move: "Do not negotiate base alone. Request signing bonus, equity, title, remote flexibility, and accelerated review — all at once.", when: "When making your counter or primary ask." },
      { title: "Silence is leverage", move: "After naming your number, stop talking. The first person to fill the silence loses ground.", when: "After every anchor or counter-offer." },
    ],
    counterScript: `Hi [Name],\n\nThank you for the offer — I'm genuinely excited about this opportunity. After reviewing the details carefully, I'd like to discuss the compensation package.\n\nBased on my research into market rates for this role at my experience level, and given [the specific value I bring — e.g., your domain expertise, existing relationships, or relevant track record], I'm targeting a base of [your target]. I believe this reflects fair market value for this scope and level.\n\nI'm committed to making this work and happy to discuss. When is a good time to connect?\n\n[Your Name]`,
    watchouts: [
      { mistake: "Revealing your current comp too early", why: "Disclosing before you have an offer anchors the employer's range to your past — not your market value.", howToAvoid: "Deflect with: 'I'd rather focus on the right fit and market rate for this role — what's the budgeted range?'" },
      { mistake: "Accepting the first number without a counter", why: "Instant acceptance signals you were expecting less, and leaves money on the table every year it compounds.", howToAvoid: "Always ask for 48 hours to review — then come back with your counter. Never accept on the spot." },
      { mistake: "Apologizing or hedging while negotiating", why: "Phrases like 'I know this might be a lot…' signal weakness before you've even named the number.", howToAvoid: "State your number plainly and stop talking. Silence after the anchor is your strongest next move." },
    ],
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const access = await requirePaidRouteAccess("zari_salary_analysis");
  if (!access.ok) return access.response;

  const body = await request.json().catch(() => ({})) as {
    title?: string; level?: string; industry?: string; companySize?: string;
    currentComp?: string; targetComp?: string; packageContext?: string;
    askType?: string; location?: string; yearsExperience?: string;
    additionalContext?: string;
  };

  const title = (body.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Provide your role title" }, { status: 400 });

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) { try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ } }

  const systemPrompt = `You are Zari, a sharp compensation and negotiation strategist. Analyze this person's compensation situation and build a concrete strategy for their negotiation.

${userContext ? `Profile context:\n${userContext}\n` : ""}

Return ONLY valid JSON:
{
  "compensationScore": <0-100: how well-positioned this person is to negotiate successfully>,
  "marketPosition": "<below | at | above>",
  "marketPositionDetail": "<1-2 sentences estimating their position vs market, honest about data limitations>",
  "hardTruth": "<1-2 blunt sentences about their biggest risk or mistake in this negotiation>",
  "leveragePoints": [
    { "title": "<short name for this leverage point>", "explanation": "<1-2 sentences explaining WHY this is leverage in their specific situation>", "tactic": "<1-2 sentences on exactly how to deploy this in the negotiation — what to say or do>" }
  ],
  "benchmarks": [
    { "label": "<band name>", "value": "<concrete comp figure or range>", "context": "<what this represents>" }
  ],
  "negotiationMoves": [
    { "title": "<short name>", "move": "<exactly what to do>", "when": "<when to use this>" }
  ],
  "counterScript": "<full email or message ready to send, with [bracket placeholders] for personalization only>",
  "watchouts": [
    { "mistake": "<what to avoid>", "why": "<why it costs you in the negotiation>", "howToAvoid": "<the alternative move — specific words or actions>" }
  ]
}

Rules:
- Be specific to their role, level, location, and ask type. No generic filler.
- compensationScore = their negotiating LEVERAGE and preparation level, not raw comp.
- hardTruth must be plain and direct. No reassurance. Name the real risk.
- Benchmarks: give honest estimates or ranges. If data is limited, say so directly.
- Generate 4-5 leverage points (each with title, explanation, tactic), 3 benchmarks, 3-4 negotiation moves, 3 watchouts (each with mistake, why, howToAvoid).
- leveragePoints: title = short name (2-4 words), explanation = WHY this is leverage for them specifically, tactic = exactly what to say or do to deploy it.
- The counterScript must be ready to send, professional, and specific to their situation.`;

  const userPrompt = [
    `ROLE: ${title}`,
    body.level ? `LEVEL: ${body.level}` : "",
    body.industry ? `INDUSTRY: ${body.industry}` : "",
    body.companySize ? `COMPANY SIZE: ${body.companySize}` : "",
    body.location ? `LOCATION: ${body.location}` : "",
    body.yearsExperience ? `YEARS OF EXPERIENCE: ${body.yearsExperience}` : "",
    body.askType ? `ASK TYPE: ${body.askType}` : "",
    body.currentComp ? `CURRENT COMP: ${body.currentComp}` : "",
    body.targetComp ? `TARGET COMP: ${body.targetComp}` : "",
    body.packageContext ? `PACKAGE CONTEXT: ${body.packageContext}` : "",
    body.additionalContext ? `ADDITIONAL CONTEXT:\n${body.additionalContext.slice(0, 2000)}` : "",
  ].filter(Boolean).join("\n");

  const reply = await openaiChat(
    [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt },
    ],
    { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.28, maxTokens: 1400, jsonMode: true }
  );

  const fallback = buildFallback();
  if (!reply) return NextResponse.json(fallback);

  try {
    const p = JSON.parse(reply) as Record<string, unknown>;
    return NextResponse.json({
      compensationScore: typeof p.compensationScore === "number" ? Math.min(100, Math.max(0, Math.round(p.compensationScore))) : fallback.compensationScore,
      marketPosition: cleanStr(p.marketPosition) || fallback.marketPosition,
      marketPositionDetail: cleanStr(p.marketPositionDetail) || fallback.marketPositionDetail,
      hardTruth: cleanStr(p.hardTruth) || fallback.hardTruth,
      leveragePoints: (() => {
        const parsed = mapList(p.leveragePoints, i => {
          const title = cleanStr(i.title), explanation = cleanStr(i.explanation), tactic = cleanStr(i.tactic);
          return title && explanation ? { title, explanation, tactic } : null;
        }, 5);
        return parsed.length ? parsed : fallback.leveragePoints;
      })(),
      benchmarks: mapList(p.benchmarks, i => {
        const label = cleanStr(i.label), value = cleanStr(i.value), context = cleanStr(i.context);
        return label && value ? { label, value, context } : null;
      }, 3).length ? mapList(p.benchmarks, i => {
        const label = cleanStr(i.label), value = cleanStr(i.value), context = cleanStr(i.context);
        return label && value ? { label, value, context } : null;
      }, 3) : fallback.benchmarks,
      negotiationMoves: mapList(p.negotiationMoves, i => {
        const title = cleanStr(i.title), move = cleanStr(i.move), when = cleanStr(i.when);
        return title && move ? { title, move, when } : null;
      }, 4).length ? mapList(p.negotiationMoves, i => {
        const title = cleanStr(i.title), move = cleanStr(i.move), when = cleanStr(i.when);
        return title && move ? { title, move, when } : null;
      }, 4) : fallback.negotiationMoves,
      counterScript: cleanStr(p.counterScript) || fallback.counterScript,
      watchouts: (() => {
        const parsed = mapList(p.watchouts, i => {
          const mistake = cleanStr(i.mistake), why = cleanStr(i.why), howToAvoid = cleanStr(i.howToAvoid);
          return mistake ? { mistake, why, howToAvoid } : null;
        }, 4);
        return parsed.length ? parsed : fallback.watchouts;
      })(),
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
