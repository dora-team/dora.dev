import { test, expect } from "@playwright/test";
import { researchPartners } from "./research-partners";

const languageToUrlMap = {
  English: "https://cloud.google.com/dora?hl=en&region=US",
  Español: "https://cloud.google.com/dora?hl=es&region=ES",
  "Español - América Latina": "https://cloud.google.com/dora?hl=es-419&region=MX",
  Français: "https://cloud.google.com/dora?hl=fr&region=FR",
  "Português - Brasil": "https://cloud.google.com/dora?hl=pt-br&region=BR",
  "中文 – 简体": "https://cloud.google.com/dora?hl=zh-cn&region=CN",
  繁體中文: "https://cloud.google.com/dora?hl=zh-tw&region=TW",
  日本語: "https://cloud.google.com/dora?hl=ja&region=JP",
  한국어: "https://cloud.google.com/dora?hl=ko&region=KR",
};

test.describe("2025 DORAReport page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/research/2025/dora-report/");
  });

  test("has the correct title.", async ({ page }) => {
    await expect(page).toHaveTitle(
      "DORA | State of AI-assisted Software Development 2025",
    );
  });

  test("has the correct header.", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("DORA Research: 2025");
  });

  test("has the correct report image", async ({ page }) => {
    const reportImage = page.locator(
      'img[src="/research/shared/dora-report-2025/2025-state-of-ai-assisted-software-development-report.png"]',
    );
    await expect(reportImage).toBeVisible();
    await expect(reportImage).toHaveAttribute(
      "alt",
      "State of AI-assisted Software Development 2025",
    );
    await expect(reportImage.locator("..")).toHaveAttribute(
      "href",
      "https://cloud.google.com/dora?hl=en&region=US",
    );
  });

  test("has the correct number of language options.", async ({ page }) => {
    const languageOptions = await page.locator("item a.button").count();
    const expectedLanguageCount = Object.keys(languageToUrlMap).length;
    await expect(languageOptions).toBe(expectedLanguageCount);
  });

  test("has visual separation labels for Full and Abridged versions", async ({ page }) => {
    await expect(page.locator("text=Full report")).toBeVisible();
    await expect(page.locator("text=Abridged versions")).toBeVisible();
  });

  for (const [language, url] of Object.entries(languageToUrlMap)) {
    test(`links to the correct ${language} URL`, async ({ page }) => {
      const languageLink = page.getByRole("link", {
        name: language,
        exact: true,
      });
      await expect(languageLink).toHaveAttribute("href", url);
    });
  }

  test("Research Partners section is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Research Partners", level: 3 }),
    ).toBeVisible();
  });

  for (const partnerLevel of researchPartners) {
    test(`Partner Level: ${partnerLevel.level} is visible`, async ({
      page,
    }) => {
      await expect(
        page.getByRole("heading", {
          name: partnerLevel.level,
          level: 4,
          exact: true,
        }),
      ).toBeVisible();
    });

    for (const partner of partnerLevel.partners) {
      test(`Partner: ${partner.name} is visible`, async ({ page }) => {
        const link = page.getByRole("link", { name: partner.name });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", partner.href);
      });
    }
  }
});
