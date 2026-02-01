import { NextResponse } from "next/server";
import { generateCoachPulse } from "@/lib/coach-ai";
import { sanitizeAnswers } from "@/lib/validation";
import { defaultAnswers } from "@/lib/defaults";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json();
  const normalized = sanitizeAnswers(body?.answers || {});
  const merged = { ...defaultAnswers, ...normalized };
  if (!Array.isArray(merged.roles) || merged.roles.length === 0) {
    merged.roles = ["your target role"];
  }
  const aiMessage = await generateCoachPulse(merged, body?.step);
  if (aiMessage) return NextResponse.json({ message: aiMessage });
  const fallback = `So far I’m hearing ${merged.level} ${merged.roles[0]} targets on a ${merged.timeline} timeline. I’ll keep the plan focused on what moves the needle first — let’s finish ${body?.step || "this step"}.`;
  return NextResponse.json({ message: fallback });
}
