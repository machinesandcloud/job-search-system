import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Austin 2025 — AI Career Coaching for Austin Texas Professionals",
  description: "AI career coaching for Austin, Texas professionals. Austin salary benchmarks for tech, semiconductors, and startups. Resume optimization and interview prep for Dell, Apple, Tesla, and Oracle.",
  keywords: ["career coach austin", "career counselor austin", "austin career coach", "career coaching austin tx", "austin tech jobs 2025", "austin salary negotiation", "career coach texas", "dell interview prep", "apple austin jobs", "tesla austin career"],
  alternates: { canonical: "/career-coach-austin" },
  openGraph: { title: "Career Coach Austin 2025 — AI Career Coaching for Austin Texas Professionals", description: "Austin salary benchmarks for tech, semiconductors, and startups. Interview prep for Dell, Apple, Tesla, and Oracle.", url: "/career-coach-austin" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Why is Austin such a fast-growing job market?", answer: "Austin has been the fastest-growing major US tech market since 2018, driven by: no state income tax (Texas), significantly lower cost of living than SF/Seattle, corporate relocations (Tesla HQ, Oracle HQ, Apple's $1B campus in North Austin, Dell HQ in Round Rock), and a booming semiconductor sector (Samsung fab expansion in Taylor, NXP, Applied Materials). The UT Austin tech pipeline feeds local hiring. The growth has slowed from its 2021–2022 peak but remains strong — Austin added more net tech jobs in 2023–2024 than most major US cities." },
  { question: "What are the top tech employers in Austin?", answer: "Austin's major tech employers: Dell Technologies (HQ Round Rock — largest private employer in Central Texas), Apple (North Austin campus, 5,000+ employees), Tesla (HQ Gigafactory Austin, 15,000+ employees), Oracle (relocated HQ), Google Austin, Facebook/Meta Austin, Amazon AWS, IBM, National Instruments (now NI), Samsung Austin Semiconductor, Applied Materials, and a dense startup ecosystem (Silicon Hills corridor along 360/MoPac). Financial tech is also growing — Goldman Sachs Austin office, Charles Schwab relocated HQ to Westlake." },
  { question: "What is the no-income-tax benefit for Austin salaries?", answer: "Texas has no state income tax — zero. Like Seattle/Washington State, this creates a meaningful after-tax advantage over California and New York. For a $180,000 tech salary in Austin vs San Francisco, the after-tax difference is approximately $20,000–$28,000/year (California's ~9–13% marginal rate applied to that income). The cost of living delta further amplifies this — Austin is significantly cheaper than SF or NYC for housing. This is why many professionals find an Austin salary of $150,000–$180,000 to be equivalent in real terms to $200,000–$230,000 in San Francisco." },
  { question: "Is Austin's job market still growing in 2025?", answer: "Yes, though the hyper-growth of 2021–2022 has normalized. Austin's key growth sectors in 2025: semiconductors (Samsung's Taylor expansion, continued NXP and Applied Materials growth), EV and advanced manufacturing (Tesla Gigafactory hiring in production, engineering, and supply chain), fintech (Goldman Sachs Austin consumer tech, Charles Schwab integration roles), and enterprise software (Oracle, Dell, IBM). The startup ecosystem is healthy, with strong VC activity in the Silicon Hills corridor. Remote workers from SF and NY continue to relocate to Austin for the cost-of-living arbitrage." },
];

const SALARIES = [
  { role: "Senior Software Engineer", company: "Apple / Google / Oracle Austin", range: "$150,000–$260,000 TC", note: "No state income tax advantage" },
  { role: "Software Engineer (Mid)", company: "Dell / IBM / Startup", range: "$110,000–$180,000 TC", note: "Dell pays below FAANG; better WLB" },
  { role: "Hardware / Semiconductor Eng", company: "Samsung / NXP / Applied Materials", range: "$120,000–$200,000", note: "Taylor fab expansion driving demand" },
  { role: "Manufacturing / EV Engineer", company: "Tesla Gigafactory Austin", range: "$100,000–$160,000", note: "Tesla pays below market; mission draw" },
  { role: "Finance / Fintech", company: "Goldman Sachs / Charles Schwab", range: "$110,000–$200,000 TC", note: "GS Austin tech/ops roles growing" },
  { role: "Product Manager", company: "Austin tech companies", range: "$130,000–$220,000 TC", note: "Startup PM comp below FAANG" },
  { role: "Marketing Manager", company: "Consumer / Tech / SaaS", range: "$80,000–$130,000", note: "Strong SaaS marketing market" },
];

export default async function CareerCoachAustinPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Austin 2025 — AI Career Coaching for Austin Texas Professionals"
        description="Austin salary benchmarks for tech, semiconductors, and startups. Interview prep for Dell, Apple, Tesla, and Oracle."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-austin`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Austin", url: `${BASE_URL}/career-coach-austin` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #BF5700 50%, #D97706 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🤠 Austin TX · Tech · No State Income Tax
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Austin</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Austin&apos;s booming tech market — Dell, Apple, Tesla, Oracle, and Silicon Hills startups. Salary negotiation, resume optimization, and interview prep 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Austin salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Texas has no state income tax — your take-home is $20,000–$30,000/year more than the same gross salary in California.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range (TC)</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#BF5700]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Austin job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Dell & Oracle interview prep", desc: "Interview coaching for Dell Technologies, Oracle, and IBM Austin — including enterprise software sales, engineering, and operations roles." },
              { title: "Tesla / EV career coaching", desc: "Resume optimization and interview prep for Tesla Gigafactory Austin manufacturing, engineering, and operations roles." },
              { title: "Austin resume optimization", desc: "ATS keyword scoring for Austin tech job postings. Semiconductor and EV industry keywords built in." },
              { title: "No-tax salary analysis", desc: "Real take-home comparison between Austin, SF, and NYC — quantify the after-tax value of Austin's no-state-income-tax advantage." },
              { title: "Startup coaching", desc: "Silicon Hills startup interview prep, equity analysis, and early-stage company evaluation for Austin's active startup ecosystem." },
              { title: "LinkedIn for Austin recruiters", desc: "Headline and About section optimization for Austin tech, semiconductor, and energy sector recruiter searches." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #BF5700 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Austin job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for Austin&apos;s tech, semiconductor, and startup markets — 24/7, no scheduling required.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#BF5700]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
