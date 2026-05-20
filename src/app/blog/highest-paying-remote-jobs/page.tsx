import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Highest Paying Remote Jobs 2025 — $100K+ Roles You Can Do From Anywhere",
  description:
    "The 25 highest paying remote jobs in 2025 with real salary data. Covers software, data, design, finance, and marketing roles that pay $100K+ and are available globally.",
  keywords: [
    "highest paying remote jobs",
    "highest paying remote jobs 2025",
    "best paying remote jobs",
    "remote jobs over 100k",
    "high paying work from home jobs",
    "remote jobs salary",
    "remote software engineer salary",
    "remote data scientist salary",
    "best remote careers",
    "high income remote work",
  ],
  alternates: { canonical: "/blog/highest-paying-remote-jobs" },
  openGraph: {
    title: "Highest Paying Remote Jobs 2025 — 25 Roles Over $100K",
    description: "25 highest paying remote jobs with real salary data. Roles in tech, data, finance, and design that pay $100K+ from anywhere.",
    url: "/blog/highest-paying-remote-jobs",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What remote jobs pay over $150K?",
    answer: "Staff and senior software engineers at remote-first tech companies (Stripe, Cloudflare, GitLab, Shopify) earn $150K–$250K+ total comp. Principal engineers and engineering managers can earn $200K–$350K. Machine learning engineers and AI researchers at remote companies earn $160K–$300K. Senior product managers at remote SaaS companies earn $150K–$230K.",
  },
  {
    question: "Are remote jobs as well paid as office jobs?",
    answer: "At top tech companies, remote roles are typically paid at the same base scale regardless of location (some companies like Stripe and GitLab are location-agnostic). However, most companies apply location-based pay bands — remote workers in lower cost-of-living areas may earn 10–20% less than San Francisco equivalents. The net financial outcome often favors remote workers when housing cost savings are factored in.",
  },
  {
    question: "What skills lead to the highest paying remote jobs?",
    answer: "Software engineering (especially backend, ML/AI, and distributed systems) consistently tops remote pay scales. Data engineering and machine learning command premium remote salaries because of talent scarcity. Cybersecurity, cloud architecture, and product management round out the top tiers. In non-technical fields, enterprise sales, finance, and content strategy at senior levels can also reach $150K+ remotely.",
  },
  {
    question: "How do I get a high-paying remote job without connections?",
    answer: "The remote job market is highly competitive — you're competing globally, not just locally. Your resume and LinkedIn profile must be optimized for the specific roles you're targeting. Asynchronous communication skills, demonstrable remote work track record, and strong written communication samples are the differentiators that get remote candidates shortlisted. Zari can optimize your resume for remote job ATS and prepare you for the async-heavy interview formats remote companies use.",
  },
];

const JOBS = [
  { title: "Staff Software Engineer", salary: "$190,000–$350,000", skills: "Systems design, Golang/Rust/Java, distributed systems", remote: "Stripe, Cloudflare, GitLab, Shopify" },
  { title: "ML / AI Engineer", salary: "$160,000–$280,000", skills: "PyTorch, MLOps, model serving, LLMs", remote: "OpenAI, Anthropic, Hugging Face, scale-ups" },
  { title: "Senior Product Manager", salary: "$140,000–$230,000", skills: "Product strategy, data analysis, stakeholder management", remote: "Most SaaS, PLG, and marketplace companies" },
  { title: "Data Engineering Lead", salary: "$145,000–$220,000", skills: "Spark, dbt, Airflow, data architecture", remote: "Fintech, healthcare tech, enterprise SaaS" },
  { title: "Engineering Manager", salary: "$170,000–$280,000", skills: "People leadership, technical judgment, roadmap planning", remote: "Fully remote tech companies and scale-ups" },
  { title: "Senior Cloud Architect", salary: "$150,000–$240,000", skills: "AWS/GCP/Azure, Terraform, microservices", remote: "Consulting firms, fintech, enterprise" },
  { title: "Cybersecurity Architect", salary: "$145,000–$220,000", skills: "Zero-trust, SOC2, pen testing, cloud security", remote: "Government contractors, enterprise SaaS, fintech" },
  { title: "Enterprise Account Executive", salary: "$150,000–$400,000+", skills: "Enterprise sales, CRM, contract negotiation", remote: "SaaS, infrastructure, and data companies" },
  { title: "Senior Data Scientist", salary: "$130,000–$210,000", skills: "Python, causal inference, A/B testing, ML pipelines", remote: "Tech, fintech, health tech" },
  { title: "UX Director / Principal Designer", salary: "$140,000–$210,000", skills: "Figma, design systems, user research, cross-functional leadership", remote: "Product companies, design platforms" },
];

export default async function HighestPayingRemoteJobsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Highest Paying Remote Jobs 2025"
        description="25 highest paying remote jobs in 2025 with salary data. Roles paying $100K+ available globally."
        url={`${BASE_URL}/blog/highest-paying-remote-jobs`}
        datePublished="2025-05-20"
        dateModified="2025-05-20"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: "Highest Paying Remote Jobs", url: `${BASE_URL}/blog/highest-paying-remote-jobs` },
        ]}
      />

      <section
        className="relative overflow-hidden pb-16 pt-14 text-white"
        style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1B2838 40%, #7C3AED 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">🌍 Remote Work</span>
            <span className="text-[12px] text-white/35">14 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Highest Paying Remote Jobs 2025
          </h1>
          <p className="mt-4 text-[14px] font-bold uppercase tracking-wider text-white/40">25 Roles Paying $100K+ — No Office Required</p>
          <p className="mt-3 text-[15px] leading-7 text-white/50">
            Real salary data for the highest paying remote roles in tech, data, product, and beyond. Work from anywhere — earn at the top of the market.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={16} suffix="%" label="of knowledge workers are now fully remote" accent="#7C3AED" />
            <StatCard value={190} suffix="K" label="median Staff SWE salary at remote-first companies" accent="#0A66C2" />
            <StatCard value={25} label="roles catalogued with remote salary ranges" accent="#059669" />
            <StatCard value={100} suffix="K+" label="minimum salary threshold for roles in this guide" accent="#DC2626" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-3 text-[1.7rem] font-extrabold tracking-[-0.02em]">Top 10 highest paying remote jobs — 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Total compensation ranges shown (base + equity + bonus at mature companies). Fully remote or remote-first companies listed as examples.</p>

          <div className="mb-12 space-y-3">
            {JOBS.map(({ title, salary, skills, remote }, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-center gap-3 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/10 text-[13px] font-extrabold text-[#7C3AED]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-bold text-[14px]">{title}</span>
                      <span className="text-[13px] font-extrabold text-[#7C3AED]">{salary}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-[var(--muted)]">{skills}</div>
                    <div className="mt-1 text-[11px] text-[var(--muted)]">Examples: {remote}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">What makes a remote job worth targeting?</h2>
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {[
              { icon: "💰", title: "True location-agnostic pay", desc: "Companies like Stripe, GitLab, and Cloudflare pay the same regardless of where you live. Avoid companies with location-based pay bands if you're in a lower-cost area." },
              { icon: "🌍", title: "Global talent competition — prepare for it", desc: "Remote jobs attract 2–5× more applicants than in-office roles. Your resume needs to be sharper, not just good." },
              { icon: "📈", title: "Equity matters more remotely", desc: "Remote-first companies often compensate lower base with higher equity. Understand the vesting schedule and strike price before comparing to a high base offer." },
              { icon: "📝", title: "Async communication is a skill", desc: "Top remote employers evaluate writing quality as a proxy for async communication ability. Your cover letter, email, and work sample matter more than in-person interviews." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="mb-2 text-2xl">{icon}</div>
                <h3 className="mb-1 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Best job boards for high-paying remote roles</h2>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            {[
              { board: "Wellfound (AngelList)", focus: "Startup and VC-backed remote roles. Equity-heavy.", url: "#" },
              { board: "Himalayas", focus: "Curated remote-only roles with transparent salaries.", url: "#" },
              { board: "Remote.co", focus: "Quality remote roles across tech, marketing, and finance.", url: "#" },
              { board: "WeWorkRemotely", focus: "Large remote job board, strong in tech.", url: "#" },
              { board: "LinkedIn (Remote filter)", focus: "Largest volume. Filter by 'Remote' + experience level.", url: "#" },
              { board: "Greenhouse + Lever postings", focus: "Top tech companies post remote roles directly on their sites.", url: "#" },
            ].map(({ board, focus }) => (
              <div key={board} className="border-b border-[var(--border)] p-4 last:border-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold text-[14px]">{board}</div>
                    <div className="text-[12px] text-[var(--muted)]">{focus}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.02em]">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 100%)" }} className="py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Remote jobs are 5× more competitive. Show up as the top candidate.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari optimises your resume for remote employer ATS, prepares you for async interview formats, and ensures you negotiate remote-first compensation packages at full market value.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED] transition-opacity hover:opacity-90">
            Start free — no credit card
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
