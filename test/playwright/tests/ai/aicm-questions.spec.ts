import { test, expect } from '@playwright/test';

test('AICM questions page has the correct title and sections', async ({ page }) => {
  await page.goto('/ai/capabilities-model/questions/');

  // Check title
  await expect(page).toHaveTitle(/DORA AI Capabilities Model questions/);

  // Check for "AI adoption" section
  await expect(page.locator('h3', { hasText: 'AI adoption' })).toBeVisible();

  // Check for "The seven capabilities" section
  await expect(page.locator('h3', { hasText: 'The seven capabilities' })).toBeVisible();

  // Check for "The seven outcomes" section
  await expect(page.locator('h3', { hasText: 'The seven outcomes' })).toBeVisible();
});
