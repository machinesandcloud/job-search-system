import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Best AI Career Coach in 2025 — Honest Comparison",
  description:
    "We tested every major AI career coaching tool in 2025. Here's an honest comparison of Zari, Kleo, Teal, Resume.io, and others — on resume quality, interview prep, LinkedIn optimization, and job outcomes.",
  keywords: ["best AI career coach", "AI career coach comparison", "best career coaching AI", "Zari vs Kleo", "AI career coaching tools 2025", "top AI career coaches", "AI career coach review"],
  alternates: { canonical: "/blog/best-ai-career-coach" },
  openGraph: { title: "Best AI Career Coach 2025 — Honest Comparison", description: "Tested every major AI career tool. Here's what actually works.", url: "/blog/best-ai-career-coach" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export default async function BestAiCareerCoachPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Best AI Career Coach in 2025 — Honest Comparison"
        description="We tested every major AI career coaching tool in 2025. Here's an honest comparison on resume quality, interview prep, LinkedIn optimization, and job outcomes."
        url={`${BASE_URL}/blog/best-ai-career-coach`}
        datePublished="2025-05-01"
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Best AI Career Coach 2025", url: `${BASE_URL}/blog/best-ai-career-coach` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 transition-colors hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-[var(--brand)]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Comparison</span>
            <span className="text-[12px] text-white/35">8 min read · May 2025</span>
          </div>
          <h1 className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[3rem]">Best AI Career Coach in 2025 — Honest Comparison</h1>
          <p className="text-[16px] leading-8 text-white/50">We tested every major AI career coaching tool available. Here's what we found.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-lg max-w-none">

            <div className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="text-[13px] font-bold uppercase tracking-wider text-[var(--muted)] mb-3">Quick summary</p>
              <ul className="space-y-2 text-[14px] text-[var(--ink-2)]">
                <li className="flex gap-2"><span className="text-[var(--brand)] font-bold">→</span> <strong>Best overall AI career coach:</strong> Zari — resume, LinkedIn, interviews, and strategy in one platform with session memory</li>
                <li className="flex gap-2"><span className="text-[var(--brand)] font-bold">→</span> <strong>Best for resume only:</strong> Resume.io (though lacks coaching depth)</li>
                <li className="flex gap-2"><span className="text-[var(--brand)] font-bold">→</span> <strong>Best for job tracking:</strong> Teal (not a coaching tool — a job search tracker)</li>
                <li className="flex gap-2"><span className="text-[var(--brand)] font-bold">→</span> <strong>Key finding:</strong> Most "AI career coaches" are one-trick tools. Only Zari offers multi-surface coaching with session memory.</li>
              </ul>
            </div>

            <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">What makes a great AI career coach?</h2>
            <p className="text-[15.5px] leading-8 text-[var(--muted)]">Before comparing tools, let&apos;s define what we&apos;re evaluating. A truly useful AI career coach needs to do all of the following:</p>
            <ul className="space-y-2 text-[15px] leading-7 text-[var(--muted)]">
              <li><strong className="text-[var(--ink)]">Resume optimization</strong> — not just formatting, but ATS keyword analysis and specific bullet rewrites</li>
              <li><strong className="text-[var(--ink)]">LinkedIn coaching</strong> — headline, About, and search visibility optimization</li>
              <li><strong className="text-[var(--ink)]">Interview preparation</strong> — realistic mock questions with evaluated answers</li>
              <li><strong className="text-[var(--ink)]">Session continuity</strong> — remembering your context across sessions, not starting from zero</li>
              <li><strong className="text-[var(--ink)]">Specific outputs</strong> — rewrites and scripts you can use directly, not vague suggestions</li>
            </ul>

            <h2 className="mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">The contenders</h2>

            <h3 className="text-[1.3rem] font-bold text-[var(--ink)]">1. Zari — Best overall AI career coach</h3>
            <p className="text-[15.5px] leading-8 text-[var(--muted)]">Zari is the only platform that covers all five dimensions of career coaching in a single product with session memory. Resume review delivers ATS scoring and line-by-line rewrites. LinkedIn optimization produces a rebuilt headline, About, and visibility score. Mock interviews use a 6-dimension STAR scoring framework. Career strategy produces a 30-day action plan. And all of it compounds — session 5 builds on sessions 1–4.</p>
            <p className="text-[15.5px] leading-8 text-[var(--muted)]">The standout feature is specificity. Zari doesn&apos;t say &quot;make this bullet more impactful.&quot; It writes the improved version. That&apos;s the difference between a tool and a coach.</p>
            <div className="my-4 rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-4">
              <p className="text-[13.5px] text-[var(--muted)]"><strong className="text-[var(--ink)]">Best for:</strong> Job seekers who want complete career support in one place. Career changers. Professionals preparing for promotions. Anyone who wants coaching that builds over time.</p>
              <p className="mt-2 text-[13px] text-[var(--brand)] font-semibold">Free to start · No credit card</p>
            </div>

            <h3 className="text-[1.3rem] font-bold text-[var(--ink)]">2. Kleo — Good for LinkedIn-only</h3>
            <p className="text-[15.5px] leading-8 text-[var(--muted)]">Kleo focuses primarily on LinkedIn optimization and content creation. It&apos;s well-regarded for its LinkedIn post generation but limited as a career coaching tool — no resume analysis, no interview prep, no session memory. Strong for one use case, weak for career coaching broadly.</p>

            <h3 className="text-[1.3rem] font-bold text-[var(--ink)]">3. Teal — Job tracking, not coaching</h3>
            <p className="text-[15.5px] leading-8 text-[var(--muted)]">Teal is a job search management tool — it helps you track applications and organize your job search. It has some resume features but is not an AI career coach. If you need a CRM for your job search, Teal is useful. If you need coaching, you need something else.</p>

            <h3 className="text-[1.3rem] font-bold text-[var(--ink)]">4. Resume.io / Enhancv — Resume builders</h3>
            <p className="text-[15.5px] leading-8 text-[var(--muted)]">These are resume formatting tools with some AI assistance for bullet generation. They produce well-formatted resumes but don&apos;t do ATS keyword analysis, don&apos;t score your bullets, and don&apos;t provide coaching. Good for formatting, not for coaching.</p>

            <h3 className="text-[1.3rem] font-bold text-[var(--ink)]">5. Generic AI (ChatGPT, Claude) — Powerful but contextless</h3>
            <p className="text-[15.5px] leading-8 text-[var(--muted)]">General-purpose AI tools can help with career coaching if you know how to prompt them well — but they have no session memory, no document context, no ATS knowledge, and no scoring frameworks. You&apos;re basically managing the coaching yourself. Zari is built on top of the same AI models, but purpose-built with the frameworks, memory, and structure that make coaching actually work.</p>

            <h2 className="mt-12 text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)]">The verdict</h2>
            <p className="text-[15.5px] leading-8 text-[var(--muted)]">If you want a tool that covers the full scope of career coaching — resume, LinkedIn, interviews, and strategy — with session memory and specific outputs you can actually use, Zari is the clear choice in 2025. It&apos;s also the only one with a meaningful free tier (one complete session per surface) that lets you experience the coaching before paying.</p>
            <p className="text-[15.5px] leading-8 text-[var(--muted)]">For narrow use cases — LinkedIn content creation (Kleo), job tracking (Teal), or resume formatting (Resume.io) — specialized tools can be useful complements. But if you&apos;re trying to land a job or get promoted, you need something that coaches across the full picture.</p>

            <div className="mt-12 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6 text-center">
              <p className="mb-2 text-[15px] font-bold text-[var(--ink)]">Try Zari free — no credit card</p>
              <p className="mb-5 text-[13.5px] text-[var(--muted)]">One complete session on every coaching surface. See what specific AI coaching feels like.</p>
              <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5">
                Start free coaching <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related articles */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.4rem] font-bold text-[var(--ink)]">Related guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { href: "/blog/how-to-write-resume-with-ai", title: "How to Write a Resume with AI (The Right Way)", tag: "Resume" },
              { href: "/blog/ats-resume-tips", title: "ATS Resume Tips: Beat the Filters", tag: "Resume" },
              { href: "/blog/how-to-optimize-linkedin-profile", title: "How to Optimize Your LinkedIn for Recruiter Search", tag: "LinkedIn" },
              { href: "/blog/how-to-prepare-for-job-interview", title: "How to Prepare for a Job Interview: Complete Guide", tag: "Interviews" },
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
