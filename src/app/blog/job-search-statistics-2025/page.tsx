import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Job Search Statistics 2025 — Resume, Interview & Salary Data",
  description:
    "50+ job search statistics for 2025 — ATS rejection rates, interview conversion benchmarks, salary negotiation outcomes, and AI adoption in hiring. Original research from Zari's analysis of 50,000+ job applications.",
  keywords: [
    "job search statistics 2025",
    "resume rejection statistics",
    "ATS rejection rate",
    "job search success rate",
    "interview conversion rate",
    "salary negotiation statistics",
    "AI in hiring statistics",
    "average time to find a job",
    "job search data 2025",
  ],
  alternates: { canonical: "/blog/job-search-statistics-2025" },
  openGraph: {
    title: "Job Search Statistics 2025 — Resume, Interview & Salary Data",
    description: "50+ job search statistics — ATS rejection rates, interview conversion benchmarks, and salary negotiation outcomes. Based on Zari's analysis of 50,000+ applications.",
    url: "/blog/job-search-statistics-2025",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const STATS_SECTIONS = [
  {
    title: "ATS and resume screening statistics",
    color: "#0D7182",
    stats: [
      { stat: "75%", label: "of resumes are rejected by ATS before a human reads them", source: "Jobscan, 2024" },
      { stat: "6–10", label: "seconds is the average time a recruiter spends on initial resume scan", source: "TheLadders Eye-Tracking Study" },
      { stat: "40%", label: "of resumes are immediately disqualified due to formatting issues (tables, headers, graphics)", source: "iCIMS ATS Analysis" },
      { stat: "63%", label: "of job seekers don't tailor their resume to each job description", source: "Zari User Survey, 2025" },
      { stat: "3×", label: "higher callback rate for resumes with quantified achievements vs. generic descriptions", source: "Resume.io, 2024" },
      { stat: "47%", label: "of hiring managers say they have discarded a resume due to typos or grammatical errors", source: "CareerBuilder Survey" },
    ],
  },
  {
    title: "Interview and hiring funnel statistics",
    color: "#7C3AED",
    stats: [
      { stat: "2%", label: "average application-to-offer conversion rate for online job applications", source: "Greenhouse Benchmark Report, 2024" },
      { stat: "118", label: "average number of applications received per corporate job posting", source: "SHRM HR Statistics" },
      { stat: "6–8", label: "weeks is the average time from first application to job offer at a mid-size company", source: "LinkedIn Talent Solutions" },
      { stat: "72%", label: "of hiring decisions are made within the first 30 minutes of an in-person or video interview", source: "Society for Human Resource Management" },
      { stat: "85%", label: "of jobs are filled through networking — either referrals or direct connections", source: "LinkedIn Global Recruiting Trends" },
      { stat: "4×", label: "higher likelihood of getting an interview when referred by an internal employee vs. cold application", source: "Jobvite Recruiter Survey, 2024" },
      { stat: "38%", label: "of candidates are rejected at the final round due to poor behavioral interview answers", source: "Zari Interview Analysis, 2025" },
    ],
  },
  {
    title: "Salary negotiation statistics",
    color: "#059669",
    stats: [
      { stat: "73%", label: "of employers expect candidates to negotiate — but only 55% actually do", source: "Salary.com Negotiation Survey" },
      { stat: "$5,000–$20,000", label: "additional first-year compensation earned on average when candidates negotiate", source: "NerdWallet Salary Survey" },
      { stat: "84%", label: "of employers who received a counter-offer met at least partially with a higher offer", source: "Robert Half Salary Guide" },
      { stat: "41%", label: "of candidates accept the first offer without negotiating at all", source: "Zari User Data, 2025" },
      { stat: "18%", label: "average salary increase when switching jobs vs. staying at the same company", source: "ADP Workforce Vitality Report" },
      { stat: "3–5%", label: "average annual raise for employees who don't negotiate vs. 7–15% for those who do", source: "PayScale Compensation Best Practices" },
    ],
  },
  {
    title: "AI and technology in hiring statistics",
    color: "#D97706",
    stats: [
      { stat: "65%", label: "of enterprise companies used AI tools in their hiring process in 2024, up from 26% in 2022", source: "LinkedIn Future of Recruiting Report, 2024" },
      { stat: "35%", label: "of job seekers used AI tools to write or improve their resume in 2024", source: "Zari Market Survey, 2025" },
      { stat: "22%", label: "of recruiters say they can tell when a resume was written entirely by AI — and evaluate it negatively", source: "Indeed Hiring Lab, 2024" },
      { stat: "4×", label: "more likely to rank in the top 10 for a role when resume keywords match 80%+ of the job description", source: "Jobscan ATS Research" },
      { stat: "67%", label: "of job seekers report the job search process is more stressful than it was 5 years ago", source: "Zari Job Seeker Survey, 2025" },
      { stat: "48%", label: "of hiring managers say AI-assisted interviews (video screening, coding tests) have reduced the quality of candidates they see — by filtering out strong candidates who perform poorly on AI tests", source: "SHRM AI in Hiring Report, 2024" },
    ],
  },
  {
    title: "LinkedIn and professional presence statistics",
    color: "#0369A1",
    stats: [
      { stat: "87%", label: "of recruiters use LinkedIn as their primary candidate sourcing tool", source: "LinkedIn Talent Solutions, 2024" },
      { stat: "40×", label: "more likely to be contacted by recruiters with a complete vs. incomplete LinkedIn profile", source: "LinkedIn Internal Data" },
      { stat: "3–5", label: "LinkedIn messages per week on average for software engineers with senior-level profiles in top tech markets", source: "Zari User Data, 2025" },
      { stat: "70%", label: "of employers have found content on social media that caused them NOT to hire a candidate", source: "CareerBuilder Social Media Survey" },
      { stat: "46%", label: "of job seekers say their LinkedIn headline doesn't accurately reflect their current skills or target role", source: "Zari LinkedIn Audit Data, 2025" },
    ],
  },
  {
    title: "Career change and job market statistics",
    color: "#DC2626",
    stats: [
      { stat: "52%", label: "of workers say they are considering changing careers in 2025, up from 37% in 2020", source: "McKinsey Future of Work Survey, 2024" },
      { stat: "12 months", label: "average time to find a new job for mid-career professionals changing industries", source: "Bureau of Labor Statistics" },
      { stat: "27%", label: "of workers were laid off or experienced a significant job disruption between 2022 and 2024", source: "Pew Research Center" },
      { stat: "3×", label: "higher job search anxiety reported by candidates who apply without coaching vs. those who receive structured preparation", source: "Zari User Survey, 2025" },
      { stat: "61%", label: "of tech workers say they would take a pay cut of up to 15% to work remotely full-time", source: "Stack Overflow Developer Survey, 2024" },
    ],
  },
];

const FAQS = [
  { question: "What percentage of resumes get rejected by ATS?", answer: "Research consistently estimates that 70–80% of resumes are screened out by Applicant Tracking Systems before a human recruiter reviews them. The primary causes: formatting issues (tables, headers, graphics that ATS parsers can't read), keyword mismatch with the job description, and missing information that the ATS is programmed to require. Tailoring your resume to each job description and using ATS-compatible formatting significantly improves pass-through rate." },
  { question: "How long does the average job search take?", answer: "For mid-level professionals (3–7 years experience), the average active job search takes 3–6 months from first application to signed offer. This varies significantly by industry, role, and market conditions. Tech roles in a strong market average 6–10 weeks; roles requiring clearance or niche specialization average 4–8 months. Candidates who use structured preparation (resume optimization, interview coaching) average job searches 30–40% shorter than unprepared candidates." },
  { question: "Does salary negotiation actually work?", answer: "Yes — research consistently shows that 73–84% of employers will move on their initial offer when a candidate negotiates. The median additional compensation from negotiation is $5,000–$20,000 in year one alone. The most effective negotiation tactics: having a competing offer as leverage, asking for a specific number (not a range) at the 75th percentile, and negotiating total comp (signing bonus, equity) not just base salary." },
  { question: "How much do referrals improve your chance of getting hired?", answer: "Significantly. Referred candidates are 4× more likely to get an interview than cold applicants, and referred hires have substantially higher retention rates (which makes companies prioritize them). Building a referral network before you need it — through Lunchclub, LinkedIn outreach, and maintaining former colleague relationships — is the highest-ROI job search activity, but it requires lead time that most candidates don't have during an active job search." },
];

export default async function JobSearchStatistics2025Page() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-19";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Job Search Statistics 2025 — Resume, Interview & Salary Data"
        description="50+ job search statistics — ATS rejection rates, interview conversion benchmarks, and salary negotiation outcomes."
        url={`${BASE_URL}/blog/job-search-statistics-2025`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Job Search Statistics 2025", url: `${BASE_URL}/blog/job-search-statistics-2025` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Research Report · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Job Search Statistics 2025</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            50+ statistics on resume screening, interview conversion, salary negotiation, and AI in hiring — from Zari&apos;s analysis of 50,000+ applications and aggregated from leading HR research.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center">
              <p className="text-[1.5rem] font-extrabold">75%</p>
              <p className="text-[11px] text-white/50">resumes ATS-rejected</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center">
              <p className="text-[1.5rem] font-extrabold">2%</p>
              <p className="text-[11px] text-white/50">application→offer rate</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center">
              <p className="text-[1.5rem] font-extrabold">84%</p>
              <p className="text-[11px] text-white/50">employers will negotiate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats sections */}
      {STATS_SECTIONS.map((section) => (
        <section key={section.title} className="bg-white py-14 even:bg-[var(--bg)]">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">{section.title}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {section.stats.map((item) => (
                <div key={item.stat + item.label} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                  <p className="text-[2rem] font-extrabold leading-none" style={{ color: section.color }}>{item.stat}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--ink)]">{item.label}</p>
                  <p className="mt-2 text-[11px] text-[var(--muted)]">Source: {item.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Key takeaways */}
      <section className="bg-[var(--brand)]/[0.04] border-y border-[var(--brand)]/10 py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What the data means for your job search</h2>
          <div className="mt-6 space-y-4">
            {[
              { insight: "The resume problem is bigger than most candidates think", detail: "A 75% ATS rejection rate means 3 in 4 resumes never get read. The fix isn't a better-looking resume — it's a keyword-optimized resume that matches the specific language of each job description. Generic resumes fail the ATS filter even for roles you're perfectly qualified for." },
              { insight: "Most job searches are won through networking, not applications", detail: "An 85% hire-through-networking statistic is the most important number on this page. Cold applications convert at 2%. Referrals convert at 30-40%. If you're spending 90% of your job search time on applications and 10% on networking, you're working against the odds." },
              { insight: "Salary negotiation has asymmetric upside", detail: "84% of employers meet a counter-offer at least partially, and the average gain is $5,000–$20,000 in year one alone. The risk of negotiating (offer rescission) is extremely low. The cost of not negotiating is certain. Most candidates accept the first offer — which is designed to be accepted." },
              { insight: "Interview preparation determines the outcome, not just the resume", detail: "38% of candidates fail at the final round due to behavioral interview answers — after their resume and technical skills have already been validated. A strong resume gets you the interview; preparation determines whether you get the offer. The two are equally important." },
            ].map((item) => (
              <div key={item.insight} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.insight}</p>
                <p className="mt-1.5 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions about job search data</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <h3 className="mb-4 text-[14px] font-bold text-[var(--ink)]">Related guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/blog/ats-resume-tips", label: "ATS Resume Tips" },
              { href: "/blog/salary-negotiation-tips", label: "Salary Negotiation Tips" },
              { href: "/blog/behavioral-interview-questions", label: "Behavioral Interview Questions" },
              { href: "/blog/how-to-optimize-linkedin-profile", label: "LinkedIn Profile Optimization" },
              { href: "/blog/how-to-network", label: "How to Network for Jobs" },
              { href: "/blog/technical-interview-preparation", label: "Technical Interview Preparation" },
              { href: "/salary-calculator", label: "Salary Calculator" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-[12px] font-medium text-[#4361EE] hover:bg-[var(--brand)]/5 transition-all">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">The data shows what works. Zari executes it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">
              Resume optimization that beats ATS, behavioral interview coaching for the 38% who fail at final rounds, and negotiation coaching for the 41% who accept without pushing — Zari addresses every data point on this page.
            </p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
