import { test, expect } from "@playwright/test";
import { LAST_UPDATED_DATE_REGEX } from "../constants";

test.describe("Working in small batches capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/working-in-small-batches/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Working in small batches");
  });

  test("has the correct header", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Working in small batches");
  });

  test("displays its last updated date", async ({ page }) => {
    await expect(page.locator(".updated")).toContainText(
      LAST_UPDATED_DATE_REGEX,
    );
  });

  test('is a core capability.', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();
  });

  test("is an AI capability", async ({ page }) => {
    await expect(page.locator(".labels")).toContainText("AI");
    await expect(page.locator("h1").getByRole('link', { name: 'AI', exact: true })).toBeVisible();
  });
});
