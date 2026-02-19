
import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/insights/adopt-gen-ai/questions/');
});

test('AI research questions page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | AI adoption research questions');
});

test('AI research questions page lists the correct report.', async ({ page }) => {
  await expect(page.locator('h4')).toContainText('Responses to the following questions were used in the analysis for Helping developers adopt generative AI: Four practical strategies for organizations.');
});

test('AI research questions page displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
});
