import { test, expect } from '@playwright/test';

test('AICM questions page has the correct title and sections', async ({ page }) => {
  await page.goto('/ai/capabilities-model/questions/');

  // Check title
  await expect(page).toHaveTitle(/DORA AI Capabilities Model questions/);

  // Check for "AI adoption" section
  await expect(page.getByText('AI adoption', { exact: true })).toBeVisible();

  // Check for "The seven capabilities" section
  await expect(page.getByText('The seven capabilities', { exact: true })).toBeVisible();

  // Check for "The seven outcomes" section
  await expect(page.getByText('The seven outcomes', { exact: true })).toBeVisible();
});
