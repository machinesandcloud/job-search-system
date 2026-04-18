import { NextResponse } from "next/server";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

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
    ? `Target job description:\n${jobDescription.slice(0, 1500)}`
    : targetRole
    ? `Target role: "${targetRole}"`
    : "";

  const modeInstructions: Record<string, string> = {
    refine: `The user wants a better version of the AI's suggested rewrite. Make it stronger, more specific, and more natural-sounding. Keep the core facts but tighten the language and punch up the impact.`,
    describe: `The user has described what they actually did. Write a polished XYZ-formula bullet from their description: [Strong Action Verb] + [Skill/Context with specifics] + [Quantified Result]. If they didn't provide a metric, write a placeholder like "[X%]" or "[number] [units]" so they can fill it in. Sound like a real professional, not a template.`,
    variations: `Generate exactly 3 meaningfully different bullet rewrites. Each one should use a completely different opening verb, different angle on the impact, and different structure. Number them 1., 2., 3. Return them as a single string with each bullet on its own line.`,
  };

  const systemPrompt = `You are Zari, an expert resume writer. You specialize in XYZ-formula bullets: [Strong Action Verb] + [Skill/Context] + [Quantified Result].

${jobContext ? `${jobContext}\n\n` : ""}Resume context (to understand this person's background):
${resumeText.slice(0, 2000)}

Rules:
- Strong verbs only: Built, Architected, Led, Drove, Scaled, Reduced, Automated, Shipped, Grew, Spearheaded — never "Responsible for", "Helped", "Worked with"
- Include a quantified metric wherever possible (%, $, time saved, volume, team size)
- Sound like a real person wrote this — not a resume template
- Keep bullets to 1-2 lines
- Do NOT invent experience the person clearly doesn't have

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
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.65,
    maxTokens: 400,
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
