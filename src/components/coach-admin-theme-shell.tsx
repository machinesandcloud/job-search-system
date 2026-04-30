"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { CoachAdminLogoutButton } from "@/components/coach-admin-forms";
import { CoachAdminShellNav } from "@/components/coach-admin-shell-nav";
import {
  CoachAdminPill,
  coachAdminGhostButtonClass,
  coachAdminTextMutedClass,
  coachAdminTextPrimaryClass,
  coachAdminTextSoftClass,
  cx,
} from "@/components/coach-admin-ui";

const LIGHT_THEME: CSSProperties = {
  "--ca-page-bg": "#eef2ff",
  "--ca-shell-start": "rgba(255,255,255,0.9)",
  "--ca-shell-end": "rgba(236,242,255,0.86)",
  "--ca-panel-start": "rgba(255,255,255,0.92)",
  "--ca-panel-end": "rgba(241,245,255,0.88)",
  "--ca-panel-glow-1": "rgba(67,97,238,0.12)",
  "--ca-panel-glow-2": "rgba(6,182,212,0.08)",
  "--ca-surface-soft": "rgba(255,255,255,0.78)",
  "--ca-surface-hover": "rgba(255,255,255,0.94)",
  "--ca-surface-strong": "rgba(237,242,255,0.92)",
  "--ca-chip-bg": "rgba(255,255,255,0.72)",
  "--ca-chip-bg-hover": "rgba(255,255,255,0.94)",
  "--ca-input-bg": "rgba(255,255,255,0.82)",
  "--ca-input-focus-bg": "rgba(255,255,255,0.96)",
  "--ca-border": "rgba(99,102,241,0.16)",
  "--ca-border-strong": "rgba(99,102,241,0.28)",
  "--ca-text": "#0f172a",
  "--ca-text-muted": "rgba(15,23,42,0.72)",
  "--ca-text-soft": "rgba(51,65,85,0.58)",
  "--ca-track-bg": "rgba(99,102,241,0.12)",
  "--ca-grid-opacity": "0.14",
  "--ca-ambient-1": "rgba(67,97,238,0.16)",
  "--ca-ambient-2": "rgba(6,182,212,0.08)",
  "--ca-ambient-3": "rgba(129,140,248,0.08)",
  "--ca-panel-shadow": "0 20px 80px rgba(129,140,248,0.18)",
  "--ca-shell-shadow": "0 24px 90px rgba(129,140,248,0.22)",
  "--ca-glass-glow": "rgba(99,102,241,0.1)",
  "--ca-button-bg": "rgba(255,255,255,0.84)",
  "--ca-button-bg-hover": "rgba(255,255,255,0.98)",
  "--ca-button-border": "rgba(99,102,241,0.18)",
  "--ca-button-border-strong": "rgba(99,102,241,0.32)",
  "--ca-button-text": "#0f172a",
  "--ca-button-text-hover": "#050816",
  "--ca-button-shadow": "0 10px 28px rgba(129,140,248,0.14)",
} as CSSProperties;

const DARK_THEME: CSSProperties = {
  "--ca-page-bg": "#04060D",
  "--ca-shell-start": "rgba(8,14,28,0.97)",
  "--ca-shell-end": "rgba(4,6,13,0.94)",
  "--ca-panel-start": "rgba(8,14,28,0.96)",
  "--ca-panel-end": "rgba(4,6,13,0.94)",
  "--ca-panel-glow-1": "rgba(59,130,246,0.12)",
  "--ca-panel-glow-2": "rgba(37,99,235,0.08)",
  "--ca-surface-soft": "rgba(14,24,40,0.88)",
  "--ca-surface-hover": "rgba(37,99,235,0.16)",
  "--ca-surface-strong": "rgba(8,14,28,0.98)",
  "--ca-chip-bg": "rgba(14,24,40,0.94)",
  "--ca-chip-bg-hover": "rgba(37,99,235,0.18)",
  "--ca-input-bg": "rgba(14,24,40,0.92)",
  "--ca-input-focus-bg": "rgba(14,24,40,1)",
  "--ca-border": "rgba(255,255,255,0.09)",
  "--ca-border-strong": "rgba(59,130,246,0.35)",
  "--ca-text": "#f8fafc",
  "--ca-text-muted": "rgba(255,255,255,0.84)",
  "--ca-text-soft": "rgba(255,255,255,0.62)",
  "--ca-track-bg": "rgba(255,255,255,0.08)",
  "--ca-grid-opacity": "0.18",
  "--ca-ambient-1": "rgba(59,130,246,0.16)",
  "--ca-ambient-2": "rgba(37,99,235,0.1)",
  "--ca-ambient-3": "rgba(96,165,250,0.08)",
  "--ca-panel-shadow": "0 24px 80px rgba(2,6,23,0.58)",
  "--ca-shell-shadow": "0 28px 92px rgba(2,6,23,0.62)",
  "--ca-glass-glow": "rgba(59,130,246,0.08)",
  "--ca-button-bg": "rgba(14,24,40,0.98)",
  "--ca-button-bg-hover": "rgba(37,99,235,0.18)",
  "--ca-button-border": "rgba(255,255,255,0.1)",
  "--ca-button-border-strong": "rgba(59,130,246,0.42)",
  "--ca-button-text": "rgba(255,255,255,0.94)",
  "--ca-button-text-hover": "#ffffff",
  "--ca-button-shadow": "0 12px 32px rgba(2,6,23,0.28)",
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
    <main
      style={themeVars}
      className={cx(
        "relative min-h-screen overflow-hidden bg-[var(--ca-page-bg)]",
        isDark ? "coach-admin-dark" : "coach-admin-light"
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" style={{ opacity: "var(--ca-grid-opacity)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--ca-ambient-1),transparent_28%),radial-gradient(circle_at_top_right,var(--ca-ambient-2),transparent_24%),radial-gradient(circle_at_bottom,var(--ca-ambient-3),transparent_26%)]" />
        <div className="absolute left-[-12%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#4361EE]/20 blur-[120px]" />
        <div className="absolute bottom-[-14%] right-[-8%] h-[360px] w-[360px] rounded-full bg-cyan-500/12 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1680px] px-4 py-4 md:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[214px_minmax(0,1fr)]">
          {session ? <CoachAdminShellNav email={session.email} role={session.role} /> : <div className="hidden xl:block" />}

          <div className="space-y-6">
            <header className="relative overflow-hidden rounded-[34px] border border-[color:var(--ca-border)] bg-[linear-gradient(135deg,var(--ca-shell-start),var(--ca-shell-end))] px-6 py-6 shadow-[var(--ca-shell-shadow)] backdrop-blur-2xl md:px-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,var(--ca-ambient-1),transparent_30%),radial-gradient(circle_at_right,var(--ca-ambient-2),transparent_24%)]" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <CoachAdminPill tone="cyan">Coach Admin Console</CoachAdminPill>
                  <h1 className={cx("mt-4 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.07em] md:text-[3rem]", coachAdminTextPrimaryClass)}>
                    Billing, accounts,
                    <span className="gradient-text-zari"> and support ops.</span>
                  </h1>
                  <p className={cx("mt-4 max-w-2xl text-sm leading-7 md:text-[15px]", coachAdminTextMutedClass)}>
                    Internal command surface for subscriptions, account health, support queue, and usage telemetry. Same visual language as the platform, but tuned for operator speed.
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:items-end">
                  <nav className="flex flex-wrap items-center gap-2">
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
                  </nav>

                  {session ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="rounded-full border border-[color:var(--ca-border)] bg-[var(--ca-chip-bg)] px-4 py-2.5 text-right">
                        <p className={cx("text-sm font-medium", coachAdminTextPrimaryClass)}>{session.email}</p>
                        <p className={cx("text-[11px] uppercase tracking-[0.18em]", coachAdminTextSoftClass)}>{session.role}</p>
                      </div>
                      <CoachAdminLogoutButton className="xl:hidden" />
                    </div>
                  ) : null}
                </div>
              </div>
            </header>

            <div className="relative">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
