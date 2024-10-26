import { test, expect } from '@playwright/test';

const versions = [
  { version: '2024.2', expectedText: '2024 DORA Report' },
  { version: '2024.1', expectedText: '2024 DORA Report' },
  { version: '2023-12', expectedText: '2023 DORA Report' },
  { version: '2023-10', expectedText: '2023 DORA Report' },
];

versions.forEach(({ version, expectedText }) => {
  test(`Version checker recognizes v ${version}`, async ({ page }) => {
    await page.goto(`/vc/?v=${version}`);

    // Check the correct version is displayed
    await expect(page.locator(`div[data-version="${version}"]`)).toBeVisible();

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
  test(`Version checker handles ${version ? `'${version}'` : 'empty'} version`, async ({ page }) => {
    await page.goto(`/vc/?v=${version}`);

    // Check all known versions are hidden
    versions.forEach(async ({ version }) => {
      await expect(page.locator(`div[data-version="${version}"]`)).toBeHidden();
    });

    // Check "Unrecognized version" is visible
    await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeVisible();
  });
});

test('Version checker handles extra data in the query string', async ({ page }) => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const randomNumber2 = Math.floor(Math.random() * 1000) + 1;
  await page.goto(`/vc/?foo=${randomNumber}&bar=${randomNumber2}&v=2024.2`);

  // Check the correct version is displayed
  await expect(page.locator('div[data-version="2024.2"]')).toBeVisible();

  // Check other versions are hidden
  versions
    .filter((v) => v.version !== '2024.2')
    .forEach(async ({ version }) => {
      await expect(page.locator(`div[data-version="${version}"]`)).toBeHidden();
    });

  // Check "Unrecognized version" is hidden
  await expect(page.locator('h2', { hasText: 'Unrecognized version' })).toBeHidden();
});

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
