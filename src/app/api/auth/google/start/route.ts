import { NextResponse } from "next/server";
import {
  buildGoogleAuthUrl,
  encodeGoogleOauthState,
  getDefaultGoogleNext,
  sanitizeInternalNext,
  type GoogleAuthMode,
} from "@/lib/google-auth";

export const runtime = "nodejs";

function getMode(value: string | null): GoogleAuthMode {
  return value === "signup" ? "signup" : "login";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = getMode(url.searchParams.get("mode"));
  const next = sanitizeInternalNext(url.searchParams.get("next"), getDefaultGoogleNext(mode));

  // Encode mode + next inside the state so the callback doesn't need a cookie.
  // Cookies set on redirect responses are stripped by some CDN/proxy layers (Netlify).
  const state = encodeGoogleOauthState({ mode, next });

  try {
    const googleUrl = buildGoogleAuthUrl({ state, mode, next });
    return NextResponse.redirect(googleUrl);
  } catch (error) {
    const destination = new URL(mode === "signup" ? "/signup" : "/login", request.url);
    destination.searchParams.set(
      "authError",
      error instanceof Error ? error.message : "Google sign-in is not configured."
    );
    return NextResponse.redirect(destination);
  }
}
