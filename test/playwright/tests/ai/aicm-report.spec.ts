import { test, expect } from '@playwright/test';

test.describe('AICM report page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai/capabilities-model/report/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/DORA AI Capabilities Model report/);
  });

  test('has the correct header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('DORA AI Capabilities Model');
  });

  test('does not show the research note', async ({ page }) => {
    await expect(page.locator('.research-note')).toBeHidden();
    await expect(page.getByText('Prior to 2018, research was conducted in partnership with Puppet')).toBeHidden();
  });
});
