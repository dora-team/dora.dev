import { test, expect } from "@playwright/test";

test.describe("AI Capabilities Model report page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ai/capabilities-model/report/");
  });

  test("has the correct title.", async ({ page }) => {
    await expect(page).toHaveTitle(
      "DORA | DORA AI Capabilities Model report",
    );
  });

  test("has the correct header.", async ({ page }) => {
    const header = page.getByRole("heading", { name: "DORA AI Capabilities Model", exact: true });
    await expect(header).toBeVisible();
  });

  test("does not have the redundant title header.", async ({ page }) => {
    const redundantHeader = page.getByRole("heading", { name: "DORA AI Capabilities Model report", exact: true });
    await expect(redundantHeader).not.toBeVisible();
  });

  test("has the correct download header.", async ({ page }) => {
    const downloadHeader = page.getByRole("heading", { name: "Download the DORA AI Capabilities Model report", exact: true });
    await expect(downloadHeader).toBeVisible();
  });

  test("has the correct report image", async ({ page }) => {
    const reportImage = page.getByRole("img", {
      name: "DORA AI Capabilities Model report",
    });
    await expect(reportImage).toBeVisible();
  });
});
