
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

  test.describe('Mobile layout', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('additional publications do not overflow their list item container horizontally', async ({ page }) => {
      await page.goto('/research/');
      
      const pastResearchSection = page.locator('#_pw-research-archives');
      await expect(pastResearchSection).toBeVisible();
      
      const listItems = pastResearchSection.locator('ul.past-research-list li');
      const count = await listItems.count();
      expect(count).toBeGreaterThan(0);
      
      for (let i = 0; i < count; i++) {
        const li = listItems.nth(i);
        const labelLink = li.locator('a.label-link');
        const button = li.locator('a.button');
        
        const liBox = await li.boundingBox();
        const labelBox = await labelLink.boundingBox();
        const buttonBox = await button.boundingBox();
        
        expect(liBox).not.toBeNull();
        expect(labelBox).not.toBeNull();
        expect(buttonBox).not.toBeNull();
        
        const containerRight = liBox!.x + liBox!.width;
        const labelRight = labelBox!.x + labelBox!.width;
        const buttonRight = buttonBox!.x + buttonBox!.width;
        
        // Assert that the label fits horizontally within the list item container
        expect(labelRight).toBeLessThanOrEqual(containerRight + 1);
        // Assert that the button fits horizontally within the list item container
        expect(buttonRight).toBeLessThanOrEqual(containerRight + 1);
      }
    });
  });
});

