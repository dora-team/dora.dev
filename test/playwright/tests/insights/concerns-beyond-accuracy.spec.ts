import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';
import { verifyAuthors } from '../verify-authors';

test.describe(`Concerns beyond accuracy insight`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/insights/concerns-beyond-accuracy-of-ai-output/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Concerns beyond the accuracy of AI output');
  });

  test('has the correct header.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Concerns beyond the accuracy of AI output' })).toBeVisible();
  });

  test('displays its last updated date', async ({ page }) => {
    await expect(page.locator('.updated')).toContainText(/Last updated: \w+ \d{1,2}, \d{4}/);
  });

  test('displays authors.', async ({ page }) => {
    await verifyAuthors(page);
  });
});
