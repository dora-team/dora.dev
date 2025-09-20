import { test, expect } from "@playwright/test";
import { sidebarLinks } from "../sidebarLinks";
import { reportSponsors } from "./sponsors-data";

test.describe("2025 report page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/research/2025/dora-report/");
  });

  test("has the correct title.", async ({ page }) => {
    await expect(page).toHaveTitle(
      "DORA | State of AI-assisted Software Development 2025",
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
      "State of AI-assisted Software Development 2025",
    );
  });
  test("Research Partners section is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Research Partners", level: 3 }),
    ).toBeVisible();
  });

  for (const sponsorLevel of reportSponsors) {
    test(`Sponsor Level: ${sponsorLevel.level} is visible`, async ({
      page,
    }) => {
      await expect(
        page.getByRole("heading", {
          name: sponsorLevel.level,
          level: 4,
          exact: true,
        }),
      ).toBeVisible();
    });

    for (const sponsor of sponsorLevel.sponsors) {
      test(`Sponsor: ${sponsor.name} is visible`, async ({ page }) => {
        const link = page.getByRole("link", { name: sponsor.name });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", sponsor.href);

        if (sponsor.description) {
          await expect(
            page.locator("p", { hasText: sponsor.description }),
          ).toBeVisible();
        }
      });
    }
  }
});
