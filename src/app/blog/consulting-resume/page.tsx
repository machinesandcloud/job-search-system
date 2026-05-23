import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Consulting Resume — MBB, Big 4 & Independent Consultant Examples (2025)",
  description:
    "Consulting resumes at McKinsey, BCG, Bain, and Big 4 are evaluated against a different standard than corporate resumes. What the resume reader is actually looking for, how bullet structure differs, GPA rules, and before/after examples for analyst, consultant, and senior consultant levels.",
  keywords: ["consulting resume", "McKinsey resume", "BCG resume", "Bain resume", "Big 4 consulting resume", "management consulting resume", "MBB resume 2025", "consulting resume examples", "consulting analyst resume"],
  alternates: { canonical: "/blog/consulting-resume" },
  openGraph: {
    title: "Consulting Resume — MBB, Big 4 & Independent Consultant Examples (2025)",
    description: "MBB consulting resumes follow a different standard than corporate resumes. What the reader looks for, how bullet structure differs, GPA rules, and before/after examples.",
    url: "/blog/consulting-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Should I include my GPA on a consulting resume?",
    answer: "Yes — if it's above 3.5 (ideally 3.7+ for MBB). Consulting firms, especially MBB and top-tier strategy boutiques, use GPA as an initial filter in recruiting cycles, particularly for pre-MBA and MBA associate roles. If your overall GPA isn't strong but your major GPA is, list the major GPA and label it clearly. If your GPA is below 3.5, omit it from the resume — it won't be asked for unless a form requires it. After 3–5 years of consulting experience, GPA becomes irrelevant.",
  },
  {
    question: "How long should a consulting resume be?",
    answer: "One page for analyst, associate, and consultant-level roles — this is a hard convention at MBB and most Big 4 and strategy boutiques, regardless of experience. Engagement managers and senior consultants with 6+ years can use two pages, but only if the second page is adding genuine signal (client list, significant project scope, thought leadership). Most consulting applicants with 3–5 years are still on one page.",
  },
  {
    question: "Do I need consulting experience to break into consulting?",
    answer: "No, but you need signals that predict consulting success: structured problem-solving, quantified impact, client or stakeholder management, and the ability to synthesize complex information. Industry backgrounds that translate well: investment banking (analytical rigor, deal pressure), product management (stakeholder management, structured communication), engineering (technical credibility for tech consulting), and military (leadership, operating under uncertainty). Your resume needs to surface the consulting-relevant signals from whatever background you have.",
  },
  {
    question: "What's the cover letter situation at consulting firms?",
    answer: "MBB's application processes vary: McKinsey typically doesn't require a cover letter for campus recruiting but does for some experienced hire applications; BCG and Bain use cover letters for some recruiting cycles. Big 4 advisory (Deloitte, PwC, EY, KPMG) generally requires cover letters. When required, a consulting cover letter should lead with why you want to be a consultant (not just why you want to be at that firm), demonstrate structured thinking, and be one page maximum.",
  },
];

export default async function ConsultingResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Consulting Resume — MBB, Big 4 & Independent Consultant Examples (2025)"
        description="What consulting resume readers look for, how bullet structure differs from corporate resumes, and before/after examples by consulting level."
        url={`${BASE_URL}/blog/consulting-resume`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Consulting Resume", url: `${BASE_URL}/blog/consulting-resume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">Consulting Resume</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">MBB and Big 4 consulting resumes are evaluated against a different standard. What the reader is actually looking for, how bullet structure differs, and before/after examples for analyst through senior consultant levels.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>11 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">How consulting resumes differ from corporate resumes</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The consulting resume has a distinct set of conventions that have persisted for decades. Understanding them isn&apos;t optional — breaking them signals unfamiliarity with the culture.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Corporate resume conventions</p>
                <ul className="space-y-2 text-[13.5px] leading-6 text-[var(--muted)]">
                  <li>→ Summary section at the top</li>
                  <li>→ Skills section prominent</li>
                  <li>→ Task-based bullets acceptable</li>
                  <li>→ 1–2 pages standard for experienced</li>
                  <li>→ GPA optional after first job</li>
                  <li>→ Formatted to pass ATS</li>
                </ul>
              </div>
              <div className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]">Consulting resume conventions</p>
                <ul className="space-y-2 text-[13.5px] leading-6 text-[var(--muted)]">
                  <li>→ No summary section (experience leads)</li>
                  <li>→ Skills section minimal or absent</li>
                  <li>→ Every bullet must show impact</li>
                  <li>→ One page is almost always required</li>
                  <li>→ GPA included if 3.5+</li>
                  <li>→ Human-read first (often no ATS)</li>
                </ul>
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/40 p-5">
              <p className="text-[14px] leading-7 text-[var(--ink)]">
                <span className="font-bold">The core consulting resume test:</span> A consulting resume reader — often an analyst or consultant who has 20 minutes to review 50 applications — is asking one question about every bullet: &quot;Does this person think like a consultant?&quot; That means: Did they frame the problem? Did they bring structure? Did they drive a measurable outcome? Bullets that pass the test demonstrate analytical rigor and client impact. Bullets that fail describe tasks.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The consulting bullet formula</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Most consulting firms teach their analysts a bullet structure in the first week on the job. It&apos;s the same structure they want to see on the resume of the person they&apos;re hiring:
            </p>
            <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="font-semibold text-[var(--ink)] mb-2">The formula</p>
              <p className="text-[15px] leading-7 text-[var(--ink)]">
                <span className="font-bold text-[#4361EE]">[Action verb]</span> + <span className="font-bold text-[#4361EE]">[what you did / analysis you ran / problem you solved]</span> + <span className="font-bold text-[#4361EE]">[quantified outcome or business impact]</span>
              </p>
              <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">The action verb should be specific to consulting work: Developed, Analyzed, Built, Designed, Led, Presented, Synthesized, Identified, Structured, Recommended. &quot;Helped&quot; and &quot;Assisted&quot; signal a supporting role — avoid them unless accurate.</p>
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Before and after: by consulting level</h2>
            <div className="mt-6 space-y-6">
              {[
                {
                  level: "Undergraduate Analyst / Business Analyst",
                  color: "#0D7182",
                  before: "Worked on a team that helped a client improve their supply chain.",
                  after: "Analyzed 18 months of procurement data for a $2.4B retail client to identify sourcing inefficiencies — built a spend analysis model in Excel that surfaced $34M in consolidation opportunities across 6 categories; findings presented to CPO and incorporated into 3-year sourcing strategy.",
                  insight: "Analyst bullets need to show the analytical work you specifically did (built the model, ran the analysis) — not just the team outcome. Quantify the client's revenue, the dollar impact, and the deliverable your work fed into.",
                },
                {
                  level: "Associate / MBA Consultant",
                  color: "#7C3AED",
                  before: "Led a workstream on a cost reduction project for a healthcare client.",
                  after: "Led the cost structure workstream for a 12-week operational turnaround at a 3-hospital regional health system — synthesized findings from 40 stakeholder interviews and 3 years of operational data to identify $28M in sustainable cost reduction opportunities; structured and delivered the board-level recommendation that the CEO used to approve an 18-month transformation program.",
                  insight: "Associate bullets need to show workstream leadership (not just participation), the analytical depth (interviews + data), the size of the recommendation, and the decision your work drove. 'Led to the approval of a transformation program' is the business outcome — that's what makes it a consulting-level bullet.",
                },
                {
                  level: "Engagement Manager / Senior Consultant",
                  color: "#F97316",
                  before: "Managed client relationships and oversaw project delivery.",
                  after: "Managed a 6-consultant team on a go-to-market strategy engagement for a $800M industrial manufacturer entering North American distribution — structured workplan, managed 3 client stakeholders (C-suite to division director), and delivered a market entry recommendation that the client board approved and funded ($45M investment); engagement extended to implementation phase.",
                  insight: "EM/senior bullets need to show team management, client relationship ownership (the levels you were managing), the decision outcome, and scope extension — which is the consulting proxy for client satisfaction. 'Engagement extended to implementation' tells the reader the client trusted the firm enough to continue.",
                },
                {
                  level: "Independent Consultant / Fractional",
                  color: "#059669",
                  before: "Provided strategic consulting services to clients across industries.",
                  after: "Built and operated an independent strategy advisory practice serving mid-market PE-backed companies ($50M–$300M revenue) — completed 14 engagements over 3 years across commercial due diligence, post-merger integration, and go-to-market strategy; 9 of 14 clients extended beyond initial scope, and 3 resulted in retained advisory relationships.",
                  insight: "Independent consultant resumes need the same rigor as firm resumes. Quantify clients served, deal size, engagement scope, and the business equivalent of firm metrics — repeat engagements and retained relationships are the independent consultant's version of 'client satisfaction.'",
                },
              ].map(item => (
                <div key={item.level} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4" style={{ borderLeft: `4px solid ${item.color}` }}>
                    <h3 className="font-bold text-[var(--ink)]">{item.level}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-red-400">Before</p>
                      <div className="rounded-lg border border-red-100 bg-red-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)]">&ldquo;{item.before}&rdquo;</div>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-500">After</p>
                      <div className="rounded-lg border border-emerald-100 bg-emerald-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)]">&ldquo;{item.after}&rdquo;</div>
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Why it works: </span>{item.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Resume structure for consulting applications</h2>
            <div className="mt-5 space-y-3">
              {[
                { section: "Education", note: "Lead with education if you're pre-MBA or within 2 years of graduation. Include GPA if 3.5+, school name, degree, graduation year, and any honors. For MBB campus recruiting, your school tier and GPA are the primary filters — this section matters more than at any other employer type." },
                { section: "Experience", note: "Reverse chronological. 3–4 bullets per role max (on a one-page resume, more bullets mean less impact per bullet). Every bullet must have a quantified outcome. Lead bullets with the most impressive ones — consultants read top-down and may not get to bullet 4." },
                { section: "Leadership & Activities", note: "For campus hires: leadership roles in student organizations, case competitions (especially wins at national case comps), and relevant extracurriculars. This section signals that you're the type of person who leads, not follows — which is a consulting culture signal." },
                { section: "Skills", note: "Keep minimal. List language proficiency (consulting firms value multilingual candidates for international project staffing), advanced Excel/PowerPoint/Tableau, and any niche analytical skills. Don't list 'Microsoft Office' — it's assumed." },
              ].map(item => (
                <div key={item.section} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)]">{item.section}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Common questions</h2>
            <div className="mt-4 space-y-4">
              {FAQS.map(faq => (
                <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Get your consulting resume reviewed and rewritten</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari evaluates your consulting resume against the standards at your target firms — flags bullets that fail the impact test, rewrites them to the consulting formula, and helps you structure the case competition prep that opens doors at MBB and Big 4.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Optimize my consulting resume →
            </Link>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
