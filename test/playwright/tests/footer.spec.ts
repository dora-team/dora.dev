import { test, expect } from '@playwright/test';

test('Links in footer are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('contentinfo')).toContainText('DORA is a program run by Google Cloud. All content on this site is licensed by Google LLC under CC BY-NC-SA 4.0, unless otherwise specified.');
  await expect(page.getByRole('link', { name: 'Resources' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'FAQ' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact Us' })).toBeVisible();
  await expect(page.getByLabel('This site\'s source code')).toContainText('github');
});