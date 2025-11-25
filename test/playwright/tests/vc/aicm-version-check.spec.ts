import { test, expect } from '@playwright/test';

const versions = [
  { version: '2025.1', expectedText: 'DORA AI Capabilities Model report' }
];

versions.forEach(({ version, expectedText }) => {
  test(`AICM version checker recognizes v ${version}`, async ({ page }) => {
    await page.goto(`/vc/aicm/?v=${version}`);

    // Check the correct version is displayed
    const versionDiv = page.locator(`div[data-version="${version}"]`);
    await expect(versionDiv).toBeVisible();

    // Check the correct header text is displayed
    await expect(versionDiv.locator('h2')).toContainText(expectedText);

    // Check "Unrecognized version" is hidden
    await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeHidden();
  });
});

const invalidVersions = ['', 'random', '123-456', '123.456'];

invalidVersions.forEach((version) => {
  test(`AICM version checker handles ${version ? `'${version}'` : 'empty'} version`, async ({ page }) => {
    await page.goto(`/vc/aicm/?v=${version}`);

    // Check all known versions are hidden
    for (const { version } of versions) {
      await expect(page.locator(`div[data-version="${version}"]`)).toBeHidden();
    }

    // Check "Unrecognized version" is visible
    await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeVisible();
  });
});

test('AICM version checker handles extra data in the query string', async ({ page }) => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const randomNumber2 = Math.floor(Math.random() * 1000) + 1;
  await page.goto(`/vc/aicm/?foo=${randomNumber}&bar=${randomNumber2}&v=2025.1`);

  // Check the correct version is displayed
  await expect(page.locator('div[data-version="2025.1"]')).toBeVisible();

  // Check "Unrecognized version" is hidden
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeHidden();
});

// No version specified
test('AICM version checker has the correct title.', async ({ page }) => {
  await page.goto('/vc/aicm/');

  await expect(page).toHaveTitle(/DORA AI Capabilities Model report/);
});
