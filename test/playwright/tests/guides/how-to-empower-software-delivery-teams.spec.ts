import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/guides/how-to-empower-software-delivery-teams/');
});

test('Empower teams guide has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | How to empower software delivery teams as a business leader');
});

test('Empower teams guide has the correct header.', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('How to empower software delivery teams as a business leader');
});
