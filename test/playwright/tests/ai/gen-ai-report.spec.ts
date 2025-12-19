import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/ai/gen-ai-report/report/");
});

test("Gen AI report page has the correct title.", async ({ page }) => {
  await expect(page).toHaveTitle(
    "DORA | Download the Impact of Generative AI in Software Development",
  );
});

test("Gen AI report page has the correct header.", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Impact of Generative AI in Software Development", exact: true, level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Download the Impact of Generative AI in Software Development", exact: true, level: 2 })).toBeVisible();
});

test("Gen AI report page has the correct report image", async ({ page }) => {
  const reportImage = page.locator(
    'img[src="/ai/gen-ai-report/dora-impact-of-generative-ai-in-software-development-report.png"]',
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
    "/ai/gen-ai-report/dora-impact-of-generative-ai-in-software-development.pdf",
  );
});
