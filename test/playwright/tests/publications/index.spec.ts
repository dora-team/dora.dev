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
const downloadTheReportMap = [
  { year: 2024, url: 'https://cloud.google.com/resources/devops/state-of-devops' },
  { year: 2023, url: '/research/2023/dora-report/' },
  { year: 2022, url: '/research/2022/dora-report/' },
  { year: 2021, url: '/research/2021/dora-report/' },
  { year: 2019, url: '/research/2019/dora-report/' },
  { year: 2018, url: '/research/2018/dora-report/' },
  { year: 2017, url: '/research/2017' },
  { year: 2016, url: '/research/2016/' },
  { year: 2015, url: '/research/2015/' },
  { year: 2014, url: '/research/2014/' },
];

downloadTheReportMap.forEach(({ year, url }, index) => {
  test(`Publications page links to the DORA Report landing page for ${year}`, async ({ page }) => {
    await page.goto('/publications/');
    // Get the nth link with the text "Download the report"
    const reportLink = page.getByRole('link', { name: 'Download the report' }).nth(index);
    await expect(reportLink).toHaveAttribute('href', url);
    await expect(reportLink).toBeVisible();
  });
});
