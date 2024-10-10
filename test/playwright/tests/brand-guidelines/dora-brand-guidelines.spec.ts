import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

test.beforeEach(async ({ page }) => {
  await page.goto('/brand-guidelines/');
});

test('DORA brand guidelines has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Brand Guidelines');
});

test('DORA brand guidelines has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Brand Guidelines');
});
