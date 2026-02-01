import type { LeadAnswers } from "./validation";
import { computeScore, hoursNumber, timelineWeeks } from "./scoring";
import { getRoleProfile } from "./roles";

export type WeeklyCadence = {
  week: string;
  focus: string;
  actions: string[];
};

export type ResultsPayload = {
  score: number;
  subscores: {
    clarity: number;
    assets: number;
    network: number;
    execution: number;
  };
  route: "DIY" | "GUIDED" | "FAST_TRACK";
  coachRead: string;
  positioningSummary: string;
  insights: string[];
  cadence: WeeklyCadence[];
  checklist: string[];
  scripts: {
    referral: string;
    recruiter: string;
    followup: string[];
  };
  proofStrategy: string[];
  interviewFocus: string[];
  companyTargets: LeadAnswers["companyTargets"];
  role: string;
  timelineWeeks: number;
  hoursPerWeek: number;
};

export function buildResults(answers: LeadAnswers): ResultsPayload {
  const { score, subscores, route } = computeScore(answers);
  const role = answers.roles[0];
  const profile = getRoleProfile(role);
  const weeks = timelineWeeks(answers.timeline);
  const hours = hoursNumber(answers.hoursPerWeek);
  const timelineLabel =
    answers.timeline === "ASAP"
      ? "next 2-4 weeks"
      : answers.timeline === "30"
      ? "next 30 days"
      : answers.timeline === "60"
      ? "next 60 days"
      : "next 90+ days";
  const leadershipLabel =
    answers.leadershipScope === "IC" ? "IC scope" : `${answers.leadershipScope.toLowerCase()} scope`;

  const cadence: WeeklyCadence[] = [
    {
      week: "Week 1",
      focus: "Signal + target list",
      actions: [
        `Finalize ${role} positioning and scope statement.`,
        `Pick ${Math.min(20, Math.max(8, answers.companyTargets.length || 12))} target companies.`,
        "Align resume + LinkedIn headline to target outcomes.",
      ],
    },
    {
      week: "Week 2",
      focus: "Outbound + warm intros",
      actions: [
        "Launch outreach cadence (5-8 messages).",
        "Request 2-3 warm intros from your network.",
        "Book 1 mock interview or role-specific drill.",
      ],
    },
    {
      week: "Week 3",
      focus: "Interview momentum",
      actions: [
        "Run targeted interview practice and refine stories.",
        "Send 3 follow-ups with proof assets.",
        "Review metrics and rebalance effort.",
      ],
    },
    {
      week: "Week 4",
      focus: "Offer readiness",
      actions: [
        "Rehearse offer negotiation script.",
        "Tighten decision criteria and comp guardrails.",
        "Prepare for final-round rapid turnarounds.",
      ],
    },
  ];

  const insights = [
    `Based on your ${timelineLabel} and ${hours} hrs/week, we'll focus on high-signal outreach before volume applications.`,
    `Your strongest lever is ${subscores.assets >= subscores.network ? "assets" : "network"}; we will focus there first.`,
    `Target roles align with ${profile.focus}, with emphasis on ${answers.targetIndustry} teams.`,
    `Company focus: ${answers.companyStage} stage, ${answers.compensationPriority.toLowerCase()}-weighted comp strategy.`,
  ];
  if (answers.constraints.length) {
    insights.push(`Non-negotiables: ${answers.constraints.join(", ")}.`);
  }
  if (answers.blockerNote) {
    insights.push(`Coach note: "${answers.blockerNote}".`);
  }

  const checklist = [
    "Finalize role scope statement and success metrics.",
    "Refresh resume headline + top 3 impact bullets.",
    "Update LinkedIn headline and featured proof asset.",
    "Build 2 outreach templates and a weekly follow-up cadence.",
    "Schedule one mock interview and one recruiter screen rehearsal.",
    "Ship one proof asset (post, doc, or project) tied to the role.",
    "Create offer strategy and decision checklist.",
  ];

  return {
    score,
    subscores,
    route,
    coachRead: `You're targeting ${answers.level} ${role} roles with ${answers.experienceYears} years of experience and ${leadershipLabel}. We'll run a ${timelineLabel} plan built to your ${hours} hrs/week reality.`,
    positioningSummary: `${answers.currentTitle ? `${answers.currentTitle} → ` : ""}${answers.level} ${role} | ${answers.targetIndustry} | ${answers.companyStage} | ${answers.compensationPriority} comp priority | ${answers.leadershipScope} scope`,
    insights,
    cadence,
    checklist,
    scripts: profile.scripts,
    proofStrategy: profile.proofStrategy,
    interviewFocus: profile.interviewTopics,
    companyTargets: answers.companyTargets,
    role: role || "Your target role",
    timelineWeeks: weeks,
    hoursPerWeek: hours,
  };
}
