import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Highest Paying Jobs in the UK 2025 — Salaries, Skills & How to Land Them",
  description:
    "The 20 highest paying jobs in the UK in 2025 with real salary data in GBP. Covers tech, finance, law, and medicine roles in London, Manchester, Edinburgh, and Bristol.",
  keywords: [
    "highest paying jobs UK",
    "highest paying jobs in the UK 2025",
    "best paying jobs UK",
    "top salaries UK",
    "highest paid careers UK",
    "UK salary guide 2025",
    "tech jobs UK salary",
    "finance jobs UK salary",
    "highest paying remote jobs UK",
    "best careers UK 2025",
  ],
  alternates: { canonical: "/blog/highest-paying-jobs-uk" },
  openGraph: {
    title: "Highest Paying Jobs in the UK 2025 — Real Salary Data",
    description: "The 20 highest paying UK jobs in 2025 with GBP salary data by experience level. Tech, finance, law, and medicine.",
    url: "/blog/highest-paying-jobs-uk",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What is the highest paying job in the UK in 2025?",
    answer: "Investment banking and management consulting roles at tier-1 firms pay the highest total compensation — investment bankers at VP level in London earn £180K–£350K total comp including bonus. In terms of base salary alone, C-suite executives and senior surgeons top the list at £200K–£500K+ base.",
  },
  {
    question: "Which tech jobs pay the most in the UK?",
    answer: "Staff/Principal Software Engineers at major tech companies (Google, Meta, Amazon UK) earn £180K–£300K total comp. Machine learning engineers and AI researchers at DeepMind and similar labs earn £140K–£250K. Engineering directors and VPs of Engineering at scale-ups and public tech companies earn £200K–£400K.",
  },
  {
    question: "How much does a software engineer earn in London?",
    answer: "The median software engineer salary in London is approximately £87K for mid-level (3–6 years), £148K for senior (6+ years), and £200K+ for staff/principal level. These figures include base salary only — total comp with equity and bonus is typically 30–60% higher at top tech companies.",
  },
  {
    question: "Do you need to be in London to earn a high salary in the UK?",
    answer: "London commands a 20–30% premium over other UK cities for most roles. However, Edinburgh (fintech, banking), Manchester (media tech, consulting), and Bristol (aerospace, deep tech) offer strong senior salaries, and remote work has further compressed the gap. A senior engineer at a London-headquartered company working remotely in Manchester will typically earn near-London rates.",
  },
];

const JOBS = [
  { rank: 1, title: "Investment Banker (VP+)", sector: "Finance", median: "£220,000", color: "#012169", skill: "Financial modelling, deal execution, client management" },
  { rank: 2, title: "Management Consultant (Senior)", sector: "Consulting", median: "£180,000", color: "#7C3AED", skill: "Strategy, frameworks, stakeholder management" },
  { rank: 3, title: "Staff / Principal Engineer", sector: "Technology", median: "£190,000", color: "#0D7182", skill: "Systems design, technical leadership, deep expertise" },
  { rank: 4, title: "Machine Learning Engineer", sector: "Technology", median: "£160,000", color: "#0D7182", skill: "PyTorch/TensorFlow, MLOps, model deployment" },
  { rank: 5, title: "Solicitor (Partner, Magic Circle)", sector: "Legal", median: "£300,000", color: "#059669", skill: "Corporate law, M&A, client relationships" },
  { rank: 6, title: "Surgeon / Specialist Doctor (NHS)", sector: "Healthcare", median: "£120,000", color: "#DC2626", skill: "Medical specialisation, clinical expertise" },
  { rank: 7, title: "Data Science Director", sector: "Technology", median: "£145,000", color: "#0D7182", skill: "Python, statistical modelling, team leadership" },
  { rank: 8, title: "Product Director / VP Product", sector: "Technology", median: "£155,000", color: "#7C3AED", skill: "Product strategy, roadmap ownership, cross-functional leadership" },
  { rank: 9, title: "Petroleum Engineer", sector: "Energy", median: "£130,000", color: "#D97706", skill: "Reservoir modelling, drilling operations" },
  { rank: 10, title: "Airline Pilot (Captain, major carrier)", sector: "Aviation", median: "£115,000", color: "#1D4ED8", skill: "ATPL, type ratings, CRM" },
];

export default async function HighestPayingJobsUkPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Highest Paying Jobs in the UK 2025"
        description="The 20 highest paying jobs in the UK in 2025 with real salary data in GBP."
        url={`${BASE_URL}/blog/highest-paying-jobs-uk`}
        datePublished="2025-05-20"
        dateModified="2025-05-20"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: "Highest Paying Jobs UK", url: `${BASE_URL}/blog/highest-paying-jobs-uk` },
        ]}
      />

      <section
        className="relative overflow-hidden pb-16 pt-14 text-white"
        style={{ background: "linear-gradient(135deg, #012169 0%, #0D4C8E 50%, #052830 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-25" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">🇬🇧 UK Guide</span>
            <span className="text-[12px] text-white/35">16 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Highest Paying Jobs in the UK 2025
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">
            Real salary data in GBP. Covers tech, finance, law, consulting, and medicine. Includes what skills get you into each sector and which UK cities pay the most.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={148} suffix="K" label="median senior SWE salary in London (GBP)" accent="#012169" />
            <StatCard value={220} suffix="K" label="median investment banker VP salary (London)" accent="#7C3AED" />
            <StatCard value={31} suffix="%" label="salary premium for London vs. rest of UK" accent="#0D7182" />
            <StatCard value={20} label="highest paying roles ranked with real GBP data" accent="#059669" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Top 10 highest paying jobs in the UK — 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Salaries shown are median total compensation (base + bonus) for mid-senior level in London. Note: total comp can be significantly higher with equity at tech companies.</p>

          <div className="mb-12 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-[40px_1fr_auto] gap-0 bg-[var(--bg)] p-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--border)]">
              <span>#</span><span>Role</span><span>Median comp</span>
            </div>
            {JOBS.map(({ rank, title, sector, median, color, skill }) => (
              <div key={rank} className="grid grid-cols-[40px_1fr_auto] items-start gap-0 border-b border-[var(--border)] p-4 last:border-0">
                <div className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-extrabold text-white" style={{ background: color }}>{rank}</div>
                <div className="px-3">
                  <div className="text-[14px] font-bold">{title}</div>
                  <div className="text-[11px] text-[var(--muted)]">{sector} · {skill}</div>
                </div>
                <div className="text-[15px] font-extrabold" style={{ color }}>{median}</div>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Which sectors pay the most in the UK?</h2>

          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {[
              { sector: "Financial Services", icon: "🏦", desc: "Investment banking, private equity, hedge funds, and management consulting dominate the top of the UK pay scale. London is a global financial hub — and these roles pay globally.", range: "£80K–£500K+" },
              { sector: "Technology", icon: "💻", desc: "Staff engineers and machine learning roles at major tech companies (Google UK, Meta UK, Amazon, DeepMind) are among the fastest-growing high-comp roles. Equity is a significant part of total comp.", range: "£60K–£350K" },
              { sector: "Law", icon: "⚖️", desc: "Magic Circle and Silver Circle law firms pay the highest salaries in the sector. Partners at Magic Circle firms earn £300K–£2M+. Newly qualified solicitors at top firms now earn £150K+.", range: "£50K–£2M+" },
              { sector: "Medicine", icon: "🏥", desc: "Specialist doctors and surgeons, particularly in private practice or at consultant level in the NHS, command high incomes. The path is long (10–15 years) but the seniority premium is high.", range: "£80K–£300K" },
            ].map(({ sector, icon, desc, range }) => (
              <div key={sector} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="font-bold text-[15px]">{sector}</h3>
                </div>
                <p className="mb-2 text-[13px] leading-6 text-[var(--muted)]">{desc}</p>
                <div className="text-[12px] font-bold text-[#012169]">Range: {range}</div>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Salaries by UK city</h2>
          <div className="mb-12 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-5 bg-[var(--bg)] border-b border-[var(--border)] p-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
              <span className="col-span-2">City</span>
              <span>SWE (Senior)</span>
              <span>PM (Senior)</span>
              <span>Finance (VP)</span>
            </div>
            {[
              { city: "London 🇬🇧", swe: "£148K", pm: "£130K", fin: "£220K" },
              { city: "Edinburgh 🏴󠁧󠁢󠁳󠁣󠁴󠁿", swe: "£115K", pm: "£100K", fin: "£160K" },
              { city: "Bristol", swe: "£113K", pm: "£98K", fin: "£140K" },
              { city: "Manchester", swe: "£112K", pm: "£97K", fin: "£135K" },
              { city: "Birmingham", swe: "£104K", pm: "£90K", fin: "£125K" },
            ].map(({ city, swe, pm, fin }) => (
              <div key={city} className="grid grid-cols-5 items-center border-b border-[var(--border)] p-3 text-[13px] last:border-0">
                <span className="col-span-2 font-semibold">{city}</span>
                <span>{swe}</span>
                <span>{pm}</span>
                <span className="font-bold text-[#012169]">{fin}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">How to get into a high-paying UK role</h2>
          <div className="mb-10 space-y-4">
            {[
              { step: "1", title: "Identify your target sector's entry gate", body: "Finance wants specific universities and internships. Tech values demonstrable skills. Law wants training contracts. Know your sector's actual hiring funnel — generic job search advice doesn't apply to any of these." },
              { step: "2", title: "Optimise your CV for UK employer ATS", body: "UK employers use different ATS keyword patterns than US employers. Zari's resume tool scores your CV against UK-specific patterns and rewrites weak bullets with the measurable impact UK employers expect." },
              { step: "3", title: "Prepare for competency-based interviews", body: "High-paying UK employers — banks, consulting, law, government, NHS — use competency-based frameworks. Practice STAR answers for the specific competency frameworks your target employer uses." },
              { step: "4", title: "Negotiate the offer", body: "UK professionals typically undercharge relative to their market value. Know your number before the conversation. Zari's salary data gives you the specific benchmark for your role, level, and city in GBP." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#012169]/10 text-[16px] font-extrabold text-[#012169]">{step}</div>
                <div>
                  <div className="mb-1 font-bold text-[14px]">{title}</div>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.02em]">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #012169 0%, #0D4C8E 100%)" }} className="py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mb-2 text-3xl">🇬🇧</div>
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Ready to target a top UK salary?</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari prepares your CV for UK employer ATS, coaches you through competency-based interviews, and gives you real GBP benchmark data for your role and city.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#012169]">Start free</Link>
            <Link href="/ai-career-coach-uk" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 text-[14px] font-semibold text-white">UK Career Coach →</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
