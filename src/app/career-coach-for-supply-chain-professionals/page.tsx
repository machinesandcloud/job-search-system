import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Supply Chain Professionals — 2025 Market, Exit Paths & Advancement",
  description:
    "Career coaching for supply chain, procurement, operations, and logistics professionals. Post-COVID market context, exit paths to adjacent roles, resume translation from operational to strategic, and interview prep for supply chain leaders.",
  keywords: ["career coach for supply chain professionals", "supply chain career coaching", "supply chain career advice", "supply chain career change", "procurement career coach", "logistics career coach", "operations career coaching", "supply chain manager career path"],
  alternates: { canonical: "/career-coach-for-supply-chain-professionals" },
  openGraph: {
    title: "AI Career Coach for Supply Chain Professionals — Exit Paths & Advancement (2025)",
    description: "Post-COVID market context, exit paths, resume translation, and interview prep for supply chain and operations professionals.",
    url: "/career-coach-for-supply-chain-professionals",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const MARKET_CONTEXT = [
  { signal: "Post-COVID normalization", detail: "The 2021–2022 supply chain crisis created a hiring surge for SCM professionals. That surge has normalized. Companies that hired aggressively are now leaner, and the market has returned to pre-pandemic competitiveness. But supply chain expertise is structurally more valued than it was pre-2020 — the crisis demonstrated how much organizational resilience depends on supply chain capability." },
  { signal: "Digital and tech convergence", detail: "Supply chain technology — demand planning software, warehouse management systems, procurement platforms, and AI-driven forecasting — has created a new category of hybrid roles that require both domain expertise and technical fluency. Professionals with both command significant compensation premiums." },
  { signal: "Sustainability and ESG pressures", detail: "Scope 3 emissions, responsible sourcing, and supply chain transparency requirements are creating demand for sustainability-focused SCM roles at major companies. This is a growing specialization with significant career optionality." },
  { signal: "Near-shoring and domestic sourcing", detail: "Geopolitical shifts are driving domestic and near-shore sourcing strategies. Companies building or rebuilding US and regional supply chains need professionals with the expertise to do it — a hiring wave distinct from the post-COVID recovery." },
];

const EXIT_PATHS = [
  {
    destination: "Supply chain technology (SCM software companies)",
    accent: "#7C3AED",
    what: "Companies like Blue Yonder, o9 Solutions, Kinaxis, Coupa, and SAP Ariba actively recruit supply chain practitioners for solutions consulting, pre-sales, customer success, and product roles. Your domain expertise is exactly what these companies need to explain their products to buyers and implement them successfully.",
    compensation: "Solutions consulting and pre-sales roles at SCM software companies typically pay 20–40% more than practitioner roles of equivalent seniority — plus variable comp. Customer success roles offer more stability with lower ceiling.",
    prep: "Emphasize implementations, system configurations, and technical evaluations you've done. Highlight specific platforms (SAP, Oracle, Kinaxis, Coupa) in your resume. The interview will test both domain depth and communication clarity — can you explain a complex supply chain concept to a non-practitioner?",
  },
  {
    destination: "Operations strategy consulting",
    accent: "#0891B2",
    what: "Strategy consulting firms and boutiques focused on operations (Kearney, Oliver Wyman, Accenture Strategy, KPMG supply chain practice) value practitioners who can bring real-world credibility to client engagements. The transition is demanding — consulting is a different operating model — but compensation is typically higher and the exposure is broad.",
    compensation: "Manager/senior manager roles at consulting firms are typically $180–250K+ total comp, comparable to or higher than VP-level corporate supply chain roles depending on company size.",
    prep: "Consulting interviews require case preparation in addition to behavioral. Supply chain consulting interviews often involve operational case studies — factory optimization, sourcing decisions, distribution network design. Zari coaches both the behavioral and case elements.",
  },
  {
    destination: "Procurement and sourcing leadership",
    accent: "#059669",
    what: "The most direct adjacency for supply chain professionals — VP and Chief Procurement Officer roles at companies where procurement is a strategic function. ESG mandates are elevating procurement's organizational standing, and companies are investing more in procurement leadership than they did 10 years ago.",
    compensation: "CPO roles at mid-market companies: $250–400K total comp. VP Procurement at Fortune 500: $300–500K+.",
    prep: "Position your negotiation outcomes, supplier relationship management, and risk mitigation work prominently. CPO-level roles need evidence of strategic impact — cost savings with percentage improvement, supplier consolidation with risk context, not just process management.",
  },
  {
    destination: "Operations and general management",
    accent: "#D97706",
    what: "Supply chain expertise increasingly serves as a pipeline to COO, GM, and VP Operations roles — particularly at companies where the supply chain is core to the value proposition (manufacturing, retail, e-commerce, healthcare). The operational mindset and systems thinking that supply chain builds is exactly what operations leadership requires.",
    compensation: "VP Operations at a $1B+ company: $350–600K total comp. COO at a mid-market company: $400K–$1M+.",
    prep: "The jump to operations leadership requires demonstrating cross-functional credibility beyond supply chain — finance, commercial, HR. Identify and highlight moments where you influenced strategy above your functional role.",
  },
];

const RESUME_PROBLEMS = [
  { problem: "Operational depth without strategic framing", fix: "Supply chain resumes often document what was managed — warehouse capacity, SKU count, supplier count — without framing why it mattered. Add strategic context: 'Redesigned distribution network serving 12M customers, reducing last-mile cost by 18% and supporting a 30% volume increase.'" },
  { problem: "Missing impact quantification", fix: "Supply chain generates measurable outcomes: fill rate, on-time delivery, inventory turns, cost per unit, supplier lead time. If these aren't in your resume, you're leaving your strongest evidence on the table. Every major achievement should have a number." },
  { problem: "Too process-focused for senior roles", fix: "Senior supply chain roles require evidence of systems thinking and business judgment, not just process management. Reframe 'managed S&OP process' as 'built demand planning process that reduced forecast error 23% and freed $4M in working capital.'" },
  { problem: "ATS keyword mismatches across roles", fix: "Supply chain job descriptions vary significantly by sector and role type. Manufacturing SCM uses different vocabulary than retail or tech. Tailor every resume to the specific role's language — Zari's ATS scoring identifies the keyword gaps for each application." },
];

const FAQS = [
  { question: "Is supply chain a good career in 2025?", answer: "Yes — with nuance. The post-COVID hiring surge has normalized, so the market is more competitive than 2021–2022. But supply chain expertise is more strategically valued than it was pre-pandemic, and the intersection of supply chain with technology (AI forecasting, procurement platforms, digital twins) is creating high-compensation hybrid roles. The professionals who are doing best in 2025 are those who have both operational depth and some technical or data fluency." },
  { question: "How do supply chain professionals transition to tech companies?", answer: "SCM software companies (Blue Yonder, o9, Kinaxis, Coupa, SAP) are the most natural destination — they need practitioners who can explain and implement their products. Beyond SCM software, e-commerce companies (Amazon, Shopify, fulfillment networks) value supply chain expertise for their own operations. Tech company supply chain roles (like Apple's supply chain operations) are highly competitive but pay exceptionally well. The positioning: emphasize specific platforms, quantified operational outcomes, and the ability to translate supply chain complexity for non-practitioners." },
  { question: "What certifications are most valuable for supply chain careers?", answer: "APICS credentials (CPIM for demand/supply planning, CSCP for supply chain strategy, CLTD for logistics) are the most widely recognized. CIPS (Chartered Institute of Procurement and Supply) is relevant for procurement-focused roles. For technology-adjacent positions, platform certifications (SAP, Oracle, Coupa) carry real weight with SCM software employers. An MBA adds value for transitions into strategy consulting or general management, but isn't necessary for most supply chain advancement paths." },
];

export default async function CareerCoachSupplyChainPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach for Supply Chain Professionals", url: `${BASE_URL}/career-coach-for-supply-chain-professionals` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
            For Supply Chain, Procurement & Operations Leaders
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
            AI Career Coach for<br /><span className="gradient-text-animated">Supply Chain Professionals</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            The post-COVID supply chain market has normalized — but supply chain expertise is more strategically valued than ever. Whether you&apos;re advancing within SCM, pivoting to adjacent roles, or making the jump to tech or consulting, the positioning decisions you make today determine your next 10 years.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start free coaching <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/ai-career-coach" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-7 text-[14px] font-semibold text-white/70 transition-all hover:border-white/30 hover:text-white">
              How Zari works
            </Link>
          </div>
        </div>
      </section>

      {/* Market context */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 2025 supply chain job market</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Four forces reshaping what supply chain expertise is worth and where it leads.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {MARKET_CONTEXT.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.signal}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exit paths */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Exit paths and adjacencies</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Supply chain expertise opens doors to roles across technology, consulting, and general management. Here&apos;s what each path requires and what it pays.</p>
          <div className="mt-10 space-y-6">
            {EXIT_PATHS.map((path) => (
              <div key={path.destination} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-5" style={{ borderLeftColor: path.accent, borderLeftWidth: 4 }}>
                  <p className="text-[17px] font-bold text-[var(--ink)]">{path.destination}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{path.what}</p>
                </div>
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-[var(--border)] p-5 sm:border-b-0 sm:border-r">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Compensation context</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{path.compensation}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: path.accent }}>How to position for this</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{path.prep}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume problems */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why supply chain resumes underperform</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {RESUME_PROBLEMS.map((rp) => (
              <div key={rp.problem} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <p className="mb-3 font-bold text-[var(--ink)]">{rp.problem}</p>
                <div className="rounded-lg bg-[var(--brand)]/[0.06] p-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">The fix</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{rp.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Zari coaches */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Zari coaches for supply chain professionals</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Resume impact translation", body: "Converting operational metrics — fill rate, on-time delivery, inventory turns, cost savings — into a strategic resume narrative that positions you for senior or adjacent roles." },
              { title: "ATS optimization by role type", body: "Supply chain job descriptions vary significantly across manufacturing, retail, tech, and consulting. Zari scores your resume against the specific posting and identifies the keyword gaps." },
              { title: "Exit path positioning", body: "Whether you're targeting SCM software, consulting, or operations leadership, Zari coaches the positioning narrative that bridges your current background and the target role." },
              { title: "Behavioral interview prep", body: "Supply chain leadership interviews probe for risk management under pressure, cross-functional influence, and crisis response. Zari coaches the STAR answers that demonstrate these specifically." },
              { title: "LinkedIn for supply chain", body: "Optimization for supply chain recruiter search — headline structure, keyword placement, and the 'About' section framing that surfaces your profile in searches for SCM, procurement, and operations roles." },
              { title: "Salary negotiation for SCM leaders", body: "Comp structures vary significantly across corporate supply chain, consulting, and tech. Coaching on how to evaluate and negotiate each structure — base, variable, equity, and total comp benchmarking by role." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Supply chain career FAQs</h2>
          <div className="mt-8 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Supply chain career coaching — start free</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume translation, ATS optimization, exit path positioning, and interview coaching — purpose-built for supply chain, procurement, and operations professionals.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
