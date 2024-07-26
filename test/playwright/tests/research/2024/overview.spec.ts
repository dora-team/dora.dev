import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test('2024 research overive page loads correctly', async ({ page }) => {
  await page.goto('/research/2024/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | DORA Research: 2024');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('DORA Research: 2024');

  // Check the sidebar
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
