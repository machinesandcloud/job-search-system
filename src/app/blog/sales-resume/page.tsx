import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Sales Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "What sales hiring managers read for in a resume — quota attainment, deal size, sales cycle, and territory. With before/after bullet examples for SDR, AE, and sales manager tracks, plus ATS keywords by sales motion.",
  keywords: ["sales resume", "account executive resume", "SDR resume", "sales manager resume", "sales representative resume", "sales resume examples 2025", "sales resume ATS"],
  alternates: { canonical: "/blog/sales-resume" },
  openGraph: {
    title: "Sales Resume — Examples, Skills & ATS Tips (2025)",
    description: "Write a sales resume that quantifies your quota performance and gets past ATS — with real before/after examples.",
    url: "/blog/sales-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_THEY_READ_FOR = [
  {
    signal: "Quota attainment — the number everything else is measured against",
    detail: "Sales hiring managers go directly to quota attainment. They want to know the number, what percentage you hit it, and how that compared to your team. Vague language like 'consistently exceeded targets' is the #1 sales resume mistake — it tells the reader nothing specific and signals you're hiding underperformance. Give the actual attainment percentage, and give the ranking if it's strong (top 10%, top rep on a 30-person team).",
    redFlag: "'Consistently exceeded sales targets and delivered strong results' — this appears on nearly every sales resume and provides zero useful signal. If your number was good, say the number.",
    strongExample: "Achieved 127% of annual quota ($1.8M booked vs $1.42M target) in 2024; ranked #2 of 24 AEs for Q4 attainment; 4 consecutive quarters above 100%.",
  },
  {
    signal: "Deal size and sales cycle — the complexity calibrator",
    detail: "A $5K average deal size and a $280K average deal size are completely different sales motions requiring different skills. Hiring managers calibrate your experience instantly based on ACV (annual contract value) and average sales cycle length. Include both — they reveal whether you're selling to SMB or Enterprise, transactional or strategic, 30-day or 9-month cycles.",
    redFlag: "Resume says 'closed new business' with no mention of deal size, ACV, or average sales cycle. Impossible to evaluate without this context.",
    strongExample: "Managed Enterprise pipeline with $85K–$320K ACV; average 6-month sales cycle involving procurement, legal, and executive-level stakeholders across 3–5 departments.",
  },
  {
    signal: "Pipeline and prospecting metrics",
    detail: "Particularly for SDR/BDR roles and any role with significant outbound responsibility, hiring managers look for activity and conversion metrics: outbound volume, meeting set rate, pipeline generated, and show rate. This shows you understand the math of sales and can operate the top of the funnel with discipline.",
    redFlag: "No mention of pipeline generation, prospecting methodology, or outbound metrics for roles that require significant outbound motion.",
    strongExample: "Generated $2.8M in qualified pipeline through strategic outbound sequencing (cold call + email + LinkedIn); averaged 32 meetings set/month with 74% show rate; converted 22% of meetings to opportunities.",
  },
  {
    signal: "Sales stack and CRM fluency",
    detail: "Modern sales roles require tool fluency. Salesforce CRM is table stakes for enterprise; HubSpot for SMB/startup; Outreach, Salesloft, or Apollo for sequencing; Gong or Chorus for call intelligence; ZoomInfo or Clay for prospecting. Listing the specific tools you've used — not just 'CRM experience' — signals that you can operate without a long onboarding ramp.",
    redFlag: "Listing 'CRM experience' or 'Salesforce' without specificity on how deeply you used it. Did you build reports? Manage forecasting dashboards? The depth matters.",
    strongExample: "Stack: Salesforce (opportunity management, forecast roll-up), Outreach (sequences and analytics), Gong (call review), ZoomInfo (prospecting), Clari (forecast accuracy); built territory tracking dashboard in Salesforce used by 8-rep team.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "SDR / BDR",
    before: "Made cold calls and sent emails to generate leads for the sales team",
    after: "Executed multi-channel outbound sequences (phone + email + LinkedIn) targeting VP-level buyers at 200–2,000 employee SaaS companies; set 28 qualified meetings/month against 20-meeting quota, generating $1.4M in pipeline in H1 2024",
    fix: "Specific channels, target persona, company size, monthly volume vs. quota, and a pipeline dollar amount replace the generic 'made calls and sent emails' framing.",
  },
  {
    level: "Account Executive",
    before: "Responsible for selling software products to new customers in the assigned territory",
    after: "Closed $1.6M in new ARR across 38 new logo accounts in Western Region territory; 118% of quota for 2024; average deal size $42K ACV with 90-day average sales cycle; 3 deals above $100K ACV",
    fix: "ARR closed, new logo count, territory, quota attainment %, average ACV, cycle length, and landmark deals replace the undefined 'responsible for selling' framing.",
  },
  {
    level: "Sales Manager",
    before: "Managed a team of sales representatives and helped them hit their targets",
    after: "Led 9-person AE team to 108% of $4.2M annual team quota; built ramp-to-productivity program reducing new hire ramp from 5.5 to 3.2 months; promoted 2 AEs to senior AE within 18 months; team ranked #1 of 4 regional teams in Q3 and Q4 2024",
    fix: "Team size, team quota attainment, ramp program with before/after metric, promotions generated, and team ranking are all signals managers look for when hiring sales managers.",
  },
];

const BY_SALES_MOTION = [
  {
    motion: "SMB / High-Velocity",
    atsKeywords: "high-velocity sales, volume pipeline, SMB, HubSpot, deal velocity, win rate, short-cycle, transactional, product-led, inbound qualification",
    emphasis: "Volume metrics (deals/month), win rate, time-to-close, and inbound conversion — speed and efficiency are the story",
    topTools: "HubSpot, Salesforce, Apollo, Lemlist, Pipedrive",
  },
  {
    motion: "Mid-Market",
    atsKeywords: "mid-market, multi-stakeholder, discovery, solution selling, MEDDIC, MEDDPICC, deal management, 3-6 month cycle, champion building",
    emphasis: "Stakeholder management, qualification methodology (MEDDIC/BANT), deal size growth, and cross-functional selling",
    topTools: "Salesforce, Outreach, Gong, ZoomInfo, LinkedIn Sales Navigator",
  },
  {
    motion: "Enterprise",
    atsKeywords: "enterprise sales, strategic accounts, complex deals, procurement, legal review, executive alignment, 6-12 month cycle, RFP, multi-year contract, $100K+ ACV",
    emphasis: "Deal size ($100K+ ACV), stakeholder map complexity (3+ departments), procurement navigation, and legal/security review experience",
    topTools: "Salesforce Enterprise, Clari, Gong, DealHub, Seismic",
  },
  {
    motion: "SDR / Business Development",
    atsKeywords: "outbound, cold calling, cold email, sequencing, meeting set, pipeline generation, BDR, lead qualification, multi-touch outreach, prospecting",
    emphasis: "Monthly meetings set vs. quota, pipeline generated, conversion rate from meeting to opportunity, and prospecting methodology",
    topTools: "Outreach, Salesloft, Apollo, ZoomInfo, LinkedIn Sales Navigator, Gong Engage",
  },
];

export default async function SalesResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-16";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Sales Resume — Examples, Skills & ATS Tips (2025)"
        description="Write a sales resume that quantifies quota performance and passes ATS — with real before/after examples."
        url={`${BASE_URL}/blog/sales-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Sales Resume", url: `${BASE_URL}/blog/sales-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume · Sales</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Sales Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Sales hiring managers look at one thing first: quota attainment. Then deal size, sales cycle, and pipeline metrics. Here&apos;s how to show all four with specificity — with real before/after examples for SDRs, AEs, and sales managers.
          </p>
        </div>
      </section>

      {/* What They Read For */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What sales hiring managers read for</h2>
          <div className="mt-8 space-y-5">
            {WHAT_THEY_READ_FOR.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{item.signal}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Red flag</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.redFlag}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong example</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.strongExample}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet Transformations */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before & after: bullet rewrites by role</h2>
          <div className="mt-8 space-y-6">
            {BULLET_TRANSFORMATIONS.map((item) => (
              <div key={item.level} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{item.level}</p>
                </div>
                <div className="grid gap-0 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">Before</p>
                    <p className="rounded-lg bg-red-50 p-3 text-[13px] italic text-[var(--muted)]">&ldquo;{item.before}&rdquo;</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">After</p>
                    <p className="rounded-lg bg-emerald-50 p-3 text-[13px] italic text-[var(--muted)]">&ldquo;{item.after}&rdquo;</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-[var(--brand)]">What changed: </span>{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Sales Motion */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords by sales motion</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">SMB, mid-market, enterprise, and BDR roles are evaluated on entirely different signals. Use the language of the motion you&apos;re applying into.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {BY_SALES_MOTION.map((motion) => (
              <div key={motion.motion} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{motion.motion}</h3>
                <div className="mt-4 space-y-3 text-[13px] text-[var(--muted)]">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Lead with</p>
                    <p className="leading-6">{motion.emphasis}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Key ATS terms</p>
                    <p className="leading-6">{motion.atsKeywords}</p>
                  </div>
                  <div className="rounded-lg bg-[var(--brand)]/[0.05] p-3">
                    <p className="font-semibold text-[var(--brand)]">Top tools: {motion.topTools}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Optimize your sales resume for ATS and interviews.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your sales resume against the specific job description — finds missing quota metrics and keywords, rewrites weak bullets, and prepares you for the sales interview. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
