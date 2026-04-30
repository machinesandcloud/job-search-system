import { NextResponse } from "next/server";
import { clearCoachAdminSessionOnResponse } from "@/lib/coach-admin-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  return clearCoachAdminSessionOnResponse(response);
}
