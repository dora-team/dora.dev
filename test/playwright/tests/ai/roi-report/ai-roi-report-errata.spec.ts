import { test, expect } from '@playwright/test';

test.describe('ROI of AI Errata Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai/roi/errata/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | DORA ROI of AI-assisted Software Development report errata');
  });

  test('has the correct top header', async ({ page }) => {
    const header = page.getByRole('heading', { name: 'DORA ROI of AI-assisted Software Development report errata', exact: true });
    await expect(header).toBeVisible();
  });
});
