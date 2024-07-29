import { test, expect } from '@playwright/test';

test('Proactive failure notification page loads correctly', async ({ page }) => {
  await page.goto('/capabilities/proactive-failure-notification/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Capabilities: Proactive Failure Notification');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Proactive failure notification');

  // This is not a core capability
  await expect(page.getByRole('link', { name: 'core', exact: true })).not.toBeVisible();

  //Check the sidebar
  await expect(page.getByRole('heading', { name: 'Climate for Learning', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Flow', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Feedback', exact: true })).toBeVisible();
});
