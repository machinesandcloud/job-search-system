import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get a Job in the UK 2025 — Visa, CV, Job Boards & Interview Guide",
  description:
    "Complete guide to getting a job in the UK in 2025. Covers Skilled Worker visa requirements, UK CV format, UK job boards, interview formats, and how to approach UK employers as an international candidate.",
  keywords: [
    "how to get a job in the UK",
    "getting a job in the UK",
    "job search UK 2025",
    "UK work visa job search",
    "skilled worker visa UK jobs",
    "jobs in UK for foreigners",
    "UK job market guide",
    "working in the UK from abroad",
    "how to find a job in England",
    "UK job application tips",
  ],
  alternates: { canonical: "/blog/how-to-get-a-job-in-uk" },
  openGraph: {
    title: "How to Get a Job in the UK 2025 — Complete Guide for International Candidates",
    description: "Skilled Worker visa, UK CV format, job boards, interview prep, and salary negotiation for international candidates seeking UK roles.",
    url: "/blog/how-to-get-a-job-in-uk",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Do I need a visa to work in the UK?",
    answer: "It depends on your citizenship. EEA/EU citizens no longer have automatic right to work in the UK post-Brexit and need a visa unless they have settled or pre-settled status (EUSS). Non-EEA citizens need a Skilled Worker visa or another qualifying visa. Citizens of some countries (Ireland, etc.) have special status. Commonwealth citizens with a UK ancestry visa may also qualify. Always check the gov.uk visa checker for your specific nationality.",
  },
  {
    question: "What is the Skilled Worker visa and how do I qualify?",
    answer: "The UK Skilled Worker visa replaced Tier 2 (General) in December 2020. You need a job offer from a UK employer with a sponsor licence, at a role on the eligible occupations list, meeting the minimum salary threshold (currently £26,200 per year or the 'going rate' for the role, whichever is higher — except some shortage occupations). Your employer handles the sponsorship certificate (CoS). The visa is granted for up to 5 years and leads to indefinite leave to remain.",
  },
  {
    question: "What do UK employers look for in CVs from international candidates?",
    answer: "UK employers want to see right-to-work status clearly stated (visa type and expiry, or 'British citizen', or 'eligible to work in the UK without sponsorship'). They also want UK-format CVs: 2 pages, British English, no photo, personal statement rather than objective. International experience is valued but needs to be framed in terms UK employers recognise — don't assume the recruiter knows your previous employer's brand or reputation.",
  },
  {
    question: "What are the best UK job boards for international candidates?",
    answer: "LinkedIn is the most important platform — most UK employers post senior and professional roles here. Reed.co.uk and Totaljobs cover broad UK roles. Glassdoor UK has good tech and finance coverage. For tech specifically, Otta (now Welcome to the Jungle) lists remote-eligible and visa-sponsoring roles. Always filter for 'visa sponsorship available' or 'open to relocation' where the option exists.",
  },
  {
    question: "How is a UK job interview different from a US interview?",
    answer: "UK interviews are typically more formal in tone but less aggressive in competency grilling than US tech interviews. Competency-based questions ('Give me an example of a time when...') are the dominant format in most sectors. UK culture is generally less self-promotional than US — British candidates undersell, which means there's room to differentiate by being specific and confident without being boastful. References are checked more thoroughly in the UK than in the US.",
  },
];

const BOARDS = [
  { name: "LinkedIn UK", strength: "Senior and professional roles. Most tech and finance companies post here exclusively.", best: "Tech, finance, consulting, marketing" },
  { name: "Reed.co.uk", strength: "UK's largest job board. Broad coverage of all sectors and experience levels.", best: "All sectors, especially SME and mid-market" },
  { name: "Totaljobs", strength: "Strong in professional services, engineering, and NHS roles.", best: "Healthcare, engineering, professional services" },
  { name: "Otta / Welcome to the Jungle", strength: "Curated UK tech roles. Many positions flag visa sponsorship.", best: "Tech startups and scale-ups" },
  { name: "CityJobs / eFinancialCareers", strength: "Finance, banking, and investment management.", best: "Financial services, asset management" },
  { name: "NHS Jobs", strength: "Every NHS role in the UK. Dedicated portal for all NHS positions.", best: "Healthcare, NHS specifically" },
  { name: "Civil Service Jobs", strength: "All UK government and public sector roles.", best: "Government, public sector, policy" },
];

export default async function HowToGetAJobInUkPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get a Job in the UK 2025"
        description="Complete guide to getting a job in the UK. Visa requirements, UK CV format, job boards, and interview prep for international candidates."
        url={`${BASE_URL}/blog/how-to-get-a-job-in-uk`}
        datePublished="2025-05-20"
        dateModified="2025-05-20"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: "How to Get a Job in the UK", url: `${BASE_URL}/blog/how-to-get-a-job-in-uk` },
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
            <span className="text-[12px] text-white/35">18 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            How to Get a Job in the UK 2025
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">
            Complete guide for international candidates. Covers visa requirements, UK CV format, job boards, competency interview prep, and salary negotiation in GBP.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={247} label="average applications per UK job posting" accent="#012169" />
            <StatCard value={73} suffix="%" label="of UK CVs rejected by ATS before human review" accent="#7C3AED" />
            <StatCard value={26200} label="minimum annual salary for Skilled Worker visa (GBP)" accent="#D97706" />
            <StatCard value={6} label="seconds average recruiter spends on a CV first scan" accent="#DC2626" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Step 1 — Understand your right-to-work status</h2>
          <div className="mb-10 grid gap-3 sm:grid-cols-2">
            {[
              { group: "British & Irish citizens", status: "No visa needed. Full right to work. State this clearly on your CV.", color: "#059669" },
              { group: "EU / EEA (pre-settled/settled status)", status: "EU Settlement Scheme covers you. No separate work visa needed. Include your status on applications.", color: "#0A66C2" },
              { group: "Non-EEA (most international candidates)", status: "Skilled Worker visa or similar required. Your employer must hold a sponsor licence. Check the eligible occupation list.", color: "#D97706" },
              { group: "Already in UK on other visa", status: "Check your visa conditions — some visas allow work, others don't. Student visa allows part-time work during studies.", color: "#7C3AED" },
            ].map(({ group, status, color }) => (
              <div key={group} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 text-[12px] font-bold" style={{ color }}>{group}</div>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{status}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Step 2 — Write a UK-format CV</h2>
          <p className="mb-5 text-[14px] text-[var(--muted)]">A UK CV is not the same as a US resume. The most common mistake international candidates make is submitting an American-style 1-page resume.</p>

          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 bg-[var(--bg)] border-b border-[var(--border)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Feature</span><span>UK CV</span><span>US Resume</span>
            </div>
            {[
              { f: "Length", uk: "2 pages standard", us: "1 page standard" },
              { f: "Language", uk: "British English (optimise, colour)", us: "American English" },
              { f: "Opening section", uk: "Personal statement", us: "Summary or objective" },
              { f: "Photo", uk: "No (discrimination risk)", us: "No" },
              { f: "Date of birth", uk: "Never include", us: "Never include" },
              { f: "References", uk: "Don't include (outdated)", us: "Typically omitted" },
              { f: "Right to work", uk: "State explicitly", us: "Not typically included" },
            ].map(({ f, uk, us }, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-[var(--border)] p-3 text-[13px] last:border-0">
                <span className="font-semibold">{f}</span>
                <span className="text-[#012169] font-medium">{uk}</span>
                <span className="text-[var(--muted)]">{us}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Step 3 — Where to find UK jobs</h2>
          <div className="mb-12 space-y-2">
            {BOARDS.map(({ name, strength, best }) => (
              <div key={name} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="font-bold text-[14px]">{name}</div>
                  <div className="rounded-full bg-[#012169]/10 px-2 py-0.5 text-[10px] font-bold text-[#012169]">{best}</div>
                </div>
                <p className="mt-1 text-[13px] leading-5 text-[var(--muted)]">{strength}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Step 4 — Prepare for UK interviews</h2>
          <p className="mb-6 text-[14px] text-[var(--muted)]">UK interviews are largely competency-based. Every major employer — banks, consulting firms, NHS, Civil Service — uses the same basic format: &ldquo;Give me an example of a time when...&rdquo;</p>
          <div className="mb-12 space-y-3">
            {[
              { tip: "Learn the STAR framework", body: "Situation, Task, Action, Result. Every answer should follow this structure. UK interviewers are trained to probe deeper — 'What was YOUR specific contribution?' Prepare 8–10 versatile stories." },
              { tip: "Know the employer's specific competency framework", body: "NHS uses 6 core values. Civil Service uses Success Profiles. Big Four firms have their own frameworks. Research which framework your employer uses and map your stories to it explicitly." },
              { tip: "Be specific, not diplomatic", body: "British professional culture tends toward understatement. In an interview, that means many candidates are too vague. Saying 'I contributed to the team's work' is too vague. '\"I wrote the technical spec that reduced the API response time by 67%\" is the right level of specificity." },
              { tip: "Prepare for the 'Why UK?' question", body: "International candidates will almost always be asked why they want to work in the UK specifically, and why this role. Have genuine, specific answers — not generic answers about 'exciting opportunities'." },
            ].map(({ tip, body }) => (
              <div key={tip} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 font-bold text-[14px]">{tip}</div>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Step 5 — Negotiate your UK salary</h2>
          <div className="mb-10 rounded-2xl border-l-4 border-[#012169] bg-[#012169]/5 p-5">
            <p className="mb-2 font-bold text-[14px] text-[#012169]">UK salary negotiation culture</p>
            <p className="text-[14px] leading-6 text-[var(--muted)]">UK professionals are statistically less likely to negotiate than US professionals — and they leave an average of 10–15% on the table as a result. Negotiation is expected and acceptable. Know your market rate in GBP before the conversation. Zari provides real GBP benchmark data for your role and city so you negotiate from evidence, not assumption.</p>
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
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Ready to land a UK job?</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari writes UK-format CVs optimised for British employer ATS, coaches you through competency-based UK interviews, and provides GBP salary data for every major UK city and role.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#012169]">Start free</Link>
            <Link href="/ai-career-coach-uk" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 text-[14px] font-semibold text-white">UK Career Coach →</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
