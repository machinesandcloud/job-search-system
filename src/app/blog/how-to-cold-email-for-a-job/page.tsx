import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Cold Email for a Job — Templates That Get Responses (2025)",
  description:
    "How to cold email a hiring manager or recruiter for a job. Includes subject lines, word-for-word email templates, and the follow-up sequence that gets responses.",
  keywords: ["how to cold email for a job", "cold email job application", "cold email hiring manager", "cold email recruiter", "job cold email template", "cold outreach job", "how to email a hiring manager", "cold email for job opportunity"],
  alternates: { canonical: "/blog/how-to-cold-email-for-a-job" },
  openGraph: { title: "How to Cold Email for a Job — Templates That Get Responses (2025)", description: "Subject lines, email templates, and the follow-up sequence for cold outreach that actually lands interviews.", url: "/blog/how-to-cold-email-for-a-job" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-10";
const MODIFIED = "2025-05-16";

export default async function ColdEmailJobPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Cold Email for a Job — Templates That Get Responses (2025)"
        description="Subject lines, email templates, and the follow-up sequence for cold outreach that actually lands interviews."
        url={`${BASE_URL}/blog/how-to-cold-email-for-a-job`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Cold Email for a Job", url: `${BASE_URL}/blog/how-to-cold-email-for-a-job` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Job Search</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Cold Email for a Job — Templates That Get Responses (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 9 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Cold email has a 1–5% response rate for generic outreach and a 20–40% response rate for highly targeted, researched emails. The difference isn&apos;t luck — it&apos;s the specificity of your research, the clarity of your ask, and the brevity of your message.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The anatomy of a cold email that works</h2>
            <div className="mt-5 space-y-3">
              {[
                { part: "Subject line", rule: "Short and specific. Reference their company or role directly.", good: "\"Growth PM question — saw your Series B announcement\"", bad: "\"Exciting opportunity to connect!\"" },
                { part: "Opening line", rule: "Reference something specific about them — a piece of work, a company announcement, something they wrote. Never 'I hope this email finds you well.'", good: "\"I read your breakdown of how you rebuilt the onboarding flow — the DAU lift you described is exactly the problem I've been working on.\"", bad: "\"My name is [X] and I'm reaching out because I'm very interested in your company.\"" },
                { part: "The value line", rule: "One sentence on why you're relevant to them — your most relevant achievement. Not your life story.", good: "\"I grew free-to-paid conversion from 4% to 11% at a similar-stage B2B SaaS company over 18 months.\"", bad: "\"I have 8 years of experience across product management, marketing, and analytics.\"" },
                { part: "The ask", rule: "Small, specific, low-friction. A 20-minute call, not 'can we meet whenever works for you.'", good: "\"Would you have 20 minutes sometime next week to talk about what you're building on the growth side?\"", bad: "\"I'd love to find a time to connect and explore potential opportunities.\"" },
              ].map((item) => (
                <div key={item.part} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="mb-3 font-bold text-[var(--ink)]">{item.part}</p>
                  <p className="mb-3 text-[13px] text-[var(--muted)]">{item.rule}</p>
                  <div className="space-y-2">
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">✓ Works</p>
                      <p className="text-[13px] italic text-[var(--muted)]">{item.good}</p>
                    </div>
                    <div className="rounded-xl border border-red-100 bg-red-50/30 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">✗ Generic</p>
                      <p className="text-[13px] italic text-[var(--muted)]">{item.bad}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Cold email templates</h2>

            <p className="mt-6 mb-3 font-bold text-[var(--ink)]">Template 1 — Emailing a hiring manager about an open role</p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Subject: [Role title] — [Your Name]</p>
              <p className="mt-4">Hi [Name],</p>
              <p className="mt-4">I saw the [Role] posting and wanted to reach out directly. [One specific thing about their product, team, or recent announcement that makes this relevant].</p>
              <p className="mt-4">My background: [One-line summary of your most relevant experience + metric].</p>
              <p className="mt-4">I applied through the portal as well, but wanted to reach out directly to express my interest. Happy to share more context or answer any questions.</p>
              <p className="mt-4">[Your Name]</p>
            </div>

            <p className="mt-8 mb-3 font-bold text-[var(--ink)]">Template 2 — Cold outreach for roles that aren&apos;t posted</p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Subject: [Specific topic] — question from [Your Name]</p>
              <p className="mt-4">Hi [Name],</p>
              <p className="mt-4">I&apos;ve been following [specific thing about their work — a blog post, a product launch, a talk they gave]. [One sentence showing you actually engaged with it].</p>
              <p className="mt-4">I&apos;m a [brief description] who [your most relevant achievement]. I&apos;m exploring my next role and [their company] is at the top of my list because of [specific reason].</p>
              <p className="mt-4">I&apos;m not sure if you have any open roles that would fit — but I&apos;d love 20 minutes to learn more about what you&apos;re building if you&apos;re open to it.</p>
              <p className="mt-4">[Your Name]</p>
            </div>

            <p className="mt-8 mb-3 font-bold text-[var(--ink)]">Template 3 — Emailing a recruiter at a target company</p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Subject: [Role area] candidate — [Your Name]</p>
              <p className="mt-4">Hi [Name],</p>
              <p className="mt-4">I&apos;m reaching out because I&apos;m actively looking for [type of role] at [company stage/type] companies, and [their company] is one of my top targets.</p>
              <p className="mt-4">Background: [Most relevant title + company + one metric]. I&apos;m specifically interested in [type of role] because [genuine reason tied to their company].</p>
              <p className="mt-4">If you have any relevant open roles or expect to in the next few months, I&apos;d love to be on your radar.</p>
              <p className="mt-4">[Your Name] · [LinkedIn URL]</p>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Subject lines that get opened</h2>
            <div className="mt-4 space-y-2">
              {[
                "\"Saw your post on [topic] — question from a [role]\"",
                "\"[Their product] user for 2 years — interested in [role]\"",
                "\"[Mutual connection] suggested I reach out\"",
                "\"[Specific role] — [Your Name] / [Company you worked at]\"",
                "\"Quick question about [specific team/product area]\"",
              ].map((line) => (
                <div key={line} className="rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-2.5">
                  <p className="text-[13px] font-mono text-[var(--muted)]">{line}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The follow-up sequence</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              One follow-up, 5–7 business days after your first email. Keep it shorter than the original. Reference the first email. If still no response, move on — two contacts is the limit for cold outreach to someone you don&apos;t know.
            </p>
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Follow-up (5–7 days later):</p>
              <p className="mt-3">Hi [Name], just bumping this up in case it got buried. Happy to make it easier to respond — a quick &apos;not now&apos; or &apos;send me your resume&apos; is completely fine either way.</p>
              <p className="mt-2">[Your Name]</p>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get your full job search coached by AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Resume, LinkedIn, interview prep, and job search strategy — one AI career coach for your entire search.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start job search coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
