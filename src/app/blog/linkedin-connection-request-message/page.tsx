import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "LinkedIn Connection Request Messages — 10 Templates That Get Accepted (2025)",
  description:
    "How to write a LinkedIn connection request message that gets accepted. 10 word-for-word templates for recruiters, hiring managers, cold outreach, mutual connections, and more.",
  keywords: ["linkedin connection request message", "linkedin connection request template", "how to write linkedin connection request", "linkedin connection message examples", "linkedin connection request for job", "linkedin connection request to recruiter", "linkedin connection message template 2025"],
  alternates: { canonical: "/blog/linkedin-connection-request-message" },
  openGraph: {
    title: "LinkedIn Connection Request Messages — 10 Templates That Get Accepted (2025)",
    description: "10 word-for-word LinkedIn connection request templates — for recruiters, hiring managers, cold outreach, and every other situation.",
    url: "/blog/linkedin-connection-request-message",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-16";
const MODIFIED = "2025-05-16";

const TEMPLATES = [
  {
    situation: "Connecting with a recruiter at a company you're targeting",
    accent: "#0D7182",
    note: "Recruiters get dozens of connection requests. The ones that get accepted are short, specific, and make it easy to see why you're reaching out.",
    message: "Hi [Name] — I'm a [role] with [X years] of experience in [domain] and [Company] is at the top of my list for my next move. I'd love to be on your radar if the right role comes up.",
  },
  {
    situation: "Connecting with a hiring manager after applying",
    accent: "#7a8dff",
    note: "This works best when sent the same day you apply. It's not an ask — it's a signal of genuine interest that separates you from the application stack.",
    message: "Hi [Name] — I just applied for the [Role] on your team and wanted to reach out directly to say I'm genuinely excited about this. Happy to connect if you'd like to learn more about my background before the formal process.",
  },
  {
    situation: "Cold connection with someone whose work you've followed",
    accent: "#EC4899",
    note: "The single most effective LinkedIn connection message is one where you prove you've read something they wrote or built. Specificity beats flattery every time.",
    message: "Hi [Name] — I read your post on [specific topic] last week and your take on [specific point] has stuck with me. I work on similar problems in [your context]. Would love to follow your work — no agenda, just genuinely appreciate your thinking.",
  },
  {
    situation: "Connecting after meeting at an event",
    accent: "#F97316",
    note: "The faster you send this after meeting in person, the better. Within 24 hours keeps the memory warm.",
    message: "Great to meet you at [Event] yesterday — enjoyed the conversation about [specific topic]. Would love to stay connected.",
  },
  {
    situation: "Connecting with a mutual connection's colleague",
    accent: "#10B981",
    note: "Name-dropping a mutual connection (honestly) dramatically increases acceptance rates. Only do this if you've actually spoken with the mutual connection about introducing you — otherwise it's deceptive.",
    message: "Hi [Name] — I'm connected with [Mutual Connection] and [he/she/they] suggested I reach out. I'm a [brief description] and your work at [Company] in [area] is directly relevant to what I'm exploring. Would love to connect.",
  },
  {
    situation: "Reconnecting with an old colleague",
    accent: "#4ca7e6",
    note: "Don't over-explain. Keep it simple — the shared history is the connection.",
    message: "Hey [Name] — I realize we've never connected on LinkedIn despite working together at [Company]. Hope you're doing well. Would love to stay in touch.",
  },
  {
    situation: "Connecting with someone in a role you want to learn about",
    accent: "#0D7182",
    note: "This is the informational interview request disguised as a connection request. It's honest and usually welcomed — most people enjoy being asked about their work.",
    message: "Hi [Name] — I'm exploring a move into [field/role type] and your career path from [background] to [current role] is exactly the trajectory I'm trying to understand. I'd love to connect and hopefully learn from your experience.",
  },
  {
    situation: "Connecting with a speaker after a talk or webinar",
    accent: "#EC4899",
    note: "Speakers are in outreach mode after a talk — their acceptance rate for relevant connections goes up significantly for a few days after they present.",
    message: "Hi [Name] — I caught your talk at [Event/Webinar] on [topic]. Your point about [specific takeaway] was the most useful thing I've heard on this topic in a while. Would love to follow your work.",
  },
  {
    situation: "Connecting with a company founder or executive",
    accent: "#F97316",
    note: "Executives get more requests and are more selective. Lead with relevance — why should they care about you specifically?",
    message: "Hi [Name] — I've been following [Company]'s work in [area] since [specific milestone]. I'm a [relevant description] and I find what you're building genuinely compelling. Happy to connect — no ask, just want to follow your journey.",
  },
  {
    situation: "General connection with no specific context",
    accent: "#7a8dff",
    note: "When you have no specific reason to connect, honesty is the best approach. A straightforward note that acknowledges the context-free nature of the request is more effective than a fabricated angle.",
    message: "Hi [Name] — I came across your profile while exploring [industry/topic] and your background in [area] is directly relevant to work I'm doing. I know this is a cold connection — but I'd love to stay on each other's radar if that's useful for you too.",
  },
];

export default async function LinkedInConnectionRequestPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="LinkedIn Connection Request Messages — 10 Templates That Get Accepted (2025)"
        description="10 word-for-word LinkedIn connection request templates — for recruiters, hiring managers, cold outreach, and every other situation."
        url={`${BASE_URL}/blog/linkedin-connection-request-message`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "LinkedIn Connection Request Messages", url: `${BASE_URL}/blog/linkedin-connection-request-message` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">LinkedIn</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">LinkedIn Connection Request Messages — 10 Templates That Get Accepted (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 7 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              LinkedIn gives you 300 characters for a connection note. Most people either skip it entirely or write something generic that gets ignored. A short, specific message that explains why you&apos;re connecting gets accepted at 2–3x the rate of a blank request — and creates the foundation for an actual relationship.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What works — and what gets ignored</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Gets accepted</p>
                <ul className="space-y-2">
                  {["Specific reference to their work, company, or background", "A clear, simple reason you're connecting", "Under 200 characters — easy to read in 5 seconds", "Something that makes it easy to say yes"].map(item => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-[var(--muted)]">
                      <span className="text-emerald-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50/30 p-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-red-500">Gets ignored or declined</p>
                <ul className="space-y-2">
                  {["No note at all (blank request)", "Generic 'I'd like to add you to my network'", "Immediate pitch or job ask in the first message", "Wall of text that takes effort to read"].map(item => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-[var(--muted)]">
                      <span className="text-red-400">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">10 word-for-word templates</h2>
            <p className="mt-2 text-[14px] text-[var(--muted)]">Each template is under 300 characters and optimized for the specific situation.</p>

            <div className="mt-6 space-y-6">
              {TEMPLATES.map((t, i) => (
                <div key={t.situation} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: t.accent }}>{i + 1}</div>
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: t.accent }}>{t.situation}</p>
                  </div>
                  <div className="p-5">
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 mb-3">
                      <p className="text-[13.5px] leading-6 text-[var(--muted)] font-mono">{t.message}</p>
                    </div>
                    <p className="text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Why it works: </span>{t.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">After they accept — what to do next</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The connection request is the beginning, not the end. Once accepted, wait 24–48 hours before sending a follow-up message. Don&apos;t pitch immediately — respond to whatever they said when they accepted (if anything), or send a simple acknowledgment: &ldquo;Thanks for connecting — happy to be in each other&apos;s networks.&rdquo;
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              If your goal is an informational interview or a specific ask, make it in a separate message, not in the connection note itself. Connection request → brief exchange → specific ask is the sequence that converts best.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Full LinkedIn coaching — free to start</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Headline, About section, experience bullets, and outreach strategy — AI coaching for your entire LinkedIn presence.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start LinkedIn coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
