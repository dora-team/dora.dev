import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2019/dora-report/');
});

test('2019 DORA report page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2019');
});

test('2019 DORA report page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2019');
});

test('2019 DORA report page has the correct sub header.', async ({ page }) => {
  await expect(page.locator('h2')).toContainText('Download the 2019 DORA Report');
});

test('2019 DORA report page has the correct report image', async ({ page }) => {
  const reportImage = page.locator('img[src="2019-dora-accelerate-state-of-devops-report.png"]');
  await expect(reportImage).toBeVisible();
  await expect(reportImage).toHaveAttribute('alt', 'Accelerate State of DevOps Report 2019');
});

test('2019 DORA report page links to the 2019 DORA Report.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Accelerate State of DevOps Report' })).toHaveAttribute(
    'href',
    '2019-dora-accelerate-state-of-devops-report.pdf'
  )
});

test('2019 DORA report page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
