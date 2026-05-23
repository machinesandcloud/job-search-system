import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What Are Your Salary Expectations? — How to Answer Without Losing (2025)",
  description:
    "The salary expectations question is the most expensive interview question most candidates answer wrong. Here's the strategy, exact scripts, and what to do when they push you to name a number first.",
  keywords: ["what are your salary expectations", "salary expectations interview answer", "how to answer salary expectations question", "what to say when asked salary expectations", "salary question interview 2025", "desired salary interview"],
  alternates: { canonical: "/blog/salary-expectations-interview" },
  openGraph: {
    title: "'What Are Your Salary Expectations?' — How to Answer (2025)",
    description: "The salary expectations question is the most expensive one most candidates answer wrong. Here's the strategy and word-for-word scripts.",
    url: "/blog/salary-expectations-interview",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Should I always deflect the salary question?",
    answer: "Not always. Deflecting works in early-stage conversations where the role scope isn't defined yet. By the time you're deep in the process or receiving an offer, you need to be willing to state your number clearly. The goal is to avoid being the first to anchor prematurely — not to avoid the conversation forever.",
  },
  {
    question: "What if the job posting has a salary range listed?",
    answer: "Great — it gives you a target to position around. If their range is $90K–$120K and you want $115K, you can say: 'I saw the range in the posting — I'm targeting the upper half of that range, around $115K, based on my [specific experience]. I'd want to confirm the full scope of the role before landing on a number.' This signals your position without being adversarial.",
  },
  {
    question: "What if they ask me to fill in a number on an application form?",
    answer: "Some ATS forms require a number and won't let you leave it blank. If you must fill in a number, put the floor of the range you'd actually accept — not your ideal number. You can always negotiate up from that; you can't easily negotiate from a number you wrote in a form.",
  },
  {
    question: "I named a number too early and it was too low. What do I do?",
    answer: "It happens. In the offer stage, you have one good move: 'Since our earlier conversation, I've had a chance to research the full scope of this role more carefully and speak with people in similar positions. Based on that, I'm targeting [new number]. I want to make sure we're aligned before we go further.' You can't fully undo an early anchor, but you can reset the conversation once you have an offer.",
  },
];

export default async function SalaryExpectationsInterviewPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="What Are Your Salary Expectations? — How to Answer Without Losing (2025)"
        description="The salary expectations question is the most expensive interview question most candidates answer wrong. Here's the strategy and scripts."
        url={`${BASE_URL}/blog/salary-expectations-interview`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Salary Expectations Interview", url: `${BASE_URL}/blog/salary-expectations-interview` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Negotiation</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">&ldquo;What Are Your Salary Expectations?&rdquo;</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">The most expensive interview question most candidates answer wrong — and the exact scripts to handle it without getting anchored too low.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>9 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Why this question is so dangerous</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Whoever names a number first in a negotiation anchors the conversation. If you say $90K and the company was willing to pay $120K, you&apos;ve just given up $30K. If you say $120K and their budget is $95K, you might have just eliminated yourself from consideration unnecessarily.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The goal at the early interview stage isn&apos;t to win the negotiation — it&apos;s to survive it without anchoring yourself too low. You do that by deflecting early, doing the research, and waiting until you have more information before committing to a number.
            </p>
            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/40 p-5">
              <p className="text-[14px] leading-7 text-[var(--ink)]">
                <span className="font-bold">The key insight:</span> You&apos;re not trying to avoid the conversation — you&apos;re trying to delay it until you understand the full scope of the role, the total comp structure, and what number is reasonable to ask for. Early in a process, you legitimately don&apos;t have that information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Scripts by stage: what to say and when</h2>

            <div className="mt-5 space-y-6">
              {[
                {
                  stage: "Recruiter screen (first conversation)",
                  context: "You know very little about the role scope, team, or total comp structure. This is the worst time to commit to a number.",
                  scripts: [
                    {
                      label: "Deflect with scope",
                      script: "I want to make sure I understand the full scope of the role before I land on a number — particularly around [team size / direct reports / budget ownership / technical scope]. Could you tell me more about what the role entails? Once I have that picture, I can tell you where I'm targeting.",
                    },
                    {
                      label: "Flip the question",
                      script: "I'd love to hear what budget you've built for this role before I anchor to a number — that way I know whether we're in the same conversation. What range did you have in mind?",
                    },
                  ],
                },
                {
                  stage: "Second or third interview (you've learned more about the role)",
                  context: "You have enough information to give a range. Giving a range signals flexibility while protecting your floor.",
                  scripts: [
                    {
                      label: "State a range anchored high",
                      script: "Based on my research into market rates for this level at [type of company / location / scope], and factoring in my [specific experience], I'm targeting $X to $Y. I'm flexible if the total package — equity, bonus, benefits — is structured well. Where does that land relative to what you've built for this role?",
                    },
                  ],
                },
                {
                  stage: "Offer stage",
                  context: "You've received an offer or are about to. You're no longer deflecting — you're negotiating.",
                  scripts: [
                    {
                      label: "Counter an offer",
                      script: "Thank you — I'm genuinely excited about this role. The base is a bit lower than I was targeting. Based on my research and the scope of what we've discussed, I was expecting something closer to $X. Is there flexibility to get to that number?",
                    },
                    {
                      label: "If they say the offer is firm",
                      script: "I understand. If the base can't move, are there other dimensions we could look at — signing bonus, equity acceleration, or a 6-month review tied to a performance threshold? I want to find a way to make this work.",
                    },
                  ],
                },
              ].map(section => (
                <div key={section.stage} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                    <h3 className="font-bold text-[var(--ink)]">{section.stage}</h3>
                    <p className="mt-1 text-[13px] text-[var(--muted)]">{section.context}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {section.scripts.map(s => (
                      <div key={s.label}>
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]">{s.label}</p>
                        <blockquote className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-5 py-4 text-[14px] leading-7 text-[var(--ink)] italic">
                          &ldquo;{s.script}&rdquo;
                        </blockquote>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">When they push: common pressure responses and how to handle them</h2>

            <div className="mt-5 space-y-4">
              {[
                {
                  push: "\"We need a number before we can continue the process.\"",
                  response: "Give a range, not a specific number: 'I understand — I'm targeting $X to $Y based on my research. Does that fit within what you've built for this role?' A range lets them confirm or redirect without locking you into a floor.",
                },
                {
                  push: "\"What are you making currently?\"",
                  response: "In many US states, employers are prohibited from asking. Even where it's legal, you're not obligated to answer: 'I'm keeping my current comp confidential — I'd rather focus on the value I'd bring to this role and what market looks like for this level. Could you share what range you've built?' If you do share: give total comp (base + bonus + equity), not just base.",
                },
                {
                  push: "\"That's above our range.\"",
                  response: "Don't immediately concede. 'Can you help me understand the range you're working with? I want to make sure we have a real conversation here.' Sometimes 'above our range' is a test. Sometimes the range is flexible. Find out before you move.",
                },
                {
                  push: "\"We'll discuss comp later — for now, are you interested?\"",
                  response: "You can signal interest without committing: 'I'm definitely interested in the role — I'd want to validate that we're aligned on comp before I invest more time on both sides. Can we do a quick range check now?' A company that genuinely wants you will accommodate a 30-second range check.",
                },
              ].map(item => (
                <div key={item.push} className="rounded-xl border border-[var(--border)] bg-white p-5">
                  <p className="font-semibold text-[var(--ink)] text-[14px]">{item.push}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]"><span className="font-medium text-[var(--ink)]">How to respond: </span>{item.response}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">How to research your number before the conversation</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              You can&apos;t deflect forever. At some point you need a number, and it should be based on something. Four places to research market compensation:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { source: "Levels.fyi", detail: "Best for tech roles — has actual self-reported comp data including base, bonus, equity, and total comp by company and level." },
                { source: "Glassdoor / LinkedIn Salary", detail: "Broader coverage across industries. Use as a range check — individual data points can be stale or skewed." },
                { source: "Company pay transparency filings", detail: "Some states (Colorado, California, New York) require companies to post salary ranges on job listings. If the posting doesn't have one, check the company's listings in those states for the same title." },
                { source: "Informational conversations", detail: "The most accurate data comes from people in the role at the target company or similar companies. One honest conversation with someone at the company beats 10 data points from aggregators." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[#4361EE]">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.source}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
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
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Practice the salary conversation before it counts</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari simulates the salary expectations conversation — including all the pressure moves above — so you can practice responding without stakes before you&apos;re in front of a real recruiter.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Practice with Zari →
            </Link>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
