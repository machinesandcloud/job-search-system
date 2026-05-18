import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Remote.co — Which Tool Wins for Remote Job Seekers? (2025)",
  description:
    "Remote.co curates remote-only job listings. Zari coaches your resume, interviews, and salary negotiation for those roles. Here's which one you need — and when to use both.",
  keywords: ["zari vs remote.co", "remote.co alternative", "remote job search tools", "remote work job board", "AI career coach for remote jobs", "fully remote job search"],
  alternates: { canonical: "/compare/zari-vs-remote-co" },
  openGraph: {
    title: "Zari vs Remote.co — Which Tool Wins for Remote Job Seekers? (2025)",
    description: "Remote.co finds remote-only listings. Zari wins the application. See which tasks each tool handles — and when you need both.",
    url: "/compare/zari-vs-remote-co",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  {
    task: "Finding fully-remote job listings",
    remoteCo: { verdict: "Remote.co wins", score: "win", detail: "Remote.co curates listings exclusively from companies with verified fully-remote cultures — not just jobs labeled 'remote-friendly.' Every listing is screened to confirm remote isn't a temporary pandemic policy. Categories cover customer service, design, engineering, marketing, sales, writing, and more. The curation removes the noise that plagues large boards where 'remote' means 'remote with 3 in-office days.'" },
    zari: { verdict: "Not applicable", score: "na", detail: "Zari doesn't host job listings. Use Remote.co (or We Work Remotely, FlexJobs, or Himalayas) to find remote roles, then bring those postings to Zari to optimize your application." },
  },
  {
    task: "ATS-optimized resume for remote roles",
    remoteCo: { verdict: "Remote.co doesn't help", score: "loss", detail: "Remote.co is a discovery platform. Once you find a listing, you're on your own for the application. There's no resume feedback, no keyword analysis, and no guidance on how to frame your remote work experience to stand out." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari parses each job description and identifies the remote-specific signals hiring managers look for: async communication, autonomous execution, written documentation habits, and time-zone overlap. Remote roles often require demonstrating remote competency explicitly — Zari surfaces the right language and restructures your bullets to show it." },
  },
  {
    task: "Positioning remote work experience on your resume",
    remoteCo: { verdict: "Remote.co doesn't help", score: "loss", detail: "The platform has no resume coaching capability. It doesn't help you frame distributed team contributions, async communication examples, or remote leadership context that remote-first hiring managers specifically evaluate." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari coaches you on the specific framing remote companies use when evaluating candidates: explicit async communication examples, self-direction evidence, documentation habits, and cross-timezone collaboration. Companies like GitLab, Automattic, and Basecamp screen for remote fluency before technical skills — Zari helps you demonstrate it." },
  },
  {
    task: "Interview preparation for async-first companies",
    remoteCo: { verdict: "Remote.co doesn't help", score: "loss", detail: "Remote.co has a blog with remote work career advice, but no interactive interview coaching. There's no question bank, no mock interview capability, and no feedback loop for preparing answers." },
    zari: { verdict: "Zari wins", score: "win", detail: "Remote interviews at async-first companies (GitLab, Automattic, Zapier, Doist) probe different things than office-first companies. Zari prepares you for: 'How do you communicate blockers in a distributed team?', 'Walk me through how you document your work', 'How do you handle overlap with teammates in different time zones?' These questions require specific, concrete examples — Zari helps you build them from your actual experience." },
  },
  {
    task: "Company research and remote culture fit",
    remoteCo: { verdict: "Remote.co has good context", score: "partial", detail: "Remote.co publishes company culture information, employee reviews, and Q&As specifically about remote work practices — helping you assess whether a company's remote culture is genuine (synchronous Zoom-heavy) or truly async. This context is valuable before applying." },
    zari: { verdict: "Complements Remote.co", score: "partial", detail: "Zari analyzes the job description for signals of remote culture maturity (do they mention async tools, documentation expectations, written communication standards?) and helps you tailor your questions to probe the things Remote.co's reviews flag. Use both together for due diligence." },
  },
  {
    task: "Salary negotiation for remote roles",
    remoteCo: { verdict: "Remote.co doesn't help", score: "loss", detail: "There's no negotiation coaching on the platform. Remote.co's salary data comes from its job listings, which often omit ranges or show bands without location context — a critical gap given how geographic pay adjustments vary dramatically across remote companies." },
    zari: { verdict: "Zari wins", score: "win", detail: "Remote salary negotiation has its own complexity: location-adjusted pay (some companies pay SF rates everywhere, others apply local COL adjustments), equity structures, async-productivity bonuses, and home-office stipends. Zari coaches your negotiation with the actual offer numbers — counter framing, what to push back on, and how to handle 'we pay local rates' policies that reduce your total compensation." },
  },
  {
    task: "LinkedIn profile optimization for remote visibility",
    remoteCo: { verdict: "Remote.co doesn't help", score: "loss", detail: "No LinkedIn coaching. The platform doesn't help you signal remote-readiness in your LinkedIn headline, About section, or skill endorsements — all of which remote-first recruiters scan before reaching out." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari optimizes your LinkedIn profile with remote-specific signals: 'Open to remote opportunities' setting, async-fluent language in your About section, and skill signals like project management tools (Notion, Linear, Basecamp) that indicate remote competency. Remote recruiters filter by these signals before looking at anything else." },
  },
];

const FAQS = [
  { question: "Is Remote.co worth paying for compared to free remote job boards?", answer: "Remote.co is free for job seekers — the subscription model applies to employers. The value proposition for candidates is curation quality: every listing is verified as genuinely remote, not just remote-adjacent. Compared to Indeed or LinkedIn where 'remote' results include hybrid and on-site roles mislabeled as remote, Remote.co's signal-to-noise ratio is much higher. For purely remote job searches, it's one of the best free resources alongside We Work Remotely and Himalayas." },
  { question: "How do remote companies evaluate candidates differently than office-first companies?", answer: "Remote-first companies, especially async-first ones (GitLab, Automattic, Zapier), screen heavily for written communication, self-direction, and the ability to operate without real-time feedback. Interview stages often include a written take-home component or asynchronous video responses specifically to assess how you communicate without the social scaffolding of an in-person meeting. They want evidence that you can document your reasoning, raise blockers clearly, and maintain high productivity without a manager physically present. This is fundamentally different from what office-first companies optimize for." },
  { question: "Should I use both Remote.co and Zari for my remote job search?", answer: "Yes — they're complementary tools that cover opposite ends of the process. Remote.co is where you discover remote-verified opportunities and research company cultures. Zari is where you win the ones you want: resume tailored to each description, interview prep for async-first questions, and negotiation coaching for remote compensation packages. Using Remote.co without Zari means finding good listings but competing on a level playing field. Using Zari without Remote.co means being optimized for applications but sourcing from noisier boards. Together, they cover discovery and conversion." },
];

export default async function ZariVsRemoteCoPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Remote.co", url: `${BASE_URL}/compare/zari-vs-remote-co` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Remote Job Search</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Remote.co</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Remote.co curates verified fully-remote job listings. Zari coaches your resume, interviews, and negotiation for those roles. They cover opposite ends of the process.
          </p>
        </div>
      </section>

      {/* Summary verdict */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Remote.co wins for</p>
              <ul className="space-y-1.5">
                {["Verified fully-remote job listings", "Remote company culture research", "High-signal discovery (no hybrid noise)"].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[var(--ink)]"><span className="text-emerald-500 font-bold">✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Zari wins for</p>
              <ul className="space-y-1.5">
                {["ATS resume optimization per listing", "Async-first interview preparation", "Remote salary & equity negotiation", "LinkedIn remote-readiness signals"].map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-[var(--ink)]"><span className="text-[var(--brand)] font-bold">✓</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Task-by-task comparison */}
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
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.remoteCo.score === "win" ? "text-emerald-600" : row.remoteCo.score === "partial" ? "text-amber-500" : "text-red-500"}`}>
                      Remote.co — {row.remoteCo.verdict}
                    </p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.remoteCo.detail}</p>
                  </div>
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[var(--brand)]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a remote role on Remote.co? Let Zari win it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste the job description and Zari tailors your resume, preps you for async-first interview questions, and coaches your negotiation — including location-adjusted pay and remote stipends.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
