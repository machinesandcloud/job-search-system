import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Ask for a Promotion — Timing, Script & Mistakes to Avoid (2025)",
  description:
    "Most promotion requests fail before the conversation starts — because of bad timing, missing evidence, or the wrong framing. A practical guide to building the case, choosing the moment, and having the conversation that gets you promoted.",
  keywords: ["how to ask for a promotion", "asking for a promotion", "promotion conversation", "how to get promoted", "promotion request 2025", "promotion script", "career advancement"],
  alternates: { canonical: "/blog/how-to-ask-for-a-promotion" },
  openGraph: {
    title: "How to Ask for a Promotion — Timing, Script & Mistakes to Avoid (2025)",
    description: "Most promotion requests fail before the conversation starts. Here's how to time it, build the case, and have the conversation.",
    url: "/blog/how-to-ask-for-a-promotion",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMMON_MISTAKES = [
  {
    mistake: "Asking based on tenure, not performance",
    why_it_fails: "'I've been here two years' is not a promotion argument — it's a calendar observation. Tenure signals that you haven't quit; it doesn't signal that you're ready for more responsibility. Managers promote based on demonstrated readiness for the next level, not time served. If you've been in a role for two years without growing beyond it, tenure works against you.",
    what_to_do_instead: "Build the case on the work you've done at or above your current level — scope of problems you've owned, decisions you've made, impact you've driven. The question is: have you already been operating at the next level? If yes, show the evidence. If no, you're not ready yet.",
  },
  {
    mistake: "Waiting for the annual review",
    why_it_fails: "Annual reviews are for documenting decisions that have already been made — not for making them. By the time your annual review happens, the promotion budget has been allocated, the headcount decisions are set, and your manager has formed their view of your performance. Asking at the annual review is often too late.",
    what_to_do_instead: "Have the promotion conversation 2–3 months before performance review cycles, when your manager still has time to advocate for you in the budgeting and planning process. Ask your manager directly: 'When is the right time in the year to have this conversation so you can advocate for me in the process?'",
  },
  {
    mistake: "Making it a personal financial argument",
    why_it_fails: "'I need more money' or 'My rent went up' are not promotion arguments — they're statements about your personal situation that your manager has no authority to solve with a promotion. Promotion decisions are made on business value, not personal need. Framing a promotion request around your financial situation makes you look like you're negotiating around your performance rather than because of it.",
    what_to_do_instead: "Frame everything in terms of business value: the scope you've expanded, the outcomes you've driven, the additional responsibility you're ready to take on. Compensation follows promotion — make the case for the promotion on business terms first.",
  },
  {
    mistake: "Making it a single conversation",
    why_it_fails: "A single conversation is not a promotion campaign. Most promotions are the result of months of consistent performance, visibility, and a clear signal that you want more responsibility. Walking into your manager's office cold with a promotion request — especially without prior signals that you're ready — puts your manager in an uncomfortable position and reduces your chances.",
    what_to_do_instead: "Treat the promotion as a campaign, not a conversation. Signal your ambition early, ask what you need to demonstrate, show the evidence, and then have the formal conversation as the culmination of that campaign — not the beginning of it.",
  },
];

const PROMOTION_CONVERSATION = [
  {
    moment: "The setup (2–3 months before you ask)",
    script: "'I want to be direct with you — I'm working toward a promotion to [next level] and I want to make sure I'm building the right evidence. What would you need to see from me to feel confident recommending me? Are there specific projects or gaps I should focus on?'",
    why: "This does two things: it signals your ambition clearly (so it's not a surprise later), and it gives your manager the chance to tell you what they actually need to see — information that lets you spend the next 2–3 months building exactly the right evidence.",
  },
  {
    moment: "The mid-campaign check-in (4–6 weeks before the formal ask)",
    script: "'I wanted to give you an update on the things we discussed. [Summarize evidence: 2–3 specific accomplishments since the setup conversation.] Based on what I've shared — are we on track? Is there anything that still feels like a gap?'",
    why: "This keeps your manager engaged in your progress, surfaces any concerns early enough to address them, and reinforces that you've been executing deliberately on the criteria they gave you.",
  },
  {
    moment: "The formal promotion request",
    script: "'I'd like to formally ask for a promotion to [next level]. Here's my case: [3–4 bullet-point summary of your strongest evidence]. I believe I've been operating at the next level for [time period], and I think the evidence supports making that official. I'd like to understand the timeline and what we need to do to make this happen.'",
    why: "Formal, specific, and evidence-led. The ask is confident without being ultimatum-style. The final question ('what do we need to do') invites your manager into the process rather than putting them in a position of just saying yes or no.",
  },
  {
    moment: "If the answer is not yet",
    script: "'I appreciate you being direct. Can you help me understand what's missing? I want to have a specific plan — with criteria I can point to — so we can revisit this in [agreed timeframe]. Can we agree on what that would look like?'",
    why: "Converts a 'no' into a defined path. The goal is to leave with specific, written criteria for what success looks like — not a vague 'keep doing what you're doing.' If your manager can't give you specific criteria, that's important information about whether this path is viable.",
  },
];

const BY_SENIORITY = [
  {
    level: "Individual Contributor → Senior IC",
    what_they_look_for: "Evidence that you operate independently without needing direction, that your scope has grown beyond your job description, and that others look to you for technical or domain guidance. You don't need to be managing people — but you need to be doing more than the role requires.",
    strongest_evidence: "Projects you took full ownership of (not just executed), decisions you made without asking for approval, situations where a colleague or junior team member used your guidance. Scope creep into the next level — if you've been doing senior-level work, document it specifically.",
    common_gap: "Strong execution but not enough ownership. Doing excellent work on tasks you were assigned is different from identifying the work that needed doing and owning it end-to-end.",
  },
  {
    level: "IC → First Manager",
    what_they_look_for: "Evidence that you can produce results through others, not just yourself. Mentoring experience, cross-functional coordination, and situations where you influenced without authority are the most persuasive signals. Technical excellence matters less than it did for the IC promotion.",
    strongest_evidence: "Concrete examples of developing others (not just 'I mentored junior people' — what did they achieve?), projects where you coordinated across teams without direct authority, and a clear articulation of why you want to manage and what kind of manager you intend to be.",
    common_gap: "Strong individual performance that doesn't translate into evidence of collaborative or leadership capability. The mistake: assuming strong IC performance justifies a management promotion when the evidence set is entirely individual.",
  },
  {
    level: "Manager → Senior Manager or Director",
    what_they_look_for: "Evidence that you think and operate at the organizational level, not just the team level. Strategic planning, cross-functional influence, and business impact (not just team output) are the relevant signals. You need to show that you're already thinking about problems the level above you is thinking about.",
    strongest_evidence: "Initiatives you drove that had organizational impact beyond your team. Executive-level relationships you've built. Business outcomes (revenue, cost, risk) your team's work influenced. A clear POV on where the business or function should go — and evidence that your POV has influenced decisions.",
    common_gap: "Excellent team management without visible organizational impact. Being a great manager of your team is necessary but not sufficient. The evidence set needs to extend beyond the team's performance to the business context the team sits in.",
  },
];

const FAQS = [
  { question: "What if my manager says there's no headcount for a promotion?", answer: "Budget constraints are real — but they are also sometimes a proxy response for 'the case isn't there yet.' Ask your manager directly: 'If budget weren't a constraint, would you feel confident recommending me for promotion?' The answer tells you whether the blocker is truly budget or something else. If budget is genuinely the constraint: get a commitment that you're first in line when it opens, get that in writing (even in an email summary after the meeting), and establish a timeline for revisiting. If you're told there's no budget cycle after cycle with no path forward, that's a signal about whether promotion is available at this company in your current role." },
  { question: "Should I mention a competing offer to get promoted?", answer: "With significant caveats. A competing offer can accelerate a promotion that was already being considered — it provides external market validation and creates urgency. But it is a high-risk move: (1) Your manager may call your bluff, in which case you either take the offer or damage the relationship by staying; (2) Even if you get the promotion, the relationship may be permanently altered — you're now someone who negotiated with an ultimatum; (3) If you don't actually intend to take the offer, you're negotiating in bad faith, which can end very badly. The cleanest use: a real offer that you're genuinely considering, disclosed honestly as 'I want to stay but I want to understand if there's a path here before I respond.'" },
  { question: "How long should I wait before asking for a promotion after starting a new role?", answer: "Conventionally, 12–18 months at a minimum for a first promotion in a new company. The reason: in the first year, you're still building credibility, learning the environment, and establishing relationships. Asking before you have a track record at the company — regardless of your history elsewhere — reads as either impatient or misinformed about what you haven't yet demonstrated. The exception: companies that explicitly hire at one level and promote within 6–12 months as part of a structured track (common in consulting, banking, and some tech companies). In those cases, the promotion cadence is established — you just need to hit the criteria." },
];

export default async function HowToAskForAPromotionPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Ask for a Promotion — Timing, Script & Mistakes to Avoid (2025)"
        description="Most promotion requests fail before the conversation starts. Here's how to time it, build the case, and have the conversation."
        url={`${BASE_URL}/blog/how-to-ask-for-a-promotion`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Ask for a Promotion", url: `${BASE_URL}/blog/how-to-ask-for-a-promotion` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Career Strategy · Advancement</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Ask for a Promotion</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most promotion requests fail before the conversation starts — because of bad timing, missing evidence, or framing that makes the case about tenure instead of performance. Here&apos;s the framework that actually works.
          </p>
        </div>
      </section>

      {/* Mistakes */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 promotion request mistakes and what to do instead</h2>
          <div className="mt-8 space-y-4">
            {COMMON_MISTAKES.map((item, i) => (
              <div key={item.mistake} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-[13px] font-extrabold text-red-600">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-[var(--ink)]">{item.mistake}</h3>
                    <div className="mt-3 rounded-xl bg-red-50 p-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Why it fails</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why_it_fails}</p>
                    </div>
                    <div className="mt-3 rounded-xl bg-emerald-50 p-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">What to do instead</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{item.what_to_do_instead}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversation Script */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 4-moment promotion campaign — with exact scripts</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">A promotion is a campaign, not a conversation. These are the 4 key moments — with the specific language that works at each one.</p>
          <div className="mt-8 space-y-5">
            {PROMOTION_CONVERSATION.map((item, i) => (
              <div key={item.moment} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[14px] font-extrabold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-[var(--ink)]">{item.moment}</h3>
                    <div className="mt-3 rounded-xl border border-[var(--border)] bg-white p-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What to say</p>
                      <p className="text-[13.5px] leading-6 italic text-[var(--ink)]">{item.script}</p>
                    </div>
                    <div className="mt-3 rounded-xl bg-[var(--brand)]/[0.05] p-3">
                      <p className="text-[12px] font-semibold text-[#4361EE]"><span className="font-bold">Why this works: </span>{item.why}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Seniority */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What they&apos;re looking for at each career stage</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">The evidence that earns a promotion changes significantly as you move up. What works for IC→Senior IC doesn&apos;t work for Manager→Director.</p>
          <div className="mt-8 space-y-5">
            {BY_SENIORITY.map((item) => (
              <div key={item.level} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[#4361EE]">{item.level}</h3>
                <div className="mt-4 space-y-3 text-[13.5px] text-[var(--muted)]">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What they look for</p>
                    <p className="leading-6">{item.what_they_look_for}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strongest evidence</p>
                    <p className="leading-6">{item.strongest_evidence}</p>
                  </div>
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Common gap</p>
                    <p className="leading-6">{item.common_gap}</p>
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
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari coaches the promotion conversation — and the negotiation that follows.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari helps you build the evidence case, script the promotion conversation, and negotiate the compensation that comes with it. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
