import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Resume Summary Examples That Actually Work (2025) — With Templates",
  description:
    "40 resume summary examples for every career stage and profession. Copy-paste templates for software engineers, product managers, marketers, career changers, and new grads — with the exact formula.",
  keywords: ["resume summary examples", "resume summary", "professional summary for resume", "resume objective examples", "how to write a resume summary", "resume summary template", "resume introduction examples"],
  alternates: { canonical: "/blog/resume-summary-examples" },
  openGraph: { title: "Resume Summary Examples That Actually Work (2025)", description: "40 resume summary examples with the exact formula for writing yours.", url: "/blog/resume-summary-examples" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-03-05";
const MODIFIED = "2025-05-15";

export default async function ResumeSummaryExamplesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Resume Summary Examples That Actually Work (2025) — With Templates"
        description="40 resume summary examples with the exact formula for writing yours."
        url={`${BASE_URL}/blog/resume-summary-examples`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Resume Summary Examples", url: `${BASE_URL}/blog/resume-summary-examples` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Resume Writing</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">Resume Summary Examples That Actually Work (2025) — With Templates</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 10 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              A resume summary is the 2–4 sentences at the top of your resume that tell a recruiter exactly who you are, what you do, and why you're worth reading. Most are either missing or generic. The good ones do real SEO work for ATS and set the frame before a human even starts reading.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The formula for a strong resume summary</h2>
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="font-mono text-[13px] text-[var(--ink)]">[Years of experience] [professional identity] with expertise in [2–3 key skills or domains]. [One concrete achievement with a number]. [What you're targeting or what you do best].</p>
            </div>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Three to four sentences max. The first sentence should contain your most important keyword for ATS. The middle should have one number — any metric you own. The last sentence connects to what the target company needs.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Software engineer resume summary examples</h2>
            <div className="mt-4 space-y-3">
              {[
                "Senior backend engineer with 6 years of experience in Python, Go, and distributed systems. Built and scaled payment infrastructure processing $50M+ in daily transactions at a Series C fintech. Specializing in high-throughput data pipelines and API platform design. Looking for a staff-level role with significant architectural scope.",
                "Full-stack software engineer with 4 years of experience in React and Node.js. Reduced page load times by 67% through a performance optimization initiative that increased conversion 18%. Experienced in 0→1 product development and rapid iteration in early-stage startups.",
                "Machine learning engineer specializing in LLM fine-tuning, RAG architecture, and inference optimization. Shipped production AI features used by 2M+ users at a Series B AI company. Strong Python, PyTorch, and MLOps fundamentals with a focus on bringing models from research to production reliability.",
                "New grad software engineer with a CS degree and two internships in backend development. Built a data validation pipeline that reduced manual review time by 60%. Targeting entry-level backend or full-stack roles in SaaS or fintech.",
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-[13.5px] leading-7 text-[var(--muted)]">{s}</div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Product manager resume summary examples</h2>
            <div className="mt-4 space-y-3">
              {[
                "Product manager with 7 years of experience in B2B SaaS, specializing in platform and API products. Grew a data integrations product from $800K to $3.2M ARR over 18 months. Known for shipping high-quality product in ambiguous environments and building strong cross-functional alignment.",
                "Senior PM with consumer mobile expertise across 0→1 builds and scaled growth. Led a notification redesign that increased 30-day retention by 22% across 8M MAU. Looking for a Director of Product or Group PM role at a consumer company.",
                "APM with 2 years of experience in enterprise workflow automation. Owned a feature used by 400+ enterprise customers and reduced support ticket volume 38% through self-service tooling. Transitioning from APM to a full PM role with product ownership.",
                "Head of Product with experience leading product organizations of 8–14 PMs across three product lines. Built the PM hiring process, career ladder, and OKR framework from scratch. Targeting VP Product or Chief Product Officer roles at Series B–D companies.",
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-[13.5px] leading-7 text-[var(--muted)]">{s}</div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Marketing resume summary examples</h2>
            <div className="mt-4 space-y-3">
              {[
                "Content marketing manager with 6 years of experience in B2B SaaS, specializing in SEO and demand generation. Grew organic traffic from zero to 400,000 monthly visitors over 2.5 years. Built and managed a team of 5 writers and 2 SEO specialists.",
                "Growth marketer with expertise in paid acquisition across Meta, Google, and LinkedIn. Managed $2M+ monthly ad spend with a 3.1x blended ROAS. Track record of scaling efficient paid channels at Series A through Series C companies.",
                "Brand strategist with 8 years in CPG and DTC, specializing in brand positioning and visual identity. Led three complete brand redesigns, each resulting in measurable improvements in brand recall and acquisition cost. Currently seeking a VP Brand or Head of Brand role.",
                "Product marketing manager with 4 years of B2B SaaS GTM experience. Launched 6 major product releases, generating $1.4M in new ARR within 90 days of launch. Expert in competitive intelligence, positioning, and sales enablement.",
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-[13.5px] leading-7 text-[var(--muted)]">{s}</div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Career change resume summary examples</h2>
            <div className="mt-4 space-y-3">
              {[
                "Finance professional transitioning into data analytics after completing an intensive data science program. 5 years of financial modeling experience with SQL and Excel; now proficient in Python, Tableau, and BigQuery. Targeting analyst roles where financial domain knowledge is an advantage.",
                "Classroom teacher with 8 years of K–12 experience moving into instructional design. Developed curriculum for 1,200+ students and led a district-wide LMS implementation. Pursuing eLearning design roles where pedagogical expertise meets technology.",
                "Software engineer with 6 years of backend experience transitioning into product management. Built 3 features from 0 to launch, regularly partnered with PMs on discovery and spec, and completed a Product Management certificate program. Targeting APM or junior PM roles where technical background is valued.",
                "Military officer with 10 years of leadership experience transitioning to corporate operations or program management. Led teams of 40–120, managed $4M budgets, and coordinated logistics across 3 countries. PMP certified. Targeting operations, program management, or consulting roles.",
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-[13.5px] leading-7 text-[var(--muted)]">{s}</div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What makes a resume summary weak</h2>
            <div className="mt-4 space-y-3">
              {[
                { bad: "Dynamic and results-oriented professional with a passion for excellence and a proven track record of success.", why: "No keywords, no numbers, no specificity. Every word is an adjective. This is the resume summary equivalent of a blank page." },
                { bad: "Seasoned marketing professional with over 10 years of experience in various industries seeking a challenging role.", why: "\"Various industries\" is a red flag. \"Challenging role\" is not a value signal. No achievement, no specialization." },
                { bad: "Motivated recent graduate eager to contribute to a fast-paced team environment.", why: "Adjectives that every candidate uses. No skills mentioned, no academic or internship achievement, no role target." },
              ].map((item) => (
                <div key={item.bad} className="rounded-2xl border border-red-100 bg-red-50/50 p-5">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ {item.bad}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Get your resume summary written by AI</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Writing your own resume summary is hard because you're too close to your own experience to see what's relevant. Zari's <Link href="/ai-resume-writer" className="text-[var(--brand)] underline underline-offset-2">AI resume writer</Link> writes a targeted summary based on your background and the specific role you're applying for — with keywords, a metric, and the right positioning for your career stage.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get your resume summary written — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari writes a targeted summary based on your background and target role.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Write my resume summary <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
