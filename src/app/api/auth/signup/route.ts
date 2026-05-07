import { NextResponse } from "next/server";
import { setCurrentUserSessionOnResponse } from "@/lib/mvp/auth";
import { createPlatformUser } from "@/lib/platform-users";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/utils";

export const maxDuration = 15;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = await rateLimit(`signup:${ip}`, 5, 60 * 60 * 1000); // 5 signups per hour per IP
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many sign-up attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.retryAt - Date.now()) / 1000)) } }
    );
  }

  const body = await request.json().catch(() => ({}));
  const firstName = String(body.firstName || "").trim();
  const lastName = String(body.lastName || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  try {
    const user = await createPlatformUser({ firstName, lastName, email, password });
    const response = NextResponse.json({ ok: true, user: user.profile }, { status: 201 });
    return setCurrentUserSessionOnResponse(response, user.userId);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create account." }, { status: 409 });
  }
}
