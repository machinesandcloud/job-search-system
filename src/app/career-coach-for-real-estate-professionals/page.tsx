import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Real Estate Professionals — Zari",
  description:
    "Career coaching built for real estate agents, brokers, and property professionals moving into corporate RE, PropTech, or investment roles. Resume translation, interview prep, and comp strategy.",
  keywords: ["career coach for real estate professionals", "real estate career coach", "real estate career change", "PropTech careers", "commercial real estate careers"],
  alternates: { canonical: "/career-coach-for-real-estate-professionals" },
  openGraph: {
    title: "AI Career Coach for Real Estate Professionals — Zari",
    description: "From agent to corporate. Zari translates real estate experience into language that resonates in PropTech, REITs, and institutional investment firms.",
    url: "/career-coach-for-real-estate-professionals",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TRANSLATION_PROBLEMS = [
  {
    problem: "Production volume reads as sales, not business leadership",
    accent: "#7C3AED",
    raw: `"Top producer, $22M in closed transactions, 2023"`,
    why: "Hiring managers in corporate, institutional, or PropTech roles read this as individual contributor sales — not as evidence of market judgment, client management, or business development capability. The dollar number is impressive, but without context it's a number, not a story.",
    fix: `"Built a $22M/year residential book from zero referral base in 18 months — 84% repeat and referral business by year 3. Managed 5 concurrent transactions with avg. 38-day close-to-clear."`,
    whatChanged: "Turns a production number into a business-building narrative with metrics that signal judgment, not just activity.",
  },
  {
    problem: "Licensing and CE hours look like compliance, not expertise",
    accent: "#DC2626",
    raw: `"Licensed real estate salesperson, 60 CE hours completed"`,
    why: "CE hours are a legal requirement, not a differentiator. On a corporate RE resume, listing them raw signals compliance mindset, not professional depth. In PropTech hiring especially, this pattern reads as someone from a heavily-regulated world who hasn't yet translated.",
    fix: `"Active CA DRE license, Series 65 in progress. Deep working knowledge of RESPA, 1031 exchange mechanics, and environmental disclosure requirements in CA and NV markets."`,
    whatChanged: "Elevates from box-checking to demonstrated domain expertise with cross-state regulatory fluency.",
  },
  {
    problem: "Market relationships aren't positioned as business development",
    accent: "#D97706",
    raw: `"Strong network of buyers, sellers, and investors in the Bay Area market"`,
    why: "Every agent says this. 'Strong network' is one of the most overused and least credible phrases on any resume. In corporate contexts, business development is about process, pipeline, and conversion — not just having contacts.",
    fix: `"Sourced and closed 14 off-market residential transactions in 2022–2023 through proactive seller outreach — average 12% below list price for buyer clients. Built preferred vendor relationships with 3 title companies and 2 major mortgage originators."`,
    whatChanged: "Specific proof of sourcing, relationship operationalization, and mutual value creation — not just claiming a network.",
  },
  {
    problem: "Solo practice experience undersells management and operational ability",
    accent: "#059669",
    raw: `"Independent real estate agent, self-employed"`,
    why: "Running a solo real estate practice is genuinely complex — marketing, lead gen, client management, contract negotiation, pipeline management, vendor coordination, P&L. But 'independent agent' on a resume reads as one-person-shop to most corporate screeners who don't know the industry.",
    fix: `"Operated independent real estate practice as a business: managed $180K annual marketing budget across digital and direct channels, maintained 12–16 active client relationships simultaneously, coordinated closings with title, lenders, inspectors, and legal counsel across an average 45-day transaction cycle."`,
    whatChanged: "Makes the operational complexity visible — this person can run a business, manage vendors, and work multiple complex tracks simultaneously.",
  },
];

const CAREER_PATHS = [
  {
    path: "PropTech & Real Estate Technology",
    accent: "#7C3AED",
    whyFits: "PropTech companies desperately need people who understand real estate from the inside — how agents actually work, what they hate about existing tools, what would change their workflow. Your practitioner experience is the product insight that engineers and PMs don't have.",
    roles: ["Real Estate Solutions Consultant", "Customer Success Manager (PropTech)", "Product Manager (RE vertical)", "Revenue Operations – Real Estate", "Sales Engineer (RE SaaS)"],
    compensation: "$110K–$200K+ depending on role and equity component",
    zariCoaches: "Translating brokerage experience into product credibility, prepping for 'why do you want to go corporate' questions, and building a resume that signals business context, not just transactions",
  },
  {
    path: "Commercial Real Estate — Corporate Side",
    accent: "#DC2626",
    whyFits: "Residential to commercial is a known transition, but corporate CRE — asset management, acquisitions, portfolio management at institutional firms — requires repositioning volume as analysis. Your deal mechanics knowledge is real; the gap is financial modeling and institutional credibility, both learnable.",
    roles: ["Asset Manager", "Acquisitions Analyst / Associate", "Leasing Representative (Corporate)", "Portfolio Manager – Real Estate", "Real Estate Investment Associate"],
    compensation: "$95K–$250K+ (wide range; senior institutional roles carry large bonus/carry components)",
    zariCoaches: "Building an acquisitions-credible narrative from residential experience, prep for technical RE finance questions (IRR, cap rate scenarios, waterfall modeling context), and positioning for analyst roles that bridge into VP tracks",
  },
  {
    path: "REITs & Real Estate Investment Firms",
    accent: "#D97706",
    whyFits: "REITs and private equity real estate firms hire practitioners for investor relations, deal sourcing, and market analysis. Your on-the-ground market knowledge is genuinely valuable — most analysts have financial models but have never negotiated a purchase agreement or managed a closing.",
    roles: ["Investor Relations Associate", "Deal Sourcing Specialist", "Market Research Analyst", "Acquisitions Associate (smaller REITs)", "Asset Management Analyst"],
    compensation: "$90K–$180K base, plus meaningful bonus in PE-backed vehicles",
    zariCoaches: "Reframing transaction experience as market intelligence, preparing deal-sourcing narratives, and coaching the 'how did you underwrite that deal' questions you'll get in first-round screens",
  },
  {
    path: "Corporate Real Estate (CRE) Functions",
    accent: "#059669",
    whyFits: "Large corporations have internal real estate functions that manage office portfolios, lease negotiations, site selection, and space strategy. These teams are chronically understaffed with people who understand both the real estate mechanics and the corporate environment — a gap you can bridge.",
    roles: ["Corporate Real Estate Manager", "Lease Administrator", "Facilities & Real Estate Analyst", "Site Selection Specialist", "Workplace Strategy Lead"],
    compensation: "$85K–$160K; typically includes full corporate benefits package often absent in brokerage",
    zariCoaches: "Translating transaction experience into portfolio management language, positioning for internal moves within large employers, and navigating the corporate interview format (structured behavioral, STAR-based) vs the brokerage interview culture you're used to",
  },
  {
    path: "Real Estate Finance & Lending",
    accent: "#0891B2",
    whyFits: "Mortgage banking, commercial lending, and real estate finance roles want practitioners who understand the asset class. Your knowledge of deal timelines, common financing contingencies, and what kills closings is direct value for commercial lending teams evaluating loan requests.",
    roles: ["Commercial Loan Officer", "Real Estate Underwriter", "Mortgage Banking Associate", "Construction Lending Specialist", "CMBS Analyst (entry)"],
    compensation: "$80K–$165K base plus origination or production incentives",
    zariCoaches: "Building the bridge from agent/broker to finance credibility — what to emphasize, what to learn to close the gap, and how to position for roles that don't require a finance degree",
  },
];

const RESUME_ADJUSTMENTS = [
  {
    heading: "Lead with market expertise, not transaction count",
    detail: "Corporate and institutional real estate employers care about your knowledge of a market — price trends, inventory dynamics, neighborhood trajectory, regulatory environment. Your transaction history is evidence of this expertise, not the feature itself. Lead with the insight, use transactions as proof.",
  },
  {
    heading: "Quantify everything that's usually informal",
    detail: "Real estate professionals often have impressive business metrics they treat as informal knowledge: average days-on-market vs. market, list-to-sale price ratio, average commission per transaction, client retention rate. Put these on paper. They're business performance metrics that directly map to corporate competencies.",
  },
  {
    heading: "Show analytical work, not just deal work",
    detail: "Corporate roles want evidence of structured thinking: market analyses, underwriting, comparative analysis. If you've done this work informally (pricing strategy, neighborhood assessment, investment property analysis for clients), formalize it on your resume and be ready to walk through your methodology.",
  },
  {
    heading: "Address the licensing gap proactively",
    detail: "If you're moving to a role that doesn't require a real estate license, you'll get the 'why are you leaving' question early. Build a two-sentence answer that's about moving toward institutional scale, not away from commission income pressure. The narrative matters.",
  },
];

const FAQS = [
  { question: "Can a residential real estate agent transition to commercial?", answer: "Yes — but it typically requires either going through a commercial brokerage role first, or targeting corporate RE functions rather than institutional acquisitions directly. The biggest gap is financial modeling: residential agents who've analyzed investment properties informally and can get comfortable with cap rates, NOI, and basic DCF analysis are much better positioned. Zari can coach the resume translation and help you identify the specific bridge roles." },
  { question: "What's the easiest real estate career transition into corporate?", answer: "PropTech Solutions Consultant or Customer Success roles are the most accessible entry points — they want your practitioner knowledge and don't require a finance background. Corporate Real Estate Manager roles inside large employers are also accessible if you have transaction and lease experience. Both have clear paths and shorter credentialing requirements than the investment side." },
  { question: "How do I explain leaving real estate commissions for a salary?", answer: "Frame it as a deliberate shift toward institutional scale and portfolio depth, not as escaping income volatility. Something like: 'I've built strong transaction experience in [market], and I'm ready to apply it at a portfolio level — working on larger, more complex deals over longer horizons rather than managing high-volume transaction cycles.' This is true for most people making this move and reads well to institutional employers." },
];

export default async function CareerCoachForRealEstatePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Career Coach for Real Estate Professionals", url: `${BASE_URL}/career-coach-for-real-estate-professionals` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Career Coach · Real Estate Professionals
          </div>
          <h1 className="max-w-4xl text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.5rem]">
            Real estate experience that<br /><span className="gradient-text-animated">reads in corporate, PropTech,</span><br />and institutional roles
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/55">
            You&apos;ve closed deals, built client books, navigated markets, and run your own business. The problem isn&apos;t your experience — it&apos;s that your resume doesn&apos;t translate it yet. Zari coaches the translation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Translation problems */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why real estate resumes lose corporate screeners</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The experience is real. The framing is the problem. Here&apos;s what corporate hiring managers actually see — and how to fix it.</p>
          <div className="mt-10 space-y-6">
            {TRANSLATION_PROBLEMS.map((p) => (
              <div key={p.problem} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: p.accent, borderLeftWidth: 4 }}>
                  <p className="font-bold text-[var(--ink)]">{p.problem}</p>
                </div>
                <div className="grid gap-0 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="px-6 py-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">Typical framing</p>
                    <p className="font-mono text-[12px] text-[var(--muted)] leading-5">{p.raw}</p>
                    <p className="mt-3 text-[13px] leading-6 text-[var(--muted)]">{p.why}</p>
                  </div>
                  <div className="bg-[var(--bg)] px-6 py-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Translated framing</p>
                    <p className="font-mono text-[12px] text-[var(--ink)] leading-5">{p.fix}</p>
                    <p className="mt-3 text-[13px] leading-6 text-[var(--muted)]">{p.whatChanged}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career paths */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 realistic career paths for real estate professionals</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">What each path requires, what it pays, and what Zari specifically coaches for each transition.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {CAREER_PATHS.map((cp) => (
              <div key={cp.path} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="px-6 py-5 border-b border-[var(--border)]" style={{ borderTopColor: cp.accent, borderTopWidth: 3 }}>
                  <p className="font-extrabold text-[var(--ink)]">{cp.path}</p>
                  <p className="mt-1 text-[11px] font-semibold text-[var(--muted)]">{cp.compensation}</p>
                </div>
                <div className="flex flex-col gap-4 px-6 py-5 flex-1">
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{cp.whyFits}</p>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Sample roles</p>
                    <ul className="space-y-1">
                      {cp.roles.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-[12.5px] text-[var(--ink)]">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cp.accent }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-[var(--border)] bg-white p-3 mt-auto">
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: cp.accent }}>Zari coaches</p>
                    <p className="text-[12px] text-[var(--muted)] leading-5">{cp.zariCoaches}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume adjustments */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 resume adjustments that change how corporate reads your background</h2>
          <div className="mt-8 space-y-4">
            {RESUME_ADJUSTMENTS.map((item, i) => (
              <div key={item.heading} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.heading}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Real estate career transition FAQs</h2>
          <div className="mt-7 space-y-4">
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
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Ready to make the move? Start with your resume.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari translates your real estate experience into the language corporate, PropTech, and institutional employers are actually looking for — and coaches your interview prep for the questions you&apos;ll face on the other side.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
