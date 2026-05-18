import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get a Job at Salesforce — Interview Process & Tips (2025)",
  description:
    "Salesforce's Ohana culture, Trailhead ecosystem, and CRM platform engineering create a distinctive hiring process. Full breakdown of the interview stages, what Salesforce looks for, and how to prepare for technical and values-based rounds.",
  keywords: ["how to get a job at salesforce", "salesforce interview process", "salesforce software engineer interview", "salesforce hiring 2025", "salesforce engineering culture", "working at salesforce", "salesforce career tips"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-salesforce" },
  openGraph: {
    title: "How to Get a Job at Salesforce — Interview Process & Tips (2025)",
    description: "Salesforce's Ohana culture and platform engineering create a distinctive hiring process. Full breakdown.",
    url: "/blog/how-to-get-a-job-at-salesforce",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const SALESFORCE_DIFFERENTIATORS = [
  { signal: "Ohana culture and values-based hiring", detail: "Salesforce's 'Ohana' (Hawaiian for 'family') isn't just marketing — it's baked into how they hire. Behavioral rounds at Salesforce are explicitly structured around their V2MOM framework (Vision, Values, Methods, Obstacles, Measures) and their four core values: Trust, Customer Success, Innovation, and Equality. Candidates who can't speak to values authentically get screened out at the behavioral stage regardless of technical performance. This is more values-rigorous than most FAANG processes." },
  { signal: "Customer success orientation in engineering", detail: "Unlike pure product companies, Salesforce engineers work within an enterprise CRM ecosystem — their customers are businesses, not end-users. Technical decisions must account for multi-tenant architecture, enterprise security requirements, and backward compatibility at massive scale (Salesforce has millions of org customizations). Interviewers probe whether you understand enterprise software constraints: data isolation, custom metadata, API versioning, and the limits of tenant customization." },
  { signal: "Platform and ecosystem thinking", detail: "Salesforce operates a platform business — third-party developers build on top of their infrastructure via AppExchange. Engineers are expected to think about extensibility, API design, and how platform decisions affect a developer ecosystem, not just internal teams. System design questions often probe platform architecture: how would you design a multi-tenant data model, how do you version APIs with millions of dependent apps, or how do you maintain backward compatibility at scale." },
  { signal: "Trailhead and continuous learning culture", detail: "Salesforce's Trailhead learning platform is a signal about their culture — they invest heavily in internal learning and expect employees to keep growing. In interviews, Salesforce asks how you've grown professionally, what you've recently learned, and how you stay current. Demonstrating genuine curiosity about Salesforce's technology stack (Apex, Lightning Web Components, Einstein AI) signals cultural fit beyond just the role requirements." },
];

const INTERVIEW_STAGES = [
  { stage: "1. Recruiter screen", what_happens: "Standard background, compensation, and motivation screen. Salesforce recruiters specifically probe for values alignment — they'll ask why Salesforce beyond 'it's a great company.' They're also checking whether you understand the enterprise software space.", how_to_prepare: "Research Salesforce's four core values (Trust, Customer Success, Innovation, Equality) and prepare a genuine story for each. 'Why Salesforce' answers that reference their Ohana culture, their enterprise market position, or specific products you've used professionally are significantly stronger than generic answers." },
  { stage: "2. Technical phone screen", what_happens: "Coding problem at LeetCode medium difficulty, plus sometimes a Salesforce-platform-specific question (SOQL query design, Apex trigger logic, or Lightning Component architecture for Salesforce engineering roles vs. standard CS for platform/infra roles).", how_to_prepare: "Standard LeetCode prep for core CS roles. For Salesforce platform engineering roles specifically: learn SOQL, Apex, and the Lightning component model. The Trailhead free platform is the best way to get hands-on experience before the interview." },
  { stage: "3. Virtual on-site (4–5 rounds)", what_happens: "2 coding rounds, 1 system design round (multi-tenant architecture, enterprise data modeling, or API design for large ecosystems), 1–2 behavioral/values rounds using the V2MOM framework.", how_to_prepare: "For system design: multi-tenant SaaS architecture is a canonical Salesforce problem. Practice designing a system that serves thousands of enterprise customers with data isolation, custom metadata layers, and configurable workflows. For behavioral: prepare STAR stories that map explicitly to their four values — especially Trust (security, reliability) and Customer Success (what you've done for customers)." },
  { stage: "4. Offer and negotiation", what_happens: "Salesforce offers are competitive but structured differently than pure-tech FAANG — higher base salaries relative to equity compared to Meta or Google. The company has been more conservative with equity grants recently due to their stock performance, but base comp is strong.", how_to_prepare: "Salesforce roles often come with strong base salaries and less equity concentration risk than pure tech companies. Competing offers from FAANG or high-growth SaaS companies (Workday, ServiceNow) are the best leverage. Negotiate both base and signing bonus — the signing bonus is often more flexible than the base band at Salesforce." },
];

const FAQS = [
  { question: "Do I need Salesforce certification to get a job at Salesforce?", answer: "Not for engineering roles, but it helps for platform and technical roles. Salesforce Admin and Platform Developer I certifications signal genuine familiarity with the ecosystem and separate candidates who know the platform from those who've only worked in general cloud infrastructure. For product management, solutions engineering, and customer success roles, certifications are significantly more valued — they're often a differentiating signal for mid-level and senior positions." },
  { question: "How does Salesforce's culture compare to Amazon or Google?", answer: "Salesforce's culture is more explicitly values-driven than either Amazon or Google, with more formal emphasis on charitable giving, equality, and 'stakeholder capitalism.' This shows up in the interview process with more direct values-alignment screening. Amazon is more performance and ownership focused; Google is more intellectual and product-focused. If you care about corporate culture and values alignment being a real part of the interview, Salesforce is more authentic about it than most tech companies." },
  { question: "Is Salesforce a good company to work for in 2025?", answer: "Yes, with appropriate expectations. Salesforce has gone through significant layoffs in 2023 and restructuring — the culture and pace have changed. It's a mature enterprise software company, not a hypergrowth startup. The upside is stability, strong comp, and genuinely interesting enterprise-scale technical problems. The downside relative to earlier years is slower promotion velocity and less of the startup-adjacent energy that Salesforce had in the 2015–2020 period. It's a strong destination for engineers who want to build enterprise infrastructure at scale." },
];

export default async function HowToGetAJobAtSalesforcePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Get a Job at Salesforce — Interview Process & Tips (2025)" description="Salesforce's Ohana culture and platform engineering create a distinctive hiring process. Full breakdown." url={`${BASE_URL}/blog/how-to-get-a-job-at-salesforce`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job at Salesforce", url: `${BASE_URL}/blog/how-to-get-a-job-at-salesforce` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Salesforce</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Get a Job at Salesforce</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">Ohana culture, enterprise platform engineering, and values-based behavioral rounds. Salesforce hires differently than pure-tech FAANG — here&apos;s the full process breakdown.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={75000} suffix="+" label="Salesforce employees globally (2025)" accent="#00A1E0" />
            <StatCard value={4} label="Core Salesforce values that explicitly shape the behavioral interview" accent="#7C3AED" />
            <StatCard value={5} label="Interview stages with dedicated values and V2MOM alignment rounds" accent="#D97706" />
            <StatCard value={150} suffix="K+" label="AppExchange apps built on Salesforce's platform — the ecosystem scale" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Salesforce looks for beyond technical skills</h2>
          <div className="mt-6 space-y-4">
            {SALESFORCE_DIFFERENTIATORS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#00A1E0]/10 text-[13px] font-bold text-[#00A1E0]">{i + 1}</span>
                <div><p className="font-bold text-[var(--ink)]">{item.signal}</p><p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Salesforce&apos;s interview process — stage by stage</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for a Salesforce interview? Zari coaches the full process.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari preps you for Salesforce&apos;s values-based behavioral rounds (Ohana, V2MOM), multi-tenant platform system design, and offer negotiation for their enterprise comp structure.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
