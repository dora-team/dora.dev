import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../../sidebarLinks';

const pages = [
  {
    url: '/research/ai/concerns-beyond-accuracy-of-ai-output/',
    title: 'DORA | Concerns beyond the accuracy of AI output',
    header: 'Concerns beyond the accuracy of AI output',
  },
  {
    url: '/experimental/blog/concerns-beyond-accuracy-of-ai-output/',
    title: 'DORA | Concerns beyond the accuracy of AI output',
    header: 'Concerns beyond the accuracy of AI output',
  },
];

for (const pageConfig of pages) {
  test.describe(`Concerns beyond accuracy page at ${pageConfig.url}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(pageConfig.url);
    });

    test('has the correct title.', async ({ page }) => {
      await expect(page).toHaveTitle(pageConfig.title);
    });

    test('has the correct header.', async ({ page }) => {
      await expect(page.getByRole('heading', { name: pageConfig.header })).toBeVisible();
    });

    test('displays its last updated date', async ({ page }) => {
      await expect(page.locator('.updated')).toContainText(/Last updated: \w+ \d{1,2}, \d{4}/);
    });

    if (pageConfig.url.includes('/research/')) {
      test('has the correct sidebar.', async ({ page }) => {
        for (const sidebarLink of sidebarLinks) {
          await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
        }
      });
    }
  });
}
