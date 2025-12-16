import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2014/');
});

test('2014 Research page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research: 2014');
});

test('2014 Research page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2014');
});
