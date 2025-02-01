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
    await expect(page.locator('main')).toContainText('Learn more about failed deployment recovery time');
    await page.getByRole('link', { name: 'Failed deployment recovery time', exact: true }).press('Escape');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'PNG' }).click();
    const page1 = await page1Promise;
    await expect(page1.getByRole('img')).toBeVisible();
});

const coreCapabilitiesPopupTests = [
  {
    linkText: 'Climate for learning',
    learnMoreLink: 'Learn more about climate for learning',
    expectedH2: 'Capabilities that enable a Climate for Learning',
    expectedURLFragment: '#climate%20for%20learning',
  },
  {
    linkText: 'Fast flow',
    learnMoreLink: 'Learn more about fast flow',
    expectedH2: 'Capabilities that enable Fast Flow',
    expectedURLFragment: '#fast%20flow',
  },
  {
    linkText: 'Fast feedback',
    learnMoreLink: 'Learn more about fast feedback',
    expectedH2: 'Capabilities that enable Fast Feedback',
    expectedURLFragment: '#fast%20feedback',
  },
];

test.describe('Core capabilities popup tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/research/'); // Navigate to the main page before each test
      });

  coreCapabilitiesPopupTests.forEach(({ linkText, learnMoreLink, expectedH2, expectedURLFragment }, index) => {
    test(`Popup test for ${linkText}`, async ({ page }) => {
      await page.getByRole('link', { name: linkText }).click();
      const page1Promise = page.waitForEvent('popup');
      await page.getByRole('link', { name: learnMoreLink }).click();
      const page1 = await page1Promise;

      // Use the index to select the correct h2:
      await expect(page1.locator(`h2 >> nth=${index}`)).toContainText(expectedH2);

      await expect(page1.url()).toContain(expectedURLFragment);
    });
  });
});

