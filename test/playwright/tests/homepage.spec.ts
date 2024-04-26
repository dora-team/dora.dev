import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

test('test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Get Better at Getting Better')).toBeVisible();
});