import { test, expect } from '@playwright/test';

test.describe('ROI of AI report page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai/roi/report/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Coming soon: The ROI of AI-assisted Software Development report/);
  });

  test('has the correct header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Coming soon: The ROI of AI-assisted Software Development report', exact: true })).toBeVisible();
  });

  test('does not show the research note', async ({ page }) => {
    await expect(page.locator('.research-note')).toBeHidden();
    await expect(page.getByText('Prior to 2018, research was conducted in partnership with Puppet')).toBeHidden();
  });
});
