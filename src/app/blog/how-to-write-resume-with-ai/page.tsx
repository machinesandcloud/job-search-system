import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Write a Resume with AI — The Right Way (2025 Guide)",
  description:
    "Step-by-step guide to writing a resume with AI tools in 2025. Learn how to use AI for ATS optimization, bullet rewrites, and keyword gaps — without producing a generic, filtered-out resume.",
  keywords: ["how to write resume with AI", "AI resume writing guide", "use AI to write resume", "AI resume tips", "write resume with ChatGPT", "best way to use AI for resume", "AI resume builder guide"],
  alternates: { canonical: "/blog/how-to-write-resume-with-ai" },
  openGraph: { title: "How to Write a Resume with AI (2025)", description: "Step-by-step guide. ATS optimization, bullet rewrites, keyword gaps — done right.", url: "/blog/how-to-write-resume-with-ai" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export default async function HowToWriteResumeWithAiPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Write a Resume with AI — The Right Way (2025 Guide)" description="Step-by-step guide to writing a resume with AI tools in 2025." url={`${BASE_URL}/blog/how-to-write-resume-with-ai`} datePublished="2025-05-01" />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Write a Resume with AI", url: `${BASE_URL}/blog/how-to-write-resume-with-ai` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 transition-colors hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-[#7a8dff]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7a8dff]">Resume</span>
            <span className="text-[12px] text-white/35">10 min read · May 2025</span>
          </div>
          <h1 className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[3rem]">How to Write a Resume with AI<br /><span className="text-white/50">(The Right Way)</span></h1>
          <p className="text-[16px] leading-8 text-white/50">Most AI-written resumes get rejected faster than manually written ones. Here&apos;s how to use AI correctly.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15.5px] leading-8 text-[var(--muted)]">

          <p>AI can make your resume significantly better — or significantly worse, depending on how you use it. The candidates who use AI correctly get more callbacks. The ones who use it incorrectly produce generic, keyword-stuffed resumes that get filtered even faster.</p>
          <p>This guide covers the right approach: how to use AI for the specific parts of resume writing where it provides a real advantage, and how to avoid the mistakes that make AI-generated resumes easy to spot and reject.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">The wrong way to write a resume with AI</h2>
          <p>The most common mistake: pasting a job description into ChatGPT and asking it to write you a resume. The output is predictable — generic, bloated language that sounds like every other AI-written resume and scores poorly on ATS systems because it&apos;s not specific to your actual experience.</p>
          <p>Recruiters have seen enough AI-written resumes to recognize the patterns. And ATS systems score for specificity — generic bullets lose on every dimension.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">The right way: use AI for analysis, not generation</h2>
          <p>AI is most powerful when it&apos;s analyzing your existing content, not generating content from scratch. Here&apos;s the workflow that produces resumes that pass ATS filters and impress human readers:</p>

          <div className="space-y-5">
            {[
              { step: "Step 1", title: "Start with your real experience", body: "Write your experience bullets from scratch — your actual work, in your own words. AI-generated experience descriptions are detectable and generic. Your job is to capture what you actually did and what the outcome was." },
              { step: "Step 2", title: "Run an ATS keyword analysis", body: "Paste your resume and your target job description into an AI resume tool (Zari, or a purpose-built ATS scanner). Ask it to identify which keywords from the job description are missing from your resume. These are the gaps ATS systems will flag." },
              { step: "Step 3", title: "Let AI rewrite individual weak bullets", body: "Don't ask AI to write your whole resume. Instead: share one weak bullet at a time and ask for a specific rewrite that adds a metric, closes a keyword gap, or strengthens the action verb. Evaluate each rewrite — keep the ones that capture your actual work more precisely, reject the ones that drift from what you actually did." },
              { step: "Step 4", title: "Score the result", body: "Use a purpose-built tool (Zari is built for this) to get an ATS score before and after your rewrites. Your target: 80+ on ATS compatibility. Most starting resumes score 45–65. A good rewrite session should get you to 80–90." },
              { step: "Step 5", title: "Calibrate for seniority", body: "Ask AI to evaluate whether your language signals the right seniority level for your target role. The difference between IC and leadership language is specific — AI can identify where your bullets sound too tactical for the level you're targeting." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{item.step.split(" ")[1]}</div>
                </div>
                <div>
                  <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="text-[14px] leading-7">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">What AI is particularly good at for resumes</h2>
          <ul className="space-y-3">
            {[
              "Identifying missing keywords from job descriptions (fast and comprehensive)",
              "Rewriting vague action verbs ('responsible for', 'worked on') to high-signal ones ('architected', 'led', 'drove')",
              "Adding context for metric-less bullets — 'managed a team' → 'managed a 6-person team across 3 time zones'",
              "Calibrating seniority signals — flagging IC language in a director-level resume",
              "Generating a keyword-dense summary section that captures your positioning",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20,6 9,17 4,12" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">The tool designed for this</h2>
          <p>Zari is built specifically for AI-powered resume optimization — ATS scoring, keyword gap analysis, and bullet rewrites that are specific to your target role. Unlike general-purpose AI, Zari has the scoring framework and job-description context built in, so you&apos;re not managing the analysis yourself.</p>
          <p>One resume session in Zari takes under 15 minutes and typically moves your ATS score from 52 to 89. It&apos;s free to start — no card required.</p>

          <div className="mt-10 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6 text-center">
            <p className="mb-2 text-[15px] font-bold text-[var(--ink)]">Try AI resume optimization — free</p>
            <p className="mb-5 text-[13.5px] text-[var(--muted)]">Upload your resume, get ATS scoring and specific bullet rewrites. One free session.</p>
            <Link href="/ai-resume-writer" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5">
              Write my resume with AI <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-6 text-[1.4rem] font-bold text-[var(--ink)]">Related guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { href: "/blog/ats-resume-tips", title: "ATS Resume Tips: Beat the Filters", tag: "Resume" },
              { href: "/blog/best-ai-career-coach", title: "Best AI Career Coach 2025 — Honest Comparison", tag: "Comparison" },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="group rounded-2xl border border-[var(--border)] bg-white p-5 transition-all hover:-translate-y-0.5">
                <span className="mb-2 inline-block rounded-full bg-[var(--brand)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">{a.tag}</span>
                <p className="text-[14px] font-semibold text-[var(--ink)] group-hover:text-[var(--brand)]">{a.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
