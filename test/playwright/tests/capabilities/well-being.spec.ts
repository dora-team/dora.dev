import { test, expect } from '@playwright/test';

test('Well-being limits page loads correctly', async ({ page }) => {
  await page.goto('/capabilities/well-being/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Well-being');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Well-being');

  // This is a core capability
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();

  //Check the sidebar
  await expect(page.getByRole('heading', { name: 'Climate for Learning', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Flow', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Feedback', exact: true })).toBeVisible();
});
