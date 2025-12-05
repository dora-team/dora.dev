import { test, expect } from '@playwright/test';

test.describe('Active Navigation State', () => {

  test('AI page should have AI active and Research inactive', async ({ page }) => {
    await page.goto('/research/ai/');

    // Desktop
    const aiLinkDesktop = page.locator('.menuLinksDesktop a[href="/research/ai/"]');
    const researchLinkDesktop = page.locator('.menuLinksDesktop a[href="/research/"]');
    await expect(aiLinkDesktop).toHaveClass(/active/);
    await expect(researchLinkDesktop).not.toHaveClass(/active/);

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('#hamburgerContainer').click();
    const aiLinkMobile = page.locator('.menuLinksMobile a[href="/research/ai/"]');
    const researchLinkMobile = page.locator('.menuLinksMobile a[href="/research/"]');
    await expect(aiLinkMobile).toHaveClass(/active/);
    await expect(researchLinkMobile).not.toHaveClass(/active/);
  });

  test('Research page should have Research active and AI inactive', async ({ page }) => {
    await page.goto('/research/');

    // Desktop
    const aiLinkDesktop = page.locator('.menuLinksDesktop a[href="/research/ai/"]');
    const researchLinkDesktop = page.locator('.menuLinksDesktop a[href="/research/"]');
    await expect(researchLinkDesktop).toHaveClass(/active/);
    await expect(aiLinkDesktop).not.toHaveClass(/active/); // Should allow not present or not active, but likely present so just check class

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('#hamburgerContainer').click();
    const researchLinkMobile = page.locator('.menuLinksMobile a[href="/research/"]');
    const aiLinkMobile = page.locator('.menuLinksMobile a[href="/research/ai/"]');
    await expect(researchLinkMobile).toHaveClass(/active/);
    await expect(aiLinkMobile).not.toHaveClass(/active/);
  });

  test('AI pages under /ai/ should have AI active and other sections inactive', async ({ page }) => {
    // Navigate to a likely AI page or just /ai/ (assuming it exists based on folder structure)
    // Using /ai/capabilities-model/ as mentioned by user
    // Note: If that page doesn't exist, this will 404, but nav should typically still render?
    // Let's stick to /ai/ first if that's a list page.
    await page.goto('/ai/');

    // Desktop
    const aiLinkDesktop = page.locator('.menuLinksDesktop a[href="/research/ai/"]');
    // Check possible conflicts
    const capabilitiesLinkDesktop = page.locator('.menuLinksDesktop a[href="/capabilities/"]');

    await expect(aiLinkDesktop).toHaveClass(/active/);
    await expect(capabilitiesLinkDesktop).not.toHaveClass(/active/);

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('#hamburgerContainer').click();
    const aiLinkMobile = page.locator('.menuLinksMobile a[href="/research/ai/"]');
    await expect(aiLinkMobile).toHaveClass(/active/);
  });

});
