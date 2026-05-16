import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Negotiate a Job Offer — Scripts, Tactics & What to Say (2025)",
  description:
    "How to negotiate a job offer without losing it. Includes word-for-word scripts for countering salary, negotiating equity, and handling common pushback — with what NOT to say.",
  keywords: ["how to negotiate a job offer", "job offer negotiation", "salary negotiation tips", "how to counter a job offer", "negotiate salary script", "job offer negotiation email", "how to ask for more salary"],
  alternates: { canonical: "/blog/how-to-negotiate-job-offer" },
  openGraph: { title: "How to Negotiate a Job Offer — Scripts, Tactics & What to Say (2025)", description: "Word-for-word scripts for negotiating salary, equity, and job offer terms without losing the offer.", url: "/blog/how-to-negotiate-job-offer" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-03-20";
const MODIFIED = "2025-05-15";

export default async function NegotiateJobOfferPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Negotiate a Job Offer — Scripts, Tactics & What to Say (2025)"
        description="Word-for-word scripts for negotiating salary, equity, and job offer terms without losing the offer."
        url={`${BASE_URL}/blog/how-to-negotiate-job-offer`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Negotiate a Job Offer", url: `${BASE_URL}/blog/how-to-negotiate-job-offer` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Salary & Negotiation</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Negotiate a Job Offer — Scripts, Tactics & What to Say (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 11 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              85% of hiring managers have room to improve an initial offer — and 70% expect candidates to negotiate. Most people don't. The ones who do earn an average of $5,000–$20,000 more in their first year. Here's exactly what to say.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The first thing to do when you get an offer</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Never accept or reject on the spot. When the offer comes — by phone or email — your first response is always the same:
            </p>
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-[14px] italic leading-7 text-[var(--muted)]">
              "Thank you so much — I'm really excited about this opportunity and the team. I'd love a few days to review the full offer details before I respond. Can you send everything in writing?"
            </div>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              This buys you time, gets the offer in writing, and signals seriousness without tipping your hand. Never negotiate verbally off a number you haven't seen in writing.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to counter on base salary — the exact script</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Counter by phone when possible — it's harder to say no to a person than an email. Have your number ready before you call. Counter 10–20% above the offer if you have market data to support it.
            </p>
            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 text-[14px] leading-7 text-[var(--muted)]">
              <p className="mb-2 font-bold text-emerald-700">✓ Script: countering salary by phone</p>
              <p className="italic">"I've had a chance to review the offer and I'm really excited about the role. Based on my research into market compensation for this level in [city/remote], and the experience I'm bringing — specifically [one relevant achievement] — I was hoping we could get to [your number]. Is there flexibility there?"</p>
            </div>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Then stop talking. The silence after your counter is not your problem to fill. Wait for their response.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Negotiating equity — what to ask and how to ask it</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Equity is often more negotiable than base salary, especially at startups. Before you negotiate equity, you need to understand what you're being offered:
            </p>
            <ul className="mt-3 space-y-2 text-[15px] leading-7 text-[var(--muted)]">
              <li><strong>Number of shares</strong> vs. <strong>percentage of the company</strong> — always ask for the percentage. Shares are meaningless without knowing the total share count.</li>
              <li><strong>Strike price (ISOs/NSOs)</strong> — what you'll pay per share if you exercise. Should be the 409A valuation at grant time.</li>
              <li><strong>Vesting schedule</strong> — typically 4-year with 1-year cliff. Negotiate for a shorter cliff or better acceleration provisions.</li>
              <li><strong>Last 409A valuation</strong> — tells you the current "paper value" per share.</li>
            </ul>
            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 text-[14px] leading-7 text-[var(--muted)]">
              <p className="mb-2 font-bold text-emerald-700">✓ Script: asking for more equity</p>
              <p className="italic">"I love the role and I'm aligned on base. I'd like to think longer-term with this company though — is there room to increase the equity portion? I'm targeting [X%] or [Y shares]. I'm committed to this being a multi-year relationship and want the comp to reflect that."</p>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Handling the 4 most common pushbacks</h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  pushback: '"That\'s the best we can do."',
                  response: '"I appreciate you being direct. Is the base salary truly fixed, or is there any flexibility on other elements — signing bonus, equity, or review timeline?"',
                  note: "Always separate base from total comp. \"Best we can do\" usually means the band, not the entire package.",
                },
                {
                  pushback: '"Our bands are set by HR and we can\'t go above them."',
                  response: '"I understand — are there other levers available? A one-time signing bonus, additional equity, or an accelerated review in 6 months would help bridge the gap."',
                  note: "HR bands apply to base. Signing bonuses and equity often come from a different budget.",
                },
                {
                  pushback: '"Other candidates are at the same level for less."',
                  response: '"I\'m sure that\'s true — compensation varies a lot by background. Based on [specific achievement or skill], I believe I\'d be at the higher end of productivity from day one, which is what I\'m trying to reflect in the number."',
                  note: "Don't apologize for your ask. Redirect to your specific value, not the market average.",
                },
                {
                  pushback: '"We need an answer by [tomorrow/end of week]."',
                  response: '"I\'m very interested in this role and want to move quickly. I need [X days] to review responsibly — I\'d rather give you a confident yes than rush a decision I\'m uncertain about. Can we extend to [date]?"',
                  note: "Deadlines are almost always soft. Companies don't rescind offers because a candidate asked for 48 more hours.",
                },
              ].map((item) => (
                <div key={item.pushback} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="mb-2 text-[13px] font-bold text-[var(--ink)]">They say: <span className="italic font-normal">{item.pushback}</span></p>
                  <div className="mb-3 rounded-xl border border-emerald-100 bg-emerald-50/30 p-3 text-[13px] italic text-[var(--muted)]">You say: "{item.response}"</div>
                  <p className="text-[12.5px] text-[var(--muted)]">{item.note}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What NOT to say when negotiating</h2>
            <div className="mt-4 space-y-3">
              {[
                { dont: "\"I need more because my rent just went up.\"", why: "Personal need is not a market argument. Employers pay for value, not need. Never justify your counter with personal expenses." },
                { dont: "\"My current salary is X so I need at least that.\"", why: "Your current salary is a floor, not leverage. If their offer is below your current comp, say that — but don't lead with it as your primary argument." },
                { dont: "\"I have another offer for X.\"", why: "Only use a competing offer if you actually have one and are prepared to share the company name. Invented competing offers destroy trust if they're doubted." },
                { dont: "\"Is there any flexibility?\"", why: "Vague questions get vague answers. Always name a specific number or a specific element (signing bonus, equity, review date). \"Any flexibility\" signals you don't know what you want." },
              ].map((item) => (
                <div key={item.dont} className="rounded-2xl border border-red-100 bg-red-50/40 p-5">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ {item.dont}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Practice your negotiation before the call</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Negotiating under pressure feels different from reading scripts. Zari's <Link href="/salary-negotiation-coach" className="text-[var(--brand)] underline underline-offset-2">salary negotiation coach</Link> runs live negotiation simulations — you say your counter, Zari plays the recruiter and throws the objections you're likely to face, and you get feedback on your response in real time. So the real call isn't the first time you've practiced.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice your negotiation with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Live negotiation simulation. Real objections. Feedback on every response.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start negotiation practice free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
