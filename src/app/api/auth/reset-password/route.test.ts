import { beforeEach, describe, expect, it, vi } from "vitest";
import { createHash } from "crypto";

const mocks = vi.hoisted(() => ({
  rateLimit: vi.fn(),
  getClientIp: vi.fn().mockReturnValue("127.0.0.1"),
  prismaTokenFindUnique: vi.fn(),
  prismaTokenUpdate: vi.fn(),
  prismaTransaction: vi.fn(),
  hashPlatformPassword: vi.fn(),
}));

vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));
vi.mock("@/lib/utils", () => ({ getClientIp: mocks.getClientIp }));
vi.mock("@/lib/platform-users", () => ({ hashPlatformPassword: mocks.hashPlatformPassword }));
vi.mock("@/lib/db", () => ({
  prisma: {
    passwordResetToken: {
      findUnique: mocks.prismaTokenFindUnique,
      update: mocks.prismaTokenUpdate,
    },
    user: { update: vi.fn() },
    appSession: { deleteMany: vi.fn() },
    $transaction: mocks.prismaTransaction,
  },
}));

import { POST } from "./route";

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost:3000/api/auth/reset-password", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validToken = "a".repeat(64);
const tokenHash = createHash("sha256").update(validToken).digest("hex");
const validResetToken = {
  tokenHash,
  userId: "user_abc",
  usedAt: null,
  expiresAt: new Date(Date.now() + 60 * 60 * 1000),
  user: { id: "user_abc", email: "jane@example.com" },
};

describe("POST /api/auth/reset-password", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.rateLimit.mockResolvedValue({ ok: true, retryAt: 0 });
    mocks.hashPlatformPassword.mockResolvedValue("hashed_password");
    mocks.prismaTokenUpdate.mockResolvedValue({});
    mocks.prismaTransaction.mockResolvedValue(undefined);
  });

  it("resets password successfully with valid token and strong password", async () => {
    mocks.prismaTokenFindUnique.mockResolvedValue(validResetToken);
    const res = await POST(makeRequest({ token: validToken, password: "NewStrongPass1!" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(mocks.prismaTransaction).toHaveBeenCalled();
  });

  it("returns 400 for a missing token", async () => {
    const res = await POST(makeRequest({ password: "NewStrongPass1!" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/token/i);
  });

  it("returns 400 when password is shorter than 8 characters", async () => {
    const res = await POST(makeRequest({ token: validToken, password: "short" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/8 characters/i);
  });

  it("returns 400 when password exceeds 1024 characters", async () => {
    const res = await POST(makeRequest({ token: validToken, password: "a".repeat(1025) }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/too long/i);
  });

  it("returns 400 for an invalid or unknown token", async () => {
    mocks.prismaTokenFindUnique.mockResolvedValue(null);
    const res = await POST(makeRequest({ token: "invalid-token", password: "NewStrongPass1!" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/invalid|used/i);
  });

  it("returns 400 for an already-used token", async () => {
    mocks.prismaTokenFindUnique.mockResolvedValue({ ...validResetToken, usedAt: new Date() });
    const res = await POST(makeRequest({ token: validToken, password: "NewStrongPass1!" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/already been used/i);
  });

  it("returns 400 for an expired token", async () => {
    mocks.prismaTokenFindUnique.mockResolvedValue({
      ...validResetToken,
      expiresAt: new Date(Date.now() - 1000),
    });
    const res = await POST(makeRequest({ token: validToken, password: "NewStrongPass1!" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/expired/i);
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mocks.rateLimit.mockResolvedValue({ ok: false, retryAt: Date.now() + 60_000 });
    const res = await POST(makeRequest({ token: validToken, password: "NewStrongPass1!" }));
    expect(res.status).toBe(429);
    expect(mocks.prismaTokenFindUnique).not.toHaveBeenCalled();
  });

  it("invalidates all sessions for the user after password reset", async () => {
    mocks.prismaTokenFindUnique.mockResolvedValue(validResetToken);
    await POST(makeRequest({ token: validToken, password: "NewStrongPass1!" }));
    const txCall = mocks.prismaTransaction.mock.calls[0][0];
    expect(txCall).toHaveLength(3);
  });
});
