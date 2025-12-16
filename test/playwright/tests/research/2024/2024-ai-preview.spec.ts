import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '../../constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2024/ai-preview');
});

test('2024 AI preview has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | 2024 DORA Report Preview');
});

test('2024 AI preview has the correct header.', async ({ page }) => {
  await expect(page.locator('h1 >> nth=1')).toContainText('AI in the workplace: Adoption and impact');
});

test('2024 AI preview displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
});
