import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Business Analyst Resume — Examples, Skills & ATS Keywords (2025)",
  description:
    "Business analyst resumes that get callbacks show requirements impact, stakeholder outcomes, and process improvement in numbers — not just a list of tools and methodologies. Before/after examples with ATS keyword breakdown.",
  keywords: ["business analyst resume", "business analyst resume examples", "BA resume 2025", "business analyst resume keywords", "business analyst skills resume", "entry level business analyst resume", "senior business analyst resume"],
  alternates: { canonical: "/blog/business-analyst-resume" },
  openGraph: {
    title: "Business Analyst Resume — Examples, Skills & ATS Keywords (2025)",
    description: "Business analyst resumes that show requirements impact and stakeholder outcomes — not just methodology lists.",
    url: "/blog/business-analyst-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const HIRING_SIGNALS = [
  { signal: "Business impact of requirements — not just documentation", detail: "The most common BA resume mistake is describing deliverables: 'wrote BRDs, FRDs, use cases, and user stories.' Hiring managers already know BAs do this. They want to see what happened: 'Defined requirements for payment processing redesign — feature shipped on time and reduced checkout abandonment by 18%.' Connect every requirements deliverable to its downstream business outcome." },
  { signal: "Stakeholder influence, not just facilitation", detail: "Senior BAs are expected to influence stakeholders, not just document their requirements. Your resume should show cases where you reframed a problem, challenged a scope request, prioritized among competing stakeholders, or drove alignment in a contested meeting. 'Facilitated stakeholder workshops' is table stakes. 'Resolved 6-week scope impasse between Sales and Engineering by reframing the requirement around shared business outcome' is a senior signal." },
  { signal: "Process improvement with quantification", detail: "Process analysis work needs numbers: 'Identified 3 manual steps in the vendor onboarding process through value stream mapping — automation reduced cycle time from 14 days to 2 and freed 120 hours/month of analyst capacity.' Without quantification, process improvement bullets are indistinguishable between a BA who automated a 10-step workflow and one who optimized a 3-step form." },
  { signal: "Data and analytical depth", detail: "Modern BA roles increasingly require SQL, data visualization, or analytics skills. Resume language that shows data fluency — 'queried SQL data warehouse to validate reported customer churn against CRM records' or 'built Power BI dashboard tracking requirements traceability across 4 sprint teams' — signals that you don't hand work off to data analysts for every analysis question." },
];

const BEFORE_AFTER = [
  {
    level: "Entry-Level Business Analyst",
    before: { bullet: "Gathered requirements from stakeholders and documented them in user stories and process flows", problems: ["Output only — no outcome", "'Gathered requirements' is expected, not impressive", "No scale, team context, or impact"] },
    after: { bullet: "Elicited and documented requirements for customer portal redesign (12 stakeholders, 8 user story epics) — delivered on 6-week timeline; portal launch reduced support ticket volume by 23% in first quarter", improvements: ["Scope quantified (12 stakeholders, 8 epics)", "Timeline accountability shown", "Business outcome: 23% support ticket reduction"] },
  },
  {
    level: "Senior Business Analyst",
    before: { bullet: "Led requirements gathering for multiple enterprise projects and mentored junior BAs", problems: ["'Multiple projects' — no scale or domain context", "'Mentored junior BAs' — what changed as a result?", "Zero quantification"] },
    after: { bullet: "Led requirements definition for $4M ERP migration (35 stakeholders across 6 departments) — resolved 4 high-severity scope conflicts through facilitated trade-off workshops; project delivered on schedule with 94% user adoption at go-live; developed BA onboarding program now used to ramp 3 analysts per quarter", improvements: ["Financial scale of project named", "Conflict resolution shown (4 high-severity)", "Mentorship had quantified outcome: 3 analysts/quarter"] },
  },
];

const ATS_KEYWORDS = [
  { tier: "Core BA Skills", keywords: ["requirements gathering", "business requirements document (BRD)", "functional requirements", "user stories", "use cases", "process mapping", "gap analysis", "stakeholder management"] },
  { tier: "Process & Methodology", keywords: ["Agile", "Scrum", "Waterfall", "BPMN", "value stream mapping", "root cause analysis", "change management", "UAT"] },
  { tier: "Data & Analytics", keywords: ["SQL", "Power BI", "Tableau", "Excel", "data analysis", "data modeling", "reporting", "KPI tracking"] },
  { tier: "Tools", keywords: ["Jira", "Confluence", "Visio", "Lucidchart", "Salesforce", "SAP", "ServiceNow", "Miro"] },
];

const FAQS = [
  { question: "How is a business analyst resume different from a project manager resume?", answer: "The focus differs: BA resumes center on requirements quality, problem discovery, and solution definition — the 'what should be built' side. PM resumes center on delivery, timeline, resources, and stakeholder management — the 'when and how it gets built' side. Senior BAs and PMs have significant overlap, so tailor toward the job description's emphasis. If the JD leads with requirements gathering and process analysis, write a BA-leaning resume. If it leads with delivery accountability and resource management, write a PM-leaning one." },
  { question: "Should a BA resume include technical skills like SQL or Python?", answer: "Yes — particularly SQL. Modern BA roles increasingly expect data self-sufficiency: querying databases to validate data, building dashboards to track KPIs, and using Excel or Power BI beyond pivot tables. SQL specifically is mentioned in a growing percentage of BA job descriptions. Python is a bonus for BAs working in data-heavy environments (financial services, analytics platforms). Don't list a technical skill you can't demonstrate in an interview — but if you have it, list it explicitly." },
  { question: "What certifications are worth listing on a BA resume?", answer: "CBAP (Certified Business Analysis Professional) is the most recognized senior-level credential — list it if you have it. ECBA and CCBA are entry and mid-level IIBA credentials worth listing early in your career. CSPO or PSM certifications are worth including for BA roles on Agile teams. PMI-PBA is valuable if you're in a crossover BA/PM role. Six Sigma (Green or Black Belt) is worth listing if the role involves significant process improvement. Avoid listing every certification you have — prioritize the 2-3 most relevant to the specific role." },
];

export default async function BusinessAnalystResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Business Analyst Resume — Examples, Skills & ATS Keywords (2025)" description="Business analyst resumes that show requirements impact and stakeholder outcomes — not just methodology lists." url={`${BASE_URL}/blog/business-analyst-resume`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Business Analyst Resume", url: `${BASE_URL}/blog/business-analyst-resume` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Business Analysis</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Business Analyst Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">Business impact, stakeholder influence, and process improvement in numbers — what BA hiring managers scan for, with before/after examples at every level.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={4} label="Key signals BA hiring managers look for beyond methodology lists" accent="#0D7182" />
            <StatCard value={71} suffix="%" label="Of BA resumes describe deliverables without business outcomes — the main screen-out" accent="#DC2626" />
            <StatCard value={4} label="ATS keyword tiers that appear most in BA job postings" accent="#7C3AED" />
            <StatCard value={2} suffix="x" label="Higher interview rate for BA resumes that quantify process improvement impact" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What BA hiring managers look for</h2>
          <div className="mt-6 space-y-4">
            {HIRING_SIGNALS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[13px] font-bold text-[#4361EE]">{i + 1}</span>
                <div><p className="font-bold text-[var(--ink)]">{item.signal}</p><p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after resume bullets</h2>
          <div className="mt-6 space-y-6">
            {BEFORE_AFTER.map((item) => (
              <div key={item.level} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3"><p className="font-bold text-[#4361EE]">{item.level}</p></div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5 bg-red-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-3">Before</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] mb-3 font-mono bg-white border border-red-100 rounded-lg p-3">{item.before.bullet}</p>
                    <ul className="space-y-1">{item.before.problems.map((p) => <li key={p} className="flex gap-2 text-[12px] text-red-600"><span>✗</span>{p}</li>)}</ul>
                  </div>
                  <div className="p-5 bg-emerald-50/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-3">After</p>
                    <p className="text-[13px] leading-6 text-[var(--ink)] mb-3 font-mono bg-white border border-emerald-100 rounded-lg p-3">{item.after.bullet}</p>
                    <ul className="space-y-1">{item.after.improvements.map((imp) => <li key={imp} className="flex gap-2 text-[12px] text-emerald-700"><span>✓</span>{imp}</li>)}</ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords for business analyst roles</h2>
          <div className="mt-6 space-y-3">
            {ATS_KEYWORDS.map((tier) => (
              <div key={tier.tier} className="rounded-xl border border-[var(--border)] p-4">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]">{tier.tier}</p>
                <div className="flex flex-wrap gap-1.5">{tier.keywords.map((kw) => <span key={kw} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-[12px] font-medium text-[var(--ink)]">{kw}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your BA resume rewritten by Zari.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste your resume and a target job description — Zari rewrites your bullets to show requirements impact and stakeholder outcomes, and surfaces the ATS keywords your target companies scan for.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
