import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Dice — Best for Tech Job Seekers? (2025)",
  description:
    "Dice is a tech-focused job board with recruiter access and tech salary data. Zari coaches you to win the roles you find there — ATS resume optimization, technical interview prep, and offer negotiation. Honest comparison.",
  keywords: ["zari vs dice", "dice job board", "dice.com alternatives", "tech job search tools 2025", "dice vs ai career coach", "dice.com review", "tech job search 2025"],
  alternates: { canonical: "/compare/zari-vs-dice" },
  openGraph: {
    title: "Zari vs Dice (2025) — Full Comparison for Tech Job Seekers",
    description: "Dice finds tech roles. Zari coaches you to land them. Where each wins for software engineers, data scientists, and IT professionals in 2025.",
    url: "/compare/zari-vs-dice",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Tech-specific job listing discovery",
    dice: { capable: true, detail: "Dice specializes in technology roles — software engineers, data scientists, IT professionals, DevOps, cybersecurity, and tech management. Its listing inventory is curated for tech, meaning less noise than Indeed or LinkedIn for tech-specific searches. Filters include tech-specific parameters like clearance level and contract type." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings of any kind. It's a coaching platform — find your target tech role on Dice or another board, then bring it to Zari to optimize your resume for that specific JD and prepare for the technical interview." },
    winner: "dice",
  },
  {
    task: "Recruiter visibility and contact",
    dice: { capable: true, detail: "Dice has a strong recruiter network, particularly for contract and W2 tech roles. Many tech staffing firms use Dice's database to source candidates. Uploading a complete profile — with specific tech skills, clearance, and availability — makes you searchable to these recruiters without applying to each role." },
    zari: { capable: false, detail: "Zari doesn't create a searchable profile for tech recruiters. Its value is coaching candidacy quality — improving the strength of your application once you've been found through Dice or another channel." },
    winner: "dice",
  },
  {
    task: "ATS resume optimization for tech roles",
    dice: { capable: false, detail: "Dice allows resume upload and profile creation but doesn't analyze your resume against specific job descriptions or provide ATS keyword optimization for tech roles. The platform connects you to opportunities but doesn't improve the quality of your application materials." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific tech job description — identifying missing technical skills and keywords (frameworks, languages, tools), rewriting weak bullets to reflect system-level impact, and validating ATS formatting. A Dice listing gets you the JD; Zari makes your application competitive against it." },
    winner: "zari",
  },
  {
    task: "Technical interview preparation",
    dice: { capable: false, detail: "Dice provides job listings and some career resources but no technical interview coaching. The platform doesn't offer system design prep, coding interview practice, behavioral interview coaching, or any role-specific interview preparation." },
    zari: { capable: true, detail: "Zari coaches technical interviews specifically — generating role-specific behavioral and situational questions from the JD, evaluating STAR-method answers, and coaching system design reasoning and communication patterns for engineering roles. For tech job seekers, interview quality is where most offers are won or lost." },
    winner: "zari",
  },
  {
    task: "Tech salary data",
    dice: { capable: true, detail: "Dice's tech salary predictor provides role-specific compensation data for tech positions — by title, location, and technology stack. This is particularly valuable for contract vs. W2 rate comparisons and stack-specific differentials (e.g., Rust vs. Python salary variance)." },
    zari: { capable: true, detail: "Zari incorporates market compensation data into negotiation coaching — not just what the tech market rate is, but how to use it strategically in a counter offer conversation, how to handle 'the band is fixed,' and how to negotiate equity components beyond base salary." },
    winner: "dice",
  },
  {
    task: "LinkedIn profile optimization",
    dice: { capable: false, detail: "No LinkedIn integration or optimization capability. Dice operates as a separate platform with its own profile system, and optimizing your Dice profile doesn't improve your LinkedIn visibility to tech recruiters who source on both platforms." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and technical skills for recruiter discoverability — important since most tech recruiters who use Dice also source independently on LinkedIn, and your LinkedIn profile appears in every Google search of your name." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    dice: { capable: false, detail: "Dice provides salary benchmarks but no negotiation coaching — no scripts, no pushback handling, no equity negotiation strategy, and no counter offer guidance. The platform ends at the application and offer stage." },
    zari: { capable: true, detail: "Zari coaches the full tech offer negotiation — base counter, equity negotiation (RSUs vs. options), signing bonus, and the specific pushbacks that tech companies use ('the band is set,' 'we already went to the top for you,' 'the equity will be worth a lot'). Where your compensation is actually determined." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const dice = TASK_COMPARISON.filter(r => r.winner === "dice").length;
  return { zari, dice, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is Dice still relevant for tech job seekers in 2025?", answer: "Dice remains a relevant channel for specific tech job seeker profiles — particularly those targeting contract/W2 roles, roles requiring security clearance, or IT/infrastructure positions. For software engineers targeting product companies (startups, FAANG, scale-ups), LinkedIn and direct company career pages typically yield better results than Dice. Dice's recruiter network is strongest for staffing firm placements rather than direct company hires, so it complements but doesn't replace other channels." },
  { question: "Does Dice work for both permanent and contract roles?", answer: "Yes — Dice covers both. Historically, its recruiter network has been especially strong for contract tech roles, and many tech staffing agencies use Dice as their primary sourcing database. For permanent (full-time) tech roles, Indeed and LinkedIn have significantly larger listing volumes. The practical approach: use Dice in combination with LinkedIn for maximum coverage, with role type filters to target the employment model you're pursuing." },
  { question: "How does Zari help after getting a Dice match or recruiter contact?", answer: "Most Dice-sourced opportunities start with a recruiter conversation, followed by a client application and interview. Zari helps at every post-discovery stage: analyzing your resume against the specific job description the recruiter sends, preparing you for the technical and behavioral interview rounds, and coaching you through the compensation negotiation once the offer comes. The recruiter gets you in the door; Zari helps you close the deal on your terms." },
];

export default async function ZariVsDicePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Dice", url: `${BASE_URL}/compare/zari-vs-dice` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Dice</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Dice is the tech-focused job board — listings, recruiter network, and salary data built for software engineers, IT professionals, and tech managers. Zari is the AI career coach that helps you win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.dice}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Dice wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "dice" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.dice.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Dice {row.dice.capable ? "✓" : "✗"}</p>
                      {row.winner === "dice" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.dice.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--brand)]">Wins</span>}
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a tech role on Dice? Let Zari help you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for the specific JD, coaches your technical interview, and helps you negotiate the full offer. Start free — no card required.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
