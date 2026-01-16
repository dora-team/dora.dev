import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';

test.describe('DevOps Dozen Awards 2025 page', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/insights/devops-dozen-awards-2025/');
   });

   test('has the correct title.', async ({ page }) => {
      await expect(page).toHaveTitle('DORA | DevOps Dozen Awards 2025');
   });

   test('has the correct header.', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'DevOps Dozen Awards 2025', level: 1 })).toBeVisible();
   });

   test('displays its last updated date.', async ({ page }) => {
      await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
   });
});
