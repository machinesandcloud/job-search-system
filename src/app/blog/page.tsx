import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Career Advice Blog — AI Career Coaching Tips & Guides",
  description:
    "Expert career advice from Zari's AI coaching team. Resume writing, LinkedIn optimization, interview preparation, salary negotiation, and career change guides.",
  keywords: ["career advice", "career tips", "resume tips", "interview tips", "LinkedIn tips", "career coaching blog", "job search tips", "salary negotiation guide"],
  alternates: { canonical: "/blog" },
  openGraph: { title: "Zari Career Advice Blog", description: "AI-backed career guides on resume writing, LinkedIn, interviews, and salary negotiation.", url: "/blog" },
};

const POSTS = [
  {
    slug: "best-ai-career-coach",
    title: "Best AI Career Coach in 2025 — Honest Comparison",
    excerpt: "We tested every major AI career coaching tool. Here's how they compare on resume quality, interview prep, LinkedIn optimization, and actual job outcomes.",
    tag: "Comparison",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "how-to-write-resume-with-ai",
    title: "How to Write a Resume with AI (The Right Way)",
    excerpt: "AI resume tools range from useless generators to powerful ATS optimizers. Here's a step-by-step guide to using AI to write a resume that actually passes the filters.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "how-to-prepare-for-job-interview",
    title: "How to Prepare for a Job Interview: The Complete 2025 Guide",
    excerpt: "The research, the practice, the night before, and the morning of. A comprehensive guide to interview preparation that goes beyond just reviewing common questions.",
    tag: "Interviews",
    readTime: "12 min read",
    date: "April 2025",
    accent: "#EC4899",
  },
  {
    slug: "how-to-optimize-linkedin-profile",
    title: "How to Optimize Your LinkedIn Profile for Recruiter Search",
    excerpt: "LinkedIn's algorithm rewards specific patterns most profiles get completely wrong. Here's exactly how to optimize your headline, About, and experience for maximum visibility.",
    tag: "LinkedIn",
    readTime: "9 min read",
    date: "April 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "salary-negotiation-tips",
    title: "Salary Negotiation Tips: How to Get Paid What You're Worth",
    excerpt: "The research behind negotiation, the exact scripts to use, and how to handle the most common objections. A guide for first-timers and seasoned negotiators.",
    tag: "Negotiation",
    readTime: "11 min read",
    date: "April 2025",
    accent: "#10B981",
  },
  {
    slug: "career-change-guide",
    title: "How to Successfully Change Careers: A Step-by-Step Guide",
    excerpt: "Career changers fail for predictable reasons. This guide covers how to identify transferable skills, reframe your resume, and convince skeptical interviewers your switch makes sense.",
    tag: "Career Change",
    readTime: "13 min read",
    date: "March 2025",
    accent: "#F97316",
  },
  {
    slug: "promotion-strategy-guide",
    title: "How to Get Promoted: The Promotion Strategy That Actually Works",
    excerpt: "Promotion isn't about working harder — it's about working visibly, building sponsorship, and making the case at the right moment. Here's the framework that works.",
    tag: "Promotion",
    readTime: "10 min read",
    date: "March 2025",
    accent: "#EC4899",
  },
  {
    slug: "ats-resume-tips",
    title: "ATS Resume Tips: How to Beat Applicant Tracking Systems",
    excerpt: "87% of resumes never reach a human because of ATS filters. Here's exactly how ATS systems work and how to optimize your resume to pass them every time.",
    tag: "Resume",
    readTime: "8 min read",
    date: "March 2025",
    accent: "#0D7182",
  },
  {
    slug: "what-is-an-ats",
    title: "What Is an ATS? How Applicant Tracking Systems Work (2025)",
    excerpt: "ATS software auto-rejects 87% of resumes before a human sees them. Here's exactly how these systems work, why good candidates get filtered out, and what to do about it.",
    tag: "Job Search Basics",
    readTime: "8 min read",
    date: "January 2025",
    accent: "#7a8dff",
  },
  {
    slug: "linkedin-headline-examples",
    title: "50 LinkedIn Headline Examples That Get Recruiter Attention",
    excerpt: "The exact formula for a LinkedIn headline that gets you found — with 50 word-for-word examples for software engineers, PMs, marketers, sales, and career changers.",
    tag: "LinkedIn",
    readTime: "10 min read",
    date: "February 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "how-to-answer-tell-me-about-yourself",
    title: "How to Answer \"Tell Me About Yourself\" — Examples & Formula",
    excerpt: "The formula, 5 word-for-word examples by career stage, and the 4 mistakes that hurt your first impression in every job interview.",
    tag: "Interviews",
    readTime: "9 min read",
    date: "February 2025",
    accent: "#EC4899",
  },
  {
    slug: "resume-summary-examples",
    title: "Resume Summary Examples That Actually Work (2025)",
    excerpt: "40 resume summary examples across software engineering, product management, marketing, sales, and career changers — with the exact formula for writing yours.",
    tag: "Resume",
    readTime: "10 min read",
    date: "March 2025",
    accent: "#F97316",
  },
  {
    slug: "how-to-negotiate-job-offer",
    title: "How to Negotiate a Job Offer — Scripts, Tactics & What to Say",
    excerpt: "Word-for-word scripts for countering salary, negotiating equity, and handling the 4 most common pushbacks — without losing the offer.",
    tag: "Negotiation",
    readTime: "11 min read",
    date: "March 2025",
    accent: "#10B981",
  },
  {
    slug: "star-method-interview",
    title: "The STAR Method for Interviews — Examples & Formula (2025)",
    excerpt: "How to use the STAR method to answer behavioral interview questions — with 10 word-for-word examples for the most common questions.",
    tag: "Interviews",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#EC4899",
  },
  {
    slug: "behavioral-interview-questions",
    title: "30 Behavioral Interview Questions (With Strong Answers)",
    excerpt: "The 30 behavioral questions that appear in every interview, the STAR answers that impress, and the mistakes that eliminate candidates on the spot.",
    tag: "Interviews",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "how-to-write-a-cover-letter",
    title: "How to Write a Cover Letter That Gets Read (2025) — With Examples",
    excerpt: "The exact structure, 5 opening lines that work, a complete word-for-word example, and what to never write in a cover letter.",
    tag: "Cover Letters",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "common-interview-questions",
    title: "40 Most Common Interview Questions (With Strong Answers) — 2025",
    excerpt: "The 40 interview questions that appear in nearly every job interview — with strong, specific answers and the thinking behind each one.",
    tag: "Interviews",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "thank-you-email-after-interview",
    title: "Thank You Email After Interview — Examples & Templates (2025)",
    excerpt: "How to write a thank you email after an interview that actually helps your candidacy. Includes 3 word-for-word examples and what to never write.",
    tag: "Interviews",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "resume-format-guide",
    title: "Resume Format Guide: Which Format Is Best for You? (2025)",
    excerpt: "Chronological, functional, or hybrid? The complete guide to resume formats — which one to use based on your experience, career history, and target role.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "how-to-ask-for-a-raise",
    title: "How to Ask for a Raise — Scripts, Timing & What to Say (2025)",
    excerpt: "The exact timing, preparation steps, and word-for-word scripts for a raise conversation — plus how to handle the 4 most common objections.",
    tag: "Negotiation",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "linkedin-summary-examples",
    title: "20 LinkedIn Summary Examples That Actually Work (2025)",
    excerpt: "20 LinkedIn About section examples for software engineers, product managers, marketers, career changers, and more — with the formula behind each one.",
    tag: "LinkedIn",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "how-to-explain-gaps-in-employment",
    title: "How to Explain Gaps in Employment — Scripts & Examples (2025)",
    excerpt: "Word-for-word scripts for explaining employment gaps in interviews — for layoffs, health reasons, caregiving, and career pivots.",
    tag: "Job Search",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "job-search-tips",
    title: "25 Job Search Tips That Actually Work in 2025",
    excerpt: "25 specific, actionable job search strategies — covering ATS, LinkedIn, networking, referrals, and the mindset mistakes that slow you down.",
    tag: "Job Search",
    readTime: "13 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "weakness-interview-answer",
    title: "\"What Is Your Greatest Weakness?\" — 10 Strong Answers (2025)",
    excerpt: "The formula and 10 real examples for answering the weakness question — without sounding fake or rehearsed.",
    tag: "Interviews",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#EC4899",
  },
  {
    slug: "interview-questions-to-ask",
    title: "Best Questions to Ask in a Job Interview — 30 Examples (2025)",
    excerpt: "30 smart questions to ask at the end of a job interview — with what each one signals to the interviewer.",
    tag: "Interviews",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "how-to-follow-up-on-job-application",
    title: "How to Follow Up on a Job Application — Email Templates (2025)",
    excerpt: "When and how to follow up on a job application with email templates that work — and how many times is too many.",
    tag: "Job Search",
    readTime: "7 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "professional-summary-for-resume",
    title: "Professional Summary for Resume — Examples & Formula (2025)",
    excerpt: "The 3-sentence formula and examples for writing a resume summary that makes recruiters read the rest of your resume.",
    tag: "Resume",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "how-to-cold-email-for-a-job",
    title: "How to Cold Email for a Job — Templates That Get Responses (2025)",
    excerpt: "How to cold email a hiring manager or recruiter for a job. Includes subject lines, word-for-word email templates, and the follow-up sequence that gets responses.",
    tag: "Job Search",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "career-goals-examples",
    title: "Career Goals Examples — How to Answer \"What Are Your Career Goals?\" (2025)",
    excerpt: "15 word-for-word career goals examples for interviews — plus the formula, what interviewers are actually testing, and what never to say.",
    tag: "Interviews",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "linkedin-recommendation-examples",
    title: "LinkedIn Recommendation Examples — How to Write One That Actually Helps (2025)",
    excerpt: "How to write a LinkedIn recommendation that lands — with word-for-word examples for managers, colleagues, direct reports, and clients, plus how to ask for one.",
    tag: "LinkedIn",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "how-to-write-two-weeks-notice",
    title: "How to Write a Two Weeks Notice — Resignation Letter Templates (2025)",
    excerpt: "Word-for-word resignation letter templates for every situation — standard notice, warm departure, hostile environment, and urgent exit. Plus what never to include.",
    tag: "Job Search",
    readTime: "7 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "networking-email-templates",
    title: "Networking Email Templates — 8 Word-for-Word Examples That Get Replies (2025)",
    excerpt: "8 networking email templates for informational interviews, referral requests, reconnecting with old contacts, and cold outreach — with subject lines that get opened.",
    tag: "Job Search",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "how-to-answer-why-do-you-want-to-work-here",
    title: "\"Why Do You Want to Work Here?\" — How to Answer (With Examples) 2025",
    excerpt: "The formula and 5 word-for-word examples for 'Why do you want to work here?' — the interview question that reveals whether you actually did your research.",
    tag: "Interviews",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#EC4899",
  },
  {
    slug: "how-to-evaluate-a-job-offer",
    title: "How to Evaluate a Job Offer — The Complete Framework (2025)",
    excerpt: "The 6-dimension framework for evaluating any job offer before you sign — compensation, role fit, company health, team quality, culture, and long-term trajectory.",
    tag: "Job Search",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "how-to-get-a-job-with-no-experience",
    title: "How to Get a Job With No Experience — 12 Strategies That Work (2025)",
    excerpt: "12 specific strategies for landing a job without traditional experience — for recent graduates, career changers, and anyone who's been told they need experience to get experience.",
    tag: "Job Search",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "where-do-you-see-yourself-in-5-years",
    title: "\"Where Do You See Yourself in 5 Years?\" — How to Answer (2025)",
    excerpt: "The formula and 5 word-for-word examples for answering the 5-year interview question — by career stage, including the honest version that actually works.",
    tag: "Interviews",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#7a8dff",
  },
  {
    slug: "amazon-leadership-principles-interview",
    title: "Amazon Leadership Principles Interview — How to Answer All 16 (2025)",
    excerpt: "Word-for-word STAR examples for Amazon's 16 leadership principles — the most common questions asked, common traps, and what interviewers are actually evaluating.",
    tag: "Interviews",
    readTime: "15 min read",
    date: "May 2025",
    accent: "#EC4899",
  },
  {
    slug: "linkedin-connection-request-message",
    title: "LinkedIn Connection Request Messages — 10 Templates That Get Accepted (2025)",
    excerpt: "10 word-for-word LinkedIn connection request templates for recruiters, hiring managers, cold outreach, mutual connections, and every other situation.",
    tag: "LinkedIn",
    readTime: "7 min read",
    date: "May 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "how-to-write-a-cover-letter-with-no-experience",
    title: "How to Write a Cover Letter With No Experience — 3 Examples (2025)",
    excerpt: "3 word-for-word cover letter examples for recent graduates and career changers — the structure, the opening lines that get read, and what never to include.",
    tag: "Cover Letters",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#EC4899",
  },
  {
    slug: "how-to-handle-a-bad-reference",
    title: "How to Handle a Bad Reference — What to Do Before It Tanks Your Offer (2025)",
    excerpt: "Most candidates don't know they have a damaging reference until offers stop coming. The 4 types, how to detect them, and the exact repair playbook — before a bad reference costs you the job.",
    tag: "Job Search Strategy",
    readTime: "7 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "remote-job-search-tips",
    title: "Remote Job Search Tips — How to Find and Land a Real Remote Role (2025)",
    excerpt: "Most postings labeled 'remote' aren't really remote. Where real remote jobs are actually posted, what remote employers test for, and how to signal remote readiness in your resume and interviews.",
    tag: "Remote Work",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "google-interview-prep",
    title: "Google Interview Prep — The Complete Guide to Google's Hiring Process (2025)",
    excerpt: "Google's hiring committee model, Googleyness criterion, level-setting comp committee — none of it works how candidates expect. Stage-by-stage breakdown with prep strategy for every round.",
    tag: "Interviews",
    readTime: "15 min read",
    date: "May 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "mckinsey-interview-prep",
    title: "McKinsey Interview Prep — The Complete Guide to Solve, Cases & PEI (2025)",
    excerpt: "McKinsey's 3-stage gauntlet: the Solve digital assessment, hypothesis-driven case interviews that resist frameworks, and a PEI that drills one story for 30 minutes. Everything that's different about McKinsey prep.",
    tag: "Interviews",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "how-to-get-promoted-fast",
    title: "How to Get Promoted Fast — The 90-Day Promotion Sprint (2025)",
    excerpt: "The work-visibility matrix, how to find a sponsor (not just a mentor), the manager's manager test, and the 90-day step-by-step plan to accelerate your promotion timeline.",
    tag: "Career Growth",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "career-change-at-40",
    title: "Career Change at 40 — What's Different, What Works, What to Stop Worrying About (2025)",
    excerpt: "A fear audit (3 fears that are real vs 3 that aren't), transferable skills inventory, resume strategy for mid-career changers, and the interview narrative that makes 40+ an asset.",
    tag: "Career Change",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "faang-interview-prep",
    title: "FAANG Interview Prep — How Each Company's Process Actually Differs (2025)",
    excerpt: "Meta's impact framework, Amazon's LP system, Netflix's judgment-over-process culture, Apple's collaborative style, Google's hiring committee — each requires different preparation. Here's exactly what's unique at each company.",
    tag: "Interviews",
    readTime: "16 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "informational-interview-questions",
    title: "Informational Interview Questions — 30 Questions That Build Real Relationships (2025)",
    excerpt: "30 specific questions organized by conversation stage — opening, career path, industry insight, culture, and close. Plus how to ask for the meeting and the mistakes that make people not want to help.",
    tag: "Networking",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "highest-paying-jobs",
    title: "Highest Paying Jobs in 2025 — By Sector, With Real Compensation Data",
    excerpt: "What actually pays at the top of tech, healthcare, finance, and law — median total comp, why each pays what it does, and the realistic path to get there. No fluff, no 'become a surgeon' advice.",
    tag: "Career Strategy",
    readTime: "13 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "signs-you-should-quit-your-job",
    title: "12 Signs You Should Quit Your Job — And 4 Signs You Shouldn't Yet (2025)",
    excerpt: "Structural problems vs temporary rough patches — the honest guide distinguishing organizational signals, career trajectory, compensation gaps, and wellbeing from situations that can still be fixed.",
    tag: "Career Decisions",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "product-manager-interview-questions",
    title: "Product Manager Interview Questions — 40 Questions With Strong Answers (2025)",
    excerpt: "The 4 PM interview question types — product design, estimation, strategy, and behavioral — with the frameworks, common mistakes, and strong signals for each. Written for candidates preparing for Google, Meta, and top-tier PM roles.",
    tag: "Interviews",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "software-engineer-resume",
    title: "Software Engineer Resume — Examples, Templates & ATS Tips (2025)",
    excerpt: "Every section, every career level (junior to staff), and the 5 ATS rules that determine whether a recruiter ever sees your resume. With real before-and-after examples for tech companies.",
    tag: "Resume",
    readTime: "13 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "data-scientist-resume",
    title: "Data Scientist Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "Skills sections, bullet formulas, and common mistakes — by DS track (analytics, applied ML, MLOps, research). With before-and-after bullet examples at junior, mid-level, and senior levels.",
    tag: "Resume",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "internal-salary-negotiation",
    title: "How to Negotiate Salary Internally — Scripts & Timing (2025)",
    excerpt: "Internal negotiation is different from offer negotiation — different leverage, different timing, different pushback. Word-for-word scripts for opening the conversation, making the ask, and handling 'budget is frozen' and 'you're at the top of your band.'",
    tag: "Salary Negotiation",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "career-change-at-50",
    title: "Career Change at 50 — What's Different, What to Ignore, How to Do It (2025)",
    excerpt: "More doable than most people assume, harder in specific ways most don't anticipate. A honest look at age discrimination, network advantages, the right resume rules at 50, and the transitions that work best at this career stage.",
    tag: "Career Change",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "linkedin-optimization-for-recruiters",
    title: "LinkedIn Optimization for Recruiter Search — The Complete 2025 Guide",
    excerpt: "How LinkedIn's algorithm ranks profiles in recruiter search — and the specific changes that surface you to recruiters actively looking for your background. Headline formula, About structure, skills strategy, and activity signals.",
    tag: "LinkedIn",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "how-to-get-a-job-at-google",
    title: "How to Get a Job at Google — The Complete Guide (2025)",
    excerpt: "How Google actually hires — application paths by likelihood, every funnel stage with how-to-pass and what-not-to-do, what 'Googleyness' means in practice, and the hiring committee process most candidates don't understand.",
    tag: "Interviews",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "how-to-write-a-resume-with-no-experience",
    title: "How to Write a Resume With No Experience — 5 Real Examples (2025)",
    excerpt: "Five types of experience that substitute for job history — projects, internships, volunteer work, freelance, and personal builds — with the exact framing that makes each credible to hiring managers and ATS systems.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "executive-resume",
    title: "Executive Resume — C-Suite & VP Resume Examples and Strategy (2025)",
    excerpt: "The frame shifts that make a resume read at VP and C-suite level — from task completion to business outcomes, from functional leadership to company-wide strategy, plus the 5 rules that are different for executive resumes.",
    tag: "Resume",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "negotiating-equity",
    title: "How to Negotiate Equity — RSUs, Options & Startup Percentages (2025)",
    excerpt: "Equity negotiation is different from salary negotiation — different math, different timing, different leverage. How to evaluate what you have, what to ask for, and the exact scripts for each equity type.",
    tag: "Negotiation",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "how-to-get-promoted-at-work",
    title: "How to Get Promoted at Work — The Real System (2025)",
    excerpt: "4 promotion myths and the system that actually works — how calibration meetings work, why sponsorship matters more than mentorship, and how to build the documented case your manager can use in the room you're not in.",
    tag: "Career Growth",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "system-design-interview",
    title: "System Design Interview — What They Score & How to Prepare (2025)",
    excerpt: "The 6 scoring dimensions, the 5-step framework for any system design question, and the senior-level signals for 4 common systems. For mid-to-senior engineers targeting FAANG and top-tier companies.",
    tag: "Interviews",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "job-search-while-employed",
    title: "How to Job Search While Employed — Without Getting Caught (2025)",
    excerpt: "The 5 privacy risks, how to schedule interviews around a full-time job, what to say to employers about references, and the leverage your current job gives you in negotiations. A complete guide to a confidential search.",
    tag: "Job Search Strategy",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#F97316",
  },
];

export default async function BlogPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">Career Advice · Guides · Tips</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">Career advice backed<br /><span className="gradient-text-animated">by AI coaching data.</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/50">Resume, LinkedIn, interviews, negotiation, and career strategy — guides built from what actually works across 10,000+ coaching sessions.</p>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="bg-[var(--bg)] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
                <div className="flex-1 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${post.accent}14`, color: post.accent }}>
                      {post.tag}
                    </span>
                    <span className="text-[11px] text-[var(--muted)]">{post.readTime}</span>
                  </div>
                  <h2 className="mb-3 text-[15.5px] font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--brand)]">{post.title}</h2>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--border)] px-6 py-4">
                  <span className="text-[12px] text-[var(--muted)]">{post.date}</span>
                  <span className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: post.accent }}>
                    Read article <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Ready to put this into practice?</h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] text-white/55">One free session on every coaching surface. Start with your resume, LinkedIn, or an interview — no card required.</p>
          <div className="mt-8">
            <Link href="/signup" className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
