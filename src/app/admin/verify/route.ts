import { NextResponse } from "next/server";
import { setAdminSession, verifyAdminMagicToken } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/admin", request.url));
  const email = await verifyAdminMagicToken(token);
  if (!email) return NextResponse.redirect(new URL("/admin", request.url));
  await setAdminSession(email);
  return NextResponse.redirect(new URL("/admin", request.url));
}
