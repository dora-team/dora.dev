import { test, expect } from "@playwright/test";

test.describe("Trunk-based development capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/trunk-based-development/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Trunk-based development");
  });
});
