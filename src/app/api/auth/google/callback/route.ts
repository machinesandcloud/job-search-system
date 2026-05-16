import { NextResponse } from "next/server";
import {
  decodeGoogleOauthState,
  getDefaultGoogleNext,
  getGoogleAuthConfig,
  sanitizeInternalNext,
} from "@/lib/google-auth";
import { setCurrentUserSessionOnResponse } from "@/lib/mvp/auth";
import { authenticateGooglePlatformUser } from "@/lib/platform-users";

export const maxDuration = 15;

export const runtime = "nodejs";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleUserInfo = {
  sub?: string;
  email?: string;
  email_verified?: boolean;
  given_name?: string;
  family_name?: string;
  name?: string;
};

function buildAuthErrorRedirect(request: Request, mode: "login" | "signup", message: string) {
  const destination = new URL(mode === "signup" ? "/signup" : "/login", request.url);
  destination.searchParams.set("authError", message);
  return NextResponse.redirect(destination);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const stateParam = url.searchParams.get("state");
  const flow = decodeGoogleOauthState(stateParam);
  const mode = flow?.mode || "login";
  const errorParam = url.searchParams.get("error");
  const code = url.searchParams.get("code");

  if (!flow) {
    return buildAuthErrorRedirect(request, mode, "Google sign-in expired. Please try again.");
  }

  if (errorParam) {
    return buildAuthErrorRedirect(
      request,
      mode,
      errorParam === "access_denied" ? "Google sign-in was cancelled." : "Google sign-in failed."
    );
  }

  if (!code) {
    return buildAuthErrorRedirect(request, mode, "Google did not return a login code.");
  }

  const config = getGoogleAuthConfig();
  if (!config) {
    return buildAuthErrorRedirect(request, mode, "Google sign-in is not configured.");
  }

  let tokenPayload: GoogleTokenResponse;
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });

    tokenPayload = await tokenRes.json().catch(() => ({}));
    if (!tokenRes.ok || !tokenPayload.access_token) {
      throw new Error(tokenPayload.error_description || tokenPayload.error || "Google token exchange failed.");
    }
  } catch (error) {
    console.error("[google-auth] token exchange failed", error);
    return buildAuthErrorRedirect(request, mode, "Google sign-in could not be completed right now.");
  }

  let profile: GoogleUserInfo;
  try {
    const profileRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokenPayload.access_token}` },
      cache: "no-store",
    });
    profile = await profileRes.json().catch(() => ({}));
    if (!profileRes.ok || !profile.email || !profile.email_verified) {
      throw new Error("Verified Google email is required.");
    }
  } catch (error) {
    console.error("[google-auth] userinfo fetch failed", error);
    return buildAuthErrorRedirect(request, mode, "Your Google account must provide a verified email.");
  }

  try {
    const auth = await authenticateGooglePlatformUser({
      email: profile.email!,
      firstName: profile.given_name || null,
      lastName: profile.family_name || null,
      name: profile.name || null,
    });

    const next =
      auth.isNewUser || !auth.profile.onboardingComplete
        ? "/onboarding/plan"
        : sanitizeInternalNext(flow.next, getDefaultGoogleNext(mode));

    // Return a 200 HTML response with Set-Cookie rather than a redirect.
    // Netlify CDN strips Set-Cookie headers from redirect (3xx) responses,
    // so the session cookie would never reach the browser via NextResponse.redirect.
    const destination = new URL(next, request.url).toString();
    const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${destination}"><title>Signing in…</title></head><body></body></html>`;
    const response = new NextResponse(html, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
    return setCurrentUserSessionOnResponse(response, auth.userId);
  } catch (error) {
    console.error("[google-auth] platform user sync failed", error);
    return buildAuthErrorRedirect(request, mode, "We could not finish signing you in with Google.");
  }
}
