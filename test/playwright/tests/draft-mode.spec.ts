import { test, expect } from '@playwright/test';

const DRAFT_BACKGROUND_COLOR = 'rgb(240, 238, 234)';

test.describe('Draft Mode Background', () => {
  test('Draft page has warm white background', async ({ page }) => {
    // Navigate to a known draft page
    await page.goto('/experimental/');

    // Check if the body has the draft-mode class
    await expect(page.locator('body')).toHaveClass(/draft-mode/);

    // Check the background color
    const body = page.locator('body');
    await expect(body).toHaveCSS('background-color', DRAFT_BACKGROUND_COLOR);
  });

  test('Non-draft page has default background', async ({ page }) => {
    // Navigate to a known non-draft page (homepage)
    await page.goto('/');

    // Check if the body does NOT have the draft-mode class
    await expect(page.locator('body')).not.toHaveClass(/draft-mode/);

    // Check the background color (should be white or whatever the default is, usually rgb(255, 255, 255) or defined by --dora-black text color on white bg)
    // The variable --background is white.
    const body = page.locator('body');
    // We expect it NOT to be warm white
    await expect(body).not.toHaveCSS('background-color', DRAFT_BACKGROUND_COLOR);
  });
});
