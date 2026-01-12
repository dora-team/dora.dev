import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/capabilities/cloud-infrastructure/');
});

test('Cloud infrastructure page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Capabilities: Flexible Infrastructure');
});

test('Cloud infrastructure page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Flexible infrastructure');
});

test('Cloud infrastructure is a core capability.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();
});

test('Redirect from flexible-infrastructure works.', async ({ page }) => {
  await page.goto('/capabilities/flexible-infrastructure/');
  await expect(page).toHaveURL(/\/capabilities\/cloud-infrastructure\//);
});
