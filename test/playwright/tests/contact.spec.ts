import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/contact/');
});

test('Contact page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Contact Us');
});

test('Contact page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('Contact DORA');
});

const emailAddresses = [
  'dora-advocacy@google.com',
  'sponsor-dora@google.com',
];

for (const emailAddress of emailAddresses) {
  test(`Contact page has mail to link for ${emailAddress}.`, async ({ page }) => {
    // Find the firsst link that contains the email address
    const emailLink = page.getByRole('link', { name: emailAddress }).first();

    // Check if the link is visible
    await expect(emailLink).toBeVisible();

    // Check if the link starts with the correct href attribute.
    // This accomodates a query string, like a subject, in the link
    const href = await emailLink.getAttribute('href');
    expect(href).not.toBeNull();
    expect(href?.startsWith(`mailto:${emailAddress}`)).toBe(true);
  });
}
