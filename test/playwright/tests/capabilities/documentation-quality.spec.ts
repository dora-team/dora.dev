import { test, expect } from '@playwright/test';

test('Documentation quality page loads correctly', async ({ page }) => {
  await page.goto('/capabilities/documentation-quality/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Capabilities: Documentation quality');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Documentation quality');

  // Check for table
  await expect(page.locator('table')).toBeVisible();

  // Check for links
  await expect(page.locator('a[href="/research/archives/2022/?tab_archives=questions"]')).toBeVisible();
  await expect(page.locator('a[href="/research/archives/2022/?tab_archives=structural-equation-model"]')).toBeVisible();
  await expect(page.locator('a[href="/research/2021/dora-report/2021-dora-accelerate-state-of-devops-report.pdf"]')).toBeVisible();
  await expect(page.locator('a[href="https://developers.google.com/tech-writing"]')).toBeVisible();
  await expect(page.locator('a[href="https://developers.google.com/style"]')).toBeVisible();
  await expect(page.locator('a[href="https://www.oreilly.com/library/view/software-engineering-at/9781492082781/"]')).toBeVisible();
  await expect(page.locator('a[href="https://cloud.google.com/blog/products/devops-sre/deep-dive-into-2022-state-of-devops-report-on-documentation"]')).toBeVisible();
  await expect(page.locator('a[href="/research/team/#michelle-irvine"]')).toBeVisible();
  await expect(page.locator('a[href="/research/team/#derek-debellis"]')).toBeVisible();

  //Check the sidebar
  await expect(page.getByRole('heading', { name: 'Climate for Learning', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Flow', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Feedback', exact: true })).toBeVisible();

  // This is a core capability
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();
});
