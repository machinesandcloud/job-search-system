import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get Promoted at Work — The Real System (2025)",
  description:
    "How promotion decisions actually work at most companies — and the specific things that change outcomes vs. the things that don't. Building the case, finding a sponsor, timing the ask, and what to do when you're passed over.",
  keywords: ["how to get promoted at work", "how to get a promotion", "how to get promoted", "getting promoted at work", "promotion strategy", "how to ask for a promotion"],
  alternates: { canonical: "/blog/how-to-get-promoted-at-work" },
  openGraph: {
    title: "How to Get Promoted at Work — The Real System (2025)",
    description: "How promotion decisions really happen — visibility, sponsorship, timing, and building the documented case that survives calibration.",
    url: "/blog/how-to-get-promoted-at-work",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const MYTHS_VS_REALITY = [
  {
    myth: "Working harder gets you promoted",
    reality: "Working harder makes you a reliable contributor. That's a baseline, not a differentiator. Promotion decisions are about leverage — who can operate at the next level — not about who works the most hours. The person who works hardest and is invisible often loses to the person who works a normal amount and is strategically visible.",
    fix: "Shift from effort to impact. Document outcomes, not hours. Communicate what you're doing, not just that you're busy.",
  },
  {
    myth: "Your manager controls your promotion",
    reality: "In most companies, your manager recommends your promotion — but doesn't decide it. The decision happens in a calibration meeting where your manager advocates for you to a group of peers and senior leaders who don't know you personally. If your manager can't clearly articulate your impact in 60 seconds to a skeptical audience, you're not getting promoted.",
    fix: "Build the case for your manager to use, not just to your manager. Give them specific, quotable evidence of your next-level work — they need to be your advocate in a room you're not in.",
  },
  {
    myth: "Exceeding your current role gets you promoted",
    reality: "Exceeding the requirements of your current level shows you're a great performer at your level — which is necessary but not sufficient for promotion. What gets you promoted is demonstrating you're already operating at the next level. These are different things: exceeding L4 work vs. doing L5 work.",
    fix: "Have an explicit conversation with your manager about what L(n+1) work looks like specifically. Then do that work, document it, and make sure it's visible.",
  },
  {
    myth: "Promotions happen on the company's annual cycle",
    reality: "The decision to promote you is made in advance of the formal cycle — often 3–6 months before you're officially promoted. By the time the review meeting happens, the outcome is usually already determined. If you wait for the review cycle to make your case, you've missed the window.",
    fix: "Start the case-building conversation at least 6 months before the cycle. If you're targeting the mid-year review, start in January.",
  },
];

const SPONSORSHIP_VS_MENTORSHIP = {
  mentor: { definition: "Someone who gives you advice, perspective, and guidance", value: "Career development and learning", limitation: "Mentors advise. They don't advocate in rooms you're not in.", howToFind: "Senior people in your field who have time to invest in conversation" },
  sponsor: { definition: "Someone with organizational capital who actively advocates for your advancement", value: "Promotion, visibility, and access to high-profile work", limitation: "Sponsors are rarer and require you to have already demonstrated value", howToFind: "Senior leaders who have seen your work directly and have influence over promotion decisions at your target level" },
};

const BUILD_THE_CASE = [
  { step: "Document impact in real time", detail: "Keep a running 'brag document' — a private running list of completed work, outcomes produced, and positive feedback received. Update it monthly. By review time, you have 12 months of evidence rather than scrambling to remember what you did." },
  { step: "Quantify everything that can be quantified", detail: "Revenue impact, time saved, user counts, reliability improvement, headcount managed, projects shipped. Abstract contributions ('improved team morale', 'drove alignment') are hard to advocate for in a calibration meeting. Specific numbers are not." },
  { step: "Identify and document next-level work", detail: "Promotion requires evidence you're already operating at the next level. Make a list of every time you've taken on scope above your current level — and document the outcome. This is your promotion case." },
  { step: "Ask your manager directly: what does 'ready' look like?", detail: "Have an explicit conversation: 'I want to be promoted in the next cycle. What do I need to demonstrate specifically, and where am I relative to that bar right now?' This surfaces the specific gap and creates accountability for the criteria." },
  { step: "Build the calibration packet your manager needs", detail: "Write a 1-page document of your top 4–5 contributions with specific metrics, evidence of next-level work, and endorsements from stakeholders outside your team. Give it to your manager before the cycle so they have it verbatim when advocating for you." },
];

const FAQS = [
  { question: "How do I ask for a promotion?", answer: "Don't wait for the review cycle — schedule a dedicated conversation 3–6 months in advance. Say explicitly: 'I want to be promoted in the next cycle. I'd like to understand what the criteria look like and get your honest assessment of where I am.' Then listen. Get the criteria in writing if possible. Return in 6 weeks with a documented case for how you meet or are progressing toward each criterion. The ask itself is just the beginning of a multi-month conversation, not a one-time event." },
  { question: "How long should I wait before asking for a promotion?", answer: "In most companies, the minimum viable time at a level before promotion consideration is 12–18 months — long enough to demonstrate sustained performance rather than a hot streak. Asking in 6 months almost always fails and can mark you as impatient. The exception: a role change where you were placed below your demonstrated level, or a startup where the progression criteria are explicitly faster." },
  { question: "What should I do if I'm passed over for a promotion?", answer: "Have a direct conversation within 2 weeks: 'I was expecting to be promoted in this cycle and I wasn't. I want to understand specifically what the gap is and what I need to do differently.' If the feedback is vague or evasive — 'it just wasn't your time,' 'budget was tight,' 'someone else needed it more' — that's a signal the company doesn't have a clear promotion path for you. At that point, the most common outcome is that the promotion happens when you get an outside offer. Knowing that changes how you approach the next 6 months." },
  { question: "How do I get promoted when I don't have a good relationship with my manager?", answer: "This is the hardest scenario. Your manager is your primary advocate in the calibration meeting — if they don't go in strongly for you, the outcome is usually a no. You have two levers: (1) build direct visibility with the skip-level or other senior leaders who are in the calibration meeting, so there's external advocacy; (2) have a direct conversation with your manager about the state of your working relationship and whether they can support your promotion case. If neither is working, the most realistic path to promotion may be an internal transfer or an external move." },
];

export default async function HowToGetPromotedAtWorkPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get Promoted at Work — The Real System (2025)"
        description="How promotion decisions really happen — visibility, sponsorship, timing, and building the documented case that survives calibration."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/how-to-get-promoted-at-work`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get Promoted at Work", url: `${BASE_URL}/blog/how-to-get-promoted-at-work` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Growth</span>
            <span className="text-[11px] text-white/30">11 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            How to get promoted at work<br /><span className="gradient-text-animated">4 myths and the real system</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Promotion decisions happen in a calibration meeting where your manager advocates for you to people who don&apos;t know you. Understanding that changes everything — what evidence you need, when to start building it, and what &apos;sponsorship&apos; actually means.
          </p>
        </div>
      </section>

      {/* Myths vs reality */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 promotion myths — and what&apos;s actually true</h2>
          <div className="mt-8 space-y-5">
            {MYTHS_VS_REALITY.map((item) => (
              <div key={item.myth} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="bg-red-50/40 border-b border-[var(--border)] px-6 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Myth</p>
                  <p className="font-bold text-[var(--ink)]">&ldquo;{item.myth}&rdquo;</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Reality</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.reality}</p>
                  </div>
                  <div className="bg-[var(--bg)] px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">What to do instead</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Mentorship vs sponsorship — why the difference matters</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Everyone tells you to find a mentor. The people who get promoted have sponsors.</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {Object.entries(SPONSORSHIP_VS_MENTORSHIP).map(([key, val]) => (
              <div key={key} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className={`px-6 py-4 border-b border-[var(--border)] ${key === "sponsor" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                  <p className="font-extrabold text-[var(--ink)] capitalize">{key}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--muted)]">{val.definition}</p>
                </div>
                <div className="px-6 py-5 space-y-3">
                  <div><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">Value</p><p className="text-[13px] text-[var(--ink)]">{val.value}</p></div>
                  <div><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">Limitation</p><p className="text-[13px] text-[var(--muted)]">{val.limitation}</p></div>
                  <div><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">How to find</p><p className="text-[13px] text-[var(--muted)]">{val.howToFind}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build the case */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to build a promotion case your manager can actually use</h2>
          <div className="mt-7 space-y-3">
            {BUILD_THE_CASE.map((item, i) => (
              <div key={item.step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.step}</p>
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
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Promotion FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Build your promotion case with AI coaching.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari helps you document your impact, identify the evidence of next-level work, and build the case your manager can use in the calibration room.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
