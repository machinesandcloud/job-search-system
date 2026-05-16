import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Change at 50 — What's Different, What to Ignore, How to Do It (2025)",
  description:
    "Career change at 50 is more doable than most people assume — but it requires a different strategy than changing careers at 30 or 40. Here's what's actually different, which fears are real vs overblown, and the specific tactics that work.",
  keywords: ["career change at 50", "career change over 50", "changing careers at 50", "second career at 50", "starting over at 50 career", "new career at 50"],
  alternates: { canonical: "/blog/career-change-at-50" },
  openGraph: {
    title: "Career Change at 50 — What's Different, What to Ignore, How to Do It (2025)",
    description: "The honest guide to changing careers at 50 — what's actually harder, what's easier than you think, and the strategy that works at this stage.",
    url: "/blog/career-change-at-50",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_IS_DIFFERENT = [
  {
    factor: "Shorter time horizon changes the ROI calculation",
    accent: "#DC2626",
    reality: "At 30, a 2-year reskilling investment has 30+ years of payoff. At 50, it has 12–17 years. That doesn't make it not worth it — but it means you need to be more selective about which transitions require long reskilling periods vs. which ones leverage what you already have. A 3-year medical school track at 50 is a different math problem than it is at 25.",
    whatThisMeans: "Prioritize transitions that use existing skills in new contexts over transitions that require building entirely new credential sets from scratch. The closer the new role is to your existing expertise, the faster the transition and the stronger the case.",
  },
  {
    factor: "Age discrimination is real and worth accounting for",
    accent: "#D97706",
    reality: "Age discrimination in hiring is illegal and documented. Research consistently shows that older job seekers face longer searches, lower callback rates, and more frequent ghosting after interviews. This is a real headwind — but it's not uniformly distributed. It's worse in certain sectors (consumer tech, gaming, some media), less pronounced in others (healthcare administration, B2B, government, consulting, financial services).",
    whatThisMeans: "Choose your target industry with some awareness of this factor. Target roles where experience is valued, not sectors that demographically skew very young. Consider whether your target companies have leadership diversity. Network into roles rather than cold-applying through ATS systems, which is where age bias operates most invisibly.",
  },
  {
    factor: "Your network is a genuine asset at this stage",
    accent: "#059669",
    reality: "Thirty-plus years of professional relationships is a real advantage in the job market. Most jobs are filled through networks, and you have a larger and more established one than most 30-year-olds competing for similar roles. The problem is many people at this career stage haven't maintained or activated their networks consistently.",
    whatThisMeans: "Networking is your primary job search channel, not job boards. Target informational interviews with people you know in your target field. Ask directly for introductions. Your network density is a real differentiator — use it.",
  },
  {
    factor: "The resume challenges are structural",
    accent: "#7C3AED",
    reality: "A 30-year career produces a resume that's too long, heavy with outdated technology, and makes your graduation year visible — all of which create friction. The resume isn't less impressive; it's harder to present effectively without triggering implicit bias about age, salary expectations, or technology currency.",
    whatThisMeans: "Cut your resume to the last 15 years maximum. Remove graduation years if they're more than 20 years ago. Lead with your most recent and relevant experience. Update the technology language throughout — don't let a reference to a tool from 2008 make your whole resume read as dated.",
  },
];

const EASIER_THAN_YOU_THINK = [
  {
    item: "Pivoting within your field",
    detail: "Moving from implementation to consulting, from individual contributor to advisory, from internal to external-facing — these transitions are much easier at 50 because you have genuine depth. The credibility question is answered. The question is just positioning.",
  },
  {
    item: "Consulting and fractional roles",
    detail: "The market for senior fractional executives and independent consultants favors deep experience. Companies pay for it. If your target is meaningful work with flexibility rather than a specific corporate job, this path is often faster and better compensated at 50 than the traditional job search.",
  },
  {
    item: "Board advisory and board positions",
    detail: "Corporate and nonprofit boards are actively recruiting people with functional depth and senior operating experience. This path barely exists for a 35-year-old but is realistic at 50. For people who want to stay engaged without a full-time role, board advisory work is worth pursuing in parallel with a traditional search.",
  },
  {
    item: "Target companies that value experience",
    detail: "Private equity-backed companies, professional services firms, government contractors, and established financial services firms often specifically want senior operators. They're not looking for 28-year-olds to lead complex functions. In these sectors, 50 is an asset, not a liability.",
  },
];

const RESUME_STRATEGY = [
  { rule: "Cap at 15 years", detail: "Anything older than 15 years is rarely relevant and makes your resume longer without adding signal. The exception: a specific achievement from 18 years ago that's directly relevant to the target role. Otherwise, cut it." },
  { rule: "Remove graduation years unless within 10 years", detail: "Listing a graduation year from 1995 or earlier immediately signals age in a way that creates unnecessary friction. List the degree and institution without the year. If you're asked, you can answer — but don't volunteer it on paper." },
  { rule: "Update technology vocabulary throughout", detail: "If your resume has references to tools, systems, or platforms from more than 10 years ago without newer equivalents, update it. You don't need to pretend to know tools you don't — but 'proficiency in legacy ERP systems' can often be rewritten as 'enterprise financial systems' with current examples added." },
  { rule: "Lead with impact, not tenure", detail: "Longevity at a company is not a selling point for most roles. 22 years at IBM tells a screener 'not a job-hopper' but also 'may be institutionalized.' Lead with what you achieved in those years, not how long you were there. Outcomes over tenure." },
];

const FAQS = [
  { question: "Is 50 too old to change careers?", answer: "No — but the honest answer is that some transitions are harder at 50 than they would have been at 35, and some are actually easier. The hard ones: transitions that require 3+ years of full-time reskilling, or pivots into sectors that demographically skew very young. The easier ones: transitions that leverage your existing depth in a new context, consulting and advisory roles, and moves into sectors that value senior experience. The strategy is choosing transitions that use your genuine advantages rather than fighting uphill against the headwinds." },
  { question: "Will age discrimination be a problem?", answer: "It will be a factor in some searches and some sectors. Research is clear that older job seekers face real disadvantages in cold application processes — especially through ATS systems where the screening is anonymous. The mitigation strategy is: prioritize networking over cold applications, target sectors and company types that value experience, keep your resume to the last 15 years, and remove graduation years that immediately signal age. You can't eliminate age bias, but you can navigate around the places where it operates most systematically." },
  { question: "How do I explain why I'm changing careers at 50?", answer: "Your answer needs to be honest, forward-looking, and specific. 'I'm looking for new challenges' is not an answer. 'After 25 years in finance, I've spent the last 3 years advising early-stage companies on financial systems, and I want to move into a full-time operating role in that space — I find the scale of the problems more interesting and I've built the relationships to get there' is an answer. The more specific and credible your 'toward' story, the less the age factor matters." },
  { question: "Do I need to go back to school?", answer: "In most cases, no. A degree or certification might make sense if you're making a transition into a regulated field (healthcare, law, finance licensure) or if you're moving into a technical area where you genuinely lack foundational knowledge. But for most career changes at 50, a graduate degree is a 2-year, $80K investment that isn't necessary and doesn't address the real barrier (positioning and networking), just the credential question. Self-directed learning, targeted courses, and informational interviews will move the needle faster for most transitions." },
];

export default async function CareerChangeAt50Page() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Career Change at 50 — What's Different, What to Ignore, How to Do It (2025)"
        description="The honest guide to changing careers at 50 — what's actually harder, what's easier than you think, and the strategy that works at this stage."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/career-change-at-50`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Career Change at 50", url: `${BASE_URL}/blog/career-change-at-50` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Change</span>
            <span className="text-[11px] text-white/30">12 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Career change at 50<br /><span className="gradient-text-animated">what&apos;s different, what to ignore, how to do it</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            More doable than most people assume, and harder in specific ways most people don&apos;t anticipate. The strategy for changing careers at 50 is genuinely different from doing it at 35 — different leverage, different headwinds, different priorities.
          </p>
        </div>
      </section>

      {/* What's different */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 ways career change at 50 is genuinely different</h2>
          <div className="mt-8 space-y-5">
            {WHAT_IS_DIFFERENT.map((item) => (
              <div key={item.factor} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: item.accent, borderLeftWidth: 4 }}>
                  <p className="font-extrabold text-[var(--ink)]">{item.factor}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <p className="px-6 py-4 text-[13.5px] leading-6 text-[var(--muted)]">{item.reality}</p>
                  <div className="bg-[var(--bg)] px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: item.accent }}>What this means for your strategy</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.whatThisMeans}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Easier than you think */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 things that are actually easier at 50</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Most career change advice focuses on the headwinds. Here are the genuine advantages — and how to use them.</p>
          <div className="mt-8 space-y-4">
            {EASIER_THAN_YOU_THINK.map((item, i) => (
              <div key={item.item} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.item}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume strategy */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Resume rules that are different at 50</h2>
          <div className="mt-8 space-y-4">
            {RESUME_STRATEGY.map((item) => (
              <div key={item.rule} className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{item.rule}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Career change at 50 FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Coaching built for where you actually are in your career.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches career transitions at every stage — resume translation, interview narrative, and the positioning that makes experience read as an asset. Start with your resume.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
