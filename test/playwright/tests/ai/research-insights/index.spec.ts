
import { test, expect } from '@playwright/test';

test('AI Research Insights index page', async ({ page }) => {
  await page.goto('/ai/research-insights/');

  // Check unique header
  const h1s = page.locator('h1');
  await expect(h1s).toHaveCount(1);
  await expect(h1s.first()).toHaveText('AI: Research insights');

  // Check tabs
  const overviewTab = page.locator('tab_links a.selected');
  await expect(overviewTab).toHaveText('Overview');

  // Check that other tabs are present
  await expect(page.locator('tab_links a').filter({ hasText: 'Builder mindset' })).toBeVisible();
});
