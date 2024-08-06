import { test, expect } from '@playwright/test';

export const toolsMap = {
  'Apache DevLake™': 'https://devlake.apache.org/',
  'Middleware': 'https://github.com/middlewarehq/middleware',
  'OpenDORA': 'https://github.com/DevoteamNL/opendora'
};

test.beforeEach(async ({ page }) => {
  await page.goto('/resources');
});

test('Resources page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Resources');
});

test('Resources page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Resources');
});

test('Resources page includes source-available tools.', async ({ page }) => {
  await expect(page.getByText('Source-available tools')).toBeVisible();
  for (const tool in toolsMap) {
    const url = toolsMap[tool];
    await expect(page.getByRole('link', { name: tool, exact: true })).toHaveAttribute(
      'href',
      url
    );
  }
});

test('Resources page includes books.', async ({ page }) => {
  await expect(page.getByText('Books')).toBeVisible();
});

test('Resources page includes graphics.', async ({ page }) => {
  await expect(page.getByText('Graphics')).toBeVisible();
});