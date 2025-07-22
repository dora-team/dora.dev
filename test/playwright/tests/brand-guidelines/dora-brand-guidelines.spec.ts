import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

export const pageHeaders = [
  'Branding Guidelines',
  'Graphics',
  'Impact of Generative AI on Software Development report graphics',
  '2024 DORA Report graphics'
];

test.describe('DORA brand guidelines', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brand-guidelines/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | DORA Brand Guidelines');
  });

  test('has the correct header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('DORA Brand Guidelines');
  });

  pageHeaders.forEach((pageHeader) => {
    test(`has a ${pageHeader} header`, async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: pageHeader, level: 2, exact: true })
      ).toBeVisible();
    });
  });
});
