import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What to Put on a Resume in 2025 — Every Section Explained",
  description: "What to include on a resume in 2025 — every section explained with examples. Professional summary, experience bullets, skills, education, and what to leave off.",
  keywords: ["what to put on a resume", "what to include on a resume", "resume sections", "what goes on a resume", "resume what to include", "resume sections 2025", "what should be on a resume", "resume guide 2025", "how to write a resume", "resume tips 2025"],
  alternates: { canonical: "/blog/what-to-put-on-a-resume" },
  openGraph: { title: "What to Put on a Resume in 2025 — Every Section Explained", description: "Every resume section explained with examples — what to include, what to leave off, and how to write each section.", url: "/blog/what-to-put-on-a-resume" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are the essential sections of a resume?", answer: "Every resume needs: (1) Contact information — name, email, phone, LinkedIn URL, location (city/state, no full street address). (2) Professional summary — 3–5 sentences that establish your professional identity, top specializations, and what you're looking for. (3) Work experience — listed in reverse chronological order with company, title, dates, and achievement-focused bullets. (4) Skills — a curated list of technical and professional skills relevant to your target role. (5) Education — degree, institution, graduation year (GPA optional; include if 3.5+ and recent grad). Optional but valuable: certifications, publications, patents, notable projects, volunteer work (if professional-level). What to exclude: objective statements, photos (for US/UK), marital status, hobbies (unless directly relevant)." },
  { question: "How do you write good resume bullet points?", answer: "Strong resume bullets: (1) Start with a strong action verb — 'Led', 'Built', 'Grew', 'Reduced', 'Launched', 'Negotiated'. Avoid 'Responsible for', 'Assisted with', 'Helped'. (2) Describe what you did, not just your job duties — 'Built the checkout flow that reduced cart abandonment by 22%' beats 'Worked on e-commerce features'. (3) Quantify outcomes — not every bullet needs a metric, but aim for 50–70% of bullets to have a number. Revenue, percentages, team sizes, time reductions, cost savings. (4) Keep to one sentence — long bullets lose impact. If you have more to say, use a second bullet. (5) Write in past tense for past roles, present tense for current role." },
  { question: "What skills should I put on my resume?", answer: "Include only skills you can legitimately claim and would be comfortable being tested on. Organize into categories: Technical skills (programming languages, software, tools, platforms — be specific: 'Python (pandas, scikit-learn, FastAPI)' not just 'Python'), Domain expertise (industry-specific knowledge, methodologies like Agile/Scrum, regulatory knowledge), and Certifications (AWS Certified, PMP, CPA, etc. — include the credential name and year). Avoid: generic soft skills ('communication', 'teamwork', 'leadership') — these are assumed and waste space. Obsolete technologies that won't help you — listing FoxPro or Flash signals you haven't updated your skills. The skills section should mirror the keywords in the job descriptions you're targeting." },
  { question: "Should I include a professional summary on my resume?", answer: "Yes — for most professionals, especially those with 3+ years of experience. A strong professional summary (3–5 sentences) helps a recruiter immediately understand who you are and whether you're relevant before reading your full experience. It's particularly valuable for: career changers (to reframe your experience for the new direction), senior professionals (to lead with your leadership scope, not your oldest experience), and anyone whose title doesn't fully capture their experience level. For recent grads with limited experience, the summary matters less — the GPA, relevant coursework, and internships in the experience section do more work. Structure: [Professional identity] + [Top 2–3 specializations] + [Key accomplishment or impact] + [What you're seeking]." },
];

const SECTIONS = [
  { section: "Contact information", include: "Name, email, phone, LinkedIn URL, city/state", exclude: "Full address, photo (US/UK), marital status" },
  { section: "Professional summary", include: "3–5 sentences: identity, specialization, key achievement, what you want", exclude: "Objective statements, generic traits ('motivated', 'team player')" },
  { section: "Work experience", include: "Company, title, dates, 3–6 achievement bullets with metrics per role", exclude: "Duty-list descriptions, jobs older than 15 years (bullet detail)", note: "Most important section — spend most of your time here" },
  { section: "Skills", include: "Technical skills, tools, methodologies, certifications — specific versions", exclude: "Obvious skills (Word, email), soft skills, obsolete tech" },
  { section: "Education", include: "Degree, institution, year (GPA if 3.5+ and recent grad)", exclude: "High school once you have a college degree; GPA if low" },
  { section: "Certifications", include: "Professional certs with issuing org and year (AWS, PMP, CPA, etc.)", exclude: "Expired certifications or irrelevant ones" },
  { section: "Projects (optional)", include: "Significant independent or side projects with impact/outcome", exclude: "Tutorial projects or projects without demonstrable output" },
];

export default async function WhatToPutOnAResumePage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="What to Put on a Resume in 2025 — Every Section Explained"
        description="Every resume section explained with examples — what to include, what to leave off, and how to write each section."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/what-to-put-on-a-resume`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "What to Put on a Resume", url: `${BASE_URL}/blog/what-to-put-on-a-resume` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Resume Guide · Every Section · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            What to Put<br />
            <span className="text-white/50">on a Resume</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            Every resume section explained — what to include, how to write it, what to leave out, and what actually matters to recruiters and ATS systems in 2025.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 8 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Every resume section — include vs exclude</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">A concise guide to every section. The work experience section is where most of the value lives — invest most of your time there.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Section</span><span>Include</span><span>Exclude</span>
            </div>
            {SECTIONS.map(({ section, include, exclude }) => (
              <div key={section} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{section}</span>
                <span className="text-[#059669] text-[12px]">{include}</span>
                <span className="text-[var(--muted)] text-[12px]">{exclude}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Strong vs weak resume bullets</h2>
          <div className="space-y-4">
            {[
              { weak: "Responsible for managing social media accounts and creating content.", strong: "Grew LinkedIn following from 4,200 to 22,000 in 18 months through a data-driven content strategy; increased average post engagement rate from 1.2% to 4.8%." },
              { weak: "Worked with the sales team to improve processes and outcomes.", strong: "Redesigned the sales handoff process between SDRs and AEs, reducing average deal cycle from 67 days to 44 days and improving AE close rate from 18% to 26%." },
              { weak: "Helped develop and maintain software applications for clients.", strong: "Built a real-time fraud detection microservice (Python, Kafka) that reduced false positives by 34% while maintaining 99.97% uptime across 50M+ daily transactions." },
            ].map(({ weak, strong }, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <div className="mb-2 text-[11px] font-bold uppercase text-[#EF4444]">Weak</div>
                    <p className="text-[13px] leading-6 text-[var(--muted)] italic">&ldquo;{weak}&rdquo;</p>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 text-[11px] font-bold uppercase text-[#059669]">Strong</div>
                    <p className="text-[13px] leading-6 text-[var(--ink)]">&ldquo;{strong}&rdquo;</p>
                  </div>
                </div>
              </div>
            ))}
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Write a resume that gets read.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari scores your resume against any job description and rewrites weak sections — achievement-focused, ATS-optimized. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Write my resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
