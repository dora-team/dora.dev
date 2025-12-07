import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../../research/sidebarLinks';

const pages = [
  {
    url: '/research/2025/measurement-frameworks/',
    header: 'DORA Research: 2025',
    title: 'DORA | Choosing measurement frameworks to fit your organizational goals',
    name: '2025',
  },
  {
    url: '/ai/research-insights/measurement-frameworks/',
    title: 'DORA | Choosing measurement frameworks to fit your organizational goals',
    header: 'Choosing measurement frameworks to fit your organizational goals',
  },
  {
    url: '/experimental/insights/measurement-frameworks/',
    title: 'DORA | Choosing measurement frameworks to fit your organizational goals',
    header: 'Choosing measurement frameworks to fit your organizational goals',
  },
];

for (const pageConfig of pages) {
  test.describe(`Measurement frameworks page at ${pageConfig.url}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(pageConfig.url);
    });

    test('has the correct title.', async ({ page }) => {
      await expect(page).toHaveTitle(pageConfig.title);
    });

    test('has the correct header.', async ({ page }) => {
      await expect(page.getByRole('heading', { name: pageConfig.header })).toBeVisible();
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
