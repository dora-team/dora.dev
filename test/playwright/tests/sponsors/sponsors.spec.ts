import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

test.beforeEach(async ({ page }) => {
  await page.goto('/sponsors/');
});

test('Sponsors page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Partner with DORA');
});

test('Sponsors page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Sponsor DORA research');
});

test('Sponsors page has email for sponsor information.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'sponsor-dora@google.com' })).toBeVisible();
});