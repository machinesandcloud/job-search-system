import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { syncCurrentUserToBillingIdentity, getReadablePlanName, getPlanIncludedMonthlyCredits } from "@/lib/billing";
import { BillingPortalButton } from "./billing-portal-button";

export const metadata = { title: "Subscription & Billing – Zari" };

export default async function SubscriptionPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  const subscription = identity?.subscription;
  const isPaid = subscription?.status === "active" || subscription?.status === "trialing";

  const planName = subscription
    ? getReadablePlanName(subscription.planName, subscription.stripePriceId)
    : "Free";
  const credits = subscription ? getPlanIncludedMonthlyCredits(subscription.planName, subscription.stripePriceId) : null;
  const renewalDate = subscription?.currentPeriodEnd
    ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(subscription.currentPeriodEnd))
    : null;
  const statusLabel = subscription?.status
    ? subscription.status.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
    : "No subscription";
  const isPaymentIssue = subscription?.status === "past_due" || subscription?.status === "unpaid" || subscription?.status === "incomplete";

  return (
    <div style={{ minHeight: "100vh", background: "var(--s-bg, #F8FAFC)", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ background: "var(--s-card, #fff)", borderBottom: "1px solid var(--s-bd, #E2E8F0)", padding: "0 32px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/settings" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="#64748B" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <path d="M10 3L5 8l5 5"/>
            </svg>
            <span style={{ fontSize: 13.5, color: "#64748B", fontWeight: 500 }}>Settings</span>
          </a>
          <span style={{ fontSize: 13, color: "#94A3B8" }}>Subscription & Billing</span>
        </div>
      </div>

      <div style={{ maxWidth: 620, margin: "0 auto", padding: "40px 32px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--s-text, #0F172A)", letterSpacing: "-0.03em", margin: "0 0 6px" }}>
          Subscription & Billing
        </h1>
        <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 32px", lineHeight: 1.6 }}>
          Manage your plan, update payment information, and download invoices.
        </p>

        {isPaymentIssue && (
          <div style={{ background: "rgba(239,68,68,0.08)", borderRadius: 14, border: "1px solid rgba(239,68,68,0.25)", padding: "16px 20px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="#DC2626" strokeWidth="2" style={{ width: 18, height: 18, flexShrink: 0, marginTop: 1 }}>
              <path d="M10 3L18 17H2L10 3z"/><path d="M10 9v4M10 15h.01"/>
            </svg>
            <div>
              <p style={{ fontSize: 13.5, fontWeight: 700, color: "#DC2626", marginBottom: 4 }}>Payment issue detected</p>
              <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.55 }}>
                Your subscription has a payment problem. Update your payment method to keep access.
              </p>
            </div>
          </div>
        )}

        {/* Current plan card */}
        <div style={{ background: "var(--s-card, #fff)", borderRadius: 16, border: "1px solid var(--s-bd, #E2E8F0)", padding: "22px 24px", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#94A3B8", marginBottom: 16 }}>
            Current plan
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "#2563EB14", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="#2563EB" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
                <rect x="2" y="4" width="16" height="13" rx="2"/><path d="M2 8h16M6 2v4M14 2v4"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "var(--s-text, #0F172A)", letterSpacing: "-0.02em" }}>{planName}</div>
              <div style={{ fontSize: 12.5, color: isPaid ? "#059669" : "#94A3B8", fontWeight: 600, marginTop: 2 }}>{statusLabel}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
            {credits != null && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#64748B" }}>Monthly credits</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--s-text, #0F172A)" }}>{credits.toLocaleString()}</span>
              </div>
            )}
            {renewalDate && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#64748B" }}>
                  {subscription?.status === "canceled" ? "Access ends" : "Next renewal"}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--s-text, #0F172A)" }}>{renewalDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, marginBottom: 32 }}>
          {isPaid ? (
            <>
              <BillingPortalButton label="Manage billing & invoices" description="Update payment method, download invoices, change plan" />
              <Link
                href="/settings/subscription/cancel"
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "var(--s-card, #fff)", borderRadius: 14, border: "1px solid var(--s-bd, #E2E8F0)", textDecoration: "none" }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(220,38,38,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="#DC2626" strokeWidth="1.6" style={{ width: 18, height: 18 }}>
                    <path d="M6 6l8 8M14 6l-8 8"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#DC2626", marginBottom: 2 }}>Cancel subscription</div>
                  <div style={{ fontSize: 13, color: "#64748B" }}>Your access continues until the end of the billing period.</div>
                </div>
                <svg viewBox="0 0 16 16" fill="none" stroke="#CBD5E1" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0 }}>
                  <path d="M6 4l4 4-4 4"/>
                </svg>
              </Link>
            </>
          ) : (
            <Link
              href="/onboarding/plan"
              style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "#2563EB", borderRadius: 14, border: "none", textDecoration: "none" }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.6" style={{ width: 18, height: 18 }}>
                  <path d="M10 5v10M5 10h10"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 2 }}>Upgrade to a paid plan</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Unlock all AI coaching tools and features.</div>
              </div>
            </Link>
          )}
        </div>

        <div style={{ borderTop: "1px solid var(--s-bd, #E2E8F0)", paddingTop: 20 }}>
          <a href="/settings" style={{ fontSize: 13.5, color: "#64748B", textDecoration: "none", fontWeight: 500 }}>← Back to settings</a>
        </div>
      </div>
    </div>
  );
}
