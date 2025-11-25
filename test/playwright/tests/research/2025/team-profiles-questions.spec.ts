import { test, expect } from '@playwright/test';

test.describe('Team Profiles questions page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research/2025/team-profiles/questions/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Team profiles survey questions');
  });

  test('has the correct header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('DORA Research: Team profiles survey questions');
  });

  test('has the correct intro text', async ({ page }) => {
    await expect(page.getByText('Responses to the following questions were used to assess team profiles in the 2025 report.')).toBeVisible();
  });
});
