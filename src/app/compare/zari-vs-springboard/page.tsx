import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs Springboard 2025 — Career Coaching Comparison",
  description: "Zari vs Springboard: AI career coaching platform vs bootcamp with career support. Which is better for your tech career transition?",
  keywords: ["zari vs springboard", "springboard alternative", "springboard career coaching", "springboard bootcamp vs ai coaching", "springboard review 2025", "tech career coaching comparison"],
  alternates: { canonical: "/compare/zari-vs-springboard" },
  openGraph: { title: "Zari vs Springboard 2025 — Career Coaching Comparison", description: "AI career coaching vs bootcamp career support — which delivers better job placement outcomes?", url: "/compare/zari-vs-springboard" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARE = [
  { dimension: "Primary purpose", zari: "Comprehensive job search coaching platform", them: "Bootcamp with career placement support", winner: "tie" },
  { dimension: "Job search coaching", zari: "Resume, interview, LinkedIn, salary — all surfaces", them: "Career coaching bundled into bootcamp tuition", winner: "zari" },
  { dimension: "Availability", zari: "24/7 AI coaching, start immediately", them: "Scheduled mentor sessions within cohort", winner: "zari" },
  { dimension: "Cost", zari: "Free tier + from $29/month", them: "$5,000–$20,000+ for full bootcamp", winner: "zari" },
  { dimension: "Skill training", zari: "Job search skills only", them: "Technical skills curriculum + career support", winner: "them" },
  { dimension: "Interview practice", zari: "Unlimited AI mock interviews with STAR scoring", them: "Mentor mock interviews, limited by cohort schedule", winner: "zari" },
  { dimension: "Salary negotiation", zari: "Live simulation, market benchmarks, scripts", them: "General negotiation guidance from mentor", winner: "zari" },
];

export default async function ZariVsSpringboardPage() {
  const userId = await getCurrentUserId();
  const zariWins = COMPARE.filter(r => r.winner === "zari").length;
  const themWins = COMPARE.filter(r => r.winner === "them").length;
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Compare", url: `${BASE_URL}/compare` }, { name: "Zari vs Springboard", url: `${BASE_URL}/compare/zari-vs-springboard` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 45%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Coaching Platform vs Bootcamp
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.4rem]">
            Zari vs Springboard
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/55">
            Springboard is a skills bootcamp with career support built in. Zari is a dedicated job search coaching platform. They serve different needs — here&apos;s the honest picture.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#059669]">Try Zari free</Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex justify-center">
            <WinScore zariWins={zariWins} total={COMPARE.length} competitorName="Springboard" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Feature comparison</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Dimension</span>
              <span className="text-[#059669]">Zari</span>
              <span>Springboard</span>
            </div>
            {COMPARE.map(({ dimension, zari, them, winner }) => (
              <div key={dimension} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{dimension}</span>
                <span className={winner === "zari" ? "font-semibold text-[#059669]" : "text-[var(--muted)]"}>{zari}</span>
                <span className={winner === "them" ? "font-semibold text-[var(--ink)]" : "text-[var(--muted)]"}>{them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Who should use which?</h2>
          <p className="mb-6 text-[14px] leading-7 text-[var(--muted)]">Springboard and Zari aren&apos;t direct competitors — they address different problems. If you need to build new technical skills (data science, UX, software engineering), Springboard provides curriculum. If you already have the skills and need to land the job, Zari is the faster, more affordable path.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#059669]/30 bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px] text-[#059669]">Choose Zari if:</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["You already have the skills and need to execute the job search", "You want ATS scoring, keyword gap analysis, and bullet rewrites", "Bootcamp tuition isn&apos;t justified for your career stage", "You need daily practice without scheduling constraints", "You&apos;re actively interviewing and need live prep now"].map(p => (
                  <li key={p} className="flex items-start gap-2"><span className="mt-0.5 flex-shrink-0 text-[#059669]">✓</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[15px]">Consider Springboard if:</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["You need structured technical skill training with certification", "You want a job guarantee and structured career placement program", "You&apos;re making a major career pivot into a new technical field", "The bundled mentorship model works for your learning style"].map(p => (
                  <li key={p} className="flex items-start gap-2"><span className="mt-0.5 flex-shrink-0 text-[var(--muted)]">→</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold tracking-[-0.02em]">Ready to land the job? Start with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">No tuition, no cohort schedule, no waitlist. Score your resume, prep for interviews, and negotiate your salary — starting now.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Start free — no credit card</Link>
        </div>
      </section>
    </PageFrame>
  );
}
