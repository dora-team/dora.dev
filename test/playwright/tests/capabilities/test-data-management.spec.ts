import { test, expect } from "@playwright/test";

test.describe("Test data management capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/test-data-management/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Test data management");
  });
});
