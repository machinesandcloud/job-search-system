import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Write a Cover Letter That Gets Read (2025) — With Examples",
  description:
    "How to write a cover letter that recruiters actually read. Includes the exact structure, a word-for-word example, 5 opening lines that work, and what to never write.",
  keywords: ["how to write a cover letter", "cover letter tips", "cover letter examples", "cover letter structure", "cover letter writing guide", "how to write cover letter 2025", "good cover letter examples"],
  alternates: { canonical: "/blog/how-to-write-a-cover-letter" },
  openGraph: { title: "How to Write a Cover Letter That Gets Read (2025)", description: "The exact structure, word-for-word examples, and what to never write in a cover letter.", url: "/blog/how-to-write-a-cover-letter" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-04-15";
const MODIFIED = "2025-05-15";

export default async function HowToWriteCoverLetterPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Write a Cover Letter That Gets Read (2025) — With Examples"
        description="The exact structure, word-for-word examples, and what to never write in a cover letter."
        url={`${BASE_URL}/blog/how-to-write-a-cover-letter`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Write a Cover Letter", url: `${BASE_URL}/blog/how-to-write-a-cover-letter` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Cover Letters</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Write a Cover Letter That Gets Read (2025) — With Examples</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 10 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Recruiters spend an average of 7 seconds on a cover letter before deciding whether to read it. Most cover letters waste those 7 seconds on "I am writing to express my interest." Here's how to write one that earns the rest of the read.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Should you even write a cover letter?</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              <strong>Only when it's optional or required.</strong> If the application asks for one, write one. If it says "optional," write one — it's a free advantage most candidates skip. If the application doesn't mention it at all, don't attach it uninvited.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              When you do write one, make it count. A generic cover letter is worse than no cover letter — it signals you didn't try.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The structure that works</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">Three to four tight paragraphs. Never more than one page. Here's what goes in each:</p>
            <div className="mt-5 space-y-4">
              {[
                { para: "Paragraph 1 — The hook", desc: "One to two sentences. Not 'I am writing to apply.' A specific, confident opening that connects your background to this role. This is the paragraph that determines whether they read the rest." },
                { para: "Paragraph 2 — The evidence", desc: "Your most relevant achievement for this role — with a number. One specific story, not a list of things you've done. This is the paragraph where most cover letters either win or lose." },
                { para: "Paragraph 3 — The fit", desc: "Why this company, specifically. One or two sentences that prove you researched them. Mention something specific: a product, a market move, a company value. Generic enthusiasm is worthless here." },
                { para: "Paragraph 4 — The close", desc: "Brief. Confident. Ask for the conversation. 'I'd love to discuss how my background in X could contribute to Y' — not 'I hope to hear from you at your earliest convenience.'" },
              ].map((item) => (
                <div key={item.para} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="mb-2 font-bold text-[var(--ink)]">{item.para}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 opening lines that actually work</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">The opening line determines whether the rest gets read. Here are five proven approaches:</p>
            <div className="mt-4 space-y-3">
              {[
                { type: "The direct result hook", line: "In my last role, I built the content program from zero to 400,000 monthly visitors — the same growth challenge your Head of Content described in a recent interview as the top priority for this hire." },
                { type: "The specific company connection", line: "I've been a Notion power user since 2019, and I've watched you build the all-in-one workspace category from the outside. I'd like to help build it from the inside." },
                { type: "The problem-solution open", line: "Scaling enterprise sales without a real RevOps function is exactly the problem I've solved twice — and exactly the problem your job description describes." },
                { type: "The career narrative hook", line: "I've spent six years as a data engineer building pipelines — and the last two years watching product teams not know how to use them. I'd like to fix that from the PM side." },
                { type: "The referral or connection open", line: "I had coffee with [Name] from your product team last week, and she mentioned you're building out the growth function. I'd love to be part of that conversation." },
              ].map((item) => (
                <div key={item.type} className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-600">{item.type}</p>
                  <p className="text-[13.5px] italic leading-6 text-[var(--muted)]">"{item.line}"</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">A complete cover letter example</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">Role: Senior Product Manager, Growth — Series B SaaS company.</p>
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p>The growth PM role at Acme caught my attention because the problem you're solving — moving users from free to paid at scale — is exactly what I've been doing for the last three years.</p>
              <p className="mt-4">At DataFlow, I owned the upgrade funnel end-to-end. When I took over, our free-to-paid conversion was 4.2%. Eighteen months later it was 11.8%, driven by a combination of in-app triggers, a redesigned trial experience, and a pricing experiment that increased perceived value at the critical moment. ARR from this cohort grew from $1.2M to $3.8M.</p>
              <p className="mt-4">What draws me to Acme specifically is how publicly you've talked about product-led growth as a distribution moat rather than just a pricing model. Your CEO's post on PLG architecture shaped how I think about activation — I'd like the chance to bring that thinking back to the team that wrote it.</p>
              <p className="mt-4">I'd love to talk about what you're building on the growth side and where I could contribute. Happy to share the full case study on the DataFlow experiment if useful.</p>
              <p className="mt-4">[Name]</p>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to never write</h2>
            <div className="mt-4 space-y-3">
              {[
                { dont: "\"I am writing to express my interest in the [Job Title] position at [Company].\"", why: "You are literally writing to express interest — you don't need to say it. Start with something that earns the read." },
                { dont: "\"I believe I would be a great fit for this role because I am a hard worker and team player.\"", why: "These are table stakes, not differentiators. Every candidate believes they're a hard worker. Say what you specifically did." },
                { dont: "\"I have always been passionate about [industry/company].\"", why: "Passion is not evidence. Specific knowledge, specific connection, or specific achievement is evidence." },
                { dont: "Repeating your resume bullet-by-bullet", why: "A cover letter is not a prose version of your resume. It's the one story you want them to know before they read the resume." },
              ].map((item) => (
                <div key={item.dont} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ "{item.dont}"</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Write your cover letter in minutes, not hours</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The hardest part of a cover letter is the blank page. Zari's <Link href="/cover-letter-writer" className="text-[var(--brand)] underline underline-offset-2">AI cover letter writer</Link> reads the job description and your background and writes a tailored, recruiter-tested cover letter that follows this structure — in under 3 minutes. You review, adjust the personal touches, and send.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Write your cover letter with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Paste the job description. Get a tailored, ready-to-send cover letter in 3 minutes.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Write my cover letter free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
