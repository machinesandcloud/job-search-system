import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Cloud Engineer Resume — Examples, Skills & ATS Keywords (2025)",
  description:
    "Cloud engineer resumes fail when they list certifications and services without showing what was built and at what scale. Hiring managers scan for infrastructure ownership, cost impact, and multi-cloud or specialist depth. Before/after examples for AWS, GCP, and Azure cloud engineers at every level.",
  keywords: ["cloud engineer resume", "cloud engineer resume examples", "AWS engineer resume", "GCP engineer resume", "Azure engineer resume", "cloud infrastructure resume", "cloud architect resume", "cloud engineer ATS keywords 2025"],
  alternates: { canonical: "/blog/cloud-engineer-resume" },
  openGraph: {
    title: "Cloud Engineer Resume — Examples, Skills & ATS Keywords (2025)",
    description: "Cloud engineer resumes that pass ATS show infrastructure ownership, cost impact, and multi-cloud depth — not just certification lists. Before/after examples for AWS, GCP, and Azure roles.",
    url: "/blog/cloud-engineer-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_HIRING_MANAGERS_SCAN = [
  {
    signal: "Infrastructure ownership vs. consumption",
    detail: "Cloud engineer resumes need to distinguish between engineers who build cloud infrastructure and engineers who consume it. A developer who deploys to AWS Lambda is not the same as an engineer who designs the VPC architecture, manages IAM policies, and owns the AWS Organization structure. Own your bullets: 'designed the multi-account AWS Organization with AWS Control Tower,' not 'deployed to AWS.' Ownership words: designed, architected, owned, migrated, established.",
    keywords: ["AWS Organizations", "Control Tower", "Landing Zone", "VPC", "IAM", "multi-account", "infrastructure design", "cloud architecture"],
  },
  {
    signal: "Cost optimization and FinOps impact",
    detail: "Cloud cost ownership is increasingly expected of senior cloud engineers. Hiring managers at companies paying meaningful cloud bills specifically look for engineers who have managed costs — not just built infrastructure. Quantify cost impact: dollar amounts saved, percentage reduction, reserved instance coverage achieved, or rightsizing work completed. 'Reduced AWS spend by $180K/year through Savings Plans adoption and rightsizing' is one of the most effective cloud engineer resume bullets possible.",
    keywords: ["FinOps", "cost optimization", "Savings Plans", "Reserved Instances", "rightsizing", "spot instances", "AWS Cost Explorer", "CloudCost", "cloud spend"],
  },
  {
    signal: "Multi-cloud or cloud-specific depth",
    detail: "Cloud engineers fall into two categories: multi-cloud generalists (who work across AWS, GCP, and Azure) and cloud-specific specialists (who have deep expertise in one provider's service ecosystem). Both are valued, but for different roles. Generalists need to show genuine cross-cloud work — not just 'familiar with GCP' when your entire career is AWS. Specialists should surface depth signals: named services beyond the basics (AWS EventBridge, GCP Vertex AI, Azure Synapse), certifications, and the scale of infrastructure managed.",
    keywords: ["multi-cloud", "cloud-agnostic", "Terraform", "AWS", "GCP", "Azure", "hybrid cloud", "cloud migrations", "well-architected"],
  },
  {
    signal: "Security and compliance ownership",
    detail: "Cloud infrastructure security has shifted from a separate security team responsibility to a shared engineering responsibility. Hiring managers for senior cloud roles look for: IAM policy design, security group management, compliance framework implementation (SOC 2, HIPAA, PCI-DSS in cloud environments), and security automation. Engineers who've owned compliance certification work (implementing the AWS controls for SOC 2) are particularly valuable.",
    keywords: ["IAM", "security groups", "KMS", "encryption at rest", "SOC 2", "HIPAA", "PCI-DSS", "GuardDuty", "Security Hub", "cloud compliance"],
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "Junior Cloud / DevOps Engineer",
    before: "Worked on AWS infrastructure and helped set up cloud services",
    after: "Provisioned and managed AWS infrastructure for 3 microservices using Terraform — configured ECS Fargate tasks, ALB, and RDS PostgreSQL instances in private VPC; reduced environment provisioning from 2 days manual process to 25 minutes via IaC templates",
    what_changed: "Named the specific services (ECS Fargate, ALB, RDS), quantified scope (3 microservices), named the IaC tool (Terraform), measured the impact (2 days → 25 minutes). 'Helped set up' became 'provisioned and managed.'",
  },
  {
    level: "Mid-Level Cloud Engineer",
    before: "Managed cloud infrastructure and reduced costs",
    after: "Audited AWS infrastructure for 40-service production environment — identified $340K in annual savings through Reserved Instance conversion (62% coverage achieved), Spot Fleet for batch workloads, and deletion of 180+ orphaned resources; implemented AWS Cost Anomaly Detection reducing surprise spend events from 8 to 1 per quarter",
    what_changed: "Scope (40-service production), dollar savings ($340K/year), specific tactics (RI conversion with coverage %), orphaned resource count (180+), anomaly detection impact (8 → 1 incidents/quarter).",
  },
  {
    level: "Senior Cloud Architect / Platform Engineer",
    before: "Designed AWS architecture for the company",
    after: "Designed multi-account AWS Landing Zone for 200-person engineering org (15 AWS accounts, 3 environments) — implemented Service Control Policies enforcing security guardrails across accounts, automated account vending via Control Tower, and established tagging strategy enabling per-team cost attribution; reduced time to new account provisioning from 3 weeks to 4 hours",
    what_changed: "Org scale (200 engineers, 15 accounts, 3 environments), specific services (Control Tower, SCPs), security work (guardrails), operational improvement (3 weeks → 4 hours), business impact (per-team cost attribution).",
  },
];

const CERTIFICATIONS = {
  intro: "Cloud certifications are more impactful on cloud engineer resumes than on most engineering roles — they validate foundational knowledge that's harder to demonstrate through projects alone.",
  tiers: [
    {
      provider: "AWS",
      hierarchy: [
        { cert: "AWS Certified Cloud Practitioner", level: "Foundational — suitable for entry level or career changers", signal: "Basic familiarity" },
        { cert: "AWS Solutions Architect Associate", level: "Associate — most widely held cloud cert globally", signal: "Strong for junior-mid roles" },
        { cert: "AWS Solutions Architect Professional", level: "Professional — demonstrates advanced design capability", signal: "Strong differentiator at mid-senior level" },
        { cert: "AWS DevOps Engineer Professional / Specialty certs", level: "Professional/Specialty — focused expertise", signal: "Strongest signal for specialist roles" },
      ],
    },
    {
      provider: "Google Cloud (GCP)",
      hierarchy: [
        { cert: "Associate Cloud Engineer", level: "Associate — validates core GCP operational skills", signal: "Good for junior-mid GCP roles" },
        { cert: "Professional Cloud Architect", level: "Professional — most valued GCP cert", signal: "Strong differentiator for senior GCP" },
        { cert: "Professional Data Engineer", level: "Specialty — GCP data platform expertise", signal: "Strong for GCP data engineering roles" },
      ],
    },
    {
      provider: "Microsoft Azure",
      hierarchy: [
        { cert: "AZ-900 Fundamentals", level: "Foundational", signal: "Minimal signal for engineers; suitable for non-engineers" },
        { cert: "AZ-104 Administrator Associate", level: "Associate — core Azure administration", signal: "Solid for Azure admin/ops roles" },
        { cert: "AZ-305 Solutions Architect Expert", level: "Expert — advanced Azure architecture", signal: "Strong signal for senior Azure roles" },
      ],
    },
  ],
};

const FAQS = [
  { question: "What's the difference between a cloud engineer resume and a DevOps resume?", answer: "The functional distinction: cloud engineers focus primarily on cloud infrastructure — account structure, networking, IAM, managed services, and cost — while DevOps engineers focus on deployment pipelines, CI/CD, and the developer experience of getting code to production. In practice, these roles overlap significantly and many companies use the titles interchangeably. For your resume: if the role emphasizes Terraform, AWS Organizations, VPC design, and cloud cost optimization → position as cloud engineer. If the role emphasizes CI/CD, Kubernetes, and deployment automation → position as DevOps. Read the job description and match the terminology to what they're calling the role." },
  { question: "How important are cloud certifications vs. practical experience?", answer: "Certifications and experience are complementary, not equivalent. Certifications validate knowledge of a provider's services at a theoretical level — they prove you've studied AWS architecture patterns, even if you haven't implemented them at production scale. Practical experience proves you've actually built things. The strongest cloud engineer profiles have both: relevant certifications that validate baseline knowledge, plus bullet points showing specific infrastructure they designed, scale they managed, and cost impact they delivered. For career changers: certifications (especially AWS SAA) are a meaningful signal that can open doors when practical cloud experience is limited. For senior engineers: certifications become less critical relative to demonstrated experience." },
  { question: "Should a cloud engineer resume include programming languages?", answer: "Yes — modern cloud engineering involves scripting, automation, and increasingly infrastructure-as-code that requires real programming capability. Python is the most common: boto3 for AWS automation, Google Cloud client libraries, Azure SDK. Go is increasingly used for cloud-native tooling. Bash/shell scripting is expected. Terraform HCL is its own DSL that should be listed. If you have application programming background beyond scripting, include it — full-stack cloud engineers who can build and deploy their own services are more versatile than pure infrastructure specialists. List languages by proficiency: Python (expert), Go (proficient), Bash (expert)." },
];

export default async function CloudEngineerResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Cloud Engineer Resume — Examples, Skills & ATS Keywords (2025)"
        description="Cloud engineer resumes that pass ATS show infrastructure ownership, cost impact, and multi-cloud depth — not just certification lists. Before/after examples for AWS, GCP, and Azure roles."
        url={`${BASE_URL}/blog/cloud-engineer-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Cloud Engineer Resume", url: `${BASE_URL}/blog/cloud-engineer-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Cloud Engineering</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Cloud Engineer Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Certification lists without infrastructure ownership stories don&apos;t get callbacks. Hiring managers want what you built, at what scale, and what it cost — before and after.
          </p>
        </div>
      </section>

      {/* What they scan */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What cloud engineering hiring managers scan for</h2>
          <div className="mt-6 space-y-4">
            {WHAT_HIRING_MANAGERS_SCAN.map((item) => (
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
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before/after: cloud engineer resume bullets</h2>
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

      {/* Certifications */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Certifications by provider and level</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">{CERTIFICATIONS.intro}</p>
          <div className="mt-5 space-y-4">
            {CERTIFICATIONS.tiers.map((provider) => (
              <div key={provider.provider} className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{provider.provider}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {provider.hierarchy.map((cert) => (
                    <div key={cert.cert} className="px-5 py-3.5 grid md:grid-cols-3 gap-2">
                      <p className="font-semibold text-[13px] text-[var(--ink)]">{cert.cert}</p>
                      <p className="text-[12.5px] text-[var(--muted)]">{cert.level}</p>
                      <p className="text-[12.5px] text-[#4361EE] font-medium">{cert.signal}</p>
                    </div>
                  ))}
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your cloud engineer resume for the specific provider and role.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari identifies the AWS/GCP/Azure service signals and cost impact metrics the hiring team is looking for, then rewrites your bullets to match — with ATS keyword validation. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
