import path from "path";

const SKILL_KEYWORDS = [
  "kubernetes",
  "aws",
  "gcp",
  "azure",
  "terraform",
  "ci/cd",
  "docker",
  "python",
  "golang",
  "node",
  "linux",
  "prometheus",
  "grafana",
  "observability",
  "sre",
  "incident response",
  "ansible",
  "jenkins",
  "gitlab",
  "cloud",
  "networking",
  "security",
];

function extractEmail(text: string) {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match?.[0] || null;
}

function extractPhone(text: string) {
  const match = text.match(/(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/);
  return match?.[0] || null;
}

function extractYears(text: string) {
  const match = text.match(/(\d{1,2})\+?\s+years/i);
  return match ? Number(match[1]) : null;
}

function extractTopSkills(text: string) {
  const lower = text.toLowerCase();
  const found = SKILL_KEYWORDS.filter((keyword) => lower.includes(keyword));
  return Array.from(new Set(found)).map((skill) =>
    skill
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

function extractAchievements(text: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.filter((line) => /%|\b\d+x\b|\b\d+\b/.test(line)).slice(0, 5);
}

function extractProjects(text: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const candidates = lines.filter((line) => line.toLowerCase().includes("project"));
  return candidates.slice(0, 3).map((title) => ({ title }));
}

function extractCurrentRole(text: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const expIndex = lines.findIndex((line) => /experience/i.test(line));
  if (expIndex !== -1 && lines[expIndex + 1]) {
    return lines[expIndex + 1];
  }
  return lines[0] || null;
}

function extractCurrentCompany(text: string) {
  const match = text.match(/\bat\s+([A-Z][A-Za-z0-9&.\- ]{2,})/);
  return match?.[1]?.trim() || null;
}

function extractFullName(text: string) {
  const firstLine = text.split("\n").map((line) => line.trim()).find(Boolean);
  if (!firstLine) return null;
  if (firstLine.split(" ").length <= 4 && /[A-Za-z]/.test(firstLine)) {
    return firstLine;
  }
  return null;
}

function normalizeText(text: string) {
  return text.replace(/\r/g, "\n").replace(/\n{2,}/g, "\n").trim();
}

export async function extractTextFromBuffer(buffer: Buffer, filename: string) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".pdf") {
    try {
      const pdfParseModule = await import("pdf-parse");
      const pdfParse = (pdfParseModule as any).default || (pdfParseModule as any);
      const data = await pdfParse(buffer);
      return normalizeText(data.text || "");
    } catch (_err) {
      return "";
    }
  }
  if (ext === ".docx") {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return normalizeText(result.value || "");
  }
  return "";
}

export function parseResumeText(text: string) {
  const normalized = normalizeText(text);
  return {
    fullName: extractFullName(normalized) || undefined,
    email: extractEmail(normalized) || undefined,
    phone: extractPhone(normalized) || undefined,
    currentRole: extractCurrentRole(normalized) || undefined,
    currentCompany: extractCurrentCompany(normalized) || undefined,
    yearsExperience: extractYears(normalized) || undefined,
    topSkills: extractTopSkills(normalized),
    recentProjects: extractProjects(normalized),
    achievements: extractAchievements(normalized),
    certifications: [],
    education: {},
  };
}

export function parseLinkedInText(text: string) {
  const normalized = normalizeText(text);
  const headline = normalized.split("\n").find((line) => line.includes("|")) || normalized.split("\n")[0] || "";
  return {
    headline: headline || undefined,
    about: normalized.slice(0, 400) || undefined,
    skills: extractTopSkills(normalized),
    endorsements: null,
    recommendations: null,
    connectionCount: null,
    activityLevel: "medium" as const,
  };
}
