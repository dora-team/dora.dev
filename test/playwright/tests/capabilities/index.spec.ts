import { test, expect } from '@playwright/test';

test('Capabilities index page loads correctly', async ({ page }) => {
  await page.goto('/capabilities/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Capabilities: Catalog');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('Capability catalog');
});

test('Capabilities index page displays AI tag', async ({ page }) => {
  await page.goto('/capabilities/');
  const capabilityCard = page.locator('article', { hasText: 'AI-accessible internal data' });
  await expect(capabilityCard.locator('.ai')).toBeVisible();
  await expect(capabilityCard.locator('.ai')).toHaveText('AI');
});
