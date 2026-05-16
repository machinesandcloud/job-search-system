import crypto from "node:crypto";

export type GoogleAuthMode = "login" | "signup";

const GOOGLE_SCOPES = ["openid", "email", "profile"];

export function getGoogleCredentials() {
  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
  const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || "").trim();
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export function getDefaultGoogleNext(mode: GoogleAuthMode) {
  return mode === "signup" ? "/onboarding/plan" : "/dashboard";
}

export function sanitizeInternalNext(next: string | null | undefined, fallback = "/dashboard") {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}

// State encodes mode, next, redirectUri, and a random nonce.
// This makes the flow stateless (no cookie) and host-agnostic (works on any
// Netlify URL or custom domain without changing env vars or Google Console).
export function encodeGoogleOauthState(input: {
  mode: GoogleAuthMode;
  next: string;
  redirectUri: string;
}): string {
  const payload = {
    nonce: crypto.randomBytes(24).toString("hex"),
    mode: input.mode,
    next: input.next,
    redirectUri: input.redirectUri,
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

export function decodeGoogleOauthState(state: string | null | undefined): {
  nonce: string;
  mode: GoogleAuthMode;
  next: string;
  redirectUri: string;
} | null {
  if (!state) return null;
  try {
    const parsed = JSON.parse(Buffer.from(state, "base64url").toString("utf8")) as {
      nonce?: string;
      mode?: GoogleAuthMode;
      next?: string;
      redirectUri?: string;
    };
    if (
      !parsed.nonce ||
      (parsed.mode !== "login" && parsed.mode !== "signup") ||
      !parsed.redirectUri
    ) return null;
    return {
      nonce: parsed.nonce,
      mode: parsed.mode,
      next: sanitizeInternalNext(parsed.next, getDefaultGoogleNext(parsed.mode)),
      redirectUri: parsed.redirectUri,
    };
  } catch {
    return null;
  }
}

export function buildGoogleAuthUrl(input: {
  state: string;
  redirectUri: string;
}) {
  const creds = getGoogleCredentials();
  if (!creds) throw new Error("Google sign-in is not configured.");

  const params = new URLSearchParams({
    client_id: creds.clientId,
    redirect_uri: input.redirectUri,
    response_type: "code",
    scope: GOOGLE_SCOPES.join(" "),
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "select_account",
    state: input.state,
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
