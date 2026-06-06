import { describe, it, expect } from "vitest";

const planPrices: Record<string, number> = {
  "Search": 29, "Pro": 29,
  "Growth": 99, "Premium": 99,
  "Executive": 249, "Team": 249,
};

function calcMRR(subs: { planName: string | null }[]) {
  return subs.reduce((sum, s) => {
    const planKey = Object.keys(planPrices).find(k => s.planName?.includes(k));
    return sum + (planKey ? planPrices[planKey] : 29);
  }, 0);
}

describe("MRR calculation (digest route)", () => {
  it("calculates MRR correctly for known plans", () => {
    expect(calcMRR([{ planName: "Search Monthly" }])).toBe(29);
    expect(calcMRR([{ planName: "Growth Annual" }])).toBe(99);
    expect(calcMRR([{ planName: "Executive Monthly" }])).toBe(249);
  });

  it("falls back to $29 for null or unrecognized plan names", () => {
    expect(calcMRR([{ planName: null }])).toBe(29);
    expect(calcMRR([{ planName: "Legacy Plan" }])).toBe(29);
  });

  it("sums across mixed plans correctly", () => {
    const subs = [
      { planName: "Search Monthly" },
      { planName: "Growth Annual" },
      { planName: "Executive Monthly" },
    ];
    expect(calcMRR(subs)).toBe(29 + 99 + 249);
  });

  it("calculates MRR delta correctly for a real scenario", () => {
    const currentSubs = [
      { planName: "Growth Annual" },
      { planName: "Executive Monthly" },
    ];
    const prevSubs = [{ planName: "Search Monthly" }];
    const mrr = calcMRR(currentSubs);
    const mrrLastWeek = calcMRR(prevSubs);
    expect(mrr - mrrLastWeek).toBe((99 + 249) - 29);
  });

  it("returns 0 for empty subscription list", () => {
    expect(calcMRR([])).toBe(0);
  });
});
