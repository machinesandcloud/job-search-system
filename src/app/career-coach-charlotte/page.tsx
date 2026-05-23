import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Charlotte 2025 — AI Career Coaching for Charlotte Professionals",
  description: "AI career coaching for Charlotte, NC professionals. Charlotte salary benchmarks, finance and banking interview prep, resume optimization for Bank of America, Truist, and Charlotte's growing tech scene.",
  keywords: ["career coach charlotte", "career coach charlotte nc", "career coaching charlotte", "charlotte career counselor", "executive career coach charlotte", "charlotte banking career", "charlotte job search 2025", "bank of america careers", "charlotte finance jobs", "charlotte salary negotiation"],
  alternates: { canonical: "/career-coach-charlotte" },
  openGraph: { title: "Career Coach Charlotte 2025 — AI Career Coaching for Charlotte Professionals", description: "Charlotte salary benchmarks, banking and finance interview prep, and resume optimization for the Queen City's top employers.", url: "/career-coach-charlotte" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are the biggest employers in Charlotte?", answer: "Charlotte is the second-largest banking center in the United States (behind only New York City). Key employers: Banking & finance: Bank of America (global HQ in Charlotte — 16,000+ Charlotte employees), Truist Financial (HQ in Charlotte — formed from BB&T/SunTrust merger), Wells Fargo (major Southeast hub), LPL Financial. Healthcare: Atrium Health (one of the largest not-for-profit systems in the Southeast), Novant Health. Retail & logistics: Lowe&apos;s Companies (Mooresville HQ), Honeywell (HQ in Charlotte), Duke Energy (HQ), SPX. Tech: Growing fintech ecosystem tied to the banking sector; Microsoft Azure engineers; Red Ventures (digital media/fintech)." },
  { question: "What are typical salaries in Charlotte?", answer: "Charlotte salaries are competitive for the Southeast, with finance roles often on par with secondary New York markets. 2025 benchmarks: Investment Banking Analyst (Bank of America, Truist): $105,000–$170,000 total comp; Software Engineer (fintech, banking tech): $110,000–$185,000 TC; Financial Analyst: $75,000–$120,000; Data Scientist: $100,000–$160,000; Healthcare Administrator: $85,000–$150,000; Registered Nurse (Atrium, Novant): $70,000–$100,000; Operations Manager: $80,000–$130,000. North Carolina has a flat 4.5% state income tax (declining to 3.99% by 2027), making Charlotte's take-home highly competitive vs. Northeast markets." },
  { question: "Is Charlotte a good city for finance careers?", answer: "Charlotte is genuinely excellent for finance careers — and underrated. Bank of America's global HQ means Charlotte has one of the most active banking hiring pipelines in the US outside New York. Truist's headquarters adds a second major banking employer. For aspiring investment bankers or financial analysts who don&apos;t want NYC cost of living, Charlotte is the most compelling alternative. The tradeoff: you get significantly lower cost of living (home prices 60–70% below Manhattan), a growing metro with genuine lifestyle benefits, but compensation is typically 15–20% below New York for equivalent roles. For most professionals at the analyst/associate level, the net take-home advantage goes to Charlotte." },
  { question: "How do I prepare for a Bank of America interview?", answer: "Bank of America interviews are structured and competency-based. For early-career roles: 1) HireVue video interview — practice delivering structured behavioral answers in 2 minutes or less using the STAR format. 2) Superday — typically 4–6 back-to-back interviews with managers and team leads. Key focus areas: Why BofA (not just &apos;big bank&apos; — research specific divisions), leadership examples, and quantified impact from past roles. For technology roles: coding screen (often HackerRank), then technical systems interview. Zari runs Bank of America-style behavioral and technical mock interview simulations you can practice as many rounds as needed." },
];

const SALARIES = [
  { role: "Investment Banking Analyst", company: "Bank of America, Truist", range: "$105,000–$170,000 TC", note: "Second-largest US banking city" },
  { role: "Software Engineer (Banking Tech)", company: "BofA Tech, Red Ventures", range: "$110,000–$185,000 TC", note: "Fintech/banking tech growing fast" },
  { role: "Financial Analyst", company: "BofA, Truist, LPL Financial", range: "$75,000–$120,000", note: "CFA highly valued in Charlotte" },
  { role: "Data Scientist / Analyst", company: "BofA, Duke Energy, Lowe&apos;s", range: "$100,000–$160,000", note: "Data roles across all major sectors" },
  { role: "Healthcare Administrator", company: "Atrium Health, Novant", range: "$85,000–$150,000", note: "Major health systems expanding" },
  { role: "Registered Nurse (RN)", company: "Atrium Health, Novant Health", range: "$70,000–$100,000", note: "High demand across Charlotte region" },
  { role: "Operations Manager", company: "Lowe&apos;s, Honeywell, Duke Energy", range: "$80,000–$130,000", note: "Charlotte is major HQ city for Fortune 500s" },
];

export default async function CareerCoachCharlottePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Charlotte 2025 — AI Career Coaching for Charlotte Professionals"
        description="Charlotte salary benchmarks, banking and finance interview prep, and resume optimization for the Queen City's top employers."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-charlotte`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Charlotte", url: `${BASE_URL}/career-coach-charlotte` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #003087 0%, #005EB8 50%, #00A3E0 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Charlotte · Banking · Finance · Tech · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Charlotte, NC</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Charlotte&apos;s banking hub and growing tech scene. Resume optimization, interview prep for Bank of America and Truist, and salary negotiation available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · #2 US banking city · NC flat 4.5% tax</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Charlotte salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Charlotte compensation data across banking, technology, and healthcare. North Carolina flat state income tax: 4.5%.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Employer</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#003087]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Charlotte job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Banking interview prep", desc: "Behavioral and technical interview drills for Bank of America, Truist, and Charlotte-area finance roles — HireVue, superday, and fit rounds." },
              { title: "Charlotte resume optimization", desc: "ATS scoring against Charlotte and Southeast job postings. Keyword gap analysis for banking, fintech, and healthcare descriptions." },
              { title: "Salary negotiation coaching", desc: "Charlotte comp benchmarks. Know your market rate vs. NYC peers and how to push back on lowball offers from major banks." },
              { title: "Fintech and tech prep", desc: "Interview coaching for Red Ventures, banking tech arms, and Charlotte&apos;s growing technology sector roles." },
              { title: "Healthcare career coaching", desc: "Behavioral and leadership interview prep for Atrium Health, Novant Health, and other Charlotte-area health systems." },
              { title: "LinkedIn for Charlotte recruiters", desc: "Rewrite your LinkedIn to surface in searches by Charlotte-based banking and finance recruiters." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #003087 0%, #005EB8 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Charlotte job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching built for Charlotte&apos;s banking hub and growing tech scene. Available 24/7, no scheduling required.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#003087]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
