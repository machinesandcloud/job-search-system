import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ensureCoachAdminUser, type CoachAdminRole, getCoachAdminRole } from "@/lib/billing";

const COOKIE_NAME = "coach_admin_session";

function getSecret() {
  return process.env.APP_SECRET || "local-dev-secret";
}

function roleWeight(role: CoachAdminRole) {
  return role === "admin" ? 2 : 1;
}

function isTruthy(value: string | undefined) {
  const normalized = `${value || ""}`.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

export function getCoachAdminBetaAutoLoginConfig() {
  const raw = (process.env.COACH_ADMIN_BETA_AUTO_LOGIN || "").trim();
  if (!raw) return null;

  const configuredEmail = raw.includes("@") ? raw.toLowerCase() : "";
  const fallbackEmail = (process.env.COACH_ADMIN_EMAIL_ALLOWLIST || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .find(Boolean) || "";

  const email = configuredEmail || (isTruthy(raw) ? fallbackEmail : "");
  if (!email) return null;

  const role = configuredEmail ? "admin" : getCoachAdminRole(email);
  if (!role) return null;

  return { email, role };
}

export function verifyCoachAdminPassword(password: string) {
  const expected = process.env.COACH_ADMIN_PASSWORD || "";
  return Boolean(expected) && password === expected;
}

function signSession(payload: Record<string, unknown>) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
  return `${data}.${signature}`;
}

function verifySession(token: string) {
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;
  const expected = crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as {
    email?: string;
    role?: CoachAdminRole;
    exp?: number;
  };
  if (!payload.email || !payload.role) return null;
  if (payload.exp && Date.now() > payload.exp) return null;
  return payload;
}

export async function setCoachAdminSession(email: string, role: CoachAdminRole) {
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const token = signSession({ email, role, exp });
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearCoachAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export async function getCoachAdminSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const session = verifySession(token);
  if (!session) return null;
  const betaSession = getCoachAdminBetaAutoLoginConfig();
  const configuredRole =
    betaSession?.email === (session.email || "").toLowerCase()
      ? betaSession.role
      : getCoachAdminRole(session.email || "");
  if (!configuredRole) return null;
  return { email: session.email!, role: configuredRole };
}

export async function requireCoachAdminSession(minRole: CoachAdminRole = "support") {
  const session = await getCoachAdminSession();
  if (!session || roleWeight(session.role) < roleWeight(minRole)) {
    const beta = getCoachAdminBetaAutoLoginConfig();
    if (beta) {
      redirect("/api/coach-admin/beta-login?next=/coach-admin");
    }
    redirect("/coach-admin");
  }
  return session;
}

export async function requireCoachAdminActor(minRole: CoachAdminRole = "support") {
  const session = await requireCoachAdminSession(minRole);
  const user = await ensureCoachAdminUser(session.email, session.role);
  if (!user) redirect("/coach-admin");
  return { session, user };
}
