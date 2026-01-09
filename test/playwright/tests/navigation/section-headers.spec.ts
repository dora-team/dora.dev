import { test, expect } from '@playwright/test';

// Configuration for each section's header behavior
const sectionConfigs = [
  {
    name: 'AI',
    slug: 'ai',
    displayName: 'Artificial Intelligence',
    indexPath: '/ai/',
    subPagePath: '/ai/capabilities-model/',
    showOnIndex: true, // Header appears on index page
    clickableOnIndex: false, // But is not clickable
  },
  {
    name: 'Capabilities',
    slug: 'capabilities',
    displayName: 'Capabilities',
    indexPath: '/capabilities/',
    subPagePath: '/capabilities/continuous-integration/',
    showOnIndex: false, // Header does not appear on index page (has custom header)
    clickableOnIndex: false,
  },
  {
    name: 'Research',
    slug: 'research',
    displayName: 'Research',
    indexPath: '/research/',
    subPagePath: '/research/2025/',
    showOnIndex: false, // Header does not appear on index page (has custom header)
    clickableOnIndex: false,
  },
  {
    name: 'Insights',
    slug: 'insights',
    displayName: 'Insights',
    indexPath: '/insights/',
    subPagePath: '/insights/dora-2025-year-in-review/',
    showOnIndex: true, // Header appears on index page
    clickableOnIndex: false, // But is not clickable
  },
];

test.describe('Section Headers', () => {
  for (const config of sectionConfigs) {
    test.describe(`${config.name} section header`, () => {
      test.beforeEach(async ({ page }) => {
        // Navigate to a sub-page where the header is displayed
        await page.goto(config.subPagePath);
      });

      test('header link is fully clickable including icon area', async ({ page }) => {
        const headerLink = page.locator(`.section-header.${config.slug} a.content`);
        await expect(headerLink).toBeVisible();
        await expect(headerLink).toHaveAttribute('href', `/${config.slug}/`);
        await expect(headerLink).toHaveText(config.displayName);
      });

      test(`clicking on the header navigates to ${config.name} section`, async ({ page }) => {
        const headerLink = page.locator(`.section-header.${config.slug} a.content`);
        await headerLink.click();
        await expect(page).toHaveURL(new RegExp(`\\/${config.slug}\\/?$`));
      });

      test('clicking on the left side (icon area) is clickable', async ({ page }) => {
        const headerLink = page.locator(`.section-header.${config.slug} a.content`);
        // Click on the left side where the icon is (10px from left)
        await headerLink.click({ position: { x: 10, y: 30 } });
        await expect(page).toHaveURL(new RegExp(`\\/${config.slug}\\/?$`));
      });

      // Test index page behavior
      if (config.showOnIndex && !config.clickableOnIndex) {
        test(`header appears on ${config.name} index page but is not clickable`, async ({ page }) => {
          await page.goto(config.indexPath);
          const header = page.locator(`.section-header.${config.slug}`);
          await expect(header).toBeVisible();

          // Should have a div.content, not a.content
          const headerDiv = page.locator(`.section-header.${config.slug} div.content`);
          await expect(headerDiv).toBeVisible();
          await expect(headerDiv).toHaveText(config.displayName);

          // Should NOT have a clickable link
          const headerLink = page.locator(`.section-header.${config.slug} a.content`);
          await expect(headerLink).not.toBeVisible();
        });
      } else if (!config.showOnIndex) {
        test(`header does not appear on ${config.name} index page`, async ({ page }) => {
          await page.goto(config.indexPath);
          const header = page.locator(`.section-header.${config.slug}`);
          await expect(header).not.toBeVisible();
        });
      }
    });
  }
});
