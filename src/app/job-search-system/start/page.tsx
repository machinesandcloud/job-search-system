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
  level: "Senior",
  compTarget: "140k-180k",
  timeline: "30",
  locationType: "Remote",
  city: "",
  hoursPerWeek: "5",
  assets: { resume: "Draft", linkedin: "Draft", interview: "Some practice" },
  networkStrength: "Medium",
  outreachComfort: "Medium",
  companyTargets: [],
  biggestBlocker: "Clarity",
  pipeline: "Some",
};

const steps = [
  "Target role",
  "Level",
  "Comp target",
  "Timeline",
  "Location",
  "Time available",
  "Assets",
  "Network",
  "Company targets",
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blockerNote, setBlockerNote] = useState("");

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
    const res = await fetch("/api/leads/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, email, website: "" }),
    });
    const data = await res.json();
    if (res.ok) {
      if (data.emailStatus?.skipped) {
        setError(data.emailStatus.reason || "Email delivery not configured.");
      } else {
        setEmailSent(true);
      }
    }
  };

  const canNext = useMemo(() => {
    if (step === 0) return answers.roles.length > 0;
    return true;
  }, [step, answers]);

  if (teaser && token) {
    return (
      <main className="section-shell pb-16 pt-14">
        <Link href="/job-search-system" className="text-sm text-slate-500">
          Back to landing
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="mb-3 text-3xl font-semibold text-slate-900">Your quick preview</h1>
            <p className="text-slate-600">
              Here's the immediate read based on your inputs. Enter your email to unlock the full plan + scripts.
            </p>
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
              <ScoreGauge score={teaser.score} />
              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                {teaser.insights?.slice(0, 2).map((insight: string) => (
                  <p key={insight}>- {insight}</p>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm">
                <p className="font-semibold text-slate-900">Cadence preview</p>
                <p className="text-slate-600">Week 1: {teaser.cadencePreview}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="tag mb-4">Unlock full report</p>
            <Label>Email address</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" />
            <p className="mt-2 text-xs text-slate-500">We'll send your plan link instantly.</p>
            <Button className="mt-4 w-full" onClick={submitEmail}>
              Send my plan
            </Button>
            {emailSent && (
              <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">
                Email sent. You can also view it now.
                <div className="mt-2">
                  <Link
                    href={`/job-search-system/results/${token}`}
                    className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
                  >
                    View full report
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section-shell pb-16 pt-14">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Build your Job Search System</h1>
          <p className="text-slate-600">10 quick prompts, then your personalized plan.</p>
        </div>
        <Link href="/job-search-system" className="text-sm text-slate-500">
          Exit
        </Link>
      </div>
      <Progress value={progress} />
      <p className="mt-2 text-xs text-slate-500">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Target role(s)</h2>
            <RoleSelect value={answers.roles} onChange={(roles) => updateAnswers({ roles })} />
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Level</h2>
            <Select value={answers.level} onChange={(e) => updateAnswers({ level: e.target.value as LeadAnswers["level"] })}>
              {(["Mid", "Senior", "Staff", "Manager", "Director"] as const).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Select>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Comp target</h2>
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
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Timeline</h2>
            <Select value={answers.timeline} onChange={(e) => updateAnswers({ timeline: e.target.value as LeadAnswers["timeline"] })}>
              {(["ASAP", "30", "60", "90+"] as const).map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))}
            </Select>
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
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Current assets</h2>
            <div className="grid gap-4 md:grid-cols-3">
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
            </div>
          </div>
        )}
        {step === 7 && (
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
        {step === 8 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Company targets</h2>
            <CompanySelect
              value={answers.companyTargets as CompanyOption[]}
              onChange={(companyTargets) => updateAnswers({ companyTargets })}
            />
          </div>
        )}
        {step === 9 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Biggest blocker</h2>
            <Select
              value={answers.biggestBlocker}
              onChange={(e) => updateAnswers({ biggestBlocker: e.target.value as LeadAnswers["biggestBlocker"] })}
            >
              {(["Clarity", "Resume", "LinkedIn", "Interviews", "Networking", "Confidence", "Time"] as const).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
            <Textarea
              placeholder="Optional: tell us what's holding you back (short note)"
              rows={4}
              value={blockerNote}
              onChange={(event) => setBlockerNote(event.target.value)}
            />
          </div>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

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
