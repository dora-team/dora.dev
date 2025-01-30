import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/ai/');
});

test('AI research overview has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Artificial Intelligence');
});

test('AI research overview has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: Artificial Intelligence');
});

test('AI research overview has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
