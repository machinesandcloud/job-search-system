import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/mvp-session-actions";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function SiteHeader({ authenticated = false }: { authenticated?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(244,239,231,0.94)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--ink)] text-sm font-semibold text-[var(--surface)] shadow-[var(--shadow)]">
            AC
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-[var(--ink)]">Askia Coach</p>
            <p className="text-xs text-[var(--muted)]">AI career coaching for resumes, interviews, and positioning</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] lg:flex">
          <Link href="/platform" className="hover:text-[var(--ink)]">Platform</Link>
          <Link href="/use-cases" className="hover:text-[var(--ink)]">Use cases</Link>
          <Link href="/security" className="hover:text-[var(--ink)]">Security</Link>
          <Link href="/pricing" className="hover:text-[var(--ink)]">Pricing</Link>
          <Link href="/dashboard" className="hover:text-[var(--ink)]">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          {authenticated ? (
            <LogoutButton className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--ink)]/40" />
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--ink)]/40">
                Log in
              </Link>
              <Link href="/signup" className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-2)]">
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
    <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
      {children}
    </span>
  );
}

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("mx-auto max-w-7xl px-6 py-16 md:py-20", className)}>{children}</section>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]", className)}>
      {children}
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[var(--shadow)]">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--ink)]">{value}</p>
    </div>
  );
}

export function Meter({ value, max }: { value: number; max: number }) {
  const width = `${Math.min((value / max) * 100, 100)}%`;
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-2)]">
      <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]" style={{ width }} />
    </div>
  );
}

export function LogoStrip({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <div key={item} className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-sm font-medium text-[var(--muted)]">
          {item}
        </div>
      ))}
    </div>
  );
}
