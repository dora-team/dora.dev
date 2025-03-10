import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/ai/errata/');
});

test('Gen AI guide errata has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research Errata');
});

test('Gen AI guide errata has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: Artificial Intelligence');
});

test('Gen AI guide errata has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
