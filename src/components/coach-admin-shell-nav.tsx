"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ZariLogo } from "@/components/zari-logo";

function navIcon(name: "home" | "tickets" | "users" | "sparkles", size = 15) {
  const p = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, width: size, height: size, style: { flexShrink: 0, display: "block" } };
  switch (name) {
    case "home":
      return <svg {...p}><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9 20v-5h6v5" /></svg>;
    case "tickets":
      return <svg {...p}><path d="M7 18h7.5A4.5 4.5 0 0 0 19 13.5V8.8A2.8 2.8 0 0 0 16.2 6H7.8A2.8 2.8 0 0 0 5 8.8v7.4L7 18Zm3-6h4m-7-3h10" /></svg>;
    case "users":
      return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="3.25" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" /><path d="M16.5 3.13a3.25 3.25 0 0 1 0 6.74" /></svg>;
    case "sparkles":
      return <svg {...p}><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" /><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" /></svg>;
  }
}

const NAV_ITEMS = [
  { href: "/coach-admin",          label: "Overview",       icon: "home"      as const },
  { href: "/coach-admin/accounts", label: "Accounts",       icon: "users"     as const },
  { href: "/coach-admin/tickets",  label: "Support Queue",  icon: "tickets"   as const },
  { href: "/coach-admin#ai-usage", label: "AI Usage",       icon: "sparkles"  as const },
];

function getInitials(email: string) {
  const local = email.split("@")[0] || "A";
  return local.split(/[^a-z0-9]/i).filter(Boolean).slice(0, 2).map(p => p[0]?.toUpperCase() || "").join("") || local.slice(0, 2).toUpperCase();
}

export function CoachAdminShellNav({ email, role, isDark, onToggleTheme }: { email: string; role: string; isDark: boolean; onToggleTheme: () => void }) {
  const pathname = usePathname();
  const initials = getInitials(email);

  return (
    <aside style={{ width: 216, flexShrink: 0, background: "var(--ca-card)", display: "flex", flexDirection: "column", borderRight: "1px solid var(--ca-bd)", overflow: "hidden" }}>
      {/* Logo */}
      <div style={{ padding: "16px 14px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--ca-bd)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg,#3B82F6,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: isDark ? "0 0 14px rgba(37,99,235,0.45)" : "0 2px 8px rgba(37,99,235,0.3)" }}>
            <ZariLogo size={14} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: "var(--ca-text)", letterSpacing: "-0.04em" }}>Zari</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#2563EB", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 6, padding: "1px 6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Admin</span>
        </Link>
        <button onClick={onToggleTheme} title={isDark ? "Light mode" : "Dark mode"} style={{ width: 26, height: 26, borderRadius: 7, border: "1px solid var(--ca-bd)", background: "transparent", color: "var(--ca-text3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {isDark
            ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12 }}><circle cx="10" cy="10" r="4" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" /></svg>
            : <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12 }}><path d="M17.5 12.5A7.5 7.5 0 1 1 7.5 2.5a5.83 5.83 0 0 0 10 10z" /></svg>
          }
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 1, overflowY: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/coach-admin"
            ? pathname === "/coach-admin"
            : pathname.startsWith(item.href.split("#")[0]);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8,
                background: active ? (isDark ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.08)") : "transparent",
                color: active ? "#2563EB" : "var(--ca-text2)",
                fontWeight: active ? 600 : 400, fontSize: 13.5,
                textDecoration: "none", transition: "all 0.12s",
                boxShadow: active ? "inset 3px 0 0 #2563EB" : "inset 3px 0 0 transparent",
              }}
            >
              <span style={{ color: active ? "#2563EB" : "var(--ca-text3)" }}>{navIcon(item.icon)}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div style={{ padding: "10px 10px 14px", borderTop: "1px solid var(--ca-bd)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 10, background: "var(--ca-raise)" }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#3B82F6,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 6px rgba(37,99,235,0.4)" }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "white" }}>{initials}</span>
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ca-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</div>
            <div style={{ fontSize: 10, color: "var(--ca-text3)", textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 1 }}>{role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
