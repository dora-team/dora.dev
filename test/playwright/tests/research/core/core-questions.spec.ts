import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';
import { LAST_UPDATED_DATE_REGEX } from '../../constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/core/questions/');
});

test('Core questions page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research Questions');
});

test('Core questions page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: Core');
});

test('Core questions page lists the correct report.', async ({ page }) => {
    await expect(page.locator('h4')).toContainText('Responses to the following questions were used in the analysis of the DORA Core Model.');
});

test('Core questions page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test('Core questions page displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
});
