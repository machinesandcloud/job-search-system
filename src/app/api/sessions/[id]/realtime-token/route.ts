import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { createRealtimeToken } from "@/lib/mvp/providers";
import { getSessionForUser } from "@/lib/mvp/store";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const session = await getSessionForUser(userId, id);

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(createRealtimeToken(session.id));
}
