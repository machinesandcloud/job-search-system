import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { createReviewForUser, getLatestReviewForUser } from "@/lib/mvp/store";
import { ensureSameOrigin } from "@/lib/utils";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json(await getLatestReviewForUser(userId, "resume"));
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  return NextResponse.json(await createReviewForUser(userId, {
    type: "resume",
    documentId: body.documentId,
    targetRole: body.targetRole,
  }));
}
