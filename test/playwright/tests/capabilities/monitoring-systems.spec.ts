import { test, expect } from "@playwright/test";

test.describe("Monitoring systems capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/monitoring-systems/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Monitoring systems to inform business decisions");
  });
});
