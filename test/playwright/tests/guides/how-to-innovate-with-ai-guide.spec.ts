const { test, expect } = require('@playwright/test');

test('Page title should be "How to enable your software delivery teams to innovate with generative AI"', async ({ page }) => {
  await page.goto('/guides/how-to-innovate-with-generative-ai/');
  await expect(page).toHaveTitle('DORA | How to enable your software delivery teams to innovate with generative AI');
});

test('Page should contain the headline "How to enable your software delivery teams to innovate with generative AI"', async ({ page }) => {
  await page.goto('/guides/how-to-innovate-with-generative-ai/');
  await expect(page.locator('h1')).toHaveText('How to enable your software delivery teams to innovate with generative AI');
});