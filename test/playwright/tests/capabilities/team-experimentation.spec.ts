import { test, expect } from "@playwright/test";

test.describe("Team experimentation capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/team-experimentation/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Team experimentation");
  });
});
