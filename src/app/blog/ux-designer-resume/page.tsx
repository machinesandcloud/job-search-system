import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "UX Designer Resume — Portfolio, ATS Tips & Examples (2025)",
  description:
    "UX design hiring is portfolio-first — but ATS filters your resume before anyone sees your Figma link. How to write a UX resume that passes the filter, makes recruiters click through to your portfolio, and shows the thinking behind your work.",
  keywords: ["UX designer resume", "UX resume examples", "UX designer resume 2025", "UX portfolio resume", "product designer resume", "UI UX resume", "UX researcher resume", "UX resume ATS"],
  alternates: { canonical: "/blog/ux-designer-resume" },
  openGraph: {
    title: "UX Designer Resume — Portfolio, ATS Tips & Examples (2025)",
    description: "ATS filters your resume before anyone sees your portfolio link. How to write a UX resume that passes the filter and makes recruiters want to click through.",
    url: "/blog/ux-designer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Should I include my portfolio link on my resume?",
    answer: "Yes — put it prominently in your header, next to your name and contact info. Don't bury it. Some ATS systems strip hyperlinks, so write the full URL (not just 'portfolio'). If your portfolio is password-protected, include the password in the header too, or note it next to the link.",
  },
  {
    question: "Do UX resumes need to be one page?",
    answer: "For early-career UX roles (0–3 years), one page is the standard. For senior designers and design leads with 5+ years and multiple notable projects, two pages is acceptable — but the second page should be adding meaningful content, not padding. Recruiters at top companies read hundreds of resumes; one tight page often reads better than two loose ones.",
  },
  {
    question: "Should I include every design tool I know?",
    answer: "List the tools you'd be comfortable being tested on in an interview. A skills section that includes 'Figma, Sketch, Adobe XD, Axure, InVision, Miro, Notion, Jira, Confluence, HTML/CSS, Python' looks credible if you genuinely use them; it looks like keyword stuffing if you listed half of them hoping no one asks. Lead with your primary tools, then list secondary ones more briefly.",
  },
  {
    question: "What if my best work is under NDA?",
    answer: "This is common. Your resume bullets can still describe the problem, your process, and the measurable outcome — without sharing the actual designs. In your portfolio, add a case study that describes the work at a conceptual level, with wireframes replaced by process diagrams. Most hiring managers understand NDA constraints; what they're evaluating is your thinking, not the pixels.",
  },
  {
    question: "I'm transitioning into UX from another field. What do I emphasize?",
    answer: "Your transferable signals: user empathy from a customer-facing role, systems thinking from engineering or operations, storytelling from marketing, domain expertise that makes your UX work more credible. Pair each transferable signal with a concrete UX artifact (a case study, a redesign project, a bootcamp capstone) that proves you can execute. The combination of domain knowledge + UX craft is genuinely differentiating.",
  },
];

export default async function UxDesignerResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="UX Designer Resume — Portfolio, ATS Tips & Examples (2025)"
        description="ATS filters your resume before anyone sees your portfolio link. How to write a UX resume that passes the filter and makes recruiters want to click through."
        url={`${BASE_URL}/blog/ux-designer-resume`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "UX Designer Resume", url: `${BASE_URL}/blog/ux-designer-resume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">UX Designer Resume</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">UX hiring is portfolio-first — but ATS filters your resume before anyone ever clicks your Figma link. Here&apos;s how to write a UX resume that passes the filter and makes recruiters want to see more.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>11 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The UX hiring paradox</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              UX designers are hired for their portfolio. Hiring managers, design leads, and PMs who interview you are evaluating your case studies, your process artifacts, your thinking about tradeoffs. The resume is almost secondary to the work.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Except: your resume has to exist before anyone sees the portfolio. At companies of any scale, resumes go through an ATS before a human ever sees them. And even when a recruiter opens your resume, they&apos;re making a 15-second decision about whether to click your portfolio link — based entirely on what the resume says.
            </p>
            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/40 p-5">
              <p className="text-[14px] leading-7 text-[var(--ink)]">
                <span className="font-bold">The real job of a UX resume:</span> Pass the ATS filter, give the recruiter enough signal to believe you&apos;re worth clicking into, and make sure the portfolio link is impossible to miss. The resume doesn&apos;t need to tell your whole story — the portfolio does that. The resume just needs to get you to the portfolio stage.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What UX hiring managers actually screen for</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Before a design lead or hiring manager sees your portfolio, a recruiter typically does an initial screen. Here&apos;s what that recruiter is checking for on your resume:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { signal: "UX title history", detail: "Titles matter more in design than people expect. 'UX Designer,' 'Product Designer,' 'UX Researcher,' 'Interaction Designer,' 'UI Designer' — these aren't interchangeable to recruiters at larger companies. If your title was 'Web Designer' but you did UX work, your bullets need to make that explicit." },
                { signal: "Tool fluency", detail: "Figma is now the standard. If your resume doesn't mention Figma, recruiters at modern product companies will notice. Secondary tools depend on the role: prototyping (ProtoPie, Framer), research (Maze, UserTesting), handoff (Zeplin, Storybook), systems (design tokens, Figma variables)." },
                { signal: "Cross-functional evidence", detail: "UX designers who can describe collaboration with engineering and product — not just design deliverables — read as more embedded in the product development process. Bullets that mention engineers, PMs, or stakeholders by function signal someone who operates as a partner, not a service provider." },
                { signal: "Portfolio link", detail: "The most basic thing. Recruiters see resumes without portfolio links from UX designers constantly. If you don't have a public link, you're filtering yourself out." },
                { signal: "Company / product context", detail: "Working on consumer products, enterprise SaaS, fintech, or healthcare each requires different UX knowledge. Your bullets should establish what kind of product you designed for — scale, domain, user type." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[var(--brand)]">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.signal}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Before and after: how UX resume bullets actually differ</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Most UX resume bullets describe deliverables. Strong UX bullets describe the problem you were solving, the decisions you made, and what changed as a result.
            </p>

            <div className="mt-6 space-y-6">
              {[
                {
                  role: "Product Designer (Mid-Level)",
                  before: "Designed the onboarding flow for the mobile app.",
                  after: "Redesigned mobile onboarding after usability testing showed 61% of new users abandoning before completing account setup — simplified from 7 screens to 4 and removed the optional profile step; activation rate improved from 39% to 67% over 6 weeks.",
                  why: "The 'before' describes a deliverable. The 'after' gives context (why it was redesigned), explains the design decision (what changed and why), and connects it to a measurable outcome.",
                },
                {
                  role: "UX Researcher",
                  before: "Conducted user research to inform product decisions.",
                  after: "Led 18 moderated usability sessions and a 400-participant survey to evaluate a proposed checkout redesign — findings revealed a $12 delivery fee display issue that was responsible for 34% of cart abandonments; PM team used data to reprioritize Q2 roadmap.",
                  why: "Research bullets need to show the method, the scale, and — critically — what happened with the findings. Research that doesn't change anything doesn't demonstrate impact. Research that shifted a roadmap decision does.",
                },
                {
                  role: "UX Designer (Career Changer from Engineering)",
                  before: "Used design skills to improve internal tools.",
                  after: "Applied UX process (journey mapping, paper prototyping, 2 rounds of internal usability testing) to redesign the incident ticketing workflow for a 200-person ops team — reduced average ticket creation time from 8 minutes to 2.5 minutes, cutting support team workload by ~15%.",
                  why: "Career changers need to show the UX process explicitly — not assume the reader understands that they used it. Naming the artifacts (journey map, prototype, usability test) proves the methodology.",
                },
                {
                  role: "Senior Product Designer / Design Lead",
                  before: "Led design for the enterprise product.",
                  after: "Led design across a 4-designer team building the enterprise configuration platform (used by 300+ B2B clients) — established the design system that reduced component duplication by 80%, drove adoption from 12% to 78% of product surfaces in 8 months.",
                  why: "Senior designers need to show scale (team size, product scope, client count) and influence (design system adoption, systems thinking) — not just individual craft. The 'before' could describe any designer anywhere.",
                },
              ].map(item => (
                <div key={item.role} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                    <h3 className="font-bold text-[var(--ink)]">{item.role}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-red-400">Before</p>
                      <div className="rounded-lg border border-red-100 bg-red-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)]">
                        &ldquo;{item.before}&rdquo;
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-500">After</p>
                      <div className="rounded-lg border border-emerald-100 bg-emerald-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)]">
                        &ldquo;{item.after}&rdquo;
                      </div>
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Why it works: </span>{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">UX resume structure: what goes where</h2>

            <div className="mt-5 space-y-4">
              {[
                {
                  section: "Header",
                  required: true,
                  guidance: "Name, location (city/state), email, LinkedIn, portfolio URL. The portfolio link should be the full URL in plain text — some ATS systems strip hyperlinks. If your portfolio is password-protected, include the password. Don't overthink the format: clarity beats creativity here.",
                },
                {
                  section: "Summary (optional but useful for UX)",
                  required: false,
                  guidance: "2–3 sentences. Useful when you need to establish your UX specialty quickly — especially for career changers, UX researchers (vs. designers), or designers targeting a specific domain (fintech, healthcare, enterprise). Template: '[X years] [specialization] designer with background in [relevant domain]. Work spans [product types]. Strongest in [2–3 differentiating skills].' Skip it if your title history already tells the story.",
                },
                {
                  section: "Skills",
                  required: true,
                  guidance: "Group by category. Design tools (Figma, Sketch, ProtoPie), Research methods (moderated usability testing, card sorting, tree testing, diary studies), Cross-functional tools (Jira, Confluence, Notion), Additional (basic HTML/CSS if applicable, data analysis if relevant). Lead with what you use daily.",
                },
                {
                  section: "Experience",
                  required: true,
                  guidance: "Reverse chronological. For each role: 3–5 bullets that follow the format [what you designed/researched] + [your decision or process] + [what changed]. Don't list every project — pick the 3–5 that best show range, scale, and impact. Senior designers: show team leadership and systems thinking, not just craft.",
                },
                {
                  section: "Education",
                  required: true,
                  guidance: "Degree, school, graduation year. If you did a UX bootcamp, include it here or in a separate 'Certifications' section — but don't try to hide it. If it was a reputable program (General Assembly, Springboard, CareerFoundry, IDEO U), name it clearly. Bootcamp + strong portfolio beats a design degree + weak portfolio at most companies.",
                },
                {
                  section: "Portfolio / Projects (optional second section)",
                  required: false,
                  guidance: "Some UX designers add a brief 2–3 line summary of their top 2 portfolio projects directly on the resume — company, problem, your role, and the outcome. This is optional and works best when the portfolio link might not be clicked immediately (like in a recruiter screening pass). It's not a substitute for the portfolio itself.",
                },
              ].map(item => (
                <div key={item.section} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-bold text-[var(--ink)]">{item.section}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.required ? 'bg-[var(--brand)]/10 text-[var(--brand)]' : 'bg-slate-100 text-slate-400'}`}>
                      {item.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.guidance}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">ATS keywords for UX designers</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              UX job descriptions vary significantly by company and role type. Use keywords from the specific job posting — but make sure they reflect your actual experience. These are the most commonly scanned terms by UX ATS systems and recruiters:
            </p>

            <div className="mt-5 space-y-4">
              {[
                {
                  category: "Core UX methods",
                  keywords: ["User research", "Usability testing", "Moderated testing", "Card sorting", "Affinity mapping", "Journey mapping", "Information architecture", "Wireframing", "Prototyping", "Design sprints", "A/B testing", "Heuristic evaluation"],
                },
                {
                  category: "Design tools",
                  keywords: ["Figma", "Sketch", "Adobe XD", "ProtoPie", "Framer", "InVision", "Miro", "FigJam", "Zeplin", "Storybook", "Maze", "UserTesting", "Hotjar", "FullStory"],
                },
                {
                  category: "Design systems & collaboration",
                  keywords: ["Design system", "Component library", "Design tokens", "Accessibility (WCAG)", "Cross-functional collaboration", "Engineering handoff", "Design QA", "Product roadmap"],
                },
                {
                  category: "Role-specific signals",
                  keywords: ["Product designer", "UX researcher", "Interaction designer", "Service design", "Conversion optimization", "Mobile-first", "Responsive design", "B2B / enterprise UX", "Consumer product design"],
                },
              ].map(group => (
                <div key={group.category} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.keywords.map(kw => (
                      <span key={kw} className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[12px] text-[var(--ink)]">{kw}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The 5 most common UX resume mistakes</h2>
            <div className="mt-4 space-y-3">
              {[
                { mistake: "No portfolio link (or a broken one)", impact: "This is the most common filter-out. Check that your portfolio link works from an incognito window. If it's Notion, make sure it's publicly shared. If it's password-protected, include the password." },
                { mistake: "Bullets describe deliverables, not decisions", impact: "'Designed the checkout flow' tells the reader what you made. 'Redesigned checkout after discovering 40% abandonment at the payment step, reducing drop-off by 22%' tells them what you solved and why it mattered." },
                { mistake: "Missing Figma or listing outdated primary tools", impact: "If your skills section leads with Sketch or XD but doesn't mention Figma, recruiters at modern product companies notice. Figma has been the industry standard since ~2021 for most product work." },
                { mistake: "Over-designed resume format", impact: "A resume with custom typography, multi-column layouts, and inline graphics may not parse correctly through ATS. Design it clean, single-column, with standard section headers. The portfolio is where you show your visual range." },
                { mistake: "No evidence of cross-functional work", impact: "UX designers who list only design deliverables read as execution-oriented. Bullets that describe working with engineers, PMs, and researchers read as embedded, collaborative, and more senior." },
              ].map(item => (
                <div key={item.mistake} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="font-semibold text-[var(--ink)]">✗ {item.mistake}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.impact}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Common questions</h2>
            <div className="mt-4 space-y-4">
              {FAQS.map(faq => (
                <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Get your UX resume ATS-optimized</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari analyzes your UX resume against the job description — identifies keyword gaps, flags weak bullets, and rewrites them to show design thinking and impact. Plus LinkedIn optimization and interview prep for design roles.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Optimize my UX resume →
            </Link>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
