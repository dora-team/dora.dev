import { test, expect } from '@playwright/test';

const pagesWithBanner = [
  '/',
  '/survey/',
  '/ai/gen-ai-report/report/',
  '/research/2025/dora-report/'
];

const pagesWithoutBanner = [
  '/ai/roi/report/'
];

test.describe('Site Banner', () => {
  test('has correct content on the homepage', async ({ page }) => {
    await page.goto('/');

    const siteBanner = page.locator('.site-banner');
    const bannerLink = siteBanner.locator('a');
    await expect(bannerLink).toHaveAttribute('href', 'https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development');
    await expect(bannerLink).toHaveText('Download the ROI of AI-assisted Software Development report.');
  });

  for (const path of pagesWithBanner) {
    test(`is visible on ${path}`, async ({ page }) => {
      await page.goto(path);
      const siteBanner = page.locator('.site-banner');
      await expect(siteBanner).toBeVisible();
    });
  }

  for (const path of pagesWithoutBanner) {
    test(`is hidden on ${path}`, async ({ page }) => {
      await page.goto(path);
      const siteBanner = page.locator('.site-banner');
      await expect(siteBanner).not.toBeVisible();
    });
  }
});
