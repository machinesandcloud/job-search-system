import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Resume Skills Section 2025 — What to Include and How to Format It",
  description: "How to write a resume skills section that passes ATS filters and impresses recruiters. Covers which skills to include, how to format them, and what to leave out.",
  keywords: ["resume skills section", "what to put in skills section of resume", "how to list skills on resume", "resume skills examples", "skills for resume 2025", "technical skills resume", "soft skills resume", "ATS resume skills", "resume skills list", "skills section formatting"],
  alternates: { canonical: "/blog/resume-skills-section" },
  openGraph: { title: "Resume Skills Section 2025 — ATS-Optimised Skills That Get You Noticed", description: "Which skills to include, how to format them for ATS, and what not to write in your resume skills section.", url: "/blog/resume-skills-section" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const FAQS = [
  { question: "Should I include soft skills in my resume skills section?", answer: "Sparingly and specifically. 'Communication skills' is meaningless noise. 'Cross-functional team leadership (8 engineers, 2 PMs)' is specific. If you include soft skills, make them specific and supported by evidence in your experience section — don't just list them in isolation. ATS systems weight technical keywords far more heavily than soft skill keywords." },
  { question: "How many skills should I list on my resume?", answer: "8–15 skills in the skills section is the sweet spot. Fewer than 8 looks sparse; more than 20 looks like you're padding or guessing. Include the skills that match the job description most closely (ATS keyword match), your strongest and most recent technical skills, and any credentials or certifications relevant to the role." },
  { question: "Should I rate my skill proficiency on my resume?", answer: "No. Skill proficiency bars or ratings (5 stars, beginner/intermediate/expert) are consistently disliked by recruiters and ATS systems. They're subjective, unverifiable, and waste space. List skills without ratings. If you're concerned about overstating a skill, adjust your language: 'Python (proficient)' is fine; a 3-out-of-5 bar chart is not." },
  { question: "Do ATS systems scan the skills section?", answer: "Yes — but ATS systems also scan your entire resume. The skills section is not the only place keywords are evaluated. Having a skill only in the skills section (not supported anywhere in your experience section) is less powerful than having it appear multiple times throughout the resume in context. Add skills to your section AND weave the keywords into your experience bullets." },
];

const EXAMPLES = {
  SWE: { title: "Software Engineer", skills: ["Python", "Go", "TypeScript", "React", "AWS (EC2, S3, Lambda)", "PostgreSQL", "Redis", "Kubernetes", "gRPC", "Systems Design"] },
  PM: { title: "Product Manager", skills: ["Product roadmapping", "A/B testing", "SQL", "Figma", "JIRA", "User research", "OKR frameworks", "Mixpanel", "Stakeholder management", "Go-to-market strategy"] },
  Data: { title: "Data Analyst", skills: ["SQL", "Python (pandas, matplotlib)", "Tableau", "Looker", "dbt", "Google Analytics", "A/B testing", "Excel/Google Sheets", "Statistical modelling", "Business intelligence"] },
};

export default async function ResumeSkillsSectionPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Resume Skills Section 2025" description="How to write a resume skills section that passes ATS and impresses recruiters — what to include, how to format, what to avoid." url={`${BASE_URL}/blog/resume-skills-section`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Resume Skills Section", url: `${BASE_URL}/blog/resume-skills-section` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 60%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Resume Tips</span>
            <span className="text-[12px] text-white/35">10 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Resume Skills Section 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">What to include, how to format for ATS, and what kills your resume before a human ever reads it. Updated for 2025 ATS keyword patterns.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">The purpose of the skills section</h2>
          <p className="mb-8 text-[14px] leading-7 text-[var(--muted)]">The skills section serves one primary purpose: ATS keyword matching. Recruiters don&apos;t spend time reading skills lists — they scan them in 2 seconds. The real audience is the algorithm. Put every relevant keyword from the job description here that you can honestly claim, then make sure those same keywords also appear in your experience bullets.</p>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Format options — which one works best?</h2>
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {[
              { format: "Simple list (comma-separated)", verdict: "Best for ATS", desc: "Python, SQL, Tableau, Looker, dbt, A/B testing. Clean, scannable, maximises keyword density per line.", color: "#059669" },
              { format: "Categorised list", verdict: "Good for mixed skills", desc: "Technical: Python, SQL | Tools: JIRA, Figma | Methods: Agile, OKRs. Helps recruiters quickly identify categories.", color: "#0D7182" },
              { format: "Skill bars / ratings", verdict: "Avoid", desc: "4-out-of-5 bars waste space, add no information value, and are ignored by ATS. Skip entirely.", color: "#DC2626" },
            ].map(({ format, verdict, desc, color }) => (
              <div key={format} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 text-[12px] font-bold" style={{ color }}>{verdict}</div>
                <div className="mb-2 font-bold text-[14px]">{format}</div>
                <p className="text-[12px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Skills section examples by role</h2>
          <div className="mb-12 space-y-4">
            {Object.values(EXAMPLES).map(({ title, skills }) => (
              <div key={title} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[13px] font-bold">{title}</div>
                <div className="p-4 flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span key={s} className="rounded-full bg-[#0D7182]/10 px-3 py-1 text-[12px] font-semibold text-[#0D7182]">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-4 text-[1.7rem] font-extrabold tracking-[-0.02em]">What NOT to put in your skills section</h2>
          <div className="mb-10 grid gap-2 sm:grid-cols-2">
            {["Microsoft Office (implied)", "Communication skills", "Team player", "Hard worker", "Fast learner", "Detail-oriented", "Skills you learned more than 5 years ago (if irrelevant now)", "Anything you can't back up in an interview"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[#DC2626]/[0.03] px-3 py-2 text-[13px]">
                <span className="text-[#DC2626] font-bold">✗</span>
                <span className="text-[var(--muted)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Let Zari identify your keyword gaps.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari scans your resume against the job description and identifies the exact skills keywords you&apos;re missing — the ones that are causing your resume to score below 70% in ATS.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Score my resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
