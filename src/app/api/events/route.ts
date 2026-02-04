import { NextResponse } from "next/server";
import { eventSchema } from "@/lib/validation";
import { logEvent } from "@/lib/events";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  await logEvent(parsed.data.type, parsed.data.metadata || {}, parsed.data.assessmentId || null);
  return NextResponse.json({ ok: true });
}
