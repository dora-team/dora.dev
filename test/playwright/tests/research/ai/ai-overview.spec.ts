import { test, expect } from "@playwright/test";
import { sidebarLinks } from "../sidebarLinks";

test.describe("AI Research Overview Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/research/ai/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Artificial Intelligence");
  });

  test("has the correct headers", async ({ page }) => {
    await expect(page.locator("h2").first()).toContainText(
      "DORA AI Capabilities Model",
    );
    await expect(page.locator("h2").nth(1)).toContainText(
      "State of AI-assisted Software Development",
    );
    await expect(page.locator("h2").nth(2)).toContainText(
      "Impact of Gen AI in Software Development",
    );
  });

  test.describe("DORA AI Capabilities Model report section", () => {
    test("has the correct report image", async ({ page }) => {
      const reportImage = page.locator(
        'img[alt="DORA AI Capabilities Model report"]',
      );
      await expect(reportImage).toBeVisible();
      await expect(reportImage).toHaveAttribute(
        "src",
        "/research/shared/ai-capabilities-model-report/2025-dora-ai-capabilities-model-report.png",
      );
    });

    test("has the correct download button", async ({ page }) => {
      const downloadLink = page
        .locator('a:has-text("Download the report")')
        .first();
      await expect(downloadLink).toBeVisible();
      await expect(downloadLink).toHaveAttribute(
        "href",
        "https://cloud.google.com/dora/ai-capabilities-model/",
      );
    });
  });

  test.describe("State of AI-assisted Software Development section", () => {
    test("has the correct report image", async ({ page }) => {
      const reportImage = page.locator(
        'img[alt="State of AI-assisted Software Development"]',
      );
      await expect(reportImage).toBeVisible();
      await expect(reportImage).toHaveAttribute(
        "src",
        "/research/shared/dora-report-2025/2025-state-of-ai-assisted-software-development-report.png",
      );
    });

    test("has the correct download button", async ({ page }) => {
      const downloadLink = page
        .locator('a:has-text("Download the report")')
        .nth(1);
      await expect(downloadLink).toBeVisible();
      await expect(downloadLink).toHaveAttribute(
        "href",
        "https://cloud.google.com/dora",
      );
    });
  });

  test.describe("Impact of Gen AI in Software Development section", () => {
    test("has the correct report image", async ({ page }) => {
      const reportImage = page.locator(
        'img[alt="Impact of Generative AI in Software Development"]',
      );
      await expect(reportImage).toBeVisible();
      await expect(reportImage).toHaveAttribute(
        "src",
        "/research/ai/gen-ai-report/dora-impact-of-generative-ai-in-software-development-report.png",
      );
    });

    test("has the correct download button", async ({ page }) => {
      const downloadLink = page
        .locator('a:has-text("Download the report")')
        .nth(2);
      await expect(downloadLink).toBeVisible();
      await expect(downloadLink).toHaveAttribute(
        "href",
        "/research/ai/gen-ai-report/dora-impact-of-generative-ai-in-software-development.pdf",
      );
    });
  });

  test("has the correct sidebar", async ({ page }) => {
    for (const sidebarLink of sidebarLinks) {
      await expect(
        page.getByRole("link", { name: sidebarLink, exact: true }),
      ).toBeVisible();
    }
  });
});
