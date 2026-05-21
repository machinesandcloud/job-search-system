import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  rateLimit: vi.fn(),
  authenticatePlatformUser: vi.fn(),
  setCurrentUserSessionOnResponse: vi.fn(),
  getClientIp: vi.fn().mockReturnValue("127.0.0.1"),
}));

vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));
vi.mock("@/lib/platform-users", () => ({ authenticatePlatformUser: mocks.authenticatePlatformUser }));
vi.mock("@/lib/mvp/auth", () => ({ setCurrentUserSessionOnResponse: mocks.setCurrentUserSessionOnResponse }));
vi.mock("@/lib/utils", () => ({ getClientIp: mocks.getClientIp }));

import { POST } from "./route";

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const fakeUser = {
  userId: "user_abc",
  profile: { id: "user_abc", email: "jane@example.com", firstName: "Jane" },
};

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.rateLimit.mockResolvedValue({ ok: true, retryAt: 0 });
    mocks.setCurrentUserSessionOnResponse.mockImplementation(async (res: Response) => res);
  });

  it("returns 200 and user profile for valid credentials", async () => {
    mocks.authenticatePlatformUser.mockResolvedValue(fakeUser);
    const res = await POST(makeRequest({ email: "jane@example.com", password: "correct-password" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.user).toBeDefined();
    expect(mocks.setCurrentUserSessionOnResponse).toHaveBeenCalled();
  });

  it("returns 401 for wrong password", async () => {
    mocks.authenticatePlatformUser.mockResolvedValue(null);
    const res = await POST(makeRequest({ email: "jane@example.com", password: "wrong-password" }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/invalid/i);
  });

  it("returns 401 for unknown email", async () => {
    mocks.authenticatePlatformUser.mockResolvedValue(null);
    const res = await POST(makeRequest({ email: "nobody@example.com", password: "any-password" }));
    expect(res.status).toBe(401);
  });

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest({ password: "correct-password" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/required/i);
  });

  it("returns 400 when password is missing", async () => {
    const res = await POST(makeRequest({ email: "jane@example.com" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/required/i);
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mocks.rateLimit.mockResolvedValue({ ok: false, retryAt: Date.now() + 60_000 });
    const res = await POST(makeRequest({ email: "jane@example.com", password: "correct-password" }));
    expect(res.status).toBe(429);
    expect(mocks.authenticatePlatformUser).not.toHaveBeenCalled();
  });

  it("normalizes email to lowercase before authenticating", async () => {
    mocks.authenticatePlatformUser.mockResolvedValue(fakeUser);
    await POST(makeRequest({ email: "JANE@EXAMPLE.COM", password: "correct-password" }));
    expect(mocks.authenticatePlatformUser).toHaveBeenCalledWith("jane@example.com", "correct-password");
  });

  it("does not set session cookie on failed login", async () => {
    mocks.authenticatePlatformUser.mockResolvedValue(null);
    await POST(makeRequest({ email: "jane@example.com", password: "wrong-password" }));
    expect(mocks.setCurrentUserSessionOnResponse).not.toHaveBeenCalled();
  });
});
