import { test, expect } from "@playwright/test";

test.describe("Pervasive security capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/pervasive-security/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Pervasive security");
  });
});
