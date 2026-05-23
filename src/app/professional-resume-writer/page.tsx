import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Professional Resume Writer 2025 — AI Resume Writing with ATS Optimization",
  description: "Professional resume writing with AI — ATS-optimized, tailored to each job description, and available instantly. Zari writes your resume and scores it against any job posting.",
  keywords: ["professional resume writer", "resume writer", "professional resume writing", "resume writer online", "hire a resume writer", "best professional resume writer", "resume writing professional", "certified resume writer", "resume writer near me", "professional cv writer"],
  alternates: { canonical: "/professional-resume-writer" },
  openGraph: { title: "Professional Resume Writer 2025 — AI Resume Writing with ATS Optimization", description: "AI-powered professional resume writing — ATS-optimized, job-specific, and delivered instantly.", url: "/professional-resume-writer" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "When should I hire a professional resume writer?", answer: "A professional resume writer adds the most value in these situations: (1) Career change — your current resume frames you in the wrong way for your target role, and you need someone to reframe your experience for a different audience. (2) Gap in employment or nonlinear career — a writer can help position the narrative around gaps or unusual career paths. (3) Senior or executive roles — where the resume is being read by humans before it reaches the ATS, and narrative quality matters more. (4) When you've been applying and getting no callbacks — this is the clearest signal that your resume isn't passing ATS filters or isn't compelling enough at first read. For most straightforward searches, AI resume tools provide better ATS optimization faster and cheaper than human writers." },
  { question: "What does a professional resume writer actually do?", answer: "A professional resume writer interviews you about your experience, extracts the most relevant and compelling information, and restructures it into a format optimized for your target roles. Good writers: reframe accomplishments in results-focused language ('Reduced customer churn by 18%' not 'Responsible for customer retention'), optimize keyword density for ATS systems, ensure formatting passes ATS parsing correctly (no tables, no text boxes, no headers/footers), and calibrate the narrative voice to your industry. The best human writers bring genuine industry expertise — they know what a healthcare recruiter vs a tech recruiter expects. The weakness: they write one generic document, not a job-specific optimized version for each application." },
  { question: "How long does it take to get a professionally written resume?", answer: "Traditional human resume writers: 3–7 business days for the initial draft, then 1–2 rounds of revisions over additional days. Express service costs more and is typically 24–48 hours. Zari's AI resume writer: instant. Upload your existing resume, paste the job description you're targeting, and receive an ATS-scored, keyword-optimized resume within seconds. No waiting, no scheduling a kickoff call, no back-and-forth over email. The advantage is also repeatability — you can generate a tailored version for each application in seconds rather than paying a human to rewrite it each time." },
  { question: "Do I need to provide information to the resume writer or do they work from my existing resume?", answer: "Most human resume writers start with your existing resume and a questionnaire or consultation call where they ask about your achievements, impact, and target role. The quality of the output depends heavily on the quality of the input you provide — if you can't articulate your accomplishments with metrics, the writer can't invent them for you. Zari works the same way: start with your existing resume, specify the target role or paste the job description, and the AI identifies keyword gaps and rewrites sections to optimize. The underlying achievements are yours; Zari optimizes how they're presented and ensures the right keywords are present for the specific role." },
];

export default async function ProfessionalResumeWriterPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Professional Resume Writer 2025 — AI Resume Writing with ATS Optimization"
        description="AI-powered professional resume writing — ATS-optimized, job-specific, and delivered instantly."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/professional-resume-writer`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Professional Resume Writer", url: `${BASE_URL}/professional-resume-writer` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Resume Writing · ATS Optimization · Instant
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Professional<br />
            <span className="text-white/50">Resume Writer</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI-powered professional resume writing — job-specific ATS optimization, keyword gap analysis, and instant delivery. No waiting, no scheduling, no per-document fees.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Instant · Free to start</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">How Zari&apos;s professional resume writing works</h2>
          <div className="space-y-4">
            {[
              { n: "1", title: "Upload your current resume", desc: "Upload your existing resume in any format. Zari parses your experience, skills, and accomplishments." },
              { n: "2", title: "Paste the job description", desc: "Paste the job description for the specific role you're targeting. Zari scores your resume against the exact ATS keywords the employer uses." },
              { n: "3", title: "See your ATS score and keyword gaps", desc: "Instantly see your score, the keywords you're missing, and the sections where you're losing points." },
              { n: "4", title: "Get your rewritten resume", desc: "Zari rewrites your resume to close keyword gaps, strengthen bullet points, and optimize for the specific role — while keeping your real experience and voice." },
              { n: "5", title: "Repeat for every application", desc: "Generate a tailored version for every role you apply to. One generic resume loses to a targeted one every time." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#059669]/10 flex items-center justify-center text-[14px] font-extrabold text-[#059669]">{n}</div>
                <div>
                  <h3 className="mb-1 font-bold text-[14px]">{title}</h3>
                  <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Human resume writer vs Zari</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[var(--muted)]">Traditional human writer</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["$200–$800 per resume", "3–7 business days turnaround", "One generic resume for all applications", "No real-time ATS data for specific job postings", "Revision rounds via email over days", "Depends on writer's industry knowledge"].map(p => <li key={p} className="flex gap-2"><span className="flex-shrink-0">—</span>{p}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#059669]/30 bg-white p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[#059669]">Zari AI resume writing</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["Free to start; no per-document fee", "Instant — delivered in seconds", "Job-specific version for every application", "Real-time ATS keyword scoring against exact JD", "Unlimited revisions, instant", "ATS data from millions of job postings"].map(p => <li key={p} className="flex gap-2"><span className="text-[#059669] flex-shrink-0">✓</span>{p}</li>)}
              </ul>
            </div>
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
          <h2 className="mb-4 text-[2rem] font-extrabold">Get your professionally written resume now.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI resume writing with real-time ATS optimization — free to start, instant delivery, job-specific for every application.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Write my resume free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
