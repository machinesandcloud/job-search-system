import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/mvp-session-actions";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

const logoFiles = [
  { src: "/logos/airbnb.svg", alt: "Airbnb" },
  { src: "/logos/amazon.svg", alt: "Amazon" },
  { src: "/logos/microsoft.svg", alt: "Microsoft" },
  { src: "/logos/shopify.svg", alt: "Shopify" },
  { src: "/logos/uber.svg", alt: "Uber" },
  { src: "/logos/linkedin.svg", alt: "LinkedIn" },
];

export function SiteHeader({ authenticated = false }: { authenticated?: boolean }) {
  return (
    <>
      <div className="bg-[var(--blue)] px-6 py-3 text-center text-sm font-medium text-white">
        Private beta for candidates refining resumes, LinkedIn stories, and interview performance.
      </div>
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(247,242,234,0.92)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--navy)] text-sm font-semibold text-white">
              AC
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Askia Coach</p>
              <p className="text-base font-semibold tracking-[-0.02em] text-[var(--ink)]">AI career coaching that feels coached.</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--muted)] lg:flex">
            <Link href="/platform" className="transition hover:text-[var(--ink)]">Platform</Link>
            <Link href="/use-cases" className="transition hover:text-[var(--ink)]">Use cases</Link>
            <Link href="/security" className="transition hover:text-[var(--ink)]">Security</Link>
            <Link href="/pricing" className="transition hover:text-[var(--ink)]">Pricing</Link>
            <Link href="/dashboard" className="transition hover:text-[var(--ink)]">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-3">
            {authenticated ? (
              <LogoutButton className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--ink)]/30" />
            ) : (
              <>
                <Link href="/login" className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--ink)]/30">
                  Log in
                </Link>
                <Link href="/signup" className="rounded-full bg-[var(--coral)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--navy)]">
                  Start free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export function PageFrame({ children, authenticated = false }: { children: ReactNode; authenticated?: boolean }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <SiteHeader authenticated={authenticated} />
      <main>{children}</main>
    </div>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]",
        dark
          ? "border-white/20 bg-white/8 text-white"
          : "border-[var(--border)] bg-[var(--surface)] text-[var(--blue)]",
      )}
    >
      {children}
    </span>
  );
}

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("mx-auto max-w-7xl px-6 py-20 md:py-24", className)}>{children}</section>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]", className)}>
      {children}
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{label}</p>
      <p className="mt-4 text-4xl font-semibold leading-none tracking-[-0.05em] text-[var(--ink)]">{value}</p>
    </div>
  );
}

export function Meter({ value, max }: { value: number; max: number }) {
  const width = `${Math.min((value / max) * 100, 100)}%`;
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
      <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--blue),var(--coral))]" style={{ width }} />
    </div>
  );
}

export function LogoStrip({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <div key={item} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)]">
          {item}
        </div>
      ))}
    </div>
  );
}

export function LogoCloud() {
  return (
    <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-6">
      {logoFiles.map((logo) => (
        <div key={logo.alt} className="flex h-20 items-center justify-center rounded-[24px] border border-[var(--border)] bg-[var(--surface)] px-4 shadow-[var(--shadow)]">
          <Image src={logo.src} alt={logo.alt} width={110} height={28} className="h-6 w-auto opacity-80" />
        </div>
      ))}
    </div>
  );
}
