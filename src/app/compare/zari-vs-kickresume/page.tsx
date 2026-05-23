import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Kickresume — Resume Builder vs AI Career Coach (2025)",
  description:
    "Kickresume builds professional resumes with clean templates and AI writing assistance. Zari coaches your resume for a specific job, then takes you through LinkedIn, interviews, and the offer. Honest comparison.",
  keywords: ["Zari vs Kickresume", "Kickresume alternative", "Kickresume review 2025", "Kickresume vs AI career coach", "best resume builder 2025", "kickresume worth it", "kickresume vs zari"],
  alternates: { canonical: "/compare/zari-vs-kickresume" },
  openGraph: {
    title: "Zari vs Kickresume — Which Gets You Further? (2025)",
    description: "Kickresume is one of the better-designed resume builders available. Zari is the AI coach that takes you from resume to offer. Here's the full comparison.",
    url: "/compare/zari-vs-kickresume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What is Kickresume?",
    answer: "Kickresume is a resume builder with a library of clean, professionally designed templates. It offers AI-assisted writing suggestions, a built-in ATS checker with keyword feedback, cover letter building, and a 'Job Stories' gallery where real users share their resumes and what jobs they landed. Premium plans run roughly $10–19/month depending on which features you need.",
  },
  {
    question: "Is Kickresume good for ATS?",
    answer: "Kickresume has added an ATS checker that analyzes keyword match against a job description. The templates are generally cleaner than Enhancv (less design-heavy, fewer visual elements that break parsers). But ATS optimization is a secondary feature in Kickresume — the tool was built around visual resume design first. Zari's ATS analysis is deeper: it identifies specific keyword gaps and rewrites the bullets that need them.",
  },
  {
    question: "What does Kickresume's AI do?",
    answer: "Kickresume's AI generates bullet point suggestions based on your job title and industry. It's generative — you describe your role and it produces content. Zari works differently: it coaches you through articulating your specific experience, then produces targeted bullet rewrites based on the actual job description you're applying to. The output is more specific to your background and the target role.",
  },
  {
    question: "Which should I use: Kickresume or Zari?",
    answer: "They serve different jobs. Kickresume excels at producing a clean, polished resume document — if visual design and easy formatting matter, it's a good tool. Zari is for candidates who want coaching: a resume that's specifically optimized for a target role (not just a well-designed document), LinkedIn optimization for recruiter search, and preparation for the interviews that result.",
  },
  {
    question: "Can I use both?",
    answer: "Yes. Some candidates use Kickresume to format and export a clean PDF, then bring the content into Zari for ATS optimization and coaching before submitting. The document layer (formatting, visual design) and the coaching layer (keyword optimization, interview prep) are separate problems.",
  },
];

const DIMENSIONS = [
  {
    category: "Resume Templates & Design",
    kick: "Kickresume's genuine strength. Clean, modern templates across categories: professional, creative, simple, and industry-specific. The typography and spacing are well-considered. You can build a polished-looking resume faster here than with most tools.",
    zari: "Zari doesn't offer design templates. The focus is on content — what your bullets say, which keywords they include, and how they're framed relative to a specific job description. Clean formatting is assumed, not the product.",
    winner: "kick",
    winnerNote: "For visual polish and fast formatting, Kickresume is the better choice.",
  },
  {
    category: "ATS Keyword Optimization",
    kick: "Kickresume has an ATS checker that shows a keyword match score against a pasted job description. It flags missing terms and gives a pass/fail assessment. This is newer functionality — the tool was built around design first, so the ATS features are more supplementary than core.",
    zari: "ATS analysis is a primary feature, not a supplementary one. Zari scores your resume against the JD, identifies specific keyword gaps by category (hard skills, soft skills, domain terms), and produces rewritten bullets that naturally integrate the missing terms.",
    winner: "zari",
    winnerNote: "ATS optimization as a core function vs. an add-on produces meaningfully different depth.",
  },
  {
    category: "AI Writing Assistance",
    kick: "Kickresume's AI generates bullet point suggestions based on your job title. Input 'Senior Product Manager at fintech startup' and it produces generic bullets based on that role category. Useful for blank-page problems; less useful for making your actual experience compelling.",
    zari: "Coaching-first, not generation-first. Zari asks about your specific work — what you did, what changed, what the impact was — and produces bullets that reflect your real experience. The result is less generic and more likely to survive a human reviewer.",
    winner: "zari",
    winnerNote: "AI-generated generic content and AI-coached specific content produce very different resumes.",
  },
  {
    category: "Interview Coaching",
    kick: "Not offered. Kickresume ends at the document.",
    zari: "Full AI mock interview coaching — common questions, behavioral STAR structure and scoring, role-specific technical prep. Feedback on clarity, specificity, and where answers lose the interviewer.",
    winner: "zari",
    winnerNote: "The interview comes after the resume. Kickresume doesn't help there.",
  },
  {
    category: "LinkedIn Optimization",
    kick: "Not offered.",
    zari: "Rewrites your headline, About section, and experience bullets with the keywords recruiters actually search for when looking for your role. Output is ready-to-paste copy.",
    winner: "zari",
    winnerNote: "Most recruiter outreach starts on LinkedIn, not via resume submission.",
  },
  {
    category: "Cover Letter",
    kick: "Kickresume has a cover letter builder with matching templates and AI-assisted content generation. Produces a professional-looking document quickly.",
    zari: "AI writes your cover letter from scratch, personalized to your specific background and the target JD — addressing the role's requirements directly rather than filling a template.",
    winner: "tie",
    winnerNote: "Kickresume produces a well-designed cover letter quickly. Zari produces a more personalized one.",
  },
  {
    category: "Salary Negotiation",
    kick: "Not offered.",
    zari: "Simulates the negotiation conversation — anchoring, countering, handling pushback. Covers salary, equity, signing bonus, and remote work as negotiable dimensions.",
    winner: "zari",
    winnerNote: "Not offered by resume builders as a category.",
  },
];

export default async function ZariVsKickresumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Kickresume", url: `${BASE_URL}/compare/zari-vs-kickresume` },
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
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Kickresume</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Kickresume is a well-designed resume builder with clean templates and AI writing assistance. Zari is an AI career coach that optimizes your resume for a specific role, then coaches you through interviews and the offer. Different tools for different jobs.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">Kickresume is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Creating a visually polished, well-formatted resume document",
                  "Candidates who want a broad AI content suggestion to start from",
                  "Roles where visual design signals professional quality",
                  "Fast resume creation with matching cover letter templates",
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
                  "Deep ATS optimization against a specific job description",
                  "Bullet rewrites that reflect your actual experience (not generated filler)",
                  "Interview prep and salary negotiation after the resume gets you in",
                  "Candidates who need more than a document — they need coaching",
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

      {/* The template-generation gap */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Generated content vs. coached content</h2>
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
            Most AI resume tools — Kickresume included — use a generation approach: you provide a job title, they generate plausible bullet points. It&apos;s fast and solves the blank-page problem.
          </p>
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
            The issue is specificity. Generated content sounds like every other resume in the same role category. Zari&apos;s coaching approach produces something different:
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-[var(--border)] bg-white p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-2">Generated (Kickresume AI approach)</p>
              <p className="text-[14px] leading-6 text-[var(--muted)] font-mono bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
                &ldquo;Led cross-functional teams to deliver product roadmap initiatives on time and within budget.&rdquo;
              </p>
            </div>
            <div className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-[#4361EE] mb-2">Coached (Zari approach)</p>
              <p className="text-[14px] leading-6 text-[var(--ink)] bg-[var(--brand)]/[0.06] rounded-lg px-4 py-3 border border-[var(--brand)]/20">
                &ldquo;Coordinated a 6-person cross-functional team (eng, design, data) to ship three mobile features in Q3, reducing customer churn by 11% across the SMB segment.&rdquo;
              </p>
            </div>
          </div>
          <p className="mt-5 text-[14px] leading-7 text-[var(--muted)]">
            The coached version exists because Zari asked follow-up questions: how many people, what did they ship, what was the measurable result? Kickresume&apos;s AI doesn&apos;t ask — it generates based on the title alone.
          </p>
        </div>
      </section>

      {/* Dimension breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Where each tool wins — including where Kickresume genuinely comes out ahead.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[#4361EE]" :
                    dim.winner === "kick" ? "bg-slate-100 text-slate-500" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : dim.winner === "kick" ? "Kickresume wins" : "Tie"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Kickresume</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.kick}</p>
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
              Kickresume is a solid resume builder with better visual quality than most tools in its price range. The templates are clean, the ATS checker is a useful sanity check, and the AI writing assistance is genuinely helpful for getting a first draft down.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The limits become clear when you need more than a well-formatted document. Kickresume&apos;s AI generates from role categories; Zari coaches from your specific experience. Kickresume&apos;s ATS check shows you the score; Zari rewrites the bullets that need to change. And Kickresume ends when you submit the application — Zari is built for the whole arc.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              If you need a clean document fast and your content is already strong, Kickresume is a reasonable choice. If you need coaching — help figuring out what to say, how to position it, how to pass ATS for a specific role, and how to nail the interview — Zari is more aligned with what you actually need.
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
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Beyond the document. Try Zari free.</h2>
          <p className="mx-auto mt-4 text-[16px] text-white/55">Resume coaching, ATS optimization, interview prep, and salary negotiation — one AI for the full job search.</p>
          <div className="mt-8">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5">
              Start for free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
