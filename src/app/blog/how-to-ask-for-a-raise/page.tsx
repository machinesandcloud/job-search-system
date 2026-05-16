import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Ask for a Raise — Scripts, Timing & What to Say (2025)",
  description:
    "How to ask for a raise and actually get it. Includes the exact timing, preparation steps, word-for-word scripts, how much to ask for, and how to handle the most common objections.",
  keywords: ["how to ask for a raise", "ask for a raise", "salary raise tips", "how to negotiate a raise", "raise conversation script", "how to get a raise at work", "how to ask for a salary increase", "asking for a raise tips"],
  alternates: { canonical: "/blog/how-to-ask-for-a-raise" },
  openGraph: { title: "How to Ask for a Raise — Scripts, Timing & What to Say (2025)", description: "The exact timing, preparation, and word-for-word scripts for a raise conversation that works.", url: "/blog/how-to-ask-for-a-raise" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-01";
const MODIFIED = "2025-05-16";

export default async function HowToAskForRaisePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Ask for a Raise — Scripts, Timing & What to Say (2025)"
        description="The exact timing, preparation, and word-for-word scripts for a raise conversation that works."
        url={`${BASE_URL}/blog/how-to-ask-for-a-raise`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Ask for a Raise", url: `${BASE_URL}/blog/how-to-ask-for-a-raise` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Negotiation</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Ask for a Raise — Scripts, Timing & What to Say (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 11 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Most people who deserve a raise don&apos;t get one — not because their manager doesn&apos;t think they&apos;re valuable, but because they never asked. Or because they asked wrong. Here&apos;s how to ask right.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">When to ask for a raise</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Timing matters more than most people think. The best moments:
            </p>
            <div className="mt-5 space-y-3">
              {[
                { timing: "After a major win or project delivery", why: "Your value is most visible immediately after you&apos;ve demonstrated it. Don&apos;t wait for review season." },
                { timing: "At your performance review (if you prepare before it)", why: "Reviews are the standard moment — but most people walk in unprepared. The preparation happens 4-6 weeks before, not the night before." },
                { timing: "After you&apos;ve taken on significantly more scope", why: "If your responsibilities have grown but your compensation hasn&apos;t, that gap is the argument. Make it explicitly." },
                { timing: "When you have a competing offer (use carefully)", why: "The most powerful leverage — but it only works if you&apos;d genuinely accept the other offer. Using it as a bluff is high-risk." },
              ].map((item) => (
                <div key={item.timing} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-1 font-bold text-[var(--ink)]">✓ {item.timing}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]" dangerouslySetInnerHTML={{ __html: item.why }} />
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {[
                { timing: "During a budget freeze or layoffs", why: "Even if you deserve it, the decision isn&apos;t yours to make — and asking creates an awkward conversation that goes nowhere." },
                { timing: "Right after a mistake or performance issue", why: "Your leverage is lowest immediately after a stumble. Wait until you&apos;ve recovered the credibility." },
              ].map((item) => (
                <div key={item.timing} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-1 font-mono text-[12px] text-red-600">✗ {item.timing}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How much to ask for</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Know your number before the conversation — don&apos;t let your manager name a number first. Research market rates using Levels.fyi (for tech), Glassdoor, LinkedIn Salary, and Payscale. Use multiple data sources.
            </p>
            <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="mb-4 font-bold text-[var(--ink)]">How to think about your ask:</p>
              <div className="space-y-3">
                {[
                  { label: "Standard merit increase", range: "3–5%", context: "If you&apos;ve performed well but nothing extraordinary. Often the default companies offer." },
                  { label: "Strong performance increase", range: "8–15%", context: "If you&apos;ve significantly outperformed or taken on expanded scope. This requires strong evidence." },
                  { label: "Title change / promotion", range: "15–25%", context: "A new level of responsibility should come with a meaningful compensation change." },
                  { label: "Competing offer leverage", range: "15–30%+", context: "The most powerful lever. Your ask is anchored by the market offer, not internal politics." },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="min-w-[100px] text-center rounded-lg bg-[var(--brand)]/10 px-3 py-1.5 text-[13px] font-bold text-[var(--brand)]">{item.range}</div>
                    <div>
                      <p className="font-semibold text-[var(--ink)]">{item.label}</p>
                      <p className="text-[13px] text-[var(--muted)]" dangerouslySetInnerHTML={{ __html: item.context }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Word-for-word scripts</h2>

            <p className="mt-6 mb-3 font-bold text-[var(--ink)]">Opening the conversation (ask for a dedicated meeting)</p>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
              <p className="text-[13.5px] italic leading-6 text-[var(--muted)]">"I&apos;d like to set up 30 minutes to talk about my compensation. I have some thoughts on my impact over the past [X months] and the market for my role — I want to make sure we&apos;re aligned."</p>
            </div>

            <p className="mt-6 mb-3 font-bold text-[var(--ink)]">The actual ask (in the meeting)</p>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 text-[14px] leading-7 text-[var(--muted)]">
              <p>"I want to be direct: I&apos;d like to discuss a raise. Here&apos;s my thinking."</p>
              <p className="mt-4">"Over the past [X months], I&apos;ve [specific achievement 1], [specific achievement 2], and taken on [expanded scope]. [Brief quantification of impact]."</p>
              <p className="mt-4">"I&apos;ve also looked at what this role is paying in the market right now — comparable roles at similar companies are paying [market range]. I&apos;m currently at [your number], which puts me below that."</p>
              <p className="mt-4">"Based on both my performance and the market, I&apos;d like to get to [specific number or range]. Does that work, and what would it take to get there?"</p>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to handle the 4 most common objections</h2>
            <div className="mt-5 space-y-4">
              {[
                {
                  objection: "\"We just don&apos;t have budget right now.\"",
                  response: "\"I understand that — can we set a specific date when we revisit this? I want to make sure we have a concrete plan so this doesn&apos;t get pushed indefinitely.\"",
                },
                {
                  objection: "\"I have to talk to [HR / my manager / finance].\"",
                  response: "\"Of course — when can I expect to hear back? And is there anything you need from me to make the case internally?\"",
                },
                {
                  objection: "\"You&apos;re already at the top of your band.\"",
                  response: "\"If my contributions are above what the band reflects, that sounds like a conversation about the band or about a promotion path. Which makes more sense to focus on?\"",
                },
                {
                  objection: "\"Let&apos;s revisit this at your next review.\"",
                  response: "\"I&apos;m happy to wait until the review — can we agree on what specific milestones or metrics would justify the increase so I know exactly what to work toward?\"",
                },
              ].map((item) => (
                <div key={item.objection} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="mb-3 font-bold text-[var(--ink)]">Objection: {item.objection}</p>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1.5">Response</p>
                    <p className="text-[13.5px] italic leading-6 text-[var(--muted)]">{item.response}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Practice the conversation before it happens</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The biggest mistake in salary conversations is winging it. Your manager has had this conversation dozens of times. You might be having it for the first time. Zari&apos;s <Link href="/salary-negotiation-coach" className="text-[var(--brand)] underline underline-offset-2">AI salary negotiation coach</Link> simulates the conversation — giving you real-time feedback on your arguments and responses so you go in prepared.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice your raise conversation with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Simulate the negotiation, get feedback on your arguments, and walk in prepared for every objection.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start negotiation coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
