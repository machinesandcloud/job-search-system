import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Negotiate Remote Work — Scripts for Any Situation (2025)",
  description:
    "How to negotiate remote work in a new job offer, with a current employer, or after a return-to-office mandate. Word-for-word scripts, timing strategy, and what to do when they say no.",
  keywords: ["how to negotiate remote work", "negotiate remote work arrangement", "negotiate work from home", "ask for remote work", "negotiate hybrid work", "remote work negotiation"],
  alternates: { canonical: "/blog/how-to-negotiate-remote-work" },
  openGraph: {
    title: "How to Negotiate Remote Work — Scripts for Any Situation (2025)",
    description: "Scripts for negotiating remote work in an offer, with your current employer, and after an RTO mandate. With timing strategy and what to do when they say no.",
    url: "/blog/how-to-negotiate-remote-work",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const NEGOTIATION_SCENARIOS = [
  {
    scenario: "Negotiating remote work in a new job offer",
    context: "You have an offer. The job is posted as in-office or hybrid. You want more flexibility.",
    timing: "After verbal offer, before written acceptance. Don't negotiate remote work before you have an offer — it's a dealbreaker risk when they don't know you yet. Once you have an offer, the leverage shifts.",
    leverage: "They've chosen you and don't want to restart the process. Adding a remote arrangement costs them nothing in budget — it's purely a policy and trust question.",
    script: `"I'm genuinely excited about this role and want to accept. Before I do, I'd like to discuss the work arrangement. I work most effectively with [X days remote / full remote], and I've consistently delivered strong results that way in my current and previous roles. Is there flexibility on the location policy for this position?"`,
    ifTheyPushBack: "\"I understand there's an office expectation. Would it be possible to trial a [3-day hybrid / majority remote] arrangement for the first 90 days, with the flexibility to make it permanent if we're both satisfied? I think that gives us a fair way to find the right balance.\"",
    whatToAvoid: "Don't frame remote work as a personal preference or lifestyle choice — frame it as a productivity and output question. 'I work best from home' is weaker than 'I've consistently delivered stronger results in a distributed setup.'",
  },
  {
    scenario: "Asking your current employer for remote work",
    context: "You're employed. The company has an in-office default. You want to change your arrangement.",
    timing: "After delivering a strong quarter or completing a visible project — your leverage is highest when you have recent evidence of impact. Don't make the ask during a difficult performance period.",
    leverage: "Replacing you costs them 6–9 months of salary. You're a known quantity with demonstrated performance. The ask is much lower-risk than hiring someone new.",
    script: `"I'd like to talk about my work arrangement. I've been thinking about how I work best, and I believe I'd be more productive with [X days remote / a fully distributed arrangement]. My output over the past quarter — [specific metric or project] — gives me confidence this would be a positive change for both of us. Can we explore what that would look like?"`,
    ifTheyPushBack: "\"I hear you on the team coordination concern. What if we tried a [2–3 day remote] arrangement for 60 days with a clear check-in at the end? I'm confident we'd find that it doesn't affect collaboration — and I'd be happy to be extra visible on the days I'm in the office.\"",
    whatToAvoid: "Don't compare yourself to colleagues who already have remote arrangements — it puts management on the defensive and makes the ask feel like a demand for equal treatment rather than a case for your specific situation.",
  },
  {
    scenario: "Responding to a return-to-office mandate",
    context: "Your company is requiring a return to office after a period of remote work. You want to preserve flexibility.",
    timing: "Before the mandate takes effect — ideally when it's first announced, not after it becomes official policy. Early in the announcement window, there's more room for individual exceptions.",
    leverage: "Highest leverage: competing offer in hand. Second-highest: documented strong performance during remote period. Third: strategic value or hard-to-replace skills.",
    script: `"I wanted to talk about the RTO policy before it takes effect. I've [delivered X during the remote period — specific metric]. I'm committed to this team and this role, and I want to find an arrangement that works for the company's goals while preserving what's made me most productive. Can we discuss whether there's flexibility in my specific situation?"`,
    ifTheyPushBack: "\"I understand the company is moving toward a consistent policy. If there's genuinely no flexibility, I want to be honest that this is a significant factor in my thinking about the long-term fit here. Is there a path to revisiting this in 6 months based on continued performance?\"",
    whatToAvoid: "Don't threaten to leave unless you're genuinely willing to. Empty ultimatums damage the relationship and rarely produce the exception you want. If you do have a competing offer, you can reference it directly: 'I've received an offer for a remote role that I'm taking seriously, and I'd prefer to stay here if we can find an arrangement that works.'",
  },
  {
    scenario: "Negotiating hybrid vs. full remote",
    context: "The company is offering hybrid (2–3 days in office). You want fully remote.",
    timing: "Same as offer negotiation — after verbal offer, before written acceptance.",
    leverage: "You have an offer. They've made their investment. Pushing from hybrid to full remote is a smaller ask than pushing from full in-office to remote.",
    script: `"I appreciate the hybrid setup you've described. I'm hoping we can discuss a primarily or fully remote arrangement — I've been fully remote for [X months/years] with strong output, and it's where I'm most effective. Is there flexibility to shift the expectation toward majority remote or fully distributed?"`,
    ifTheyPushBack: "\"Would you consider a setup where I come in for significant events — quarterly planning, major launches, team onboarding — rather than a fixed weekly schedule? That would keep the relationship strong while giving me the distributed environment where I do my best work.\"",
    whatToAvoid: "Don't ask for exceptions before you've understood the reason for the hybrid policy. If team coordination is the real constraint, an event-based schedule often addresses it better than a fixed day-per-week model.",
  },
];

const WHAT_MOVES_THE_NEEDLE = [
  { lever: "Evidence of remote output", detail: "Specific metrics from remote periods — projects delivered, revenue generated, performance reviews received — are the most credible case for remote work. 'I believe I work better remotely' is opinion; 'I delivered X during 2 years of remote work' is evidence." },
  { lever: "Role-level fit", detail: "Some roles are harder to refuse remote for than others. Individual contributors, senior individual contributors, and roles with distributed team members are easier to negotiate than roles requiring daily cross-functional coordination or in-person client contact." },
  { lever: "A competing remote offer", detail: "The strongest lever in the toolkit. A real offer from a company that allows remote work puts the decision in your employer's hands: match the arrangement or lose you. This only works when you're genuinely willing to take the other offer." },
  { lever: "A trial framing", detail: "Proposing a 60–90 day trial removes the 'permanent policy exception' concern. Most managers who are hesitant will agree to a trial — and trials almost always become permanent if performance holds." },
  { lever: "Specificity over flexibility", detail: "Vague requests ('some remote days') are easier to deny than specific proposals ('3 days remote, in office Monday and Wednesday for team meetings'). A specific proposal shows you've thought about the coordination impact, not just your own preference." },
];

const FAQS = [
  {
    question: "Can you negotiate remote work in a job offer?",
    answer: "Yes — and the offer stage is usually the best time to do it. Once you have an offer, the company has made a decision and doesn't want to restart the process. Adding a remote arrangement costs them nothing in budget. The key: don't raise remote work preferences before the offer (it's a dealbreaker risk when they don't know you), and frame your request as a productivity and output question rather than a personal preference."
  },
  {
    question: "How do you ask for remote work without seeming high-maintenance?",
    answer: "The framing matters more than the ask. 'I work best from home' reads as a personal preference and puts the manager in the position of accommodating you. 'I've consistently delivered strong output in a distributed setup — here's the evidence' frames it as a mutual benefit. Lead with your track record, propose a specific arrangement (not an open-ended negotiation), and offer a trial period. This signals you've thought about the business impact, not just your own comfort."
  },
  {
    question: "What do you do if your employer says no to remote work?",
    answer: "Evaluate the situation honestly: Is this role worth the commute and office requirement? If not, the conversation should shift to your timeline for finding a role that offers what you need. If you want to try once more, ask what would need to be true for them to reconsider — and address those conditions specifically. A competing offer is the most effective reconsideration trigger, but it only works if you're willing to follow through."
  },
  {
    question: "Is it worth leaving a job for remote work?",
    answer: "It depends on the financial and career value of remote work in your specific situation. For people with long commutes, family caregiving responsibilities, or a productivity difference that's measurable, the value can be significant. Before leaving, calculate what the commute actually costs: time (commute hours × your effective hourly rate), direct cost (transportation, meals), and opportunity cost (what you'd produce in those hours). Many people find the math clearly supports a move even at lower total compensation."
  },
];

export default async function HowToNegotiateRemoteWorkPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Negotiate Remote Work — Scripts for Any Situation (2025)"
        description="Scripts for negotiating remote work in an offer, with your current employer, and after an RTO mandate."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/how-to-negotiate-remote-work`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Negotiate Remote Work", url: `${BASE_URL}/blog/how-to-negotiate-remote-work` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Salary Negotiation</span>
            <span className="text-[11px] text-white/30">9 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            How to negotiate remote work<br /><span className="gradient-text-animated">scripts for every situation</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Remote work has financial value — commute costs, time, and often salary flexibility. Here&apos;s how to negotiate it in a new offer, with your current employer, and after an RTO mandate — with word-for-word scripts for each scenario.
          </p>
        </div>
      </section>

      {/* Scenarios */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 scenarios — with scripts for each</h2>
          <div className="mt-8 space-y-6">
            {NEGOTIATION_SCENARIOS.map((item) => (
              <div key={item.scenario} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{item.scenario}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--muted)]">{item.context}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="px-6 py-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">When to make the ask</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{item.timing}</p>
                    </div>
                    <div className="px-6 py-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Your leverage</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{item.leverage}</p>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Opening script</p>
                    <blockquote className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] px-5 py-4 text-[13.5px] leading-7 text-[var(--ink)] italic">{item.script}</blockquote>
                  </div>
                  <div className="px-6 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-amber-600">If they push back</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)] italic">{item.ifTheyPushBack}</p>
                  </div>
                  <div className="bg-red-50/30 px-6 py-3.5">
                    <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-red-600">Avoid: </span>{item.whatToAvoid}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What moves the needle */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 levers that actually move remote work negotiations</h2>
          <div className="mt-7 space-y-3">
            {WHAT_MOVES_THE_NEEDLE.map((item, i) => (
              <div key={item.lever} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.lever}</p>
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
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Remote work negotiation FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Practice your negotiation with an AI coach before the real conversation.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches salary negotiation, remote work arrangements, and every other offer conversation — with specific pushback handling and scripts tailored to your situation. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Practice negotiation free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
