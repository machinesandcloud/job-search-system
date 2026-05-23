import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Lunchclub — AI Networking vs AI Career Coaching (2025)",
  description:
    "Lunchclub uses AI to match you with relevant professionals for 1:1 conversations. Zari coaches your resume, interviews, and salary negotiation. Different tools for different career goals — here's when to use each.",
  keywords: ["zari vs lunchclub", "lunchclub alternative", "lunchclub review 2025", "AI networking tool", "career networking vs career coaching", "professional networking tools 2025"],
  alternates: { canonical: "/compare/zari-vs-lunchclub" },
  openGraph: {
    title: "Zari vs Lunchclub — AI Networking vs AI Career Coaching (2025)",
    description: "Lunchclub builds your network through AI-matched conversations. Zari coaches your active job search. Different problems, both worth solving.",
    url: "/compare/zari-vs-lunchclub",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHEN_TO_USE = [
  { timing: "Passive career building (not actively job searching)", lunchclub: "Lunchclub is ideal — building relationships before you need them is the highest-ROI networking activity. Regular 1:1 conversations with relevant professionals over 6-12 months builds the referral network that matters most when you do start searching.", zari: "Less relevant until you're actively job searching. Zari is most valuable when you have a specific goal: an interview to prepare for, an offer to negotiate, or a resume to optimize." },
  { timing: "Early in an active job search (1-3 months before applying)", lunchclub: "High value — Lunchclub conversations can surface referrals, informational interviews at target companies, and intelligence about companies you're considering. The referral network built through Lunchclub can get your resume in front of hiring managers rather than ATS queues.", zari: "Starting to be valuable — resume optimization, initial LinkedIn polish, and beginning to build your interview framework for target roles and companies." },
  { timing: "Active job searching (actively applying and interviewing)", lunchclub: "Lower priority — Lunchclub conversations take time, and the payoff (relationships, referrals) is longer-term than what you need when you're in active interview loops.", zari: "Peak value — deep resume tailoring per application, interview prep for each company, salary expectation scripting for recruiter screens, and negotiation coaching when offers arrive." },
  { timing: "Post-offer negotiation", lunchclub: "Not relevant.", zari: "Highest-ROI period — negotiation coaching from Zari can recover $15-40K in additional compensation on a single offer. This is where the financial return on AI career coaching is most concentrated." },
];

const FAQS = [
  { question: "Does Lunchclub actually work for career growth?", answer: "Yes, with the right expectations. Lunchclub works best for passive relationship building — expanding your professional network over months, getting access to perspectives from people you wouldn't normally meet, and occasionally surfacing job opportunities through warm introductions. It's not a direct job search tool, and treating it as one leads to misaligned expectations. The professionals you meet on Lunchclub are peers and advisors, not hiring managers reviewing your resume." },
  { question: "Can Lunchclub help with job searching?", answer: "Indirectly — through referrals and informational interviews. If Lunchclub matches you with someone at a company you're targeting, that conversation can lead to a referral that gets your application in front of a hiring manager. But this is opportunistic rather than systematic. For a time-bound active job search, Zari's direct coaching impact (resume quality, interview conversion rate, negotiation outcomes) has a more reliable and faster financial return than the networking value of Lunchclub conversations." },
  { question: "Should I use both Lunchclub and Zari?", answer: "If you have the time capacity, yes — they serve completely different needs at completely different career stages. Lunchclub is a long-game career tool; Zari is an active job search tool. Using Lunchclub to build your professional network while using Zari to maximize the applications you're making doesn't create any overlap. The combination is most valuable for mid-career professionals doing a deliberate job search who also want to build a stronger professional network for future career moves." },
];

export default async function ZariVsLunchclubPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Compare", url: `${BASE_URL}/compare` }, { name: "Zari vs Lunchclub", url: `${BASE_URL}/compare/zari-vs-lunchclub` }]} />
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Career Networking</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Lunchclub</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">Lunchclub builds your professional network through AI-matched conversations. Zari coaches your active job search. They serve different career stages — here&apos;s when each earns its keep.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">When to use Lunchclub vs Zari — by career stage</h2>
          <div className="mt-6 space-y-4">
            {WHEN_TO_USE.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3"><p className="font-bold text-[var(--ink)]">{item.timing}</p></div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">Lunchclub</p><p className="text-[13px] leading-6 text-[var(--muted)]">{item.lunchclub}</p></div>
                  <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-2">Zari</p><p className="text-[13px] leading-6 text-[var(--muted)]">{item.zari}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (<div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5"><p className="font-bold text-[var(--ink)]">{faq.question}</p><p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Actively job searching right now? Zari is where to focus.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes every active job search lever — resume quality, interview conversion, and offer negotiation. Save Lunchclub for the long-game network building after this search is done.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
