const { test, expect } = require('@playwright/test');

test('Verify the page title', async ({ page }) => {
  await page.goto('/research/2024/');
  await expect(page).toHaveTitle('DORA | DORA Research: 2024');
});

test('Survey Image', async ({ page }) => {
  await page.goto('/research/2024/');
  const surveyImage = await page.locator('img[alt="2024 DORA Survey - Shape the future of tech"]');
  const imgSrc = await surveyImage.getAttribute('src');
  const res = await page.request.get(imgSrc);
  expect(res.status()).toBe(200);
});
