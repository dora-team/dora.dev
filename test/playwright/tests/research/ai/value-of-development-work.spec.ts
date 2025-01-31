import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/ai/value-of-development-work//');
});

test('Value of development work has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | How gen AI affects the value of development work');
});

test.('Value of development work has the correct header.', async ({ page }) => {
  await expect(page.locator('h1 >> nth=1')).toContainText('How gen AI affects the value of development work');
});

test.('Value of development work has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test('Value of development work displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText('Last updated: ')
});
