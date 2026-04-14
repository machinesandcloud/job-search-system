import Link from "next/link";
import type { ReactNode } from "react";
import { Card, Eyebrow, LogoCloud, PageFrame, Section, Stat } from "@/components/mvp";

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
      <Section className="pb-10 pt-10">
        <div className="overflow-hidden rounded-[40px] border border-[rgba(221,227,239,0.5)] bg-[linear-gradient(135deg,#0d1630_0%,#152652_100%)] shadow-[var(--shadow-lg)]">
          <div className="grid gap-0 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="relative px-8 py-10 text-white md:px-12 md:py-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,102,255,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,107,61,0.16),transparent_26%)]" />
              <div className="relative">
                <Eyebrow dark>{eyebrow}</Eyebrow>
                <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-[-0.05em] md:text-7xl">{title}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{description}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  {primaryCta ? (
                    <Link href={primaryCta.href} className="rounded-full bg-[var(--coral)] px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--navy)]">
                      {primaryCta.label}
                    </Link>
                  ) : null}
                  {secondaryCta ? (
                    <Link href={secondaryCta.href} className="rounded-full border border-white/16 bg-white/8 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--navy)]">
                      {secondaryCta.label}
                    </Link>
                  ) : null}
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {stats.map((item) => (
                    <Stat key={item.label} label={item.label} value={item.value} inverted />
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-[linear-gradient(180deg,#eff3ff_0%,#f7f8fc_100%)] p-6 md:p-8">
              <div className="grid gap-4">
                <div className="rounded-[30px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)]">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--blue)]">Outcome spotlight</p>
                  <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--ink)]">{spotlightTitle}</h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{spotlightBody}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {spotlightPoints.map((item, index) => (
                    <div
                      key={item}
                      className={
                        index === 0
                          ? "rounded-[26px] bg-[linear-gradient(135deg,#3866ff_0%,#6c8cff_100%)] p-5 text-white shadow-[var(--shadow)]"
                          : index === 1
                            ? "rounded-[26px] bg-[linear-gradient(135deg,#ff6b3d_0%,#ff9366_100%)] p-5 text-white shadow-[var(--shadow)]"
                            : "rounded-[26px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]"
                      }
                    >
                      <p className={`text-[11px] font-extrabold uppercase tracking-[0.22em] ${index < 2 ? "text-white/72" : "text-[var(--muted)]"}`}>
                        {index === 0 ? "Resume" : index === 1 ? "Interview" : "Follow-through"}
                      </p>
                      <p className={`mt-3 text-sm leading-7 ${index < 2 ? "text-white" : "text-[var(--muted)]"}`}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-2">
        <p className="mb-5 text-center text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--muted)]">
          Designed for candidates moving toward higher-signal roles
        </p>
        <LogoCloud />
      </Section>

      {children}
    </PageFrame>
  );
}
