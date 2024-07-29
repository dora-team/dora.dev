import { test, expect } from '@playwright/test';

test('Continuous integration page loads correctly', async ({ page }) => {
  await page.goto('/capabilities/continuous-integration/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Capabilities: Continuous Integration');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Continuous integration');

  // This is a core capability
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();

  //Check the sidebar
  await expect(page.getByRole('heading', { name: 'Climate for Learning', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Flow', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Feedback', exact: true })).toBeVisible();
});
