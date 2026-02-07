const LEADERSHIP_LEVELS = new Set(["manager", "director", "vp", "cto"]);

const LEVEL_PREFIXES: Record<string, string> = {
  entry: "Entry-Level",
  junior: "Junior",
  mid: "",
  senior: "Senior",
  staff: "Staff",
  principal: "Principal",
  lead: "Lead",
  manager: "Engineering Manager",
  director: "Director of Engineering",
  vp: "VP of Engineering",
  cto: "CTO",
};

export function formatTargetRole(targetRole: string, experienceLevel?: string | null) {
  const normalizedLevel = (experienceLevel || "").trim().toLowerCase();
  if (!targetRole) return "your target role";
  if (LEADERSHIP_LEVELS.has(normalizedLevel)) {
    return LEVEL_PREFIXES[normalizedLevel] || targetRole;
  }
  const prefix = LEVEL_PREFIXES[normalizedLevel] || "";
  return prefix ? `${prefix} ${targetRole}` : targetRole;
}
