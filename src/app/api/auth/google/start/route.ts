import { NextResponse } from "next/server";
import {
  applyGoogleOauthCookie,
  buildGoogleAuthUrl,
  generateGoogleOauthState,
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

  let googleUrl: string;
  const state = generateGoogleOauthState();

  try {
    googleUrl = buildGoogleAuthUrl({ state, mode, next });
  } catch (error) {
    const destination = new URL(mode === "signup" ? "/signup" : "/login", request.url);
    destination.searchParams.set(
      "authError",
      error instanceof Error ? error.message : "Google sign-in is not configured."
    );
    return NextResponse.redirect(destination);
  }

  const response = NextResponse.redirect(googleUrl);
  return applyGoogleOauthCookie(response, { state, mode, next });
}
