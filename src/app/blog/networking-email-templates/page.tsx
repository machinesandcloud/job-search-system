import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Networking Email Templates — 8 Word-for-Word Examples That Get Replies (2025)",
  description:
    "8 networking email templates that actually get responses — for informational interviews, referral requests, reconnecting with old contacts, and reaching out to people you don't know.",
  keywords: ["networking email templates", "networking email examples", "how to write a networking email", "informational interview email template", "networking email subject line", "reconnecting with old contacts email", "how to ask for a referral email", "professional networking email 2025"],
  alternates: { canonical: "/blog/networking-email-templates" },
  openGraph: {
    title: "Networking Email Templates — 8 Word-for-Word Examples (2025)",
    description: "8 networking email templates for informational interviews, referrals, reconnecting, and cold outreach — with subject lines that get opened.",
    url: "/blog/networking-email-templates",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-16";
const MODIFIED = "2025-05-16";

const TEMPLATES = [
  {
    situation: "Requesting an informational interview (warm — you know them)",
    accent: "#0D7182",
    subjectLine: "Quick question — 20 minutes?",
    body: `Hi [Name],

I hope you're doing well — I've been following your work at [Company] and it sounds like things are going really well there.

I'm actively thinking about my next move and I'd love to hear your perspective on [specific area — e.g., 'what the product org looks like at your stage' or 'what you wish you'd known transitioning from X to Y'].

Would you have 20 minutes sometime in the next few weeks? Happy to work around your schedule.

[Your Name]`,
    note: "The specific ask ('what you wish you'd known') makes this easier to say yes to than a vague 'pick your brain' request.",
  },
  {
    situation: "Requesting an informational interview (cold — you don't know them)",
    accent: "#7a8dff",
    subjectLine: "Your [specific work/article/talk] — question from a [role]",
    body: `Hi [Name],

I came across [specific piece of their work — article, talk, LinkedIn post, product] and found [specific thing] genuinely useful/interesting. [One sentence showing you actually engaged with it].

I'm a [brief description] exploring [type of role or company], and [their company] is high on my list. I know you're busy, but I'd love 20 minutes to learn more about [specific thing you're curious about].

No worries at all if the timing doesn't work.

[Your Name]`,
    note: "Cold outreach lives or dies on specificity. Reference something concrete — a post, a product, a talk — and prove you engaged with it.",
  },
  {
    situation: "Asking a contact for a referral",
    accent: "#EC4899",
    subjectLine: "Quick ask — [Company] referral",
    body: `Hi [Name],

Hope you're well. I'm applying for the [Role] at [Company] and saw that you work there / know people there.

I know this is a favor to ask, but if you think my background might be a fit, I'd really appreciate a referral or just a nudge to the right person. I've attached my resume and a short note about why I'm excited about [Company specifically].

If it's not a good time or you don't feel comfortable, I completely understand — no pressure either way.

Thanks so much,
[Your Name]`,
    note: "The 'no pressure' line isn't just politeness — it genuinely increases yes rates because it removes the social awkwardness of declining.",
  },
  {
    situation: "Reconnecting with someone you've lost touch with",
    accent: "#F97316",
    subjectLine: "Checking in — it's been a while",
    body: `Hi [Name],

It's been a while since we talked — I was thinking about you recently and wanted to reach out.

[One specific genuine detail: 'I saw you moved to [Company] — how's that going?' or 'I was going through old notes and found something from the [project you worked on together]'].

I'm navigating a job search right now and [Company/industry you know they're connected to] keeps coming up. No ask yet — I just wanted to reconnect and hear how you're doing.

[Your Name]`,
    note: "The 'no ask yet' line is strategic. It lowers the defensiveness that comes with reconnection outreach and usually leads to a more genuine reply — after which a specific ask is much more natural.",
  },
  {
    situation: "Following up after meeting at an event or conference",
    accent: "#10B981",
    subjectLine: "Great to meet you at [Event]",
    body: `Hi [Name],

It was great meeting you at [Event] yesterday — I really enjoyed our conversation about [specific thing you talked about]. [One sentence with a follow-up thought or something that came to mind after].

I'd love to stay in touch. If you're ever interested in [mutual interest or topic], I'd enjoy picking that conversation back up.

[Your Name]`,
    note: "Send within 24–48 hours while the memory is fresh. The specific callback ('our conversation about X') is what turns this from a generic follow-up into a real connection.",
  },
  {
    situation: "Asking an old manager or mentor for a reference",
    accent: "#4ca7e6",
    subjectLine: "Reference request — happy to catch up",
    body: `Hi [Name],

I hope you're doing well. I'm in an active job search and [Company] has asked for references — I'd love to include you if you're willing.

The role is [brief description], so they'll likely be asking about [relevant project or skill]. I'm happy to send you context on what I've been up to since [last time you worked together] if it would help.

No pressure at all if the timing is bad — I understand completely.

[Your Name]`,
    note: "Always give them an easy out. And always tell them what the role is so they can calibrate the reference — a generic 'she's great' is less useful to a hiring manager than a targeted testimonial.",
  },
];

export default async function NetworkingEmailTemplatesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Networking Email Templates — 8 Word-for-Word Examples That Get Replies (2025)"
        description="8 networking email templates for informational interviews, referrals, reconnecting, and cold outreach — with subject lines that get opened."
        url={`${BASE_URL}/blog/networking-email-templates`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Networking Email Templates", url: `${BASE_URL}/blog/networking-email-templates` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Job Search</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">Networking Email Templates — 8 Examples That Get Replies (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 10 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              The hardest part of networking isn&apos;t the relationship — it&apos;s the first message. Most networking emails get no reply because they&apos;re too vague, too long, or too transactional. The templates below are built around one principle: make it easy to say yes.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What every strong networking email has</h2>
            <div className="mt-5 space-y-3">
              {[
                { rule: "A specific ask", detail: "Not 'pick your brain' — a concrete request. '20 minutes to talk about X' is easier to say yes to than 'I'd love to connect.'" },
                { rule: "A reason for reaching out that's about them", detail: "The email should make clear why you're reaching out to this person specifically — their work, their company, something they wrote. Generic outreach reads as mass email." },
                { rule: "An easy out", detail: "The phrase 'no worries if this isn't a good time' genuinely increases response rates. It removes the social obligation that makes people avoid responding." },
                { rule: "Brevity", detail: "5–7 sentences max. If you can't say it in that space, you haven't figured out what you're actually asking." },
              ].map((item) => (
                <div key={item.rule} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <span className="mt-0.5 text-[var(--brand)] font-bold">→</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.rule}</p>
                    <p className="text-[13.5px] leading-5 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The templates</h2>

            <div className="mt-6 space-y-8">
              {TEMPLATES.map((t) => (
                <div key={t.situation} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: t.accent }}>{t.situation}</p>
                    <p className="mt-1 text-[12px] text-[var(--muted)]">
                      <span className="font-semibold text-[var(--ink)]">Subject: </span>{t.subjectLine}
                    </p>
                  </div>
                  <div className="p-5">
                    <div className="rounded-xl bg-[var(--bg)] p-5">
                      {t.body.split('\n\n').map((para, i) => (
                        <p key={i} className={`text-[13.5px] leading-7 text-[var(--muted)] font-mono ${i > 0 ? 'mt-3' : ''}`}>{para}</p>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/30 p-3">
                      <p className="text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Why it works: </span>{t.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Subject lines that get opened</h2>
            <p className="mt-3 text-[15px] text-[var(--muted)]">Open rate lives or dies on the subject line. Avoid anything that reads like a newsletter or mass email.</p>
            <div className="mt-4 space-y-2">
              {[
                { works: "\"Question about your work at [Company]\"", why: "Personal, specific, low pressure" },
                { works: "\"[Mutual connection] suggested I reach out\"", why: "Social proof — but only use this if it's true" },
                { works: "\"Saw your post on [topic] — quick question\"", why: "Proves you engaged with their content" },
                { works: "\"20 minutes? [specific topic]\"", why: "States the ask upfront — easy to evaluate" },
                { works: "\"Catching up — [your name]\"", why: "Simple and human for warm reconnections" },
              ].map((item) => (
                <div key={item.works} className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/30 px-4 py-3">
                  <span className="text-emerald-500 font-bold text-[13px] mt-0.5">✓</span>
                  <div>
                    <p className="text-[13px] font-mono text-[var(--muted)]">{item.works}</p>
                    <p className="text-[11.5px] text-[var(--muted)] mt-0.5">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The follow-up rule</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              One follow-up is appropriate. Send it 5–7 business days after the first email. Keep it shorter — two or three sentences max. If there&apos;s still no response after two emails, move on. Chasing a connection that isn&apos;t there isn&apos;t persistence — it&apos;s damaging your reputation with someone you might need later.
            </p>
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="font-semibold text-[var(--ink)] mb-2">Follow-up template:</p>
              <p className="text-[13.5px] leading-7 text-[var(--muted)] font-mono">Hi [Name], just bumping this up in case it got buried. Happy to move forward whenever works for you — or if the timing is off, no worries at all.</p>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Full job search coaching — free to start</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Resume, LinkedIn, interview prep, and cold outreach strategy — AI coaching for the complete job search.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
