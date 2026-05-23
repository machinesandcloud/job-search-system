import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Manager Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "What CMOs and hiring managers read for in a marketing manager resume — by channel specialization, career level, and company type. With before/after bullet examples, skills section strategy, and the ATS keywords that separate finalists from filtered-out applicants.",
  keywords: ["marketing manager resume", "marketing resume", "marketing manager resume examples", "marketing resume template", "marketing resume skills", "digital marketing manager resume"],
  alternates: { canonical: "/blog/marketing-manager-resume" },
  openGraph: {
    title: "Marketing Manager Resume — Examples, Skills & ATS Tips (2025)",
    description: "What CMOs read for in a marketing manager resume — by specialization and level — with before/after bullet examples and ATS keyword strategy.",
    url: "/blog/marketing-manager-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_CMOS_READ_FOR = [
  {
    signal: "Revenue and pipeline attribution",
    why: "Marketing is increasingly expected to show clear contribution to revenue — not just top-of-funnel metrics like impressions or reach. A resume full of 'launched campaigns' with no revenue or pipeline data reads as a pre-attribution era marketer, regardless of experience level.",
    redFlag: "'Managed social media accounts.' 'Ran email campaigns.' 'Drove brand awareness.' — these bullets describe activity, not outcomes. They're the marketing equivalent of 'wrote code' on an engineering resume.",
    strongExample: "'Generated $2.4M in attributed pipeline through a 6-month content program — 4 pieces ranked page 1 for high-intent keywords, producing 820 MQLs at $34 CAC, 40% below target.'",
  },
  {
    signal: "Channel ownership and depth",
    why: "Marketing hires are often made for channel expertise, not general marketing ability. A hiring manager for a Head of Demand Gen role wants to see deep paid acquisition experience — not a generalist who's touched everything. 'Managed digital marketing' is the weakest possible framing for any specialized role.",
    redFlag: "Shallow breadth across many channels with no depth in any. A resume that lists SEO, paid social, email, events, and content marketing equally suggests junior tactical execution rather than strategic ownership of any channel.",
    strongExample: "'Owned full-funnel paid search strategy for B2B SaaS — managed $1.2M annual budget across Google and LinkedIn, optimized from $180 CPL to $94 CPL over 8 months, scaling MQL volume 3.4× with flat spend.'",
  },
  {
    signal: "Team and budget scale",
    why: "Marketing leadership roles require demonstrated management experience. The specific size matters: leading a team of 3 reads differently than leading a team of 12 with 3 direct reports and agency relationships. Budget scale signals seniority — a manager who's run $50K campaigns is different from one who's run $5M.",
    redFlag: "No mention of team size, budget managed, or agency/vendor oversight. For any manager-level role, the absence of these signals is a red flag.",
    strongExample: "'Led a 7-person performance marketing team and $3.2M annual media budget — oversaw agency relationships with 2 creative studios and a paid media agency, consolidated from 4 agencies to 2 saving $180K annually.'",
  },
  {
    signal: "Marketing stack fluency",
    why: "Tools signal depth and match. A demand generation manager who lists HubSpot, Salesforce, and GA4 is legible to a hiring manager evaluating tech stack fit. Someone who lists 'various CRM tools' is not. ATS systems also keyword-match on specific tool names.",
    redFlag: "Vague tool references ('CRM,' 'analytics platform,' 'marketing automation') that don't name the actual tools. These read as tech-shy or as inflated experience with someone else's stack.",
    strongExample: "Skills section: 'HubSpot (Certified), Salesforce, Marketo, Google Analytics 4, Looker, Semrush, Ahrefs, Meta Ads Manager, Google Ads (Certified), Tableau'",
  },
];

const BY_SPECIALIZATION = [
  {
    specialty: "Content / SEO Marketing",
    resumeEmphasis: "Organic traffic growth, keyword rankings, content production volume, DA/authority building, editorial calendar management",
    topMetrics: ["Organic sessions growth % (YoY)", "Keywords ranking on page 1", "MQLs attributed to organic", "Domain authority improvement", "Content production velocity"],
    keyATS: ["SEO strategy", "content marketing", "organic growth", "editorial calendar", "Ahrefs", "Semrush", "keyword research", "link building", "Webflow", "WordPress"],
    seniorSignal: "Show content as a revenue channel — pipeline and MQL attribution, not just traffic. Traffic without conversion reads as vanity metrics to B2B hiring managers.",
  },
  {
    specialty: "Demand Generation / Growth",
    resumeEmphasis: "MQL/SQL volume, CAC optimization, full-funnel conversion rates, A/B test programs, paid + organic channel mix",
    topMetrics: ["MQL volume growth", "CAC (and change over time)", "Pipeline generated ($)", "Conversion rate by funnel stage", "ROAS by channel"],
    keyATS: ["demand generation", "growth marketing", "lead generation", "HubSpot", "Marketo", "A/B testing", "conversion optimization", "paid acquisition", "account-based marketing", "ABM"],
    seniorSignal: "Show closed-loop attribution — not just MQL generation, but MQL-to-SQL and MQL-to-close contribution. Demand gen leaders who can connect their work to revenue win over those who report top-of-funnel.",
  },
  {
    specialty: "Brand & Communications",
    resumeEmphasis: "Campaign reach and share-of-voice, brand perception research, PR coverage volume, media placements, brand NPS or awareness lift",
    topMetrics: ["Share of voice (vs competitors)", "Media mentions / earned coverage", "Brand NPS or awareness lift", "Campaign reach and engagement", "Press placements (tier 1, tier 2)"],
    keyATS: ["brand strategy", "brand management", "communications", "PR", "media relations", "brand positioning", "campaign management", "brand guidelines", "Meltwater", "Cision"],
    seniorSignal: "Brand is harder to tie to revenue — differentiate by showing research-driven positioning decisions, not just creative output. Brand awareness lift measured with pre/post research is compelling.",
  },
  {
    specialty: "Product Marketing",
    resumeEmphasis: "Product launches, win/loss rate improvement, sales enablement impact, competitive positioning, messaging frameworks",
    topMetrics: ["Win rate improvement", "Sales cycle length reduction", "Feature adoption post-launch", "Revenue attributed to launch", "Competitive displacement %"],
    keyATS: ["product marketing", "go-to-market strategy", "product launch", "sales enablement", "competitive intelligence", "positioning", "messaging", "win/loss analysis", "Competitive", "GTM"],
    seniorSignal: "PMM impact is often invisible unless you surface it explicitly. Show win rate data, sales enablement usage rates, or revenue attributed to positioning changes — otherwise you're indistinguishable from a general marketer.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior / IC Marketer",
    before: "Managed the company blog and social media accounts, posting 3× per week.",
    after: "Grew blog organic traffic from 12K to 48K monthly sessions over 14 months — published 2 posts per week targeting high-intent keywords, with 6 pieces ranking page 1 for terms with 2K–8K monthly search volume.",
    fix: "Specificity (12K → 48K, 14 months, 2 posts/week), channel-specific metric (organic sessions), and evidence of strategy (high-intent keyword targeting, page 1 rankings).",
  },
  {
    level: "Marketing Manager",
    before: "Led demand generation efforts including paid search, social, and email marketing.",
    after: "Built and scaled a full-funnel demand gen program from scratch — grew MQL volume from 180/month to 640/month in 11 months while reducing CAC from $310 to $175. Managed $900K annual media budget across Google, LinkedIn, and paid content syndication.",
    fix: "Before/after MQL numbers, CAC improvement, timeline, and budget scale — these are the 4 things a demand gen hiring manager checks first.",
  },
  {
    level: "Senior / Director of Marketing",
    before: "Oversaw the marketing team and drove go-to-market strategy for new product launches.",
    after: "Led 3 major product launches over 18 months as Head of Product Marketing — coordinated cross-functional GTM across sales (40 AEs), CS (12 CSMs), and 3 product squads. Launch-attributed pipeline: $8.4M in first 6 months post-launch.",
    fix: "Scale (3 launches, 18 months), org complexity (cross-functional coordination at specific team sizes), and revenue framing ($8.4M pipeline) — this is how senior marketing leaders communicate impact.",
  },
];

const FAQS = [
  {
    question: "What skills should a marketing manager list on a resume?",
    answer: "Organize marketing skills into three categories: (1) Channel skills — the specific marketing channels you own with depth, named precisely (SEO, paid search, content marketing, email marketing, account-based marketing). (2) Tools — the exact platforms you use, named specifically (HubSpot, Salesforce, Google Analytics 4, Semrush, Meta Ads Manager). (3) Analytical skills — SQL, Looker, Tableau, data analysis, A/B testing, attribution modeling. Don't list 'communication' or 'leadership' in a skills section — those belong in bullets."
  },
  {
    question: "How should a marketing manager quantify impact on a resume?",
    answer: "Use the metric that matters most to the business for each bullet: pipeline generated ($), MQL volume and CAC, organic traffic growth (% and absolute), conversion rate improvement (%), revenue attributed to campaigns, budget managed ($), team size managed (#). If you can't quantify a bullet with a number, ask yourself: how do I know this worked? The answer to that question usually contains the metric."
  },
  {
    question: "What ATS keywords should a marketing manager include?",
    answer: "Mirror the job description's language exactly. Common ATS-filtered terms for marketing manager roles: demand generation, content marketing, SEO, paid acquisition, HubSpot, Marketo, Salesforce, A/B testing, Google Analytics, conversion optimization, marketing automation, lead generation, go-to-market, product marketing, brand strategy. Tools are especially important — name them specifically, not generically. 'Marketing automation' is less ATS-effective than 'HubSpot' if HubSpot is in the job description."
  },
  {
    question: "How long should a marketing manager resume be?",
    answer: "One page for under 7 years of experience. Two pages is appropriate for director-level candidates with meaningfully different roles showing progression. The same editing discipline applies: every line should tell the hiring manager something about your ability to do this specific role. Marketing resumes commonly bloat with campaign lists and platform names — cut anything that doesn't translate to a measurable outcome or a specific skill the job description values."
  },
];

export default async function MarketingManagerResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Marketing Manager Resume — Examples, Skills & ATS Tips (2025)"
        description="What CMOs read for in a marketing manager resume — by specialization and level — with before/after bullet examples and ATS keyword strategy."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/marketing-manager-resume`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Marketing Manager Resume", url: `${BASE_URL}/blog/marketing-manager-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</span>
            <span className="text-[11px] text-white/30">12 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Marketing manager resume<br /><span className="gradient-text-animated">what CMOs actually read for</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Marketing resumes fail in predictable ways: activity bullets without outcomes, vague channel experience without depth, and missing revenue attribution. Here&apos;s what hiring managers are checking — by specialization, career level, and company stage.
          </p>
        </div>
      </section>

      {/* What CMOs read for */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 signals every marketing hiring manager reads for</h2>
          <div className="mt-8 space-y-5">
            {WHAT_CMOS_READ_FOR.map((item) => (
              <div key={item.signal} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{item.signal}</p>
                  <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="bg-red-50/40 px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-600">Red flag on your resume</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.redFlag}</p>
                  </div>
                  <div className="bg-emerald-50/40 px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Strong example</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)] italic">&ldquo;{item.strongExample}&rdquo;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet transformations */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before and after: marketing bullets by career level</h2>
          <div className="mt-7 space-y-5">
            {BULLET_TRANSFORMATIONS.map((item) => (
              <div key={item.level} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] bg-white px-6 py-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#4361EE]">{item.level}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="bg-red-50/30 px-6 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500">Before</p>
                    <p className="text-[13.5px] text-[var(--muted)]">{item.before}</p>
                  </div>
                  <div className="bg-emerald-50/30 px-6 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">After</p>
                    <p className="text-[13.5px] text-[var(--ink)] font-medium">{item.after}</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What made the difference</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By specialization */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Resume strategy by marketing specialization</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Tailor your emphasis and keywords to the channel the role actually owns. Generalist framing loses to specialists in almost every marketing hire.</p>
          <div className="mt-7 space-y-5">
            {BY_SPECIALIZATION.map((item) => (
              <div key={item.specialty} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{item.specialty}</p>
                  <p className="mt-1 text-[13px] text-[var(--muted)]">{item.resumeEmphasis}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="grid gap-0 md:grid-cols-2 md:divide-x divide-[var(--border)] divide-y md:divide-y-0">
                    <div className="px-6 py-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Top metrics to include</p>
                      <ul className="space-y-1.5">
                        {item.topMetrics.map((m) => (
                          <li key={m} className="flex items-start gap-2 text-[12.5px] text-[var(--muted)]">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]" />{m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-6 py-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">ATS keywords</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.keyATS.map((kw) => (
                          <span key={kw} className="rounded-full bg-[var(--bg)] border border-[var(--border)] px-2.5 py-0.5 text-[11px] text-[var(--muted)]">{kw}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-[var(--brand)]/[0.04] px-6 py-3.5">
                    <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-[#4361EE]">Senior signal: </span>{item.seniorSignal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Marketing resume FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your marketing resume scored against the job description.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari checks your resume for ATS keyword gaps, identifies weak bullets, and rewrites them with metrics — specifically for the marketing role you&apos;re targeting. First optimization free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Optimize my resume free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
