"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { RoleSelect } from "@/components/role-select";
import { ScoreGauge } from "@/components/score-gauge";
import type { LeadAnswers } from "@/lib/validation";
import { defaultAnswers } from "@/lib/defaults";

const steps = [
  "Target role",
  "Level",
  "Comp target",
  "Timeline",
  "Location",
  "Time available",
  "Current assets",
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
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setEmailError(null);
    try {
      const res = await fetch("/api/leads/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, email, website: "" }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to send email.");
      }
      setEmailSent(true);
    } catch (err: any) {
      setEmailError(err.message || "Unable to send email.");
    } finally {
      setSendingEmail(false);
    }
  };

  const canNext = useMemo(() => {
    if (step === 0) return answers.roles.length > 0;
    return true;
  }, [step, answers]);

  if (teaser && token) {
    return (
      <main className="cmd-shell pb-16 pt-14">
        <Link href="/job-search-system" className="text-sm text-slate-400">
          Back to landing
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="mb-2 text-3xl font-semibold text-slate-100">Your Career System Preview</h1>
            <p className="text-slate-300">
              Here’s a preview of your system. Unlock the full plan, templates, and scripts by email.
            </p>
            <div className="mt-6 cmd-panel rounded-3xl p-6">
              <div className="flex flex-wrap items-center gap-4">
                <ScoreGauge score={teaser.score} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Preview score</p>
                  <p className="mt-1 text-sm text-slate-300">{teaser.coachRead}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Key insight</p>
                  <p className="mt-2 text-slate-200">{teaser.insights?.[0]}</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Key insight</p>
                  <p className="mt-2 text-slate-200">{teaser.insights?.[1]}</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm">
                <p className="text-xs uppercase tracking-wide text-slate-400">Week 1 cadence</p>
                <ul className="mt-2 space-y-1 text-slate-200">
                  {(teaser.previewActions || []).slice(0, 3).map((action: string) => (
                    <li key={action}>- {action}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="cmd-panel rounded-3xl p-6">
            <p className="tag mb-3">Unlock full results</p>
            <h3 className="text-xl font-semibold text-slate-100">Email me my full plan + templates</h3>
            <p className="mt-2 text-sm text-slate-300">
              Get your full 30-day system, role-specific scripts, and templates delivered to your inbox.
            </p>
            <Label className="mt-4 text-slate-200">Email address</Label>
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@domain.com" />
            <Button className="mt-4 w-full" onClick={submitEmail} disabled={sendingEmail}>
              {sendingEmail ? "Sending..." : "Send my full plan"}
            </Button>
            {emailSent && (
              <p className="mt-3 text-sm text-emerald-200">
                Email sent. Check your inbox for the full plan link.
              </p>
            )}
            {emailError && <p className="mt-3 text-sm text-red-400">{emailError}</p>}
            <div className="mt-6 grid gap-3 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">What you unlock</p>
                <ul className="mt-2 space-y-1">
                  <li>- Full 30-day plan + scripts.</li>
                  <li>- Company targeting strategy.</li>
                  <li>- Export to Notion + PDF (Pro).</li>
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Privacy</p>
                <ul className="mt-2 space-y-1">
                  <li>- No spam. No selling your data.</li>
                  <li>- One email with your results link.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cmd-shell pb-16 pt-14">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-100">Build your Career System</h1>
          <p className="text-slate-300">8 focused questions to generate your plan.</p>
        </div>
        <Link href="/job-search-system" className="text-sm text-slate-400">
          Exit
        </Link>
      </div>
      <Progress value={progress} />
      <p className="mt-2 text-xs text-slate-400">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="cmd-panel rounded-3xl p-6 shadow-sm">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Target role</h2>
              <p className="text-sm text-slate-400">Choose the role you want to land next.</p>
              <RoleSelect value={answers.roles} onChange={(roles) => updateAnswers({ roles })} />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Level</h2>
              <Select value={answers.level} onChange={(event) => updateAnswers({ level: event.target.value as LeadAnswers["level"] })}>
                {(["Mid", "Senior", "Staff", "Principal", "Manager", "Director"] as const).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Compensation target</h2>
              <Select
                value={answers.compTarget}
                onChange={(event) => updateAnswers({ compTarget: event.target.value as LeadAnswers["compTarget"] })}
              >
              {(["100k-150k", "150k-200k", "200k-300k", "300k+"] as const).map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </Select>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Timeline</h2>
              <Select value={answers.timeline} onChange={(event) => updateAnswers({ timeline: event.target.value as LeadAnswers["timeline"] })}>
                <option value="ASAP">ASAP (&lt;30 days)</option>
                <option value="30">1-2 months</option>
                <option value="60">2-3 months</option>
                <option value="90+">3+ months</option>
              </Select>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Location preference</h2>
              <Select
                value={answers.locationType}
                onChange={(event) => updateAnswers({ locationType: event.target.value as LeadAnswers["locationType"] })}
              >
                {(["Remote", "Hybrid", "Onsite"] as const).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </Select>
              {(answers.locationType === "Hybrid" || answers.locationType === "Onsite") && (
                <Input
                  placeholder="City (optional)"
                  value={answers.city || ""}
                  onChange={(event) => updateAnswers({ city: event.target.value })}
                />
              )}
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Time available</h2>
              <Select
                value={answers.hoursPerWeek}
                onChange={(event) => updateAnswers({ hoursPerWeek: event.target.value as LeadAnswers["hoursPerWeek"] })}
              >
                {(["3", "5", "8", "12+"] as const).map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} hours / week
                  </option>
                ))}
              </Select>
            </div>
          )}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Current assets</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {([
                  ["resume", "Resume updated in last 30 days"],
                  ["linkedin", "LinkedIn optimized for target role"],
                  ["portfolio", "Portfolio/GitHub maintained"],
                  ["interview", "Interview prep in last 60 days"],
                ] as const).map(([key, label]) => {
                  const checked =
                    key === "resume"
                      ? answers.assets.resume === "Strong"
                      : key === "linkedin"
                      ? answers.assets.linkedin === "Strong"
                      : key === "portfolio"
                      ? answers.assets.portfolio === "Strong"
                      : answers.assets.interview === "Confident";
                  return (
                    <label
                      key={key}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${
                        checked
                          ? "border-emerald-300/60 bg-emerald-500/10 text-emerald-100"
                          : "border-slate-600 bg-slate-900/60 text-slate-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        className="h-4 w-4 accent-emerald-400"
                        onChange={(event) => {
                          if (key === "resume") {
                            updateAnswers({ assets: { ...answers.assets, resume: event.target.checked ? "Strong" : "Draft" } });
                          }
                          if (key === "linkedin") {
                            updateAnswers({ assets: { ...answers.assets, linkedin: event.target.checked ? "Strong" : "Draft" } });
                          }
                          if (key === "portfolio") {
                            updateAnswers({ assets: { ...answers.assets, portfolio: event.target.checked ? "Strong" : "Some" } });
                          }
                          if (key === "interview") {
                            updateAnswers({ assets: { ...answers.assets, interview: event.target.checked ? "Confident" : "Some practice" } });
                          }
                        }}
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
            </div>
          )}
          {step === 7 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Biggest blocker</h2>
              <Select
                value={answers.biggestBlocker}
                onChange={(event) => updateAnswers({ biggestBlocker: event.target.value as LeadAnswers["biggestBlocker"] })}
              >
                {([
                  "Not getting responses",
                  "Failing interviews",
                  "Low comp offers",
                  "Dont know where to start",
                  "Time/energy management",
                ] as const).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="cmd-panel rounded-3xl p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-wide text-slate-400">Your snapshot</p>
            <ul className="mt-2 space-y-1">
              <li>- Role: {answers.roles?.[0] || "-"}</li>
              <li>- Level: {answers.level}</li>
              <li>- Timeline: {answers.timeline}</li>
              <li>- Hours/week: {answers.hoursPerWeek}</li>
              <li>- Location: {answers.locationType}</li>
            </ul>
          </div>
          <div className="cmd-panel rounded-3xl p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-wide text-slate-400">What you’ll get</p>
            <ul className="mt-2 space-y-1">
              <li>- Career readiness score (0–100).</li>
              <li>- Week-by-week execution plan.</li>
              <li>- Role-specific scripts + templates.</li>
            </ul>
          </div>
        </aside>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => setStep((prev) => Math.max(0, prev - 1))} disabled={step === 0}>
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
