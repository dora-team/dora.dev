import { test, expect } from '@playwright/test';

test.describe('ROI of AI report page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai/roi/report/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/ROI of AI-assisted Software Development report/);
  });

  test('has the correct header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'ROI of AI-assisted Software Development report', exact: true })).toBeVisible();
  });

  test("has the correct report image", async ({ page }) => {
    const reportImage = page.getByRole("img", {
      name: "ROI of AI-assisted Software Development report",
    });

    await expect(reportImage).toBeVisible();

    await expect(reportImage.locator("..")).toHaveAttribute(
      "href",
      "https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development",
    );
  });

  test('has button to download the report.', async ({ page }) => {
    const downloadButton = page.getByRole('link', { name: 'Get the report' }).first();
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toHaveAttribute('href', 'https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development');
  });

  test('does not show the research note', async ({ page }) => {
    await expect(page.locator('.research-note')).toBeHidden();
    await expect(page.getByText('Prior to 2018, research was conducted in partnership with Puppet')).toBeHidden();
  });
});
