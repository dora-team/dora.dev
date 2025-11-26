import { test, expect } from '@playwright/test';

test.describe('Research Team page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research/team/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Research Team');
  });

  test('has the correct heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Meet DORA’s Research Team');
  });

  test('has correct number of researchers', async ({ page }) => {
    await expect(page.locator('h3')).toHaveCount(3);
  });

  test('lists the DORA Collective', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Meet the DORA Collective');
  });
});
