import { NextResponse } from "next/server";
import { clearUserSession } from "@/lib/user-auth";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  await clearUserSession();
  return NextResponse.json({ ok: true });
}
