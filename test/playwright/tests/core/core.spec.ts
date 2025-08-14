import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/research/');
  await expect(page.getByRole('heading', { name: 'Core Model' })).toBeVisible();
  await expect(page.locator('#app')).toContainText('Well-being');
  await page.getByText('detail').click();
  await expect(page.locator('#app')).toContainText('Service Level Objectives (SLOs):');
  await expect(page.locator('#fast-feedback')).toContainText('Reliability engineering');
  await page.getByRole('link', { name: 'Reliability engineering' }).click();
  await expect(page.locator('#entityPopover')).toContainText('embracing them');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'PNG' }).click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('img')).toBeVisible();
});