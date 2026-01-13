import { test, expect } from "@playwright/test";

test.describe("Visual management capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/visual-management/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Visual management");
  });
});
