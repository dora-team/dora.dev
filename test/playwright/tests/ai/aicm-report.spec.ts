import { test, expect } from '@playwright/test';

test('AICM report page has the correct title and content', async ({ page }) => {
  await page.goto('/ai/capabilities-model/report/');

  // Check title
  await expect(page).toHaveTitle(/DORA AI Capabilities Model report/);

  // Check for the main header
  await expect(page.locator('h1')).toContainText('DORA Research: DORA AI Capabilities Model');

  // Check that the research note is NOT present
  // The research note has class "research-note" and contains text about Puppet
  await expect(page.locator('.research-note')).toBeHidden();
  await expect(page.getByText('Prior to 2018, research was conducted in partnership with Puppet')).toBeHidden();
});
