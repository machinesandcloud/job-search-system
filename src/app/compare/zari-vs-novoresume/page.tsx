import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Novoresume — AI Career Coach vs Resume Builder (2025)",
  description:
    "Novoresume builds clean, beautiful one-page resumes. Zari coaches your entire job search — ATS optimization, interview prep, LinkedIn, and salary negotiation. Here's when each tool is the right call, and where the tradeoffs actually show up.",
  keywords: ["zari vs novoresume", "novoresume alternative", "novoresume review 2025", "novoresume vs ai coach", "best resume builder alternative", "novoresume competitor", "ai career coach vs resume builder"],
  alternates: { canonical: "/compare/zari-vs-novoresume" },
  openGraph: {
    title: "Zari vs Novoresume — Full Comparison (2025)",
    description: "Novoresume's templates are genuinely beautiful. But beautiful doesn't help you when ATS filters run before any human sees your resume. Here's the full picture.",
    url: "/compare/zari-vs-novoresume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Is Novoresume ATS-friendly?",
    answer: "Novoresume claims ATS compatibility and uses cleaner layouts than some design-heavy builders. But its multi-column formats, icons, and design elements still cause parsing issues with older ATS systems (Taleo, iCIMS) that many enterprise companies use. 'ATS-friendly' on a resume builder usually means 'won't completely break' — not 'optimized for keyword matching.' Keyword optimization is what Zari focuses on, and it's a separate problem from template formatting.",
  },
  {
    question: "Does Novoresume offer interview coaching?",
    answer: "No. Novoresume is a resume and cover letter builder — its product scope ends at the document. If you're getting interviews but struggling to convert them, or you want to prep for specific behavioral questions, technical interviews, or salary negotiations, Novoresume is simply the wrong category of tool. Zari covers the full funnel from application to offer.",
  },
  {
    question: "Who is Novoresume best for?",
    answer: "Candidates who already have strong content — clear metrics, well-written bullets, a complete career story — and primarily need a clean, professional format. Especially good for recent graduates who need a polished one-page PDF quickly, and for roles where the resume goes directly to a person (referrals, agency submissions, networking) rather than through an ATS first.",
  },
  {
    question: "What is Novoresume's pricing?",
    answer: "Novoresume's premium plan is around $19.99/month (as of 2025). There's a 14-day free trial. A single resume download is available as a one-time payment if you don't want to subscribe. Zari offers a free first session on every coaching surface and competitively priced plans for ongoing coaching — no one-time PDF download model.",
  },
  {
    question: "Can Novoresume's AI write my resume bullets?",
    answer: "Novoresume has added AI writing assistance that can generate or rephrase bullets based on your job title and descriptions. This is useful for getting a draft quickly, but it has the same limitation as all AI generation from a title: the output is generic because it doesn't know your specific experience, scope, or accomplishments. Zari's approach is coaching — it elicits the specific details from your history and uses them to write bullets that sound like you did the work, not like a template.",
  },
];

const DIMENSIONS = [
  {
    feature: "Resume templates & design",
    novoresume: "Genuine strength. Novoresume's templates are clean, minimal, and professionally designed — particularly the one-page layouts. If visual quality matters for your application context (creative roles, design-adjacent, referrals to humans), Novoresume produces PDF output that looks polished.",
    zari: "No visual templates. Zari optimizes the content of your resume — keywords, bullet structure, ATS matching — not the layout. The output is coaching, not a PDF.",
    winner: "novoresume",
  },
  {
    feature: "ATS keyword optimization",
    novoresume: "Basic. Templates avoid the worst ATS anti-patterns, and newer Novoresume versions include some ATS guidance. But there's no mechanism to score your resume against a specific job description or identify which keywords are missing from your target role.",
    zari: "Deep. Paste a job description alongside your resume: Zari calculates an ATS match score, ranks missing keywords by importance, and rewrites bullets to include them naturally. Session memory means it knows your background across every conversation.",
    winner: "zari",
  },
  {
    feature: "AI resume writing",
    novoresume: "Novoresume's AI assistant generates and rephrases bullets based on your job title. Good for drafting from scratch. Output quality is similar to other AI generators — useful template, but doesn't know your actual accomplishments.",
    zari: "Coaching approach: Zari asks about your specific experience — team size, scope, outcomes, tools used — and uses those details to write bullets that reflect real work. The resulting bullets are substantively different from AI-generated placeholders.",
    winner: "zari",
  },
  {
    feature: "Cover letter builder",
    novoresume: "Novoresume includes matching cover letter templates that mirror your resume design — consistent visual presentation is a genuine advantage here. Content assistance is template-guided rather than fully conversational.",
    zari: "AI cover letter coaching — conversational drafting based on your experience and the specific role. Less visually integrated but more customized to the company and position you're applying to.",
    winner: "tie",
  },
  {
    feature: "Interview preparation",
    novoresume: "Not available. Novoresume's scope ends at the document.",
    zari: "Full AI interview coach: simulate a mock interview, get STAR-framework feedback on each answer, track which question types need more practice across sessions.",
    winner: "zari",
  },
  {
    feature: "LinkedIn optimization",
    novoresume: "Not available.",
    zari: "AI-driven LinkedIn coaching: headline formula for recruiter search visibility, About section rewriting, experience bullet optimization, keyword density analysis.",
    winner: "zari",
  },
  {
    feature: "Salary negotiation coaching",
    novoresume: "Not available.",
    zari: "Dedicated salary negotiation coach — counter-offer scripts, how to handle pushbacks ('we're at the top of the band'), equity negotiation, and timing guidance.",
    winner: "zari",
  },
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

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Novoresume</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Novoresume is genuinely good at one thing: producing a clean, professional-looking resume PDF. But most resumes are never seen by a human — they&apos;re filtered by ATS first. Here&apos;s where each tool actually wins.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">Novoresume</p>
              <p className="mt-2 text-[22px] font-extrabold text-white">A resume builder</p>
              <p className="mt-3 text-[13px] leading-6 text-white/50">Beautiful templates, matching cover letters, PDF export. Does one thing very well — produces a polished document — and stops there.</p>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#4361EE]/70">Zari</p>
              <p className="mt-2 text-[22px] font-extrabold text-white">An AI job search coach</p>
              <p className="mt-3 text-[13px] leading-6 text-white/60">Resume ATS optimization, interview prep, LinkedIn, and salary negotiation — AI coaching from application to offer.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">

          <div className="mb-10 rounded-xl border border-amber-100 bg-amber-50/40 p-5">
            <p className="text-[14px] leading-7 text-[var(--ink)]">
              <span className="font-bold">The ATS problem with beautiful resumes:</span> Novoresume&apos;s templates look great to human eyes. The issue is that most corporate job applications route through ATS before any human sees the design. Older ATS systems (Taleo, iCIMS, Greenhouse) parse resumes as plain text — columns, icons, and decorative elements become noise. A perfectly formatted Novoresume can score lower on keyword matching than a plain-text resume with better content. Visual presentation matters after the ATS pass, not before it.
            </p>
          </div>

          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature comparison</h2>
          <p className="mb-10 text-[15px] text-[var(--muted)]">An honest breakdown across every dimension that matters for a modern job search.</p>

          <div className="space-y-5">
            {DIMENSIONS.map((d) => (
              <div key={d.feature} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{d.feature}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${d.winner === "zari" ? "bg-[var(--brand)]/10 text-[#4361EE]" : d.winner === "novoresume" ? "bg-slate-100 text-slate-600" : "bg-slate-100 text-slate-500"}`}>
                    {d.winner === "zari" ? "Zari wins" : d.winner === "novoresume" ? "Novoresume wins" : "Tie"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Novoresume</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{d.novoresume}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{d.zari}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <h3 className="font-extrabold text-[var(--ink)] mb-3">When Novoresume is the right choice</h3>
              <ul className="space-y-2 text-[13.5px] leading-6 text-[var(--muted)]">
                <li>→ You already have strong content — clear metrics, complete story — and just need a polished format</li>
                <li>→ Your resume goes directly to a human (referral, agency, boutique firm) rather than through an ATS</li>
                <li>→ You&apos;re a recent graduate who needs a clean one-pager fast</li>
                <li>→ You&apos;re applying in a design-adjacent field where visual quality genuinely signals something</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-[var(--brand)] bg-[var(--brand)]/[0.03] p-6">
              <h3 className="font-extrabold text-[var(--ink)] mb-3">When Zari wins by a wide margin</h3>
              <ul className="space-y-2 text-[13.5px] leading-6 text-[var(--muted)]">
                <li>→ You&apos;re applying through corporate ATS, LinkedIn Easy Apply, or any system that filters before a human sees your resume</li>
                <li>→ You need to tailor your resume to different job descriptions</li>
                <li>→ You&apos;re getting applications out but not getting interviews — usually an ATS keyword problem</li>
                <li>→ You need interview prep, LinkedIn help, or salary negotiation coaching</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
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

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Full job search coaching, free to start</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">ATS optimization, interview coaching, LinkedIn, and salary negotiation — the parts of the job search that come after the PDF.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
