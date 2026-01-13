import { test, expect } from "@playwright/test";

test.describe("Deployment automation capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/deployment-automation/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Deployment automation");
  });
});
