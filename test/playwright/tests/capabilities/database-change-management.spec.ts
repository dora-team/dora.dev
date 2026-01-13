import { test, expect } from "@playwright/test";

test.describe("Database change management capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/database-change-management/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Database change management");
  });
});
