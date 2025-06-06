const { test, expect } = require('@playwright/test');

test('Verify the page title', async ({ page }) => {
  await page.goto('/survey/');
  await expect(page).toHaveTitle('DORA | The 2025 DORA Survey');
});

test('The 2025 survey is coming soon', async ({ page }) => {
  await page.goto('/survey/');
  await expect(page.locator('h1')).toContainText('DORA survey is coming soon');
});