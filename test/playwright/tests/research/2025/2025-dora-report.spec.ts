import { test, expect } from "@playwright/test";
import { sidebarLinks } from "../sidebarLinks";

test.describe("2025 report page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/research/2025/dora-report/");
  });

  test("has the correct title.", async ({ page }) => {
    await expect(page).toHaveTitle(
      "DORA | State of AI-assisted Sotware Development 2025",
    );
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

  test("has the correct report image", async ({ page }) => {
    const reportImage = page.locator(
      'img[src="2025-state-of-ai-assisted-software-development-report.png"]',
    );
    await expect(reportImage).toBeVisible();
    await expect(reportImage).toHaveAttribute(
      "alt",
      "State of AI-assisted Sotware Development 2025",
    );
  });
});
