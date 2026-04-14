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
    <header className="sticky top-0 z-40 border-b border-[rgba(221,227,239,0.85)] bg-[rgba(245,246,251,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--navy)] text-sm font-bold text-white shadow-[var(--shadow)]">
            AC
          </div>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--blue)]">Askia Coach</p>
            <p className="text-sm font-semibold text-[var(--ink)]">Career coaching for modern candidates</p>
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
    <span
      className={cn(
        "inline-flex rounded-full border px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.22em]",
        dark ? "border-white/16 bg-white/10 text-white" : "border-[var(--border)] bg-white text-[var(--blue)]",
      )}
    >
      {children}
    </span>
  );
}

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("mx-auto max-w-7xl px-6 py-18 md:py-24", className)}>{children}</section>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[28px] border border-[var(--border)] bg-white p-7 shadow-[var(--shadow)]", className)}>
      {children}
    </div>
  );
}

export function Stat({ label, value, inverted = false }: { label: string; value: string; inverted?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-[24px] border p-5",
        inverted ? "border-white/10 bg-white/8 text-white" : "border-[var(--border)] bg-white text-[var(--ink)]",
      )}
    >
      <p className={cn("text-[11px] font-extrabold uppercase tracking-[0.22em]", inverted ? "text-white/62" : "text-[var(--muted)]")}>
        {label}
      </p>
      <p className="mt-3 text-3xl font-extrabold tracking-[-0.05em]">{value}</p>
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
        <div key={item} className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--muted)]">
          {item}
        </div>
      ))}
    </div>
  );
}

export function LogoCloud() {
  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {logoFiles.map((logo) => (
        <div key={logo.alt} className="flex h-16 items-center justify-center rounded-[20px] border border-[var(--border)] bg-white px-4">
          <Image src={logo.src} alt={logo.alt} width={96} height={24} className="h-5 w-auto opacity-70" />
        </div>
      ))}
    </div>
  );
}
