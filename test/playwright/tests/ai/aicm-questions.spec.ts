import { test, expect } from '@playwright/test';

test.describe('AICM questions page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai/capabilities-model/questions/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/DORA AI Capabilities Model questions/);
  });

  test('has the "AI adoption" section', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'AI adoption' })).toBeVisible();
  });

  test('has the "The seven capabilities" section', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'The seven capabilities' })).toBeVisible();
  });

  test('has the "The seven outcomes" section', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'The seven outcomes' })).toBeVisible();
  });
});
