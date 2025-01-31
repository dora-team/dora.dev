import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/ai/adopt-gen-ai/');
});

test('Adopt gen AI has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Adopt generative AI');
});

test('Adopt gen AI has the correct header.', async ({ page }) => {
  await expect(page.locator('h1 >> nth=1')).toContainText("Helping developers adopt generative AI");
});

test('Adopt gen AI has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test('Adopt gen AI displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText('Last updated: ')
});
