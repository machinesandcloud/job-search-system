import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Graphic Designer Resume — Portfolio, Skills & ATS Tips (2025)",
  description:
    "A graphic designer resume needs to pass ATS before a human sees your portfolio. What creative directors actually read for — software fluency, business impact, project scope — with before/after bullet examples by experience level.",
  keywords: ["graphic designer resume", "graphic design resume examples", "graphic design resume 2025", "creative resume ATS", "graphic designer resume skills", "UX designer resume", "graphic design portfolio"],
  alternates: { canonical: "/blog/graphic-designer-resume" },
  openGraph: {
    title: "Graphic Designer Resume — Portfolio, Skills & ATS Tips (2025)",
    description: "Your portfolio shows the work. Your resume gets you to the portfolio review. What ATS and creative directors read for — with before/after bullet examples.",
    url: "/blog/graphic-designer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const PORTFOLIO_VS_RESUME = [
  {
    item: "Portfolio",
    role: "Shows the quality of your creative judgment and craft",
    when: "After the resume passes ATS and a human decides to look",
    common_mistake: "Linking a portfolio in a resume header and assuming it replaces the resume — it doesn't. ATS systems don't browse links. The resume still needs to stand alone with keywords, metrics, and clearly described work.",
  },
  {
    item: "Resume",
    role: "Gets your application past ATS and into a human's hands",
    when: "First — before any human looks at your work",
    common_mistake: "Treating the resume as a formality because 'my portfolio speaks for itself.' Most design applications are filtered by ATS before anyone sees your portfolio link. A weak resume means no one reaches the link.",
  },
];

const TOOL_SIGNALS = [
  {
    tool: "Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
    what_it_signals: "Foundational professional fluency — expected for most graphic design roles. List specific applications, not just 'Adobe CC.' InDesign signals editorial/print experience; Illustrator signals vector/brand work; Photoshop signals photo manipulation and digital compositing.",
    how_to_list: "List individually: 'Adobe Photoshop, Adobe Illustrator, Adobe InDesign' — not 'Adobe CC' alone. ATS systems match on individual application names.",
    differentiator: false,
  },
  {
    tool: "Figma",
    what_it_signals: "UX/UI collaboration capability and comfort with component-based design. Figma is now the primary tool for most product design and digital brand work — listing it signals you can work alongside product managers and developers in the design-to-handoff workflow.",
    how_to_list: "List with context: 'Figma (design systems, prototyping, developer handoff)' — shows you understand the tool's full scope, not just its visual design function.",
    differentiator: true,
  },
  {
    tool: "After Effects / Premiere Pro",
    what_it_signals: "Motion design capability — a significant differentiator for brand designers. Most graphic designers can produce static assets; fewer can produce motion graphics and short-form video. Listing these tools expands the roles you qualify for and increases value to employers who need both.",
    how_to_list: "If you have real motion design work, list it and link a portfolio example. 'After Effects — brand animations, social motion graphics, explainer video' is more useful than listing the tool alone.",
    differentiator: true,
  },
  {
    tool: "Sketch",
    what_it_signals: "Legacy digital product design experience — common at companies that haven't migrated to Figma. Useful to list if your portfolio includes product design work from 2018–2022 when Sketch was dominant, but don't lead with it if you also have Figma experience.",
    how_to_list: "List alongside Figma if you have both. Sketch alone on a 2025 resume without Figma may signal a tool gap.",
    differentiator: false,
  },
  {
    tool: "Webflow / HTML/CSS basics",
    what_it_signals: "Design-to-implementation understanding — increasingly valued for brand designers at startups and agencies. A designer who understands how their designs will be built produces better work and communicates more effectively with developers. Even basic HTML/CSS signals this capability.",
    how_to_list: "Frame as design-relevant: 'Webflow (landing pages, campaign microsites)' or 'HTML/CSS (implementation-aware design, dev collaboration).' Not a primary skill — a supporting differentiator.",
    differentiator: true,
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior / Intern Designer (0–2 Years)",
    before: "Designed marketing materials and social media graphics for company campaigns",
    after: "Designed 40+ print and digital assets across 3 product launch campaigns — including trade show booth graphics (8ft × 10ft display), email headers (180K subscriber list), and paid social creative (4 ad sets, A/B tested); 2 social variants outperformed control by 31% CTR",
    fix: "Quantity (40+), asset types named, scale of distribution (180K, 4 ad sets), and a performance metric replace 'designed marketing materials.'",
  },
  {
    level: "Mid-Level Designer (2–5 Years)",
    before: "Led brand refresh project and redesigned company website",
    after: "Led 4-month brand identity refresh for B2B SaaS company (450 employees) — delivered new logo system, color palette, typography hierarchy, and 200+ asset library across web, print, and digital; reduced design request turnaround from 5 days to 1.5 days through new Figma component system",
    fix: "Project duration, company scale, explicit deliverable list (logo system, asset library), quantified scope (200+), and an operational efficiency metric from the Figma system.",
  },
  {
    level: "Senior / Art Director (5+ Years)",
    before: "Managed design team and oversaw brand strategy",
    after: "Led 3-person in-house design team for DTC beauty brand ($28M ARR); established brand design system (87 components in Figma) adopted across web, packaging, and retail — reduced external agency spend by $180K annually; oversaw visual identity for 2 product line launches, each achieving 40%+ above projected first-month revenue",
    fix: "Team size, company revenue context, design system specifics (87 components), business impact ($180K cost savings), and launch outcome metrics (40%+ above revenue projection).",
  },
];

const FAQS = [
  { question: "Should a graphic designer resume be visually designed?", answer: "For most applications: no. The primary reason is ATS — custom-designed PDF resumes with columns, text boxes, and decorative elements frequently fail to parse correctly, causing keyword data to be lost or scrambled. Most ATS systems read left-to-right, top-to-bottom plain text. The exception: if you are applying directly to a creative director's email (not through an online portal), a designed resume can demonstrate craft — but keep it readable as plain text too. The safest approach: clean, undesigned resume for ATS-filtered applications; designed resume as an optional supplement sent directly to the hiring manager after you've made contact." },
  { question: "What ATS keywords should a graphic designer include?", answer: "Core keywords that ATS systems commonly screen for in design roles: graphic design, brand identity, visual identity, Adobe Illustrator, Adobe Photoshop, Adobe InDesign, Figma, typography, layout design, print design, digital design, marketing collateral, social media graphics, and — for product design roles — UI design, UX design, wireframing, prototyping, design systems. Tailor to the specific job description — the job posting itself tells you exactly which terms the ATS is matching on. Include every tool listed in the requirements section that you actually use." },
  { question: "How important is a portfolio vs a resume for design jobs?", answer: "Both are necessary — but they operate at different stages of the hiring process. The resume determines whether you get a portfolio review; the portfolio determines whether you get an interview. In practice: a strong portfolio cannot save a weak resume from ATS rejection, and a polished resume with a weak portfolio won't convert to an offer. Optimize both. The portfolio should be organized to show the types of work the employer needs (if they need brand work, lead with brand; if they need digital, lead with digital) — not structured as a chronological archive of everything you've done." },
];

export default async function GraphicDesignerResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Graphic Designer Resume — Portfolio, Skills & ATS Tips (2025)"
        description="Your portfolio shows the work. Your resume gets you to the portfolio review. What ATS and creative directors read for — with before/after bullet examples."
        url={`${BASE_URL}/blog/graphic-designer-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Graphic Designer Resume", url: `${BASE_URL}/blog/graphic-designer-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume · Creative</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Graphic Designer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Your portfolio shows the work. Your resume gets you to the portfolio review. Most design applications are filtered by ATS before any human sees your portfolio link — which means the resume has to work first.
          </p>
        </div>
      </section>

      {/* Portfolio vs Resume */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Portfolio vs resume — what each actually does</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Designers often underinvest in the resume because they trust the portfolio to carry the application. Here&apos;s why that fails.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {PORTFOLIO_VS_RESUME.map((item) => (
              <div key={item.item} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--brand)]/10 px-3 py-1">
                  <p className="text-[12px] font-bold text-[var(--brand)]">{item.item}</p>
                </div>
                <p className="font-bold text-[var(--ink)]">{item.role}</p>
                <p className="mt-2 text-[13px] text-[var(--muted)]"><span className="font-semibold">When it matters: </span>{item.when}</p>
                <div className="mt-4 rounded-xl bg-red-50 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Common mistake</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.common_mistake}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Signals */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What your tools signal — and how to list them</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Tool selection on a design resume isn&apos;t just a skills inventory — each tool signals a type of work experience and capability to the hiring manager.</p>
          <div className="mt-8 space-y-4">
            {TOOL_SIGNALS.map((item) => (
              <div key={item.tool} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-bold text-[var(--ink)]">{item.tool}</h3>
                  {item.differentiator && (
                    <span className="rounded-full bg-[var(--brand)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Differentiator</span>
                  )}
                </div>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.what_it_signals}</p>
                <div className="mt-3 rounded-xl bg-emerald-50 p-3">
                  <p className="text-[12px] font-semibold text-emerald-700"><span className="font-bold">How to list it: </span>{item.how_to_list}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet Transformations */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before & after: bullet rewrites by career level</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Design bullet points need specificity, scale, and business impact — not just project descriptions.</p>
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
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-[var(--brand)]">What changed: </span>{item.fix}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Optimize your design resume for ATS and callbacks.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against the specific design job description — identifies missing tool keywords, rewrites weak bullets for impact, and prepares you for the portfolio presentation and creative interview. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
