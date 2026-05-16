import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Write a Resume With No Experience — 5 Real Examples (2025)",
  description:
    "How to write a resume when you don't have traditional work experience. 5 specific examples for students, bootcamp grads, and career changers — with the structure, bullet formula, and what to lead with when you have no job history.",
  keywords: ["how to write a resume with no experience", "resume with no work experience", "entry level resume", "resume no experience examples", "first resume", "student resume"],
  alternates: { canonical: "/blog/how-to-write-a-resume-with-no-experience" },
  openGraph: {
    title: "How to Write a Resume With No Experience — 5 Real Examples (2025)",
    description: "The structure, bullet formula, and 5 specific examples for writing a resume when you don't have traditional work history.",
    url: "/blog/how-to-write-a-resume-with-no-experience",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const EXPERIENCE_SUBSTITUTES = [
  {
    type: "Academic projects",
    accent: "#7C3AED",
    forWho: "Students and recent grads",
    what: "Any project from coursework, research, or self-study that produced something — a model, an application, a research paper, a dataset analysis, a design",
    howToFrame: "Write it exactly like a job bullet: what you built, the technology or methodology you used, and a measurable outcome or scale. 'Built a Python-based sentiment analysis model using NLTK and scikit-learn — 87% accuracy on 10K tweet dataset; open-sourced on GitHub with 45 stars' is a resume bullet.",
    notThis: "Course names listed without any project output. 'Took Machine Learning with Andrew Ng' is a resume filler, not a bullet.",
  },
  {
    type: "Internships and part-time work",
    accent: "#DC2626",
    forWho: "Students, recent grads, career changers",
    what: "Any paid work — even in a different industry — contains transferable skills: customer communication, project coordination, meeting deadlines, problem-solving under pressure",
    howToFrame: "Extract the skills that transfer. A retail job becomes: 'Managed customer service for 80+ daily customer interactions; resolved complaints with a 94% satisfaction rate and maintained floor during peak holiday volume 3x normal.' That reads for any customer-facing role.",
    notThis: "Generic job descriptions ('Helped customers, managed inventory'). Even non-relevant work needs specific metrics and transferable framing.",
  },
  {
    type: "Volunteer and nonprofit work",
    accent: "#D97706",
    forWho: "Career changers, people with employment gaps",
    what: "Organizational volunteering, nonprofit board service, community organizing — especially if you had a defined role with real responsibilities",
    howToFrame: "Write it identically to paid work in the experience section. The only difference is noting it was volunteer. 'Volunteer Program Coordinator, Habitat for Humanity (2022–2024) — managed 40-person volunteer cohorts, coordinated 6 build weekends, and implemented a new scheduling system that reduced no-shows by 30%.' That's a project management bullet.",
    notThis: "One-time events or short-term volunteering with no measurable contribution. 'Volunteered at food bank' doesn't qualify.",
  },
  {
    type: "Freelance and contract work",
    accent: "#059669",
    forWho: "Career changers, people with nontraditional paths",
    what: "Any paid independent work: freelance writing, web design, tutoring, social media management, consulting for small businesses",
    howToFrame: "Aggregate it: 'Freelance Web Developer, Self-employed (2021–2023) — built and launched 12 small business websites using React and Tailwind CSS; all clients on retainer for ongoing maintenance; average project value $2,400.' This reads as real professional experience.",
    notThis: "Listing 'freelancer' with no clients, no scale, and no outcomes. Scope and result make freelance experience credible.",
  },
  {
    type: "Personal and portfolio projects",
    accent: "#0D7182",
    forWho: "Engineers, designers, writers, marketers",
    what: "Apps you built, designs you made, content you created, tools you developed — especially anything with real usage, users, or public presence",
    howToFrame: "Include the GitHub link, portfolio URL, or publication. Give a scale metric: 'Built an expense-tracking app in React Native with 800+ downloads on the App Store; implemented SQLite offline storage and push notifications.' Proof of real usage is the differentiator.",
    notThis: "Projects with no link, no users, and no outcome. 'Built a to-do app' is not a resume bullet unless it has context that makes it credible.",
  },
];

const RESUME_STRUCTURE = [
  { section: "Header", detail: "Name, city/state, email, LinkedIn, GitHub (if tech), portfolio URL. No objective statement." },
  { section: "Skills (lead with this)", detail: "For experience-light candidates, lead with a skills section — languages, tools, frameworks, software. This gets your technical qualifications visible before screeners read your sparse experience section." },
  { section: "Projects (treat as experience)", detail: "List your top 2–3 projects with the same format as job bullets: title, timeframe, what you built, measurable outcome. Link to GitHub or live demos." },
  { section: "Experience (internships, part-time, volunteer)", detail: "Include everything paid and every substantial volunteer role. Write real bullets with measurable outcomes — not job descriptions. Even a retail job has metrics: customers served, transactions processed, uptime, satisfaction rates." },
  { section: "Education (last for most, first only for new grads)", detail: "Degree, school, graduation year. GPA only if 3.5+. Relevant coursework if it maps directly to the role. Leave off high school if you have college credentials." },
];

const BULLET_FORMULA = [
  { step: "Action verb", example: "Built / Designed / Analyzed / Led / Launched", note: "Past tense for past work, present for current" },
  { step: "What you built or did", example: "a sentiment classification model", note: "Specific noun — not vague ('work', 'various tasks')" },
  { step: "Tech or method", example: "using Python and scikit-learn", note: "Shows how, differentiates from generic claims" },
  { step: "Outcome or scale", example: "achieving 87% accuracy on 10K test samples", note: "The 'so what' — impact, scale, or quality metric" },
];

const FAQS = [
  { question: "What should I put on a resume if I have no work experience?", answer: "In order of preference: (1) internships or part-time jobs, even in unrelated industries — extract transferable skills; (2) academic projects with real outputs and measurable results; (3) personal or portfolio projects with links and user counts; (4) volunteer or nonprofit work where you had defined responsibilities; (5) relevant coursework only if everything else is thin. The goal is to show you've done real work and produced real outputs — the category of experience matters less than the credibility of the evidence." },
  { question: "How do I make a resume with no experience look good?", answer: "Lead with skills (for tech roles especially), not education. Use the same bullet format as experienced candidates — action verb + what you built/did + how + measurable outcome. Quantify everything you can: project scale, user counts, grades, hours, volume. Add links to every project that has a live demo or GitHub. Keep it to one page. A clean, well-structured resume with strong project bullets looks significantly better than a two-page resume with padded job descriptions." },
  { question: "Should I lie on my resume if I have no experience?", answer: "No — and beyond the ethical problem, it's a practical risk that most people underestimate. Hiring managers verify references, check GitHub commit histories, and probe technical claims in interviews. A fabricated project or skill will usually surface in the technical screen. The better path: do the actual work. Build the project. Complete the internship. Write the posts. Three months of real work produces real resume bullets that hold up in interviews." },
  { question: "How long should a no-experience resume be?", answer: "One page, strictly. A thin resume padded to two pages signals a lack of editorial judgment — a quality that all employers value. If you genuinely have only one semester of work to show, a tight, well-designed one-page resume is the right format. Add more as you accumulate more." },
];

export default async function HowToWriteResumeNoExperiencePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Write a Resume With No Experience — 5 Real Examples (2025)"
        description="The structure, bullet formula, and 5 specific examples for writing a resume when you don't have traditional work history."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/how-to-write-a-resume-with-no-experience`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Resume With No Experience", url: `${BASE_URL}/blog/how-to-write-a-resume-with-no-experience` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</span>
            <span className="text-[11px] text-white/30">9 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Resume with no experience<br /><span className="gradient-text-animated">5 types of substitutes that actually work</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            &apos;No experience&apos; usually means &apos;no traditional full-time employment&apos; — which is different from having done nothing. Projects, internships, volunteer work, and freelance all count when framed right. Here&apos;s exactly how.
          </p>
        </div>
      </section>

      {/* Experience substitutes */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 types of experience that substitute for job history</h2>
          <div className="mt-8 space-y-5">
            {EXPERIENCE_SUBSTITUTES.map((s) => (
              <div key={s.type} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: s.accent, borderLeftWidth: 4 }}>
                  <p className="font-extrabold text-[var(--ink)]">{s.type}</p>
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold" style={{ background: `${s.accent}14`, color: s.accent }}>Best for: {s.forWho}</span>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <p className="px-6 py-4 text-[13.5px] leading-6 text-[var(--muted)]">{s.what}</p>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="bg-emerald-50/30 px-5 py-4">
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">How to frame it</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{s.howToFrame}</p>
                    </div>
                    <div className="bg-red-50/20 px-5 py-4">
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500">Not this</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{s.notThis}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume structure */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The right structure for a no-experience resume</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The order matters. Lead with what makes you look strongest.</p>
          <div className="mt-7 space-y-3">
            {RESUME_STRUCTURE.map((item, i) => (
              <div key={item.section} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.section}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet formula */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The bullet formula — for any type of experience</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The same formula that works for senior resumes also works here. The goal is the same: verb + what + how + outcome.</p>
          <div className="mt-7 overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
            <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-3">
              <p className="font-mono text-[12px] text-[var(--brand)]">Built a sentiment classification model using Python and scikit-learn — achieving 87% accuracy on a 10K tweet test dataset; open-sourced on GitHub with 45 stars.</p>
            </div>
            {BULLET_FORMULA.map((item, i) => (
              <div key={item.step} className={`flex items-start gap-4 px-6 py-4 ${i < BULLET_FORMULA.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-semibold text-[var(--ink)]">{item.step}</p>
                  <p className="mt-0.5 font-mono text-[11.5px] text-[var(--brand)]">{item.example}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--muted)]">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">No-experience resume FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your resume ATS-scored even without work history.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches candidates at every stage — including no prior full-time experience. Start with your projects and skills; Zari will show you how to make them read.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
