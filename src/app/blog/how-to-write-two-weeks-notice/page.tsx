import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Write a Two Weeks Notice — Templates & Resignation Letter Examples (2025)",
  description:
    "How to write a professional two weeks notice letter. Includes word-for-word resignation letter templates, what to say to your manager, and how to leave without burning bridges.",
  keywords: ["two weeks notice", "how to write two weeks notice", "resignation letter", "two weeks notice letter", "two weeks notice email", "resignation letter template", "how to resign professionally", "professional resignation letter 2025"],
  alternates: { canonical: "/blog/how-to-write-two-weeks-notice" },
  openGraph: {
    title: "How to Write a Two Weeks Notice — Resignation Letter Templates (2025)",
    description: "Professional resignation letter templates and word-for-word scripts for quitting your job without burning bridges.",
    url: "/blog/how-to-write-two-weeks-notice",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-16";
const MODIFIED = "2025-05-16";

const TEMPLATES = [
  {
    label: "Standard two weeks notice (email)",
    accent: "#0D7182",
    when: "The default for most situations. Professional, clear, leaves the door open.",
    template: `Subject: Resignation — [Your Name]

Hi [Manager's Name],

I'm writing to formally give my two weeks' notice. My last day will be [Date — two weeks from today].

This wasn't an easy decision — I've valued my time at [Company] and the team we've built together. I want to make this transition as smooth as possible and am happy to document anything, train a replacement, or do whatever would be most helpful in the time I have left.

Thank you for the opportunities you've given me here.

[Your Name]`,
  },
  {
    label: "When you want to be warmer (for a good relationship)",
    accent: "#EC4899",
    when: "You've had a great relationship with your manager and want the letter to reflect that.",
    template: `Hi [Manager's Name],

I wanted to give you my notice in writing, though I hope we can talk today if you have 15 minutes. My last day will be [Date].

Working here has been genuinely meaningful to me. I'm proud of what we built together, and I've grown more in the past [X years] than I could have expected. I'm leaving to [brief reason — joining another company / making a career change / etc.], not away from something I'm unhappy with.

I'll do everything I can to make the next two weeks count — documentation, transition planning, whatever helps the team most.

[Your Name]`,
  },
  {
    label: "When the situation is difficult (poor relationship or hostile environment)",
    accent: "#F97316",
    when: "You're leaving a toxic environment and want to stay professional without being warm.",
    template: `Dear [Manager's Name],

Please accept this letter as formal notice of my resignation from [Company]. My last day will be [Date].

I am committed to fulfilling my responsibilities through my notice period and will do my best to support a smooth transition.

Sincerely,
[Your Name]`,
  },
  {
    label: "When you can't give two weeks (urgent departure)",
    accent: "#7a8dff",
    when: "You have reasons — health, new role start date, unsafe environment — that prevent a two-week notice period.",
    template: `Dear [Manager's Name],

I regret to inform you that I must resign from my position at [Company], effective [Date — sooner than two weeks].

Due to [brief, neutral reason — e.g., 'the start date of my new position' or 'personal circumstances'], I am unable to provide the standard two-week notice period. I apologize for any inconvenience this causes.

I remain available via email to answer questions about my work or to assist with any handoff documentation I can complete remotely.

Sincerely,
[Your Name]`,
  },
];

export default async function HowToWriteTwoWeeksNoticePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Write a Two Weeks Notice — Templates & Resignation Letter Examples (2025)"
        description="Professional resignation letter templates and word-for-word scripts for quitting your job without burning bridges."
        url={`${BASE_URL}/blog/how-to-write-two-weeks-notice`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Write Two Weeks Notice", url: `${BASE_URL}/blog/how-to-write-two-weeks-notice` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Job Search</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Write a Two Weeks Notice — Resignation Letter Templates (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 7 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Your two weeks notice is not the moment to express frustration, over-explain your decision, or perform enthusiasm you don&apos;t feel. Its only job is to end the relationship professionally and protect your reputation. Here&apos;s how to do it — and four templates for every situation.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Have the conversation before sending the letter</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Don&apos;t let your manager learn you&apos;re leaving from an email. Tell them in person or on a call first, then follow up with the written notice. The conversation can be short:
            </p>
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="font-semibold text-[var(--ink)] mb-3">What to say in the conversation:</p>
              <p className="text-[14px] italic leading-7 text-[var(--muted)]">
                &ldquo;I wanted to let you know that I&apos;ve decided to take a new opportunity. My last day will be [Date]. I wanted to tell you directly and make sure the transition goes as smoothly as possible.&rdquo;
              </p>
            </div>
            <p className="mt-4 text-[14px] text-[var(--muted)]">
              That&apos;s it. You don&apos;t need to disclose where you&apos;re going, why you&apos;re leaving, or what you&apos;re getting paid. Keep it simple and professional.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What your letter must include</h2>
            <div className="mt-4 space-y-3">
              {[
                { must: "Your last day", detail: "Stated clearly and unambiguously. Not 'approximately' or 'around' — a specific date." },
                { must: "A commitment to transition well", detail: "Even one sentence signals that you're leaving professionally and won't disappear the moment you give notice." },
                { must: "A professional sign-off", detail: "Short, neutral, and sincere. Not effusive, not cold." },
              ].map((item) => (
                <div key={item.must} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <span className="mt-0.5 text-emerald-500 font-bold text-[14px]">✓</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.must}</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to leave out</h2>
            <div className="mt-4 space-y-2">
              {[
                { dont: "Detailed explanations of why you're leaving", why: "Anything critical can be used against you. Anything positive sounds hollow. Neither helps you." },
                { dont: "Where you're going", why: "You have no obligation to disclose your next employer. Industry is small. Keep it private." },
                { dont: "Complaints or grievances", why: "Your notice letter is the one thing companies keep forever. Write as if it will be read at a reference check." },
                { dont: "Vague last-day language", why: "'Sometime in the next two weeks' creates ambiguity and shows poor professionalism. Use an exact date." },
              ].map((item) => (
                <div key={item.dont} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ {item.dont}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Resignation letter templates</h2>
            <p className="mt-3 text-[15px] text-[var(--muted)]">Four word-for-word templates — pick the one that fits your situation.</p>

            <div className="mt-6 space-y-8">
              {TEMPLATES.map((t) => (
                <div key={t.label} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: t.accent }} />
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: t.accent }}>{t.label}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-4 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Use when: </span>{t.when}</p>
                    <div className="rounded-xl bg-[var(--bg)] p-5">
                      {t.template.split('\n\n').map((block, i) => (
                        <p key={i} className={`text-[13.5px] leading-7 text-[var(--muted)] font-mono ${i > 0 ? 'mt-4' : ''}`}>{block}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to do when they make a counteroffer</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Most counteroffers should be declined. Not because the money isn&apos;t real — but because the reasons you decided to leave almost certainly still exist. Compensation rarely addresses culture, management, growth opportunity, or the specific factors that pushed you out.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              If you receive a counteroffer, take 24 hours before responding. If you decide to decline, keep it simple:
            </p>
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="text-[14px] italic leading-7 text-[var(--muted)]">
                &ldquo;I appreciate the offer — it genuinely means a lot that you want to retain me. But I&apos;ve thought carefully about this and I&apos;m going to stick with my decision. I want to make sure the next two weeks are as valuable as possible for the team.&rdquo;
              </p>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Handling a difficult last two weeks</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Some managers take resignations personally. If your last two weeks feel hostile, uncomfortable, or you&apos;re being frozen out — that&apos;s actually useful information. It confirms you made the right call. Stay professional, document your transition work in writing, and keep your head down.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Your professional reputation is a long-term asset. Leaving gracefully — even when the company doesn&apos;t deserve it — is always the right move.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Preparing for your next role? Start your coaching free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Resume, LinkedIn, interview prep, and salary negotiation — AI coaching for your entire job search.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start job search coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
