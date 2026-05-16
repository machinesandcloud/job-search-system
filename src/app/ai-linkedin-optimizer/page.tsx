import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI LinkedIn Optimizer — Get Found by Recruiters in One Session",
  description:
    "Zari's AI LinkedIn optimizer rewrites your headline, About section, and experience bullets for maximum recruiter visibility. Go from 54 to 91 search ranking in one session.",
  keywords: [
    "AI LinkedIn optimizer",
    "LinkedIn profile optimization",
    "LinkedIn profile writer",
    "LinkedIn SEO",
    "recruiter visibility LinkedIn",
    "LinkedIn headline optimizer",
    "AI LinkedIn profile",
    "LinkedIn keyword optimization",
    "LinkedIn profile review",
    "optimize LinkedIn for jobs",
  ],
  alternates: { canonical: "/ai-linkedin-optimizer" },
  openGraph: {
    title: "Zari AI LinkedIn Optimizer — Recruiter-Searchable in One Session",
    description: "AI-powered LinkedIn profile overhaul. Headline, About, keywords, and visibility score — rebuilt for your target role.",
    url: "/ai-linkedin-optimizer",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What does an AI LinkedIn optimizer do?", answer: "An AI LinkedIn optimizer analyzes your LinkedIn profile against recruiter search patterns and job description keywords, then rewrites your headline, About section, and experience bullets to maximize your visibility in LinkedIn's search algorithm." },
  { question: "How does LinkedIn's search algorithm work?", answer: "LinkedIn's search ranking favors profiles with keyword-rich headlines that match recruiter search terms, structured About sections with searchable skills, and consistent use of target-role keywords throughout the profile. Most profiles miss the headline and About section optimizations that drive the most visibility." },
  { question: "How much can Zari improve my LinkedIn visibility?", answer: "In a single session, Zari users typically go from a visibility score of 54–68 to 88–95, driven by headline restructuring, About section keyword density, and skills alignment to target role patterns." },
  { question: "Does Zari help with LinkedIn for career changers?", answer: "Yes. Career changers especially benefit from LinkedIn optimization — Zari repositions your profile narrative, rewrites your headline to signal the new direction, and rebuilds your skills section to match your target industry's keyword patterns rather than your previous one." },
];

export default async function AiLinkedinOptimizerPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI LinkedIn Optimizer", url: `${BASE_URL}/ai-linkedin-optimizer` }]} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", right: "-8%", background: "#4ca7e6", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI LinkedIn Optimizer · Recruiter Visibility · Keyword SEO
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Stop being invisible.<br />
            <span style={{ background: "linear-gradient(135deg,#4ca7e6,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Get found by recruiters.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Most LinkedIn profiles score under 60 on recruiter visibility — and their owners have no idea. Zari's AI LinkedIn optimizer rewrites your headline, About, and experience for maximum search ranking in one session.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(76,167,230,0.40)] transition-all hover:-translate-y-0.5" style={{ background: "#4ca7e6" }}>
              Optimize my LinkedIn free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/platform" className="inline-flex h-14 items-center rounded-xl border border-white/15 bg-white/[0.05] px-8 text-[15px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white">See how it works</Link>
          </div>
          {/* Score pill */}
          <div className="mt-12 inline-flex items-center gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-8 py-5">
            <div className="text-center"><p className="text-[2rem] font-extrabold text-white/30">54</p><p className="text-[11px] text-white/25">Visibility before</p></div>
            <svg className="h-5 w-5 text-[#4ca7e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            <div className="text-center"><p className="text-[2rem] font-extrabold text-[#4ca7e6]">91</p><p className="text-[11px] text-white/40">Recruiter rank</p></div>
            <div className="border-l border-white/10 pl-6 text-left"><p className="text-[12px] font-semibold text-white">One session</p><p className="text-[11px] text-white/35">Average improvement</p></div>
          </div>
        </div>
      </section>

      {/* WHAT GETS OPTIMIZED */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari optimizes on your LinkedIn</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { accent: "#4ca7e6", title: "Headline rewrite", body: "Built for search: target role + seniority + specialty + openness — not just a job title. This is the single highest-impact change for recruiter visibility." },
              { accent: "#0D7182", title: "About section rebuild", body: "Keyword-dense narrative written for LinkedIn's search algorithm AND for human readers. First 3 lines optimized to appear in search previews without expanding." },
              { accent: "#7a8dff", title: "Experience bullet rewrites", body: "Each job's bullet points are rewritten with role-relevant keywords, impact metrics, and scope signals — the same ATS analysis applied to your LinkedIn experience." },
              { accent: "#F97316", title: "Skills alignment", body: "Your skill stack is rebuilt to match your target role's keyword patterns. Skills that don't help your search ranking are deprioritized. Missing ones are flagged." },
              { accent: "#10B981", title: "Visibility score tracking", body: "Before and after visibility score with specific attribution — exactly which changes drove which improvement. You can see the delta and what to do next." },
              { accent: "#EC4899", title: "Repositioning for career changers", body: "For career pivots, Zari rewrites your narrative from scratch — leading with transferable skills and signaling the new direction without erasing credibility from your past." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: `${item.accent}18` }}>
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: item.accent }} />
                </div>
                <div>
                  <p className="mb-1 text-[14px] font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-3 text-[15px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[14px] leading-7 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#021c2e 0%,#1a5f8a 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Get recruiter DMs this week.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">One free LinkedIn optimization session. Visible results in one hour.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#1a5f8a] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
