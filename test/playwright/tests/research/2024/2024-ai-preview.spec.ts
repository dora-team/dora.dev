import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2024/ai-preview');
});

test('2024 research overview has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | 2024 DORA Report Preview');
});

test('2024 research overview has the correct header.', async ({ page }) => {
  await expect(page.locator('h2')).toContainText('AI in the workplace: Adoption and impact');
});

test('2024 research overview has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
