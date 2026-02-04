import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

const COOKIE_NAME = "user_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const PASSWORD_PREFIX = "scrypt";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashed = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${PASSWORD_PREFIX}:${salt}:${hashed}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [prefix, salt, hashed] = stored.split(":");
  if (prefix !== PASSWORD_PREFIX || !salt || !hashed) return false;
  const computed = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(computed, "hex"), Buffer.from(hashed, "hex"));
}

export async function createUserSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await prisma.userSession.create({
    data: { userId, tokenHash, expiresAt },
  });
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
  return token;
}

export async function clearUserSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token) {
    const tokenHash = hashToken(token);
    await prisma.userSession.deleteMany({ where: { tokenHash } });
  }
  store.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export async function getUserSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const tokenHash = hashToken(token);
  const session = await prisma.userSession.findUnique({
    where: { tokenHash },
    include: { user: true },
  });
  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.userSession.delete({ where: { tokenHash } });
    return null;
  }
  return { userId: session.userId, email: session.user.email };
}

export async function attachAssessmentToUser(assessmentId: string, userId: string) {
  await prisma.assessment.update({
    where: { id: assessmentId },
    data: { userId },
  });
}
