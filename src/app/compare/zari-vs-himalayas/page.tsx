import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs Himalayas — Remote Job Board vs AI Career Coach (2025)",
  description:
    "Himalayas curates high-quality remote job listings with salary transparency. Zari coaches your resume, interviews, and negotiation for those roles. Here's how to use both.",
  keywords: ["zari vs himalayas", "himalayas job board", "himalayas alternative", "remote job search tools 2025", "remote job board comparison", "AI career coach for remote jobs"],
  alternates: { canonical: "/compare/zari-vs-himalayas" },
  openGraph: {
    title: "Zari vs Himalayas — Remote Job Board vs AI Career Coach (2025)",
    description: "Himalayas finds the best remote roles with salary data. Zari helps you land them. How to use both in sequence.",
    url: "/compare/zari-vs-himalayas",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  {
    task: "Finding high-quality remote job listings",
    himalayas: { verdict: "Himalayas wins", score: "win", detail: "Himalayas curates remote-only listings from companies that have committed to being genuinely remote-first — not hybrid companies adding 'remote' to their listings. Every job shows the salary range, equity, timezone requirements, and a detailed company remote work policy. The curation quality is exceptional: fewer jobs than Indeed, but dramatically better signal-to-noise." },
    zari: { verdict: "Not applicable", score: "na", detail: "Zari doesn't list jobs. Use Himalayas to find the right roles, then bring those descriptions to Zari to optimize your application for each one." },
  },
  {
    task: "Salary transparency and market benchmarking",
    himalayas: { verdict: "Himalayas wins", score: "win", detail: "Himalayas publishes salary ranges for every listing — including equity, signing bonuses, and remote-work stipends. The salary data is current and transparent in a way that most job boards (including LinkedIn) are not. For benchmarking your compensation expectations before negotiating, Himalayas is one of the best free resources available." },
    zari: { verdict: "Complements Himalayas", score: "partial", detail: "Zari uses salary benchmarks in negotiation coaching — but doesn't publish a salary database. Use Himalayas' salary data as input when you work through negotiation strategy with Zari." },
  },
  {
    task: "ATS resume tailoring for specific listings",
    himalayas: { verdict: "Himalayas doesn't help", score: "loss", detail: "Himalayas is a discovery and listing platform. Once you click to apply, you're on your own. There's no resume scoring, keyword analysis, or application coaching — the platform hands off to the company's application system." },
    zari: { verdict: "Zari wins", score: "win", detail: "Paste any Himalayas listing into Zari and it identifies the keywords, async-work signals, and timezone-compatibility signals the company is looking for. Remote roles often screen for remote fluency before technical skills — Zari surfaces those signals and rewrites your bullets to demonstrate them." },
  },
  {
    task: "Company research and remote culture due diligence",
    himalayas: { verdict: "Himalayas wins", score: "win", detail: "Himalayas' company profiles are unusually detailed — remote work policy (async vs synchronous), meeting-heavy vs documentation-first culture, timezone distribution, equipment stipends, and coworking allowances. For assessing whether a company's remote culture actually fits how you work, Himalayas' company pages are more useful than Glassdoor for remote-specific questions." },
    zari: { verdict: "Complements Himalayas", score: "partial", detail: "Zari helps you prepare questions based on Himalayas' company profile — if Himalayas shows a company is synchronous-heavy, Zari can help you assess whether that's a red flag for your working style and prepare targeted questions to probe the reality." },
  },
  {
    task: "Interview preparation for remote-first companies",
    himalayas: { verdict: "Himalayas doesn't help", score: "loss", detail: "No interview coaching on the platform. Himalayas is purely a listing and discovery tool." },
    zari: { verdict: "Zari wins", score: "win", detail: "Remote-first companies (particularly those listed on Himalayas like GitLab, Automattic, Doist, Zapier) interview differently. They probe written communication, async working discipline, and self-management. Zari prepares you for these specific question patterns — 'How do you handle ambiguity when your manager is in a different timezone?' requires different preparation than standard behavioral interviews." },
  },
  {
    task: "Offer negotiation for remote packages",
    himalayas: { verdict: "Himalayas provides salary data", score: "partial", detail: "Himalayas' published salary ranges give you anchoring data before negotiation. This is genuinely valuable — knowing the published band for a role you're negotiating is meaningful leverage." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches you through the actual negotiation using the Himalayas salary data as an anchor. Remote packages have unique components — location-adjusted pay (some companies use SF rates universally, others apply COL adjustments), home office stipends ($500-$2,000/year), coworking allowances, and async productivity bonuses. Zari covers all of these dimensions in the negotiation coaching." },
  },
  {
    task: "Profile visibility to remote companies",
    himalayas: { verdict: "Himalayas has company-side search", score: "partial", detail: "Himalayas allows companies to search candidate profiles. If you create a profile with your remote experience and timezone, you can be found by companies actively sourcing. The quality of companies on Himalayas means inbound from their candidate search is generally higher quality than LinkedIn cold messages." },
    zari: { verdict: "Complements Himalayas", score: "partial", detail: "Zari optimizes your LinkedIn profile for remote-work signals — keywords that remote recruiters search for (async, distributed teams, remote collaboration tools). Using Zari's LinkedIn optimization alongside a Himalayas profile gives you visibility on both platforms." },
  },
];

const FAQS = [
  { question: "Is Himalayas better than We Work Remotely or Remote.co?", answer: "Himalayas has the best salary transparency of any remote job board — every listing shows the range. We Work Remotely has more total volume, particularly for technical roles, but fewer company culture details. Remote.co has strong company vetting but less salary data. For candidates who want to benchmark compensation before applying and work in tech or design, Himalayas is often the best starting point. Most serious remote job seekers use 2-3 boards simultaneously — Himalayas + WWR for tech, Himalayas + FlexJobs for broader searches." },
  { question: "How does Himalayas handle location restrictions on remote jobs?", answer: "Himalayas explicitly lists timezone and location requirements on every listing — including when a company only hires in specific countries or states (common for US-only or EU-only remote roles due to legal and tax reasons). This transparency saves you from applying to roles you're legally ineligible for. Filter by 'Worldwide' if you want truly location-agnostic roles — but be aware that even 'Worldwide' listings sometimes have timezone overlap requirements." },
  { question: "Should I use both Himalayas and Zari?", answer: "Yes — they're complementary and cover opposite ends of the process. Himalayas handles discovery (find the right remote companies with transparency about culture and salary). Zari handles conversion (win the application — tailored resume, async interview prep, full offer negotiation). Using only Himalayas means finding good listings and competing on equal footing with every other applicant. Using Zari on top of Himalayas means arriving to each application better prepared, with a more targeted resume, and ready to negotiate the remote-specific package components." },
];

export default async function ZariVsHimalayasPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Himalayas", url: `${BASE_URL}/compare/zari-vs-himalayas` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Remote Job Search</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Himalayas</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Himalayas curates remote-first job listings with salary transparency. Zari coaches your resume, interviews, and negotiation for those roles. Sequential, not competing.
          </p>
          <div className="mt-8 flex justify-center">
            <WinScore zariWins={4} total={7} competitorName="Himalayas" />
          </div>
        </div>
      </section>

      {/* Summary verdict */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Himalayas wins for</p>
              <ul className="space-y-1.5">
                {["High-quality remote-only job listings", "Best-in-class salary transparency", "Remote company culture research"].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[var(--ink)]"><span className="text-emerald-500 font-bold">✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Zari wins for</p>
              <ul className="space-y-1.5">
                {["ATS resume tailoring per listing", "Async-first interview preparation", "Remote package negotiation coaching", "LinkedIn visibility for remote recruiters"].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[var(--ink)]"><span className="text-[var(--brand)] font-bold">✓</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Task-by-task */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task comparison</h2>
          <div className="mt-6 space-y-5">
            {COMPARISON_TASKS.map((row) => (
              <div key={row.task} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.himalayas.score === "win" ? "text-emerald-600" : row.himalayas.score === "partial" ? "text-amber-500" : "text-red-500"}`}>
                      Himalayas — {row.himalayas.verdict}
                    </p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.himalayas.detail}</p>
                  </div>
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[var(--brand)]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>
                      Zari — {row.zari.verdict}
                    </p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on Himalayas? Let Zari win it for you.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste the listing and Zari tailors your resume, preps you for async-first interview questions, and coaches your negotiation — including home office stipends, equity, and location-adjusted pay.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
