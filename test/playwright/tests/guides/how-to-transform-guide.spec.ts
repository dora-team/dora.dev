import { test, expect } from '@playwright/test';

test('DevOps Culture Transform page loads correctly', async ({ page }) => {
  await page.goto('/guides/devops-culture-transform/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | How to transform your organizatio');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('How to transform your organization');

});
