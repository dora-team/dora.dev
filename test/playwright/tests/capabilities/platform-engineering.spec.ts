import { test, expect } from "@playwright/test";
import { LAST_UPDATED_DATE_REGEX } from "../constants";

test.describe("Platform engineering capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/platform-engineering/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Platform Engineering");
  });

  test("has the correct header", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Platform Engineering");
  });

  test("displays its last updated date", async ({ page }) => {
    await expect(page.locator(".updated")).toContainText(
      LAST_UPDATED_DATE_REGEX,
    );
  });

  test("is an AI capability", async ({ page }) => {
    await expect(page.locator(".labels")).toContainText("AI");
    await expect(page.locator("h1").getByRole('link', { name: 'AI', exact: true })).toBeVisible();
  });
});
