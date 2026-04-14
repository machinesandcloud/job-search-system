import { NextResponse } from "next/server";
import { getCurrentUserId, sessionCookieName } from "@/lib/mvp/auth";
import { createUser, getUserById } from "@/lib/mvp/store";

export async function POST() {
  let userId = await getCurrentUserId();

  if (!userId) {
    const user = await createUser({
      firstName: "Demo",
      lastName: "User",
      email: `demo+${Date.now()}@askiatech.local`,
      password: "demo12345",
    });
    userId = user.id;
  }

  const user = await getUserById(userId);
  const response = NextResponse.json({
    token: `app_${crypto.randomUUID()}`,
    user: user?.profile || null,
    expiresInSeconds: 60 * 60 * 24,
  });
  response.cookies.set(sessionCookieName, userId, { httpOnly: true, sameSite: "lax", path: "/" });
  return response;
}
