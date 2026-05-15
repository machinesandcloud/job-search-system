import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import * as React from "react";

import { LeadNurture1, LeadNurture2, LeadNurture3, LeadNurture4, LeadNurture5, LeadNurture6, LeadNurture7 } from "@/lib/email-sequences/emails/lead-nurture";
import { TrialOnboarding1, TrialOnboarding2, TrialOnboarding3, TrialOnboarding4, TrialOnboarding5, TrialEnding1, TrialEnding2 } from "@/lib/email-sequences/emails/trial";
import { PaidWelcome1, PaidWelcome2, PaidWelcome3, Milestone1, Milestone5 } from "@/lib/email-sequences/emails/paid";
import { UpsellLimit1, UpsellLimit2, AtRisk1, AtRisk2, AtRisk3, NpsSurvey } from "@/lib/email-sequences/emails/engagement";
import { WinBack30, WinBack60, WinBack90 } from "@/lib/email-sequences/emails/win-back";
import { Dunning1, Dunning2, Dunning3 } from "@/lib/email-sequences/emails/dunning";
import {
  NonStarter1, NonStarter2, NonStarter3,
  FeatureActivation1, FeatureActivation2, FeatureActivation3,
  ReferralAsk, TestimonialAsk, AnnualUpsell,
} from "@/lib/email-sequences/emails/activation";

const APP = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zaricoach.com";
const UNSUB = `${APP}/unsubscribe`;
const NPS = `${APP}/nps`;

const PREVIEWS: Record<string, () => React.ReactElement> = {
  // Lead nurture
  "lead_nurture_1":     () => React.createElement(LeadNurture1, { unsubscribeUrl: UNSUB }),
  "lead_nurture_2":     () => React.createElement(LeadNurture2, { unsubscribeUrl: UNSUB }),
  "lead_nurture_3":     () => React.createElement(LeadNurture3, { unsubscribeUrl: UNSUB }),
  "lead_nurture_4":     () => React.createElement(LeadNurture4, { unsubscribeUrl: UNSUB }),
  "lead_nurture_5":     () => React.createElement(LeadNurture5, { unsubscribeUrl: UNSUB }),
  "lead_nurture_6":     () => React.createElement(LeadNurture6, { unsubscribeUrl: UNSUB }),
  "lead_nurture_7":     () => React.createElement(LeadNurture7, { unsubscribeUrl: UNSUB }),
  // Trial onboarding
  "trial_onboarding_1": () => React.createElement(TrialOnboarding1, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "trial_onboarding_2": () => React.createElement(TrialOnboarding2, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "trial_onboarding_3": () => React.createElement(TrialOnboarding3, { unsubscribeUrl: UNSUB }),
  "trial_onboarding_4": () => React.createElement(TrialOnboarding4, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "trial_onboarding_5": () => React.createElement(TrialOnboarding5, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  // Trial ending
  "trial_ending_1":     () => React.createElement(TrialEnding1, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "trial_ending_2":     () => React.createElement(TrialEnding2, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  // Paid welcome
  "paid_welcome_1":     () => React.createElement(PaidWelcome1, { firstName: "Alex", planTier: "premium", unsubscribeUrl: UNSUB }),
  "paid_welcome_2":     () => React.createElement(PaidWelcome2, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "paid_welcome_3":     () => React.createElement(PaidWelcome3, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  // Milestones
  "milestone_1":        () => React.createElement(Milestone1, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "milestone_5":        () => React.createElement(Milestone5, { firstName: "Alex", planTier: "pro", unsubscribeUrl: UNSUB }),
  // Upsell / engagement
  "upsell_limit_1":     () => React.createElement(UpsellLimit1, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "upsell_limit_2":     () => React.createElement(UpsellLimit2, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "at_risk_1":          () => React.createElement(AtRisk1, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "at_risk_2":          () => React.createElement(AtRisk2, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "at_risk_3":          () => React.createElement(AtRisk3, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "nps_survey":         () => React.createElement(NpsSurvey, { firstName: "Alex", npsUrl: NPS, unsubscribeUrl: UNSUB }),
  // Win-back
  "win_back_30":        () => React.createElement(WinBack30, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "win_back_60":        () => React.createElement(WinBack60, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "win_back_90":        () => React.createElement(WinBack90, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  // Dunning
  "dunning_1":          () => React.createElement(Dunning1, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "dunning_2":          () => React.createElement(Dunning2, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "dunning_3":          () => React.createElement(Dunning3, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  // Non-starter
  "non_starter_1":      () => React.createElement(NonStarter1, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "non_starter_2":      () => React.createElement(NonStarter2, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "non_starter_3":      () => React.createElement(NonStarter3, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  // Feature activation
  "feature_activation_1": () => React.createElement(FeatureActivation1, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "feature_activation_2": () => React.createElement(FeatureActivation2, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  "feature_activation_3": () => React.createElement(FeatureActivation3, { firstName: "Alex", unsubscribeUrl: UNSUB }),
  // Growth
  "referral":           () => React.createElement(ReferralAsk, { firstName: "Alex", referralUrl: `${APP}/signup?ref=alex`, unsubscribeUrl: UNSUB }),
  "testimonial":        () => React.createElement(TestimonialAsk, { firstName: "Alex", testimonialUrl: `${APP}/testimonial`, unsubscribeUrl: UNSUB }),
  "annual_upsell":      () => React.createElement(AnnualUpsell, { firstName: "Alex", planName: "Search", monthlyPrice: 39, annualMonthlyPrice: 32, annualUrl: `${APP}/billing?plan=annual`, unsubscribeUrl: UNSUB }),
};

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    const list = Object.keys(PREVIEWS).map((k) => `<li><a href="?id=${k}">${k}</a></li>`).join("");
    return new NextResponse(`<!DOCTYPE html><html><body><h2>Email Previews</h2><ul>${list}</ul></body></html>`, {
      headers: { "Content-Type": "text/html" },
    });
  }

  const factory = PREVIEWS[id];
  if (!factory) {
    return NextResponse.json({ error: `Unknown email: ${id}` }, { status: 404 });
  }

  const html = await render(factory());
  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
