const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/survey/discussion-guide/');
});

test('Survey Discussion Guide page title', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Survey Discussion Guide');
});

test('DORA Survey Discussion Guide header', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('2025 DORA Survey Discussion Guide');
});
