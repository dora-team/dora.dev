
import { test, expect } from '@playwright/test';

test.describe('In-page anchor links', () => {
  test('should not be obscured by the sticky header', async ({ page }) => {
    // Navigate to a page with an anchor link
    await page.goto('/research/team/#derek-debellis');

    // The target element of the anchor link
    const anchorTarget = page.locator('#derek-debellis');

    // The sticky header element
    const header = page.locator('header');

    // Get the bounding boxes of the elements
    const anchorTargetBoundingBox = await anchorTarget.boundingBox();
    const headerBoundingBox = await header.boundingBox();

    // Assert that the bounding boxes are not null
    expect(anchorTargetBoundingBox, 'The anchor target should be visible').not.toBeNull();
    expect(headerBoundingBox, 'The header should be visible').not.toBeNull();

    if (anchorTargetBoundingBox && headerBoundingBox) {
      // Assert that the top of the anchor target is not covered by the header
      expect(
        anchorTargetBoundingBox.y,
        'The top of the anchor target should be below the header'
      ).toBeGreaterThanOrEqual(headerBoundingBox.height);
    }
  });
});
