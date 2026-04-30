import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { completeSessionForUser } from "@/lib/mvp/store";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const access = await requirePaidRouteAccess("sessions_complete", {}, { enforceTokenLimit: false });
  if (!access.ok) return access.response;
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const session = await completeSessionForUser(userId, id);
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({
    sessionId: session.id,
    status: session.status,
    summary: session.summary,
  });
}
