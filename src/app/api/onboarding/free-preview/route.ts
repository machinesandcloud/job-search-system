import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import {
  FREE_PREVIEW_COOKIE_NAME,
  FREE_PREVIEW_COOKIE_TTL_SECONDS,
  buildFreePreviewCookieValue,
} from "@/lib/free-preview";
import { logAppEvent, syncCurrentUserToBillingIdentity } from "@/lib/billing";

export async function GET(request: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  if (identity?.account && identity?.user) {
    await logAppEvent("free_preview_started", {
      accountId: identity.account.id,
      userId: identity.user.id,
      metadataJson: {
        source: "onboarding_plan",
      },
    }).catch(() => null);
  }

  const response = NextResponse.redirect(new URL("/dashboard?preview=1", request.url));
  response.cookies.set(FREE_PREVIEW_COOKIE_NAME, buildFreePreviewCookieValue(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: FREE_PREVIEW_COOKIE_TTL_SECONDS,
  });
  return response;
}
