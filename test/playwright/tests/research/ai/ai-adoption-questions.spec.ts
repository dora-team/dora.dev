import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/ai/adopt-gen-ai/questions/');
});

test.skip('AI adoption survey questions page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | AI adoption research questions');
});

test.skip('AI adoption questions page lists the correct research collection.', async ({ page }) => {
  await expect(page.locator('h4')).toContainText('Responses to the following questions were used in the analysis of Helping developers adopt generative AI: Four practical strategies for organizations.');
});

test.skip('AI adoption survey questions page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test.skip('AI adoption survey questions page displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText('Last updated: ')
});
