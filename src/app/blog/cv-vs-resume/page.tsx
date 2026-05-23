import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "CV vs Resume — What's the Difference? Which One to Use (2025)",
  description:
    "CV vs resume: length, content, when to use each, and the countries and industries where a CV is standard vs. where a resume is expected. Plus when the terms are used interchangeably and why it doesn't matter.",
  keywords: ["cv vs resume", "cv vs resume difference", "what is a cv vs resume", "curriculum vitae vs resume", "cv or resume", "when to use a cv vs resume"],
  alternates: { canonical: "/blog/cv-vs-resume" },
  openGraph: {
    title: "CV vs Resume — What's the Difference? Which One to Use (2025)",
    description: "The actual differences — length, content, use cases — and when the distinction matters vs. when it's just terminology. With a decision framework.",
    url: "/blog/cv-vs-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COMPARISON_DIMENSIONS = [
  {
    dimension: "Length",
    cv: { answer: "No limit — typically 2–10+ pages for academic or research CVs. Length is a feature: every publication, presentation, award, and conference contribution belongs.", detail: "A 5-page CV for a senior researcher is normal. Cutting a CV to 2 pages to fit resume norms is actively wrong — it signals you don't understand the format." },
    resume: { answer: "1–2 pages maximum. Senior executives and career changers can justify 2 pages; everyone else should target 1.", detail: "Recruiters spend 6–7 seconds on an initial resume scan. Length beyond 2 pages almost never helps and often hurts — it signals poor editing judgment." },
  },
  {
    dimension: "What it includes",
    cv: { answer: "Complete academic and professional history: education (including all degrees), publications, research projects, teaching experience, grants, awards, conference presentations, professional memberships, languages, and references.", detail: "Omitting a publication or conference presentation from a CV is considered incomplete. The document is meant to be comprehensive, not curated." },
    resume: { answer: "Curated professional experience: relevant work history (typically last 10–15 years), education summary, skills, and optionally a summary section. Select what's relevant to the target role.", detail: "A resume that lists every job since 1995 or includes unrelated volunteer work is not following resume format — it's a CV in disguise." },
  },
  {
    dimension: "Purpose",
    cv: { answer: "Comprehensive record of academic and professional credentials. Used as a complete history that committees, institutions, or employers can reference.", detail: "CV submissions to academic search committees are often reviewed by multiple people over weeks. Completeness matters more than brevity." },
    resume: { answer: "Marketing document tailored to a specific role. Purpose is to get an interview, not to document your full history.", detail: "A resume is written for the reader's decision — does this candidate have the qualifications and track record for this specific role? Everything that doesn't serve that question should be cut." },
  },
  {
    dimension: "Customization",
    cv: { answer: "Minimal customization — the CV is a stable document you update as your credentials grow. You might reorder sections or add a research statement, but the core content is consistent.", detail: "Submitting slightly different CVs for different positions is normal, but the differences are minor — a cover letter and research statement do the tailoring, not the CV itself." },
    resume: { answer: "Heavily tailored to each role — different emphasis, different bullet order, different keywords. A resume submitted to 50 jobs without customization is significantly less effective than a tailored one.", detail: "ATS systems score resumes against specific job descriptions. A resume with the right keywords for one role may lack them entirely for another. Tailoring is the difference between passing ATS and not." },
  },
];

const WHEN_TO_USE = [
  {
    category: "Always use a CV",
    color: "#7C3AED",
    cases: [
      { context: "Academic positions (faculty, postdoc, lecturer)", why: "Academic hiring committees expect a CV and would be confused by a resume. Teaching experience, publications, and grants are non-negotiable sections." },
      { context: "Medical residency and fellowship applications", why: "Medical academic positions follow CV conventions — full publication list, research experience, presentations, and board certifications are expected." },
      { context: "Research scientist roles at universities or institutes", why: "Even industry research roles at places like national labs often expect CV-format documents for initial applications." },
      { context: "Grant applications and fellowship programs", why: "NSF, NIH, and most grant-making bodies require a CV (or Biosketch, which is CV-derived) as part of the proposal package." },
    ],
  },
  {
    category: "Always use a resume",
    color: "#0D7182",
    cases: [
      { context: "Corporate jobs in the US and Canada", why: "North American corporate employers expect a resume — 1–2 pages, curated, tailored to the role. Submitting a CV for a corporate job signals unfamiliarity with hiring norms." },
      { context: "Tech company applications (including research roles)", why: "Even 'research engineer' and 'research scientist' roles at Google, Meta, and Microsoft use resume-format applications, not CVs. The difference from academic research roles is significant." },
      { context: "Startup and growth company roles", why: "Startups move fast and expect concise applications. A 5-page document for an IC engineering role would be unusual at best, offputting at worst." },
      { context: "Entry-level positions regardless of degree", why: "Even PhD candidates applying for corporate roles should submit a 2-page resume, not their academic CV. The audience and norms are different." },
    ],
  },
  {
    category: "It depends (or doesn't matter)",
    color: "#F97316",
    cases: [
      { context: "European and UK job applications", why: "In the UK, Australia, and most of Europe, 'CV' is the common term for what Americans call a resume — a 2-page document. If a European employer asks for a CV, they mean a 2-page professional document, not a 10-page academic record." },
      { context: "International development and nonprofit roles", why: "Some NGO roles (especially those with UN or World Bank funding) use 'CV' to mean a detailed professional history that's longer than a US resume but shorter than an academic CV. Read the application instructions carefully." },
      { context: "Roles at national laboratories with mixed industry/academic hiring", why: "National labs hire both academic researchers and engineers. The format expected can vary by division — check whether the posting calls for CV or resume explicitly." },
      { context: "When a job posting just says 'resume/CV'", why: "When the posting lists both, submit whichever reflects your background. Industry candidate? Resume. Academic/research background? Your shorter CV (or a 2-page resume version). The slash means they'll accept either." },
    ],
  },
];

const CONVERSION_GUIDE = [
  { step: "Identify which sections are CV-only", detail: "Publications, conference presentations, teaching experience, research grants, committee memberships — these sections don't belong on a resume unless directly relevant to the role. Move them to a separate academic section or remove them." },
  { step: "Apply the relevance filter", detail: "For each remaining bullet, ask: does this tell the hiring manager something about my ability to do this specific job? If no, cut it. A 10-page CV becomes a 2-page resume by brutal curation, not by just removing pages." },
  { step: "Reframe academic language as business outcomes", detail: "\"Conducted longitudinal study on user retention\" → \"Led 18-month research program on user retention drivers — findings adopted as product strategy for 40M-user app.\" Academic language describes process; resume language describes impact." },
  { step: "Add an ATS keyword pass", detail: "Academic CVs don't need ATS optimization — committee members read every submission. Resumes do. Take the key skills and tools from the job description and make sure they appear in your skills section and bullet text." },
  { step: "Tighten to 1–2 pages", detail: "A PhD with 12 years of research experience can justify 2 pages. A fresh PhD or postdoc converting for an industry role should target 1 page. Cut the most redundant or least relevant positions until you're within the limit." },
];

const FAQS = [
  {
    question: "What does CV stand for?",
    answer: "Curriculum vitae — Latin for 'course of life.' It's a comprehensive document of your academic and professional credentials. In practice, the distinction matters most in the US, where CV and resume serve different purposes and audiences. In the UK and most of Europe, CV is simply the term for what Americans call a resume — a standard 1–2 page professional document."
  },
  {
    question: "Is a CV better than a resume?",
    answer: "Neither is better — they're for different purposes and audiences. A CV is the right document for academic job markets, research institutions, and international applications that follow CV conventions. A resume is the right document for corporate roles, tech companies, and North American job searches. Submitting a CV where a resume is expected (or vice versa) signals unfamiliarity with hiring norms for that context — which is worse than either document could be."
  },
  {
    question: "Can you submit a CV instead of a resume for a corporate job?",
    answer: "Technically yes, but it's usually disadvantageous. Recruiters in corporate settings expect a 1–2 page resume and will often be confused or put off by a 5+ page academic-style CV. The information density is wrong, the format is wrong, and the signal it sends is 'I don't understand corporate hiring norms.' The better approach: create a 2-page resume from your CV by applying the relevance filter and reframing academic language as business outcomes."
  },
  {
    question: "Does a CV or resume need to be one page?",
    answer: "A resume should be 1–2 pages depending on experience level. A CV has no length limit — it should be as long as your complete academic and professional record requires. The one-page rule applies specifically to resumes for candidates with under 7–10 years of experience. Experienced professionals with a genuinely differentiated track record can justify 2 pages. CVs are a different document with different norms — length signals completeness, not bloat."
  },
];

export default async function CvVsResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="CV vs Resume — What's the Difference? Which One to Use (2025)"
        description="The actual differences — length, content, use cases — and when the distinction matters vs. when it's just terminology."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/cv-vs-resume`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "CV vs Resume", url: `${BASE_URL}/blog/cv-vs-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Job Search Basics</span>
            <span className="text-[11px] text-white/30">8 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            CV vs resume<br /><span className="gradient-text-animated">the actual difference (and when it matters)</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            In the US, CV and resume are different documents with different audiences and different purposes. In the UK, CV means what Americans call a resume. Knowing which is which — and when the distinction matters — prevents a common early-application mistake.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 4 real differences</h2>
          <div className="mt-8 space-y-5">
            {COMPARISON_DIMENSIONS.map((row) => (
              <div key={row.dimension} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-3.5">
                  <p className="font-extrabold text-[var(--ink)]">{row.dimension}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="px-6 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">CV</p>
                    <p className="mb-2 font-semibold text-[13.5px] text-[var(--ink)]">{row.cv.answer}</p>
                    <p className="text-[12.5px] leading-6 text-[var(--muted)]">{row.cv.detail}</p>
                  </div>
                  <div className="bg-[var(--brand)]/[0.03] px-6 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Resume</p>
                    <p className="mb-2 font-semibold text-[13.5px] text-[var(--ink)]">{row.resume.answer}</p>
                    <p className="text-[12.5px] leading-6 text-[var(--muted)]">{row.resume.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to use */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">When to use a CV vs resume</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The decision matrix — organized by context, with the rationale for each.</p>
          <div className="mt-7 space-y-6">
            {WHEN_TO_USE.map((group) => (
              <div key={group.category} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] bg-white px-6 py-4">
                  <p className="font-extrabold" style={{ color: group.color }}>{group.category}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {group.cases.map((c) => (
                    <div key={c.context} className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] bg-white/50">
                      <div className="px-5 py-4">
                        <p className="font-semibold text-[13.5px] text-[var(--ink)]">{c.context}</p>
                      </div>
                      <div className="px-5 py-4">
                        <p className="text-[13px] leading-6 text-[var(--muted)]">{c.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CV to resume conversion */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to convert a CV to a resume in 5 steps</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The most common situation: an academic or researcher transitioning to industry who needs to turn a 10-page CV into a 2-page resume.</p>
          <div className="mt-7 space-y-3">
            {CONVERSION_GUIDE.map((item, i) => (
              <div key={item.step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.step}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">CV vs resume FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Need help converting your CV or optimizing your resume for ATS?</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your document, checks it against the job description, and rewrites weak sections for ATS performance. First optimization free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Optimize my resume free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
