import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

const testCases = [
  {
    url: '/research/2025/measurement-frameworks/',
    header: 'DORA Research: 2025',
    name: '2025',
  },
  {
    url: '/research/ai/measurement-frameworks/',
    header: 'DORA Research: Artificial Intelligence',
    name: 'AI',
  },
];

for (const { url, header, name } of testCases) {
  test.describe(`${name} measurement frameworks page`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test('has the correct title.', async ({ page }) => {
      await expect(page).toHaveTitle(
        'DORA | Choosing measurement frameworks to fit your organizational goals'
      );
    });

    test('has the correct header.', async ({ page }) => {
      await expect(page.locator('h1').first()).toContainText(header);
    });

    test('has the correct sidebar.', async ({ page }) => {
      await Promise.all(
        sidebarLinks.map((sidebarLink) =>
          expect(
            page.getByRole('link', { name: sidebarLink, exact: true })
          ).toBeVisible()
        )
      );
    });
  });
}