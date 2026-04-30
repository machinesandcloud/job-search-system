import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const access = await requirePaidRouteAccess("zari_resume_magic_write");
  if (!access.ok) return access.response;

  const body = await request.json().catch(() => ({})) as {
    bullet?: string;
    mode?: string;
    userInput?: string;
    resumeText?: string;
    targetRole?: string;
    jobDescription?: string;
  };

  const bullet = (body.bullet ?? "").trim();
  const mode = body.mode ?? "refine";
  const userInput = (body.userInput ?? "").trim();
  const resumeText = (body.resumeText ?? "").trim();
  const targetRole = (body.targetRole ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();

  if (!bullet && !userInput) {
    return NextResponse.json({ error: "bullet or userInput required" }, { status: 400 });
  }

  const jobContext = jobDescription
    ? `Target job description:\n${jobDescription.slice(0, 2500)}`
    : targetRole
    ? `Target role: "${targetRole}"`
    : "";

  const modeInstructions: Record<string, string> = {
    refine: `The user wants a stronger version of the AI's suggested rewrite. Don't just swap synonyms — find a better verb, tighten the structure, and make the metric or impact crisper. The result should be noticeably better, not marginally different.`,
    describe: `The user has described what they actually did in plain language. Write a polished XYZ-formula bullet: [Strong Action Verb] + [Skill/Context with specifics] + [Quantified Result]. If they didn't provide a metric, write a realistic placeholder like "[X%]", "[N users]", or "[$Xk]" so they can fill it in. Sound like a real professional, not a template. Never inflate beyond what they described.`,
    variations: `Generate exactly 3 meaningfully different bullet rewrites. Variation 1: lead with a leadership/strategy verb (Spearheaded, Architected, Directed). Variation 2: lead with an efficiency/outcome verb (Reduced, Automated, Streamlined). Variation 3: lead with a growth/scale verb (Scaled, Grew, Drove). Each must have a different structure and different angle on the impact. Number them 1., 2., 3. Return them as a single string with each bullet on its own line.`,
  };

  const systemPrompt = `You are Zari, an expert resume writer. You specialize in XYZ-formula bullets: [Strong Action Verb] + [Skill/Context] + [Quantified Result].

${jobContext ? `${jobContext}\n\n` : ""}Resume context (to understand this person's background and seniority):
${resumeText.slice(0, 3500)}

Rules:
- Strong verbs only: Built, Architected, Led, Drove, Scaled, Reduced, Automated, Shipped, Grew, Spearheaded, Deployed, Launched, Optimized, Directed, Designed — never "Responsible for", "Helped", "Worked with", "Assisted", "Supported"
- No passive voice ("was deployed", "were managed") — bullets must start with the person as the active subject
- Include a quantified metric wherever possible (%, $, time saved, volume, team size, headcount)
- Sound like a real person wrote this — not a resume template or AI fill-in-the-blank
- Keep bullets to 1-2 lines max
- Never invent experience the person clearly doesn't have based on the resume context

Mode: ${modeInstructions[mode] ?? modeInstructions.refine}

Return ONLY valid JSON: { "bullets": ["<bullet 1>", "<bullet 2 if variations mode>", "<bullet 3 if variations mode>"] }`;

  const userContent = mode === "describe"
    ? `Write a bullet from this description:\n"${userInput}"\n\nOriginal weak bullet for reference:\n"${bullet}"`
    : mode === "variations"
    ? `Generate 3 variations of this bullet:\n"${bullet}"`
    : `Refine this AI-suggested rewrite — make it stronger and more natural:\nOriginal: "${bullet}"\nAI suggestion: "${userInput || bullet}"`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: userContent },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    temperature: mode === "variations" ? 0.75 : 0.6,
    maxTokens: 600,
    jsonMode: true,
  });

  if (!reply) return NextResponse.json({ error: "Generation failed" }, { status: 503 });

  try {
    const result = JSON.parse(reply) as { bullets?: string[] };
    return NextResponse.json({ bullets: result.bullets ?? [] });
  } catch {
    return NextResponse.json({ error: "Could not parse response" }, { status: 500 });
  }
}
