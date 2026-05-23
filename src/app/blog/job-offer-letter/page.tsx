import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Job Offer Letter — What to Look For, What's Negotiable (2025)",
  description:
    "A job offer letter is a document you can push back on — most candidates don't know what's negotiable. Section-by-section breakdown of what each clause means, what can be changed, what red flags look like, and what to ask before you sign.",
  keywords: ["job offer letter", "how to review job offer", "job offer negotiation", "what to look for in job offer", "offer letter review 2025", "job offer red flags", "employment offer letter"],
  alternates: { canonical: "/blog/job-offer-letter" },
  openGraph: {
    title: "Job Offer Letter — What to Look For, What's Negotiable (2025)",
    description: "Most candidates sign offer letters without understanding what's negotiable. Section-by-section breakdown of every clause — what it means, red flags, and what to push back on.",
    url: "/blog/job-offer-letter",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const OFFER_SECTIONS = [
  {
    section: "Base Salary",
    what_it_means: "The fixed annual compensation before taxes, paid as regular payroll. For most roles, this is the most important line in the offer — bonuses and equity are variable, base salary compounds into future raises and future offers.",
    negotiability: "High — base salary is the most commonly negotiated element. Most employers expect negotiation and set their initial offer below their ceiling. The standard counter is 10–20% above the initial offer, supported by market rate data.",
    red_flags: "Offers significantly below market rate without a clear explanation (high equity, exceptional benefits). Base salary that doesn't match what was discussed verbally during the interview process. A long vesting schedule with a low base is common at startups — evaluate the combination, not either component alone.",
    what_to_ask: "'The base salary in the offer is [X]. Based on market data for this role and location, I was targeting [Y]. Is there flexibility to close that gap?'",
  },
  {
    section: "Annual Bonus / Variable Compensation",
    what_it_means: "A performance-based payment, typically expressed as a percentage of base salary or a target dollar amount. 'Target bonus of 15%' means 15% of your base if you hit your individual and/or company goals — actual payout may be higher or lower depending on how the plan works.",
    negotiability: "Moderate — the bonus percentage itself is sometimes fixed by level (especially at larger companies with structured compensation bands), but the plan mechanics, payment timing, and proration for new employees can often be negotiated.",
    red_flags: "Bonus plans described vaguely ('discretionary bonus based on performance') — get specifics in writing. Plans where the company portion of the bonus is very large (e.g., 70% of bonus is tied to company performance for an individual contributor) — means you can execute perfectly and receive 30% of your target. Missing information about what happens to your bonus if you leave or are let go mid-year.",
    what_to_ask: "'Can you share the bonus plan mechanics — specifically how individual vs. company performance factors into the payout, and whether there's a proration for the first year?'",
  },
  {
    section: "Equity (Stock Options or RSUs)",
    what_it_means: "Ownership stake in the company. RSUs (Restricted Stock Units) at public companies have clear current market value. Stock options at private companies have speculative future value — they're worth nothing until a liquidity event. The vesting schedule (typically 4 years with a 1-year cliff) determines when you earn your equity.",
    negotiability: "High at private companies (especially startups). Often moderate at public companies where equity is part of a structured compensation band. The grant size, vesting schedule, and option price are all potentially negotiable.",
    red_flags: "Options with a 90-day post-termination exercise window — if you leave, you have 90 days to buy your options or lose them. RSUs at private companies that vest but can't be sold (illiquid). High valuations on equity that represent most of total compensation with a low base — if the equity doesn't vest or isn't worth what's projected, you've been underpaid on cash.",
    what_to_ask: "'Can you share the current 409A valuation and the most recent preferred share price? What's the fully diluted cap table, and approximately where would my equity rank in a liquidation event?'",
  },
  {
    section: "Start Date",
    what_it_means: "The date you're expected to begin employment. Most offers have a proposed start date that is the employer's preference, not an ultimatum.",
    negotiability: "High — start dates are almost always negotiable. Employers understand that candidates need to give notice, handle transitions, and occasionally need a few weeks between roles. A 2–4 week delay from the proposed start date is rarely a problem.",
    red_flags: "Extreme urgency ('we need you to start Monday') without a clear business explanation. Pressure tactics around start date that seem designed to prevent you from negotiating other terms. Start dates that conflict with equity vesting at your current employer — moving your start date by 1–2 weeks could mean losing thousands in unvested equity.",
    what_to_ask: "'The proposed start date is [X]. I'd like to start [Y] to ensure a clean transition with my current employer. Is that workable?'",
  },
  {
    section: "Benefits — Health, Dental, Vision",
    what_it_means: "Employer-sponsored health coverage for you and potentially your dependents. Details that matter: which plans are available, when coverage starts (some employers have 30–90 day waiting periods), what share of premiums the employer pays, and whether dependents are covered.",
    negotiability: "Low to moderate — benefits packages at larger companies are typically standardized and not individually negotiated. At smaller companies or startups, there may be flexibility on coverage level or a stipend instead of company plans.",
    red_flags: "Coverage waiting periods of more than 30 days — you'll need bridge coverage. High employee share of premiums (e.g., employee pays 50%+ of family plan cost). No coverage for mental health, vision, or dental when these are standard at comparable companies.",
    what_to_ask: "'Can you share the benefits guide, including premium costs for individual and family coverage, and when coverage starts?'",
  },
  {
    section: "PTO / Vacation Policy",
    what_it_means: "The amount of paid time off available, and whether it accrues or is granted upfront, capped or unlimited, and whether unused PTO is paid out at separation. 'Unlimited PTO' doesn't mean take as much as you want — it typically means no formal accrual and no payout at separation.",
    negotiability: "Moderate — additional PTO is commonly negotiated for senior roles. Moving from a specific accrual to a higher number is more commonly granted than other benefits adjustments. If the policy is 'unlimited,' negotiating isn't relevant — the actual amount you'll take is a culture question, not a policy one.",
    red_flags: "No information on whether PTO rolls over or is used-it-or-lose-it. Unlimited PTO policies at companies where the culture is high-pressure — unlimited often means zero in practice. PTO that doesn't start accruing until 90 days in.",
    what_to_ask: "'Does PTO roll over at year-end, and is there a payout for accrued unused PTO at separation? Is there flexibility to increase the vacation allowance to [X] days?'",
  },
  {
    section: "At-Will Clause / Non-Compete",
    what_it_means: "At-will employment means either party can end the relationship at any time without cause. Most US employment is at-will. Non-compete clauses restrict you from joining competitors or starting a competing business for a defined period after you leave.",
    negotiability: "Non-competes are often negotiable in scope, geography, and duration. Many non-competes are also unenforceable in certain states (California, North Dakota, Minnesota, Oklahoma all have strong non-compete restrictions). At-will employment itself is almost never negotiable at US companies.",
    red_flags: "Overly broad non-compete geography (nationwide when your work is regional). Long duration (2+ years) non-competes are harder to enforce but still create risk and legal uncertainty. Non-competes that cover your entire industry rather than specific competitors or roles. Non-solicitation clauses that would prevent you from working with any current client or customer.",
    what_to_ask: "'The non-compete clause appears quite broad. I'd like to discuss narrowing the scope to [specific competitors / a defined geographic area]. Is that something we can revise?'",
  },
];

const FAQS = [
  { question: "How long do I have to respond to a job offer?", answer: "Typically 2–5 business days for most offers — sometimes up to a week for senior roles. If you need more time, ask directly: 'I want to give this the consideration it deserves. Is it possible to have until [specific date] to respond?' Most employers will accommodate a reasonable extension. If an employer gives you a hard 24-hour deadline with no flexibility, that is itself information about how they operate. The only situation where a same-day deadline is normal: very competitive or urgent roles where the employer has a clear business need." },
  { question: "Can I negotiate after accepting a verbal offer?", answer: "Technically yes, but there's a relationship cost. Accepting a verbal offer and then reopening negotiation after receiving the written offer is generally considered poor form — the employer reasonably understood that you'd accepted the terms. The practical exception: if the written offer contains terms that were not discussed verbally (a non-compete you didn't know about, a lower bonus structure than implied), you have clear grounds to push back without relationship damage. The cleaner approach: don't accept a verbal offer until you're satisfied with the terms being offered. 'I'm very excited about this opportunity. I'll formally accept once I've had a chance to review the written offer' is always acceptable." },
  { question: "What happens if I negotiate and they rescind the offer?", answer: "This is extremely rare for professional roles — most employers expect negotiation and factor it into their offer. An employer who rescinds an offer because a candidate asked a professional, respectful question about compensation is signaling something important about how they operate. The risk is real but small, and it scales with how you negotiate: a respectful counter with market data almost never results in rescission; ultimatums and repeated aggressive negotiation carry more risk. If you're worried about this, it often reflects imposter syndrome more than actual risk — the market data shows that offers are rescinded over negotiation in less than 1% of cases." },
];

export default async function JobOfferLetterPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Job Offer Letter — What to Look For, What's Negotiable (2025)"
        description="Most candidates sign offer letters without understanding what's negotiable. Section-by-section breakdown of every clause — what it means, red flags, and what to push back on."
        url={`${BASE_URL}/blog/job-offer-letter`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Job Offer Letter", url: `${BASE_URL}/blog/job-offer-letter` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Negotiation · Offer Review</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Job Offer Letter</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most candidates sign offer letters without understanding what&apos;s negotiable. Every clause — from base salary to non-competes to PTO rollover — is a document you can push back on. Here&apos;s what each section means and what to ask before you sign.
          </p>
        </div>
      </section>

      {/* Offer Sections */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Section-by-section: what each clause means</h2>
          <div className="mt-8 space-y-5">
            {OFFER_SECTIONS.map((item) => (
              <div key={item.section} className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3.5 flex items-center gap-3">
                  <h3 className="font-bold text-[var(--ink)]">{item.section}</h3>
                  <span className={`ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.negotiability.startsWith("High") ? "bg-emerald-100 text-emerald-700" : item.negotiability.startsWith("Moderate") ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                    {item.negotiability.startsWith("High") ? "Highly negotiable" : item.negotiability.startsWith("Moderate") ? "Sometimes negotiable" : "Rarely negotiable"}
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.what_it_means}</p>
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Red flags</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.red_flags}</p>
                  </div>
                  <div className="rounded-xl bg-[var(--brand)]/[0.05] p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">What to ask</p>
                    <p className="text-[13px] leading-6 italic text-[var(--muted)]">{item.what_to_ask}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari coaches the full negotiation — before and after the offer lands.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari helps you calculate your counter, script the negotiation conversation, and handle every pushback — from 'we're at the top of the band' to 'this is our standard package.' Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
