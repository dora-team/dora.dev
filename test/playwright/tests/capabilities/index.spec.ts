import { test, expect } from '@playwright/test';

test('Capabilities index page loads correctly', async ({ page }) => {
await page.goto('/capabilities/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Capabilities');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Capability catalog');

  await expect(page.getByRole('heading', { name: 'Capabilities that enable a Climate for Learning', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Capabilities that enable Fast Flow', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Capabilities that enable Fast Feedback', exact: true })).toBeVisible();
});