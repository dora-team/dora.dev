import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../../constants';
import { verifyAuthors } from './shared';

const pages = [
  {
    url: '/ai/research-insights/value-of-development-work/',
    title: 'DORA | How gen AI affects the value of development work',
    header: 'How gen AI affects the value of development work',
  },
  {
    url: '/experimental/insights/value-of-development-work/',
    title: 'DORA | How gen AI affects the value of development work',
    header: 'How gen AI affects the value of development work',
  },
];

for (const pageConfig of pages) {
  test.describe(`Value of development work page at ${pageConfig.url}`, () => {
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
