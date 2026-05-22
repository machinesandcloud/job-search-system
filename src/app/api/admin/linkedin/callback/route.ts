import { NextResponse, type NextRequest } from "next/server";
import { getCoachAdminSession } from "@/lib/coach-admin-auth";
import {
  exchangeCodeForToken,
  fetchMemberInfo,
  fetchAdminOrganizations,
  saveCredentials,
} from "@/lib/linkedin";

export const runtime = "nodejs";

const ADMIN_BASE =
  (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "") || "https://app.zaricoach.com";

export async function GET(request: NextRequest) {
  const session = await getCoachAdminSession();
  if (!session || session.role !== "admin") {
    return NextResponse.redirect(`${ADMIN_BASE}/coach-admin?linkedin_error=unauthorized`);
  }

  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      `${ADMIN_BASE}/coach-admin?linkedin_error=${encodeURIComponent(error)}`
    );
  }

  if (!code) {
    return NextResponse.redirect(`${ADMIN_BASE}/coach-admin?linkedin_error=no_code`);
  }

  // Verify CSRF state
  const storedState = request.cookies.get("li_oauth_state")?.value;
  if (!storedState || storedState !== state) {
    return NextResponse.redirect(`${ADMIN_BASE}/coach-admin?linkedin_error=state_mismatch`);
  }

  try {
    const tokens = await exchangeCodeForToken(code);
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

    const memberInfo = await fetchMemberInfo(tokens.access_token);
    const memberUrn = memberInfo.sub;

    // Try to fetch organization the member admins — use first result or fall back to env var
    let organizationUrn = process.env.LINKEDIN_ORGANIZATION_URN ?? null;
    const orgs = await fetchAdminOrganizations(tokens.access_token);
    if (orgs.length > 0) {
      organizationUrn = orgs[0].id;
      console.log(`[linkedin/callback] Found org: ${orgs[0].name} (${orgs[0].id})`);
    } else if (organizationUrn) {
      console.log(`[linkedin/callback] Using env org URN: ${organizationUrn}`);
    } else {
      console.warn("[linkedin/callback] No org found and LINKEDIN_ORGANIZATION_URN not set — will post as member");
    }

    await saveCredentials({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token ?? null,
      expiresAt,
      organizationUrn,
      memberUrn,
    });

    const response = NextResponse.redirect(`${ADMIN_BASE}/coach-admin?linkedin_connected=1`);
    response.cookies.set("li_oauth_state", "", { maxAge: 0, path: "/" });
    return response;
  } catch (err) {
    console.error("[linkedin/callback] error:", err);
    const msg = err instanceof Error ? err.message : "unknown_error";
    return NextResponse.redirect(
      `${ADMIN_BASE}/coach-admin?linkedin_error=${encodeURIComponent(msg)}`
    );
  }
}
