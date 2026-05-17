import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Careerflow — AI Career Coach vs Job Tracker (2025)",
  description:
    "Careerflow tracks your job applications and scores your LinkedIn profile. Zari coaches your resume, interviews, LinkedIn, and salary negotiation. Different tools — here's when you need each and when Zari replaces both.",
  keywords: ["Zari vs Careerflow", "Careerflow alternative", "Careerflow review", "job tracker vs career coach", "best job search tools 2025", "Careerflow LinkedIn optimizer"],
  alternates: { canonical: "/compare/zari-vs-careerflow" },
  openGraph: {
    title: "Zari vs Careerflow — AI Career Coach vs Job Tracker (2025)",
    description: "Careerflow tracks applications and scores LinkedIn profiles. Zari coaches your candidacy. Here's what each does well.",
    url: "/compare/zari-vs-careerflow",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What is Careerflow used for?",
    answer: "Careerflow is a Chrome extension primarily used for tracking job applications across LinkedIn, Indeed, and other job boards. It saves job postings into a visual Kanban pipeline (Saved → Applied → Interview → Offer), scores your LinkedIn profile, and provides InMail templates for recruiter outreach. It also has a basic ATS resume checker. It's strongest as an organizational layer on top of a job search.",
  },
  {
    question: "Does Careerflow do interview coaching?",
    answer: "No. Careerflow's feature set is focused on pre-application activities — tracking, profiling, and document organization. It doesn't offer mock interviews, STAR framework coaching, or any post-application coaching. If you're getting interviews but struggling to convert them to offers, Careerflow can't help with that. Zari covers the full funnel from application to offer.",
  },
  {
    question: "Can I use Careerflow and Zari together?",
    answer: "Yes — they're genuinely complementary. Careerflow handles the organizational layer (tracking which roles you've applied to, where you are in each process) while Zari handles the coaching layer (making your applications stronger, preparing you for interviews, optimizing your LinkedIn, negotiating offers). Many active job seekers use both simultaneously.",
  },
  {
    question: "Is Careerflow's LinkedIn scorer accurate?",
    answer: "Careerflow's LinkedIn score gives you a fast sense of obvious gaps — missing sections, thin headlines, low connection counts. It's useful for a quick audit. Zari's LinkedIn coaching goes deeper: it rewrites your actual headline, About section, and experience bullets using the keyword patterns that LinkedIn's algorithm surfaces in recruiter searches. A score tells you there's a problem; coaching tells you what to write instead.",
  },
];

const FEATURE_COMPARISON = [
  {
    feature: "Job application tracking",
    careerflow: { has: true, detail: "Chrome extension saves jobs from LinkedIn, Indeed, and other boards. Kanban-style pipeline (Saved → Applied → Interview → Offer). One of Careerflow's genuine strengths." },
    zari: { has: false, detail: "Zari doesn't track applications — it focuses on coaching the activities that make applications succeed. For pipeline management, Careerflow or a spreadsheet works fine alongside Zari." },
    winner: "Careerflow",
  },
  {
    feature: "LinkedIn profile scoring",
    careerflow: { has: true, detail: "Chrome extension scans your LinkedIn profile and gives a score with improvement suggestions. Fast way to identify obvious gaps." },
    zari: { has: true, detail: "Full LinkedIn profile coaching — headline formula, About section rewriting, experience bullet optimization, keyword strategy for recruiter search. Goes well beyond a score." },
    winner: "Zari",
    winnerNote: "A score tells you there's a problem. Coaching tells you exactly what to write instead.",
  },
  {
    feature: "Resume optimization",
    careerflow: { has: true, detail: "Basic ATS resume checker — flags common formatting issues and missing keywords. Useful for a quick scan." },
    zari: { has: true, detail: "Full ATS scoring against the specific job description you're targeting, with section-level keyword gap analysis, bullet rewriting, and impact framing coaching." },
    winner: "Zari",
    winnerNote: "Job-description-specific ATS analysis produces meaningfully better outcomes than generic resume scoring.",
  },
  {
    feature: "Interview coaching",
    careerflow: { has: false, detail: "Not offered. Careerflow's focus is pre-application — tracking, profiling, and document optimization." },
    zari: { has: true, detail: "Full STAR framework coaching with question-by-question feedback. Role-specific behavioral prep tuned to the type of interview you're facing." },
    winner: "Zari",
  },
  {
    feature: "Salary negotiation",
    careerflow: { has: false, detail: "Not offered." },
    zari: { has: true, detail: "Coaching on the negotiation conversation — scripts, handling pushback, evaluating comp structures, and knowing your market range." },
    winner: "Zari",
  },
  {
    feature: "Networking and outreach",
    careerflow: { has: true, detail: "LinkedIn InMail templates for recruiter and hiring manager outreach. Pre-written templates you can send directly from the extension." },
    zari: { has: true, detail: "Coaching on outreach strategy and message personalization — how to write a cold message that sounds like you, not a template." },
    winner: "Depends",
    winnerNote: "Careerflow's templates are faster. Zari's coaching produces messages more likely to get a response.",
  },
  {
    feature: "Price",
    careerflow: { has: true, detail: "Free tier with limited features. Pro plan at approximately $19/month for full access." },
    zari: { has: true, detail: "Free to start — no credit card. Coaching sessions begin without a paywall." },
    winner: "Zari",
  },
];

export default async function ZariVsCareerflowPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Careerflow", url: `${BASE_URL}/compare/zari-vs-careerflow` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE]" /> Side-by-Side Comparison
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em]">Zari vs Careerflow</h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/55">
            Careerflow is a job-tracking and LinkedIn-scoring Chrome extension. Zari is an AI career coach. They solve different parts of the job search — here&apos;s where each one actually wins.
          </p>
        </div>
      </section>

      {/* What each does */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">What Careerflow is</p>
              <p className="text-[15px] font-bold text-[var(--ink)]">A job tracker with LinkedIn scoring</p>
              <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">Careerflow&apos;s Chrome extension saves job postings from LinkedIn and other boards into a visual pipeline, scores your LinkedIn profile, provides InMail templates for recruiter outreach, and does basic ATS resume checking. It&apos;s strongest as an organizational layer on top of your job search — keeping track of where you are in each process.</p>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">What Zari is</p>
              <p className="text-[15px] font-bold text-[var(--ink)]">An AI career coaching platform</p>
              <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">Zari coaches resume writing with ATS scoring against specific job descriptions, interview preparation with STAR framework evaluation, full LinkedIn profile optimization, and salary negotiation. It has session memory and adapts to your specific search context. Zari doesn&apos;t track applications — it coaches the activities that make applications succeed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature breakdown</h2>
          <div className="mt-8 space-y-4">
            {FEATURE_COMPARISON.map((row) => (
              <div key={row.feature} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                  <p className="font-bold text-[var(--ink)]">{row.feature}</p>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${row.winner === "Zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : row.winner === "Careerflow" ? "bg-gray-100 text-gray-700" : "bg-amber-50 text-amber-700"}`}>{row.winner === "Depends" ? "Context-dependent" : `${row.winner} wins`}</span>
                </div>
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-[var(--border)] p-5 sm:border-b-0 sm:border-r">
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Careerflow</p>
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${row.careerflow.has ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{row.careerflow.has ? "✓" : "—"}</span>
                    </div>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{row.careerflow.detail}</p>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${row.zari.has ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-gray-100 text-gray-500"}`}>{row.zari.has ? "✓" : "—"}</span>
                    </div>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                    {row.winnerNote && <p className="mt-2 text-[12px] italic text-[var(--brand)]">{row.winnerNote}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Honest verdict</p>
            <p className="text-[17px] font-bold text-[var(--ink)]">Complementary tools — but Zari covers the parts that matter more</p>
            <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">Careerflow&apos;s job tracker is genuinely useful for organized job seekers applying to many roles. If you want a visual pipeline and LinkedIn profile score, Careerflow delivers that efficiently.</p>
            <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">But tracking your applications doesn&apos;t make your applications succeed. The coaching activities that actually improve your outcomes — resume targeting, interview preparation, LinkedIn depth optimization, salary negotiation — are where Zari operates and Careerflow doesn&apos;t.</p>
            <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">Most active job seekers who use both find Careerflow handles the organizational layer while Zari handles the coaching layer. If you can only use one: Zari covers more of what moves the needle on outcomes.</p>
            <div className="mt-6">
              <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
                Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.5rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
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
    </PageFrame>
  );
}
