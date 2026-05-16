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
          <Link href="/ai-career-coach" className="transition-colors hover:text-[var(--ink)]">AI Coach</Link>
          <Link href="/platform" className="transition-colors hover:text-[var(--ink)]">Platform</Link>
          <Link href="/pricing" className="transition-colors hover:text-[var(--ink)]">Pricing</Link>
          <Link href="/blog" className="transition-colors hover:text-[var(--ink)]">Blog</Link>
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
  const footerCols = [
    {
      heading: "AI Coaching",
      links: [
        { label: "AI Career Coach", href: "/ai-career-coach" },
        { label: "AI Resume Writer", href: "/ai-resume-writer" },
        { label: "AI Interview Coach", href: "/ai-interview-coach" },
        { label: "AI LinkedIn Optimizer", href: "/ai-linkedin-optimizer" },
        { label: "Cover Letter Writer", href: "/cover-letter-writer" },
        { label: "Salary Negotiation Coach", href: "/salary-negotiation-coach" },
        { label: "Promotion Coach", href: "/promotion-coach" },
      ],
    },
    {
      heading: "Coaching by Need",
      links: [
        { label: "Career Change Coach", href: "/career-change-coach" },
        { label: "Personal Career Coach", href: "/personal-career-coach" },
        { label: "Free Career Coach", href: "/free-career-coach" },
        { label: "Career Coach Tool", href: "/career-coach-tool" },
        { label: "Resume Review Service", href: "/resume-review-service" },
        { label: "Career Coaching Software", href: "/career-coaching-software" },
      ],
    },
    {
      heading: "By Profession",
      links: [
        { label: "Software Engineers", href: "/career-coach-for-software-engineers" },
        { label: "Product Managers", href: "/career-coach-for-product-managers" },
        { label: "Data Scientists", href: "/career-coach-for-data-scientists" },
        { label: "Finance Professionals", href: "/career-coach-for-finance-professionals" },
        { label: "Sales Professionals", href: "/career-coach-for-sales-professionals" },
        { label: "Designers", href: "/career-coach-for-designers" },
        { label: "HR Professionals", href: "/career-coach-for-hr-professionals" },
        { label: "Cybersecurity", href: "/career-coach-for-cybersecurity-professionals" },
        { label: "Executives", href: "/career-coach-for-executives" },
        { label: "Nurses", href: "/career-coach-for-nurses" },
        { label: "Teachers", href: "/career-coach-for-teachers" },
        { label: "Marketing Professionals", href: "/career-coach-for-marketing-professionals" },
        { label: "Operations Professionals", href: "/career-coach-for-operations-professionals" },
        { label: "Lawyers", href: "/career-coach-for-lawyers" },
        { label: "Accountants & CPAs", href: "/career-coach-for-accountants" },
        { label: "Project Managers", href: "/career-coach-for-project-managers" },
        { label: "Recent Graduates", href: "/career-coach-for-recent-graduates" },
        { label: "UX Designers", href: "/career-coach-for-ux-designers" },
        { label: "Consultants", href: "/career-coach-for-consultants" },
      ],
    },
    {
      heading: "Product",
      links: [
        { label: "Platform", href: "/platform" },
        { label: "Use Cases", href: "/use-cases" },
        { label: "Pricing", href: "/pricing" },
        { label: "Security", href: "/security" },
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Best AI Career Coach", href: "/blog/best-ai-career-coach" },
        { label: "How to Write a Resume with AI", href: "/blog/how-to-write-resume-with-ai" },
        { label: "ATS Resume Tips", href: "/blog/ats-resume-tips" },
        { label: "STAR Method Interview", href: "/blog/star-method-interview" },
        { label: "Behavioral Interview Questions", href: "/blog/behavioral-interview-questions" },
        { label: "How to Write a Cover Letter", href: "/blog/how-to-write-a-cover-letter" },
        { label: "Interview Prep Guide", href: "/blog/how-to-prepare-for-job-interview" },
        { label: "Zari vs Enhancv", href: "/compare/zari-vs-enhancv" },
        { label: "Zari vs Novoresume", href: "/compare/zari-vs-novoresume" },
        { label: "Zari vs Zety", href: "/compare/zari-vs-zety" },
        { label: "Zari vs Microsoft Copilot", href: "/compare/zari-vs-microsoft-copilot" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <ZariLogo size={28} />
              <span className="text-sm font-bold text-[var(--ink)]">
                Zari{" "}
                <span style={{ background: "linear-gradient(135deg, #7C3AED, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  AI Coach
                </span>
              </span>
            </Link>
            <p className="mt-3 max-w-[200px] text-[12px] leading-5 text-[var(--muted)]">
              The #1 AI career coach for resume, LinkedIn, interviews, and salary negotiation.
            </p>
            <div className="mt-4 flex items-center gap-1.5 rounded-lg border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] px-3 py-2 text-[11px] font-semibold text-[var(--brand)]">
              Free to start · No credit card
            </div>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[12.5px] text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-[var(--muted)]">© 2025 Zari AI. All rights reserved. · <a href="https://zaricoach.com" className="hover:underline">zaricoach.com</a></p>
          <div className="flex items-center gap-4 text-[11px] text-[var(--muted)]">
            <Link href="/terms" className="hover:text-[var(--ink)]">Terms</Link>
            <Link href="/privacy" className="hover:text-[var(--ink)]">Privacy</Link>
            <Link href="/security" className="hover:text-[var(--ink)]">Security</Link>
          </div>
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
