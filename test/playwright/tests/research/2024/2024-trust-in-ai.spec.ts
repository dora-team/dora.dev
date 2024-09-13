import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2024/trust-in-ai/');
});

test('Trust in AI has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Fostering Trust in AI');
});

test('Trust in AI has the correct header.', async ({ page }) => {
  await expect(page.locator('h2')).toContainText("Fostering Developers’ Trust in Generative Artificial Intelligence");
});

test('Trust in AI has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test('Trust in AI displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText('Last updated: ')
});
