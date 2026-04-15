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
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-xs font-black text-white">
            A
          </div>
          <span className="text-[15px] font-bold tracking-tight text-[var(--ink)]">
            Askia<span className="text-[var(--brand)]">.</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--muted)] lg:flex">
          <Link href="/platform" className="transition-colors hover:text-[var(--ink)]">
            Platform
          </Link>
          <Link href="/use-cases" className="transition-colors hover:text-[var(--ink)]">
            Use Cases
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-[var(--ink)]">
            Pricing
          </Link>
          {authenticated && (
            <Link href="/dashboard" className="transition-colors hover:text-[var(--ink)]">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {authenticated ? (
            <LogoutButton className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]" />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition-colors hover:bg-[var(--brand-hover)]"
              >
                Get started →
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--brand)] text-[10px] font-black text-white">
              A
            </div>
            <span className="text-sm font-bold text-[var(--ink)]">Askia Coach</span>
          </Link>
          <nav className="flex flex-wrap gap-6 text-sm text-[var(--muted)]">
            <Link href="/platform" className="transition-colors hover:text-[var(--ink)]">Platform</Link>
            <Link href="/use-cases" className="transition-colors hover:text-[var(--ink)]">Use Cases</Link>
            <Link href="/pricing" className="transition-colors hover:text-[var(--ink)]">Pricing</Link>
            <Link href="/security" className="transition-colors hover:text-[var(--ink)]">Security</Link>
          </nav>
          <p className="text-xs text-[var(--muted)]">© 2026 Askia Coach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function PageFrame({
  children,
  authenticated = false,
}: {
  children: ReactNode;
  authenticated?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col text-[var(--ink)]">
      <SiteHeader authenticated={authenticated} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.18em]",
        dark ? "text-white/50" : "text-[var(--brand)]"
      )}
    >
      {children}
    </span>
  );
}

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("mx-auto max-w-7xl px-6 py-16 md:py-24", className)}>
      {children}
    </section>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  dark = false,
}: {
  label: string;
  value: string;
  dark?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p
        className={cn(
          "text-[11px] font-medium uppercase tracking-[0.18em]",
          dark ? "text-white/40" : "text-[var(--muted)]"
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "text-3xl font-extrabold tracking-tight",
          dark ? "text-white" : "text-[var(--ink)]"
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function Meter({ value, max }: { value: number; max: number }) {
  const width = `${Math.min((value / max) * 100, 100)}%`;
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand),var(--teal))]"
        style={{ width }}
      />
    </div>
  );
}

export function LogoStrip({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3">
      {items.map((item) => (
        <span key={item} className="text-sm font-medium text-[var(--muted)]">
          {item}
        </span>
      ))}
    </div>
  );
}

export function LogoCloud() {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-5 opacity-55">
      {logoFiles.map((logo) => (
        <Image
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          width={108}
          height={28}
          className="h-5 w-auto"
        />
      ))}
    </div>
  );
}
