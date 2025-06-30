import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/ai/concerns-beyond-accuracy-of-ai-output/');
});

test("Developers' Concerns with AI has the correct title.", async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Concerns beyond the accuracy of AI output');
});

test("Developers' Concerns with AI has the correct header.", async ({ page }) => {
  await expect(page.locator('.mainContent h1')).toContainText("Concerns beyond the accuracy of AI output");
});

test("Developers' Concerns with AI has the correct sidebar.", async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test("Developers' Concerns with AI displays its last updated date", async ({ page }) => {
  await expect(page.locator('.updated')).toContainText(/Last updated: \w+ \d{1,2}, \d{4}/);
});
