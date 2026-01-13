import { test, expect } from "@playwright/test";

test.describe("Streamlining change approval capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/streamlining-change-approval/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Streamlining change approval");
  });
});
