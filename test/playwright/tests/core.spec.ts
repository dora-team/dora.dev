import { test, expect } from '@playwright/test';

test('explore core model', async ({ page }) => {
    await page.goto('/research/');
    await expect(page.locator('main')).toContainText('Core Model');
    await page.getByLabel('detail').check();
    await expect(page.locator('main')).toContainText('Failed deployment recovery time');
    await page.getByRole('link', { name: 'Failed deployment recovery' }).click();
    await expect(page.locator('main')).toContainText('Learn more about Failed deployment recovery time');
    await page.getByRole('link', { name: 'Failed deployment recovery time', exact: true }).press('Escape');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'download as PNG' }).click();
    const page1 = await page1Promise;
    await expect(page1.getByRole('img')).toBeVisible();
});