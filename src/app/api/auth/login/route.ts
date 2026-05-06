import { NextResponse } from "next/server";
import { setCurrentUserSessionOnResponse } from "@/lib/mvp/auth";
import { authenticatePlatformUser } from "@/lib/platform-users";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/utils";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit(`login:${ip}`, 10, 15 * 60 * 1000); // 10 attempts per 15 min per IP
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.retryAt - Date.now()) / 1000)) } }
    );
  }

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
