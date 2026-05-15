import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { ensureSameOrigin } from "@/lib/utils";

// Twilio is disabled — all OTP codes are "123456" until SMS is configured.
const DUMMY_CODE = "123456";

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

  const codeHash = crypto.createHash("sha256").update(DUMMY_CODE).digest("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.phoneVerification.upsert({
    where: { userId },
    create: { userId, phone, codeHash, expiresAt },
    update: { phone, codeHash, expiresAt, attempts: 0 },
  });

  return NextResponse.json({ ok: true });
}
