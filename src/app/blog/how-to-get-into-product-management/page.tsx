import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get Into Product Management 2025 — Complete Transition Guide",
  description: "How to break into product management in 2025. Best PM entry paths, what backgrounds transition well, how to build a PM portfolio, and how to get your first PM role.",
  keywords: ["how to get into product management", "break into product management", "become a product manager", "product management career", "how to become a pm", "product manager entry level", "pm career transition", "how to get a pm job", "product management 2025", "apm program"],
  alternates: { canonical: "/blog/how-to-get-into-product-management" },
  openGraph: { title: "How to Get Into Product Management 2025 — Complete Transition Guide", description: "Best PM entry paths, what backgrounds transition well, and how to get your first PM role without prior PM experience.", url: "/blog/how-to-get-into-product-management" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What backgrounds transition best into product management?", answer: "The strongest PM transition backgrounds: (1) Software engineering — technical credibility is highly valued, especially for technical PM roles. SWEs who develop business acumen and communication skills are in very high demand. (2) Data analysis / data science — quantitative rigor and ability to work with metrics is core to PM work. DS professionals who develop product instinct and stakeholder skills transition well. (3) Business analysis or management consulting — strategic thinking, stakeholder management, and structured problem solving transfer directly. (4) UX/design — user empathy and design thinking are essential PM skills. Designers who develop technical literacy and business sense are strong PM candidates. (5) Marketing and growth — customer understanding, GTM strategy, and analytics are directly applicable." },
  { question: "Do I need an MBA to become a product manager?", answer: "No — but an MBA from a top program significantly accelerates the path to senior PM roles at top companies. MBA programs at Stanford, Wharton, MIT, Kellogg, and HBS place graduates directly into PM rotational programs (APM/RPM) at Google, Meta, LinkedIn, and other top companies. These programs are competitive but create a direct path. Without an MBA: the most common path is transitioning from a related role (SWE, data analyst, designer) within your current company, or targeting growth-stage startups where PM roles are less structured and easier to break into. The MBA is a multiplier on top of the right background — it's not a substitute for product thinking or relevant experience." },
  { question: "What is an APM (Associate Product Manager) program?", answer: "APM programs are structured, competitive entry-level product management programs at top tech companies. Notable programs: Google APM (highly competitive, 2-year rotational program), Meta (Rotational Product Manager), Microsoft (Program Manager rotation), LinkedIn, Uber, Salesforce, Workday, and many others. Requirements vary — most target recent graduates (bachelor's or master's) or very early career professionals (0–2 years experience). Selection is rigorous: case interviews, product sense questions, and behavioral rounds. APM programs are the most structured path into PM at large tech companies. They're highly competitive but produce graduates who are extremely well-positioned for senior PM roles. Apply to 5–10 programs simultaneously if this is your path." },
  { question: "How do I build a PM portfolio without prior PM experience?", answer: "Build a portfolio that demonstrates product thinking, not PM job experience. Concrete approaches: (1) Product teardowns — write detailed analyses of existing products: what's the user problem, what are the key tradeoffs in the current design, what would you change and why? 3–5 thoughtful teardowns demonstrate PM thinking better than job history. (2) Product spec writing — write a full PRD (Product Requirements Document) for a new feature or product. Use a real company's product and propose a specific addition with user research, success metrics, and tradeoffs. (3) Build something — even a simple app or feature demonstrates product decision-making. (4) Side project or business — running any business, even informally, demonstrates product and entrepreneurial judgment. Publish these on your portfolio site and link to them from LinkedIn." },
];

const PATHS = [
  { path: "Internal transfer at current company", difficulty: "Easiest", timeline: "3–12 months", best_for: "Professionals with 2+ years at a tech/product company" },
  { path: "APM / RPM program (large tech)", difficulty: "Hard", timeline: "Application + 6 months", best_for: "Recent grads / early career with strong academic profile" },
  { path: "Startup PM (growth stage)", difficulty: "Medium", timeline: "3–9 months active search", best_for: "Risk-tolerant candidates; equity upside, less structure" },
  { path: "MBA → APM or direct PM", difficulty: "Medium (MBA itself is hard)", timeline: "2+ years (incl MBA)", best_for: "Career changers from non-technical backgrounds" },
  { path: "PM-adjacent role first (BA, PdM, TPM)", difficulty: "Medium", timeline: "6–18 months", best_for: "Building PM adjacent skills before PM title" },
];

export default async function HowToGetIntoProductManagementPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Get Into Product Management 2025 — Complete Transition Guide"
        description="Best PM entry paths, what backgrounds transition well, and how to get your first PM role without prior PM experience."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/how-to-get-into-product-management`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get Into Product Management", url: `${BASE_URL}/blog/how-to-get-into-product-management` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 50%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Product Management · Career Transition · APM
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How to Get Into<br />
            <span className="text-white/50">Product Management</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The five paths into product management, what backgrounds transition best, how to build a PM portfolio, and how to compete for your first PM role in 2025.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 10 min read · For career changers and new grads</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Five paths into product management</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Choose your path based on your background, timeline, and risk tolerance. Internal transfer is the most underused route.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span className="col-span-1">Path</span><span>Difficulty</span><span>Timeline</span><span>Best for</span>
            </div>
            {PATHS.map(({ path, difficulty, timeline, best_for }) => (
              <div key={path} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold col-span-1">{path}</span>
                <span className={`font-semibold ${difficulty === "Easiest" ? "text-[#059669]" : difficulty === "Medium" ? "text-[#D97706]" : "text-[#EF4444]"}`}>{difficulty}</span>
                <span className="text-[var(--muted)] text-[12px]">{timeline}</span>
                <span className="text-[var(--muted)] text-[12px]">{best_for}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">What PM interviews actually test</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { area: "Product sense", desc: "How you think about user problems, product design decisions, and tradeoffs. 'Design an alarm clock for the blind' or 'What feature would you add to Spotify?' Don't jump to solutions — start with user empathy and the problem definition." },
              { area: "Estimation / analytical", desc: "Market sizing and metric estimation. 'How many times a day is Google Maps opened in the US?' Demonstrates structured thinking and comfort with numbers. Practice the MECE approach: segment the population, estimate each segment, sum." },
              { area: "Strategy / GTM", desc: "Product strategy, competitive analysis, and go-to-market thinking. 'How would you launch WhatsApp in Japan?' Shows strategic judgment about market entry, positioning, and sequencing." },
              { area: "Behavioral / leadership", desc: "STAR-format questions about how you've influenced without authority, managed difficult stakeholders, and navigated ambiguity. Strong PMs have clear examples from their actual experience." },
            ].map(({ area, desc }) => (
              <div key={area} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px] text-[#0D7182]">{area}</h3>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Prep for your PM interviews with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">PM-specific interview coaching — product sense, estimation, strategy, and behavioral rounds with instant feedback. Free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Start PM interview prep free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
