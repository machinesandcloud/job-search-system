import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job in Canada 2025 — Complete Guide (Visa, Resume, Job Boards)",
  description: "Everything you need to find a job in Canada: Express Entry pathways, Canadian resume differences, best job boards (Indeed, LinkedIn, Job Bank), and salary expectations by city.",
  keywords: ["how to get a job in Canada", "finding a job in Canada", "Canadian job market 2025", "job search Canada", "working in Canada", "Canada work visa", "Express Entry", "Canadian resume format", "job in Canada for foreigners", "Immigration Canada work permit"],
  alternates: { canonical: "/blog/how-to-get-a-job-in-canada" },
  openGraph: { title: "How to Get a Job in Canada 2025 — Visa, Resume, Job Boards", description: "Complete guide to finding work in Canada — Express Entry, resume format, best job boards, and salary by city.", url: "/blog/how-to-get-a-job-in-canada" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Do you need a Canadian job offer to immigrate to Canada?", answer: "Not always. Express Entry's Federal Skilled Worker and Canadian Experience Class streams don't require a job offer — they're points-based (Comprehensive Ranking System / CRS). However, a valid job offer from a Canadian employer adds 50–200 points to your CRS score, significantly improving your Invitation to Apply (ITA) chances. For the Provincial Nominee Program (PNP), requirements vary by province." },
  { question: "Is it hard to find a job in Canada as a foreigner?", answer: "The most common friction points are: lack of 'Canadian experience' (a circular barrier most provinces acknowledge is problematic), professional credential recognition (especially in regulated fields like medicine, nursing, law, and engineering), and not being in the country to network. Tech roles, trades, healthcare, and finance have strong demand and more straightforward hiring paths." },
  { question: "What's the difference between Canadian and American resumes?", answer: "Canadian and American resumes are very similar — both emphasise 1–2 pages, achievement bullets with metrics, no personal information. Key differences: Canadians list bilingualism (English/French) explicitly if applicable; Quebec employers often expect French-language CVs; government roles may require specific language competency declarations. No photos, no date of birth." },
  { question: "What are the best provinces for skilled workers in 2025?", answer: "Ontario and British Columbia have the largest tech and finance labour markets. Alberta offers the highest average wages, especially in energy and engineering. Saskatchewan and Manitoba have active PNP programs with lower CRS requirements. Quebec has a separate immigration system (CAQ) and French language is essential for most roles in the province." },
];

const VISA_PATHWAYS = [
  { path: "Express Entry (Federal)", stream: "FSW, FST, CEC", detail: "Points-based permanent residency. No job offer required but adds CRS points. Competitive — average draw was 480+ in 2024." },
  { path: "Provincial Nominee Program (PNP)", stream: "Province-specific", detail: "Each province nominates candidates for in-demand occupations. Nomination adds 600 CRS points, making invitation near-certain." },
  { path: "LMIA-based Work Permit", stream: "Employer-sponsored", detail: "Employer proves no Canadian could fill the role (Labour Market Impact Assessment). 1–3 year work permit. Common in trades and specialized roles." },
  { path: "Open Work Permit", stream: "Spouses of skilled workers, graduates", detail: "Work for any employer. Issued to spouses of high-skilled workers or recent Canadian graduates on PGWP." },
  { path: "Intra-Company Transfer (ICT)", stream: "Multinational employees", detail: "Move to Canadian branch of your existing employer. No LMIA needed." },
];

export default async function HowToGetAJobInCanadaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Get a Job in Canada 2025" description="Complete guide to finding work in Canada — visa pathways, resume format, job boards, and salary by city." url={`${BASE_URL}/blog/how-to-get-a-job-in-canada`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job in Canada", url: `${BASE_URL}/blog/how-to-get-a-job-in-canada` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #9B1D20 0%, #0D1B2A 55%, #9B1D20 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Job Search · Canada</span>
            <span className="text-[12px] text-white/35">18 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">How to Get a Job in Canada 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">Express Entry, Canadian resume format, top job boards, and salary benchmarks for Toronto, Vancouver, Calgary, and Montréal.</p>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Immigration and work permit pathways</h2>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-[1fr_140px_1.5fr] border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Pathway</span><span>Stream</span><span>Key details</span>
            </div>
            {VISA_PATHWAYS.map(({ path, stream, detail }) => (
              <div key={path} className="grid grid-cols-[1fr_140px_1.5fr] border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold text-[#9B1D20]">{path}</span>
                <span className="text-[var(--muted)]">{stream}</span>
                <span className="text-[var(--muted)]">{detail}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Best Canadian job boards in 2025</h2>
          <div className="mb-10 space-y-3">
            {[
              { board: "Job Bank (Canada)", desc: "Government of Canada&apos;s official job board. Free to use. Linked to Express Entry — applying through Job Bank can trigger Arranged Employment (job offer points)." },
              { board: "LinkedIn", desc: "Strongest platform for professional, tech, and senior roles. Canadian recruiters are active — optimize your profile for Canadian job titles and cities." },
              { board: "Indeed Canada", desc: "High volume across all industries. Better than in Australia; comparable to US. Good for SME and regional roles." },
              { board: "Workopolis", desc: "One of Canada&apos;s oldest job boards, now merged into Jobillico. Still has traffic for traditional industries." },
              { board: "Eluta.ca", desc: "Aggregates directly from employer websites — less noise from staffing agencies than Indeed." },
              { board: "Glassdoor Canada", desc: "Job listings plus salary data. Critical for salary benchmarking by Canadian city and role." },
            ].map(({ board, desc }) => (
              <div key={board} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 font-bold text-[14px] text-[#9B1D20]">{board}</div>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">Salary by city (CAD, 2025)</h2>
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-5 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Toronto</span><span>Vancouver</span><span>Calgary</span><span>Montréal</span>
            </div>
            {[
              { role: "Software Engineer", tor: "$110–140k", van: "$115–145k", cal: "$105–135k", mon: "$90–120k" },
              { role: "Product Manager", tor: "$120–160k", van: "$120–155k", cal: "$110–145k", mon: "$100–130k" },
              { role: "Data Analyst", tor: "$70–95k", van: "$70–95k", cal: "$75–100k", mon: "$62–85k" },
              { role: "Accountant (CPA)", tor: "$75–105k", van: "$72–100k", cal: "$80–115k", mon: "$65–90k" },
              { role: "Civil Engineer", tor: "$80–110k", van: "$80–108k", cal: "$90–130k", mon: "$72–95k" },
            ].map(({ role, tor, van, cal, mon }) => (
              <div key={role} className="grid grid-cols-5 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span>{tor}</span><span>{van}</span><span className="font-semibold text-[#9B1D20]">{cal}</span><span>{mon}</span>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">The &quot;Canadian experience&quot; problem — and how to overcome it</h2>
          <p className="mb-5 text-[14px] leading-7 text-[var(--muted)]">Many newcomers face employers requiring &apos;Canadian experience&apos; — a catch-22 that regulators have flagged as discriminatory. Here&apos;s how to work around it:</p>
          <div className="mb-10 space-y-3">
            {[
              { tactic: "Target multinational employers first", body: "Companies with global operations are more likely to value international experience and have hiring managers who understand overseas markets." },
              { tactic: "Get Canadian credentials fast", body: "Join a Canadian professional association, get a local certification, or complete a bridging program. This signals market credibility even without work history." },
              { tactic: "Network before you apply", body: "60% of Canadian jobs are filled before being posted. LinkedIn connections with Canadian professionals + industry meetups in your city convert directly to referrals." },
              { tactic: "Use settlement and newcomer programs", body: "ACCES Employment, Windmill Microlending, and provincial newcomer employment programs offer coaching, job matching, and employer introductions." },
            ].map(({ tactic, body }) => (
              <div key={tactic} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 font-bold text-[14px]">✓ {tactic}</div>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{body}</p>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #9B1D20 0%, #0D1B2A 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Build a Canadian-ready resume.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari optimises your resume for Canadian ATS, employer expectations, and the specific roles you&apos;re targeting in Toronto, Vancouver, Calgary, or Montréal.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#9B1D20]">Start free — no credit card</Link>
        </div>
      </section>
    </PageFrame>
  );
}
