import { test, expect } from "@playwright/test";
import { mainSponsors } from "./sponsors-data";

test.describe("2025 Sponsors Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/research/2025/sponsors/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | 2025 Sponsors");
  });

  for (const sponsorLevel of mainSponsors) {
    test(`Sponsor Level: ${sponsorLevel.level} is visible`, async ({
      page,
    }) => {
      await expect(
        page.getByRole("heading", {
          name: sponsorLevel.level,
          level: 3,
          exact: true,
        }),
      ).toBeVisible();
    });

    for (const sponsor of sponsorLevel.sponsors) {
      test(`Sponsor: ${sponsor.name} is visible`, async ({ page }) => {
        const link = page.getByRole("link", { name: sponsor.name });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", sponsor.href);
      });
    }
  }
});
