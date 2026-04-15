import Link from "next/link";
import type { ReactNode } from "react";
import { LogoCloud, PageFrame, Section } from "@/components/mvp";

type Cta = { href: string; label: string };

export function MarketingShell({
  authenticated = false,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  spotlightTitle,
  spotlightBody,
  spotlightPoints,
  stats,
  children,
}: {
  authenticated?: boolean;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  spotlightTitle: string;
  spotlightBody: string;
  spotlightPoints: string[];
  stats: Array<{ label: string; value: string }>;
  children: ReactNode;
}) {
  return (
    <PageFrame authenticated={authenticated}>
      {/* ── Hero ── */}
      <section className="border-b border-[var(--border)] bg-white pb-16 pt-14 md:pb-20 md:pt-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-3.5 py-1.5 text-xs font-semibold text-[var(--brand)]">
                {eyebrow}
              </div>
              <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.07] tracking-[-0.03em] text-[var(--ink)] md:text-5xl lg:text-[3.25rem]">
                {title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                {description}
              </p>
              {(primaryCta || secondaryCta) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {primaryCta && (
                    <Link
                      href={primaryCta.href}
                      className="inline-flex h-11 items-center rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition-colors hover:bg-[var(--brand-hover)]"
                    >
                      {primaryCta.label} →
                    </Link>
                  )}
                  {secondaryCta && (
                    <Link
                      href={secondaryCta.href}
                      className="inline-flex h-11 items-center rounded-xl border border-[var(--border)] bg-white px-6 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
                    >
                      {secondaryCta.label}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Right — spotlight card */}
            <div className="rounded-2xl bg-[var(--dark)] p-7 text-white md:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Why it matters
              </p>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                {spotlightTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/55">{spotlightBody}</p>

              <div className="mt-6 space-y-2.5">
                {spotlightPoints.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--teal)]" />
                    <span className="text-sm leading-6 text-white/65">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-5 border-t border-white/[0.07] pt-7 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                      {item.label}
                    </p>
                    <p className="text-2xl font-extrabold tracking-tight text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo strip ── */}
      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)] py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Designed for candidates aiming at companies like
          </p>
          <LogoCloud />
        </div>
      </section>

      {/* ── Page-specific content ── */}
      {children}

      {/* ── CTA banner ── */}
      <section className="bg-[var(--brand)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Ready to start coaching?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/65">
            Free to start. No credit card required.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center rounded-xl bg-white px-7 text-sm font-bold text-[var(--brand)] shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-colors hover:bg-white/90"
            >
              Get started free →
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center rounded-xl border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Try the demo
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
