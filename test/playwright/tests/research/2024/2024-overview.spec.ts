import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2024/');
});

test('2024 research overview has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2024');
});

test('2024 research overview has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2024');
});
