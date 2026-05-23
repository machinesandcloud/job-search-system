import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job at JPMorgan Chase — The Complete Guide (2025)",
  description: "How JPMorgan Chase actually hires: the application funnel, HireVue, superday, and what separates candidates who get offers. Finance, technology, and operations roles — what JP Morgan really looks for in 2025.",
  keywords: ["how to get a job at jpmorgan", "jpmorgan chase hiring process", "jpmorgan interview", "jpmorgan job application", "working at jpmorgan", "jpmorgan chase careers", "jpmorgan superday", "jpmorgan chase software engineer", "chase bank career", "jpmorgan intern"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-jpmorgan" },
  openGraph: {
    title: "How to Get a Job at JPMorgan Chase — The Complete Guide (2025)",
    description: "The full JPMorgan Chase hiring funnel — application to offer. Finance, technology, and operations roles across New York, Columbus, and global offices.",
    url: "/blog/how-to-get-a-job-at-jpmorgan",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const DIVISIONS = [
  { div: "Investment Banking (CIB)", comp: "$170,000–$300,000+ TC (analyst)", note: "M&A, capital markets, corporate advisory. Most competitive; campus recruiting at target schools." },
  { div: "Technology (JPMC Tech)", comp: "$130,000–$220,000 TC (SWE)", note: "Largest non-tech employer of software engineers. Hubs in Columbus, Plano, Jersey City, NYC." },
  { div: "Asset & Wealth Management", comp: "$120,000–$200,000 (associate)", note: "Private banking, fund management, financial planning." },
  { div: "Operations / Business", comp: "$65,000–$110,000 (analyst)", note: "Middle and back office; largest volume of hires; strong pathway to front office over time." },
  { div: "Risk / Compliance / Quant", comp: "$100,000–$200,000+", note: "Quantitative finance, model validation, credit risk. Strong math/stats background required." },
];

const FAQS = [
  { question: "How does JPMorgan's HireVue interview work?", answer: "JPMorgan uses HireVue pre-recorded video interviews for most entry-level and campus recruiting roles. You&apos;ll receive 3–5 prompts and have 30–60 seconds to respond to each. The questions are behavioral (STAR format): 'Tell me about a time you solved a difficult problem,' 'Describe a situation where you showed leadership.' Tips: (1) Practice recording yourself answering in structured 60-second formats before the actual interview. (2) Look at the camera — not the screen. (3) Dress professionally; clean background. (4) JPMorgan uses AI-assisted scoring plus human review — consistent eye contact, clear articulation, and complete STAR answers score well. The HireVue is pass/fail — passing moves you to a recruiter call or superday." },
  { question: "What is the JPMorgan superday like?", answer: "JPMorgan superdays vary by division but follow a standard structure: 4–8 back-to-back interviews in one day (typically 2–3 hours total). For investment banking: expect 2–3 behavioral rounds plus 1–2 technical rounds (DCF, LBO basics, M&A deal knowledge, market news). For technology: 2–3 coding interviews (data structures + algorithms, LeetCode medium difficulty) plus behavioral rounds. For asset management: portfolio discussion, market knowledge, and behavioral rounds. Tips: (1) Energy consistency — later rounds are just as important as earlier ones. (2) Research JPMorgan specifically — 'Why JPMorgan' is asked every round. Know their key businesses and recent headlines. (3) Prepare 3–4 strong behavioral stories and be ready to tell each one multiple times with fresh delivery." },
  { question: "What are JPMorgan's software engineer interviews like?", answer: "JPMorgan Chase is one of the largest employers of software engineers in the world (~50,000 engineers globally). The tech interview process: 1) Online assessment — LeetCode-style coding challenge (2 problems, 90 min). Medium difficulty data structures and algorithms. 2) Phone technical screen — one coding problem + light system design (45–60 min). 3) Onsite/virtual loop — 2–3 coding rounds + 1–2 system design rounds + 1 behavioral round. The tech stack matters less than problem-solving. JPMorgan uses Java heavily, but they care more about CS fundamentals. For senior/staff engineers: system design questions involve distributed systems, high-availability financial systems, and latency-sensitive architectures. The bar for JPMC tech is moderately high — above most banks but below Google or Nvidia." },
  { question: "Does JPMorgan hire from non-target schools?", answer: "Yes, more than Goldman Sachs or Morgan Stanley. JPMorgan's sheer scale (and their technology division in particular) means they recruit much more broadly. For the investment banking division: target school advantage is real, and the IB superday path from non-target is harder. For technology: JPMorgan actively recruits from non-target schools and values strong competitive programming records (ICPC, LeetCode, side projects) over school pedigree. Columbus, Plano, and Jersey City tech hubs hire from regional state schools regularly. For operations and analyst roles: completely accessible from any school with a relevant degree. Strategy: if you&apos;re at a non-target targeting IB, network aggressively through LinkedIn and JPMorgan-sponsored diversity programs (Code for Good, Women on the Move, Advancing Black Leaders)." },
];

export default async function HowToGetAJobAtJPMorganPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Get a Job at JPMorgan Chase — The Complete Guide (2025)"
        description="The full JPMorgan Chase hiring funnel — application to offer. Finance, technology, and operations roles across New York, Columbus, and global offices."
        datePublished={publishedDate}
        dateModified={publishedDate}
        url={`${BASE_URL}/blog/how-to-get-a-job-at-jpmorgan`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job at JPMorgan", url: `${BASE_URL}/blog/how-to-get-a-job-at-jpmorgan` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #003087 0%, #0B5394 50%, #003087 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Investment Banking · Finance · Technology · JPMorgan · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How to Get a Job<br />
            <span className="text-white/50">at JPMorgan Chase</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The complete JPMorgan hiring guide — IB, technology, and operations. The HireVue process, superday format, and what JP Morgan actually evaluates.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated 2025 · 9 min read · 300,000+ employees · Largest US bank</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-2 text-[1.9rem] font-extrabold tracking-[-0.02em]">JPMorgan divisions — what they pay and who they hire</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">JPMorgan Chase is the largest US bank by assets ($3.9T+). Five major hiring pipelines — the culture, bar, and path differ significantly.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Division</span><span>Compensation</span><span>Notes</span>
            </div>
            {DIVISIONS.map(({ div, comp, note }) => (
              <div key={div} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{div}</span>
                <span className="font-semibold text-[#003087]">{comp}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">The JPMorgan hiring process — step by step</h2>
          <div className="space-y-4">
            {[
              { step: "1. Apply online (jpmorgan.com/careers)", detail: "ATS filters by GPA, school, and keyword match. For IB: 3.5+ GPA strongly preferred. For tech: projects and competitive programming history matter more than GPA. Apply early — IB campus recruiting closes by October for the following summer." },
              { step: "2. HireVue video interview", detail: "Pre-recorded behavioral questions (3–5 prompts, 30–60 sec each). AI-assisted scoring + human review. Practice STAR format answers. Key: deliver complete answers with energy even for video-only format." },
              { step: "3. Recruiter phone screen (30 min)", detail: "Background, fit, and career goals. Know your 'Why JPMorgan' cold. Research the specific division. Have 3 behavioral stories ready. Confirm work authorization and location preferences." },
              { step: "4. Technical screen (45–90 min)", detail: "Varies by division. IB: financial concepts, deal discussion, market knowledge. Tech: LeetCode medium coding + light system design. Risk/Quant: math/stats problems, model conceptualization." },
              { step: "5. Superday (4–8 interviews)", detail: "Back-to-back with analysts, associates, VPs, sometimes MDs. Mix of behavioral and technical per role. Maintain energy and consistency throughout. Each interviewer will ask 'Why JPMorgan' — have it feel genuine each time." },
            ].map(({ step, detail }) => (
              <div key={step} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{step}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #003087 0%, #0B5394 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Prepare for JPMorgan with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI interview coaching for investment banking and finance technology roles — HireVue prep, superday behavioral coaching, and finance technicals.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#003087]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
