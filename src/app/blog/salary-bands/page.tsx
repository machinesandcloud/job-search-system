import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Salary Bands Explained — How to Use Them in Negotiations (2025)",
  description:
    "Salary bands are how employers set pay ranges by role and level — and they're the invisible constraint in most negotiations. Learn how bands work, how to find them, and how to negotiate when you're told 'we're already at the top of the band.'",
  keywords: ["salary bands", "salary band negotiation", "pay bands", "compensation bands", "salary range negotiation", "we're at the top of the band", "salary bands explained 2025"],
  alternates: { canonical: "/blog/salary-bands" },
  openGraph: {
    title: "Salary Bands Explained — How to Use Them in Negotiations (2025)",
    description: "How salary bands work, how to find them, and how to negotiate when the recruiter says 'we're already at the top of the band.'",
    url: "/blog/salary-bands",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const HOW_BANDS_WORK = [
  {
    concept: "The anatomy of a salary band",
    explanation: "A salary band is a range — minimum, midpoint, and maximum — for a given job level at a company. Level 4 Software Engineer: $140K–$175K. Level 5: $175K–$220K. The band exists to create internal equity (people doing the same job at the same level are paid similarly) and to control labor costs. Where you land in the band depends on hiring market conditions, your experience relative to others at that level, and negotiation.",
    insight: "Most offers start at the 50th–60th percentile of the band. The maximum is real and reachable in negotiation — companies rarely hire at band minimum intentionally.",
  },
  {
    concept: "Why 'we're at the top of the band' is almost always negotiable",
    explanation: "When a recruiter says 'we're already at the top of the band,' they mean one of two things: (1) they're actually at the maximum, which is unusual for first offers, or (2) they're using the band as negotiating leverage. Companies have more flexibility than bands suggest because: bands get updated, exceptions get approved, and non-salary components (signing bonus, equity, title) can effectively increase total comp without adjusting base.",
    insight: "The correct response is never to accept this at face value. Ask which level the role is leveled at, whether the level could be adjusted, and what non-salary components can be adjusted to meet your number.",
  },
  {
    concept: "Level and leveling — the hidden variable",
    explanation: "Your salary outcome is determined more by which level you're offered than where in the band the offer falls. A Level 5 offer at midpoint ($197K) is worth more than a Level 4 offer at maximum ($175K). If you suspect you're being underleveled — offered a lower level than your experience warrants — negotiating the level is more impactful than negotiating within the band. Signs of underleveling: the JD describes responsibilities matching a higher level, teammates with your experience are at a higher level, or the offer feels inexplicably low.",
    insight: "Ask directly: 'Can you share the leveling matrix or the scope criteria for this level? I want to make sure we're aligned on where this role sits relative to my experience.'",
  },
  {
    concept: "Pay transparency laws and how to use them",
    explanation: "Colorado (2021), New York City (2022), California (2023), and Washington state now require employers to post salary ranges on job listings. Even outside these jurisdictions, many companies voluntarily post ranges. When a range is posted, it's a signal, not a ceiling — companies post ranges based on the full band, and many candidates successfully negotiate above the posted midpoint. Never assume the bottom of the posted range is the offer and the top is impossible.",
    insight: "When a salary range is posted: research the midpoint and 75th percentile of the band, counter at the 75th percentile, and give specific rationale for why your experience places you there — not at the posted range's midpoint.",
  },
];

const WHAT_TO_DO_WHEN = [
  {
    situation: "\"We're already at the top of our band for this role\"",
    whatItActuallyMeans: "Often means: 'We're at our target offer, not the actual maximum.' The band maximum is rarely offered on the first pass. Sometimes it means the band genuinely caps out here — but even then, non-salary levers remain.",
    howToRespond: "\"I understand the base is constrained at that level. Can we explore whether there's flexibility in the signing bonus or equity refresh to close the gap to $[your target]? And is there any possibility of reviewing the leveling — I've been working at [higher scope] for the past [time period] and want to make sure we're aligned on level.\"",
    outcome: "Signing bonus approval doesn't affect internal equity or band structure — it's the most common way companies compensate above-band without creating precedent.",
  },
  {
    situation: "\"Our band for this role is $X–$Y\" (and the offer is at midpoint)",
    whatItActuallyMeans: "The band is typically presented to signal that the offer is 'fair.' The midpoint is where most offers land. The top of the band is still available — it's just not offered without negotiation.",
    howToRespond: "\"Thanks for sharing the range — I appreciate the transparency. Based on my [specific experience/skill/impact], I'm targeting the upper end of that range, around $[75th–90th percentile of posted range]. Here's why: [2–3 specific, concrete reasons]. Is there flexibility to move toward that end?\"",
    outcome: "A specific number with specific rationale is dramatically more effective than 'I was hoping for more.' The rationale anchors the conversation at a different reference point.",
  },
  {
    situation: "\"The role is leveled at [level X] and the band is $X–$Y\"",
    whatItActuallyMeans: "Leveling is often set before you interview and is the recruiter's starting assumption. If you believe you're more senior than the level implies, this is worth addressing.",
    howToRespond: "\"I'd love to understand the scope criteria that distinguish Level X from Level Y. Based on [specific scope: team size, budget, system complexity, company stage], my experience sits at the Level Y threshold. Would there be a way to revisit the leveling before we finalize — or can we structure the compensation to reflect that complexity?\"",
    outcome: "Leveling negotiation is highest-leverage because it resets the entire band, not just where you land in the current one. It requires evidence, not just assertion.",
  },
];

const FAQS = [
  { question: "What is a salary band?", answer: "A salary band (also called a pay band or compensation band) is a range of salaries a company pays for a given job level. For example, a company might have a band of $120K–$160K for all Senior Analysts at Level 4, regardless of department. Bands are set by HR and compensation teams using market data (Radford, Mercer, Levels.fyi, industry surveys) and internal equity considerations. Most companies have 5–10 levels per function, each with its own band." },
  { question: "Can I negotiate outside a salary band?", answer: "Yes — but it requires one of three mechanisms: (1) signing bonus, which is one-time and doesn't affect ongoing band placement; (2) equity (RSUs, options), which supplements base without touching band; or (3) level adjustment, which changes the band itself. Base salary above the band maximum is rare but not impossible at small companies or for critical hires. At large companies (public, 1,000+ employees), band exceptions require VP-level approval and are uncommon." },
  { question: "How do I find a company's salary bands?", answer: "Pay transparency laws now require salary range disclosure in CO, CA, NY, and WA — check those job postings. Levels.fyi has detailed level and compensation data for tech companies. Glassdoor, LinkedIn Salary, and Payscale have self-reported data. Blind (anonymous professional network) often has current employee data. Finally, ask the recruiter directly: 'Can you share the band for this level? It would help me understand the full picture before we finalize.'" },
  { question: "What does 'midpoint' mean for my negotiation?", answer: "The midpoint is typically 50th percentile of the band — where a 'fully proficient' employee in this role is expected to land after 2–3 years. A new hire offer at the midpoint is standard. Negotiating toward the 75th–90th percentile of the band (the top quartile) is appropriate for candidates with above-average experience, specific skills the company is struggling to find, or competing offers. The top of the band (90th–100th percentile) is typically reserved for exceptional candidates or retention situations." },
];

export default async function SalaryBandsPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-16";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Salary Bands Explained — How to Use Them in Negotiations (2025)"
        description="How salary bands work, how to find them, and how to negotiate when the recruiter says 'we're already at the top of the band.'"
        url={`${BASE_URL}/blog/salary-bands`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Salary Bands", url: `${BASE_URL}/blog/salary-bands` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Salary Negotiation · Career Strategy</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Salary Bands Explained</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Salary bands are the invisible constraint behind every negotiation. Understanding how they work — and what to say when you hit them — is what separates candidates who accept midpoint offers from those who consistently negotiate to the top of the range.
          </p>
        </div>
      </section>

      {/* How Bands Work */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How salary bands actually work</h2>
          <div className="mt-8 space-y-5">
            {HOW_BANDS_WORK.map((item, i) => (
              <div key={item.concept} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[13px] font-extrabold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-[var(--ink)]">{item.concept}</h3>
                    <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.explanation}</p>
                    <div className="mt-4 rounded-xl bg-[var(--brand)]/[0.05] p-4">
                      <p className="text-[12px] font-semibold text-[var(--brand)]">Key insight: {item.insight}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Do When */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to say — word for word — in each band scenario</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">The exact situation, what it actually means, and how to respond to move the number.</p>
          <div className="mt-8 space-y-5">
            {WHAT_TO_DO_WHEN.map((item) => (
              <div key={item.situation} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mb-4 rounded-xl bg-[var(--ink)]/[0.05] px-4 py-3">
                  <p className="font-bold text-[var(--ink)] italic">{item.situation}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What it actually means</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.whatItActuallyMeans}</p>
                  </div>
                  <div className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">How to respond</p>
                    <p className="text-[13px] italic leading-6 text-[var(--muted)]">{item.howToRespond}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3">
                    <p className="text-[12px] font-semibold text-emerald-700">Outcome: {item.outcome}</p>
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
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get coached through your specific salary negotiation.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches the full negotiation — from calculating your counter to scripting the conversation and handling the band pushback. Word for word, for your specific offer. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
