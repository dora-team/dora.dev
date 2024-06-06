const { test, expect } = require('@playwright/test');

test('Verify the page title', async ({ page }) => {
  await page.goto('/research/2024/');
  await expect(page).toHaveTitle('DORA | DORA Research 2024');
});
