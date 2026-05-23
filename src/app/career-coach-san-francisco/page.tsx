import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach San Francisco 2025 — AI Career Coaching for SF Bay Area Professionals",
  description: "AI career coaching for San Francisco and Bay Area professionals. FAANG interview prep, SF salary benchmarks, startup equity negotiation, and resume optimization for tech roles.",
  keywords: ["career coach san francisco", "career coach bay area", "career coach sf", "san francisco career coach", "bay area career coaching", "career counselor san francisco", "career coach silicon valley", "sf job search 2025", "san francisco salary negotiation", "faang interview coach"],
  alternates: { canonical: "/career-coach-san-francisco" },
  openGraph: { title: "Career Coach San Francisco 2025 — AI Career Coaching for SF Bay Area Professionals", description: "FAANG interview prep, SF salary benchmarks, startup equity negotiation, and Bay Area tech career coaching.", url: "/career-coach-san-francisco" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are the highest paying tech jobs in San Francisco in 2025?", answer: "The highest TC tech roles in the SF Bay Area in 2025: Staff/Principal Software Engineer at FAANG ($350,000–$700,000+ TC), AI/ML Researcher or Engineer at OpenAI, Anthropic, Google DeepMind ($300,000–$1,000,000+ TC for senior researchers), Senior Product Manager at FAANG ($250,000–$450,000+ TC), Staff Data Scientist ($250,000–$400,000 TC), and Engineering Manager at L7+ at Google/Meta/Amazon ($400,000–$600,000+ TC). AI roles have seen particularly aggressive compensation increases since 2023 — Anthropic and OpenAI in particular have compressed the traditional tenure-based leveling hierarchy." },
  { question: "How do I negotiate equity at a San Francisco startup?", answer: "Startup equity negotiation requires a different framework than public company RSUs. Key factors: (1) What percentage of the company, not the raw number of shares — always ask for the fully diluted share count to calculate your ownership percentage. (2) Preferred vs common stock terms — employee options (ISOs/NSOs) are common stock, which is subordinate to all preferred investors in a liquidation. (3) Strike price and 409A valuation — the gap between your exercise price and the 409A valuation determines your spread and tax position. (4) Vesting and cliff — standard is 4-year vest with 1-year cliff, but acceleration clauses on M&A are negotiable at senior levels. Zari's salary negotiation coaching walks you through each of these." },
  { question: "Is the San Francisco job market recovering in 2025?", answer: "Yes — the SF Bay Area tech job market has rebounded significantly from the 2022–2023 trough. AI-driven hiring has been the primary driver, particularly in the South Bay (Santa Clara, Sunnyvale) and San Francisco proper. Key markers: FAANG headcount stabilized and is growing again at Google and Meta; AI startups (Anthropic, OpenAI, Mistral's US office, Cohere) are aggressively hiring at all levels; enterprise software (Salesforce, Workday, ServiceNow) returned to growth hiring in 2024–2025. The companies that remain cautious are those most exposed to advertising revenue and cost-cutting in their enterprise customer base." },
  { question: "How many coding interview rounds do Bay Area tech companies do in 2025?", answer: "Standard Bay Area FAANG interview format in 2025: (1) Recruiter screen (30 min), (2) Technical phone screen or HackerRank assessment (60–90 min), (3) Onsite/virtual onsite (4–6 rounds): 2–3 coding rounds (LeetCode medium/hard), 1 system design round, 1 behavioral round, optionally 1 bar raiser round (Amazon specifically). AI companies like Anthropic and OpenAI have added domain-specific rounds — ML system design, ML coding (implementing models from scratch), and research taste/judgment conversations for senior roles. Preparation time recommendation: 4–8 weeks at 2–3 hours/day for mid-level SWE roles at top companies." },
];

const SALARIES = [
  { role: "Staff / Principal SWE", company: "Google / Meta / Apple", range: "$350,000–$700,000+ TC", note: "RSU-dominant; L6/L7+" },
  { role: "AI / ML Engineer (Senior)", company: "Anthropic / OpenAI / Google", range: "$300,000–$1,000,000+ TC", note: "AI roles command highest premium" },
  { role: "Senior SWE (L5)", company: "FAANG / Stripe / Airbnb", range: "$220,000–$380,000 TC", note: "Consistent FAANG band" },
  { role: "Senior Product Manager", company: "FAANG / Late-stage startup", range: "$250,000–$450,000 TC", note: "Strong equity at late-stage" },
  { role: "Engineering Manager (L6)", company: "Google / Meta", range: "$400,000–$600,000 TC", note: "Significant equity premium" },
  { role: "Staff Data Scientist", company: "Tech / Fintech", range: "$250,000–$400,000 TC", note: "Growing with AI demand" },
  { role: "Startup (Series A–B SWE)", company: "Early-stage startup", range: "$150,000–$220,000 + equity", note: "Lower cash, higher equity upside" },
];

export default async function CareerCoachSanFranciscoPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach San Francisco 2025 — AI Career Coaching for SF Bay Area Professionals"
        description="FAANG interview prep, SF salary benchmarks, startup equity negotiation, and Bay Area tech career coaching."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-san-francisco`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach San Francisco", url: `${BASE_URL}/career-coach-san-francisco` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 45%, #0A66C2 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🌉 San Francisco · FAANG · AI Startups · Bay Area
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">San Francisco</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for the Bay Area&apos;s most competitive tech roles — FAANG, AI startups, and late-stage companies. FAANG interview prep, startup equity negotiation, and salary coaching 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Bay Area salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">SF / Bay Area total compensation data. California taxes all equity as ordinary income — factor CA top rate (13.3%) into TC comparisons vs other states.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range (TC)</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#059669]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Bay Area job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "FAANG interview prep", desc: "LeetCode coding drills, system design, and behavioral rounds formatted for Google, Meta, Amazon, Apple, and Netflix hiring bars." },
              { title: "AI company interview prep", desc: "ML system design, ML coding, and research judgment rounds for Anthropic, OpenAI, and Google DeepMind senior roles." },
              { title: "Startup equity negotiation", desc: "Ownership percentage analysis, preferred vs common stock terms, ISOs/NSOs, and vesting acceleration clause guidance." },
              { title: "SF resume optimization", desc: "ATS keyword scoring for Bay Area tech job postings. Optimized for FAANG leveling vocabulary (L4, L5, L6, Staff)." },
              { title: "Bay Area salary negotiation", desc: "Know your market rate. FAANG band data and competing offer strategy — how to use competing offers to maximize TC." },
              { title: "LinkedIn for Bay Area recruiters", desc: "Headline and About section rewrites optimized for SF tech recruiter searches and FAANG internal referrals." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Crack your next Bay Area tech role with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">FAANG interview prep, startup equity coaching, and SF salary negotiation — 24/7 AI coaching, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
