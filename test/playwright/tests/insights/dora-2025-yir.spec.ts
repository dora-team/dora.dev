import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';
import { verifyAuthors } from '../verify-authors';

test.describe('DORA 2025: Year in review', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/insights/dora-2025-year-in-review/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | DORA 2025: Year in review');
  });

  test('has the correct header.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'DORA 2025: Year in review' })).toBeVisible();
  });

  test('displays its last updated date.', async ({ page }) => {
    await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
  });

  test('displays authors.', async ({ page }) => {
    await verifyAuthors(page);
  });
});
