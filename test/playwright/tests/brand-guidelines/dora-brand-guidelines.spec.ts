import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

export const pageHeaders = [
  'Branding Guidelines',
  'Graphics',
  'Impact of Generative AI on Software Development report graphics',
  '2024 DORA Report graphics'
];

test.beforeEach(async ({ page }) => {
  await page.goto('/brand-guidelines/');
});

test('DORA brand guidelines has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Brand Guidelines');
});

test('DORA brand guidelines has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Brand Guidelines');
});

pageHeaders.forEach((pageHeader, index) => {
  test(`DORA brand guidelines has a ${pageHeader} header.`, async ({ page }) => {
    await expect(page.locator('h2').nth(index)).toContainText(pageHeader);
  });
});
