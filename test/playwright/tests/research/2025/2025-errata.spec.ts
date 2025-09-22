import { test, expect } from "@playwright/test";
import { sidebarLinks } from "../sidebarLinks";

test.describe("2025 research errata", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/research/2025/errata/");
  });

  test("has the correct title.", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | DORA Research: 2025 Errata");
  });

  test("has the correct header.", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("DORA Research: 2025");
  });

  test("has the correct sidebar.", async ({ page }) => {
    for (const sidebarLink of sidebarLinks) {
      await expect(
        page.getByRole("link", { name: sidebarLink, exact: true }),
      ).toBeVisible();
    }
  });
});

