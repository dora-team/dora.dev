const { test, expect } = require('@playwright/test');

test('Verify the page title', async ({ page }) => {
  await page.goto('/survey/');
  await expect(page).toHaveTitle('DORA | The 2024 DORA Survey');
});

test('Survey Image', async ({ page }) => {
  await page.goto('/survey/');
  await page.waitForLoadState("domcontentloaded");
  const surveyImage = await page.locator('img[alt="2024 DORA Survey - Shape the future of tech"]');
  const imgSrc = await surveyImage.getAttribute('src');
  const res = await page.request.get('/survey/' + imgSrc);
  expect(res.status()).toBe(200);
});

