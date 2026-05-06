import { NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit(`forgot:${ip}`, 5, 60 * 60 * 1000); // 5 requests per hour per IP
  if (!rl.ok) {
    return NextResponse.json({ ok: true }); // silent rate limit — don't reveal
  }

  const body = await request.json().catch(() => ({})) as { email?: string };
  const email = `${body.email ?? ""}`.trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const user = await prisma.user.findFirst({ where: { email } }).catch(() => null);

  // Always return success to prevent email enumeration
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  // Invalidate any existing tokens for this user
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }).catch(() => null);

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  await sendPasswordResetEmail(email, rawToken);

  return NextResponse.json({ ok: true });
}
