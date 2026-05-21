import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getCurrentUserId: vi.fn(),
  getUserById: vi.fn(),
}));

vi.mock("@/lib/mvp/auth", () => ({ getCurrentUserId: mocks.getCurrentUserId }));
vi.mock("@/lib/mvp/store", () => ({ getUserById: mocks.getUserById }));

import { POST } from "./route";

const fakeUser = {
  userId: "user_abc",
  profile: { id: "user_abc", email: "jane@example.com", firstName: "Jane" },
};

describe("POST /api/auth/session", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 with user profile when session is valid", async () => {
    mocks.getCurrentUserId.mockResolvedValue("user_abc");
    mocks.getUserById.mockResolvedValue(fakeUser);
    const res = await POST();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe("jane@example.com");
  });

  it("returns 401 when no session cookie is present", async () => {
    mocks.getCurrentUserId.mockResolvedValue(null);
    const res = await POST();
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/not authenticated/i);
  });

  it("returns 401 when session userId resolves to no user", async () => {
    mocks.getCurrentUserId.mockResolvedValue("user_abc");
    mocks.getUserById.mockResolvedValue(null);
    const res = await POST();
    expect(res.status).toBe(401);
  });

  it("does not expose internal server errors as session data", async () => {
    mocks.getCurrentUserId.mockRejectedValue(new Error("DB connection failed"));
    await expect(POST()).rejects.toThrow();
  });
});
