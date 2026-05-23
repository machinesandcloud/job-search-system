import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs TopResume — AI Career Coach vs Resume Writing Service (2025)",
  description:
    "TopResume pairs you with a professional resume writer who rewrites your resume for you. Zari coaches you through the entire job search — resume, interviews, and salary negotiation. Here's when each makes sense.",
  keywords: ["zari vs topresume", "topresume alternative", "topresume review 2025", "professional resume writing service", "AI resume coach vs resume writer", "best resume service 2025"],
  alternates: { canonical: "/compare/zari-vs-topresume" },
  openGraph: {
    title: "Zari vs TopResume — AI Career Coach vs Resume Writing Service (2025)",
    description: "TopResume uses human writers. Zari uses AI coaching. Different approaches — here's which one gets you further.",
    url: "/compare/zari-vs-topresume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  { task: "Resume rewriting quality", topresume: { verdict: "TopResume wins on polish", score: "win", detail: "TopResume's certified professional resume writers (CPRWs) produce highly polished, professionally formatted resumes. The human element adds judgment about what to emphasize, how to frame career transitions, and what hiring managers in specific industries respond to. For complex situations — career gaps, pivots, non-linear paths — a skilled human writer adapts in ways that AI still struggles with." }, zari: { verdict: "Zari wins on iteration speed", score: "partial", detail: "Zari produces ATS-optimized bullet rewrites immediately — no waiting for a writer's draft. You can iterate on 20 bullet versions in the time it takes TopResume to send your first draft. The tradeoff: Zari's output is stronger for ATS optimization but may lack the narrative polish of a skilled human writer for executive-level roles or unconventional career paths." } },
  { task: "ATS optimization and keyword targeting", topresume: { verdict: "Depends on the writer", score: "partial", detail: "TopResume writers vary in their ATS expertise. The quality of keyword optimization depends on which writer you're matched with and how current their ATS knowledge is. Some writers are excellent; others prioritize visual appeal over ATS-friendliness. You can't always verify which approach your specific writer uses." }, zari: { verdict: "Zari wins", score: "win", detail: "Zari's ATS optimization is systematic and consistent — every bullet is evaluated against the specific job description's keyword patterns. Role-specific keyword gaps are identified and filled. The optimization is based on current ATS behavior, not general best practices from years ago." } },
  { task: "Interview preparation", topresume: { verdict: "Not TopResume's scope", score: "loss", detail: "TopResume's service ends with the resume. They offer a separate interview coaching service, but it's not integrated with the resume work and requires an additional purchase. The resume rewrite and interview prep are disconnected." }, zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches behavioral interview prep, company-specific question patterns, STAR story development, and system design structure — all integrated with the resume work. Once Zari knows your target role and company, interview coaching is informed by the same context." } },
  { task: "Salary negotiation coaching", topresume: { verdict: "Not included", score: "loss", detail: "TopResume doesn't offer salary negotiation support. After you have the resume and land an interview, you're on your own for the negotiation conversation." }, zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches the full negotiation sequence — from how to respond to 'what are your salary expectations' on the first recruiter call to how to negotiate a specific offer with competing leverage. This is often the highest-ROI coaching in the entire job search." } },
  { task: "Turnaround time", topresume: { verdict: "3–5 business days", score: "partial", detail: "TopResume's standard turnaround is 3-5 business days for the first draft, with 1-2 rounds of revision. If you're in an active job search with applications due this week, the timeline is a real constraint." }, zari: { verdict: "Zari wins on speed", score: "win", detail: "Zari produces rewrites in minutes, not days. If you have a deadline-driven application, you can complete resume optimization in the same session as your application." } },
];

const FAQS = [
  { question: "Is TopResume worth the cost?", answer: "For specific situations, yes. TopResume is most valuable for: executive-level resumes where polish and narrative matter more than ATS optimization, career pivots that require nuanced framing that AI hasn't mastered, and candidates who simply want someone else to do the work. At $150-$350 for a standard resume rewrite, it's a meaningful investment. The ROI depends entirely on your writer — quality varies significantly across TopResume's writer pool, which is the service's biggest weakness." },
  { question: "Can Zari fully replace a professional resume writer?", answer: "For most candidates at mid-level and below, yes — especially for ATS-heavy applications at tech and corporate companies. For executive roles (VP, Director, C-suite), senior academic CVs, or complex career narratives (serial entrepreneurship, military transitions, unusual industry pivots), a skilled human writer still adds value that AI coaching doesn't fully replicate. The honest answer: most job seekers overestimate how much narrative polish matters relative to ATS optimization and interview performance." },
  { question: "What if I want both a polished resume AND interview coaching?", answer: "You can use both sequentially: TopResume for the resume rewrite, then Zari for interview prep and negotiation coaching. Or use Zari for all of it — the resume iteration, the interview prep, and the negotiation. If you have budget for one tool, Zari covers more of the job search. If you have budget for both and are targeting executive or senior roles, the combination is worth considering." },
];

export default async function ZariVsTopresumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Compare", url: `${BASE_URL}/compare` }, { name: "Zari vs TopResume", url: `${BASE_URL}/compare/zari-vs-topresume` }]} />
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Resume Services</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs TopResume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">TopResume uses certified professional writers to rewrite your resume. Zari coaches your entire job search with AI. Different approaches — here&apos;s which one gets you further.</p>
          <div className="mt-8 flex justify-center"><WinScore zariWins={4} total={5} competitorName="TopResume" /></div>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task comparison</h2>
          <div className="mt-6 space-y-5">
            {COMPARISON_TASKS.map((row) => (
              <div key={row.task} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5"><p className="font-bold text-[var(--ink)]">{row.task}</p></div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5"><p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.topresume.score === "win" ? "text-emerald-600" : row.topresume.score === "partial" ? "text-amber-500" : "text-red-500"}`}>TopResume — {row.topresume.verdict}</p><p className="text-[13px] leading-6 text-[var(--muted)]">{row.topresume.detail}</p></div>
                  <div className="p-5"><p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[#4361EE]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>Zari — {row.zari.verdict}</p><p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (<div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5"><p className="font-bold text-[var(--ink)]">{faq.question}</p><p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Need resume + interview + negotiation? Zari does all three.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for the specific role, coaches you through the interview process, and scripts your negotiation — everything TopResume doesn&apos;t cover after the resume is done.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
