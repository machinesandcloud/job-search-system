"use client";

import { useMemo, useState } from "react";

type CommandCenterProps = {
  assessment: any;
  userEmail?: string | null;
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "✦" },
  { id: "action", label: "Action Plan", icon: "⚡" },
  { id: "progress", label: "Progress Tracker", icon: "📊" },
  { id: "scripts", label: "Scripts Library", icon: "📝" },
  { id: "companies", label: "Target Companies", icon: "🎯" },
  { id: "pro", label: "Pro Pack", icon: "💼" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const ROLE_SKILL_MAP: Record<string, string[]> = {
  "DevOps Engineer": ["Kubernetes", "AWS", "Terraform", "CI/CD", "Docker", "Python", "Monitoring"],
  "Site Reliability Engineer": ["SLO/SLI", "Incident Response", "Kubernetes", "Observability", "Linux", "Automation"],
  "Platform Engineer": ["Kubernetes", "Infrastructure as Code", "Developer Experience", "Terraform", "CI/CD"],
  "Engineering Manager": ["Leadership", "Delivery", "Hiring", "Roadmaps", "Execution"],
  "Director of Engineering": ["Org Leadership", "Strategy", "Scaling Teams", "Hiring", "Execution"],
  "Senior Backend Engineer": ["APIs", "Databases", "Distributed Systems", "Performance", "Testing"],
  "Senior Frontend Engineer": ["React", "TypeScript", "Performance", "Accessibility", "Design Systems"],
  "Staff Engineer": ["System Design", "Architecture", "Technical Leadership", "Mentoring", "Influence"],
  "Principal Engineer": ["Architecture", "Cross-org Impact", "System Design", "Influence", "Strategy"],
  "Cloud Architect": ["AWS", "Azure", "GCP", "Networking", "Security", "Infrastructure"],
};

function estimateYears(level: string) {
  switch (level) {
    case "Mid-Level":
      return 4;
    case "Senior":
      return 8;
    case "Staff":
      return 10;
    case "Principal":
      return 12;
    case "Manager":
      return 10;
    case "Director":
      return 14;
    default:
      return 8;
  }
}

function matchScore(skills: string[], required: string[], compTarget: string) {
  const overlap = required.filter((skill) => skills.includes(skill)).length;
  const skillMatch = required.length ? overlap / required.length : 0.6;
  const compBoost = compTarget.includes("200") || compTarget.includes("300") ? 0.1 : 0.0;
  const score = Math.min(1, skillMatch + compBoost);
  return Math.round(score * 100);
}

function buildHeadline(role: string, skills: string[], years: number) {
  const top = skills.slice(0, 3).join(" • ");
  return `${role} | ${top} | ${years}+ yrs`;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function CommandCenter({ assessment, userEmail }: CommandCenterProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [taskState, setTaskState] = useState<Record<string, boolean>>({});
  const [showWhy, setShowWhy] = useState(false);

  const ai = assessment?.aiInsights || {};
  const week1 = ai?.weeklyPlan?.week1 || [];
  const week2 = ai?.weeklyPlan?.week2 || [];
  const tasks = [
    { id: "task-1", label: week1[0] || "Audit LinkedIn headline for target role keywords" },
    { id: "task-2", label: week1[1] || "Build a 20-company target list" },
    { id: "task-3", label: week1[2] || "Draft 3 outreach scripts" },
    { id: "task-4", label: week2[0] || "Customize resume for top 5 roles" },
  ];

  const scoreCards = [
    { label: "Clarity", score: assessment.clarityScore, max: 25 },
    { label: "Assets", score: assessment.assetsScore, max: 25 },
    { label: "Network", score: assessment.networkScore, max: 25 },
    { label: "Execution", score: assessment.executionScore, max: 25 },
  ];

  const targetCompanies = Array.isArray(assessment.targetCompanies) ? assessment.targetCompanies : [];
  const targetRoles = Array.isArray(assessment.targetRoles) ? assessment.targetRoles : [];
  const targetRole = targetRoles[0]?.name || "Senior DevOps Engineer";
  const yearsExperience = estimateYears(assessment.level);
  const baseSkills = ROLE_SKILL_MAP[targetRole] || ROLE_SKILL_MAP["DevOps Engineer"];
  const skills = baseSkills.slice(0, 5);
  const headlineCurrent = `${targetRole} | Cloud Infrastructure`;
  const headlineSuggested = buildHeadline(`${targetRole} & Platform`, skills, yearsExperience);
  const topMatches = targetCompanies.slice(0, 3).map((company) => ({
    name: company.name,
    score: matchScore(skills, baseSkills, assessment.compTarget),
  }));

  const routeLabel = assessment?.recommendedRoute === "FastTrack" ? "Fast Track" : assessment?.recommendedRoute || "Growth Ready";

  const statusLabel = useMemo(() => {
    if (assessment.totalScore >= 70) return "Fast Track";
    if (assessment.totalScore >= 45) return "Growth Ready";
    return "Foundation Phase";
  }, [assessment.totalScore]);

  const resumeHealth = useMemo(() => {
    const base = assessment.resumeStatus === "updated_30" ? 0.35 : assessment.resumeStatus === "needs_work" ? 0.2 : 0.05;
    const linkedin = assessment.linkedinStatus === "optimized" ? 0.25 : assessment.linkedinStatus === "basic" ? 0.1 : 0.05;
    const portfolio = assessment.portfolioStatus ? 0.15 : 0.0;
    const interview = assessment.interviewReady ? 0.1 : 0.0;
    const score = Math.min(1, base + linkedin + portfolio + interview + 0.15);
    return Math.round(score * 100);
  }, [assessment]);

  const missingKeywords = baseSkills.filter((skill) => !skills.includes(skill)).slice(0, 3);

  return (
    <div className="flex min-h-screen bg-[#0A0E27] text-white">
      <aside className="hidden w-60 flex-shrink-0 border-r border-white/10 bg-[#0A0E27]/95 p-4 lg:flex lg:flex-col">
        <div className="border-b border-white/10 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Askia Coaching</p>
          <p className="text-xs text-white/50">Command Center</p>
        </div>
        <nav className="mt-4 flex-1 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold ${
                activeTab === item.id ? "bg-[#06B6D4]/15 text-white" : "text-white/60 hover:bg-white/5"
              }`}
            >
              <span className={`${activeTab === item.id ? "text-[#06B6D4]" : "text-white/40"}`}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#0F172A] text-2xl font-bold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
            {assessment.totalScore}
          </div>
          <p className="mt-2 text-sm font-semibold">{statusLabel}</p>
        </div>
        <div className="mt-4 border-t border-white/10 pt-4 text-xs text-white/60">
          <p className="text-sm font-semibold text-white/80">{userEmail || "Your account"}</p>
          <button type="button" className="mt-2 text-xs text-red-300 hover:text-red-200">
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 px-6 py-10 lg:px-10">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h1 className="text-2xl font-semibold">{getGreeting()}, Steve! 👋</h1>
              <p className="mt-2 text-white/70">
                You're 3 days into your transition toward {targetRole} roles.
              </p>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                🎯 Based on your {yearsExperience} years of experience and {skills.join(", ")} expertise, you're well-positioned for:
                <ul className="mt-2 space-y-1">
                  {topMatches.map((match) => (
                    <li key={match.name}>
                      • {targetRole} at {match.name} ({match.score}% skill match)
                    </li>
                  ))}
                </ul>
              </div>
              <span className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] px-4 py-2 text-xs font-semibold shadow-lg">
                Next Action → {tasks[0]?.label}
              </span>
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">Priority action</p>
                <p className="mt-3 text-sm text-white/70">Your LinkedIn headline is missing key target keywords.</p>
                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                  <p className="text-xs text-white/50">Current headline</p>
                  <p className="mt-1 text-white/80">{headlineCurrent}</p>
                  <p className="mt-3 text-xs text-white/50">Suggested headline</p>
                  <p className="mt-1 text-white">{headlineSuggested}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">Copy headline</button>
                    <button className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold">Edit & customize</button>
                    <button
                      className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-[#06B6D4]"
                      onClick={() => setShowWhy((prev) => !prev)}
                    >
                      {showWhy ? "Hide why" : "See why this works"}
                    </button>
                  </div>
                  {showWhy && (
                    <div className="mt-3 text-xs text-white/60">
                      • Includes “Platform” and “Kubernetes” which appear in 80% of target postings.<br />
                      • Years of experience signals Staff-level readiness.<br />
                      • Clear skill stack improves recruiter match rates.
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">Resume health check</p>
                <p className="mt-3 text-3xl font-bold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
                  {resumeHealth}% optimized
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>✓ ATS-friendly format</li>
                  <li>✓ Quantified achievements</li>
                  <li>✗ Missing keywords: {missingKeywords.join(", ")}</li>
                  <li>⚠ Add leadership examples for Staff-level roles</li>
                </ul>
                <div className="mt-4 flex gap-3">
                  <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">Fix issues</button>
                  <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">Download optimized</button>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Skill match analyzer</p>
              <div className="mt-4 space-y-4">
                {topMatches.map((match) => (
                  <div key={match.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{targetRole} at {match.name}</p>
                      <span className="text-sm font-semibold text-[#06B6D4]">{match.score}% match</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]" style={{ width: `${match.score}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-white/60">Strong: {skills.join(", ")}</p>
                    <p className="mt-1 text-xs text-white/60">Add: {missingKeywords.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {scoreCards.map((card) => {
                const pct = Math.round((card.score / card.max) * 100);
                const color = pct >= 80 ? "#10B981" : pct >= 50 ? "#06B6D4" : "#F59E0B";
                return (
                  <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{card.label}</p>
                    <p className="mt-3 text-3xl font-bold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
                      {card.score}/{card.max}
                    </p>
                    <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <p className="mt-2 text-sm text-white/70">
                      {pct >= 80 ? "Strong ✓" : pct >= 50 ? "Moderate" : "Needs work"}
                    </p>
                  </div>
                );
              })}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Total</p>
                <p className="mt-3 text-4xl font-bold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
                  {assessment.totalScore}/100
                </p>
                <p className="mt-2 text-sm text-white/70">{statusLabel}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Route</p>
                <span className="mt-4 inline-flex rounded-full bg-[#06B6D4]/20 px-4 py-2 text-sm font-semibold text-white">
                  {routeLabel}
                </span>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">This Week's Focus</p>
                <span className="rounded-full bg-[#06B6D4]/20 px-3 py-1 text-xs font-semibold">Week 1 of 2</span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {tasks.map((task) => (
                  <div key={task.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <button
                      type="button"
                      className="flex items-start gap-3 text-left"
                      onClick={() => setTaskState((prev) => ({ ...prev, [task.id]: !prev[task.id] }))}
                    >
                      <span
                        className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border ${
                          taskState[task.id] ? "border-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]" : "border-white/30"
                        }`}
                      >
                        {taskState[task.id] && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className={`text-sm ${taskState[task.id] ? "line-through text-white/60" : "text-white/80"}`}>
                        {task.label}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Your Progress</p>
                <div className="mt-4 flex items-center gap-3">
                  {["Start", "Today", "Week 1", "Week 2", "Target"].map((label, idx) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${idx < 2 ? "bg-[#06B6D4]" : "border border-white/30"}`} />
                      <span className="text-xs text-white/60">{label}</span>
                      {idx < 4 && <span className={`h-px w-8 ${idx < 1 ? "bg-[#06B6D4]" : "bg-white/20"}`} />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">AI Insights</p>
                <p className="mt-3 text-sm text-white/80"><strong>Primary Gap:</strong> {ai.primaryGap || "Pending"}</p>
                <div className="my-4 h-px bg-white/10" />
                <p className="text-sm text-white/80"><strong>Quick Win:</strong> {ai.quickWin || "Pending"}</p>
                <button type="button" className="mt-4 text-sm font-semibold text-[#A78BFA]">
                  Ask AI for help →
                </button>
              </div>
            </section>
          </div>
        )}

        {activeTab === "action" && (
          <div className="space-y-6">
            <header>
              <h2 className="text-2xl font-semibold">Your 14-Day Action Plan</h2>
              <p className="text-white/70">
                Tailored to your {assessment.hoursPerWeek || 8} hours/week commitment.
              </p>
            </header>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">Week 1: Foundation</p>
                <div className="mt-4 space-y-3">
                  {week1.map((item: string, index: number) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 h-5 w-5 rounded-full border border-white/30" />
                        <div>
                          <p className="text-sm font-semibold text-white/90">{item}</p>
                          {index === 0 && (
                            <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/70">
                              <p className="text-white/80">Current headline: {headlineCurrent}</p>
                              <p className="mt-2 text-white">AI-optimized: {headlineSuggested}</p>
                              <div className="mt-3 flex gap-2">
                                <button className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Copy headline</button>
                                <button className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold">Why this works?</button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">Week 2: Execution</p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {week2.map((item: string) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "scripts" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Scripts & Templates Library</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {["Referral Ask", "Recruiter Cold Email", "Hiring Manager Note"].map((title) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-lg font-semibold">{title}</p>
                  <p className="mt-2 text-sm text-white/70">
                    Personalized templates to accelerate your outreach.
                  </p>
                  <button type="button" className="mt-4 text-sm font-semibold text-[#06B6D4]">
                    Copy →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "companies" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Target Companies</h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {targetCompanies.map((company: any) => (
                  <div key={company.id || company.name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={company.name} className="h-10 w-10 object-contain" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-white/10" />
                    )}
                    <div>
                      <p className="text-sm font-semibold">{company.name}</p>
                      <p className="text-xs text-white/60">Priority: Medium</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "pro" && (
          <div className="space-y-6">
            {!assessment.hasPurchasedPro ? (
              <div className="rounded-2xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 p-8 text-center">
                <h2 className="text-2xl font-semibold">Unlock your full career system</h2>
                <p className="mt-2 text-white/70">Upgrade to Pro Pack — $49</p>
                <button className="mt-6 h-14 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] px-8 text-sm font-bold">
                  Upgrade to Pro Pack →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Pro Pack Unlocked</h2>
                <p className="text-white/70">Your premium content is ready.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
