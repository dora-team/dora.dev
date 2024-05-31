const { test, expect } = require('@playwright/test');

test('Verify the page title', async ({ page }) => {
  await page.goto('/research/2023/dora-report/');
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2023');
});

test('Verify the download button text', async ({ page }) => {
  await page.goto('/research/2023/dora-report/');
  const downloadButton = await page.locator('text=Download the 2023 DORA Report');
  await expect(downloadButton).toBeVisible();
});

test('Verify the language options', async ({ page }) => {
  await page.goto('/research/2023/dora-report/');
  const languageOptions = await page.locator('item ul li').count();
  await expect(languageOptions).toBe(9);
});
