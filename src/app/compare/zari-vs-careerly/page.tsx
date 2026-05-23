import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs Careerly — AI Job Search Tool Comparison (2025)",
  description:
    "Careerly is an AI job search platform with resume tailoring, job matching, and application automation. Zari is an AI career coach focused on deep resume optimization, interview coaching, and salary negotiation. Full comparison for 2025.",
  keywords: ["zari vs careerly", "careerly alternative", "careerly review 2025", "AI job search tools comparison", "best AI career coach 2025", "AI resume tool comparison", "job search automation vs career coaching"],
  alternates: { canonical: "/compare/zari-vs-careerly" },
  openGraph: {
    title: "Zari vs Careerly — AI Job Search Tool Comparison (2025)",
    description: "Careerly automates job search volume. Zari coaches the quality of each application. Full comparison.",
    url: "/compare/zari-vs-careerly",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  {
    task: "Job matching and discovery",
    careerly: { verdict: "Careerly helps", score: "partial", detail: "Careerly uses AI to match your profile to relevant job listings, surfacing roles across multiple job boards that fit your background. The matching reduces the time spent manually searching across LinkedIn, Indeed, and Glassdoor. The quality of matches varies by how well you've built your profile." },
    zari: { verdict: "Not applicable", score: "na", detail: "Zari doesn't match jobs or search boards. Use Careerly or a job board for discovery, then bring the relevant postings to Zari for deep optimization of each application." },
  },
  {
    task: "Automated job applications",
    careerly: { verdict: "Careerly has this feature", score: "partial", detail: "Careerly offers auto-apply functionality — it can submit applications on your behalf across multiple platforms. This increases raw application volume, which can be useful for entry-level or high-competition roles where getting in front of more companies faster has value. The trade-off is that automated applications are often easily identifiable as such and may receive lower consideration at selective companies." },
    zari: { verdict: "Intentionally not automated", score: "na", detail: "Zari is built around quality over volume. Rather than submitting 50 generic applications, Zari helps you submit 5-10 applications that are deeply tailored to each role — with rewritten bullets, targeted skills emphasis, and a cover letter that actually references the specific company. For roles you care about, quality significantly outperforms volume." },
  },
  {
    task: "ATS resume optimization",
    careerly: { verdict: "Careerly includes keyword matching", score: "partial", detail: "Careerly's resume optimizer scans for keyword matches between your resume and a job description, flagging gaps. This covers the basic ATS layer — ensuring the right terms appear in your document." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari goes beyond keyword gap analysis to bullet rewriting. The difference: 'Experienced in Agile methodologies' is a keyword insertion; 'Led 3-sprint Agile delivery for a $2M product initiative, cutting scope creep by 40%' passes ATS and differentiates in the human review. Zari coaches the latter, not just the former." },
  },
  {
    task: "Interview preparation",
    careerly: { verdict: "Careerly has basic prep", score: "partial", detail: "Careerly includes some interview preparation resources — common questions and general guidance. The coverage is broad but not role-specific or company-specific." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari provides role-specific, company-specific interview coaching. For a Staff Engineer interview at Stripe, Zari knows the Stripe interview format, prepares you for the systems questions at that level, and coaches behavioral answers for Stripe's specific culture signals. Generic interview prep and targeted interview prep are very different in their impact on offer rate." },
  },
  {
    task: "Salary negotiation coaching",
    careerly: { verdict: "Careerly doesn't cover this", score: "loss", detail: "Careerly's scope is the application phase — discovery, tailoring, and submission. What happens after an offer is outside its current product." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches the full negotiation: counter offer scripting, handling pushback, pushing on equity and signing bonus when base is constrained, and the language for each exchange. This is where the financial ROI of AI career coaching is highest — the difference between a negotiated and unnegotiated offer is often $15-40K." },
  },
  {
    task: "LinkedIn optimization",
    careerly: { verdict: "Careerly has some features", score: "partial", detail: "Careerly includes LinkedIn profile optimization suggestions as part of its career platform. The recommendations are generally keyword-focused." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari optimizes your LinkedIn headline, About section, and experience descriptions specifically for recruiter keyword searches and the narrative impression they create. LinkedIn optimization affects inbound recruiter volume — the difference between 2 and 15 recruiter messages per month for the same experience level." },
  },
  {
    task: "Application volume and speed",
    careerly: { verdict: "Careerly wins", score: "win", detail: "For high-volume job searching — applying to 30-50+ roles across multiple boards — Careerly's matching and auto-apply features save significant time. If your strategy is volume-first (entry-level roles, high-competition markets, tight timelines), Careerly provides genuine efficiency gains." },
    zari: { verdict: "Not the goal", score: "na", detail: "Zari is built for quality applications to roles that matter. If you're targeting 5-15 specific companies or role types, Zari's depth per application compounds: better resume, better interview performance, better negotiation outcome. Volume strategies and quality strategies are different approaches to the same goal." },
  },
];

const FAQS = [
  { question: "Does Careerly actually work?", answer: "Careerly's matching and keyword optimization features are useful, particularly for candidates who are new to ATS optimization or who want to efficiently scan for relevant roles across multiple boards. The auto-apply feature is most useful for high-volume applications to less selective roles — it's less effective for competitive or senior positions where personalization matters significantly. As with most AI job tools, the output quality depends heavily on the quality of your input: a well-written resume profile produces better matches and better tailoring." },
  { question: "Who should use Careerly vs Zari?", answer: "Careerly is better suited for: high-volume job seekers (applying to many companies quickly), entry-level and early career roles where volume and speed matter, and candidates who primarily need help with ATS keyword matching. Zari is better suited for: mid-to-senior professionals targeting specific companies, candidates preparing for competitive interview processes, anyone negotiating a significant offer, and job seekers where quality-per-application matters more than application volume." },
  { question: "Can I use both Careerly and Zari?", answer: "Yes — use Careerly for broad discovery and to build your initial application pipeline efficiently. Use Zari for the applications you're most excited about: deep tailoring for each role's specific requirements, interview preparation specific to each company, and negotiation coaching when offers come. The combination of volume-finding and quality-optimization works better than either alone for most job searches." },
];

export default async function ZariVsCareerlyPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Careerly", url: `${BASE_URL}/compare/zari-vs-careerly` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · AI Job Search</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Careerly</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Careerly automates job discovery and application volume. Zari coaches the quality of each application, interview, and negotiation. Volume vs depth.
          </p>
          <div className="mt-8 flex justify-center">
            <WinScore zariWins={4} total={7} competitorName="Careerly" />
          </div>
        </div>
      </section>

      {/* Summary verdict */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Careerly wins for</p>
              <ul className="space-y-1.5">
                {["High-volume job search with auto-apply", "Multi-board job matching and discovery", "Efficient pipeline building for entry-level roles"].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[var(--ink)]"><span className="text-emerald-500 font-bold">✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Zari wins for</p>
              <ul className="space-y-1.5">
                {["Deep resume bullet rewriting beyond keyword matching", "Company-specific and role-specific interview coaching", "Salary negotiation — the highest-ROI part of any search", "LinkedIn profile optimization for recruiter discovery"].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[var(--ink)]"><span className="text-[#4361EE] font-bold">✓</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Task-by-task */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task comparison</h2>
          <div className="mt-6 space-y-5">
            {COMPARISON_TASKS.map((row) => (
              <div key={row.task} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.careerly.score === "win" ? "text-emerald-600" : row.careerly.score === "partial" ? "text-amber-500" : "text-red-500"}`}>
                      Careerly — {row.careerly.verdict}
                    </p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.careerly.detail}</p>
                  </div>
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[#4361EE]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>
                      Zari — {row.zari.verdict}
                    </p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Ready to go deeper than keyword matching?</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari rewrites your resume bullets to show impact, coaches you for each company&apos;s interview style, and helps you negotiate the offer — the full quality stack that turns applications into offers.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
