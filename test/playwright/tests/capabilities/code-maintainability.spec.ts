import { test, expect } from "@playwright/test";

test.describe("Code maintainability capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/code-maintainability/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Code maintainability");
  });
});
