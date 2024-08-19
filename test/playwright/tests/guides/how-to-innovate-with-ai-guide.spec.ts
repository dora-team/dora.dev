import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/guides/how-to-innovate-with-generative-ai/');
});

test('Four kesy guide has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | How to enable your software delivery teams to innovate with generative AI');
});

test('Four keys guide has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('How to enable your software delivery teams to innovate with generative AI');
});
