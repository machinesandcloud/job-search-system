import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Job Search in Canada 2025 — Complete Guide for Canadians and Newcomers",
  description: "How to find a job in Canada in 2025. Covers Canadian job boards, resume format, interview culture, province-by-province markets, and tips for newcomers and immigrants.",
  keywords: ["job search Canada", "how to find a job in Canada", "job search in Canada 2025", "Canadian job market", "job hunting Canada", "how to get a job in Canada", "newcomer job search Canada", "job search tips Canada"],
  alternates: { canonical: "/blog/job-search-in-canada" },
  openGraph: { title: "Job Search in Canada 2025 — Complete Guide", description: "Canadian job boards, resume format, interview culture, province markets, and newcomer tips.", url: "/blog/job-search-in-canada" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How long does it take to find a job in Canada?", answer: "The average job search in Canada takes 3–6 months for mid-to-senior roles and 1–3 months for entry-level positions. Tech roles in Toronto or Vancouver typically move faster (4–8 weeks) than government or financial services roles (2–4 months). Newcomers often take longer (4–8 months) due to the additional time needed to build a Canadian professional network." },
  { question: "What are the best job boards for Canada?", answer: "The top Canadian job boards in 2025 are: Indeed Canada (largest volume), LinkedIn (best for professional and tech roles), Job Bank (Government of Canada — free, comprehensive), Workopolis (general), and Glassdoor. For tech specifically: Wellfound (startup roles), Levels.fyi (compensation data), and company career pages directly. For government roles, the Public Service Commission website is the only source." },
  { question: "Do I need a Canadian work permit to apply for jobs?", answer: "You need legal authorization to work in Canada: a work permit, permanent residency, or citizenship. Some employers will sponsor a Labour Market Impact Assessment (LMIA) for skilled foreign workers, but this is increasingly rare. The best pathway for most international workers is to apply from within Canada (post-study work permit, PGWP) or through Express Entry if you have qualifying points." },
  { question: "Is a Canadian resume different from a US resume?", answer: "Canadian resumes are very similar to US resumes: 1–2 pages, reverse chronological, achievement-focused bullet points. Key differences: Canadian resumes sometimes include a profile/summary section, don't typically include a photo, and use Canadian English spellings where they differ. Quebec-based employers may expect a French CV or bilingual resume." },
];

const JOB_BOARDS = [
  { name: "Indeed Canada", focus: "All industries", strength: "Highest volume of postings", url: "#", note: "Start here for volume" },
  { name: "LinkedIn", focus: "Professional & Tech", strength: "Best for networking + apply", url: "#", note: "Essential for tech roles" },
  { name: "Job Bank (Canada)", focus: "All industries", strength: "Official government database — free", url: "#", note: "Best for government/public sector" },
  { name: "Workopolis", focus: "All industries", strength: "Strong Canadian employer base", url: "#", note: "Good for mid-market roles" },
  { name: "Glassdoor Canada", focus: "Professional roles", strength: "Salary insights + reviews", url: "#", note: "Research companies before applying" },
  { name: "Wellfound", focus: "Startups & Tech", strength: "Transparent salary in listing", url: "#", note: "Best for startup roles" },
];

export default async function JobSearchInCanadaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Job Search in Canada 2025" description="Complete guide to finding a job in Canada — job boards, resume format, interview culture, and newcomer tips." url={`${BASE_URL}/blog/job-search-in-canada`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Job Search in Canada", url: `${BASE_URL}/blog/job-search-in-canada` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #9B1D20 0%, #C8202A 40%, #1A1A2E 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">🇨🇦 Canada Guide</span>
            <span className="text-[12px] text-white/35">16 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Job Search in Canada 2025:<br /><span className="text-white/55">The Complete Guide</span></h1>
          <p className="mt-5 text-[15px] leading-7 text-white/50">Canadian job boards, resume format, interview culture, province-by-province markets, salary data in CAD, and a full section for newcomers and immigrants.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={410} suffix="K" label="immigrants Canada welcomed in 2023" accent="#9B1D20" />
            <StatCard value={310} label="average applications per Canadian job posting" accent="#0D7182" />
            <StatCard value={38} suffix="K" label="net new tech jobs added in Canada in 2024" accent="#059669" />
            <StatCard value={3} label="to 6 months — average Canadian job search timeline" accent="#7C3AED" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15px] leading-8 text-[var(--muted)]">

          <p className="lead text-[17px] leading-relaxed">Canada has one of the most attractive job markets in the world for skilled workers — strong wages, high quality of life, and a path to permanent residency. But the Canadian job market has its own rules. This guide covers everything you need to navigate it effectively.</p>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">The Canadian job market in 2025</h2>
          <p>Canada&apos;s job market in 2025 is characterised by strong demand in tech, healthcare, and skilled trades, with softening in some financial services and media roles. The biggest regional markets are:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { city: "Toronto (ON)", desc: "Finance, tech, consulting, media. Canada&apos;s largest job market — most competitive, highest salaries.", flag: "🏙️" },
              { city: "Vancouver (BC)", desc: "Tech, gaming, film, tourism. High cost of living; strong Amazon/Microsoft engineering presence.", flag: "🌲" },
              { city: "Calgary (AB)", desc: "Energy tech, fintech, agriculture tech. No provincial income tax — highest net income in Canada.", flag: "⛽" },
              { city: "Montréal (QC)", desc: "AI research, gaming, aerospace. French skills open more doors; lower cost of living.", flag: "⚜️" },
            ].map((m) => (
              <div key={m.city} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <p className="font-bold text-[var(--ink)]">{m.flag} {m.city}</p>
                <p className="mt-1 text-[13px]" dangerouslySetInnerHTML={{ __html: m.desc }} />
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">The best Canadian job boards (2025)</h2>
          <div className="space-y-3">
            {JOB_BOARDS.map((board) => (
              <div key={board.name} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[var(--ink)]">{board.name}</p>
                    <span className="rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--brand)]">{board.note}</span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-[var(--muted)]">{board.focus} · {board.strength}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">Canadian resume format</h2>
          <p>Canadian resumes are close to US resumes: 1–2 pages, reverse chronological, with achievement-focused bullet points. Key considerations specific to Canada:</p>
          <ul className="space-y-2">
            {[
              "1 page for under 5 years experience; 2 pages for 5+ years",
              "Use a professional summary section (3–4 lines) — common in Canada",
              "Quantify every impact bullet: numbers, percentages, dollar amounts, time saved",
              "Do not include a photo, date of birth, or marital status",
              "For Quebec roles: consider a bilingual (English/French) resume or a French-only version",
              "For government roles: use the Statement of Merit format — very different from standard resumes",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#9B1D20]" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">Canadian interview culture</h2>
          <p>Canadian interviews tend to be more collaborative and less aggressive than US interviews. Key cultural norms:</p>
          <div className="space-y-3">
            {[
              { point: "Behavioural interviews are standard", detail: "Most Canadian employers use behavioural interviews (STAR format). Prepare 6–8 specific stories covering achievement, failure, conflict, leadership, collaboration, and problem-solving." },
              { point: "Humility is valued", detail: "In Canada, excessive self-promotion can read as arrogance. Balance confidence with recognition of your team and context. 'We achieved X' is often more appropriate than 'I achieved X' — as long as you clearly articulate your specific contribution." },
              { point: "Culture fit matters a lot", detail: "Canadian employers heavily weight cultural fit and values alignment, particularly at smaller companies and not-for-profits. Research the company culture explicitly and reference it in interviews." },
              { point: "Salary negotiation is expected but subtle", detail: "62% of Canadian hiring managers expect candidates to negotiate, but the conversation is more reserved than in the US. Use data (market rate, CAD benchmarks) rather than leverage to justify your ask." },
            ].map((item) => (
              <div key={item.point} className="rounded-xl border border-[var(--border)] p-5">
                <p className="font-bold text-[var(--ink)]">{item.point}</p>
                <p className="mt-2 text-[13px] leading-6">{item.detail}</p>
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">For newcomers and immigrants to Canada</h2>
          <div className="rounded-2xl border border-[#9B1D20]/15 bg-[#9B1D20]/[0.03] p-6">
            <p className="text-[14px] font-medium text-[#6B1014] mb-4">Canada welcomes over 400,000 immigrants annually. The job search as a newcomer has specific challenges — here&apos;s how to address them directly.</p>
            <div className="space-y-4">
              {[
                { challenge: "\"Canadian experience required\"", solution: "This is increasingly seen as discriminatory and is being challenged legally. If you encounter it, address it directly in your cover letter by drawing clear parallels between your international work and the Canadian context. Emphasise transferable skills and results." },
                { challenge: "International credentials not recognized", solution: "Research the Canadian equivalent of your qualification at the relevant provincial authority (IQAS in Alberta, WES nationally). Some professional designations require re-examination in Canada — plan for this timeline." },
                { challenge: "No Canadian professional network", solution: "Join your professional association's Canadian chapter, attend LinkedIn Local events in your city, reach out to other newcomers in your field through settlement organizations (ACCES Employment, WoodGreen in Toronto), and use informational interviews aggressively." },
              ].map((item) => (
                <div key={item.challenge} className="rounded-xl border border-[var(--border)] bg-white p-4">
                  <p className="font-bold text-[var(--ink)]">Challenge: {item.challenge}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#9B1D20]/20 bg-[#9B1D20]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Land a job in Canada faster — free AI coaching</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Resume ATS scoring for Canadian employers, interview coaching, and salary negotiation in CAD. Free first session.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl px-8 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#9B1D20" }}>
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-[14px] font-bold text-[var(--ink)]">Related Canada career guides</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/blog/canada-salary-guide", label: "Canada Salary Guide" },
                { href: "/ai-career-coach-canada", label: "AI Career Coach Canada" },
                { href: "/salary/software-engineer-salary-toronto", label: "SWE Salary Toronto" },
                { href: "/salary/software-engineer-salary-vancouver", label: "SWE Salary Vancouver" },
                { href: "/blog/behavioral-interview-questions", label: "Behavioural Interview Questions" },
                { href: "/blog/salary-negotiation-tips", label: "Salary Negotiation Tips" },
                { href: "/blog/how-to-network", label: "How to Network" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[12px] font-medium text-[var(--brand)] hover:bg-[var(--brand)]/5 transition-all">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
