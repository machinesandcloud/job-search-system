"use client";

import { useEffect, useMemo, useState } from "react";

type CommandCenterProps = {
  assessment: any;
  userEmail?: string | null;
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "✦" },
  { id: "action", label: "Action Plan", icon: "⚡" },
  { id: "progress", label: "Progress Tracker", icon: "📊" },
  { id: "applications", label: "Applications", icon: "🗂️" },
  { id: "scripts", label: "Scripts Library", icon: "📝" },
  { id: "companies", label: "Target Companies", icon: "🎯" },
  { id: "pro", label: "Pro Pack", icon: "💼" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

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
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [digestEnabled, setDigestEnabled] = useState(true);
  const [resumeFixApplied, setResumeFixApplied] = useState<Record<string, boolean>>({});

  const ai = assessment?.aiInsights || {};
  const skillMatchData = assessment?.skillMatchData || {};
  const targetRole = assessment?.targetRoles?.[0]?.name || "Target role";
  const resumeParsed = assessment.resumeParsedData || null;
  const linkedinParsed = assessment.linkedinParsedData || null;
  const resumeAnalysis = assessment.resumeAnalysis || null;
  const linkedinAnalysis = assessment.linkedinAnalysis || null;
  const companyMatches = assessment.companyMatches?.matches ? assessment.companyMatches.matches : assessment.companyMatches || [];
  const actionPlan = assessment.actionPlan || null;
  const scripts = assessment.personalizedScripts?.scripts || [];

  const week1Plan = assessment.week1Plan?.week1 || actionPlan?.week1 || null;
  const week2Plan = actionPlan?.week2 || null;

  const profile = {
    fullName: resumeParsed?.contact?.fullName || resumeParsed?.fullName || "",
    currentRole: resumeParsed?.currentRole?.title || resumeParsed?.currentRole || "",
    currentCompany: resumeParsed?.currentRole?.company || "",
    yearsExperience: resumeParsed?.totalYearsExperience || resumeParsed?.yearsExperience || null,
    topSkills: resumeParsed?.topSkills || [],
    achievements:
      resumeParsed?.achievements ||
      resumeParsed?.experience?.[0]?.achievements?.map((item: any) => item.text || item.description || "") ||
      [],
  };

  const resumeHealth = resumeAnalysis
    ? {
        score: resumeAnalysis.overallScore,
        issues: resumeAnalysis.issues || [],
      }
    : null;

  const skillMatches = Array.isArray(companyMatches) ? companyMatches : [];
  const taskProgress = assessment.taskProgress || null;
  const applications = Array.isArray(assessment.applications) ? assessment.applications : [];
  const achievements = Array.isArray(ai?.strengthsToLeverage) ? ai.strengthsToLeverage : [];
  const projects = Array.isArray(ai?.proofProjects) ? ai.proofProjects : [];
  const missingCriticalSkills = Array.isArray(skillMatchData?.missingCriticalSkills)
    ? skillMatchData.missingCriticalSkills
    : [];
  const fallbackPrimaryGap = missingCriticalSkills.length
    ? `Missing ${missingCriticalSkills.length} required skills: ${missingCriticalSkills
        .slice(0, 3)
        .map((skill: any) => skill.name)
        .join(", ")}`
    : "ATS coverage is solid. Next: hiring-manager alignment and proof.";
  const fallbackQuickWin = missingCriticalSkills.length
    ? `Add ${missingCriticalSkills[0]?.name} to your resume Skills section`
    : `Align your summary to ${targetRole} with concrete proof`;

  const scoreCards = [
    { label: "Clarity", score: assessment.clarityScore, max: 25 },
    { label: "Assets", score: assessment.assetsScore, max: 25 },
    { label: "Network", score: assessment.networkScore, max: 25 },
    { label: "Execution", score: assessment.executionScore, max: 25 },
  ];

  const targetCompanies = Array.isArray(assessment.targetCompanies) ? assessment.targetCompanies : [];

  const statusLabel = useMemo(() => {
    if (assessment.totalScore >= 70) return "Fast Track";
    if (assessment.totalScore >= 45) return "Growth Ready";
    return "Foundation Phase";
  }, [assessment.totalScore]);

  const routeLabel = assessment?.recommendedRoute === "FastTrack" ? "Fast Track" : assessment?.recommendedRoute || "Growth Ready";
  const headlineCurrent = linkedinAnalysis?.headline?.current || linkedinParsed?.headline || "";
  const headlineSuggested = linkedinAnalysis?.headline?.optimized || "";
  const firstName =
    resumeParsed?.contact?.fullName?.split(" ")[0] ||
    resumeParsed?.fullName?.split(" ")[0] ||
    userEmail?.split("@")[0] ||
    "there";
  const daysSinceStart = assessment?.createdAt
    ? Math.max(0, Math.floor((Date.now() - new Date(assessment.createdAt).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const targetRoleNames = assessment?.targetRoles?.length
    ? assessment.targetRoles.map((role: any) => role.name).join(", ")
    : "your target roles";

  const actionTasks: Array<{
    id: string;
    title: string;
    time?: string;
    impact?: string;
    example?: { current?: string; optimized?: string };
  }> = (week1Plan?.tasks || []).slice(0, 3).map((task: any, index: number) => ({
    id: task.id || `action-${index + 1}`,
    title: task.task,
    time: task.timeEstimate || "30-60 minutes",
    impact: task.expectedOutcome || "",
    example: index === 0 && headlineSuggested
      ? {
          current: headlineCurrent,
          optimized: headlineSuggested,
        }
      : undefined,
  }));

  useEffect(() => {
    const stored = window.localStorage.getItem("cc-weekly-digest");
    if (stored) {
      setDigestEnabled(stored === "true");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cc-weekly-digest", String(digestEnabled));
  }, [digestEnabled]);

  useEffect(() => {
    const assessmentId = assessment?.id;
    if (!assessmentId) return;
    const ids = actionTasks.map((task) => task.id);
    Promise.all(
      ids.map((id) =>
        fetch(`/api/tasks/${assessmentId}/${id}/status`)
          .then((res) => res.json())
          .then((data) => ({ id, completed: data.completed }))
          .catch(() => ({ id, completed: false }))
      )
    ).then((results) => {
      const nextState: Record<string, boolean> = {};
      results.forEach((result) => {
        nextState[result.id] = result.completed;
      });
      setTaskState(nextState);
    });
  }, [assessment?.id]);

  const handleSendChat = async () => {
    if (!chatInput.trim() || !assessment?.id) return;
    const newMessage = { role: "user" as const, content: chatInput };
    setChatHistory((prev) => [...prev, newMessage]);
    setChatInput("");
    try {
      const res = await fetch("/api/coach/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: assessment.id,
          message: newMessage.content,
          history: chatHistory,
        }),
      });
      const data = await res.json();
      const reply =
        data?.message ||
        "AI is unavailable right now. Please try again in a moment.";
      setChatHistory((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "AI is unavailable right now. Please try again in a moment." },
      ]);
    }
  };

  const applyResumeFix = async (issueId: string) => {
    if (!assessment?.id) return;
    setResumeFixApplied((prev) => ({ ...prev, [issueId]: true }));
    try {
      const res = await fetch("/api/resume/apply-fix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId: assessment.id, issueId }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch {
      setResumeFixApplied((prev) => ({ ...prev, [issueId]: false }));
    }
  };

  const downloadOptimizedResume = async () => {
    if (!assessment?.id) return;
    const res = await fetch("/api/resume/generate-optimized", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assessmentId: assessment.id }),
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "optimized_resume.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const toggleTask = async (taskId: string) => {
    const assessmentId = assessment?.id;
    if (!assessmentId) return;
    setTaskState((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
    try {
      const res = await fetch(`/api/tasks/${assessmentId}/${taskId}/toggle`, { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setTaskState((prev) => ({ ...prev, [taskId]: data.completed }));
    } catch {
      setTaskState((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
    }
  };

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

      <main className="relative flex-1 px-6 py-10 lg:px-10">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h1 className="text-2xl font-semibold">{getGreeting()}, {firstName}! 👋</h1>
              <p className="mt-2 text-white/70">
                You're {daysSinceStart} {daysSinceStart === 1 ? "day" : "days"} into your transition toward {targetRoleNames}.
              </p>
              {!resumeParsed && (
                <div className="mt-4 rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/10 p-4 text-sm text-white/80">
                  Resume parsing hasn’t completed yet. Upload a PDF/DOCX resume to unlock skill matching and personalization.
                </div>
              )}
              {resumeParsed && (
                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                  🎯 Based on your {profile?.yearsExperience || "current"} years of experience and {profile?.topSkills?.join(", ")} expertise, you're well-positioned for:
                  <ul className="mt-2 space-y-1">
                    {skillMatches.slice(0, 3).map((match: any) => (
                      <li key={match.company?.name || match.company}>
                        • {targetRole} at {match.company?.name || match.company} ({match.matchScore ?? match.score}% skill match)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {actionTasks[0]?.title && (
                <span className="mt-4 inline-flex items-center rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] px-4 py-2 text-xs font-semibold shadow-lg">
                  Next Action → {actionTasks[0]?.title}
                </span>
              )}
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">Priority action</p>
                <p className="mt-3 text-sm text-white/70">
                  {linkedinAnalysis?.headline?.issues?.[0] || ai?.primaryGap || "AI analysis pending."}
                </p>
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
                      {linkedinAnalysis?.headline?.reasoning || "AI analysis is still processing. Refresh to load rationale."}
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">Resume health check</p>
                <p className="mt-3 text-3xl font-bold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
                  {resumeHealth?.score ?? resumeAnalysis?.overallScore ?? 0}% optimized
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {(resumeAnalysis?.issues || resumeHealth?.issues || []).slice(0, 4).map((issue: any) => (
                    <li key={issue.issue || issue}>• {issue.issue || issue}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold" onClick={downloadOptimizedResume}>
                    Download optimized resume
                  </button>
                </div>
              </div>
            </section>

            {linkedinAnalysis && (
              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">LinkedIn optimization</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                    <p className="text-xs uppercase text-white/50">Current headline</p>
                    <p className="mt-2 text-white/80">{linkedinAnalysis.headline?.current || "Not provided"}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                    <p className="text-xs uppercase text-white/50">Optimized headline</p>
                    <p className="mt-2 text-white">{linkedinAnalysis.headline?.optimized || "AI analysis pending"}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold"
                    onClick={() => {
                      navigator.clipboard.writeText(linkedinAnalysis.headline?.optimized || "");
                    }}
                  >
                    Copy optimized headline
                  </button>
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Skill match analyzer</p>
              <div className="mt-4 space-y-4">
                {skillMatches.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    Skill matching will appear once we parse your resume and you’ve selected target companies.
                  </div>
                ) : (
                  skillMatches.map((match: any) => (
                    <div key={match.company?.name || match.company} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{targetRole} at {match.company?.name || match.company}</p>
                        <span className="text-sm font-semibold text-[#06B6D4]">{match.matchScore ?? match.score}% match</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]"
                          style={{ width: `${match.matchScore ?? match.score}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-white/60">{match.whyGoodFit || match.insights?.whyGoodFit}</p>
                    </div>
                  ))
                )}
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
                {actionTasks.map((task) => (
                  <div key={task.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <button
                      type="button"
                      className="flex items-start gap-3 text-left"
                      onClick={() => toggleTask(task.id)}
                    >
                      <span
                        className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border ${
                          taskState[task.id] ? "border-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]" : "border-white/30"
                        }`}
                      >
                        {taskState[task.id] && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className={`text-sm ${taskState[task.id] ? "line-through text-white/60" : "text-white/80"}`}>
                        {task.title}
                      </span>
                    </button>
                    <div className="mt-3 flex items-center gap-3 text-xs text-white/60">
                      <span>⏱ {task.time}</span>
                      <span>Impact: {task.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {projects.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Build your proof</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {projects.map((project: any) => (
                    <div key={project.title || project.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold">{project.title || project.name}</p>
                      <p className="mt-2 text-xs text-white/60">
                        {project.time || project.duration} • {project.difficulty || "Intermediate"}
                      </p>
                      <p className="mt-3 text-xs text-white/70">Skills: {(project.skills || project.technologies || []).join(", ")}</p>
                      <ul className="mt-3 space-y-1 text-xs text-white/60">
                        {(project.steps || []).map((step: string) => (
                          <li key={step}>- {step}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Focus Snapshot</p>
                <p className="mt-3 text-sm text-white/80">
                  <strong>Primary Gap:</strong> {ai.primaryGap || fallbackPrimaryGap}
                </p>
                <div className="my-4 h-px bg-white/10" />
                <p className="text-sm text-white/80">
                  <strong>Quick Win:</strong> {ai.quickWin || fallbackQuickWin}
                </p>
              </div>
            </section>

            {achievements.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Strengths to leverage</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {achievements.map((item: any, index: number) => (
                    <div key={item.strength || index} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                      <p className="font-semibold text-white">{item.strength}</p>
                      <p className="mt-2 text-xs text-white/60">{item.howToUse || item.evidence}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resumeAnalysis && (
              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Resume fixes</p>
                <div className="mt-4 space-y-3">
                  {resumeAnalysis.issues?.slice(0, 5).map((issue: any) => (
                    <div key={issue.id} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                      <p className="font-semibold">{issue.issue}</p>
                      <p className="mt-2 text-white/70">{issue.suggestedFix}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold"
                          onClick={() => applyResumeFix(issue.id)}
                        >
                          {resumeFixApplied[issue.id] ? "Applied ✓" : "Mark applied"}
                        </button>
                        <span className="text-xs text-white/50">{issue.reasoning}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === "action" && (
          <div className="space-y-6">
            <header>
              <h2 className="text-2xl font-semibold">Your Action Plan</h2>
              <p className="text-white/70">
                Tailored to your {assessment.hoursPerWeek || 8} hours/week commitment.
              </p>
            </header>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">Week 1: Deep Dive</p>
                {!week1Plan ? (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    AI is generating your Week 1 plan now. This section will populate automatically.
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {(week1Plan.tasks || []).slice(0, 8).map((task: any) => (
                      <div key={task.id || task.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => toggleTask(task.id)}
                            className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                              taskState[task.id] ? "border-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]" : "border-white/30"
                            }`}
                          >
                            {taskState[task.id] && <span className="h-2 w-2 rounded-full bg-white" />}
                          </button>
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${taskState[task.id] ? "line-through text-white/60" : "text-white/90"}`}>
                              {task.title || task.task}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/60">
                              {task.timeEstimate && <span>⏱ {task.timeEstimate}</span>}
                              {task.priority && <span>Priority: {task.priority}</span>}
                              {task.category && <span>{task.category}</span>}
                            </div>
                            {task.context?.whyNow && (
                              <p className="mt-2 text-xs text-white/70">{task.context.whyNow}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">Week 2+</p>
                {assessment.hasPurchasedPro ? (
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {(week2Plan?.tasks || []).map((item: any) => (
                      <li key={item.id || item.task}>- {item.task || item}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    Unlock Week 2+ to get the full execution roadmap, scripts, and company-specific strategy.
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Live editor</p>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase text-white/50">Your current headline</p>
                    <textarea
                      className="mt-2 h-28 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80"
                      defaultValue={headlineCurrent}
                    />
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase text-white/50">AI suggestion</p>
                    <textarea
                      className="mt-2 h-28 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80"
                      defaultValue={headlineSuggested}
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">Use AI version</button>
                  <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Progress</h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Progress timeline</p>
              <div className="mt-6 flex items-center gap-6">
                {["Start", "Today", "Week 1", "Week 2", "Target"].map((label, idx) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${idx < 2 ? "bg-[#06B6D4]" : "border border-white/30"}`} />
                    <span className="text-xs text-white/60">{label}</span>
                    {idx < 4 && <span className={`h-px w-10 ${idx < 1 ? "bg-[#06B6D4]" : "bg-white/20"}`} />}
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {taskProgress && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    🔥 Streak: {taskProgress.streakDays} days active
                  </div>
                )}
                {taskProgress && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    Level: {taskProgress.level}
                  </div>
                )}
                {taskProgress && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    Points: {taskProgress.points}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Applications</h2>
            <div className="space-y-4">
              {applications.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                  No applications logged yet. Add one to start tracking your pipeline.
                </div>
              ) : (
                applications.map((app: any) => (
                  <div key={app.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{app.company} — {app.role}</p>
                        <p className="text-xs text-white/60">Applied: {app.appliedAt} • Last update: {app.lastUpdate}</p>
                      </div>
                      <span className="rounded-full bg-[#06B6D4]/20 px-3 py-1 text-xs font-semibold">{app.status}</span>
                    </div>
                    <p className="mt-4 text-sm text-white/70">Next step: {app.nextStep}</p>
                    <div className="mt-4 grid gap-2 md:grid-cols-3">
                      {app.checklist.map((item: string) => (
                        <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                          □ {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "scripts" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Scripts & Templates Library</h2>
            {scripts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                AI scripts are still generating. Refresh in a moment.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {scripts.map((script: any) => (
                  <div key={script.id || script.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-lg font-semibold">{script.title}</p>
                    <p className="mt-2 text-sm text-white/70">{script.description}</p>
                    <button
                      type="button"
                      className="mt-4 text-sm font-semibold text-[#06B6D4]"
                      onClick={() => navigator.clipboard.writeText(script.content || "")}
                    >
                      Copy →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "companies" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Target Companies</h2>
            {companyMatches.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase text-white/60">Match scores</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {companyMatches.map((match: any) => (
                    <div key={match.company?.name || match.company} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                      <p className="font-semibold">{match.company?.name || match.company}</p>
                      <p className="mt-2 text-white/70">Match score: {match.matchScore}%</p>
                      <p className="mt-2 text-white/60">
                        Gaps: {(match.gapsToAddress || []).slice(0, 2).map((gap: any) => gap.gap).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Settings</h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold">Weekly digest email</p>
              <p className="mt-2 text-sm text-white/70">Receive a personalized progress summary every Monday.</p>
              <button
                type="button"
                onClick={() => setDigestEnabled((prev) => !prev)}
                className={`mt-4 rounded-full px-4 py-2 text-xs font-semibold ${
                  digestEnabled ? "bg-[#06B6D4]/20 text-white" : "bg-white/10 text-white/60"
                }`}
              >
                {digestEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] px-4 py-3 text-sm font-semibold shadow-lg"
        >
          💬 Ask AI Coach
        </button>

        {showChat && (
          <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/60 p-6">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0F172A] p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">AI Career Coach</p>
                <button className="text-white/60" onClick={() => setShowChat(false)} type="button">✕</button>
              </div>
              <div className="mt-4 max-h-60 space-y-3 overflow-y-auto text-sm">
                {chatHistory.length === 0 && (
                  <p className="text-white/70">
                    Hi {firstName}! I have your resume signals, target roles, and company list. Ask me anything.
                  </p>
                )}
                {chatHistory.map((msg, idx) => (
                  <div
                    key={`${msg.role}-${idx}`}
                    className={`rounded-xl px-3 py-2 ${
                      msg.role === "user" ? "bg-[#06B6D4]/20 text-white" : "bg-white/5 text-white/80"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                />
                <button
                  type="button"
                  onClick={handleSendChat}
                  className="rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] px-4 py-2 text-sm font-semibold"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
