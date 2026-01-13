import { test, expect } from "@playwright/test";

test.describe("Dora Joins Google Cloud news page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/news/dora-joins-google-cloud/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | DORA Joins Google Cloud");
  });
});
