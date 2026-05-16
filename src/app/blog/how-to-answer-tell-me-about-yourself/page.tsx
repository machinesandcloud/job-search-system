import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Answer \"Tell Me About Yourself\" — Examples & Formula (2025)",
  description:
    "The perfect answer to \"Tell me about yourself\" in a job interview. Includes the exact formula, 5 word-for-word examples by career stage, and common mistakes that hurt your first impression.",
  keywords: ["tell me about yourself interview answer", "how to answer tell me about yourself", "tell me about yourself example", "job interview opening question", "interview self introduction", "tell me about yourself formula"],
  alternates: { canonical: "/blog/how-to-answer-tell-me-about-yourself" },
  openGraph: { title: "How to Answer \"Tell Me About Yourself\" — Examples & Formula (2025)", description: "The formula + 5 examples for the most common interview opening question.", url: "/blog/how-to-answer-tell-me-about-yourself" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-02-28";
const MODIFIED = "2025-05-15";

export default async function TellMeAboutYourselfPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title={`How to Answer "Tell Me About Yourself" — Examples & Formula (2025)`}
        description="The formula + 5 examples for the most common interview opening question."
        url={`${BASE_URL}/blog/how-to-answer-tell-me-about-yourself`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Answer Tell Me About Yourself", url: `${BASE_URL}/blog/how-to-answer-tell-me-about-yourself` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Answer "Tell Me About Yourself" — Examples & Formula (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 9 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              "Tell me about yourself" is always the first question — and it's always the one people prepare for least. A strong opening answer sets the frame for the entire conversation. A weak one puts you on the back foot from the first 90 seconds.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What interviewers are actually asking</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              They're not asking for your life story. They're asking: <em>Why are you here, why should I keep listening, and does your background match what we need?</em>
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              "Tell me about yourself" is the interviewer's way of calibrating: How well does this person communicate? Do they know what's relevant? Can they be concise? Are they applying here for a specific reason or is this one of 50 applications?
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Your answer should take 60–90 seconds. Not shorter (signals you haven't prepared), not longer (signals you can't edit).
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The formula: Past → Present → Future</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The most reliable structure is a three-part narrative:
            </p>
            <div className="mt-5 space-y-3">
              {[
                { part: "Past", desc: "Where you've been. A one-sentence summary of your background and the most relevant experience. Not a chronological resume walkthrough — a single, curated thread." },
                { part: "Present", desc: "What you're doing now and what you've accomplished. One or two concrete achievements — with numbers if possible — that demonstrate the value you deliver." },
                { part: "Future", desc: "Why this role. A specific reason you're interested in this company or role — not generic excitement, but something that connects your background to what they're building." },
              ].map((item) => (
                <div key={item.part} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[12px] font-bold text-[var(--brand)]">{item.part[0]}</div>
                  <div>
                    <p className="mb-1 font-bold text-[var(--ink)]">{item.part}</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 word-for-word examples</h2>

            <h3 className="mt-8 text-[1.1rem] font-bold text-[var(--ink)]">1. Software engineer (mid-level, new job search)</h3>
            <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-[14px] italic leading-7 text-[var(--muted)]">
              "I'm a backend engineer with about five years of experience, mostly in Python and Go. I've been at a Series B fintech for the last three years, where I've focused on payment infrastructure — most recently, I led the redesign of our transaction reconciliation system that reduced processing errors by 94% and saved the team about 15 hours a week. I'm looking to move into a role where I can take on more architectural scope, and from what I've read about your platform engineering team's work on the real-time data pipeline, it sounds like exactly the kind of complexity I want to be working on."
            </div>

            <h3 className="mt-8 text-[1.1rem] font-bold text-[var(--ink)]">2. Product manager (career change from engineering)</h3>
            <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-[14px] italic leading-7 text-[var(--muted)]">
              "I spent the first four years of my career as a software engineer, but over time I found myself spending more energy on the why behind what we were building than the how. I made a deliberate move into product about two years ago and have been a PM at an enterprise SaaS company since then. In my current role I own the data integrations product — we grew that segment from $800K to $3.2M ARR in 18 months. I'm looking for a PM role at a growth-stage company where I can use both the technical background and the product instincts I've built."
            </div>

            <h3 className="mt-8 text-[1.1rem] font-bold text-[var(--ink)]">3. Recent graduate (first real job)</h3>
            <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-[14px] italic leading-7 text-[var(--muted)]">
              "I graduated in May with a degree in computer science, and I interned at a mid-size SaaS company last summer working on their backend data pipeline team. I built a data validation system that reduced manual review time by about 60% — which I'm proud of because I owned it end-to-end from design through deployment. I'm specifically targeting backend roles where I can keep building in Python and eventually grow toward more distributed systems work, which is what got me excited about this role."
            </div>

            <h3 className="mt-8 text-[1.1rem] font-bold text-[var(--ink)]">4. Marketing professional (laid off, actively searching)</h3>
            <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-[14px] italic leading-7 text-[var(--muted)]">
              "I've been in B2B content and demand generation for about seven years, most recently as content marketing manager at a Series C HR tech company that went through a significant reduction in force last month. In that role I built their content program from scratch — we went from zero organic search presence to 400,000 monthly visitors over two and a half years. I'm actively interviewing and very interested in this role specifically because of your focus on product-led growth, which is a motion I've been wanting to get closer to."
            </div>

            <h3 className="mt-8 text-[1.1rem] font-bold text-[var(--ink)]">5. Executive (VP searching for C-suite role)</h3>
            <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-[14px] italic leading-7 text-[var(--muted)]">
              "I've spent the last twelve years in enterprise software sales, with the last five as VP of Sales at two different Series B and C companies. In both roles I was brought in to build the sales function — hiring, building the playbook, and growing ARR. Most recently I took a company from $4M to $22M ARR over four years and built a team of 34 across enterprise and mid-market. I'm looking for a CRO or Head of Sales role at a company that's at a similar inflection point — strong product with a sales function that needs to be professionalized."
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 mistakes to avoid</h2>
            <div className="mt-4 space-y-4">
              {[
                { mistake: "Starting with childhood or college (unless you're a new grad)", fix: "Begin with the most relevant professional moment, not your origin story. Interviewers don't need context from ten years ago." },
                { mistake: "Reciting your resume chronologically", fix: "The interviewer has your resume. Give them the narrative thread, not the bullet points. Choose one story arc, not a timeline." },
                { mistake: "Ending without a connection to this role", fix: "Every answer should land on a specific reason you're interested in this company or role. \"Excited for this opportunity\" is not specific." },
                { mistake: "Going over 2 minutes", fix: "Practice delivering in 60–90 seconds. Record yourself. The discipline of brevity signals strong communication — which is exactly what interviewers are evaluating." },
              ].map((item) => (
                <div key={item.mistake} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="mb-2 font-bold text-[var(--ink)]">✗ {item.mistake}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.fix}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Practice with an AI interview coach</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Knowing the formula and delivering it confidently under pressure are different skills. Zari's <Link href="/ai-interview-coach" className="text-[var(--brand)] underline underline-offset-2">AI interview coach</Link> runs you through "Tell me about yourself" and the 20 most common interview questions, scores your answer, and gives specific feedback on structure, relevance, and delivery — so the real interview doesn't feel like the first time you've said it out loud.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Practice your interview answers with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari coaches you on "Tell me about yourself" and every other question you'll face.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
