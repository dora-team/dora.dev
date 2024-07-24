import { test, expect } from '@playwright/test';

test('Publications page loads correctly', async ({ page }) => {
  await page.goto('/publications/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | DORA Publications');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Publications by DORA');

  // Click the "read the report" link and expect to be directed to https://cloud.google.com/devops/state-of-devops in a new tab
  const [currentReportPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Read the report' }).click(),
  ]);

  await expect(currentReportPage).toHaveURL('https://cloud.google.com/devops/state-of-devops');
});

// test('test', async ({ page }) => {
//   await page.goto('/publications/');
//   await page.getByRole('link', { name: 'Download the report' }).first().click();
//   const page1Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: 'English' }).click();
//   const page1 = await page1Promise;
//   await page.locator('body').press('ControlOrMeta+ArrowLeft');
//   await page.getByRole('link', { name: '2022', exact: true }).click();
//   await page.getByRole('link', { name: 'DORA Report' }).click();
//   const page2Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: 'English' }).click();
//   const page2 = await page2Promise;
//   await page.getByRole('link', { name: '2021' }).click();
//   await page.getByRole('link', { name: 'DORA Report' }).click();
//   const page3Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: 'English' }).click();
//   const page3 = await page3Promise;
//   await page.getByRole('link', { name: '2019' }).click();
//   await page.getByRole('link', { name: 'DORA Report' }).click();
//   const page4Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: 'Accelerate State of DevOps Report' }).click();
//   const page4 = await page4Promise;
// });