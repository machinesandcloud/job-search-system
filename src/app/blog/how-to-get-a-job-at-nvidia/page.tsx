import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job at Nvidia — The Complete Guide (2025)",
  description: "How Nvidia actually hires in 2025: the application funnel, technical screens, and what separates candidates who get offers. GPU computing, CUDA, AI/ML, and chip design roles — what Nvidia really wants.",
  keywords: ["how to get a job at nvidia", "nvidia hiring process", "nvidia interview", "nvidia job application", "working at nvidia", "nvidia software engineer", "nvidia cuda jobs", "nvidia ai jobs", "how to get hired at nvidia 2025"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-nvidia" },
  openGraph: {
    title: "How to Get a Job at Nvidia — The Complete Guide (2025)",
    description: "The full Nvidia hiring funnel — application to offer. What separates candidates who get in from those who don't.",
    url: "/blog/how-to-get-a-job-at-nvidia",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const ROLES = [
  {
    role: "Software Engineer (CUDA / GPU Computing)",
    accent: "#76B900",
    demand: "Extreme — Nvidia's core product depends on this",
    what: "Writing and optimizing CUDA kernels, GPU memory management, parallel computing algorithms. These are Nvidia's most critical engineers — they own the performance of the hardware. Roles exist in Santa Clara HQ, remote, and international offices.",
    prep: "Deep CUDA knowledge is non-negotiable. Know GPU memory hierarchy (registers, shared memory, global memory, L2 cache), warp execution, coalesced memory access, and occupancy optimization. Leetcode proficiency required but secondary to GPU expertise.",
  },
  {
    role: "AI / Machine Learning Engineer",
    accent: "#7C3AED",
    demand: "Very high — AI is Nvidia's entire strategic bet",
    what: "Building AI frameworks (NeMo, cuDNN, TensorRT), optimizing model inference on GPUs, AI research for Nvidia's own products. These roles sit at the intersection of GPU hardware and AI software.",
    prep: "Strong ML fundamentals (transformers, attention, diffusion, training dynamics) combined with GPU optimization. Experience with PyTorch, JAX, or TensorFlow at scale. Knowledge of model quantization, pruning, and distillation is a plus.",
  },
  {
    role: "Silicon / Chip Design Engineer",
    accent: "#D97706",
    demand: "High — Nvidia designs its own GPUs (Blackwell, Hopper architecture)",
    what: "RTL design, verification, physical design, and circuit design for Nvidia GPU architectures. These teams design the next generation of GPUs — Nvidia is competing with AMD and Intel for architectural leadership.",
    prep: "VLSI fundamentals, RTL coding (SystemVerilog, Verilog), digital logic design, and verification methodology (UVM). For physical design: knowledge of timing closure, power analysis, and place-and-route tools.",
  },
  {
    role: "Product Manager",
    accent: "#0D7182",
    demand: "Growing — Nvidia is scaling its platform and enterprise business",
    what: "PM roles at Nvidia cover GPU platforms, AI software (NIM, DGX Cloud), enterprise AI solutions, and developer tools. The PM role is more technical than average — you need to understand GPU architecture.",
    prep: "Strong technical background (computer science or EE degree preferred). Product sense for developer-focused products. Understanding of the AI ecosystem: training vs. inference, data center vs. edge, framework ecosystems.",
  },
];

const STAGES = [
  {
    stage: "Application & resume screen",
    accent: "#76B900",
    what: "Nvidia's ATS filters for technical keywords relevant to the role. For software: CUDA, GPU, parallel computing, ML frameworks. For hardware: VLSI, RTL, SystemVerilog, TSMC process nodes. GPA matters less than projects and experience at Nvidia.",
    howToPass: "Your resume needs to demonstrate GPU expertise concretely. List specific CUDA kernels you've optimized and the speedup achieved. Name the GPU architectures you've worked with. For hardware: name the process nodes and EDA tools.",
    dontDo: "Submit a generic software engineer resume. Describe GPU work vaguely ('worked on ML models'). Apply to roles you have no domain background in — Nvidia's bar is very high.",
  },
  {
    stage: "Recruiter screen (30 min)",
    accent: "#7C3AED",
    what: "Conversational screen — your background, the specific role, compensation expectations, and work authorization. Nvidia has many international employees; work authorization status is asked early.",
    howToPass: "Have a clear narrative about why Nvidia specifically — not just 'GPUs are cool.' Connect your background to Nvidia's specific challenges: large model training, inference optimization, next-gen GPU architecture. Know which team you're targeting.",
    dontDo: "Be vague about compensation expectations. Show unfamiliarity with Nvidia's products and strategy. Say you &apos;love AI&apos; without connecting it to GPU hardware specifically.",
  },
  {
    stage: "Technical phone screen (60–90 min)",
    accent: "#D97706",
    what: "Deep technical interview. For CUDA engineers: GPU memory hierarchy, kernel optimization, CUDA programming model. For ML engineers: model architecture, distributed training, inference optimization. For hardware: logic design, verification concepts.",
    howToPass: "Expect questions that go very deep. Nvidia interviewers are world-class experts — they'll push until they find your ceiling. Know your area deeply, not broadly. 'I don't know but here's how I'd reason about it' is acceptable; surface-level answers are not.",
    dontDo: "Overstate your expertise — Nvidia interviewers will expose it immediately. Give textbook answers without practical application. Miss the performance intuition questions — Nvidia cares deeply about optimization, not just correctness.",
  },
  {
    stage: "Onsite / virtual loop (4–6 interviews)",
    accent: "#0D7182",
    what: "Full-day virtual or in-person interview loop. Typically 4–6 sessions including technical deep dives, system design, behavioral rounds, and a presentation for senior roles. The loop is with the actual team you'd join.",
    howToPass: "Prepare a concise presentation of your most impactful GPU/AI/hardware project — many Nvidia loops include a 15–20 minute project walkthrough. For system design: think about GPU-aware distributed systems, not just standard web-scale design. For behavioral: Nvidia values independence and ownership — show you drive things to completion without hand-holding.",
    dontDo: "Show unfamiliarity with Nvidia&apos;s hardware ecosystem (GPU generations, CUDA architecture, NVLink, etc.). Give weak answers to 'tell me about a time you optimized performance' — this is Nvidia's most important value. Appear to want Nvidia just as a prestige employer.",
  },
];

const FAQS = [
  { question: "How hard is it to get a job at Nvidia in 2025?", answer: "Extremely hard — and getting harder. Nvidia's stock has risen 10× in 3 years, making it one of the most sought-after employers on earth. Their recruiter inboxes are flooded. For CUDA and GPU software roles, the bar is among the highest in tech because the number of people with genuine GPU programming expertise is small and Nvidia's internal bar is very high. For hardware (chip design) roles, the competition is intense but slightly more manageable because the candidate pool (VLSI engineers) is smaller. For ML/AI roles, the competition is fierce — every top ML researcher wants to work at the company building the hardware that runs AI. Realistic advice: apply with specific GPU/hardware experience, not generic ML experience. Referrals from Nvidia employees dramatically help." },
  { question: "What is the Nvidia interview process like?", answer: "Nvidia's process varies by role but follows a general pattern: 1) Resume screen (ATS + recruiter). 2) Recruiter phone screen (30 min). 3) Technical phone screen (60–90 min) — deep technical, no leetcode-style problems for hardware or CUDA roles; instead, domain-specific depth questions. 4) Onsite or virtual loop (4–6 interviews, 1–2 days). For CUDA/GPU roles: expect to discuss cache hierarchy, memory coalescing, warp scheduling, and occupancy optimization. For hardware: RTL design patterns, verification methodology, timing analysis. For ML: distributed training, model architecture tradeoffs, inference optimization. Unlike Google or Meta, Nvidia does not rely heavily on general algorithm/data structure problems — domain expertise trumps LeetCode." },
  { question: "What salary does Nvidia pay?", answer: "Nvidia is among the highest-paying employers in tech, driven by aggressive equity grants that have compounded dramatically. 2025 benchmarks: Senior Software Engineer: $250,000–$450,000 TC (base $175–220k + RSUs); Principal Engineer: $350,000–$600,000 TC; Staff Engineer / Architect: $450,000–$800,000+ TC; Hardware Design Engineer (Senior): $200,000–$350,000 TC; ML Research Scientist: $250,000–$500,000 TC. Note: Nvidia RSUs have a 4-year vest with a 1-year cliff, and the stock's appreciation has meant that many Nvidia employees who joined in 2021–2022 have comp that looks dramatically higher than the stated number. The golden handcuffs at Nvidia are among the strongest in tech." },
  { question: "Do I need CUDA experience to get a job at Nvidia?", answer: "Depends heavily on the role. For GPU software engineering (the core CUDA teams): yes, CUDA experience is essentially mandatory. There are very few cases where someone without CUDA experience gets into the CUDA programming teams. For AI/ML roles: CUDA knowledge is a strong plus but not always required — what matters more is deep ML expertise and experience optimizing models at scale. For platform/system software: experience with GPU-adjacent areas (CUDA runtime, driver development, OS-level programming) can substitute for CUDA application programming. For hardware design roles: CUDA is irrelevant — digital logic, RTL, and verification skills are what matter. For product management and other non-engineering roles: GPU literacy is expected but CUDA programming is not." },
];

export default async function HowToGetAJobAtNvidiaPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Get a Job at Nvidia — The Complete Guide (2025)"
        description="The full Nvidia hiring funnel — application to offer. What separates candidates who get in from those who don't."
        datePublished={publishedDate}
        dateModified={publishedDate}
        url={`${BASE_URL}/blog/how-to-get-a-job-at-nvidia`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job at Nvidia", url: `${BASE_URL}/blog/how-to-get-a-job-at-nvidia` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #222222 50%, #76B900 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            GPU Computing · AI · Chip Design · Nvidia Guide · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How to Get a Job<br />
            <span className="text-white/50">at Nvidia</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The complete Nvidia hiring guide — GPU software, CUDA, chip design, and AI/ML roles. What the process looks like and what Nvidia actually evaluates.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated 2025 · 10 min read · $3T market cap · GPU/AI domain expertise required</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-2 text-[1.9rem] font-extrabold tracking-[-0.02em]">Key roles at Nvidia — what each requires</h2>
          <p className="mb-10 text-[14px] text-[var(--muted)]">Nvidia hires across GPU software, hardware design, AI, and product. The prep required is completely different by role.</p>
          <div className="space-y-6">
            {ROLES.map(({ role, accent, demand, what, prep }) => (
              <div key={role} className="rounded-2xl border border-[var(--border)] p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-extrabold text-[16px]">{role}</h3>
                  <span className="shrink-0 text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: `${accent}18`, color: accent }}>Demand: {demand.split(' — ')[0]}</span>
                </div>
                <p className="text-[13px] leading-6 text-[var(--muted)] mb-3">{what}</p>
                <div className="rounded-lg p-3" style={{ background: `${accent}08`, borderLeft: `3px solid ${accent}` }}>
                  <p className="text-[12px] leading-5 text-[var(--muted)]"><strong>How to prepare:</strong> {prep}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-2 text-[1.9rem] font-extrabold tracking-[-0.02em]">The Nvidia interview process</h2>
          <p className="mb-10 text-[14px] text-[var(--muted)]">Unlike most tech companies, Nvidia interviews are domain-depth focused — not general algorithm / LeetCode.</p>
          <div className="space-y-5">
            {STAGES.map(({ stage, accent, what, howToPass, dontDo }, i) => (
              <div key={stage} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white" style={{ background: accent }}>{i + 1}</span>
                  <h3 className="font-extrabold text-[15px]">{stage}</h3>
                </div>
                <p className="text-[13px] leading-6 text-[var(--muted)] mb-4">{what}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-[#05966918] p-3 border-l-4 border-[#059669]">
                    <p className="text-[11px] font-bold uppercase text-[#059669] mb-1">How to pass</p>
                    <p className="text-[12px] leading-5 text-[var(--muted)]">{howToPass}</p>
                  </div>
                  <div className="rounded-lg bg-[#DC262618] p-3 border-l-4 border-[#DC2626]">
                    <p className="text-[11px] font-bold uppercase text-[#DC2626] mb-1">Don&apos;t do this</p>
                    <p className="text-[12px] leading-5 text-[var(--muted)]">{dontDo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #76B900 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Prepare for Nvidia with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI interview coaching for GPU computing, AI/ML, and chip design roles. Deep technical prep for Nvidia&apos;s domain-expertise interviews.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#1A1A1A]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
