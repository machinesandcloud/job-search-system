import { describe, it, expect } from "vitest";
import { computeScore } from "./scoring";
import type { LeadAnswers } from "./validation";

const baseAnswers: LeadAnswers = {
  roles: ["DevOps Engineer"],
  level: "Senior",
  compTarget: "140k-180k",
  timeline: "60",
  locationType: "Remote",
  city: "",
  hoursPerWeek: "5",
  assets: { resume: "Draft", linkedin: "Draft", interview: "Some practice" },
  networkStrength: "Medium",
  outreachComfort: "Medium",
  companyTargets: [],
  biggestBlocker: "Clarity",
  pipeline: "Some",
};

describe("computeScore", () => {
  it("returns a score within 0-100", () => {
    const result = computeScore(baseAnswers);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("assigns fast track for high score + urgent timeline", () => {
    const result = computeScore({
      ...baseAnswers,
      timeline: "30",
      compTarget: "220k+",
      hoursPerWeek: "12+",
      assets: { resume: "Strong", linkedin: "Strong", interview: "Confident" },
      networkStrength: "Strong",
      outreachComfort: "High",
      pipeline: "Active",
    });
    expect(result.route).toBe("FAST_TRACK");
  });
});
