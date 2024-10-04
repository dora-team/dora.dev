import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

test.beforeEach(async ({ page }) => {
  await page.goto('/sponsors/resource-center/');
});

test('Sponsor resource center has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Sponsor Resource Center');
});

test('Sponsor resource center has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Sponsor Resource Center');
});

test('Sponsor resource center has email for sponsor information.', async ({ page }) => {
  // Get the count of matching links
  const linkCount = await page
    .getByRole('link', { name: 'sponsor-dora@google.com' })
    .count();

  // Assert that the count is at least 1
  expect(linkCount).toBeGreaterThanOrEqual(1);
});
