const { test, expect } = require('@playwright/test');

test('Verify the page title', async ({ page }) => {
  await page.goto('/survey/');
  await expect(page).toHaveTitle('DORA | The 2025 DORA Survey');
});

test('The DORA survey is open now', async ({ page }) => {
  await page.goto('/survey/');
  await expect(page.locator('h1')).toContainText('The DORA survey is open now');
});