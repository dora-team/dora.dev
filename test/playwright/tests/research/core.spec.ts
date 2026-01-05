import { test, expect } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:1313';
const url = baseURL + "/research/"

test.describe('Core Model interactions', () => {
  test('should switch to detail view and update URL', async ({ page }) => {
    await page.goto(url);

    // Check initial view mode
    const summaryRadio = page.locator('#summary');
    const detailRadio = page.locator('#detail');
    expect(await summaryRadio.isChecked()).toBeTruthy();
    expect(await detailRadio.isChecked()).toBeFalsy();
    expect(page.url()).toBe(url); // No query parameter initially

    // Switch to detail view
    await detailRadio.click();

    // Assertions after switching
    expect(await summaryRadio.isChecked()).toBeFalsy();
    expect(await detailRadio.isChecked()).toBeTruthy();
    expect(page.url()).toBe(`${url}?view=detail`);
  });

  test('should switch to summary view and update URL', async ({ page }) => {
    await page.goto(`${url}?view=detail`); // Start in detail view

    // Check initial view mode
    const summaryRadio = page.locator('#summary');
    const detailRadio = page.locator('#detail');
    expect(await summaryRadio.isChecked()).toBeFalsy();
    expect(await detailRadio.isChecked()).toBeTruthy();

    // Switch to summary view
    await summaryRadio.click();

    // Assertions after switching
    expect(await summaryRadio.isChecked()).toBeTruthy();
    expect(await detailRadio.isChecked()).toBeFalsy();
    expect(page.url()).toBe(`${url}?view=summary`);
  });

  test('should load correct view based on URL parameter', async ({ page }) => {
    await page.goto(`${url}?view=detail`);

    // Check if detail view is loaded
    const detailRadio = page.locator('#detail');
    expect(await detailRadio.isChecked()).toBeTruthy();
  });
});

test('explore core model', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('main')).toContainText('Core Model');
  await page.getByLabel('detail').check();
  await expect(page.locator('main')).toContainText('Failed deployment recovery time');
  await page.getByRole('link', { name: 'Failed deployment recovery' }).click();
  await expect(page.locator('#entityPopover h1')).toHaveText('Failed deployment recovery time');
  await expect(page.getByRole('link', { name: 'Learn more about failed deployment recovery time' })).toBeVisible();
  await page.keyboard.press('Escape');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'PNG' }).click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('img')).toBeVisible();
});

test('core capabilities exclusion', async ({ page }) => {
  await page.goto(url);
  await page.getByLabel('detail').check();
  await page.getByRole('link', { name: 'Climate for learning' }).click();
  await expect(page.locator('#entityPopover h1')).toHaveText('Climate for learning');
  await expect(page.getByRole('link', { name: 'Learn more about climate for learning' })).toBeHidden();
});

test('mobile layout stacking', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone 12 width
  await page.goto(url);

  // Wait for the core model to load
  await expect(page.locator('.coremodel')).toBeVisible();

  const capabilities = page.locator('section.capabilities');
  const performance = page.locator('section.performance');
  const outcomes = page.locator('section.outcomes');

  await expect(capabilities).toBeVisible();
  await expect(performance).toBeVisible();
  await expect(outcomes).toBeVisible();

  const capabilitiesBox = await capabilities.boundingBox();
  const performanceBox = await performance.boundingBox();
  const outcomesBox = await outcomes.boundingBox();

  // Verify vertical stacking: capabilities above performance above outcomes
  expect(capabilitiesBox!.y + capabilitiesBox!.height).toBeLessThan(performanceBox!.y);
  expect(performanceBox!.y + performanceBox!.height).toBeLessThan(outcomesBox!.y);

  // Verify they are roughly the same x-coordinate (stacked)
  expect(Math.abs(capabilitiesBox!.x - performanceBox!.x)).toBeLessThan(20);
  expect(Math.abs(capabilitiesBox!.x - outcomesBox!.x)).toBeLessThan(20);
});
