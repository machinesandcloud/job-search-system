import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/user-auth";

export async function GET() {
  const session = await getUserSession();
  if (!session) {
    return NextResponse.json({ ok: false });
  }
  return NextResponse.json({ ok: true, session });
}
