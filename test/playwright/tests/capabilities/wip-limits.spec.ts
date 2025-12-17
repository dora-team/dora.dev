import { test, expect } from '@playwright/test';

test('Work in process limits page loads correctly', async ({ page }) => {
  await page.goto('/capabilities/wip-limits/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Capabilities: Work in process limits');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Work in process limits');

  // This is not a core capability
  await expect(page.getByRole('link', { name: 'core', exact: true })).not.toBeVisible();
});
