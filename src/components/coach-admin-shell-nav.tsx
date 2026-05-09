"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ZariLogo } from "@/components/zari-logo";

function navIcon(name: "home" | "tickets" | "users" | "sparkles", color = "currentColor") {
  const p = { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "1.8", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, width: 18, height: 18, style: { flexShrink: 0, display: "block" } };
  switch (name) {
    case "home":
      return <svg {...p}><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9 20v-5h6v5" /></svg>;
    case "tickets":
      return <svg {...p}><path d="M7 18h7.5A4.5 4.5 0 0 0 19 13.5V8.8A2.8 2.8 0 0 0 16.2 6H7.8A2.8 2.8 0 0 0 5 8.8v7.4L7 18Zm3-6h4m-7-3h10" /></svg>;
    case "users":
      return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="3.25" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" /><path d="M16.5 3.13a3.25 3.25 0 0 1 0 6.74" /></svg>;
    case "sparkles":
      return <svg {...p}><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" /><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" /><path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" /></svg>;
  }
}

const NAV_ITEMS = [
  { href: "/coach-admin", label: "Overview", icon: "home" as const, group: "Console" },
  { href: "/coach-admin/accounts", label: "Accounts", icon: "users" as const, group: "Console" },
  { href: "/coach-admin/tickets", label: "Support Queue", icon: "tickets" as const, group: "Operations" },
  { href: "/coach-admin#ai-usage", label: "AI Usage", icon: "sparkles" as const, group: "Operations" },
];

function getInitials(email: string) {
  const localPart = email.split("@")[0] || "A";
  return localPart
    .split(/[^a-z0-9]/i)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || localPart.slice(0, 2).toUpperCase();
}

function groupItems(label: string) {
  return NAV_ITEMS.filter((item) => item.group === label);
}

export function CoachAdminShellNav({
  email,
  role,
  isDark,
  onToggleTheme,
}: {
  email: string;
  role: string;
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  const pathname = usePathname();
  const initials = getInitials(email);

  return (
    <aside style={{ width: 244, flexShrink: 0, background: "var(--ca-card)", display: "flex", flexDirection: "column", padding: "0 0 16px", position: "relative", borderRight: "1px solid var(--ca-bd)", overflow: "hidden" }}>
      {isDark && <div style={{ position: "absolute", top: -40, left: -20, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />}

      <div style={{ padding: "18px 16px 14px", display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flex: 1 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: isDark ? "0 0 18px rgba(37,99,235,0.5), 0 2px 8px rgba(0,0,0,0.4)" : "0 2px 10px rgba(37,99,235,0.35)" }}>
            <ZariLogo size={16} />
          </div>
          <span style={{ fontSize: 17, fontWeight: 800, color: "var(--ca-text)", letterSpacing: "-0.04em", lineHeight: 1 }}>Zari</span>
        </Link>
        <button
          onClick={onToggleTheme}
          title={isDark ? "Light mode" : "Dark mode"}
          style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid var(--ca-bd)", background: isDark ? "rgba(255,255,255,0.04)" : "var(--ca-raise)", color: "var(--ca-text3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.18s" }}
        >
          {isDark ? (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 14, height: 14 }}><circle cx="10" cy="10" r="4" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 14, height: 14 }}><path d="M17.5 12.5A7.5 7.5 0 1 1 7.5 2.5a5.83 5.83 0 0 0 10 10z" /></svg>
          )}
        </button>
      </div>

      <div style={{ margin: "0 10px 10px", position: "relative" }}>
        <div
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 10, border: "1px solid var(--ca-bd)", background: isDark ? "rgba(255,255,255,0.03)" : "var(--ca-raise)", fontSize: 12.5, fontWeight: 600, color: "var(--ca-text2)", transition: "all 0.18s", backdropFilter: isDark ? "blur(8px)" : "none" }}
        >
          <span style={{ display: "flex", alignItems: "center", color: "#2563EB" }}>{navIcon("sparkles", "#2563EB")}</span>
          <span style={{ flex: 1, textAlign: "left", color: "var(--ca-text)", fontWeight: 700 }}>Billing & Support</span>
        </div>
      </div>

      <div style={{ padding: "0 10px 10px" }}>
        <Link
          href="/coach-admin"
          className="coach-admin-btn-scale"
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "10px 14px", borderRadius: 10, border: "none", background: pathname === "/coach-admin" ? "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)" : isDark ? "rgba(37,99,235,0.14)" : "#EFF6FF", color: pathname === "/coach-admin" ? "white" : "#2563EB", fontWeight: 700, fontSize: 13.5, cursor: "pointer", letterSpacing: "-0.01em", boxShadow: pathname === "/coach-admin" ? "0 4px 16px rgba(37,99,235,0.45)" : "none", textDecoration: "none" }}
        >
          {navIcon("home", "currentColor")}
          Admin Overview
        </Link>
      </div>

      <div style={{ height: 1, margin: "0 10px 10px", background: isDark ? "linear-gradient(90deg, transparent, var(--ca-bd), transparent)" : "var(--ca-bd)" }} />

      <nav style={{ flex: 1, padding: "0 8px", display: "flex", flexDirection: "column", gap: 1, overflowY: "auto" }}>
        {["Console", "Operations"].map((group) => (
          <div key={group}>
            <div style={{ padding: "8px 8px 4px", fontSize: 10, fontWeight: 700, color: "var(--ca-text3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{group}</div>
            {groupItems(group).map((item) => {
              const active = item.href === "/coach-admin"
                ? pathname === item.href
                : pathname.startsWith(item.href.split("#")[0]);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`coach-admin-nav-btn${active ? " active" : ""}`}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer", textAlign: "left", background: active ? (isDark ? "linear-gradient(90deg, rgba(37,99,235,0.18) 0%, transparent 100%)" : "linear-gradient(90deg, rgba(37,99,235,0.08) 0%, transparent 100%)") : "transparent", color: active ? "#2563EB" : "var(--ca-text2)", fontWeight: active ? 600 : 400, fontSize: 13.5, transition: "all 0.14s", boxShadow: active ? "inset 3px 0 0 #2563EB" : "inset 3px 0 0 transparent", textDecoration: "none" }}
                >
                  <span style={{ display: "flex", alignItems: "center", color: active ? "#2563EB" : "var(--ca-text3)", transition: "color 0.14s" }}>
                    {navIcon(item.icon, "currentColor")}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ margin: "12px 10px 0", background: isDark ? "linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(139,92,246,0.12) 100%)" : "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)", borderRadius: 12, padding: "14px", border: isDark ? "1px solid rgba(37,99,235,0.28)" : "1px solid rgba(37,99,235,0.14)", position: "relative", overflow: "hidden" }}>
        {isDark && <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #3B82F6, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(37,99,235,0.4)" }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "white" }}>{initials}</span>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.01em" }}>Live Operator</div>
        </div>
        <div style={{ fontSize: 11.5, color: "var(--ca-text2)", marginBottom: 4, lineHeight: 1.55 }}>{email}</div>
        <div style={{ fontSize: 10.5, color: "var(--ca-text3)", letterSpacing: "0.16em", textTransform: "uppercase" }}>{role}</div>
      </div>
    </aside>
  );
}
