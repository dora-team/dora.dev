import { test, expect } from "@playwright/test";

test.describe("Transformational leadership capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/transformational-leadership/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Transformational leadership");
  });
});
