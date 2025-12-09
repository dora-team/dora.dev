import { test, expect } from "@playwright/test";

test.describe("Publications Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/publications/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | DORA Publications");
  });

  test("has the correct header", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Publications by DORA");
  });

  test("has a link to the sponsor page", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Sponsorship opportunities" }),
    ).toHaveAttribute("href", "/sponsors/");
  });

  test.describe("DORA AI Capabilities Model report", () => {
    test("links to the report", async ({ page }) => {
      const reportLink = page
        .locator("section.publicationHighlight")
        .filter({ hasText: "DORA AI Capabilities Model report" })
        .getByRole("link", { name: "Download the report" });
      await expect(reportLink).toHaveAttribute(
        "href",
        "https://cloud.google.com/resources/content/2025-dora-ai-capabilities-model-report",
      );
    });

    test("shows the report image", async ({ page }) => {
      const reportImage = page
        .locator("section.publicationHighlight")
        .filter({ hasText: "DORA AI Capabilities Model report" })
        .getByRole("img");
      await expect(reportImage).toBeVisible();
    });
  });

  test.describe("State of AI-assisted Software Development", () => {
    test("links to the report", async ({ page }) => {
      const reportLink = page
        .locator("section.publicationHighlight")
        .filter({ hasText: "finds that AI's primary role" })
        .getByRole("link", { name: "Download the report" });
      await expect(reportLink).toHaveAttribute(
        "href",
        "https://cloud.google.com/dora",
      );
    });

    test("shows the report image", async ({ page }) => {
      const reportImage = page
        .locator("section.publicationHighlight")
        .filter({ hasText: "finds that AI's primary role" })
        .getByRole("img");
      await expect(reportImage).toBeVisible();
    });
  });

  test.describe("Prior State of DevOps Reports", () => {
    const reports = [
      {
        name: "Impact of Generative AI in Software Development",
        url: "/ai/gen-ai-report/",
        hasImage: true,
      },
      {
        name: "2024 Accelerate State of DevOps Report",
        url: "/research/2024/dora-report/",
        hasImage: true,
      },
      {
        name: "2023 Accelerate State of DevOps Report",
        url: "/research/2023/dora-report/",
        hasImage: true,
      },
      {
        name: "2022 Accelerate State of DevOps Report",
        url: "/research/2022/dora-report/",
        hasImage: true,
      },
      {
        name: "2021 Accelerate State of DevOps Report",
        url: "/research/2021/dora-report/",
        hasImage: true,
      },
      {
        name: "2019 Accelerate State of DevOps Report",
        url: "/research/2019/dora-report/",
        hasImage: true,
      },
      {
        name: "2018 Accelerate State of DevOps Report",
        url: "/research/2018/dora-report/",
        hasImage: true,
      },
      {
        name: "2017 State of DevOps Report",
        url: "/research/2017",
        hasImage: true,
      },
      {
        name: "2016 State of DevOps Report",
        url: "/research/2016/",
        hasImage: true,
      },
      {
        name: "2015 State of DevOps Report",
        url: "/research/2015/",
        hasImage: true,
      },
      {
        name: "2014 State of DevOps Report",
        url: "/research/2014/",
        hasImage: true,
      },
    ];

    for (const report of reports) {
      test(`links to the ${report.name}`, async ({ page }) => {
        const reportLink = page
          .locator("li", { hasText: report.name })
          .getByRole("link", { name: "Download the report" });
        await expect(reportLink).toHaveAttribute("href", report.url);
      });

      if (report.hasImage) {
        test(`shows the image for ${report.name}`, async ({ page }) => {
          const reportLocator = page.locator("li", { hasText: report.name });
          const reportImage = reportLocator.getByRole("img");
          await expect(reportImage).toBeVisible();
        });
      }
    }
  });

  test.describe("Additional Publications", () => {
    test("links to the ROI report", async ({ page }) => {
      const reportLink = page
        .locator("li", { hasText: "The ROI of DevOps Transformation" })
        .getByRole("link", { name: "Download the Whitepaper" });
      await expect(reportLink).toHaveAttribute("href", "/research/2020/");
    });

    test("links to the DORA awards ebook", async ({ page }) => {
      const reportLink = page
        .locator("li", { hasText: "DevOps Awards Winners 2021" })
        .getByRole("link", { name: "Read the ebook" });
      await expect(reportLink).toHaveAttribute(
        "href",
        "https://services.google.com/fh/files/misc/devops_awards_fullebook_final.pdf",
      );
    });
  });
});
