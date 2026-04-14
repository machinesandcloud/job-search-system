import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/mvp-session-actions";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function SiteHeader({ authenticated = false }: { authenticated?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)]/80 bg-[rgba(251,248,242,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--ink)] text-sm font-semibold text-[var(--bg-soft)] shadow-[var(--shadow)]">
            AC
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-[var(--ink)] uppercase">Askia Coach</p>
            <p className="text-xs text-[var(--muted)]">Career coaching with document review, interviews, and saved memory</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          <Link href="/dashboard" className="hover:text-[var(--ink)]">Dashboard</Link>
          <Link href="/coach" className="hover:text-[var(--ink)]">Live room</Link>
          <Link href="/workspaces/resume" className="hover:text-[var(--ink)]">Resume</Link>
          <Link href="/workspaces/linkedin" className="hover:text-[var(--ink)]">LinkedIn</Link>
          <Link href="/interview" className="hover:text-[var(--ink)]">Interview</Link>
        </nav>
        <div className="flex items-center gap-3">
          {authenticated ? (
            <LogoutButton className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--ink)]/25 hover:text-[var(--ink)]" />
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--ink)]/25 hover:text-[var(--ink)]">
                Log in
              </Link>
              <Link href="/signup" className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-[var(--bg-soft)] transition hover:bg-[var(--teal)]">
                Start free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function PageFrame({ children, authenticated = false }: { children: ReactNode; authenticated?: boolean }) {
  return (
    <div className="min-h-screen text-[var(--ink)]">
      <SiteHeader authenticated={authenticated} />
      <main>{children}</main>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
      {children}
    </span>
  );
}

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("mx-auto max-w-7xl px-6 py-16 md:py-20", className)}>{children}</section>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]", className)}>
      {children}
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--ink)]">{value}</p>
    </div>
  );
}

export function Meter({ value, max }: { value: number; max: number }) {
  const width = `${Math.min((value / max) * 100, 100)}%`;
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-strong)]">
      <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--teal))]" style={{ width }} />
    </div>
  );
}
