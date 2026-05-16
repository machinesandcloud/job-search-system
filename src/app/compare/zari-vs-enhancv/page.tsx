import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Enhancv — Which AI Career Tool Is Worth Your Time? (2025)",
  description:
    "Zari vs Enhancv: an honest comparison of features, pricing, and results. Enhancv builds visually stunning resumes. Zari coaches your entire job search with AI. Here's the difference.",
  keywords: ["zari vs enhancv", "enhancv alternative", "enhancv review", "enhancv vs ai career coach", "best resume builder 2025", "enhancv competitor", "ai resume builder comparison"],
  alternates: { canonical: "/compare/zari-vs-enhancv" },
  openGraph: {
    title: "Zari vs Enhancv — Which Career Tool Actually Moves the Needle? (2025)",
    description: "Honest comparison: Enhancv for beautiful resumes vs Zari for full job search coaching.",
    url: "/compare/zari-vs-enhancv",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Is Enhancv good for ATS optimization?", answer: "Enhancv has basic ATS guidance but its primary strength is visual resume design — templates with charts, timelines, and icons. These can actually hurt ATS parse rates if the system can't read graphics. Zari's resume coaching focuses entirely on clean, ATS-optimized content and keyword alignment." },
  { question: "Does Enhancv help with interview prep?", answer: "Enhancv focuses on resume building only. It does not offer interview practice, behavioral question coaching, or feedback on your answers. Zari covers the full job search — resume, LinkedIn, interview coaching, and salary negotiation — in one platform." },
  { question: "Can I use both Enhancv and Zari?", answer: "Yes. Some candidates use Enhancv for a visually polished PDF to share directly with their network, and Zari for ATS-optimized content and interview coaching. They serve different purposes." },
  { question: "What does Enhancv cost?", answer: "Enhancv is typically $19.99–$24.99/month for premium access to all templates and export options. Zari starts free and offers premium coaching plans at competitive rates." },
];

const DIMENSIONS = [
  {
    category: "Resume Building",
    enhancv: "Industry-leading visual resume builder with 40+ designer templates, sections for achievements, timelines, and charts. Strong for design, marketing, and creative roles.",
    zari: "AI resume coaching that rewrites, keyword-optimizes, and scores your resume against specific job descriptions. Built for ATS — not visual design.",
    winner: "enhancv",
    winnerNote: "If the goal is a beautiful PDF to send directly.",
  },
  {
    category: "ATS Optimization",
    enhancv: "Basic ATS tips and a simple checker, but visual template elements (columns, charts, icons) can break machine parsing in many ATS systems.",
    zari: "Deep ATS analysis: keyword match scoring against JDs, format checking, skills gap identification. Built from the ground up for ATS pass rates.",
    winner: "zari",
    winnerNote: "Critical for corporate job applications routed through software.",
  },
  {
    category: "Interview Preparation",
    enhancv: "Not offered. Enhancv is a resume builder, not a coaching platform.",
    zari: "Full AI interview coach — practice common, behavioral, and role-specific questions with real-time feedback on clarity, specificity, and STAR structure.",
    winner: "zari",
    winnerNote: "Enhancv stops at the resume. Zari takes you through the offer.",
  },
  {
    category: "LinkedIn Optimization",
    enhancv: "Not offered.",
    zari: "AI-powered LinkedIn coaching: headline rewriting, About section drafting, experience bullets optimized for recruiter search keywords.",
    winner: "zari",
    winnerNote: "LinkedIn is where most recruiter outreach starts.",
  },
  {
    category: "Visual Design Quality",
    enhancv: "Best-in-class. Professionally designed templates used by candidates at Google, Netflix, and Amazon. Strong for roles where the PDF gets read directly.",
    zari: "Clean, professional resume format — not design-forward. Optimized for machines, not magazine layouts.",
    winner: "enhancv",
    winnerNote: "If visual impact matters more than ATS compatibility.",
  },
  {
    category: "Coaching & Feedback",
    enhancv: "Template-guided section suggestions and basic content tips. No live AI coaching or back-and-forth feedback loops.",
    zari: "Full conversational AI coaching across every job search surface. Ask anything, get specific feedback, practice in real time.",
    winner: "zari",
    winnerNote: "Coaching vs. templates — fundamentally different product categories.",
  },
];

export default async function ZariVsEnhancvPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Enhancv", url: `${BASE_URL}/compare/zari-vs-enhancv` },
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
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Enhancv</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Enhancv is one of the best resume builders for visual design. Zari is an AI career coach that covers the entire job search. If you only need a beautiful PDF, Enhancv is excellent. If you need to actually land the job — the comparison gets complicated fast.
          </p>

          {/* Quick verdict */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">Enhancv is better for</p>
              <ul className="mt-3 space-y-2">
                {["Creating a visually stunning PDF resume", "Design, creative & marketing roles", "Roles where you send resumes directly (not through ATS)", "Candidates who already know their content is strong"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70">
                    <span className="mt-0.5 text-emerald-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari is better for</p>
              <ul className="mt-3 space-y-2">
                {["ATS-heavy corporate job searches", "Interview coaching and behavioral prep", "LinkedIn optimization for recruiter visibility", "Anyone who needs full-stack job search coaching"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="mt-0.5 text-[var(--brand)]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dimension-by-dimension breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">We looked at every major job search capability. Here's how they compare honestly.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-slate-100 text-slate-500"}`}>
                    {dim.winner === "zari" ? "Zari wins" : "Enhancv wins"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Enhancv</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.enhancv}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.zari}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Bottom line: </span>{dim.winnerNote}</p>
                </div>
              </div>
            ))}
          </div>

          {/* The honest take */}
          <div className="mt-16 rounded-2xl border border-amber-100 bg-amber-50/40 p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The honest verdict</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Enhancv is genuinely excellent at what it does — if you want a beautiful resume PDF that you&apos;re sending directly to a hiring manager you found on LinkedIn, Enhancv will produce something that looks more polished than most.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              But for most job seekers today — especially those applying through company portals, LinkedIn Easy Apply, or any corporate ATS — visual design can actively hurt you. Columns, icons, and timeline sections break parsing in ways that mean your resume never reaches a human.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              And even if your resume gets through, Enhancv ends there. It won&apos;t help you prep for the phone screen, optimize your LinkedIn for inbound interest, or negotiate the offer. Zari was built for the entire job search, not just the document.
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
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume coaching, interview prep, LinkedIn optimization, and salary negotiation — one AI for the complete job search.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start for free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
