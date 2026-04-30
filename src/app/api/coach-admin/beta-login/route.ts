import { NextRequest, NextResponse } from "next/server";
import { ensureCoachAdminUser } from "@/lib/billing";
import {
  getCoachAdminBetaAutoLoginConfig,
  setCoachAdminSessionOnResponse,
} from "@/lib/coach-admin-auth";

function getSafeNext(value: string | null) {
  const next = (value || "").trim();
  if (!next.startsWith("/") || next.startsWith("//")) return "/coach-admin";
  return next;
}

export async function GET(request: NextRequest) {
  const beta = getCoachAdminBetaAutoLoginConfig();
  if (!beta) {
    return NextResponse.redirect(new URL("/coach-admin", request.url));
  }

  try {
    await ensureCoachAdminUser(beta.email, beta.role);
  } catch (error) {
    console.error("[coach-admin-beta-login] failed to sync admin user", error);
  }

  const next = getSafeNext(request.nextUrl.searchParams.get("next"));
  const response = NextResponse.redirect(new URL(next, request.url));
  return setCoachAdminSessionOnResponse(response, beta.email, beta.role);
}
