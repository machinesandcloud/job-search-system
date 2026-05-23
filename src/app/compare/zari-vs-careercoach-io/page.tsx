import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs CareerCoach.io 2025 — AI Career Coaching Comparison",
  description: "Zari vs CareerCoach.io: which platform delivers better resume coaching, interview prep, and salary negotiation support? Full feature-by-feature comparison.",
  keywords: ["zari vs careercoach io", "careercoach.io alternative", "careercoach io review", "best ai career coach", "careercoach io vs zari", "ai career coaching comparison 2025"],
  alternates: { canonical: "/compare/zari-vs-careercoach-io" },
  openGraph: { title: "Zari vs CareerCoach.io 2025 — Which AI Career Coach Wins?", description: "Feature-by-feature comparison: resume coaching, interview prep, salary negotiation, pricing.", url: "/compare/zari-vs-careercoach-io" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARE = [
  { dimension: "Resume & ATS scoring", zari: "ATS scoring + keyword gap analysis + bullet rewrites", them: "Resume feedback and suggestions", winner: "zari" },
  { dimension: "Interview coaching", zari: "Unlimited STAR-scored mock sessions, behavioral & technical", them: "Interview question prep and tips", winner: "zari" },
  { dimension: "Salary negotiation", zari: "Live simulation, market benchmarks, counter-offer scripts", them: "General negotiation guidance", winner: "zari" },
  { dimension: "LinkedIn optimisation", zari: "Headline, About, and experience rewrites with visibility score", them: "LinkedIn profile tips", winner: "zari" },
  { dimension: "Promotion coaching", zari: "Promotion case builder + manager conversation simulation", them: "Career advancement advice", winner: "zari" },
  { dimension: "Pricing", zari: "Free tier + from $29/month unlimited", them: "Subscription-based, check current pricing", winner: "tie" },
];

export default async function ZariVsCareerCoachIOPage() {
  const userId = await getCurrentUserId();
  const zariWins = COMPARE.filter(r => r.winner === "zari").length;
  const themWins = COMPARE.filter(r => r.winner === "them").length;
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Compare", url: `${BASE_URL}/compare` }, { name: "Zari vs CareerCoach.io", url: `${BASE_URL}/compare/zari-vs-careercoach-io` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 45%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Head-to-Head Comparison
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.4rem]">
            Zari vs CareerCoach.io
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/55">
            Both platforms offer AI career coaching. Here&apos;s where they differ on the dimensions that actually matter for your job search.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#0D7182]">Try Zari free</Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex justify-center">
            <WinScore zariWins={zariWins} total={COMPARE.length} competitorName="CareerCoach.io" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Feature comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Dimension</span>
              <span className="text-[#4361EE]">Zari</span>
              <span>CareerCoach.io</span>
            </div>
            {COMPARE.map(({ dimension, zari, them, winner }) => (
              <div key={dimension} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{dimension}</span>
                <span className={winner === "zari" ? "font-semibold text-[#4361EE]" : "text-[var(--muted)]"}>{zari}</span>
                <span className={winner === "them" ? "font-semibold text-[var(--ink)]" : "text-[var(--muted)]"}>{them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Which should you use?</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px] text-[#4361EE]">Choose Zari if you need:</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["Live salary negotiation simulations with market data", "Unlimited STAR-scored mock interviews 24/7", "ATS scoring with keyword gap analysis against your JD", "LinkedIn headline + About rewrites with visibility scoring", "Promotion case builder and manager conversation prep"].map(p => (
                  <li key={p} className="flex items-start gap-2"><span className="mt-0.5 flex-shrink-0 text-[#4361EE]">✓</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px]">Consider CareerCoach.io if:</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["You want a different coaching interface or approach", "You&apos;ve already tried Zari and want to compare firsthand", "You have specific needs that a niche platform serves better"].map(p => (
                  <li key={p} className="flex items-start gap-2"><span className="mt-0.5 flex-shrink-0 text-[var(--muted)]">→</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold tracking-[-0.02em]">Try Zari — free, no credit card.</h2>
          <p className="mb-8 text-[15px] text-white/55">Resume scoring, interview prep, salary coaching, LinkedIn optimisation, and promotion coaching. One platform, available now.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Start free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
