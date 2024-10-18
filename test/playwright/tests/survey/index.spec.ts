const { test, expect } = require('@playwright/test');

test('Verify the page title', async ({ page }) => {
  await page.goto('/survey/');
  await expect(page).toHaveTitle('DORA | The 2024 DORA Survey');
});

test('The 2024 survey is closed', async ({ page }) => {
  await page.goto('/survey/');
  await expect(page.locator('h1')).toContainText('The 2024 DORA Survey is now closed');
});