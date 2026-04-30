import { NextRequest, NextResponse } from "next/server";
import { ensureCoachAdminUser } from "@/lib/billing";
import {
  getCoachAdminBetaAutoLoginConfig,
  setCoachAdminSession,
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

  await ensureCoachAdminUser(beta.email, beta.role);
  await setCoachAdminSession(beta.email, beta.role);

  const next = getSafeNext(request.nextUrl.searchParams.get("next"));
  return NextResponse.redirect(new URL(next, request.url));
}
