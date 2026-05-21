import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  rateLimit: vi.fn(),
  getClientIp: vi.fn().mockReturnValue("127.0.0.1"),
  prismaUserFindFirst: vi.fn(),
  prismaTokenDeleteMany: vi.fn(),
  prismaTokenCreate: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
}));

vi.mock("@/lib/rate-limit", () => ({ rateLimit: mocks.rateLimit }));
vi.mock("@/lib/utils", () => ({ getClientIp: mocks.getClientIp }));
vi.mock("@/lib/email", () => ({ sendPasswordResetEmail: mocks.sendPasswordResetEmail }));
vi.mock("@/lib/db", () => ({
  prisma: {
    user: { findFirst: mocks.prismaUserFindFirst },
    passwordResetToken: {
      deleteMany: mocks.prismaTokenDeleteMany,
      create: mocks.prismaTokenCreate,
    },
  },
}));

import { POST } from "./route";

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost:3000/api/auth/forgot-password", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const fakeUser = { id: "user_abc", email: "jane@example.com" };

describe("POST /api/auth/forgot-password", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.rateLimit.mockResolvedValue({ ok: true, retryAt: 0 });
    mocks.prismaTokenDeleteMany.mockResolvedValue({ count: 0 });
    mocks.prismaTokenCreate.mockResolvedValue({});
    mocks.sendPasswordResetEmail.mockResolvedValue(undefined);
  });

  it("returns 200 ok when email belongs to a known user", async () => {
    mocks.prismaUserFindFirst.mockResolvedValue(fakeUser);
    const res = await POST(makeRequest({ email: "jane@example.com" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(mocks.sendPasswordResetEmail).toHaveBeenCalledWith("jane@example.com", expect.any(String));
  });

  it("returns 200 ok even for unknown email (prevents enumeration)", async () => {
    mocks.prismaUserFindFirst.mockResolvedValue(null);
    const res = await POST(makeRequest({ email: "nobody@example.com" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(mocks.sendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/valid email/i);
  });

  it("returns 400 for missing email", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("invalidates existing reset tokens before creating a new one", async () => {
    mocks.prismaUserFindFirst.mockResolvedValue(fakeUser);
    await POST(makeRequest({ email: "jane@example.com" }));
    expect(mocks.prismaTokenDeleteMany).toHaveBeenCalledWith({ where: { userId: fakeUser.id } });
    expect(mocks.prismaTokenCreate).toHaveBeenCalled();
  });

  it("silently rate-limits without revealing the limit was hit", async () => {
    mocks.rateLimit.mockResolvedValue({ ok: false, retryAt: Date.now() + 60_000 });
    const res = await POST(makeRequest({ email: "jane@example.com" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(mocks.prismaUserFindFirst).not.toHaveBeenCalled();
  });
});
