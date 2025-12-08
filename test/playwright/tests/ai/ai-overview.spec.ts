import { test, expect } from "@playwright/test";

test.describe("AI Research Overview Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ai/");
  });

  test("has the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("DORA | Artificial Intelligence");
  });

  test("has the correct headers", async ({ page }) => {
    await expect(page.locator("h1").first()).toContainText(
      "AI Capabilities Model",
    );
    await expect(page.locator("h2").first()).toContainText(
      "Explore the model",
    );
    await expect(page.locator("h2").nth(1)).toContainText(
      "Read all of our past reports",
    );
    await expect(page.locator("h2").nth(2)).toContainText(
      "DORA’s AI Research",
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
        "/ai/capabilities-model/report/2025-dora-ai-capabilities-model-report.png",
      );
    });

    test("has the correct download button", async ({ page }) => {
      const downloadLink = page
        .locator('a:has-text("Coming soon")')
        .first();
      await expect(downloadLink).toBeVisible();
      await expect(downloadLink).toHaveAttribute(
        "href",
        "/ai/capabilities-model/report/",
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
        .first();
      await expect(downloadLink).toBeVisible();
      await expect(downloadLink).toHaveAttribute(
        "href",
        "/research/2025/dora-report/",
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
        "/ai/gen-ai-report/dora-impact-of-generative-ai-in-software-development-report.png",
      );
    });

    test("has the correct download button", async ({ page }) => {
      const downloadLink = page
        .locator('a:has-text("Download the report")')
        .nth(1);
      await expect(downloadLink).toBeVisible();
      await expect(downloadLink).toHaveAttribute(
        "href",
        "/ai/gen-ai-report/",
      );
    });
  });

  test("does not have the research archives tabs", async ({ page }) => {
    await expect(page.locator("tab_links")).not.toBeVisible();
  });
});
