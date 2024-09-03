import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.locator('#contact-dora')).toContainText('Contact DORA');
  await expect(page.getByRole('main')).toContainText('dora-advocacy@google.com');
});
