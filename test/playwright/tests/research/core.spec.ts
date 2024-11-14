import { test, expect } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:1313';
const url = baseURL + "/research/"

test.describe('Core Model', () => {
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
