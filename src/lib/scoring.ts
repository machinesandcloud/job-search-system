import type { AssessmentAnswers } from "./validation";

export type Subscores = {
  clarity: number;
  assets: number;
  network: number;
  execution: number;
};

export type ScoreResult = {
  score: number;
  subscores: Subscores;
  route: "DIY" | "Guided" | "Fast Track";
};

export function computeSubscores(answers: AssessmentAnswers): Subscores {
  const clarityPoints = [
    answers.targetRoles.length >= 2 ? 3 : 0,
    answers.level && answers.compTarget ? 3 : 0,
    ["ASAP (<30 days)", "1-2 months"].includes(answers.timeline) ? 2 : 0,
    answers.locationPreference ? 2 : 0,
    15,
  ].reduce((sum, val) => sum + val, 0);

  const assetsPoints = [
    answers.resumeStatus === "updated_30" ? 8 : answers.resumeStatus === "needs_work" ? 4 : 0,
    answers.linkedinStatus === "optimized" ? 6 : answers.linkedinStatus === "basic" ? 3 : 0,
    answers.portfolioStatus ? 5 : 0,
    answers.interviewReady ? 4 : 0,
    answers.resumeFileUrl ? 2 : 0,
  ].reduce((sum, val) => sum + val, 0);

  const networkPoints = [
    answers.networkStrength === "strong" ? 10 : answers.networkStrength === "moderate" ? 6 : 2,
    answers.outreachComfort === "comfortable" ? 10 : answers.outreachComfort === "neutral" ? 6 : 2,
    answers.targetCompanies.length >= 10 ? 5 : 0,
  ].reduce((sum, val) => sum + val, 0);

  const hoursPoints = answers.hoursPerWeek === 3 ? 4 : answers.hoursPerWeek === 5 ? 7 : answers.hoursPerWeek === 8 ? 10 : 12;
  const timelinePoints =
    answers.timeline === "ASAP (<30 days)"
      ? 8
      : answers.timeline === "1-2 months"
      ? 6
      : answers.timeline === "2-3 months"
      ? 4
      : 2;
  const blockerBonus = answers.biggestBlocker === "direction" ? 5 : answers.biggestBlocker === "time" ? -2 : 0;

  const executionPoints = [hoursPoints, timelinePoints, blockerBonus].reduce((sum, val) => sum + val, 0);

  return {
    clarity: Math.min(25, Math.max(0, Math.round(clarityPoints))),
    assets: Math.min(25, Math.max(0, Math.round(assetsPoints))),
    network: Math.min(25, Math.max(0, Math.round(networkPoints))),
    execution: Math.min(25, Math.max(0, Math.round(executionPoints))),
  };
}

export function computeScore(answers: AssessmentAnswers): ScoreResult {
  const subscores = computeSubscores(answers);
  let total = subscores.clarity + subscores.assets + subscores.network + subscores.execution;

  if (["$200k-$300k", "$300k+"].includes(answers.compTarget)) total += 10;
  if (answers.timeline === "ASAP (<30 days)") total += 10;
  if (answers.hoursPerWeek === 3 && answers.timeline === "3+ months") total -= 10;

  total = Math.max(0, Math.min(100, Math.round(total)));

  let route: ScoreResult["route"] = "Guided";
  if (total < 45 || answers.timeline === "3+ months") route = "DIY";
  else if (total >= 70 && ["ASAP (<30 days)", "1-2 months"].includes(answers.timeline)) route = "Fast Track";

  return { score: total, subscores, route };
}
