import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2020/');
});

test('2020 Research page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research: 2020');
});

test('2020 Research page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2020');
});

test('2020 Research page has the correct report image', async ({ page }) => {
  const reportImage = page.locator('img[src="whitepaper-roi.png"]');
  await expect(reportImage).toBeVisible();
  await expect(reportImage).toHaveAttribute('alt', 'The ROI of DevOps Transformation');
});

test('2020 Research page links to the ROI Report.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Download the whitepaper' }).nth(1)).toHaveAttribute(
    'href',
    'the-roi-of-devops-transformation-google-cloud-dora.pdf'
  )
});
