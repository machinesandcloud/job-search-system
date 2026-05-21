import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Write a LinkedIn Summary 2025 — About Section Examples That Get Noticed",
  description: "How to write a LinkedIn About section that attracts recruiters and hiring managers. Includes proven frameworks, examples by role, and what to avoid.",
  keywords: ["how to write a linkedin summary", "linkedin about section", "linkedin summary examples", "linkedin summary 2025", "linkedin about section tips", "best linkedin summary", "linkedin summary for job seekers", "linkedin bio examples", "write linkedin about section"],
  alternates: { canonical: "/blog/how-to-write-a-linkedin-summary" },
  openGraph: { title: "How to Write a LinkedIn Summary 2025 — About Section That Gets Noticed", description: "Proven frameworks and examples for writing a LinkedIn About section that attracts recruiters.", url: "/blog/how-to-write-a-linkedin-summary" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How long should a LinkedIn summary be?", answer: "300–500 words is the sweet spot. LinkedIn shows the first ~3 lines (about 300 characters) before the 'see more' click — your opening must hook. The full summary can be up to 2,600 characters. Shorter than 300 words wastes the SEO and context opportunity; longer than 600 words loses most readers." },
  { question: "Should I write my LinkedIn summary in first or third person?", answer: "First person. Third person ('John is a senior product manager who...') reads as outdated and impersonal. LinkedIn is a networking platform — write the way you'd talk to someone you just met at a professional event." },
  { question: "What keywords should I include in my LinkedIn summary?", answer: "Your target job title (exactly as it appears in postings), your top 5–8 technical skills, your industry or sector, and any certifications or credentials. LinkedIn's algorithm uses your About section for recruiter search matching. Including 'Product Manager' once versus five times in natural prose makes a measurable difference in how often you appear in searches." },
  { question: "Should I include a call to action in my LinkedIn summary?", answer: "Yes — end with a clear CTA. 'Open to senior PM roles at Series B+ startups — reach me at [email]' or 'Currently consulting on growth strategy — DM me if you're working on a hard problem.' Recruiters often skim to the end before deciding whether to reach out. A CTA removes friction." },
];

const FRAMEWORKS = [
  {
    name: "The Problem-Solver Framework",
    best: "Tech, consulting, operations",
    template: "What problem do I solve? For whom? With what results? → What am I building toward? → CTA.",
    example: `I help Series A–C SaaS companies fix broken conversion funnels and stalled growth — the messy middle between product-market fit and scale.\n\nIn 8 years across Stripe, Intercom, and two of my own startups, I've rebuilt growth stacks from scratch, launched 3 new product lines, and grown ARR from $2M to $28M.\n\nCurrently: VP of Growth at [Company], building a team to take us through our Series B.\n\nOpen to advising 1–2 early-stage companies on growth architecture. Reach me at [email].`,
  },
  {
    name: "The Career Story Framework",
    best: "Career changers, senior leaders, people with non-linear paths",
    template: "Where I started → what I learned → where I am now → where I'm going → CTA.",
    example: `I started as a bedside nurse in a high-dependency cardiac unit. Twelve years, hundreds of patients, and a front-row seat to how broken clinical tech was.\n\nSo I went back to school, got a Masters in Health Informatics, and spent the last 6 years building the clinical products I wish I'd had as a nurse.\n\nNow I lead a product team at [Company] working on AI-assisted clinical decision support — tools that reduce cognitive load for clinicians and improve patient outcomes.\n\nInterested in roles where deep clinical domain knowledge is the advantage. Let's connect.`,
  },
  {
    name: "The Achievement Stack Framework",
    best: "Sales, finance, roles where output is everything",
    template: "What I do → 3–4 quantified achievements → what I'm known for → CTA.",
    example: `Enterprise sales leader specialising in complex SaaS deals across financial services and healthcare.\n\n→ $28M in closed revenue in 2024 (147% of quota)\n→ Built EMEA team from 0 to 12 AEs in 18 months\n→ Longest average deal cycle managed: 18 months, $4M contract\n→ 3x promoted in 5 years at [Company]\n\nI'm known for navigating procurement, legal, and C-suite simultaneously — and keeping momentum alive in deals that stall.\n\nOpen to VP Sales / CRO conversations at high-growth B2B SaaS. Reach me directly: [email]`,
  },
];

export default async function HowToWriteALinkedinSummaryPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Write a LinkedIn Summary 2025" description="Proven frameworks and role-specific examples for writing a LinkedIn About section that attracts recruiters and hiring managers." url={`${BASE_URL}/blog/how-to-write-a-linkedin-summary`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Write a LinkedIn Summary", url: `${BASE_URL}/blog/how-to-write-a-linkedin-summary` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #0A66C2 0%, #0D1B2A 60%, #0A66C2 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">LinkedIn</span>
            <span className="text-[12px] text-white/35">12 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">How to Write a LinkedIn Summary 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">Three proven frameworks, full examples by role, and the exact mistakes that make recruiters skip your profile.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Why most LinkedIn summaries fail</h2>
          <div className="mb-10 grid gap-3 sm:grid-cols-2">
            {[
              { fail: "Generic opener", ex: "'I am a passionate and results-driven professional...' — everyone says this. Recruiters see it in 80% of profiles." },
              { fail: "List of duties, not achievements", ex: "'Responsible for managing a team of 8...' — so what? Show impact, not job description." },
              { fail: "No keywords", ex: "Your exact job title, tools, and skills must appear in the About section for LinkedIn search to surface you." },
              { fail: "No call to action", ex: "If a recruiter likes what they read but there's no next step, they move on. End with 'reach me at...' or 'open to...'" },
              { fail: "Third person", ex: "'Sarah is a marketing leader...' — impersonal and outdated. First person always." },
              { fail: "Too short", ex: "A 2-sentence About section signals low effort. You have 2,600 characters — use them to tell your story." },
            ].map(({ fail, ex }) => (
              <div key={fail} className="rounded-xl border border-[var(--border)] bg-[#DC2626]/[0.03] p-4">
                <div className="mb-1 flex items-center gap-2 font-bold text-[13px]">
                  <span className="text-[#DC2626]">✗</span> {fail}
                </div>
                <p className="text-[12px] leading-5 text-[var(--muted)]">{ex}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Three frameworks that work</h2>
          <div className="mb-12 space-y-6">
            {FRAMEWORKS.map(({ name, best, template, example }) => (
              <div key={name} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
                  <div className="font-bold text-[15px] text-[#0A66C2]">{name}</div>
                  <div className="mt-1 text-[12px] text-[var(--muted)]">Best for: {best}</div>
                  <div className="mt-2 text-[12px] font-semibold text-[var(--ink)]">Template: {template}</div>
                </div>
                <div className="p-5">
                  <div className="mb-2 text-[11px] font-bold uppercase text-[var(--muted)]">Example</div>
                  <p className="whitespace-pre-line text-[13px] leading-6 text-[var(--muted)]">{example}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">LinkedIn summary SEO — keywords that matter</h2>
          <p className="mb-5 text-[14px] leading-7 text-[var(--muted)]">LinkedIn&apos;s search algorithm weights your About section. Include these naturally in your summary:</p>
          <div className="mb-10 grid gap-2 sm:grid-cols-2">
            {[
              { item: "Your target job title (exact match)", note: "e.g. 'Senior Product Manager' not just 'product leader'" },
              { item: "Top 5–8 technical skills or tools", note: "React, Python, SQL, Figma, Salesforce — whatever is in job postings" },
              { item: "Industry or sector keywords", note: "FinTech, healthcare SaaS, B2B enterprise, early-stage startup" },
              { item: "Credentials and certifications", note: "CPA, PMP, AWS Certified, CPRW — spell them out in full" },
              { item: "Company-type signals", note: "Series B, Fortune 500, consulting — helps recruiter filters match you" },
              { item: "Location (if relevant)", note: "Remote, London, New York — recruiters filter by location" },
            ].map(({ item, note }) => (
              <div key={item} className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                <div className="mb-0.5 font-semibold text-[13px] text-[#0A66C2]">✓ {item}</div>
                <p className="text-[12px] text-[var(--muted)]">{note}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">The opening 3 lines — everything rides on this</h2>
          <p className="mb-5 text-[14px] leading-7 text-[var(--muted)]">LinkedIn collapses your summary to ~300 characters on mobile. The opening 3 lines must make a recruiter want to click &apos;see more.&apos;</p>
          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#DC2626]/30 bg-[#DC2626]/[0.03] p-4">
              <div className="mb-2 text-[11px] font-bold uppercase text-[#DC2626]">Weak opener</div>
              <p className="text-[13px] italic text-[var(--muted)]">"I am a results-oriented professional with over 10 years of experience in the financial services industry who is passionate about creating value..."</p>
            </div>
            <div className="rounded-xl border border-[#059669]/30 bg-[#059669]/[0.03] p-4">
              <div className="mb-2 text-[11px] font-bold uppercase text-[#059669]">Strong opener</div>
              <p className="text-[13px] italic text-[var(--muted)]">"I help mid-market CFOs close their books 40% faster. In 10 years at Deloitte and two scale-ups, I've rebuilt financial close processes for 30+ companies."</p>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0A66C2 0%, #0D1B2A 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Let Zari rewrite your LinkedIn summary.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari analyses your profile, target role, and career context to produce a LinkedIn About section that passes keyword search and makes recruiters click &apos;see more.&apos;</p>
          <Link href="/ai-linkedin-optimizer" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0A66C2]">Optimise my LinkedIn free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
