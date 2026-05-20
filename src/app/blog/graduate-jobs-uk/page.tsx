import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Graduate Jobs UK 2025 — How to Get a Graduate Job in Britain",
  description: "Complete guide to finding a graduate job in the UK in 2025. Covers graduate schemes, the milkround, assessment centres, top graduate employers, and how to stand out as a new graduate.",
  keywords: ["graduate jobs UK", "graduate job search UK", "how to get a graduate job UK", "graduate schemes UK 2025", "UK graduate recruitment", "milkround UK", "assessment centre UK graduates", "graduate CV UK"],
  alternates: { canonical: "/blog/graduate-jobs-uk" },
  openGraph: { title: "Graduate Jobs UK 2025 — Complete Guide to Landing Your First Role", description: "Graduate schemes, the milkround, assessment centres, and how to stand out as a new graduate in the UK.", url: "/blog/graduate-jobs-uk" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "When should I apply for graduate schemes in the UK?", answer: "Most UK graduate schemes open in September–October and close by December–January for September the following year. The largest graduate employers (the Big Four, banks, Civil Service) fill their places quickly — many are full by November. Apply in September as soon as applications open. Waiting until spring dramatically reduces your chances for competitive schemes." },
  { question: "What is the difference between a graduate scheme and a graduate job?", answer: "A graduate scheme is a structured multi-year programme (typically 2–3 years) designed specifically for new graduates, with rotations, training, mentoring, and a structured path to a permanent role. A graduate job is simply an entry-level role open to graduates — it may not have the structured development programme. Graduate schemes typically pay more and have more formal training, but are more competitive to enter." },
  { question: "What GPA / degree classification do top UK employers require?", answer: "Most UK graduate scheme applications require a 2:1 degree classification (equivalent to roughly a 3.3–3.5 GPA). Some top-tier employers (Goldman Sachs, McKinsey, Oxbridge consulting recruiters) informally prefer Firsts (1st class). Many employers now use contextual recruitment that adjusts requirements based on the circumstances of your education — a 2:2 from a disadvantaged background may be viewed equivalently to a 2:1 from a more privileged context." },
  { question: "Do I need a 2:1 for all graduate jobs in the UK?", answer: "No. The 2:1 requirement is typical for large corporate graduate schemes (finance, consulting, law, civil service). Many tech companies, startups, and SMEs hire graduates without a degree classification requirement, focusing instead on skills, projects, and interviews. If you have a 2:2 or lower, target companies without a classification requirement and compete on your portfolio, projects, and demonstrated skills." },
];

const TOP_SCHEMES = [
  { employer: "Civil Service Fast Stream", industry: "Government", startingSalary: "£30,000–£35,000", deadline: "September–November", places: "~1,000", difficulty: "Very High" },
  { employer: "Big Four (Deloitte, PwC, EY, KPMG)", industry: "Consulting / Audit", startingSalary: "£27,000–£35,000", deadline: "October–December", places: "~1,500 each", difficulty: "High" },
  { employer: "Goldman Sachs", industry: "Investment Banking", startingSalary: "£52,000–£60,000", deadline: "October–November", places: "~50–100 UK", difficulty: "Extremely High" },
  { employer: "Amazon SDE Graduate", industry: "Tech", startingSalary: "£42,000–£50,000", deadline: "Rolling", places: "~200 UK", difficulty: "High" },
  { employer: "Google EMEA Graduate", industry: "Tech", startingSalary: "£45,000–£55,000", deadline: "October–January", places: "~100 UK", difficulty: "Extremely High" },
  { employer: "NHS Graduate Management", industry: "Healthcare", startingSalary: "£32,000", deadline: "October–January", places: "~200", difficulty: "High" },
  { employer: "Teach First", industry: "Education", startingSalary: "£30,000–£36,000", deadline: "October–March", places: "~1,700", difficulty: "Medium" },
  { employer: "Unilever Future Leaders", industry: "FMCG", startingSalary: "£33,000–£38,000", deadline: "October–November", places: "~100 UK", difficulty: "High" },
];

export default async function GraduateJobsUkPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Graduate Jobs UK 2025" description="Complete guide to graduate schemes, the milkround, assessment centres, and landing a graduate job in the UK." url={`${BASE_URL}/blog/graduate-jobs-uk`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Graduate Jobs UK", url: `${BASE_URL}/blog/graduate-jobs-uk` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #012169 0%, #0D4C8E 55%, #052830 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">🇬🇧 UK Guide</span>
            <span className="text-[12px] text-white/35">14 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Graduate Jobs UK 2025:<br /><span className="text-white/55">How to Land Your First Role in Britain</span></h1>
          <p className="mt-5 text-[15px] leading-7 text-white/50">Graduate schemes, the milkround, assessment centres, top UK employers, deadlines, and how to stand out as a new graduate in 2025.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={85} label="graduate scheme applications per place at top UK employers" accent="#012169" />
            <StatCard value={4} label="stages typical UK graduate scheme recruitment process" accent="#0D7182" />
            <StatCard value={32} suffix="K" label="starting salary (£) for top UK grad schemes average" accent="#059669" />
            <StatCard value={73} suffix="%" label="of UK graduate scheme applications reviewed before Christmas" accent="#7C3AED" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15px] leading-8 text-[var(--muted)]">

          <h2 className="!mt-4 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">The UK graduate recruitment calendar</h2>
          <p>The UK has a structured annual graduate recruitment cycle that is very different from the ad hoc hiring most professionals experience later in their careers.</p>
          <div className="space-y-3">
            {[
              { month: "September", event: "Applications open", detail: "Most major graduate schemes open their applications. Apply immediately — some fill within weeks." },
              { month: "October–November", event: "Deadline rush", detail: "The majority of competitive scheme deadlines fall here. Applications submitted in September have a measurably higher acceptance rate than November applications." },
              { month: "November–January", event: "Online tests & video interviews", detail: "SHL, Cubiks, and Pymetrics tests. Many companies use HireVue or Spark Hire for video screening." },
              { month: "January–March", event: "Assessment centres", detail: "Half-day or full-day structured assessments: group exercises, case studies, written exercises, and panel interviews." },
              { month: "March–May", event: "Offers and rejections", detail: "Most schemes send offers. The Civil Service Fast Stream typically communicates in March–April." },
              { month: "September", event: "Graduate intake", detail: "Most schemes start in September or October, aligned with the end of the academic year." },
            ].map((item) => (
              <div key={item.month} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <span className="flex-shrink-0 w-28 text-[11px] font-bold text-[var(--brand)]">{item.month}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.event}</p>
                  <p className="mt-0.5 text-[13px]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">Top UK graduate schemes 2025</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Employer</th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Industry</th>
                  <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Starting Salary</th>
                  <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {TOP_SCHEMES.map((s, i) => (
                  <tr key={s.employer} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--bg)]/50" : "bg-white"}`}>
                    <td className="px-4 py-3.5 font-bold text-[var(--ink)]">{s.employer}</td>
                    <td className="px-4 py-3.5 text-[var(--muted)]">{s.industry}</td>
                    <td className="px-4 py-3.5 text-right font-bold text-[var(--brand)]">{s.startingSalary}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        s.difficulty === "Extremely High" ? "bg-red-100 text-red-600" :
                        s.difficulty === "Very High" ? "bg-orange-100 text-orange-600" :
                        s.difficulty === "High" ? "bg-amber-100 text-amber-600" :
                        "bg-green-100 text-green-600"
                      }`}>
                        {s.difficulty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="!mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">How to ace UK assessment centres</h2>
          <p>Assessment centres are the final stage for most UK graduate schemes. They typically run 4–8 hours and assess you across multiple exercises simultaneously.</p>
          <div className="space-y-3">
            {[
              { exercise: "Group exercise", tip: "Contribute clearly, listen actively, build on others&apos; ideas. Assessors are scoring collaboration, not dominance — the person who talks most often scores lowest." },
              { exercise: "Written analysis / in-tray exercise", tip: "Read everything before writing. Structure: situation → key issues → recommendation → risks. Aim for a one-page summary, not exhaustive analysis." },
              { exercise: "Presentation", tip: "3–5 minute presentations are typical. Prepare a clear structure (situation, analysis, recommendation, next steps). Practise delivering it in the time limit with a timer." },
              { exercise: "Competency interview", tip: "Same STAR format as earlier interview stages — but often more probing. Expect 'what would you have done differently?' and 'what was the hardest part?'" },
              { exercise: "Psychometric tests", tip: "Practise SHL-style tests (numerical, verbal, situational judgment) under time pressure. Speed is as important as accuracy. Free practice: SHL Direct, Psychometric Success." },
            ].map((item) => (
              <div key={item.exercise} className="rounded-xl border border-[var(--border)] p-5">
                <p className="font-bold text-[var(--ink)]">{item.exercise}</p>
                <p className="mt-2 text-[13px] leading-6" dangerouslySetInnerHTML={{ __html: item.tip }} />
              </div>
            ))}
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

          <div className="mt-10 rounded-2xl border border-[#012169]/20 bg-[#012169]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practise assessment centre exercises and graduate interviews — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari coaches competency-based interviews, CV writing, and assessment centre prep for UK graduate roles. Free first session.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl px-8 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#012169" }}>
              Start graduate prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-[14px] font-bold text-[var(--ink)]">Related UK guides</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/blog/uk-cv-writing-tips", label: "UK CV Writing Tips" },
                { href: "/blog/uk-interview-tips", label: "UK Interview Tips" },
                { href: "/blog/cv-template-uk", label: "UK CV Template" },
                { href: "/ai-career-coach-uk", label: "AI Career Coach UK" },
                { href: "/blog/star-method-interview", label: "STAR Method" },
                { href: "/blog/how-to-get-a-job-with-no-experience", label: "Getting a Job With No Experience" },
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
