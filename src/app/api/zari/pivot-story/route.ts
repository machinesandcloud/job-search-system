import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
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
  const access = await requirePaidRouteAccess("zari_pivot_story");
  if (!access.ok) return access.response;

  const body = await request.json().catch(() => ({})) as {
    fromRole?: string; toRole?: string; fromIndustry?: string; toIndustry?: string;
    context?: string; resumeText?: string; accomplishments?: string; skills?: string;
    currentStatus?: string; timeline?: string; biggestConcern?: string;
  };

  const fromRole = (body.fromRole ?? "").trim();
  const toRole   = (body.toRole ?? "").trim();
  if (!fromRole || !toRole) return NextResponse.json({ error: "Provide your current and target roles" }, { status: 400 });

  const fallback = buildFallback(fromRole, toRole);

  const systemPrompt = `You are Zari, a career pivot coach helping people articulate their career change story.
Generate three versions of this person's pivot narrative for different contexts.

Return ONLY valid JSON:
{
  "thirtySecond": "<30-second verbal intro — 2-3 natural spoken sentences, first person. Name the pivot honestly, lead with what you're moving toward. Grounded in their stated background.>",
  "twoMinute": "<Full 2-minute interview answer to 'Tell me about yourself / Why are you making this change?' — 4-5 paragraphs, conversational, specific. Use actual details from their background. Ends with forward momentum.>",
  "written": "<Email or LinkedIn message for cold outreach to someone in the target field. Concise, honest about the pivot, references something from their background as context. Clear, easy ask at the end. Under 120 words.>",
  "tips": ["<tactical tip specific to this exact pivot>", "<tip>", "<tip>", "<tip>"]
}

Rules:
- All three formats must use the SAME person's stated background — ground every claim in what they actually told you
- Never invent accomplishments or proof points not mentioned in the background
- The 30-second version must feel natural said out loud — avoid jargon and corporate language
- The 2-minute version must name the transition directly in the first paragraph, not bury it
- The written version is for networking outreach, not a cover letter — be human, not formal
- Tips must be specific to this exact ${fromRole} → ${toRole} transition, not generic career advice
- If background context is provided, the stories must reflect those specific experiences`;

  const bgParts = [
    body.accomplishments?.trim() ? `KEY ACCOMPLISHMENTS:\n${body.accomplishments.slice(0, 1200)}` : "",
    body.skills?.trim() ? `SKILLS TO LEVERAGE:\n${body.skills.slice(0, 800)}` : "",
    body.currentStatus?.trim() ? `PROGRESS MADE SO FAR:\n${body.currentStatus.slice(0, 600)}` : "",
    body.resumeText?.trim() ? `RESUME/BACKGROUND:\n${body.resumeText.slice(0, 1800)}` : "",
    body.context?.trim() ? `ADDITIONAL CONTEXT:\n${body.context.slice(0, 800)}` : "",
  ].filter(Boolean).join("\n\n");

  const userPrompt = [
    `FROM: ${fromRole}${body.fromIndustry ? ` (${body.fromIndustry})` : ""}`,
    `TO: ${toRole}${body.toIndustry ? ` (${body.toIndustry})` : ""}`,
    body.timeline ? `TIMELINE: ${body.timeline}` : "",
    body.biggestConcern ? `BIGGEST CONCERN: ${body.biggestConcern}` : "",
    bgParts || "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
    { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.65, maxTokens: 1400, jsonMode: true }
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
