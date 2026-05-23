import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Salary Negotiation Coach — Scripts, Data, and Practice | Zari",
  description:
    "How salary negotiation actually works, why most people leave $10,000–$50,000 on the table, and what to say at each stage. Market benchmarks, counter-offer scripts, and live simulation coaching.",
  keywords: ["salary negotiation coach", "AI salary negotiation", "how to negotiate salary", "salary negotiation tips", "counter offer coach", "salary negotiation practice", "negotiate job offer", "salary negotiation scripts"],
  alternates: { canonical: "/salary-negotiation-coach" },
  openGraph: {
    title: "Salary Negotiation Coach — Scripts, Data, and Practice",
    description: "Market benchmarks, counter-offer scripts, and live negotiation simulation. Stop leaving money on the table.",
    url: "/salary-negotiation-coach",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const MISTAKES = [
  {
    mistake: "Accepting the first offer",
    cost: "~$5,000–$20,000 annually",
    detail: "First offers are almost never final. Companies budget a negotiation range — the initial number is the floor, not the ceiling. Most hiring managers expect a counter. Accepting immediately leaves the entire range on the table and sets a lower baseline for all future raises.",
  },
  {
    mistake: "Justifying with need, not value",
    cost: "Kills negotiation immediately",
    detail: '"I need more because my rent went up" is not a negotiation — it\'s a personal finance conversation that hiring managers can\'t engage with. Every counter-offer must be anchored to market data and the value you bring. "Based on market rates for this role in this market, and my X years of Y experience, I was expecting Z" is a negotiation.',
  },
  {
    mistake: "Not knowing the total compensation picture",
    cost: "Can miss $30,000+ in equity/benefits",
    detail: "Base salary is only one lever. Signing bonus, equity (RSUs, options), annual bonus structure, PTO, remote work, title, and start date are all negotiable. Candidates who only negotiate base salary often leave more value in equity and benefits than they gain in base.",
  },
  {
    mistake: "Disclosing their current salary",
    cost: "Anchors the offer to past, not market",
    detail: 'Sharing your current salary before an offer is made hands the company an anchor. If you\'re underpaid, it locks in a low offer. Many states have laws prohibiting employers from asking — but you can decline to share regardless. Redirect: "I\'d rather focus on the market rate for this role and what the position is worth."',
  },
];

const PHASES = [
  {
    phase: "Phase 1: Research before the conversation",
    detail: "Negotiation is won or lost before you open your mouth. Know the market rate for the specific role, seniority level, city, and company type. Use Levels.fyi for tech, Glassdoor and LinkedIn Salary for general market data, and our salary calculator for benchmarked ranges. Know the total compensation picture — not just base.",
    action: "Set your target number (what you want), your walkaway number (the minimum you'll accept), and your anchor number (what you'll open with — typically 10–20% above target to leave room to 'meet in the middle').",
  },
  {
    phase: "Phase 2: The initial offer conversation",
    detail: "When you receive an offer, don't accept or decline on the call. Express genuine enthusiasm for the role, then ask for time: 'This is really exciting — I'd like to take a day or two to review the full package. Can I get back to you by Thursday?' This gives you time to prepare a specific counter, not react in the moment.",
    action: "Get the full offer in writing: base salary, bonus target and structure, equity type and vesting schedule, signing bonus, benefits summary, and start date. You can't negotiate what you haven't seen.",
  },
  {
    phase: "Phase 3: The counter-offer",
    detail: "Lead with enthusiasm, anchor with market data, state your number, then stop talking. The pause after you state your number is the hardest part — most people fill it by walking their number back. Silence after a counter-offer is normal and is not a no. The structure: (1) Genuine excitement about the role. (2) Market data anchor. (3) Specific number. (4) Silence.",
    action: '"I\'m really excited about this role and the team — it\'s exactly what I\'ve been looking for. Based on market data for [role] in [city] at this seniority level, and given my background in [X], I was expecting something closer to [number]. Is there flexibility there?"',
  },
  {
    phase: "Phase 4: Handling pushback",
    detail: "The three most common pushbacks: 'This is our best offer.' 'We don't have budget.' 'We need an answer today.' None of these are necessarily true, and none are a hard no. 'Best offer' often means 'best base offer' — ask about signing bonus or equity. 'No budget' often means 'no base budget' — other levers may still be available. 'We need an answer today' is almost always pressure, not a real deadline.",
    action: "For each objection, have a pre-prepared specific response. Zari runs these scenarios with you in simulation until the pushback doesn't rattle you.",
  },
];

const FAQS = [
  {
    question: "Is it always okay to negotiate salary?",
    answer: "Yes — with one exception: government roles with non-negotiable pay bands (many federal and some state positions post a fixed scale). In virtually every private sector role, negotiation is expected. A 2023 Salary.com survey found 84% of employers have room to increase their initial offer, and 75% of candidates who negotiate receive more. The risk of asking is low — almost no offer is rescinded for a professional, reasonable counter-offer. The risk of not asking is mathematical: accepting $5,000 below your market rate compounds over a career of raises and future offers.",
  },
  {
    question: "What if the recruiter asks for my salary expectations before an offer?",
    answer: "This is a common tactic to anchor the offer before you have data. The goal is to delay disclosing a specific number as long as possible. Two approaches: (1) Defer: 'I'd like to learn more about the full role and compensation structure before I give a number — I want to make sure we're aligned on scope and total comp.' (2) Range: If pushed, give a research-backed range starting at your target number, not your floor. Never give a range where the bottom is acceptable — they'll offer the bottom. A number like '$130,000–$155,000 depending on the full package' signals market knowledge without anchoring low.",
  },
  {
    question: "How do I negotiate a raise instead of a new offer?",
    answer: "Internal raise negotiation follows the same framework but with additional leverage: your track record is visible, your switching cost is documented, and your employer has invested in your development. The sequence: (1) Document your specific impact from the last 12 months with numbers. (2) Research external market rate — if you can show you're underpaid relative to market, you have a strong argument. (3) Request a meeting explicitly for compensation review — don't spring it on a 1:1. (4) Lead with your impact, anchor with market data, give a specific number. (5) If declined, ask what would need to change for you to reach that number by when — get a concrete answer.",
  },
  {
    question: "How much can I realistically gain from salary negotiation?",
    answer: "Studies consistently find that candidates who negotiate receive 5–20% more than the initial offer. The wide range depends on the gap between the initial offer and market rate, the role seniority (more leverage at senior levels), and how specifically the candidate anchors the conversation in data rather than need. In absolute terms: a $120K offer negotiated to $135K is $15K more in year one — and that $15K becomes the baseline for future raises, future offers, and future 401k matching. The compounding effect over a career is significant. Zari users report recovering an average of $18K on their first negotiation after coaching.",
  },
  {
    question: "What if I'm changing industries and can't claim my current salary?",
    answer: "Career changers have less leverage on 'I earn X now' but equal leverage on market data. The anchor isn't your history — it's the market rate for the target role. Research what people in this role, at this level, in this market actually earn. Your argument is 'the market rate for this role is X, and my background in [transferable area] accelerates the timeline to full contribution — I was expecting Y.' What you earned in a different industry is irrelevant to what this role pays.",
  },
];

export default async function SalaryNegotiationCoachPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Salary Negotiation Coach — Scripts, Data, and Practice"
        description="How salary negotiation actually works, the mistakes that cost most people $10,000–$50,000, and what to say at each stage."
        datePublished={publishedDate}
        dateModified={publishedDate}
        url={`${BASE_URL}/salary-negotiation-coach`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Salary Negotiation Coach", url: `${BASE_URL}/salary-negotiation-coach` }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "700px", height: "700px", top: "-10%", right: "-10%", background: "#10B981", opacity: 0.06, filter: "blur(160px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Salary Negotiation · Counter-Offer Scripts · Live Simulation
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            Know your number.<br />
            <span style={{ background: "linear-gradient(135deg,#10B981,#34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Ask for it with confidence.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            84% of employers have room to increase their initial offer. Most candidates never ask. Zari gives you the market data, the exact words to say, and simulated pushback practice — so the real conversation isn&apos;t the first time you&apos;ve had it.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-0.5" style={{ background: "#10B981" }}>
              Practice negotiating free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {[
              { stat: "84%", label: "of employers have room to increase their initial offer" },
              { stat: "$18K", label: "average additional comp Zari users recover on first negotiation" },
              { stat: "75%", label: "of candidates who negotiate receive more — most never ask" },
            ].map(({ stat, label }) => (
              <div key={stat} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-4 text-center">
                <p className="text-[1.8rem] font-extrabold text-[#10B981]">{stat}</p>
                <p className="mt-1 max-w-[160px] text-[11px] leading-4 text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#10B981]">Where money is lost</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">Four negotiation mistakes that cost most people $10,000–$50,000</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Salary negotiation isn&apos;t complicated — but there are specific patterns that predictably fail. These are the mistakes we see most often, and what they cost.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {MISTAKES.map(({ mistake, cost, detail }) => (
              <div key={mistake} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="font-extrabold text-[15px] text-[var(--ink)]">{mistake}</h3>
                  <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold text-red-600">{cost}</span>
                </div>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 4 phases */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#10B981]">How to negotiate</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">The four phases of a successful salary negotiation</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Every successful negotiation follows the same structure. Knowing what phase you&apos;re in — and what to do in each — turns an anxious conversation into a predictable process.
          </p>
          <div className="space-y-5">
            {PHASES.map(({ phase, detail, action }, i) => (
              <div key={phase} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-start gap-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white" style={{ background: "#10B981" }}>{i + 1}</div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-extrabold text-[15px] text-[var(--ink)]">{phase}</h3>
                    <p className="mb-4 text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
                    <div className="rounded-lg border-l-4 bg-[#10B98110] p-4" style={{ borderColor: "#10B981" }}>
                      <p className="text-[11px] font-bold uppercase text-[#10B981] mb-1">What to do / say</p>
                      <p className="text-[12px] leading-5 text-[var(--muted)] italic">{action}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="py-16" style={{ background: "#10B981" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-3 text-[1.9rem] font-extrabold text-white">Practice the conversation before it&apos;s real.</h2>
          <p className="mb-7 text-[15px] text-white/75">Zari runs realistic negotiation simulations with pushback — so the real conversation isn&apos;t the first time you&apos;ve had it.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#059669] transition-all hover:-translate-y-0.5">
            Start negotiation coaching free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#10B981]">Common questions</div>
          <h2 className="mb-10 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Everything about salary negotiation</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-3 font-bold text-[15px] text-[var(--ink)]">{question}</h3>
                <p className="text-[13px] leading-7 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-28 text-white" style={{ background: "linear-gradient(135deg, #022b1e 0%, #0a5c3b 50%, #10B981 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-[2.6rem] font-extrabold tracking-[-0.03em]">Stop leaving money on the table.</h2>
          <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/60">
            Market benchmarks, counter-offer scripts, and live negotiation simulation — free to start. No credit card, no scheduling.
          </p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#059669] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)]">
            {userId ? "Go to dashboard" : "Practice negotiating — it's free"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <p className="mt-5 text-[12px] text-white/35">No credit card required · Market data included · Pushback simulations built in</p>
        </div>
      </section>
    </PageFrame>
  );
}
