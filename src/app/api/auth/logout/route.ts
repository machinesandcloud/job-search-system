import { NextResponse } from "next/server";
import { clearCurrentUserSession, sessionCookieName } from "@/lib/mvp/auth";

function buildLogoutResponse(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  response.cookies.set(sessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export async function POST(request: Request) {
  await clearCurrentUserSession();
  return buildLogoutResponse(request);
}

export async function GET(request: Request) {
  await clearCurrentUserSession();
  return buildLogoutResponse(request);
}
