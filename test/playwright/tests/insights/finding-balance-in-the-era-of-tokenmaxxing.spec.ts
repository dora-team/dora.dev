import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';
import { verifyAuthors } from '../verify-authors';

test.describe(`Finding balance in the era of tokenmaxxing insight`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/insights/finding-balance-in-the-era-of-tokenmaxxing/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Finding balance in the era of tokenmaxxing');
  });

  test('has the correct header.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: "Finding balance in the era of tokenmaxxing" })).toBeVisible();
  });

  test('displays its last updated date', async ({ page }) => {
    await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
  });

  test('displays authors.', async ({ page }) => {
    await verifyAuthors(page);
  });
});
