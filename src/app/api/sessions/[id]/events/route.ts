import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { appendSessionEvent } from "@/lib/mvp/store";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const access = await requirePaidRouteAccess("sessions_events", {}, { enforceTokenLimit: false });
  if (!access.ok) return access.response;
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { id } = await params;
  const session = await appendSessionEvent(userId, id, {
    role: body.role,
    message: body.message,
  });

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({
    sessionId: session.id,
    transcriptTurns: session.transcriptTurns,
    lastMessage: session.transcript.at(-1) || null,
  });
}
