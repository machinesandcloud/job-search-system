import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const metadata: Metadata = {
  title: "Zari vs Competitors — AI Career Coach Comparisons",
  description:
    "How does Zari compare to Kleo, Teal, Jobscan, Resume Worded, and other AI career tools? Honest side-by-side comparisons on every dimension that matters.",
  keywords: ["AI career coach comparison", "Zari vs Kleo", "Zari vs Teal", "Zari vs Jobscan", "best AI career coach comparison", "career tool comparison"],
  alternates: { canonical: "/compare" },
};

const COMPARISONS = [
  { href: "/compare/zari-vs-kleo", title: "Zari vs Kleo", summary: "Kleo specializes in LinkedIn content. Zari does resume, LinkedIn, interviews, and strategy with session memory." },
  { href: "/compare/zari-vs-teal", title: "Zari vs Teal", summary: "Teal is a job tracker. Zari is an AI career coach. Different tools for different jobs." },
  { href: "/compare/zari-vs-jobscan", title: "Zari vs Jobscan", summary: "Jobscan scores resumes. Zari scores AND rewrites them — then coaches you on LinkedIn and interviews too." },
  { href: "/compare/zari-vs-resume-worded", title: "Zari vs Resume Worded", summary: "Resume Worded gives feedback. Zari gives feedback AND writes the improved version for you." },
  { href: "/compare/zari-vs-linkedin-premium", title: "Zari vs LinkedIn Premium", summary: "LinkedIn Premium improves your visibility. Zari improves your candidacy. Here's which one to invest in." },
  { href: "/compare/zari-vs-chatgpt", title: "Zari vs ChatGPT", summary: "ChatGPT is a general-purpose AI. Zari is purpose-built for career coaching with session memory and STAR evaluation." },
  { href: "/compare/zari-vs-gemini", title: "Zari vs Google Gemini", summary: "Gemini is Google's general AI with web search. Zari is built specifically for career coaching with ATS scoring and memory." },
  { href: "/compare/zari-vs-kickresume", title: "Zari vs Kickresume", summary: "Kickresume builds polished resume templates. Zari optimizes for ATS and coaches you through the full job search." },
  { href: "/compare/zari-vs-rezi", title: "Zari vs Rezi", summary: "Rezi focuses on ATS resume scoring. Zari adds interview coaching, LinkedIn optimization, and salary negotiation." },
  { href: "/compare/zari-vs-enhancv", title: "Zari vs Enhancv", summary: "Enhancv builds visually stunning resumes. Zari coaches your entire job search with ATS optimization and interview prep." },
  { href: "/compare/zari-vs-novoresume", title: "Zari vs Novoresume", summary: "Novoresume produces clean one-page resumes. Zari covers ATS optimization, LinkedIn, interview coaching, and salary negotiation." },
  { href: "/compare/zari-vs-claude", title: "Zari vs Claude", summary: "Claude is a powerful general AI. Zari is purpose-built for job search with ATS scoring, interview evaluation, and session memory." },
  { href: "/compare/zari-vs-resumeio", title: "Zari vs Resume.io", summary: "Resume.io guides you through building a clean resume. Zari coaches you through landing the job — ATS optimization, interviews, and salary negotiation." },
  { href: "/compare/zari-vs-perplexity", title: "Zari vs Perplexity", summary: "Perplexity is an AI research engine. Zari is an AI career coach. They're complementary — here's exactly where each wins for job seekers." },
  { href: "/compare/zari-vs-zety", title: "Zari vs Zety", summary: "Zety builds polished resume templates with pre-written content suggestions. Zari coaches your entire job search — ATS scoring, interview prep, LinkedIn, and salary negotiation." },
  { href: "/compare/zari-vs-microsoft-copilot", title: "Zari vs Microsoft Copilot", summary: "Copilot is a general-purpose AI embedded in Office apps. Zari is purpose-built for job search coaching. They overlap in some areas and diverge completely in others." },
  { href: "/compare/zari-vs-careerflow", title: "Zari vs Careerflow", summary: "Careerflow tracks your job applications and scores your LinkedIn profile. Zari coaches your resume, interviews, LinkedIn, and salary negotiation. Different tools — here's when you need each." },
  { href: "/compare/zari-vs-copy-ai", title: "Zari vs Copy.ai", summary: "Copy.ai is a general-purpose content AI. Zari is purpose-built for job search — with ATS resume analysis, interview coaching, LinkedIn optimization, and salary negotiation." },
  { href: "/compare/zari-vs-jasper", title: "Zari vs Jasper", summary: "Jasper is a marketing content platform for content teams. Zari is an AI career coach for job seekers. Here's where each tool wins — and which one you actually need." },
  { href: "/compare/zari-vs-resume-io", title: "Zari vs Resume.io", summary: "Resume.io builds a clean, professionally formatted resume. Zari optimizes it for ATS, coaches your interviews, LinkedIn, and salary negotiation. Which one you actually need." },
  { href: "/compare/zari-vs-indeed", title: "Zari vs Indeed", summary: "Indeed is the largest job search engine. Zari is an AI career coach. They're sequential, not competing — Indeed finds roles, Zari helps you land them." },
  { href: "/compare/zari-vs-glassdoor", title: "Zari vs Glassdoor", summary: "Glassdoor provides salary data, company reviews, and interview reports. Zari coaches you through using that data — from ATS optimization to offer negotiation." },
  { href: "/compare/zari-vs-wellfound", title: "Zari vs Wellfound", summary: "Wellfound (AngelList) is the dominant startup job board with equity transparency and direct founder access. Zari coaches you to compete for those roles — resume, interviews, and startup offer negotiation." },
  { href: "/compare/zari-vs-handshake", title: "Zari vs Handshake", summary: "Handshake connects students and recent grads with campus recruiters and early-career employers. Zari coaches the skills to compete — ATS resume optimization, interview prep, and first-offer negotiation." },
  { href: "/compare/zari-vs-ziprecruiter", title: "Zari vs ZipRecruiter", summary: "ZipRecruiter matches you with employers using AI. Zari coaches you to win the match — ATS resume optimization, mock interviews, and salary negotiation. How to use both in sequence." },
  { href: "/compare/zari-vs-monster", title: "Zari vs Monster", summary: "Monster is one of the original job boards — listings, salary data, and a resume database searched by recruiters. Zari is an AI career coach that helps you compete for the roles you find there." },
  { href: "/compare/zari-vs-dice", title: "Zari vs Dice", summary: "Dice is the tech-focused job board — listings, recruiter network, and salary data for software engineers and IT professionals. Zari coaches you to win the tech roles you find there." },
  { href: "/compare/zari-vs-linkedin-jobs", title: "Zari vs LinkedIn Jobs", summary: "LinkedIn Jobs is the dominant professional job board with recruiter visibility and AI matching. Zari coaches you through the roles you find there — ATS optimization, interview prep, LinkedIn profile rewrites, and offer negotiation." },
  { href: "/compare/zari-vs-simplyhired", title: "Zari vs SimplyHired", summary: "SimplyHired aggregates job listings with salary estimates — useful for discovery across a wide range of industries. Zari coaches you to win the roles you find there — ATS optimization, interview prep, and offer negotiation." },
  { href: "/compare/zari-vs-careerbuilder", title: "Zari vs CareerBuilder", summary: "CareerBuilder is one of the original job boards — listings, employer AI matching, and a resume database. Zari is the AI career coach that helps you compete for the roles you find there." },
  { href: "/compare/zari-vs-google-for-jobs", title: "Zari vs Google for Jobs", summary: "Google for Jobs aggregates listings from across the web directly in Google Search. Zari coaches you to win the roles you find there — ATS optimization, interview prep, and offer negotiation." },
  { href: "/compare/zari-vs-seek", title: "Zari vs Seek", summary: "Seek is the dominant job board in Australia, New Zealand, and Southeast Asia. Zari coaches you to land the roles you find there — ATS optimization for Australian hiring norms, interview prep, and salary negotiation." },
];

export default async function ComparePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.035em]">Zari vs the competition</h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/50">Honest comparisons across every AI career tool worth considering.</p>
        </div>
      </section>
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6 space-y-4">
          {COMPARISONS.map((c) => (
            <Link key={c.href} href={c.href} className="group flex items-center justify-between rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]">
              <div>
                <p className="font-bold text-[var(--ink)] group-hover:text-[var(--brand)]">{c.title}</p>
                <p className="mt-1 text-[13.5px] text-[var(--muted)]">{c.summary}</p>
              </div>
              <svg className="h-5 w-5 flex-shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
