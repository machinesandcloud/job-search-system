import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "DevOps Resume — Examples, Skills & ATS Keywords (2025)",
  description:
    "DevOps and platform engineering resumes fail ATS because they list tools rather than infrastructure outcomes. Hiring managers scan for deployment frequency, incident reduction, and the platform multiplier effect. Before/after examples for DevOps engineers, SREs, and platform engineers at every level.",
  keywords: ["devops resume", "devops engineer resume", "devops resume examples", "site reliability engineer resume", "SRE resume", "platform engineer resume", "cloud engineer resume", "kubernetes resume", "terraform resume", "devops ATS keywords 2025"],
  alternates: { canonical: "/blog/devops-resume" },
  openGraph: {
    title: "DevOps Resume — Examples, Skills & ATS Keywords (2025)",
    description: "DevOps resumes that pass ATS show deployment outcomes, incident reduction, and platform scale — not just tool lists. Before/after examples for DevOps, SRE, and platform engineering roles.",
    url: "/blog/devops-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_HIRING_MANAGERS_LOOK_FOR = [
  {
    signal: "Infrastructure scale and platform ownership",
    detail: "Senior DevOps resumes show ownership of infrastructure that other engineers depend on — not just running a CI/CD pipeline, but owning the platform 50 engineers ship through. Scale signals: number of services deployed, clusters managed, environments owned, and the engineering team size the infrastructure supports. 'Managed Kubernetes cluster' is weak; 'managed 3-cluster Kubernetes environment supporting 80 microservices deployed by 40-engineer team' is strong.",
    keywords: ["Kubernetes", "EKS", "GKE", "AKS", "multi-cluster", "platform engineering", "developer experience", "self-service infrastructure"],
  },
  {
    signal: "Deployment frequency and reliability metrics",
    detail: "The DORA metrics are the standard language of DevOps impact: deployment frequency (how often you ship), lead time for changes (time from commit to production), mean time to recovery (MTTR after incidents), and change failure rate. Resumes that cite DORA metrics signal maturity. 'Improved deployment frequency from 2 releases/month to 12 releases/day' is a precise, credible, and memorable DevOps impact statement.",
    keywords: ["deployment frequency", "MTTR", "change failure rate", "lead time", "DORA metrics", "SLA", "SLO", "error budget", "incident response"],
  },
  {
    signal: "Infrastructure as code and automation depth",
    detail: "Modern DevOps engineering is primarily IaC-first. Hiring managers look for the depth of automation ownership: did you run Terraform or did you design the Terraform module architecture? Did you configure an existing CI/CD pipeline or build one from scratch? The verbs matter: built, designed, authored, migrated vs. used, configured, maintained. IaC candidates who can't speak to their module structure or state management approach signal surface-level exposure.",
    keywords: ["Terraform", "Pulumi", "AWS CDK", "Ansible", "Helm", "infrastructure as code", "GitOps", "ArgoCD", "Flux"],
  },
  {
    signal: "Cost optimization and platform economics",
    detail: "Infrastructure cost ownership is a differentiator that most DevOps resumes miss. Senior DevOps and platform engineers are increasingly expected to own cloud cost optimization alongside reliability. Cost signals: percentage reduction in compute spend, spot instance adoption, reserved instance management, or specific dollar amounts saved. 'Reduced cloud infrastructure costs by 34% through Spot Fleet migration' is memorable and demonstrates business awareness alongside technical capability.",
    keywords: ["cost optimization", "FinOps", "spot instances", "reserved instances", "cloud spend", "AWS Cost Explorer", "rightsizing", "autoscaling"],
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior DevOps Engineer",
    before: "Set up CI/CD pipelines using GitHub Actions and deployed applications to AWS",
    after: "Built GitHub Actions CI/CD pipeline for 3 backend services — automated build, test, and deployment to ECS, reducing release cycle from 2-day manual process to 45-minute automated pipeline; added integration test gate that caught 2 production-breaking bugs pre-deploy",
    what_changed: "Quantified scope (3 services), named the tools specifically (GitHub Actions, ECS), measured the improvement (2 days → 45 minutes), and added the quality impact (2 bugs caught). The before version is commodity; the after shows production engineering.",
  },
  {
    level: "Mid-Level SRE / DevOps Engineer",
    before: "Improved system reliability and reduced incidents",
    after: "Redesigned on-call rotation and incident response playbook for 14-service production environment — reduced MTTR from 47 minutes to 11 minutes over 6 months; implemented automated runbooks for top-5 incident types that resolved 60% of pages without human intervention",
    what_changed: "Before/after MTTR numbers (47min → 11min), scope (14-service environment), timeline (6 months), and automated resolution rate (60% of pages). The before version is unmeasurable; the after is concrete DevOps impact.",
  },
  {
    level: "Senior Platform Engineer / DevOps Lead",
    before: "Led infrastructure team and built internal developer platform",
    after: "Led 4-engineer platform team building internal developer platform (IDP) on Kubernetes — reduced mean time to new service deployment from 3 weeks to 4 hours for 65-engineer org; implemented self-service environment provisioning via Backstage that eliminated 200+ monthly infrastructure tickets; reduced cloud spend by $340K/year through Graviton migration and spot fleet adoption",
    what_changed: "Team size (4 engineers), specific platform (IDP on Kubernetes), deployment time improvement (3 weeks → 4 hours), org scale (65 engineers), ticket reduction quantified (200/month), and cost savings ($340K/year).",
  },
];

const SKILLS_SECTION = {
  tiers: [
    { label: "Cloud Platforms", example: "AWS (expert — EKS, ECS, Lambda, RDS, S3, CloudFormation), GCP (proficient — GKE, Cloud Run), Azure (working knowledge)" },
    { label: "Container & Orchestration", example: "Kubernetes, Docker, Helm, ArgoCD, Flux (GitOps), Istio (service mesh)" },
    { label: "Infrastructure as Code", example: "Terraform (expert), Pulumi, Ansible, AWS CDK, Packer" },
    { label: "CI/CD & Automation", example: "GitHub Actions, Jenkins, GitLab CI, CircleCI, Tekton" },
    { label: "Observability & Monitoring", example: "Prometheus, Grafana, Datadog, PagerDuty, ELK Stack, Jaeger (distributed tracing)" },
    { label: "Scripting & Languages", example: "Python (proficient), Bash (expert), Go (proficient), YAML/HCL" },
    { label: "Security & Compliance", example: "Vault (HashiCorp), SAST/DAST, Snyk, SOC 2, CIS benchmarks" },
  ],
};

const FAQS = [
  { question: "What's the difference between a DevOps resume and an SRE resume?", answer: "DevOps and SRE roles overlap significantly, and hiring managers often use the titles interchangeably. The functional distinction: SRE (Site Reliability Engineering) emphasizes reliability, error budgets, SLOs, and the production engineering discipline defined by Google — SRE resumes should lead with reliability metrics (MTTR, uptime, error budget adherence) and production engineering experience. DevOps resumes historically emphasize the CI/CD pipeline, deployment automation, and the developer productivity impact — though modern DevOps roles increasingly include reliability ownership. For your resume: use the language of the job description you're applying to. If they say SRE, lead with reliability metrics; if they say DevOps, lead with deployment automation and platform ownership. Most hiring teams at companies that don't have a formal SRE discipline will see both titles as the same function." },
  { question: "Should you include Kubernetes on a DevOps resume if you've only used it in personal projects?", answer: "Personal project Kubernetes experience is valid to list — but be precise about the scope. 'Kubernetes (personal projects — managed 3-node cluster, deployed 5 microservices, configured Ingress and NetworkPolicy)' is honest and specific. What's not valid: listing Kubernetes as 'expert' when your experience is personal projects, or listing it without being able to discuss cluster networking, RBAC, resource quotas, or upgrade processes in an interview. DevOps technical interviews often go deep on Kubernetes — the gap between personal project use and production cluster management is significant and experienced interviewers will probe it. Be accurate about your depth." },
  { question: "How important are certifications for a DevOps resume?", answer: "Certifications matter differently at different career stages. For entry and junior DevOps: AWS Solutions Architect Associate (SAA), CKA (Certified Kubernetes Administrator), or HashiCorp Terraform Associate are strong differentiators that validate cloud and infrastructure knowledge that's hard to demonstrate without professional experience. For mid-senior DevOps: certifications are less critical than demonstrated production experience — a senior engineer with 5 years of Kubernetes production experience doesn't need a CKA to be credible, but it doesn't hurt. For any level: AWS/GCP/Azure professional-level certifications (not just associate) are meaningful signals because they require demonstrated expertise. Certifications from training courses (Udemy, Coursera) without the formal vendor cert are not typically listed on DevOps resumes." },
];

export default async function DevOpsResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="DevOps Resume — Examples, Skills & ATS Keywords (2025)"
        description="DevOps resumes that pass ATS show deployment outcomes, incident reduction, and platform scale — not just tool lists. Before/after examples for DevOps, SRE, and platform engineering roles."
        url={`${BASE_URL}/blog/devops-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "DevOps Resume", url: `${BASE_URL}/blog/devops-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · DevOps & SRE</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">DevOps Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Listing Terraform and Kubernetes isn&apos;t enough. Hiring managers want infrastructure scale, deployment frequency improvements, and the platform multiplier effect. Before/after examples for every level.
          </p>
        </div>
      </section>

      {/* What they scan for */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What DevOps hiring managers scan for</h2>
          <div className="mt-6 space-y-4">
            {WHAT_HIRING_MANAGERS_LOOK_FOR.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.keywords.map((kw) => (
                    <span key={kw} className="rounded-full bg-[var(--brand)]/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-[#4361EE]">{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/after */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after: DevOps resume bullets</h2>
          <div className="mt-6 space-y-5">
            {BULLET_TRANSFORMATIONS.map((ex) => (
              <div key={ex.level} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">{ex.level}</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="rounded-xl bg-red-50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Before</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{ex.before}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">After</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{ex.after}</p>
                  </div>
                  <div className="rounded-xl bg-[var(--bg)] p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-1">What changed</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{ex.what_changed}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">DevOps skills section structure</h2>
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
            {SKILLS_SECTION.tiers.map((tier) => (
              <div key={tier.label} className="border-b border-[var(--border)] last:border-0 px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">{tier.label}</p>
                <p className="font-mono text-[12px] leading-5 text-[var(--ink)]">{tier.example}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your DevOps resume for the specific role&apos;s stack and scale.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes the job description, identifies the infrastructure signals and deployment metrics the hiring team is looking for, and rewrites your bullets to match — with ATS keyword validation for the cloud and DevOps toolchain. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
