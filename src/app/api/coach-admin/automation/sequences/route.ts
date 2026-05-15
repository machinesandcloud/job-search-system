import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { enroll, cancel, unsuppress } from "@/lib/email-sequences";
import type { ZariSequence } from "@/lib/email-sequences";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  await requireCoachAdminActor("support");

  const body = (await request.json().catch(() => ({}))) as {
    action: string;
    email: string;
    sequence?: string;
  };

  const { action, email, sequence } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  if (action === "cancel") {
    await cancel(email, sequence as ZariSequence | undefined);
    return NextResponse.json({ ok: true });
  }

  if (action === "enroll") {
    if (!sequence) return NextResponse.json({ error: "sequence required" }, { status: 400 });
    await enroll(sequence as ZariSequence, email, {});
    return NextResponse.json({ ok: true });
  }

  if (action === "unsuppress") {
    await unsuppress(email);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
