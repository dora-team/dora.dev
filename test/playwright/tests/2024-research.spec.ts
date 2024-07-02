const { test, expect } = require('@playwright/test');

test('Verify the page title', async ({ page }) => {
  await page.goto('/research/2024/');
  await expect(page).toHaveTitle('DORA | DORA Research: 2024');
});

test('The 2024 research page heading', async ({ page }) => {
  await page.goto('/research/2024/');
  await expect(page.locator('h1')).toContainText('DORA Research: 2024');
});
