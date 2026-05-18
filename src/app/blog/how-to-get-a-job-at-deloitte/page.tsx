import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get a Job at Deloitte — Interview Process & Tips (2025)",
  description:
    "Deloitte is the world's largest professional services firm. Their interview process emphasizes case studies, fit questions, and service-line-specific knowledge. Full breakdown of how to get a job at Deloitte across consulting, technology, and advisory.",
  keywords: ["how to get a job at deloitte", "deloitte interview process", "deloitte consulting interview", "deloitte hiring 2025", "deloitte culture", "deloitte interview tips", "deloitte career advice"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-deloitte" },
  openGraph: {
    title: "How to Get a Job at Deloitte — Interview Process & Tips (2025)",
    description: "Deloitte's case study interviews, service-line culture, and fit questions. Full process breakdown.",
    url: "/blog/how-to-get-a-job-at-deloitte",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const DELOITTE_DIFFERENTIATORS = [
  { signal: "Service-line specificity matters enormously", detail: "Deloitte is organized into distinct service lines — Consulting, Technology (DT), Advisory, Audit, Tax, and Risk. Each has a different culture, interview process, and what they look for. Consulting emphasizes case frameworks and client impact thinking. Technology focuses more on technical delivery and implementation. Advisory looks for analytical rigor and risk thinking. Applying 'to Deloitte' without understanding which practice area you're targeting is one of the most common mistakes — your preparation must be service-line specific." },
  { signal: "Case interviews for consulting, not technology", detail: "Deloitte Consulting uses structured case interviews — similar to McKinsey and BCG. You'll be expected to structure business problems, analyze data, and deliver recommendations. However, Deloitte Technology and Advisory roles typically don't use pure case interviews — they focus more on behavioral competency questions, technical scenarios, and client situation discussions. Know which practice area you're targeting before deciding whether to spend weeks on case prep." },
  { signal: "The LEAD model and values alignment", detail: "Deloitte's behavioral competency framework is LEAD: Leadership, Experience, Agility, and Differentiating (or similar). Their behavioral rounds are structured around this model, and interviewers score your answers explicitly against these dimensions. Candidates who tell generic stories get average scores. Candidates who frame their stories to explicitly show leadership decision-making, specific client or technical experience, and adaptability score significantly higher." },
  { signal: "Client-facing mindset and communication", detail: "Deloitte is a client services firm — the vast majority of roles involve working directly with clients or producing work product that reaches clients. Interviewers explicitly evaluate executive presence, communication clarity, and whether you can represent Deloitte in a client setting. How you present yourself in the interview is itself an audition for whether you can represent the firm professionally. Clarity, confidence, and the ability to synthesize complex information are weighted heavily." },
];

const INTERVIEW_STAGES = [
  { stage: "1. Application and recruiter screen", what_happens: "Resume screen followed by a recruiter call covering background, motivation, and which service line/practice area you're targeting. Deloitte also uses a HireVue video interview or Pymetrics game-based assessments for some roles.", how_to_prepare: "Be clear on which specific practice area you want (Consulting vs. Technology vs. Advisory) and why. Have a clear 'why Deloitte' and 'why this service line' narrative. For HireVue, practice answering behavioral questions on camera — the format is intimidating if you've never done it, and first attempts are rough." },
  { stage: "2. First-round interview", what_happens: "For Consulting: 1-2 case interviews. For Technology: 1-2 behavioral + technical competency discussions. For Advisory: 1-2 behavioral interviews with situational probing. Often done virtually.", how_to_prepare: "For Consulting: case prep using the MECE framework, market sizing, profitability trees, and clear recommendation structure. Deloitte cases are collaborative — they want to coach you through it, not stump you. For Technology: prepare 6-8 strong STAR stories using the LEAD framework. For all roles: prepare a concise 2-minute background narrative." },
  { stage: "3. Final-round or partner interview", what_happens: "For Consulting: one final case + a 'fit' interview with a partner or principal. For Technology/Advisory: 2-3 senior stakeholder interviews with more probing on specific experience and situational judgment.", how_to_prepare: "Partner-level fit conversations test cultural fit and long-term potential at the firm. Have a clear view on your career trajectory, what kind of client work you want to do, and what you'll bring to Deloitte that others won't. Don't be generic — specificity about the practice area and your intent within it is what differentiates." },
  { stage: "4. Offer and negotiation", what_happens: "Deloitte offers are structured by role, level, and service line. Consulting offers are highly competitive with Big 4 rivals (McKinsey, BCG, Bain pay more, but non-MBB Big 4 are comparable). Technology roles often have performance bonuses. Geographic location significantly affects base salary.", how_to_prepare: "Competing offers from other Big 4 or boutique consulting firms are the most effective leverage. Deloitte has limited salary band flexibility at consulting levels but more flexibility on signing bonus and start date. For technology roles, competing offers from tech companies (not just other consulting firms) are strong leverage if the tech salaries are higher." },
];

const FAQS = [
  { question: "Is it hard to get a job at Deloitte?", answer: "Competitive but not impossibly hard — Deloitte hires at massive scale compared to McKinsey or BCG. They accept roughly 3-5% of applicants across all service lines, but the acceptance rate varies significantly by practice area and entry point. Campus recruiting has different dynamics than experienced hire recruiting. The bar for Consulting is higher than for Technology or Audit. With genuine preparation, a strong GPA from a target school, and clear service-line focus, Deloitte is a realistic target for most candidates." },
  { question: "Do I need an MBA to get into Deloitte Consulting?", answer: "No — Deloitte hires at both the undergraduate and MBA level. Undergrads join as Business Analysts; MBA graduates join at Manager level. The undergraduate consulting track is highly competitive at target schools. There's also an experienced hire track for professionals with specialized industry expertise who enter at Specialist or Manager level without an MBA. The MBA path typically provides faster promotion velocity and more direct access to strategy work, but it's not required." },
  { question: "How is Deloitte different from McKinsey, BCG, or Bain?", answer: "Deloitte is broader, more implementation-focused, and less strategy-pure than MBB. McKinsey, BCG, and Bain are primarily strategy advisory — short engagements, C-suite clients, high conceptual work. Deloitte Consulting does strategy work but also handles large-scale transformations, technology implementations, and operational work. The upside: more diverse work, exposure to execution, and often longer client relationships. The downside relative to MBB: less brand premium, slightly lower compensation at top levels, and more operational execution alongside strategy." },
];

export default async function HowToGetAJobAtDeloittePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Get a Job at Deloitte — Interview Process & Tips (2025)" description="Deloitte's case study interviews, service-line culture, and fit questions. Full process breakdown." url={`${BASE_URL}/blog/how-to-get-a-job-at-deloitte`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job at Deloitte", url: `${BASE_URL}/blog/how-to-get-a-job-at-deloitte` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Consulting</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Get a Job at Deloitte</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">Case interviews, the LEAD competency model, and service-line specificity. Deloitte&apos;s hiring process differs across Consulting, Technology, and Advisory — here&apos;s the full breakdown.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={330000} suffix="+" label="Deloitte employees globally — world's largest professional services firm" accent="#86BC25" />
            <StatCard value={4} label="Distinct service lines with different interview processes and prep requirements" accent="#7C3AED" />
            <StatCard value={4} label="LEAD competency dimensions scored in every behavioral round" accent="#D97706" />
            <StatCard value={150} suffix="+" label="Countries where Deloitte operates — global career mobility" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Deloitte looks for beyond credentials</h2>
          <div className="mt-6 space-y-4">
            {DELOITTE_DIFFERENTIATORS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#86BC25]/10 text-[13px] font-bold text-[#86BC25]">{i + 1}</span>
                <div><p className="font-bold text-[var(--ink)]">{item.signal}</p><p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Deloitte&apos;s interview process — stage by stage</h2>
          <div className="mt-6 space-y-4">
            {INTERVIEW_STAGES.map((stage) => (
              <div key={stage.stage} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3"><p className="font-bold text-[var(--ink)]">{stage.stage}</p></div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">What happens</p><p className="text-[13px] leading-6 text-[var(--muted)]">{stage.what_happens}</p></div>
                  <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">How to prepare</p><p className="text-[13px] leading-6 text-[var(--muted)]">{stage.how_to_prepare}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (<div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5"><p className="font-bold text-[var(--ink)]">{faq.question}</p><p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for a Deloitte interview? Zari coaches the full process.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari preps you for Deloitte&apos;s LEAD behavioral framework, case interview structure (for consulting roles), and partner-level fit conversations — plus offer negotiation coaching for their structured comp bands.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
