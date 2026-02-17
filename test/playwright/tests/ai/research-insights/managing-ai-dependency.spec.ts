import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../../constants';
import { verifyAuthors } from '../../verify-authors';

const pages = [
  {
    url: '/ai/research-insights/managing-ai-dependency/',
    title: 'DORA | Managing AI dependency: How students are establishing guardrails with AI',
    header: 'Managing AI dependency',
  },
  {
    url: '/insights/managing-ai-dependency/',
    title: 'DORA | Managing AI dependency',
    header: 'Managing AI dependency',
  },
];

for (const pageConfig of pages) {
  test.describe(`Managing AI dependency page at ${pageConfig.url}`, () => {
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
