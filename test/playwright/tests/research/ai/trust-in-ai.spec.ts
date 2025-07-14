import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';
import { LAST_UPDATED_DATE_REGEX } from '../../constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/ai/trust-in-ai/');
});

test('Trust in AI has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Fostering Trust in AI');
});

test('Trust in AI has the correct header.', async ({ page }) => {
  await expect(page.locator('h1 >> nth=1')).toContainText("Fostering developers' trust in generative artificial intelligence");
});

test('Trust in AI has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test('Trust in AI displays its last updated date', async ({ page }) => {
  await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
});
