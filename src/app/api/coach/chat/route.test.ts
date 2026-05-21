import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getCurrentUserId: vi.fn(),
  isDatabaseReady: vi.fn(),
  legacyPrisma: { assessment: { findUnique: vi.fn() } },
  groqChatText: vi.fn(),
  ensureSameOrigin: vi.fn(),
}));

vi.mock("@/lib/mvp/auth", () => ({
  getCurrentUserId: mocks.getCurrentUserId,
}));

vi.mock("@/lib/db", () => ({
  isDatabaseReady: mocks.isDatabaseReady,
  legacyPrisma: mocks.legacyPrisma,
}));

vi.mock("@/lib/llm", () => ({
  groqChatText: mocks.groqChatText,
}));

vi.mock("@/lib/utils", () => ({
  ensureSameOrigin: mocks.ensureSameOrigin,
}));

import { POST } from "./route";

describe("POST /api/coach/chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.ensureSameOrigin.mockReturnValue(true);
    mocks.isDatabaseReady.mockReturnValue(true);
  });

  function makeRequest(body: Record<string, unknown> = {}) {
    return new Request("http://localhost:3000/api/coach/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  it("returns 401 when user is not authenticated", async () => {
    mocks.getCurrentUserId.mockResolvedValue(null);
    const res = await POST(makeRequest({ assessmentId: "a1", message: "hello" }));
    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toMatchObject({ error: "Unauthorized" });
  });

  it("returns 400 when assessmentId is missing", async () => {
    mocks.getCurrentUserId.mockResolvedValue("user_123");
    const res = await POST(makeRequest({ message: "hello" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when message is missing", async () => {
    mocks.getCurrentUserId.mockResolvedValue("user_123");
    const res = await POST(makeRequest({ assessmentId: "a1" }));
    expect(res.status).toBe(400);
  });

  it("returns 403 when origin check fails", async () => {
    mocks.ensureSameOrigin.mockReturnValue(false);
    const res = await POST(makeRequest({ assessmentId: "a1", message: "hello" }));
    expect(res.status).toBe(403);
  });

  it("returns AI message for authenticated request", async () => {
    mocks.getCurrentUserId.mockResolvedValue("user_123");
    mocks.legacyPrisma.assessment.findUnique.mockResolvedValue({
      targetRoles: ["SWE"],
      level: "mid",
      compTarget: 150000,
      timeline: "6mo",
      hoursPerWeek: 10,
      targetCompanies: [],
      resumeParsedData: {},
      linkedinParsedData: {},
      aiInsights: {},
    });
    mocks.groqChatText.mockResolvedValue("Focus on your system design skills.");

    const res = await POST(makeRequest({ assessmentId: "a1", message: "what should I improve?" }));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({
      message: "Focus on your system design skills.",
      aiEnabled: true,
    });
  });
});
