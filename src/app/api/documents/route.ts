import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { listDocumentsForUser } from "@/lib/mvp/store";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ documents: await listDocumentsForUser(userId) });
}
