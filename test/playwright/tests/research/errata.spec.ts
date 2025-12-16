
import { test, expect } from '@playwright/test';

const yearToURLMap: Record<string, string> = {
  'DORA AI Capabilities Model report': '/ai/capabilities-model/errata/',
  'State of AI-assisted Software Development 2025': '/research/2025/errata/',
  'Accelerate State of DevOps 2023': '/research/2023/errata/',
  'Accelerate State of DevOps 2024': '/research/2024/errata/',
  'Impact of Generative AI in Software Development': '/ai/gen-ai-report/errata/'
};

test.describe('Research errata page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research/errata/');
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DORA | DORA Research Errata');
  });

  test('has the correct header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('DORA Research Errata');
  });

  test.describe('links to all of the errata pages', () => {
    for (const [title, url] of Object.entries(yearToURLMap)) {
      test(`links to the ${title} page`, async ({ page }) => {
        const link = page.getByRole('link', { name: title, exact: true });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', url);
      });
    }
  });
});
