import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { syncCurrentUserToBillingIdentity } from "@/lib/billing";
import { ProfileSettingsForm } from "./profile-form";
import { SettingsThemeWrapper } from "../theme-wrapper";

export default async function ProfileSettingsPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  const user = identity?.user;

  return (
    <SettingsThemeWrapper>
      <div style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        <div style={{ background: "var(--s-card, #fff)", borderBottom: "1px solid var(--s-bd, #E2E8F0)", padding: "0 32px" }}>
          <div style={{ maxWidth: 620, margin: "0 auto", padding: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/settings" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="#64748B" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path d="M10 3L5 8l5 5"/>
              </svg>
              <span style={{ fontSize: 13.5, color: "#64748B", fontWeight: 500 }}>Settings</span>
            </a>
            <span style={{ fontSize: 13, color: "var(--s-text3, #94A3B8)" }}>Profile</span>
          </div>
        </div>

        <div style={{ maxWidth: 620, margin: "0 auto", padding: "40px 32px" }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--s-text, #0F172A)", letterSpacing: "-0.03em", margin: "0 0 6px" }}>Profile settings</h1>
          <p style={{ fontSize: 14, color: "var(--s-text2, #64748B)", margin: "0 0 32px" }}>Update your name and change your password.</p>

          <ProfileSettingsForm
            initialFirstName={user?.firstName ?? ""}
            initialLastName={user?.lastName ?? ""}
            email={user?.email ?? ""}
            hasPassword={Boolean(user?.passwordHash)}
          />
        </div>
      </div>
    </SettingsThemeWrapper>
  );
}
