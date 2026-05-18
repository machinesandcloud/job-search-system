import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get a Job at Airbnb — Interview Process & Tips (2025)",
  description:
    "Airbnb is known for its 'Belong Anywhere' mission, design-forward culture, and cross-functional engineering teams. Their interview process is different from FAANG — here's the full breakdown, what they look for, and how to prepare.",
  keywords: ["how to get a job at airbnb", "airbnb interview process", "airbnb software engineer interview", "airbnb hiring", "airbnb engineering culture", "working at airbnb 2025", "airbnb career tips"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-airbnb" },
  openGraph: {
    title: "How to Get a Job at Airbnb — Interview Process & Tips (2025)",
    description: "Airbnb's design culture, 'Belong Anywhere' mission, and cross-functional teams shape their hiring. Full breakdown.",
    url: "/blog/how-to-get-a-job-at-airbnb",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const AIRBNB_DIFFERENTIATORS = [
  { signal: "Mission alignment — 'Belong Anywhere' is real", detail: "Airbnb's mission is unusually central to their culture — Belong Anywhere isn't marketing language, it shapes product decisions, hiring criteria, and how teams make trade-offs. Interviewers specifically probe whether you understand and care about building products that create belonging: accessibility, inclusion, trust and safety, and the host-guest relationship. Candidates who approach Airbnb as 'just another tech company' miss the culture signal." },
  { signal: "Design thinking and cross-functional craft", detail: "Airbnb is known as one of the most design-forward tech companies — their engineering culture reflects this. Engineers are expected to care about the product experience, collaborate deeply with designers, and have opinions about how things should feel to users. Interview questions often probe how you've worked with design, how you think about user experience trade-offs, and what you care about beyond technical correctness." },
  { signal: "Host and guest ecosystem thinking", detail: "Airbnb's business involves a two-sided marketplace — hosts and guests with sometimes conflicting needs. Technical decisions (trust and safety systems, pricing algorithms, search ranking) all navigate this tension. Interviewers probe whether candidates understand marketplace dynamics, can reason about trade-offs that affect both sides, and have thought about the trust, safety, and economic implications of technical choices." },
  { signal: "Strong emphasis on collaboration and humility", detail: "Airbnb's culture values collaborative, low-ego working styles. Behavioral questions specifically probe for how you work through disagreement, how you receive feedback, and how you support other people's success. Candidates who come across as individually focused or who struggle to articulate how they've made other people better tend not to progress." },
];

const INTERVIEW_STAGES = [
  { stage: "1. Recruiter screen", what_happens: "Standard background, motivation, and compensation screen. Airbnb recruiters specifically probe for mission alignment — why Airbnb, not just why this role or this level of company.", how_to_prepare: "Have a genuine answer to 'why Airbnb' that goes beyond 'it's a great company.' Specific product experience as a host or guest, genuine interest in marketplace dynamics, or care about the belonging mission are all authentic anchors." },
  { stage: "2. Technical phone screen", what_happens: "Coding problem at LeetCode medium difficulty. Similar to other FAANG — focused on problem-solving process and code quality.", how_to_prepare: "Standard LeetCode medium prep. Practice thinking out loud. Airbnb coders tend to value clean, readable code over extremely optimized solutions — clarity matters." },
  { stage: "3. Virtual on-site (4-5 rounds)", what_happens: "2 coding rounds, 1 system design round (marketplace-relevant — often two-sided marketplace architecture, search ranking, or trust and safety systems), 1 cross-functional/culture round, sometimes 1 host/guest thinking round.", how_to_prepare: "For system design: practice designing marketplace systems (search, booking flow, pricing, trust and safety). For culture: deep STAR story prep on collaboration, feedback, and 'belong anywhere' values. Research Airbnb's product decisions — be ready to discuss what you admire and what you'd improve." },
  { stage: "4. Offer and negotiation", what_happens: "Airbnb offers are competitive but equity-heavy — RSUs with 4-year vesting on a public company. Total comp is competitive with FAANG but base salaries are sometimes slightly below Google or Meta equivalents, compensated by equity.", how_to_prepare: "If equity concentration is a concern (all Airbnb), be ready to discuss. Competing offers from FAANG are the strongest leverage. Focus negotiation on signing bonus (often the most flexible component at Airbnb) and RSU grant size." },
];

const FAQS = [
  { question: "Is Airbnb still a good place to work after COVID impacted their business?", answer: "Yes — Airbnb rebounded strongly post-COVID and has been consistently profitable since 2022. The company went public in December 2020 at a significant valuation, and travel demand recovered. Engineering teams are working on core product improvements (search, AI personalization, trust and safety, pricing) and expansion into new categories. The culture and mission alignment remain intact, and the company is financially stable, which makes it a legitimate FAANG-tier career destination." },
  { question: "Do I need to have used Airbnb as a host or guest?", answer: "Not required, but genuine experience makes your answers more authentic. 'I traveled to X on Airbnb and noticed that...' is more compelling than abstract product feedback. If you haven't used the platform, research deeply: read Airbnb's product blog, watch their design talks, and understand the host-guest relationship from both sides. Interviewers can tell the difference between researched preparation and genuine familiarity — authentic experience with the product is a meaningful advantage." },
  { question: "How does Airbnb compare to other travel/tech companies like Booking.com or Expedia?", answer: "Airbnb's engineering culture is closer to FAANG than to traditional travel companies. The technical bar is comparable to Meta or Stripe — LeetCode prep applies. The culture emphasis (design, mission, belonging) is more distinctive than Booking.com or Expedia, which have more traditional corporate cultures. If you're deciding between Airbnb and a traditional travel tech company, the difference is significant: Airbnb operates like a top-tier tech company; traditional travel companies are closer to enterprise software culture." },
];

export default async function HowToGetAJobAtAirbnbPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Get a Job at Airbnb — Interview Process & Tips (2025)" description="Airbnb's design culture, 'Belong Anywhere' mission, and cross-functional teams shape their hiring. Full breakdown." url={`${BASE_URL}/blog/how-to-get-a-job-at-airbnb`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job at Airbnb", url: `${BASE_URL}/blog/how-to-get-a-job-at-airbnb` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Airbnb</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Get a Job at Airbnb</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">Belong Anywhere mission, design-forward culture, and marketplace systems thinking. Airbnb hires differently than FAANG — here&apos;s the full process breakdown.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={6600} suffix="+" label="Airbnb employees globally (2025)" accent="#FF5A5F" />
            <StatCard value={4} label="Cultural differentiators that shape Airbnb's hiring vs pure-tech FAANG" accent="#7C3AED" />
            <StatCard value={5} label="Interview stages with a dedicated culture and cross-functional round" accent="#D97706" />
            <StatCard value={7} suffix="M+" label="Active listings on Airbnb — the marketplace context for system design" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Airbnb looks for beyond technical skills</h2>
          <div className="mt-6 space-y-4">
            {AIRBNB_DIFFERENTIATORS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF5A5F]/10 text-[13px] font-bold text-[#FF5A5F]">{i + 1}</span>
                <div><p className="font-bold text-[var(--ink)]">{item.signal}</p><p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Airbnb&apos;s interview process — stage by stage</h2>
          <div className="mt-6 space-y-4">
            {INTERVIEW_STAGES.map((stage) => (
              <div key={stage.stage} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3"><p className="font-bold text-[var(--ink)]">{stage.stage}</p></div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">What happens</p><p className="text-[13px] leading-6 text-[var(--muted)]">{stage.what_happens}</p></div>
                  <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">How to prepare</p><p className="text-[13px] leading-6 text-[var(--muted)]">{stage.how_to_prepare}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (<div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5"><p className="font-bold text-[var(--ink)]">{faq.question}</p><p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for an Airbnb interview? Zari coaches the full process.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari preps you for Airbnb&apos;s mission alignment questions, marketplace system design (search, booking, trust and safety), and behavioral coaching for their cross-functional culture round.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
