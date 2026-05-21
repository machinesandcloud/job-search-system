import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next/headers", () => ({ cookies: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("next/server", () => ({
  NextResponse: { json: vi.fn() },
}));
vi.mock("@/lib/billing", () => ({
  DEFAULT_COACH_ADMIN_EMAIL: "admin@example.com",
  ensureCoachAdminUser: vi.fn(),
  getCoachAdminRole: vi.fn().mockReturnValue("admin"),
  normalizeCoachAdminIdentityEmail: vi.fn().mockImplementation((e: string) => e.toLowerCase().trim()),
}));

import { verifyCoachAdminPassword, getCoachAdminBetaAutoLoginConfig } from "./coach-admin-auth";

afterEach(() => {
  delete process.env.COACH_ADMIN_PASSWORD;
  delete process.env.COACH_ADMIN_BETA_AUTO_LOGIN;
  delete process.env.COACH_ADMIN_EMAIL_ALLOWLIST;
});

describe("verifyCoachAdminPassword", () => {
  it("returns true for a correct password", () => {
    process.env.COACH_ADMIN_PASSWORD = "correct-password";
    expect(verifyCoachAdminPassword("correct-password")).toBe(true);
  });

  it("returns false for an incorrect password", () => {
    process.env.COACH_ADMIN_PASSWORD = "correct-password";
    expect(verifyCoachAdminPassword("wrong-password")).toBe(false);
  });

  it("returns false when COACH_ADMIN_PASSWORD is not set", () => {
    expect(verifyCoachAdminPassword("any-password")).toBe(false);
  });

  it("returns false for empty string even if env matches", () => {
    process.env.COACH_ADMIN_PASSWORD = "";
    expect(verifyCoachAdminPassword("")).toBe(false);
  });
});

describe("getCoachAdminBetaAutoLoginConfig", () => {
  it("returns null in production regardless of env", () => {
    process.env.COACH_ADMIN_BETA_AUTO_LOGIN = "true";
    process.env.COACH_ADMIN_EMAIL_ALLOWLIST = "admin@example.com";
    const original = process.env.NODE_ENV;
    (process.env as Record<string, string>).NODE_ENV = "production";
    expect(getCoachAdminBetaAutoLoginConfig()).toBeNull();
    (process.env as Record<string, string>).NODE_ENV = original;
  });

  it("returns null when COACH_ADMIN_BETA_AUTO_LOGIN is not set", () => {
    expect(getCoachAdminBetaAutoLoginConfig()).toBeNull();
  });

  it("returns null when COACH_ADMIN_BETA_AUTO_LOGIN is falsy", () => {
    process.env.COACH_ADMIN_BETA_AUTO_LOGIN = "false";
    expect(getCoachAdminBetaAutoLoginConfig()).toBeNull();
  });
});
