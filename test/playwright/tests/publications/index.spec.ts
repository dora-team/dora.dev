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

test('Publications page links to the latest DORA Report', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Read the Report' })).toHaveAttribute(
    'href',
    'https://cloud.google.com/devops/state-of-devops'
  )
});
