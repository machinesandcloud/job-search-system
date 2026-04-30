import crypto from "node:crypto";
import type { NextResponse } from "next/server";
import { getBaseUrl } from "@/lib/utils";

export type GoogleAuthMode = "login" | "signup";

const GOOGLE_OAUTH_COOKIE = "askia_google_oauth";
const GOOGLE_SCOPES = ["openid", "email", "profile"];

export function getGoogleOauthCookieName() {
  return GOOGLE_OAUTH_COOKIE;
}

export function getGoogleAuthConfig() {
  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
  const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || "").trim();
  const redirectUri = (process.env.GOOGLE_REDIRECT_URI || "").trim() || new URL("/api/auth/google/callback", getBaseUrl()).toString();

  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret, redirectUri };
}

export function generateGoogleOauthState() {
  return crypto.randomBytes(24).toString("hex");
}

export function getDefaultGoogleNext(mode: GoogleAuthMode) {
  return mode === "signup" ? "/onboarding/plan" : "/dashboard";
}

export function sanitizeInternalNext(next: string | null | undefined, fallback = "/dashboard") {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}

export function encodeGoogleOauthCookie(input: {
  state: string;
  mode: GoogleAuthMode;
  next: string;
}) {
  return Buffer.from(JSON.stringify(input)).toString("base64url");
}

export function decodeGoogleOauthCookie(value: string | undefined) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as {
      state?: string;
      mode?: GoogleAuthMode;
      next?: string;
    };
    if (!parsed.state || (parsed.mode !== "login" && parsed.mode !== "signup")) return null;
    return {
      state: parsed.state,
      mode: parsed.mode,
      next: sanitizeInternalNext(parsed.next, getDefaultGoogleNext(parsed.mode)),
    };
  } catch {
    return null;
  }
}

export function buildGoogleAuthUrl(input: {
  state: string;
  mode: GoogleAuthMode;
  next?: string | null;
}) {
  const config = getGoogleAuthConfig();
  if (!config) {
    throw new Error("Google sign-in is not configured.");
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: GOOGLE_SCOPES.join(" "),
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "select_account",
    state: input.state,
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function applyGoogleOauthCookie(
  response: NextResponse,
  input: { state: string; mode: GoogleAuthMode; next: string }
) {
  response.cookies.set(GOOGLE_OAUTH_COOKIE, encodeGoogleOauthCookie(input), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });
  return response;
}

export function clearGoogleOauthCookie(response: NextResponse) {
  response.cookies.set(GOOGLE_OAUTH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
