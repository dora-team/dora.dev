import { test, expect } from '@playwright/test';

test('Well-being limits page loads correctly', async ({ page }) => {
  await page.goto('/capabilities/well-being/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Capabilities: Well-being');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Well-being');

  // This is a core capability
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();
});
