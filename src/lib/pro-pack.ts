import type { LeadAnswers } from "./validation";
import { companySeed } from "./company-data";
import { getRoleProfile } from "./roles";

export function buildProPack(answers: LeadAnswers) {
  const profile = getRoleProfile(answers.roles[0]);
  const shortlist = answers.companyTargets.length
    ? answers.companyTargets.slice(0, 10)
    : companySeed.slice(0, 10).map((company) => ({
        name: company.name,
        domain: company.domain,
        industry: company.industry,
        size: company.size,
      }));

  const keywordMap = profile.keywords.map((keyword) => ({ keyword, priority: "High" }));
  const missingKeywords = profile.keywords.slice(0, 6);

  const outreachScripts = [
    profile.scripts.referral,
    profile.scripts.recruiter,
    "Checking in with a quick impact snapshot aligned to your current role needs.",
    "Following up with a short proof asset I built that maps to the role scope.",
    "Final touchpoint - happy to share details or jump on a quick call.",
  ];

  const interviewPrep = [
    "Day 1: Role scope + success metrics for the first 90 days.",
    "Day 2: Deep-dive into top 3 system challenges tied to the role.",
    "Day 3: Behavioral stories tied to leadership + execution.",
    "Day 4: Metrics + trade-off questions.",
    "Day 5: Mock interview with targeted feedback.",
    "Day 6: Offer/leveling calibration questions.",
    "Day 7: Final polish and prep for negotiations.",
  ];

  const negotiationScripts = [
    "Thanks for the offer - I'm excited about the role. Based on scope and market data, I'm targeting {range}. Is there flexibility on base or equity?",
    "I appreciate the offer. If we can adjust the base to {target}, I'm ready to sign this week.",
    "Following up with a short summary of the ask - happy to align on a path forward.",
  ];

  return {
    shortlist,
    keywordMap,
    missingKeywords,
    outreachScripts,
    interviewPrep,
    negotiationScripts,
  };
}
