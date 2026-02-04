import { NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validation";
import { isAdminAllowed } from "@/lib/auth";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json();
  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const email = parsed.data.email.toLowerCase();
  if (!isAdminAllowed(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  return NextResponse.json(
    {
      error: "Admin login is disabled in this build. Set up admin auth when needed.",
    },
    { status: 501 }
  );
}
