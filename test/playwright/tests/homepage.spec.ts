import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts
test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Get Better at Getting Better');
  });

  test('has the correct lede.', async ({ page }) => {
    await expect(page.locator('h1').first()).toContainText('Get better at getting better');
  });

  test('hero report link is visible.', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Read our latest report' })).toBeVisible();
  });

  test('feature section ("our latest report") is visible.', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'our latest report' })).toBeVisible();
  });

  test('resources header is visible.', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Resources' })).toBeVisible();
  });

  test('there are four snipes under "Resources."', async ({ page }) => {
    await expect(page.locator('.homepage-snipe')).toHaveCount(4);
  });
});
