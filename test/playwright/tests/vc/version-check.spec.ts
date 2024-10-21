import { test, expect } from '@playwright/test';

// No version specified
test('Version checker has the correct title.', async ({ page }) => {
  await page.goto('/vc/');
  await expect(page).toHaveTitle('DORA | DORA Report Version Check');
});

// 2024.1 version
test('Version checker has the correct header.', async ({ page }) => {
  await page.goto('/vc/?v=2024.1');
  await expect(page.locator('h1')).toContainText('DORA Report Version Check');
});

test('Version checker recognizes v 2024.1', async ({ page }) => {
  await page.goto('/vc/?v=2024.1');
  await expect(page.locator('h2:has-text("2024 DORA Report")').first()).toBeVisible();
  await expect(page.locator('h2:has-text("2023 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').last()).toBeHidden();
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeHidden();
});

test('Version checker recognizes v 2023-12', async ({ page }) => {
  await page.goto('/vc/?v=2023-12');
  await expect(page.locator('h2:has-text("2024 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').first()).toBeVisible();
  await expect(page.locator('h2:has-text("2023 DORA Report")').last()).toBeHidden();
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeHidden();
});

test('Version checker recognizes v 2023-10', async ({ page }) => {
  await page.goto('/vc/?v=2023-10');
  await expect(page.locator('h2:has-text("2024 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').last()).toBeVisible();
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeHidden();
});

test('Version checker handles empty version', async ({ page }) => {
  await page.goto('/vc/?v=');
  await expect(page.locator('h2:has-text("2024 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').last()).toBeHidden();
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeVisible();
});

test('Version checker handles no query', async ({ page }) => {
  await page.goto('/vc/');
  await expect(page.locator('h2:has-text("2024 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').last()).toBeHidden();
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeVisible();
});

test('Version checker handles bogus version', async ({ page }) => {
  // Generate a random number between 1 and 1000
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  await page.goto('/vc/?v=' + randomNumber);
  await expect(page.locator('h2:has-text("2024 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').last()).toBeHidden();
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeVisible();
});

test('Version checker handles bogus two part version', async ({ page }) => {
  // Generate a random number between 1 and 1000
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const randomNumber2 = Math.floor(Math.random() * 1000) + 1;
  await page.goto('/vc/?v=' + randomNumber + '-' + randomNumber2);
  await expect(page.locator('h2:has-text("2024 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').last()).toBeHidden();
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeVisible();
});

test('Version checker handles extra data in the query string', async ({ page }) => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const randomNumber2 = Math.floor(Math.random() * 1000) + 1;
  await page.goto('/vc/?foo=' + randomNumber + '&bar=' + randomNumber2 + '&v=2024.1');
  await expect(page.locator('h2:has-text("2024 DORA Report")').first()).toBeVisible();
  await expect(page.locator('h2:has-text("2023 DORA Report")').first()).toBeHidden();
  await expect(page.locator('h2:has-text("2023 DORA Report")').last()).toBeHidden();
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeHidden();
});
