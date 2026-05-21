import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs Pathrise 2025 — Career Coaching Comparison",
  description: "Zari vs Pathrise: AI career coaching platform vs accelerator with ISA (income share agreement). Which delivers better results for your tech job search?",
  keywords: ["zari vs pathrise", "pathrise alternative", "pathrise review 2025", "pathrise isa", "pathrise career coaching", "tech job search coaching", "income share agreement career coaching"],
  alternates: { canonical: "/compare/zari-vs-pathrise" },
  openGraph: { title: "Zari vs Pathrise 2025 — AI Coaching vs Accelerator with ISA", description: "AI career coaching vs Pathrise accelerator — feature comparison, ISA risk vs monthly cost, and which is right for your job search.", url: "/compare/zari-vs-pathrise" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARE = [
  { dimension: "Business model", zari: "Monthly subscription, cancel anytime", them: "Income Share Agreement (% of salary for 2 years)", winner: "zari" },
  { dimension: "Upfront cost", zari: "Free tier, from $29/month", them: "No upfront cost, but ISA kicks in at hire", winner: "tie" },
  { dimension: "Total cost", zari: "$29–$99/month while searching", them: "Up to $20,000+ in ISA repayments after hire", winner: "zari" },
  { dimension: "Availability", zari: "24/7 AI — start now", them: "Scheduled sessions with assigned advisor", winner: "zari" },
  { dimension: "Resume & ATS", zari: "ATS scoring, keyword gap, bullet rewrites", them: "Resume review with human advisor", winner: "zari" },
  { dimension: "Human accountability", zari: "AI-guided coaching", them: "Dedicated human advisor with check-ins", winner: "them" },
  { dimension: "Interview coaching", zari: "Unlimited AI mock sessions, STAR scoring", them: "Advisor mock interviews + referrals to companies", winner: "tie" },
  { dimension: "Company referrals", zari: "Not included", them: "Referrals to Pathrise partner companies", winner: "them" },
];

export default async function ZariVsPathrisePage() {
  const userId = await getCurrentUserId();
  const zariWins = COMPARE.filter(r => r.winner === "zari").length;
  const themWins = COMPARE.filter(r => r.winner === "them").length;
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Compare", url: `${BASE_URL}/compare` }, { name: "Zari vs Pathrise", url: `${BASE_URL}/compare/zari-vs-pathrise` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 45%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Subscription vs ISA
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.4rem]">
            Zari vs Pathrise
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/55">
            Pathrise uses an income share agreement — you pay a percentage of your salary for 2 years after landing a job. Zari charges $29/month. Here&apos;s what that difference actually means.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#D97706]">Try Zari free</Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex justify-center">
            <WinScore zariWins={zariWins} total={COMPARE.length} competitorName="Pathrise" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-4 text-[1.9rem] font-extrabold tracking-[-0.02em]">The ISA cost calculation</h2>
          <p className="mb-6 text-[14px] leading-7 text-[var(--muted)]">Pathrise&apos;s income share agreement typically takes 4–8% of your salary for 18–24 months, capped at a total repayment amount. On a $120,000 salary with a 4% ISA for 24 months, that&apos;s $9,600. Some users find this worth it for the human accountability and referral access. Others find it expensive compared to tools that cost $29/month.</p>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Scenario</span><span className="text-[#D97706]">Zari cost</span><span>Pathrise ISA (est.)</span>
            </div>
            {[
              { s: "3-month job search, $100k salary", z: "$87 (3 × $29)", p: "$8,000 (4% × $100k × 24mo)" },
              { s: "6-month job search, $120k salary", z: "$174 (6 × $29)", p: "$9,600 (4% × $120k × 24mo)" },
              { s: "Pro plan 12 months, $150k salary", z: "$348 (12 × $29)", p: "$12,000+ (4% × $150k × 24mo)" },
            ].map(({ s, z, p }) => (
              <div key={s} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="text-[var(--muted)]">{s}</span>
                <span className="font-bold text-[#D97706]">{z}</span>
                <span className="text-[var(--muted)]">{p}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Full feature comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Dimension</span>
              <span className="text-[#D97706]">Zari</span>
              <span>Pathrise</span>
            </div>
            {COMPARE.map(({ dimension, zari, them, winner }) => (
              <div key={dimension} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{dimension}</span>
                <span className={winner === "zari" ? "font-semibold text-[#D97706]" : "text-[var(--muted)]"}>{zari}</span>
                <span className={winner === "them" ? "font-semibold text-[var(--ink)]" : "text-[var(--muted)]"}>{them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Who should use which?</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#D97706]/30 bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px] text-[#D97706]">Choose Zari if:</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["You want to avoid a multi-year income share commitment", "You need unlimited 24/7 interview practice now", "ATS optimisation and keyword analysis are your immediate need", "You want to pay as you search, not after you succeed", "You&apos;re senior enough that you don&apos;t need company referrals"].map(p => (
                  <li key={p} className="flex items-start gap-2"><span className="mt-0.5 flex-shrink-0 text-[#D97706]">✓</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px]">Consider Pathrise if:</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["You value a human advisor and structured accountability", "Pathrise&apos;s company referral network is relevant to your target roles", "You can&apos;t afford any upfront cost and prefer deferred payment", "You want a dedicated person tracking your progress"].map(p => (
                  <li key={p} className="flex items-start gap-2"><span className="mt-0.5 flex-shrink-0 text-[var(--muted)]">→</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold tracking-[-0.02em]">No ISA. No income share. Just results.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari costs $29/month, not thousands in post-hire repayments. Start with the free tier today — full resume scoring, interview practice, and salary coaching.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#D97706]">Start free — no credit card</Link>
        </div>
      </section>
    </PageFrame>
  );
}
