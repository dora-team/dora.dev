import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2018/dora-report/');
});

test('2018 DORA report page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2018');
});

test('2018 DORA report page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2018');
});

test('2018 DORA report page has the correct sub header.', async ({ page }) => {
  await expect(page.locator('h2')).toContainText('Download the 2018 DORA Report');
});

test('2018 DORA report page links to the 2018 DORA Report.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Accelerate State of DevOps Report' })).toHaveAttribute(
    'href',
    '2018-dora-accelerate-state-of-devops-report.pdf'
  )
});

test('2018 DORA report page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
