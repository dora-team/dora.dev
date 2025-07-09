import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2017/');
});

test('2017 Research page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research: 2017');
});

test('2017 Research page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2017');
});

test('2017 DORA report page has the correct report image', async ({ page }) => {
  const reportImage = page.locator('img[src="2017-state-of-devops-report.png"]');
  await expect(reportImage).toBeVisible();
  await expect(reportImage).toHaveAttribute('alt', 'State of DevOps Report 2017');
});

test('2017 DORA report page links to the 2017 DORA Report.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'State of DevOps Report 2017' })).toHaveAttribute(
    'href',
    '2017-state-of-devops-report.pdf'
  )
});

test('2017 Research page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});