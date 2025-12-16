import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../../constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2024/questions');
});

test('2024 survey questions page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research Questions');
});

test('2024 questions page lists the correct report.', async ({ page }) => {
  await expect(page.locator('h4')).toContainText('Responses to the following questions were used in the analysis published in the 2024 Accelerate State of DevOps Report.');
});

test('2024 survey questions page displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
});
