import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { createSessionForUser, listSessionsForUser } from "@/lib/mvp/store";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ sessions: await listSessionsForUser(userId) });
}

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const session = await createSessionForUser(userId, body.mode || "career", body.title);
  return NextResponse.json(session, { status: 201 });
}
