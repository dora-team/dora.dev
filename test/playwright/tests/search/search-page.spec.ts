import { test, expect } from '@playwright/test';

test('Perform a search for "generative"', async ({ page }) => {
    await page.goto('/search/');
    await expect(page.locator('#searchButton')).toContainText('search');
    await page.locator('#searchQuery').fill('generative');
    await page.getByRole('button', { name: 'search' }).click();
    await expect(page.locator('#webResultsContainer')).toContainText('Generative Organizational Culture');
    await expect(page.locator('#publicationResults')).toContainText('Read the full report');
    await expect(page.locator('[href*="ask.dora.dev"]')).toBeVisible();
});