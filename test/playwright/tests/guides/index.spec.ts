import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/guides/');
});

test('Guides page has the correct title.', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | DORA Guides');
});

test('Guides page has the correct header.', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('DORA Guides');
});

export const guideTitles = [
    "Value stream mapping for software delivery",
    "DORA’s software delivery metrics: the four keys",
    "How to empower software delivery teams as a business leader",
    "How to transform your organization",
    "How to enable your software delivery teams to innovate with generative AI"
];

// Loop over guideTitles and create a test for each one
guideTitles.forEach((title, index) => {
    test(`Guide page contains the title: ${title}`, async ({ page }) => {
        // Use nth to get the specific h2 element based on the index
        await expect(page.locator('h2').nth(index)).toContainText(title);
    });
});
