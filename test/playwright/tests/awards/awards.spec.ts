import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

export const pageHeaders = [
  'Google Cloud DORA Awards',
  'Announcing the winners of the 2025 Google Cloud DORA Awards',
];

test.describe('DORA awards page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/awards/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Google Cloud DORA Awards');
  });

  pageHeaders.forEach((pageHeader) => {
    test(`has a ${pageHeader} header`, async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: pageHeader, level: 1, exact: true })
      ).toBeVisible();
    });
  });
});
