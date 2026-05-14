import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/mvp-session-actions";
import { ZariLogo } from "@/components/zari-logo";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

// Company logo set
const logoFiles = [
  { src: "/logos/google.svg", alt: "Google" },
  { src: "/logos/meta.svg", alt: "Meta" },
  { src: "/logos/microsoft.svg", alt: "Microsoft" },
  { src: "/logos/amazon.svg", alt: "Amazon" },
  { src: "/logos/stripe.svg", alt: "Stripe" },
  { src: "/logos/figma.svg", alt: "Figma" },
  { src: "/logos/shopify.svg", alt: "Shopify" },
  { src: "/logos/notion.svg", alt: "Notion" },
  { src: "/logos/airbnb.svg", alt: "Airbnb" },
  { src: "/logos/spotify.svg", alt: "Spotify" },
];

export { ZariLogo as ZariLogoAlias };

export function SiteHeader({ authenticated = false }: { authenticated?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)]/60 bg-white/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <ZariLogo size={34} />
          <div className="leading-none">
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Zari
            </span>
            <span className="ml-1 text-[15px] font-medium tracking-tight text-[var(--muted)]">
              AI Coach
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-7 text-[13.5px] font-medium text-[var(--muted)] lg:flex">
          <Link href="/platform" className="transition-colors hover:text-[var(--ink)]">Platform</Link>
          <Link href="/use-cases" className="transition-colors hover:text-[var(--ink)]">Use Cases</Link>
          <Link href="/pricing" className="transition-colors hover:text-[var(--ink)]">Pricing</Link>
          {authenticated && (
            <Link href="/dashboard" className="transition-colors hover:text-[var(--ink)]">Dashboard</Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {authenticated ? (
            <LogoutButton className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]" />
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-4 py-2 text-[13.5px] font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-[var(--brand)] px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[var(--shadow-brand)] transition-all hover:bg-[var(--brand-hover)] hover:-translate-y-0.5"
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
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <ZariLogo size={28} />
              <span className="text-sm font-bold text-[var(--ink)]">
                Zari{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  AI Coach
                </span>
              </span>
            </Link>
            <p className="mt-2 max-w-xs text-xs leading-5 text-[var(--muted)]">
              Voice-powered AI career coaching. Real feedback, real preparation, real results.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm text-[var(--muted)] sm:grid-cols-4">
            {[
              { label: "Platform", href: "/platform" },
              { label: "Use Cases", href: "/use-cases" },
              { label: "Pricing", href: "/pricing" },
              { label: "Security", href: "/security" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-[var(--ink)]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--muted)]">© 2026 Zari AI. All rights reserved.</p>
          <p className="text-xs text-[var(--muted)]">
            Powered by{" "}
            <a href="https://zaricoach.com" target="_blank" rel="noopener noreferrer" className="text-[var(--brand)] hover:underline">
              zaricoach.com
            </a>
          </p>
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
    <span className={cn(
      "inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.18em]",
      dark ? "text-white/50" : "text-[var(--brand)]"
    )}>
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
    <div className={cn(
      "rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]",
      className
    )}>
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
      <p className={cn(
        "text-[11px] font-medium uppercase tracking-[0.18em]",
        dark ? "text-white/40" : "text-[var(--muted)]"
      )}>
        {label}
      </p>
      <p className={cn(
        "text-3xl font-extrabold tracking-tight",
        dark ? "text-white" : "text-[var(--ink)]"
      )}>
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
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand),var(--cyan))]"
        style={{ width }}
      />
    </div>
  );
}

export function LogoStrip({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3">
      {items.map((item) => (
        <span key={item} className="text-sm font-medium text-[var(--muted)]">{item}</span>
      ))}
    </div>
  );
}

export function LogoCloud() {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-5 opacity-50">
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
