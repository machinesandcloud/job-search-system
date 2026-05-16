import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach — Personalized Career Coaching Powered by AI",
  description:
    "Meet Zari, the AI career coach that reviews your resume, rewrites your LinkedIn, runs mock interviews, and guides your job search — 24/7, in minutes. Trusted by 10,000+ job seekers.",
  keywords: [
    "AI career coach",
    "AI career coaching",
    "personal career coach",
    "career coach online",
    "best AI career coach",
    "career coaching AI tool",
    "career advice AI",
    "AI job coach",
    "automated career coaching",
    "career coach app",
  ],
  alternates: { canonical: "/ai-career-coach" },
  openGraph: {
    title: "Zari — The #1 AI Career Coach",
    description: "AI-powered career coaching available 24/7. Resume, LinkedIn, interviews, and strategy — personalized to you.",
    url: "/ai-career-coach",
  },
};

const FAQS = [
  {
    question: "What is an AI career coach?",
    answer:
      "An AI career coach is a software system that uses artificial intelligence to provide personalized career guidance, resume feedback, interview preparation, and job search strategy — the same services a human career coach offers, but available instantly, 24/7, and at a fraction of the cost.",
  },
  {
    question: "How does Zari's AI career coach work?",
    answer:
      "You upload your resume and describe your target role. Zari's AI analyzes your materials against real job descriptions, identifies gaps, and delivers specific rewrites, LinkedIn optimizations, mock interview questions, and a strategic action plan — all in one session.",
  },
  {
    question: "Is Zari better than a human career coach?",
    answer:
      "Zari delivers expert-level feedback in minutes rather than weeks, is available 24/7, costs significantly less than human coaches ($200–$500/hr), and remembers every session to build on your progress. For tactical career work — resume, LinkedIn, interview prep — Zari outperforms most human coaches on speed and specificity.",
  },
  {
    question: "How much does AI career coaching cost?",
    answer:
      "Zari is free to start — no credit card required. You get one free session on each coaching surface (resume, LinkedIn, interview, career strategy). Pro plans unlock unlimited sessions starting at $29/month.",
  },
  {
    question: "Can Zari help with career changes?",
    answer:
      "Yes. Zari specializes in career pivots — identifying transferable skills, reframing your resume narrative for a new industry, filling keyword gaps, and building an interview story that positions your switch as strategic rather than desperate.",
  },
  {
    question: "Does Zari help with salary negotiation?",
    answer:
      "Yes. Zari's salary negotiation coach provides market benchmarks for your role and level, generates counter-offer scripts, and runs negotiation simulations with realistic pushback until the conversation feels natural.",
  },
];

const STATS = [
  { value: "10,000+", label: "Professionals coached" },
  { value: "4.9★", label: "Average rating" },
  { value: "3×", label: "More callbacks after coaching" },
  { value: "< 5 min", label: "Time to first insight" },
];

const COACHING_SURFACES = [
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    title: "Resume Writing & ATS Optimization",
    body: "Upload your resume. Zari scores every bullet against ATS filters and rewrites them with measurable impact — specific to your target role.",
    accent: "#0D7182",
    href: "/ai-resume-writer",
  },
  {
    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
    title: "LinkedIn Profile Optimization",
    body: "Zari rebuilds your headline, About, and bullet points for maximum recruiter visibility — based on real keyword patterns from live job descriptions.",
    accent: "#4ca7e6",
    href: "/ai-linkedin-optimizer",
  },
  {
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    title: "Mock Interview Coaching",
    body: "Behavioral, technical, and panel questions — scored live on STAR structure. Voice or text. Every vague answer caught before the real thing.",
    accent: "#7a8dff",
    href: "/ai-interview-coach",
  },
  {
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Career Strategy & Direction",
    body: "Your background scored across target roles, gap analysis with a closing plan, 3–5 target company recommendations, and a 30-day action plan.",
    accent: "#F97316",
    href: "/use-cases",
  },
  {
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 8v1m-2.4-6A3.2 3.2 0 0012 11m0 0a3.2 3.2 0 002.4-2M12 11v2",
    title: "Salary Negotiation Coach",
    body: "Market benchmarks, counter-offer scripts, and live negotiation simulation with pushback. Walk away knowing your number and how to ask for it.",
    accent: "#10B981",
    href: "/salary-negotiation-coach",
  },
  {
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Promotion Coaching",
    body: "Build your promotion case with evidence, practice your pitch for your manager, and run a gap analysis vs. your next-level rubric.",
    accent: "#EC4899",
    href: "/promotion-coach",
  },
];

const TESTIMONIALS = [
  { quote: "I'd been out of work 14 months after my maternity leave. Zari repositioned my resume in one session. Three interviews in the first week.", name: "Rachel M.", role: "Senior PM, Fintech", tag: "Return to work" },
  { quote: "My resume was scoring 48 on ATS — most applications never reached a human. After Zari, the silence stopped.", name: "James T.", role: "Software Engineer", tag: "ATS optimization" },
  { quote: "Career change from finance to product. Zari reframed my entire narrative. Without it I'd still be sending unanswered applications.", name: "Camille D.", role: "PM at Stripe", tag: "Career change" },
  { quote: "I was performing at Staff but interviewing like a Senior. Zari completely changed how I talked about my work. Got the Staff offer in 6 weeks.", name: "Priya K.", role: "Staff Engineer", tag: "Level up" },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export default async function AiCareerCoachPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "AI Career Coach", url: `${BASE_URL}/ai-career-coach` },
        ]}
      />

      {/* ══════ HERO ══════ */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "700px", height: "700px", top: "-15%", left: "-10%", background: "var(--brand)", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", width: "500px", height: "500px", top: "-5%", right: "-8%", background: "var(--purple)", opacity: 0.06, filter: "blur(120px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Resume · LinkedIn · Interviews
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4.2rem]">
            The AI career coach that<br />
            <span className="gradient-text-animated">actually gets you hired.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Zari is an AI career coach that reviews your resume line-by-line, rebuilds your LinkedIn for recruiter search,
            runs realistic mock interviews, and builds a strategy around your specific situation — in minutes, not weeks.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={userId ? "/dashboard" : "/signup"}
              className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5"
            >
              Start free — no card required
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/platform" className="inline-flex h-14 items-center rounded-xl border border-white/15 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white">
              See how it works
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.04] px-4 py-5">
                <p className="text-[1.8rem] font-extrabold text-white">{s.value}</p>
                <p className="mt-1 text-[12px] text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ WHAT IS AN AI CAREER COACH ══════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--ink)] md:text-[3rem]">
            What is an AI career coach — and why is it better?
          </h2>
          <div className="space-y-5 text-[16px] leading-8 text-[var(--muted)]">
            <p>
              A <strong className="text-[var(--ink)]">human career coach</strong> charges $200–$500 per session, takes days to schedule, and gives advice based on general patterns — not the specific role you're applying to today.
            </p>
            <p>
              An <strong className="text-[var(--ink)]">AI career coach like Zari</strong> analyzes your actual resume against the real job descriptions you care about, runs unlimited mock interviews at 2am, and delivers specific rewrites — not vague suggestions. It's available 24/7, starts free, and compounds across every session.
            </p>
            <p>
              The result: faster feedback, more specific guidance, and a fraction of the cost. Zari isn't a replacement for every human coach — but for the tactical, high-stakes work of landing a job, it outperforms most coaches on speed and specificity.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Human Coach", items: ["$200–$500/session", "Days to schedule", "General advice", "Limited availability", "No document context"] },
              { label: "Generic AI Tools", items: ["Generic prompts", "No session memory", "No ATS analysis", "No scoring", "No job-specific feedback"] },
              { label: "Zari AI Coach", items: ["Free to start", "Available 24/7", "Specific rewrites", "ATS scoring", "Builds session-over-session", "Role-matched feedback"], highlight: true },
            ].map((col) => (
              <div key={col.label} className={`rounded-2xl border p-6 ${col.highlight ? "border-[var(--brand)]/40 bg-[var(--brand)]/[0.04]" : "border-[var(--border)] bg-[var(--bg)]"}`}>
                <p className={`mb-4 text-[13px] font-bold uppercase tracking-wider ${col.highlight ? "text-[var(--brand)]" : "text-[var(--muted)]"}`}>{col.label}</p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13.5px] text-[var(--ink-2)]">
                      <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${col.highlight ? "bg-[var(--brand)]" : "bg-[var(--muted)]/40"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ COACHING SURFACES ══════ */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[3rem]">
              Six coaching surfaces. One focused system.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] text-[var(--muted)]">
              Each module is purpose-built with its own workspace, session memory, and actionable output.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COACHING_SURFACES.map((s) => (
              <Link key={s.title} href={s.href} className="group rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)] transition-all hover:-translate-y-1 hover:border-[var(--brand)]/30 hover:shadow-[var(--shadow-lg)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${s.accent}18` }}>
                  <svg className="h-5 w-5" style={{ color: s.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
                </div>
                <h3 className="mb-2 text-[15px] font-bold text-[var(--ink)]">{s.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{s.body}</p>
                <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold" style={{ color: s.accent }}>
                  Learn more <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[3rem]">
              Real results from real job seekers
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-7 shadow-[var(--shadow)]">
                <div className="mb-3 flex gap-0.5">
                  {[1,2,3,4,5].map((j) => <svg key={j} className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="mb-5 text-[15px] leading-7 text-[var(--ink-2)]">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--ink)]">{t.name}</p>
                    <p className="text-[12px] text-[var(--muted)]">{t.role}</p>
                  </div>
                  <span className="rounded-full border border-[var(--brand)]/20 bg-[var(--brand)]/[0.06] px-3 py-1 text-[11px] font-semibold text-[var(--brand)]">{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-3 text-[15px] font-bold text-[var(--ink)]">{faq.question}</h3>
                <p className="text-[14px] leading-7 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em] md:text-[3.4rem]">
            Your AI career coach<br />is ready right now.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">
            One free session on every coaching surface. No credit card. No lock-in. Start in 60 seconds.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] shadow-[0_8px_40px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Get started free"}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/pricing" className="inline-flex h-14 items-center rounded-xl border border-white/20 bg-white/[0.06] px-8 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.11] hover:text-white">
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
