import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Write a Personal Statement 2025 — Examples for CV, Jobs & University",
  description: "How to write a personal statement for a job application, CV, or university application in 2025. Step-by-step framework, real examples, and what to include (and avoid).",
  keywords: ["how to write a personal statement", "personal statement for job", "personal statement cv", "personal statement examples", "personal statement for university", "personal statement template", "what to write in a personal statement", "personal statement tips 2025", "cv personal statement", "personal statement examples for jobs"],
  alternates: { canonical: "/blog/how-to-write-a-personal-statement" },
  openGraph: { title: "How to Write a Personal Statement 2025 — CV, Job & University Examples", description: "Step-by-step framework for writing a personal statement with real examples for job applications and CVs.", url: "/blog/how-to-write-a-personal-statement" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is a personal statement on a CV?", answer: "A personal statement (also called a CV profile or professional summary) is a 3–5 sentence paragraph at the top of your CV that summarises who you are professionally, what you specialise in, and what you're looking for. It's the first thing a recruiter reads. A strong personal statement is specific to the type of role you're targeting, uses exact keywords from the job description, and leads with your most impressive credential or achievement. A weak one is generic: 'I am a motivated team player seeking a challenging opportunity.'" },
  { question: "How long should a personal statement be for a job application?", answer: "For a CV personal statement: 3–5 sentences, 50–100 words. Long enough to establish your specialisation and value proposition, short enough for a recruiter to read in 10 seconds. For a cover letter (which is different from a CV personal statement): 3–4 paragraphs, under 350 words. Never exceed one page for a cover letter. For university applications (UCAS): up to 4,000 characters (approximately 600 words). University personal statements have specific formatting requirements that differ significantly from job application personal statements." },
  { question: "What should I include in a personal statement?", answer: "A job application personal statement should include: (1) Your professional identity in 3–6 words ('Senior product manager with 8 years in B2B SaaS' or 'Data engineer specialising in real-time ML pipelines'), (2) One or two specific skills or specialisations most relevant to the role, (3) A brief statement of what you bring (impact-focused, not duty-focused), and (4) Optionally, what you're looking for in your next role. What to exclude: generic traits ('hardworking', 'passionate', 'team player'), anything unprovable, and information that belongs in the experience section." },
  { question: "Should my personal statement be in first or third person?", answer: "For a CV personal statement in the UK and Australia: traditionally third person was standard. In 2025, first person is increasingly accepted and often reads more naturally and authentically. For US resumes: first person without the pronoun is standard — 'Led a team of 12…' not 'I led…' For cover letters globally: first person. If in doubt, check examples from the specific industry you're targeting — some fields (law, academia) remain more traditional." },
];

const EXAMPLES = [
  {
    context: "Senior Software Engineer (UK CV)",
    weak: "I am a software engineer with over 8 years of experience in various technologies. I am hardworking and passionate about building great products and working in collaborative teams.",
    strong: "Senior software engineer with 8 years' experience building distributed backend systems at scale. Specialise in Go, Kubernetes, and event-driven architecture. At [Company], led the migration of core payment processing to a microservices architecture, reducing latency by 40%. Seeking a Staff or Principal role at a product-led company solving infrastructure or fintech problems at scale.",
  },
  {
    context: "Marketing Manager (Graduate / 3 years' experience)",
    weak: "Motivated and creative marketing professional seeking an exciting opportunity to grow my career in a dynamic company. Strong communication skills and a passion for digital marketing.",
    strong: "Performance marketing manager with 3 years' experience in paid social and SEO for DTC e-commerce brands. Managed £800K annual paid media budget, achieving 3.2× ROAS. Experienced with Meta Ads, Google Performance Max, and Klaviyo. Looking to move into a Head of Growth or Senior Marketing Manager role at a Series A–C brand.",
  },
  {
    context: "Career changer (Finance → Product Management)",
    weak: "Experienced finance professional looking to transition into product management. Eager to bring my analytical skills and business acumen to a new challenge in the tech industry.",
    strong: "Finance analyst (3 years, investment banking) transitioning into product management. Experience in financial modelling, stakeholder management across 12+ client engagements, and data-driven decision-making at scale. Recently completed the PM School certification. Targeting junior to mid PM roles in fintech or B2B SaaS where financial domain expertise is a differentiator.",
  },
];

export default async function HowToWriteAPersonalStatementPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-01-28";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Write a Personal Statement 2025 — Examples for CV, Jobs & University"
        description="Step-by-step framework for writing a personal statement with real examples for job applications and CVs."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/how-to-write-a-personal-statement`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Write a Personal Statement", url: `${BASE_URL}/blog/how-to-write-a-personal-statement` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 45%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Personal Statement · CV Profile · Examples
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How to Write a<br />
            <span className="text-white/50">Personal Statement</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            A four-part framework for writing a CV personal statement that gets read — with real before/after examples for experienced professionals, graduates, and career changers.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 7 min read · CV, job applications, and university</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">The four-part personal statement framework</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Part</span><span>What to write</span><span>Example</span>
            </div>
            {[
              { part: "1 — Professional identity", what: "Role + years of experience + specialisation", ex: "'Senior SWE with 8 years building distributed backend systems'" },
              { part: "2 — Top 2 skills / focus areas", what: "Specific technologies, methods, or domains", ex: "'Specialise in Go, Kubernetes, and event-driven architecture'" },
              { part: "3 — Proof / impact", what: "One specific achievement or result with a metric", ex: "'Led migration to microservices, reducing latency 40%'" },
              { part: "4 — What you want next", what: "Specific role level, company type, problem space", ex: "'Seeking Staff/Principal role at a product-led fintech or infra company'" },
            ].map(({ part, what, ex }) => (
              <div key={part} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{part}</span>
                <span className="text-[var(--muted)]">{what}</span>
                <span className="italic text-[12px] text-[var(--muted)]">{ex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Before vs. after: real personal statement examples</h2>
          <div className="space-y-6">
            {EXAMPLES.map(({ context, weak, strong }) => (
              <div key={context} className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3 text-[11px] font-bold uppercase text-[var(--muted)]">{context}</div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <div className="mb-2 text-[11px] font-bold uppercase text-[#EF4444]">Weak (generic)</div>
                    <p className="text-[13px] leading-6 text-[var(--muted)] italic">&ldquo;{weak}&rdquo;</p>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 text-[11px] font-bold uppercase text-[#059669]">Strong (specific)</div>
                    <p className="text-[13px] leading-6 text-[var(--ink)] font-medium">&ldquo;{strong}&rdquo;</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #D97706 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Write a personal statement that gets read.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari writes your CV personal statement and resume summary — specific to your background and the role you&apos;re targeting. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#D97706]">Write my personal statement free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
