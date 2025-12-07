import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/ai/gen-ai-report/errata/');
});

test('Gen AI guide errata has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research Errata');
});

test('Gen AI guide errata has the correct header.', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'DORA Research Errata' })).toBeVisible();
});


