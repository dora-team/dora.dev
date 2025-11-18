import { test, expect } from "@playwright/test";
import { sidebarLinks } from "../sidebarLinks";

const pages = [
  {
    url: "/research/2025/ai-capabilities-model/",
    header: "DORA Research: 2025",
  },
  {
    url: "/research/ai/ai-capabilities-model/",
    header: "DORA Research: Artificial Intelligence",
  },
];

for (const pageConfig of pages) {
  test.describe(`Report page at ${pageConfig.url}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(pageConfig.url);
    });

    test("has the correct title.", async ({ page }) => {
      await expect(page).toHaveTitle(
        "DORA | DORA AI Capabilities Model Report",
      );
    });

    test("has the correct header.", async ({ page }) => {
      await expect(page.locator("h1")).toContainText(pageConfig.header);
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
        'img[src="/research/shared/ai-capabilities-model-report/2025-dora-ai-capabilities-model-report.png"]',
      );
      await expect(reportImage).toBeVisible();
      await expect(reportImage).toHaveAttribute(
        "alt",
        "DORA AI Capabilities Model report",
      );
    });
  });
}
