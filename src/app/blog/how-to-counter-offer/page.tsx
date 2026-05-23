import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Counter Offer a Job — Scripts, Math & What to Say (2025)",
  description:
    "The exact number to counter with, what to say when you make the counter, and how to handle the 5 most common pushbacks — including 'we can't go higher' and the competing offer scenario.",
  keywords: ["how to counter offer a job", "counter offer salary", "how to counter offer salary", "counter offer letter", "job offer counter offer", "salary counter offer script"],
  alternates: { canonical: "/blog/how-to-counter-offer" },
  openGraph: {
    title: "How to Counter Offer a Job — Scripts, Math & What to Say (2025)",
    description: "The math behind your counter, the exact scripts, and how to handle every common pushback — including 'we can't go higher.'",
    url: "/blog/how-to-counter-offer",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COUNTER_MATH = [
  {
    scenario: "Standard market counter",
    formula: "Offer × 1.10–1.15",
    example: "$130,000 offer → counter at $143,000–$149,500",
    rationale: "10–15% above the offer is the range that gets taken seriously without triggering concern. Companies expect a counter. The midpoint between your counter and their offer usually lands near what they were willing to pay anyway.",
    whenToUse: "When you have solid market data suggesting you're underpaid, and you want to negotiate without creating friction. Works for most mid-level roles.",
  },
  {
    scenario: "Competing offer counter",
    formula: "Competing offer × 1.05–1.10 (or match + something)",
    example: "$155,000 competing offer → counter at $160,000–$170,500, or 'match the base and add equity'",
    rationale: "A competing offer is the most powerful leverage you have. Counter above the competing offer — not just at it — because the company now has to beat a real number rather than a phantom one. Adding a non-cash ask (extra PTO, equity) reduces cash risk for them while increasing your total package.",
    whenToUse: "When you have a real competing offer from a real company you'd actually take. Never fabricate this — it's verifiable and destroys trust if caught.",
  },
  {
    scenario: "Below-market correction",
    formula: "Market median × 1.05 (documented)",
    example: "$95,000 offer for a $120,000 market role → counter at $126,000 with market data cited",
    rationale: "When the offer is significantly below market, anchor the counter in data, not emotion. 'Based on [specific source], the median total comp for this role in [city] is $X — I'm asking for Y, which is just above market.' The number is more credible when sourced.",
    whenToUse: "When the offer is a clear miss — 15%+ below what comparable roles pay. Also useful when you're early career and have less leverage from performance history.",
  },
  {
    scenario: "Leveling disagreement counter",
    formula: "Target level comp − current offer = gap to negotiate",
    example: "Offered L4 at $140K; L5 (what you believe is accurate) pays $170K → counter for L5 evaluation or $165K at L4",
    rationale: "Companies often level conservatively in the first offer. If you have evidence you're operating at a higher level (responsibilities, scope, team size at current role), the leveling conversation is legitimate. Requesting a re-eval is better than just asking for more money — it frames the compensation as a correction, not a demand.",
    whenToUse: "When the responsibilities described in the offer clearly match a higher level than you've been placed. Back this up with specific examples, not just a feeling.",
  },
];

const PUSHBACK_SCRIPTS = [
  {
    pushback: "\"We've given you our best offer.\"",
    whatItActuallyMeans: "This is an opening negotiation move, not a factual statement. Almost no company sends a first offer that's their absolute ceiling. 'Best offer' is a signal to stop negotiating — ignore it politely.",
    script: "\"I appreciate that, and I know you're working within real constraints. I'm genuinely excited about this role and want to make it work. Is there any flexibility on [base / equity / signing bonus] that would help us get there? I'm countering at [$X] because [specific market data or competing context].\"",
    note: "The key is acknowledging the constraint while still asking the specific question. Don't withdraw your counter — restate it with brief justification.",
  },
  {
    pushback: "\"We can't go above the band for this level.\"",
    whatItActuallyMeans: "They may be constrained on base but have flexibility on equity, signing bonus, or performance review timing. Sometimes the band is real; often 'the band' is a negotiating signal to redirect you.",
    script: "\"I understand — can we look at the full package? If base is fixed, I'd like to explore whether there's room on the equity refresh or a signing bonus that would close the gap. Alternatively, is it possible to re-evaluate the leveling?\"",
    note: "Redirect from the constrained dimension to unconstrained ones. Bands rarely apply to equity and signing bonuses the same way they apply to base.",
  },
  {
    pushback: "\"We need an answer by Friday.\"",
    whatItActuallyMeans: "Deadline pressure is usually a closing tactic. Unless there's a hard business reason (another offer they've rescinded, headcount freeze), deadlines are often soft. Most companies would rather wait an extra week than restart a 3-month hiring process.",
    script: "\"I want to give this the consideration it deserves — I'm very interested and want to move thoughtfully. I can commit to giving you a decision by [specific date, typically 3–5 business days out]. Does that work?\"",
    note: "Name a specific date. Open-ended 'I need more time' invites friction. A specific reasonable date (not weeks away) is almost always accepted.",
  },
  {
    pushback: "\"We have other candidates.\"",
    whatItActuallyMeans: "They may or may not — this is often used to create urgency. If they had a strong backup who met the same bar, they'd have hired them already. Being reminded of 'other candidates' is a pressure tactic, not usually a factual update.",
    script: "\"I appreciate the transparency. I'm asking for [$X] because it reflects the market for this role and my specific background. If you're making the decision now, I'd like to work toward a package that reflects that value — I think that's a fair basis for a long-term relationship.\"",
    note: "Don't panic. Don't withdraw your ask under artificial urgency. Show calm confidence while reframing it as a long-term relationship.",
  },
  {
    pushback: "\"What's your current salary?\" (asked during negotiation)",
    whatItActuallyMeans: "They're trying to anchor your counter to your current compensation, not market rate. In many states, asking for salary history is illegal. Even where it's legal, you don't have to answer.",
    script: "\"I'd prefer to focus on what's fair for the role and the value I'd bring, rather than my current package. Based on [market data / the responsibilities described], I'm looking for a base in the [$X–$Y] range.\"",
    note: "You're not required to answer. Redirect to the market and the role. If they push hard on a number, give a target range, not your current salary.",
  },
];

const COUNTER_LETTER_TEMPLATE = `Subject: [Your Name] — Offer Discussion

Hi [Hiring Manager / Recruiter Name],

Thank you for the offer for [Role] at [Company]. I'm genuinely excited about this opportunity — the team, the product, and the scope of the role all feel like a strong fit.

After reviewing the full package, I'd like to discuss the compensation. Based on [comparable roles in this market / my research into similar positions / a competing offer I've received], I was expecting a base closer to [$X].

I'm countering at [$X — 10–15% above offer] and remain very interested in making this work. I'm happy to talk through the reasoning or discuss whether there are other components of the package that could bridge the gap.

Looking forward to the conversation.

[Your Name]`;

const WHAT_TO_NEGOTIATE_BEYOND_BASE = [
  { item: "Signing bonus", why: "One-time, doesn't affect salary band permanently. Most flexible lever for companies constrained on base.", howToAsk: "\"If base is constrained, could we look at a signing bonus to help bridge the gap?\"" },
  { item: "Equity grant size", why: "Companies often have more flexibility on equity than base, especially if they're pre-IPO or growth stage.", howToAsk: "\"I'd like to discuss whether there's room on the equity grant — I believe I'd be joining at a level where additional upside makes sense.\"" },
  { item: "Performance review timing", why: "Moving your first review from 12 months to 6 months accelerates the next salary conversation without increasing current cost.", howToAsk: "\"Can we agree to an early performance review at 6 months, with the expectation of a salary discussion at that point?\"" },
  { item: "Remote / flex policy", why: "Remote flexibility has financial value — commute cost, real estate, time. It's also often non-budget-constrained.", howToAsk: "\"Is there flexibility to work remotely [X days / fully]? That would factor significantly into my evaluation of the overall package.\"" },
  { item: "Start date", why: "Pushing out 2–4 weeks gives you more time if you're waiting on competing processes, and is rarely contested.", howToAsk: "\"I'd like to start on [specific date 3–4 weeks out] — is that workable?\"" },
];

const FAQS = [
  {
    question: "Will a counter offer get my job offer rescinded?",
    answer: "Almost never, and essentially never for a reasonable counter (10–15% above the offer). Rescinding an offer over a polite counter would be a significant overreaction that would also reflect badly on the company — they'd lose the candidate and potentially face reputational risk. The only scenarios where countering creates real risk: asking for more than 30–40% above the offer with no market justification, being aggressive or inflammatory in how you counter, or countering after indicating you'd accept. Be professional, be specific, and you're safe."
  },
  {
    question: "Should I counter a job offer over email or phone?",
    answer: "Either works — what matters is doing it at all. Email gives you more control: you can craft your wording precisely, attach market data, and remove emotion from the exchange. Phone allows for real-time dialogue and relationship-building, but you can't take it back if you misspeak. For most people, email is safer and easier. One option: send an email counter, then offer to jump on a call to discuss. You get the written record plus the relationship dynamic."
  },
  {
    question: "How many times can you counter a job offer?",
    answer: "Once or twice, depending on the company's responses. The rhythm: initial offer → your counter → their response → your final counter (if appropriate) → decision. Going back and forth more than twice starts to feel extractive and can damage the relationship before you even start. After your second counter, you should either accept, request a call to discuss the gap directly, or decline if the offer doesn't work for you."
  },
  {
    question: "What if I counter and they say no?",
    answer: "You're still in the driver's seat — you have three options: (1) accept the original offer, (2) ask what they can do on other components (signing bonus, equity, start date), or (3) decline. A 'no' to your counter doesn't mean the conversation is over — it means base is constrained. The response is to redirect: 'I understand. Is there any flexibility on the equity or a signing bonus?' You're not obligated to accept an offer just because you countered — and declining is always an option."
  },
];

export default async function HowToCounterOfferPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Counter Offer a Job — Scripts, Math & What to Say (2025)"
        description="The math behind your counter, the exact scripts, and how to handle every common pushback — including 'we can't go higher.'"
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/how-to-counter-offer`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Counter Offer", url: `${BASE_URL}/blog/how-to-counter-offer` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Salary Negotiation</span>
            <span className="text-[11px] text-white/30">10 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            How to counter offer a job<br /><span className="gradient-text-animated">the math, the scripts, the pushbacks</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most people accept the first offer. The ones who counter — professionally, with a specific number and brief reasoning — get better outcomes in the vast majority of cases. Here&apos;s the full playbook: how to calculate your counter, what to say, and how to handle every pushback.
          </p>
        </div>
      </section>

      {/* Counter math */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The counter offer math — 4 scenarios</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">How much to ask for depends on your leverage and the situation. Here&apos;s the formula and rationale for each scenario.</p>
          <div className="mt-8 space-y-5">
            {COUNTER_MATH.map((item) => (
              <div key={item.scenario} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{item.scenario}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="px-6 py-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Formula</p>
                      <p className="text-[15px] font-bold text-[#4361EE] font-mono">{item.formula}</p>
                    </div>
                    <div className="bg-[var(--brand)]/[0.03] px-6 py-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Example</p>
                      <p className="text-[13.5px] text-[var(--ink)]">{item.example}</p>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Rationale</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.rationale}</p>
                  </div>
                  <div className="bg-emerald-50/30 px-6 py-3">
                    <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-emerald-700">When to use: </span>{item.whenToUse}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email template */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Counter offer email template</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Professional, specific, and non-confrontational. Adapt the bracketed sections to your situation.</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Email template</p>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap px-6 py-5 font-mono text-[13px] leading-7 text-[var(--ink)] bg-white">
              {COUNTER_LETTER_TEMPLATE}
            </pre>
          </div>
        </div>
      </section>

      {/* Pushback scripts */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 5 pushbacks — and what to say</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Every pushback has a pattern. Know the pattern and the response becomes straightforward.</p>
          <div className="mt-7 space-y-4">
            {PUSHBACK_SCRIPTS.map((item) => (
              <div key={item.pushback} className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] bg-red-50/30 px-5 py-4">
                  <p className="font-bold text-[var(--ink)]">{item.pushback}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--muted)] italic">{item.whatItActuallyMeans}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="px-5 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">What to say</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)] italic">{item.script}</p>
                  </div>
                  <div className="bg-[var(--bg)] px-5 py-3">
                    <p className="text-[12px] text-[var(--muted)]"><span className="font-bold">Note: </span>{item.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond base */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to negotiate beyond base salary</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">When base is genuinely constrained, these levers often have more flexibility — and how to ask for each one.</p>
          <div className="mt-7 space-y-3">
            {WHAT_TO_NEGOTIATE_BEYOND_BASE.map((item) => (
              <div key={item.item} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] bg-white px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{item.item}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Why it has flexibility</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                  </div>
                  <div className="bg-[var(--brand)]/[0.04] px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">How to ask</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)] italic">{item.howToAsk}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Counter offer FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Practice your counter offer conversation with AI coaching.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches the full salary negotiation — from calculating your counter to handling every pushback live. Tell it your offer and target, and it runs the conversation with you. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Practice negotiation free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
