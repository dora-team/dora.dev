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

  test('hero report link is visible and correct.', async ({ page }) => {
    const heroButton = page.getByRole('link', { name: 'Read our latest report' });
    await expect(heroButton).toBeVisible();
    await expect(heroButton).toHaveAttribute('href', 'https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development');
  });

  test('feature section is visible and has correct content.', async ({ page }) => {
    // Check headline
    await expect(page.getByRole('heading', { name: 'DORA ROI of AI-assisted Software Development report' })).toBeVisible();

    // Check "Learn more" button
    const learnMore = page.getByRole('link', { name: 'Learn more' });
    await expect(learnMore).toBeVisible();
    await expect(learnMore).toHaveAttribute('href', 'https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development');

    // Check report image
    const reportImage = page.getByRole('img', { name: 'DORA ROI of AI-assisted Software Development report' });
    await expect(reportImage).toBeVisible();
    await expect(reportImage).toHaveAttribute('src', '/ai/roi/report/roi-of-ai-assisted-software-development-report-thumb.png');
  });

  test('resources header is visible.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Resources' })).toBeVisible();
  });

  test('there are four snipes under "Resources."', async ({ page }) => {
    await expect(page.locator('.homepage-snipe')).toHaveCount(4);
  });
});
