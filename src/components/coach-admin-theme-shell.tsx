"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { CoachAdminLogoutButton } from "@/components/coach-admin-forms";
import { CoachAdminShellNav } from "@/components/coach-admin-shell-nav";
import {
  CoachAdminPill,
  coachAdminGhostButtonClass,
  coachAdminTextPrimaryClass,
  coachAdminTextSoftClass,
  cx,
} from "@/components/coach-admin-ui";

const LIGHT_THEME: CSSProperties = {
  "--ca-bg": "#F8FAFC",
  "--ca-card": "#FFFFFF",
  "--ca-raise": "#F1F5F9",
  "--ca-text": "#0F172A",
  "--ca-text2": "#64748B",
  "--ca-text3": "#94A3B8",
  "--ca-text-muted": "#64748B",
  "--ca-text-soft": "#94A3B8",
  "--ca-bd": "#E2E8F0",
  "--ca-bd2": "#F1F5F9",
  "--ca-sh": "rgba(15,23,42,0.06)",
  "--ca-button-bg": "#F1F5F9",
  "--ca-button-bg-hover": "#E2E8F0",
  "--ca-button-border": "#E2E8F0",
  "--ca-button-border-strong": "rgba(37,99,235,0.22)",
  "--ca-button-text": "#0F172A",
  "--ca-button-text-hover": "#2563EB",
  "--ca-surface-soft": "#FFFFFF",
  "--ca-surface-hover": "#F8FAFC",
  "--ca-surface-strong": "#F1F5F9",
  "--ca-chip-bg": "#F1F5F9",
  "--ca-input-bg": "#FFFFFF",
  "--ca-input-focus-bg": "#FFFFFF",
  "--ca-border": "#E2E8F0",
  "--ca-border-strong": "rgba(37,99,235,0.22)",
  "--ca-track-bg": "#E2E8F0",
  "--ca-panel-start": "#FFFFFF",
  "--ca-panel-end": "#FFFFFF",
  "--ca-panel-glow-1": "rgba(37,99,235,0.06)",
  "--ca-panel-glow-2": "rgba(37,99,235,0.04)",
  "--ca-panel-shadow": "0 10px 30px rgba(15,23,42,0.04)",
  "--ca-shell-shadow": "0 14px 38px rgba(15,23,42,0.05)",
  "--ca-glass-glow": "rgba(37,99,235,0.04)",
  "--ca-button-shadow": "none",
  "--ca-pill-gold-text": "#92400E",
  "--ca-pill-gold-bg": "rgba(245,158,11,0.10)",
  "--ca-pill-gold-bd": "rgba(245,158,11,0.30)",
  "--ca-pill-cyan-text": "#0369A1",
  "--ca-pill-cyan-bg": "rgba(56,189,248,0.10)",
  "--ca-pill-cyan-bd": "rgba(56,189,248,0.28)",
  "--ca-pill-rose-text": "#9F1239",
  "--ca-pill-rose-bg": "rgba(244,63,94,0.10)",
  "--ca-pill-rose-bd": "rgba(244,63,94,0.28)",
  "--ca-pill-em-text": "#065F46",
  "--ca-pill-em-bg": "rgba(52,211,153,0.12)",
  "--ca-pill-em-bd": "rgba(52,211,153,0.28)",
} as CSSProperties;

const DARK_THEME: CSSProperties = {
  "--ca-bg": "#04060D",
  "--ca-card": "#080E1C",
  "--ca-raise": "#0E1828",
  "--ca-text": "rgba(255,255,255,0.94)",
  "--ca-text2": "rgba(255,255,255,0.50)",
  "--ca-text3": "rgba(255,255,255,0.28)",
  "--ca-text-muted": "rgba(255,255,255,0.50)",
  "--ca-text-soft": "rgba(255,255,255,0.28)",
  "--ca-bd": "rgba(255,255,255,0.09)",
  "--ca-bd2": "rgba(255,255,255,0.04)",
  "--ca-sh": "rgba(0,0,0,0.65)",
  "--ca-button-bg": "#0E1828",
  "--ca-button-bg-hover": "rgba(255,255,255,0.05)",
  "--ca-button-border": "rgba(255,255,255,0.09)",
  "--ca-button-border-strong": "rgba(37,99,235,0.3)",
  "--ca-button-text": "rgba(255,255,255,0.94)",
  "--ca-button-text-hover": "#FFFFFF",
  "--ca-surface-soft": "#080E1C",
  "--ca-surface-hover": "rgba(255,255,255,0.05)",
  "--ca-surface-strong": "#0E1828",
  "--ca-chip-bg": "#0E1828",
  "--ca-input-bg": "#0E1828",
  "--ca-input-focus-bg": "#0E1828",
  "--ca-border": "rgba(255,255,255,0.09)",
  "--ca-border-strong": "rgba(37,99,235,0.28)",
  "--ca-track-bg": "rgba(255,255,255,0.08)",
  "--ca-panel-start": "#080E1C",
  "--ca-panel-end": "#080E1C",
  "--ca-panel-glow-1": "rgba(37,99,235,0.08)",
  "--ca-panel-glow-2": "rgba(37,99,235,0.05)",
  "--ca-panel-shadow": "0 14px 38px rgba(0,0,0,0.24)",
  "--ca-shell-shadow": "0 18px 46px rgba(0,0,0,0.26)",
  "--ca-glass-glow": "rgba(37,99,235,0.04)",
  "--ca-button-shadow": "none",
  "--ca-pill-gold-text": "#FDE68A",
  "--ca-pill-gold-bg": "rgba(245,158,11,0.10)",
  "--ca-pill-gold-bd": "rgba(245,158,11,0.25)",
  "--ca-pill-cyan-text": "#BAE6FD",
  "--ca-pill-cyan-bg": "rgba(56,189,248,0.12)",
  "--ca-pill-cyan-bd": "rgba(56,189,248,0.24)",
  "--ca-pill-rose-text": "#FECDD3",
  "--ca-pill-rose-bg": "rgba(244,63,94,0.10)",
  "--ca-pill-rose-bd": "rgba(244,63,94,0.25)",
  "--ca-pill-em-text": "#A7F3D0",
  "--ca-pill-em-bg": "rgba(52,211,153,0.10)",
  "--ca-pill-em-bd": "rgba(52,211,153,0.20)",
} as CSSProperties;

function ThemeIcon({ isDark }: { isDark: boolean }) {
  return isDark ? (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="10" cy="10" r="4" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M17.5 12.5A7.5 7.5 0 1 1 7.5 2.5a5.83 5.83 0 0 0 10 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type SessionShape = {
  email: string;
  role: string;
} | null;

type Props = {
  session: SessionShape;
  sectionTitle?: string;
  sectionPill?: string;
  children: ReactNode;
};

export function CoachAdminThemeShell({
  session,
  sectionTitle = "Coach Admin",
  sectionPill = "Billing & Support",
  children,
}: Props) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    try {
      setIsDark(localStorage.getItem("coach_admin_dark") !== "0");
    } catch {
      setIsDark(true);
    }
  }, []);

  function toggleTheme() {
    setIsDark((current) => {
      const next = !current;
      try {
        localStorage.setItem("coach_admin_dark", next ? "1" : "0");
      } catch {
        // ignore storage failures
      }
      return next;
    });
  }

  const themeVars = (isDark ? DARK_THEME : LIGHT_THEME) as CSSProperties;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        overflow: "hidden",
        background: "var(--ca-bg)",
        fontFamily: "var(--font-geist-sans,Inter,system-ui,sans-serif)",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        backgroundImage: isDark ? "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(37,99,235,0.07) 0%, transparent 100%)" : "none",
        ...themeVars,
      }}
      className={isDark ? "coach-admin-dark" : "coach-admin-light"}
    >
      <style>{`
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
        .coach-admin-nav-btn { position: relative; overflow: hidden; }
        .coach-admin-nav-btn:hover { background: rgba(37,99,235,0.06) !important; color: var(--ca-text) !important; }
        .coach-admin-dark .coach-admin-nav-btn:hover { background: rgba(255,255,255,0.05) !important; color: rgba(255,255,255,0.85) !important; }
        .coach-admin-dark .coach-admin-nav-btn.active { background: transparent !important; }
        .coach-admin-btn-scale { transition: transform 0.15s ease, box-shadow 0.15s ease !important; }
        .coach-admin-btn-scale:hover { transform: scale(1.02) !important; }
        .coach-admin-btn-scale:active { transform: scale(0.98) !important; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--ca-bd); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--ca-text3); }
      `}</style>

      {session ? <CoachAdminShellNav email={session.email} role={session.role} isDark={isDark} onToggleTheme={toggleTheme} /> : null}

      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ flexShrink: 0, height: 54, background: "var(--ca-card)", borderBottom: "1px solid var(--ca-bd)", display: "flex", alignItems: "center", padding: "0 26px", gap: 12, position: "relative" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, width: "100%", background: "linear-gradient(90deg, rgba(37,99,235,0.7) 0%, rgba(37,99,235,0.18) 40%, transparent 100%)", pointerEvents: "none" }} />
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--ca-text)", letterSpacing: "-0.02em", margin: 0 }}>
            {sectionTitle}
          </h2>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <CoachAdminPill tone="brand">{sectionPill}</CoachAdminPill>
            <CoachAdminLogoutButton className={cx(coachAdminGhostButtonClass, "rounded-[8px] border-[color:var(--ca-bd)] bg-transparent px-3 py-1.5 text-xs font-semibold")} />
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "18px 22px 22px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
