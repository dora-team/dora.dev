import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';


test.beforeEach(async ({ page }) => {
  await page.goto('/research/2020/');
});

test('2020 Research page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research: 2020');
});

test('2020 Research page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2020');
});

test('2020 Research page links to the ROI Report.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Read The ROI of DevOps' })).toHaveAttribute(
    'href',
    'https://cloud.google.com/resources/roi-of-devops-transformation-whitepaper'
  )

  await expect(page.getByRole('article').getByRole('link').nth(1)).toHaveAttribute(
    'href',
    'https://cloud.google.com/resources/roi-of-devops-transformation-whitepaper'
  )
});

test('2020 DORA report page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
