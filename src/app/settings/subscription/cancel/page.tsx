import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { syncCurrentUserToBillingIdentity, getReadablePlanName, getPlanIncludedMonthlyCredits } from "@/lib/billing";
import { CancelSubscriptionForm } from "./cancel-form";

export default async function CancelSubscriptionPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  const subscription = identity?.subscription;

  if (!subscription || (subscription.status !== "active" && subscription.status !== "trialing")) {
    redirect("/settings");
  }

  const planName = getReadablePlanName(subscription.planName, subscription.stripePriceId);
  const credits = getPlanIncludedMonthlyCredits(subscription.planName, subscription.stripePriceId);
  const renewalDate = subscription.currentPeriodEnd
    ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(subscription.currentPeriodEnd))
    : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--s-bg, #F8FAFC)", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ background: "var(--s-card, #fff)", borderBottom: "1px solid var(--s-bd, #E2E8F0)", padding: "0 32px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/settings/subscription" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="#64748B" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <path d="M10 3L5 8l5 5"/>
            </svg>
            <span style={{ fontSize: 13.5, color: "#64748B", fontWeight: 500 }}>Billing</span>
          </a>
          <span style={{ fontSize: 13, color: "var(--s-text3, #94A3B8)" }}>Cancel subscription</span>
        </div>
      </div>

      <div style={{ maxWidth: 620, margin: "0 auto", padding: "40px 32px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--s-text, #0F172A)", letterSpacing: "-0.03em", margin: "0 0 6px" }}>Cancel your subscription</h1>
        <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 32px", lineHeight: 1.6 }}>
          We&apos;re sorry to see you go. Your access will continue until the end of your current billing period.
        </p>

        {/* Current plan summary */}
        <div style={{ background: "var(--s-card, #fff)", borderRadius: 16, border: "1px solid var(--s-bd, #E2E8F0)", padding: "20px 22px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--s-text3, #94A3B8)", marginBottom: 14 }}>Current plan</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "var(--s-text2, #64748B)" }}>Plan</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--s-text, #0F172A)" }}>{planName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "var(--s-text2, #64748B)" }}>Monthly credits</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--s-text, #0F172A)" }}>{credits?.toLocaleString() ?? "—"}</span>
          </div>
          {renewalDate && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "var(--s-text2, #64748B)" }}>Access ends</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--s-text, #0F172A)" }}>{renewalDate}</span>
            </div>
          )}
        </div>

        {/* What you'll lose */}
        <div style={{ background: "rgba(239,68,68,0.04)", borderRadius: 16, border: "1px solid rgba(239,68,68,0.18)", padding: "20px 22px", marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", marginBottom: 12 }}>What you&apos;ll lose after cancellation</div>
          {[
            "Access to all AI coaching tools",
            `${credits?.toLocaleString() ?? "Your"} monthly credits`,
            "Resume, interview, and career stage tools",
            "All saved documents and session history",
          ].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="#DC2626" strokeWidth="1.8" style={{ width: 13, height: 13, flexShrink: 0 }}>
                <path d="M12 4L4 12M4 4l8 8"/>
              </svg>
              <span style={{ fontSize: 13, color: "#64748B" }}>{item}</span>
            </div>
          ))}
        </div>

        <CancelSubscriptionForm planName={planName} renewalDate={renewalDate} />
      </div>
    </div>
  );
}
