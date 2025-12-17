import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/capabilities/loosely-coupled-teams/');
});

test('Loosely coupled teams page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Capabilities: Loosely Coupled Teams');
});

test('Loosely coupled teams page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Loosely coupled teams');
});

test('Loosely coupled teams is a core capability.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();
});
