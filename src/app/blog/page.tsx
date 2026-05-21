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
  {
    slug: "product-manager-resume",
    title: "Product Manager Resume — Examples, Templates & ATS Tips (2025)",
    excerpt: "What hiring managers at Google, Meta, and top-tier companies read for in a PM resume — by company stage, career level, and PM type. With before/after bullet examples, ATS keyword strategy, and the 4 signals that make or break a PM application.",
    tag: "Resume",
    readTime: "13 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "how-to-counter-offer",
    title: "How to Counter Offer a Job — Scripts, Math & What to Say (2025)",
    excerpt: "The exact number to counter with, the email template, and word-for-word scripts for every pushback — including 'we've given you our best offer,' the band limit, and the deadline pressure tactic.",
    tag: "Negotiation",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "cv-vs-resume",
    title: "CV vs Resume — What's the Difference? Which One to Use (2025)",
    excerpt: "The 4 actual differences between a CV and a resume — length, content, customization, and purpose — and a decision framework for every situation, including the countries and industries where the distinction doesn't apply.",
    tag: "Job Search Basics",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "marketing-manager-resume",
    title: "Marketing Manager Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "What CMOs read for in a marketing resume — revenue attribution, channel depth, budget scale, and marketing stack fluency — by specialization (demand gen, content, brand, PMM) with before/after bullets and ATS keyword strategy.",
    tag: "Resume",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#EC4899",
  },
  {
    slug: "how-to-respond-to-job-rejection",
    title: "How to Respond to a Job Rejection — Emails That Keep the Door Open (2025)",
    excerpt: "Word-for-word rejection response emails for every situation — automated rejection, post-phone-screen, post-interview, and late-stage. Why responding graciously turns rejections into future opportunities.",
    tag: "Job Search Strategy",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "how-to-negotiate-remote-work",
    title: "How to Negotiate Remote Work — Scripts for Any Situation (2025)",
    excerpt: "Scripts for 4 scenarios: negotiating remote in a new offer, asking your current employer, responding to an RTO mandate, and pushing hybrid to fully remote — with timing strategy and what to do when they say no.",
    tag: "Negotiation",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "project-manager-resume",
    title: "Project Manager Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "What hiring managers read for in a PM resume — delivery record, scale, methodology fluency, and stakeholder evidence — with before/after bullet examples across Agile, Waterfall, and Hybrid tracks, plus PMP/PMI-ACP keyword strategy.",
    tag: "Resume",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "how-to-get-a-job-fast",
    title: "How to Get a Job Fast — The 4-Week Playbook (2025)",
    excerpt: "The 4 search mistakes that slow you down, and a week-by-week action plan to compress a 3-month search into 4 weeks — from resume audit to first offer. For job seekers who can't afford to wait.",
    tag: "Job Search Strategy",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "nurse-resume",
    title: "Nurse Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "What nurse managers read for in a nursing resume — clinical competency by unit, patient outcomes, certifications, and leadership. With before/after bullet examples across ICU, ED, med-surg, OR, and travel nursing tracks.",
    tag: "Resume",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "operations-manager-resume",
    title: "Operations Manager Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "What ops hiring managers read for — P&L ownership, process improvement metrics, team scale, and cross-functional leadership. With before/after bullet examples by career level and ATS keyword strategy by industry.",
    tag: "Resume",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "personal-brand",
    title: "Personal Branding for Professionals — How to Build Yours (2025)",
    excerpt: "Personal branding isn't about becoming an influencer. It's about controlling what comes up when a recruiter Googles you. A practical guide to LinkedIn, content strategy, and professional visibility — by time investment level.",
    tag: "Career Strategy",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "job-search-burnout",
    title: "Job Search Burnout — How to Recover and Search Smarter (2025)",
    excerpt: "Job search burnout has 3 stages — each with different causes and different solutions. Identify which stage you're in, the search patterns that cause burnout, and how to restructure your effort so it actually produces results.",
    tag: "Job Search Strategy",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "accounting-resume",
    title: "Accounting Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "What accounting hiring managers filter for first: software fluency, close timeline ownership, financial scope, and compliance experience. With before/after bullet examples for staff accountant, senior accountant, and controller — plus ATS keyword strategy by role type.",
    tag: "Resume",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "sales-resume",
    title: "Sales Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "Sales hiring managers go to quota attainment first, then deal size, sales cycle, and pipeline metrics. With before/after examples for SDR, AE, and sales manager — plus ATS keyword strategy by sales motion (SMB, mid-market, enterprise).",
    tag: "Resume",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "teacher-resume",
    title: "Teacher Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "School district ATS systems filter for certification first, then principals read for student outcome data — the detail most teacher resumes omit. With before/after examples for new, experienced, and lead teachers, plus ATS keywords by subject area.",
    tag: "Resume",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "salary-bands",
    title: "Salary Bands Explained — How to Use Them in Negotiations (2025)",
    excerpt: "Salary bands are the invisible constraint behind every negotiation. Learn how bands work, how to find your target company's ranges, and exactly what to say when the recruiter tells you 'we're already at the top of the band.'",
    tag: "Negotiation",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "hr-resume",
    title: "HR Resume — Examples, Skills & ATS Keywords (2025)",
    excerpt: "HR hiring managers screen for workforce scope, measurable program ownership, ER complexity, and HRIS fluency. Most HR resumes describe responsibilities. The ones that get callbacks describe business outcomes.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#8B5CF6",
  },
  {
    slug: "financial-analyst-resume",
    title: "Financial Analyst Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "Finance hiring managers scan for modeling depth, financial scope, business impact, and data tools. Most analyst resumes describe work produced. The ones that get callbacks describe decisions driven.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#F59E0B",
  },
  {
    slug: "how-to-network",
    title: "How to Network Professionally — The Complete Guide (2025)",
    excerpt: "Most people network wrong — transactionally, during desperation, or not at all. The professionals who consistently land good opportunities build genuine relationships before they need them.",
    tag: "Career Strategy",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#0EA5E9",
  },
  {
    slug: "imposter-syndrome-at-work",
    title: "Imposter Syndrome at Work — How to Recognize and Overcome It (2025)",
    excerpt: "70% of professionals experience imposter syndrome at some point — including the highest performers. Understanding which type you have and how it shows up in your career is the difference between managing it and letting it manage your decisions.",
    tag: "Career Strategy",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#EC4899",
  },
  {
    slug: "graphic-designer-resume",
    title: "Graphic Designer Resume — Portfolio, Skills & ATS Tips (2025)",
    excerpt: "Your portfolio shows the work. Your resume gets you to the portfolio review. Most design applications are filtered by ATS before any human sees your portfolio link — which means the resume has to work first.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#A855F7",
  },
  {
    slug: "cover-letter-examples",
    title: "Cover Letter Examples — By Situation, With Exact Language (2025)",
    excerpt: "Five cover letter examples for five situations: standard application, career change, internal promotion, cold outreach, and referral — each with exact opening language, body structure, and close.",
    tag: "Job Search",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#3B82F6",
  },
  {
    slug: "how-to-ask-for-a-promotion",
    title: "How to Ask for a Promotion — Timing, Script & Mistakes to Avoid (2025)",
    excerpt: "Most promotion requests fail before the conversation starts — because of bad timing, missing evidence, or framing that makes the case about tenure instead of performance.",
    tag: "Career Strategy",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "entry-level-resume",
    title: "Entry-Level Resume — What to Include When You Have No Experience (2025)",
    excerpt: "Writing an entry-level resume isn't about hiding limited work history — it's about knowing what to include instead. Every section, what to write, what to avoid, and ATS tips for new graduates.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "finance-resume",
    title: "Finance Resume — Investment Banking, FP&A, PE & Asset Management (2025)",
    excerpt: "Finance isn't one track — what Investment Banking wants on a resume is different from FP&A, PE, and Asset Management. Role-by-role breakdown with before/after bullet examples, ATS keywords by track, and the education-first rule for banking.",
    tag: "Resume",
    readTime: "13 min read",
    date: "May 2025",
    accent: "#F59E0B",
  },
  {
    slug: "how-to-explain-being-fired",
    title: "How to Explain Being Fired in an Interview — Scripts That Work (2025)",
    excerpt: "Most candidates get this wrong in both directions — over-explaining until it sounds defensive, or being so vague it raises more questions. The framework and exact scripts for every termination scenario.",
    tag: "Interview Prep",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "salary-expectations-interview",
    title: "\"What Are Your Salary Expectations?\" — How to Answer (2025)",
    excerpt: "Whoever names a number first anchors the conversation. Scripts by stage — recruiter screen, second interview, offer stage — plus how to handle 'we need a number before we can continue' and 4 other pressure moves.",
    tag: "Negotiation",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "data-analyst-resume",
    title: "Data Analyst Resume — SQL, Tools & ATS Keywords (2025)",
    excerpt: "Data analyst hiring managers filter on SQL depth, visualization tools, business impact, and the quality of insights that changed decisions — not just dashboards built. Before/after bullet examples by career level and analytics vertical.",
    tag: "Resume",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#0EA5E9",
  },
  {
    slug: "job-offer-letter",
    title: "Job Offer Letter — What to Look For, What's Negotiable (2025)",
    excerpt: "A job offer letter is a document you can push back on — most candidates don't know what's negotiable. Section-by-section breakdown of every clause, what red flags look like, and what to ask before you sign.",
    tag: "Negotiation",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "ux-designer-resume",
    title: "UX Designer Resume — Portfolio, ATS Tips & Examples (2025)",
    excerpt: "UX design hiring is portfolio-first — but ATS filters your resume before anyone sees your Figma link. How to write a UX resume that passes the filter and makes recruiters want to click through to your portfolio.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#8B5CF6",
  },
  {
    slug: "how-to-job-search-after-layoff",
    title: "How to Job Search After a Layoff — The Complete Playbook (2025)",
    excerpt: "A layoff hits your routine, income, and sense of direction at once. Week-by-week playbook from first 48 hours to first offer — severance strategy, LinkedIn post script, search system, and how to explain it in interviews.",
    tag: "Job Search Strategy",
    readTime: "13 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "engineering-manager-resume",
    title: "Engineering Manager Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "An EM resume isn't a senior engineer resume with 'managed a team' added. What hiring managers read for at this level — team building, delivery ownership, technical credibility, org influence — with before/after bullet rewrites.",
    tag: "Resume",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "nursing-interview-questions",
    title: "Nursing Interview Questions — With Strong Answers (2025)",
    excerpt: "The most common nursing interview questions — behavioral, clinical scenario, and situational — with strong STAR-method answers. Covers new grad RN, travel nursing, ICU, and charge nurse interviews.",
    tag: "Interviews",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "transferable-skills",
    title: "Transferable Skills — How to Identify and Use Them (2025)",
    excerpt: "Transferable skills are the reason career changes work — but most people can't articulate theirs. A framework for identifying what you bring, how to reframe it for a new industry, and exactly how to present it on a resume and in interviews.",
    tag: "Career Change",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "linkedin-job-search",
    title: "LinkedIn Job Search — How to Use LinkedIn to Find and Land Jobs (2025)",
    excerpt: "Most people use LinkedIn to browse job postings. The professionals who consistently land roles use it completely differently — for inbound recruiter discovery, warm outreach, and social proof. How to use LinkedIn for your job search the right way.",
    tag: "LinkedIn",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#4ca7e6",
  },
  {
    slug: "cybersecurity-resume",
    title: "Cybersecurity Resume — Examples, Certifications & ATS Tips (2025)",
    excerpt: "Hiring managers scan certifications first, then specific threat types and tools, then operational scope. Most security resumes list tools without context. Before/after examples by specialization: SOC analyst, penetration tester, security engineer, cloud security.",
    tag: "Resume",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "how-to-get-a-job-at-amazon",
    title: "How to Get a Job at Amazon — The Complete Guide (2025)",
    excerpt: "Amazon's 16 Leadership Principles govern every interview and hiring decision. Stage-by-stage breakdown of the process, what each LP actually tests, how the bar raiser works, and the STAR story prep that gets you through the loop.",
    tag: "Interviews",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "supply-chain-resume",
    title: "Supply Chain Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "Supply chain resumes that get callbacks show business outcomes — efficiency gains, cost savings, fill rate improvements — not just processes managed. Before/after examples across analyst, procurement, logistics, and demand planning tracks.",
    tag: "Resume",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "consulting-resume",
    title: "Consulting Resume — MBB, Big 4 & Independent Consultant Examples (2025)",
    excerpt: "MBB and Big 4 consulting resumes are evaluated against a different standard. The consulting bullet formula, GPA rules, and before/after examples for analyst, associate, engagement manager, and independent consultant levels.",
    tag: "Resume",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "legal-resume",
    title: "Legal Resume Examples — Attorney, Paralegal & Law Clerk Templates (2025)",
    excerpt: "Legal employers scan bar admissions, practice area keywords, deal/matter experience, and court systems before reading a single bullet. Before/after examples for attorneys, paralegals, and law clerks with ATS keyword strategy by practice area.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "remote-work-resume",
    title: "Remote Work Resume — How to Position Yourself for Remote Jobs (2025)",
    excerpt: "Remote hiring scans for async communication evidence, timezone flexibility, self-direction, and remote tool fluency. Most resumes ignore these signals entirely. How to position your experience for remote-first hiring managers.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "salary-negotiation-email",
    title: "Salary Negotiation Email — Templates That Work (2025)",
    excerpt: "Most salary negotiation emails are too aggressive (ultimatum framing) or too weak (asking permission). The effective approach: state your counter specifically, anchor it to market data, and make it easy to say yes. Templates for every scenario.",
    tag: "Negotiation",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "how-to-write-a-linkedin-post",
    title: "How to Write a LinkedIn Post That Gets Seen (2025)",
    excerpt: "LinkedIn's algorithm rewards early engagement — but most posts generate no comments in the first hour and disappear. The hook problem, post structures that drive engagement, and how to build visibility that brings inbound recruiter interest.",
    tag: "LinkedIn",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "how-to-get-a-job-at-microsoft",
    title: "How to Get a Job at Microsoft — Interview Process & Tips (2025)",
    excerpt: "Microsoft's loop is collaborative, Growth Mindset-forward, and significantly different from Amazon or Google. How each stage works, what the 'as appropriate' hire evaluates, and how to answer behavioral questions the Microsoft way.",
    tag: "Interviews",
    readTime: "13 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "how-to-prepare-for-an-interview",
    title: "How to Prepare for a Job Interview — Complete Guide (2025)",
    excerpt: "Most candidates prepare by reviewing their resume and hoping. Candidates who consistently land offers prepare differently: deep company research, role-specific answer libraries, and practice until delivery stops feeling rehearsed. The complete system.",
    tag: "Interviews",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "how-to-get-a-job-at-meta",
    title: "How to Get a Job at Meta — Interview Process & Tips (2025)",
    excerpt: "Meta's process is built around impact. The values framework, how each function is evaluated, what 'product sense' means in a Meta PM loop, and the specific moves that separate offers from rejections — including how RSU negotiation works.",
    tag: "Interviews",
    readTime: "13 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "healthcare-resume",
    title: "Healthcare Resume — RN, Allied Health & Clinical Examples (2025)",
    excerpt: "Healthcare hiring managers scan for licensure, certifications, and patient volume before reading bullets. Most healthcare resumes list duties — the ones that get callbacks show acuity, unit complexity, and outcomes. Before/after examples for ICU nurses, PTs, NPs, and clinical administrators.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "references-on-resume",
    title: "References on a Resume — Should You Include Them? (2025)",
    excerpt: "'References available upon request' wastes space and no employer wants it. What employers actually do with references, when to proactively provide them, and how to manage yours strategically to control the narrative.",
    tag: "Resume",
    readTime: "7 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "situational-interview-questions",
    title: "Situational Interview Questions — Examples and Best Answers (2025)",
    excerpt: "Situational questions describe a hypothetical and ask what you would do — unlike behavioral questions, they test judgment under constructed conditions. Full list with strong answer frameworks that show decision-making, not just experience.",
    tag: "Interviews",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "what-to-wear-to-an-interview",
    title: "What to Wear to an Interview — Dress Code Guide by Industry (2025)",
    excerpt: "Interview attire mistakes are rarely 'too formal' — they're wearing the wrong signal for the specific company culture. What to wear by industry, role level, and company type, with guidance for video interviews.",
    tag: "Interviews",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "marketing-resume",
    title: "Marketing Resume — Examples, Skills & ATS Tips (2025)",
    excerpt: "Marketing hiring managers scan for channel ownership and the revenue or growth metrics those channels drove. Most marketing resumes list tactics. Before/after examples for content, paid media, growth, and brand marketing tracks.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "how-to-decline-a-job-offer",
    title: "How to Decline a Job Offer — Email Templates & Scripts (2025)",
    excerpt: "The same recruiter who placed you could refer you to the next role. Declining well keeps the relationship intact. Exact email templates for every scenario — accepted another offer, compensation, role fit, and timing.",
    tag: "Offer Stage",
    readTime: "7 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "job-acceptance-letter",
    title: "Job Acceptance Letter — Email Templates & What to Confirm (2025)",
    excerpt: "A job acceptance email does more than say yes — it confirms the terms you negotiated and creates a written record before the formal paperwork. Templates for every scenario with a pre-signing checklist.",
    tag: "Offer Stage",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "python-developer-resume",
    title: "Python Developer Resume — Examples & ATS Keywords (2025)",
    excerpt: "Listing 'Python' is table stakes. Hiring managers want framework depth, system scale, and measurable impact. Before/after examples for junior, mid-level, and senior Python engineers across backend, data, and ML specializations.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#3B82F6",
  },
  {
    slug: "data-engineer-resume",
    title: "Data Engineer Resume — Examples, Skills & ATS Keywords (2025)",
    excerpt: "Data engineer resumes fail ATS when they list tools without showing what those tools built. Hiring managers want pipeline ownership, data volume, and reliability metrics. Before/after examples across backend, analytics, streaming, and platform specializations.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "internship-resume",
    title: "Internship Resume — How to Write One With No Experience (2025)",
    excerpt: "Internship hiring managers aren't looking for work experience — they know you don't have it. They're looking for signals that you'll get the most out of 12 weeks. How to surface curiosity, initiative, and relevant projects effectively.",
    tag: "Resume",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "second-interview-tips",
    title: "Second Interview Tips — How to Prepare & What's Different (2025)",
    excerpt: "A second interview tests fundamentally different things than the first screen. The evaluators change, the questions go deeper, and culture fit is being assessed explicitly. How to prepare specifically for round two.",
    tag: "Interviews",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "mba-resume",
    title: "MBA Resume — Templates, Examples & ATS Tips for Business School (2025)",
    excerpt: "MBA resumes operate under different rules: one page strictly, GPA conventions that vary by track, and bullet format that leads with leadership scope. What MBB and banking recruiters look for — and the mistakes that filter candidates early.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "devops-resume",
    title: "DevOps Resume — Examples, Skills & ATS Keywords (2025)",
    excerpt: "DevOps resumes that fail ATS list tools without showing infrastructure outcomes. Hiring managers want deployment frequency improvements, incident reduction, and platform scale. Before/after examples for DevOps engineers, SREs, and platform engineers.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#3B82F6",
  },
  {
    slug: "phone-screen-interview-tips",
    title: "Phone Screen Interview Tips — How to Pass the Recruiter Call (2025)",
    excerpt: "A phone screen is a filter, not a full interview. Recruiters eliminate candidates on compensation, logistics, and basic narrative clarity. What they're actually assessing and how to pass the screen and advance.",
    tag: "Interviews",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "how-to-write-a-resignation-letter",
    title: "How to Write a Resignation Letter — Templates & Tips (2025)",
    excerpt: "A resignation letter does one thing: formally documents your departure with a notice period start date. Exact templates for every situation — standard resignation, immediate departure, difficult relationships, and counter-offer response.",
    tag: "Career",
    readTime: "8 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "react-developer-resume",
    title: "React Developer Resume — Examples & ATS Keywords (2025)",
    excerpt: "React developer resumes that get callbacks show application complexity, performance impact, and state management depth — not just that you 'built UIs in React.' Before/after examples for junior, mid, and senior levels.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#3B82F6",
  },
  {
    slug: "cloud-engineer-resume",
    title: "Cloud Engineer Resume — Examples, Skills & ATS Keywords (2025)",
    excerpt: "Cloud engineer resumes fail when they list certifications and services without showing what was built and at what scale. Hiring managers scan for infrastructure ownership, cost impact, and multi-cloud depth. Before/after examples for AWS, GCP, and Azure engineers.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#F97316",
  },
  {
    slug: "java-developer-resume",
    title: "Java Developer Resume — Examples, Skills & ATS Keywords (2025)",
    excerpt: "Java developer resumes that pass ATS and impress hiring managers show system scale, Spring ecosystem depth, and architecture decisions — not just a list of frameworks. Before/after examples for junior, mid, and senior levels, plus a 7-tier skills section breakdown.",
    tag: "Resume",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#B45309",
  },
  {
    slug: "full-stack-developer-resume",
    title: "Full Stack Developer Resume — Examples, Skills & ATS Keywords (2025)",
    excerpt: "Full stack resumes that get callbacks show end-to-end ownership and product impact — not just a list of frameworks for both frontend and backend. Before/after examples for MERN, Next.js, Django+React, and Spring Boot+React stacks.",
    tag: "Resume",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#6D28D9",
  },
  {
    slug: "how-to-get-a-job-at-apple",
    title: "How to Get a Job at Apple — Interview Process & Tips (2025)",
    excerpt: "Apple's hiring is fundamentally different from Google or Meta. Design quality, domain depth, and cross-functional craft matter as much as algorithms. Full breakdown of all 5 interview stages — what happens, how to prepare, and how Apple compares to every other FAANG company.",
    tag: "Interview Prep",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#374151",
  },
  {
    slug: "machine-learning-engineer-resume",
    title: "Machine Learning Engineer Resume — Examples & ATS Keywords (2025)",
    excerpt: "ML engineer resumes that get callbacks show deployed models and production systems — not Kaggle notebooks. 7-tier skills breakdown, before/after bullets for junior/mid/senior, and how to frame LLM/GenAI experience for 2025 hiring.",
    tag: "Resume",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "linkedin-outreach-message-templates",
    title: "LinkedIn Outreach Message Templates That Get Replies (2025)",
    excerpt: "Most cold LinkedIn messages get ignored because they lead with what you need. These 6 copy-paste templates — cold outreach, referral asks, informational interviews, reconnecting — are structured to lead with value and make replying easy.",
    tag: "LinkedIn",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#0369A1",
  },
  {
    slug: "product-designer-resume",
    title: "Product Designer Resume — Portfolio vs Resume, ATS Keywords (2025)",
    excerpt: "Design hiring is portfolio-first — but 78% of designer resumes get filtered by ATS before a human ever opens your portfolio. What belongs on the resume vs in case studies, before/after bullets, and the 5-tier keyword breakdown for UX/product design roles.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#EC4899",
  },
  {
    slug: "how-to-find-a-mentor",
    title: "How to Find a Mentor — A Practical Guide for Professionals (2025)",
    excerpt: "\"Find someone you admire and reach out\" is true but incomplete. The 5 places where most lasting mentorships actually originate, exactly how to make the ask at each stage, and the difference between a mentor and a sponsor (and why you eventually need both).",
    tag: "Career Strategy",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "executive-presence",
    title: "Executive Presence — What It Actually Is and How to Build It (2025)",
    excerpt: "\"You need more executive presence\" is one of the most common and least useful pieces of career feedback. This breaks it into 5 concrete, developable components — each with observable signals, development practices, and before/after examples.",
    tag: "Career Strategy",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "how-to-get-a-job-at-netflix",
    title: "How to Get a Job at Netflix — Interview Process & Culture (2025)",
    excerpt: "Netflix's Freedom & Responsibility culture, keeper test, and top-of-market salary philosophy change how you need to prepare. 5-stage process breakdown, what Netflix looks for that no other FAANG emphasizes, and how to negotiate a Netflix offer.",
    tag: "Interview Prep",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "how-to-get-a-job-at-airbnb",
    title: "How to Get a Job at Airbnb — Interview Process & Tips (2025)",
    excerpt: "Airbnb's 'Belong Anywhere' mission, design-forward culture, and two-sided marketplace thinking shape their hiring differently than pure-tech FAANG. Full 4-stage process breakdown, what Airbnb looks for beyond technical skills, and how to negotiate the equity-heavy offer.",
    tag: "Interview Prep",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#FF5A5F",
  },
  {
    slug: "how-to-get-a-job-at-openai",
    title: "How to Get a Job at OpenAI — Interview Process & Tips (2025)",
    excerpt: "OpenAI is the fastest-scaling AI lab in history — their hiring process screens hard for mission alignment, safety thinking, and exceptional technical depth. Full process breakdown, what they look for beyond LLM familiarity, and how to position yourself.",
    tag: "Interview Prep",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#10B981",
  },
  {
    slug: "how-to-get-a-job-at-stripe",
    title: "How to Get a Job at Stripe — Interview Process & Tips (2025)",
    excerpt: "Stripe's infra-first engineering culture, written communication bar, and 'Increase the GDP of the internet' mission create a distinctive hiring process. 4-stage breakdown, what Stripe engineers actually get tested on, and how to negotiate the financial infrastructure company's comp structure.",
    tag: "Interview Prep",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#635BFF",
  },
  {
    slug: "ai-engineer-resume",
    title: "AI Engineer Resume — Skills, Tools & ATS Keywords (2025)",
    excerpt: "AI engineer resumes that get past ATS and impress hiring managers show model deployment, production ML, and real business impact — not just framework familiarity. Before/after bullets and the full keyword breakdown.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "backend-developer-resume",
    title: "Backend Developer Resume — Examples & ATS Keywords (2025)",
    excerpt: "Backend resumes that get callbacks show system ownership, performance impact, and API reliability metrics — not just a list of languages. Before/after examples and the full keyword tier breakdown.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "business-analyst-resume",
    title: "Business Analyst Resume — Examples & ATS Keywords (2025)",
    excerpt: "BA resumes that land interviews show stakeholder impact, process improvements quantified, and requirements that shipped — not just tools. Before/after bullets and the complete keyword breakdown for BA, product, and data analyst roles.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#D97706",
  },
  {
    slug: "site-reliability-engineer-resume",
    title: "Site Reliability Engineer Resume — Examples & ATS Keywords (2025)",
    excerpt: "SRE resumes that get callbacks show SLO ownership, toil eliminated, and incidents owned — not just a list of tools. Before/after examples and the 6-tier ATS keyword breakdown for SRE, DevOps, and platform roles.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "software-engineer-interview-questions",
    title: "Software Engineer Interview Questions — Coding, System Design & Behavioral (2025)",
    excerpt: "The 50 most common software engineer interview questions across coding, system design, and behavioral — with what interviewers actually look for and how to answer each category correctly.",
    tag: "Interview Prep",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#4361EE",
  },
  {
    slug: "technical-interview-preparation",
    title: "Technical Interview Preparation — 8-Week Plan for Engineers (2025)",
    excerpt: "A structured 8-week prep plan for technical interviews at FAANG and top-tier companies — with weekly focus areas, resource recommendations, and the 5 most common failure modes to eliminate.",
    tag: "Interview Prep",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "career-change-at-40",
    title: "Career Change at 40: How to Pivot Without Starting Over",
    excerpt: "Changing careers at 40 isn't starting over — it's redirecting 15+ years of experience into a new direction. The fear audit, transferable skills inventory, and resume strategy for mid-career pivots.",
    tag: "Career Change",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "career-change-at-50",
    title: "Career Change at 50: Leverage Experience in a New Field",
    excerpt: "A career change at 50 is less about breaking in and more about translating. The 5 transitions that work (and why), the ageism reality check, and how to position senior experience as an asset not a liability.",
    tag: "Career Change",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#DC2626",
  },
  {
    slug: "where-do-you-see-yourself-in-5-years",
    title: "Where Do You See Yourself in 5 Years? (Interview Answer Guide)",
    excerpt: "Interviewers aren't looking for a career roadmap — they're testing retention risk, role fit, and ambition calibration. The framework for answering this question without lying or over-promising.",
    tag: "Interviews",
    readTime: "6 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "frontend-developer-resume",
    title: "Frontend Developer Resume — Examples & ATS Keywords (2025)",
    excerpt: "Frontend resumes that get callbacks show Core Web Vitals wins, component ownership, and user-facing impact metrics — not just a framework list. Before/after bullets and the 6-tier ATS keyword breakdown for frontend, UI, and web developer roles.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#4361EE",
  },
  {
    slug: "ios-developer-resume",
    title: "iOS Developer Resume — Examples & ATS Keywords (2025)",
    excerpt: "iOS resumes that get callbacks show App Store metrics, Swift/SwiftUI depth, and architecture ownership — not just a list of Apple frameworks. Before/after examples and the complete ATS keyword breakdown.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#007AFF",
  },
  {
    slug: "scrum-master-resume",
    title: "Scrum Master Resume — Examples & ATS Keywords (2025)",
    excerpt: "Scrum Master resumes that land interviews show team velocity improvements, impediment removal outcomes, and coaching impact — not just CSM certification. Before/after bullets and the keyword breakdown for SM, Agile Coach, and RTE roles.",
    tag: "Resume",
    readTime: "9 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "how-to-get-a-job-at-uber",
    title: "How to Get a Job at Uber — Interview Process & Tips (2025)",
    excerpt: "Uber's marketplace systems at scale, rider/driver ecosystem thinking, and post-Travis cultural reset shape their hiring. Full 4-stage breakdown, what Uber's geo/marketplace system design round tests, and how to negotiate the RSU-heavy offer.",
    tag: "Interview Prep",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#000000",
  },
  {
    slug: "how-to-get-a-job-at-salesforce",
    title: "How to Get a Job at Salesforce — Interview Process & Tips (2025)",
    excerpt: "Salesforce's Ohana culture, LEAD competency model, and multi-tenant platform engineering create a distinctive hiring process. Full breakdown of the values-based behavioral rounds and what Salesforce engineers actually get tested on.",
    tag: "Interview Prep",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#00A1E0",
  },
  {
    slug: "how-to-get-a-job-at-deloitte",
    title: "How to Get a Job at Deloitte — Interview Process & Tips (2025)",
    excerpt: "Deloitte's case interviews (for consulting), LEAD framework behavioral rounds, and service-line specificity make their hiring process unlike pure-tech FAANG. Full breakdown across Consulting, Technology, and Advisory tracks.",
    tag: "Interview Prep",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#86BC25",
  },
  {
    slug: "how-to-get-a-job-at-mckinsey",
    title: "How to Get a Job at McKinsey — Interview Process & Case Tips (2025)",
    excerpt: "McKinsey's Solve assessment, hypothesis-driven cases, and 30-minute PEI deep-dive. The most rigorous hiring process in consulting — full breakdown with how to prepare each stage and what separates candidates who advance.",
    tag: "Interview Prep",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#003087",
  },
  {
    slug: "job-search-statistics-2025",
    title: "50+ Job Search Statistics That Will Change How You Apply (2025)",
    excerpt: "Data-backed job search statistics covering ATS screening, interview funnel conversion, salary negotiation outcomes, AI in hiring, and LinkedIn performance — with sourced numbers and what they mean for your search strategy.",
    tag: "Research",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "uk-cv-writing-tips",
    title: "UK CV Writing Tips 2025 — How to Write a CV That Gets Interviews",
    excerpt: "Expert UK-specific CV advice covering format, length, personal statement, ATS optimisation for UK employers, and the key differences between a UK CV and a US resume.",
    tag: "Resume / CV",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#012169",
  },
  {
    slug: "uk-interview-tips",
    title: "UK Interview Tips 2025 — How to Ace a British Job Interview",
    excerpt: "Competency-based interviews, NHS core values coaching, City firm interviews, assessment centre exercises, and how British interview culture differs from what most guides teach.",
    tag: "Interview Prep",
    readTime: "13 min read",
    date: "May 2025",
    accent: "#012169",
  },
  {
    slug: "graduate-jobs-uk",
    title: "Graduate Jobs UK 2025 — How to Land Your First Role in Britain",
    excerpt: "Graduate schemes, the milkround timeline, assessment centres, top UK graduate employers with salaries, and how to stand out as a new graduate in the UK job market.",
    tag: "Career Change",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#0D4C8E",
  },
  {
    slug: "cv-template-uk",
    title: "UK CV Template 2025 — Free Format With Examples",
    excerpt: "Word-for-word examples of every CV section — personal statement, work experience bullets, education, and skills. ATS-optimised for UK employers. Includes what NOT to include.",
    tag: "Resume / CV",
    readTime: "11 min read",
    date: "May 2025",
    accent: "#0D4C8E",
  },
  {
    slug: "job-search-in-canada",
    title: "Job Search in Canada 2025 — Complete Guide for Canadians and Newcomers",
    excerpt: "Canadian job boards, resume format differences, province-by-province markets (Toronto, Vancouver, Calgary, Montréal), Canadian interview culture, and a full section for newcomers.",
    tag: "Job Search",
    readTime: "16 min read",
    date: "May 2025",
    accent: "#9B1D20",
  },
  {
    slug: "canada-salary-guide",
    title: "Canada Salary Guide 2025 — Tech & Professional Pay in CAD",
    excerpt: "CAD salary benchmarks by role and city across 20+ professions — with a comparison to US salaries, Canada's full compensation picture (CPP, vacation, healthcare), and negotiation tactics.",
    tag: "Salary",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#9B1D20",
  },
  // Wave 51
  {
    slug: "amazon-behavioral-interview-questions",
    title: "Amazon Behavioral Interview Questions 2025 — LP-Mapped STAR Answers",
    excerpt: "The 30 most common Amazon behavioral questions with STAR answer frameworks mapped to Leadership Principles. Covers every LP with signals, question examples, and a full sample answer.",
    tag: "Interview Prep",
    readTime: "18 min read",
    date: "May 2025",
    accent: "#FF9900",
  },
  {
    slug: "highest-paying-jobs-uk",
    title: "Highest Paying Jobs in the UK 2025 — Real GBP Salary Data",
    excerpt: "The 20 highest paying jobs in the UK with real salary data in GBP. Finance, tech, law, and medicine — by city across London, Edinburgh, Bristol, and Manchester.",
    tag: "Salary",
    readTime: "16 min read",
    date: "May 2025",
    accent: "#012169",
  },
  {
    slug: "highest-paying-jobs-canada",
    title: "Highest Paying Jobs in Canada 2025 — Real CAD Salary Data",
    excerpt: "The 20 highest paying jobs in Canada with real CAD salary data across Toronto, Vancouver, Calgary, and Montréal. Tech, finance, energy, law, and healthcare.",
    tag: "Salary",
    readTime: "15 min read",
    date: "May 2025",
    accent: "#9B1D20",
  },
  {
    slug: "linkedin-profile-tips",
    title: "22 LinkedIn Profile Tips to Get Recruiter Visibility in 2025",
    excerpt: "22 high-impact LinkedIn profile optimisations that increase recruiter search visibility and inbound messages. Headline formula, About section structure, experience rewrites, and more.",
    tag: "LinkedIn",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#0A66C2",
  },
  {
    slug: "highest-paying-remote-jobs",
    title: "Highest Paying Remote Jobs 2025 — 25 Roles Over $100K",
    excerpt: "The 25 highest paying remote jobs with real salary data. Software, ML/AI, product, data, and finance roles paying $100K–$350K+ that you can do from anywhere in the world.",
    tag: "Job Search",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "interview-preparation-checklist",
    title: "Interview Preparation Checklist 2025 — Week-by-Week Plan",
    excerpt: "A complete week-by-week interview preparation checklist: company research, behavioral story prep, technical prep, logistics, and follow-up. From invite to offer.",
    tag: "Interview Prep",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "data-analyst-interview-questions",
    title: "Data Analyst Interview Questions 2025 — SQL, Stats & Behavioral",
    excerpt: "The 40 most common data analyst interview questions with answer frameworks. SQL, statistics, A/B testing, business case, and behavioral — with hints for every question.",
    tag: "Interview Prep",
    readTime: "16 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "how-to-get-a-job-in-uk",
    title: "How to Get a Job in the UK 2025 — Visa, CV & Interview Guide",
    excerpt: "Complete guide for international candidates: Skilled Worker visa, UK CV format differences, best UK job boards, competency-based interview prep, and salary negotiation in GBP.",
    tag: "Job Search",
    readTime: "18 min read",
    date: "May 2025",
    accent: "#012169",
  },
  // Wave 52
  {
    slug: "google-behavioral-interview-questions",
    title: "Google Behavioral Interview Questions 2025 — Googleyness & Leadership",
    excerpt: "The most common Google behavioral interview questions mapped to Googleyness, Leadership, and Impact categories — with signals, STAR frameworks, and what Google interviewers actually look for.",
    tag: "Interview Prep",
    readTime: "16 min read",
    date: "May 2025",
    accent: "#4285F4",
  },
  {
    slug: "video-interview-tips",
    title: "Video Interview Tips 2025 — Camera, Lighting, Audio & Presence",
    excerpt: "12 video interview tips that cover camera setup, lighting, audio quality, background, and non-verbal presence — plus how to handle one-way HireVue and Spark Hire interviews.",
    tag: "Interview Prep",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "how-to-get-into-tech",
    title: "How to Get Into Tech 2025 — 5 Paths That Actually Work",
    excerpt: "Five proven pathways into tech careers: software engineer, product manager, data analyst, UX designer, and tech sales. Timelines, costs, and the mistakes that slow most people down.",
    tag: "Career Change",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "highest-paying-jobs-no-degree",
    title: "Highest Paying Jobs Without a Degree 2025 — Real Salary Data",
    excerpt: "The highest paying careers that don't require a four-year degree — trades, tech, sales, and finance roles paying $70K–$400K with clear entry paths.",
    tag: "Salary",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "career-change-at-30",
    title: "Career Change at 30 — The Realistic Guide (2025)",
    excerpt: "30 is not a deadline — it's a leverage point. How to identify transferable skills, reframe your resume for a new field, and handle the 'why switching?' interview question.",
    tag: "Career Change",
    readTime: "16 min read",
    date: "May 2025",
    accent: "#7C3AED",
  },
  {
    slug: "panel-interview-questions",
    title: "Panel Interview Questions 2025 — How to Handle Multiple Interviewers",
    excerpt: "How to prepare for panel interviews: eye contact rules, answer length, the 50/25/25 attention split, and what to do when panelists disagree with each other.",
    tag: "Interview Prep",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "resume-skills-section",
    title: "Resume Skills Section 2025 — What to Include and How to Format It",
    excerpt: "How to write a resume skills section that passes ATS filters. Covers which skills to include, best format options, role-specific examples, and what to leave out entirely.",
    tag: "Resume",
    readTime: "10 min read",
    date: "May 2025",
    accent: "#0D7182",
  },
  {
    slug: "australia-interview-tips",
    title: "Australia Interview Tips 2025 — Ace Job Interviews in Australia",
    excerpt: "How Australian interview culture differs from the US and UK — cultural norms, common questions, government selection criteria, and what Aussie employers actually want.",
    tag: "Interview Prep",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#00843D",
  },
  {
    slug: "how-to-get-a-job-in-australia",
    title: "How to Get a Job in Australia 2025 — Visa, Resume & SEEK Guide",
    excerpt: "Complete guide to finding work in Australia: visa options, Australian resume format differences, best job boards (SEEK, LinkedIn, APSJobs), and salary benchmarks by city.",
    tag: "Job Search",
    readTime: "18 min read",
    date: "May 2025",
    accent: "#002244",
  },
  {
    slug: "how-to-get-a-job-in-canada",
    title: "How to Get a Job in Canada 2025 — Visa, Resume & Job Boards",
    excerpt: "Complete guide to working in Canada: Express Entry pathways, Canadian resume differences, top job boards, and salary benchmarks for Toronto, Vancouver, Calgary, and Montréal.",
    tag: "Job Search",
    readTime: "18 min read",
    date: "May 2025",
    accent: "#9B1D20",
  },
  {
    slug: "australia-salary-guide",
    title: "Australia Salary Guide 2025 — Average Salaries by Role and City (AUD)",
    excerpt: "Comprehensive AUD salary data by role, city (Sydney, Melbourne, Brisbane, Perth), and sector — plus superannuation explained and negotiation benchmarks.",
    tag: "Salary",
    readTime: "16 min read",
    date: "May 2025",
    accent: "#002244",
  },
  {
    slug: "microsoft-behavioral-interview-questions",
    title: "Microsoft Behavioral Interview Questions 2025 — Growth Mindset & Values",
    excerpt: "Common Microsoft behavioral questions mapped to core values: Growth Mindset, One Microsoft, Customer Obsessed, and Diverse & Inclusive — with signals and STAR+L framework.",
    tag: "Interview Prep",
    readTime: "16 min read",
    date: "May 2025",
    accent: "#00A4EF",
  },
  {
    slug: "how-to-write-a-linkedin-summary",
    title: "How to Write a LinkedIn Summary 2025 — About Section Examples",
    excerpt: "Three proven LinkedIn About section frameworks with full examples by role, keyword SEO guidance, and the opening 3-line hook that makes recruiters click 'see more.'",
    tag: "LinkedIn",
    readTime: "12 min read",
    date: "May 2025",
    accent: "#0A66C2",
  },
  {
    slug: "negotiating-a-raise",
    title: "Negotiating a Raise 2025 — How to Ask for a Pay Rise and Get It",
    excerpt: "The 5-step raise negotiation framework, word-for-word scripts for every scenario, what not to say, and how to respond when your manager says no.",
    tag: "Salary",
    readTime: "14 min read",
    date: "May 2025",
    accent: "#059669",
  },
  {
    slug: "meta-interview-questions",
    title: "Meta Interview Questions 2025 — Facebook Interview Prep Guide",
    excerpt: "Common Meta behavioral questions mapped to core values: Move Fast, Be Bold, Focus on Long-Term Impact, Be Open — with signals and product questions for PM roles.",
    tag: "Interview Prep",
    readTime: "16 min read",
    date: "May 2025",
    accent: "#1877F2",
  },
];

const FEATURED_SLUGS = [
  "behavioral-interview-questions",
  "how-to-negotiate-job-offer",
  "software-engineer-resume",
  "salary-negotiation-tips",
  "how-to-write-a-cover-letter",
  "star-method-interview",
];

const CATEGORIES: { id: string; label: string; icon: string; color: string; tags: string[] }[] = [
  { id: "resume",      label: "Resume",       icon: "📄", color: "#0D7182", tags: ["Resume"] },
  { id: "interviews",  label: "Interviews",   icon: "🎯", color: "#7C3AED", tags: ["Interviews", "Interview Prep"] },
  { id: "negotiation", label: "Negotiation",  icon: "💰", color: "#059669", tags: ["Negotiation", "Salary Negotiation"] },
  { id: "job-search",  label: "Job Search",   icon: "🔍", color: "#D97706", tags: ["Job Search", "Job Search Strategy", "Job Search Basics", "Remote Work", "Networking"] },
  { id: "linkedin",    label: "LinkedIn",     icon: "🔗", color: "#0369A1", tags: ["LinkedIn"] },
  { id: "career",      label: "Career",       icon: "🚀", color: "#DC2626", tags: ["Career Strategy", "Career Change", "Career Growth", "Career Decisions", "Career", "Promotion", "Cover Letters", "Offer Stage", "Comparison"] },
];

function getCategoryId(tag: string): string {
  for (const cat of CATEGORIES) {
    if (cat.tags.includes(tag)) return cat.id;
  }
  return "career";
}

function getCountryBadge(slug: string): { flag: string; label: string; color: string } | null {
  if (slug.includes("-uk") || slug.includes("uk-") || slug.startsWith("cv-template") || slug.includes("graduate-jobs-uk")) {
    return { flag: "🇬🇧", label: "UK", color: "#012169" };
  }
  if (slug.includes("canada") || slug.includes("canadian")) {
    return { flag: "🇨🇦", label: "CA", color: "#9B1D20" };
  }
  if (slug.includes("australia") || slug.includes("australian")) {
    return { flag: "🇦🇺", label: "AU", color: "#00008B" };
  }
  return null;
}

function PostCard({ post }: { post: typeof POSTS[0] }) {
  const country = getCountryBadge(post.slug);
  return (
    <Link href={`/blog/${post.slug}`} className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)]">
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: post.accent }} />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${post.accent}15`, color: post.accent }}>
            {post.tag}
          </span>
          {country && (
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: `${country.color}12`, color: country.color }}>
              {country.flag} {country.label}
            </span>
          )}
          <span className="ml-auto text-[11px] text-[var(--muted)]">{post.readTime}</span>
        </div>
        <h2 className="mb-3 flex-1 text-[15px] font-extrabold leading-snug tracking-[-0.01em] text-[var(--ink)] transition-colors group-hover:text-[var(--brand)]">{post.title}</h2>
        <p className="text-[13px] leading-[1.6] text-[var(--muted)] line-clamp-3">{post.excerpt}</p>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--bg)]/60 px-6 py-3">
        <span className="text-[11px] text-[var(--muted)]">{post.date}</span>
        <span className="flex items-center gap-1 text-[11px] font-bold transition-all group-hover:gap-1.5" style={{ color: post.accent }}>
          Read <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </span>
      </div>
    </Link>
  );
}

function HeroPostCard({ post }: { post: typeof POSTS[0] }) {
  const country = getCountryBadge(post.slug);
  return (
    <Link href={`/blog/${post.slug}`} className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
      <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${post.accent}, ${post.accent}80)` }} />
      <div className="p-8">
        <div className="mb-5 flex items-center gap-2">
          <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ background: `${post.accent}15`, color: post.accent }}>
            {post.tag}
          </span>
          {country && (
            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold" style={{ background: `${country.color}12`, color: country.color }}>
              {country.flag} {country.label}
            </span>
          )}
          <span className="ml-auto text-[12px] text-[var(--muted)]">{post.readTime}</span>
        </div>
        <h2 className="text-[1.35rem] font-extrabold leading-tight tracking-[-0.025em] text-[var(--ink)] transition-colors group-hover:text-[var(--brand)]">{post.title}</h2>
        <p className="mt-3 text-[14px] leading-7 text-[var(--muted)]">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[13px] font-bold transition-all group-hover:gap-2" style={{ color: post.accent }}>
            Read article <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </span>
          <span className="text-[12px] text-[var(--muted)]">{post.date}</span>
        </div>
      </div>
    </Link>
  );
}

const REGION_GUIDES = [
  {
    flag: "🇺🇸", label: "United States", color: "#0D7182",
    links: [
      { label: "Software Engineer Resume", href: "/blog/software-engineer-resume" },
      { label: "Behavioral Interview Questions", href: "/blog/behavioral-interview-questions" },
      { label: "Salary Negotiation Tips", href: "/blog/salary-negotiation-tips" },
      { label: "STAR Method", href: "/blog/star-method-interview" },
    ],
  },
  {
    flag: "🇬🇧", label: "United Kingdom", color: "#012169",
    links: [
      { label: "UK CV Writing Tips", href: "/blog/uk-cv-writing-tips" },
      { label: "UK Interview Tips", href: "/blog/uk-interview-tips" },
      { label: "Graduate Jobs UK", href: "/blog/graduate-jobs-uk" },
      { label: "UK CV Template", href: "/blog/cv-template-uk" },
    ],
  },
  {
    flag: "🇨🇦", label: "Canada", color: "#9B1D20",
    links: [
      { label: "Job Search in Canada", href: "/blog/job-search-in-canada" },
      { label: "Canada Salary Guide", href: "/blog/canada-salary-guide" },
      { label: "Highest Paying Jobs Canada", href: "/blog/highest-paying-jobs-canada" },
      { label: "AI Career Coach Canada", href: "/ai-career-coach-canada" },
    ],
  },
  {
    flag: "🇦🇺", label: "Australia", color: "#00008B",
    links: [
      { label: "AI Career Coach Australia", href: "/ai-career-coach-australia" },
      { label: "SWE Salary Sydney", href: "/salary/software-engineer-salary-sydney" },
      { label: "PM Salary Melbourne", href: "/salary/product-manager-salary-melbourne" },
      { label: "Data Scientist Salary Sydney", href: "/salary/data-scientist-salary-sydney" },
    ],
  },
];

export default async function BlogPage() {
  const userId = await getCurrentUserId();

  const featured = FEATURED_SLUGS.map(s => POSTS.find(p => p.slug === s)).filter(Boolean) as typeof POSTS;
  const byCategory = Object.fromEntries(
    CATEGORIES.map(cat => [cat.id, POSTS.filter(p => getCategoryId(p.tag) === cat.id)])
  );
  const totalPosts = POSTS.length;

  return (
    <PageFrame authenticated={Boolean(userId)}>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                {totalPosts}+ Career Guides · 4 Countries · AI-backed
              </div>
              <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[3.8rem]">Career advice backed<br /><span className="gradient-text-animated">by AI coaching data.</span></h1>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/50">Resume, LinkedIn, interviews, salary — for job seekers in the US, UK, Canada, and Australia.</p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {CATEGORIES.map(cat => (
                  <a key={cat.id} href={`#${cat.id}`} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[12px] font-semibold text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
                    {cat.icon} {cat.label}
                    <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] text-white/50">{byCategory[cat.id]?.length ?? 0}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-3 w-[240px]">
              {[
                { n: `${totalPosts}+`, label: "Career guides" },
                { n: "4", label: "Countries covered" },
                { n: "10K+", label: "Coaching sessions" },
                { n: "#1", label: "AI career coach" },
              ].map(s => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center">
                  <p className="text-[1.5rem] font-extrabold text-white">{s.n}</p>
                  <p className="text-[11px] text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Most read this month</h2>
              <p className="mt-1 text-[13px] text-[var(--muted)]">The guides job seekers come back to most</p>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-[2fr_1fr_1fr]">
            <HeroPostCard post={featured[0]} />
            <div className="flex flex-col gap-5">
              {[featured[1], featured[2]].filter(Boolean).map(post => <PostCard key={post.slug} post={post} />)}
            </div>
            <div className="flex flex-col gap-5">
              {[featured[3], featured[4]].filter(Boolean).map(post => <PostCard key={post.slug} post={post} />)}
            </div>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {[featured[5]].filter(Boolean).map(post => <PostCard key={post.slug} post={post} />)}
          </div>
        </div>
      </section>

      {/* GUIDES BY REGION */}
      <section className="border-t border-[var(--border)] bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Guides by country</h2>
            <p className="mt-1 text-[13px] text-[var(--muted)]">Career advice tailored to your job market — US, UK, Canada, and Australia</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REGION_GUIDES.map(region => (
              <div key={region.label} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] p-4" style={{ background: `${region.color}08` }}>
                  <span className="text-2xl">{region.flag}</span>
                  <p className="mt-1 font-extrabold text-[var(--ink)]">{region.label}</p>
                </div>
                <div className="p-4 space-y-1.5">
                  {region.links.map(link => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12.5px] text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--brand)] transition-all">
                      <span className="h-1 w-1 flex-shrink-0 rounded-full" style={{ background: region.color }} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {CATEGORIES.map((cat, ci) => {
        const posts = byCategory[cat.id] ?? [];
        if (posts.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} className={`scroll-mt-20 border-t border-[var(--border)] py-16 ${ci % 2 === 0 ? "bg-white" : "bg-[var(--bg)]"}`}>
            <div className="mx-auto max-w-6xl px-6">
              <div className="mb-8 flex items-end gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ background: `${cat.color}12` }}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-[1.5rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">{cat.label}</h2>
                  <p className="text-[12px] text-[var(--muted)]">{posts.length} guides</p>
                </div>
                <div className="hidden sm:block">
                  <span className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-[11px] font-bold" style={{ color: cat.color }}>{posts.length} guides</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {posts.map(post => <PostCard key={post.slug} post={post} />)}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg, #052830 0%, var(--brand) 50%, #052830 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/40">Put it into practice</p>
          <h2 className="text-[2.4rem] font-extrabold tracking-[-0.03em] leading-tight">Reading is prep.<br /><span className="text-white/60">Coaching is practice.</span></h2>
          <p className="mx-auto mt-5 max-w-md text-[16px] text-white/55">One free session on every surface — resume, LinkedIn, interviews, and salary. No card required.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[15px] font-bold text-[var(--brand)] shadow-[0_4px_30px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.3)]">
              Start coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/compare" className="inline-flex h-13 items-center gap-2 rounded-xl border border-white/20 px-7 text-[15px] font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white">
              Compare AI tools
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
