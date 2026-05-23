import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Internship Resume — How to Write One With No Experience (2025)",
  description:
    "Most internship applicants make the same mistake: they try to hide what they don't have. Hiring managers reviewing internship applications aren't looking for work experience — they're looking for signals that you're the kind of person who will get the most out of an internship. What actually works, with examples.",
  keywords: ["internship resume", "how to write a resume for an internship", "internship resume with no experience", "college internship resume", "internship resume examples", "resume for first internship", "internship resume template 2025", "internship resume skills"],
  alternates: { canonical: "/blog/internship-resume" },
  openGraph: {
    title: "Internship Resume — How to Write One With No Experience (2025)",
    description: "Internship hiring managers aren't looking for work experience — they're looking for curiosity, initiative, and coachability. What signals to surface and how.",
    url: "/blog/internship-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const THE_CORE_INSIGHT = {
  rule: "An internship resume isn't a shorter version of a work resume — it's a different document with a different audience.",
  detail: "Hiring managers reading internship applications know you don't have 5 years of experience. They're looking for a different set of signals: intellectual curiosity, initiative, relevant coursework or projects, and evidence that you can learn fast and contribute meaningfully in 12 weeks. The resume that gets you an internship surfaces those signals prominently — not the absence of professional experience.",
};

const WHAT_TO_INCLUDE = [
  {
    section: "Education (lead with it)",
    guidance: "For internship applicants, education comes first — before any experience. Include: university name, degree and major, expected graduation date, and GPA if 3.5 or above. Add relevant coursework (3-5 courses most directly related to the role), honors and awards, and relevant academic projects. GPA matters more for internships than for full-time roles — many firms (especially consulting, finance, and accounting) have GPA cutoffs for internship applications.",
    example: "University of Michigan, B.S. Computer Science, Expected May 2026 | GPA: 3.7/4.0\nRelevant Coursework: Data Structures & Algorithms, Machine Learning, Database Systems, Software Engineering\nHonors: Dean's List (4 semesters), Merit Scholarship Recipient",
  },
  {
    section: "Projects (often more important than experience)",
    guidance: "Academic projects, personal projects, and hackathon work are the internship resume's equivalent of work experience. Treat them like job bullets: name the project, describe what you built or contributed, and quantify impact where possible (GitHub stars, users, accuracy improvement, time saved). A strong project section beats a list of unrelated part-time jobs every time.",
    example: "Personal Finance Dashboard | Python, FastAPI, React, PostgreSQL\nBuilt full-stack web app that aggregates transactions from 3 banks via Plaid API — 200+ active users; featured in university's annual tech showcase\nImplemented categorization ML model (scikit-learn, 91% accuracy) replacing manual transaction labeling",
  },
  {
    section: "Work experience (include even if unrelated)",
    guidance: "Don't exclude work experience because it seems unrelated. A barista job demonstrates reliability, customer interaction, and working under pressure. A retail job shows communication and sales skills. Frame the bullets to emphasize the transferable signals: accountability, initiative, communication, and working as part of a team — then let the project section carry the technical weight.",
    example: "Shift Supervisor | Campus Coffee Shop | Sep 2023 – Present\nManaged 3-person team during peak hours serving 150+ customers daily; promoted to supervisor after 4 months\nIdentified inventory tracking gap; built simple spreadsheet system that reduced weekly shrinkage by 18%",
  },
  {
    section: "Skills",
    guidance: "For technical internships: list programming languages, frameworks, and tools by proficiency tier. Don't list skills you can't discuss in an interview. For non-technical internships: include relevant software (Excel/advanced, Salesforce, Figma), languages spoken, and any certifications or assessments. Keep it honest — 'Python (learning)' is better than claiming expert-level Python you can't demonstrate.",
    example: "Languages: Python (proficient), SQL (proficient), JavaScript (learning)\nTools: Git, VS Code, Jupyter Notebook, Excel (pivot tables, VLOOKUP), Figma (basic)\nCertifications: Google Analytics certified, Bloomberg Market Concepts",
  },
  {
    section: "Activities and leadership",
    guidance: "Campus involvement signals the kind of person you are. Clubs, student organizations, volunteer work, and competitive teams demonstrate initiative and the ability to contribute outside of required academic work. Lead with roles, not just membership: 'Vice President, Data Science Club' is signal; 'Member, Data Science Club' is noise. If you led anything — an event, a project, a team — make that visible.",
    example: "VP of Operations | Data Science @ Michigan | 2023 – Present\nOrganized 3 industry speaker events (avg 80 attendees); led team of 4 building club's project portfolio website",
  },
];

const COMMON_MISTAKES = [
  { mistake: "Using an objective statement instead of a summary", fix: "Objective statements ('Seeking an internship where I can apply my skills') tell hiring managers what you want. A summary or skills overview shows what you bring. Skip the objective entirely — most internship resumes don't need a summary either. Lead with education." },
  { mistake: "Listing every tool you've ever touched", fix: "Internship hiring managers don't expect expertise — but they do expect honesty. Listing 10 programming languages you barely know raises more red flags than listing 3 you can actually work with. Keep the skills section to tools you can discuss confidently in an interview." },
  { mistake: "Writing responsibilities instead of accomplishments", fix: "Even for part-time and campus jobs, write what you achieved, not just what you were assigned. 'Responsible for customer service' becomes 'Handled 80+ customer inquiries per shift with 4.9/5 satisfaction score.' Numbers are not required — but outcomes are." },
  { mistake: "A 2-page resume", fix: "Internship resumes should be exactly one page. You don't have enough experience to justify two pages — and a one-page resume that's well-organized demonstrates that you can edit, prioritize, and communicate concisely. These are skills internship hiring managers care about." },
  { mistake: "Not tailoring for the specific internship", fix: "The same resume sent to 50 internships will perform worse than a tailored resume sent to 10. Read the job description, identify the 3-4 most important qualifications, and make sure each one is surfaced somewhere on your resume — in coursework, projects, or experience." },
];

const FAQS = [
  { question: "What do you put on an internship resume if you have no experience at all?", answer: "If you have no work experience at all: lead with education (including GPA, relevant coursework, and honors), then projects (academic and personal — even a class project where you built something real counts), then skills (tools you've used in class or self-learning), then activities and leadership. Be specific about projects: 'Built a weather app in React as a side project' is more compelling than 'Interested in web development.' The key is to fill the resume with concrete things you've done, even if none of them were paid professional work." },
  { question: "Should you include your GPA on an internship resume?", answer: "Include your GPA if it's 3.5 or above. For GPAs between 3.0 and 3.4: use judgment based on the internship type — consulting and finance firms often have explicit GPA cutoffs (3.5+) and a lower GPA in those applications is actively filtered; for tech and general business internships, a 3.2 is unlikely to be decisive if your projects and experience are strong. Below 3.0: don't include it unless specifically required by the application. Never round up or misrepresent your GPA — these are verified during background checks at most firms that ask for them." },
  { question: "How long should an internship resume be?", answer: "One page. No exceptions at the undergraduate student level. Internship hiring managers review hundreds of applications, and a two-page internship resume signals either poor judgment about what's important or an inability to edit — both of which are negative signals for someone they're considering training. If you're struggling to fill one page: add a projects section, expand your coursework list, or add activities and leadership. If you're overflowing a page: cut the unrelated experience down to 2 bullets, trim the skills to what's actually relevant to the role, and remove the objective statement if you have one." },
];

export default async function InternshipResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Internship Resume — How to Write One With No Experience (2025)"
        description="Internship hiring managers aren't looking for work experience — they're looking for curiosity, initiative, and coachability. What signals to surface and how."
        url={`${BASE_URL}/blog/internship-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Internship Resume", url: `${BASE_URL}/blog/internship-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Students & Early Career</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Internship Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Internship hiring managers aren&apos;t looking for work experience — they know you don&apos;t have it. They&apos;re looking for curiosity, initiative, and signals that you&apos;ll get the most out of 12 weeks. Here&apos;s how to surface those signals.
          </p>
        </div>
      </section>

      {/* Core insight */}
      <section className="bg-[var(--bg)] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-2">The key insight</p>
            <p className="text-[15px] font-semibold leading-7 text-[var(--ink)] mb-2">{THE_CORE_INSIGHT.rule}</p>
            <p className="text-[13.5px] leading-6 text-[var(--muted)]">{THE_CORE_INSIGHT.detail}</p>
          </div>
        </div>
      </section>

      {/* What to include */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to include — and how</h2>
          <div className="mt-6 space-y-4">
            {WHAT_TO_INCLUDE.map((item) => (
              <div key={item.section} className="rounded-2xl border border-[var(--border)] p-5">
                <p className="font-bold text-[var(--ink)] text-[16px]">{item.section}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.guidance}</p>
                <div className="mt-3 rounded-xl bg-[var(--bg)] px-4 py-3 font-mono text-[11.5px] leading-6 text-[var(--muted)] whitespace-pre-line">{item.example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common internship resume mistakes</h2>
          <div className="mt-6 space-y-3">
            {COMMON_MISTAKES.map((item) => (
              <div key={item.mistake} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Mistake</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.mistake}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Fix</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.fix}</p>
                  </div>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your internship resume for the specific role.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes the internship job description, identifies the signals hiring managers are screening for, and rewrites your projects and experience bullets to match — with ATS keyword validation. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
