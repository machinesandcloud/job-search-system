import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs LinkedIn Learning — Career Coaching vs Online Courses (2025)",
  description:
    "LinkedIn Learning teaches skills through video courses. Zari coaches your active job search — resume, interviews, and negotiation. Different tools for different career stages. Here's how to choose.",
  keywords: ["zari vs linkedin learning", "linkedin learning alternative", "linkedin learning vs ai career coach", "career development tools", "online learning career", "linkedin learning review 2025"],
  alternates: { canonical: "/compare/zari-vs-linkedin-learning" },
  openGraph: {
    title: "Zari vs LinkedIn Learning — Career Coaching vs Online Courses (2025)",
    description: "LinkedIn Learning teaches skills. Zari wins job offers. They solve different problems — see which one fits your current career stage.",
    url: "/compare/zari-vs-linkedin-learning",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_TASKS = [
  {
    task: "Learning new technical skills",
    linkedInLearning: { verdict: "LinkedIn Learning wins", score: "win", detail: "LinkedIn Learning's library spans 21,000+ courses across software development, data science, design, business, and professional skills. For foundational technical learning — Python, SQL, cloud platforms, UX design — the structured video format with exercise files is genuinely effective. The breadth makes it one of the strongest e-learning libraries available at its price point, particularly for software and business disciplines." },
    zari: { verdict: "Not applicable", score: "na", detail: "Zari isn't a learning platform and doesn't teach skills. If you're in a skills-gap phase before your job search, LinkedIn Learning is the right tool. Return to Zari when you're actively applying — Zari optimizes how you present the skills you've built." },
  },
  {
    task: "Resume optimization for job applications",
    linkedInLearning: { verdict: "LinkedIn Learning doesn't help directly", score: "loss", detail: "LinkedIn Learning has resume-writing courses — but they teach general principles, not personalized feedback on your actual document. You'll watch videos about bullet structure and action verbs, but you won't get analysis of whether your specific resume is aligned to a specific job description's ATS requirements." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari analyzes both your resume and the target job description, identifies keyword gaps, flags weak bullets, and suggests specific rewrites — for your actual experience, for each specific role. This is the difference between a cooking class (LinkedIn Learning) and a chef reviewing your dish (Zari). The ATS optimization is per-application, not generic advice." },
  },
  {
    task: "Interview preparation",
    linkedInLearning: { verdict: "LinkedIn Learning has courses", score: "partial", detail: "LinkedIn Learning offers interview prep courses covering behavioral questions (STAR framework), common question types, and body language coaching. The video format is instructional — you learn frameworks. However, there's no interactive mock interview, no personalized question bank based on your target role, and no feedback on your actual answers." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari generates interview questions based on the specific job description you're targeting, coaches you through the STAR structure for your actual experience, and provides feedback on answer quality. The difference: LinkedIn Learning teaches you how to answer behavioral questions in general; Zari prepares you for the questions 'this team' is likely to ask, with answers grounded in your specific background." },
  },
  {
    task: "Salary and offer negotiation",
    linkedInLearning: { verdict: "LinkedIn Learning has negotiation courses", score: "partial", detail: "LinkedIn Learning has negotiation courses (some taught by respected practitioners) that cover anchoring, counteroffer framing, and BATNA. These are educational — they build conceptual understanding. However, there's no support for your live negotiation: no coaching on your actual offer numbers, no role-specific benchmark data, and no conversation practice for the negotiation call itself." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari engages with your actual offer: base salary, equity, bonus structure, and benefits. It coaches you on what to counter, how to frame it, and what language to use in the negotiation conversation. It's the difference between reading a book on poker strategy and having a coach review your specific hand before you bet. The value shows up in the actual offer, not in theoretical understanding." },
  },
  {
    task: "LinkedIn profile optimization",
    linkedInLearning: { verdict: "LinkedIn Learning has LinkedIn-specific courses", score: "partial", detail: "LinkedIn Learning offers courses on LinkedIn profile optimization — ironic, but real. These courses cover headline writing, About section structure, and how to use LinkedIn's algorithm effectively. They're instructional and general." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari provides feedback on your actual LinkedIn profile: headline rewrites, About section improvements, and skills-section recommendations — all tuned to your target roles. Not generic tips but specific edits. The practical output is a profile that ranks better in recruiter searches and generates more inbound interest in your actual industry." },
  },
  {
    task: "Certificates and credentials for your profile",
    linkedInLearning: { verdict: "LinkedIn Learning wins", score: "win", detail: "LinkedIn Learning certificates display directly on your LinkedIn profile with a LinkedIn badge — unique to the platform. For roles where demonstrated learning commitment matters (career changers, people re-entering a field, those lacking formal credentials in a skill area), completing a LinkedIn Learning certificate adds visible credibility that links directly to the course curriculum." },
    zari: { verdict: "Not applicable", score: "na", detail: "Zari doesn't issue certificates or credentials. If a certificate from a credible source would strengthen your profile for your target roles, LinkedIn Learning is worth considering — particularly for Microsoft technologies (where LinkedIn Learning is deeply integrated with the Microsoft certification ecosystem)." },
  },
  {
    task: "Active job search momentum and accountability",
    linkedInLearning: { verdict: "LinkedIn Learning is passive", score: "loss", detail: "Courses are self-paced without external deadlines, accountability structures, or application tracking. Starting a course is easy; completing it and translating learning into job search outcomes requires self-discipline that the platform doesn't reinforce. Many users accumulate course starts without completion or career outcomes." },
    zari: { verdict: "Zari wins", score: "win", detail: "Zari is built around an active job search — each session is tied to a job description, an application, or a preparation task. The work product is tangible: a tailored resume, interview answers, an offer analysis. This application-driven loop creates momentum that learning-only tools can't replicate." },
  },
];

const WHEN_TO_USE = [
  {
    stage: "Skills gap phase",
    recommendation: "LinkedIn Learning",
    detail: "If you're missing credentials for your target roles — learning a new language, filling a certification gap, or transitioning into a new field — LinkedIn Learning is the right tool. Build the skill first, then switch to Zari when you're ready to apply.",
  },
  {
    stage: "Active application phase",
    recommendation: "Zari",
    detail: "Once you have the skills and are actively applying, Zari delivers more ROI than LinkedIn Learning. Every hour in Zari goes directly to applications in motion: resume tailoring, interview preparation, and negotiation coaching.",
  },
  {
    stage: "Long-term career development (not actively searching)",
    recommendation: "LinkedIn Learning",
    detail: "If you're settled in a role but investing in skills for future mobility, LinkedIn Learning's library makes sense. Build breadth during the stable periods so you have more options when you eventually want to move.",
  },
  {
    stage: "Offer in hand or final rounds",
    recommendation: "Zari",
    detail: "With a live offer or final-round interview, Zari's focused coaching delivers the highest immediate return. Negotiation coaching alone can recover more than a year's subscription cost in a single offer.",
  },
];

const FAQS = [
  { question: "Is LinkedIn Learning worth the monthly subscription?", answer: "It depends on your career stage. LinkedIn Learning costs roughly $40/month standalone (often included in LinkedIn Premium). The value is highest if you're actively consuming multiple courses in a skills-gap phase, or if your employer reimburses it. The breadth is genuine — 21,000+ courses is serious depth. The weakness is completion rate: most subscribers start more courses than they finish, and the career impact correlates with completion, not enrollment. If you're actively applying to jobs, the subscription cost is probably better directed toward Zari. If you're building skills for future applications, LinkedIn Learning's library is worth it." },
  { question: "Can LinkedIn Learning certificates actually help you get hired?", answer: "It depends on the certificate and the role. LinkedIn Learning certificates carry more weight in some domains (Microsoft tech stack, data analysis basics, project management) and almost no weight in others (design, engineering, strategy). They're most useful for career changers demonstrating initiative in a new field, or for filling a credential gap when you lack formal education in an area. They're least useful as a substitute for portfolio work, relevant experience, or stronger credentials. In technical fields, a LinkedIn Learning course in Python matters less than a GitHub repo demonstrating Python you can actually write." },
  { question: "Does LinkedIn Learning improve your LinkedIn profile's search ranking?", answer: "Completing LinkedIn Learning courses and displaying them on your profile adds skill signals to your LinkedIn presence, which can improve visibility in recruiter searches for those skill terms. However, the algorithmic weight given to LinkedIn Learning certificates is modest compared to recommendations, endorsements, and activity signals. The profile optimization impact is real but incremental — not a substitute for the headline, About section, and skills-section work that Zari provides, but a complementary signal." },
];

export default async function ZariVsLinkedInLearningPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs LinkedIn Learning", url: `${BASE_URL}/compare/zari-vs-linkedin-learning` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · Career Development</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs LinkedIn Learning</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            LinkedIn Learning teaches skills through video courses. Zari coaches your active job search. They solve different problems at different career stages — both can be worth using.
          </p>
        </div>
      </section>

      {/* The core distinction */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-3">The core distinction</p>
            <p className="text-[14px] leading-7 text-[var(--muted)]">LinkedIn Learning is a skills library — it makes you more capable over time. Zari is a job-search engine — it converts your existing capabilities into offers. Using LinkedIn Learning when you need job search help is like reading about swimming when you need a lifeguard. Use the right tool for the right phase.</p>
          </div>
        </div>
      </section>

      {/* Task-by-task comparison */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Task-by-task comparison</h2>
          <div className="mt-6 space-y-5">
            {COMPARISON_TASKS.map((row) => (
              <div key={row.task} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.linkedInLearning.score === "win" ? "text-emerald-600" : row.linkedInLearning.score === "partial" ? "text-amber-500" : "text-red-500"}`}>
                      LinkedIn Learning — {row.linkedInLearning.verdict}
                    </p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.linkedInLearning.detail}</p>
                  </div>
                  <div className="p-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${row.zari.score === "win" ? "text-[#4361EE]" : row.zari.score === "partial" ? "text-amber-500" : "text-[var(--muted)]"}`}>
                      Zari — {row.zari.verdict}
                    </p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to use which */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Which tool fits your career stage</h2>
          <div className="mt-6 space-y-4">
            {WHEN_TO_USE.map((item) => (
              <div key={item.stage} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <div className="flex flex-wrap gap-3 items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[var(--ink)]">{item.stage}</p>
                    <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                  <span className={`flex-shrink-0 rounded-full px-3 py-1 text-[11px] font-bold ${item.recommendation === "Zari" ? "bg-[var(--brand)]/10 text-[#4361EE]" : "bg-emerald-50 text-emerald-700"}`}>
                    → {item.recommendation}
                  </span>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Ready to convert your skills into offers? That&apos;s Zari&apos;s job.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">If you&apos;ve built the skills and are ready to apply, Zari tailors your resume, prepares you for interviews, and coaches your negotiation — for the specific roles you want. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
