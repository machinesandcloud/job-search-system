import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Microsoft Behavioral Interview Questions 2025 — Growth Mindset & Values",
  description: "The most common Microsoft behavioral interview questions mapped to their core values: Growth Mindset, Diverse & Inclusive, One Microsoft, Customer Obsessed, and Making a Difference.",
  keywords: ["microsoft behavioral interview questions", "microsoft interview questions", "microsoft interview prep", "microsoft culture fit interview", "growth mindset interview", "microsoft values interview", "microsoft behavioral questions 2025", "microsoft interview tips"],
  alternates: { canonical: "/blog/microsoft-behavioral-interview-questions" },
  openGraph: { title: "Microsoft Behavioral Interview Questions 2025 — Growth Mindset & Values", description: "Common Microsoft behavioral questions mapped to core values — Growth Mindset, One Microsoft, Customer Obsessed, and more.", url: "/blog/microsoft-behavioral-interview-questions" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What are Microsoft's core values for behavioral interviews?", answer: "Microsoft's publicly stated values are: Growth Mindset (learn and grow from mistakes), Diverse & Inclusive (different perspectives make us stronger), One Microsoft (collaborate across teams, not compete), Customer Obsessed (prioritize customer impact), and Making a Difference (use technology to have positive impact on the world). Interviewers score your answers against these — the more your story embodies a specific value, the stronger your response." },
  { question: "How is the Microsoft interview process structured?", answer: "Typically: recruiter phone screen → HireVue or phone interview (30–45 mins, 2–3 behavioral questions) → full loop (3–5 back-to-back interviews, each 45–60 mins). Each interviewer covers different values/competencies. The loop includes a 'hiring manager' interview, often a 'Perspectives' interview focused specifically on diversity/inclusion, and a technical component depending on role." },
  { question: "What is the 'Perspectives' interview at Microsoft?", answer: "Microsoft calls their values-focused interview the 'Perspectives' interview. It specifically probes Diversity & Inclusion — how you've contributed to an inclusive environment, how you've challenged your own biases, how you've amplified underrepresented voices. Prepare a specific example here. A vague 'I believe in diversity' answer will not land." },
  { question: "Does Microsoft still use the 'Why Microsoft?' question?", answer: "Yes, and it's weighted heavily. Microsoft interviewers look for genuine product curiosity — 'I use Teams/Azure/Xbox and noticed X problem you haven't solved yet' is far better than 'I want to work at a big tech company.' The Growth Mindset culture rewards people who have opinions about Microsoft's products and where they could improve." },
];

const CATEGORIES = [
  {
    value: "Growth Mindset", color: "#00A4EF", icon: "🌱",
    desc: "Learn from failure, seek feedback, grow continuously. Satya Nadella's signature value — every interviewer at Microsoft probes for this.",
    questions: [
      { q: "Tell me about a time you failed at something significant.", signal: "What did you actually learn? Did you change your behaviour? Don't minimise the failure." },
      { q: "Describe a time you received critical feedback that was hard to hear.", signal: "Did you accept it gracefully or get defensive? Did you act on it?" },
      { q: "Tell me about a skill you taught yourself in the past year.", signal: "Shows self-directed learning. Be specific — what, why, how, what you produced." },
      { q: "Give an example of when you had to unlearn something you previously believed was right.", signal: "The 'fixed mindset to growth mindset' transition. Strong candidates frame this as a positive story, not a failure." },
    ]
  },
  {
    value: "Customer Obsessed", color: "#7FBA00", icon: "🎯",
    desc: "Deep empathy for customers — internal and external. Show you put customer outcomes above internal metrics.",
    questions: [
      { q: "Tell me about a time you went beyond what was required to solve a customer problem.", signal: "Initiative, empathy, follow-through. The customer doesn't have to be external." },
      { q: "Describe a time you had to make a trade-off between a business goal and customer experience.", signal: "Did you advocate for the customer? How did you balance competing priorities?" },
      { q: "How have you used customer feedback to change the direction of a project?", signal: "Shows you listen and iterate, not just execute a fixed plan." },
    ]
  },
  {
    value: "One Microsoft", color: "#F25022", icon: "🤝",
    desc: "Collaborate across teams, share credit, avoid siloes. Direct counter to the 'stack ranking' culture Microsoft moved away from.",
    questions: [
      { q: "Tell me about a time you worked effectively across teams with competing priorities.", signal: "Shows you can navigate org complexity. Did you share credit? Did you help others succeed?" },
      { q: "Describe a conflict with a peer team and how you resolved it.", signal: "Healthy conflict → alignment. Not 'I convinced them I was right' — 'we found common ground.'" },
      { q: "Have you ever advocated for another team's work or taken credit for a joint achievement appropriately?", signal: "Tests generosity. Shows you don't guard success jealously." },
    ]
  },
  {
    value: "Diverse & Inclusive", color: "#FFB900", icon: "🌍",
    desc: "Specifically probed in the Perspectives interview. Prepare a real, specific story — this is not where to give a policy answer.",
    questions: [
      { q: "Tell me about a time you actively created an inclusive environment for your team.", signal: "Specific action — not 'I believe in diversity.' What did you do, why, and what was the outcome?" },
      { q: "Describe a time you changed your mind because of someone with a different perspective.", signal: "Intellectual humility. A strong answer ends with what you implemented, not just what you heard." },
      { q: "How have you ensured quieter voices are heard in team discussions?", signal: "Proactive inclusion behaviour. Process you built, not just good intentions." },
    ]
  },
];

export default async function MicrosoftBehavioralInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Microsoft Behavioral Interview Questions 2025" description="Common Microsoft behavioral interview questions mapped to core values — Growth Mindset, One Microsoft, Customer Obsessed, and Diverse & Inclusive." url={`${BASE_URL}/blog/microsoft-behavioral-interview-questions`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Microsoft Behavioral Interview Questions", url: `${BASE_URL}/blog/microsoft-behavioral-interview-questions` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #00A4EF 45%, #7FBA00 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Interview Prep · Microsoft</span>
            <span className="text-[12px] text-white/35">16 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Microsoft Behavioral Interview Questions 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">Microsoft&apos;s values-based interview framework — Growth Mindset, One Microsoft, Customer Obsessed, and Diverse & Inclusive — with signals and question breakdowns.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">Microsoft&apos;s 5 core values — what interviewers probe</h2>
          <div className="mb-12 grid gap-3 sm:grid-cols-5">
            {[
              { v: "Growth Mindset", c: "#00A4EF" },
              { v: "Customer Obsessed", c: "#7FBA00" },
              { v: "One Microsoft", c: "#F25022" },
              { v: "Diverse & Inclusive", c: "#FFB900" },
              { v: "Making a Difference", c: "#737373" },
            ].map(({ v, c }) => (
              <div key={v} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 text-center">
                <div className="text-[12px] font-bold" style={{ color: c }}>{v}</div>
              </div>
            ))}
          </div>

          {CATEGORIES.map(({ value, color, icon, desc, questions }) => (
            <div key={value} className="mb-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em]" style={{ color }}>{value}</h2>
              </div>
              <p className="mb-5 text-[14px] leading-6 text-[var(--muted)]">{desc}</p>
              <div className="space-y-3">
                {questions.map(({ q, signal }, i) => (
                  <div key={i} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                    <div className="flex items-start gap-3 border-b border-[var(--border)] p-4">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold" style={{ background: `${color}18`, color }}>{i + 1}</span>
                      <p className="font-semibold text-[14px]">{q}</p>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-3">
                      <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold uppercase text-[var(--muted)]">Signal</span>
                      <p className="text-[13px] leading-5 text-[var(--muted)]">{signal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">STAR formula for Microsoft — with Growth Mindset framing</h2>
          <p className="mb-5 text-[14px] leading-7 text-[var(--muted)]">Standard STAR works, but Microsoft interviewers reward an extra layer: what you learned or how your thinking evolved. Add an &apos;L&apos; — STAR+L (Learn).</p>
          <div className="mb-10 space-y-2">
            {[
              { label: "Situation", desc: "Set the context briefly. What was the environment, what was at stake?" },
              { label: "Task", desc: "Your specific responsibility — what were you accountable for?" },
              { label: "Action", desc: "What YOU did. Be specific — not the team, you. Decisions, trade-offs, actions taken." },
              { label: "Result", desc: "Quantified outcome. What changed because of your action?" },
              { label: "Learn (Microsoft+)", desc: "What would you do differently? What did this teach you? This is the Growth Mindset signal." },
            ].map(({ label, desc }) => (
              <div key={label} className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#00A4EF]/10 text-[11px] font-bold text-[#00A4EF]">{label[0]}</span>
                <div>
                  <span className="font-bold text-[13px]">{label} </span>
                  <span className="text-[13px] text-[var(--muted)]">— {desc}</span>
                </div>
              </div>
            ))}
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #00A4EF 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Practice your Microsoft Growth Mindset answers.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari simulates Microsoft-style behavioral interviews with STAR+L scoring — so you walk in knowing your stories hit the right signals.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#00A4EF]">Start Microsoft interview prep free</Link>
          <p className="mt-4 text-[12px] text-white/30">Also see: <Link href="/blog/amazon-behavioral-interview-questions" className="underline">Amazon LP questions</Link> · <Link href="/blog/google-behavioral-interview-questions" className="underline">Google Googleyness questions</Link></p>
        </div>
      </section>
    </PageFrame>
  );
}
