import type { LeadAnswers } from "./validation";

export type Subscores = {
  clarity: number;
  assets: number;
  network: number;
  execution: number;
};

export type ScoreResult = {
  score: number;
  subscores: Subscores;
  route: "DIY" | "GUIDED" | "FAST_TRACK";
};

const timelineScoreMap: Record<LeadAnswers["timeline"], number> = {
  ASAP: 12,
  "30": 10,
  "60": 7,
  "90+": 4,
};

const hoursScoreMap: Record<LeadAnswers["hoursPerWeek"], number> = {
  "3": 4,
  "5": 7,
  "8": 10,
  "12+": 12,
};

export function computeSubscores(answers: LeadAnswers): Subscores {
  const clarityPoints = [
    answers.roles.length > 0 ? 5 : 0,
    answers.level ? 5 : 0,
    answers.compTarget ? 5 : 0,
    answers.timeline ? 5 : 0,
    answers.locationType ? 5 : 0,
  ].reduce((sum, val) => sum + val, 0);

  const assetsPoints = [
    answers.assets.resume === "Strong" ? 10 : answers.assets.resume === "Draft" ? 6 : 2,
    answers.assets.linkedin === "Strong" ? 8 : answers.assets.linkedin === "Draft" ? 5 : 2,
    answers.assets.interview === "Confident" ? 7 : answers.assets.interview === "Some practice" ? 4 : 2,
  ].reduce((sum, val) => sum + val, 0);

  const networkPoints = [
    answers.networkStrength === "Strong" ? 15 : answers.networkStrength === "Medium" ? 10 : 6,
    answers.outreachComfort === "High" ? 10 : answers.outreachComfort === "Medium" ? 7 : 4,
  ].reduce((sum, val) => sum + val, 0);

  const executionPoints = [
    hoursScoreMap[answers.hoursPerWeek],
    timelineScoreMap[answers.timeline],
    answers.pipeline === "Active" ? 6 : answers.pipeline === "Some" ? 4 : 2,
  ].reduce((sum, val) => sum + val, 0);

  return {
    clarity: Math.min(25, Math.round(clarityPoints)),
    assets: Math.min(25, Math.round(assetsPoints)),
    network: Math.min(25, Math.round(networkPoints)),
    execution: Math.min(25, Math.round(executionPoints)),
  };
}

export function computeScore(answers: LeadAnswers): ScoreResult {
  const subscores = computeSubscores(answers);
  let total = subscores.clarity + subscores.assets + subscores.network + subscores.execution;

  if (answers.compTarget === "180k-220k" || answers.compTarget === "220k+") total += 10;
  if (answers.timeline === "ASAP" || answers.timeline === "30") total += 10;
  if (answers.hoursPerWeek === "3") total -= 10;

  total = Math.max(0, Math.min(100, Math.round(total)));

  let route: ScoreResult["route"] = "GUIDED";
  if (total < 45 || answers.timeline === "90+") route = "DIY";
  else if (total >= 70 && (answers.timeline === "ASAP" || answers.timeline === "30")) route = "FAST_TRACK";

  return { score: total, subscores, route };
}

export function getRouteLabel(route: ScoreResult["route"]) {
  if (route === "DIY") return "DIY";
  if (route === "FAST_TRACK") return "Fast Track";
  return "Guided";
}

export function timelineWeeks(timeline: LeadAnswers["timeline"]) {
  if (timeline === "ASAP") return 4;
  if (timeline === "30") return 4;
  if (timeline === "60") return 8;
  return 12;
}

export function hoursNumber(hours: LeadAnswers["hoursPerWeek"]) {
  if (hours === "12+") return 12;
  return Number(hours);
}
