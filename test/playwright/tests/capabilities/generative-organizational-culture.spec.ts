import { test, expect } from "@playwright/test";

test.describe("Generative organizational culture capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/generative-organizational-culture/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Generative organizational culture");
  });
});
