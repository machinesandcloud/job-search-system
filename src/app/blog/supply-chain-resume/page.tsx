import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Supply Chain Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "Supply chain hiring managers scan for measurable efficiency improvements, technology platforms, and cross-functional scope. Most supply chain resumes describe processes managed. The ones that get callbacks show the business outcomes those processes drove. Before/after examples by supply chain track.",
  keywords: ["supply chain resume", "supply chain resume examples", "logistics resume", "supply chain manager resume", "procurement resume", "supply chain analyst resume", "supply chain ATS keywords 2025", "operations supply chain resume"],
  alternates: { canonical: "/blog/supply-chain-resume" },
  openGraph: {
    title: "Supply Chain Resume — Examples, Skills & ATS Tips (2025)",
    description: "Supply chain resumes that get callbacks show business outcomes, not just processes managed. Before/after examples by track with ATS keyword strategy.",
    url: "/blog/supply-chain-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What certifications should I include on a supply chain resume?",
    answer: "APICS certifications (CPIM, CSCP, CLTD) are the most recognized and ATS-searched in supply chain and logistics. CPSM (Certified Professional in Supply Management) is the standard for procurement roles. PMP is valuable if you're in a project-heavy supply chain role. Lean/Six Sigma credentials (Green Belt, Black Belt) are relevant for process improvement-heavy roles. Put certifications prominently — in the header or a dedicated section — since many supply chain ATS systems filter on them.",
  },
  {
    question: "How do I show supply chain experience if I've mostly worked in stable environments without crises?",
    answer: "Focus on efficiency, optimization, and scale. Continuous improvement in a stable supply chain is still valuable — show the baseline, what you changed, and the result. 'Reduced average procurement cycle time from 22 days to 11 days by standardizing vendor evaluation criteria and automating PO generation' is a strong bullet even without a crisis as context. Look for: cost reduction percentages, lead time improvements, inventory turns, fill rates, and accuracy rates.",
  },
  {
    question: "Should I include ERP and software in a skills section?",
    answer: "Yes — always. SAP (SCM, MM, EWM), Oracle SCM, Manhattan Associates, Blue Yonder, Kinaxis, Coupa, Ariba, and Excel/Power BI are ATS-filtered keywords in most supply chain job descriptions. List the specific modules you've used, not just the platform name. 'SAP' is weaker than 'SAP MM, SAP APO, SAP EWM.' If you've led an implementation or configured a system (not just used it), say so — that's a significantly different and more valuable signal.",
  },
  {
    question: "What's the difference between a supply chain analyst and a supply chain manager resume?",
    answer: "Analyst resumes emphasize data analysis, modeling, forecasting accuracy, and tool proficiency — what you measured and how you interpreted it. Manager resumes shift to team ownership, vendor relationships, budget authority, and the business decisions your analysis enabled. A manager who writes an analyst resume signals they don't understand what the level requires. Make sure your bullets reflect the decision-making authority and business ownership of your actual role.",
  },
];

export default async function SupplyChainResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Supply Chain Resume — Examples, Skills & ATS Tips (2025)"
        description="Before/after examples by supply chain track — analyst, manager, procurement, logistics, and demand planning — with ATS keyword strategy."
        url={`${BASE_URL}/blog/supply-chain-resume`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Supply Chain Resume", url: `${BASE_URL}/blog/supply-chain-resume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">Supply Chain Resume</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">Supply chain hiring managers scan for measurable efficiency improvements, technology platforms, and cross-functional scope. Most resumes describe processes managed. The ones that get callbacks show the business outcomes those processes drove.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>11 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What supply chain hiring managers actually scan for</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Supply chain roles span an unusually wide range — demand planning, procurement, logistics, inventory management, S&OP, and global sourcing all require different signals. But most supply chain hiring managers follow a similar initial scan:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { signal: "ERP and platform fluency", detail: "SAP, Oracle SCM, Manhattan Associates, Blue Yonder, Kinaxis, Coupa, Ariba — these are often the first ATS filters. List specific modules, not just the platform name. Hiring managers also look for whether you've been a power user vs. an implementer — configuring a system is a stronger signal than using one." },
                { signal: "Efficiency and cost metrics", detail: "The specific metrics that matter vary by function: inventory turns and fill rates for inventory management, cycle time and cost reduction percentages for procurement, on-time delivery and freight cost per unit for logistics, MAPE and forecast accuracy for demand planning. If you improved any of these, quantify it — what was the baseline, what did it become, and over what period?" },
                { signal: "Cross-functional and vendor scope", detail: "Supply chain roles sit at the intersection of finance, operations, sales, and manufacturing. Evidence of cross-functional coordination — leading S&OP cycles, aligning with manufacturing on capacity, partnering with finance on budget — signals someone who understands supply chain as a business function, not just a process." },
                { signal: "Scale and complexity", detail: "Global vs. domestic, single-site vs. multi-site, number of SKUs, supplier count, spend under management (for procurement), annual logistics spend (for logistics). These signals calibrate whether your experience translates to their environment." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[#4361EE]">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.signal}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Before and after: by supply chain track</h2>
            <div className="mt-6 space-y-6">
              {[
                {
                  role: "Supply Chain Analyst",
                  color: "#0D7182",
                  before: "Analyzed supply chain data and provided reports to management.",
                  after: "Built a demand forecasting model in Python using 3 years of sales history and promotional calendar data — reduced MAPE from 28% to 14%, enabling a 12% reduction in safety stock across 800 SKUs and freeing $3.2M in working capital.",
                  insight: "Analyst bullets need to show the analytical method, the data sources, and the business decision your analysis enabled — not just 'analyzed data.'",
                },
                {
                  role: "Procurement Manager",
                  color: "#7C3AED",
                  before: "Managed vendor relationships and sourcing activities.",
                  after: "Led strategic sourcing for $48M indirect spend across IT, facilities, and professional services — renegotiated 14 supplier contracts using competitive RFP process, achieving 11% average cost reduction ($5.3M savings) and consolidating from 62 to 29 approved vendors.",
                  insight: "Procurement resumes need spend under management (the dollar figure), the sourcing method, and the outcome — both cost savings and process improvement (vendor consolidation signals strategic thinking, not just cost-cutting).",
                },
                {
                  role: "Logistics / Supply Chain Manager",
                  color: "#F97316",
                  before: "Oversaw warehouse operations and transportation management.",
                  after: "Managed 3PL relationships for a 220,000 sq ft distribution network (5 DCs, 14 carrier partners) — implemented carrier scorecard process that identified and replaced 3 underperforming carriers, reducing on-time delivery from 87% to 96% and cutting freight cost per unit by 8% year-over-year.",
                  insight: "Logistics manager resumes need scale (warehouse square footage, DC count, carrier count), the specific management lever you pulled (carrier scorecard vs. generic 'managed relationships'), and a measurable outcome.",
                },
                {
                  role: "Demand Planning / S&OP Lead",
                  color: "#059669",
                  before: "Led the S&OP process and worked with cross-functional teams.",
                  after: "Led monthly S&OP cycle for a $340M CPG brand — implemented statistical forecasting layer (Kinaxis) on top of legacy Excel process, reduced consensus forecast MAPE from 32% to 17%, and enabled first on-time product launch in 3 years by surfacing a 14-week supply constraint 6 months in advance.",
                  insight: "S&OP bullets need to show the business size (revenue under forecast), the specific improvement made, and ideally a downstream outcome (on-time launch, inventory reduction) that shows the S&OP process wasn't just a meeting — it changed a business decision.",
                },
              ].map(item => (
                <div key={item.role} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4" style={{ borderLeft: `4px solid ${item.color}` }}>
                    <h3 className="font-bold text-[var(--ink)]">{item.role}</h3>
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
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">ATS keywords by supply chain function</h2>
            <div className="mt-5 space-y-4">
              {[
                {
                  category: "Certifications",
                  keywords: ["APICS CPIM", "APICS CSCP", "APICS CLTD", "CPSM", "CIPS", "PMP", "Lean Six Sigma", "Green Belt", "Black Belt"],
                },
                {
                  category: "ERP & Technology Platforms",
                  keywords: ["SAP SCM", "SAP MM", "SAP EWM", "SAP APO", "Oracle SCM", "Manhattan Associates", "Blue Yonder", "Kinaxis", "Coupa", "Ariba", "NetSuite", "Power BI", "Tableau", "Python", "Excel (advanced)"],
                },
                {
                  category: "Procurement & Sourcing",
                  keywords: ["Strategic sourcing", "Category management", "RFP / RFQ", "Supplier development", "Spend analysis", "Contract negotiation", "Vendor risk management", "Total cost of ownership", "Tail spend", "P2P (procure-to-pay)"],
                },
                {
                  category: "Logistics & Distribution",
                  keywords: ["3PL management", "TMS (Transportation Management System)", "WMS (Warehouse Management System)", "Freight negotiation", "Carrier management", "Last mile", "Cold chain", "Import / export", "Customs compliance", "Incoterms"],
                },
                {
                  category: "Inventory & Demand Planning",
                  keywords: ["Demand forecasting", "S&OP", "SIOP", "Safety stock", "Inventory turns", "MAPE", "Fill rate", "Replenishment", "VMI (Vendor Managed Inventory)", "MRP / MRPII", "Kinaxis", "Anaplan"],
                },
              ].map(group => (
                <div key={group.category} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.keywords.map(kw => (
                      <span key={kw} className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[12px] text-[var(--ink)]">{kw}</span>
                    ))}
                  </div>
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
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Get your supply chain resume ATS-optimized</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari analyzes your supply chain resume against the specific job description — identifies missing certifications and platform keywords, rewrites process-focused bullets to show measurable business outcomes, and tailors your resume for ATS at each target company.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Optimize my supply chain resume →
            </Link>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
