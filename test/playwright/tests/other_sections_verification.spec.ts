import { test, expect } from '@playwright/test';

const otherPagesToTest = [
  { path: '/news/dora-joins-google-cloud/', expectedTitle: 'DORA | Dora Joins Google Cloud' },
  { path: '/research/', expectedTitle: 'DORA | Research' },
  { path: '/insights/', expectedTitle: 'DORA | DORA Insights' },
];

test.describe('Other Sections Title Verification', () => {
  for (const { path, expectedTitle } of otherPagesToTest) {
    test(`should have correct title for ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(expectedTitle);
    });
  }
});
