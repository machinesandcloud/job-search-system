import Link from "next/link";
import type { ReactNode } from "react";
import { Card, Eyebrow, LogoCloud, PageFrame, Section } from "@/components/mvp";

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
  children: ReactNode;
}) {
  return (
    <PageFrame authenticated={authenticated}>
      <Section className="pb-12 pt-12">
        <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-8 max-w-4xl text-5xl leading-[0.95] tracking-[-0.04em] text-[var(--ink)] md:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta ? (
                <Link href={primaryCta.href} className="rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--blue)]">
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={secondaryCta.href} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--blue)]">
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
          <Card className="overflow-hidden border-none bg-[var(--navy)] p-0 text-white">
            <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[260px] bg-[linear-gradient(135deg,#3559e6_0%,#8e85ff_100%)]">
                <div className="absolute left-8 top-8 h-24 w-24 rounded-[30px] border border-white/20 bg-white/10" />
                <div className="absolute bottom-10 left-10 h-28 w-28 rounded-full bg-[rgba(255,255,255,0.18)] blur-2xl" />
                <div className="absolute right-10 top-14 h-36 w-36 rounded-full border border-white/25 bg-[rgba(255,255,255,0.1)]" />
                <div className="absolute bottom-8 right-8 max-w-[220px] rounded-[28px] border border-white/20 bg-[rgba(255,255,255,0.12)] p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/70">Outcome</p>
                  <p className="mt-3 text-2xl leading-tight tracking-[-0.03em]">{spotlightTitle}</p>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">Why this page exists</p>
                <p className="mt-4 text-lg leading-8 text-white/82">{spotlightBody}</p>
                <div className="mt-7 grid gap-3">
                  {spotlightPoints.map((item) => (
                    <div key={item} className="rounded-[22px] border border-white/12 bg-white/6 px-4 py-4 text-sm leading-7 text-white/78">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
          Built for candidates targeting roles across modern teams
        </p>
        <LogoCloud />
      </Section>

      {children}
    </PageFrame>
  );
}
