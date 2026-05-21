import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Negotiating a Raise 2025 — How to Ask for a Pay Rise and Get It",
  description: "How to negotiate a salary increase at your current job. Timing, scripts, data-backed framing, and how to respond when your manager says no.",
  keywords: ["negotiating a raise", "how to ask for a raise", "salary increase negotiation", "how to negotiate a pay rise", "asking for a raise tips", "raise negotiation script", "when to ask for a raise", "how to ask for more money at work", "pay rise negotiation 2025"],
  alternates: { canonical: "/blog/negotiating-a-raise" },
  openGraph: { title: "Negotiating a Raise 2025 — How to Ask for a Pay Rise and Get It", description: "Timing, scripts, and data-backed framing for negotiating a salary increase at your current job.", url: "/blog/negotiating-a-raise" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "When is the best time to ask for a raise?", answer: "The highest-leverage moments are: (1) after a significant win or project delivery, (2) during your annual review cycle — but before the cycle closes, not after decisions are made, (3) after you receive a competing offer, (4) after your role expands significantly without a title or comp change. The worst time is during company cost-cutting, immediately after a poor quarter, or before you've been in role long enough to have demonstrated impact." },
  { question: "How much of a raise should I ask for?", answer: "For an annual cost-of-living adjustment: 3–5%. For a merit increase based on performance: 8–15%. For a significant promotion or scope expansion: 15–25%. For an off-cycle raise in response to a competing offer: whatever gets you to market rate. Research comparable roles on Glassdoor, Levels.fyi (tech), LinkedIn Salary, or your industry's salary surveys — and ask for the top of the market range for your level and location." },
  { question: "What do I do if my manager says no to a raise?", answer: "Ask what would need to be true for a yes: 'What would I need to achieve, or what timeline are we working toward, for a compensation adjustment to be possible?' Get specifics. Then follow up in writing to confirm what was agreed. If no path is provided and you're at market or above, it may signal a ceiling — at which point exploring external options is a legitimate next step." },
  { question: "Should I show my manager a competing offer?", answer: "Only if you're genuinely willing to leave. Showing a competing offer you won't accept damages trust and often backfires. If you have a real offer and want to stay, share it directly: 'I have an offer for $X from [company]. I prefer to stay here and grow with this team — is there a path to getting closer to market rate?' This is honest, professional, and creates a real decision point." },
];

export default async function NegotiatingARaisePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Negotiating a Raise 2025" description="How to negotiate a salary increase at your current job — timing, scripts, and what to do when your manager says no." url={`${BASE_URL}/blog/negotiating-a-raise`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Negotiating a Raise", url: `${BASE_URL}/blog/negotiating-a-raise` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 55%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Salary Negotiation</span>
            <span className="text-[12px] text-white/35">14 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Negotiating a Raise 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">How to ask for a pay rise and actually get it — timing, scripts, data, and what to do when your manager says no.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">The 5-step raise negotiation framework</h2>
          <div className="mb-12 space-y-3">
            {[
              { step: "1", title: "Build your case before the conversation", body: "Document your achievements for the past 6–12 months. Quantify impact wherever possible: revenue generated, costs saved, projects delivered, scope expanded. This is your evidence base — not your opinion of your performance." },
              { step: "2", title: "Research market rate", body: "Use Glassdoor, LinkedIn Salary, Levels.fyi (tech), and industry salary surveys to establish what the market pays for your role, level, and location. You need a number backed by data, not just a feeling you're underpaid." },
              { step: "3", title: "Request a dedicated conversation — don't ambush", body: "Book time with your manager specifically for a compensation conversation. Don't spring it at the end of a 1:1. 'I'd like to set up 20 minutes to discuss my compensation — would next Tuesday work?' signals professionalism and lets your manager prepare." },
              { step: "4", title: "State your ask clearly and anchor high", body: "Open with a specific number, not a range. 'Based on my research and what I've delivered this year, I'm asking for a 15% increase to $X.' Ranges let the other side anchor to the bottom. State the rationale: achievements + market data." },
              { step: "5", title: "Handle objections without backing down immediately", body: "If they say 'now isn't a good time,' ask when the right time is and get it in writing. If they say 'the budget is frozen,' ask what would need to change for this to be revisited. Don't accept a soft no as a permanent no." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#059669]/10 text-[14px] font-extrabold text-[#059669]">{step}</div>
                <div>
                  <div className="mb-1 font-bold text-[14px]">{title}</div>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Word-for-word raise negotiation scripts</h2>
          <div className="mb-12 space-y-4">
            {[
              {
                scenario: "Standard raise request",
                script: `"I'd like to talk about my compensation. Over the past year, I [specific achievement 1] and [specific achievement 2] — which together [quantified business impact]. I've also researched the market, and roles at my level in [city/sector] are typically compensated at $X–$Y.\n\nBased on this, I'm asking for a [X%] increase, which would bring my salary to $Z. I'm committed to this team and want to grow here — I just want my compensation to reflect what I've delivered and what the market looks like."`,
              },
              {
                scenario: "After a significant win",
                script: `"The [project/outcome] we just wrapped is a good moment to revisit my compensation. That project [quantified outcome] and represents exactly the kind of ownership I've taken on since joining.\n\nI'd like to discuss an increase. I've done the market research and I believe $X is the right number — can we talk through what that path looks like?"`,
              },
              {
                scenario: "In response to 'budget is frozen'",
                script: `"I hear you on the timing. Can we agree on what the target looks like and set a specific date to revisit — say, [date 90 days out]? I want to make sure I have a clear path rather than an open-ended delay. If we can't do cash right now, I'd also be open to discussing [equity / extra PTO / remote flexibility] as a bridge."`,
              },
            ].map(({ scenario, script }) => (
              <div key={scenario} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3 text-[13px] font-bold">{scenario}</div>
                <div className="p-5">
                  <p className="whitespace-pre-line text-[13px] leading-6 text-[var(--muted)] italic">{script}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">What NOT to say when negotiating a raise</h2>
          <div className="mb-10 grid gap-2 sm:grid-cols-2">
            {[
              { avoid: "\"I need more money because of inflation / rent\"", why: "Your personal expenses aren't the employer's problem. Frame it around your value and market data." },
              { avoid: "\"Everyone else on the team earns more\"", why: "Salary comparison among colleagues is risky and often inaccurate. Use market data instead." },
              { avoid: "\"I've been here X years and deserve a raise\"", why: "Tenure alone isn't a raise argument. Impact is." },
              { avoid: "\"Just do your best\"", why: "Vague asks get vague answers. Always state a specific number." },
              { avoid: "\"If I don't get a raise, I'll leave\" (as a bluff)", why: "Only say this if you mean it. Empty threats destroy trust and rarely work." },
              { avoid: "Apologising for asking", why: "\"Sorry to bring this up...\" signals that the ask isn't legitimate. Don't apologise for advocating for your own value." },
            ].map(({ avoid, why }) => (
              <div key={avoid} className="rounded-xl border border-[var(--border)] bg-[#DC2626]/[0.03] p-4">
                <div className="mb-1 flex items-start gap-2 font-bold text-[12px]">
                  <span className="mt-0.5 flex-shrink-0 text-[#DC2626]">✗</span>
                  <span>{avoid}</span>
                </div>
                <p className="text-[12px] leading-5 text-[var(--muted)]">{why}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Practice the conversation before you have it.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari&apos;s salary negotiation coach runs live simulations of the raise conversation — so you walk in with a script, not a script you&apos;re hoping to remember.</p>
          <Link href="/salary-negotiation-coach" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Start raise negotiation coaching free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
