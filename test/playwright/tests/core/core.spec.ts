import { test, expect } from '@playwright/test';

test.describe('Core Model', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research/');
  });

  test('displays the Core Model heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Core Model' })).toBeVisible();
  });

  test('starts in summary view mode', async ({ page }) => {
    await expect(page.locator('#app')).toContainText('Well-being');
  });

  test('toggles between summary and detail views', async ({ page }) => {
    // Switch to detail view
    await page.getByText('detail').click();
    // Verify detail content appears
    await expect(page.locator('#app')).toContainText('Service Level Objectives (SLOs):');

    // Switch back to summary view
    await page.getByText('summary').click();
  });

  test('opens popover when clicking a node in summary view', async ({ page }) => {
    await page.getByText('Climate for learning').click();
    await expect(page.locator('#entityPopover')).toBeVisible();
    await expect(page.locator('#entityPopover')).toContainText('Climate for learning');
    await page.locator('#entityPopover').getByText('×').click();
  });

  test('opens popover when clicking a node in detail view', async ({ page }) => {
    await page.getByText('detail').click();
    await page.getByRole('link', { name: 'Reliability engineering' }).click();
    await expect(page.locator('#entityPopover')).toBeVisible();
    await expect(page.locator('#entityPopover')).toContainText('Reliability engineering');
    await page.locator('#entityPopover').getByText('×').click();
  });

  test('download links are present', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'PNG' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'PDF' })).toBeVisible();

    // Verify hrefs if possible
    const pngLink = page.getByRole('link', { name: 'PNG' });
    await expect(pngLink).toHaveAttribute('href', /.*\.png$/);

    const pdfLink = page.getByRole('link', { name: 'PDF' });
    await expect(pdfLink).toHaveAttribute('href', /.*\.pdf$/);
  });
});
