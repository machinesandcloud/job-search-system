import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export const metadata: Metadata = {
  title: "AI Career Coach UK — The Best AI Career Coaching for UK Job Seekers (2025)",
  description:
    "Zari is the UK's leading AI career coach. CV optimisation for ATS, interview coaching for UK employers, LinkedIn optimisation, and salary negotiation in GBP. Free to start.",
  keywords: [
    "AI career coach UK",
    "career coach UK",
    "career coaching UK",
    "best AI career coach UK",
    "free career coach UK",
    "online career coach UK",
    "career advice UK 2025",
    "CV help UK",
    "job search help UK",
    "AI career advisor UK",
  ],
  alternates: { canonical: "/ai-career-coach-uk" },
  openGraph: {
    title: "AI Career Coach UK — Zari",
    description: "CV optimisation, UK interview coaching, LinkedIn, and salary negotiation. Free to start.",
    url: "/ai-career-coach-uk",
  },
};

const FAQS = [
  {
    question: "How is Zari different from a human career coach in the UK?",
    answer: "Human career coaches in the UK typically charge £75–£150 per hour and are available for scheduled sessions. Zari is available 24/7, costs a fraction of that, and provides structured coaching across every job search surface — CV, LinkedIn, interview prep, and salary negotiation — with consistent quality every time. Zari doesn't replace the relationship of a good human coach, but it eliminates the gap between sessions.",
  },
  {
    question: "Does Zari work for UK CVs, or is it designed for American resumes?",
    answer: "Zari is built for both UK CVs and US resumes. It understands the differences: UK CVs typically run 2 pages, omit the objective statement, use British English spellings, and are formatted for UK ATS systems like Workday and Taleo as deployed by UK employers. When you're working on a UK CV, Zari optimises for UK conventions and UK job board keyword patterns.",
  },
  {
    question: "Which UK industries and employers does Zari work best for?",
    answer: "Zari works across all industries and has been used by job seekers targeting UK employers in finance (Barclays, HSBC, Goldman Sachs London), tech (Amazon, Google, Meta, DeepMind), consulting (McKinsey, BCG, Deloitte, KPMG), retail (Sainsbury's, Tesco, M&S), and the public sector including NHS. The coaching is role-specific and adapts to the requirements of each employer's hiring process.",
  },
  {
    question: "Can Zari help with NHS job applications and NHS interview questions?",
    answer: "Yes. Zari has specific coaching for NHS applications, including the NHS application form (which is different from a standard CV), NHS interview questions based on the NHS core values framework, and competency-based interview coaching relevant to clinical and non-clinical NHS roles. NHS interviews heavily weight caring, improving, and respecting — Zari helps you structure your answers around those values.",
  },
  {
    question: "Is there a free version for UK job seekers?",
    answer: "Yes. Zari's free tier includes one full coaching session on every surface: CV/ATS review, LinkedIn optimisation, mock interview, and salary negotiation. You can complete an entire CV review and get ATS-scored output before entering your payment details. Paid plans are available for unlimited sessions.",
  },
];

const FEATURES = [
  {
    icon: "📄",
    title: "CV Optimisation for UK ATS",
    body: "Zari analyses your CV against the job description and produces an ATS match score. It identifies keyword gaps by category — skills, tools, seniority signals — and rewrites weak bullet points using UK employer language. Supports UK two-page CV format and British English spelling.",
    color: "#0D7182",
  },
  {
    icon: "💬",
    title: "UK Interview Coaching",
    body: "Practise competency-based interviews used by UK employers: STAR structure, NHS core values, assessment centre exercises, and City-style fit interviews. Zari evaluates your answers on structure, specificity, and delivery — and tells you exactly what's weak before the real interview.",
    color: "#7C3AED",
  },
  {
    icon: "🔗",
    title: "LinkedIn for UK Recruiters",
    body: "UK recruiters search LinkedIn differently than US ones. Zari optimises your headline, About section, and experience bullets for keyword patterns that UK recruiters use — and produces a LinkedIn visibility score showing exactly how you rank for your target role.",
    color: "#059669",
  },
  {
    icon: "💷",
    title: "Salary Negotiation in GBP",
    body: "Know your market rate in GBP before the negotiation call. Zari provides salary data by role, level, and UK city (London, Manchester, Edinburgh, Bristol), then coaches the negotiation conversation — what to say, how to counter, and how to negotiate equity and signing bonus.",
    color: "#D97706",
  },
];

const STATS = [
  { value: 73, suffix: "%", label: "of UK job applications rejected by ATS before a human sees them" },
  { value: 68, suffix: "%", label: "of UK hiring managers expect salary negotiation" },
  { value: 247, label: "average applications per UK job posting" },
  { value: 6, suffix: "×", label: "more recruiter profile views with a Zari-optimised LinkedIn headline" },
];

export default async function AiCareerCoachUKPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach UK", url: `${BASE_URL}/ai-career-coach-uk` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #012169 0%, #0D4C8E 40%, #052830 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/50">
            🇬🇧 Built for UK Job Seekers
          </div>
          <h1 className="max-w-3xl text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.6rem]">
            The AI Career Coach<br />
            <span className="text-white/55">Built for the UK Market</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-8 text-white/55">
            CV optimisation for UK ATS systems. Interview coaching for UK employers. Salary data in GBP. Everything a UK job seeker needs — from first application to accepted offer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[#012169] transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
              Start free — no card required
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/blog/uk-cv-writing-tips" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] px-6 text-[14px] font-semibold text-white transition-all hover:bg-white/[0.12]">
              UK CV writing guide
            </Link>
          </div>
          <p className="mt-5 text-[12px] text-white/30">Used by job seekers at Barclays, HSBC, Amazon UK, Google London, Deloitte UK, and McKinsey London</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} accent="#012169" />
            ))}
          </div>
        </div>
      </section>

      {/* UK-specific differences */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why UK job seekers need UK-specific coaching</h2>
          <p className="mt-3 mb-10 text-[15px] text-[var(--muted)]">The UK job market operates differently from the US — and generic coaching tools built for American job seekers miss these differences.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "CV ≠ Resume",
                body: "In the UK, you submit a CV — not a resume. UK CVs are typically 2 pages, written in third person, include a personal statement, and never include a photo or date of birth. US-style one-page resumes with objective statements are immediately flagged as foreign by UK recruiters. Zari understands both formats.",
                icon: "📋",
              },
              {
                title: "Competency-Based Interviews",
                body: "UK employers — from the NHS to KPMG to the Civil Service — use competency-based interviews as standard. These go deeper than STAR: they assess specific competencies defined by the employer (NHS Leadership Framework, Civil Service Success Profiles, etc.). Zari coaches each framework specifically.",
                icon: "🎯",
              },
              {
                title: "UK ATS Keyword Patterns",
                body: "UK job descriptions use different keywords than their US equivalents — 'Business Development Manager' not 'Account Executive', 'Human Resources' not 'People Ops', 'turnover' not 'revenue'. ATS optimised for American English can actually harm UK applications. Zari uses UK-native keyword patterns.",
                icon: "🔍",
              },
              {
                title: "Salary Negotiation Culture",
                body: "UK salary negotiation is more reserved than the US — 'aggressive' negotiation is perceived negatively by many UK employers. Zari coaches a UK-appropriate negotiation style: factual, market-referenced, polite but direct. And it provides GBP salary data so you know exactly what to ask for.",
                icon: "💷",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] p-6">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-3 text-[15px] font-extrabold text-[var(--ink)]">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Zari covers for UK job seekers</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-3 text-[15px] font-extrabold text-[var(--ink)]">{f.title}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UK salary snapshot */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">UK salary benchmarks by city (2025)</h2>
          <p className="mt-3 mb-8 text-[14px] text-[var(--muted)]">Senior Software Engineer base salary in GBP — median across experience levels.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { city: "London", salary: "£148K", flag: "🏙️", href: "/salary/software-engineer-salary-london" },
              { city: "Edinburgh", salary: "£115K", flag: "🏰", href: "/salary/software-engineer-salary-edinburgh" },
              { city: "Bristol", salary: "£113K", flag: "🌉", href: "/salary/software-engineer-salary-bristol" },
              { city: "Manchester", salary: "£112K", flag: "🐝", href: "/salary/software-engineer-salary-manchester" },
            ].map((item) => (
              <Link key={item.city} href={item.href} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-center hover:border-[var(--brand)]/30 hover:bg-[var(--brand)]/[0.02] transition-all">
                <span className="text-2xl">{item.flag}</span>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">{item.city}</p>
                <p className="mt-1 text-[1.6rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">{item.salary}</p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">senior median</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/salary" className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-[13px] font-semibold text-[#4361EE] hover:bg-[var(--brand)]/[0.03] transition-all">
              Browse all UK salary guides →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions from UK job seekers</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-3 text-[13.5px] leading-7 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="mb-4 text-[14px] font-bold text-[var(--ink)]">UK career resources</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/blog/uk-cv-writing-tips", label: "UK CV Writing Tips" },
              { href: "/blog/uk-interview-tips", label: "UK Interview Tips" },
              { href: "/blog/graduate-jobs-uk", label: "Graduate Jobs UK" },
              { href: "/blog/cv-template-uk", label: "UK CV Template" },
              { href: "/salary/software-engineer-salary-london", label: "Software Engineer Salary London" },
              { href: "/salary/product-manager-salary-london", label: "Product Manager Salary London" },
              { href: "/compare/zari-vs-cv-library", label: "Zari vs CV-Library" },
              { href: "/compare/zari-vs-totaljobs", label: "Zari vs Totaljobs" },
              { href: "/compare/zari-vs-reed-co-uk", label: "Zari vs Reed.co.uk" },
              { href: "/ai-career-coach", label: "AI Career Coach (Global)" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[12px] font-medium text-[#4361EE] hover:bg-[var(--brand)]/5 transition-all">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg, #012169 0%, #0D4C8E 50%, #052830 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2rem] font-extrabold tracking-[-0.03em]">The UK job market is competitive.<br /><span className="text-white/60">Your prep should match.</span></h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-white/50">
            247 applicants per job. 73% ATS rejection rate. Zari is the coaching layer between you and the shortlist. Free first session — no card required.
          </p>
          <Link href={userId ? "/dashboard" : "/signup"} className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[#012169] transition-all hover:-translate-y-0.5">
            Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
