import { describe, it, expect } from "vitest";
import { ensureSameOrigin } from "./utils";

function makeRequest(method: string, headers: Record<string, string>) {
  return new Request("http://example.com/api/test", { method, headers });
}

describe("ensureSameOrigin", () => {
  it("allows GET with no Origin header", () => {
    expect(ensureSameOrigin(makeRequest("GET", { host: "example.com" }))).toBe(true);
  });

  it("allows HEAD with no Origin header", () => {
    expect(ensureSameOrigin(makeRequest("HEAD", { host: "example.com" }))).toBe(true);
  });

  it("rejects POST with no Origin header", () => {
    expect(ensureSameOrigin(makeRequest("POST", { host: "example.com" }))).toBe(false);
  });

  it("allows POST with matching origin and host", () => {
    expect(
      ensureSameOrigin(makeRequest("POST", { host: "example.com", origin: "https://example.com" }))
    ).toBe(true);
  });

  it("rejects POST with mismatched origin", () => {
    expect(
      ensureSameOrigin(makeRequest("POST", { host: "example.com", origin: "https://evil.com" }))
    ).toBe(false);
  });

  it("rejects POST with malformed origin URL", () => {
    expect(
      ensureSameOrigin(makeRequest("POST", { host: "example.com", origin: "not-a-url" }))
    ).toBe(false);
  });

  it("rejects when origin is present but host header is absent", () => {
    expect(
      ensureSameOrigin(makeRequest("POST", { origin: "https://example.com" }))
    ).toBe(false);
  });
});
