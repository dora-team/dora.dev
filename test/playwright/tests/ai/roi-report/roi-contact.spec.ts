import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/ai/roi/contact/");
});

test("AI ROI Contact page has the correct title.", async ({ page }) => {
  await expect(page).toHaveTitle("DORA | ROI of AI-assisted Software Development");
});

test("AI ROI Contact page has the correct header.", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "ROI of AI-assisted Software Development", level: 1 })).toBeVisible();
});

const emailAddresses = ["dora-roi@google.com"];

for (const emailAddress of emailAddresses) {
  test(`AI ROI Contact page has mail to link for ${emailAddress}.`, async ({
    page,
  }) => {
    const emailLink = page.getByRole("link", { name: emailAddress }).first();
    await expect(emailLink).toBeVisible();
    const href = await emailLink.getAttribute("href");
    expect(href).not.toBeNull();
    expect(href?.startsWith(`mailto:${emailAddress}`)).toBe(true);
  });
}
