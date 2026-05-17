import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Entry-Level Resume — What to Include When You Have No Experience (2025)",
  description:
    "Writing an entry-level resume when you have limited work experience isn't about hiding the gap — it's about knowing what to include instead. A complete guide: every section, what to write, what to avoid, and ATS tips for new graduates.",
  keywords: ["entry level resume", "entry level resume no experience", "new graduate resume", "college student resume", "first job resume", "entry level resume 2025", "resume with no experience"],
  alternates: { canonical: "/blog/entry-level-resume" },
  openGraph: {
    title: "Entry-Level Resume — What to Include When You Have No Experience (2025)",
    description: "Writing an entry-level resume isn't about hiding the gap — it's about knowing what to include instead. Every section explained.",
    url: "/blog/entry-level-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const EXPERIENCE_MYTH = {
  myth: "You can't write a strong resume without work experience",
  truth: "Entry-level resume reviewers know you don't have 10 years of work history — they're looking for evidence that you can learn, work with others, and contribute to a team. The evidence can come from internships, academic projects, clubs, freelance work, volunteer roles, part-time jobs (even unrelated ones), or coursework. The question is not whether you have experience — it's whether you're showing what you have effectively.",
};

const RESUME_SECTIONS = [
  {
    section: "Contact Information",
    include: "Full name, professional email address, city and state (no street address), LinkedIn URL (if your profile is complete), portfolio or GitHub (for technical or creative roles).",
    avoid: "Photos, date of birth, GPA below 3.0 (if it's relevant to mention GPA at all — some employers expect it, most don't), objective statements ('Seeking a position where I can grow...') — replace with a professional summary.",
    ats_note: "ATS systems parse the contact block for email and phone. Use a simple header layout — tables and text boxes often cause parsing errors.",
  },
  {
    section: "Professional Summary (2–3 sentences)",
    include: "Your most relevant skill, what type of role you're targeting, and one specific accomplishment or trait — even from academic or part-time experience. This is your 15-second pitch, not a repetition of your education section.",
    avoid: "'Hardworking, motivated team player looking for an opportunity to grow.' This tells the reader nothing. Every candidate claims this. Instead: 'Computer Science graduate with experience building full-stack web applications in React and Node.js — most recently a capstone project serving 200+ beta users. Looking for a backend engineering role where I can contribute from day one.'",
    ats_note: "The professional summary is one of the most important places to include job-description keywords. Read the JD and mirror the language used to describe the ideal candidate.",
  },
  {
    section: "Education",
    include: "Degree, major, institution, graduation date (or expected graduation date). Relevant coursework (for technical roles or when the course directly matches the job), academic honors, and GPA if 3.5 or above.",
    avoid: "Listing every course you took. List 4–6 that are directly relevant to the target role, labeled as 'Relevant Coursework' — not all 32 courses from your transcript.",
    ats_note: "Education section placement: for entry-level, put it near the top (after the summary). After 2+ years of work experience, move education below your experience section.",
  },
  {
    section: "Experience",
    include: "Internships first, then part-time jobs with transferable skills, then significant campus roles (RA, student org president, teaching assistant). For each: company, title, dates, location, and 2–4 bullet points describing what you did and — when possible — a result.",
    avoid: "Listing only job duties without any indication of scope, volume, or outcome. 'Helped customers' tells the reader nothing. 'Handled 80+ customer transactions per shift as cashier, maintaining 98% accuracy over 14-month tenure' tells them something.",
    ats_note: "For roles that seem unrelated (retail, food service), identify the transferable skill the JD is asking for — communication, reliability, teamwork, handling volume under pressure — and write the bullet toward that skill.",
  },
  {
    section: "Projects",
    include: "Academic capstone projects, personal projects, hackathon work, freelance projects, or open-source contributions — especially for technical, creative, or analytical roles. Include: project name, brief description (1 sentence), technologies/tools used, and a metric or outcome if available.",
    avoid: "Listing school assignments that weren't substantial. A semester project where you wrote a 10-page paper is not a project to list. A project where you built something, analyzed something, or produced something concrete is.",
    ats_note: "Project titles and technology stacks are keyword-searchable. Name the specific tools used: 'React, Node.js, PostgreSQL' rather than 'full-stack technologies.'",
  },
  {
    section: "Skills",
    include: "Technical skills (software, programming languages, tools), certifications, and languages. List skills you would be comfortable being asked about in a technical screen — don't inflate.",
    avoid: "Soft skills in the skills section ('Communication, Teamwork, Problem-Solving') — these belong in your experience bullets as demonstrated behaviors, not as standalone claims. ATS doesn't typically weight soft skills in this section, and human reviewers find them uninformative.",
    ats_note: "The skills section is directly parsed by ATS for keyword matching. Organize by category: 'Languages: Python, JavaScript | Frameworks: React, Django | Tools: Figma, SQL, Tableau.' Named skills are more ATS-readable than paragraph format.",
  },
];

const BULLET_REWRITES = [
  {
    source: "Internship",
    before: "Assisted marketing team with social media content creation",
    after: "Wrote and scheduled 45 LinkedIn and Instagram posts over 10-week internship for B2B software company (12,000 followers); posts averaged 3.2% engagement rate vs. 1.8% company baseline — 3 posts exceeded 500 impressions organically",
    key_change: "Quantity (45 posts), timeline (10 weeks), company context, and a specific performance benchmark replace 'assisted with.'",
  },
  {
    source: "Academic Project",
    before: "Built a web application for my senior capstone project",
    after: "Built full-stack inventory management app (React/Node.js/PostgreSQL) for 10-person capstone team — deployed to 200+ beta users across 3 local businesses; reduced manual inventory tracking time by estimated 4 hours/week per business based on user feedback survey",
    key_change: "Stack named, team size, deployment scale, user count, and a business impact estimate from user feedback replace the vague description.",
  },
  {
    source: "Part-Time Job (Unrelated Field)",
    before: "Worked as a barista at Starbucks during college",
    after: "Served 150+ customers daily as barista during peak shifts; trained 3 new team members on POS system and drink preparation within first 4 months; maintained consistently positive customer feedback ratings throughout 18-month tenure",
    key_change: "Volume (150+ daily), a training/mentoring signal, timeline, and a quality signal replace a job title with no evidence.",
  },
];

const FAQS = [
  { question: "Should I put my GPA on my resume?", answer: "Include it if it's 3.5 or above. For roles in finance, consulting, or law that explicitly require or filter by GPA, include it even if it's 3.3+. Omit it if it's below 3.0 — omission is expected and won't be questioned. If you have a strong major GPA but weaker overall GPA (e.g., major GPA 3.7, cumulative 3.2), you can list 'Major GPA: 3.7' — which is accurate and highlights the relevant performance. After 1–2 years of work experience, GPA becomes less relevant and can be removed regardless of the number." },
  { question: "How long should an entry-level resume be?", answer: "One page — in almost all cases. The rule of thumb is one page per decade of relevant experience, and for entry-level candidates, one page is both appropriate and expected. A two-page resume with limited substance reads as someone who doesn't understand what's worth including. The constraint of one page forces useful editing: it pushes you to keep only the most relevant sections and the strongest bullets." },
  { question: "What should I put on a resume when I have absolutely no experience?", answer: "Build the sections that don't require work experience: (1) Education with relevant coursework; (2) Projects — even a personal or academic project demonstrates initiative and skills; (3) Extracurricular and campus activities — leadership roles in clubs, student government, or organizations; (4) Volunteer experience; (5) Skills — list tools, software, and languages you've genuinely used. If you have none of these, the best move before applying is to create a portfolio project: build something, analyze something, or contribute to open source. A personal project completed in 2–4 weeks is worth more on an entry-level resume than a blank experience section." },
];

export default async function EntryLevelResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Entry-Level Resume — What to Include When You Have No Experience (2025)"
        description="Writing an entry-level resume isn't about hiding the gap — it's about knowing what to include instead. Every section explained."
        url={`${BASE_URL}/blog/entry-level-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Entry-Level Resume", url: `${BASE_URL}/blog/entry-level-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume · New Grad</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Entry-Level Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Writing an entry-level resume isn&apos;t about hiding limited work history — it&apos;s about knowing what to include instead. Every reviewer knows you&apos;re entry-level. They&apos;re looking for evidence of what you can do, not 10 years of it.
          </p>
        </div>
      </section>

      {/* Myth */}
      <section className="bg-[var(--bg)] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex-shrink-0 rounded-lg bg-red-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">Myth</span>
              <div>
                <p className="font-bold text-[var(--ink)]">{EXPERIENCE_MYTH.myth}</p>
                <div className="mt-3 flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 rounded-lg bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Truth</span>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{EXPERIENCE_MYTH.truth}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="bg-[var(--bg)] pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Every resume section — what to include and what to avoid</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Explained specifically for entry-level candidates, with ATS guidance for each section.</p>
          <div className="mt-8 space-y-4">
            {RESUME_SECTIONS.map((item, i) => (
              <div key={item.section} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[12px] font-extrabold text-[var(--brand)]">{i + 1}</span>
                  <h3 className="font-bold text-[var(--ink)]">{item.section}</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2 mb-3">
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Include</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.include}</p>
                  </div>
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Avoid</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.avoid}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--brand)]/[0.04] p-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-[var(--brand)]">ATS note: </span>{item.ats_note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet Rewrites */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before & after: bullet rewrites for entry-level sources</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Internships, academic projects, and unrelated part-time jobs all have strong bullets in them — if you know what to draw out.</p>
          <div className="mt-8 space-y-6">
            {BULLET_REWRITES.map((item) => (
              <div key={item.source} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">Source: {item.source}</p>
                </div>
                <div className="grid gap-0 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">Before</p>
                    <p className="rounded-lg bg-red-50 p-3 text-[13px] italic text-[var(--muted)]">&ldquo;{item.before}&rdquo;</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">After</p>
                    <p className="rounded-lg bg-emerald-50 p-3 text-[13px] italic text-[var(--muted)]">&ldquo;{item.after}&rdquo;</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-[var(--brand)]">Key change: </span>{item.key_change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Optimize your entry-level resume for the specific role you&apos;re applying to.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against the job description — identifies which sections need strengthening, rewrites weak bullets, and coaches you through the interview. Start free, no card required.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
