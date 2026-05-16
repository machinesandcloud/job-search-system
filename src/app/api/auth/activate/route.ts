import { NextResponse } from "next/server";
import { verifyActivationToken, setCurrentUserSessionOnResponse } from "@/lib/mvp/auth";
import { sanitizeInternalNext } from "@/lib/google-auth";

export const runtime = "nodejs";

// Receives a short-lived signed token from the Google OAuth callback and sets
// the session cookie on whatever domain the browser actually landed on.
// This handles the case where zaricoach.com redirects to a Netlify deploy URL —
// the activate endpoint runs on that domain and sets the cookie there.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const next = sanitizeInternalNext(url.searchParams.get("next"), "/dashboard");

  const userId = token ? verifyActivationToken(token) : null;

  if (!userId) {
    const dest = new URL("/login", request.url);
    dest.searchParams.set("authError", "Sign-in link expired. Please try again.");
    return NextResponse.redirect(dest);
  }

  const destination = new URL(next, request.url).toString();
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${destination}"><title>Signing in…</title></head><body></body></html>`;
  const response = new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store, no-cache" },
  });
  return setCurrentUserSessionOnResponse(response, userId);
}
