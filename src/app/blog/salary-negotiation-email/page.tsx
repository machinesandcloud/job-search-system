import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Salary Negotiation Email — Templates That Work (2025)",
  description:
    "Most salary negotiation emails fail because they're either too aggressive (ultimatum framing) or too weak (asking permission to negotiate). The effective approach: state your counter specifically, anchor it to market data, and make it easy for the employer to say yes. Templates for every scenario.",
  keywords: ["salary negotiation email", "salary negotiation email template", "how to negotiate salary via email", "counter offer email", "salary negotiation examples", "job offer negotiation email 2025", "salary counter offer letter"],
  alternates: { canonical: "/blog/salary-negotiation-email" },
  openGraph: {
    title: "Salary Negotiation Email — Templates That Work (2025)",
    description: "Most negotiation emails are too aggressive or too weak. The effective approach: state your counter specifically, anchor it to market data, make it easy to say yes. Templates for every scenario.",
    url: "/blog/salary-negotiation-email",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHY_EMAILS_FAIL = [
  { mistake: "Starting with gratitude instead of the counter", problem: "Opening with three sentences of thanks before stating your number buries your ask and signals that you're more relieved than confident. State your counter in the first or second sentence." },
  { mistake: "Not naming a specific number", problem: "'I was hoping for something a bit higher' is not a negotiation — it's an invitation for the employer to offer $500 more and call it done. Every salary negotiation email must include a specific number or range." },
  { mistake: "Anchoring to need instead of market", problem: "'I need $X because of my rent/student loans/current salary' puts you in a weaker position than 'market data suggests $X for this role.' Anchor to external data, not personal circumstances." },
  { mistake: "Using ultimatum language", problem: "'I cannot accept the offer unless...' or 'This is my minimum...' triggers a binary yes/no decision instead of a collaborative negotiation. Express enthusiasm for the role while clearly stating what you need to move forward." },
  { mistake: "Making it hard to respond", problem: "A long email with multiple asks (salary + equity + start date + sign-on) forces the employer to process a list. If you have multiple asks, email your primary one and leave others for the phone call that follows." },
];

const EMAIL_TEMPLATES = [
  {
    scenario: "First counter offer — standard new job",
    subject: "Re: Offer for [Job Title]",
    body: `Hi [Name],

Thank you for the offer — I'm genuinely excited about the [Job Title] role and the opportunity to join [Company Name].

After reviewing the details, I'd like to discuss the base salary. Based on my research into market compensation for this role in [City/market] and comparable experience levels, I'm targeting a base of $[X]. Would [Company Name] be able to move in that direction?

I'm committed to making this work and look forward to your thoughts.

[Your name]`,
    notes: "Counter $5,000–$15,000 above the midpoint of your target range to leave room for a counteroffer. Keep it short — employers prefer responding to one clear ask.",
  },
  {
    scenario: "Counter offer — when you have a competing offer",
    subject: "Re: Offer for [Job Title]",
    body: `Hi [Name],

Thank you for the offer — [Company Name] is still my first choice, and I'm very interested in making this work.

I want to be transparent: I'm currently in final conversations with another company at $[X] base. I'd much prefer to join [Company Name], but I want to be straightforward with you so we can find an outcome that works.

Is there any flexibility to get to $[target]? That would make the decision straightforward for me.

[Your name]`,
    notes: "Only use this template if you actually have a competing offer. Fabricating offers is easily verified and destroys trust. The competing offer should be real, documented, and close in role type.",
  },
  {
    scenario: "Negotiating via email when you prefer phone",
    subject: "Re: Offer for [Job Title]",
    body: `Hi [Name],

Thank you for the offer — I'm very excited about the [Job Title] role.

I'd love to schedule a brief call to discuss the compensation package. I want to make sure we land on something that works for both sides. Are you available for a 10-minute call [Day] or [Day] afternoon?

[Your name]`,
    notes: "Use this when you'd rather negotiate on the phone but want to signal you have a counter without starting the conversation in writing. This gets you to a phone call without revealing your number first.",
  },
  {
    scenario: "Negotiating equity or sign-on when base is firm",
    subject: "Re: Offer for [Job Title]",
    body: `Hi [Name],

Thank you again for the offer — I'm excited about the role and [Company Name].

I understand the base salary may have limited flexibility. I wanted to ask whether there's room to discuss either the equity component or a sign-on bonus to bridge the gap with my current total compensation. Even a one-time sign-on would make the transition much easier.

I'm looking forward to joining the team and happy to discuss whatever works best.

[Your name]`,
    notes: "When base has a hard ceiling (common at larger companies with salary bands), shifting to sign-on or equity is the effective path. Sign-on is often easier to approve than base changes because it's a one-time cost.",
  },
  {
    scenario: "Following up after no response for 3+ days",
    subject: "Re: Offer for [Job Title] — Following Up",
    body: `Hi [Name],

I wanted to follow up on my note from [Day]. I'm still very interested in the [Job Title] role and looking forward to finalizing things.

Please let me know when you have a moment to connect — I'm happy to discuss by phone if that's easier.

[Your name]`,
    notes: "Don't re-state your counter in the follow-up. Simply reaffirm enthusiasm and prompt a response. If you've heard nothing after two follow-ups, call the recruiter directly.",
  },
];

const TIMING_RULES = [
  { rule: "Never negotiate on the spot", detail: "When an offer is extended verbally, express enthusiasm and ask for the offer in writing before responding. 'I'm very excited — I'd love to review the full details and get back to you by [specific date].' This gives you time to research and draft your counter without pressure." },
  { rule: "Set a response deadline of 24–72 hours", detail: "Employers expect negotiation. Responding within 72 hours with a counter is normal and professional. Don't drag it out past 5 business days — it signals indecision and some employers will assume you're using them as leverage and move to other candidates." },
  { rule: "Send your email Tuesday–Thursday, morning", detail: "Hiring managers are most responsive mid-week. Friday afternoon emails get lost in weekend transitions. Monday morning emails compete with inbox overload. Tuesday–Thursday 9–11am local time gets the fastest response." },
  { rule: "Always restate your enthusiasm in the same email", detail: "Every salary negotiation email should include one clear signal that you want the job. Employers don't owe you a negotiation — they're more likely to try to find a path if they believe you'll accept at the right number. Don't leave this ambiguous." },
];

const FAQS = [
  { question: "Is it better to negotiate salary by email or phone?", answer: "It depends on your confidence and the employer's communication style. Email advantages: you can craft your wording carefully, you have a record of what was discussed, and you don't have to respond in the moment. Phone advantages: tone communicates enthusiasm better than text, you can have a real conversation instead of an asynchronous exchange, and you can pivot based on the recruiter's reaction. The most effective approach for many people: email to signal you have a counter ('I'd love to discuss the package — are you available for a quick call?'), then negotiate on the phone. If the employer prefers email or is remote, a well-crafted email is fully effective." },
  { question: "How much should you counter offer in a salary negotiation email?", answer: "Counter 10–20% above the offer, or the amount needed to reach your target, whichever is less. For most professional roles: $5,000–$20,000 above the offer is a reasonable counter range. Less than $3,000 signals you don't have real market data. More than 30% above the offer without extraordinary justification can end the conversation. The key: anchor to external market data (Glassdoor, Levels.fyi, LinkedIn Salary, Bureau of Labor Statistics) — not your current salary or personal needs. If you have a competing offer, you can counter higher because you're negotiating between two real data points." },
  { question: "What if the employer says the salary is non-negotiable?", answer: "'Non-negotiable' usually means: the base is at the top of the band for this level. Pivot to: (1) sign-on bonus — often funded differently from salary and easier to approve; (2) equity — additional options or RSUs if it's a tech or startup environment; (3) performance review timing — negotiate a 6-month review instead of 12-month, with a specific raise attached to hitting agreed goals; (4) title — if a higher title comes with a higher salary band, negotiating title gets you a pay increase without violating the band; (5) benefits — extra PTO, remote flexibility, professional development budget. When base truly can't move, there are almost always other levers." },
];

export default async function SalaryNegotiationEmailPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Salary Negotiation Email — Templates That Work (2025)"
        description="Most negotiation emails are too aggressive or too weak. The effective approach: state your counter specifically, anchor it to market data, make it easy to say yes. Templates for every scenario."
        url={`${BASE_URL}/blog/salary-negotiation-email`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Salary Negotiation Email", url: `${BASE_URL}/blog/salary-negotiation-email` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Negotiation · Email Templates</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Salary Negotiation Email</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most salary negotiation emails fail because they&apos;re either too aggressive or too vague. The effective ones state a specific counter, anchor it to market data, and make it easy for the employer to say yes.
          </p>
        </div>
      </section>

      {/* Why emails fail */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why most negotiation emails don&apos;t work</h2>
          <div className="mt-6 space-y-3">
            {WHY_EMAILS_FAIL.map((item) => (
              <div key={item.mistake} className="rounded-xl border border-red-100 bg-red-50/40 p-4 flex gap-3">
                <span className="text-red-500 font-bold text-[14px] flex-shrink-0 mt-0.5">✗</span>
                <div>
                  <p className="font-bold text-[var(--ink)] text-[13.5px]">{item.mistake}</p>
                  <p className="mt-1 text-[12.5px] leading-5 text-[var(--muted)]">{item.problem}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Salary negotiation email templates</h2>
          <div className="mt-6 space-y-6">
            {EMAIL_TEMPLATES.map((template) => (
              <div key={template.scenario} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="bg-[var(--dark)] px-5 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">{template.scenario}</p>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">Subject line</p>
                  <p className="text-[13px] text-[var(--ink)] font-medium mb-4 italic">{template.subject}</p>
                  <div className="bg-[var(--bg)] rounded-xl p-4 font-mono text-[12.5px] leading-6 text-[var(--muted)] whitespace-pre-line">{template.body}</div>
                  <div className="mt-3 rounded-xl bg-amber-50 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1">When to use</p>
                    <p className="text-[12.5px] text-[var(--muted)]">{template.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timing rules */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Timing rules that change the outcome</h2>
          <div className="mt-6 space-y-3">
            {TIMING_RULES.map((item) => (
              <div key={item.rule} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.rule}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari coaches your full salary negotiation — from your counter to the final close.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari drafts your negotiation email, coaches your counter amount based on market data, and scripts your response to every common pushback — including &ldquo;this is the top of the band.&rdquo; Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
