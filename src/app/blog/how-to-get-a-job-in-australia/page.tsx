import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job in Australia 2025 — Complete Guide (Visa, Resume, SEEK)",
  description: "Everything you need to get a job in Australia: visa options, resume format differences, where to find jobs, salary expectations, and how to ace Australian interviews.",
  keywords: ["how to get a job in Australia", "finding a job in Australia", "Australian job market 2025", "get a job in Australia", "job search Australia", "working in Australia", "Australia visa work", "SEEK Australia jobs", "moving to Australia for work", "Australian resume format"],
  alternates: { canonical: "/blog/how-to-get-a-job-in-australia" },
  openGraph: { title: "How to Get a Job in Australia 2025 — Visa, Resume, SEEK Guide", description: "Complete guide to finding work in Australia — visa options, resume differences, job boards, and salary expectations.", url: "/blog/how-to-get-a-job-in-australia" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Do you need a job offer before applying for an Australian work visa?", answer: "It depends on the visa. The Skilled Independent visa (subclass 189) does not require a job offer — it's points-tested and you can apply independently. The Employer Nomination Scheme (subclass 186) does require employer sponsorship. The Temporary Skill Shortage visa (TSS/482) also requires a sponsoring employer. Most migrants without Australian work experience or qualifications start on the TSS 482 pathway, then transition to permanent residency." },
  { question: "How long does it take to find a job in Australia?", answer: "For migrants with in-demand skills (tech, nursing, engineering, trades): 2–8 weeks after arriving. For roles requiring Australian experience or industry recognition: 2–6 months. The biggest factor is whether your overseas qualifications and experience are directly recognised — healthcare, law, and teaching often require additional assessment steps." },
  { question: "Is the Australian resume format different from US/UK?", answer: "Yes. Australian CVs are typically 2–3 pages (not the 1-page US norm), include a photo and personal details in some sectors, don't use an 'objective statement', and often include referees directly on the resume or 'references available on request.' The tone is direct and factual — less branding-heavy than US resumes." },
  { question: "What are the best job boards for finding work in Australia?", answer: "SEEK is the dominant job board with the largest active listings. LinkedIn is strong for professional and mid-senior roles. Indeed Australia has broad coverage but lower employer engagement than SEEK. Jora and CareerOne aggregate listings. For government roles, APSJobs (Australian Public Service) and individual state government portals are the primary sources." },
];

const VISA_OPTIONS = [
  { visa: "Working Holiday (417/462)", who: "18–35, eligible nationalities", detail: "12 months, extendable. Work in any role, change employers freely. Popular first step for Europeans, Brits, Canadians." },
  { visa: "TSS 482 (Employer Sponsored)", who: "Sponsored by employer", detail: "Most common skilled worker pathway. 2–4 years, renewable. Employer must pay market salary or above." },
  { visa: "Skilled Independent 189", who: "Points-tested, no sponsorship needed", detail: "Permanent residency pathway. Requires occupation on MLTSSL, at least 65 points, skills assessment." },
  { visa: "Employer Nomination 186", who: "Direct nomination by employer", detail: "Permanent residency from day one. Requires 3+ years relevant experience and an employer willing to sponsor." },
  { visa: "Graduate Temporary 485", who: "Recent Australian graduates", detail: "Post-study work rights: 2–6 years depending on qualification. Strong pathway to permanent residency." },
  { visa: "Citizen / PR", who: "Unrestricted work rights", detail: "Full access to all roles, including government, defence, and roles requiring citizenship." },
];

const RESUME_DIFF = [
  { dimension: "Length", aus: "2–3 pages typical", us: "1 page for <10 years exp" },
  { dimension: "Photo", aus: "Optional (some sectors include)", us: "Never include" },
  { dimension: "Objective", aus: "Not standard", us: "Often used" },
  { dimension: "References", aus: "List 2 referees on resume or 'on request'", us: "References on separate document" },
  { dimension: "Date of birth", aus: "Never required by law", us: "Never include" },
  { dimension: "Tone", aus: "Direct, factual, outcome-focused", us: "More branded, achievement-forward" },
];

export default async function HowToGetAJobInAustraliaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Get a Job in Australia 2025" description="Complete guide to finding work in Australia — visa options, resume format, best job boards, and interview culture." url={`${BASE_URL}/blog/how-to-get-a-job-in-australia`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job in Australia", url: `${BASE_URL}/blog/how-to-get-a-job-in-australia` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #002244 0%, #0D7182 55%, #00843D 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Job Search · Australia</span>
            <span className="text-[12px] text-white/35">18 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">How to Get a Job in Australia 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">Visa pathways, Australian resume format differences, best job boards, salary benchmarks, and how to navigate SEEK like a local.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Step 1 — Work rights in Australia</h2>
          <p className="mb-6 text-[14px] leading-7 text-[var(--muted)]">Before applying for roles, confirm your work rights. Many Australian employers ask at application stage — and some roles (government, defence, healthcare) require Australian citizenship or permanent residency.</p>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Visa</span><span>Who</span><span>Key details</span>
            </div>
            {VISA_OPTIONS.map(({ visa, who, detail }) => (
              <div key={visa} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold text-[#002244]">{visa}</span>
                <span className="text-[var(--muted)]">{who}</span>
                <span className="text-[var(--muted)]">{detail}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Step 2 — Australian resume format</h2>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Element</span><span>Australia</span><span>US (comparison)</span>
            </div>
            {RESUME_DIFF.map(({ dimension, aus, us }) => (
              <div key={dimension} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{dimension}</span>
                <span className="font-semibold text-[#00843D]">{aus}</span>
                <span className="text-[var(--muted)]">{us}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Step 3 — Where to find jobs in Australia</h2>
          <div className="mb-10 space-y-3">
            {[
              { board: "SEEK", url_display: "seek.com.au", desc: "Dominant Australian job board. Most employers post exclusively here. Use SEEK's salary insights tool for benchmarking." },
              { board: "LinkedIn", url_display: "linkedin.com/jobs", desc: "Strong for professional, tech, and senior roles. Many Australian recruiters headhunt directly on LinkedIn." },
              { board: "APSJobs", url_display: "apsjobs.gov.au", desc: "All Australian Public Service vacancies. Separate application process — requires selection criteria responses." },
              { board: "Indeed Australia", url_display: "au.indeed.com", desc: "Good for volume and smaller employers. Less dominant than in the US." },
              { board: "CareerOne", url_display: "careerone.com.au", desc: "Aggregates from multiple boards. Good for broad market view." },
              { board: "Industry-specific boards", url_display: "", desc: "HealthcareLink (nursing), HESTA (healthcare), TechSydney (tech), Ethical Jobs (NFP sector)." },
            ].map(({ board, desc }) => (
              <div key={board} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 font-bold text-[14px] text-[#0D7182]">{board}</div>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Australian salary benchmarks by city (AUD)</h2>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-5 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Sydney</span><span>Melbourne</span><span>Brisbane</span><span>Perth</span>
            </div>
            {[
              { role: "Software Engineer", syd: "$130–160k", mel: "$120–150k", bris: "$110–140k", per: "$115–145k" },
              { role: "Product Manager", syd: "$135–180k", mel: "$125–165k", bris: "$115–145k", per: "$110–140k" },
              { role: "Data Analyst", syd: "$90–120k", mel: "$85–115k", bris: "$80–105k", per: "$85–110k" },
              { role: "Registered Nurse", syd: "$75–95k", mel: "$72–90k", bris: "$70–88k", per: "$72–92k" },
              { role: "Mining Engineer", syd: "$110–150k", mel: "$105–140k", bris: "$110–145k", per: "$130–180k" },
            ].map(({ role, syd, mel, bris, per }) => (
              <div key={role} className="grid grid-cols-5 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span>{syd}</span><span>{mel}</span><span>{bris}</span><span className="font-semibold text-[#00843D]">{per}</span>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #002244 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Build an Australian-ready resume.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari optimises your resume for SEEK&apos;s ATS, Australian employer expectations, and the specific roles you&apos;re targeting in Sydney, Melbourne, Brisbane, or Perth.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#002244]">Start free — no credit card</Link>
        </div>
      </section>
    </PageFrame>
  );
}
