import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  rateLimit: vi.fn(),
  createPlatformUser: vi.fn(),
  setCurrentUserSessionOnResponse: vi.fn(),
  getClientIp: vi.fn().mockReturnValue("127.0.0.1"),
  sendNewUserNotification: vi.fn().mockResolvedValue(undefined),
  onUserSignedUp: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));
vi.mock("@/lib/platform-users", () => ({ createPlatformUser: mocks.createPlatformUser }));
vi.mock("@/lib/mvp/auth", () => ({ setCurrentUserSessionOnResponse: mocks.setCurrentUserSessionOnResponse }));
vi.mock("@/lib/utils", () => ({ getClientIp: mocks.getClientIp, ensureSameOrigin: () => true }));
vi.mock("@/lib/email", () => ({ sendNewUserNotification: mocks.sendNewUserNotification }));
vi.mock("@/lib/zoho-engine", () => ({ onUserSignedUp: mocks.onUserSignedUp }));

import { POST } from "./route";

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/auth/signup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.rateLimit.mockResolvedValue({ ok: true, retryAt: 0 });
    mocks.setCurrentUserSessionOnResponse.mockImplementation(async (res: Response) => res);
    mocks.createPlatformUser.mockResolvedValue({
      userId: "user_abc",
      profile: { id: "user_abc", email: "jane@example.com", firstName: "Jane", lastName: "D." },
    });
  });

  it("creates account and returns 201 for valid input", async () => {
    const res = await POST(makeRequest({ firstName: "Jane", lastName: "D", email: "jane@example.com", password: "SecurePass1!" }));
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.user).toBeDefined();
    expect(mocks.createPlatformUser).toHaveBeenCalledWith(
      expect.objectContaining({ email: "jane@example.com", firstName: "Jane" })
    );
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await POST(makeRequest({ firstName: "Jane", email: "jane@example.com", password: "SecurePass1!" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/required/i);
  });

  it("returns 400 when password is shorter than 8 characters", async () => {
    const res = await POST(makeRequest({ firstName: "Jane", lastName: "D", email: "jane@example.com", password: "short" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/8 characters/i);
  });

  it("returns 400 when password exceeds 1024 characters", async () => {
    const res = await POST(makeRequest({ firstName: "Jane", lastName: "D", email: "jane@example.com", password: "a".repeat(1025) }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/too long/i);
  });

  it("returns 409 when email is already registered", async () => {
    mocks.createPlatformUser.mockRejectedValue(new Error("Email already in use."));
    const res = await POST(makeRequest({ firstName: "Jane", lastName: "D", email: "existing@example.com", password: "SecurePass1!" }));
    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mocks.rateLimit.mockResolvedValue({ ok: false, retryAt: Date.now() + 60_000 });
    const res = await POST(makeRequest({ firstName: "Jane", lastName: "D", email: "jane@example.com", password: "SecurePass1!" }));
    expect(res.status).toBe(429);
  });

  it("normalizes email to lowercase", async () => {
    await POST(makeRequest({ firstName: "Jane", lastName: "D", email: "JANE@Example.COM", password: "SecurePass1!" }));
    expect(mocks.createPlatformUser).toHaveBeenCalledWith(
      expect.objectContaining({ email: "jane@example.com" })
    );
  });

  it("returns 400 for empty body", async () => {
    const req = new Request("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
