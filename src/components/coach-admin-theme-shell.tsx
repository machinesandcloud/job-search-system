"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { CoachAdminLogoutButton } from "@/components/coach-admin-forms";
import { CoachAdminShellNav } from "@/components/coach-admin-shell-nav";
import { coachAdminGhostButtonClass, cx } from "@/components/coach-admin-ui";

// ─── Theme tokens ─────────────────────────────────────────────────────────────
// Sidebar is always dark (hardcoded, not theme-dependent — matches Apollo style).
// Only the main content area respects the light/dark toggle.

const LIGHT: CSSProperties = {
  "--ca-bg":              "#F1F5F9",
  "--ca-card":            "#FFFFFF",
  "--ca-raise":           "#F8FAFC",
  "--ca-text":            "#0F172A",
  "--ca-text2":           "#475569",
  "--ca-text3":           "#94A3B8",
  "--ca-text-muted":      "#475569",
  "--ca-text-soft":       "#94A3B8",
  "--ca-bd":              "#E2E8F0",
  "--ca-bd2":             "#F1F5F9",
  "--ca-sh":              "rgba(15,23,42,0.05)",
  "--ca-button-bg":       "#F8FAFC",
  "--ca-button-bg-hover": "#F1F5F9",
  "--ca-button-border":   "#E2E8F0",
  "--ca-button-border-strong": "rgba(37,99,235,0.3)",
  "--ca-button-text":     "#334155",
  "--ca-button-text-hover":"#1E40AF",
  "--ca-surface-soft":    "#FFFFFF",
  "--ca-surface-hover":   "#F8FAFC",
  "--ca-surface-strong":  "#F1F5F9",
  "--ca-chip-bg":         "#F1F5F9",
  "--ca-input-bg":        "#FFFFFF",
  "--ca-input-focus-bg":  "#FFFFFF",
  "--ca-border":          "#E2E8F0",
  "--ca-border-strong":   "rgba(37,99,235,0.3)",
  "--ca-track-bg":        "#E2E8F0",
  "--ca-panel-start":     "#FFFFFF",
  "--ca-panel-end":       "#FFFFFF",
  "--ca-panel-glow-1":    "transparent",
  "--ca-panel-glow-2":    "transparent",
  "--ca-panel-shadow":    "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  "--ca-shell-shadow":    "none",
  "--ca-glass-glow":      "transparent",
  "--ca-button-shadow":   "none",
  "--ca-pill-gold-text":  "#92400E",
  "--ca-pill-gold-bg":    "rgba(245,158,11,0.08)",
  "--ca-pill-gold-bd":    "rgba(245,158,11,0.22)",
  "--ca-pill-cyan-text":  "#0369A1",
  "--ca-pill-cyan-bg":    "rgba(14,165,233,0.08)",
  "--ca-pill-cyan-bd":    "rgba(14,165,233,0.22)",
  "--ca-pill-rose-text":  "#BE123C",
  "--ca-pill-rose-bg":    "rgba(244,63,94,0.08)",
  "--ca-pill-rose-bd":    "rgba(244,63,94,0.22)",
  "--ca-pill-em-text":    "#065F46",
  "--ca-pill-em-bg":      "rgba(16,185,129,0.08)",
  "--ca-pill-em-bd":      "rgba(16,185,129,0.22)",
} as CSSProperties;

const DARK: CSSProperties = {
  "--ca-bg":              "#0D1117",
  "--ca-card":            "#161B22",
  "--ca-raise":           "#1C2128",
  "--ca-text":            "#CDD9E5",
  "--ca-text2":           "#8B949E",
  "--ca-text3":           "#6E7681",
  "--ca-text-muted":      "#8B949E",
  "--ca-text-soft":       "#6E7681",
  "--ca-bd":              "#2D333B",
  "--ca-bd2":             "#1C2128",
  "--ca-sh":              "rgba(0,0,0,0.5)",
  "--ca-button-bg":       "#1C2128",
  "--ca-button-bg-hover": "#2D333B",
  "--ca-button-border":   "#2D333B",
  "--ca-button-border-strong": "rgba(56,139,253,0.4)",
  "--ca-button-text":     "#CDD9E5",
  "--ca-button-text-hover":"#FFFFFF",
  "--ca-surface-soft":    "#161B22",
  "--ca-surface-hover":   "#1C2128",
  "--ca-surface-strong":  "#1C2128",
  "--ca-chip-bg":         "#1C2128",
  "--ca-input-bg":        "#1C2128",
  "--ca-input-focus-bg":  "#1C2128",
  "--ca-border":          "#2D333B",
  "--ca-border-strong":   "rgba(56,139,253,0.4)",
  "--ca-track-bg":        "#2D333B",
  "--ca-panel-start":     "#161B22",
  "--ca-panel-end":       "#161B22",
  "--ca-panel-glow-1":    "transparent",
  "--ca-panel-glow-2":    "transparent",
  "--ca-panel-shadow":    "0 1px 3px rgba(0,0,0,0.3)",
  "--ca-shell-shadow":    "none",
  "--ca-glass-glow":      "transparent",
  "--ca-button-shadow":   "none",
  "--ca-pill-gold-text":  "#FCD34D",
  "--ca-pill-gold-bg":    "rgba(245,158,11,0.10)",
  "--ca-pill-gold-bd":    "rgba(245,158,11,0.22)",
  "--ca-pill-cyan-text":  "#7DD3FC",
  "--ca-pill-cyan-bg":    "rgba(14,165,233,0.10)",
  "--ca-pill-cyan-bd":    "rgba(14,165,233,0.22)",
  "--ca-pill-rose-text":  "#FDA4AF",
  "--ca-pill-rose-bg":    "rgba(244,63,94,0.10)",
  "--ca-pill-rose-bd":    "rgba(244,63,94,0.22)",
  "--ca-pill-em-text":    "#6EE7B7",
  "--ca-pill-em-bg":      "rgba(16,185,129,0.10)",
  "--ca-pill-em-bd":      "rgba(16,185,129,0.22)",
} as CSSProperties;

type SessionShape = { email: string; role: string } | null;

type Props = {
  session: SessionShape;
  sectionTitle?: string;
  sectionPill?: string;
  children: ReactNode;
};

export function CoachAdminThemeShell({ session, children }: Props) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    try { setIsDark(localStorage.getItem("coach_admin_dark") !== "0"); } catch { /* noop */ }
  }, []);

  function toggleTheme() {
    setIsDark(d => {
      const next = !d;
      try { localStorage.setItem("coach_admin_dark", next ? "1" : "0"); } catch { /* noop */ }
      return next;
    });
  }

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", overflow: "hidden", fontFamily: "var(--font-geist-sans,Inter,system-ui,sans-serif)", WebkitFontSmoothing: "antialiased", ...(isDark ? DARK : LIGHT) as CSSProperties }}
    >
      <style>{`
        * { box-sizing: border-box; }
        .ca-row:hover { background: var(--ca-raise) !important; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--ca-bd); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--ca-text3); }
        input, select, textarea, button { font-family: inherit; }
      `}</style>

      {session && (
        <CoachAdminShellNav
          email={session.email}
          role={session.role}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      )}

      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--ca-bg)", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ flexShrink: 0, height: 48, background: "var(--ca-card)", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", padding: "0 24px", gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ca-text)", letterSpacing: "-0.01em" }}>Zari Admin</span>
          <div style={{ flex: 1 }} />
          <CoachAdminLogoutButton className={cx(coachAdminGhostButtonClass, "rounded-lg border-[color:var(--ca-bd)] bg-transparent px-3 py-1 text-xs font-medium")} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: "20px 24px 32px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
