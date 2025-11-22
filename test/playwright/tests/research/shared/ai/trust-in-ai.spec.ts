import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../../sidebarLinks';
import { LAST_UPDATED_DATE_REGEX } from '../../../constants';

const pages = [
  {
    url: '/research/ai/trust-in-ai/',
    title: 'DORA | Fostering Trust in AI',
    header: "Fostering developers' trust in generative artificial intelligence",
  },
  {
    url: '/experimental/blog/trust-in-ai/',
    title: 'DORA | Fostering Trust in AI',
    header: "Fostering developers' trust in generative artificial intelligence",
  },
];

for (const pageConfig of pages) {
  test.describe(`Trust in AI page at ${pageConfig.url}`, () => {
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
      await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
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
