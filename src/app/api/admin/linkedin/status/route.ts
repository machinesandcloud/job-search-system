import { NextResponse } from "next/server";
import { getCoachAdminSession } from "@/lib/coach-admin-auth";
import { getCredentials } from "@/lib/linkedin";

export const runtime = "nodejs";

export async function GET() {
  const session = await getCoachAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cred = await getCredentials();

  if (!cred || cred.accessToken === "__pending__") {
    return NextResponse.json({ connected: false });
  }

  const isExpired = cred.expiresAt.getTime() < Date.now();
  const expiresInDays = Math.ceil((cred.expiresAt.getTime() - Date.now()) / 86_400_000);

  return NextResponse.json({
    connected: true,
    expired: isExpired,
    expiresInDays: isExpired ? 0 : expiresInDays,
    organizationUrn: cred.organizationUrn ?? null,
    memberUrn: cred.memberUrn ?? null,
    postingAs: cred.organizationUrn ? "organization" : "member",
  });
}
