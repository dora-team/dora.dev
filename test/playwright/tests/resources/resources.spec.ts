import { test, expect } from '@playwright/test';

test('test resources page', async ({ page }) => {
  await page.goto('/resources');

  // Check for the source-available tools section
  await expect(page.getByText('Source-available tools')).toBeVisible();

  // Check for the books section
  await expect(page.getByText('Books')).toBeVisible();

  // Check for the graphics section
  await expect(page.getByText('Graphics')).toBeVisible();
});
