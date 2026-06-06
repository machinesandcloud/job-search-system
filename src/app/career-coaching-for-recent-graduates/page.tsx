import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coaching for Recent Graduates — AI Career Coach for New Grads (2025)",
  description:
    "What recent graduates actually need to land their first real job: how entry-level hiring works, why most new grad resumes fail ATS, and how to compete with limited experience. AI coaching free to start.",
  keywords: ["career coaching for recent graduates", "new grad career coach", "entry level career coach", "career advice for graduates", "AI career coach for students", "career coaching for college students", "new grad job search help", "first job after college"],
  alternates: { canonical: "/career-coaching-for-recent-graduates" },
  openGraph: {
    title: "Career Coaching for Recent Graduates — AI Career Coach for New Grads",
    description: "How entry-level hiring actually works and what new grads need to compete. AI coaching free to start.",
    url: "/career-coaching-for-recent-graduates",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const MISTAKES = [
  {
    mistake: "Listing responsibilities instead of outcomes",
    detail: "Entry-level resumes almost universally list what you did, not what resulted. 'Assisted with marketing campaigns' is a responsibility. 'Contributed to 3 social campaigns that grew Instagram following 22% in Q2' is an outcome. ATS and recruiters score on metrics — even from internships and class projects.",
  },
  {
    mistake: "Applying to roles that require 3+ years of experience",
    detail: "About 35% of entry-level job postings require experience a new grad cannot have. Applying to these is not a numbers game — it's wasted time. The correct move is to identify roles where the actual day-to-day is entry-level, regardless of what the title suggests, and to focus on companies known for strong new grad programs.",
  },
  {
    mistake: "No targeted keyword strategy",
    detail: "A resume written for 'any marketing role' passes ATS for no marketing roles. ATS keyword matching is role-specific — the words in your resume must mirror the words in the job description. For new grads with limited experience, keywords are often the only lever available to get past the filter.",
  },
  {
    mistake: "LinkedIn that signals student, not professional",
    detail: "Most new grad LinkedIn profiles have the university as the current position, a graduation photo as the profile picture, and a blank About section. Recruiters search LinkedIn for candidates who look like they're already doing the work — not candidates who are hoping to start. The profile needs to reflect where you're going, not where you've been.",
  },
];

const WHAT_TO_PREPARE = [
  { area: "Resume for entry-level roles", detail: "The resume needs to turn academic projects, internships, and part-time work into ATS-scoring bullets with metrics. GPA matters only if it's above 3.5 — otherwise lead with experience and projects. The format should be one clean page; recruiters are not spending more time on a new grad resume than on a senior one." },
  { area: "Two or three strong STAR stories", detail: "Behavioral interview questions hit new grads hardest because the experience pool is shallow. You need 2–3 pre-prepared STAR stories that can be adapted to multiple question types — 'tell me about a challenge,' 'describe a time you worked in a team,' 'give an example of initiative.' These come from internships, class projects, clubs, or volunteer work." },
  { area: "LinkedIn optimized for 'in the industry'", detail: "Your headline should reflect your target role, not your degree. 'Marketing degree candidate' becomes 'Marketing professional — digital campaigns, social media strategy.' The About section should read like a motivated professional, not a student summary. Recruiters who search for junior marketing talent are not filtering for 'candidate.'" },
  { area: "A targeted company list", detail: "Broad job boards favor candidates with experience. New grads do better targeting companies known for entry-level programs (rotational programs, associate programs, new grad cohorts), companies in growth mode, and companies where you have a network connection. 50 targeted applications outperform 500 spray-and-pray submissions." },
  { area: "A clear 'why this role' narrative", detail: "Interviewers ask new grads two things: 'Why this role?' and 'Why this company?' The answers need to be specific, not generic. 'I'm passionate about marketing' is not an answer — 'I've been following your product's growth in the D2C channel and I want to learn how you're thinking about customer acquisition at scale' is an answer." },
];

const FAQS = [
  {
    question: "What do recent graduates struggle with most in the job search?",
    answer: "Three things consistently: (1) Resume impact — new grads don't know how to turn limited experience into compelling bullets, so their resumes read as a list of duties rather than a record of outcomes. (2) Interview confidence — without a strong library of work experiences to draw from, behavioral questions feel exposing. (3) Targeting — applying too broadly to roles they can't realistically get, rather than narrowing to roles where the fit is genuine and the application can be strong. The first two are fixable with coaching and preparation. The third requires honest self-assessment about what entry-level actually means and where your background is genuinely competitive.",
  },
  {
    question: "Does GPA matter for entry-level jobs?",
    answer: "For a narrow set of employers and roles: yes. Investment banking and consulting firms at the bulge bracket and MBB level have GPA filters in their ATS systems (typically 3.5+). Some engineering-focused companies use GPA as a first-pass filter. For the majority of entry-level roles, GPA matters much less than relevant experience, skills, and how your resume is written. If your GPA is below 3.5, the most effective approach is to not list it, lead with your internship experience, and focus your applications on companies that don't have stated GPA requirements.",
  },
  {
    question: "How do I get interview experience as a new grad with limited work history?",
    answer: "The experience library is smaller, but it doesn't need to be empty. Academic projects, capstone assignments, group presentations, leadership in student organizations, volunteer roles, competitive programs (case competitions, hackathons), and part-time or freelance work all provide material for STAR stories. The key insight: STAR stories are about structure and specificity, not just professional seniority. A class project where you led a 4-person team that delivered a data analysis for a nonprofit is a completely usable story in a behavioral interview — if you frame it correctly. Zari helps you extract and structure these stories before the interview.",
  },
  {
    question: "Should recent graduates use a functional resume or chronological?",
    answer: "Chronological, always. Functional resumes (skills-first, minimal dates) are associated with candidates trying to hide limited experience or employment gaps. ATS systems parse chronological resumes more reliably. Recruiters are suspicious of functional formats and often skip them. For new grads, the correct approach is a chronological resume with education first (since that's the most relevant recent experience), followed by internships, projects, and skills. The goal is not to hide limited experience — it's to make the most of what exists.",
  },
  {
    question: "How long does a new grad job search typically take?",
    answer: "On average: 3–6 months from graduation to first offer, assuming active searching. The range is wide: campus recruiting processes that start in fall semester often result in offers before graduation, which is why early applications matter so much. For candidates who start searching after graduation, the timeline extends — there's more competition and fewer structured pipelines. Variables that accelerate the timeline: a strong internship at a recognizable company, an active network in the target industry, applications submitted in the first two weeks of a job posting (not after it's been up a month), and interview preparation that starts before the first application goes out.",
  },
];

export default async function CareerCoachingForRecentGraduatesPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coaching for Recent Graduates — AI Career Coach for New Grads"
        description="How entry-level hiring works, why new grad resumes fail, and what to prepare before your first real job search."
        datePublished={publishedDate}
        dateModified={publishedDate}
        url={`${BASE_URL}/career-coaching-for-recent-graduates`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coaching for Recent Graduates", url: `${BASE_URL}/career-coaching-for-recent-graduates` }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", right: "-5%", background: "#4361EE", opacity: 0.07, filter: "blur(160px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Career Coaching · Recent Graduates · Entry Level · First Job
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">
            Your first real job starts<br />
            <span className="gradient-text-animated">with the right preparation.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            Entry-level hiring is competitive, ATS-filtered, and poorly explained by career centers. Here&apos;s what actually gets recent graduates callbacks — and what most new grads get wrong.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[#4361EE] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(67,97,238,0.45)] transition-all hover:-translate-y-0.5">
              Start free — no card required
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <p className="mt-4 text-[12px] text-white/30">Free first session · Resume, LinkedIn, interview, and strategy coaching in one place</p>
        </div>
      </section>

      {/* What new grads get wrong */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">What most new grads get wrong</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">Four mistakes that kill new grad applications</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Entry-level hiring filters candidates fast. Most new grad applications fail before a human ever reads them — and for predictable reasons.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {MISTAKES.map(({ mistake, detail }, i) => (
              <div key={mistake} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4361EE] text-[12px] font-black text-white">{i + 1}</span>
                  <h3 className="font-extrabold text-[15px] text-[var(--ink)]">{mistake}</h3>
                </div>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to prepare */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">What to actually prepare</div>
          <h2 className="mb-3 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)] md:text-[2.6rem]">The five things new grads need before they start applying</h2>
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
            Most career advice for new grads is generic. This is specific — what you need to build before the first application goes out.
          </p>
          <div className="space-y-4">
            {WHAT_TO_PREPARE.map(({ area, detail }, i) => (
              <div key={area} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#4361EE] text-[13px] font-black text-[#4361EE]">{i + 1}</div>
                <div>
                  <h3 className="mb-1.5 font-extrabold text-[15px] text-[var(--ink)]">{area}</h3>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-[#4361EE] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-3 text-[1.9rem] font-extrabold text-white">Get your resume, LinkedIn, and interview prep done — all in one place.</h2>
          <p className="mb-7 text-[15px] text-white/75">Zari gives new grads everything they need to compete: ATS-optimized resume, LinkedIn rewrite, mock interview coaching, and job search strategy. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5">
            Start free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#4361EE]">Common questions</div>
          <h2 className="mb-10 text-[2.2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What recent graduates ask most</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-3 font-bold text-[15px] text-[var(--ink)]">{question}</h3>
                <p className="text-[13px] leading-7 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-28 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1a2f6e 50%, #4361EE 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-[2.6rem] font-extrabold tracking-[-0.03em]">Your first real role is closer than you think.</h2>
          <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/60">
            Resume coaching, LinkedIn optimization, mock interviews, and job search strategy — all in one place, free to start. No career center required.
          </p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)]">
            {userId ? "Go to dashboard" : "Start coaching — it's free"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <p className="mt-5 text-[12px] text-white/35">No credit card required · All coaching surfaces included · Results in minutes</p>
        </div>
      </section>
    </PageFrame>
  );
}
