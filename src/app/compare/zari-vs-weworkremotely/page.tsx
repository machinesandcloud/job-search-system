import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs We Work Remotely — Best for Remote Job Seekers? (2025)",
  description:
    "We Work Remotely is one of the largest fully-remote job boards — with thousands of active listings for remote engineers, designers, marketers, and other professionals globally. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps negotiate remote job offers.",
  keywords: ["zari vs we work remotely", "we work remotely review", "remote job board 2025", "weworkremotely alternatives", "best remote job sites 2025", "remote jobs 2025", "how to get a remote job"],
  alternates: { canonical: "/compare/zari-vs-weworkremotely" },
  openGraph: {
    title: "Zari vs We Work Remotely (2025) — Best for Remote Job Seekers?",
    description: "We Work Remotely lists thousands of fully-remote roles globally. Zari coaches you to land them — resume optimization for remote hiring, interview prep, and offer negotiation. Full comparison.",
    url: "/compare/zari-vs-weworkremotely",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Remote job listing discovery",
    weworkremotely: { capable: true, detail: "We Work Remotely is one of the largest dedicated remote job boards globally — with 3M+ monthly visitors and active listings across software engineering, product, design, marketing, customer support, sales, and management roles at fully-distributed or remote-first companies. Unlike general job boards that mix remote and in-office roles, every listing on WWR is remote — eliminating the filtering work and signaling that employers are genuinely committed to remote culture." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. For remote job seekers: use We Work Remotely alongside Remote.co, LinkedIn (with remote filter), and specific company careers pages at remote-first companies — then bring the job description to Zari to optimize your application for remote hiring norms." },
    winner: "weworkremotely",
  },
  {
    task: "Remote-first company exposure",
    weworkremotely: { capable: true, detail: "We Work Remotely is where remote-first companies publish roles — companies like Automattic (WordPress), GitLab, Basecamp, Buffer, and thousands of funded startups that have built remote-first cultures from the ground up. Employers on WWR aren't experimenting with remote work; they've committed to it. This is a meaningful signal for job seekers who want genuine remote culture rather than hybrid-with-a-remote-option." },
    zari: { capable: false, detail: "Zari doesn't match job seekers to specific company cultures. Zari helps you position your remote work credentials — async communication experience, distributed team management, and time zone flexibility — as advantages in your applications to the companies you find on WWR and other remote boards." },
    winner: "weworkremotely",
  },
  {
    task: "Resume optimization for remote hiring",
    weworkremotely: { capable: false, detail: "We Work Remotely allows profile creation but doesn't analyze your resume against specific job descriptions or optimize for the ATS keyword matching that remote-first companies use. Many WWR employers use Greenhouse, Lever, Ashby, or Notion-based hiring workflows that include ATS screening before human review." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific WWR job description — identifying gaps in remote-specific signals (async communication, distributed team experience, remote tool fluency), rewriting bullets to surface independent execution and quantified remote outcomes, and validating ATS formatting for the tools used by remote-first employers." },
    winner: "zari",
  },
  {
    task: "Interview preparation for remote roles",
    weworkremotely: { capable: false, detail: "We Work Remotely provides job listings but no interview coaching. Remote-first company interviews often assess remote-specific competencies — asynchronous communication preference, self-management, written communication quality, and how you'd contribute to a distributed team — alongside standard technical and behavioral rounds." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the WWR job description, including remote-specific questions ('How do you manage your productivity when working asynchronously?' 'Describe how you've built relationships with teammates you've never met in person'), and coaches your answers to demonstrate genuine remote effectiveness." },
    winner: "zari",
  },
  {
    task: "Salary data for remote roles",
    weworkremotely: { capable: false, detail: "We Work Remotely doesn't provide integrated salary benchmarking. Remote job compensation is particularly complex — salaries may be location-adjusted, global, or US-anchored depending on the company's pay philosophy. Understanding the market requires cross-referencing multiple sources." },
    zari: { capable: true, detail: "Zari incorporates remote job compensation context into negotiation coaching — including how to handle location-based pay adjustments (common at companies with geo-tiered pay), when to push back on location-based discounts, and how to negotiate total compensation for remote roles including home office stipends, internet reimbursement, and co-working allowances that are standard at remote-first companies." },
    winner: "zari",
  },
  {
    task: "LinkedIn profile optimization",
    weworkremotely: { capable: false, detail: "No LinkedIn integration or optimization. WWR and LinkedIn are parallel channels for remote job seekers — WWR for active listings at remote-first companies, LinkedIn for passive sourcing by remote-friendly and remote-first companies who search for candidates proactively." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience bullets for remote recruiter search visibility — ensuring your profile signals remote-readiness: async work experience, distributed team management, and the self-direction markers that remote hiring managers search for." },
    winner: "zari",
  },
  {
    task: "Salary negotiation for remote offers",
    weworkremotely: { capable: false, detail: "WWR facilitates the connection but no negotiation coaching. Remote offer negotiation has specific dynamics: location-adjusted pay conversations, negotiating against a geo-tier (companies that pay less for candidates outside expensive cities), home office and equipment stipends, and the total compensation components specific to distributed work." },
    zari: { capable: true, detail: "Zari coaches remote offer negotiation — including how to respond to location-based pay cuts, how to negotiate full-rate offers when a company leads with a location-adjusted number, and how to negotiate the benefits package components specific to remote roles: equipment budget, internet reimbursement, co-working stipend, and async-friendly work arrangements." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const weworkremotely = TASK_COMPARISON.filter(r => r.winner === "weworkremotely").length;
  return { zari, weworkremotely, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is We Work Remotely worth using for job searching?", answer: "Yes — We Work Remotely is one of the highest-quality dedicated remote job boards, particularly for tech, design, product, and marketing roles at remote-first companies. Its strength is the signal it provides about employer culture: companies posting on WWR have made a genuine commitment to remote work, which is different from a company offering a hybrid option. For high-volume remote job searching, use WWR alongside Remote.co, LinkedIn with a remote filter, and Himalayas.app for tech roles. The dedicated remote boards have less total listing volume than Indeed or LinkedIn but produce higher-quality matches for job seekers who specifically want remote-first environments." },
  { question: "How do you make your resume stand out for remote jobs?", answer: "Remote hiring managers scan for signals that you can execute effectively without in-person supervision: (1) Tag every remote role explicitly — '(Remote)' after job title or company name; (2) Surface async communication work in bullets — 'wrote technical documentation,' 'managed projects via Notion,' 'replaced weekly standups with async Loom updates'; (3) Quantify remote execution — not hours worked, but deliverables owned: 'owned end-to-end delivery of X while coordinating across 3 time zones'; (4) List remote tools explicitly in a skills section: Slack, Notion, Linear, Loom, Figma, GitHub — don't bury these in a long general list; (5) Mention timezone and availability in your contact header. A resume that doesn't distinguish remote work from in-person work signals someone who worked in their bedroom, not someone who has mastered distributed work." },
  { question: "How does location-based pay work for remote jobs?", answer: "Location-based pay (also called geo-tiered or location-adjusted compensation) is common at remote-first companies — it means your salary is adjusted based on where you live rather than where the company is headquartered. Companies like GitLab, Automattic, and many funded startups use location-based pay as a way to stay competitive in high-cost cities while not overpaying employees in lower-cost regions. How to approach this in negotiation: (1) Ask upfront whether the role has location-based pay before discussing numbers; (2) If you're in a lower-tier location but your skills are in high demand globally, make the case for a higher tier or global rate — especially if the role involves competing with candidates from higher-cost markets; (3) Location-based discounts are negotiable, particularly if you're relocating or frequently commuting to a higher-cost city; (4) Some companies use US-national rates regardless of location — these are generally preferable for candidates in major metro areas." },
];

export default async function ZariVsWeWorkRemotelyPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs We Work Remotely", url: `${BASE_URL}/compare/zari-vs-weworkremotely` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs We Work Remotely</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            We Work Remotely lists thousands of fully-remote roles at remote-first companies globally. Zari coaches you to win those conversations — optimizing your resume for remote hiring, coaching your interview, and helping negotiate the full remote package.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.weworkremotely}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">We Work Remotely wins</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-white/25">Across {SCORE_DATA.total} evaluated job search tasks</p>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-4">
            {TASK_COMPARISON.map((row) => (
              <div key={row.task} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-5 py-3.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className={`px-5 py-4 ${row.winner === "weworkremotely" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.weworkremotely.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">We Work Remotely {row.weworkremotely.capable ? "✓" : "✗"}</p>
                      {row.winner === "weworkremotely" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.weworkremotely.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4361EE]">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a remote role on We Work Remotely? Zari helps you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for remote hiring signals, coaches your interview for remote-specific competency questions, and helps you negotiate your remote package — base, stipends, and location-adjusted pay. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
