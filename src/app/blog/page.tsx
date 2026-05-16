import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Career Advice Blog — AI Career Coaching Tips & Guides",
  description:
    "Expert career advice from Zari's AI coaching team. Resume writing, LinkedIn optimization, interview preparation, salary negotiation, and career change guides.",
  keywords: ["career advice", "career tips", "resume tips", "interview tips", "LinkedIn tips", "career coaching blog", "job search tips", "salary negotiation guide"],
  alternates: { canonical: "/blog" },
  openGraph: { title: "Zari Career Advice Blog", description: "AI-backed career guides on resume writing, LinkedIn, interviews, and salary negotiation.", url: "/blog" },
};

const POSTS = [
  {
    slug: "best-ai-career-coach",
    title: "Best AI Career Coach in 2025 — Honest Comparison",
    excerpt: "We tested every major AI career coaching tool. Here's how they compare on resume quality, interview prep, LinkedIn optimization, and actual job outcomes.",
    tag: "Comparison",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "how-to-write-resume-with-ai",
    title: "How to Write a Resume with AI (The Right Way)",
    excerpt: "AI resume tools range from useless generators to powerful ATS optimizers. Here's a step-by-step guide to using AI to write a resume that actually passes the filters.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "how-to-prepare-for-job-interview",
    title: "How to Prepare for a Job Interview: The Complete 2025 Guide",
    excerpt: "The research, the practice, the night before, and the morning of. A comprehensive guide to interview preparation that goes beyond just reviewing common questions.",
    tag: "Interviews",
    readTime: "12 min read",
    date: "April 2025",
    accent: "#EC4899",
  },
  {
    slug: "how-to-optimize-linkedin-profile",
    title: "How to Optimize Your LinkedIn Profile for Recruiter Search",
    excerpt: "LinkedIn's algorithm rewards specific patterns most profiles get completely wrong. Here's exactly how to optimize your headline, About, and experience for maximum visibility.",
    tag: "LinkedIn",
    readTime: "9 min read",
    date: "April 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "salary-negotiation-tips",
    title: "Salary Negotiation Tips: How to Get Paid What You're Worth",
    excerpt: "The research behind negotiation, the exact scripts to use, and how to handle the most common objections. A guide for first-timers and seasoned negotiators.",
    tag: "Negotiation",
    readTime: "11 min read",
    date: "April 2025",
    accent: "#10B981",
  },
  {
    slug: "career-change-guide",
    title: "How to Successfully Change Careers: A Step-by-Step Guide",
    excerpt: "Career changers fail for predictable reasons. This guide covers how to identify transferable skills, reframe your resume, and convince skeptical interviewers your switch makes sense.",
    tag: "Career Change",
    readTime: "13 min read",
    date: "March 2025",
    accent: "#F97316",
  },
  {
    slug: "promotion-strategy-guide",
    title: "How to Get Promoted: The Promotion Strategy That Actually Works",
    excerpt: "Promotion isn't about working harder — it's about working visibly, building sponsorship, and making the case at the right moment. Here's the framework that works.",
    tag: "Promotion",
    readTime: "10 min read",
    date: "March 2025",
    accent: "#EC4899",
  },
  {
    slug: "ats-resume-tips",
    title: "ATS Resume Tips: How to Beat Applicant Tracking Systems",
    excerpt: "87% of resumes never reach a human because of ATS filters. Here's exactly how ATS systems work and how to optimize your resume to pass them every time.",
    tag: "Resume",
    readTime: "8 min read",
    date: "March 2025",
    accent: "#0D7182",
  },
  {
    slug: "what-is-an-ats",
    title: "What Is an ATS? How Applicant Tracking Systems Work (2025)",
    excerpt: "ATS software auto-rejects 87% of resumes before a human sees them. Here's exactly how these systems work, why good candidates get filtered out, and what to do about it.",
    tag: "Job Search Basics",
    readTime: "8 min read",
    date: "January 2025",
    accent: "#7a8dff",
  },
  {
    slug: "linkedin-headline-examples",
    title: "50 LinkedIn Headline Examples That Get Recruiter Attention",
    excerpt: "The exact formula for a LinkedIn headline that gets you found — with 50 word-for-word examples for software engineers, PMs, marketers, sales, and career changers.",
    tag: "LinkedIn",
    readTime: "10 min read",
    date: "February 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "how-to-answer-tell-me-about-yourself",
    title: "How to Answer \"Tell Me About Yourself\" — Examples & Formula",
    excerpt: "The formula, 5 word-for-word examples by career stage, and the 4 mistakes that hurt your first impression in every job interview.",
    tag: "Interviews",
    readTime: "9 min read",
    date: "February 2025",
    accent: "#EC4899",
  },
  {
    slug: "resume-summary-examples",
    title: "Resume Summary Examples That Actually Work (2025)",
    excerpt: "40 resume summary examples across software engineering, product management, marketing, sales, and career changers — with the exact formula for writing yours.",
    tag: "Resume",
    readTime: "10 min read",
    date: "March 2025",
    accent: "#F97316",
  },
  {
    slug: "how-to-negotiate-job-offer",
    title: "How to Negotiate a Job Offer — Scripts, Tactics & What to Say",
    excerpt: "Word-for-word scripts for countering salary, negotiating equity, and handling the 4 most common pushbacks — without losing the offer.",
    tag: "Negotiation",
    readTime: "11 min read",
    date: "March 2025",
    accent: "#10B981",
  },
  {
    slug: "star-method-interview",
    title: "The STAR Method for Interviews — Examples & Formula (2025)",
    excerpt: "How to use the STAR method to answer behavioral interview questions — with 10 word-for-word examples for the most common questions.",
    tag: "Interviews",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#EC4899",
  },
  {
    slug: "behavioral-interview-questions",
    title: "30 Behavioral Interview Questions (With Strong Answers)",
    excerpt: "The 30 behavioral questions that appear in every interview, the STAR answers that impress, and the mistakes that eliminate candidates on the spot.",
    tag: "Interviews",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "how-to-write-a-cover-letter",
    title: "How to Write a Cover Letter That Gets Read (2025) — With Examples",
    excerpt: "The exact structure, 5 opening lines that work, a complete word-for-word example, and what to never write in a cover letter.",
    tag: "Cover Letters",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "common-interview-questions",
    title: "40 Most Common Interview Questions (With Strong Answers) — 2025",
    excerpt: "The 40 interview questions that appear in nearly every job interview — with strong, specific answers and the thinking behind each one.",
    tag: "Interviews",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "thank-you-email-after-interview",
    title: "Thank You Email After Interview — Examples & Templates (2025)",
    excerpt: "How to write a thank you email after an interview that actually helps your candidacy. Includes 3 word-for-word examples and what to never write.",
    tag: "Interviews",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "resume-format-guide",
    title: "Resume Format Guide: Which Format Is Best for You? (2025)",
    excerpt: "Chronological, functional, or hybrid? The complete guide to resume formats — which one to use based on your experience, career history, and target role.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "how-to-ask-for-a-raise",
    title: "How to Ask for a Raise — Scripts, Timing & What to Say (2025)",
    excerpt: "The exact timing, preparation steps, and word-for-word scripts for a raise conversation — plus how to handle the 4 most common objections.",
    tag: "Negotiation",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "linkedin-summary-examples",
    title: "20 LinkedIn Summary Examples That Actually Work (2025)",
    excerpt: "20 LinkedIn About section examples for software engineers, product managers, marketers, career changers, and more — with the formula behind each one.",
    tag: "LinkedIn",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "how-to-explain-gaps-in-employment",
    title: "How to Explain Gaps in Employment — Scripts & Examples (2025)",
    excerpt: "Word-for-word scripts for explaining employment gaps in interviews — for layoffs, health reasons, caregiving, and career pivots.",
    tag: "Job Search",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "job-search-tips",
    title: "25 Job Search Tips That Actually Work in 2025",
    excerpt: "25 specific, actionable job search strategies — covering ATS, LinkedIn, networking, referrals, and the mindset mistakes that slow you down.",
    tag: "Job Search",
    readTime: "13 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
];

export default async function BlogPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Advice · Guides · Tips</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">Career advice backed<br /><span className="gradient-text-animated">by AI coaching data.</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/50">Resume, LinkedIn, interviews, negotiation, and career strategy — guides built from what actually works across 10,000+ coaching sessions.</p>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
                <div className="flex-1 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${post.accent}14`, color: post.accent }}>
                      {post.tag}
                    </span>
                    <span className="text-[11px] text-[var(--muted)]">{post.readTime}</span>
                  </div>
                  <h2 className="mb-3 text-[15.5px] font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--brand)]">{post.title}</h2>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--border)] px-6 py-4">
                  <span className="text-[12px] text-[var(--muted)]">{post.date}</span>
                  <span className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: post.accent }}>
                    Read article <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Ready to put this into practice?</h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] text-white/55">One free session on every coaching surface. Start with your resume, LinkedIn, or an interview — no card required.</p>
          <div className="mt-8">
            <Link href="/signup" className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
