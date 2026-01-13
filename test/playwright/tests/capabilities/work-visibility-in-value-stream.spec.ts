import { test, expect } from "@playwright/test";

test.describe("Visibility of work in the value stream capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/work-visibility-in-value-stream/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Visibility of work in the value stream");
  });
});
