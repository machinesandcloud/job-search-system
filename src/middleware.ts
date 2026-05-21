import { type NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/settings",
  "/onboarding",
  "/workspaces",
  "/recap",
  "/coach-admin",
  "/admin",
  "/portal",
  "/billing",
];

// Only checks cookie presence — full DB validation happens per-page via getCurrentUserId().
// Edge middleware doesn't have DB access, and the cookie may not be visible immediately
// after login (Edge/serverless timing). The page-level check is the authoritative guard.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (!isProtected) return NextResponse.next();

  const hasSession = request.cookies.has("zari_session");
  if (!hasSession) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/onboarding/:path*",
    "/workspaces/:path*",
    "/recap/:path*",
    "/coach-admin/:path*",
    "/admin/:path*",
    "/portal/:path*",
    "/billing/:path*",
  ],
};
