import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../../constants';
import { verifyAuthors } from '../../verify-authors';

const pages = [
  {
    url: '/ai/research-insights/concerns-beyond-accuracy-of-ai-output/',
    title: 'DORA | Concerns beyond the accuracy of AI output',
    header: 'Concerns beyond the accuracy of AI output',
  },
  {
    url: '/insights/concerns-beyond-accuracy-of-ai-output/',
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

    test('displays authors.', async ({ page }) => {
      await verifyAuthors(page);
    });
  });
}
