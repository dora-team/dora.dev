import { test, expect } from "@playwright/test";

test.describe("Empowering teams to choose tools capability", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/capabilities/teams-empowered-to-choose-tools/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Capabilities: Empowering teams to choose tools");
  });
});
