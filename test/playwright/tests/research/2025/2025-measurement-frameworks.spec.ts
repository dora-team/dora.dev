import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.describe('2025 measurement frameworks page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research/2025/measurement-frameworks/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Choosing measurement frameworks to fit your organizational goals');
  });

  test('has the correct header.', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('DORA Research: 2025');
  });

  test('has the correct sidebar.', async ({ page }) => {
    await Promise.all(sidebarLinks.map((sidebarLink) => expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible()));
  });
});
