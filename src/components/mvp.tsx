import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/mvp-session-actions";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function SiteHeader({ authenticated = false }: { authenticated?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(9,18,29,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[linear-gradient(135deg,#f97316,#fb7185)] text-sm font-semibold text-white shadow-[0_18px_40px_rgba(249,115,22,0.25)]">
            AC
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] text-white/90 uppercase">Askia Coach</p>
            <p className="text-xs text-white/55">Voice, avatar, and document-aware career coaching</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/72 md:flex">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/coach">Live room</Link>
          <Link href="/workspaces/resume">Resume</Link>
          <Link href="/workspaces/linkedin">LinkedIn</Link>
          <Link href="/interview">Interview</Link>
        </nav>
        <div className="flex items-center gap-3">
          {authenticated ? (
            <LogoutButton className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/80 transition hover:border-white/24 hover:text-white" />
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/80 transition hover:border-white/24 hover:text-white">
                Log in
              </Link>
              <Link href="/signup" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-100">
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.20),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(244,63,94,0.16),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(15,118,110,0.16),transparent_30%),#07111c] text-white">
      <SiteHeader authenticated={authenticated} />
      <main>{children}</main>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full border border-orange-300/25 bg-orange-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-orange-100">{children}</span>;
}

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("mx-auto max-w-7xl px-6 py-16 md:py-20", className)}>{children}</section>;
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
    </div>
  );
}

export function Meter({ value, max }: { value: number; max: number }) {
  const width = `${Math.min((value / max) * 100, 100)}%`;
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-[linear-gradient(90deg,#fb923c,#fb7185)]" style={{ width }} />
    </div>
  );
}
