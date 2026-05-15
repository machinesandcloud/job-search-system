import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { processSequenceQueue } from "@/lib/email-sequences";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  // Trigger is admin-only — only admins can fire production crons manually
  await requireCoachAdminActor("admin");

  const body = (await request.json().catch(() => ({}))) as { cron?: string };

  if (body.cron === "sequence_queue") {
    const result = await processSequenceQueue();
    return NextResponse.json({ ok: true, ...result });
  }

  return NextResponse.json({ error: "unknown cron" }, { status: 400 });
}
