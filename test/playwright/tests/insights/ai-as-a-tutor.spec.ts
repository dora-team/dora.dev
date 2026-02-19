import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';
import { verifyAuthors } from '../verify-authors';

test.describe(`AI as a tutor insight`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/insights/ai-as-a-tutor/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | AI as a tutor');
  });

  test('has the correct header.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'AI as a tutor' })).toBeVisible();
  });

  test('displays its last updated date', async ({ page }) => {
    await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
  });

  test('displays authors.', async ({ page }) => {
    await verifyAuthors(page);
  });
});
