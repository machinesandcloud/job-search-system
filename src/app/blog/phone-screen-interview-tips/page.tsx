import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Phone Screen Interview Tips — How to Pass the Recruiter Call (2025)",
  description:
    "A phone screen is a 20-30 minute filter, not a full interview. Recruiters are eliminating candidates who can't articulate the basics — compensation expectations, location, notice period, and a coherent career narrative. What they're actually assessing and how to give answers that move you forward.",
  keywords: ["phone screen interview tips", "phone interview tips", "recruiter phone screen", "how to pass phone interview", "phone screen questions", "recruiter call tips 2025", "phone screening interview", "how to prepare for phone screen"],
  alternates: { canonical: "/blog/phone-screen-interview-tips" },
  openGraph: {
    title: "Phone Screen Interview Tips — How to Pass the Recruiter Call (2025)",
    description: "A phone screen is a 20-30 minute filter. Recruiters eliminate candidates on logistics and basic narrative clarity. What they're assessing and how to pass the screen.",
    url: "/blog/phone-screen-interview-tips",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_RECRUITERS_ARE_ACTUALLY_ASSESSING = [
  {
    criterion: "Basic qualification match",
    detail: "The recruiter has a list of must-haves from the hiring manager — years of experience, specific skills, certifications, location requirements, authorization to work. They're quickly confirming you meet those fundamentals. If you don't, the call ends there regardless of how impressive the rest of your background is.",
    how_to_prepare: "Review the job description and identify the hard requirements. Know in advance which ones you meet, which ones you partially meet, and how to address any gaps confidently without apologizing for them.",
  },
  {
    criterion: "Compensation expectations alignment",
    detail: "Most recruiters will ask about your salary expectations early, often before you've had a chance to learn much about the role. This is a calibration check — they want to know if their budget and your expectations overlap before investing more time in the process. Misalignment here ends the conversation immediately.",
    how_to_prepare: "Research the market rate for the role and have a confident range ready. The range should be calibrated to what you'd actually accept, with the bottom of your range being the number you'd say yes to. Avoid 'I'm flexible' without a number — it signals that you haven't done your research and gives the recruiter nothing to work with.",
  },
  {
    criterion: "Availability and logistics",
    detail: "Notice period, interview availability, location/remote flexibility, and start date. These logistics matter more than most candidates realize — a recruiter filling an urgent role will deprioritize candidates with 3-month notice periods even if they're stronger than the available candidate. Be honest about your constraints but know how much flexibility you actually have.",
    how_to_prepare: "Know your notice period exactly. If you're negotiable on notice (some employers will let you start earlier with compensation, and some employers will wait for the right candidate), know that in advance. For remote/location questions, know the company's actual policy before the call so you can engage specifically.",
  },
  {
    criterion: "Communication clarity",
    detail: "Recruiters are your advocate to the hiring manager — they need to be able to articulate why you're a strong candidate in 3 sentences to someone who hasn't spoken to you. If you can't clearly explain what you do and why this role is interesting to you, the recruiter can't do that job. Rambling, unclear answers leave them with nothing to work with.",
    how_to_prepare: "Prepare a 90-second 'tell me about yourself' that is coherent, specific, and connects logically to why this role makes sense for your next step. Practice saying it out loud — written clarity and spoken clarity are different.",
  },
];

const COMMON_PHONE_SCREEN_QUESTIONS = [
  {
    question: "Tell me about yourself / Walk me through your background",
    what_they_want: "A coherent, chronological narrative that ends at 'why I'm excited about this role.' Not your life story — your relevant career arc in 90 seconds.",
    strong_answer_structure: "Current role + key responsibility → most relevant previous experience → what you're looking for in a next step → why this role specifically. Each segment is 2-3 sentences. Total: 90 seconds maximum.",
    trap_to_avoid: "Starting from 'I graduated in...' and narrating every job chronologically forward. Recruiters want to understand where you are now and why this role makes sense — not a LinkedIn read-through.",
  },
  {
    question: "What are your salary expectations?",
    what_they_want: "A number or range they can evaluate against the budget. They need to know if the conversation can continue.",
    strong_answer_structure: "Give a range with your target at the midpoint: 'Based on my research and my experience level, I'm targeting somewhere in the $X–$Y range — though I'm open to discussing the full compensation package including equity and benefits.' The range gives you room; the equity mention signals you're thinking holistically.",
    trap_to_avoid: "Saying 'I'm flexible' or 'whatever is fair' without a number. This signals you haven't done market research and doesn't give the recruiter anything to work with. A well-researched range is never off-putting to a recruiter.",
  },
  {
    question: "Why are you looking to leave your current role?",
    what_they_want: "A professional, forward-looking answer that doesn't raise concerns about your reliability or attitude.",
    strong_answer_structure: "One honest, positive-framing reason: 'I've accomplished X in my current role and I'm looking for [next-level challenge / broader scope / specific type of work]. This role stood out because [specific reason from job description].' The 'because' that connects to this specific role is what makes the answer complete.",
    trap_to_avoid: "Criticizing your current employer, manager, or team — even subtly. Anything that sounds like 'my manager is difficult' or 'the company doesn't value my work' raises a character question. Recruiters hear the subtext.",
  },
  {
    question: "What do you know about us / why this company?",
    what_they_want: "Evidence that you did basic research and have a genuine reason for applying — not that you're mass-applying and don't actually know what they do.",
    strong_answer_structure: "Name something specific about the company (product, recent news, their approach to a problem in your field) + connect it to your background + connect it to what you're looking for. 3 sentences. Specificity is the signal — generic statements about 'mission' and 'culture' without named specifics read as copy-paste.",
    trap_to_avoid: "Answering a 'why this company' question with only 'the role looks like a great fit for my skills.' That's answering why this job, not why this company.",
  },
];

const LOGISTICS_AND_SETUP = [
  { tip: "Stand up or sit at a desk — not lying down", why: "Your breathing and voice energy change when you're horizontal. Recruiters spend all day on calls and can tell. Standing up slightly increases energy in your voice." },
  { tip: "Use a quiet, reliable location", why: "Background noise, poor cellular signal, and intermittent audio are distracting and create a negative halo on everything else you say. If you're using a cell phone, test your signal in the exact location beforehand." },
  { tip: "Have the job description and your resume visible", why: "You'll be referencing both. Having them open means you can answer specific questions about your background accurately and connect your experience to the job description in real time." },
  { tip: "Have a question prepared about next steps", why: "Always end with: 'Can you tell me what the next steps in the process look like and what the timeline is?' This shows you're engaged and helps you understand what to expect. Recruiters who are interested in you will give you a clear, encouraging answer." },
  { tip: "Don't ask about salary during the screen if they haven't brought it up", why: "Let them lead on compensation if they haven't asked. Asking about salary before they do signals that compensation is your primary motivation — not the role or the company. If they ask you first (which most will), answer directly as described above." },
];

const FAQS = [
  { question: "How long should a phone screen last?", answer: "Most recruiter phone screens are scheduled for 20-30 minutes. If a phone screen is running significantly longer, it's usually a good sign — the recruiter is engaged and exploring further. If it's cut short, it's often because you've confirmed something that ends the conversation (compensation misalignment, a missing must-have qualification, location constraints). Prepare for a 30-minute call and be ready to be efficient — don't over-explain when brevity works." },
  { question: "Should you ask questions during a phone screen?", answer: "Yes — at the end, ask 1-2 questions. Good questions for a phone screen: 'What does the next step in the process look like?' 'What are the most important qualities the hiring manager is looking for in this role?' 'What's the timeline for filling the role?' Avoid: questions that suggest you didn't read the job description, questions about salary and benefits before they've been raised, or long multi-part questions that are more appropriate for a hiring manager conversation." },
  { question: "What happens after a phone screen?", answer: "After a phone screen, the recruiter typically does one of three things: (1) schedules you for the next stage immediately or within a few days; (2) tells you they'll be in touch after speaking with the hiring manager; or (3) ends the conversation politely with no next steps (which usually means you're not advancing, though they may not say so directly). If you haven't heard back within 5-7 business days, a brief follow-up email to the recruiter is appropriate: 'I wanted to follow up on our conversation from [date] — I remain very interested in the role and wanted to check in on next steps.'" },
];

export default async function PhoneScreenInterviewTipsPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Phone Screen Interview Tips — How to Pass the Recruiter Call (2025)"
        description="A phone screen is a 20-30 minute filter. Recruiters eliminate candidates on logistics and basic narrative clarity. What they're assessing and how to pass the screen."
        url={`${BASE_URL}/blog/phone-screen-interview-tips`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Phone Screen Interview Tips", url: `${BASE_URL}/blog/phone-screen-interview-tips` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Phone Screen</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Phone Screen Interview Tips</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            A phone screen is a 20-30 minute filter. Recruiters are eliminating candidates who can&apos;t articulate the basics — not selecting finalists. Here&apos;s what they&apos;re actually assessing and how to clear the screen.
          </p>
        </div>
      </section>

      {/* What they assess */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What recruiters are actually assessing</h2>
          <div className="mt-6 space-y-4">
            {WHAT_RECRUITERS_ARE_ACTUALLY_ASSESSING.map((item) => (
              <div key={item.criterion} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.criterion}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-3 rounded-xl bg-[var(--bg)] p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-1">How to prepare</p>
                  <p className="text-[12.5px] leading-5 text-[var(--muted)]">{item.how_to_prepare}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common questions */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common phone screen questions — how to answer each</h2>
          <div className="mt-6 space-y-4">
            {COMMON_PHONE_SCREEN_QUESTIONS.map((q) => (
              <div key={q.question} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">&ldquo;{q.question}&rdquo;</p>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">What they want</p>
                    <p className="text-[13px] text-[var(--muted)]">{q.what_they_want}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Strong answer structure</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{q.strong_answer_structure}</p>
                  </div>
                  <div className="rounded-xl bg-red-50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Trap to avoid</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{q.trap_to_avoid}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Setup and logistics tips</h2>
          <div className="mt-6 space-y-3">
            {LOGISTICS_AND_SETUP.map((item) => (
              <div key={item.tip} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.tip}</p>
                <p className="mt-1.5 text-[13px] leading-5 text-[var(--muted)]">{item.why}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Got a phone screen coming up? Zari helps you prepare for every question.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches your tell-me-about-yourself, your compensation range, your why-this-company — and generates the role-specific questions you&apos;re most likely to face. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
