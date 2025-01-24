import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

test.beforeEach(async ({ page }) => {
  await page.goto('/merch/');
});

test('Merch page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Merchandise');
});

test('Merch page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Merchandise');
});

test('Merch page has email for merchandise information.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'dora-merchandise@google.com' })).toBeVisible();
});