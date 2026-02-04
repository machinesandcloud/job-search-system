import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { attachAssessmentToUser, createUserSession, verifyPassword } from "@/lib/user-auth";
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
  const assessmentId = String(body?.assessmentId || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  if (assessmentId) {
    await attachAssessmentToUser(assessmentId, user.id);
  }
  await createUserSession(user.id);
  return NextResponse.json({ ok: true });
}
