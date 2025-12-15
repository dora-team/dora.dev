import { test, expect } from '@playwright/test';

test.describe('PDF search results', () => {

  // Build out data to use for testing. We must include:
  // * each of the specialReports
  // * one each of the annual reports
  //   * one in the "Accelerate State of DevOps" era
  //   * one in the "State of DevOps" era
  // * The ROI report
  const reports = [
    {
      // Search for the API's known title to ensure we get the result
      searchQuery: '2025 State of AI-assisted Software Development',
      expectedTitle: '2025 State of AI-assisted Software Development',
      expectedLink: '/dora-report-2025',
      expectedImg: '/img/sodr_thumbnails/2025.png'
    },
    {
      searchQuery: 'DORA AI Capabilities Model report',
      expectedTitle: 'DORA AI Capabilities Model report',
      expectedLink: '/ai/capabilities-model/report/',
      expectedImg: '/img/sodr_thumbnails/aicmr.png'
    },
    {
      searchQuery: 'Impact of Generative AI in Software Development',
      expectedTitle: 'Impact of Generative AI in Software Development',
      expectedLink: '/ai/gen-ai-report/',
      expectedImg: '/img/sodr_thumbnails/gen-ai-report.png'
    },
    {
      searchQuery: '2024 State of DevOps',
      expectedTitle: 'Accelerate State of DevOps Report 2024',
      expectedLink: '/dora-report-2024',
      expectedImg: '/img/sodr_thumbnails/2024.png'
    },
    {
      searchQuery: '2017 State of DevOps',
      expectedTitle: 'State of DevOps Report 2017',
      expectedLink: '/dora-report-2017',
      expectedImg: '/img/sodr_thumbnails/2017.png'
    },
    {
      searchQuery: 'ROI of DevOps Transformation',
      expectedTitle: 'ROI of DevOps Transformation',
      expectedLink: '/dora-report-2020',
      expectedImg: '/img/sodr_thumbnails/2020.png'
    }
  ];

  for (const report of reports) {
    test(`should correctly display "${report.expectedTitle}"`, async ({ page }) => {
      await page.goto('/search/');

      // Perform Search
      await page.getByRole('searchbox', { name: 'Search dora.dev for...' }).fill(report.searchQuery);
      await page.getByRole('button', { name: 'search' }).click();

      // Ensure we have results in the publications section
      const resultsContainer = page.locator('#publicationResults');
      await expect(resultsContainer).toBeVisible();

      // Find the specific result by looking for the header text within the results
      // This is more robust than assuming it's the *first* result, though it likely will be.
      const resultCard = resultsContainer.locator('.publication', { hasText: report.expectedTitle }).first();

      await expect(resultCard).toBeVisible();

      // Verify Link (parent <a> tag)
      // Playwright locator for the card is inside the <a>, so we check the parent or look for the specific structure
      // Structure: <a href="..."> <div class="publication"> ... </div> </a>
      // So we can find the link that contains this card
      const resultLink = page.locator(`a:has(.publication:has-text("${report.expectedTitle}"))`).first();

      await expect(resultLink).toHaveAttribute('href', report.expectedLink);

      // Verify Thumbnail
      const img = resultCard.locator('.thumbnail img');
      await expect(img).toHaveAttribute('src', report.expectedImg);
    });
  }
});
