import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/db";
import { hashPlatformPassword } from "@/lib/platform-users";

export const maxDuration = 15;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { token?: string; password?: string };
  const rawToken = `${body.token ?? ""}`.trim();
  const password = `${body.password ?? ""}`;

  if (!rawToken) return NextResponse.json({ error: "Reset token is missing." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });

  const tokenHash = createHash("sha256").update(rawToken).digest("hex");

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  }).catch(() => null);

  if (!resetToken) return NextResponse.json({ error: "This reset link is invalid or has already been used." }, { status: 400 });
  if (resetToken.usedAt) return NextResponse.json({ error: "This reset link has already been used." }, { status: 400 });
  if (new Date() > resetToken.expiresAt) return NextResponse.json({ error: "This reset link has expired. Please request a new one." }, { status: 400 });

  const passwordHash = await hashPlatformPassword(password);

  await prisma.$transaction([
    prisma.user.update({ where: { id: resetToken.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { tokenHash }, data: { usedAt: new Date() } }),
    prisma.appSession.deleteMany({ where: { userId: resetToken.userId } }),
  ]);

  return NextResponse.json({ ok: true });
}
