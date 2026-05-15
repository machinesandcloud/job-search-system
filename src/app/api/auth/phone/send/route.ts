import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { prisma } from "@/lib/db";
import { sendSmsOtp } from "@/lib/twilio";
import { rateLimit } from "@/lib/rate-limit";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 15;

const E164_RE = /^\+[1-9]\d{7,14}$/;

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({})) as { phone?: string };
  const phone = String(body.phone || "").trim();

  if (!E164_RE.test(phone)) {
    return NextResponse.json({ error: "Enter a valid phone number in international format (e.g. +12015551234)." }, { status: 400 });
  }

  // Rate limit: 3 sends per user per 10 minutes
  const rl = await rateLimit(`phone_send:${userId}`, 3, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many verification attempts. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.retryAt - Date.now()) / 1000)) } }
    );
  }

  // Check if phone already claimed by a different verified user
  const existing = await prisma.user.findFirst({
    where: { phone, phoneVerified: true, id: { not: userId } },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json({ error: "This phone number is already associated with another account." }, { status: 409 });
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const codeHash = crypto.createHash("sha256").update(code).digest("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.phoneVerification.upsert({
    where: { userId },
    create: { userId, phone, codeHash, expiresAt },
    update: { phone, codeHash, expiresAt, attempts: 0 },
  });

  try {
    await sendSmsOtp(phone, code);
  } catch (err) {
    const twilioErr = err as { message?: string; code?: number; status?: number };
    console.error("[phone/send] Twilio error", { code: twilioErr.code, status: twilioErr.status, message: twilioErr.message });
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      return NextResponse.json({ error: "SMS service not configured — add TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN to your environment variables." }, { status: 502 });
    }
    if (twilioErr.code === 20003 || twilioErr.message?.includes("authenticate")) {
      return NextResponse.json({ error: "SMS service authentication failed — check your Twilio credentials." }, { status: 502 });
    }
    if (twilioErr.code === 21211 || twilioErr.code === 21614) {
      return NextResponse.json({ error: "That phone number is not valid. Please check and try again." }, { status: 400 });
    }
    if (twilioErr.code === 21408) {
      return NextResponse.json({ error: "SMS not supported for that number. Try a mobile number." }, { status: 400 });
    }
    if (twilioErr.code === 21219) {
      return NextResponse.json({ error: "Twilio trial accounts can only send to verified numbers. Upgrade your Twilio account or verify the destination number at twilio.com/console." }, { status: 502 });
    }
    // Surface the raw Twilio error to help diagnose unknown failures
    const detail = twilioErr.code ? ` (Twilio error ${twilioErr.code})` : "";
    return NextResponse.json({ error: `Failed to send SMS${detail}. ${twilioErr.message || "Please try again."}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
