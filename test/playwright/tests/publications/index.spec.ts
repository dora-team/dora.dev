import { test, expect } from '@playwright/test';

test('Publications page loads correctly', async ({ page }) => {
  await page.goto('/publications/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | DORA Publications');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Publications by DORA');

  // Check for the email link
  await expect(page.getByRole('link', { name: 'sponsor-dora@google.com'})).toBeVisible();

  // Click the "read the report" link and expect to be directed to https://cloud.google.com/devops/state-of-devops in a new tab
  const [currentReportPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Read the report' }).click(),
  ]);

  await expect(currentReportPage).toHaveURL('https://cloud.google.com/devops/state-of-devops');

  // Check the ROI Report
  const [roiReportPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Get the Whitepaper' }).click(),
  ]);

  await expect(roiReportPage).toHaveURL('https://cloud.google.com/resources/roi-of-devops-transformation-whitepaper');

  // Test the "Read the ebook" link
  const ebookLink = page.getByRole('link', { name: 'Read the ebook' });
  const ebookLinkHref = await ebookLink.getAttribute('href');
  await expect(ebookLinkHref).toBe('https://services.google.com/fh/files/misc/devops_awards_fullebook_final.pdf');
});
