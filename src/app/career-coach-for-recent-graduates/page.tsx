import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Recent Graduates — Entry-Level Job Search (2025)",
  description:
    "AI career coaching built for recent college graduates and new grads entering the workforce. Resume writing with limited experience, entry-level interview prep, LinkedIn setup, and first-job strategy.",
  keywords: ["career coach for recent graduates", "career coach for new grads", "recent graduate career coaching", "entry level career coach", "new grad job search", "career coach for college graduates", "first job career coach", "new graduate resume help"],
  alternates: { canonical: "/career-coach-for-recent-graduates" },
  openGraph: {
    title: "AI Career Coach for Recent Graduates — Entry-Level Job Search (2025)",
    description: "Resume writing, entry-level interview prep, LinkedIn setup, and first-job strategy — AI coaching built for new grads entering the workforce.",
    url: "/career-coach-for-recent-graduates",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How do I write a resume when I have no full-time work experience?", answer: "A strong new grad resume leads with education (if it's from a target school or directly relevant), then pivots to projects, internships, research, leadership roles, and coursework that demonstrates skills. The key is framing every entry in terms of what you did and what happened because of it — not just what it was. Zari's AI helps you identify the quantifiable impact in experiences that feel like they have none." },
  { question: "What's the best job search strategy for recent graduates?", answer: "The most effective new grad job search combines three channels: campus recruiting (if still available), employee referrals through alumni networks, and direct applications with strong cover letters. Most new grads over-invest in job portals and under-invest in alumni networking — people who graduated from your school are disproportionately likely to help you. Zari coaches you on all three channels." },
  { question: "How should a recent graduate's LinkedIn look?", answer: "Your LinkedIn headline should not say 'Recent Graduate seeking opportunities' — this reads as desperate and wastes prime real estate. Lead with your most relevant skills or target role: 'Software Engineer | Python, React, ML | Open to Full-Time Roles.' Fill out your About section with what you've built, what you're looking for, and what makes you interesting as a professional. Use Education + Featured sections aggressively. Zari rewrites all of this for you." },
  { question: "What questions should recent graduates expect in interviews?", answer: "New grad interviews focus less on past performance and more on potential, learning ability, and behavioral fit. Common questions: tell me about a challenging project and how you managed it, tell me about a time you had to learn something new quickly, what are you most proud of building or accomplishing, and why this company and role specifically. Zari coaches you on all of these with real-time answer feedback." },
];

const CHALLENGES = [
  { title: "The 'entry-level job requiring 3 years experience' paradox", body: "This is a real phenomenon — but it's not a wall. Requirements are wish lists. If you can demonstrate you can do the work through projects, internships, or relevant coursework, apply anyway. A well-targeted cover letter addressing the gap directly often outperforms a technically compliant application from a less interested candidate." },
  { title: "Making your experience sound more impressive than it feels", body: "Internships, class projects, research, club leadership, part-time jobs — these all count if you frame them right. 'Led a team of 4 students to build a full-stack web application for a non-profit, reducing their intake processing time by 60%' is a strong resume bullet. Most new grads write 'Group project for CS 401.' Zari helps you find the real impact in everything you've done." },
  { title: "Getting interviews without a network", body: "Alumni networking is the highest-leverage activity for new grads who don't have an established professional network. Most universities have alumni directories and LinkedIn alumni filters. A specific, brief message to an alumnus who works somewhere you're targeting — mentioning the shared school connection — converts at a higher rate than any other cold outreach channel." },
  { title: "Preparing for interviews without interview experience", body: "New grads are at a disadvantage in behavioral interviews because they have fewer work stories to draw from. The fix: go deeper on the experiences you do have (projects, internships, academic challenges, leadership roles) and practice pulling the key moments — decisions you made, obstacles you overcame, results you drove — until they're fluent and specific." },
];

const ROADMAP = [
  { week: "Week 1–2", action: "Resume + LinkedIn foundation", detail: "Build your resume around your strongest projects, internships, and academic achievements. Set up LinkedIn with a clear headline, complete About section, and at least 3 education-related posts or portfolio pieces." },
  { week: "Week 2–3", action: "Target company research", detail: "Build a list of 30–50 target companies. Prioritize companies known for strong new grad programs — structured onboarding, mentorship, and clear early-career development paths. Identify 2–3 alumni at each target." },
  { week: "Week 3–4", action: "Alumni outreach", detail: "Send 5–10 alumni outreach messages per week. Request 20-minute conversations about their experience and the company. Referrals from these conversations are your highest-value application channel." },
  { week: "Week 4–8", action: "Active applications + interview prep", detail: "Apply to 5–10 roles per week. For every interview scheduled, spend 2–3 hours: research the company and team, prepare your top 6 behavioral stories using STAR, prepare 5 specific questions to ask." },
  { week: "Ongoing", action: "Iterate based on feedback", detail: "Track your application-to-interview rate. If below 5%, rewrite your resume. If your interview-to-offer rate is low, focus on interview practice. Treat the job search as a system to optimize, not a lottery to wait on." },
];

export default async function CareerCoachRecentGradsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach for Recent Graduates", url: `${BASE_URL}/career-coach-for-recent-graduates` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            For New Grads & Entry-Level Candidates
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
            AI Career Coach for<br /><span className="gradient-text-animated">Recent Graduates</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            The entry-level job market is competitive and often feels rigged against people who haven&apos;t had a full-time job yet. Zari&apos;s AI coaching is built to help new grads compete — turning projects, internships, and academic experience into compelling applications.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start free coaching <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/ai-career-coach" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-7 text-[14px] font-semibold text-white/70 transition-all hover:border-white/30 hover:text-white">
              How Zari works
            </Link>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The real challenges of searching for a first job</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">These aren&apos;t generic problems. Here&apos;s what actually gets in the way — and what actually helps.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {CHALLENGES.map((c) => (
              <div key={c.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <p className="mb-2 font-bold text-[var(--ink)]">{c.title}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The new grad job search roadmap</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">A realistic timeline for your first post-graduation job search.</p>
          <div className="mt-10 space-y-4">
            {ROADMAP.map((step, i) => (
              <div key={step.week} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex-shrink-0 pt-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{i + 1}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">{step.week}</p>
                    <p className="font-bold text-[var(--ink)]">— {step.action}</p>
                  </div>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Zari covers */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Zari coaches for new grads</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Resume without full-time experience", body: "AI-powered resume coaching that turns projects, internships, research, and activities into compelling, quantified bullets — structured for the roles you're targeting." },
              { title: "LinkedIn from scratch", body: "Set up a complete LinkedIn profile that recruiter algorithms find: optimized headline, keyword-rich About section, featured projects, and experience framing that doesn't highlight your lack of experience." },
              { title: "Entry-level interview prep", body: "Practice the behavioral, situational, and case questions that dominate new grad interviews — with real-time feedback on answer quality, STAR structure, and specificity." },
              { title: "Alumni networking strategy", body: "Coaching on how to find and message alumni contacts — the highest-leverage networking channel for new grads who don't have an established professional network." },
              { title: "Cover letter writing", body: "AI-written cover letters that address the new grad positioning challenge directly — turning limited experience into genuine, compelling enthusiasm for a specific role." },
              { title: "First offer negotiation", body: "Yes, you can negotiate a first offer. Zari coaches new grads on how to negotiate base salary, signing bonus, start date, and remote work without risking the offer." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">New grad career coaching FAQs</h2>
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
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Start your job search with AI coaching — free</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume, LinkedIn, interview prep, and networking strategy — built for new grads who are starting from scratch but not starting from zero.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
