import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2016/');
});

test('2016 Research page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research: 2016');
});

test('2016 Research page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2016');
});

test('2016 DORA report page has the correct report image', async ({ page }) => {
  const reportImage = page.locator('img[src="/research/2016/2016-state-of-devops-report.png"]');
  await expect(reportImage).toBeVisible();
  await expect(reportImage).toHaveAttribute('alt', 'State of DevOps Report 2016');
});

test('2016 DORA report page links to the 2016 DORA Report.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'State of DevOps Report 2016' })).toHaveAttribute(
    'href',
    '2016-state-of-devops-report.pdf'
  )
});

test('2016 Research page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

