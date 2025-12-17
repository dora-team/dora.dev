
import { test, expect } from '@playwright/test';

test.describe('Research home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | Research');
  });

  test('lists all expected research collections', async ({ page }) => {
    const researchCollections = [
      'Artificial Intelligence', '2025', '2024', '2023', '2022',
      '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014',
      'The ROI of DevOps Transformation', 'DevOps Awards Winners 2021'
    ];

    // Use a locator with web-first assertions instead of manual $$eval
    const researchCollectionLabels = page.locator('#_pw-research-archives .label');

    // Checks that the list of elements has the exact text content in order
    await expect(researchCollectionLabels).toHaveText(researchCollections);

    // Verify that the labels are clickable links
    const researchCollectionLinks = page.locator('#_pw-research-archives a.label-link');
    await expect(researchCollectionLinks).toHaveCount(researchCollections.length);
  });

  test('has the correct main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'DORA’s Research Program' })).toBeVisible();
  });

  test('has an anchor for the Core Model section', async ({ page }) => {
    const coreModelAnchor = page.locator('#core-model');
    await expect(coreModelAnchor).toBeAttached();
  });
});
