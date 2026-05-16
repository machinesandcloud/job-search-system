import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Negotiate Salary Internally — Scripts & Timing (2025)",
  description:
    "How to negotiate a raise or promotion salary increase with your current employer — timing, data, scripts for the conversation, and how to handle the 4 most common pushbacks. Different from negotiating an offer.",
  keywords: ["internal salary negotiation", "negotiate salary internally", "how to ask for a raise at current job", "negotiate salary with current employer", "internal compensation negotiation"],
  alternates: { canonical: "/blog/internal-salary-negotiation" },
  openGraph: {
    title: "How to Negotiate Salary Internally — Scripts & Timing (2025)",
    description: "Internal negotiation is fundamentally different from negotiating an offer. This guide covers the timing, data, scripts, and pushback handling specific to negotiating with your current employer.",
    url: "/blog/internal-salary-negotiation",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const INTERNAL_VS_EXTERNAL = [
  { dimension: "Leverage source", internal: "Your history, relationships, and the cost of replacing you", external: "Competing offers and market optionality" },
  { dimension: "Anchor", internal: "Your current salary — you're arguing for a change from a baseline", external: "Market rate and competing offer — you're establishing a new baseline" },
  { dimension: "Timing control", internal: "You control the timing of the conversation — pick a moment of organizational strength", external: "The company controls timing — offer arrives on their schedule" },
  { dimension: "Relationship risk", internal: "High — your manager remembers this conversation for years", external: "Low — relationship starts after negotiation ends" },
  { dimension: "Information advantage", internal: "You know the company's constraints, budget cycles, and your manager's priorities", external: "You know the competing offer; they know their internal equity" },
  { dimension: "Best data to use", internal: "Your own performance data + external market comp data", external: "Competing offers + role-specific market data" },
];

const TIMING_WINDOWS = [
  {
    window: "Formal review cycle (best default)",
    accent: "#059669",
    when: "4–6 weeks before your annual or mid-year review, not during the review itself",
    why: "Compensation decisions are made before the review conversation happens. If you wait until the review meeting to bring it up, the number is already decided. Get into the conversation during the planning window when managers still have discretion.",
    howToUse: "Request a dedicated 30-minute conversation — not a sidebar in a 1:1 — specifically about career trajectory and compensation. Frame it as wanting to set expectations before the review cycle.",
  },
  {
    window: "After a visible win",
    accent: "#7C3AED",
    when: "Within 2–4 weeks of completing a high-visibility project, major launch, or measurable outcome",
    why: "Your value is most salient right after you've demonstrated it. The organizational memory of your contribution is fresh, and the emotional moment of success creates positive momentum. This is the best time to have the conversation if you can't wait for the review cycle.",
    howToUse: "Don't jump straight to money. Have the career conversation first — 'I've been thinking about where I'm going and what this role is worth in the market.' Use the win as context, not as a demand.",
  },
  {
    window: "After a competing offer",
    accent: "#DC2626",
    when: "When you have a real offer in hand — not when you're bluffing",
    why: "A competing offer is the most powerful internal negotiation tool. It converts a theoretical market-rate conversation into a concrete decision. Most companies have processes for retention counteroffers that your manager can invoke when you have an offer.",
    howToUse: "Be honest that you have an offer. Say you want to stay but need to understand if there's a path to comparable compensation. Don't give them the offer letter unless asked — give the range. Be prepared for them to either match, come close, or let you go.",
  },
  {
    window: "When taking on a materially larger role",
    accent: "#D97706",
    when: "When scope changes — bigger team, new business unit, cross-functional ownership, acting manager role",
    why: "Scope creep without comp adjustment is extremely common and usually not corrected without a direct conversation. If you're doing materially more work or managing more, the time to discuss comp is when the scope changes — not 12 months later.",
    howToUse: "Document the scope change explicitly before the conversation: 'I'm now responsible for X, Y, Z in addition to my previous role. I'd like to discuss what the right compensation looks like for this expanded scope.'",
  },
];

const SCRIPTS = [
  {
    situation: "Opening the conversation",
    accent: "#0D7182",
    script: `"I'd like to set aside some time to talk about my compensation and career trajectory. I've been looking at market data for [role] in [location] and want to make sure we're aligned before the review cycle. When's a good time for a 30-minute conversation?"`,
    notes: "Don't ambush in a 1:1. Request it explicitly. Giving the manager advance notice lets them come prepared with information about what's possible — which leads to a better conversation.",
  },
  {
    situation: "Making the ask",
    accent: "#7C3AED",
    script: `"Based on my research across [sources — levels.fyi, Glassdoor, Radford], market rate for someone with my background doing this work is in the [$X–$Y] range. I'm currently at [$Z], which puts me about [X%] below market. Given my performance over the past [period] — specifically [1–2 specific contributions] — I'd like to discuss bringing my comp to [$target]."`,
    notes: "Name the number. Vague asks get vague answers. Be specific about the gap and give evidence for why you deserve to close it — not just that the gap exists.",
  },
  {
    situation: "When they say 'budget is frozen'",
    accent: "#DC2626",
    script: `"I understand there are constraints on the cycle. Can you help me understand what the path looks like — specifically what I need to accomplish and when I could expect this to be addressed? I want to make sure I'm planning appropriately."`,
    notes: "This converts a rejection into a commitment conversation. Either they give you a timeline and conditions (good), or they confirm there's no real path (also good — that's information you needed).",
  },
  {
    situation: "When they say 'you're already at the top of your band'",
    accent: "#D97706",
    script: `"I appreciate you sharing that. If I'm at the top of the current band, it sounds like the conversation is really about leveling rather than a within-band adjustment. Can we talk about what the criteria look like for the next level and what the timeline looks like for that assessment?"`,
    notes: "Band ceiling conversations are really leveling conversations. Shift to that frame explicitly — it opens a different, often more productive, discussion about promotion timelines and criteria.",
  },
];

const FAQS = [
  { question: "How much of a raise can I realistically ask for internally?", answer: "Standard annual merit increases are 2–5%. If you're arguing for more than that, you need a stronger case: you're below market by a measurable amount, your scope has materially changed, or you have a competing offer. Asking for 15–20% in a single cycle without one of these anchors is almost always rejected. The strongest internal asks come with external data and a specific argument about why the current number doesn't reflect current market or current role scope." },
  { question: "Should I use a competing offer to negotiate internally?", answer: "Only if it's real and you're willing to take it. Using a fake competing offer as leverage is a high-risk tactic that can permanently damage your manager's trust if detected — and experienced managers probe offers. If you have a real offer that you'd genuinely consider taking, using it as a conversation catalyst is legitimate and often effective. Just understand that some companies have a policy against counteroffers — your manager's hands may be tied regardless of how they feel about the situation." },
  { question: "What if my manager gets defensive or upset?", answer: "This is a data point about your manager and your company. If raising a professional and well-researched compensation conversation causes a defensive or hostile response, that tells you something important about the environment you're in. Remain calm, acknowledge that the conversation might be uncomfortable, and stay focused on the professional data: market rates and your performance. If the response is consistently hostile, that's one of the signals that external negotiation may be your only real path." },
  { question: "How long should I wait after a raise to ask again?", answer: "Minimum 12 months unless your scope has fundamentally changed. Asking for another raise 6 months after receiving one — even a modest one — reads as ungrateful and undermines your relationship with your manager. The exception: a material change in role that wasn't accompanied by comp adjustment, or a competing offer that arrived independently of the last raise." },
];

export default async function InternalSalaryNegotiationPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Negotiate Salary Internally — Scripts & Timing (2025)"
        description="Internal negotiation is fundamentally different from negotiating an offer. This guide covers the timing, data, scripts, and pushback handling specific to negotiating with your current employer."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/internal-salary-negotiation`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Internal Salary Negotiation", url: `${BASE_URL}/blog/internal-salary-negotiation` },
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
            Internal salary negotiation<br /><span className="gradient-text-animated">timing, scripts & pushback handling</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Negotiating with your current employer is fundamentally different from negotiating a new offer. You&apos;re working inside an existing relationship, an existing salary anchor, and a budget cycle you can learn to navigate. This guide is specifically for negotiating internally — not for offer negotiation.
          </p>
        </div>
      </section>

      {/* Internal vs external */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How internal negotiation differs from offer negotiation</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The tactics that work for a new offer don&apos;t translate. Here&apos;s what&apos;s actually different.</p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Dimension</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Internal</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">External offer</p>
            </div>
            {INTERNAL_VS_EXTERNAL.map((row) => (
              <div key={row.dimension} className="grid grid-cols-3 border-b border-[var(--border)] px-5 py-4 last:border-0">
                <p className="text-[13px] font-semibold text-[var(--ink)]">{row.dimension}</p>
                <p className="text-[13px] text-[var(--brand)] leading-5 pr-3">{row.internal}</p>
                <p className="text-[13px] text-[var(--muted)] leading-5">{row.external}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timing windows */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 timing windows — and how to use each one</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Timing is the variable most people get wrong in internal negotiations. Here&apos;s when to have the conversation and how to approach each window.</p>
          <div className="mt-8 space-y-5">
            {TIMING_WINDOWS.map((tw) => (
              <div key={tw.window} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: tw.accent, borderLeftWidth: 4 }}>
                  <p className="font-extrabold text-[var(--ink)]">{tw.window}</p>
                  <p className="mt-1 text-[12px] font-semibold" style={{ color: tw.accent }}>When: {tw.when}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Why this window works</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{tw.why}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">How to use it</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{tw.howToUse}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripts */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Word-for-word scripts — opening to pushback</h2>
          <div className="mt-8 space-y-5">
            {SCRIPTS.map((s) => (
              <div key={s.situation} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-5 py-3" style={{ borderLeftColor: s.accent, borderLeftWidth: 4 }}>
                  <p className="font-bold text-[var(--ink)]">{s.situation}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="bg-[var(--bg)] px-5 py-4">
                    <p className="font-mono text-[13px] leading-6 text-[var(--ink)]">{s.script}</p>
                  </div>
                  <div className="px-5 py-3">
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{s.notes}</p>
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
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Internal negotiation FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Practice the conversation before you have it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches salary negotiation — internal and external. Run the conversation, get feedback on your script, and build the market data case that makes your ask land.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
