import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow, LogoCloud, PageFrame, Section, Stat } from "@/components/mvp";

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
      <Section className="pb-12 pt-12">
        <div className="grid gap-12 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-[-0.05em] text-[var(--ink)] md:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta ? (
                <Link href={primaryCta.href} className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--blue)]">
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={secondaryCta.href} className="rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-bold text-[var(--ink)] transition hover:border-[var(--blue)]">
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
          <div className="rounded-[36px] bg-[linear-gradient(135deg,#0d1630_0%,#172a5a_100%)] px-8 py-10 text-white shadow-[var(--shadow-lg)]">
            <Eyebrow dark>Why it matters</Eyebrow>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.04] tracking-[-0.04em]">{spotlightTitle}</h2>
            <p className="mt-5 text-base leading-8 text-white/76">{spotlightBody}</p>
            <div className="mt-7 grid gap-3">
              {spotlightPoints.map((item) => (
                <div key={item} className="border-l-2 border-white/22 pl-4 text-sm leading-7 text-white/72">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-3">
              {stats.map((item) => (
                <Stat key={item.label} label={item.label} value={item.value} dark />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <p className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--muted)]">
          Designed for candidates aiming at companies like
        </p>
        <LogoCloud />
      </Section>

      {children}
    </PageFrame>
  );
}
