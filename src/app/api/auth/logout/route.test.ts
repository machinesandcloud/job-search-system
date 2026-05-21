import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  clearCurrentUserSession: vi.fn(),
}));

vi.mock("@/lib/mvp/auth", () => ({
  clearCurrentUserSession: mocks.clearCurrentUserSession,
  sessionCookieName: "zari_session",
}));

import { POST } from "./route";

describe("POST /api/auth/logout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.clearCurrentUserSession.mockResolvedValue(undefined);
  });

  it("clears the user session", async () => {
    const req = new Request("http://localhost:3000/api/auth/logout", { method: "POST" });
    await POST(req);
    expect(mocks.clearCurrentUserSession).toHaveBeenCalledTimes(1);
  });

  it("redirects to /login after logout", async () => {
    const req = new Request("http://localhost:3000/api/auth/logout", { method: "POST" });
    const res = await POST(req);
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toMatch(/\/login/);
  });

  it("expires the session cookie in the redirect response", async () => {
    const req = new Request("http://localhost:3000/api/auth/logout", { method: "POST" });
    const res = await POST(req);
    const setCookie = res.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain("zari_session=");
    expect(setCookie).toMatch(/max-age=0/i);
  });
});
