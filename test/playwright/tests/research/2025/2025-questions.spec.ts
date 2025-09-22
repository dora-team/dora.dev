import { test, expect } from "@playwright/test";
import { sidebarLinks } from "../sidebarLinks";

test.beforeEach(async ({ page }) => {
  await page.goto("/research/2025/questions/");
});

test("2025 questions page has the correct title.", async ({ page }) => {
  await expect(page).toHaveTitle("DORA | DORA Research Questions");
});

test("2025 questions page has the correct header.", async ({ page }) => {
  await expect(page.locator("h1")).toContainText("DORA Research: 2025");
});

test("2025 questions page lists the correct report.", async ({ page }) => {
  await expect(page.locator("h4")).toContainText(
    "Responses to the following questions were used in the analysis published in the 2025 State of AI-assisted Software Development report.",
  );
});

test("2025 questions page has the correct sidebar.", async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(
      page.getByRole("link", { name: sidebarLink, exact: true }),
    ).toBeVisible();
  }
});
