import { test, expect } from '@playwright/test';

test('Continuous delivery page loads correctly', async ({ page }) => {
  await page.goto('/capabilities/continuous-delivery/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Capabilities: Continuous delivery');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Continuous delivery');

  // This is a core capability
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();
});
