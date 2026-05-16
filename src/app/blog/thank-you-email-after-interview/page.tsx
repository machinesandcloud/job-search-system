import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Thank You Email After Interview — Examples & Templates (2025)",
  description:
    "How to write a thank you email after an interview that actually helps your candidacy. Includes word-for-word examples, subject lines, and what to include (and never include).",
  keywords: ["thank you email after interview", "thank you note after interview", "interview thank you email", "thank you letter after interview", "follow up email after interview", "interview thank you email examples", "thank you email after job interview"],
  alternates: { canonical: "/blog/thank-you-email-after-interview" },
  openGraph: { title: "Thank You Email After Interview — Examples & Templates", description: "Word-for-word thank you email templates that strengthen your candidacy instead of just checking a box.", url: "/blog/thank-you-email-after-interview" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-01";
const MODIFIED = "2025-05-16";

export default async function ThankYouEmailPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Thank You Email After Interview — Examples & Templates (2025)"
        description="Word-for-word thank you email templates that strengthen your candidacy instead of just checking a box."
        url={`${BASE_URL}/blog/thank-you-email-after-interview`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Thank You Email After Interview", url: `${BASE_URL}/blog/thank-you-email-after-interview` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">Thank You Email After Interview — Examples & Templates (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 8 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              A thank you email after an interview is one of the lowest-effort, highest-leverage moves in a job search. Most candidates don&apos;t send one. Of those who do, most send a generic note that does nothing. Here&apos;s how to send one that actually works.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Should you always send a thank you email?</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Yes — with two caveats. Send it within 24 hours of the interview, ideally within 2-4 hours. And make it specific. A generic "thank you for your time" is worse than nothing because it signals low effort to someone who just spent 45 minutes evaluating you.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              A strong thank you email does three things: confirms your interest, reinforces your strongest selling point, and adds one new piece of information that wasn&apos;t in the interview. Do all three in under 200 words.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The structure that works</h2>
            <div className="mt-5 space-y-4">
              {[
                { part: "Subject line", desc: "Specific, not generic. 'Thank you — [Your Name]' is fine. 'Following up on our conversation about the growth PM role' is better. Never 'Touching base!' or 'Just wanted to say...'." },
                { part: "Opening line", desc: "Reference something specific from the conversation — a specific topic you discussed, a challenge they mentioned, a detail about the role. One sentence. This is what separates a real thank you from a template." },
                { part: "Reinforce your fit", desc: "One to two sentences. The strongest point that connects your background to what they care about. If you left something important unsaid in the interview, this is the moment to say it." },
                { part: "Close", desc: "Confirm your interest directly ('I'm very interested in this role and the team') and make the next step easy ('Happy to send additional information if useful'). Don't be needy or over-eager." },
              ].map((item) => (
                <div key={item.part} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="mb-2 font-bold text-[var(--ink)]">{item.part}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">3 strong thank you email examples</h2>

            <p className="mt-6 mb-3 font-bold text-[var(--ink)]">Example 1 — After a first-round interview (Product Manager role)</p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Subject: Thank you — Sarah Chen</p>
              <p className="mt-4">Hi Marcus,</p>
              <p className="mt-4">Thank you for the conversation this afternoon. The discussion about how you&apos;re thinking about pricing architecture as you move upmarket was genuinely useful — it&apos;s exactly the challenge I spent the last 18 months working through at DataFlow.</p>
              <p className="mt-4">The free-to-paid conversion work I mentioned grew our SMB conversion from 4.2% to 11.8%, but the more relevant piece for what you&apos;re building is the enterprise expansion motion we developed in parallel — which I didn&apos;t get to fully walk through. Happy to share more detail if useful.</p>
              <p className="mt-4">I&apos;m very interested in this role. Looking forward to next steps.</p>
              <p className="mt-4">Sarah</p>
            </div>

            <p className="mt-8 mb-3 font-bold text-[var(--ink)]">Example 2 — After a panel interview (Software Engineer role)</p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Subject: Thank you — Alex Rodriguez</p>
              <p className="mt-4">Hi Jordan,</p>
              <p className="mt-4">Thank you for the time today, and please pass my thanks to the full panel. The system design question around the notification service was more interesting than most — I kept thinking about it after I left and have a cleaner solution than what I sketched out in the session.</p>
              <p className="mt-4">I&apos;m very interested in joining the team. If it would be helpful, I&apos;m happy to do a take-home that demonstrates my approach more clearly.</p>
              <p className="mt-4">Alex</p>
            </div>

            <p className="mt-8 mb-3 font-bold text-[var(--ink)]">Example 3 — After a final-round (when you really want the job)</p>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-[14px] leading-7 text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">Subject: Thank you — Jamie Torres</p>
              <p className="mt-4">Hi Rebecca,</p>
              <p className="mt-4">Thank you for having me through the full loop today. The conversation with the eng leadership about how you&apos;re approaching the data infrastructure rewrite reinforced why I&apos;m excited about this role specifically — it&apos;s the problem I&apos;ve been working toward for the last three years.</p>
              <p className="mt-4">The one thing I&apos;d add to what I said about the migration framework: the approach worked partly because I kept the rollback path simple. I wrote a short doc on the decision if you&apos;d like to send it to the team before you make a decision.</p>
              <p className="mt-4">This is the role I want. Thank you again.</p>
              <p className="mt-4">Jamie</p>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to never write in a thank you email</h2>
            <div className="mt-4 space-y-3">
              {[
                { dont: "\"I just wanted to reach out and thank you for your time.\"", why: "Opens with a filler phrase. Start with something specific instead." },
                { dont: "\"I believe I would be a great fit for this role.\"", why: "A statement without evidence. If you haven't demonstrated fit in the interview, one sentence in a thank you email won't fix it." },
                { dont: "\"I am very excited about this opportunity and hope to hear back soon.\"", why: "Sounds desperate. State your interest once, clearly. Don't hope out loud." },
                { dont: "A 3-paragraph essay", why: "Your thank you email should be under 200 words. If you're explaining yourself at length, you didn't interview well — and this won't fix it." },
              ].map((item) => (
                <div key={item.dont} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ {item.dont}</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">When to send it and what to do after</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Send within 2-4 hours if the interview was in the morning, or before 9 PM if it was in the afternoon. If you interviewed with multiple people, send individual emails to each — not a group email. Each one should reference something specific from that specific conversation.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              If you haven&apos;t heard back by the timeline they gave you (plus 2 business days), it&apos;s appropriate to send one brief follow-up email. After that, stop. Repeated follow-ups don&apos;t accelerate decisions — they annoy interviewers.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Prepare for every interview question with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari&apos;s AI interview coach generates role-specific questions and coaches you through strong answers before the real thing.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
