"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RoleSelect } from "@/components/role-select";
import { CompanySelect, type CompanyOption } from "@/components/company-select";
import { ScoreGauge } from "@/components/score-gauge";
import type { LeadAnswers } from "@/lib/validation";

const defaultAnswers: LeadAnswers = {
  roles: [],
  currentTitle: "",
  experienceYears: "6-9",
  leadershipScope: "IC",
  level: "Senior",
  compTarget: "140k-180k",
  compensationPriority: "Balanced",
  timeline: "30",
  locationType: "Remote",
  city: "",
  targetIndustry: "B2B SaaS",
  companyStage: "Growth",
  hoursPerWeek: "5",
  assets: { resume: "Draft", linkedin: "Draft", interview: "Some practice", portfolio: "Some" },
  linkedinUrl: "",
  resumeUploaded: false,
  networkStrength: "Medium",
  outreachComfort: "Medium",
  companyTargets: [],
  constraints: [],
  biggestBlocker: "Clarity",
  blockerNote: "",
  pipeline: "Some",
};

const steps = [
  "Target role",
  "Background",
  "Level + comp",
  "Timeline",
  "Location",
  "Company focus",
  "Time available",
  "Assets",
  "Network",
  "Company targets",
  "Constraints",
  "Biggest blocker",
];

export default function JobSearchWizard() {
  const [answers, setAnswers] = useState<LeadAnswers>(defaultAnswers);
  const [step, setStep] = useState(0);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [teaser, setTeaser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ skipped?: boolean; reason?: string } | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeStatus, setResumeStatus] = useState<"idle" | "uploading" | "uploaded" | "error">("idle");
  const [resumeError, setResumeError] = useState<string | null>(null);

  const progress = ((step + 1) / steps.length) * 100;

  useEffect(() => {
    const createLead = async () => {
      const res = await fetch("/api/leads/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: {} }),
      });
      const data = await res.json();
      setLeadId(data.leadId);
    };
    createLead();
  }, []);

  const updateAnswers = (patch: Partial<LeadAnswers>) =>
    setAnswers((prev) => ({ ...prev, ...patch }));

  const submitWizard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, answers }),
      });
      const data = await res.json();
      if (!res.ok) {
        const detail = data.details ? JSON.stringify(data.details) : "";
        throw new Error(data.error || detail || "Something went wrong");
      }
      setTeaser(data.teaser);
      setToken(data.token);
    } catch (err: any) {
      setError(err.message || "Unable to complete");
    } finally {
      setLoading(false);
    }
  };

  const submitEmail = async () => {
    if (!leadId || !email) return;
    setSendingEmail(true);
    const res = await fetch("/api/leads/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, email, website: "" }),
    });
    const data = await res.json();
    if (res.ok) {
      setEmailSent(true);
      setEmailStatus(data.emailStatus || null);
      if (data.emailStatus?.skipped) {
        setError(data.emailStatus.reason || "Email delivery not configured.");
      }
    } else {
      setError(data.error || "Unable to send email.");
    }
    setSendingEmail(false);
  };

  const uploadResume = async (file: File | null) => {
    if (!file || !leadId) return;
    setResumeError(null);
    setResumeStatus("uploading");
    const form = new FormData();
    form.append("leadId", leadId);
    form.append("kind", "resume");
    form.append("file", file);
    try {
      const res = await fetch("/api/leads/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      setResumeStatus("uploaded");
      updateAnswers({ resumeUploaded: true });
    } catch (err: any) {
      setResumeStatus("error");
      setResumeError(err.message || "Upload failed");
    }
  };

  const canNext = useMemo(() => {
    if (step === 0) return answers.roles.length > 0;
    return true;
  }, [step, answers]);

  if (teaser && token) {
    return (
      <main className="section-shell pb-16 pt-14">
        <Link href="/job-search-system" className="text-sm text-slate-400">
          Back to landing
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="mb-3 text-3xl font-semibold text-slate-100">Your quick preview</h1>
            <p className="text-slate-300">
              Based on what you shared, here’s the high‑level plan I’d build for you. It’s short, specific, and tuned
              to your timeline — just a preview of the full system.
            </p>
            <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-900/70 p-6">
              <ScoreGauge score={teaser.score} />
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Coach read</p>
                  <p className="mt-1">{teaser.coachRead}</p>
                </div>
                {teaser.coachFeedback && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">Coach feedback</p>
                    <p className="mt-1">{teaser.coachFeedback}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Positioning</p>
                  <p className="mt-1">{teaser.positioningSummary}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Top insights</p>
                  {teaser.insights?.slice(0, 3).map((insight: string) => (
                    <p key={insight}>- {insight}</p>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Clarity", teaser.subscores?.clarity],
                  ["Assets", teaser.subscores?.assets],
                  ["Network", teaser.subscores?.network],
                  ["Execution", teaser.subscores?.execution],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-xs">
                    <p className="text-slate-400">{label}</p>
                    <p className="text-lg font-semibold text-slate-100">{value ?? "--"}/25</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-slate-950/70 p-4 text-sm">
                <p className="font-semibold text-slate-100">Cadence preview</p>
                <p className="text-slate-300">Week 1: {teaser.cadencePreview}</p>
                {Array.isArray(teaser.previewActions) && teaser.previewActions.length > 0 && (
                  <ul className="mt-2 space-y-1 text-slate-300">
                    {teaser.previewActions.map((action: string) => (
                      <li key={action}>- {action}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="mt-6 grid gap-4 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 text-sm text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Why this is personal</p>
                <ul className="mt-2 space-y-1">
                  <li>- Your role, level, and constraints drive the plan.</li>
                  <li>- Timeline + hours/week set your weekly cadence.</li>
                  <li>- Industry + company stage shape the proof strategy.</li>
                </ul>
              </div>
              {Array.isArray(teaser.planOverview) && teaser.planOverview.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Plan overview</p>
                  <ul className="mt-2 space-y-1">
                    {teaser.planOverview.map((item: string) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">What you unlock</p>
                <ul className="mt-2 space-y-1">
                  <li>- Full weekly cadence mapped to your hours and urgency.</li>
                  <li>- Role-specific scripts + follow-up sequence.</li>
                  <li>- 14-day execution checklist and proof strategy.</li>
                  <li>- Company shortlist and ATS keyword map.</li>
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Trust notes</p>
                <ul className="mt-2 space-y-1">
                  <li>- No account required. Results delivered by link.</li>
                  <li>- Inputs are only used to build your plan.</li>
                  <li>- Resume + LinkedIn inputs sharpen the coach feedback.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-sm">
            <p className="tag mb-4">Unlock full report</p>
            <Label className="text-slate-200">Email address</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" />
            <p className="mt-2 text-xs text-slate-400">We'll send your plan link instantly.</p>
            <Button className="mt-4 w-full" onClick={submitEmail} disabled={sendingEmail}>
              {sendingEmail ? "Sending..." : "Send my plan"}
            </Button>
            {emailSent && (
              <div className="mt-4 rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-200">
                {emailStatus?.skipped
                  ? "Email service not configured - use the direct link below."
                  : "Email sent. You can also view it now."}
                <div className="mt-2">
                  <Link
                    href={`/job-search-system/results/${token}`}
                    className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-900"
                  >
                    View full report
                  </Link>
                </div>
              </div>
            )}
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-wide text-slate-400">What happens next</p>
              <ul className="mt-2 space-y-1">
                <li>- Full report link delivered instantly.</li>
                <li>- Weekly plan mapped to your hours + urgency.</li>
                <li>- Role-specific scripts and proof strategy.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section-shell pb-16 pt-14">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-100">Build your Job Search System</h1>
          <p className="text-slate-300">Coach-style prompts, then a system tailored to you.</p>
        </div>
        <Link href="/job-search-system" className="text-sm text-slate-400">
          Exit
        </Link>
      </div>
      <Progress value={progress} />
      <p className="mt-2 text-xs text-slate-400">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>

      <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-sm">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Target role(s)</h2>
            <p className="text-sm text-slate-400">Be specific — we tailor scripts and proof strategy to this role.</p>
            <RoleSelect value={answers.roles} onChange={(roles) => updateAnswers({ roles })} />
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Background snapshot</h2>
            <p className="text-sm text-slate-400">This helps me calibrate scope and seniority.</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-3">
                <Label>Current title (optional)</Label>
                <Input
                  placeholder="e.g., Senior DevOps Engineer"
                  value={answers.currentTitle || ""}
                  onChange={(e) => updateAnswers({ currentTitle: e.target.value })}
                />
              </div>
              <div>
                <Label>Years of experience</Label>
                <Select
                  value={answers.experienceYears}
                  onChange={(e) => updateAnswers({ experienceYears: e.target.value as LeadAnswers["experienceYears"] })}
                >
                  {(["0-2", "3-5", "6-9", "10+"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value} years
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Leadership scope</Label>
                <Select
                  value={answers.leadershipScope}
                  onChange={(e) => updateAnswers({ leadershipScope: e.target.value as LeadAnswers["leadershipScope"] })}
                >
                  {(["IC", "Lead", "Manager", "Director+"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value === "IC" ? "Individual contributor" : value}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Current pipeline</Label>
                <Select
                  value={answers.pipeline}
                  onChange={(e) => updateAnswers({ pipeline: e.target.value as LeadAnswers["pipeline"] })}
                >
                  {(["None", "Some", "Active"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Level + compensation</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label>Level target</Label>
                <Select value={answers.level} onChange={(e) => updateAnswers({ level: e.target.value as LeadAnswers["level"] })}>
                  {(["Mid", "Senior", "Staff", "Manager", "Director"] as const).map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Comp target</Label>
                <Select
                  value={answers.compTarget}
                  onChange={(e) => updateAnswers({ compTarget: e.target.value as LeadAnswers["compTarget"] })}
                >
                  {(["<100k", "100k-140k", "140k-180k", "180k-220k", "220k+"] as const).map((comp) => (
                    <option key={comp} value={comp}>
                      {comp}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Comp priority</Label>
                <Select
                  value={answers.compensationPriority}
                  onChange={(e) => updateAnswers({ compensationPriority: e.target.value as LeadAnswers["compensationPriority"] })}
                >
                  {(["Cash", "Equity", "Balanced"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Timeline</h2>
            <Select value={answers.timeline} onChange={(e) => updateAnswers({ timeline: e.target.value as LeadAnswers["timeline"] })}>
              <option value="ASAP">ASAP (0-14 days)</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90+">90+ days</option>
            </Select>
            <p className="text-sm text-slate-400">Timeline drives cadence, outreach volume, and interview prep pacing.</p>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Location preference</h2>
            <Select
              value={answers.locationType}
              onChange={(e) => updateAnswers({ locationType: e.target.value as LeadAnswers["locationType"] })}
            >
              {(["Remote", "Hybrid", "Onsite"] as const).map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </Select>
            {(answers.locationType === "Hybrid" || answers.locationType === "Onsite") && (
              <Input
                placeholder="Preferred city (optional)"
                value={answers.city || ""}
                onChange={(e) => updateAnswers({ city: e.target.value })}
              />
            )}
          </div>
        )}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Company focus</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Target industry</Label>
                <Select
                  value={answers.targetIndustry}
                  onChange={(e) => updateAnswers({ targetIndustry: e.target.value as LeadAnswers["targetIndustry"] })}
                >
                  {(
                    [
                      "Infrastructure",
                      "Security",
                      "Data/AI",
                      "Fintech",
                      "Consumer",
                      "B2B SaaS",
                      "Healthcare",
                      "Marketplace",
                      "Other",
                    ] as const
                  ).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Company stage</Label>
                <Select
                  value={answers.companyStage}
                  onChange={(e) => updateAnswers({ companyStage: e.target.value as LeadAnswers["companyStage"] })}
                >
                  {(["Startup", "Growth", "Enterprise", "Public", "Consulting"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Time available per week</h2>
            <Select
              value={answers.hoursPerWeek}
              onChange={(e) => updateAnswers({ hoursPerWeek: e.target.value as LeadAnswers["hoursPerWeek"] })}
            >
              {(["3", "5", "8", "12+"] as const).map((hours) => (
                <option key={hours} value={hours}>
                  {hours} hours
                </option>
              ))}
            </Select>
          </div>
        )}
        {step === 7 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Current assets</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <Label>Resume</Label>
                <Select
                  value={answers.assets.resume}
                  onChange={(e) => updateAnswers({ assets: { ...answers.assets, resume: e.target.value as LeadAnswers["assets"]["resume"] } })}
                >
                  {(["None", "Draft", "Strong"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Select
                  value={answers.assets.linkedin}
                  onChange={(e) => updateAnswers({ assets: { ...answers.assets, linkedin: e.target.value as LeadAnswers["assets"]["linkedin"] } })}
                >
                  {(["None", "Draft", "Strong"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Interview readiness</Label>
                <Select
                  value={answers.assets.interview}
                  onChange={(e) => updateAnswers({ assets: { ...answers.assets, interview: e.target.value as LeadAnswers["assets"]["interview"] } })}
                >
                  {(["Not ready", "Some practice", "Confident"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Proof assets</Label>
                <Select
                  value={answers.assets.portfolio}
                  onChange={(e) => updateAnswers({ assets: { ...answers.assets, portfolio: e.target.value as LeadAnswers["assets"]["portfolio"] } })}
                >
                  {(["None", "Some", "Strong"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>LinkedIn profile URL (recommended)</Label>
                <Input
                  placeholder="https://www.linkedin.com/in/yourname"
                  value={answers.linkedinUrl || ""}
                  onChange={(e) => updateAnswers({ linkedinUrl: e.target.value })}
                />
              </div>
              <div>
                <Label>Upload resume (PDF or DOCX)</Label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => uploadResume(e.target.files?.[0] || null)}
                />
                <p className="mt-2 text-xs text-slate-400">
                  {resumeStatus === "uploading" && "Uploading resume..."}
                  {resumeStatus === "uploaded" && "Resume uploaded."}
                  {resumeStatus === "error" && resumeError}
                  {resumeStatus === "idle" && "Optional, but helps us give sharper feedback."}
                </p>
              </div>
            </div>
          </div>
        )}
        {step === 8 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Network + outreach comfort</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Network strength</Label>
                <Select
                  value={answers.networkStrength}
                  onChange={(e) => updateAnswers({ networkStrength: e.target.value as LeadAnswers["networkStrength"] })}
                >
                  {(["Low", "Medium", "Strong"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Outreach comfort</Label>
                <Select
                  value={answers.outreachComfort}
                  onChange={(e) => updateAnswers({ outreachComfort: e.target.value as LeadAnswers["outreachComfort"] })}
                >
                  {(["Low", "Medium", "High"] as const).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        )}
        {step === 9 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Company targets</h2>
            <CompanySelect
              value={answers.companyTargets as CompanyOption[]}
              onChange={(companyTargets) => updateAnswers({ companyTargets })}
            />
          </div>
        )}
        {step === 10 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Constraints & non-negotiables</h2>
            <p className="text-sm text-slate-400">These help me tailor the plan to your real-world limits.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {(
                [
                  "Visa sponsorship",
                  "Remote only",
                  "No relocation",
                  "Confidential search",
                  "Comp floor",
                  "Limited time",
                  "Industry switch",
                ] as const
              ).map((constraint) => {
                const checked = answers.constraints.includes(constraint);
                return (
                  <label
                    key={constraint}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${
                      checked
                        ? "border-emerald-300/60 bg-emerald-500/15 text-emerald-100"
                        : "border-slate-600 bg-slate-900/60 text-slate-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      className="h-4 w-4 accent-emerald-400"
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateAnswers({ constraints: [...answers.constraints, constraint] });
                        } else {
                          updateAnswers({ constraints: answers.constraints.filter((item) => item !== constraint) });
                        }
                      }}
                    />
                    {constraint}
                  </label>
                );
              })}
            </div>
          </div>
        )}
        {step === 11 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Biggest blocker</h2>
            <Select
              value={answers.biggestBlocker}
              onChange={(e) => updateAnswers({ biggestBlocker: e.target.value as LeadAnswers["biggestBlocker"] })}
            >
              {(
                [
                  "Clarity",
                  "Resume",
                  "LinkedIn",
                  "Interviews",
                  "Networking",
                  "Confidence",
                  "Time",
                  "Scope",
                  "Positioning",
                ] as const
              ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
            <Textarea
              placeholder="Optional: tell us what's holding you back (short note)"
              rows={4}
              value={answers.blockerNote || ""}
              onChange={(event) => updateAnswers({ blockerNote: event.target.value })}
            />
          </div>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={step === 0}
        >
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep((prev) => prev + 1)} disabled={!canNext}>
            Next
          </Button>
        ) : (
          <Button onClick={submitWizard} disabled={loading}>
            {loading ? "Building..." : "Get my preview"}
          </Button>
        )}
      </div>
    </main>
  );
}
