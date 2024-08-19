import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/guides/value-stream-management/');
});

test('VSM guide has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Value stream mapping for software delivery');
});

test('VSM guide has the correct header.', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('How to use value stream mapping to improve software delivery');
});
