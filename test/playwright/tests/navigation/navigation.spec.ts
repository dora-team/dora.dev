import { test, expect } from '@playwright/test';

test.describe('Global navigation', () => {
  const commonLinks = [
    { name: 'AI', href: '/ai/' },

    { name: 'Research', href: '/research/' },
    { name: 'Capabilities', href: '/capabilities/' },
    { name: 'Guides', href: '/guides/' },
    { name: 'Insights', href: '/insights/' },
    { name: 'Quick Check', href: '/quickcheck/' },
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has all expected navigation items in order on desktop', async ({ page }) => {
    // Select all 'a' tags in the desktop menu
    const navItems = page.locator('.menuLinksDesktop > li > a');

    // Verify common links
    for (const [index, link] of commonLinks.entries()) {
      const item = navItems.nth(index);
      await expect(item).toHaveText(link.name);
      await expect(item).toHaveAttribute('href', link.href);
    }

    // verify the search item text is "search" (material icon ligatures)
    await expect(navItems.nth(commonLinks.length)).toHaveText('search');

    const communityItem = navItems.last();
    await expect(communityItem).toContainText('Community');
    await expect(communityItem).toHaveAttribute('href', 'https://dora.community/');
  });

  test('has all expected navigation items in order on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('#hamburgerContainer').click();

    const navItems = page.locator('.menuLinksMobile > ul > li > a');

    // Verify common links
    for (const [index, link] of commonLinks.entries()) {
      const item = navItems.nth(index);
      await expect(item).toHaveText(link.name);
      await expect(item).toHaveAttribute('href', link.href);
    }

    // Verify Search link (after Quick Check on mobile)
    const searchItem = navItems.nth(commonLinks.length);
    await expect(searchItem).toHaveText('Search');
    await expect(searchItem).toHaveAttribute('href', '/search/');

    // Verify Community link (last item)
    const communityItem = navItems.last();
    await expect(communityItem).toContainText('Community');
    await expect(communityItem).toHaveAttribute('href', 'https://dora.community/');
  });
});
