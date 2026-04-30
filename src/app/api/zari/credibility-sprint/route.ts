import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 45;

type SprintAction = { action: string; why: string; time: string };

function clean(v: unknown) { return typeof v === "string" ? v.trim() : ""; }
function mapActions(v: unknown, max = 5): SprintAction[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, max).map(i => {
    if (!i || typeof i !== "object") return null;
    const r = i as Record<string, unknown>;
    const action = clean(r.action), why = clean(r.why), time = clean(r.time);
    return action ? { action, why: why || "Builds domain credibility", time: time || "A few hours" } : null;
  }).filter(Boolean) as SprintAction[];
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const access = await requirePaidRouteAccess("zari_credibility_sprint");
  if (!access.ok) return access.response;

  const body = await request.json().catch(() => ({})) as {
    fromRole?: string; toRole?: string; fromIndustry?: string; toIndustry?: string;
    timeline?: string; currentStatus?: string;
    accomplishments?: string; skills?: string; resumeText?: string;
  };

  const fromRole = (body.fromRole ?? "").trim();
  const toRole   = (body.toRole ?? "").trim();
  if (!fromRole || !toRole) return NextResponse.json({ error: "Provide your current and target roles" }, { status: 400 });

  const systemPrompt = `You are Zari, a career pivot coach. Build a credibility sprint — a prioritized action plan for building visible credibility in a new field before and during the job search.

Return ONLY valid JSON:
{
  "keyInsight": "<1-2 sentences: the single most important thing to understand about credibility-building for THIS specific pivot — reference their actual background if provided>",
  "week1": [
    { "action": "<specific action to take>", "why": "<why this matters for this specific pivot>", "time": "<realistic time estimate, e.g. '30 minutes' or '2-3 hours'>" }
  ],
  "month1": [ ... same format, 4-5 actions ... ],
  "month3": [ ... same format, 3-4 actions ... ]
}

Rules:
- week1: quick, low-effort, visible wins — signal commitment immediately (LinkedIn headline, engaging with target field content, first post, etc.)
- month1: learning + first proof points — a course or cert relevant to the gap, a small project, first networking conversation
- month3: deeper credibility — a real portfolio artifact, published content, community contribution, or referral relationship
- All actions must be SPECIFIC to this ${fromRole} → ${toRole} pivot — if background is provided, build on what they've already done, don't repeat it
- Prioritize visibility over private learning — credibility is what others can see
- If the person has already taken some steps, acknowledge and build on them rather than starting from scratch`;

  const bgParts = [
    body.accomplishments?.trim() ? `BACKGROUND/ACCOMPLISHMENTS:\n${body.accomplishments.slice(0, 1000)}` : "",
    body.skills?.trim() ? `SKILLS:\n${body.skills.slice(0, 600)}` : "",
    body.currentStatus?.trim() ? `STEPS ALREADY TAKEN:\n${body.currentStatus.slice(0, 600)}` : "",
    body.resumeText?.trim() ? `RESUME:\n${body.resumeText.slice(0, 1200)}` : "",
  ].filter(Boolean).join("\n\n");

  const userPrompt = [
    `FROM: ${fromRole}${body.fromIndustry ? ` (${body.fromIndustry})` : ""}`,
    `TO: ${toRole}${body.toIndustry ? ` (${body.toIndustry})` : ""}`,
    body.timeline ? `TIMELINE: ${body.timeline}` : "",
    bgParts || "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
    { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.5, maxTokens: 1300, jsonMode: true }
  );

  const fallback = {
    keyInsight: `For the ${fromRole} → ${toRole} pivot, credibility is built by showing you already think like someone in the new role — before you have the title. One visible proof point beats 10 private courses.`,
    week1: [
      { action: `Rewrite your LinkedIn headline to name the target: "${fromRole} → ${toRole}" or "${fromRole} transitioning to ${toRole}"`, why: "Signals the move publicly. Removes ambiguity. People in your target field will see it.", time: "20 minutes" },
      { action: `Follow 20 influential voices in the ${toRole} / ${body.toIndustry || "target"} space on LinkedIn`, why: "Starts building your algorithmic relevance in the new field and gives you content to engage with.", time: "30 minutes" },
      { action: "Identify one specific skill gap and find the best free resource to start on it", why: "Learning in public (a course, a certification) is visible proof you're investing in the transition.", time: "1 hour" },
    ],
    month1: [
      { action: `Complete one short course or certification relevant to ${toRole}`, why: "A credential on your LinkedIn profile is a quick signal of intentional upskilling.", time: "10-20 hours" },
      { action: "Write one LinkedIn post about something you learned at the intersection of your old and new fields", why: "Demonstrates that you think about the new domain — not just study it.", time: "1-2 hours" },
      { action: `Get one informational conversation with someone currently in a ${toRole} role`, why: "Referrals and warm connections are how most pivots land. Start early.", time: "30 min prep + 30 min call" },
    ],
    month3: [
      { action: `Build one visible proof artifact: a case study, GitHub repo, or documented project relevant to ${toRole}`, why: "A tangible artifact answers the 'but do you have real experience?' objection better than anything else.", time: "20-40 hours" },
      { action: "Contribute to a community (Slack, Discord, forum) in the target field", why: "Active community presence signals long-term commitment, not just job hunting.", time: "30 min/week" },
      { action: "Request a testimonial or endorsement from someone who can speak to your transferable skills", why: "Social proof from credible people bridges the domain gap.", time: "1 hour" },
    ],
  };

  if (!reply) return NextResponse.json(fallback);

  try {
    const p = JSON.parse(reply) as Record<string, unknown>;
    return NextResponse.json({
      keyInsight: clean(p.keyInsight) || fallback.keyInsight,
      week1:  mapActions(p.week1,  3).length ? mapActions(p.week1,  3) : fallback.week1,
      month1: mapActions(p.month1, 5).length ? mapActions(p.month1, 5) : fallback.month1,
      month3: mapActions(p.month3, 4).length ? mapActions(p.month3, 4) : fallback.month3,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
