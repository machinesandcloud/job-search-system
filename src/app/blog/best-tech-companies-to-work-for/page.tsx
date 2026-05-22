import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Best Tech Companies to Work For 2025 — Pay, Culture & Career Growth",
  description: "The best tech companies to work for in 2025 — ranked by total compensation, career growth, culture, and work-life balance. Includes FAANG, top startups, and rising mid-size tech companies.",
  keywords: ["best tech companies to work for", "best tech companies 2025", "best tech companies to work for 2025", "top tech companies", "best companies to work for in tech", "FAANG companies", "top tech employers", "best software engineering companies", "best tech company culture", "tech company salaries"],
  alternates: { canonical: "/blog/best-tech-companies-to-work-for" },
  openGraph: { title: "Best Tech Companies to Work For 2025 — Pay, Culture & Career Growth", description: "Ranked by total compensation, career growth, and culture — FAANG, top startups, and rising mid-size tech companies.", url: "/blog/best-tech-companies-to-work-for" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Which tech company pays the most in 2025?", answer: "At the senior/staff engineer level, Meta, Google, and Jane Street consistently pay the most — total compensation for senior engineers at Meta can exceed $500,000–$700,000 including RSUs at high levels. Among non-FAANG companies, Jane Street (quant trading), Two Sigma, and hedge fund-adjacent tech firms pay highest. Among mid-size product companies, Stripe, Databricks, Figma, and Canva have historically paid FAANG-comparable packages. The key variable is always equity — base salaries are less differentiated than RSU grants and vesting schedules." },
  { question: "Are big tech companies (FAANG) still the best places to work?", answer: "Depends on what you're optimising for. For total compensation: yes, FAANG leads at almost every level. For career growth and learning: yes, particularly in the first 3–5 years — the engineering quality, scale, and mentorship are exceptional. For work-life balance: increasingly mixed — Amazon and Google in particular have compressed post-COVID. For culture: varies significantly by team even within the same company. Mid-size companies (Stripe, Linear, Vercel, Figma-era companies) now offer FAANG-comparable pay at some levels with more ownership and faster career progression." },
  { question: "What makes a tech company good to work for?", answer: "The factors that matter most vary by career stage. Early career (0–3 years): brand name and mentorship quality matter most — top companies teach you how to work at scale and give you a credential that opens doors. Mid career (3–8 years): compensation, ownership, and career velocity matter more — smaller companies often offer faster promotion paths and more meaningful equity. Senior/staff+ career: impact, culture fit, and total compensation are the dominant factors — 'best company' becomes highly individual." },
  { question: "What's the best tech company for career growth?", answer: "Google and Meta are strong for IC (Individual Contributor) growth paths up to Senior/Staff. Amazon is the most rigorous leadership developer for managers. Stripe has historically been excellent for engineers who want to own critical infrastructure. For the fastest promotion velocity, Series B–D startups often promote quicker than FAANG — but with more career risk. The best company for your career growth is the one where your manager is invested in your development and the company is growing — both conditions matter more than brand." },
];

const COMPANIES = [
  { name: "Meta", tier: "FAANG", pay: "$$$$$", growth: "High", balance: "Medium", why: "Highest RSU grants at senior levels; performance culture is intense but compensation is unmatched" },
  { name: "Google / Alphabet", tier: "FAANG", pay: "$$$$", growth: "High", balance: "Medium-High", why: "Top engineering culture, strong benefits, NOOGLER onboarding; pace varies significantly by team" },
  { name: "Apple", tier: "FAANG", pay: "$$$$", growth: "Medium", balance: "High", why: "Product discipline, legendary design culture; promotions are slow but work-life balance is above FAANG avg" },
  { name: "Amazon / AWS", tier: "FAANG", pay: "$$$", growth: "High", balance: "Low-Medium", why: "LP culture is demanding; AWS leadership experience is highly valued externally. Pace is fastest in FAANG" },
  { name: "Microsoft", tier: "FAANG", pay: "$$$$", growth: "High", balance: "High", why: "Best work-life balance at big tech scale; Satya-era culture is genuinely improved; Azure growth = opportunity" },
  { name: "Stripe", tier: "Top-tier private/public", pay: "$$$$", growth: "Very High", balance: "Medium", why: "Engineering quality is exceptional; fintech scale; strong IC career paths; compensation is FAANG-competitive" },
  { name: "Databricks", tier: "Top-tier private", pay: "$$$$", growth: "Very High", balance: "Medium", why: "Fastest growing data/AI company; pre-IPO equity is significant; strong technical culture" },
  { name: "Figma (Adobe)", tier: "Top-tier", pay: "$$$", growth: "High", balance: "High", why: "Design-led culture; used by nearly every product team globally; strong eng culture" },
  { name: "Linear", tier: "High-growth startup", pay: "$$$", growth: "High", balance: "High", why: "Small team, massive output; opinionated engineering culture; equity meaningful at this stage" },
  { name: "Vercel", tier: "High-growth startup", pay: "$$$", growth: "High", balance: "Medium-High", why: "Owns core frontend infra for the web; strong remote culture; Andreessen Horowitz backed" },
];

export default async function BestTechCompaniesToWorkForPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-01-10";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Best Tech Companies to Work For 2025 — Pay, Culture & Career Growth"
        description="Ranked by total compensation, career growth, and culture — FAANG, top startups, and rising mid-size tech companies."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/best-tech-companies-to-work-for`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Best Tech Companies to Work For", url: `${BASE_URL}/blog/best-tech-companies-to-work-for` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 40%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Tech Companies · Pay · Culture · Career 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Best Tech Companies<br />
            <span className="text-white/50">to Work For 2025</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Ranked by total compensation, career growth, culture, and work-life balance — from FAANG to the top high-growth startups hiring in 2025.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated June 2025 · 8 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Top tech companies to work for in 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Pay scale: $$$$$ = &gt;$400k TC at senior level; $$$$ = $250–400k; $$$ = $150–250k. Balance: subjective aggregate from employee surveys (Glassdoor, Blind, Levels.fyi).</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-5 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span className="col-span-1">Company</span><span>Pay</span><span>Growth</span><span>Balance</span><span className="col-span-1">Why they&apos;re on this list</span>
            </div>
            {COMPANIES.map(({ name, tier, pay, growth, balance, why }) => (
              <div key={name} className="grid grid-cols-5 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <div>
                  <div className="font-bold">{name}</div>
                  <div className="text-[11px] text-[var(--muted)]">{tier}</div>
                </div>
                <span className="font-semibold text-[#059669]">{pay}</span>
                <span>{growth}</span>
                <span>{balance}</span>
                <span className="col-span-1 text-[12px] text-[var(--muted)]">{why}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Prep for your target tech company interview.</h2>
          <p className="mb-8 text-[15px] text-white/55">Company-specific interview coaching, resume ATS scoring, and salary negotiation prep — available now across all major tech companies.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Start interview prep free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
