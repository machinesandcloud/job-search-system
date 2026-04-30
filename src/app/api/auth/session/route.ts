import { NextResponse } from "next/server";
import { getCurrentUserId, setCurrentUserSessionOnResponse } from "@/lib/mvp/auth";
import { createPlatformUser } from "@/lib/platform-users";
import { getUserById } from "@/lib/mvp/store";

export async function POST() {
  let userId = await getCurrentUserId();
  let user = userId ? await getUserById(userId) : null;

  if (!userId || !user) {
    const created = await createPlatformUser({
      firstName: "Demo",
      lastName: "User",
      email: `demo+${Date.now()}@askiatech.local`,
      password: "demo12345",
    });
    userId = created.userId;
    user = await getUserById(userId);
  }

  const response = NextResponse.json({
    token: `app_${crypto.randomUUID()}`,
    user: user?.profile || null,
    expiresInSeconds: 60 * 60 * 24,
  });
  return setCurrentUserSessionOnResponse(response, userId);
}
