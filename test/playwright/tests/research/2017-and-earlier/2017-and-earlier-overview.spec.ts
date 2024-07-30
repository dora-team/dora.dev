import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

export const reportsMap = {
  '2017 State of DevOps Report': '2017-state-of-devops-report.pdf',
  '2016 State of DevOps Report': '2016-state-of-devops-report.pdf',
  '2015 State of DevOps Report': '/research/2015',
  '2014 State of DevOps Report': '/research/2014/'
};

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2017-and-earlier/');
});

test('2017 and earlier Research page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research: 2017 and earlier');
});

test('2017 and earlier Research page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2017 and earlier');
});

test('2017 and earlier Research page links to DORA reports.', async ({ page }) => {
  for (const report in reportsMap) {
    const url = reportsMap[report];
    const reportLink = page.getByRole('link', { name: report, exact: true });
    await expect(reportLink).toHaveAttribute('href', url);
  }
});

test('2017 and earlier Research page links to Puppet\'s history of the reports', async ({ page }) => {
  await expect(page.getByRole('link', { name: "history of Puppet’s DevOps" })).toHaveAttribute(
    'href',
    'https://www.puppet.com/resources/history-of-devops-reports'
  )
});

test('2017 and earlier Research page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
