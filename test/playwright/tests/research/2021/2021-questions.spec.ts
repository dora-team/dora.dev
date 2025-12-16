import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2021/questions/');
});

test('2021 questions page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | DORA Research Questions');
});

test('2021 questions page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2021');
});

test('2021 questions page lists the correct report.', async ({ page }) => {
  await expect(page.locator('h4')).toContainText('Responses to the following questions were used in the analysis published in the 2021 Accelerate State of DevOps Report.');
});
