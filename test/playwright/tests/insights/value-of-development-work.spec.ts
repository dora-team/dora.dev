import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';
import { verifyAuthors } from '../verify-authors';

test.describe(`Value of development work insight`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/insights/value-of-development-work/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | How gen AI affects the value of development work');
  });

  test('has the correct header.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'How gen AI affects the value of development work' })).toBeVisible();
  });

  test('displays its last updated date', async ({ page }) => {
    await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
  });

  test('displays authors.', async ({ page }) => {
    await verifyAuthors(page);
  });
});
