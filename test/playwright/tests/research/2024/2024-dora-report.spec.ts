import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2024/');
});

test('2024 research overview has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2024');
});

test('2024 research overview has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2024');
});

test('2024 DORA report page has the correct language.', async ({ page }) => {
  const languageOptions = await page.locator('item ul li').count();
  await expect(languageOptions).toBe(1);

  for (const language in languageToUrlMap) {
    const url = languageToUrlMap[language];
    const languageLink = page.getByRole('link', { name: language, exact: true });
    await expect(languageLink).toHaveAttribute('href', url);
  }
});

test('2024 research overview has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
