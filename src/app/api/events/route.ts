import { NextResponse } from "next/server";
import { eventSchema } from "@/lib/validation";
import { logEvent } from "@/lib/events";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json();
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  await logEvent(parsed.data.type, parsed.data.metadata || {}, parsed.data.leadId || null);
  return NextResponse.json({ ok: true });
}
