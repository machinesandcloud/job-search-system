import { describe, it, expect } from "vitest";

const planPrices: Record<string, number> = {
  "Search": 39, "Pro": 39,
  "Growth": 89, "Premium": 89,
  "Executive": 179, "Team": 179,
};

function calcMRR(subs: { planName: string | null }[]) {
  return subs.reduce((sum, s) => {
    const planKey = Object.keys(planPrices).find(k => s.planName?.includes(k));
    return sum + (planKey ? planPrices[planKey] : 39);
  }, 0);
}

describe("MRR calculation (digest route)", () => {
  it("calculates MRR correctly for known plans", () => {
    expect(calcMRR([{ planName: "Search Monthly" }])).toBe(39);
    expect(calcMRR([{ planName: "Growth Annual" }])).toBe(89);
    expect(calcMRR([{ planName: "Executive Monthly" }])).toBe(179);
  });

  it("falls back to $39 for null or unrecognized plan names", () => {
    expect(calcMRR([{ planName: null }])).toBe(39);
    expect(calcMRR([{ planName: "Legacy Plan" }])).toBe(39);
  });

  it("sums across mixed plans correctly", () => {
    const subs = [
      { planName: "Search Monthly" },
      { planName: "Growth Annual" },
      { planName: "Executive Monthly" },
    ];
    expect(calcMRR(subs)).toBe(39 + 89 + 179);
  });

  it("calculates MRR delta correctly for a real scenario", () => {
    const currentSubs = [
      { planName: "Growth Annual" },
      { planName: "Executive Monthly" },
    ];
    const prevSubs = [{ planName: "Search Monthly" }];
    const mrr = calcMRR(currentSubs);
    const mrrLastWeek = calcMRR(prevSubs);
    expect(mrr - mrrLastWeek).toBe((89 + 179) - 39);
  });

  it("returns 0 for empty subscription list", () => {
    expect(calcMRR([])).toBe(0);
  });
});
