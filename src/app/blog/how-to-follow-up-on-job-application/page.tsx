import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Follow Up on a Job Application — Email Templates (2025)",
  description:
    "When and how to follow up on a job application with email templates that work. Includes when to send, what to say, and how many times to follow up before moving on.",
  keywords: ["how to follow up on job application", "follow up email job application", "job application follow up email", "follow up after applying for job", "following up on application", "job application follow up template", "when to follow up on job application"],
  alternates: { canonical: "/blog/how-to-follow-up-on-job-application" },
  openGraph: { title: "How to Follow Up on a Job Application — Email Templates (2025)", description: "When to follow up, what to say, and the exact email templates that get responses.", url: "/blog/how-to-follow-up-on-job-application" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-10";
const MODIFIED = "2025-05-16";

export default async function FollowUpJobApplicationPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Follow Up on a Job Application — Email Templates (2025)"
        description="When to follow up, what to say, and the exact email templates that get responses."
        url={`${BASE_URL}/blog/how-to-follow-up-on-job-application`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Follow Up on a Job Application", url: `${BASE_URL}/blog/how-to-follow-up-on-job-application` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Job Search</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">How to Follow Up on a Job Application — Email Templates (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 7 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Most applications go into silence. Following up is appropriate, expected, and often effective — if you do it right. Here&apos;s exactly when to follow up, what to say, and when to stop.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">When to follow up</h2>
            <div className="mt-5 space-y-3">
              {[
                { scenario: "Applied through a job board with no response", timing: "Wait 5–7 business days, then send one follow-up.", note: "Most companies take 1–2 weeks to review applications. Following up before 5 days looks impatient." },
                { scenario: "Applied and had a recruiter screen, no next steps", timing: "Wait the timeline they gave you, plus 2 business days, then follow up once.", note: "Always use the timeline the recruiter gave you as your anchor. If they said 'we'll be in touch next week,' follow up Thursday of that week if you haven't heard." },
                { scenario: "After an interview with no timeline given", timing: "Send a thank you email same day, then follow up once after 5–7 business days.", note: "Two contacts (thank you + follow-up) is the limit. After that you're pushing, not following up." },
                { scenario: "After a final interview", timing: "Send thank you same day. Follow up once at the timeline they gave you. One more follow-up if two weeks pass.", note: "Final-round decisions take longer than candidates expect. Don't interpret silence as rejection." },
              ].map((item) => (
                <div key={item.scenario} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="mb-1 font-bold text-[var(--ink)]">{item.scenario}</p>
                  <p className="mb-2 text-[13px] font-semibold text-[var(--brand)]">{item.timing}</p>
                  <p className="text-[13px] leading-5 text-[var(--muted)]">{item.note}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Follow-up email templates</h2>

            <p className="mt-6 mb-3 font-bold text-[var(--ink)]">Template 1 — After applying with no response (5–7 days)</p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Subject: Following up — [Your Name] / [Role Title]</p>
              <p className="mt-4">Hi [Name],</p>
              <p className="mt-4">I applied for the [Role] position on [date] and wanted to follow up to confirm my application was received and express my continued interest.</p>
              <p className="mt-4">I&apos;m particularly interested in this role because [one specific reason — the product, the team, the problem]. Happy to provide anything additional if useful.</p>
              <p className="mt-4">[Your Name]</p>
            </div>

            <p className="mt-8 mb-3 font-bold text-[var(--ink)]">Template 2 — After an interview with no timeline given</p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Subject: Checking in — [Role Title] / [Your Name]</p>
              <p className="mt-4">Hi [Name],</p>
              <p className="mt-4">I wanted to follow up on our conversation from [date]. I remain very interested in the [Role] position and excited about [specific thing from the interview — a challenge they mentioned, something about the team].</p>
              <p className="mt-4">If there&apos;s anything else you need from me, I&apos;m happy to provide it. Looking forward to hearing about next steps.</p>
              <p className="mt-4">[Your Name]</p>
            </div>

            <p className="mt-8 mb-3 font-bold text-[var(--ink)]">Template 3 — After a final interview (decision taking longer than expected)</p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Subject: [Role Title] — following up</p>
              <p className="mt-4">Hi [Name],</p>
              <p className="mt-4">I know decisions take time and I don&apos;t want to add noise to a busy process — I just want to reiterate that this role is my top priority and I remain very enthusiastic about joining the team.</p>
              <p className="mt-4">Happy to answer any remaining questions or provide references if that would help move the process forward.</p>
              <p className="mt-4">[Your Name]</p>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How many times to follow up</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              <strong>Maximum two follow-ups per stage.</strong> After applying: one follow-up. After an interview: thank you email plus one follow-up. After a final interview: thank you email plus two follow-ups (one at their stated timeline, one two weeks later if still silent).
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              After two follow-ups with no response, move on. Keep the application open in your tracker, but stop contacting. Silence after two attempts is an answer.
            </p>

            <div className="mt-6 space-y-3">
              {[
                { dont: "Following up every 2–3 days", why: "Creates a bad impression that follows you into the interview. Decision-makers talk to recruiters." },
                { dont: "Sending the same email twice", why: "Copy-paste follow-ups signal low effort. At minimum change the subject line and opening sentence." },
                { dont: "Calling the company switchboard", why: "Unless you have a direct relationship, cold calling signals desperation and bypasses process. It rarely helps and often hurts." },
              ].map((item) => (
                <div key={item.dont} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ {item.dont}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get your full job search coached by AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Resume, LinkedIn, interview prep, and job search strategy — one AI career coach for your entire job search.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
