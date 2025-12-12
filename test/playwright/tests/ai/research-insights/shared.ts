import { Page, expect } from '@playwright/test';

export async function verifyAuthors(page: Page) {
  const authorsHeading = page.locator('.authors');
  await expect(authorsHeading).toBeVisible();
  await expect(authorsHeading).toContainText('by');
  // Verify at least one author link exists
  await expect(page.locator('.authors .author').first()).toBeVisible();
}
