import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get a Job at Uber — Interview Process & Tips (2025)",
  description:
    "Uber's marketplace engineering, rider/driver ecosystem thinking, and 'moving the world' mission shape their hiring. Full breakdown of the interview process, what Uber looks for, and how to prepare for the technical and behavioral rounds.",
  keywords: ["how to get a job at uber", "uber interview process", "uber software engineer interview", "uber hiring 2025", "uber engineering culture", "working at uber", "uber career tips"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-uber" },
  openGraph: {
    title: "How to Get a Job at Uber — Interview Process & Tips (2025)",
    description: "Uber's marketplace engineering and two-sided ecosystem thinking shape their hiring differently. Full process breakdown.",
    url: "/blog/how-to-get-a-job-at-uber",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const UBER_DIFFERENTIATORS = [
  { signal: "Marketplace systems at extreme scale", detail: "Uber's engineering fundamentally differs from most FAANG companies — they operate a real-time, two-sided marketplace (riders and drivers) at massive global scale with hard latency requirements (sub-second matching). Technical interviews probe deeply for distributed systems thinking, real-time data architecture, geospatial systems, and the specific trade-offs of marketplace infrastructure. Candidates who've only worked on content platforms or social products often miss the marketplace-specific dimensions." },
  { signal: "Driver and rider ecosystem thinking", detail: "Similar to Airbnb's host/guest balance, Uber's technical decisions must account for both sides of the marketplace. System design questions often involve the rider/driver matching problem, surge pricing design, ETAs and routing, or fraud and safety systems. Interviewers probe whether you think beyond the end-user to the full marketplace — including driver incentives, quality signals, and how trust and safety intersect with operational efficiency." },
  { signal: "Operational intelligence and data engineering", detail: "Uber operates one of the most sophisticated real-time data systems in the world — from dynamic pricing to driver positioning to fraud detection. Their engineering culture values candidates who understand data pipelines, stream processing, and making real-time operational decisions at scale. Interview questions in system design often touch on event streaming (Kafka), geospatial indexing (S2/H3), and the engineering behind pricing and ETA models." },
  { signal: "The 'Brilliant Jerk' culture shift", detail: "Uber's culture has changed significantly post-Travis Kalanick — they explicitly moved away from the 'brilliant jerk' model toward a more collaborative, values-driven culture. Behavioral rounds specifically probe for how you handle conflict, how you work across teams, and how you've navigated high-pressure situations without cutting corners. Candidates who present as high-ego or dismissive of process typically don't advance, regardless of technical strength." },
];

const INTERVIEW_STAGES = [
  { stage: "1. Recruiter screen", what_happens: "Standard background, compensation, and motivation screen. Uber recruiters probe for genuine interest in marketplace engineering and understand whether you have experience with scale or real-time systems.", how_to_prepare: "Be specific about what draws you to Uber's technical challenges — marketplace dynamics, real-time systems, or global scale. Generic answers about 'impact' don't differentiate. Specific product or engineering curiosity does." },
  { stage: "2. Technical phone screen", what_happens: "One coding problem (typically LeetCode medium to hard difficulty, with emphasis on data structures, graph algorithms, or simulation problems). Sometimes includes a behavioral question at the end.", how_to_prepare: "Graph algorithms are disproportionately common at Uber because routing and mapping are core to the product. Breadth-first search, shortest path algorithms, and grid traversal problems appear frequently. Practice thinking about geospatial reasoning." },
  { stage: "3. Virtual on-site (4–5 rounds)", what_happens: "2 coding rounds, 1 system design round (often marketplace or geo-system focused — ride matching, surge pricing, ETA service), 1 behavioral/leadership round, occasionally 1 product sense or operational round for more senior roles.", how_to_prepare: "For system design: design the Uber rider/driver matching system, the surge pricing algorithm, or the ETA prediction service — these are the canonical Uber design questions. For behavioral: prepare for 'how did you handle a disagreement with your team' and 'tell me about a time you made a decision with incomplete data.'" },
  { stage: "4. Offer and negotiation", what_happens: "Uber offers are competitive with FAANG — significant RSU component with a 4-year vesting schedule on a public company. Total comp is in line with Meta and Google at equivalent levels.", how_to_prepare: "Competing offers are the strongest lever. Uber's internal pay bands are well-documented on Levels.fyi — use this data to anchor your ask. Signing bonus has historically been negotiable for senior hires. If you're being brought in at a specific level, understand what the next level pays before you accept." },
];

const FAQS = [
  { question: "Is Uber a good company to work for after all the controversy?", answer: "Yes — Uber went through a well-documented cultural reset between 2017 and 2020. The engineering culture is significantly more collaborative and less chaotic today. The technical work is genuinely interesting: real-time marketplace systems, geospatial engineering at scale, and fraud detection are not problems you get to work on at most companies. Financial stability is strong — Uber has been profitable since 2023, and the stock has recovered substantially. It's a legitimate FAANG-equivalent destination for engineers who want marketplace or real-time systems experience." },
  { question: "Does Uber's interview focus on system design differently than Google or Meta?", answer: "Yes — Uber's system design emphasis skews heavily toward real-time systems, marketplace architectures, and geospatial data problems. Google emphasizes distributed storage and search infrastructure; Meta emphasizes social graph and feed systems. Uber's canonical design problems are: ride-matching (real-time two-sided), surge pricing (dynamic pricing with game theory elements), ETA prediction (ML + routing), and driver positioning systems. If you've studied Google/Meta system design problems, supplement with Uber-specific domains before your loop." },
  { question: "What's the best way to prepare for Uber's behavioral rounds?", answer: "Uber's behavioral rounds have moved toward Amazon Leadership Principles-style structured evaluation — they're looking for specific past examples, not hypothetical responses. Prepare 6–8 STAR stories that cover: a decision under uncertainty, a disagreement with a peer or manager, a time you failed and what you learned, and a time you improved a process or system. Uber is particularly interested in how you balance speed with quality under pressure, given their operational culture." },
];

export default async function HowToGetAJobAtUberPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Get a Job at Uber — Interview Process & Tips (2025)" description="Uber's marketplace engineering and two-sided ecosystem thinking shape their hiring differently. Full process breakdown." url={`${BASE_URL}/blog/how-to-get-a-job-at-uber`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job at Uber", url: `${BASE_URL}/blog/how-to-get-a-job-at-uber` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Uber</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Get a Job at Uber</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">Marketplace systems at scale, rider/driver ecosystem thinking, and a cultural reset from the Travis era. Uber hires differently than FAANG — here&apos;s the full process breakdown.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={32000} suffix="+" label="Uber employees globally (2025)" accent="#000000" />
            <StatCard value={4} label="Cultural differentiators that shape Uber's hiring vs standard FAANG" accent="#7C3AED" />
            <StatCard value={5} label="Interview stages including a geo/marketplace system design round" accent="#D97706" />
            <StatCard value={150} suffix="M+" label="Monthly active platform users — the operational scale context" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Uber looks for beyond technical skills</h2>
          <div className="mt-6 space-y-4">
            {UBER_DIFFERENTIATORS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black/10 text-[13px] font-bold text-[var(--ink)]">{i + 1}</span>
                <div><p className="font-bold text-[var(--ink)]">{item.signal}</p><p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Uber&apos;s interview process — stage by stage</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for an Uber interview? Zari coaches the full process.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari preps you for Uber&apos;s marketplace system design (ride matching, surge pricing, ETA), behavioral coaching for their values-driven culture rounds, and offer negotiation for their RSU-heavy comp structure.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
