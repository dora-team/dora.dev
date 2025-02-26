import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/capabilities/documentation-quality/');
});

test('Documentation quality page loads correctly', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Capabilities: Documentation quality');
  await expect(page.locator('h1')).toContainText('Documentation quality');
});

test('Documentation quality page displays table', async ({ page }) => {
  await expect(page.locator('table')).toBeVisible();
});


test('Documentation quality page contains all expected links', async ({ page }) => {
  const links = [
    '/research/2022/questions/',
    '/research/2022/structural-equation-model/',
    '/research/2021/dora-report/',
    'https://developers.google.com/tech-writing',
    'https://developers.google.com/style',
    'https://www.oreilly.com/library/view/software-engineering-at/9781492082781/',
    'https://cloud.google.com/blog/products/devops-sre/deep-dive-into-2022-state-of-devops-report-on-documentation',
    '/research/team/#michelle-irvine',
    '/research/team/#derek-debellis',
  ];

  for (const link of links) {
    await expect(page.locator(`a[href="${link}"]`)).toBeVisible();
  }
});

test('Documentation quality page contains all expected headings', async ({ page }) => {
  const headings = ['Climate for Learning', 'Fast Flow', 'Fast Feedback'];
  for (const heading of headings) {
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }
});

test('Documentation quality page contains "core" link', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();
});
