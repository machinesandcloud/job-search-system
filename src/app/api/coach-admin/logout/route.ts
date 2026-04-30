import { NextResponse } from "next/server";
import { clearCoachAdminSession } from "@/lib/coach-admin-auth";

export async function POST() {
  await clearCoachAdminSession();
  return NextResponse.json({ ok: true });
}
