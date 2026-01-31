export type RoleProfile = {
  id: string;
  title: string;
  focus: string;
  keywords: string[];
  proofStrategy: string[];
  interviewTopics: string[];
  scripts: {
    referral: string;
    recruiter: string;
    followup: string[];
  };
};

export const roles: RoleProfile[] = [
  {
    id: "devops",
    title: "DevOps Engineer",
    focus: "reliability, automation, and deployment velocity",
    keywords: ["CI/CD", "Terraform", "Kubernetes", "SLOs", "Incident response", "Observability"],
    proofStrategy: [
      "Publish a short post on reducing deploy risk via progressive delivery.",
      "Create a one-page reliability roadmap with SLO targets.",
      "Share a before/after metric story (latency, MTTR, release cadence).",
    ],
    interviewTopics: ["Incident management", "Infrastructure as code", "Release strategy", "Capacity planning"],
    scripts: {
      referral: "Hey {firstName}, quick ask: I'm targeting DevOps roles focused on reliability + CI/CD. Would you be open to a 15-min chat or intro to the platform team?",
      recruiter: "Hi {firstName} - I'm a DevOps engineer focused on automating CI/CD and improving SLOs. Recently cut deploy time by 35% and MTTR by 28%. Open to roles where reliability + delivery velocity are core.",
      followup: [
        "Circling back with a quick snapshot of my recent reliability wins - happy to share a short rollout plan.",
        "Following up with a 1-page SLO improvement outline tailored to your team.",
        "Last ping - happy to walk through an automation roadmap if helpful.",
      ],
    },
  },
  {
    id: "sre",
    title: "Site Reliability Engineer",
    focus: "availability, performance, and scalable systems",
    keywords: ["SLOs", "Error budgets", "On-call", "Capacity", "Reliability tooling"],
    proofStrategy: [
      "Publish an error budget policy for a sample service.",
      "Document a postmortem-style case study with outcomes.",
      "Share a reliability dashboard with KPI targets.",
    ],
    interviewTopics: ["Error budgets", "Scaling strategies", "On-call health", "Observability"],
    scripts: {
      referral: "Hey {firstName}, I'm exploring SRE roles focused on SLOs + availability. Could you point me to the right hiring manager or share what reliability work matters most?",
      recruiter: "Hi {firstName} - I'm an SRE focused on SLOs and scaling. Recently improved availability to 99.98% and reduced paging by 40%. Open to reliability-first roles.",
      followup: [
        "Following up with a reliability initiative outline I'd bring in the first 30 days.",
        "Quick add: I can share a postmortem playbook that cut incident time in half.",
        "Closing the loop - let me know if there's a fit; happy to share details.",
      ],
    },
  },
  {
    id: "platform",
    title: "Platform Engineer",
    focus: "developer experience, internal tooling, and infra enablement",
    keywords: ["Platform", "Developer experience", "Internal tools", "Self-service", "Golden paths"],
    proofStrategy: [
      "Create a short platform roadmap with measurable dev velocity gains.",
      "Ship a sample self-service workflow diagram.",
      "Post a case study on reducing onboarding time.",
    ],
    interviewTopics: ["Platform strategy", "DX metrics", "Tooling architecture", "Enablement"],
    scripts: {
      referral: "Hey {firstName}, I'm exploring platform engineering roles centered on internal tooling + developer velocity. Could you connect me with the platform team?",
      recruiter: "Hi {firstName} - I build platform systems that cut dev friction. Recently reduced onboarding time by 50% and built a self-service deploy pipeline. Interested in platform roles.",
      followup: [
        "Following up with a one-page platform vision focused on dev velocity.",
        "Sharing a quick example of a golden path workflow I designed.",
        "Last touch - happy to share examples or jump on a call.",
      ],
    },
  },
  {
    id: "cloud",
    title: "Cloud Engineer",
    focus: "cloud architecture, security, and cost optimization",
    keywords: ["AWS", "GCP", "Azure", "Cost optimization", "IaC", "Security"],
    proofStrategy: [
      "Publish a cost optimization checklist tied to common services.",
      "Create a reference architecture for a scalable service.",
      "Share a migration plan and risk mitigation summary.",
    ],
    interviewTopics: ["Cloud architecture", "Security controls", "FinOps", "Disaster recovery"],
    scripts: {
      referral: "Hey {firstName}, I'm targeting cloud engineering roles focused on architecture + cost optimization. Is there someone on your infra team I should speak with?",
      recruiter: "Hi {firstName} - Cloud engineer focused on scalable AWS architectures and cost efficiency. Recently cut infra spend by 22% while improving latency. Interested in cloud engineering roles.",
      followup: [
        "Following up with a sample cloud optimization plan tailored to your stack.",
        "Sharing a reference architecture I built for HA services.",
        "Last note - happy to jump on a call if helpful.",
      ],
    },
  },
  {
    id: "devsecops",
    title: "DevSecOps Engineer",
    focus: "secure delivery, compliance, and automation",
    keywords: ["Security", "CI/CD", "Compliance", "SAST", "Secrets", "Zero trust"],
    proofStrategy: [
      "Create a secure CI/CD checklist and policy template.",
      "Share a threat modeling summary for a sample service.",
      "Publish a compliance automation workflow.",
    ],
    interviewTopics: ["Secure pipelines", "Policy as code", "Secrets management", "Compliance"],
    scripts: {
      referral: "Hey {firstName}, I'm exploring DevSecOps roles focused on secure delivery and compliance automation. Any chance you can connect me to the security platform team?",
      recruiter: "Hi {firstName} - DevSecOps engineer focused on secure CI/CD, policy as code, and compliance automation. Recently reduced security review time by 35%. Open to DevSecOps roles.",
      followup: [
        "Following up with a secure pipeline outline I can share.",
        "Quick add: I have a compliance automation framework ready to walk through.",
        "Final ping - happy to chat if this is relevant.",
      ],
    },
  },
  {
    id: "security",
    title: "Security Engineer",
    focus: "threat detection, risk reduction, and secure systems",
    keywords: ["Threat modeling", "Detection", "SIEM", "Vulnerability", "Zero trust"],
    proofStrategy: [
      "Share a threat detection playbook outline.",
      "Publish a security risk assessment template.",
      "Create a sample incident response runbook.",
    ],
    interviewTopics: ["Threat modeling", "Incident response", "Security tooling", "Risk management"],
    scripts: {
      referral: "Hey {firstName}, I'm targeting security engineering roles focused on detection + risk reduction. Do you know who owns security hiring?",
      recruiter: "Hi {firstName} - Security engineer focused on threat detection and incident response. Recently improved detection coverage by 30%. Open to security engineering roles.",
      followup: [
        "Sharing a detection playbook outline that might be relevant.",
        "Quick follow-up with a security maturity snapshot I can share.",
        "Final ping - happy to connect if there's interest.",
      ],
    },
  },
  {
    id: "data",
    title: "Data Engineer",
    focus: "pipelines, data reliability, and analytics readiness",
    keywords: ["ETL", "Data modeling", "Airflow", "dbt", "Warehouses"],
    proofStrategy: [
      "Publish a data pipeline reliability checklist.",
      "Share a schema design case study.",
      "Create a data quality monitoring dashboard.",
    ],
    interviewTopics: ["Pipeline design", "Data quality", "Warehouse architecture", "Performance"],
    scripts: {
      referral: "Hey {firstName}, I'm looking at data engineering roles focused on reliable pipelines + modeling. Could you connect me to the data team?",
      recruiter: "Hi {firstName} - Data engineer focused on pipeline reliability and data modeling. Recently improved data freshness by 40%. Interested in data engineering roles.",
      followup: [
        "Following up with a data reliability checklist I use.",
        "Sharing a sample modeling framework that improved stakeholder adoption.",
        "Final ping - happy to share details if helpful.",
      ],
    },
  },
  {
    id: "backend",
    title: "Backend Engineer",
    focus: "APIs, scalability, and service performance",
    keywords: ["Microservices", "APIs", "Latency", "Caching", "Scalability"],
    proofStrategy: [
      "Share a system design case study with performance metrics.",
      "Publish an API reliability checklist.",
      "Create a scaling plan for a key service.",
    ],
    interviewTopics: ["System design", "Performance", "APIs", "Data consistency"],
    scripts: {
      referral: "Hey {firstName}, I'm exploring backend roles centered on scalable APIs and performance. Any chance you can connect me with the backend team?",
      recruiter: "Hi {firstName} - Backend engineer focused on scalable APIs and latency reduction. Recently cut p95 latency by 32%. Open to backend roles.",
      followup: [
        "Following up with a system design snapshot I can walk through.",
        "Sharing an API reliability framework I used recently.",
        "Last ping - happy to connect if this is in scope.",
      ],
    },
  },
  {
    id: "em",
    title: "Engineering Manager",
    focus: "team execution, delivery systems, and leadership",
    keywords: ["People leadership", "Roadmaps", "Execution", "Cross-functional"],
    proofStrategy: [
      "Publish a delivery operating cadence framework.",
      "Share a leadership scope narrative (team, impact, outcomes).",
      "Create a cross-functional launch case study.",
    ],
    interviewTopics: ["Leadership", "Execution", "Stakeholder management", "Scaling teams"],
    scripts: {
      referral: "Hey {firstName}, I'm targeting EM roles focused on delivery systems and team impact. Would you be open to an intro to the engineering leadership team?",
      recruiter: "Hi {firstName} - EM focused on execution and team velocity. Recently improved roadmap delivery by 25% across a 12-person team. Open to EM roles.",
      followup: [
        "Sharing a leadership narrative snapshot tied to delivery outcomes.",
        "Following up with a sample operating cadence I implemented.",
        "Final ping - happy to share details if helpful.",
      ],
    },
  },
];

const fallbackProfile: RoleProfile = {
  id: "custom",
  title: "Target Role",
  focus: "clear positioning and measurable impact",
  keywords: ["Impact", "Scope", "Execution", "Leadership", "Metrics"],
  proofStrategy: [
    "Share a concise impact case study tied to outcomes.",
    "Publish a short insight post that shows domain expertise.",
    "Build a proof asset (doc, demo, or analysis) aligned to the role.",
  ],
  interviewTopics: ["Impact stories", "Cross-functional execution", "Problem solving", "Leadership"],
  scripts: {
    referral: "Hey {firstName}, I'm exploring roles in {role} and would love a quick perspective or intro if possible.",
    recruiter: "Hi {firstName} - I'm targeting {role} roles and recently delivered measurable outcomes in scope and execution. Open to roles where impact is the core priority.",
    followup: [
      "Following up with a short impact snapshot aligned to {role} work.",
      "Quick reminder - happy to share more details if relevant.",
      "Final ping - would love to connect if there's a fit.",
    ],
  },
};

export function getRoleProfile(role: string | undefined) {
  if (!role) return fallbackProfile;
  const normalized = role.toLowerCase();
  const match = roles.find((item) => item.title.toLowerCase() === normalized);
  if (match) return match;
  const keywordMatch = roles.find((item) => normalized.includes(item.id) || normalized.includes(item.title.toLowerCase()));
  return keywordMatch ?? fallbackProfile;
}

export const roleOptions = roles.map((role) => role.title);
