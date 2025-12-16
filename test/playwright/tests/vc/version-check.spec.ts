import { test, expect } from '@playwright/test';

test.describe('Version Checker', () => {
  const versions = [
    {
      version: '2025.2',
      expectedText: '2025 DORA Report',
      expectedImage:
        '/research/shared/dora-report-2025/2025-state-of-ai-assisted-software-development-report.png',
    },
    {
      version: '2025.2.a',
      expectedText: '2025 DORA Report (Abridged Version)',
      expectedImage:
        '/research/shared/dora-report-2025/2025-state-of-ai-assisted-software-development-report.png',
    },
    {
      version: '2025.2.p',
      expectedText: '2025 DORA Report (Printed Version)',
      expectedImage:
        '/research/shared/dora-report-2025/2025-state-of-ai-assisted-software-development-report.png',
    },
    {
      version: '2025.1',
      expectedText: 'Outdated 2025 DORA Report',
    },
    {
      version: '2024.3',
      expectedText: '2024 DORA Report (Digital Version)',
      expectedImage:
        '/research/2024/dora-report/2024-dora-accelerate-state-of-devops-report.png',
      expectNewerReportsLink: true,
    },
    {
      version: '2024.3.p',
      expectedText: '2024 DORA Report (Printed Version)',
      expectedImage:
        '/research/2024/dora-report/2024-dora-accelerate-state-of-devops-report.png',
      expectNewerReportsLink: true,
    },
    {
      version: '2024.2',
      expectedText: 'Outdated 2024 DORA Report',
      expectNewerReportsLink: true,
    },
    {
      version: '2024.1',
      expectedText: 'Outdated 2024 DORA Report',
      expectNewerReportsLink: true,
    },
    {
      version: '2023-12',
      expectedText: '2023 DORA Report',
      expectNewerReportsLink: true,
    },
    {
      version: '2023-10',
      expectedText: 'Outdated 2023 DORA Report',
      expectNewerReportsLink: true,
    },
  ];

  versions.forEach(
    ({ version, expectedText, expectedImage, expectNewerReportsLink }) => {
      test.describe(`v ${version}`, () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(`/vc/?v=${version}`);
        });

        test('shows the correct version information', async ({ page }) => {
          const versionDiv = page.locator(`div[data-version="${version}"]`);
          await expect(versionDiv).toBeVisible();
          await expect(
            versionDiv.getByRole('heading', { name: expectedText, level: 2 }),
          ).toBeVisible();
        });

        if (expectedImage) {
          test('shows the correct image', async ({ page }) => {
            const versionDiv = page.locator(`div[data-version="${version}"]`);
            await expect(versionDiv.getByRole('img')).toHaveAttribute('src', expectedImage);
          });
        }

        if (expectNewerReportsLink) {
          test('shows the "Newer Reports Available" section', async ({ page }) => {
            const versionDiv = page.locator(`div[data-version="${version}"]`);
            await expect(
              versionDiv.getByRole('heading', { name: 'Newer DORA reports available', level: 3 }),
            ).toBeVisible();
            await expect(
              versionDiv.getByRole('link', { name: "View all of DORA's publications" }),
            ).toHaveAttribute('href', '/research/publications/');
          });
        } else {
          test('does not show the "Newer Reports Available" section', async ({ page }) => {
            await expect(
              page.getByRole('heading', { name: 'Newer DORA reports available', level: 3 }),
            ).toBeHidden();
          });
        }

        test('hides other versions', async ({ page }) => {
          for (const otherVersion of versions.filter(v => v.version !== version)) {
            await expect(page.locator(`div[data-version="${otherVersion.version}"]`)).toBeHidden();
          }
        });

        test('hides the "Unrecognized version" message', async ({ page }) => {
          await expect(
            page.getByRole('heading', { name: 'Unrecognized version', level: 2 }),
          ).toBeHidden();
        });
      });
    },
  );

  const invalidVersions = ['', 'random', '123-456', '123.456'];

  invalidVersions.forEach((version) => {
    test(`handles ${version ? `'${version}'` : 'empty'} version`, async ({
      page,
    }) => {
      await page.goto(`/vc/?v=${version}`);

      // Check all known versions are hidden
      for (const { version } of versions) {
        await expect(page.locator(`div[data-version="${version}"]`)).toBeHidden();
      }

      // Check "Unrecognized version" is visible
      await expect(
        page.getByRole('heading', { name: 'Unrecognized version', level: 2 }),
      ).toBeVisible();
    });
  });

  test('handles extra data in the query string', async ({
    page,
  }) => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const randomNumber2 = Math.floor(Math.random() * 1000) + 1;
    await page.goto(`/vc/?foo=${randomNumber}&bar=${randomNumber2}&v=2024.3`);

    // Check the correct version is displayed
    await expect(page.locator('div[data-version="2024.3"]')).toBeVisible();

    // Check other versions are hidden
    for (const otherVersion of versions.filter(v => v.version !== '2024.3')) {
      await expect(page.locator(`div[data-version="${otherVersion.version}"]`)).toBeHidden();
    }

    // Check "Unrecognized version" is hidden
    await expect(
      page.getByRole('heading', { name: 'Unrecognized version', level: 2 }),
    ).toBeHidden();
  });

  test('has the correct title', async ({ page }) => {
    await page.goto('/vc/');

    await expect(page).toHaveTitle('DORA | DORA Report Version Check');
  });

  test('has the correct header', async ({ page }) => {
    await page.goto('/vc/?v=2024.1');

    await expect(page.getByRole('heading', { name: 'DORA Report Version Check', level: 1 })).toBeVisible();
  });
});
