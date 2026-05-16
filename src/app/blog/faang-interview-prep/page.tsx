import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "FAANG Interview Prep — How Each Company's Process Actually Differs (2025)",
  description:
    "Meta, Apple, Amazon, Netflix, and Google each have distinct hiring processes, evaluation criteria, and compensation structures. This guide breaks down what's unique at each company — so you prepare for the right interview, not a generic one.",
  keywords: ["FAANG interview prep", "FAANG interview process", "how to prepare for FAANG interview", "Meta interview prep", "Apple interview prep", "Amazon interview prep", "Netflix interview", "Google interview prep", "big tech interview tips"],
  alternates: { canonical: "/blog/faang-interview-prep" },
  openGraph: {
    title: "FAANG Interview Prep — How Each Company Actually Differs (2025)",
    description: "Meta, Apple, Amazon, Netflix, Google — each has a distinct process. What makes each unique, and how to prepare specifically for each one.",
    url: "/blog/faang-interview-prep",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPANIES = [
  {
    name: "Meta (Facebook)",
    accent: "#1877F2",
    tagline: "Move fast. Maximize impact. Defend your decisions.",
    process: "Recruiter screen → Technical phone screen (1 round) → Virtual onsite (4–5 rounds: 2 coding, 1 system design, 1–2 behavioral). Offers go through a compensation committee similar to Google's. Timeline: 4–7 weeks from first contact.",
    whatsMUnique: "Meta's behavioral interviews are unusually focused on impact and speed. They use their own behavioral framework centered on 'impact' — they want to hear about things you personally built or changed, not things your team did. The 'Jedi' (cultural fit) rounds probe for alignment with Meta's values around moving fast, embracing ambiguity, and being direct even when it's uncomfortable.",
    codingStyle: "Medium to Hard Leetcode. Meta has a preference for graph problems and dynamic programming. Unlike Google, Meta explicitly tests on problems that mirror their actual engineering challenges — social graph traversal, feed ranking, messaging at scale.",
    behavioralFocus: "Meta asks variations of: 'Tell me about a time you made a decision that turned out to be wrong.' 'Tell me about a time you had to push back on a product direction.' 'What's the largest scope project you've owned end to end?' Impact specificity is required — 'our team worked on' is penalized.",
    compensation: "E3 (entry SWE): ~$180–230K total. E5 (senior SWE): ~$320–450K total. E6 (staff): $500K–$800K+. RSU refresh is generous for high performers.",
    tip: "Meta moves fast — they expect you to move fast in interviews too. Don't overthink. Code quickly, explain your reasoning concisely, and don't belabor edge cases to the point of losing momentum.",
  },
  {
    name: "Apple",
    accent: "#555555",
    tagline: "Deep domain expertise. Craft. Collaborative humility.",
    process: "Apple's process is team-by-team — there's no standardized FAANG-style loop. Typically: recruiter screen → technical phone screen(s) → onsite with 6–8 interviews across a day, often with the actual team you'd work with. Offers come directly from the team, not a central committee.",
    whatsMUnique: "Apple interviews are more collaborative and less adversarial than other FAANG companies. Interviewers often work through problems with you rather than watching you struggle in silence. The evaluation emphasizes depth of expertise in your domain — generalist breadth matters less. Culture fit at Apple means intellectual humility and craftsmanship, not aggressive confidence.",
    codingStyle: "Less Leetcode-heavy than other FAANG companies. Apple often asks questions closer to real engineering scenarios — especially for roles outside core infrastructure. For SWE roles: data structures, system design, and sometimes live coding in Xcode or Playground. For non-SWE technical roles: domain-specific technical depth.",
    behavioralFocus: "Apple behavioral questions focus on: craftsmanship ('Tell me about a project you're proud of'), collaboration ('How do you work with designers/PMs who have different opinions?'), and long-term thinking ('How do you make tradeoffs between shipping fast and building right?'). Boastfulness is a culture mismatch signal.",
    compensation: "ICT3 (entry SWE): ~$170–210K total. ICT5 (senior SWE): ~$280–380K total. Apple's base salary is often higher relative to equity compared to Meta/Google — equity vesting is 4-year with acceleration.",
    tip: "Don't pretend to know something you don't. Apple interviewers value intellectual honesty — 'I'm not sure, but here's how I'd think through it' scores better than a confidently wrong answer.",
  },
  {
    name: "Amazon",
    accent: "#FF9900",
    tagline: "Leadership Principles aren't background — they're the interview.",
    process: "Recruiter screen → Technical phone screen (often 2 rounds) → Virtual loop (5–7 interviews: 2–3 coding, 1 system design, 2–3 behavioral/LP). Every interviewer is assigned 2 Leadership Principles to assess. A 'Bar Raiser' — an interviewer from outside your team — must approve the hire. Timeline: 3–6 weeks.",
    whatsMUnique: "Amazon's 16 Leadership Principles are not decoration. Every behavioral interview question maps directly to one or more LPs, every interviewer assesses specific LPs, and the Bar Raiser's primary job is evaluating culture fit through the LP lens. Candidates who haven't prepared LP-specific STAR stories are immediately disadvantaged — this is the most structured behavioral system of any FAANG company.",
    codingStyle: "Medium Leetcode, slightly more consistent difficulty than Google or Meta. Amazon has a particular focus on scalability — 'how would this work at Amazon scale?' is a common follow-up. System design questions often involve their actual infrastructure (DynamoDB, SQS, Lambda) as illustrative examples.",
    behavioralFocus: "Prepare 6–8 deep STAR stories mapped to LPs. The most commonly tested: Customer Obsession, Ownership, Invent and Simplify, Deliver Results, Have Backbone/Disagree and Commit. 'Disagree and Commit' is uniquely Amazon — they want examples where you disagreed, said so, but executed fully after the decision was made.",
    compensation: "SDE II (mid-level): ~$200–280K total. SDE III (senior): ~$280–380K total. Amazon's comp structure is unique: high base, low bonus, large RSU grant that's backloaded (vesting: 5%, 15%, 40%, 40%). Total comp in years 1–2 is often lower than listed — factor in the vesting schedule.",
    tip: "Amazon is the only FAANG company where you can prepare behavioral questions almost completely in advance. Map stories to LPs before your interview. The questions are predictable; the preparation gap is the differentiator.",
  },
  {
    name: "Netflix",
    accent: "#E50914",
    tagline: "Exceptional people, radical candor, total autonomy.",
    process: "Netflix hires senior. Most roles target senior to principal level — Netflix rarely hires entry-level. Process: recruiter screen → 2–3 technical or domain screens → full interview day (6–8 rounds). Netflix doesn't have a standardized loop — the process varies significantly by role and team. Timeline: 4–8 weeks.",
    whatsMUnique: "Netflix's culture memo ('freedom and responsibility') is not marketing — it defines the interview experience. They explicitly assess whether candidates can operate with full autonomy, handle radical candor without defensiveness, and make high-judgment calls without process guardrails. Netflix doesn't hire people who need to be managed — they interview for self-direction and strategic judgment at every level.",
    codingStyle: "Less pure Leetcode than other FAANG companies. Netflix engineering interviews tend to be more systems-oriented and design-focused. The bar is high on code quality and architecture — Netflix engineers own their services end-to-end and are expected to think about reliability, scalability, and performance simultaneously.",
    behavioralFocus: "Netflix behavioral questions probe for: independent judgment ('Tell me about a time you made a major decision without approval'), receiving critical feedback ('Tell me about a time you got feedback you disagreed with and what you did'), and strategic thinking ('How do you decide what NOT to work on?'). Candidates who defer to process or consensus as a decision-making framework struggle.",
    compensation: "Senior SWE: ~$350–550K total (high cash, moderate equity). Netflix pays at the top of market in cash — above Google, Meta, and Amazon for equivalent levels. Equity is in options, not RSUs, with a strike price that makes them more risk-correlated than traditional RSUs.",
    tip: "Netflix hires for the person they want in the room when things go wrong. Every answer should demonstrate judgment under uncertainty, not process adherence. 'I followed the standard procedure' is a weak Netflix answer.",
  },
  {
    name: "Google",
    accent: "#4285F4",
    tagline: "Googleyness. Hiring committee. Hypothesis-driven.",
    process: "Recruiter screen → 1–2 technical phone screens → virtual onsite (4–5 rounds) → hiring committee review → compensation committee → offer. Google's committee model means your fate is decided by people who didn't interview you. Timeline: 6–10 weeks.",
    whatsMUnique: "The hiring committee model, the Googleyness evaluation criterion, and the level-setting compensation committee are all unique to Google. No single interviewer decides your outcome — a committee reads your packet. Googleyness (comfort with ambiguity, intellectual humility, bias to action) is scored independently from technical ability.",
    codingStyle: "Medium to Hard Leetcode. Strongly hypothesis-driven — state your approach before you code. Google emphasizes code quality, edge case handling, and time/space complexity more than other companies. Thinking out loud is scored explicitly.",
    behavioralFocus: "Google's 4 criteria: general cognitive ability, leadership, Googleyness, role-related knowledge. Behavioral questions test all four — especially leadership (initiative without authority) and Googleyness (how you handle being wrong).",
    compensation: "L4 (junior SWE): ~$200–280K total. L5 (senior SWE): ~$300–420K total. L6 (staff SWE): $500K–$800K+. RSU refreshers awarded annually based on performance.",
    tip: "Prepare for the committee reader who hasn't met you. Your interviewers write your packet — make their descriptions of your thinking easy to write by being explicit about your reasoning at every step.",
  },
];

const FAQS = [
  { question: "Which FAANG company is the hardest to get into?", answer: "All FAANG companies have sub-1% acceptance rates from total applicants. Among candidates who reach the interview stage, Netflix is generally considered the hardest — they hire senior only, evaluate judgment and autonomy intensively, and have a smaller absolute headcount. Google's hiring committee model creates unpredictability that frustrates candidates who performed well. Amazon is the most formulaic — thorough LP preparation meaningfully improves pass rates. Apple's collaborative interview style makes it more accessible to candidates who struggle with adversarial interviews." },
  { question: "Should I apply to multiple FAANG companies at once?", answer: "Yes — and coordinate your timelines deliberately. Applying to multiple companies simultaneously creates timeline pressure that you can use to your advantage in negotiations. Tell each recruiter you have other processes in motion — most will expedite. If you receive an offer from one company, you can often use it to accelerate competing processes. Prepare company-specific material for each (especially Amazon LPs and Netflix judgment questions) rather than generic FAANG prep." },
  { question: "How many Leetcode problems do I need to solve before FAANG interviews?", answer: "Quality over quantity. 150–200 well-understood problems across the core categories (arrays, strings, trees, graphs, dynamic programming, heaps) is sufficient for most FAANG interviews. Solving 500 problems without deeply understanding patterns is worse than solving 100 with full comprehension. For each problem: understand the brute force, then the optimized approach, articulate the time/space complexity, and identify the underlying pattern. The interview tests whether you can apply patterns to novel problems — not whether you've seen this exact problem before." },
  { question: "Do FAANG companies negotiate their offers?", answer: "All of them do — and they all expect you to. The first offer is almost never the best offer at Meta, Google, Amazon, Netflix, or Apple. The most effective negotiation lever: a competing offer from another top-tier company. Companies in this tier match each other's compensation for candidates they want. Without a competing offer, pointing to target compensation based on market data (Levels.fyi, Blind) still creates room. Equity grants (RSUs or options) often have more negotiation room than base salary." },
];

export default async function FAANGInterviewPrepPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="FAANG Interview Prep — How Each Company's Process Actually Differs (2025)"
        description="Meta, Apple, Amazon, Netflix, Google — each has a distinct process. What makes each unique and how to prepare specifically."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/faang-interview-prep`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "FAANG Interview Prep", url: `${BASE_URL}/blog/faang-interview-prep` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Interview Prep</span>
            <span className="text-[11px] text-white/30">16 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            FAANG interview prep<br /><span className="gradient-text-animated">what's actually different</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Generic &quot;big tech interview prep&quot; misses the point. Meta&apos;s behavioral framework, Amazon&apos;s LP system, Netflix&apos;s judgment-over-process culture, Apple&apos;s collaborative dynamic, and Google&apos;s committee model are all materially different. Here&apos;s what you need to know about each one.
          </p>
        </div>
      </section>

      {/* Companies */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-10">
          {COMPANIES.map((co) => (
            <div key={co.name} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
              {/* Header */}
              <div className="border-b border-[var(--border)] px-6 py-6" style={{ borderTopColor: co.accent, borderTopWidth: 3 }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-[1.5rem] font-extrabold tracking-tight text-[var(--ink)]">{co.name}</h2>
                    <p className="mt-1 text-[13px] font-medium italic text-[var(--muted)]">{co.tagline}</p>
                  </div>
                </div>
                <p className="mt-4 text-[13.5px] leading-6 text-[var(--muted)]"><strong className="text-[var(--ink)]">Process:</strong> {co.process}</p>
              </div>
              {/* Body */}
              <div className="divide-y divide-[var(--border)]">
                <div className="px-6 py-5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: co.accent }}>What makes {co.name.split(" ")[0]} unique</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{co.whatsMUnique}</p>
                </div>
                <div className="grid sm:grid-cols-2">
                  <div className="border-r border-[var(--border)] px-6 py-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Coding style</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{co.codingStyle}</p>
                  </div>
                  <div className="px-6 py-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Behavioral focus</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{co.behavioralFocus}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2">
                  <div className="border-r border-[var(--border)] px-6 py-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Compensation context</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{co.compensation}</p>
                  </div>
                  <div className="px-6 py-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: co.accent }}>Top prep tip</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{co.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's the same */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What every FAANG interview has in common</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { point: "Behavioral prep is non-optional", detail: "Every FAANG company has a structured behavioral component. Candidates who only prep coding get eliminated at the behavioral stage even when their coding is strong." },
              { point: "Offers are negotiable at every company", detail: "The first offer is not the final offer. All five companies expect negotiation, especially for candidates with competing offers. Levels.fyi is the benchmark." },
              { point: "Thinking out loud matters", detail: "Across all five companies, how you reason is scored alongside what you produce. Coding in silence, even to the correct answer, undersells your thinking." },
              { point: "System design is expected at senior+", detail: "L4/E4 and above at all FAANG companies will face system design questions. Low-level components (database choice, caching strategy, consistency tradeoffs) are universal expectations." },
            ].map((item) => (
              <div key={item.point} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.point}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">FAANG interview FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get AI coaching for your FAANG interview</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches behavioral answers with STAR evaluation tuned to each company&apos;s specific criteria — Amazon LPs, Meta impact framing, Google Googleyness, Netflix judgment questions.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
