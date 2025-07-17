import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/capabilities/version-control/');
});

test('Version control page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Capabilities: Version Control');
});

test('Version control page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Version control');
});

test('Version control is a core capability.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();
});

test('Version control page displays a sidebar', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Climate for Learning', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Flow', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Feedback', exact: true })).toBeVisible();
});
