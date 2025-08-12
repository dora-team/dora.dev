import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

export const pageHeaders = [
  'Header',
  'Architecting for the future with AI',
  'Augmenting human expertise with AI',
];

test.describe('DORA awards page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/awards/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Google Cloud DORA Awards');
  });

  test('has the correct header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Google Cloud DORA Awards');
  });

  pageHeaders.forEach((pageHeader) => {
    test(`has a ${pageHeader} header`, async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: pageHeader, level: 2, exact: true })
      ).toBeVisible();
    });
  });
});
