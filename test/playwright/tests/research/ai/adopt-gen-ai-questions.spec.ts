import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/ai/questions');
});

test('AI research questions page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | AI adoption research questions');
});

test('AI research questions page lists the correct report.', async ({ page }) => {
  await expect(page.locator('h4')).toContainText('Responses to the following questions were used in the analysis for Helping developers adopt generative AI: Four practical strategies for organizations.');
});

test('AI research questions page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test('AI research questions page displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText('Last updated: ')
});
