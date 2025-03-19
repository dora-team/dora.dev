import { test, expect } from '@playwright/test';

// validate navigation within the "research" section (using 2024 as a representative page) 
// check that sidebar links and tabs works
test('2024 Research navigation is functional', async ({ page }) => {
  await page.goto('/research/');
  await page.getByRole('link', { name: '2024', exact: true }).click();
  await page.getByRole('link', { name: 'DORA Report', exact: true }).click();
  await expect(page.locator('h2')).toContainText('Download the 2024 DORA Report');
});
