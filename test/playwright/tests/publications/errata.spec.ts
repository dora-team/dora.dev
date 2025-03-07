import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

const yearToURLMap = {
    'Accelerate State of DevOps 2023': '/research/2023/errata/',
    'Accelerate State of DevOps 2024': '/research/2024/errata/',
    'Impact of Generative AI in Software Development': '/research/ai/errata/'
};

test.beforeEach(async ({ page }) => {
  await page.goto('/publications/errata/');
});

test('Publications errata has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Errata');
});

test('Publications errata has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Publications Errata');
});

for (const year in yearToURLMap) {
  const url = yearToURLMap[year];

  test(`Publications errata links to the ${year} page.`, async ({ page }) => {
    const yearLink = page.getByRole('link', { name: year, exact: true });
    await expect(yearLink).toHaveAttribute('href', url);
  });
}