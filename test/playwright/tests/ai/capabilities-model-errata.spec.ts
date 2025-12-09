import { test, expect } from '@playwright/test';

test.describe('DORA AI Capabilities Model Errata Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai/capabilities-model/errata/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | DORA AI Capabilities Model report errata');
  });

  test('has the correct top header', async ({ page }) => {
    const header = page.getByRole('heading', { name: 'DORA AI Capabilities Model', exact: true });
    await expect(header).toBeVisible();
  });
});
