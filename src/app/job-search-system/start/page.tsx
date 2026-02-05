"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AssessmentAnswers } from "@/lib/validation";
import { defaultAnswers } from "@/lib/defaults";
import { companySeed } from "@/lib/company-data";
import { toSlug } from "@/lib/utils";
import { CompanyLogo } from "@/components/company-logo";

const steps = [
  "Target Roles",
  "Experience Level",
  "Compensation",
  "Timeline",
  "Location",
  "Time Commitment",
  "Assets",
  "Network & Companies",
  "Biggest Blocker",
];

type RoleOption = { id: string; name: string; slug: string; isPopular: boolean };

type CompanyOption = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  website?: string | null;
  domain?: string | null;
  category: string;
};

export default function JobSearchWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(defaultAnswers);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationTouched, setValidationTouched] = useState(false);

  const [roleSearch, setRoleSearch] = useState("");
  const [roleResults, setRoleResults] = useState<RoleOption[]>([]);
  const [popularRoles, setPopularRoles] = useState<RoleOption[]>([]);
  const [customRole, setCustomRole] = useState("");
  const [showCustomRole, setShowCustomRole] = useState(false);

  const [companySearch, setCompanySearch] = useState("");
  const [companyResults, setCompanyResults] = useState<CompanyOption[]>([]);
  const [popularCompanies, setPopularCompanies] = useState<CompanyOption[]>([]);
  const [companyLibrary, setCompanyLibrary] = useState<CompanyOption[]>([]);
  const [customCompany, setCustomCompany] = useState("");
  const [showCustomCompany, setShowCustomCompany] = useState(false);

  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeUploadError, setResumeUploadError] = useState<string | null>(null);
  const [resumeParseNotice, setResumeParseNotice] = useState<string | null>(null);
  const [linkedinUploadError, setLinkedinUploadError] = useState<string | null>(null);
  const [linkedinParseNotice, setLinkedinParseNotice] = useState<string | null>(null);
  const [linkedinUploading, setLinkedinUploading] = useState(false);
  const [linkedinMode, setLinkedinMode] = useState<"url" | "upload">("url");

  const progress = Math.round(((step + 1) / steps.length) * 100);

  useEffect(() => {
    const boot = async () => {
      try {
        await ensureAssessment();
      } catch (_err) {
        // ignore boot failures; retry when needed
      }
    };
    boot();
  }, []);

  const roleLibrary = useMemo(() => {
    const baseRoles = [
      "DevOps Engineer",
      "Site Reliability Engineer",
      "Platform Engineer",
      "Backend Engineer",
      "Frontend Engineer",
      "Full Stack Engineer",
      "Mobile Engineer",
      "iOS Engineer",
      "Android Engineer",
      "Data Engineer",
      "ML Engineer",
      "AI Engineer",
      "MLOps Engineer",
      "Security Engineer",
      "Cloud Engineer",
      "Cloud Architect",
      "Infrastructure Engineer",
      "Systems Engineer",
      "SRE Manager",
      "Platform Lead",
      "Infrastructure Lead",
      "Engineering Manager",
      "Senior Engineering Manager",
      "Director of Engineering",
      "VP of Engineering",
      "Technical Program Manager",
      "Program Manager",
      "Product Manager",
      "Solutions Architect",
      "Solutions Engineer",
      "Sales Engineer",
      "DevSecOps Engineer",
      "QA Engineer",
      "Automation Engineer",
      "Release Engineer",
      "Build Engineer",
      "Observability Engineer",
      "Reliability Engineer",
      "Performance Engineer",
      "Database Engineer",
      "Data Platform Engineer",
      "Analytics Engineer",
      "Data Scientist",
      "Applied Scientist",
      "Research Engineer",
      "Network Engineer",
      "Network Security Engineer",
      "Security Architect",
      "IAM Engineer",
      "Identity Engineer",
      "Incident Response Engineer",
      "Privacy Engineer",
      "Compliance Engineer",
      "FinOps Engineer",
      "Cloud Security Engineer",
      "Edge Engineer",
      "DevTools Engineer",
      "Tooling Engineer",
      "Developer Experience Engineer",
      "Developer Advocate",
      "Site Operations Engineer",
      "Support Engineer",
      "Customer Engineer",
      "Implementation Engineer",
      "Technical Account Manager",
      "Solutions Consultant",
      "Enterprise Architect",
      "Data Architect",
      "Systems Administrator",
      "Storage Engineer",
      "Streaming Engineer",
      "Kafka Engineer",
      "Search Engineer",
      "Payments Engineer",
      "Fraud Engineer",
      "Blockchain Engineer",
      "Quant Engineer",
      "Embedded Engineer",
      "Firmware Engineer",
      "IoT Engineer",
      "Robotics Engineer",
      "Game Engineer",
      "Graphics Engineer",
      "AR/VR Engineer",
      "UX Engineer",
      "Accessibility Engineer",
      "Design Systems Engineer",
      "Product Designer",
      "QA Lead",
      "Test Engineer",
      "Release Manager",
      "Scrum Master",
      "Agile Coach",
      "Service Delivery Manager",
      "IT Manager",
      "IT Director",
      "CTO",
    ];
    const levels = ["Senior", "Staff", "Principal", "Lead"];
    const expanded = new Set<string>(baseRoles);
    baseRoles.forEach((role) => {
      if (/Senior|Staff|Principal|Lead|Director|VP|Manager/i.test(role)) return;
      levels.forEach((level) => expanded.add(`${level} ${role}`));
    });
    const list = Array.from(expanded).slice(0, 200);
    return list.map((name, index) => {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { id: slug, name, slug, isPopular: index < 12 };
    });
  }, []);

  const localCompanyLibrary = useMemo(() => {
    return companySeed.slice(0, 1000).map((company, index) => ({
      id: `seed-${index}-${toSlug(company.name)}`,
      name: company.name,
      slug: toSlug(company.name),
      domain: company.domain,
      logoUrl: company.domain ? `https://logo.clearbit.com/${company.domain}` : undefined,
      website: company.domain ? `https://${company.domain}` : undefined,
      category: company.industry || "Company",
    }));
  }, []);

  const safeParseJson = async (res: Response) => {
    const text = await res.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      return {};
    }
  };

  useEffect(() => {
    const loadPopular = async () => {
      try {
        const res = await fetch("/api/roles/popular");
        if (!res.ok) throw new Error("Roles request failed");
        const data: any = await safeParseJson(res);
        if (Array.isArray(data.roles) && data.roles.length > 0) {
          const merged = [...data.roles, ...roleLibrary].reduce<RoleOption[]>((acc, role) => {
            if (acc.some((item) => item.name === role.name)) return acc;
            acc.push(role);
            return acc;
          }, []);
          setPopularRoles(merged.slice(0, 12));
          return;
        }
      } catch (_err) {
        // ignore
      }
      setPopularRoles(roleLibrary.slice(0, 12));
    };
    loadPopular();
  }, [roleLibrary]);

  useEffect(() => {
    setCompanyLibrary(localCompanyLibrary);
    setPopularCompanies(localCompanyLibrary.slice(0, 16));
    const loadPopular = async () => {
      try {
        const res = await fetch("/api/companies/popular");
        if (!res.ok) throw new Error("Companies request failed");
        const data: any = await safeParseJson(res);
        if (Array.isArray(data.companies) && data.companies.length > 0) {
          setPopularCompanies(data.companies);
          return;
        }
      } catch (_err) {
        // ignore
      }
    };
    loadPopular();
  }, [localCompanyLibrary]);

  useEffect(() => {
    if (!roleSearch) {
      setRoleResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/roles/search?q=${encodeURIComponent(roleSearch)}`);
        if (!res.ok) throw new Error("Role search failed");
        const data: any = await safeParseJson(res);
        if (Array.isArray(data.roles) && data.roles.length > 0) {
          setRoleResults(data.roles);
          return;
        }
      } catch (_err) {
        // ignore
      }
      const filtered = roleLibrary.filter((role) =>
        role.name.toLowerCase().includes(roleSearch.toLowerCase())
      );
      setRoleResults(filtered.slice(0, 12));
    }, 200);
    return () => clearTimeout(timer);
  }, [roleSearch, roleLibrary]);

  useEffect(() => {
    if (!companySearch) {
      setCompanyResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/companies/search?q=${encodeURIComponent(companySearch)}`);
        if (!res.ok) throw new Error("Company search failed");
        const data: any = await safeParseJson(res);
        if (Array.isArray(data.companies) && data.companies.length > 0) {
          setCompanyResults(data.companies);
          return;
        }
      } catch (_err) {
        // ignore
      }
      const filtered = companyLibrary.filter((company) =>
        company.name.toLowerCase().includes(companySearch.toLowerCase())
      );
      setCompanyResults(filtered.slice(0, 12));
    }, 200);
    return () => clearTimeout(timer);
  }, [companySearch, companyLibrary]);

  const updateAnswers = (patch: Partial<AssessmentAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
    setError(null);
  };

  const deriveDomain = (company: CompanyOption) => {
    if (company.domain) return company.domain;
    if (company.website) {
      try {
        return new URL(company.website).hostname;
      } catch (_err) {
        // ignore
      }
    }
    if (company.slug) return `${company.slug}.com`;
    return null;
  };

  const toggleRole = (role: RoleOption) => {
    const exists = answers.targetRoles.find((item) => item.name === role.name);
    if (exists) {
      updateAnswers({ targetRoles: answers.targetRoles.filter((item) => item.name !== role.name) });
      return;
    }
    if (answers.targetRoles.length >= 3) return;
    updateAnswers({
      targetRoles: [...answers.targetRoles, { name: role.name, isCustom: false, id: role.id }],
    });
  };

  const addCustomRole = () => {
    if (!customRole.trim() || answers.targetRoles.length >= 3) return;
    updateAnswers({
      targetRoles: [
        ...answers.targetRoles,
        { name: customRole.trim(), isCustom: true, id: null },
      ],
    });
    setCustomRole("");
  };

  const toggleCompany = (company: CompanyOption) => {
    const exists = answers.targetCompanies.find((item) => item.id === company.id);
    if (exists) {
      updateAnswers({
        targetCompanies: answers.targetCompanies.filter((item) => item.id !== company.id),
      });
      return;
    }
    if (answers.targetCompanies.length >= 30) return;
    const domain = deriveDomain(company);
    const fallbackLogo = domain ? `https://logo.clearbit.com/${domain}` : null;
    updateAnswers({
      targetCompanies: [
        ...answers.targetCompanies,
        { id: company.id, name: company.name, logoUrl: company.logoUrl || fallbackLogo, reason: null },
      ],
    });
  };

  const addCustomCompany = () => {
    const name = customCompany.trim();
    if (!name) return;
    if (answers.targetCompanies.length >= 30) return;
    updateAnswers({
      targetCompanies: [
        ...answers.targetCompanies,
        {
          id: `custom-${Date.now()}`,
          name,
          logoUrl: null,
          reason: null,
        },
      ],
    });
    setCustomCompany("");
    setShowCustomCompany(false);
  };

  const ensureAssessment = async () => {
    if (assessmentId) return assessmentId;
    const res = await fetch("/api/leads/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: {} }),
    });
    const text = await res.text();
    let data: any = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (_err) {
      data = {};
    }
    if (!res.ok) {
      throw new Error(data.error || text || "Unable to start assessment.");
    }
    if (data.assessmentId) {
      setAssessmentId(data.assessmentId);
      return data.assessmentId as string;
    }
    throw new Error("Unable to start assessment.");
  };

  const uploadFile = async (file: File, kind: "resume" | "linkedin") => {
    try {
      const id = await ensureAssessment();
      const form = new FormData();
      form.append("assessmentId", id);
      form.append("kind", kind);
      form.append("file", file);
      const res = await fetch("/api/leads/upload", { method: "POST", body: form });
      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (_err) {
        data = {};
      }
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
        if (kind === "resume") {
          const fallbackUrl = `inline://${encodeURIComponent(file.name)}`;
          updateAnswers({ resumeFileUrl: data.url || fallbackUrl, resumeFileName: data.name || file.name, resumeFileSize: data.size || file.size });
          if (data.parseStatus === "failed" || data.parseStatus === "processing") {
            setResumeParseNotice("Resume uploaded. Parsing will finish shortly.");
          }
        }
      }
      if (kind === "linkedin") {
        const fallbackUrl = `inline://${encodeURIComponent(file.name)}`;
        updateAnswers({ linkedinFileUrl: data.url || fallbackUrl, linkedinFileName: data.name || file.name });
        if (data.parseStatus === "failed" || data.parseStatus === "processing") {
          setLinkedinParseNotice("LinkedIn uploaded. Parsing will finish shortly.");
        }
      }
      return;
    } catch (err: any) {
      throw err;
    }
  };

  const submitWizard = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload: any = { answers };
      if (assessmentId) payload.assessmentId = assessmentId;
      const res = await fetch("/api/leads/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (_err) {
        data = {};
      }
      if (!res.ok) {
        const details =
          data?.details?.fieldErrors &&
          Object.entries(data.details.fieldErrors)
            .map(([field, messages]: any) => `${field}: ${messages?.[0] || "invalid"}`)
            .join("; ");
        throw new Error(details || data.error || text || "Something went wrong");
      }
      if (data.token) {
        router.push(`/job-search-system/results/preview?token=${data.token}`);
        return;
      }
      throw new Error("Unable to load preview");
    } catch (err: any) {
      setError(err.message || "Unable to complete");
    } finally {
      setLoading(false);
    }
  };

  const validateStep = () => {
    if (step === 0 && answers.targetRoles.length === 0) {
      return "Select at least one role to continue.";
    }
    if (step === 0 && answers.targetRoles.length > 3) {
      return "You can select up to 3 roles.";
    }
    if (step === 1 && !answers.level) {
      return "Select a target level to continue.";
    }
    if (step === 2 && !answers.compTarget) {
      return "Select a compensation target to continue.";
    }
    if (step === 3 && !answers.timeline) {
      return "Select a timeline to continue.";
    }
    if (step === 4 && !answers.locationPreference) {
      return "Select a location preference to continue.";
    }
    if (step === 5 && !answers.hoursPerWeek) {
      return "Select your weekly time commitment to continue.";
    }
    if (step === 6 && !answers.resumeFileUrl) {
      return "Upload your resume to continue.";
    }
    if (step === 7 && !answers.networkStrength) {
      return "Select your network strength to continue.";
    }
    if (step === 7 && !answers.outreachComfort) {
      return "Select your outreach comfort level to continue.";
    }
    if (step === 7 && answers.targetCompanies.length < 5) {
      return "Select at least 5 companies to continue.";
    }
    if (step === 7 && answers.targetCompanies.length > 30) {
      return "Select no more than 30 companies.";
    }
    if (step === 8 && !answers.biggestBlocker) {
      return "Select your biggest blocker to continue.";
    }
    return null;
  };

  const validationError = validateStep();
  const showError = Boolean(validationTouched && validationError);
  const displayError =
    error && error.toLowerCase().includes("dommatrix")
      ? "Resume uploaded. Parsing will finish shortly."
      : error;

  // Preview is now handled on /job-search-system/results/preview

  return (
    <main className="relative min-h-screen bg-[#0A0E27] px-6 pb-20 pt-32 text-white">
      <div className="fixed left-0 right-0 top-0 z-[100] border-b border-white/10 bg-[#0A0E27]/95 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-3 px-6 py-4">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Step {step + 1} of {steps.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            {steps.map((_, index) => (
              <span
                key={index}
                className={`h-2 ${index === step ? "w-6" : "w-2"} rounded-full ${
                  index <= step ? "bg-[#06B6D4]" : "bg-white/20"
                } transition-all`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-[-200px] top-[-120px] h-[600px] w-[600px] rounded-full bg-[#06B6D4]/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-160px] left-[-140px] h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/20 blur-[160px]" />

      <div className="mx-auto flex w-full max-w-[700px] flex-col items-center justify-center">
        <div className="w-full rounded-[24px] border border-white/10 bg-[rgba(15,23,42,0.8)] p-10 backdrop-blur-[16px]">
          <div className="mb-10">
            <span className="inline-flex items-center rounded-full bg-[#06B6D4]/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#06B6D4]">
              Step {step + 1}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight">{steps[step]}</h1>
            <p className="mt-3 text-base text-white/70">
              {step === 0 && "Select 1-3 roles. You can add custom roles if needed."}
              {step === 1 && "Choose the seniority level you're aiming for."}
              {step === 2 && "Total compensation including base, bonus, and equity."}
              {step === 3 && "Your timeline impacts strategy urgency and pacing."}
              {step === 4 && "Select your preferred work arrangement."}
              {step === 5 && "To job searching, applications, and interview prep."}
              {step === 6 && "We’ll help you optimize what you have and fill the gaps."}
              {step === 7 && "This helps us recommend the right outreach strategy."}
              {step === 8 && "This helps us prioritize your action plan."}
            </p>
          </div>

          {step === 0 && (
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {popularRoles.map((role) => {
                  const selected = answers.targetRoles.some((item) => item.name === role.name);
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => toggleRole(role)}
                      className={`h-11 rounded-full px-5 text-sm font-semibold transition ${
                        selected
                          ? "bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-white"
                          : "bg-white/10 text-white/80 hover:scale-[1.02]"
                      }`}
                    >
                      {role.name}
                    </button>
                  );
                })}
              </div>
              {answers.targetRoles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {answers.targetRoles.map((role) => (
                    <span
                      key={role.name}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs"
                    >
                      {role.name}
                      <button
                        type="button"
                        className="text-white/60 hover:text-white"
                        onClick={() =>
                          updateAnswers({
                            targetRoles: answers.targetRoles.filter((item) => item.name !== role.name),
                          })
                        }
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div>
                <input
                  className="h-[52px] w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm"
                  placeholder="Search for other roles..."
                  value={roleSearch}
                  onChange={(event) => setRoleSearch(event.target.value)}
                />
                {roleResults.length > 0 && (
                  <div className="mt-2 rounded-xl border border-white/10 bg-[#0F172A]">
                    {roleResults.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-white/5"
                        onClick={() => toggleRole(role)}
                      >
                        <span>{role.name}</span>
                        <span className="text-xs text-white/40">
                          {answers.targetRoles.some((item) => item.name === role.name) ? "Selected" : "Add"}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="text-sm font-semibold text-white/70 underline"
                  onClick={() => setShowCustomRole((prev) => !prev)}
                >
                  Add Custom Role
                </button>
                {showCustomRole && (
                  <div className="mt-3 flex gap-2">
                    <input
                      className="h-[52px] flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm"
                      placeholder="Custom role title"
                      value={customRole}
                      onChange={(event) => setCustomRole(event.target.value)}
                    />
                    <button
                      type="button"
                      className="h-[52px] rounded-xl bg-white/10 px-4 text-sm font-semibold"
                      onClick={addCustomRole}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-white/50">{answers.targetRoles.length}/3 roles selected</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              {(["Mid-Level", "Senior", "Staff", "Principal", "Manager", "Director"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateAnswers({ level: value })}
                  className={`flex h-16 w-full items-center rounded-xl border px-5 text-left text-sm font-semibold transition ${
                    answers.level === value
                      ? "border-[#06B6D4] bg-[#06B6D4]/15"
                      : "border-white/10 bg-white/5 hover:border-[#06B6D4]/50"
                  }`}
                >
                  <span className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                    answers.level === value ? "border-[#06B6D4] bg-[#06B6D4]" : "border-white/30"
                  }`}>
                    {answers.level === value && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                  {value}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {(["$100k-$150k", "$150k-$200k", "$200k-$300k", "$300k+"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateAnswers({ compTarget: value })}
                  className={`flex h-16 w-full items-center rounded-xl border px-5 text-left text-sm font-semibold transition ${
                    answers.compTarget === value
                      ? "border-[#06B6D4] bg-[#06B6D4]/15"
                      : "border-white/10 bg-white/5 hover:border-[#06B6D4]/50"
                  }`}
                >
                  <span className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                    answers.compTarget === value ? "border-[#06B6D4] bg-[#06B6D4]" : "border-white/30"
                  }`}>
                    {answers.compTarget === value && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                  {value}
                </button>
              ))}
              <p className="text-xs text-white/50">
                This helps us calibrate your search strategy and company targets.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              {(["ASAP (<30 days)", "1-2 months", "2-3 months", "3+ months"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateAnswers({ timeline: value })}
                  className={`flex h-16 w-full items-center justify-between rounded-xl border px-5 text-left text-sm font-semibold transition ${
                    answers.timeline === value
                      ? "border-[#06B6D4] bg-[#06B6D4]/15"
                      : "border-white/10 bg-white/5 hover:border-[#06B6D4]/50"
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                      answers.timeline === value ? "border-[#06B6D4] bg-[#06B6D4]" : "border-white/30"
                    }`}>
                      {answers.timeline === value && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                    {value}
                  </div>
                  <span className="text-sm">📅</span>
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              {(["Remote", "Hybrid", "On-site"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateAnswers({ locationPreference: value })}
                  className={`flex h-16 w-full items-center rounded-xl border px-5 text-left text-sm font-semibold transition ${
                    answers.locationPreference === value
                      ? "border-[#06B6D4] bg-[#06B6D4]/15"
                      : "border-white/10 bg-white/5 hover:border-[#06B6D4]/50"
                  }`}
                >
                  <span className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                    answers.locationPreference === value ? "border-[#06B6D4] bg-[#06B6D4]" : "border-white/30"
                  }`}>
                    {answers.locationPreference === value && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                  {value}
                </button>
              ))}
              {(answers.locationPreference === "Hybrid" || answers.locationPreference === "On-site") && (
                <div>
                  <label className="text-sm font-semibold">Preferred city or region</label>
                  <input
                    className="mt-2 h-[52px] w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm"
                    placeholder="e.g., San Francisco, Austin"
                    value={answers.locationCity || ""}
                    onChange={(event) => updateAnswers({ locationCity: event.target.value })}
                  />
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              {([3, 5, 8, 12] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateAnswers({ hoursPerWeek: value })}
                  className={`flex h-16 w-full items-center rounded-xl border px-5 text-left text-sm font-semibold transition ${
                    answers.hoursPerWeek === value
                      ? "border-[#06B6D4] bg-[#06B6D4]/15"
                      : "border-white/10 bg-white/5 hover:border-[#06B6D4]/50"
                  }`}
                >
                  <span className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                    answers.hoursPerWeek === value ? "border-[#06B6D4] bg-[#06B6D4]" : "border-white/30"
                  }`}>
                    {answers.hoursPerWeek === value && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                  {value === 12 ? "12+ hours/week" : `${value}-${value + 2} hours/week`}
                </button>
              ))}
              <p className="text-xs text-white/50">
                More time = faster results. Even 5 hours/week is enough with the right system.
              </p>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div className="space-y-4">
                {([
                  { key: "resumeStatus", label: "Resume updated in last 30 days" },
                  { key: "linkedinStatus", label: "LinkedIn optimized for target role" },
                  { key: "portfolioStatus", label: "Active portfolio or GitHub" },
                  { key: "interviewReady", label: "Practiced interviews in last 60 days" },
                ] as const).map((item) => {
                  const checked =
                    item.key === "resumeStatus"
                      ? answers.resumeStatus === "updated_30"
                      : item.key === "linkedinStatus"
                      ? answers.linkedinStatus === "optimized"
                      : item.key === "portfolioStatus"
                      ? answers.portfolioStatus
                      : answers.interviewReady;
                  return (
                    <label key={item.key} className="flex items-center gap-3 text-sm text-white/80">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          if (item.key === "resumeStatus") {
                            updateAnswers({ resumeStatus: event.target.checked ? "updated_30" : "needs_work" });
                          }
                          if (item.key === "linkedinStatus") {
                            updateAnswers({ linkedinStatus: event.target.checked ? "optimized" : "basic" });
                          }
                          if (item.key === "portfolioStatus") {
                            updateAnswers({ portfolioStatus: event.target.checked });
                          }
                          if (item.key === "interviewReady") {
                            updateAnswers({ interviewReady: event.target.checked });
                          }
                        }}
                        className="h-4 w-4 rounded border-white/30 bg-transparent accent-[#06B6D4]"
                      />
                      {item.label}
                    </label>
                  );
                })}
              </div>

              <div>
                <label className="text-sm font-semibold">Upload your resume</label>
                <p className="text-xs text-white/50">PDF or DOCX, max 5MB</p>
                <div className="mt-3 rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      updateAnswers({
                        resumeFileName: file.name,
                        resumeFileSize: file.size,
                        resumeFileUrl: `inline://${encodeURIComponent(file.name)}`,
                      });
                      setResumeUploading(true);
                      setResumeUploadError(null);
                      setResumeParseNotice(null);
                      try {
                        await uploadFile(file, "resume");
                      } catch (err: any) {
                        const message = err?.message || "Upload failed";
                        setError(null);
                        setResumeUploadError(null);
                        if (message.includes("DOMMatrix") || message.includes("JSON") || message.includes("Unexpected")) {
                          setResumeParseNotice("Resume uploaded. Parsing will finish shortly.");
                        } else {
                          setResumeParseNotice("Resume uploaded. Parsing will finish shortly.");
                        }
                      } finally {
                        setResumeUploading(false);
                      }
                    }}
                  />
                  {resumeUploading && <p className="mt-2 text-xs text-white/60">Uploading...</p>}
                  {answers.resumeFileName && (
                    <p className="mt-2 text-xs text-white/60">{answers.resumeFileName}</p>
                  )}
                  {answers.resumeFileUrl && !resumeUploading && (
                    <p className="mt-2 text-xs text-emerald-300">Resume uploaded.</p>
                  )}
                </div>
                {resumeUploadError && (
                  <p className="mt-2 text-xs text-red-300">{resumeUploadError}</p>
                )}
                {resumeParseNotice && (
                  <p className="mt-2 text-xs text-white/60">{resumeParseNotice}</p>
                )}
                {validationTouched && !answers.resumeFileUrl && (
                  <p className="mt-2 text-xs text-red-300">Resume upload is required to continue.</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold">LinkedIn profile (optional but recommended)</label>
                <div className="mt-3 flex gap-3 text-xs">
                  <button
                    type="button"
                    className={`rounded-full px-4 py-2 ${linkedinMode === "url" ? "bg-white/15" : "bg-white/5"}`}
                    onClick={() => setLinkedinMode("url")}
                  >
                    Enter profile URL
                  </button>
                  <button
                    type="button"
                    className={`rounded-full px-4 py-2 ${linkedinMode === "upload" ? "bg-white/15" : "bg-white/5"}`}
                    onClick={() => setLinkedinMode("upload")}
                  >
                    Upload LinkedIn PDF
                  </button>
                </div>
                {linkedinMode === "url" ? (
                  <input
                    className="mt-3 h-[52px] w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm"
                    placeholder="https://linkedin.com/in/yourname"
                    value={answers.linkedinFileUrl || ""}
                    onChange={(event) => updateAnswers({ linkedinFileUrl: event.target.value })}
                  />
                ) : (
                  <div className="mt-3 rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        setLinkedinUploadError(null);
                        setLinkedinParseNotice(null);
                        setLinkedinUploading(true);
                        try {
                          await uploadFile(file, "linkedin");
                        } catch (err: any) {
                          setError(null);
                          setLinkedinUploadError(null);
                          setLinkedinParseNotice("LinkedIn uploaded. Parsing will finish shortly.");
                        } finally {
                          setLinkedinUploading(false);
                        }
                      }}
                    />
                    {linkedinUploading && <p className="mt-2 text-xs text-white/60">Uploading...</p>}
                    {answers.linkedinFileName && (
                      <p className="mt-2 text-xs text-white/60">{answers.linkedinFileName}</p>
                    )}
                    {linkedinUploadError && (
                      <p className="mt-2 text-xs text-red-300">{linkedinUploadError}</p>
                    )}
                    {linkedinParseNotice && (
                      <p className="mt-2 text-xs text-white/60">{linkedinParseNotice}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold">How strong is your professional network?</label>
                {([
                  { value: "strong", label: "Strong (I know people at target companies)" },
                  { value: "moderate", label: "Moderate (Some connections, could expand)" },
                  { value: "weak", label: "Weak (Starting from scratch)" },
                ] as const).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateAnswers({ networkStrength: option.value })}
                    className={`flex h-16 w-full items-center rounded-xl border px-5 text-left text-sm font-semibold transition ${
                      answers.networkStrength === option.value
                        ? "border-[#06B6D4] bg-[#06B6D4]/15"
                        : "border-white/10 bg-white/5 hover:border-[#06B6D4]/50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
                {validationTouched && !answers.networkStrength && (
                  <p className="text-xs text-red-300">Select one network strength option.</p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">How comfortable are you with outreach?</label>
                {([
                  { value: "comfortable", label: "Comfortable (I regularly reach out)" },
                  { value: "neutral", label: "Neutral (I'll do it if needed)" },
                  { value: "uncomfortable", label: "Uncomfortable (This is hard for me)" },
                ] as const).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateAnswers({ outreachComfort: option.value })}
                    className={`flex h-16 w-full items-center rounded-xl border px-5 text-left text-sm font-semibold transition ${
                      answers.outreachComfort === option.value
                        ? "border-[#06B6D4] bg-[#06B6D4]/15"
                        : "border-white/10 bg-white/5 hover:border-[#06B6D4]/50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
                {validationTouched && !answers.outreachComfort && (
                  <p className="text-xs text-red-300">Select your outreach comfort level.</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold">Select 5-30 target companies</label>
                <p className="text-xs text-white/50">Choose companies you'd be excited to join</p>
                <input
                  className="mt-3 h-[52px] w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm"
                  placeholder="Search companies..."
                  value={companySearch}
                  onChange={(event) => setCompanySearch(event.target.value)}
                />
                {companyResults.length > 0 && (
                  <div className="mt-2 rounded-xl border border-white/10 bg-[#0F172A]">
                    {companyResults.map((company) => (
                      <button
                        key={company.id}
                        type="button"
                        className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-white/5"
                        onClick={() => toggleCompany(company)}
                      >
                        <CompanyLogo
                          name={company.name}
                          logoUrl={company.logoUrl}
                          domain={deriveDomain(company)}
                          size={24}
                          className="h-6 w-6 rounded-full object-contain"
                        />
                        <span>{company.name}</span>
                        <span className="ml-auto text-xs text-white/40">{company.category}</span>
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-3">
                  <button
                    type="button"
                    className="text-xs font-semibold text-white/70 underline"
                    onClick={() => setShowCustomCompany((prev) => !prev)}
                  >
                    Add Custom Company
                  </button>
                  {showCustomCompany && (
                    <div className="mt-2 flex gap-2">
                      <input
                        className="h-[44px] flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm"
                        placeholder="Custom company name"
                        value={customCompany}
                        onChange={(event) => setCustomCompany(event.target.value)}
                      />
                      <button
                        type="button"
                        className="h-[44px] rounded-xl bg-white/10 px-4 text-sm font-semibold"
                        onClick={addCustomCompany}
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {popularCompanies.map((company) => {
                    const selected = answers.targetCompanies.some((item) => item.id === company.id);
                    return (
                      <button
                        key={company.id}
                        type="button"
                        onClick={() => toggleCompany(company)}
                        className={`flex h-[100px] flex-col items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition ${
                          selected
                            ? "border-[#06B6D4] bg-[#06B6D4]/15"
                            : "border-white/10 bg-white/5 hover:border-[#06B6D4]/50"
                        }`}
                      >
                        <CompanyLogo
                          name={company.name}
                          logoUrl={company.logoUrl}
                          domain={deriveDomain(company)}
                          size={40}
                          className="h-10 w-10 rounded-full object-contain"
                        />
                        <span>{company.name}</span>
                      </button>
                    );
                  })}
                </div>
                <p className={`mt-3 text-xs ${answers.targetCompanies.length >= 5 ? "text-[#06B6D4]" : "text-red-400"}`}>
                  {answers.targetCompanies.length}/30 companies selected
                </p>
                {validationTouched && answers.targetCompanies.length < 5 && (
                  <p className="mt-1 text-xs text-red-300">Select at least 5 companies to continue.</p>
                )}
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-4">
              {([
                { value: "responses", label: "Not getting responses to applications" },
                { value: "interviews", label: "Failing at interviews" },
                { value: "offers", label: "Getting lowball offers" },
                { value: "direction", label: "Don't know where to start" },
                { value: "time", label: "Not enough time/energy" },
              ] as const).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateAnswers({ biggestBlocker: option.value })}
                  className={`flex w-full flex-col rounded-xl border px-5 py-4 text-left text-sm font-semibold transition ${
                    answers.biggestBlocker === option.value
                      ? "border-[#06B6D4] bg-[#06B6D4]/15"
                      : "border-white/10 bg-white/5 hover:border-[#06B6D4]/50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
              <div>
                <label className="text-sm font-semibold">Anything else we should know? (optional)</label>
                <textarea
                  className="mt-2 min-h-[100px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                  placeholder="Tell us about your situation, concerns, or questions..."
                  value={answers.additionalContext || ""}
                  onChange={(event) => updateAnswers({ additionalContext: event.target.value.slice(0, 2000) })}
                  maxLength={2000}
                />
                <p className="mt-2 text-xs text-white/50">
                  {(answers.additionalContext || "").length}/2000 characters
                </p>
              </div>
            </div>
          )}

          {(displayError || showError) && (
            <div className="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {displayError || validationError}
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              type="button"
              className="h-14 rounded-full border border-white/20 px-6 text-sm font-semibold text-white/80"
              onClick={() => {
                setValidationTouched(false);
                setError(null);
                setStep((prev) => Math.max(0, prev - 1));
              }}
              disabled={step === 0}
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                className="h-14 flex-1 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-sm font-bold"
                onClick={() => {
                  setValidationTouched(true);
                  const message = validateStep();
                  if (message) {
                    setError(message);
                    return;
                  }
                  setError(null);
                  setStep((prev) => prev + 1);
                }}
                disabled={step === 6 && resumeUploading}
              >
                {step === 6 && resumeUploading ? "Uploading..." : "Continue"}
              </button>
            ) : (
              <button
                type="button"
                className="h-14 flex-1 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-sm font-bold"
                onClick={() => {
                  setValidationTouched(true);
                  const message = validateStep();
                  if (message) {
                    setError(message);
                    return;
                  }
                  submitWizard();
                }}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Get my preview"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
