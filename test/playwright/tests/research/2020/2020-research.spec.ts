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
  await expect(page.getByRole('link', { name: 'Download The ROI of DevOps Whitepaper' }).nth(1)).toHaveAttribute(
    'href',
    'the-roi-of-devops-transformation-google-cloud-dora.pdf'
  )
});

test('2020 DORA report page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
