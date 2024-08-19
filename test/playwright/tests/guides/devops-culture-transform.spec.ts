import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/guides/devops-culture-transform/');
});

test('DevOps Culture Transform guide has the correct title', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | How to transform your organization');
});

test('DevOps Culture Transform guide has the correct header', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('How to transform your organization');
});
