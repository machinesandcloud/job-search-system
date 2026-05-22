import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Work From Home Jobs 2025 — Best Remote Jobs & How to Find Them",
  description: "The best work from home jobs in 2025 — by salary, required skills, and how to find them. Remote job boards, WFH resume tips, and which industries hire the most remote workers.",
  keywords: ["work from home jobs", "work from home jobs 2025", "best work from home jobs", "remote jobs", "remote work from home", "work from home jobs hiring now", "work from home jobs no experience", "well paying work from home jobs", "remote jobs 2025", "how to find remote work"],
  alternates: { canonical: "/blog/work-from-home-jobs" },
  openGraph: { title: "Work From Home Jobs 2025 — Best Remote Jobs & How to Find Them", description: "The best WFH jobs by salary, the remote job boards that work, and how to optimise your resume for remote-first companies.", url: "/blog/work-from-home-jobs" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are the highest paying work from home jobs in 2025?", answer: "The highest paying remote jobs in 2025 are predominantly in software engineering (Senior/Staff SWE: $140,000–$350,000+ TC at remote-first companies), product management (Senior PM: $150,000–$250,000 at remote-first), data science and ML engineering ($130,000–$250,000), cybersecurity ($110,000–$200,000), and technical writing for regulated industries ($90,000–$150,000). Beyond tech: remote sales roles (especially enterprise SaaS AEs) regularly earn $150,000–$250,000+ OTE. Finance roles at remote-first companies (financial analysis, FP&A) pay $80,000–$150,000." },
  { question: "Which companies hire the most remote workers?", answer: "Remote-first companies include: GitLab (fully remote across 65+ countries), Automattic (WordPress parent, fully distributed), Zapier, Buffer, Basecamp, and Doist. Major tech companies that allow extensive remote work: Stripe, Shopify, Coinbase, Airbnb (live-and-work-anywhere policy). FAANG has pulled back on remote-only arrangements post-2022, though LinkedIn, Meta, and Google still have remote roles available. For comprehensive remote job listings, Levels.fyi tracks remote compensation at tech companies specifically." },
  { question: "How do I get a remote job with no experience?", answer: "The challenge with 'no experience' in remote work specifically is that remote roles require more demonstrated self-direction than in-person roles — hiring managers can't observe your work habits. The most accessible entry points: customer support (Zendesk, Intercom), data entry and virtual assistance, freelance writing and content, transcription, and entry-level software development (bootcamp graduates are regularly hired remotely). For these roles, a portfolio or demonstrable output matters more than a degree. Build something, publish it, link to it in your application." },
  { question: "How do I know if a remote job posting is legitimate?", answer: "Red flags: unsolicited offers, requests for payment before starting, salaries significantly above market for the role, companies with no verifiable online presence, requests for your SSN/bank details before a signed contract. Legitimate remote roles will be posted on verifiable company career pages, have proper interview processes (video calls with named employees), and will not ask for payment of any kind. Use LinkedIn to verify that the recruiter contacting you actually works for the company they claim to represent." },
];

const JOBS = [
  { role: "Software Engineer (Remote)", salary: "$100,000–$350,000+ TC", skills: "Programming (Python, JS, Go, etc.)", demand: "Very High" },
  { role: "Product Manager (Remote)", salary: "$120,000–$250,000", skills: "Product strategy, data analysis, communication", demand: "High" },
  { role: "Data Scientist / ML Engineer", salary: "$110,000–$250,000", skills: "Python, SQL, ML frameworks", demand: "High" },
  { role: "Cybersecurity Analyst", salary: "$80,000–$180,000", skills: "Security certs (CISSP, CompTIA), networking", demand: "Very High" },
  { role: "Enterprise Sales (SaaS)", salary: "$80,000 base + $150,000+ OTE", skills: "B2B sales, CRM, outbound prospecting", demand: "High" },
  { role: "UX / Product Designer", salary: "$90,000–$160,000", skills: "Figma, user research, design systems", demand: "Medium-High" },
  { role: "Technical Writer", salary: "$70,000–$140,000", skills: "Technical documentation, API docs, regulated industries", demand: "Medium" },
  { role: "Financial Analyst (Remote)", salary: "$70,000–$130,000", skills: "Excel/Sheets, financial modelling, FP&A", demand: "Medium" },
  { role: "Virtual Assistant", salary: "$35,000–$65,000", skills: "Admin, scheduling, communication tools", demand: "High" },
  { role: "Customer Support Specialist", salary: "$40,000–$65,000", skills: "Helpdesk tools (Zendesk, Intercom), communication", demand: "Very High" },
];

export default async function WorkFromHomeJobsPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-03-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Work From Home Jobs 2025 — Best Remote Jobs & How to Find Them"
        description="The best WFH jobs by salary, the remote job boards that work, and how to optimise your resume for remote-first companies."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/work-from-home-jobs`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Work From Home Jobs", url: `${BASE_URL}/blog/work-from-home-jobs` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 45%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Remote Work · WFH Jobs · Job Boards · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Work From Home Jobs<br />
            <span className="text-white/50">2025</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The best WFH jobs by salary and required skills, the job boards that actually have real remote listings, and how to compete for remote roles when everyone is applying.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated June 2025 · 8 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Best work from home jobs in 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Salary ranges for US remote roles. Demand = hiring volume and job posting growth in 2025.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span className="col-span-1">Role</span><span>Salary (US)</span><span className="col-span-1">Key skills</span><span>Demand</span>
            </div>
            {JOBS.map(({ role, salary, skills, demand }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="font-semibold text-[#059669]">{salary}</span>
                <span className="text-[var(--muted)] text-[12px]">{skills}</span>
                <span>{demand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Best job boards for remote work</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { name: "We Work Remotely", desc: "High-quality remote jobs in tech, design, marketing, and customer support. Curated — no scam postings.", badge: "Tech & design" },
              { name: "Remote.co", desc: "Broad remote job board with strong filtering. Good for non-tech remote roles.", badge: "All sectors" },
              { name: "Remotive", desc: "Tech-focused remote jobs. Strong signal-to-noise ratio.", badge: "Tech" },
              { name: "LinkedIn (Remote filter)", desc: "Set location to 'Remote' in search. Largest volume, most employers. Mix of quality.", badge: "Highest volume" },
              { name: "FlexJobs", desc: "Curated, manually screened remote jobs. Subscription required — worth it to avoid scams.", badge: "Scam-free" },
              { name: "Himalayas", desc: "Remote-first job board with transparent salary and equity data. Growing fast in 2025.", badge: "Transparent pay" },
            ].map(({ name, desc, badge }) => (
              <div key={name} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-bold text-[14px]">{name}</span>
                  <span className="rounded-full bg-[#059669]/10 px-2 py-0.5 text-[10px] font-semibold text-[#059669]">{badge}</span>
                </div>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">How to compete for remote jobs in 2025</h2>
          <div className="space-y-4 text-[14px] leading-7 text-[var(--muted)]">
            <p><strong className="text-[var(--ink)]">1. Signal remote-work competence explicitly.</strong> Remote hiring managers look for specific signals: async communication skills (documented, structured writing), self-direction (track record of hitting goals without being managed), and tool proficiency (Slack, Notion, Linear, Figma, etc.). If you have worked remotely before, say so clearly on your resume and LinkedIn.</p>
            <p><strong className="text-[var(--ink)]">2. Tailor your resume for remote roles.</strong> ATS systems for remote roles are identical to in-office roles — keyword match still matters. But the cover letter or application message is more important for remote roles because hiring managers want to see that you can communicate in writing. Your written application is a sample of your async communication quality.</p>
            <p><strong className="text-[var(--ink)]">3. Apply to remote-first companies, not remote-reluctant ones.</strong> A company that went remote during COVID and is grudgingly maintaining it is a different work experience from a company that was built remote-first. Remote-first companies have processes, tools, and culture designed for async work. Research the company before applying — Glassdoor and Blind have current reviews on remote culture.</p>
            <p><strong className="text-[var(--ink)]">4. Prepare for the async interview process.</strong> Remote-first companies often include written assessments, asynchronous video interviews (HireVue, Loom), or project-based take-homes as part of hiring. These are auditions for your remote work skills as much as your technical skills.</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land your remote role with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Resume ATS scoring, remote-specific interview prep, and LinkedIn optimisation for remote-first companies — available 24/7.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
