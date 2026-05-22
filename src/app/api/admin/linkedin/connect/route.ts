import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getCoachAdminSession } from "@/lib/coach-admin-auth";
import { getAuthorizationUrl } from "@/lib/linkedin";

export const runtime = "nodejs";

export async function GET() {
  const session = await getCoachAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
    return NextResponse.json(
      { error: "LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET must be set" },
      { status: 500 }
    );
  }

  const state = crypto.randomBytes(16).toString("hex");
  const authUrl = getAuthorizationUrl(state);

  const response = NextResponse.redirect(authUrl);
  // Store state in a short-lived cookie to verify in the callback
  response.cookies.set("li_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 600, // 10 minutes
    path: "/",
  });

  return response;
}
