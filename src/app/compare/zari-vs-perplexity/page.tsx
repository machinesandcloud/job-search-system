import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Perplexity — AI Career Coach vs AI Search Engine (2025)",
  description:
    "Zari vs Perplexity AI: can an AI search engine replace a dedicated career coaching platform? We compare job search research, resume help, interview prep, and career strategy capabilities.",
  keywords: ["zari vs perplexity", "perplexity ai career coach", "perplexity for job search", "perplexity ai resume help", "perplexity vs dedicated career ai", "best ai for career 2025", "perplexity alternative career coaching"],
  alternates: { canonical: "/compare/zari-vs-perplexity" },
  openGraph: {
    title: "Zari vs Perplexity — AI Career Coaching vs AI Search (2025)",
    description: "Perplexity is an AI-powered research tool. Zari is a purpose-built career coach. Here's what that difference means for your job search.",
    url: "/compare/zari-vs-perplexity",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Can Perplexity help me prepare for job interviews?", answer: "Perplexity can surface general information about common interview questions, company backgrounds, and interview formats. It's an excellent research tool. But it can't practice with you — it has no way to evaluate your specific answer to a behavioral question, flag weak STAR structure, or give real-time feedback on your delivery. That's what Zari's interview coach does." },
  { question: "Can I use Perplexity to research companies before an interview?", answer: "Yes — Perplexity is genuinely strong for company research because it cites sources and aggregates recent web information. For pre-interview research, Perplexity is a useful tool. Zari complements this by coaching you on what to do with that research: how to work it into your 'why this company' answer, what questions to ask based on what you learn, and how to signal preparation without it feeling rehearsed." },
  { question: "What does Perplexity actually do for job seekers?", answer: "Perplexity is primarily a research and question-answering tool with web access. For job seekers, its highest-value uses are: company and industry research, salary benchmarking research, learning about unfamiliar technical topics before interviews, and researching the people who will interview you. It is not a coaching tool — it doesn't evaluate your work or give personalized guidance." },
  { question: "Should I use Perplexity alongside Zari?", answer: "Yes — they're complementary tools for different parts of the job search. Use Perplexity to research companies, industries, and roles. Use Zari to build your application materials, practice interviews, optimize your LinkedIn, and negotiate your offer. The research tool and the coaching platform serve different needs." },
];

const USE_CASES = [
  { useCase: "Company research before an interview", perplexity: "Excellent. Perplexity searches the web in real time and cites sources. You can ask specific questions about a company's recent news, funding, product launches, and leadership — and get sourced, up-to-date answers.", zari: "Good for structured research guidance: what to look for, how to use what you find, how to incorporate it into your 'why this company' answer. Zari knows your interview context; Perplexity knows the web.", winner: "perplexity" },
  { useCase: "Resume writing and ATS optimization", perplexity: "Perplexity can answer questions about resume best practices and generate general advice. It cannot score your resume against a specific job description, identify keyword gaps, or rewrite your bullets for ATS alignment.", zari: "Purpose-built: paste a job description and your resume, get a keyword match score, specific gap analysis, and rewritten bullets. Session memory means Zari knows your full background.", winner: "zari" },
  { useCase: "Interview question practice", perplexity: "Can generate common interview questions and provide general frameworks for answering them. Cannot evaluate your specific answers, flag weak STAR structure, or give calibrated feedback on quality.", zari: "Full AI interview coaching: practice questions in a simulated interview environment, real-time feedback on answer strength, STAR structure evaluation, and specific suggestions for improvement.", winner: "zari" },
  { useCase: "Salary research and benchmarking", perplexity: "Strong. Perplexity can aggregate salary data from Levels.fyi, Glassdoor, LinkedIn, Blind, and other sources quickly. For understanding market rates, it's a powerful research tool.", zari: "Zari provides salary negotiation coaching — scripts, counter-offer strategy, how to handle pushback — rather than salary research. The two tools are complementary here.", winner: "perplexity" },
  { useCase: "LinkedIn optimization", perplexity: "Can answer questions about LinkedIn best practices. Cannot analyze your specific profile, identify keyword gaps, or rewrite your headline and About section.", zari: "Full LinkedIn coaching: headline optimization for recruiter search, About section rewriting, experience bullet optimization, and keyword density analysis.", winner: "zari" },
  { useCase: "Learning about an unfamiliar industry or role", perplexity: "Very strong. Perplexity is excellent for quickly getting up to speed on an unfamiliar domain — industry structure, key companies, common terminology, typical career paths. Great for career changers doing initial research.", zari: "Good for career change coaching — positioning your existing experience for a new industry — but not designed for open-ended research the way Perplexity is.", winner: "perplexity" },
];

export default async function ZariVsPerplexityPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Perplexity", url: `${BASE_URL}/compare/zari-vs-perplexity` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Perplexity</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Perplexity is one of the best AI research tools available — fast, sourced, genuinely useful for learning. But research is not coaching. Here&apos;s what each tool actually does for your job search, and where the real difference shows up.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">Perplexity is</p>
              <p className="mt-2 text-[20px] font-extrabold text-white">An AI research engine</p>
              <p className="mt-3 text-[13px] leading-6 text-white/50">Excellent for company research, salary data, industry knowledge. Sources its answers from the live web. Great for learning and research tasks.</p>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari is</p>
              <p className="mt-2 text-[20px] font-extrabold text-white">An AI career coach</p>
              <p className="mt-3 text-[13px] leading-6 text-white/60">Purpose-built for job search execution: resume coaching, interview practice, LinkedIn optimization, and salary negotiation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use case breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Job search use cases — who wins where?</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">An honest breakdown across every major job search activity.</p>
          <div className="mt-10 space-y-5">
            {USE_CASES.map((uc) => (
              <div key={uc.useCase} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{uc.useCase}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${uc.winner === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : uc.winner === "perplexity" ? "bg-slate-100 text-slate-600" : "bg-slate-100 text-slate-500"}`}>
                    {uc.winner === "zari" ? "Zari wins" : uc.winner === "perplexity" ? "Perplexity wins" : "Complementary"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Perplexity</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{uc.perplexity}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{uc.zari}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The real answer: use both</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Perplexity and Zari are not competitors — they solve different parts of the job search problem. Perplexity is the best tool we&apos;ve seen for quickly getting up to speed on a company, industry, or role before you engage with it. For candidates who are changing careers or targeting unfamiliar sectors, Perplexity is invaluable for background research.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Zari picks up where research ends. Once you know the company, Zari helps you build the application materials, optimize them for ATS, practice the interviews, and negotiate the offer. The research-to-coaching handoff is where a lot of candidates get stuck — they learn about a company but don&apos;t know how to apply that knowledge effectively. Zari bridges that gap.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-8 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Try Zari free — job search coaching, not just research</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume, LinkedIn, interview prep, and salary negotiation — the coaching layer that turns research into results.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start for free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
