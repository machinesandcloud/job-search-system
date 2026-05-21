import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs CoachUp 2025 — AI vs Human Career Coaching Comparison",
  description: "Zari vs CoachUp: AI-driven career coaching platform vs human coaching marketplace. Which delivers better ROI for your job search?",
  keywords: ["zari vs coachup", "coachup alternative", "coachup career coaching", "ai vs human career coaching", "coachup review", "best career coaching platform 2025"],
  alternates: { canonical: "/compare/zari-vs-coachup" },
  openGraph: { title: "Zari vs CoachUp 2025 — AI vs Human Career Coaching", description: "AI career coaching vs human coaching marketplace — feature comparison, pricing, and which is right for your job search.", url: "/compare/zari-vs-coachup" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARE = [
  { dimension: "Availability", zari: "24/7 — start now, any timezone", them: "Scheduled sessions with human coaches", winner: "zari" },
  { dimension: "Cost", zari: "Free tier + from $29/month unlimited", them: "Per-session human coaching rates ($75–$300/hr)", winner: "zari" },
  { dimension: "Resume & ATS", zari: "ATS scoring, keyword gap analysis, bullet rewrites", them: "Human resume review (turnaround time: days)", winner: "zari" },
  { dimension: "Interview coaching", zari: "Unlimited AI mock sessions with STAR scoring", them: "Human mock interviews with personal feedback", winner: "tie" },
  { dimension: "Personal connection", zari: "AI-powered, structured coaching", them: "Real human relationship and accountability", winner: "them" },
  { dimension: "Salary negotiation", zari: "Live negotiation simulation + market data", them: "Negotiation strategy with human coach", winner: "tie" },
];

export default async function ZariVsCoachUpPage() {
  const userId = await getCurrentUserId();
  const zariWins = COMPARE.filter(r => r.winner === "zari").length;
  const themWins = COMPARE.filter(r => r.winner === "them").length;
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Compare", url: `${BASE_URL}/compare` }, { name: "Zari vs CoachUp", url: `${BASE_URL}/compare/zari-vs-coachup` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 45%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI vs Human Coaching
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.4rem]">
            Zari vs CoachUp
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/55">
            AI career coaching versus a human coaching marketplace. Both have their place — here&apos;s the honest comparison.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#7C3AED]">Try Zari free</Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex justify-center">
            <WinScore zariWins={zariWins} total={COMPARE.length} competitorName="CoachUp" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Feature comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Dimension</span>
              <span className="text-[#7C3AED]">Zari</span>
              <span>CoachUp</span>
            </div>
            {COMPARE.map(({ dimension, zari, them, winner }) => (
              <div key={dimension} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{dimension}</span>
                <span className={winner === "zari" ? "font-semibold text-[#7C3AED]" : "text-[var(--muted)]"}>{zari}</span>
                <span className={winner === "them" ? "font-semibold text-[var(--ink)]" : "text-[var(--muted)]"}>{them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">The honest verdict</h2>
          <p className="mb-6 text-[14px] leading-7 text-[var(--muted)]">CoachUp and Zari aren&apos;t always competing — they can complement each other. Most job seekers benefit from Zari for systematic daily preparation (resume optimisation, unlimited interview practice, salary simulation) and a human coach for specific high-stakes moments like a final-round interview at a dream company or a difficult negotiation.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#7C3AED]/30 bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px] text-[#7C3AED]">Choose Zari if:</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["You want unlimited practice without scheduling", "Budget matters — $29/month vs $75–$300/hr", "You need ATS scoring and keyword gap analysis", "You&apos;re preparing for multiple applications at once", "You want 24/7 availability during active job search"].map(p => (
                  <li key={p} className="flex items-start gap-2"><span className="mt-0.5 flex-shrink-0 text-[#7C3AED]">✓</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px]">Consider a human coach if:</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["You&apos;re preparing for a single critical high-stakes interview", "You want personal accountability and a relationship", "Your situation requires nuanced human judgment", "You&apos;ve done the systematic prep and want personalised polish"].map(p => (
                  <li key={p} className="flex items-start gap-2"><span className="mt-0.5 flex-shrink-0 text-[var(--muted)]">→</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold tracking-[-0.02em]">Start with Zari — free, no credit card.</h2>
          <p className="mb-8 text-[15px] text-white/55">Build your interview library, score your resume, and prep your negotiation — before your first coaching session costs you anything.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED]">Start free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
