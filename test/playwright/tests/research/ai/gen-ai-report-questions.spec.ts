import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';
import { LAST_UPDATED_DATE_REGEX } from '../../constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/ai/gen-ai-report-questions/');
});

test('Gen AI report questions page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research Questions');
});

test('Gen AI report questions page lists the correct research collection.', async ({ page }) => {
  await expect(page.locator('h4')).toContainText('Responses to the following questions were used to inform the analysis published in the Impact of Generative AI in Software Development report.');
});

test('AI adoption survey questions page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test('AI adoption survey questions page displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
});
