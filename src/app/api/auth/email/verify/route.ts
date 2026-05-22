import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 15;

const MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({})) as { code?: string };
  const code = String(body.code || "").trim().replace(/\s/g, "");

  if (!code || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Enter the 6-digit code from your email." }, { status: 400 });
  }

  const record = await prisma.emailVerification.findUnique({ where: { userId } });
  if (!record) {
    return NextResponse.json({ error: "No pending verification. Please request a new code." }, { status: 404 });
  }

  if (record.expiresAt < new Date()) {
    await prisma.emailVerification.delete({ where: { userId } }).catch(() => null);
    return NextResponse.json({ error: "Verification code has expired. Please request a new one." }, { status: 410 });
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many incorrect attempts. Please request a new code." }, { status: 429 });
  }

  const hash = crypto.createHash("sha256").update(code).digest("hex");
  if (hash !== record.codeHash) {
    await prisma.emailVerification.update({ where: { userId }, data: { attempts: { increment: 1 } } });
    const remaining = MAX_ATTEMPTS - record.attempts - 1;
    return NextResponse.json(
      { error: remaining > 0 ? `Incorrect code. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.` : "Incorrect code. Please request a new one." },
      { status: 400 }
    );
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { emailVerified: true } }),
    prisma.emailVerification.delete({ where: { userId } }),
  ]);

  return NextResponse.json({ ok: true });
}
