import Link from "next/link";
import { Card, Eyebrow, LogoStrip, PageFrame, Section } from "@/components/mvp";

export function MarketingShell({
  authenticated = false,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
}: {
  authenticated?: boolean;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <PageFrame authenticated={authenticated}>
      <Section className="grid gap-8 pb-10 pt-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] text-[var(--ink)] md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta ? (
              <Link href={primaryCta.href} className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--bg-soft)] transition hover:bg-[var(--teal)]">
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--teal)]">
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
          <div className="mt-8">
            <LogoStrip items={["Resume review", "LinkedIn rewrite", "Interview practice", "Action plans", "Session memory"]} />
          </div>
        </div>
        <Card className="bg-[var(--ink)] text-[var(--bg-soft)]">
          <p className="text-sm uppercase tracking-[0.22em] text-[rgba(246,241,232,0.58)]">Reference pattern</p>
          <div className="mt-5 grid gap-3 text-sm">
            <div className="rounded-2xl bg-[rgba(255,255,255,0.08)] px-4 py-4">Dedicated product pages, not just one landing surface.</div>
            <div className="rounded-2xl bg-[rgba(255,255,255,0.08)] px-4 py-4">Warm, high-trust UI with structured product storytelling.</div>
            <div className="rounded-2xl bg-[rgba(255,255,255,0.08)] px-4 py-4">Enterprise-style security and trust framing alongside practical use cases.</div>
          </div>
        </Card>
      </Section>
      {children}
    </PageFrame>
  );
}
