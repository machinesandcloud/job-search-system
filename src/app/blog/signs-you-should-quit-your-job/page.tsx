import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "12 Signs You Should Quit Your Job — And 4 Signs You Shouldn't Yet (2025)",
  description:
    "Honest, specific signs that distinguish a structural problem from a temporary rough patch — covering organizational signals, career trajectory, compensation, and wellbeing. Plus the 4 situations where quitting now would be a mistake.",
  keywords: ["signs you should quit your job", "should I quit my job", "when to quit your job", "signs it's time to leave your job", "is it time to quit my job", "reasons to quit your job"],
  alternates: { canonical: "/blog/signs-you-should-quit-your-job" },
  openGraph: {
    title: "12 Signs You Should Quit Your Job — And 4 Signs You Shouldn't Yet (2025)",
    description: "Structural problems vs temporary rough patches — the honest guide to knowing when it's time to leave.",
    url: "/blog/signs-you-should-quit-your-job",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const SIGNS_QUIT = [
  {
    category: "Career trajectory",
    accent: "#7C3AED",
    signs: [
      {
        sign: "You've been passed over for promotion twice with no clear path forward",
        detail: "One pass is a data point. Two is a pattern. If you've had the promotion conversation, know what's required, executed on it, and were still passed over — the ceiling is real. Some companies have structural limits on how many people can advance; others have informal quotas or politics that block deserving candidates. After two cycles, the burden of proof shifts to the company to show a credible path.",
        notThis: "If you've never had an explicit promotion conversation, or if the criteria were unclear, this isn't yet a signal to leave — it's a signal to have a direct conversation first.",
      },
      {
        sign: "The skills you're developing aren't valued anywhere else",
        detail: "Some roles deepen expertise that compounds over time. Others produce experience that's specific to one company, one tool, or one context that has no external market. If you can't clearly articulate what's transferable about what you're learning — and if external recruiters aren't reaching out for your profile — your market value may be quietly decaying.",
        notThis: "If you're early in a specialized field where depth takes time to develop, narrow skills now don't mean narrow options later.",
      },
      {
        sign: "People you'd want to learn from have left",
        detail: "The quality of the people around you is one of the most important contributors to career development. When senior people whose judgment you respected have departed — especially multiple people in a short period — you lose both the learning environment and an important signal about what they saw coming.",
        notThis: "If the departures are explained by a single event (acquisition, leadership change, specific project ending), it's worth waiting to see the new equilibrium.",
      },
    ],
  },
  {
    category: "Organizational signals",
    accent: "#DC2626",
    signs: [
      {
        sign: "Leadership has changed and the new direction is incompatible with your values",
        detail: "A change in CEO, VP, or direct manager can fundamentally change what a job is. If the new direction requires you to operate in ways that conflict with how you want to work — different ethics, different customer focus, different culture — staying and trying to change it is almost always slower and more corrosive than leaving.",
        notThis: "If it's been less than 3 months since the leadership change, the new direction may still be forming. Give yourself enough time to see what it actually looks like in practice.",
      },
      {
        sign: "The company is losing customers, market share, or key employees at a notable rate",
        detail: "When multiple negative signals compound — revenue declining, churn increasing, layoffs, departures — the trajectory matters more than the current state. A company that was great 18 months ago and is clearly declining is a different situation from a company going through a rough quarter.",
        notThis: "A single bad quarter or a specific event (macro downturn, a competitor move) that affected the whole industry is different from a structural decline in a single company.",
      },
      {
        sign: "You have no visibility into decisions that affect your work",
        detail: "Complete information opacity — where you find out about major changes affecting your role from the rumor mill or after the fact — signals either poor organizational culture or deliberate exclusion. Either is a problem. People can't do good work or plan their careers in environments where they're systemically kept uninformed.",
        notThis: "Some decisions are legitimately confidential until they're final. If the opacity is specifically around strategic decisions before announcement, that's normal. If it's opacity around decisions that are already made and operational, that's a signal.",
      },
      {
        sign: "Your manager is actively managing you out",
        detail: "The signs: sudden performance documentation that didn't exist before, exclusion from meetings you used to attend, your work being reassigned, being left off communications, receiving 'critical feedback' for the first time in years. This process has a well-known trajectory. Starting your search now — while you still have a job — puts you in a materially stronger position than waiting for the outcome.",
        notThis: "If you're new in a role and getting significant feedback, it may be genuine development. Managing out looks different: sudden, undocumented previously, often following a trigger event.",
      },
    ],
  },
  {
    category: "Compensation",
    accent: "#D97706",
    signs: [
      {
        sign: "You're being paid 20%+ below market and two raise conversations haven't moved the needle",
        detail: "Some compensation gaps can be negotiated internally. When they can't — when your company has demonstrated through multiple conversations that they won't close the gap — the only way to reset your compensation is external. Staying at 20% below market is a compounding cost: it affects raises (which are typically percentages of base), future offers (which often anchor to current salary), and your savings rate over years.",
        notThis: "If you haven't directly had the conversation with your manager — with data — this is a negotiation problem, not a leave problem. Try the internal path first.",
      },
      {
        sign: "Your equity has vested and there's no retention incentive keeping you",
        detail: "When the financial lock-in expires — RSUs vested, options exercised, cliff past — the decision to stay becomes a current-value decision rather than a sunk-cost one. This is a natural moment to re-evaluate whether you'd choose this company and role today, absent the retention mechanism.",
        notThis: "If you've just hit the one-year cliff of a 4-year vest, you still have three years of unvested equity. Do the math on what leaving now costs before treating this as a clean exit.",
      },
    ],
  },
  {
    category: "Wellbeing",
    accent: "#059669",
    signs: [
      {
        sign: "The job is affecting your physical health or sleep consistently",
        detail: "A deadline that disrupts sleep for two weeks is different from a structure that causes chronic sleep disruption, physical symptoms, or health decline. The latter is not a job problem — it's a compounding life problem. No compensation level makes systematic health compromise a rational trade for most people in most situations.",
        notThis: "Every demanding job has intense periods. If the intensity is genuinely seasonal or project-specific — not structural — it's worth distinguishing before making a permanent decision.",
      },
      {
        sign: "Sunday is ruined by dread about Monday",
        detail: "Occasional reluctance about a hard week ahead is normal. Consistent, week-over-week Sunday dread that eats into your personal time is a pattern worth paying attention to. The question isn't whether you feel it — it's whether you've diagnosed the specific cause and whether that cause is changeable.",
        notThis: "If the dread is tied to a specific project, a specific relationship, or a specific period — and there's a clear end in sight — this may be situational, not structural.",
      },
    ],
  },
];

const DONT_QUIT_YET = [
  { reason: "You haven't started your search", detail: "Quitting before you have another offer (or serious prospects) is almost always a financial mistake and a negotiating mistake. Being employed while searching puts you in a stronger position with every metric that matters — timeline pressure, comp negotiation, how you're perceived. The exception: if the job is actively harming your health, the calculus changes." },
  { reason: "You haven't had a direct conversation about what's wrong", detail: "If the problem is a specific relationship, a specific project, or a specific unmet expectation — and you haven't named it directly to the person who can change it — you haven't given the situation a real chance. Many people quit fixable situations rather than have uncomfortable conversations." },
  { reason: "You're less than 12 months into the role", detail: "Under 12 months is a short tenure that will need explaining in every future interview for the next several years. The exception is a role that was materially misrepresented or that has a specific, explainable trigger for early departure. Otherwise, staying to the 12-month mark costs you relatively little and removes a question mark from your resume." },
  { reason: "You're only motivated by what you're escaping, not what you're going toward", detail: "Reactive career moves driven entirely by what you're leaving — without clarity on what you want next — tend to land you in similar situations. The job search is more effective and the resulting role is better when you're moving toward something specific. Take 2–4 weeks to define what success looks like before you leave." },
];

const FAQS = [
  { question: "Should I quit my job without another one lined up?", answer: "In most situations, no — unless the job is actively harming your health, you have substantial savings, or the situation is so toxic that staying is degrading your future job performance. Being employed while searching produces better outcomes: you're not making decisions from financial pressure, employers perceive you differently, and you can negotiate from a position of choice rather than necessity. The exception: if staying is so corrosive that it's actually making your search less effective, the calculus can shift." },
  { question: "How do I know if I should quit or just take a break?", answer: "A break addresses exhaustion and stress — it doesn't change the structural conditions that created them. If you took three weeks off and came back to the same job, would the underlying problems (management, trajectory, compensation, culture) still be there? If yes, the break is recovery, not a solution. The real question isn't whether you need a break — it's whether the job itself is worth returning to." },
  { question: "How long should I job search before quitting?", answer: "The median time from first application to accepted offer for professional roles is 3–6 months. The range is wide depending on the industry, role level, and how actively you search. Start your search while employed, target a 3-month runway, and don't quit until you have an offer in hand. If you're in a truly intolerable situation and need to leave first: have 6 months of expenses saved before you do." },
];

export default async function SignsYouShouldQuitPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="12 Signs You Should Quit Your Job — And 4 Signs You Shouldn't Yet (2025)"
        description="Structural problems vs temporary rough patches — the honest guide to knowing when it's time to leave."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/signs-you-should-quit-your-job`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Signs You Should Quit Your Job", url: `${BASE_URL}/blog/signs-you-should-quit-your-job` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Decisions</span>
            <span className="text-[11px] text-white/30">11 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            12 signs you should quit<br /><span className="gradient-text-animated">and 4 signs you shouldn&apos;t yet</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            The question isn&apos;t whether something is wrong — it&apos;s whether it&apos;s structural or situational. Most job-change mistakes come from misidentifying which one you&apos;re in. This guide is specific enough to help you tell the difference.
          </p>
        </div>
      </section>

      {/* Signs to quit */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          {SIGNS_QUIT.map((cat) => (
            <div key={cat.category}>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.accent }} />
                <h2 className="text-[1.3rem] font-extrabold text-[var(--ink)]">{cat.category}</h2>
              </div>
              <div className="space-y-4">
                {cat.signs.map((s) => (
                  <div key={s.sign} className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
                    <div className="border-b border-[var(--border)] px-5 py-4" style={{ borderLeftColor: cat.accent, borderLeftWidth: 3 }}>
                      <p className="font-bold text-[var(--ink)]">{s.sign}</p>
                    </div>
                    <div className="divide-y divide-[var(--border)]">
                      <p className="px-5 py-4 text-[13.5px] leading-6 text-[var(--muted)]">{s.detail}</p>
                      <div className="bg-amber-50/50 px-5 py-3">
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Unless...</p>
                        <p className="text-[13px] leading-6 text-amber-800">{s.notThis}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Don't quit yet */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 situations where quitting now would be a mistake</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The impulse to leave is often right. The timing is often wrong.</p>
          <div className="mt-8 space-y-4">
            {DONT_QUIT_YET.map((item, i) => (
              <div key={item.reason} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.reason}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Quitting FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Ready to start your search? Get AI coaching.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches your resume, interview prep, LinkedIn, and salary negotiation — so when you leave, you land somewhere better, not just different.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
