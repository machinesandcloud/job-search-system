import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What Is a Good ATS Score? 2025 Guide to ATS Resume Scoring",
  description: "What is a good ATS score for a resume? Learn how ATS scoring works, what score you need to get interviews, and how to improve your resume's ATS score for any job description.",
  keywords: ["what is a good ats score", "ats score", "ats resume score", "good ats score", "ats score meaning", "ats resume checker score", "how ats scoring works", "ats score 80", "resume ats score", "ats score out of 100"],
  alternates: { canonical: "/blog/what-is-a-good-ats-score" },
  openGraph: { title: "What Is a Good ATS Score? 2025 Guide to ATS Resume Scoring", description: "How ATS scoring works, what score you need to get interviews, and how to improve your resume's ATS match rate.", url: "/blog/what-is-a-good-ats-score" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is a good ATS score for a resume?", answer: "A good ATS score is typically 70% or higher on a well-calibrated ATS scoring tool. Scores above 80% indicate strong keyword alignment with the job description. Scores below 50% suggest your resume is missing many critical keywords and is likely being filtered out before a recruiter sees it. However, the score itself matters less than the specific keywords you're missing — a 65% score with all the required qualifications present may perform better than an 80% score that hits generic keywords but misses the specific technical requirements listed in the JD." },
  { question: "How does ATS scoring actually work?", answer: "ATS systems score resumes by: (1) Parsing your resume text into structured fields (name, email, education, experience, skills), (2) Extracting key terms from the job description, (3) Comparing the two — looking for keyword presence, frequency, and placement. Modern ATS (Greenhouse, Lever, Workday, iCIMS) use weighting systems that give more credit to keywords that appear multiple times, appear in experience sections (not just skills lists), and match required vs preferred qualifications. The score you see in tools like Zari is an approximation of this underlying process — it's designed to identify gaps, not to exactly replicate any specific ATS algorithm." },
  { question: "Can I have too high an ATS score?", answer: "Not in the traditional sense — a high score means your resume matches the job description closely, which is the goal. However, the mechanism of getting a high score matters. A resume that keyword-stuffs (inserting keywords randomly or unnaturally) may score high in a simple tool but will read poorly to the human recruiter who sees it after passing the ATS filter. The goal is high keyword density achieved through legitimate, naturally written experience bullets — every keyword should correspond to a real skill or experience you have." },
  { question: "What's the difference between ATS scoring tools?", answer: "ATS scoring tools vary significantly in quality. The main dimensions: (1) How they extract keywords from the job description — simple tools look for exact word matches; better tools understand context and weight keywords by importance (required vs preferred, frequency in JD). (2) Whether they understand synonyms and related terms — 'JavaScript' and 'JS' are the same thing; good tools know this. (3) Whether they evaluate keyword placement — appearing in experience bullets is more valuable than appearing only in a skills section. Zari's scoring is designed to approximate real ATS behavior, not just count keyword occurrences." },
];

export default async function WhatIsAGoodAtsScorePage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="What Is a Good ATS Score? 2025 Guide to ATS Resume Scoring"
        description="How ATS scoring works, what score you need to get interviews, and how to improve your resume's ATS match rate."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/what-is-a-good-ats-score`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "What Is a Good ATS Score", url: `${BASE_URL}/blog/what-is-a-good-ats-score` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 50%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            ATS Score · Resume Optimization · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            What Is a Good<br />
            <span className="text-white/50">ATS Score?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            How ATS scoring works, what score actually gets you interviews, and how to improve your resume&apos;s ATS match rate for any specific job description.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 6 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">ATS score ranges: what they mean</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Score range</span><span>What it means</span><span>What to do</span>
            </div>
            {[
              { range: "Below 50%", meaning: "Missing many critical keywords — likely filtered before recruiter review", action: "Full resume rewrite against the JD required" },
              { range: "50–65%", meaning: "Partial match — may pass some ATS filters but will underperform against qualified candidates", action: "Add missing required keywords; optimize experience bullets" },
              { range: "65–80%", meaning: "Competitive match — will typically advance through ATS filtering", action: "Add the top missing keywords; improve placement in experience sections" },
              { range: "80–90%", meaning: "Strong match — resume is well-aligned with this specific role", action: "Minor optimization; ensure keywords appear in experience, not just skills" },
              { range: "90%+", meaning: "Excellent match — resume is tightly optimized for this specific JD", action: "Verify optimization is natural, not stuffed; focus on interview prep" },
            ].map(({ range, meaning, action }) => (
              <div key={range} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{meaning}</span>
                <span className="text-[12px] font-semibold text-[#059669]">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">How to improve your ATS score</h2>
          <div className="space-y-4 text-[14px] leading-7 text-[var(--muted)]">
            <p><strong className="text-[var(--ink)]">1. Match exact keywords from the job description.</strong> Paste the job description into Zari&apos;s optimizer and see exactly which keywords you&apos;re missing. ATS systems often use exact matching — if the JD says &ldquo;project management&rdquo; and your resume says &ldquo;project coordination&rdquo;, that may not match. Use the exact phrasing from the JD.</p>
            <p><strong className="text-[var(--ink)]">2. Put keywords in your experience bullets, not just the skills section.</strong> Most ATS weight keywords in your experience section more than in a standalone skills list. &ldquo;Managed projects using Jira and Confluence&rdquo; in an experience bullet scores higher than just listing &ldquo;Jira, Confluence&rdquo; in skills.</p>
            <p><strong className="text-[var(--ink)]">3. Fix formatting issues first.</strong> Tables, text boxes, headers/footers, and unusual fonts can prevent ATS from parsing your resume correctly. If the ATS can&apos;t read your text, it can&apos;t score it. Use a clean, single-column format for maximum ATS compatibility.</p>
            <p><strong className="text-[var(--ink)]">4. Use both acronyms and spelled-out versions.</strong> Write &ldquo;Search Engine Optimization (SEO)&rdquo; the first time you use it, then use the acronym after. ATS systems may match only the exact form used in the JD.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Check your ATS score now.</h2>
          <p className="mb-8 text-[15px] text-white/55">Upload your resume and paste a job description — get your ATS score in seconds with a full keyword gap report. Free.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Score my resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
