import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2024/dora-report/');
});

test('2024 research overview has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2024');
});

test('2024 research overview has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2024');
});

test('2024 research overview has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test('2024 DORA report page has the correct report image', async ({ page }) => {
  const reportImage = page.locator('img[src="2024-dora-accelerate-state-of-devops-report.png"]');
  await expect(reportImage).toBeVisible();
  await expect(reportImage).toHaveAttribute('alt', 'Accelerate State of DevOps Report 2024');
});

test('2024 DORA report page has the correct download button', async ({ page }) => {
  const downloadLink = page.getByRole('link', { name: 'Download the report' });
  await expect(downloadLink).toBeVisible();
  await expect(downloadLink).toHaveAttribute('href', 'https://cloud.google.com/devops/state-of-devops');
});
