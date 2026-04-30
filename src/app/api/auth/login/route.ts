import { NextResponse } from "next/server";
import { setCurrentUserSessionOnResponse } from "@/lib/mvp/auth";
import { authenticatePlatformUser } from "@/lib/platform-users";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await authenticatePlatformUser(email, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, user: user.profile });
  return setCurrentUserSessionOnResponse(response, user.userId);
}
