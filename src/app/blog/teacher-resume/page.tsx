import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Teacher Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "How to write a teacher resume that passes school district ATS systems and impresses principals — with before/after bullet examples for elementary, middle, high school, and special education teachers, plus ATS keywords by subject.",
  keywords: ["teacher resume", "teaching resume", "educator resume", "elementary teacher resume", "special education resume", "teacher resume examples 2025", "K-12 teacher resume"],
  alternates: { canonical: "/blog/teacher-resume" },
  openGraph: {
    title: "Teacher Resume — Examples, Skills & ATS Tips (2025)",
    description: "Write a teacher resume that passes district ATS and gets callbacks from principals — with real before/after examples.",
    url: "/blog/teacher-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_THEY_READ_FOR = [
  {
    signal: "Certification and licensure — the non-negotiable first filter",
    detail: "School district HR departments filter by state certification before reading anything else. Your teaching license, endorsements, and any add-on certifications (TESOL, reading specialist, special education) must appear at the top of your resume — in your professional summary and in a dedicated certifications section. Include the issuing state, expiration date, and grade level/subject area authorization.",
    redFlag: "Certification buried in the last section of the resume, or listed without state and grade level — making it impossible for ATS to confirm eligibility for the specific district.",
    strongExample: "Licensure: Virginia Professional Teaching License — Elementary Education (PreK–6), valid through 2027; Reading Specialist Endorsement; ESL Endorsement. National Board Certified Teacher (Early Childhood Generalist), Certified 2022.",
  },
  {
    signal: "Student outcome data — the differentiator most teachers miss",
    detail: "Most teacher resumes describe activities, not outcomes. Principals and district hiring committees want to see evidence that your instruction produced measurable results: reading level growth, standardized test gains, IEP goal progress, attendance improvement, or academic achievement data. Even rough data ('78% of my 3rd-grade class read at grade level by May, up from 54% in September') is dramatically more compelling than any description of your teaching approach.",
    redFlag: "Resume describes instructional activities with no student outcome data: 'Used differentiated instruction to meet diverse learning needs' — present in virtually every teaching resume, meaningless without results.",
    strongExample: "Improved 3rd-grade Dibels oral reading fluency scores from 42% proficient to 71% proficient over one academic year using structured literacy and small-group intervention rotations; 6 students exited Tier 2 intervention.",
  },
  {
    signal: "Curriculum knowledge and instructional frameworks",
    detail: "Hiring managers look for alignment between your instructional approach and their school's methodology. Common Scope and Sequence (CSS), Understanding by Design (UbD), culturally responsive teaching, co-teaching models, Responsive Classroom, Danielson Framework, Project-Based Learning — naming these frameworks signals professional development investment and pedagogical fluency.",
    redFlag: "Resume only describes 'creating engaging lessons' without naming curriculum, frameworks, or instructional models.",
    strongExample: "Designed and implemented PBL units aligned to NGSS standards; co-taught with special education teacher using co-teaching model (station teaching and parallel teaching); rated 'Highly Effective' on Danielson Framework observation for 3 consecutive years.",
  },
  {
    signal: "Technology integration and classroom tools",
    detail: "Technology fluency is increasingly essential across all grade levels and subjects. Hiring managers look for specific platform experience: Google Classroom, Seesaw, Canvas, IReady, Lexia, Dreambox, Nearpod, Kahoot, Screencastify. For special education, assistive technology tools (Boardmaker, Co:Writer, Dragon Naturally Speaking) are important. Listing specific tools signals that you can integrate technology without extended training.",
    redFlag: "Listing 'comfortable with technology' or 'experienced with educational technology' without naming the specific platforms used.",
    strongExample: "Implemented Google Classroom-based hybrid learning model for 28-student class during 2021–22; used iReady diagnostic data to drive weekly small-group grouping decisions; integrated Nearpod for formative assessment, averaging 94% participation rate.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "New Teacher (0–3 Years)",
    before: "Taught mathematics to 4th grade students using various instructional strategies",
    after: "Delivered Tier 1 math instruction to 26 fourth-grade students using Number Talks and CGI problem-solving routines; 72% of students scored proficient on end-of-year state math assessment (district average: 58%); implemented small-group Tier 2 intervention for 6 students with IEP math goals, with 4 meeting annual growth targets",
    fix: "Student count, specific instructional routines (Number Talks, CGI), a comparative outcome metric (72% vs 58% district average), and IEP goal data transform a generic bullet into a data-driven case.",
  },
  {
    level: "Experienced Teacher (4–10 Years)",
    before: "Led reading groups and differentiated instruction for diverse learners",
    after: "Designed and delivered structured literacy program for 24-student 2nd-grade class using UFLI Foundations; advanced 19 of 24 students (79%) from below-grade-level to on-grade-level oral reading fluency by year-end; co-planned weekly with special education co-teacher for 5 students with IEPs",
    fix: "Specific curriculum (UFLI Foundations), student count, outcome ratio (19 of 24), measurement metric (oral reading fluency), and co-teaching arrangement replace 'led reading groups.'",
  },
  {
    level: "Department Chair / Lead Teacher",
    before: "Mentored new teachers and helped improve department curriculum",
    after: "Served as 7th–8th grade English Department Chair for 3-year term; led weekly PLC for 6 ELA teachers, piloting standards-based grading pilot that increased department's EOG proficiency rate from 61% to 74%; mentored 3 first-year teachers with 100% retention at end of year 1",
    fix: "Leadership scope (6 teachers, 3-year term), specific initiative (standards-based grading), measurable departmental outcome (61%→74% proficiency), and mentorship retention rate.",
  },
];

const FAQS = [
  { question: "Should a teacher resume be one or two pages?", answer: "For teachers with fewer than 10 years of experience, one page is the right target. For experienced teachers with significant leadership, committee work, grants, publications, or National Board certification, two pages is acceptable. Principals review many applications quickly — a focused, scannable one-page resume is almost always more effective than a two-page resume that requires hunting for the most important information. Every section should earn its space." },
  { question: "Should I include my GPA on a teacher resume?", answer: "Include it if: you graduated within the last 3 years AND your GPA was 3.5 or higher. After 3 years, classroom performance data is far more relevant than academic GPA. If your GPA was below 3.0, omit it. Education section placement varies — for recent graduates, education can lead the resume; for experienced teachers, experience should always lead." },
  { question: "How do school district ATS systems screen teacher resumes?", answer: "District HR ATS systems typically screen for: (1) certification/licensure match for the advertised grade/subject, (2) degree level (most districts require at minimum a bachelor's; some require master's for certain roles), (3) endorsements or supplementary certifications, and (4) years of experience within a specified range. Make sure your certifications are clearly stated with state, grade level, and status. Avoid graphics, tables, and text boxes that common HR systems like Frontline (formerly AppliTrack) and TalentEd may not parse correctly." },
];

export default async function TeacherResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-16";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Teacher Resume — Examples, Skills & ATS Tips (2025)"
        description="Write a teacher resume that passes district ATS and gets callbacks from principals — with real before/after examples."
        url={`${BASE_URL}/blog/teacher-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Teacher Resume", url: `${BASE_URL}/blog/teacher-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume · Education</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Teacher Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            School district ATS systems filter for certification first, then principals read for student outcome data — the detail most teacher resumes completely omit. Here&apos;s how to show both clearly, with real before/after examples at every level.
          </p>
        </div>
      </section>

      {/* What They Read For */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What principals and district HR read for</h2>
          <div className="mt-8 space-y-5">
            {WHAT_THEY_READ_FOR.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{item.signal}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Red flag</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.redFlag}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong example</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.strongExample}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet Transformations */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before & after: bullet rewrites by experience level</h2>
          <div className="mt-8 space-y-6">
            {BULLET_TRANSFORMATIONS.map((item) => (
              <div key={item.level} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{item.level}</p>
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
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-[#4361EE]">What changed: </span>{item.fix}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Optimize your teaching resume for ATS and interviews.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against the specific teaching job description — finds missing certification keywords and student outcome signals, rewrites weak bullets, and prepares you for the principal interview. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
