import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/publications/');
});

test('Publications page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Publications');
});

test('Publications page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Publications by DORA');
});

test('Publications page has a link to the sponsor email alias.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'sponsor-dora@google.com'})).toBeVisible();
});

test('Publications page links to the ROI report.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Download the Whitepaper' })).toHaveAttribute(
    'href',
    '/research/2020/'
  )
});

test('Publications page links to the DORA awards ebook.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Read the ebook' })).toHaveAttribute(
    'href',
    'https://services.google.com/fh/files/misc/devops_awards_fullebook_final.pdf'
  )
});

// Mapping for "Download the report" links which, by convention, got to /research/:year or /research/:year/dora-report
// TODO - make this an array of maps and generate an isolated test for each
export const downloadTheReportMap = {
  '0': '/research/2023/dora-report/',
  '1': '/research/2022/dora-report/',
  '2': '/research/2021/dora-report/',
  '3': '/research/2017',
  '4': '/research/2016/',
  '5': '/research/2015/',
  '6': '/research/2014/'
}

test('Publications page links to the DORA Report landing pages', async ({ page }) => {
  for (const report in downloadTheReportMap) {
    const url = downloadTheReportMap[report];
    const reportLink = page.getByRole('link', { name: 'Download the report' }).nth(report)
    await expect(reportLink).toHaveAttribute('href', url);
    await expect(reportLink).toBeVisible();
  }
});

// Mapping for the "Read PDF" links which link directly to the report
// TODO - #698 calls for a landing page for each report. These should all move to the downloadTheReportMap
export const readPDFMap = {
  '0': '/research/2019/dora-report/2019-dora-accelerate-state-of-devops-report.pdf',
  '1': '/research/2018/dora-report/2018-dora-accelerate-state-of-devops-report.pdf'
}

test('Publications page links directly to DORA Reports', async ({ page }) => {
  for (const report in readPDFMap) {
    const url = readPDFMap[report];
    const reportLink = page.getByRole('link', { name: 'Read PDF' }).nth(report)
    await expect(reportLink).toHaveAttribute('href', url);
    await expect(reportLink).toBeVisible();
  }
});
