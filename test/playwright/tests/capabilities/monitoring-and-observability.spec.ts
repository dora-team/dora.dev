import { test, expect } from "@playwright/test";

test.describe("Monitoring and observability capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/monitoring-and-observability/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Monitoring and observability");
  });
});
