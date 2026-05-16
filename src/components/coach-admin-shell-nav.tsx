"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ZariLogo } from "@/components/zari-logo";

// Sidebar is always dark — not affected by the main content theme toggle.
const S = {
  bg:           "#0D1117",
  border:       "rgba(255,255,255,0.07)",
  textActive:   "#F0F6FC",
  textInactive: "#6E7681",
  textMuted:    "#484F58",
  itemActiveBg: "rgba(255,255,255,0.07)",
  itemHoverBg:  "rgba(255,255,255,0.04)",
  iconActive:   "#58A6FF",
  iconInactive: "#484F58",
};

function NavIcon({ name, size = 16 }: { name: "home" | "tickets" | "users" | "sparkles" | "automation" | "revenue"; size?: number }) {
  const props = { viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, width: size, height: size, style: { display: "block", flexShrink: 0 } };
  switch (name) {
    case "home":
      return <svg {...props}><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9 20v-5h6v5" /></svg>;
    case "tickets":
      return <svg {...props}><path d="M7 18h7.5A4.5 4.5 0 0 0 19 13.5V8.8A2.8 2.8 0 0 0 16.2 6H7.8A2.8 2.8 0 0 0 5 8.8v7.4L7 18Zm3-6h4m-7-3h10" /></svg>;
    case "users":
      return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="3.25" /><path d="M21 21v-2a4 4 0 0 0-3-3.87M16.5 3.13a3.25 3.25 0 0 1 0 6.74" /></svg>;
    case "sparkles":
      return <svg {...props}><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" /><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" /></svg>;
    case "automation":
      return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" /></svg>;
    case "revenue":
      return <svg {...props}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
  }
}

const NAV_ITEMS = [
  { href: "/coach-admin",            label: "Overview",   icon: "home"       as const },
  { href: "/coach-admin/revenue",    label: "Revenue",    icon: "revenue"    as const },
  { href: "/coach-admin/accounts",   label: "Accounts",   icon: "users"      as const },
  { href: "/coach-admin/tickets",    label: "Support",    icon: "tickets"    as const },
  { href: "/coach-admin/automation", label: "Automation", icon: "automation" as const },
  { href: "/coach-admin#ai-usage",   label: "AI Usage",   icon: "sparkles"   as const },
];

function getInitials(email: string) {
  const local = email.split("@")[0] || "A";
  return local.split(/[^a-z0-9]/i).filter(Boolean).slice(0, 2).map(p => p[0]?.toUpperCase() ?? "").join("") || local.slice(0, 2).toUpperCase();
}

export function CoachAdminShellNav({ email, role, isDark, onToggleTheme }: { email: string; role: string; isDark: boolean; onToggleTheme: () => void }) {
  const pathname = usePathname();
  const initials = getInitials(email);

  return (
    <aside style={{ width: 212, flexShrink: 0, background: S.bg, display: "flex", flexDirection: "column", borderRight: `1px solid ${S.border}`, overflow: "hidden" }}>

      {/* ── Logo ── */}
      <div style={{ height: 48, padding: "0 16px", display: "flex", alignItems: "center", gap: 9, borderBottom: `1px solid ${S.border}`, flexShrink: 0 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flex: 1, minWidth: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ZariLogo size={13} />
          </div>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: S.textActive, letterSpacing: "-0.03em" }}>Zari</span>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: "#58A6FF", background: "rgba(56,139,253,0.12)", border: "1px solid rgba(56,139,253,0.25)", borderRadius: 5, padding: "1px 5px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Admin</span>
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: "8px 8px", display: "flex", flexDirection: "column", gap: 1, overflowY: "auto" }}>

        {/* Section label */}
        <div style={{ fontSize: 10, fontWeight: 600, color: S.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", padding: "6px 10px 4px" }}>
          Navigation
        </div>

        {NAV_ITEMS.map((item) => {
          const active = item.href === "/coach-admin"
            ? pathname === "/coach-admin"
            : pathname.startsWith(item.href.split("#")[0]);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", borderRadius: 7,
                background: active ? S.itemActiveBg : "transparent",
                color: active ? S.textActive : S.textInactive,
                fontWeight: active ? 500 : 400, fontSize: 13.5,
                textDecoration: "none",
              }}
            >
              <span style={{ color: active ? S.iconActive : S.iconInactive }}>
                <NavIcon name={item.icon} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ── User / Theme ── */}
      <div style={{ padding: "10px 10px 12px", borderTop: `1px solid ${S.border}`, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, background: S.itemActiveBg }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{initials}</span>
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 500, color: S.textActive, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</div>
            <div style={{ fontSize: 10, color: S.textInactive, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 1 }}>{role}</div>
          </div>
        </div>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "6px 10px", borderRadius: 7, border: "none", background: "transparent", color: S.textInactive, cursor: "pointer", fontSize: 12, textAlign: "left" }}
        >
          {isDark ? (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ width: 14, height: 14, flexShrink: 0 }}>
              <circle cx="10" cy="10" r="4" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ width: 14, height: 14, flexShrink: 0 }}>
              <path d="M17.5 12.5A7.5 7.5 0 1 1 7.5 2.5a5.83 5.83 0 0 0 10 10z" />
            </svg>
          )}
          {isDark ? "Light mode" : "Dark mode"}
        </button>
      </div>

    </aside>
  );
}
