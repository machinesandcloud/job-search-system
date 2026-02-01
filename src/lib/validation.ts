import { z } from "zod";

export const roleSchema = z.string().min(2).max(80);

export const leadAnswersSchema = z.object({
  roles: z.array(roleSchema).min(1),
  currentTitle: z.string().max(80).optional().nullable(),
  experienceYears: z.enum(["0-2", "3-5", "6-9", "10+"]),
  leadershipScope: z.enum(["IC", "Lead", "Manager", "Director+"]),
  level: z.enum(["Mid", "Senior", "Staff", "Manager", "Director"]),
  compTarget: z.enum(["<100k", "100k-140k", "140k-180k", "180k-220k", "220k+"] ),
  compensationPriority: z.enum(["Cash", "Equity", "Balanced"]),
  timeline: z.enum(["ASAP", "30", "60", "90+"] ),
  locationType: z.enum(["Remote", "Hybrid", "Onsite"]),
  city: z.string().max(80).optional().nullable(),
  targetIndustry: z.enum([
    "Infrastructure",
    "Security",
    "Data/AI",
    "Fintech",
    "Consumer",
    "B2B SaaS",
    "Healthcare",
    "Marketplace",
    "Other",
  ]),
  companyStage: z.enum(["Startup", "Growth", "Enterprise", "Public", "Consulting"]),
  hoursPerWeek: z.enum(["3", "5", "8", "12+"] ),
  assets: z.object({
    resume: z.enum(["None", "Draft", "Strong"]),
    linkedin: z.enum(["None", "Draft", "Strong"]),
    interview: z.enum(["Not ready", "Some practice", "Confident"]),
    portfolio: z.enum(["None", "Some", "Strong"]),
  }),
  linkedinUrl: z.string().url().optional().nullable(),
  linkedinHeadline: z.string().max(140).optional().nullable(),
  linkedinSummary: z.string().max(1200).optional().nullable(),
  resumeText: z.string().max(2000).optional().nullable(),
  resumeUploaded: z.boolean(),
  networkStrength: z.enum(["Low", "Medium", "Strong"]),
  outreachComfort: z.enum(["Low", "Medium", "High"]),
  companyTargets: z
    .array(
      z
        .object({
          name: z.string().min(2).max(80),
          domain: z.string().max(200).optional().nullable(),
          logoUrl: z.string().max(500).optional().nullable(),
          industry: z.string().max(200).optional().nullable(),
          size: z.string().max(60).optional().nullable(),
        })
        .passthrough()
    )
    .max(30),
  constraints: z
    .array(
      z.enum([
        "Visa sponsorship",
        "Remote only",
        "No relocation",
        "Confidential search",
        "Comp floor",
        "Limited time",
        "Industry switch",
      ])
    )
    .max(5),
  biggestBlocker: z.enum([
    "Clarity",
    "Resume",
    "LinkedIn",
    "Interviews",
    "Networking",
    "Confidence",
    "Time",
    "Scope",
    "Positioning",
  ]),
  blockerNote: z.string().max(240).optional().nullable(),
  coachFeedback: z.string().max(1200).optional().nullable(),
  assetReview: z.string().max(2000).optional().nullable(),
  pipeline: z.enum(["None", "Some", "Active"]),
});

export type LeadAnswers = z.infer<typeof leadAnswersSchema>;

export const leadStartSchema = z.object({
  answers: leadAnswersSchema.partial().optional(),
});

export const leadCompleteSchema = z.object({
  leadId: z.string().optional(),
  answers: leadAnswersSchema,
});

export function sanitizeAnswers(input: any) {
  if (!input || typeof input !== "object") return input;
  const copy = { ...input };
  if (Array.isArray(copy.roles)) {
    copy.roles = copy.roles.map((role: any) =>
      typeof role === "string" ? role : role?.name || role?.title || String(role)
    );
  }
  if (Array.isArray(copy.companyTargets)) {
    copy.companyTargets = copy.companyTargets
      .map((item: any) => {
        if (typeof item === "string") return { name: item };
        if (!item || typeof item !== "object") return null;
        const name = item.name || item.company || item.title || item.domain || item.slug;
        if (!name) return null;
        return {
          name,
          domain: item.domain || null,
          logoUrl: item.logoUrl || item.logo || null,
          industry: item.industry || item.category || null,
          size: item.size || item.sizeRange || null,
        };
      })
      .filter(Boolean);
  }
  if (Array.isArray(copy.constraints)) {
    copy.constraints = copy.constraints.filter((item: any) => typeof item === "string");
  }
  if (typeof copy.city === "string" && copy.city.trim() === "") {
    copy.city = null;
  }
  if (typeof copy.blockerNote === "string" && copy.blockerNote.trim() === "") {
    copy.blockerNote = null;
  }
  if (typeof copy.coachFeedback === "string" && copy.coachFeedback.trim() === "") {
    copy.coachFeedback = null;
  }
  if (typeof copy.linkedinUrl === "string" && copy.linkedinUrl.trim() === "") {
    copy.linkedinUrl = null;
  }
  if (typeof copy.linkedinHeadline === "string" && copy.linkedinHeadline.trim() === "") {
    copy.linkedinHeadline = null;
  }
  if (typeof copy.linkedinSummary === "string" && copy.linkedinSummary.trim() === "") {
    copy.linkedinSummary = null;
  }
  if (typeof copy.resumeText === "string" && copy.resumeText.trim() === "") {
    copy.resumeText = null;
  }
  return copy;
}

export const emailSchema = z.object({
  leadId: z.string(),
  email: z.string().email(),
  website: z.string().optional(),
});

export const companySearchSchema = z.object({
  q: z.string().min(1).max(80),
});

export const stripeCheckoutSchema = z.object({
  leadId: z.string(),
  token: z.string(),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
});

export const adminLeadsQuerySchema = z.object({
  route: z.enum(["DIY", "GUIDED", "FAST_TRACK"]).optional(),
  minScore: z.string().optional(),
  maxScore: z.string().optional(),
  purchased: z.enum(["true", "false"]).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export const eventSchema = z.object({
  leadId: z.string().optional(),
  type: z.string().min(2).max(60),
  metadata: z.record(z.string(), z.any()).optional(),
});
