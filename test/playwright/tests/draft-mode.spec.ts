import { test, expect } from '@playwright/test';

const DRAFT_BACKGROUND_COLOR = 'rgb(240, 238, 234)';

test.describe('Draft Mode Indicator', () => {
  test('Draft page has draft indicator badge', async ({ page }) => {
    // Navigate to a known draft page
    await page.goto('/experimental/');

    // Check if the draft indicator is visible
    const draftIndicator = page.locator('.draft-indicator');
    await expect(draftIndicator).toBeVisible();
    await expect(draftIndicator).toHaveText(/Draft/i);

    // Check that the background color is NOT the old draft background color
    const body = page.locator('body');
    await expect(body).not.toHaveCSS('background-color', DRAFT_BACKGROUND_COLOR);
  });

  test('Non-draft page does not have draft indicator badge', async ({ page }) => {
    // Navigate to a known non-draft page (homepage)
    await page.goto('/');

    // Check if the draft indicator is NOT present
    const draftIndicator = page.locator('.draft-indicator');
    await expect(draftIndicator).not.toBeVisible();
  });
});
