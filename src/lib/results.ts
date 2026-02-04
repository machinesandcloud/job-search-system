import type { AssessmentAnswers } from "./validation";

export type ResultsPayload = {
  score: number;
  subscores: { clarity: number; assets: number; network: number; execution: number };
  insights: string[];
  cadence: { week: string; focus: string; actions: string[] }[];
};

export function buildResults(_answers: AssessmentAnswers): ResultsPayload {
  return {
    score: 0,
    subscores: { clarity: 0, assets: 0, network: 0, execution: 0 },
    insights: [],
    cadence: [],
  };
}
