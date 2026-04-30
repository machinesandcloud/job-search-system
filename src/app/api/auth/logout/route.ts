import { NextResponse } from "next/server";
import { clearCurrentUserSession, sessionCookieName } from "@/lib/mvp/auth";

export async function POST() {
  await clearCurrentUserSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookieName, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
