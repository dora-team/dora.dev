import { test, expect } from "@playwright/test";

test.describe("Customer feedback capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/customer-feedback/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Customer feedback");
  });
});
