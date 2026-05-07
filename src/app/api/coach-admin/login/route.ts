import { NextRequest, NextResponse } from "next/server";
import { ensureSameOrigin, getClientIp } from "@/lib/utils";
import { ensureCoachAdminUser, getCoachAdminRole } from "@/lib/billing";
import {
  setCoachAdminSessionOnResponse,
  verifyCoachAdminPassword,
} from "@/lib/coach-admin-auth";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 15;

export async function POST(request: NextRequest) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const ip = getClientIp(request);
  const rl = await rateLimit(`coach-admin-login:${ip}`, 5, 15 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const role = getCoachAdminRole(email);
  if (!role) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  }

  if (!verifyCoachAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  try {
    await ensureCoachAdminUser(email, role);
  } catch (error) {
    console.error("[coach-admin-login] failed to sync admin user", error);
  }

  const response = NextResponse.json({ ok: true, role });
  return setCoachAdminSessionOnResponse(response, email, role);
}
