import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { getUserById } from "@/lib/mvp/store";

export async function POST() {
  const userId = await getCurrentUserId();
  const user = userId ? await getUserById(userId) : null;

  if (!userId || !user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  return NextResponse.json({
    user: user.profile,
  });
}
