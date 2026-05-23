import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs Otta — Modern Job Board vs AI Career Coach (2025)",
  description:
    "Otta curates tech job listings with salary transparency, company culture insights, and diversity data. Zari coaches you to win those roles — resume tailoring, interview prep, and salary negotiation. How to use both.",
  keywords: ["zari vs otta", "otta job board", "otta alternative", "otta review 2025", "best tech job boards 2025", "otta vs linkedin", "tech job search tools"],
  alternates: { canonical: "/compare/zari-vs-otta" },
  openGraph: {
    title: "Zari vs Otta — Modern Job Board vs AI Career Coach (2025)",
    description: "Otta finds the best tech roles. Zari helps you land them. Sequential, not competing.",
    url: "/compare/zari-vs-otta",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  {
    task: "Curated tech job discovery with salary transparency",
    otta: { verdict: "Otta wins", score: "win", detail: "Otta curates tech job listings with salary transparency, company diversity data, and culture insights — information that most job boards either omit or bury. Every listing shows the salary range, team size, tech stack, and company growth stage. Otta's curation filter reduces noise compared to LinkedIn or Indeed — you see fewer jobs but they're more relevant to tech career builders." },
    zari: { verdict: "Not applicable", score: "na", detail: "Zari doesn't list jobs. Use Otta to find the right roles, then bring those descriptions to Zari to optimize your application." },
  },
  {
    task: "Company culture and diversity insights",
    otta: { verdict: "Otta wins", score: "win", detail: "Otta publishes gender pay gap data, team diversity metrics, and culture signals from companies — information that helps you evaluate whether a company's stated values match their actual practices. This is genuinely differentiated data that helps candidates make better choices about where to apply." },
    zari: { verdict: "Complements Otta", score: "partial", detail: "Zari can help you prepare questions based on Otta's culture data — if a company shows poor diversity metrics, Zari can help you craft pointed questions for your interview to probe the reality." },
  },
  {
    task: "ATS resume tailoring per listing",
    otta: { verdict: "Otta doesn't help", score: "loss", detail: "Otta is a listing and discovery platform. Once you click apply, you're on your own." },
    zari: { verdict: "Zari wins", score: "win", detail: "Paste any Otta listing into Zari — it identifies the keywords, signals, and experience framing the company is looking for, then rewrites your resume bullets to match. The tailoring goes beyond keyword insertion to showing the impact behind the skills." },
  },
  {
    task: "Interview preparation",
    otta: { verdict: "Otta doesn't help", score: "loss", detail: "No interview preparation features. Otta's role ends at the application." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari preps you for each specific company from your Otta shortlist — behavioral questions tuned to the company's culture signals, technical prep at the right level, and company research so you can speak specifically about why this role." },
  },
  {
    task: "Salary negotiation using Otta's salary data",
    otta: { verdict: "Otta provides the data", score: "partial", detail: "Otta's salary transparency gives you a real anchor before negotiation — knowing the published band for a role you're negotiating is meaningful leverage. This is one of Otta's strongest features." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches the negotiation conversation using Otta's salary data as an anchor. Knowing the band and knowing how to negotiate within it are different skills. Zari covers the language, the timing, the pushback handling, and the full package strategy." },
  },
];

const FAQS = [
  { question: "Is Otta better than LinkedIn for tech job searching?", answer: "For tech roles specifically, Otta is often better — higher signal-to-noise, better salary transparency, and more honest company culture data. LinkedIn has far more volume and network-level features (connections, recruiter reach) that Otta can't match. Most active tech job searchers use both: Otta for curated discovery and culture research, LinkedIn for networking and recruiter relationships. Using only one leaves a meaningful part of the market uncovered." },
  { question: "Does Otta have all companies or just large ones?", answer: "Otta has strong coverage of high-growth tech companies, startups (Series A and above), and established tech companies — particularly in the UK, US, and Europe. Coverage of large enterprise companies (traditional industries, non-tech companies with tech roles) is thinner than LinkedIn. For candidates targeting high-growth tech companies, Otta's coverage is excellent. For candidates open to traditional industries, supplement with LinkedIn." },
  { question: "Should I use Otta and Zari together?", answer: "Yes — they're designed for different stages of the same process. Otta handles discovery (find the right roles with good culture and salary transparency). Zari handles conversion (win the application — tailored resume, interview prep specific to each company, and negotiation using Otta's salary data as your anchor). Neither alone covers the full job search." },
];

export default async function ZariVsOttaPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Otta", url: `${BASE_URL}/compare/zari-vs-otta` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Tech Job Search</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Otta</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Otta curates tech roles with salary transparency and culture data. Zari coaches your resume, interviews, and negotiation for those roles. Discovery first, then execution.
          </p>
          <div className="mt-8 flex justify-center">
            <WinScore zariWins={3} total={5} competitorName="Otta" />
          </div>
        </div>
      </section>

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
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.otta.score === "win" ? "text-emerald-600" : row.otta.score === "partial" ? "text-amber-500" : "text-red-500"}`}>Otta — {row.otta.verdict}</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.otta.detail}</p>
                  </div>
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[#4361EE]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>Zari — {row.zari.verdict}</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
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
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on Otta? Let Zari win it for you.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste the Otta listing into Zari — it tailors your resume to the role, preps you for the company&apos;s interview style, and coaches your negotiation using Otta&apos;s salary data as the anchor.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
