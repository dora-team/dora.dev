import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';
import { verifyAuthors } from '../verify-authors';

test.describe(`Builder mindset insight`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/insights/builder-mindset/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Understanding builder intent in the AI era');
  });

  test('has the correct header.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Understanding builder intent in the AI era' })).toBeVisible();
  });

  test('displays its last updated date.', async ({ page }) => {
    await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
  });

  test('displays authors.', async ({ page }) => {
    await verifyAuthors(page);
  });
});
