import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

export const heroImages = [
  '/research/ai/gen-ai-report/dora-impact-of-generative-ai-in-software-development-report.png',
  '/img/quickcheck/hero_illustration.svg',
  '/research/2024/dora-report-ai-preview-hero.png',
  '/img/features/google-cloud-next.png',
  '/img/features/homepage-core-snipe.png'
];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Get Better at Getting Better')).toBeVisible();
});

test('Homepage has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Get Better at Getting Better');
});

test('Homepage has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Get Better at Getting Better');
});

heroImages.forEach((heroImage) => {
  const imageName = heroImage.substring(heroImage.lastIndexOf('/') + 1, heroImage.lastIndexOf('.'));
  test(`Homepage hero image ${imageName} is visible`, async ({ page }) => {
    await expect(page.locator(`img[src="${heroImage}"]`)).toBeVisible();
  });
})
