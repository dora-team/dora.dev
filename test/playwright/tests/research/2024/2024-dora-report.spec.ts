import { test, expect } from "@playwright/test";

const languageToUrlMap = {
  English: "2024-dora-accelerate-state-of-devops-report.pdf",
  Español: "2024-dora-accelerate-state-of-devops-report-es.pdf",
  "Español - América Latina":
    "2024-dora-accelerate-state-of-devops-report-es-419.pdf",
  Français: "2024-dora-accelerate-state-of-devops-report-fr.pdf",
  "Português - Brasil": "2024-dora-accelerate-state-of-devops-report-ptbr.pdf",
  "中文 – 简体": "2024-dora-accelerate-state-of-devops-report-zh-cn.pdf",
  繁體中文: "2024-dora-accelerate-state-of-devops-report-zh-tw.pdf",
  日本語: "2024-dora-accelerate-state-of-devops-report-ja.pdf",
  한국어: "2024-dora-accelerate-state-of-devops-report-ko.pdf",
};

const sponsors = [
  {
    name: "Catchpoint",
    src: "sponsors/catchpoint.png",
    href: "https://www.catchpoint.com/",
  },
  {
    name: "chronosphere",
    src: "sponsors/chronosphere.png",
    href: "https://chronosphere.io/",
  },
  {
    name: "Datadog",
    src: "sponsors/datadog.png",
    href: "https://www.datadoghq.com/",
  },
  {
    name: "Deloitte",
    src: "sponsors/deloitte.png",
    href: "https://www2.deloitte.com/",
  },
  {
    name: "Excella",
    src: "sponsors/excella.png",
    href: "https://www.excella.com/",
  },
  {
    name: "Gearset",
    src: "sponsors/gearset.png",
    href: "https://gearset.com/",
  },
  {
    name: "Liatrio",
    src: "sponsors/liatrio.png",
    href: "https://www.liatrio.com/",
  },
  {
    name: "Middleware",
    src: "sponsors/middleware.png",
    href: "https://www.middlewarehq.com/middleware-open-source?utm_source=dora_report",
  },
  {
    name: "Opsera",
    src: "sponsors/opsera.png",
    href: "https://www.opsera.io/",
  },
];

test.describe("2024 report page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/research/2024/dora-report/");
  });

  test("has the correct title.", async ({ page }) => {
    await expect(page).toHaveTitle(
      "DORA | Accelerate State of DevOps Report 2024",
    );
  });

  test("has the correct header.", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("DORA Research: 2024");
  });

  test("has the correct number of language options.", async ({ page }) => {
    const languageOptions = await page.locator("item a.button").count();
    const expectedLanguageCount = Object.keys(languageToUrlMap).length;
    await expect(languageOptions).toBe(expectedLanguageCount);
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

  test("has the correct report image", async ({ page }) => {
    const reportImage = page.locator(
      'img[src="2024-dora-accelerate-state-of-devops-report.png"]',
    );
    await expect(reportImage).toBeVisible();
    await expect(reportImage).toHaveAttribute(
      "alt",
      "Accelerate State of DevOps Report 2024",
    );
  });

  test("has the correct sponsors.", async ({ page }) => {
    for (const sponsor of sponsors) {
      const sponsorLink = page.getByRole("link", { name: sponsor.name });
      await expect(sponsorLink).toBeVisible();
      await expect(sponsorLink).toHaveAttribute("href", sponsor.href);
      await expect(sponsorLink.locator("img")).toHaveAttribute(
        "src",
        sponsor.src,
      );
    }
  });
});
