import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/capabilities/test-automation');
});

test('Test automation page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Capabilities: Test automation');
});

test('Test automation page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Test automation');
});

test('Test automation is a core capability.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();
});
