import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { attachLeadToUser, createUserSession, hashPassword } from "@/lib/user-auth";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!isDatabaseReady()) {
    return NextResponse.json({ error: "Database not ready" }, { status: 500 });
  }
  const body = await request.json();
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");
  const leadId = String(body?.leadId || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Account already exists. Log in instead." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword(password),
    },
  });

  if (leadId) {
    await attachLeadToUser(leadId, user.id);
  }
  await createUserSession(user.id);
  return NextResponse.json({ ok: true });
}
