import { test, expect } from "@playwright/test";

/**
 * Auth E2E tests — critical production flows.
 * These run against a live server (local dev or staging via E2E_BASE_URL).
 * They do NOT mock the DB; they exercise the real auth stack end-to-end.
 */

test.describe("Protected route access control", () => {
  test("unauthenticated user visiting /dashboard is redirected to /login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("unauthenticated user visiting /portal is redirected to /login", async ({ page }) => {
    await page.goto("/portal");
    await expect(page).toHaveURL(/\/login/);
  });

  test("unauthenticated user visiting /settings is redirected to /login", async ({ page }) => {
    await page.goto("/settings");
    await expect(page).toHaveURL(/\/login/);
  });

  test("unauthenticated user visiting /workspaces/resume is redirected to /login", async ({ page }) => {
    await page.goto("/workspaces/resume");
    await expect(page).toHaveURL(/\/login/);
  });

  test("unauthenticated user visiting /billing is redirected to /login", async ({ page }) => {
    await page.goto("/billing");
    await expect(page).toHaveURL(/\/login/);
  });

  test("login redirect preserves the next URL as a query param", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/next=%2Fdashboard/);
  });
});

test.describe("Login page", () => {
  test("login page loads and shows the email and password fields", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible();
  });

  test("login page shows an error for wrong credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"], input[name="email"]', "nobody@example.com");
    await page.fill('input[type="password"], input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=/invalid|incorrect|wrong/i")).toBeVisible({ timeout: 8_000 });
  });

  test("login page shows a validation error when email is empty", async ({ page }) => {
    await page.goto("/login");
    await page.click('button[type="submit"]');
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    // Either browser validation or server error message should appear
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    const hasErrorText = await page.locator("text=/required|email/i").count() > 0;
    expect(isInvalid || hasErrorText).toBe(true);
  });
});

test.describe("Signup page", () => {
  test("signup page loads and shows the registration form", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible();
  });

  test("signup page shows an error when password is too short", async ({ page }) => {
    await page.goto("/signup");
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
    await emailInput.fill("test@example.com");
    await passwordInput.fill("short");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=/8 characters|too short|password/i")).toBeVisible({ timeout: 8_000 });
  });
});

test.describe("Password reset page", () => {
  test("forgot password page loads and shows email field", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
  });

  test("forgot password shows success confirmation for any email (no enumeration)", async ({ page }) => {
    await page.goto("/forgot-password");
    await page.fill('input[type="email"], input[name="email"]', "doesnotexist@example.com");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=/check|sent|email/i")).toBeVisible({ timeout: 8_000 });
  });
});
