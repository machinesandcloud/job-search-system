"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { CoachAdminLogoutButton } from "@/components/coach-admin-forms";
import { CoachAdminShellNav } from "@/components/coach-admin-shell-nav";
import {
  coachAdminGhostButtonClass,
  coachAdminTextPrimaryClass,
  coachAdminTextSoftClass,
  cx,
} from "@/components/coach-admin-ui";

const LIGHT_THEME: CSSProperties = {
  "--ca-page-bg": "#F8FAFC",
  "--ca-shell-start": "#FFFFFF",
  "--ca-shell-end": "#FFFFFF",
  "--ca-panel-start": "#FFFFFF",
  "--ca-panel-end": "#FFFFFF",
  "--ca-panel-glow-1": "rgba(59,130,246,0.06)",
  "--ca-panel-glow-2": "rgba(37,99,235,0.04)",
  "--ca-surface-soft": "#FFFFFF",
  "--ca-surface-hover": "#F8FAFC",
  "--ca-surface-strong": "#F1F5F9",
  "--ca-chip-bg": "#F1F5F9",
  "--ca-chip-bg-hover": "#E2E8F0",
  "--ca-input-bg": "#FFFFFF",
  "--ca-input-focus-bg": "#FFFFFF",
  "--ca-border": "#E2E8F0",
  "--ca-border-strong": "rgba(37,99,235,0.24)",
  "--ca-text": "#0F172A",
  "--ca-text-muted": "#64748B",
  "--ca-text-soft": "#94A3B8",
  "--ca-track-bg": "#E2E8F0",
  "--ca-grid-opacity": "0",
  "--ca-ambient-1": "rgba(59,130,246,0.06)",
  "--ca-ambient-2": "rgba(37,99,235,0.03)",
  "--ca-ambient-3": "rgba(96,165,250,0.04)",
  "--ca-panel-shadow": "0 10px 30px rgba(15,23,42,0.04)",
  "--ca-shell-shadow": "0 14px 38px rgba(15,23,42,0.05)",
  "--ca-glass-glow": "rgba(59,130,246,0.04)",
  "--ca-button-bg": "#F1F5F9",
  "--ca-button-bg-hover": "#E2E8F0",
  "--ca-button-border": "#E2E8F0",
  "--ca-button-border-strong": "rgba(37,99,235,0.22)",
  "--ca-button-text": "#0F172A",
  "--ca-button-text-hover": "#2563EB",
  "--ca-button-shadow": "none",
} as CSSProperties;

const DARK_THEME: CSSProperties = {
  "--ca-page-bg": "#04060D",
  "--ca-shell-start": "#080E1C",
  "--ca-shell-end": "#080E1C",
  "--ca-panel-start": "#080E1C",
  "--ca-panel-end": "#080E1C",
  "--ca-panel-glow-1": "rgba(37,99,235,0.08)",
  "--ca-panel-glow-2": "rgba(37,99,235,0.05)",
  "--ca-surface-soft": "#080E1C",
  "--ca-surface-hover": "rgba(37,99,235,0.14)",
  "--ca-surface-strong": "#0E1828",
  "--ca-chip-bg": "#0E1828",
  "--ca-chip-bg-hover": "rgba(37,99,235,0.14)",
  "--ca-input-bg": "#0E1828",
  "--ca-input-focus-bg": "#0E1828",
  "--ca-border": "rgba(255,255,255,0.09)",
  "--ca-border-strong": "rgba(37,99,235,0.30)",
  "--ca-text": "rgba(255,255,255,0.94)",
  "--ca-text-muted": "rgba(255,255,255,0.50)",
  "--ca-text-soft": "rgba(255,255,255,0.28)",
  "--ca-track-bg": "rgba(255,255,255,0.08)",
  "--ca-grid-opacity": "0.14",
  "--ca-ambient-1": "rgba(37,99,235,0.08)",
  "--ca-ambient-2": "rgba(37,99,235,0.05)",
  "--ca-ambient-3": "rgba(37,99,235,0.03)",
  "--ca-panel-shadow": "0 14px 38px rgba(0,0,0,0.24)",
  "--ca-shell-shadow": "0 18px 46px rgba(0,0,0,0.26)",
  "--ca-glass-glow": "rgba(37,99,235,0.04)",
  "--ca-button-bg": "#0E1828",
  "--ca-button-bg-hover": "rgba(37,99,235,0.14)",
  "--ca-button-border": "rgba(255,255,255,0.10)",
  "--ca-button-border-strong": "rgba(37,99,235,0.28)",
  "--ca-button-text": "rgba(255,255,255,0.94)",
  "--ca-button-text-hover": "#FFFFFF",
  "--ca-button-shadow": "none",
} as CSSProperties;

function ThemeIcon({ isDark }: { isDark: boolean }) {
  return isDark ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" strokeLinecap="round" />
    </svg>
  );
}

type SessionShape = {
  email: string;
  role: string;
} | null;

export function CoachAdminThemeShell({
  session,
  children,
}: {
  session: SessionShape;
  children: ReactNode;
}) {
  const pathname = usePathname();
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
  const sectionLabel = pathname.startsWith("/coach-admin/tickets")
    ? "Support Queue"
    : pathname.startsWith("/coach-admin/accounts/")
      ? "Account View"
      : "Overview";

  return (
    <main
      style={themeVars}
      className={cx(
        "relative min-h-screen overflow-hidden bg-[var(--ca-page-bg)]",
        isDark ? "coach-admin-dark" : "coach-admin-light"
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" style={{ opacity: "var(--ca-grid-opacity)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_52%_at_50%_-12%,var(--ca-ambient-1),transparent_72%),radial-gradient(circle_at_bottom_right,var(--ca-ambient-2),transparent_28%)]" />
      </div>

      <div className="relative flex min-h-screen">
        {session ? <CoachAdminShellNav email={session.email} role={session.role} /> : null}

        <div className="min-w-0 flex-1">
          <header className="flex min-h-[62px] items-center justify-between border-b border-[color:var(--ca-border)] bg-[var(--ca-surface-soft)] px-6 md:px-8">
            <div className="min-w-0">
              <h1 className={cx("text-[1.05rem] font-semibold tracking-[-0.03em]", coachAdminTextPrimaryClass)}>Coach Admin</h1>
              <p className={cx("mt-0.5 text-xs uppercase tracking-[0.16em]", coachAdminTextSoftClass)}>{sectionLabel}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href="/coach-admin" className={coachAdminGhostButtonClass}>
                Overview
              </Link>
              <Link href="/coach-admin/tickets" className={coachAdminGhostButtonClass}>
                Tickets
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                className={cx(coachAdminGhostButtonClass, "inline-flex items-center gap-2")}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <ThemeIcon isDark={isDark} />
                <span>{isDark ? "Light" : "Dark"}</span>
              </button>
              <CoachAdminLogoutButton />
            </div>
          </header>

          <div className="p-6 md:p-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
