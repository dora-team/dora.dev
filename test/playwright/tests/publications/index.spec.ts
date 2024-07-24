import { test, expect } from '@playwright/test';

test('Publications page loads correctly', async ({ page }) => {
  await page.goto('/publications/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | DORA Publications');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Publications by DORA');

  // Click the "read the report" link and expect to be directed to https://cloud.google.com/devops/state-of-devops in a new tab
  const [currentReportPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Read the report' }).click(),
  ]);

  await expect(currentReportPage).toHaveURL('https://cloud.google.com/devops/state-of-devops');
});
