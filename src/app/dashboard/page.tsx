import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ZariPortal } from "@/components/zari-portal";
import { getCurrentSubscriptionAccess, syncCurrentUserToBillingIdentity } from "@/lib/billing";
import { FREE_PREVIEW_COOKIE_NAME, hasFreePreviewAccess } from "@/lib/free-preview";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const cookieStore = await cookies();
  const freePreviewEnabled = hasFreePreviewAccess(
    cookieStore.get(FREE_PREVIEW_COOKIE_NAME)?.value,
    userId,
  );

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  if (identity?.user?.role === "admin" || identity?.user?.role === "support") {
    return <ZariPortal />;
  }

  const access = await getCurrentSubscriptionAccess().catch(() => ({ ok: true as const }));
  if ("ok" in access && access.ok) {
    return <ZariPortal />;
  }

  if (freePreviewEnabled) {
    return <ZariPortal />;
  }

  if ("status" in access && access.status === 401) redirect("/login");
  redirect("/onboarding/plan");

  return <ZariPortal />;
}
