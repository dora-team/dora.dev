import { test, expect } from '@playwright/test';

test('2025 Research navigation is functional', async ({ page }) => {
  await page.goto('/research/');
  await page.getByRole('link', { name: '2025', exact: true }).click();
  await expect(page.locator('h1')).toContainText('DORA Research: 2025');
});
