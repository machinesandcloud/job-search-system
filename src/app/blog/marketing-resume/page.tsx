import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "Marketing hiring managers scan for two things fast: channel ownership (what did you run, not what you supported) and revenue or growth metrics that prove those channels worked. Most marketing resumes list tactics. The ones that get callbacks show the numbers those tactics drove. Before/after examples by marketing track.",
  keywords: ["marketing resume", "marketing resume examples", "digital marketing resume", "marketing manager resume", "content marketing resume", "growth marketing resume", "marketing ATS keywords 2025", "marketing resume template"],
  alternates: { canonical: "/blog/marketing-resume" },
  openGraph: {
    title: "Marketing Resume — Examples, Skills & ATS Tips (2025)",
    description: "Marketing resumes that get callbacks show channel ownership and the revenue or growth metrics those channels drove. Before/after examples by marketing track with ATS keyword strategy.",
    url: "/blog/marketing-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What metrics should a marketing professional include on their resume?",
    answer: "The metrics vary by function: for demand generation and paid media, use cost per lead (CPL), cost per acquisition (CPA), ROAS, and pipeline generated. For content marketing, use organic traffic growth, lead volume from content, and keyword ranking improvements. For email marketing, use list size, open rates relative to benchmark, click-through rate, and revenue attributed. For brand and growth, use MoM/YoY revenue growth, market share, and NPS. For social media, engagement rate and follower growth are weaker signals than conversions and traffic driven — lead with downstream metrics if available.",
  },
  {
    question: "Should I include a portfolio link on my marketing resume?",
    answer: "Yes — for content marketing, brand marketing, and creative roles, a portfolio link is expected and its absence is noted. For demand gen, paid media, and analytics roles, it's less critical but a link to a relevant case study or campaign results deck adds credibility. Keep the portfolio link in your resume header alongside your LinkedIn URL. Make sure the linked content is current, loads quickly, and shows results alongside the work itself — design without performance data is incomplete for a marketing portfolio.",
  },
  {
    question: "How do I write a marketing resume if I've mostly done 'brand' or 'creative' work with few hard metrics?",
    answer: "Brand and creative work generates softer metrics but those metrics still count: brand awareness lift (pre/post study), unaided recall, share of voice, press coverage impressions, social sentiment improvement, NPS/CSAT improvement, and website traffic growth. If your company tracked any of these — and most brand teams do — use them. If truly no metrics exist, describe scale and complexity: 'Led rebranding campaign for a 200,000-customer B2C brand reaching audiences across 12 markets' is stronger than 'led rebranding campaign,' even without a conversion metric.",
  },
  {
    question: "What's the difference between a demand gen resume and a growth marketing resume?",
    answer: "Demand gen resumes focus on top-of-funnel: MQLs, pipeline generated, paid media management, ABM programs, webinars, and sales-marketing alignment. Growth marketing resumes focus on the full funnel: acquisition, activation, retention, referral, and revenue — often with a product-led or experimental emphasis. Growth marketers are expected to run experiments, build dashboards, and work closely with product and data. If you're applying to growth roles, show A/B testing rigor, analytical tool proficiency (Amplitude, Mixpanel, SQL), and cross-functional product/marketing work.",
  },
];

const BEFORE_AFTERS = [
  {
    role: "Content Marketing Manager",
    color: "#0D7182",
    before: "Created blog content and managed social media channels to increase brand awareness and drive traffic.",
    after: "Built content program from 0 — grew organic blog traffic from 2,400 to 41,000 monthly sessions in 18 months through 140-piece content calendar aligned to bottom-of-funnel keywords; content attributed to 28% of total MQLs in Q4, converting at 3.1% vs. 1.8% paid average.",
    insight: "Content marketing bullets need: a starting baseline, the growth achieved, a timeframe, and the business outcome (MQL contribution, conversion rate). 'Increased brand awareness' is immeasurable — 'attributed to 28% of MQLs' is a pipeline impact claim any CMO will read.",
  },
  {
    role: "Paid Media / Demand Generation Manager",
    color: "#7C3AED",
    before: "Managed Google Ads and LinkedIn campaigns. Optimized bids and targeting to improve ROI. Worked with content team to create ad assets.",
    after: "Managed $1.2M annual paid media budget across Google, LinkedIn, and Meta — reduced blended CPL from $312 to $187 (40% improvement) over 6 months through audience segmentation testing and landing page optimization. Scaled monthly MQL volume 2.3× while holding CPA flat at $812.",
    insight: "Paid media resumes need: total budget managed (the dollar figure), the specific channels, a before/after efficiency metric (CPL or CPA), and scale achieved. 'Improved ROI' is not a metric — 'reduced CPL 40%' is.",
  },
  {
    role: "Growth Marketing Manager",
    color: "#F97316",
    before: "Led growth initiatives across multiple channels. Ran A/B tests and used data to improve marketing performance.",
    after: "Led growth team of 3 across acquisition and lifecycle — built experiment program running 4–6 concurrent A/B tests/month; highest-impact test (email subject line + send-time optimization) lifted trial-to-paid conversion from 22% to 31%, contributing $1.8M incremental ARR in one quarter.",
    insight: "Growth marketing resumes need to show experimental rigor (cadence of tests), team ownership, and a breakthrough result tied to a business outcome. 'Ran A/B tests' is present in every growth resume — the specific test, the lift, and the ARR contribution is what differentiates.",
  },
  {
    role: "Brand Marketing Director",
    color: "#059669",
    before: "Led brand strategy and managed agency relationships. Oversaw creative development and brand guidelines across channels. Improved brand perception among target audiences.",
    after: "Directed brand strategy for a $280M B2C consumer brand (3 agency partners, $8.5M annual brand spend) — led repositioning campaign targeting 25–44 female demographic; brand tracking study showed 14-point increase in unaided awareness and 19-point lift in purchase intent over 12-month campaign period. Campaign drove 11% YoY revenue growth in target segment.",
    insight: "Brand director resumes need: budget owned, agency scope, campaign objective with target audience, and a brand tracking or business outcome metric. 'Improved brand perception' with no number is a claim — '14-point awareness lift from brand study' is evidence.",
  },
];

const ATS_KEYWORDS = [
  {
    category: "Channels & Tactics",
    keywords: ["SEO / SEM", "Paid search", "Paid social", "Programmatic", "Email marketing", "Content marketing", "Affiliate marketing", "Influencer marketing", "ABM (Account-Based Marketing)", "Webinars", "Events marketing", "Product-led growth"],
  },
  {
    category: "Analytics & Tools",
    keywords: ["Google Analytics 4", "HubSpot", "Salesforce", "Marketo", "Pardot", "Amplitude", "Mixpanel", "Looker", "Tableau", "SQL", "Semrush", "Ahrefs", "Google Ads", "Meta Ads Manager", "LinkedIn Campaign Manager"],
  },
  {
    category: "Metrics & KPIs",
    keywords: ["MQL", "SQL", "Pipeline generated", "CAC", "LTV", "ROAS", "CPL", "CPA", "Conversion rate", "Organic traffic", "Open rate", "CTR", "NPS", "Share of voice", "ARPU"],
  },
  {
    category: "Strategy & Leadership",
    keywords: ["Go-to-market strategy", "Brand strategy", "Demand generation", "Growth marketing", "Customer acquisition", "Lifecycle marketing", "Retention marketing", "Campaign management", "Marketing attribution", "A/B testing"],
  },
];

export default async function MarketingResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Marketing Resume — Examples, Skills & ATS Tips (2025)"
        description="Before/after examples by marketing track — content, paid media, growth, and brand — with ATS keyword strategy and the metric-level specificity that gets callbacks."
        url={`${BASE_URL}/blog/marketing-resume`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Marketing Resume", url: `${BASE_URL}/blog/marketing-resume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">Marketing Resume</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">Marketing hiring managers scan for channel ownership and the revenue or growth metrics those channels drove. Most marketing resumes list tactics. The ones that get callbacks show the numbers those tactics produced.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>10 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What marketing hiring managers scan for</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Marketing resumes get filtered by ATS on tool names and channel keywords — but what passes the ATS still has to pass a human reader who knows marketing. The fastest-reject patterns: listing every tool ever used with no evidence of results, describing marketing activities without outcomes, and using the word &ldquo;managed&rdquo; for campaigns you supported rather than owned.
            </p>
            <div className="mt-5 space-y-3">
              {[
                { signal: "Channel ownership — not participation", detail: "'Supported paid social campaigns' is different from 'Owned $400K annual Facebook/Instagram budget.' Marketing hiring managers read for the degree of ownership. Use 'owned,' 'managed,' 'led' for things you controlled. Use 'supported,' 'assisted,' 'contributed to' for things you didn't. Mixing these signals poor self-awareness." },
                { signal: "Revenue and pipeline impact", detail: "Marketing exists to drive revenue. The strongest resumes connect marketing activity to a business outcome: MQLs generated, pipeline contributed, revenue attributed, CAC reduced. If you have access to these numbers — and most marketing professionals do — use them. They're the fastest way to separate your resume from everyone else's." },
                { signal: "Tool and channel specificity", detail: "ATS systems in marketing organizations filter heavily on tool names. HubSpot, Salesforce, Marketo, Pardot, Google Analytics, Amplitude, Looker, Semrush, Ahrefs — these are filtered before a human reads. List the exact tool names from your experience. 'Marketing automation platform' is weaker than 'Marketo and HubSpot' for both ATS and human readers." },
                { signal: "Budget scale (for mid-senior roles)", detail: "For manager-level and above: include total budget managed. '$1.2M annual paid media budget' or '$8.5M brand spend' contextualizes the scope of your accountability immediately. A marketing manager who managed $50K in spend and one who managed $5M in spend are different roles — make the scale clear." },
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
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Before and after: by marketing track</h2>
            <div className="mt-6 space-y-6">
              {BEFORE_AFTERS.map(item => (
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
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">ATS keywords by marketing category</h2>
            <div className="mt-5 space-y-4">
              {ATS_KEYWORDS.map(group => (
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
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Get your marketing resume ATS-optimized</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari analyzes your marketing resume against the specific job description — identifies missing tool and channel keywords, rewrites tactic-focused bullets to show measurable business impact, and calibrates your resume for the specific marketing function you&apos;re targeting.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Optimize my marketing resume →
            </Link>
          </section>

        </div>
      </article>
    </PageFrame>
  );
}
