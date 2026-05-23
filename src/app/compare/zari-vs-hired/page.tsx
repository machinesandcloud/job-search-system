import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs Hired — Tech Job Marketplace vs AI Career Coach (2025)",
  description:
    "Hired is a tech-focused job marketplace where companies come to you with offers. Zari coaches you to maximize every interview and offer. Here's how they fit together in a modern tech job search.",
  keywords: ["zari vs hired", "hired.com alternative", "hired job marketplace review 2025", "tech job marketplace comparison", "AI career coach for tech jobs", "hired vs linkedin for tech"],
  alternates: { canonical: "/compare/zari-vs-hired" },
  openGraph: {
    title: "Zari vs Hired — Tech Job Marketplace vs AI Career Coach (2025)",
    description: "Hired brings companies to you. Zari coaches you to win every conversation that comes through. Sequential, not competing.",
    url: "/compare/zari-vs-hired",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  { task: "Inbound interest from tech companies", hired: { verdict: "Hired wins", score: "win", detail: "Hired's marketplace model inverts the job search — companies browse candidate profiles and reach out with interview requests and salary offers upfront. For tech professionals (engineers, designers, PMs) with strong profiles, this passive sourcing can generate high-quality inbound interest without active applications. The quality of companies on Hired is generally strong: tech companies, VC-backed startups, and established tech firms." }, zari: { verdict: "Not applicable", score: "na", detail: "Zari doesn't generate inbound interest — it optimizes what you do with it. Once companies reach out through Hired, bring those conversations to Zari to maximize each one." } },
  { task: "Salary transparency before applying", hired: { verdict: "Hired wins", score: "win", detail: "Hired shows salary ranges upfront — companies must provide a range when reaching out. This transparency eliminates one of the most friction-filled parts of job searching: discovering late in the process that the salary doesn't meet your target." }, zari: { verdict: "Complements Hired", score: "partial", detail: "Zari uses Hired's salary data as an anchor in negotiation coaching — knowing the published range before you respond changes how you frame your expectations." } },
  { task: "Resume and profile optimization", hired: { verdict: "Hired provides profile tools", score: "partial", detail: "Hired's candidate profile is the core of your presence on the platform. A well-optimized Hired profile increases inbound volume. The platform provides some guidance on profile completeness." }, zari: { verdict: "Zari wins", score: "win", detail: "Zari optimizes your resume and LinkedIn profile for the specific signals that tech recruiters and hiring managers search for — not just completeness, but the impact-first bullet language that differentiates candidates at the same experience level." } },
  { task: "Interview preparation per company", hired: { verdict: "Hired doesn't help", score: "loss", detail: "Hired's scope is connection and compensation discovery. Once you're in conversation with a company, the platform doesn't provide interview coaching." }, zari: { verdict: "Zari wins", score: "win", detail: "For each company that reaches out through Hired, Zari provides company-specific interview coaching: the interview format, behavioral question patterns, and technical depth expected at your target level." } },
  { task: "Salary negotiation on inbound offers", hired: { verdict: "Hired shows you the range", score: "partial", detail: "Hired's upfront salary ranges give you leverage — you know the company's stated range before they know your number. This is genuinely useful market intelligence." }, zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches you to negotiate above the stated Hired range — which is usually the bottom of what the company will actually pay. Most candidates accept the stated range; Zari coaches the conversation to push for the top of the band or above it." } },
];

const FAQS = [
  { question: "Is Hired worth using for tech job searches?", answer: "Yes, particularly for mid-to-senior tech professionals with 3+ years of experience. The inbound model generates interview requests from companies you might not have found through job board searching, and the salary transparency upfront saves significant time. The platform is less useful for entry-level candidates (companies on Hired are generally looking for experienced hires) and for non-tech roles (coverage outside engineering, design, and product is thin)." },
  { question: "How do I optimize my Hired profile to get more inbound?", answer: "Specificity is the key lever. 'Full stack engineer' gets some inbound; 'Senior backend engineer, 6 years in distributed payment systems (Go, Kafka, PostgreSQL), currently at [Company]' gets targeted inbound from the right companies. Your current role, core tech stack, years of experience, and target roles all affect match quality. Zari can optimize the language in your Hired summary and experience descriptions using the same impact-first principles that work on LinkedIn." },
  { question: "Do I still need to negotiate if Hired shows the salary upfront?", answer: "Yes — the published range is almost always the floor, not the ceiling. Companies set their Hired range conservatively. When you receive an inbound with a $160-200K range, that doesn't mean $200K is the maximum they'll pay — it often means they've budgeted up to $220-230K for the right candidate. Zari coaches the negotiation above the stated range using competing offers and market benchmarks as leverage." },
];

export default async function ZariVsHiredPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Compare", url: `${BASE_URL}/compare` }, { name: "Zari vs Hired", url: `${BASE_URL}/compare/zari-vs-hired` }]} />
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Tech Job Search</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Hired</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">Hired brings companies to you with salary upfront. Zari coaches you to win every conversation that comes through — interview prep and negotiation coaching for each inbound company.</p>
          <div className="mt-8 flex justify-center"><WinScore zariWins={3} total={5} competitorName="Hired" /></div>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task comparison</h2>
          <div className="mt-6 space-y-5">
            {COMPARISON_TASKS.map((row) => (
              <div key={row.task} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5"><p className="font-bold text-[var(--ink)]">{row.task}</p></div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5"><p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.hired.score === "win" ? "text-emerald-600" : row.hired.score === "partial" ? "text-amber-500" : "text-red-500"}`}>Hired — {row.hired.verdict}</p><p className="text-[13px] leading-6 text-[var(--muted)]">{row.hired.detail}</p></div>
                  <div className="p-5"><p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[#4361EE]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>Zari — {row.zari.verdict}</p><p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (<div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5"><p className="font-bold text-[var(--ink)]">{faq.question}</p><p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Getting inbound from Hired? Zari coaches every conversation.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari preps you for each company&apos;s interview style and coaches you to negotiate above Hired&apos;s stated salary range — where the real upside lives.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
