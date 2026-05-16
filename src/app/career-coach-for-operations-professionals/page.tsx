import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Operations Professionals — Zari (2025)",
  description:
    "AI career coaching built for operations leaders, COOs, supply chain managers, and ops analysts. Resume optimization, interview prep, and LinkedIn coaching for ops careers.",
  keywords: ["career coach for operations professionals", "operations manager career coach", "supply chain career coach", "COO career coaching", "operations director job search", "operations resume help", "operations interview prep", "ops career coach"],
  alternates: { canonical: "/career-coach-for-operations-professionals" },
  openGraph: {
    title: "AI Career Coach for Operations Professionals — Zari (2025)",
    description: "Operations-specific AI career coaching: resume, LinkedIn, interview prep, and promotion strategy for ops leaders.",
    url: "/career-coach-for-operations-professionals",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How do operations professionals quantify their resume impact?", answer: "Operations impact is highly quantifiable but often undersold. Metrics that work: cost reduction percentages, cycle time improvements, throughput increases, headcount managed, vendor count, SLA compliance rates, and NPS for internal stakeholders. Zari's AI helps you identify the metrics in your experience that are most relevant to your target roles and turns vague responsibilities into specific, measurable achievements." },
  { question: "What interview questions should operations candidates expect?", answer: "Ops interviews heavily weight process design, stakeholder management, and systems thinking. Common behavioral questions: how you've scaled a process, how you've handled conflicting priorities across business units, how you've driven adoption of a new system or workflow, and how you've managed vendors or third-party relationships. Case questions in senior ops roles often involve trade-off analysis and resource allocation problems. Zari practices all of these with you." },
  { question: "How should an operations professional's LinkedIn look different from other roles?", answer: "Operations LinkedIn profiles should lead with scale and impact — the size of the operation you've run, not just your title. Recruiters searching for ops talent use keywords like 'process improvement,' 'operational efficiency,' 'P&L ownership,' 'cross-functional,' 'supply chain,' and specific tools (SAP, NetSuite, Salesforce, Lean/Six Sigma). Your headline should anchor on your seniority and domain — not just 'Operations Manager.'" },
  { question: "Is Zari useful for COO and VP of Operations roles?", answer: "Yes. Zari coaches senior ops leaders on executive-level positioning — how to frame strategic narrative, how to quantify organizational impact (not just tactical output), how to position for board-level conversations, and how to negotiate executive compensation packages including equity, LTIP, and non-standard benefits." },
];

const PAIN_POINTS = [
  { title: "Translating process work into resume impact", body: "Operations is inherently cross-functional — which makes it hard to claim specific wins. Zari helps you frame your contributions in terms that hiring managers care about: efficiency gains, cost avoidance, error rate reduction, and scale." },
  { title: "Standing out in a crowded field", body: "Ops roles attract a wide range of candidates. Strong ops leaders differentiate by leading with data — not just responsibilities. Zari teaches you to foreground your metrics and frame your most strategic contributions at the top." },
  { title: "Making the leap to VP or COO", body: "The gap between Director and VP in operations is less about technical skills and more about narrative. Can you articulate how you've driven strategy, not just execution? Zari helps senior ops professionals make this case compellingly." },
  { title: "Industry transitions in operations", body: "Operations skills are highly portable — but interviewers at companies in different verticals (tech vs. manufacturing vs. retail) want to hear it framed in their language. Zari helps you translate your experience for each industry without losing your core narrative." },
];

const MODULES = [
  { name: "Operations Resume Audit", desc: "AI analysis of your resume against ops-specific job descriptions. Identify missing keywords, weak bullets, and structural issues that cost you interviews." },
  { name: "Impact Quantification Workshop", desc: "Zari's AI helps you extract and frame specific metrics from your experience — even for work that feels hard to measure." },
  { name: "Behavioral Interview Coach", desc: "Practice process design, stakeholder management, and systems thinking questions with real-time feedback on your STAR structure and specificity." },
  { name: "LinkedIn for Ops Leaders", desc: "Headline, About section, and experience rewrites optimized for how recruiters actually search for operations talent." },
  { name: "Executive Positioning (VP/COO)", desc: "Senior ops coaching: strategic narrative, board-ready communication, and executive compensation negotiation." },
];

export default async function CareerCoachOperationsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach for Operations Professionals", url: `${BASE_URL}/career-coach-for-operations-professionals` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Built for Operations Leaders
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
            AI Career Coach for<br /><span className="gradient-text-animated">Operations Professionals</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            Operations careers are built on systems, scale, and measurable impact — but most resumes and LinkedIn profiles for ops leaders bury the lead. Zari&apos;s AI coaching helps you surface what you&apos;ve actually built and get in front of the roles that match your experience.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start free coaching <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/ai-career-coach" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-7 text-[14px] font-semibold text-white/70 transition-all hover:border-white/30 hover:text-white">
              See how Zari works
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Where operations job searches stall</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The challenges ops professionals face in job searches are specific — and fixable.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PAIN_POINTS.map((pt) => (
              <div key={pt.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <p className="mb-3 font-bold text-[var(--ink)]">{pt.title}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{pt.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Zari covers */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Zari covers for ops careers</h2>
          <div className="mt-10 space-y-4">
            {MODULES.map((mod, i) => (
              <div key={mod.name} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</div>
                <div>
                  <p className="mb-1 font-bold text-[var(--ink)]">{mod.name}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seniority breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Coaching by career level</h2>
          <div className="mt-8 space-y-4">
            {[
              { level: "Ops Analyst / Associate", focus: "Building a results-focused resume from early-career experience. Demonstrating analytical rigor and process thinking. Preparing for case-style and behavioral interviews." },
              { level: "Operations Manager", focus: "Leading with team size, budget ownership, and specific efficiency gains. Positioning for senior individual contributor or first management roles at larger organizations." },
              { level: "Senior Manager / Director", focus: "Framing cross-functional leadership, systems-level thinking, and org design experience. Building a narrative for VP-track opportunities." },
              { level: "VP of Operations / COO", focus: "Executive positioning, board-ready communication, P&L narrative, and full compensation negotiation including equity, bonuses, and executive benefits." },
            ].map((item) => (
              <div key={item.level} className="flex gap-4 rounded-xl border border-[var(--border)] p-5">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                </div>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.level}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Operations career coaching FAQs</h2>
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

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Get your operations career coaching started</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume, LinkedIn, interview prep, and executive positioning — AI coaching built for ops professionals at every level.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
