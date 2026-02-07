import { NextResponse } from "next/server";
import { ensureSameOrigin } from "@/lib/utils";
import { logEvent } from "@/lib/events";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json().catch(() => ({}));
  const email = String(body?.email || "").trim().toLowerCase();
  const source = String(body?.source || "unknown");
  const assessmentId = typeof body?.assessmentId === "string" ? body.assessmentId : null;
  const token = typeof body?.token === "string" ? body.token : null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  await logEvent(
    "waitlist_joined",
    {
      email,
      source,
      token,
    },
    assessmentId || null
  );

  return NextResponse.json({ ok: true });
}
