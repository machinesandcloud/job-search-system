import { describe, expect, it } from "vitest";
import { computeScore } from "./scoring";
import type { AssessmentAnswers } from "./validation";

const baseAnswers: AssessmentAnswers = {
  targetRoles: [{ name: "DevOps Engineer", isCustom: false, id: null }],
  level: "Senior",
  compTarget: "$150k-$200k",
  timeline: "1-2 months",
  locationPreference: "Remote",
  locationCity: null,
  hoursPerWeek: 5,
  resumeStatus: "needs_work",
  linkedinStatus: "basic",
  portfolioStatus: false,
  interviewReady: false,
  resumeFileUrl: null,
  resumeFileName: null,
  resumeFileSize: null,
  linkedinFileUrl: null,
  linkedinFileName: null,
  networkStrength: "moderate",
  outreachComfort: "neutral",
  targetCompanies: [
    { id: null, name: "Google", logoUrl: null, reason: null },
    { id: null, name: "Amazon", logoUrl: null, reason: null },
    { id: null, name: "Microsoft", logoUrl: null, reason: null },
    { id: null, name: "Apple", logoUrl: null, reason: null },
    { id: null, name: "Netflix", logoUrl: null, reason: null },
  ],
  biggestBlocker: "responses",
  additionalContext: null,
};

describe("computeScore", () => {
  it("returns a score within 0-100", () => {
    const result = computeScore(baseAnswers);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
