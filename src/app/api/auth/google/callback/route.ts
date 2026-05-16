import { NextResponse } from "next/server";
import {
  decodeGoogleOauthState,
  getDefaultGoogleNext,
  getGoogleCredentials,
  sanitizeInternalNext,
} from "@/lib/google-auth";
import { createActivationToken } from "@/lib/mvp/auth";
import { authenticateGooglePlatformUser } from "@/lib/platform-users";

export const maxDuration = 15;
export const runtime = "nodejs";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleUserInfo = {
  email?: string;
  email_verified?: boolean;
  given_name?: string;
  family_name?: string;
  name?: string;
};

function authError(request: Request, mode: "login" | "signup", message: string) {
  const dest = new URL(mode === "signup" ? "/signup" : "/login", request.url);
  dest.searchParams.set("authError", message);
  return NextResponse.redirect(dest);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const stateParam = url.searchParams.get("state");
  const flow = decodeGoogleOauthState(stateParam);
  const mode = flow?.mode || "login";
  const code = url.searchParams.get("code");
  const errorParam = url.searchParams.get("error");

  if (!flow) return authError(request, mode, "Google sign-in expired. Please try again.");
  if (errorParam) return authError(request, mode, errorParam === "access_denied" ? "Google sign-in was cancelled." : "Google sign-in failed.");
  if (!code) return authError(request, mode, "Google did not return a login code.");

  const creds = getGoogleCredentials();
  if (!creds) return authError(request, mode, "Google sign-in is not configured.");

  // Use the redirectUri that was encoded at the start of the flow — must match exactly.
  const redirectUri = flow.redirectUri;

  let tokenPayload: GoogleTokenResponse;
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: creds.clientId,
        client_secret: creds.clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });
    tokenPayload = await tokenRes.json().catch(() => ({}));
    if (!tokenRes.ok || !tokenPayload.access_token) {
      throw new Error(tokenPayload.error_description || tokenPayload.error || "Token exchange failed.");
    }
  } catch (error) {
    console.error("[google-auth] token exchange failed", error);
    return authError(request, mode, "Google sign-in could not be completed right now.");
  }

  let profile: GoogleUserInfo;
  try {
    const profileRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokenPayload.access_token}` },
      cache: "no-store",
    });
    profile = await profileRes.json().catch(() => ({}));
    if (!profileRes.ok || !profile.email || !profile.email_verified) throw new Error("Verified Google email required.");
  } catch (error) {
    console.error("[google-auth] userinfo fetch failed", error);
    return authError(request, mode, "Your Google account must provide a verified email.");
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

    // Issue a short-lived signed token and redirect to /api/auth/activate.
    // The activate endpoint runs on whatever domain the browser actually lands on
    // (which may differ from this callback's domain if Netlify redirects to a
    // deploy-specific URL), and sets the session cookie there.
    const activationToken = createActivationToken(auth.userId);
    const activateUrl = new URL("/api/auth/activate", request.url);
    activateUrl.searchParams.set("token", activationToken);
    activateUrl.searchParams.set("next", next);
    return NextResponse.redirect(activateUrl, { status: 302 });
  } catch (error) {
    console.error("[google-auth] platform user sync failed", error);
    return authError(request, mode, "We could not finish signing you in with Google.");
  }
}
