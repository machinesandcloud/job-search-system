import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Resume Worded — Which Gets You Further? (2025)",
  description:
    "Resume Worded gives detailed AI feedback on your resume and LinkedIn. Zari gives the same feedback — and then rewrites the sections for you, plus interview coaching, salary negotiation, and more.",
  keywords: ["Zari vs Resume Worded", "Resume Worded alternative", "Resume Worded review 2025", "Resume Worded vs AI career coach", "better than Resume Worded", "resume worded worth it"],
  alternates: { canonical: "/compare/zari-vs-resume-worded" },
  openGraph: {
    title: "Zari vs Resume Worded — Full 2025 Comparison",
    description: "Resume Worded finds the problems. Zari finds them and rewrites the bullets — then coaches you through the interview and the offer.",
    url: "/compare/zari-vs-resume-worded",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What is Resume Worded and what does it do?",
    answer: "Resume Worded is an AI-powered resume and LinkedIn review tool. Its core products are: Resume Review (overall score, line-by-line feedback), Targeted Resume (like Jobscan — keyword match against a specific JD), and LinkedIn Review (profile score and suggestions). It's positioned as AI feedback on your materials — strong on diagnosis, but the rewriting is still on you.",
  },
  {
    question: "What's the difference between Resume Worded's feedback and what Zari delivers?",
    answer: "Resume Worded tells you: 'This bullet lacks quantifiable impact. Try adding a metric that shows the result.' Zari shows you the rewritten version: 'Led 5-person onboarding team that reduced time-to-productivity for new hires from 12 weeks to 7 weeks.' Resume Worded is Grammarly-style feedback. Zari is a coach who writes the improved version with you.",
  },
  {
    question: "Does Resume Worded help with interviews?",
    answer: "Resume Worded focuses on written materials — resume and LinkedIn. It doesn't offer mock interview coaching, STAR answer evaluation, or salary negotiation practice. Zari covers the full arc from application to offer.",
  },
  {
    question: "Is Resume Worded worth the price?",
    answer: "Resume Worded is genuinely useful as a resume diagnostic — the line-by-line scoring is specific and actionable. The limitation is the handoff problem: you know what to fix, but making those fixes well requires knowing how to write strong resume bullets. If you already write well, Resume Worded is a solid checker. If you're not sure how to implement the feedback, Zari shortens that loop significantly.",
  },
  {
    question: "Can I use Resume Worded and Zari together?",
    answer: "There's meaningful overlap — both analyze your resume's keyword coverage and bullet quality. The more useful combination would be using Zari for the full coaching loop (resume + LinkedIn + interview prep) and skipping Resume Worded. But if you're already paying for Resume Worded, it can serve as a second opinion on ATS pass rate.",
  },
];

const DIMENSIONS = [
  {
    category: "Resume Scoring & Feedback",
    rw: "Resume Worded's resume review is genuinely thorough — it scores your resume out of 100, gives section-level scores (Contact, Summary, Experience, Skills, Education), and provides line-by-line feedback on every bullet. The feedback is specific: 'this bullet uses a weak action verb' or 'missing quantifiable metric here.'",
    zari: "Zari scores and analyzes your resume with the same level of specificity — identifying weak bullets, missing keywords, ATS formatting issues, and content gaps. The difference is what follows the analysis: Zari produces the rewrites, not just the list of things to fix.",
    winner: "tie",
    winnerNote: "Both do rigorous resume analysis. The divergence point is who does the rewriting.",
  },
  {
    category: "Bullet Rewrites",
    rw: "Resume Worded identifies that a bullet is weak and tells you why ('lacks impact metric,' 'weak action verb,' 'no scope indicator'). Writing the improved version is left to you — which is harder than it sounds when you're working inside your own resume.",
    zari: "Produces the rewritten bullet based on the specific feedback. If your current bullet is 'Responsible for managing client relationships,' Zari rewrites it to 'Managed relationships with 22 enterprise clients ($1.4M ARR), achieving 94% retention over 3 years.' You paste, not draft.",
    winner: "zari",
    winnerNote: "The gap between 'you should add a metric' and 'here's the metric-driven bullet' is where job seekers lose days.",
  },
  {
    category: "LinkedIn Review",
    rw: "Resume Worded has a LinkedIn review product that scores your profile and provides section-level feedback — headline, About, experience bullets. It flags gaps and generic language but, like the resume product, produces feedback rather than rewrites.",
    zari: "Rewrites your LinkedIn headline, About section, and experience bullets — optimized for both recruiter keyword searches and human readability. The output is a ready-to-paste updated profile.",
    winner: "zari",
    winnerNote: "LinkedIn optimization is most valuable when you can implement changes immediately, not interpret feedback.",
  },
  {
    category: "ATS Keyword Targeting",
    rw: "Resume Worded's Targeted Resume product (similar to Jobscan) lets you paste a job description and see how well your resume matches. Shows keyword gaps and a match score.",
    zari: "Performs the same JD-vs-resume analysis and then rewrites the specific bullets that should contain the missing keywords — in context, with authentic phrasing rather than keyword padding.",
    winner: "zari",
    winnerNote: "Keyword gap analysis is only useful if you can act on it. Zari closes the loop.",
  },
  {
    category: "Interview Coaching",
    rw: "Not offered. Resume Worded ends at written materials — resume and LinkedIn. Once your application goes in, you're on your own.",
    zari: "Full mock interview coaching with AI — practice common, behavioral (STAR structure and scoring), and role-specific questions. Real-time feedback on clarity, specificity, and where your answers trail off.",
    winner: "zari",
    winnerNote: "Getting the interview from a strong resume is step one. Winning it requires different preparation.",
  },
  {
    category: "Salary Negotiation",
    rw: "Not offered.",
    zari: "Simulates the offer negotiation conversation — practicing how to anchor your number, counter, and respond to classic pushbacks like 'we're at the top of the band' or 'let's revisit at your 90-day review.'",
    winner: "zari",
    winnerNote: "Offer negotiation is where 3–12% more compensation gets left on the table — usually because candidates didn't practice the conversation.",
  },
  {
    category: "Courses & Structured Learning",
    rw: "Resume Worded offers a Courses section with structured video lessons on resume writing, LinkedIn optimization, and job search fundamentals. Useful if you prefer video instruction over interactive coaching.",
    zari: "Coaching-first, not course-first. Instead of watching how to rewrite a bullet, you work through the actual rewrite with AI. The learning is embedded in the doing.",
    winner: "tie",
    winnerNote: "Courses vs. coaching is a genuine tradeoff depending on how you prefer to learn.",
  },
];

export default async function ZariVsResumeWordedPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Resume Worded", url: `${BASE_URL}/compare/zari-vs-resume-worded` },
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
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Resume Worded</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Resume Worded is like Grammarly for your resume — it spots the problems and tells you what&apos;s wrong. Zari spots the problems and writes the fixed version. Here&apos;s the full comparison.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">Resume Worded is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Structured video learning about resume and LinkedIn strategy",
                  "Candidates who want a rigorous AI audit before they finalize",
                  "Getting a second opinion before submitting a polished resume",
                  "People who prefer reading feedback and implementing themselves",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70">
                    <span className="mt-0.5 text-white/40">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]/70">Zari is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Getting the rewritten bullet, not just the note to improve it",
                  "Interview coaching and offer negotiation — not just the resume",
                  "Working through your job search in one session vs. switching tools",
                  "Anyone who'd rather talk through the fix than read about it",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="mt-0.5 text-[#4361EE]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The handoff problem */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The handoff problem with feedback-only tools</h2>
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
            Resume Worded gives excellent feedback. But there&apos;s a real gap between reading feedback and implementing it well — especially when you&apos;re critiquing your own work.
          </p>
          <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-6 space-y-5">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-2">Resume Worded feedback</p>
              <p className="text-[14px] leading-6 text-[var(--ink)] bg-slate-50 rounded-lg px-4 py-3 border border-slate-100 font-mono">
                &ldquo;This bullet lacks a quantifiable result. Consider adding a metric to show impact. Also, &apos;responsible for&apos; is a weak opener — use a stronger action verb.&rdquo;
              </p>
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wider text-[#4361EE] mb-2">What Zari produces instead</p>
              <p className="text-[14px] leading-6 text-[var(--ink)] bg-[var(--brand)]/[0.04] rounded-lg px-4 py-3 border border-[var(--brand)]/20">
                &ldquo;Managed relationships with 22 enterprise accounts ($1.4M ARR combined), driving 94% annual retention and a 31% expansion rate in year two.&rdquo;
              </p>
            </div>
          </div>
          <p className="mt-6 text-[14px] leading-7 text-[var(--muted)]">
            Both start from the same audit. The difference is whether you spend the next 20 minutes staring at the feedback trying to figure out the fix, or whether you get the rewritten sentence and decide if it fits.
          </p>
        </div>
      </section>

      {/* Dimension breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">An honest comparison across every job search dimension.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[#4361EE]" : "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : "Tie"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Resume Worded</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.rw}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.zari}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Bottom line: </span>{dim.winnerNote}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-amber-100 bg-amber-50/40 p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The honest verdict</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Resume Worded is a solid resume audit tool — the line-by-line feedback is specific and the scoring is more granular than most competitors. If you write well and just want a rigorous second opinion before submitting, it earns its price.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The gap is the handoff. Resume Worded tells you what to fix and leaves the fixing to you. That&apos;s a meaningful burden — especially when the feedback is &ldquo;add metrics&rdquo; and you don&apos;t have clean numbers to pull from. Zari shortens that loop by producing the actual rewrite.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              And then there&apos;s the scope difference. Resume Worded ends when your resume looks good on paper. Zari covers what comes next: the LinkedIn search visibility, the phone screen, the offer conversation. For anyone going through a full job search, that coverage gap matters.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Try Zari free — no card required</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume scoring and rewrites, LinkedIn optimization, interview coaching, and salary negotiation — one AI for the complete job search.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start for free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
