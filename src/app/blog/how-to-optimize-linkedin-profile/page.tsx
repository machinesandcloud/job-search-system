import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Optimize Your LinkedIn Profile for Recruiter Search (2025)",
  description:
    "A step-by-step guide to LinkedIn profile optimization that gets you found by recruiters. Headline, About, experience, and keywords — the exact changes that move your visibility score from 60 to 90+.",
  keywords: ["how to optimize LinkedIn profile", "LinkedIn profile optimization tips", "LinkedIn for job search", "LinkedIn SEO tips", "LinkedIn headline tips", "get found on LinkedIn", "LinkedIn recruiter search", "optimize LinkedIn 2025"],
  alternates: { canonical: "/blog/how-to-optimize-linkedin-profile" },
  openGraph: { title: "How to Optimize Your LinkedIn Profile for Recruiter Search", description: "Headline, About, keywords — the exact changes that move your visibility from 60 to 90+.", url: "/blog/how-to-optimize-linkedin-profile" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export default async function HowToOptimizeLinkedInPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Optimize Your LinkedIn Profile for Recruiter Search (2025)" description="Step-by-step guide. Headline, About, keywords — exact changes that move your visibility from 60 to 90+." url={`${BASE_URL}/blog/how-to-optimize-linkedin-profile`} datePublished="2025-04-01" />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Optimize LinkedIn Profile", url: `${BASE_URL}/blog/how-to-optimize-linkedin-profile` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 transition-colors hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-[#4ca7e6]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4ca7e6]">LinkedIn</span>
            <span className="text-[12px] text-white/35">9 min read · April 2025</span>
          </div>
          <h1 className="mb-5 text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[3rem]">How to Optimize Your LinkedIn Profile<br /><span className="text-white/50">for Recruiter Search</span></h1>
          <p className="text-[16px] leading-8 text-white/50">Most LinkedIn profiles score under 60 on recruiter visibility. Here&apos;s the exact framework to fix that.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8 text-[15.5px] leading-8 text-[var(--muted)]">
          <p>LinkedIn&apos;s search algorithm isn&apos;t mysterious — it follows specific patterns that most profiles get completely wrong. The difference between a profile that generates weekly recruiter messages and one that gets zero visibility is almost always the same 3–4 changes.</p>
          <p>This guide covers the specific optimizations that move the needle — in order of impact.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">1. The headline (highest impact change)</h2>
          <p>Your headline is the most important field on your LinkedIn profile for search visibility. LinkedIn&apos;s algorithm weights it heavily, and it&apos;s the first thing recruiters see in search results.</p>
          <p><strong className="text-[var(--ink)]">Most profiles:</strong> &quot;Software Engineer at Acme Corp&quot;</p>
          <p><strong className="text-[var(--ink)]">Optimized headline:</strong> &quot;Senior Software Engineer · Backend · Distributed Systems · Open to Opportunities&quot;</p>
          <p>The optimized version contains 4x more searchable keywords and explicitly signals job search intent — making it both more visible in search and more likely to result in a recruiter message.</p>
          <p><strong className="text-[var(--ink)]">Formula:</strong> [Seniority] + [Role] + [Specialty/Domain] + [Optional: open status]</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">2. The About section (second-highest impact)</h2>
          <p>The About section is where recruiters look after seeing your headline. It needs to accomplish two things: contain your most important keywords, and read as a compelling career narrative for human readers.</p>
          <p>The first 2–3 lines of your About section are visible in search results without expanding. Optimize these for keywords first, readability second.</p>
          <p><strong className="text-[var(--ink)]">What to include:</strong></p>
          <ul className="space-y-2">
            {["Your current role and specialty (with keywords)", "Your career highlights (with scope and scale)", "What you're looking for or what you're best at", "A call to action (connect, message, reach out)"].map(i => (
              <li key={i} className="flex gap-3 items-start"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#4ca7e6] flex-shrink-0" /><span>{i}</span></li>
            ))}
          </ul>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">3. Experience bullets — keyword-dense and specific</h2>
          <p>Your experience section gets scanned by LinkedIn&apos;s algorithm for keyword density. The same ATS optimization principles that apply to resumes apply here: specific action verbs, quantified impact, role-relevant keywords.</p>
          <p>Each role should have 4–6 bullets. Each bullet should: start with a strong action verb, include at least one keyword from your target job descriptions, and contain a measurable outcome.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">4. Skills section — curate, don&apos;t pad</h2>
          <p>LinkedIn allows up to 50 skills. Most people either under-use this (5–10 skills) or over-pad it (every buzzword they&apos;ve ever heard of). The right approach: prioritize the 15–20 skills that match your target role&apos;s most common requirements. These feed directly into LinkedIn&apos;s search algorithm.</p>

          <h2 className="text-[1.9rem] font-extrabold tracking-tight text-[var(--ink)] !mt-12">5. The &quot;Open to Work&quot; signal</h2>
          <p>If you&apos;re actively job searching, turn on &quot;Open to Work&quot; for recruiters only (not visible to your network). This makes your profile significantly more likely to appear in recruiter searches. LinkedIn buries it in settings, but it&apos;s one of the highest-impact changes you can make.</p>

          <div className="mt-10 rounded-2xl border border-[#4ca7e6]/20 bg-[#4ca7e6]/[0.04] p-6 text-center">
            <p className="mb-2 text-[15px] font-bold text-[var(--ink)]">Let AI optimize your LinkedIn profile</p>
            <p className="mb-5 text-[13.5px] text-[var(--muted)]">Zari rewrites your headline, About, and bullets for recruiter visibility. Visibility score before and after. Free first session.</p>
            <Link href="/ai-linkedin-optimizer" className="inline-flex h-11 items-center gap-2 rounded-xl px-7 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5" style={{ background: "#4ca7e6" }}>
              Optimize my LinkedIn <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
