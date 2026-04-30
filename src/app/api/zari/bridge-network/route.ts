import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 45;

type Persona = { type: string; why: string; where: string; template: string };

function clean(v: unknown) { return typeof v === "string" ? v.trim() : ""; }
function mapPersonas(v: unknown, max = 4): Persona[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, max).map(i => {
    if (!i || typeof i !== "object") return null;
    const r = i as Record<string, unknown>;
    const type = clean(r.type), why = clean(r.why), where = clean(r.where), template = clean(r.template);
    return type ? { type, why: why || "", where: where || "", template: template || "" } : null;
  }).filter(Boolean) as Persona[];
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const access = await requirePaidRouteAccess("zari_bridge_network");
  if (!access.ok) return access.response;

  const body = await request.json().catch(() => ({})) as {
    fromRole?: string; toRole?: string; fromIndustry?: string; toIndustry?: string;
    accomplishments?: string; skills?: string; resumeText?: string;
  };

  const fromRole = (body.fromRole ?? "").trim();
  const toRole   = (body.toRole ?? "").trim();
  if (!fromRole || !toRole) return NextResponse.json({ error: "Provide your current and target roles" }, { status: 400 });

  const systemPrompt = `You are Zari, a career pivot coach. Help this person build a bridge network — the specific types of people they need to connect with to make the ${fromRole} → ${toRole} pivot credible and land faster.

Return ONLY valid JSON:
{
  "strategy": "<2-3 sentences: the networking meta-strategy for THIS specific pivot — how to approach being an outsider trying to break in, referencing their specific background if provided>",
  "personas": [
    {
      "type": "<type of person — e.g. 'Recently-pivoted engineers now in PM roles'>",
      "why": "<1-2 sentences: why THIS specific type of person is uniquely valuable for this exact pivot>",
      "where": "<where to find them — be specific: e.g. 'Search LinkedIn for people with both [X] and [Y] in their history', 'Community slack channels for [field]', etc.>",
      "template": "<a ready-to-send DM or email — if background is provided, reference specific skills or accomplishments from it. Honest about the pivot. Specific, easy ask. DO NOT use [Name] — write as if you know their name. Under 120 words.>"
    }
  ]
}

Rules:
- Generate exactly 4 personas, ordered by accessibility and impact
- Each persona must be a genuinely DIFFERENT type of person
- Persona 1: someone who HAS made this exact or similar pivot (biggest credibility source)
- Persona 2: someone currently in the target role at a company that values non-traditional backgrounds
- Persona 3: a connector/community figure in the target field (multiplier effect)
- Persona 4: someone at the intersection of both fields (bridge person)
- Templates must be honest about the career change — name it, don't bury it
- If background/accomplishments are provided, weave relevant specifics into the templates — make them feel personal, not generic
- WHERE to find them must be specific — HOW to use LinkedIn, not just "use LinkedIn"`;

  const bgParts = [
    body.accomplishments?.trim() ? `THEIR BACKGROUND/ACCOMPLISHMENTS:\n${body.accomplishments.slice(0, 1000)}` : "",
    body.skills?.trim() ? `SKILLS TO LEVERAGE:\n${body.skills.slice(0, 600)}` : "",
    body.resumeText?.trim() ? `RESUME:\n${body.resumeText.slice(0, 1200)}` : "",
  ].filter(Boolean).join("\n\n");

  const userPrompt = [
    `FROM: ${fromRole}${body.fromIndustry ? ` (${body.fromIndustry})` : ""}`,
    `TO: ${toRole}${body.toIndustry ? ` (${body.toIndustry})` : ""}`,
    bgParts || "",
  ].filter(Boolean).join("\n\n");

  const reply = await openaiChat(
    [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
    { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.55, maxTokens: 1400, jsonMode: true }
  );

  const fallback = {
    strategy: `As a ${fromRole} targeting ${toRole} roles, your networking advantage is your outside-in perspective — you see things career insiders miss. Lead with the transition honestly, not apologetically. The goal in the first 90 days is not to find a job; it's to find 3-5 people who have already made a similar move and learn how they did it.`,
    personas: [
      {
        type: `People who made the ${fromRole} → ${toRole} pivot in the last 3 years`,
        why: `They are your clearest proof that it's possible and your best source of non-obvious advice — what actually worked, what they wished they'd done differently, and who opened the first door.`,
        where: `LinkedIn: search "${toRole}" in the headline filter, then look at their previous experience for "${fromRole}" or similar titles. Also search posts with hashtags like #careerchange #[target field].`,
        template: `Hey — I came across your profile and noticed you made a move from [similar background] into ${toRole}. I'm in the middle of the same transition and would love 20 minutes to hear how you approached it — specifically what helped you get the first foot in the door. No agenda, just genuinely trying to learn from someone who's done it. Would you be open to a short call?`,
      },
      {
        type: `${toRole}s at companies known for hiring from non-traditional backgrounds`,
        why: `Not all companies require domain experience — some actively recruit for adjacent skills and trainability. These people can tell you which companies have that culture and who's hiring with that lens.`,
        where: `LinkedIn: search for "${toRole}" → filter by "2nd connections" → look for people whose profiles include a mix of backgrounds. Startups and scale-ups are more likely to have diverse-background teams.`,
        template: `Hi — I'm a ${fromRole} making a deliberate move into ${toRole} and came across your work at [company]. I'd value 20 minutes to understand what skills you see ${toRole}s actually use day-to-day versus what shows up in job descriptions. Happy to share what I've been learning on my end. Would you have time for a short call this or next week?`,
      },
      {
        type: `Community organizers and content creators in the target field`,
        why: `They have outsized networks in the target domain and are used to helping new people. One introduction from them is worth ten cold messages. They also know which companies are growing and which teams are open.`,
        where: `Find the newsletters, podcasts, and Slack communities for your target field. The organizers are usually named prominently. Engage with their content genuinely for 2-3 weeks before reaching out.`,
        template: `Hi — I've been following your work on [specific thing they make/write/organize] for a few weeks now. I'm transitioning from ${fromRole} into ${toRole} and your content has been genuinely useful in understanding the space. I'd love to contribute to the community in any way I can as I make this move. Is there a good place to get more involved?`,
      },
      {
        type: `People whose careers span both your current and target fields`,
        why: `Bridge people validate your pivot narrative before you say it in an interview. They've lived the intersection and can tell you exactly how to frame your background in language the target field will respect.`,
        where: `Search LinkedIn for people with both "${fromRole}" (or your industry) AND "${toRole}" somewhere in their experience. These profiles are rare — when you find them, they're gold.`,
        template: `Hi — your career path caught my attention because it crosses exactly the ground I'm trying to cover right now. I'm a ${fromRole} moving into ${toRole} and I'm trying to understand how to frame that transition credibly. I'd love 15 minutes to hear how you've thought about the overlap between the two fields. Would you be open to a quick chat?`,
      },
    ],
  };

  if (!reply) return NextResponse.json(fallback);

  try {
    const p = JSON.parse(reply) as Record<string, unknown>;
    const personas = mapPersonas(p.personas, 4);
    return NextResponse.json({
      strategy: clean(p.strategy) || fallback.strategy,
      personas: personas.length === 4 ? personas : fallback.personas,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
