import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/ai/');
});

test('AI research overview has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Artificial Intelligence');
});

test('AI research overview has the correct header.', async ({ page }) => {
  await expect(page.locator('h2 >> nth=0')).toContainText('Impact of Gen AI in Software Development');
});

test('AI research overview has the correct report image', async ({ page }) => {
  const reportImage = page.locator('img[src="/research/ai/gen-ai-report/dora-impact-of-generative-ai-in-software-development-report.png"]');
  await expect(reportImage).toBeVisible();
  await expect(reportImage).toHaveAttribute('alt', 'Impact of Generative AI in Software Development');
});

test('AI research overview has the correct download button', async ({ page }) => {
  const downloadLink = page.getByRole('link', { name: 'Download the report' });
  await expect(downloadLink).toBeVisible();
  await expect(downloadLink).toHaveAttribute('href', 'https://cloud.google.com/resources/content/dora-impact-of-gen-ai-software-development');
});

test('AI research overview has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
