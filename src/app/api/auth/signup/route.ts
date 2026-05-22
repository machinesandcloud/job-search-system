import { NextResponse } from "next/server";
import { setCurrentUserSessionOnResponse } from "@/lib/mvp/auth";
import { createPlatformUser } from "@/lib/platform-users";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/utils";
import { onUserSignedUp } from "@/lib/zoho-engine";
import { sendNewUserNotification } from "@/lib/email";
import { recordReferralSignup } from "@/lib/referral";

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
  const refCode = String(body.ref || "").trim().slice(0, 32);

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }
  if (password.length > 1024) {
    return NextResponse.json({ error: "Password is too long." }, { status: 400 });
  }

  try {
    const user = await createPlatformUser({ firstName, lastName, email, password });

    // Fire-and-forget: track referral (non-blocking)
    if (refCode) {
      recordReferralSignup(refCode, email).catch(() => {});
    }

    // Fire-and-forget: notify team of new signup (non-blocking)
    sendNewUserNotification({
      firstName,
      lastName,
      email,
      userId: user.userId,
      method: "email",
    }).catch(() => {});

    // Fire-and-forget: full CRM + campaign engine (non-blocking)
    onUserSignedUp({
      userId: user.userId,
      accountId: (user.profile as any)?.accountId ?? user.userId,
      email,
      firstName,
      lastName,
      source: "Direct",
    }).catch((err) => console.error("[signup] onUserSignedUp failed for", email, err));

    const response = NextResponse.json({ ok: true, user: user.profile }, { status: 201 });
    return setCurrentUserSessionOnResponse(response, user.userId);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create account." }, { status: 409 });
  }
}
