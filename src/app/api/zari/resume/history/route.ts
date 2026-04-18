import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { getResumeScoreHistory, clearResumeScoreHistory } from "@/lib/mvp/store";
import { ensureSameOrigin } from "@/lib/utils";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ history: [] });
  const history = await getResumeScoreHistory(userId);
  return NextResponse.json({ history: history.slice(0, 30) });
}

export async function DELETE(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  await clearResumeScoreHistory(userId);
  return NextResponse.json({ ok: true });
}
