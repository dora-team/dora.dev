import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';
import { verifyAuthors } from '../verify-authors';

test.describe(`Balancing AI tensions insight`, () => {
  test.beforeEach(async ({ page }) => {
    // Navigating to the page directly. 
    // Note: Since the page is currently a draft (draft: true), 
    // it may not be accessible unless we are in a dev environment that shows drafts.
    await page.goto('/insights/balancing-ai-tensions/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Balancing AI tensions: Moving from AI adoption to effective SDLC use');
  });

  test('has the correct header.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Balancing AI tensions: Moving from AI adoption to effective SDLC use' }).first()).toBeVisible();
  });

  test('displays its last updated date', async ({ page }) => {
    await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
  });

  test('displays authors.', async ({ page }) => {
    await verifyAuthors(page);
    await expect(page.locator('.authors')).toContainText('Jessica Baolin');
    await expect(page.locator('.authors')).toContainText('Nathen Harvey');
  });
});
