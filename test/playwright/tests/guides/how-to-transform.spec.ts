import { test, expect } from '@playwright/test';

test.describe('How to Transform guide', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides/how-to-transform/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | How to transform your organization');
  });

  test('has the correct header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('How to transform your organization');
  });
});
