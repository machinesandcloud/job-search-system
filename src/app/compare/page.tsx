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
  { href: "/compare/zari-vs-workopolis", title: "Zari vs Workopolis", summary: "Workopolis is one of Canada's major job boards — with listings across Toronto, Vancouver, Calgary, and beyond. Zari coaches you to win the Canadian roles you find there — ATS optimization, interview prep, and offer negotiation." },
  { href: "/compare/zari-vs-reed-co-uk", title: "Zari vs Reed.co.uk", summary: "Reed.co.uk is one of the UK's largest job boards — with listings across London, Manchester, Birmingham, and every major UK market. Zari coaches you to land the roles you find there — CV optimization, competency-based interview prep, and UK offer negotiation." },
  { href: "/compare/zari-vs-jobstreet", title: "Zari vs JobStreet", summary: "JobStreet is the dominant job board in Southeast Asia — Malaysia, Singapore, Philippines, and Indonesia. Zari coaches you to win the roles you find there — ATS optimization, interview prep, and offer negotiation across SEA markets." },
  { href: "/compare/zari-vs-totaljobs", title: "Zari vs Totaljobs", summary: "Totaljobs is one of the UK's major job boards with hundreds of thousands of active listings. Zari coaches you to land the roles you find there — CV optimization, competency-based interview prep, and UK salary negotiation." },
  { href: "/compare/zari-vs-careerone", title: "Zari vs CareerOne", summary: "CareerOne is an Australian job board aggregating listings across Sydney, Melbourne, Brisbane, and all major Australian markets. Zari coaches you to win the roles you find there — ATS optimization, interview prep, and salary negotiation." },
  { href: "/compare/zari-vs-cv-library", title: "Zari vs CV-Library", summary: "CV-Library is one of the UK's largest independent job boards — with over 180,000 active jobs across every industry and region. Zari coaches you to land those roles — CV optimization, competency-based interview prep, and UK offer negotiation." },
  { href: "/compare/zari-vs-naukri", title: "Zari vs Naukri", summary: "Naukri.com is India's #1 job portal — with over 6.5 crore registered job seekers and the largest recruiter base in the Indian market. Zari coaches you to win those roles — ATS optimization for Indian hiring norms, interview prep, and salary negotiation." },
  { href: "/compare/zari-vs-efinancialcareers", title: "Zari vs eFinancialCareers", summary: "eFinancialCareers is the leading job board for finance, banking, investment management, and fintech roles globally. Zari coaches you to land those roles — ATS optimization for financial services hiring, technical interview prep, and compensation negotiation." },
  { href: "/compare/zari-vs-brightermonday", title: "Zari vs BrighterMonday", summary: "BrighterMonday is a leading job board in East Africa — covering Kenya, Uganda, Tanzania, Rwanda, and Ethiopia. Zari coaches you to win those roles — ATS optimization, interview prep, and salary negotiation for African job seekers." },
  { href: "/compare/zari-vs-weworkremotely", title: "Zari vs We Work Remotely", summary: "We Work Remotely is one of the largest fully-remote job boards globally — thousands of active listings for remote engineers, designers, and marketers. Zari coaches you to land those roles — ATS optimization for remote hiring, async communication signals, and offer negotiation." },
  { href: "/compare/zari-vs-flexjobs", title: "Zari vs FlexJobs", summary: "FlexJobs curates scam-free remote, part-time, freelance, and flexible job listings across 50+ categories. Zari coaches you to land those roles — resume optimization for flexible work signals, interview prep, and negotiating the full flexible arrangement." },
  { href: "/compare/zari-vs-bayt", title: "Zari vs Bayt.com", summary: "Bayt.com is the leading job board in the Arab world — UAE, Saudi Arabia, Kuwait, Qatar, and across the MENA region. Zari coaches you to win those roles — ATS optimization, interview prep for GCC norms, and negotiating total packages including allowances." },
  { href: "/compare/zari-vs-xing", title: "Zari vs XING", summary: "XING is the dominant professional network and job board in Germany, Austria, and Switzerland — the DACH region's equivalent of LinkedIn with deeper penetration in traditional German industries and Mittelstand companies. Zari coaches you to land those roles." },
  { href: "/compare/zari-vs-gulftalent", title: "Zari vs GulfTalent", summary: "GulfTalent specializes in senior and executive roles across the GCC — UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman. Zari coaches you to land those roles and negotiate the full executive package including housing, education allowance, and end-of-service." },
  { href: "/compare/zari-vs-stepstone", title: "Zari vs Stepstone", summary: "Stepstone is one of Europe's largest job boards — millions of active listings in Germany, Austria, Belgium, and the Netherlands. Zari coaches you to land those roles — Lebenslauf optimization, German interview prep, and salary negotiation." },
  { href: "/compare/zari-vs-seek-australia", title: "Zari vs SEEK Australia", summary: "SEEK is Australia's #1 job board — millions of active listings across every industry and location. Zari coaches you to win those roles — ATS resume optimization, selection criteria for government roles, interview prep, and superannuation-aware salary negotiation." },
  { href: "/compare/zari-vs-remote-co", title: "Zari vs Remote.co", summary: "Remote.co curates verified fully-remote job listings from companies with genuine remote cultures. Zari coaches you to win those roles — resume tailored to async-first signals, interview prep for distributed teams, and remote salary negotiation." },
  { href: "/compare/zari-vs-linkedin-learning", title: "Zari vs LinkedIn Learning", summary: "LinkedIn Learning teaches skills through 21,000+ video courses. Zari coaches your active job search — resume, interviews, and negotiation. They serve different career stages — here's when to use each." },
  { href: "/compare/zari-vs-himalayas", title: "Zari vs Himalayas", summary: "Himalayas curates remote-first job listings with salary transparency on every posting. Zari coaches you to win those roles — ATS resume tailoring, async-first interview prep, and remote package negotiation including home office stipends and location-adjusted pay." },
  { href: "/compare/zari-vs-levels-fyi", title: "Zari vs Levels.fyi", summary: "Levels.fyi is the most accurate source of tech compensation data — total comp by company, level, and location. Zari coaches you to negotiate the numbers it shows. They're sequential: data first, then execution." },
  { href: "/compare/zari-vs-payscale", title: "Zari vs PayScale", summary: "PayScale provides skill-adjusted salary reports across 8,000+ job titles and industries — broader than any tech-only database. Zari coaches you to negotiate the numbers it shows. Research first, then execution." },
  { href: "/compare/zari-vs-job-hero", title: "Zari vs Job Hero", summary: "Job Hero is an AI-powered job search organizer — Kanban pipeline, browser extension, and basic AI resume tailoring. Zari coaches the quality of each application: deep resume rewriting, interview prep, and salary negotiation." },
  { href: "/compare/zari-vs-careerly", title: "Zari vs Careerly", summary: "Careerly automates job discovery and application volume with AI matching and auto-apply. Zari coaches the quality of each application — deep resume rewriting, company-specific interview prep, and salary negotiation." },
  { href: "/compare/zari-vs-huntr", title: "Zari vs Huntr", summary: "Huntr is the best job search tracker — Kanban board, contact management, and funnel analytics. Zari coaches quality per application: resume depth, interview performance, and offer negotiation. Use both." },
  { href: "/compare/zari-vs-hired", title: "Zari vs Hired", summary: "Hired brings tech companies to you with salary ranges upfront. Zari coaches you to win every conversation that comes through — company-specific interview prep and negotiation above the stated range." },
  { href: "/compare/zari-vs-interview-io", title: "Zari vs interviewing.io", summary: "Interviewing.io provides live anonymous mock technical interviews with senior engineers. Zari coaches behavioral prep, system design structure, and salary negotiation — the three areas interviewing.io doesn't cover." },
  { href: "/compare/zari-vs-lunchclub", title: "Zari vs Lunchclub", summary: "Lunchclub builds your professional network through AI-matched conversations. Zari coaches your active job search. They serve different career stages — here's when each earns its keep." },
  { href: "/compare/zari-vs-otta", title: "Zari vs Otta", summary: "Otta curates tech and startup job listings with company-level transparency including funding, growth, and culture data. Zari coaches you to win those roles — ATS resume tailoring, startup interview prep, and equity negotiation." },
  { href: "/compare/zari-vs-topresume", title: "Zari vs TopResume", summary: "TopResume pairs you with certified professional resume writers who rewrite your resume for you. Zari coaches your entire job search — ATS-optimized resume rewrites, interview prep, and salary negotiation. Different approaches — here's which one gets you further." },
  { href: "/compare/zari-vs-resumelab", title: "Zari vs ResumeLab", summary: "ResumeLab provides drag-and-drop resume building with professionally designed templates. Zari coaches the content, ATS optimization, and everything after the resume. Use ResumeLab to build the format; use Zari to win the job." },
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
                <p className="font-bold text-[var(--ink)] group-hover:text-[#4361EE]">{c.title}</p>
                <p className="mt-1 text-[13.5px] text-[var(--muted)]">{c.summary}</p>
              </div>
              <svg className="h-5 w-5 flex-shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-1 group-hover:text-[#4361EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
