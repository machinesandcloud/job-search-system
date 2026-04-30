import { NextRequest, NextResponse } from "next/server";
import { ensureSameOrigin } from "@/lib/utils";
import { ensureCoachAdminUser, getCoachAdminRole } from "@/lib/billing";
import {
  setCoachAdminSessionOnResponse,
  verifyCoachAdminPassword,
} from "@/lib/coach-admin-auth";

export async function POST(request: NextRequest) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
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
