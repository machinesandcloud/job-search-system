import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Resume.io — AI Career Coach vs Resume Builder (2025)",
  description:
    "Resume.io's guided step-by-step workflow makes building a resume easy. But easy and optimized aren't the same thing. Honest comparison: what Resume.io does well, where ATS keyword optimization matters more than design, and when Zari covers the parts Resume.io can't.",
  keywords: ["zari vs resume.io", "resume.io alternative", "resume.io review 2025", "resume.io vs ai career coach", "best resume builder 2025", "resume io competitor", "resume builder comparison 2025"],
  alternates: { canonical: "/compare/zari-vs-resumeio" },
  openGraph: {
    title: "Zari vs Resume.io — Which Gets You More Interviews? (2025)",
    description: "Resume.io guides you through building a resume. Zari coaches you through landing the job. Here's what that difference means in practice.",
    url: "/compare/zari-vs-resumeio",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Is Resume.io ATS-friendly?",
    answer: "Resume.io has cleaner layouts than some design-heavy builders, and newer templates avoid the worst ATS anti-patterns. But 'ATS-friendly' on a resume builder usually means 'won't completely break' — it doesn't mean keyword-optimized for a specific job. ATS scoring against a specific job description (which is what actually matters for getting past filters) isn't something Resume.io does. That's what Zari's ATS analysis is built for.",
  },
  {
    question: "Does Resume.io have AI features?",
    answer: "Resume.io has added AI-assisted bullet writing in recent versions. The AI generates suggestions based on your job title — useful for getting a starting draft, but the output is generic because it doesn't know your actual experience, scope, or accomplishments. Zari's coaching approach is different: it asks about your specific work and uses those details to write bullets that reflect what you actually did.",
  },
  {
    question: "What does Resume.io cost?",
    answer: "Resume.io offers a free tier with limited exports and a premium plan around $19.95/month or $95.40/year. A single download without a subscription is available for around $2.95. Zari offers a free tier across all coaching surfaces — resume, LinkedIn, interview prep — with no credit card required to start.",
  },
  {
    question: "Who should use Resume.io vs Zari?",
    answer: "Resume.io is best for candidates who need a clean, professional-looking resume quickly and already know their content is strong — they just need a format. Zari is better for anyone who wants help with what to say, not just how it looks. If your resume isn't getting interviews, the problem is usually content and keyword alignment — not formatting. If you're getting interviews but not offers, Resume.io can't help at all.",
  },
];

const DIMENSIONS = [
  {
    feature: "Resume templates & design",
    resumeio: "Genuine strength — clean, minimal templates that look professional across industries. The step-by-step guided workflow is well-designed and makes the process accessible even for people who haven't updated their resume in years. 100+ template options.",
    zari: "No visual templates — Zari focuses on content coaching, not design. If your primary need is a polished PDF format, Resume.io fills that gap; Zari doesn't.",
    winner: "resumeio",
  },
  {
    feature: "ATS keyword optimization",
    resumeio: "General guidance on keywords in help docs. No mechanism to score your resume against a specific job description, identify which keywords are missing, or tell you what your ATS match percentage is before you apply.",
    zari: "Purpose-built: paste a job description alongside your resume, get a specific ATS match score, a prioritized list of missing keywords, and rewritten bullets that include them in context. Job-description-specific, not generic advice.",
    winner: "zari",
  },
  {
    feature: "AI resume writing",
    resumeio: "AI suggestions generated from your job title. Good for producing a first draft quickly. Output quality is similar to other title-based generators — useful placeholder content, but doesn't know the scope of your actual work or your specific accomplishments.",
    zari: "Coaching approach: Zari asks what you actually did — team size, budget, outcome — then writes bullets using those specific details. The result is a bullet that can only describe your role, not something any product manager or engineer could claim.",
    winner: "zari",
  },
  {
    feature: "Cover letter builder",
    resumeio: "Matching cover letter templates that mirror your resume's design — consistent visual presentation is useful here. Guided prompts help structure the letter. The output is template-shaped rather than deeply personalized.",
    zari: "AI-written cover letters built from your experience and the specific role. Less visually integrated with your resume, but more tailored to the company and position you're actually targeting.",
    winner: "tie",
  },
  {
    feature: "Interview preparation",
    resumeio: "Not available. Resume.io's product scope ends at the document.",
    zari: "Full AI interview coaching: simulate a mock interview, respond in real time, get structured STAR feedback after each answer. Session memory tracks what you've practiced and adjusts what you work on.",
    winner: "zari",
  },
  {
    feature: "LinkedIn optimization",
    resumeio: "Not available.",
    zari: "AI coaching for your headline, About section, and experience bullets — optimized for recruiter search visibility rather than just readability.",
    winner: "zari",
  },
  {
    feature: "Salary negotiation coaching",
    resumeio: "Not available.",
    zari: "Dedicated negotiation coaching: counter-offer scripts, how to respond to 'we're at the top of the band,' equity analysis, and timing guidance on when to push vs. when to accept.",
    winner: "zari",
  },
];

export default async function ZariVsResumeIoPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Resume.io", url: `${BASE_URL}/compare/zari-vs-resumeio` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Resume.io</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Resume.io&apos;s guided workflow is genuinely good at producing a clean resume fast. But fast and optimized aren&apos;t the same thing — and Resume.io stops at the document. Here&apos;s the full picture.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">Resume.io</p>
              <p className="mt-2 text-[20px] font-extrabold text-white">A guided resume builder</p>
              <p className="mt-3 text-[13px] leading-6 text-white/50">100+ clean templates, step-by-step guided editing, PDF export. Best for candidates who need a professional-looking document quickly and already have strong content.</p>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#4361EE]/70">Zari</p>
              <p className="mt-2 text-[20px] font-extrabold text-white">An AI job search coach</p>
              <p className="mt-3 text-[13px] leading-6 text-white/60">ATS optimization, interview coaching, LinkedIn, and salary negotiation — coaching from application to offer. No visual templates; built for outcomes, not documents.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">

          <div className="mb-10 rounded-xl border border-amber-100 bg-amber-50/40 p-5">
            <p className="text-[14px] leading-7 text-[var(--ink)]">
              <span className="font-bold">The core gap: Resume.io optimizes for how your resume looks. Zari optimizes for whether it gets through.</span> Most corporate applications go through ATS software before any human sees the design. A beautifully formatted resume that scores 40% on keyword matching for a specific job loses to a plain-text resume that scores 85% — and Resume.io has no way to tell you what your score is.
            </p>
          </div>

          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature comparison</h2>
          <p className="mb-10 text-[15px] text-[var(--muted)]">An honest breakdown across every dimension that matters for a modern job search.</p>

          <div className="space-y-5">
            {DIMENSIONS.map((d) => (
              <div key={d.feature} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{d.feature}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${d.winner === "zari" ? "bg-[var(--brand)]/10 text-[#4361EE]" : d.winner === "resumeio" ? "bg-slate-100 text-slate-600" : "bg-slate-100 text-slate-500"}`}>
                    {d.winner === "zari" ? "Zari wins" : d.winner === "resumeio" ? "Resume.io wins" : "Tie"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Resume.io</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{d.resumeio}</p>
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
              <h3 className="font-extrabold text-[var(--ink)] mb-3">When Resume.io is the right call</h3>
              <ul className="space-y-2 text-[13.5px] leading-6 text-[var(--muted)]">
                <li>→ You have strong content and just need a clean, professional format</li>
                <li>→ You're applying to roles where the resume goes directly to a human — referrals, agency submissions, boutique firms</li>
                <li>→ You need a polished PDF quickly and don't want to spend time on coaching</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-[var(--brand)] bg-[var(--brand)]/[0.03] p-6">
              <h3 className="font-extrabold text-[var(--ink)] mb-3">When Zari wins clearly</h3>
              <ul className="space-y-2 text-[13.5px] leading-6 text-[var(--muted)]">
                <li>→ You're applying through ATS (corporate portals, LinkedIn Easy Apply, Indeed) and need keyword optimization</li>
                <li>→ You want coaching on what to say, not just how to format it</li>
                <li>→ You're sending applications but not getting interviews — almost always a content/ATS issue</li>
                <li>→ You need interview prep, LinkedIn optimization, or salary negotiation beyond the resume</li>
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
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Try Zari free — the full job search, not just the resume</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">ATS optimization, interview coaching, LinkedIn, and salary negotiation — all in one AI coaching platform. One free session on every surface, no card required.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start for free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
