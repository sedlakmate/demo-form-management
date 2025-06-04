import { test, expect } from "@playwright/test";

const BASE_URL = process.env.E2E_BASE_URL || "http://localhost:3000";
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

test.describe("Admin Login", () => {
  test("should login as admin", async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/login`);
    await expect(
      page.getByRole("heading", { name: /admin login/i }),
    ).toBeVisible();
    await page.getByLabel("Email").fill(ADMIN_EMAIL);
    await page.getByLabel("Password").fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: /login/i }).click();
    // Wait for redirect
    await page.waitForURL(`${BASE_URL}/admin/forms`);
    await expect(
      page.getByRole("heading", { name: /form management/i }),
    ).toBeVisible();
  });
});
