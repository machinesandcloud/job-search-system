import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./db";

const COOKIE_NAME = "user_session";
const SESSION_TTL_HOURS = 24 * 7;

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err);
      else resolve(key as Buffer);
    });
  });
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err);
      else resolve(key as Buffer);
    });
  });
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), derived);
}

export async function createUserSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000);

  await prisma.userSession.create({
    data: { userId, tokenHash, expiresAt },
  });

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_HOURS * 60 * 60,
  });
}

export async function getUserSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const tokenHash = hashToken(token);
  const session = await prisma.userSession.findFirst({
    where: {
      tokenHash,
      expiresAt: { gt: new Date() },
    },
    include: { user: true },
  });
  return session?.user || null;
}

export async function clearUserSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.userSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  store.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}
