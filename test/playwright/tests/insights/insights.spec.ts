import { test, expect } from '@playwright/test';

test.describe('Insights', () => {
    test('shows the insights home page', async ({ page }) => {
        await page.goto('/experimental/insights/');
        await expect(page).toHaveTitle(/DORA Insights/);
        await expect(
            page.getByRole('heading', { name: 'DORA Insights', level: 1 }),
        ).toBeVisible();
    });

    test('lists articles', async ({ page }) => {
        await page.goto('/experimental/insights/');
        await expect(page.locator('.insights-list')).toBeVisible();
        const articles = page.locator('.insights-list article');
        await expect(articles.first()).toBeVisible();
    });

    test('lists articles in date order', async ({ page }) => {
        await page.goto('/experimental/insights/');
        const dates = await page
            .locator('.insights-list article p > small:first-child')
            .allTextContents();
        const sortedDates = [...dates].sort(
            (a, b) => new Date(b).getTime() - new Date(a).getTime(),
        );
        expect(dates).toEqual(sortedDates);
    });

    test('filters by tag', async ({ page }) => {
        await page.goto('/experimental/insights/');
        // Find an article with tags and click one
        const tagLink = page.locator('.insights-list article .tags a').first();
        const tagName = await tagLink.innerText();
        await tagLink.click();

        await expect(page).toHaveTitle(new RegExp(tagName.replace('#', ''), 'i'));
        await expect(
            page.getByRole('heading', { name: `DORA Insights: ${tagName.replace('#', '')}`, level: 1 }),
        ).toBeVisible();
        // Ensure we are on a tag page
        expect(page.url()).toContain(`/experimental/insights/tags/${tagName.replace('#', '').toLowerCase()}/`);
    });

    test('shows navigation links and footer tags', async ({ page }) => {
        // 1. Get the list of articles to identify newest and oldest
        await page.goto('/experimental/insights/');
        const articleLinks = page.locator('.insights-list article h2 a');
        const count = await articleLinks.count();
        expect(count).toBeGreaterThan(1); // Ensure we have at least 2 articles for navigation checks

        const allHrefs = await articleLinks.evaluateAll(links => links.map(link => link.getAttribute('href')));

        const newestArticleHref = allHrefs[0];
        const oldestArticleHref = allHrefs[allHrefs.length - 1];

        if (!newestArticleHref || !oldestArticleHref) {
            throw new Error('Could not find article links');
        }

        // 2. Check "Posted in" and "Previous post" on the newest post
        await page.goto(newestArticleHref);

        // Check for "Posted in:" section at the bottom
        const footerTags = page.locator('.footer-tags');
        await expect(footerTags).toBeVisible();
        await expect(footerTags.getByText('Posted in:')).toBeVisible();
        // Check that at least one tag link is visible
        await expect(footerTags.locator('a').first()).toBeVisible();

        // Check for Previous Post link
        await expect(page.getByText('Previous post:')).toBeVisible();

        // Check for Next Post link (should NOT exist as it is the newest)
        await expect(page.getByText('Next post:')).not.toBeVisible();

        // 3. Check "Next post" on the oldest post
        await page.goto(oldestArticleHref);

        // Check for Next Post link
        await expect(page.getByText('Next post:')).toBeVisible();

        // Check for Previous Post link (should NOT exist as it is the oldest)
        await expect(page.getByText('Previous post:')).not.toBeVisible();

        // 4. Check a middle post if we have enough articles
        if (count > 2) {
            const middleIndex = Math.floor(count / 2);
            const middleArticleHref = allHrefs[middleIndex];
            if (middleArticleHref) {
                await page.goto(middleArticleHref);
                await expect(page.getByText('Previous post:')).toBeVisible();
                await expect(page.getByText('Next post:')).toBeVisible();
            }
        }
    });
});
