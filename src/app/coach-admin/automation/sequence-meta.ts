import type { ZariSequence } from "@/lib/email-sequences";

export const SEQUENCE_DELAYS_META: Partial<Record<ZariSequence, { steps: number; duration: number }>> = {
  lead_nurture:       { steps: 7, duration: 21 },
  trial_onboarding:   { steps: 5, duration: 13 },
  trial_ending:       { steps: 2, duration: 2 },
  paid_welcome:       { steps: 3, duration: 7 },
  milestone_1:        { steps: 1, duration: 0 },
  milestone_5:        { steps: 1, duration: 0 },
  upsell_limit:       { steps: 2, duration: 3 },
  at_risk:            { steps: 3, duration: 14 },
  win_back_30:        { steps: 1, duration: 0 },
  win_back_60:        { steps: 1, duration: 0 },
  win_back_90:        { steps: 1, duration: 0 },
  nps_survey:         { steps: 1, duration: 0 },
  dunning:            { steps: 3, duration: 10 },
  non_starter:        { steps: 3, duration: 10 },
  feature_activation: { steps: 3, duration: 10 },
  referral:           { steps: 1, duration: 0 },
  testimonial:        { steps: 1, duration: 0 },
  annual_upsell:      { steps: 1, duration: 0 },
  detractor_followup: { steps: 2, duration: 3 },
};
