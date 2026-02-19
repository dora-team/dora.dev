import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';
import { verifyAuthors } from '../verify-authors';


const pages = [
  {
    url: '/research/2025/measurement-frameworks/',
    header: 'DORA Research: 2025',
    title: 'DORA | Choosing measurement frameworks to fit your organizational goals',
    name: '2025',
  },
  {
    url: '/insights/measurement-frameworks/',
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

    test('displays its last updated date', async ({ page }) => {
      await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
    });

    test('displays authors.', async ({ page }) => {
      await verifyAuthors(page);
    });
  });
}
