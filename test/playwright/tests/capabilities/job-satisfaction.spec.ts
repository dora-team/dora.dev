import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/capabilities/job-satisfaction/');
});

test('2Job satisfaction page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Capabilities: Job Satisfaction');
});

test('Job satisfaction page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Job satisfaction');
});

test('Job satisfaction is a core capability.', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'core', exact: true })).toBeVisible();
});

test('Job satisfaction page displays a sidebar', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Climate for Learning', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Flow', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fast Feedback', exact: true })).toBeVisible();
});
