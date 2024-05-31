const { test, expect } = require('@playwright/test');

test('Test page title and content', async ({ page }) => {
    await page.goto('/research/2022/dora-report/');
    await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2022');
  });
  
test('Verify the language options', async ({ page }) => {
    await page.goto('/research/2022/dora-report/');
    const languageOptions = await page.locator('item ul li').count();
    await expect(languageOptions).toBe(10);
});

test('Test links to additional resources', async ({ page }) => {
  await page.goto('/research/2022/dora-report/');
  const resourceLinks = await page.locator('h3 + ul li a').count();
  await expect(resourceLinks).toBe(3);
});
