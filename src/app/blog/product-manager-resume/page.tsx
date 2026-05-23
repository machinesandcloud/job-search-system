import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Product Manager Resume — Examples, Templates & ATS Tips (2025)",
  description:
    "What hiring managers at Google, Meta, and top-tier companies look for in a PM resume — by company stage, career level, and PM type. With before/after bullet examples and ATS keyword strategy.",
  keywords: ["product manager resume", "PM resume", "product manager resume examples", "product manager resume template", "how to write a product manager resume", "product manager resume 2025"],
  alternates: { canonical: "/blog/product-manager-resume" },
  openGraph: {
    title: "Product Manager Resume — Examples, Templates & ATS Tips (2025)",
    description: "What PM hiring managers actually read for — by company stage and PM type — with before/after bullet examples and ATS keyword strategy.",
    url: "/blog/product-manager-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_HIRING_MANAGERS_READ_FOR = [
  {
    signal: "Impact at scale",
    whatTheyWant: "Not 'launched X feature' but 'launched X feature that increased DAU by 18% and reduced churn by 12%.' PMs are expected to own business outcomes, not delivery. A resume full of launches with no metrics reads as a contributor, not an owner.",
    redFlag: "'Collaborated on,' 'helped drive,' 'worked with engineering to' — these phrases signal supporting roles, not ownership. Remove the hedging.",
    whatToWrite: "Lead with the metric. 'Grew checkout completion rate from 61% to 74% by redesigning the payment step with progressive disclosure — drove $4.2M incremental annual revenue.'",
  },
  {
    signal: "Cross-functional leadership without authority",
    whatTheyWant: "PMs don't manage engineers — they influence them. Hiring managers look for evidence that you can align design, engineering, data science, legal, and marketing toward a shared goal without any of them reporting to you. This is the core PM skill and it's rarely shown explicitly on resumes.",
    redFlag: "Bullet points that could have been written by an engineer or designer — no mention of alignment, trade-offs, stakeholder management, or org navigation.",
    whatToWrite: "'Led alignment across 8 engineering teams, 3 design leads, and legal on privacy feature shipped to 200M users — negotiated scope against competing Q3 roadmap priorities to hit compliance deadline.'",
  },
  {
    signal: "Discovery and customer evidence",
    whatTheyWant: "Evidence that you talk to customers, synthesize qualitative and quantitative data, and derive decisions from evidence rather than intuition alone. Senior PMs show they know why a product decision was right, not just that it shipped.",
    redFlag: "No mention of user research, A/B testing, data analysis, or any signal that decisions were validated before or after ship. Looks like feature factory PM work.",
    whatToWrite: "'Ran 23 user interviews and analyzed 3 months of session recordings to identify drop-off in onboarding — insights drove redesign that cut time-to-first-value from 11 days to 4.'",
  },
  {
    signal: "Prioritization under constraint",
    whatTheyWant: "The PM's core job is saying no intelligently. Hiring managers want evidence you operate in resource-constrained environments, make trade-offs explicitly, and communicate them to stakeholders. Unlimited resources and unlimited time is not PM experience.",
    redFlag: "A list of everything you shipped with no mention of what you didn't ship or why. Absence of trade-offs on a PM resume suggests either a junior candidate or someone who's never had to make hard calls.",
    whatToWrite: "'Reduced Q4 roadmap scope by 40% in response to 30% engineering bandwidth reduction — cut 3 lower-ROI features after stakeholder alignment sessions, protecting highest-revenue initiative.'",
  },
];

const BY_COMPANY_STAGE = [
  {
    stage: "Early-stage startup (Series A–B)",
    emphasis: "Generalist range and 0-to-1 experience",
    whatTheyHire: "PMs who can do everything — write specs, do customer discovery, sit in support, define pricing strategy, and ship without a design system. They're hiring a co-builder, not a process owner.",
    resumeStrategy: "Lead with breadth. Show you've worked across the full product lifecycle — not just feature delivery. Highlight founding-team experience, 0-to-1 products, revenue ownership, and anything you built with a small team.",
    avoidOnResume: "Corporate process language ('roadmap ceremonies', 'sprint retrospectives', 'OKR alignment cycles'). Startups read that as process-heavy and unscalable for a 10-person team.",
    keywordsToInclude: ["0-to-1 product development", "customer discovery", "product-market fit", "cross-functional ownership", "revenue growth"],
  },
  {
    stage: "Growth-stage startup (Series C–D)",
    emphasis: "Scaling existing products with data discipline",
    whatTheyHire: "PMs who can grow — run rigorous A/B tests, build growth loops, work with data scientists, and operate in ambiguity while moving fast. The product exists; they need someone to make it bigger.",
    resumeStrategy: "Lead with growth metrics and experimentation rigor. Show DAU/MAU growth, funnel optimization results, A/B test programs you ran, and evidence of data-driven decision-making at scale.",
    avoidOnResume: "Strategy-heavy bullets with no execution evidence. Growth PMs are judged on output velocity and metric movement, not beautifully written PRDs.",
    keywordsToInclude: ["A/B testing", "conversion optimization", "growth loops", "funnel analysis", "DAU/MAU growth", "experimentation"],
  },
  {
    stage: "FAANG / Big Tech (L5–L7 PM levels)",
    emphasis: "Strategic thinking, stakeholder complexity, and scaled impact",
    whatTheyHire: "PMs who can operate in a complex org — navigate politics, lead without authority across large engineering orgs, and own product strategy on something that affects hundreds of millions of users.",
    resumeStrategy: "Show scale explicitly. Numbers with many zeros. Cross-org alignment. Strategy ownership, not just execution. Evidence of technical depth — enough to earn engineering trust. Leadership without authority on a large team.",
    avoidOnResume: "Startup-style bullets that emphasize scrappiness or breadth. FAANG PMs are expected to go deep in their domain. Generalist positioning reads as unfocused for L5+.",
    keywordsToInclude: ["product strategy", "cross-functional alignment", "technical product management", "0 to 1 to N scaling", "stakeholder management", "platform thinking"],
  },
  {
    stage: "Enterprise SaaS",
    emphasis: "Customer obsession, sales partnership, and GTM coordination",
    whatTheyHire: "PMs who understand enterprise buyers — long sales cycles, procurement, champions vs. economic buyers, and the gap between what gets sold and what gets used. They need someone who bridges product and sales.",
    resumeStrategy: "Show customer-facing work. Advisory boards, customer calls, design partner programs. Metrics around NPS, churn, renewal rate, and expansion ARR. Evidence of working closely with sales and customer success.",
    avoidOnResume: "Consumer-focused framing. Enterprise PMs deal with MSAs, compliance requirements, and CISO sign-offs — consumer startup experience reads as a mismatch unless translated explicitly.",
    keywordsToInclude: ["enterprise product management", "B2B SaaS", "renewal rate", "NPS improvement", "customer advisory board", "churn reduction"],
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "APM / Junior PM",
    before: "Worked on improving the onboarding flow with the design team.",
    after: "Redesigned onboarding flow in collaboration with 2 designers and 4 engineers — reduced median time-to-activation from 9 days to 3 days, improving 30-day retention by 11%.",
    whatMakesDifferent: "Specific team size, a metric that matters (time-to-activation), and the downstream retention impact. Junior PMs often write process bullets — 'worked on' — when outcome bullets are both more accurate and more impressive.",
  },
  {
    level: "Mid-level PM (4–7 years)",
    before: "Led the redesign of the search experience to improve user satisfaction.",
    after: "Owned search experience end-to-end for 40M monthly users — defined success metrics, led a 6-month roadmap with 3 engineering squads, shipped 4 sequential experiments that moved search satisfaction score from 61% to 78%.",
    whatMakesDifferent: "Scale (40M users), org complexity (3 squads), timeline discipline (6-month roadmap), and experimentation framing. Mid-level PMs should show they operate at scale and lead a process, not just ship a feature.",
  },
  {
    level: "Senior PM (7–12 years)",
    before: "Drove product strategy for the payments platform and launched several new features.",
    after: "Owned payments product strategy across 8 markets — defined 3-year roadmap, gained exec alignment across CFO, Payments VP, and Engineering VP, shipped regulatory compliance feature that enabled market entry in EU (projected $120M TAM).",
    whatMakesDifferent: "Strategy framing, stakeholder level (CFO, VPs), business outcome (market entry), and revenue framing. Senior PM bullets should make the business case for why the work mattered — not just that it was completed.",
  },
];

const ATS_KEYWORDS_BY_TYPE = [
  {
    pmType: "Consumer / B2C PM",
    topKeywords: ["user growth", "engagement metrics", "DAU/MAU", "A/B testing", "conversion optimization", "product-led growth", "user research", "NPS", "funnel optimization", "mobile product"],
  },
  {
    pmType: "Platform / Infrastructure PM",
    topKeywords: ["API design", "developer experience", "platform strategy", "internal tooling", "reliability metrics", "SLA ownership", "technical product management", "SDK", "platform adoption"],
  },
  {
    pmType: "Data / ML PM",
    topKeywords: ["machine learning products", "AI feature development", "data products", "model evaluation", "feature engineering", "experimentation infrastructure", "data quality", "ML pipeline"],
  },
  {
    pmType: "B2B / Enterprise PM",
    topKeywords: ["enterprise SaaS", "B2B product management", "customer success", "ARR growth", "churn reduction", "procurement", "compliance", "integration strategy", "partner management"],
  },
];

const FAQS = [
  {
    question: "How long should a product manager resume be?",
    answer: "One page for 0–5 years of PM experience. Two pages is acceptable at 7+ years when you have meaningfully different roles to show — not as padding for the same role at a larger company. The standard advice to keep it to one page collapses at senior levels because the scope of work, org context, and impact genuinely can't be conveyed in one page. The rule: every line must earn its space with a metric or insight that a hiring manager would lose if you cut it."
  },
  {
    question: "Should a PM resume include a summary section?",
    answer: "Only if the summary says something specific. 'Experienced PM passionate about building user-centric products' says nothing and wastes 3 lines. A good PM summary works when you're making a transition (establishing your new direction), targeting a specific PM niche (growth, platform, B2B), or summarizing a genuinely distinctive career story in 2–3 sentences that the rest of the resume proves. If your summary could apply to any PM, cut it and use those lines for another bullet."
  },
  {
    question: "What skills should a product manager put on a resume?",
    answer: "Split skills into functional (A/B testing, user research, roadmap planning, SQL, product analytics) and tools (Figma, Amplitude, Mixpanel, JIRA, Looker, dbt). Don't list 'communication' or 'leadership' — those belong in bullets, not a skills list. For ATS: list the specific analytics tools, research methods, and PM frameworks (Jobs-to-Be-Done, RICE prioritization, opportunity scoring) that match the job description's language."
  },
  {
    question: "How do I show impact on a PM resume without engineering or data science skills?",
    answer: "Impact on a PM resume comes from business outcomes, not technical execution. You own the 'what' and 'why' — the metric that improved, the revenue generated, the churn reduced, the market entered. You don't need to be able to code to claim 'drove 23% MAU growth' — that outcome happened because you defined the right problem, prioritized the right solution, and led the team to ship it. Frame your bullets around the business outcome you influenced, not the technical work you observed."
  },
];

export default async function ProductManagerResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Product Manager Resume — Examples, Templates & ATS Tips (2025)"
        description="What PM hiring managers actually read for — by company stage and PM type — with before/after bullet examples and ATS keyword strategy."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/product-manager-resume`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Product Manager Resume", url: `${BASE_URL}/blog/product-manager-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</span>
            <span className="text-[11px] text-white/30">13 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Product manager resume<br /><span className="gradient-text-animated">what hiring managers read for</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            PM resumes get filtered by the same ATS systems as every other role — but what survives the ATS gets read by a PM hiring manager who knows exactly what good looks like. Here&apos;s what they&apos;re checking, by company stage, PM type, and career level.
          </p>
        </div>
      </section>

      {/* What hiring managers read for */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 signals every PM hiring manager reads for</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">These are the make-or-break signals — the ones that cause a PM resume to advance or get passed.</p>
          <div className="mt-8 space-y-5">
            {WHAT_HIRING_MANAGERS_READ_FOR.map((item) => (
              <div key={item.signal} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{item.signal}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What they want to see</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.whatTheyWant}</p>
                  </div>
                  <div className="bg-red-50/40 px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-600">Red flag on your resume</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.redFlag}</p>
                  </div>
                  <div className="bg-emerald-50/40 px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">What to write instead</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)] italic">&ldquo;{item.whatToWrite}&rdquo;</p>
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
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before and after: PM bullets by career level</h2>
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
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What makes the difference</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.whatMakesDifferent}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By company stage */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">PM resume strategy by company stage</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">What reads as strong at a startup can read as weak at FAANG and vice versa. Adapt your framing to where you&apos;re applying.</p>
          <div className="mt-7 space-y-5">
            {BY_COMPANY_STAGE.map((item) => (
              <div key={item.stage} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{item.stage}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--muted)]">{item.emphasis}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What they hire for</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.whatTheyHire}</p>
                  </div>
                  <div className="grid gap-0 md:grid-cols-2 md:divide-x divide-[var(--border)] divide-y md:divide-y-0">
                    <div className="bg-[var(--brand)]/[0.03] px-6 py-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Resume strategy</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{item.resumeStrategy}</p>
                    </div>
                    <div className="bg-red-50/30 px-6 py-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Avoid on resume</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{item.avoidOnResume}</p>
                    </div>
                  </div>
                  <div className="px-6 py-3">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">ATS keywords to include</p>
                    <div className="flex flex-wrap gap-2">
                      {item.keywordsToInclude.map((kw) => (
                        <span key={kw} className="rounded-full bg-[var(--bg)] border border-[var(--border)] px-3 py-1 text-[11px] text-[var(--muted)]">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS keywords by type */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">ATS keywords by PM type</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">ATS systems match your resume against the job description. These are the terms most commonly searched — include them naturally in your experience bullets.</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {ATS_KEYWORDS_BY_TYPE.map((item) => (
              <div key={item.pmType} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)] mb-3">{item.pmType}</p>
                <div className="flex flex-wrap gap-2">
                  {item.topKeywords.map((kw) => (
                    <span key={kw} className="rounded-full bg-white border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--muted)]">{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">PM resume FAQs</h2>
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
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your PM resume scored and rewritten for ATS.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your PM resume against the specific job description — identifies missing keywords, rewrites weak bullets, and checks ATS formatting. First optimization free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Optimize my resume free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
