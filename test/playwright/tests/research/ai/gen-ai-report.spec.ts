import { test, expect } from "@playwright/test";
import { sidebarLinks } from "../sidebarLinks";

test.beforeEach(async ({ page }) => {
  await page.goto("/research/ai/gen-ai-report/");
});

test("Gen AI report page has the correct title.", async ({ page }) => {
  await expect(page).toHaveTitle(
    "DORA | Impact of Generative AI in Software Development",
  );
});

test("Gen AI report page has the correct header.", async ({ page }) => {
  await expect(page.locator("h1")).toContainText(
    "DORA Research: Artificial Intelligence",
  );
});

test("Gen AI report page has the correct report image", async ({ page }) => {
  const reportImage = page.locator(
    'img[src="dora-impact-of-generative-ai-in-software-development-report.png"]',
  );
  await expect(reportImage).toBeVisible();
  await expect(reportImage).toHaveAttribute(
    "alt",
    "Impact of Generative AI in Software Development",
  );
});

test("Gen AI report page has the correct download button", async ({ page }) => {
  const downloadLink = page.getByRole("link", { name: "Download the report" });
  await expect(downloadLink).toBeVisible();
  await expect(downloadLink).toHaveAttribute(
    "href",
    "dora-impact-of-generative-ai-in-software-development.pdf",
  );
});

test("Gen AI report page has the correct sidebar.", async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(
      page.getByRole("link", { name: sidebarLink, exact: true }),
    ).toBeVisible();
  }
});
