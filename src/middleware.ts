import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "zari_session";

const PROTECTED_PATHS = [
  "/dashboard",
  "/onboarding",
  "/settings",
  "/interview",
  "/coach",
  "/billing",
  "/recap",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some(p => pathname === p || pathname.startsWith(p + "/"));
  if (!isProtected) return NextResponse.next();

  const session = request.cookies.get(SESSION_COOKIE);
  if (!session?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/settings/:path*",
    "/interview/:path*",
    "/coach/:path*",
    "/billing/:path*",
    "/recap/:path*",
  ],
};
