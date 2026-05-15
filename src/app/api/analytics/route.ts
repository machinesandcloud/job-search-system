import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { logAppEvent, syncCurrentUserToBillingIdentity } from "@/lib/billing";
import { isDatabaseReady } from "@/lib/db";

export const runtime = "nodejs";

// Allowlist of client-side funnel and UX events
const ALLOWED_EVENTS = new Set([
  "viewed_pricing_page",
  "scrolled_pricing_comparison",
  "clicked_plan_card",
  "clicked_billing_toggle",
  "clicked_start_free",
  "clicked_upgrade_from_preview",
  "clicked_upgrade_from_limit",
  "entered_checkout",
  "abandoned_checkout",
  "viewed_annual_plan",
  "clicked_annual_upgrade",
  "viewed_cancel_page",
  "viewed_cancel_offer",
  "dismissed_cancel_offer",
  "viewed_referral_page",
  "clicked_copy_referral_link",
  "viewed_onboarding_intake",
  "completed_onboarding_intake",
  "skipped_onboarding_intake",
  "viewed_token_warning_banner",
  "clicked_token_warning_upgrade",
  "session_started",
  "session_abandoned",
  "feature_discovered",
  "upgrade_modal_shown",
  "upgrade_modal_clicked",
  "upgrade_modal_dismissed",
]);

// POST /api/analytics
// Body: { event, metadata? }
// Client-side funnel analytics. Auth is optional — anonymous events are accepted.
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as {
    event?: string;
    metadata?: Record<string, unknown>;
  };

  const eventName = typeof body.event === "string" ? body.event.trim() : null;
  if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
    return NextResponse.json({ error: "Unknown event." }, { status: 400 });
  }

  if (!isDatabaseReady()) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let accountId: string | null = null;
  let userId: string | null = null;
  try {
    const currentUserId = await getCurrentUserId();
    if (currentUserId) {
      const identity = await syncCurrentUserToBillingIdentity();
      accountId = identity?.account?.id ?? null;
      userId = identity?.user?.id ?? null;
    }
  } catch { /* log anonymously */ }

  await logAppEvent(eventName, {
    accountId,
    userId,
    metadataJson: { ...(body.metadata ?? {}), source: "client" },
  });

  return NextResponse.json({ ok: true });
}
