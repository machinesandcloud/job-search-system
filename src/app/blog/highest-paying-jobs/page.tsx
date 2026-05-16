import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Highest Paying Jobs in 2025 — Salaries, Education & How to Get There",
  description:
    "The highest-paying careers in 2025 with median salaries, what drives the pay, education requirements, and growth outlook — across tech, healthcare, finance, law, and engineering.",
  keywords: ["highest paying jobs", "highest paying careers", "best paying jobs 2025", "high salary careers", "highest paying jobs without degree", "top paying professions", "highest paying careers 2025"],
  alternates: { canonical: "/blog/highest-paying-jobs" },
  openGraph: {
    title: "Highest Paying Jobs in 2025 — Salaries, Education & How to Get There",
    description: "Median salaries, what drives the pay, education requirements, and growth outlook for the highest-paying careers in 2025.",
    url: "/blog/highest-paying-jobs",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const CAREERS = [
  {
    sector: "Technology",
    accent: "#7C3AED",
    jobs: [
      {
        title: "Machine Learning Engineer",
        medianTotalComp: "$220,000–$380,000",
        whyItPaysThisMuch: "ML engineers sit at the intersection of statistical modeling and production engineering — a combination that's rarer than either skill alone. The supply of people who can build reliable ML systems at scale remains far below demand at virtually every technology company.",
        education: "BS in CS or related field; MS or PhD accelerates entry significantly. Strong portfolio of ML projects can substitute for advanced degrees at some companies.",
        outlook: "Strong through at least 2027. Every sector is investing in AI/ML infrastructure — the demand is broad-based, not concentrated in a single industry.",
        getThereWith: "Strong Python, experience with ML frameworks (PyTorch, TensorFlow), system design for ML pipelines, and a portfolio of deployed models. The interview has a data structures and algorithms component plus ML-specific questions.",
      },
      {
        title: "Staff / Principal Software Engineer",
        medianTotalComp: "$280,000–$600,000+",
        whyItPaysThisMuch: "At the staff and principal level, engineers are compensated for organizational leverage — their decisions affect tens or hundreds of other engineers' output. The multiplier effect on the organization makes this level dramatically more valuable per individual than senior engineer.",
        education: "BS in CS or equivalent. Strong portfolio and demonstrated technical leadership matter more than graduate degrees at this level.",
        outlook: "Steady demand for senior engineers, though the path to staff+ is increasingly competitive. Companies have reduced mid-level hiring while maintaining demand at senior levels.",
        getThereWith: "Progression from senior engineer through demonstrated technical leadership, cross-functional impact, and system-level thinking. External paths exist — some engineers hire into staff-level roles — but most paths run through internal promotion.",
      },
      {
        title: "Engineering Manager (senior)",
        medianTotalComp: "$220,000–$400,000",
        whyItPaysThisMuch: "Senior engineering managers own team output, recruiting quality, and technical direction simultaneously. The combination of technical credibility and organizational leadership is harder to develop than either skill alone.",
        education: "BS in CS strongly preferred. MBA less common in tech management than in finance/consulting.",
        outlook: "Consolidation has reduced EM headcount at some large tech companies but demand remains solid at high-growth companies and startups.",
        getThereWith: "Usually earned through internal promotion from tech lead or senior engineer. Coaching on the transition into management — navigating the shift from individual contributor to organizational leader — is where most engineers struggle.",
      },
    ],
  },
  {
    sector: "Healthcare",
    accent: "#DC2626",
    jobs: [
      {
        title: "Physician (specialist)",
        medianTotalComp: "$300,000–$700,000+",
        whyItPaysThisMuch: "Specialist physicians face 8–15 years of post-undergraduate training before practicing independently. The combination of training length, liability exposure, and scarcity of specialists in many markets drives compensation. Surgical subspecialties command the highest pay.",
        education: "MD or DO (4 years) + residency (3–7 years) + fellowship (1–3 years) for many specialties. 11–14 years post-undergrad minimum for most specialists.",
        outlook: "Strong through 2030+. Physician shortages are projected to worsen as the population ages, particularly in primary care and certain specialties.",
        getThereWith: "Training length is fixed. For physicians seeking non-clinical paths — pharma, health tech, hospital administration — Zari coaches the CV-to-resume transformation and the positioning narrative for industry roles.",
      },
      {
        title: "Nurse Anesthetist (CRNA)",
        medianTotalComp: "$180,000–$240,000",
        whyItPaysThisMuch: "CRNAs practice independently in most states and fill a critical role in surgical and procedural settings. The education-to-income ratio is the best of any healthcare profession — the training takes 2–3 years post-BSN compared to anesthesiologists who spend 12+ years.",
        education: "BSN → RN experience (minimum 1–2 years, competitive programs prefer 3–5 in ICU/critical care) → DNAP or MSNA program (28–36 months).",
        outlook: "Excellent. CRNA shortages are acute in rural and underserved markets, and CRNA scope of practice continues to expand.",
        getThereWith: "The bottleneck is clinical experience before program admission. Most competitive CRNA program applicants have 3+ years ICU experience with strong CCRN credentials.",
      },
      {
        title: "Pharmacist",
        medianTotalComp: "$125,000–$175,000",
        whyItPaysThisMuch: "PharmD is a 4-year professional degree with high licensing requirements and specific technical expertise. Clinical pharmacists in hospital systems and specialty pharmacy command the highest pay; retail pharmacist wages have compressed over the past decade.",
        education: "PharmD (4 years) + residency (1–2 years) for clinical roles. Residency is effectively required for hospital and clinical pharmacy positions.",
        outlook: "Stable. Retail pharmacy has contracted but clinical pharmacy, specialty pharmacy, and pharmaceutical industry roles remain in demand.",
        getThereWith: "For pharmacists considering transitions into pharma industry (medical affairs, drug safety, clinical research), Zari coaches the transition narrative and industry positioning.",
      },
    ],
  },
  {
    sector: "Finance",
    accent: "#D97706",
    jobs: [
      {
        title: "Investment Banker (VP and above)",
        medianTotalComp: "$350,000–$800,000+",
        whyItPaysThisMuch: "Investment banking compensation is driven by deal fees — when transactions close, banks earn significant percentages of transaction value. VPs and above share meaningfully in deal economics. The compensation is also a retention mechanism against buyside exits.",
        education: "BS from target school → analyst program → MBA (for most VP-track paths). Some direct associate hiring from MBA programs at top schools.",
        outlook: "Deal volume is cyclical. 2023–2024 saw a slowdown; recovery is underway as interest rates stabilize. Long-term demand for M&A, debt, and equity advisory is structural.",
        getThereWith: "The investment banking interview is one of the most structured in finance — technical questions (LBO modeling, DCF, comparable company analysis) plus behavioral. Zari coaches the behavioral component; technical skills require separate financial modeling preparation.",
      },
      {
        title: "Quantitative Researcher / Quant Trader",
        medianTotalComp: "$300,000–$1,000,000+",
        whyItPaysThisMuch: "Quantitative finance is a market for talent with rare combinations of advanced mathematics, programming, and financial intuition. Top hedge funds and prop trading firms pay exceptionally to attract the PhDs and researchers who generate alpha.",
        education: "PhD in mathematics, statistics, physics, or CS is effectively required for top quant research roles. BS/MS in CS with strong math background can enter quant development.",
        outlook: "Highly competitive but well-compensated. The number of top-tier quant roles is limited; the talent competition is with academic research and big tech.",
        getThereWith: "Quant interviews are uniquely technical — probability puzzles, mathematical derivations, coding challenges. Industry transition from academia is where many quantitative researchers underestimate how different the application and interview process is.",
      },
      {
        title: "Chief Financial Officer (mid-market)",
        medianTotalComp: "$250,000–$500,000",
        whyItPaysThisMuch: "CFOs own the financial operating model, capital allocation, investor relations, and risk management. The accountability scope — including regulatory and fiduciary responsibility — commands significant premium above VP Finance levels.",
        education: "BS in Finance/Accounting → CPA or CFA → FP&A / Controller progression → CFO. MBA accelerates some paths. PE-backed companies often prefer finance leaders with transaction experience.",
        outlook: "Stable demand. Every company of meaningful size needs CFO-level financial leadership. Growth in private equity-backed companies has increased demand for experienced finance executives.",
        getThereWith: "Most CFO transitions happen through network and private equity intermediaries rather than job boards. Zari coaches the executive positioning narrative and interview preparation for C-suite searches.",
      },
    ],
  },
  {
    sector: "Law",
    accent: "#059669",
    jobs: [
      {
        title: "Corporate Attorney (BigLaw Partner)",
        medianTotalComp: "$500,000–$4,000,000+",
        whyItPaysThisMuch: "BigLaw partner compensation is driven by equity participation in firm profits (equity partners) and origination credit. Partners who develop their own client base — business development — earn dramatically more than those who rely on firm work. The range is enormous because partner compensation is merit and relationship-driven.",
        education: "JD from T14 law school → BigLaw associate → partnership track (7–10 years). Some partners lateralize from in-house or government.",
        outlook: "Demand for corporate transactional work is cyclical but structurally strong. Regulatory complexity and M&A activity drive sustained demand for sophisticated legal counsel.",
        getThereWith: "The path to partnership requires both legal excellence and business development. Most associates who miss partnership do so because of origination gaps, not skills. Zari coaches the in-house transition for attorneys exiting BigLaw.",
      },
      {
        title: "In-House General Counsel",
        medianTotalComp: "$250,000–$600,000",
        whyItPaysThisMuch: "General Counsel role carries full legal risk management responsibility for the company — regulatory, employment, M&A, IP, litigation. The accountability premium plus the reduced lifestyle cost versus BigLaw makes GC roles highly sought after.",
        education: "JD + 5–12 years of relevant practice. Most GCs come from BigLaw or specialized practice areas relevant to the company's legal risk profile.",
        outlook: "Strong. Regulatory complexity in tech, healthcare, and financial services drives demand for senior in-house counsel who can manage complex risk without billing every interaction.",
        getThereWith: "In-house transitions from BigLaw require positioning for the cultural shift from billing-hour incentives to business partnership. Zari coaches the interview narrative for attorneys making this transition.",
      },
    ],
  },
];

const FAQS = [
  { question: "What are the highest-paying jobs that don't require a college degree?", answer: "Several high-paying careers are accessible without a traditional 4-year degree: elevator installer and repairer (median ~$97K), construction manager with experience (median ~$100K+), commercial pilot (median ~$135K — requires FAA certification), air traffic controller (median ~$130K — federal government hiring with specific training), nuclear power plant operator (median ~$115K — specialized training program). In tech, self-taught software engineers can reach $150K+ at companies that evaluate on demonstrated skill rather than credentials. Skilled trades (electrician, plumber) with business ownership can reach $150K+ in high-cost markets." },
  { question: "Which high-paying career has the best work-life balance?", answer: "This varies significantly by company and individual role, but some generalizations hold: data science and ML engineering at non-startup companies tend to offer better hours than investment banking or BigLaw; pharmacists in hospital settings have predictable schedules; physical therapists and occupational therapists work standard hours with strong pay in many markets. The worst work-life balance at high pay: investment banking analysts (80–100 hours/week), surgical residents (60–80+ hours/week), BigLaw associates (60–80 hours/week). High pay and manageable hours are correlated — the premium for extreme availability is real." },
  { question: "How long does it take to reach a $200K salary?", answer: "Path matters more than time. In software engineering at a top-tier tech company, a strong hire can reach $200K total comp at entry level (L4/E4). In investment banking, first-year analysts at bulge bracket banks reach $200K+ in total comp (base + bonus). In medicine, most specialties reach $200K+ after residency completion (8–14 years post-college). In consulting, MBB post-MBA associates reach ~$200K in total compensation. In most corporate functions (marketing, HR, operations), $200K requires 10–15 years of progression to VP/Director level." },
];

export default async function HighestPayingJobsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Highest Paying Jobs in 2025 — Salaries, Education & How to Get There"
        description="Median salaries, what drives the pay, education requirements, and growth outlook for the highest-paying careers in 2025."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/highest-paying-jobs`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Highest Paying Jobs", url: `${BASE_URL}/blog/highest-paying-jobs` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Research</span>
            <span className="text-[11px] text-white/30">13 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Highest paying jobs<br /><span className="gradient-text-animated">in 2025</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Salary ranges are everywhere. What&apos;s rarer: honest context on why a career pays what it does, what the path actually looks like, and what trade-offs come with the compensation. This guide covers all of it — by sector.
          </p>
        </div>
      </section>

      {/* Careers by sector */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-14">
          {CAREERS.map((sector) => (
            <div key={sector.sector}>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-4 w-4 rounded-sm flex-shrink-0" style={{ backgroundColor: sector.accent }} />
                <h2 className="text-[1.5rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">{sector.sector}</h2>
              </div>
              <div className="space-y-5">
                {sector.jobs.map((job) => (
                  <div key={job.title} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                    <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-6 py-5" style={{ borderLeftColor: sector.accent, borderLeftWidth: 4 }}>
                      <div>
                        <p className="text-[17px] font-bold text-[var(--ink)]">{job.title}</p>
                        <p className="mt-1 text-[13px] font-semibold" style={{ color: sector.accent }}>Total comp: {job.medianTotalComp}</p>
                      </div>
                    </div>
                    <div className="divide-y divide-[var(--border)]">
                      <div className="px-6 py-4">
                        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Why it pays this much</p>
                        <p className="text-[13.5px] leading-6 text-[var(--muted)]">{job.whyItPaysThisMuch}</p>
                      </div>
                      <div className="grid sm:grid-cols-2">
                        <div className="border-b border-[var(--border)] px-6 py-4 sm:border-b-0 sm:border-r">
                          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Education / path</p>
                          <p className="text-[13.5px] leading-6 text-[var(--muted)]">{job.education}</p>
                        </div>
                        <div className="px-6 py-4">
                          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">2025 outlook</p>
                          <p className="text-[13.5px] leading-6 text-[var(--muted)]">{job.outlook}</p>
                        </div>
                      </div>
                      <div className="px-6 py-4">
                        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: sector.accent }}>How Zari helps you get there</p>
                        <p className="text-[13.5px] leading-6 text-[var(--muted)]">{job.getThereWith}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What drives pay */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 4 things that actually drive high compensation</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Understanding what drives pay in a field helps you evaluate whether a compensation level is sustainable or temporary — and where the leverage is within a career.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { driver: "Scarcity of the skill combination", detail: "High pay almost always reflects difficulty of replacement, not value of the work per se. ML engineers earn more than general software engineers because the combination of statistical depth and production engineering is genuinely scarce." },
              { driver: "Revenue attribution", detail: "Roles with direct revenue responsibility — bankers who close deals, salespeople who generate accounts, lawyers who originate clients — earn dramatically more than equivalent roles without revenue attribution. The clearer the line between your work and revenue, the higher the ceiling." },
              { driver: "Liability and accountability surface", detail: "Physicians, lawyers, and executives carry specific liability and accountability that commands premium — both because of the risk and because the training to take on that liability is long and expensive." },
              { driver: "Market concentration", detail: "A few employers dominate compensation in some fields. Tech giants set the market for software engineers. Bulge bracket banks set it for finance. Competing offers in these concentrated markets create the biggest salary leverage." },
            ].map((item) => (
              <div key={item.driver} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.driver}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Salary FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get coaching for the career you&apos;re targeting</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Whether you&apos;re positioning for a higher-paying role or negotiating compensation in your current field, Zari coaches your resume, interview answers, and salary negotiation strategy.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
