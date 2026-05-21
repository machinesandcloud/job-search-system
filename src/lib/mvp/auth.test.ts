import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/headers before importing auth
const mocks = vi.hoisted(() => ({
  cookieGet: vi.fn(),
  prismaFindUnique: vi.fn(),
  prismaDeleteMany: vi.fn(),
  isDatabaseReady: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({ get: mocks.cookieGet }),
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    appSession: {
      findUnique: mocks.prismaFindUnique,
      deleteMany: mocks.prismaDeleteMany,
    },
  },
  isDatabaseReady: mocks.isDatabaseReady,
}));

import { getCurrentUserId, sessionCookieName } from "./auth";

const VALID_USER_ID = "user_abc";
const VALID_TOKEN = "a".repeat(64);
const VALID_COOKIE = `${VALID_USER_ID}.${VALID_TOKEN}`;

describe("getCurrentUserId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.isDatabaseReady.mockReturnValue(true);
  });

  it("returns userId for a valid, non-expired session", async () => {
    mocks.cookieGet.mockReturnValue({ value: VALID_COOKIE });
    mocks.prismaFindUnique.mockResolvedValue({
      userId: VALID_USER_ID,
      expiresAt: new Date(Date.now() + 60_000),
    });
    const result = await getCurrentUserId();
    expect(result).toBe(VALID_USER_ID);
  });

  it("returns null when no session cookie is present", async () => {
    mocks.cookieGet.mockReturnValue(undefined);
    const result = await getCurrentUserId();
    expect(result).toBeNull();
    expect(mocks.prismaFindUnique).not.toHaveBeenCalled();
  });

  it("returns null when session is not found in DB", async () => {
    mocks.cookieGet.mockReturnValue({ value: VALID_COOKIE });
    mocks.prismaFindUnique.mockResolvedValue(null);
    const result = await getCurrentUserId();
    expect(result).toBeNull();
  });

  it("returns null and deletes session when session is expired", async () => {
    mocks.cookieGet.mockReturnValue({ value: VALID_COOKIE });
    mocks.prismaFindUnique.mockResolvedValue({
      userId: VALID_USER_ID,
      expiresAt: new Date(Date.now() - 1000),
    });
    mocks.prismaDeleteMany.mockResolvedValue({ count: 1 });
    const result = await getCurrentUserId();
    expect(result).toBeNull();
    expect(mocks.prismaDeleteMany).toHaveBeenCalled();
  });

  it("returns null when cookie userId does not match session userId", async () => {
    mocks.cookieGet.mockReturnValue({ value: `different_user.${VALID_TOKEN}` });
    mocks.prismaFindUnique.mockResolvedValue({
      userId: VALID_USER_ID,
      expiresAt: new Date(Date.now() + 60_000),
    });
    const result = await getCurrentUserId();
    expect(result).toBeNull();
  });

  it("returns null and does not throw when DB is unavailable", async () => {
    mocks.cookieGet.mockReturnValue({ value: VALID_COOKIE });
    mocks.prismaFindUnique.mockRejectedValue(new Error("Connection refused"));
    const result = await getCurrentUserId();
    expect(result).toBeNull();
  });

  it("returns null when DB is not ready (falls back to userId-only cookie)", async () => {
    mocks.isDatabaseReady.mockReturnValue(false);
    mocks.cookieGet.mockReturnValue({ value: VALID_COOKIE });
    const result = await getCurrentUserId();
    expect(result).toBeNull();
    expect(mocks.prismaFindUnique).not.toHaveBeenCalled();
  });

  it("returns null for a cookie with no token segment (no-DB fallback format)", async () => {
    mocks.isDatabaseReady.mockReturnValue(true);
    mocks.cookieGet.mockReturnValue({ value: VALID_USER_ID });
    const result = await getCurrentUserId();
    expect(result).toBeNull();
  });
});

describe("sessionCookieName", () => {
  it("is zari_session", () => {
    expect(sessionCookieName).toBe("zari_session");
  });
});
