import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Become a Software Engineer in 2025 — Complete Guide",
  description: "How to become a software engineer in 2025. CS degree vs bootcamp vs self-taught, which programming languages to learn first, how long it takes, and how to get your first SWE job.",
  keywords: ["how to become a software engineer", "become a software engineer", "how to become a developer", "software engineer career", "cs degree vs bootcamp", "learn programming 2025", "first software engineering job", "coding bootcamp", "self taught programmer", "software engineer 2025"],
  alternates: { canonical: "/blog/how-to-become-a-software-engineer" },
  openGraph: { title: "How to Become a Software Engineer in 2025 — Complete Guide", description: "CS degree vs bootcamp vs self-taught, which languages to learn, how long it takes, and how to land your first SWE job.", url: "/blog/how-to-become-a-software-engineer" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How long does it take to become a software engineer?", answer: "Path-dependent: CS degree: 4 years + internship = job-ready in 4–4.5 years. Full-stack coding bootcamp: 3–6 months intensive program + 2–4 months job search = job-ready in 5–10 months. Self-taught: 12–24 months of consistent study to reach hireable level, depending on prior background and hours invested. These are averages — motivated learners following structured curricula consistently reach hireable status in 12–18 months without a degree. The critical factor isn't the path — it's whether you've built real projects that demonstrate competence. A portfolio of 3–5 real projects matters more than any credential in early career hiring." },
  { question: "Is a CS degree required to become a software engineer?", answer: "No — and the data backs this up. Multiple surveys of professional developers show 30–40% are self-taught or came through bootcamps. FAANG and top tech companies officially require a degree or equivalent experience — in practice, this means a strong portfolio and passing technical screens can substitute. Specific contexts where a CS degree matters most: FAANG companies (Google, Meta, Amazon) typically prefer CS degrees for new grad hires; government and defense contracting roles often require degrees; research or ML roles at top labs almost always require advanced degrees. For the vast majority of SWE roles at startups, mid-size companies, and product companies, demonstrated ability > credential." },
  { question: "Which programming language should I learn first?", answer: "Python or JavaScript — depending on your target. Python: data science, backend development, scripting, AI/ML. If you're interested in anything AI-adjacent, Python is essential. JavaScript/TypeScript: web development (frontend and backend via Node.js), the most ubiquitous language for new web applications. It's the only language that runs in browsers, making it essential for frontend work. Both are genuinely good first choices. If you're unsure: Python is arguably the better foundational language (cleaner syntax, forces good habits, teaches concepts well). JavaScript is better if you want to see your work in a browser immediately, which is motivating. After your first language, learn the second — most working engineers use both." },
  { question: "What does a software engineering interview look like in 2025?", answer: "The standard software engineering interview at most companies in 2025 consists of: (1) Recruiter screen (30 min) — background and basic communication check. (2) Technical phone screen or HackerRank/online assessment (60–90 min) — 1–2 coding problems, usually easy-medium LeetCode difficulty. (3) Virtual onsite (3–5 rounds): coding rounds (2–3 rounds, medium-hard LeetCode), system design round (for mid-to-senior level), behavioral round. FAANG adds a 'bar raiser' round. For entry-level roles: typically 1–2 coding screens and 1 behavioral round. The LeetCode question bank is the gold standard for preparation — focus on arrays, hashmaps, trees, and graphs first. Practice explaining your thinking out loud as much as the code itself." },
];

const PATHS = [
  { path: "4-year CS degree", cost: "$20,000–$200,000+", time: "4 years", outcome: "Strongest path to FAANG/research roles; foundational depth", signal: "High" },
  { path: "Coding bootcamp", cost: "$10,000–$20,000", time: "3–6 months", outcome: "Entry-level web/full-stack roles; portfolio-dependent", signal: "Medium" },
  { path: "Self-taught + portfolio", cost: "$0–$2,000", time: "12–24 months", outcome: "Entry-level roles at startups; strong portfolio required", signal: "Portfolio-dependent" },
  { path: "CS degree + bootcamp", cost: "$30,000–$220,000", time: "4–4.5 years", outcome: "Strongest signal at all levels; bootcamp adds portfolio", signal: "Very High" },
  { path: "Online degree (WGU, etc.)", cost: "$7,000–$15,000", time: "2–3 years", outcome: "CS credential at fraction of cost; growing employer acceptance", signal: "Medium-High" },
];

export default async function HowToBecomeSoftwareEngineerPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Become a Software Engineer in 2025 — Complete Guide"
        description="CS degree vs bootcamp vs self-taught, which languages to learn, how long it takes, and how to land your first SWE job."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/how-to-become-a-software-engineer`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Become a Software Engineer", url: `${BASE_URL}/blog/how-to-become-a-software-engineer` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Software Engineering · Career · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How to Become a<br />
            <span className="text-white/50">Software Engineer</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            CS degree vs bootcamp vs self-taught — which path to take, which languages to learn first, how long it takes, and how to land your first SWE job in 2025.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 10 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Paths to becoming a software engineer</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Five paths compared by cost, time, and employer signal. &ldquo;Signal&rdquo; = how much the credential helps you get interviews.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-5 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Path</span><span>Cost</span><span>Time</span><span>Outcome</span><span>Signal</span>
            </div>
            {PATHS.map(({ path, cost, time, outcome, signal }) => (
              <div key={path} className="grid grid-cols-5 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{path}</span>
                <span className="text-[var(--muted)] text-[12px]">{cost}</span>
                <span className="text-[var(--muted)] text-[12px]">{time}</span>
                <span className="text-[var(--muted)] text-[12px]">{outcome}</span>
                <span className={`font-semibold text-[12px] ${signal.includes("High") ? "text-[#059669]" : "text-[#D97706]"}`}>{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">What to learn, in order</h2>
          <div className="space-y-4">
            {[
              { step: "1. Pick one language and go deep", content: "Python or JavaScript. Don't try to learn both simultaneously. Spend 2–3 months on fundamentals: variables, data types, control flow, functions, classes. Build something small with it before moving on." },
              { step: "2. Learn data structures and algorithms", content: "Arrays, linked lists, stacks, queues, trees, graphs, hash maps. These are what coding interviews test. Start with LeetCode Easy problems after you know the fundamentals — they're a direct gauge of interview readiness." },
              { step: "3. Learn a web framework or ecosystem", content: "React + Node.js for JavaScript. Django or FastAPI for Python backend. This enables you to build real, full-stack web applications — the most common entry-level SWE role." },
              { step: "4. Build 3–5 real projects", content: "Not tutorial projects — original ideas, even simple ones. A to-do app you built yourself teaches more than following a YouTube tutorial. Deploy them publicly. These are your interview portfolio." },
              { step: "5. Practice coding interviews", content: "LeetCode medium problems consistently for 6–8 weeks before applying to roles that have coding screens. Practice explaining your approach as you code — interviewers are testing communication as much as problem-solving." },
            ].map(({ step, content }) => (
              <div key={step} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px] text-[#059669]">{step}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{content}</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #059669 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land your first SWE job with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Resume ATS optimization, coding interview prep, and behavioral coaching for software engineering roles — free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#059669]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
