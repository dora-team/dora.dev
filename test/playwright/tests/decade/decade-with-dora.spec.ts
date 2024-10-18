import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/decade');
});

test('Decade with DORA has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | A Decade with DORA');
});

test('Decade with DORA has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('A decade with DORA');
});

test('Decade with DORA displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText('Last updated: ')
});
