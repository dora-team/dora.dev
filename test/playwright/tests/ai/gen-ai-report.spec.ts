import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/ai/gen-ai-report/");
});

test("Gen AI report page has the correct title.", async ({ page }) => {
  await expect(page).toHaveTitle(
    "DORA | Impact of Generative AI in Software Development",
  );
});

test("Gen AI report page has the correct header.", async ({ page }) => {
  await expect(page.locator('h1').filter({ hasText: "Impact of Generative AI in Software Development" })).toBeVisible();
});

test("Gen AI report page has the correct report image", async ({ page }) => {
  const reportImage = page.locator(
    'img[src="dora-impact-of-generative-ai-in-software-development-report.png"]',
  );
  await expect(reportImage).toBeVisible();
  await expect(reportImage).toHaveAttribute(
    "alt",
    "Impact of Generative AI in Software Development",
  );
});

test("Gen AI report page has the correct download button", async ({ page }) => {
  const downloadLink = page.getByRole("link", { name: "Download the report" });
  await expect(downloadLink).toBeVisible();
  await expect(downloadLink).toHaveAttribute(
    "href",
    "dora-impact-of-generative-ai-in-software-development.pdf",
  );
});
