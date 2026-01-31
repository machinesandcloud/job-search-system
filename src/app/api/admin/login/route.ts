import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { adminLoginSchema } from "@/lib/validation";
import { sendAdminMagicLink } from "@/lib/email";
import { isAdminAllowed } from "@/lib/auth";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json();
  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const email = parsed.data.email.toLowerCase();
  if (!isAdminAllowed(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const token = crypto.randomBytes(20).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15);
  await prisma.adminToken.create({
    data: {
      email,
      tokenHash,
      expiresAt,
    },
  });
  await sendAdminMagicLink(email, token);
  return NextResponse.json({ ok: true });
}
