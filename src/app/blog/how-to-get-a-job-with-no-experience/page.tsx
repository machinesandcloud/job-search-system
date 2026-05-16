import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job With No Experience — 12 Strategies That Work (2025)",
  description:
    "How to get a job when you have no experience — 12 specific strategies for recent graduates, career changers, and entry-level candidates. What actually works and what recruiters really think.",
  keywords: ["how to get a job with no experience", "get a job with no experience", "entry level job no experience", "how to get hired with no experience", "job search with no experience", "career change no experience", "first job tips", "how to get an entry level job"],
  alternates: { canonical: "/blog/how-to-get-a-job-with-no-experience" },
  openGraph: {
    title: "How to Get a Job With No Experience — 12 Strategies That Work (2025)",
    description: "12 specific strategies for landing a job when you don't have traditional experience — from recent graduates to career changers.",
    url: "/blog/how-to-get-a-job-with-no-experience",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-16";
const MODIFIED = "2025-05-16";

const STRATEGIES = [
  {
    n: 1,
    title: "Redefine what counts as experience",
    body: "The definition of 'experience' is narrower in your head than it is in a hiring manager's. Internships, freelance work, class projects, volunteer leadership, open source contributions, side projects with real users — these all count. List everything you've done that required the skills the job is looking for. Then ask: which of these produced measurable results?",
    accent: "#0D7182",
  },
  {
    n: 2,
    title: "Lead with outcomes, not activities",
    body: "The most common mistake on entry-level resumes: describing what you did, not what happened because of what you did. 'Assisted with social media' is activity. 'Grew the club's Instagram from 400 to 3,200 followers in four months by launching a weekly content series' is outcome. Every bullet you write should answer: so what?",
    accent: "#7a8dff",
  },
  {
    n: 3,
    title: "Target companies that develop talent, not extract it",
    body: "Some companies hire for current competency. Others hire for potential and invest in training. Your odds are dramatically higher at companies known for building people up — rotational programs, structured onboarding, mentorship cultures. Research which companies in your target industry are known for developing early-career talent. Apply there first.",
    accent: "#EC4899",
  },
  {
    n: 4,
    title: "Get a referral — even a weak one",
    body: "A referral from someone who barely knows you still increases your odds of an interview by 5–10x. Reach out to anyone who works at companies you're targeting: former classmates, professors, family connections, LinkedIn second-degree connections who share something in common with you. Ask them to forward your resume internally — not to advocate for you, just to put it in front of the right person.",
    accent: "#F97316",
  },
  {
    n: 5,
    title: "Do the work before the interview",
    body: "One of the most powerful things an inexperienced candidate can do is show up with something already done. Apply to a marketing role? Bring a one-page analysis of their current content strategy. Applying to a product team? Bring a teardown of their product with three observations. This demonstrates initiative, analytical ability, and genuine interest in a way that no resume bullet can.",
    accent: "#10B981",
  },
  {
    n: 6,
    title: "Write a cover letter that addresses the gap directly",
    body: "Don't pretend the experience gap doesn't exist — address it. One sentence is enough: 'I don't have three years of industry experience, but here's what I've been building and what I've done with it.' Then immediately pivot to your strongest evidence. Acknowledging the gap and moving past it reads as confident and self-aware. Ignoring it reads as oblivious.",
    accent: "#4ca7e6",
  },
  {
    n: 7,
    title: "Apply to roles that require fewer years than you think",
    body: "Job descriptions are wish lists, not requirements. The research consistently shows that companies hired candidates who met 60–70% of stated requirements. '2 years required' is often shorthand for 'someone who can do the work.' If you can do the work and you can demonstrate it, apply. The worst outcome is silence — which you'd get from not applying anyway.",
    accent: "#0D7182",
  },
  {
    n: 8,
    title: "Build a portfolio of relevant work",
    body: "In technical fields (software, design, data), a portfolio replaces experience more directly than almost any other signal. Build two or three projects that show real skills applied to real problems — not tutorials, but actual work you conceived and executed. In non-technical fields, a portfolio might mean a writing sample, an analysis, or a documented project outcome. Show your thinking, not just your credentials.",
    accent: "#7a8dff",
  },
  {
    n: 9,
    title: "Target the conversation, not just the application",
    body: "For roles where you lack traditional experience, the application portal is your least effective channel. Cold emailing a hiring manager or reaching out to someone on the team directly — before or after applying — is dramatically more effective for inexperienced candidates because it gives you a chance to make a case that your resume can't make alone.",
    accent: "#EC4899",
  },
  {
    n: 10,
    title: "Practice your story until it's effortless",
    body: "'Tell me about yourself' and 'why do you want to work here?' are the two questions that determine whether an inexperienced candidate gets a second interview. If you stumble, hedge, or sound uncertain, you lose the advantage that your energy and potential could give you. Practice both answers until they feel natural — not rehearsed, natural. There's a difference.",
    accent: "#F97316",
  },
  {
    n: 11,
    title: "Consider roles that build directly toward what you want",
    body: "A coordinator role at a company you love is better than an entry-level role at a company you don't care about — even if the coordinator role isn't your dream job. The fastest path to the career you want often runs through a role that gives you access to the right environment, the right people, and the right internal opportunities. Think in 18-month increments, not just about the next title.",
    accent: "#10B981",
  },
  {
    n: 12,
    title: "Treat rejection as information, not verdict",
    body: "Applying without experience is a numbers game — you will be rejected more often than someone with five years of experience in the role. That's the reality. But every 'no' that comes with silence teaches you that your materials aren't doing the job. Every conversation that doesn't convert tells you something about your interview performance. Iterate on what isn't working rather than doubling down on the same approach.",
    accent: "#4ca7e6",
  },
];

export default async function HowToGetJobNoExperiencePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get a Job With No Experience — 12 Strategies That Work (2025)"
        description="12 specific strategies for landing a job when you don't have traditional experience — from recent graduates to career changers."
        url={`${BASE_URL}/blog/how-to-get-a-job-with-no-experience`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get a Job With No Experience", url: `${BASE_URL}/blog/how-to-get-a-job-with-no-experience` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Job Search</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Get a Job With No Experience — 12 Strategies That Work (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 12 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              &ldquo;You need experience to get experience&rdquo; is one of the most discouraging things in job searching — and one of the least true. What you actually need is evidence that you can do the work. Here are 12 ways to build and communicate that evidence when you don&apos;t have a traditional employment history behind you.
            </p>

            <div className="mt-8 rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-5">
              <p className="font-bold text-[var(--ink)]">Who this applies to</p>
              <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">Recent graduates, career changers, people returning to work after a gap, candidates applying to a new industry, and anyone who has been rejected from roles citing a lack of experience. The strategies below work across all of these situations — some apply universally, some are specific to your context.</p>
            </div>

            <div className="mt-10 space-y-6">
              {STRATEGIES.map((s) => (
                <div key={s.n} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: s.accent }}>{s.n}</div>
                  <div>
                    <p className="mb-2 font-bold text-[var(--ink)]">{s.title}</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What hiring managers actually want from inexperienced candidates</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              When a hiring manager is evaluating a candidate without traditional experience, they&apos;re asking three questions:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { q: "Can they do the actual work?", detail: "Any evidence of relevant skills — projects, samples, demonstrated analysis, technical output — directly answers this. This is the most important signal." },
                { q: "Will they figure out what they don't know?", detail: "Initiative, self-teaching, asking good questions — anything that shows learning agility matters more than current knowledge at the entry level." },
                { q: "Will they be easy to work with?", detail: "Communication quality, preparation, genuine curiosity. First impressions in interviews carry enormous weight when experience can't do the work." },
              ].map((item) => (
                <div key={item.q} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-1 font-bold text-[var(--ink)]">{item.q}</p>
                  <p className="text-[13.5px] leading-5 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[15px] leading-7 text-[var(--muted)]">
              Everything in your job search — your resume, your cover letter, your LinkedIn, your interview performance — is an answer to one or more of those three questions. When you evaluate your materials, ask: does this prove I can do the work, that I can figure things out, and that I&apos;m someone worth betting on?
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get AI coaching on your resume and interview answers — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Whether you&apos;re a recent grad or a career changer, Zari helps you build the strongest possible case from the experience you actually have.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
