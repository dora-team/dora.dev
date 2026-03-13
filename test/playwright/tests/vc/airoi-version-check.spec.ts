import { test, expect } from '@playwright/test';

const versions = [
  { version: '2026.1', expectedText: 'ROI of AI-assisted Software Development' }
];

versions.forEach(({ version, expectedText }) => {
  test(`ROI of AI version checker recognizes v ${version}`, async ({ page }) => {
    await page.goto(`/vc/airoi/?v=${version}`);

    // Check the correct version is displayed
    const versionDiv = page.locator(`div[data-version="${version}"]`);
    await expect(versionDiv).toBeVisible();

    // Check the correct header text is displayed
    await expect(versionDiv.locator('h2')).toContainText(expectedText);

    // Check other versions are hidden (only one for now, but following the pattern)
    versions
      .filter((v) => v.version !== version)
      .forEach(async ({ version }) => {
        await expect(page.locator(`div[data-version="${version}"]`)).toBeHidden();
      });

    // Check "Unrecognized version" is hidden
    await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeHidden();
  });
});

const invalidVersions = ['', 'random', '123-456', '123.456'];

invalidVersions.forEach((version) => {
  test(`ROI of AI version checker handles ${version ? `'${version}'` : 'empty'} version`, async ({ page }) => {
    await page.goto(`/vc/airoi/?v=${version}`);

    // Check all known versions are hidden
    for (const { version } of versions) {
      await expect(page.locator(`div[data-version="${version}"]`)).toBeHidden();
    }

    // Check "Unrecognized version" is visible
    await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeVisible();
  });
});

test('ROI of AI version checker handles extra data in the query string', async ({ page }) => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const randomNumber2 = Math.floor(Math.random() * 1000) + 1;
  await page.goto(`/vc/airoi/?foo=${randomNumber}&bar=${randomNumber2}&v=2026.1`);

  // Check the correct version is displayed
  await expect(page.locator('div[data-version="2026.1"]')).toBeVisible();

  // Check "Unrecognized version" is hidden
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeHidden();
});

// No version specified
test('ROI of AI version checker has the correct title.', async ({ page }) => {
  await page.goto('/vc/airoi/');

  await expect(page).toHaveTitle('DORA | ROI of AI-assisted Software Development Version Check');
});

// 2026.1 version
test('ROI of AI version checker has the correct header.', async ({ page }) => {
  await page.goto('/vc/airoi/?v=2026.1');

  await expect(page.locator('h1')).toContainText('ROI of AI-assisted Software Development');
});
