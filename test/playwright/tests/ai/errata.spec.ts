import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/ai/gen-ai-report/errata/');
});

test('Gen AI guide errata has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Impact of Generative AI in Software Development report errata');
});

test('Gen AI guide errata has the correct header.', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Impact of Generative AI in Software Development report errata' })).toBeVisible();
});
