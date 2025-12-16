import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/research/2025/");
});

test("2025 research overview has the correct title.", async ({ page }) => {
  await expect(page).toHaveTitle("DORA | DORA Research: 2025 Overview");
});

test("2025 research overview has the correct header.", async ({ page }) => {
  await expect(page.locator("h1")).toContainText("DORA Research: 2025");
});
