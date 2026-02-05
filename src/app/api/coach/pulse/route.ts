import { NextResponse } from "next/server";
import { generateCoachPulse } from "@/lib/coach-ai";
import { sanitizeAnswers } from "@/lib/validation";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json();
  const normalized = sanitizeAnswers(body?.answers || {});
  if (!Array.isArray(normalized.targetRoles) || normalized.targetRoles.length === 0) {
    return NextResponse.json({ error: "Missing target roles" }, { status: 400 });
  }
  const aiMessage = await generateCoachPulse(normalized, body?.step);
  if (aiMessage) return NextResponse.json({ message: aiMessage, aiEnabled: true });
  return NextResponse.json({ error: "AI unavailable" }, { status: 503 });
}
