import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/guides/dora-metrics-four-keys/');
});

test('Four kesy guide has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | DORA’s software delivery metrics: the four keys');
});

test('Four keys guide has the correct header.', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('DORA’s software delivery metrics: the four keys');
});
