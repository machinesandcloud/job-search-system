import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { ensureSameOrigin } from "@/lib/utils";
import { sendEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const maxDuration = 15;

function generateOtp(): string {
  return String(crypto.randomInt(100000, 999999));
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  // Rate limit: 3 sends per user per 10 minutes
  const rl = await rateLimit(`email_verif_send:${userId}`, 3, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many verification attempts. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.retryAt - Date.now()) / 1000)) } }
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true, emailVerified: true } });
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
  if (user.emailVerified) return NextResponse.json({ ok: true, alreadyVerified: true });

  const code = generateOtp();
  const codeHash = crypto.createHash("sha256").update(code).digest("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.emailVerification.upsert({
    where: { userId },
    create: { userId, codeHash, expiresAt },
    update: { codeHash, expiresAt, attempts: 0 },
  });

  try {
    await sendEmail({
      to: user.email,
      subject: "Your Zari verification code",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
          <p style="font-size:15px;color:#0F172A;margin:0 0 8px">Hi,</p>
          <p style="font-size:15px;color:#334155;margin:0 0 24px">Here is your Zari verification code:</p>
          <div style="background:#F1F5F9;border-radius:12px;padding:20px 24px;text-align:center;margin-bottom:24px">
            <span style="font-size:36px;font-weight:800;letter-spacing:0.25em;color:#1E1B4B;font-family:monospace">${code}</span>
          </div>
          <p style="font-size:13px;color:#64748B;margin:0">This code expires in <strong>10 minutes</strong>. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
      text: `Your Zari verification code is: ${code}\n\nThis code expires in 10 minutes.`,
    });
  } catch (error) {
    console.error("[email-verif-send] Email send failed", error);
    await prisma.emailVerification.delete({ where: { userId } }).catch(() => null);
    return NextResponse.json({ error: "Could not send verification email. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
