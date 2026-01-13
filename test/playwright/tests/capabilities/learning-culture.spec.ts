import { test, expect } from "@playwright/test";

test.describe("Learning culture capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/learning-culture/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Learning culture");
  });
});
