import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { createSessionForUser, listSessionsForUser } from "@/lib/mvp/store";

export const maxDuration = 15;

export async function GET() {
  const access = await requirePaidRouteAccess("sessions_list", {}, { enforceTokenLimit: false });
  if (!access.ok) return access.response;
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const res = NextResponse.json({ sessions: await listSessionsForUser(userId) });
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export async function POST(request: Request) {
  const access = await requirePaidRouteAccess("sessions_create", {}, { enforceTokenLimit: false });
  if (!access.ok) return access.response;
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const session = await createSessionForUser(userId, body.mode || "career", body.title);
  return NextResponse.json(session, { status: 201 });
}
