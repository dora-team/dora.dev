const { test, expect } = require('@playwright/test');

test('Page title should be "DORA’s software delivery metrics: the four keys"', async ({ page }) => {
  await page.goto('/guides/dora-metrics-four-keys/');
  await expect(page).toHaveTitle('DORA | DORA’s software delivery metrics: the four keys');
});

test('Page should contain the headline "DORA’s software delivery metrics: the four keys"', async ({ page }) => {
  await page.goto('/guides/dora-metrics-four-keys/');
  await expect(page.locator('h1')).toHaveText('DORA’s software delivery metrics: the four keys');
});
