import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2024/errata/');
});

test('2024 research errata has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research Errata');
});

test('2024 research errata has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2024');
});
