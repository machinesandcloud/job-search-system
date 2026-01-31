import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./db";

const COOKIE_NAME = "admin_session";

function getSecret() {
  return process.env.APP_SECRET || "local-dev-secret";
}

export function signSession(payload: Record<string, any>) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
  return `${data}.${signature}`;
}

export function verifySession(token: string) {
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;
  const expected = crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
  if (payload.exp && Date.now() > payload.exp) return null;
  return payload;
}

export async function setAdminSession(email: string) {
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const token = signSession({ email, exp });
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function getAdminSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function clearAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export async function verifyAdminMagicToken(token: string) {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const record = await prisma.adminToken.findFirst({
    where: {
      tokenHash,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
  });
  if (!record) return null;
  await prisma.adminToken.update({
    where: { id: record.id },
    data: { usedAt: new Date() },
  });
  return record.email;
}

export function isAdminAllowed(email: string) {
  const allowlist = (process.env.ADMIN_EMAIL_ALLOWLIST || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  if (!allowlist.length) return false;
  return allowlist.includes(email.toLowerCase());
}
