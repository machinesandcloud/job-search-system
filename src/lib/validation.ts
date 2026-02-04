import { z } from "zod";

export const targetRoleSchema = z.object({
  name: z.string().min(2).max(80),
  isCustom: z.boolean().default(false),
  id: z.string().max(120).optional().nullable(),
});

export const targetCompanySchema = z.object({
  id: z.string().max(120).optional().nullable(),
  name: z.string().min(2).max(80),
  logoUrl: z.string().max(500).optional().nullable(),
  reason: z.string().max(240).optional().nullable(),
});

export const assessmentAnswersSchema = z.object({
  targetRoles: z.array(targetRoleSchema).min(1).max(3),
  level: z.enum(["Mid-Level", "Senior", "Staff", "Principal", "Manager", "Director"]),
  compTarget: z.enum(["$100k-$150k", "$150k-$200k", "$200k-$300k", "$300k+"]),
  timeline: z.enum(["ASAP (<30 days)", "1-2 months", "2-3 months", "3+ months"]),
  locationPreference: z.enum(["Remote", "Hybrid", "On-site"]),
  locationCity: z.string().max(80).optional().nullable(),
  hoursPerWeek: z.union([z.literal(3), z.literal(5), z.literal(8), z.literal(12)]),
  resumeStatus: z.enum(["updated_30", "needs_work", "none"]),
  linkedinStatus: z.enum(["optimized", "basic", "incomplete"]),
  portfolioStatus: z.boolean(),
  interviewReady: z.boolean(),
  resumeFileUrl: z.string().max(500).optional().nullable(),
  resumeFileName: z.string().max(200).optional().nullable(),
  resumeFileSize: z.number().int().optional().nullable(),
  linkedinFileUrl: z.string().max(500).optional().nullable(),
  linkedinFileName: z.string().max(200).optional().nullable(),
  networkStrength: z.enum(["strong", "moderate", "weak"]),
  outreachComfort: z.enum(["comfortable", "neutral", "uncomfortable"]),
  targetCompanies: z.array(targetCompanySchema).min(5).max(30),
  biggestBlocker: z.enum(["responses", "interviews", "offers", "direction", "time"]),
  additionalContext: z.string().max(500).optional().nullable(),
});

export type AssessmentAnswers = z.infer<typeof assessmentAnswersSchema>;

export const assessmentStartSchema = z.object({
  answers: assessmentAnswersSchema.partial().optional(),
});

export const assessmentCompleteSchema = z.object({
  assessmentId: z.string().uuid().optional(),
  answers: assessmentAnswersSchema,
});

export const emailSchema = z.object({
  assessmentId: z.string().uuid(),
  email: z.string().email(),
  website: z.string().optional(),
});

export const companySearchSchema = z.object({
  q: z.string().min(1).max(80),
});

export const stripeCheckoutSchema = z.object({
  assessmentId: z.string().uuid(),
  token: z.string(),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
});

export const adminLeadsQuerySchema = z.object({
  route: z.enum(["DIY", "Guided", "FastTrack"]).optional(),
  minScore: z.string().optional(),
  maxScore: z.string().optional(),
  purchased: z.enum(["true", "false"]).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export const eventSchema = z.object({
  assessmentId: z.string().uuid().optional(),
  type: z.string().min(2).max(60),
  metadata: z.record(z.string(), z.any()).optional(),
});

export function sanitizeAnswers(input: any) {
  if (!input || typeof input !== "object") return input;
  const copy = { ...input };
  if (Array.isArray(copy.targetRoles)) {
    copy.targetRoles = copy.targetRoles
      .map((role: any) => {
        if (typeof role === "string") return { name: role, isCustom: true };
        return {
          name: role?.name || role?.title || "",
          isCustom: Boolean(role?.isCustom),
          id: role?.id || null,
        };
      })
      .filter((role: any) => role?.name);
  }
  if (Array.isArray(copy.targetCompanies)) {
    copy.targetCompanies = copy.targetCompanies
      .map((item: any) => {
        if (typeof item === "string") return { name: item };
        if (!item || typeof item !== "object") return null;
        const name = item.name || item.company || item.title || item.domain || item.slug;
        if (!name) return null;
        return {
          id: item.id || null,
          name,
          logoUrl: item.logoUrl || item.logo || null,
          reason: item.reason || null,
        };
      })
      .filter(Boolean);
  }
  if (typeof copy.locationCity === "string" && copy.locationCity.trim() === "") {
    copy.locationCity = null;
  }
  if (typeof copy.additionalContext === "string" && copy.additionalContext.trim() === "") {
    copy.additionalContext = null;
  }
  return copy;
}
