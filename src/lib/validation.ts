import { z } from "zod";

export const roleSchema = z.string().min(2).max(80);

export const leadAnswersSchema = z.object({
  roles: z.array(roleSchema).min(1),
  level: z.enum(["Mid", "Senior", "Staff", "Manager", "Director"]),
  compTarget: z.enum(["<100k", "100k-140k", "140k-180k", "180k-220k", "220k+"] ),
  timeline: z.enum(["ASAP", "30", "60", "90+"] ),
  locationType: z.enum(["Remote", "Hybrid", "Onsite"]),
  city: z.string().max(80).optional().nullable(),
  hoursPerWeek: z.enum(["3", "5", "8", "12+"] ),
  assets: z.object({
    resume: z.enum(["None", "Draft", "Strong"]),
    linkedin: z.enum(["None", "Draft", "Strong"]),
    interview: z.enum(["Not ready", "Some practice", "Confident"]),
  }),
  networkStrength: z.enum(["Low", "Medium", "Strong"]),
  outreachComfort: z.enum(["Low", "Medium", "High"]),
  companyTargets: z
    .array(
      z.object({
        name: z.string().min(2).max(80),
        domain: z.string().max(120).optional().nullable(),
        logoUrl: z.string().max(200).optional().nullable(),
        industry: z.string().max(120).optional().nullable(),
        size: z.string().max(40).optional().nullable(),
      })
    )
    .max(30),
  biggestBlocker: z.enum([
    "Clarity",
    "Resume",
    "LinkedIn",
    "Interviews",
    "Networking",
    "Confidence",
    "Time",
  ]),
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
