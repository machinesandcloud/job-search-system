import { describe, expect, it } from "vitest";
import { acceptanceExpiresAt, acceptancePhase, acceptanceResponse } from "./mc-acceptance";

const beforeExpiry = Date.parse("2026-10-23T22:00:00Z");
const base = "https://zaricoach.com/mc-front-desk-acceptance-20261023";
const query = `?client=mc-acceptance-zari-a123&phase=${acceptancePhase}`;
const configuredClient = "mc-acceptance-zari-a123";

describe("temporary installation page", () => {
  it("serves only the controlled public slug, without layout or tracking", async () => {
    const response = acceptanceResponse(base + query, beforeExpiry, configuredClient);
    const html = await response.text();
    expect(response.status).toBe(200);
    expect(html.match(/<script /g)).toHaveLength(1);
    expect(html).toContain('src="https://machinesandcloud.com/embed.js" data-client="mc-acceptance-zari-a123" async');
    expect(html).not.toMatch(/api\/track|_next|stripe|gtag|analytics|iframe|challenge|ownerToken/);
    expect(response.headers.get("cache-control")).toContain("no-store");
    expect(response.headers.get("x-robots-tag")).toContain("noindex");
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
    const csp = response.headers.get("content-security-policy")!;
    expect(csp).toContain("script-src https://machinesandcloud.com;");
    expect(csp).toContain("connect-src https://machinesandcloud.com;");
    expect(csp).not.toContain("script-src 'unsafe-inline'");
    expect(csp).toContain("form-action 'none'");
  });

  it.each([
    "", "?client=mc-acceptance-zari-a123", "?phase=" + acceptancePhase,
    query.replace("a123", "AAAA"), query.replace("mc-acceptance-zari", "another-shop"),
    query.replace(acceptancePhase, "old-phase"), query + "&client=mc-acceptance-zari-b456",
    query + "&phase=" + acceptancePhase, query + "&token=secret",
    query.replace("a123", '%22%3E%3Cscript%3Ealert(1)%3C/script%3E'),
  ])("rejects an unconfigured or unexpected address: %s", async (suffix) => {
    const response = acceptanceResponse(base + suffix, beforeExpiry, configuredClient);
    expect(response.status).toBe(400);
    const html = await response.text();
    expect(html).not.toContain("<script");
    expect(html).not.toContain("alert(1)");
  });

  it("stops serving the embed at the expiry boundary, regardless of query", async () => {
    for (const now of [Date.parse(acceptanceExpiresAt), Date.parse(acceptanceExpiresAt) + 1]) {
      const response = acceptanceResponse(base + query, now, configuredClient);
      expect(response.status).toBe(410);
      expect(await response.text()).not.toContain("<script");
    }
  });

  it("does not load a matching-prefix tenant unless it is the exact configured workspace", async () => {
    for (const selected of ["", "invalid", "mc-acceptance-zari-b456"]) {
      const response = acceptanceResponse(base + query, beforeExpiry, selected);
      expect(response.status).toBe(400);
      expect(await response.text()).not.toContain("<script");
    }
  });
});
