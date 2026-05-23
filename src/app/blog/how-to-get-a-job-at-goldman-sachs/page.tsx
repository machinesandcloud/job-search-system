import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job at Goldman Sachs — The Complete Guide (2025)",
  description: "How Goldman Sachs actually hires: the application funnel, HireVue video screen, superday interviews, and what separates candidates who get offers. Finance technical prep, networking strategy, and what GS really looks for.",
  keywords: ["how to get a job at goldman sachs", "goldman sachs hiring process", "goldman sachs interview", "goldman sachs application", "goldman sachs superday", "working at goldman sachs", "goldman sachs internship", "investment banking interview"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-goldman-sachs" },
  openGraph: {
    title: "How to Get a Job at Goldman Sachs — The Complete Guide (2025)",
    description: "The full Goldman Sachs hiring funnel — application to offer. What separates candidates who get in from those who don't.",
    url: "/blog/how-to-get-a-job-at-goldman-sachs",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const PATHS = [
  {
    path: "Campus recruiting (undergrad and MBA)",
    accent: "#7C3AED",
    likelihood: "Highest probability for entry-level roles",
    how: "Goldman runs structured campus recruiting programs at a defined set of target schools — mostly Ivy League, MIT, Stanford, Chicago Booth, Wharton, and a handful of others. Summer analyst and summer associate internships are the primary pipeline. The on-campus recruiting calendar is strict — OCR (On-Campus Recruiting) interviews happen in October for most divisions.",
    preparation: "If you're at a non-target school, the path is harder but not impossible. Network directly with GS employees through LinkedIn and alumni networks, apply directly via the careers portal, and focus on preparation over luck. GS also runs 'Possibilities Summit' diversity programs that can lead to offers.",
  },
  {
    path: "Direct application (gs.com/careers)",
    accent: "#059669",
    likelihood: "Low but real — especially for experienced hire roles",
    how: "Goldman's ATS filters heavily on GPA (3.5+ strongly preferred for entry-level), school pedigree, and keywords matching the division. For experienced hires (Associate+ from industry or other banks), direct applications work at higher rates because the filter is experience-based not school-based.",
    preparation: "Your resume must be formatted in the Goldman Sachs style: clean, single-page (for junior roles), quantified bullets, reverse chronological. Goldman recruiters read resumes for 6 seconds before deciding to proceed. Every bullet needs a number.",
  },
  {
    path: "Network referral from a Goldman employee",
    accent: "#D97706",
    likelihood: "2–4× higher chance of getting a screen",
    how: "An internal referral from a Goldman employee moves your resume to the top of the recruiter queue. Goldman has 45,000+ employees worldwide — find ones who went to your school or share your background via LinkedIn. Ask for a 20-minute informational, not a referral upfront. After the call, most employees will offer to refer you if you're a serious candidate.",
    preparation: "Before any networking call, do your homework: know the division, know recent GS news, have your 60-second pitch ready. Goldman employees are smart and busy — they'll remember if you wasted their time.",
  },
];

const STAGES = [
  {
    stage: "Online application & resume screen",
    accent: "#0D7182",
    what: "GPA, school, experience, and resume formatting are screened. Goldman explicitly prefers GPA 3.5+ for entry-level roles. ATS keyword matching matters for experienced hire roles.",
    howToPass: "Quantify everything on your resume. Goldman readers want: what did you do, how much did it impact, over what timeframe. 'Led team' is rejected; 'Led 6-person team that reduced processing time by 23% over 3 months' passes.",
    dontDo: "Use a non-standard resume format. Have unexplained GPA or employment gaps without context. Apply to multiple divisions simultaneously without tailoring.",
  },
  {
    stage: "HireVue video interview",
    accent: "#7C3AED",
    what: "Pre-recorded video screen with behavioral questions — you record answers to prompts with limited prep time. Typically 3–5 questions, 30–60 seconds each. Goldman uses AI-assisted scoring plus human review.",
    howToPass: "Practice the STAR format (Situation, Task, Action, Result) until it feels natural. The video environment is disorienting — practice recording yourself in advance. Dress professionally, plain background, good lighting. Give complete answers even for simple questions.",
    dontDo: "Read from notes — AI flags eye movement inconsistency. Give vague answers. Ramble past the time limit. Use the full prep time to stall.",
  },
  {
    stage: "First-round interview (phone or video)",
    accent: "#059669",
    what: "A Goldman analyst or associate conducts a 30–45 minute interview. Mix of behavioral and technical questions depending on division. IBD: finance technicals + fit. Engineering: coding or system design. Risk: quantitative reasoning.",
    howToPass: "Walk in with three strong behavioral stories using STAR format. For IBD roles, be ready to explain DCF, LBO mechanics, comparable company analysis, and recent M&A deals. For engineering: practice LeetCode medium problems.",
    dontDo: "Say 'I don't know' without attempting to reason through it. Give wishy-washy answers to fit questions. Not have a clear 'Why Goldman' answer that isn't just prestige.",
  },
  {
    stage: "Superday",
    accent: "#D97706",
    what: "The final round. Typically 4–8 back-to-back interviews in one day with analysts, associates, VPs, and sometimes MDs. Mix of behavioral, technical, and situational questions. The day is exhausting by design.",
    howToPass: "Prepare to tell the same stories 8 times with fresh energy. Every interviewer asks 'Why Goldman' — have a version that feels genuine each time. For IBD: expect technical deep-dives. For engineering: multiple coding rounds. Energy and consistency matter as much as answers.",
    dontDo: "Show fatigue or declining energy in later rounds. Give different answers to the same question across interviewers. Forget to ask thoughtful questions at the end of each round.",
  },
];

const FAQS = [
  { question: "What GPA do you need to get a job at Goldman Sachs?", answer: "Goldman Sachs strongly prefers a 3.5+ GPA for entry-level analyst roles from campus recruiting. For target schools, the de facto minimum is closer to 3.7 for the most competitive divisions (IBD, S&T). For non-target schools, a higher GPA matters even more because it compensates for pedigree. For experienced hires (lateral analysts, associates), GPA matters much less — work experience and references carry more weight. If your GPA is below 3.5 and you're targeting Goldman, focus on networking, internship experience, and a demonstrably strong track record in finance (CFA coursework, deals, financial modeling)." },
  { question: "How hard is it to get a job at Goldman Sachs?", answer: "Extremely competitive. Goldman Sachs receives over 300,000 applications per year and hires approximately 2,500–3,000 people globally — an acceptance rate below 1%. For target school campus recruiting, the acceptance rate into summer analyst programs is roughly 2–4%. The most competitive divisions — Investment Banking Division (IBD) and Securities — are harder still. Engineering divisions have slightly higher acceptance rates because the talent pool for strong engineers is broader. The practical implication: most Goldman offers come through networking, referrals, and internship conversion rather than cold application." },
  { question: "What divisions at Goldman Sachs are hiring?", answer: "Goldman's major divisions as of 2025: Investment Banking Division (IBD) — advisory on M&A, IPOs, debt issuance; most prestigious, most competitive. Global Markets — sales, trading, and structuring of securities; highly quantitative. Asset & Wealth Management (AWM) — manages $2.8T+ in AUM; growing division post-Marcus divestiture. Engineering — Goldman's largest division by headcount; software engineers, data engineers, quant engineers. Consumer & Wealth Solutions — private banking, advisory. Operations / Global Banking & Markets Ops. The fastest growth areas: technology/engineering and wealth management. Trading (global markets) hiring is more cyclical." },
  { question: "Should I do an MBA before trying for Goldman Sachs?", answer: "Only if you can get into a target MBA program (Wharton, Booth, Columbia, Harvard, Kellogg, MIT Sloan, Tuck, Stern). Goldman's associate-level campus recruiting runs through MBA programs at a defined list of schools. If you can get into one of those programs and want IB/finance, an MBA gives you a structured path into banking that's hard to replicate otherwise. If you can't get into a target program, an MBA won't help and may hurt (it&apos;s expensive and the expected track changes). For engineering roles, an MBA is irrelevant — technical skills and experience matter far more." },
];

export default async function HowToGetAJobAtGoldmanSachsPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Get a Job at Goldman Sachs — The Complete Guide (2025)"
        description="The full Goldman Sachs hiring funnel — application to offer. What separates candidates who get in from those who don't."
        datePublished={publishedDate}
        dateModified={publishedDate}
        url={`${BASE_URL}/blog/how-to-get-a-job-at-goldman-sachs`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job at Goldman Sachs", url: `${BASE_URL}/blog/how-to-get-a-job-at-goldman-sachs` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 50%, #0A1628 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Investment Banking · Finance · Goldman Sachs Guide · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How to Get a Job<br />
            <span className="text-white/50">at Goldman Sachs</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The complete hiring guide — application, HireVue, superday, and what separates the candidates who get offers. Finance technical prep and what Goldman actually looks for.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated 2025 · 10 min read · &lt;1% acceptance rate · 300,000+ applicants/year</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-2 text-[1.9rem] font-extrabold tracking-[-0.02em]">How to get in the door</h2>
          <p className="mb-10 text-[14px] text-[var(--muted)]">Goldman Sachs gets 300,000+ applications per year. The path in matters as much as your qualifications.</p>
          <div className="space-y-6">
            {PATHS.map(({ path, accent, likelihood, how, preparation }) => (
              <div key={path} className="rounded-2xl border border-[var(--border)] p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-extrabold text-[16px]">{path}</h3>
                  <span className="shrink-0 text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${accent}18`, color: accent }}>{likelihood}</span>
                </div>
                <p className="text-[13px] leading-6 text-[var(--muted)] mb-3">{how}</p>
                <div className="rounded-lg p-3" style={{ background: `${accent}08`, borderLeft: `3px solid ${accent}` }}>
                  <p className="text-[12px] leading-5 text-[var(--muted)]"><strong>Preparation:</strong> {preparation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-2 text-[1.9rem] font-extrabold tracking-[-0.02em]">The Goldman Sachs hiring funnel</h2>
          <p className="mb-10 text-[14px] text-[var(--muted)]">Every stage of the Goldman process — what they&apos;re testing and how to pass.</p>
          <div className="space-y-5">
            {STAGES.map(({ stage, accent, what, howToPass, dontDo }, i) => (
              <div key={stage} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white" style={{ background: accent }}>{i + 1}</span>
                  <h3 className="font-extrabold text-[15px]">{stage}</h3>
                </div>
                <p className="text-[13px] leading-6 text-[var(--muted)] mb-4">{what}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-[#05966918] p-3 border-l-4 border-[#059669]">
                    <p className="text-[11px] font-bold uppercase text-[#059669] mb-1">How to pass</p>
                    <p className="text-[12px] leading-5 text-[var(--muted)]">{howToPass}</p>
                  </div>
                  <div className="rounded-lg bg-[#DC262618] p-3 border-l-4 border-[#DC2626]">
                    <p className="text-[11px] font-bold uppercase text-[#DC2626] mb-1">Don&apos;t do this</p>
                    <p className="text-[12px] leading-5 text-[var(--muted)]">{dontDo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Finance technicals you must know</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { topic: "DCF (Discounted Cash Flow)", desc: "Walk through a DCF from scratch: project FCF, calculate WACC, apply terminal value, discount back. Know sensitivity analysis and what inputs matter most." },
              { topic: "LBO (Leveraged Buyout)", desc: "Explain an LBO model: purchase price, debt structure, operating assumptions, exit multiple, and IRR calculation. Know what makes a good LBO candidate." },
              { topic: "Comparable Company Analysis", desc: "Select comps, spread EV/EBITDA and P/E multiples, apply to the target. Know why certain comps are more relevant and how to handle outliers." },
              { topic: "Precedent Transaction Analysis", desc: "How to find and use M&A transaction comps. Understand control premium and how precedents differ from trading comps." },
              { topic: "Accounting fundamentals", desc: "Three statement model: how income statement, balance sheet, and cash flow statement link. What happens to each if depreciation increases by $10." },
              { topic: "Merger math", desc: "Accretion / dilution analysis. When is a stock deal dilutive? How does P/E ratio of acquirer vs. target affect the math?" },
            ].map(({ topic, desc }) => (
              <div key={topic} className="rounded-xl border border-[var(--border)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{topic}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Prepare for Goldman with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI interview coaching for investment banking — finance technicals, behavioral rounds, and superday preparation. Practice as many rounds as you need.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#1A3A5C]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
