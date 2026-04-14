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
    <header className="sticky top-0 z-40 border-b border-[rgba(221,227,239,0.75)] bg-[rgba(245,246,251,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--navy)] text-sm font-bold text-white">
            AC
          </div>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--blue)]">Askia Coach</p>
            <p className="text-sm font-semibold text-[var(--ink)]">AI career coaching for candidates in motion</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-[var(--muted)] lg:flex">
          <Link href="/platform" className="transition hover:text-[var(--ink)]">Platform</Link>
          <Link href="/use-cases" className="transition hover:text-[var(--ink)]">Use cases</Link>
          <Link href="/security" className="transition hover:text-[var(--ink)]">Security</Link>
          <Link href="/pricing" className="transition hover:text-[var(--ink)]">Pricing</Link>
          <Link href="/dashboard" className="transition hover:text-[var(--ink)]">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          {authenticated ? (
            <LogoutButton className="rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--ink)] transition hover:border-[var(--blue)]" />
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--ink)] transition hover:border-[var(--blue)]">
                Log in
              </Link>
              <Link href="/signup" className="rounded-full bg-[var(--coral)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--navy)]">
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

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={cn("inline-flex text-[11px] font-extrabold uppercase tracking-[0.24em]", dark ? "text-white/72" : "text-[var(--blue)]")}>
      {children}
    </span>
  );
}

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("mx-auto max-w-7xl px-6 py-18 md:py-24", className)}>{children}</section>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-[28px] bg-white p-7 shadow-[var(--shadow)]", className)}>{children}</div>;
}

export function Stat({ label, value, dark = false }: { label: string; value: string; dark?: boolean }) {
  return (
    <div className={cn("space-y-2", dark ? "text-white" : "text-[var(--ink)]")}>
      <p className={cn("text-[11px] font-extrabold uppercase tracking-[0.22em]", dark ? "text-white/60" : "text-[var(--muted)]")}>{label}</p>
      <p className="text-3xl font-extrabold tracking-[-0.05em]">{value}</p>
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
    <div className="flex flex-wrap gap-x-6 gap-y-3">
      {items.map((item) => (
        <div key={item} className="text-sm font-semibold text-[var(--muted)]">
          {item}
        </div>
      ))}
    </div>
  );
}

export function LogoCloud() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 opacity-70">
      {logoFiles.map((logo) => (
        <Image key={logo.alt} src={logo.src} alt={logo.alt} width={108} height={28} className="h-5 w-auto" />
      ))}
    </div>
  );
}
