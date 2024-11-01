import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/research/team/');
});

test('Research Team page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Research Team');
});

test('Research Team page has the correct heading', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Meet DORA’s Research Team');
});

test('Research Team page has correct number of researchers', async ({ page }) => {
  const sizeOfResearchTeam = await page.locator('h3').count();
  await expect(sizeOfResearchTeam).toBe(5);
});

test('Research Team page lists the DORA Collective', async ({ page }) => {
  await expect(page.locator('h2')).toContainText('Meet the DORA Collective');
});
