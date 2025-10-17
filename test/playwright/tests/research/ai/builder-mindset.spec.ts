import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';
import { LAST_UPDATED_DATE_REGEX } from '../../constants';

test.describe('Builder mindset page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research/ai/builder-mindset/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Understanding builder intent in the AI era');
  });

  test('has the correct header.', async ({ page }) => {
    const header = page.getByRole('heading', { name: 'Understanding builder intent in the AI era' });
    await expect(header).toBeVisible();
  });

  test('has the correct sidebar.', async ({ page }) => {
    for (const sidebarLink of sidebarLinks) {
      await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
    }
  });

  test('displays its last updated date.', async ({ page }) => {
    await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
  });
});
