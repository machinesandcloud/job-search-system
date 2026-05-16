import crypto from "node:crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";

export const sessionCookieName = "zari_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

function hashSessionToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function parseSessionCookie(value: string) {
  const separatorIndex = value.indexOf(".");
  if (separatorIndex === -1) {
    return { userId: value, token: null as string | null };
  }

  return {
    userId: value.slice(0, separatorIndex),
    token: value.slice(separatorIndex + 1) || null,
  };
}

export async function getCurrentUserId() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(sessionCookieName)?.value;
  if (!raw) return null;

  const parsed = parseSessionCookie(raw);
  if (!parsed.token) return parsed.userId;
  if (!isDatabaseReady()) return parsed.userId;

  try {
    const session = await prisma.appSession.findUnique({
      where: { tokenHash: hashSessionToken(parsed.token) },
      select: { userId: true, expiresAt: true },
    });

    if (!session) return null;

    if (session.expiresAt.getTime() < Date.now()) {
      await prisma.appSession.deleteMany({
        where: { tokenHash: hashSessionToken(parsed.token) },
      });
      return null;
    }

    return session.userId === parsed.userId ? session.userId : null;
  } catch (error) {
    // DB unavailable or AppSession table missing — trust the cookie value so sessions
    // survive DB outages and deployments before migrations have run.
    console.error("[mvp-auth] failed to resolve current user session, falling back to cookie userId", error);
    return parsed.userId;
  }
}

export async function setCurrentUserSessionOnResponse(response: NextResponse, userId: string) {
  if (!isDatabaseReady()) {
    response.cookies.set(sessionCookieName, userId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });
    return response;
  }

  try {
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.appSession.create({
      data: {
        userId,
        tokenHash: hashSessionToken(token),
        expiresAt: new Date(Date.now() + SESSION_TTL_SECONDS * 1000),
      },
    });

    response.cookies.set(sessionCookieName, `${userId}.${token}`, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });
  } catch (error) {
    console.error("[mvp-auth] failed to create app session, falling back to legacy cookie", error);
    response.cookies.set(sessionCookieName, userId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });
  }
  return response;
}

export async function clearCurrentUserSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(sessionCookieName)?.value;
  if (!raw) return;

  const parsed = parseSessionCookie(raw);
  if (!parsed.token || !isDatabaseReady()) return;

  try {
    await prisma.appSession.deleteMany({
      where: { tokenHash: hashSessionToken(parsed.token) },
    });
  } catch (error) {
    console.error("[mvp-auth] failed to clear app session", error);
  }
}
