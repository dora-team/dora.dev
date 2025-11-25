import { test, expect } from '@playwright/test';

const versions = [
  { version: '2025.2', expectedText: 'Impact of Generative AI on Software Development' },
  { version: '2025.1', expectedText: 'Impact of Generative AI on Software Development' },
  { version: '2025.2.p', expectedText: 'Impact of Generative AI on Software Development (Printed Version)' }
];

versions.forEach(({ version, expectedText }) => {
  test(`Gen AI version checker recognizes v ${version}`, async ({ page }) => {
    await page.goto(`/vc/genai/?v=${version}`);

    // Check the correct version is displayed
    const versionDiv = page.locator(`div[data-version="${version}"]`);
    await expect(versionDiv).toBeVisible();

    // Check the correct header text is displayed
    await expect(versionDiv.locator('h2')).toContainText(expectedText);

    // Check other versions are hidden
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
  test(`Gen AI version checker handles ${version ? `'${version}'` : 'empty'} version`, async ({ page }) => {
    await page.goto(`/vc/genai/?v=${version}`);

    // Check all known versions are hidden
    for (const { version } of versions) {
      await expect(page.locator(`div[data-version="${version}"]`)).toBeHidden();
    }

    // Check "Unrecognized version" is visible
    await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeVisible();
  });
});

test('Gen AI version checker handles extra data in the query string', async ({ page }) => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const randomNumber2 = Math.floor(Math.random() * 1000) + 1;
  await page.goto(`/vc/genai/?foo=${randomNumber}&bar=${randomNumber2}&v=2025.1`);

  // Check the correct version is displayed
  await expect(page.locator('div[data-version="2025.1"]')).toBeVisible();

  // Check other versions are hidden
  versions
    .filter((v) => v.version !== '2025.1')
    .forEach(async ({ version }) => {
      await expect(page.locator(`div[data-version="${version}"]`)).toBeHidden();
    });

  // Check "Unrecognized version" is hidden
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeHidden();
});

// No version specified
test('Gen AI version checker has the correct title.', async ({ page }) => {
  await page.goto('/vc/genai/');

  await expect(page).toHaveTitle('DORA | Impact of Generative AI on Software Development Version Check');
});

// 2025.1 version
test('Gen AI version checker has the correct header.', async ({ page }) => {
  await page.goto('/vc/genai/?v=2025.1');

  await expect(page.locator('h1')).toContainText('Impact of Generative AI on Software Development');
});
