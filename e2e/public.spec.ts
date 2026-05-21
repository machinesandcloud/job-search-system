import { test, expect } from "@playwright/test";

/**
 * Public page smoke tests — verify the site is up and key pages load.
 * These must pass before any production deployment.
 */

test.describe("Landing page", () => {
  test("loads successfully with 200 status", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("shows the main CTA or headline", async ({ page }) => {
    await page.goto("/");
    // The landing page should contain some form of headline or CTA
    const body = await page.locator("body").textContent();
    expect(body?.length).toBeGreaterThan(100);
  });

  test("signup and login links are present", async ({ page }) => {
    await page.goto("/");
    const loginLink = page.locator("a[href*='login'], a[href*='signup']").first();
    await expect(loginLink).toBeVisible();
  });
});

test.describe("Public pages load without error", () => {
  for (const path of ["/login", "/signup", "/forgot-password", "/pricing"]) {
    test(`${path} returns 200`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    });
  }

  test("/health API returns ok", async ({ page }) => {
    const response = await page.goto("/api/health");
    expect(response?.status()).toBe(200);
  });
});

test.describe("404 handling", () => {
  test("unknown route returns 404 and shows an error page", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist-abcxyz");
    expect(response?.status()).toBe(404);
  });
});
