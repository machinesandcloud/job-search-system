import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get a Job at Stripe — Interview Process & Tips (2025)",
  description:
    "Stripe is one of the most respected engineering organizations in tech — known for API-first design, writing culture, and extremely high technical bar. Full breakdown of the Stripe interview process, what they look for, and how to negotiate a Stripe offer.",
  keywords: ["how to get a job at stripe", "stripe interview process", "stripe software engineer interview", "stripe hiring", "stripe engineering culture", "working at stripe 2025", "stripe career tips"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-stripe" },
  openGraph: {
    title: "How to Get a Job at Stripe — Interview Process & Tips (2025)",
    description: "Stripe's API-first culture and writing-heavy process set it apart from FAANG. Full breakdown.",
    url: "/blog/how-to-get-a-job-at-stripe",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const STRIPE_DIFFERENTIATORS = [
  { signal: "API-first product thinking", detail: "Stripe's entire culture is built around making infrastructure that 'just works' — and they hire people who think the same way about their work. In interviews, this surfaces as: how you think about developer experience, API design decisions, documentation quality, and building systems that other engineers want to use. 'It works' is not the bar at Stripe — 'it's delightful to use' is." },
  { signal: "Writing culture and clear communication", detail: "Stripe has an unusually strong writing culture for a tech company — decisions are documented, proposals are written before discussed, and strong writing is treated as a proxy for clear thinking. Interviews often include written components or probe for how clearly you can explain technical decisions. The ability to structure complex trade-offs in clear prose is a real differentiator." },
  { signal: "Financial infrastructure depth", detail: "Stripe processes hundreds of billions in payments. Engineering interviews probe for understanding of financial system requirements: consistency, idempotency, audit trails, reconciliation, and regulatory compliance. Even engineers not working directly on payments infrastructure need to appreciate these constraints. Showing familiarity with the domain (even without payments-specific experience) signals serious preparation." },
  { signal: "Very high technical bar — similar to FAANG", detail: "Stripe's engineering reputation attracts exceptional candidates, and the bar reflects it. System design interviews expect distributed systems depth. Coding rounds are LeetCode medium-to-hard. The combination of technical depth plus strong communication (writing culture) means you need to nail both simultaneously — you can't compensate for weak communication with exceptional coding, or vice versa." },
];

const INTERVIEW_STAGES = [
  { stage: "1. Recruiter screen + initial assessment", what_happens: "Standard background and compensation alignment screen. Stripe recruiters are organized and thorough — they'll ask about your technical background, career narrative, and compensation expectations clearly. Some roles include a written assessment or take-home at this stage.", how_to_prepare: "Have a crisp career narrative ready. Know your compensation expectations — Stripe pays competitively with equity. If there's a written component, treat it seriously: Stripe's writing culture means your writing quality in the assessment is a real signal." },
  { stage: "2. Technical phone screen", what_happens: "Coding problem at LeetCode medium difficulty. Stripe often uses their own coding environment. Expect to code while explaining your thinking.", how_to_prepare: "Practice thinking out loud while coding — narrate your approach before starting. LeetCode mediums focused on strings, arrays, trees, and graphs. Be ready to discuss time and space complexity of every solution you propose." },
  { stage: "3. Virtual on-site (4-5 rounds)", what_happens: "Engineering roles: 2 coding rounds, 1-2 system design rounds (often payments or financial system themed), 1 behavioral/culture round. System design at Stripe specifically probes for consistency, idempotency, and fault tolerance — concepts central to payment infrastructure.", how_to_prepare: "Study distributed systems with financial focus: two-phase commit, idempotency keys, saga pattern, event sourcing for audit trails. For behavioral: prepare examples of clear technical communication, debugging complex systems, and working across teams." },
  { stage: "4. Offer and negotiation", what_happens: "Stripe offers include base salary, RSUs (with standard 4-year vest), and signing bonus. They're competitive with Google and Meta at equivalent levels. The process from on-site to offer is relatively fast — 1-2 weeks.", how_to_prepare: "Competing offers from Google, Meta, or other top-tier companies are the best negotiation leverage. Focus on base and RSU grant size. Stripe has less flexibility on vesting schedule than some companies, but more flexibility on the grant amount." },
];

const FAQS = [
  { question: "Is Stripe harder to get into than FAANG?", answer: "The technical bar is comparable to Google or Meta. Some candidates find Stripe harder because of the combined expectation of technical depth AND strong written communication — both are evaluated seriously. The volume of applicants is lower than FAANG, which means your application has a better chance of being reviewed. Getting a referral from a current Stripe employee improves your odds significantly." },
  { question: "Does Stripe care about financial domain knowledge?", answer: "More than most tech companies, but less than you might think. Stripe engineers are expected to understand why payments are hard (consistency, idempotency, regulatory constraints) and to appreciate the domain constraints. Deep financial domain expertise is nice to have but not required. What matters is that you can quickly learn a domain's constraints and design systems that respect them — show that you've done this in whatever domain you've worked in." },
  { question: "How important is Stripe-specific preparation vs general SWE prep?", answer: "Both matter. General SWE prep (LeetCode, system design, behavioral) gets you through the technical rounds. Stripe-specific preparation (financial infrastructure constraints, API design philosophy, writing culture) helps you stand out in the system design and behavioral rounds and shows that you've done your homework. Spend 70% on general prep, 30% on Stripe-specific context." },
];

export default async function HowToGetAJobAtStripePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Get a Job at Stripe — Interview Process & Tips (2025)" description="Stripe's API-first culture and writing-heavy process set it apart from FAANG. Full breakdown." url={`${BASE_URL}/blog/how-to-get-a-job-at-stripe`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job at Stripe", url: `${BASE_URL}/blog/how-to-get-a-job-at-stripe` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Stripe</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Get a Job at Stripe</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">API-first culture, a strong writing bar, and FAANG-level technical depth. Stripe is one of the most respected engineering orgs in tech — here&apos;s how to prepare.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={8000} suffix="+" label="Stripe employees globally (2025)" accent="#6366F1" />
            <StatCard value={1} suffix="T+" prefix="$" label="In payments processed annually — the scale context for system design" accent="#059669" />
            <StatCard value={4} label="Distinct Stripe differentiators — what to prep beyond LeetCode" accent="#7C3AED" />
            <StatCard value={4} label="Interview stages from screen to offer" accent="#D97706" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Stripe looks for that differentiates it from FAANG</h2>
          <div className="mt-6 space-y-4">
            {STRIPE_DIFFERENTIATORS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[13px] font-bold text-[var(--brand)]">{i + 1}</span>
                <div><p className="font-bold text-[var(--ink)]">{item.signal}</p><p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Stripe&apos;s interview process — stage by stage</h2>
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
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for a Stripe interview? Zari coaches the full process.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari preps you for Stripe-specific system design (idempotency, consistency, financial constraints), behavioral questions tuned to Stripe&apos;s writing culture, and salary negotiation using current market benchmarks.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
