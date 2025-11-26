import { test, expect } from '@playwright/test';

test.describe('AICM questions page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai/capabilities-model/questions/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/DORA AI Capabilities Model questions/);
  });

  test('has the "AI adoption" section with subheadings', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'AI adoption' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Reliance' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Trust' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Reflexive use' })).toBeVisible();
  });

  test('has the "AI capabilities" section with subheadings', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'AI capabilities' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Clear and communicated AI stance' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Healthy data ecosystems' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'AI-accessible internal data' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Strong version control practices' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Working in small batches' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'User-centric focus' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Quality internal platform' })).toBeVisible();
  });

  test('has the "Strong version control practices" subheading with nested questions', async ({ page }) => {
    await expect(page.locator('h4', { hasText: 'Strong version control practices' })).toBeVisible();
    await expect(page.getByText('Application code')).toBeVisible();
    await expect(page.getByText('When actively changing code or configuration').first()).toBeVisible();
  });

  test('has the "Outcomes" section with subheadings', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'Outcomes' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Team performance' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Code quality' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Individual effectiveness' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Product performance' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Reduced friction' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Software delivery throughput' })).toBeVisible();
    await expect(page.locator('h4', { hasText: 'Organizational performance' })).toBeVisible();
  });
});
