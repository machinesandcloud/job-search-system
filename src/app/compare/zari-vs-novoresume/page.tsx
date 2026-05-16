import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Novoresume — AI Career Coach vs Resume Builder (2025)",
  description:
    "Zari vs Novoresume: is Novoresume's one-page resume builder worth it, or does full AI career coaching deliver better results? Honest breakdown with pricing, features, and real trade-offs.",
  keywords: ["zari vs novoresume", "novoresume alternative", "novoresume review 2025", "novoresume vs ai coach", "best resume builder alternative", "novoresume competitor", "ai career coach vs resume builder"],
  alternates: { canonical: "/compare/zari-vs-novoresume" },
  openGraph: {
    title: "Zari vs Novoresume — Full Comparison (2025)",
    description: "Novoresume builds clean one-page resumes. Zari coaches your entire job search. Here's the difference.",
    url: "/compare/zari-vs-novoresume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Is Novoresume ATS-friendly?", answer: "Novoresume claims ATS compatibility and uses cleaner layouts than some design-heavy builders. However, it still uses multi-column formats and design elements that can confuse older ATS systems. Zari's resume coaching produces single-column, keyword-optimized content that is built to pass ATS filters consistently." },
  { question: "Does Novoresume offer interview coaching?", answer: "No. Novoresume is a resume and cover letter builder — it stops at the document. Zari covers the full job search including AI interview coaching with real-time feedback, LinkedIn optimization, and salary negotiation coaching." },
  { question: "Who is Novoresume best for?", answer: "Novoresume is best for candidates who already know their content is strong and want a clean, professional-looking PDF quickly. Its templates are particularly popular with recent graduates and entry-level candidates who value simplicity. For anyone who needs coaching on what to say — not just how it looks — Zari is the better fit." },
  { question: "What is Novoresume's pricing?", answer: "Novoresume's premium plan is typically around $16–$19/month. A single resume export costs a one-time fee if you prefer not to subscribe. Zari offers a free tier for all coaching surfaces and competitively priced premium plans." },
];

const COMPARISON_ROWS = [
  { feature: "Resume builder templates", novoresume: "Yes — clean, minimal templates. Strong one-page layouts with good typography.", zari: "No visual templates. AI coaching rewrites content to be keyword-rich and ATS-optimized." },
  { feature: "ATS keyword optimization", novoresume: "Basic: template avoids worst ATS anti-patterns but no job-description matching or keyword scoring.", zari: "Deep: AI scores your resume against a specific JD, identifies missing keywords, suggests rewrites." },
  { feature: "Cover letter builder", novoresume: "Yes — matching cover letter templates that mirror your resume design.", zari: "AI cover letter coaching — personalized drafts based on your experience and the specific role." },
  { feature: "Interview preparation", novoresume: "Not available.", zari: "Full AI interview coach with real-time feedback on clarity, STAR structure, and answer quality." },
  { feature: "LinkedIn optimization", novoresume: "Not available.", zari: "AI-driven LinkedIn coaching: headline, About section, experience bullets for recruiter search." },
  { feature: "Salary negotiation", novoresume: "Not available.", zari: "Dedicated salary negotiation coach with scripts, counter-offer strategy, and equity guidance." },
  { feature: "AI coaching feedback", novoresume: "Template-guided prompts and basic content suggestions. No conversational AI.", zari: "Conversational AI coaching across every stage of the job search — ask anything, get specific feedback." },
];

export default async function ZariVsNovoresumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Novoresume", url: `${BASE_URL}/compare/zari-vs-novoresume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Novoresume</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Novoresume has built a loyal following around one idea: clean, beautiful one-page resumes. It executes that idea well. But a resume is the start of a job search — not the whole thing. Here&apos;s where each tool actually wins.
          </p>

          {/* Side-by-side positioning */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">Novoresume is</p>
              <p className="mt-2 text-[22px] font-extrabold text-white">A resume builder</p>
              <p className="mt-3 text-[13px] leading-6 text-white/50">Excellent templates, matching cover letters, PDF export. Does one thing well and stops there.</p>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari is</p>
              <p className="mt-2 text-[22px] font-extrabold text-white">An AI job search coach</p>
              <p className="mt-3 text-[13px] leading-6 text-white/60">Resume, LinkedIn, interview prep, and salary negotiation — AI coaching from application to offer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature table */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What each tool actually does</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">An honest look at every feature that matters in a modern job search.</p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Feature</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Novoresume</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
            </div>
            {COMPARISON_ROWS.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 gap-4 px-5 py-4 ${i % 2 === 1 ? "bg-[var(--bg)]" : "bg-white"} border-b border-[var(--border)] last:border-0`}>
                <p className="text-[13px] font-semibold text-[var(--ink)]">{row.feature}</p>
                <p className="text-[12.5px] leading-5 text-[var(--muted)]">{row.novoresume}</p>
                <p className="text-[12.5px] leading-5 text-[var(--muted)]">{row.zari}</p>
              </div>
            ))}
          </div>

          {/* When Novoresume is the right choice */}
          <div className="mt-14">
            <h3 className="text-[1.3rem] font-extrabold text-[var(--ink)]">When Novoresume is the right choice</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Novoresume makes sense if you already have a polished career story, strong bullet points with metrics, and you&apos;re applying to roles where the resume goes directly to a person — referrals, boutique agency, networking conversations. In those scenarios, presentation matters and Novoresume does it beautifully.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              It&apos;s also strong for recent graduates who need a clean entry-level resume fast, without a lot of content complexity to manage.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-[1.3rem] font-extrabold text-[var(--ink)]">When Zari wins by a wide margin</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              If you&apos;re applying through corporate ATS, LinkedIn Easy Apply, or anywhere that routes your resume through software before a human, keyword optimization matters far more than layout. Zari identifies exactly which keywords you&apos;re missing for each job and helps you rewrite bullets to include them — something no template-based tool can do.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              And if you&apos;re getting interviews but struggling to convert them — or want to prep for behavioral questions, case interviews, or salary negotiations — Novoresume is simply the wrong category of tool. Zari was built for the whole search, not just the document.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Questions we get asked</h2>
          <div className="mt-8 space-y-4">
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
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Full job search coaching, free to start</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Not just a prettier resume — AI coaching for every part of the search that actually lands offers.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
