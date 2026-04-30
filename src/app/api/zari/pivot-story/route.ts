import { NextResponse } from "next/server";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 45;

function clean(v: unknown) { return typeof v === "string" ? v.trim() : ""; }
function cleanList(v: unknown, max = 4): string[] {
  return Array.isArray(v) ? v.map(i => typeof i === "string" ? i.trim() : "").filter(Boolean).slice(0, max) : [];
}

function buildFallback(fromRole: string, toRole: string) {
  return {
    thirtySecond: `I'm a ${fromRole} making a deliberate move into ${toRole}. The skills I've built — particularly around [your core strength] — translate directly into what this role requires. I'm not starting over; I'm translating.`,
    twoMinute: `My background is in ${fromRole}, where I've spent [X years] doing [core work]. What I've realized is that the skills I've developed — [skill 1], [skill 2], [skill 3] — are exactly what high-performing ${toRole}s need.\n\nThe pivot isn't random. [Your specific reason for the switch: what drew you to the new field]. I've been actively preparing: [one concrete action you've taken — course, project, conversation with someone in the field].\n\nWhen I look at what I'd bring to a ${toRole} role, it's not just adjacent skills — it's a perspective that people who've only worked in [target field] don't have. I've seen what [your current field] does well, and I can bring that lens to [new field].`,
    written: `Hi [Name],\n\nI'm a ${fromRole} actively transitioning into ${toRole}. I came across your work at [company/context] and wanted to reach out.\n\nI know you're hearing from a lot of candidates with direct [new field] experience. My path is different: I'm coming from ${fromRole}, where I've built a track record in [relevant skill]. I'm making this move because [honest 1-sentence reason].\n\nI'd value 20 minutes to hear how you see the space — not to ask for a job, but to learn from someone already in it.\n\nWould you be open to a short call?`,
    tips: [
      "Name the transition explicitly — don't bury it. Hiring managers who see it framed confidently are less likely to screen it out.",
      "Lead with what you're going toward, not what you're leaving. 'Moving into product' lands better than 'leaving engineering'.",
      "Have one concrete proof point ready: a course, project, or relevant accomplishment that shows you've already started.",
      "The 30-second version is your safety net — if you can't say it in 30 seconds, your story isn't clear yet.",
    ],
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json().catch(() => ({})) as {
    fromRole?: string; toRole?: string; fromIndustry?: string; toIndustry?: string;
    context?: string; timeline?: string; biggestConcern?: string;
  };

  const fromRole = (body.fromRole ?? "").trim();
  const toRole   = (body.toRole ?? "").trim();
  if (!fromRole || !toRole) return NextResponse.json({ error: "Provide your current and target roles" }, { status: 400 });

  const fallback = buildFallback(fromRole, toRole);

  const systemPrompt = `You are Zari, a career pivot coach helping people articulate their career change story.
Generate three versions of this person's pivot narrative for different contexts.

Return ONLY valid JSON:
{
  "thirtySecond": "<30-second verbal intro — 2-3 sentences, natural spoken language, first person. Bridges old and new clearly.>",
  "twoMinute": "<Full 2-minute interview answer to 'Tell me about yourself / Why are you making this change?' — 4-5 paragraphs, conversational, specific. Ends with forward momentum.>",
  "written": "<Email or LinkedIn message version — for cold outreach to people in the target field. Professional, concise, honest about the pivot. Includes a clear ask.>",
  "tips": ["<tip specific to this exact pivot>", "<tip>", "<tip>", "<tip>"]
}

Rules:
- All three formats must speak to the SAME person — same background, same target, same reasoning
- Be specific to ${fromRole} → ${toRole}, not generic
- The 30-second version should be something they can actually say out loud naturally
- The 2-minute version should acknowledge the pivot directly, not dance around it
- The written version should be for networking outreach, not a formal cover letter
- Tips should be tactical and specific to this particular transition`;

  const userPrompt = [
    `FROM: ${fromRole}${body.fromIndustry ? ` (${body.fromIndustry})` : ""}`,
    `TO: ${toRole}${body.toIndustry ? ` (${body.toIndustry})` : ""}`,
    body.timeline ? `TIMELINE: ${body.timeline}` : "",
    body.biggestConcern ? `BIGGEST CONCERN: ${body.biggestConcern}` : "",
    body.context ? `BACKGROUND CONTEXT:\n${body.context.slice(0, 1500)}` : "",
  ].filter(Boolean).join("\n");

  const reply = await openaiChat(
    [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
    { model: process.env.OPENAI_MODEL ?? "gpt-4o-mini", temperature: 0.45, maxTokens: 1200, jsonMode: true }
  );

  if (!reply) return NextResponse.json(fallback);

  try {
    const p = JSON.parse(reply) as Record<string, unknown>;
    return NextResponse.json({
      thirtySecond: clean(p.thirtySecond) || fallback.thirtySecond,
      twoMinute:    clean(p.twoMinute)    || fallback.twoMinute,
      written:      clean(p.written)      || fallback.written,
      tips:         cleanList(p.tips, 4).length ? cleanList(p.tips, 4) : fallback.tips,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
