import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Nursing Interview Questions — With Strong Answers (2025)",
  description:
    "The most common nursing interview questions — behavioral, clinical scenario, and situational — with strong STAR-method answers. Covers new grad RN, travel nursing, ICU, and charge nurse interviews.",
  keywords: ["nursing interview questions", "nursing interview questions and answers", "RN interview questions", "new grad nurse interview", "nursing behavioral interview", "travel nurse interview questions", "charge nurse interview questions 2025"],
  alternates: { canonical: "/blog/nursing-interview-questions" },
  openGraph: {
    title: "Nursing Interview Questions — With Strong Answers (2025)",
    description: "Behavioral, clinical scenario, and situational nursing interview questions — with strong STAR-method answers for RN, new grad, and specialty interviews.",
    url: "/blog/nursing-interview-questions",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const BEHAVIORAL_QUESTIONS = [
  {
    question: "Tell me about a time you had to prioritize multiple patients with competing needs.",
    why_asked: "Tests your triage reasoning, patient safety decision-making, and ability to communicate under pressure. This is the most common behavioral question in nursing interviews at every level.",
    strong_answer: "Situation: I was charge nurse on a med-surg floor during a short-staffed evening shift — 6 nurses for a 30-patient unit. Two patients simultaneously required urgent attention: one was deteriorating (dropping O2 sats, increasing respiratory rate) and another had just become agitated and was attempting to self-extubate. Task: I needed to assess which was the higher acuity situation and deploy available resources immediately. Action: I quickly assessed that the respiratory deterioration was higher acuity — I took that patient myself, called for rapid response, and delegated the agitated patient to the most experienced CNA with instructions to page me if the situation escalated while I was stabilizing the first patient. I also notified the attending immediately. Result: The deteriorating patient was transferred to ICU within 45 minutes and stabilized. The second patient was managed safely without incident. After the shift, I debriefed with the team and documented the decision process.",
    key_elements: "Named the specific clinical signs, demonstrated STAR structure, showed both clinical and leadership decision-making, and included communication and documentation.",
  },
  {
    question: "Describe a time you caught an error — your own or someone else's — before it reached the patient.",
    why_asked: "Tests your attention to detail, medication safety knowledge, and willingness to speak up in a culture of safety. Interviewers want to hear that you understand near-miss reporting and safety culture.",
    strong_answer: "Situation: During a medication reconciliation on admission, I noticed a newly admitted patient's current medications included metformin — but the admitting physician had ordered IV contrast for an imaging study without checking the medication list. Task: I needed to prevent a potential metformin-contrast interaction (lactic acidosis risk) before the imaging study. Action: I immediately called the radiologist and admitting physician, flagged the interaction, and held the contrast until the physician could review. I documented the interaction flag in the chart and confirmed the updated orders in writing. Result: The imaging was rescheduled with appropriate metformin hold protocol. The patient received safe care. I submitted a near-miss safety report, which was used in the next unit safety meeting as a teaching case.",
    key_elements: "Named the specific clinical safety issue (not generic 'caught an error'), showed proper escalation, documentation, and safety culture participation.",
  },
  {
    question: "Tell me about a time you had a difficult interaction with a patient or family member.",
    why_asked: "Tests your de-escalation skills, empathy, professionalism, and ability to maintain therapeutic relationships under emotional pressure.",
    strong_answer: "Situation: A family member of a post-op patient became increasingly hostile, demanding the attending come immediately and threatening to file a complaint because they felt updates weren't coming frequently enough. Task: I needed to de-escalate the situation, address their legitimate concern about communication, and maintain the therapeutic environment for the patient. Action: I stepped away from the bedside, spoke with the family member calmly, and acknowledged that they were frightened and had a right to be informed. I set up a specific communication structure — I would personally update them every two hours and flag any changes immediately. I also called the attending to provide a brief update, which I relayed to the family. Result: The family member's hostility reduced significantly once they had a concrete plan. The patient noted afterward that they appreciated how I handled their family. No complaint was filed.",
    key_elements: "Acknowledged the legitimate underlying need, showed specific de-escalation technique, created a concrete solution, and closed with a patient outcome.",
  },
];

const CLINICAL_SCENARIO_QUESTIONS = [
  {
    scenario: "Your patient's blood pressure suddenly drops to 80/50. Walk me through your immediate response.",
    category: "Emergency Response",
    strong_approach: "Call for help immediately — don't leave the patient alone. Assess airway, breathing, circulation. Position the patient supine (or Trendelenburg if not contraindicated). Start a rapid fluid bolus if not contraindicated and there's IV access. Check current medications for vasodilators or antihypertensives recently administered. Notify the attending or call rapid response. Review the most recent vitals trend — was this a sudden drop or gradual decline? Continuous cardiac monitoring. Document everything with timestamps.",
    what_they_look_for: "ABCDE approach, immediate delegation and communication, not waiting to act, and systematic thinking rather than panic. They're evaluating whether you know when to call for help vs. handle independently.",
  },
  {
    scenario: "You receive a verbal order from a physician you've worked with before. What do you do?",
    category: "Safety & Policy",
    strong_approach: "Repeat back the order immediately and clearly — 'I'm reading back: [medication], [dose], [route], [frequency] — is that correct?' Document the verbal order in the chart with the physician's name and note it as a verbal order requiring countersignature within 24 hours per your facility policy. Follow up to ensure the countersignature is completed. For high-alert medications (opioids, insulin, anticoagulants), facility policy may require two nurses to verify before administration.",
    what_they_look_for: "Read-back protocol, documentation of verbal orders, understanding of high-alert medication additional verification requirements. This tests policy compliance and safety culture.",
  },
  {
    scenario: "You're concerned that a patient's condition is deteriorating but the physician doesn't share your concern. What do you do?",
    category: "Patient Advocacy & Escalation",
    strong_approach: "Document your assessment with specific objective findings — not just 'patient doesn't look right' but vital signs trending, level of consciousness changes, new symptoms, urine output, skin color. Re-present the data to the physician with the specific changes noted over time. If you remain concerned after that conversation, escalate per your facility's chain of command — charge nurse, nursing supervisor, attending, hospitalist. If the situation is acute, rapid response or STAT page is appropriate. Know and use your facility's SBAR communication tool for structured escalation.",
    what_they_look_for: "Objective documentation, structured communication, willingness to escalate, and patient advocacy without insubordination. They want to hear that you'll fight for your patient through the right channels.",
  },
];

const BY_INTERVIEW_TYPE = [
  {
    type: "New Graduate RN Interview",
    focus: "Clinical learning approach, teamwork, error prevention, and passion for the specialty. New grad interviewers know you don't have deep experience — they're evaluating coachability, safety mindset, and fit.",
    specific_questions: "'How do you plan to build your clinical skills in your first year?' / 'How do you respond when you don't know the answer to something?' / 'Why this unit specifically?'",
    what_to_emphasize: "Clinical experiences from nursing school — capstone rotations, clinical hours, preceptorships. Specific patient care moments where you demonstrated good judgment. Your study habits, learning approach, and any certifications or additional coursework.",
  },
  {
    type: "Travel Nurse Interview",
    focus: "Adaptability, rapid orientation, ability to work independently in an unfamiliar environment, and specific unit certifications. Travel assignments expect you to be productive faster than a permanent hire.",
    specific_questions: "'How quickly do you typically become independent in a new unit?' / 'What's the shortest orientation you've worked with, and how did you handle it?' / 'What certifications do you hold for this specialty?'",
    what_to_emphasize: "Years of specialty experience, specific certifications (ACLS, PALS, BLS, specialty certs), number of previous travel assignments, and examples of adapting quickly to new systems and teams.",
  },
  {
    type: "Charge Nurse Interview",
    focus: "Leadership, conflict resolution, staffing decisions, and communication with administration. Charge nurse candidates are evaluated as leaders, not just clinicians.",
    specific_questions: "'Tell me about a time you had to mediate a conflict between two nurses.' / 'How do you handle a nurse who is struggling with a patient assignment?' / 'Describe how you'd handle a call-out when you're already short-staffed.'",
    what_to_emphasize: "Specific leadership examples from your clinical career — times you led others, made staffing decisions, handled escalations, or trained/mentored junior nurses. Shift leadership experience, charge experience in previous roles.",
  },
];

const FAQS = [
  { question: "How should nurses prepare for behavioral interview questions?", answer: "Build a library of 5–8 STAR stories from your clinical experience before any interview — each one addressing a distinct competency: patient prioritization, error prevention, difficult communication, clinical emergency, ethical dilemma, teamwork conflict, patient advocacy, and leadership. Most behavioral nursing interviews draw from this same set of competencies. Having prepared stories means you're never starting from scratch on any question — you're selecting from a pre-built library and adapting the details to the specific question. Practice delivering each story in 2–3 minutes, with the action and result as the most specific part." },
  { question: "What should new grad nurses say when asked about experience they don't have?", answer: "Be honest and bridge to adjacent experience. 'I haven't had the opportunity to manage a PICC line independently, but during my ICU clinical rotation I assisted with PICC care and documentation, and I've completed [specific training or simulation]. I'm confident I can build this skill quickly with guidance.' This is better than deflecting ('I'm a quick learner') or overclaiming experience you don't have. Every new grad interviewer knows you have limited experience — they're evaluating your honesty, self-awareness, and learning approach." },
  { question: "How long should a nursing interview answer be?", answer: "Behavioral questions (STAR format): 2–3 minutes. Clinical scenario questions: 1–2 minutes for the core approach, then open to follow-up. 'Why nursing' or motivational questions: 60–90 seconds. Most nursing interviewers are also clinicians with limited time — concise, specific answers are more impressive than comprehensive narratives. The signal that an answer is too long: you're describing context and background longer than you're describing your specific action and result. For STAR answers, the A (Action) and R (Result) should take up 60% of the answer time." },
];

export default async function NursingInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Nursing Interview Questions — With Strong Answers (2025)"
        description="Behavioral, clinical scenario, and situational nursing interview questions — with strong STAR-method answers for RN, new grad, and specialty interviews."
        url={`${BASE_URL}/blog/nursing-interview-questions`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Nursing Interview Questions", url: `${BASE_URL}/blog/nursing-interview-questions` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Nursing</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Nursing Interview Questions</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Behavioral, clinical scenario, and situational questions — with complete STAR-method answers. Covers new grad RN, travel nursing, ICU specialty, and charge nurse interviews.
          </p>
        </div>
      </section>

      {/* Behavioral Questions */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Behavioral questions — with full STAR answers</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">These 3 questions appear in nearly every nursing interview. Study the structure as much as the content.</p>
          <div className="mt-8 space-y-6">
            {BEHAVIORAL_QUESTIONS.map((item, i) => (
              <div key={item.question} className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-extrabold text-white">{i + 1}</span>
                    <p className="font-bold text-[var(--ink)]">&ldquo;{item.question}&rdquo;</p>
                  </div>
                  <p className="mt-2 ml-10 text-[12px] text-[var(--muted)]"><span className="font-semibold">Why they ask this: </span>{item.why_asked}</p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong STAR answer</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.strong_answer}</p>
                  </div>
                  <div className="rounded-xl bg-[var(--brand)]/[0.05] p-3">
                    <p className="text-[12px] font-semibold text-[var(--brand)]"><span className="font-bold">Key elements: </span>{item.key_elements}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Scenarios */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Clinical scenario questions — approach and what they evaluate</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Scenario questions don&apos;t have one perfect answer — interviewers are evaluating your clinical reasoning process, not just the outcome.</p>
          <div className="mt-8 space-y-5">
            {CLINICAL_SCENARIO_QUESTIONS.map((item) => (
              <div key={item.scenario} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-bold text-[var(--ink)]">&ldquo;{item.scenario}&rdquo;</h3>
                  <span className="rounded-full bg-[var(--brand)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">{item.category}</span>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4 mb-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong approach</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.strong_approach}</p>
                </div>
                <div className="rounded-xl bg-amber-50 p-3">
                  <p className="text-[12px] font-semibold text-amber-700"><span className="font-bold">What they're evaluating: </span>{item.what_they_look_for}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Interview Type */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Preparation by interview type</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">New grad, travel nurse, and charge nurse interviews evaluate entirely different things.</p>
          <div className="mt-8 space-y-5">
            {BY_INTERVIEW_TYPE.map((item) => (
              <div key={item.type} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--brand)]">{item.type}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.focus}</p>
                <div className="mt-3 rounded-xl bg-[var(--bg)] p-4 space-y-2">
                  <p className="text-[12px] font-bold text-[var(--muted)]">Specific questions to prepare for:</p>
                  <p className="text-[13px] leading-6 italic text-[var(--muted)]">{item.specific_questions}</p>
                </div>
                <div className="mt-3 rounded-xl bg-emerald-50 p-3">
                  <p className="text-[12px] font-semibold text-emerald-700"><span className="font-bold">What to emphasize: </span>{item.what_to_emphasize}</p>
                </div>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Practice your nursing interview answers before the real thing.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari generates role-specific nursing interview questions from the job description, evaluates your STAR answers with specific feedback, and coaches clinical scenario responses. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
