import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../../constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/ai/gen-ai-report/questions/');
});

test('Gen AI report questions page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Survey Questions');
});

test('Gen AI report questions page lists the correct research collection.', async ({ page }) => {
  await expect(page.locator('h4')).toContainText('Responses to the following questions were used to inform the analysis published in the Impact of Generative AI in Software Development report.');
});

test('Gen AI report survey questions page displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
});
