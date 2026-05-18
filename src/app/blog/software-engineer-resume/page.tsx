import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Software Engineer Resume — Examples, Templates & ATS Tips (2025)",
  description:
    "How to write a software engineer resume that passes ATS and impresses hiring managers. With real examples for junior, mid-level, and senior engineers — plus what to never include.",
  keywords: ["software engineer resume", "software engineer resume examples", "software engineer resume template", "SWE resume", "how to write a software engineer resume", "senior software engineer resume"],
  alternates: { canonical: "/blog/software-engineer-resume" },
  openGraph: {
    title: "Software Engineer Resume — Examples, Templates & ATS Tips (2025)",
    description: "The complete guide to writing a software engineer resume that beats ATS and gets interviews at top companies.",
    url: "/blog/software-engineer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const RESUME_SECTIONS = [
  {
    section: "Header & contact",
    accent: "#0D7182",
    do: "Name, location (city/state is enough), LinkedIn URL, GitHub URL, and a professional email. That's it.",
    dont: "Full street address, headshot, date of birth, or a photo. ATS systems can fail on images; photos introduce bias risk.",
    example: "Jane Chen | San Francisco, CA | linkedin.com/in/janechen | github.com/janechen | jane@email.com",
  },
  {
    section: "Technical skills",
    accent: "#7C3AED",
    do: "Group by category: Languages, Frameworks, Databases, Cloud/Infra, Tools. Match your exact skill names to the job description — 'React.js' and 'React' are different strings to some ATS parsers.",
    dont: "Skill bars or ratings ('Python ████░ 4/5'), vague terms like 'proficient in various languages', or listing things you'd need to Google in an interview.",
    example: "Languages: Python, TypeScript, Go | Frameworks: React, FastAPI, Django | Cloud: AWS (EC2, S3, Lambda, RDS) | Databases: PostgreSQL, Redis | Tools: Docker, Kubernetes, GitHub Actions",
  },
  {
    section: "Experience bullets",
    accent: "#DC2626",
    do: "Lead with an action verb, include what you built/changed/improved, and quantify the outcome. Every bullet should answer: 'so what?'",
    dont: "Job descriptions ('Responsible for maintaining backend services'), vague ownership ('Worked on the auth system'), or unmeasured impact ('Improved performance significantly').",
    example: `"Reduced API p99 latency from 340ms to 47ms by rewriting the session lookup layer to use Redis with a write-through cache — serving 2.4M requests/day with zero cache invalidation bugs over 14 months."`,
  },
  {
    section: "Projects (when to include)",
    accent: "#D97706",
    do: "Include projects when they demonstrate skills not visible in your work history, or when you're earlier in career. 2-3 projects max, with a GitHub link and a concrete metric or scale stat.",
    dont: "Tutorial projects you followed along with, course projects listed without original contribution, or projects with no measurable detail ('Built a web app using React').",
    example: `"Distributed key-value store (github.com/user/kv) — implemented Raft consensus in Go from scratch; handles 50K ops/sec in local benchmarks with linearizable reads. 280 GitHub stars."`,
  },
  {
    section: "Education",
    accent: "#059669",
    do: "Degree, school, graduation year. Add relevant coursework only if you're a new grad with limited experience — and only coursework that directly maps to the role. GPA only if 3.5+ and within 3 years of graduation.",
    dont: "High school details, GPA below 3.5, graduation year that's more than 5 years ago if you're a senior engineer (it ages you without adding value).",
    example: "B.S. Computer Science, UC Berkeley, 2023 | Relevant coursework: Distributed Systems, Database Systems, Operating Systems",
  },
];

const LEVEL_DIFFERENCES = [
  {
    level: "New grad / junior (0–2 yrs)",
    accent: "#059669",
    emphasis: "Projects, coursework, internships",
    bulletFocus: "What you built and the technical choices you made — even in academic or personal projects",
    lengthTarget: "1 page, strictly",
    keyMistake: "Padding with irrelevant work history (barista, retail) or listing every language touched in a bootcamp",
    zariHelps: "Identifying which projects signal the most to hiring managers and writing bullets that make academic work sound credible",
  },
  {
    level: "Mid-level (2–6 yrs)",
    accent: "#7C3AED",
    emphasis: "System ownership, cross-team impact, measurable outcomes",
    bulletFocus: "Scale of systems you owned, performance/reliability improvements, and influence beyond your immediate tasks",
    lengthTarget: "1 page (tight) or beginning of 2 if truly necessary",
    keyMistake: "Writing bullets that read like a junior — 'implemented feature X' without any context of scope, scale, or decision-making",
    zariHelps: "Elevating mid-level bullets from task descriptions to ownership narratives that read at the next level",
  },
  {
    level: "Senior (6–12 yrs)",
    accent: "#DC2626",
    emphasis: "Technical leadership, architecture decisions, org-level impact",
    bulletFocus: "Systems you designed end-to-end, problems you defined (not just solved), engineers you influenced or mentored, business outcomes tied to technical decisions",
    lengthTarget: "1–2 pages; cut anything older than 10 years",
    keyMistake: "A senior resume that reads like a long mid-level resume — more bullets but the same individual contributor framing",
    zariHelps: "Reframing individual contributions as architectural decisions and translating technical depth into business language for non-technical hiring managers",
  },
  {
    level: "Staff / principal (12+ yrs or staff-leveled)",
    accent: "#D97706",
    emphasis: "Cross-org influence, multi-year technical bets, engineering culture",
    bulletFocus: "Company-wide technical initiatives, how you shaped the technical roadmap, where you created leverage across multiple teams",
    lengthTarget: "2 pages, maybe 3 for unusually rich careers",
    keyMistake: "Treating a staff resume like a senior resume with more experience — staff is a different frame entirely (scope, not depth)",
    zariHelps: "Positioning the resume for staff-level reads where hiring managers are looking for a different kind of evidence — organizational leverage, not just technical execution",
  },
];

const ATS_RULES = [
  { rule: "Use standard section headings", detail: "ATS parsers look for 'Work Experience', 'Education', 'Skills' — not creative variations like 'Where I've Worked' or 'Things I Know'." },
  { rule: "Avoid tables, columns, and text boxes", detail: "Two-column resume layouts are popular in design templates but many ATS systems can't parse text from multiple columns correctly. Use a single-column layout." },
  { rule: "Submit as PDF unless told otherwise", detail: "PDFs preserve formatting. DOCX files can reflow unpredictably. If the application says 'Word only', use Word — but default to PDF." },
  { rule: "Match job description keywords exactly", detail: "If the JD says 'React.js', don't write 'ReactJS'. If it says 'CI/CD pipelines', include that exact phrase. ATS keyword matching is often literal." },
  { rule: "Don't embed skills only in graphics or icons", detail: "Skills shown as icon badges or graphical meter bars are invisible to ATS — they're images. List everything in text." },
];

const FAQS = [
  { question: "How long should a software engineer resume be?", answer: "Junior and mid-level engineers: 1 page. Senior engineers: 1–2 pages. Staff and principal engineers: 2 pages, possibly 3 for unusually rich careers. The rule isn't a page limit — it's cutting anything that doesn't add signal. If your 2-page senior resume is dense with relevant, quantified accomplishments, it's fine. If it's two pages because you listed every technology you touched in 2014, cut it." },
  { question: "Should I include a resume objective or summary?", answer: "Only if you're making a non-obvious transition (different industry, different role type, different level). If you're a software engineer applying for a software engineering role, a summary wastes prime real estate. Lead with your skills section and experience. The exception: staff-and-above engineers where a 3-sentence leadership framing can set the read for the rest of the resume." },
  { question: "What should I put in the skills section?", answer: "Group by category (Languages, Frameworks, Cloud, Tools, Databases) and list only skills you could answer interview questions about. Listing a language you touched once in 2019 will hurt you when you can't answer questions about it. Order within categories by relevance to the target role — put the most important skills first." },
  { question: "How do I quantify achievements when I don't track metrics?", answer: "Work backwards: How many users did the system serve? What was the load? What scale did the database grow to? How long did a process take before vs. after? What was the team size? Revenue of the product? Even rough estimates with clear methodology are better than no numbers — 'approximately 50K daily active users based on monthly active user counts' is credible and informative." },
];

export default async function SoftwareEngineerResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Software Engineer Resume — Examples, Templates & ATS Tips (2025)"
        description="The complete guide to writing a software engineer resume that beats ATS and gets interviews at top companies."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/software-engineer-resume`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Software Engineer Resume", url: `${BASE_URL}/blog/software-engineer-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</span>
            <span className="text-[11px] text-white/30">13 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Software engineer resume<br /><span className="gradient-text-animated">examples, ATS rules & what actually works</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most SWE resumes fail before a human reads them. Not because the experience is weak — because the format, framing, or keyword matching is off. This guide covers every section, all four career levels, and the ATS rules that determine whether your resume gets read.
          </p>
        </div>
      </section>

      {/* Animated stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={75} suffix="%" label="Resumes rejected by ATS before a human sees them" accent="#DC2626" />
            <StatCard value={6} suffix="s" label="Average time a recruiter spends on the first scan" accent="#D97706" />
            <StatCard value={3} suffix="x" label="More interviews with quantified achievement bullets" accent="#059669" />
            <StatCard value={92} suffix="%" label="Of FAANG-level job descriptions require keyword matching" accent="#7C3AED" />
          </div>
        </div>
      </section>

      {/* Section-by-section */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Every section — what to do and what to never do</h2>
          <div className="mt-8 space-y-5">
            {RESUME_SECTIONS.map((s) => (
              <div key={s.section} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: s.accent, borderLeftWidth: 4 }}>
                  <p className="font-extrabold text-[var(--ink)]">{s.section}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="px-5 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Do this</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{s.do}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500">Not this</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{s.dont}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: s.accent }}>Example</p>
                  <p className="font-mono text-[12px] leading-5 text-[var(--ink)]">{s.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Level differences */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How the resume changes by career level</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The structure is the same. The emphasis, framing, and signal are completely different.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {LEVEL_DIFFERENCES.map((lvl) => (
              <div key={lvl.level} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="px-6 py-4 border-b border-[var(--border)]" style={{ borderTopColor: lvl.accent, borderTopWidth: 3 }}>
                  <p className="font-extrabold text-[var(--ink)]">{lvl.level}</p>
                  <p className="mt-1 text-[11px] font-semibold" style={{ color: lvl.accent }}>Target length: {lvl.lengthTarget}</p>
                </div>
                <div className="px-6 py-5 space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">Lead with</p>
                    <p className="text-[13px] text-[var(--ink)]">{lvl.emphasis}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">Bullet focus</p>
                    <p className="text-[13px] leading-5 text-[var(--muted)]">{lvl.bulletFocus}</p>
                  </div>
                  <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-600 mb-1">Most common mistake</p>
                    <p className="text-[12.5px] text-red-800 leading-5">{lvl.keyMistake}</p>
                  </div>
                  <div className="rounded-lg border border-[var(--brand)]/15 bg-[var(--brand)]/[0.04] px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">Zari coaches</p>
                    <p className="text-[12.5px] text-[var(--muted)] leading-5">{lvl.zariHelps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS rules */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 ATS rules that determine whether your resume gets read</h2>
          <div className="mt-8 space-y-3">
            {ATS_RULES.map((rule, i) => (
              <div key={rule.rule} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{rule.rule}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{rule.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Software engineer resume FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your resume ATS-scored and rewritten by AI.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari scores your resume against the job description, identifies keyword gaps, and rewrites bullets at your career level — then coaches you through interviews and negotiation.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
