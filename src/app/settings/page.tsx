import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { syncCurrentUserToBillingIdentity } from "@/lib/billing";
import { CancelledBanner } from "./cancelled-banner";
import { SettingsThemeWrapper } from "./theme-wrapper";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ cancelled?: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  const user = identity?.user;
  const subscription = identity?.subscription;
  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || user?.email?.split("@")[0] || "Your account";
  const isPaid = subscription?.status === "active" || subscription?.status === "trialing";
  const params = await searchParams;
  const cancelled = params.cancelled === "1";

  return (
    <SettingsThemeWrapper>
      <div style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        {/* Header */}
        <div style={{ background: "var(--s-card, #fff)", borderBottom: "1px solid var(--s-bd, #E2E8F0)", padding: "0 32px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="#64748B" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path d="M10 3L5 8l5 5"/>
              </svg>
              <span style={{ fontSize: 13.5, color: "#64748B", fontWeight: 500 }}>Back to dashboard</span>
            </Link>
            <span style={{ fontSize: 13, color: "var(--s-text3, #94A3B8)" }}>Settings</span>
          </div>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 32px" }}>
          <CancelledBanner show={cancelled} />
          {/* User identity header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #3B82F6, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "white", flexShrink: 0 }}>
              {fullName.split(/\s+/).slice(0, 2).map((p: string) => p[0]?.toUpperCase() ?? "").join("") || "?"}
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--s-text, #0F172A)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{fullName}</div>
              <div style={{ fontSize: 13, color: "var(--s-text2, #64748B)", marginTop: 2 }}>{user?.email ?? ""}</div>
            </div>
          </div>

          {/* Settings navigation */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
            {[
              {
                href: "/settings/profile",
                color: "#2563EB",
                icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 20, height: 20 }}><circle cx="10" cy="7" r="3.5"/><path d="M3 17c0-3.314 3.134-5.5 7-5.5s7 2.186 7 5.5"/></svg>,
                title: "Profile",
                description: "Update your name, email address, and password.",
              },
              {
                href: "/settings/subscription",
                color: "#1459CC",
                icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 20, height: 20 }}><rect x="2" y="4" width="16" height="13" rx="2"/><path d="M2 8h16M6 2v4M14 2v4"/></svg>,
                title: "Subscription & Billing",
                description: isPaid
                  ? "Manage your plan, update payment, or cancel."
                  : "Upgrade to a paid plan to unlock the full Zari experience.",
              },
              {
                href: "/dashboard",
                color: "#059669",
                icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: 20, height: 20 }}><path d="M3 3h12a1 1 0 011 1v7a1 1 0 01-1 1H6l-4 3V4a1 1 0 011-1z"/></svg>,
                title: "Back to Zari",
                description: "Return to your AI coaching workspace.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: "var(--s-card, #fff)", borderRadius: 16, border: "1px solid var(--s-bd, #E2E8F0)", textDecoration: "none" }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 11, background: item.color + "12", display: "flex", alignItems: "center", justifyContent: "center", color: item.color, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--s-text, #0F172A)", marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "var(--s-text2, #64748B)", lineHeight: 1.5 }}>{item.description}</div>
                </div>
                <svg viewBox="0 0 16 16" fill="none" stroke="var(--s-bd, #CBD5E1)" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0 }}>
                  <path d="M6 4l4 4-4 4"/>
                </svg>
              </Link>
            ))}
          </div>

          {/* Danger zone */}
          <div style={{ padding: "20px 24px", background: "var(--s-card, #fff)", borderRadius: 16, border: "1px solid rgba(239,68,68,0.2)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#DC2626", marginBottom: 12 }}>
              Danger zone
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--s-text, #0F172A)" }}>Delete account</div>
                <div style={{ fontSize: 13, color: "var(--s-text2, #64748B)", marginTop: 2, maxWidth: 400, lineHeight: 1.5 }}>
                  Permanently delete your account and all data. This cannot be undone.
                </div>
              </div>
              <a
                href="mailto:support@zaricoach.com?subject=Account%20deletion%20request"
                style={{ fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 9, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.06)", color: "#DC2626", textDecoration: "none", whiteSpace: "nowrap" as const }}
              >
                Request deletion
              </a>
            </div>
          </div>
        </div>
      </div>
    </SettingsThemeWrapper>
  );
}
