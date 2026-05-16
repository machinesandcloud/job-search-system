import { NextResponse } from "next/server";
import {
  buildGoogleAuthUrl,
  encodeGoogleOauthState,
  getDefaultGoogleNext,
  getGoogleCredentials,
  sanitizeInternalNext,
  type GoogleAuthMode,
} from "@/lib/google-auth";

export const runtime = "nodejs";

function getMode(value: string | null): GoogleAuthMode {
  return value === "signup" ? "signup" : "login";
}

export async function GET(request: Request) {
  const creds = getGoogleCredentials();
  const url = new URL(request.url);
  const mode = getMode(url.searchParams.get("mode"));
  const next = sanitizeInternalNext(url.searchParams.get("next"), getDefaultGoogleNext(mode));

  if (!creds) {
    const dest = new URL(mode === "signup" ? "/signup" : "/login", request.url);
    dest.searchParams.set("authError", "Google sign-in is not configured.");
    return NextResponse.redirect(dest);
  }

  // Use the configured redirect URI (env var) when set so it's always a stable,
  // registered URL. Fall back to the request origin only in local dev.
  const redirectUri =
    (process.env.GOOGLE_REDIRECT_URI || "").trim() ||
    `${url.origin}/api/auth/google/callback`;
  const state = encodeGoogleOauthState({ mode, next, redirectUri });

  try {
    const googleUrl = buildGoogleAuthUrl({ state, redirectUri });
    return NextResponse.redirect(googleUrl);
  } catch (error) {
    const dest = new URL(mode === "signup" ? "/signup" : "/login", request.url);
    dest.searchParams.set("authError", error instanceof Error ? error.message : "Google sign-in is not configured.");
    return NextResponse.redirect(dest);
  }
}
