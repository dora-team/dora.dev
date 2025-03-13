import { test, expect } from '@playwright/test';

// baseURL default is defined in playwright.config.ts

export const heroImageToUrlMap = {
  '/research/ai/gen-ai-report/dora-impact-of-generative-ai-in-software-development-report.png': 'https://cloud.google.com/resources/content/dora-impact-of-gen-ai-software-development',
  '/img/quickcheck/hero_illustration.svg': '/quickcheck/',
  '/research/2024/dora-report-ai-preview-hero.png': '/research/ai/',
  '/img/features/google-cloud-next.png': 'https://cloud.withgoogle.com/next/25?utm_source=gamma&utm_medium=email&utm_campaign=FY25-Q2-global-EXP106-physicalevent-er-next25-mc&utm_content=dora-community-letter&utm_term=-',
  '/img/features/homepage-core-snipe.png': '/research/'
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Get Better at Getting Better')).toBeVisible();
});

test('Homepage has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Get Better at Getting Better');
});

test('Homepage has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Get Better at Getting Better');
});

for (const imageSrc in heroImageToUrlMap) {
  const imageName = imageSrc.substring(imageSrc.lastIndexOf('/') + 1, imageSrc.lastIndexOf('.'));
  const expectedUrl = heroImageToUrlMap[imageSrc];
  test(`Homepage hero image ${imageName} links to ${expectedUrl}`, async ({ page }) => {
    // Find the parent element (likely an <a> tag) that contains the image
    const imageContainer = page.locator(`img[src="${imageSrc}"]`).locator('xpath=..');

    // Check if the parent element is a link (<a> tag)
    const isLink = await imageContainer.evaluate((el) => el.tagName.toLowerCase() === 'a');

    if (isLink) {
      // If it's a link, get the href attribute
      const actualUrl = await imageContainer.getAttribute('href');
      // Assert that the href attribute matches the expected URL
      await expect(actualUrl).toBe(expectedUrl);
    } else {
      // If it's not a link, fail the test
      throw new Error(`Image ${imageName} is not wrapped in a link.`);
    }
  });
}
