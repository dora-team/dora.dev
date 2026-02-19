import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';
import { verifyAuthors } from '../verify-authors';

test.describe(`Trust in AI insight`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/insights/trust-in-ai/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Fostering Trust in AI');
  });

  test('has the correct header.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: "Fostering developers' trust in generative artificial intelligence" })).toBeVisible();
  });

  test('displays its last updated date', async ({ page }) => {
    await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
  });

  test('displays authors.', async ({ page }) => {
    await verifyAuthors(page);
  });
});
