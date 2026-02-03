import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { attachLeadToUser, createUserSession, verifyPassword } from "@/lib/user-auth";
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

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  if (leadId) {
    await attachLeadToUser(leadId, user.id);
  }
  await createUserSession(user.id);
  return NextResponse.json({ ok: true });
}
