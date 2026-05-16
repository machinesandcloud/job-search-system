import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Handle a Bad Reference — What to Do Before It Tanks Your Offer (2025)",
  description:
    "Most candidates don't know they have a bad reference until offers stop coming. Learn the 4 types of damaging references, how to detect one, and the exact steps to fix it before it costs you the job.",
  keywords: ["bad reference for job", "how to handle a bad reference", "bad job reference what to do", "reference check failed", "replace a bad reference", "job reference strategy"],
  alternates: { canonical: "/blog/how-to-handle-a-bad-reference" },
  openGraph: {
    title: "How to Handle a Bad Reference — What to Do Before It Tanks Your Offer",
    description: "The 4 types of bad references, how to detect them, and the repair playbook — before a bad reference kills your next offer.",
    url: "/blog/how-to-handle-a-bad-reference",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const REFERENCE_TYPES = [
  {
    type: "The silent reference",
    accent: "#7C3AED",
    signal: "Confirms dates, title, and eligibility for rehire — nothing else.",
    why: "Your reference is either following legal advice to say nothing, or they're protecting themselves from a difficult conversation. Either way, the hiring manager notices the cold, procedural tone.",
    fix: "Replace immediately. A bare-minimum reference communicates something to every experienced recruiter. Even if it isn't negative, the silence reads as an absence of enthusiasm — which is enough to tip a close call against you.",
  },
  {
    type: "The faint-praise reference",
    accent: "#0891B2",
    signal: "'She was a solid contributor.' 'He got his work done.' 'She was fine to work with.'",
    why: "Hiring managers are calibrated to read enthusiasm. When a reference gives generic, lukewarm language for a strong candidate, it reads as deliberate restraint. The manager assumes the reference is holding something back.",
    fix: "Call your reference before they receive contact. Ask directly: 'Would you be able to speak enthusiastically about my work on X and Y?' If they hedge or pause, thank them and tell them you'll use a different reference this cycle.",
  },
  {
    type: "The actively negative reference",
    accent: "#DC2626",
    signal: "You had a documented conflict, were put on a PIP, left under difficult circumstances, or were managed out.",
    why: "This is the reference you know about. What you may not know: how often references are contacted, whether the reference is willing to go off-script, and whether your story aligns with theirs.",
    fix: "Don't list this person. If they're the only person at a company and the employer requires references from your tenure there, proactively contextualize: 'I want to be transparent — my departure from X was not amicable. I'd recommend speaking with my skip-level or a peer rather than my direct manager.' Honesty preempts a bad surprise.",
  },
  {
    type: "The outdated reference",
    accent: "#059669",
    signal: "A reference from a role 8–12 years ago who has to pause to remember your name or what you worked on.",
    why: "Not malicious — just useless. Employers want to hear about who you are now, not who you were when you were 26. An outdated reference also signals that you don't have stronger, more recent advocates.",
    fix: "Build references from your current and most recent roles. If you've been at one company for a long time, reference peers and skip-levels, not just managers. If you left your last company on difficult terms, references from clients, vendors, or cross-functional partners are legitimate alternatives.",
  },
];

const WARNING_SIGNS = [
  { sign: "Multiple final rounds, no offers", detail: "If you're consistently making it to the reference check stage and then losing out, the pattern points to your references — not your interviews." },
  { sign: "Recruiter goes quiet after references are provided", detail: "Strong candidates don't disappear. When communication stops right after references are submitted, something came back that changed the decision." },
  { sign: "Offer is delayed or rescinded", detail: "Reference checks can extend timelines. When a check triggers a follow-up call or an abrupt silence, a reference almost certainly said something that created doubt." },
  { sign: "A colleague warns you", detail: "If someone who works closely with your reference mentions that they've said critical things about your work, take it seriously. People often don't self-report bad references." },
  { sign: "You haven't spoken to your reference in years", detail: "People change. Relationships drift. A reference who would have raved about you four years ago may not remember you well enough — or may have revised their opinion based on context you don't know about." },
];

const FAQS = [
  { question: "Can a former employer legally give a bad reference?", answer: "Yes, in most US states and many countries. The common belief that companies can only confirm 'dates and title' is a HR policy at many large companies, not a legal requirement. Individual managers at smaller companies often speak freely. Some states (like California) have stronger defamation protections, but a reference that states facts — even negative ones — is generally protected as long as it's truthful and not malicious." },
  { question: "Should I tell potential employers about a complicated reference situation?", answer: "In most cases, proactive disclosure is the right call. Saying something like 'I want to be transparent that my departure from X was not on great terms — I'm happy to provide peer or client references from that period' gives you control of the narrative. Surprises are always worse than context. If the bad reference comes out without your framing, it looks like you were hiding something." },
  { question: "How many references should I have ready?", answer: "Have at least 5–6 strong references prepped at any time, even if employers only ask for 3. This gives you flexibility to match the reference to the role — a peer reference for a collaborative role, a manager reference for a leadership track, a client reference if you're going into sales. Never scramble to build a reference list during an active search." },
  { question: "Can I use a reference checking service to test my own references?", answer: "Yes. Services like SkillSurvey, Checkster, and some HR platforms allow you to run a test check on your own references. Some independent consultants offer this as well. It's worth doing if you've had multiple late-stage losses and can't identify the cause. The cost is low compared to a lost offer." },
];

export default async function HowToHandleABadReferencePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Handle a Bad Reference — What to Do Before It Tanks Your Offer (2025)"
        description="The 4 types of bad references, how to detect them, and the repair playbook."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/how-to-handle-a-bad-reference`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Handle a Bad Reference", url: `${BASE_URL}/blog/how-to-handle-a-bad-reference` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Job Search Strategy</span>
            <span className="text-[11px] text-white/30">7 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            How to handle<br />a bad reference
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most candidates don&apos;t know they have a damaging reference until offers stop materializing. By then, it&apos;s already cost them jobs. Here&apos;s how to audit, detect, and fix a bad reference before it ends your search.
          </p>
        </div>
      </section>

      {/* The core problem */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The reference problem most candidates ignore</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-7 text-[var(--muted)]">
            <p>References are the last checkpoint before an offer — and the most commonly mismanaged part of the job search. Candidates spend weeks tailoring resumes, prepping STAR answers, and researching companies. Then they send in three references without verifying a single one.</p>
            <p>The painful reality: <strong className="text-[var(--ink)]">a single lukewarm reference can override a near-perfect interview performance.</strong> Hiring managers are pattern-matchers. When everything else signals yes and a reference signals hesitation, the offer goes to the candidate who has no question marks.</p>
            <p>The four types of bad references below aren&apos;t all obvious. The most damaging ones are often the ones you thought were fine.</p>
          </div>
        </div>
      </section>

      {/* Reference types */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 4 types of bad references</h2>
          <div className="mt-8 space-y-5">
            {REFERENCE_TYPES.map((r, i) => (
              <div key={r.type} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-center gap-3 border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: r.accent, borderLeftWidth: 4 }}>
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ backgroundColor: r.accent }}>{i + 1}</span>
                  <p className="font-bold text-[var(--ink)]">{r.type}</p>
                </div>
                <div className="space-y-4 px-6 py-5">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">What it sounds like</p>
                    <p className="text-[13.5px] italic leading-6 text-[var(--muted)]">{r.signal}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Why it hurts you</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{r.why}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: r.accent }}>What to do</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{r.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning signs */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 signs a reference is hurting you right now</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">You often can&apos;t get direct feedback on references. These patterns are the signals to watch for.</p>
          <div className="mt-8 space-y-4">
            {WARNING_SIGNS.map((w, i) => (
              <div key={w.sign} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{w.sign}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{w.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proactive reference strategy */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The reference audit — run this before you start applying</h2>
          <div className="mt-8 space-y-6">
            {[
              { step: "Contact all potential references now, not during an active search", detail: "When you&apos;re under time pressure from an offer deadline, you can&apos;t properly evaluate whether a reference is strong. Do the audit when you have time to think and replace." },
              { step: "Ask directly: 'Can you give me a strong recommendation?'", detail: "Not 'can I use you as a reference.' The word 'strong' is intentional — it forces a genuine response. A good reference says yes immediately. A hesitant reference says 'sure, of course' with a pause. That pause is information." },
              { step: "Brief your references on what you're targeting", detail: "A reference who talks about your spreadsheet skills when you&apos;re applying for director of product is a wasted reference. Send each reference a short summary: what roles you're targeting, what you'd like them to emphasize, and the key achievements you want them to speak to." },
              { step: "Have 6 references ready, not 3", detail: "This gives you flexibility to match references to the role. For a customer-facing role, lead with a client reference. For a management role, lead with a direct report who can speak to your leadership. Never give the same 3 names to every employer." },
              { step: "Maintain relationships with future references proactively", detail: "The best reference is someone you stayed in contact with — not someone you're emailing for the first time since you left. Keep in touch with past managers and mentors even when you're not job searching." },
            ].map((item, i) => (
              <div key={item.step} className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[13px] font-extrabold text-white">{i + 1}</span>
                <div className="pt-0.5">
                  <p className="font-bold text-[var(--ink)]">{item.step}</p>
                  <p className="mt-1.5 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Reference FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get AI coaching for every stage of your job search</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Resume, interviews, LinkedIn, salary negotiation — and coaching on the parts most candidates overlook, like reference strategy.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
