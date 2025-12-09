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
    await expect(heroButton).toHaveAttribute('href', 'https://cloud.google.com/resources/content/2025-dora-ai-capabilities-model-report');
  });

  test('feature section is visible and has correct content.', async ({ page }) => {
    // Check headline
    await expect(page.getByRole('heading', { name: 'DORA AI Capabilities Model report' })).toBeVisible();

    // Check "Learn more" button
    const learnMore = page.getByRole('link', { name: 'Learn more' });
    await expect(learnMore).toBeVisible();
    await expect(learnMore).toHaveAttribute('href', 'https://cloud.google.com/resources/content/2025-dora-ai-capabilities-model-report');

    // Check report image
    const reportImage = page.getByRole('img', { name: 'DORA AI Capabilities Model report' });
    await expect(reportImage).toBeVisible();
    await expect(reportImage).toHaveAttribute('src', '/ai/capabilities-model/report/2025-dora-ai-capabilities-model-report.png');

    // Check companion link
    const companionLink = page.getByRole('link', { name: '2025 State of AI-assisted Software Development report' });
    await expect(companionLink).toBeVisible();
    await expect(companionLink).toHaveAttribute('href', '/research/2025/dora-report');
  });

  test('resources header is visible.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Resources' })).toBeVisible();
  });

  test('there are four snipes under "Resources."', async ({ page }) => {
    await expect(page.locator('.homepage-snipe')).toHaveCount(4);
  });
});
