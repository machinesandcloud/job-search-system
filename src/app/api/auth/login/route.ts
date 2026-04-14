import { NextResponse } from "next/server";
import { sessionCookieName } from "@/lib/mvp/auth";
import { validateUser } from "@/lib/mvp/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await validateUser(email, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, user: user.profile });
  response.cookies.set(sessionCookieName, user.id, { httpOnly: true, sameSite: "lax", path: "/" });
  return response;
}
