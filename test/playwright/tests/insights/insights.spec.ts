import { test, expect } from '@playwright/test';

test.describe('Insights', () => {
    test.describe('Index page', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/insights/');
        });

        test('shows the insights home page', async ({ page }) => {
            await expect(page).toHaveTitle('DORA | DORA Insights');
            await expect(
                page.getByRole('heading', { name: 'DORA Insights', level: 1 }),
            ).toBeVisible();
        });

        test('lists articles', async ({ page }) => {
            await expect(page.locator('.insights-feed')).toBeVisible();
            const articles = page.locator('.insights-feed article');
            await expect(articles.first()).toBeVisible();
        });

        test('lists articles in date order', async ({ page }) => {
            const dates = await page
                .locator('.insights-feed article p > small:first-child')
                .allTextContents();
            const sortedDates = [...dates].sort(
                (a, b) => new Date(b).getTime() - new Date(a).getTime(),
            );
            expect(dates).toEqual(sortedDates);
        });

        test('filters by tag', async ({ page }) => {
            // Find an article with tags and click one
            const tagLink = page.locator('.insights-feed article .tags a').first();
            const tagName = await tagLink.innerText();
            await tagLink.click();

            await expect(page).toHaveTitle(new RegExp(tagName.replace('#', ''), 'i'));
            await expect(
                page.getByRole('heading', { name: `DORA Insights: ${tagName.replace('#', '')}`, level: 1 }),
            ).toBeVisible();
            // Ensure we are on a tag page
            expect(page.url()).toContain(`/insights/tags/${tagName.replace('#', '').toLowerCase()}/`);
        });
    });

    test('shows navigation links and footer tags', async ({ page }) => {
        // 1. Navigate to the insights listing to find the newest post
        await page.goto('/insights/');

        // Get the first article's link (newest post)
        // We assume the first anchor in the article is the main link to the post
        const firstPostLink = page.locator('.insights-feed article .content').first().locator('a').first();
        const firstPostUrl = await firstPostLink.getAttribute('href');

        if (!firstPostUrl) throw new Error('Could not find newest post URL');

        // Navigate to the newest post
        await firstPostLink.click();
        await expect(page).toHaveURL(firstPostUrl);

        // Check for "Posted in:" section at the bottom (Test generic presence)
        const footerTags = page.locator('.footer-tags');
        await expect(footerTags).toBeVisible();
        await expect(footerTags.getByText('Posted in:')).toBeVisible();

        // Check for "Previous post" link (should exist assuming > 1 posts)
        await expect(page.getByText('Previous post:')).toBeVisible();

        // Check for "Next post" link (should NOT exist on the newest post)
        await expect(page.getByText('Next post:')).not.toBeVisible();

        // 2. Check the second newest post (which should link to the newest)
        await page.goto('/insights/');
        const secondPostLink = page.locator('.insights-feed article .content').nth(1).locator('a').first();
        const secondPostUrl = await secondPostLink.getAttribute('href');

        if (!secondPostUrl) {
            console.log('Skipping second post check: only one post found.');
            return;
        }

        await secondPostLink.click();
        await expect(page).toHaveURL(secondPostUrl);

        // Check for "Next post" link
        await expect(page.getByText('Next post:')).toBeVisible();

        // Verify it links to the newest post
        const nextPostAnchor = page.getByText('Next post:').locator('..').getByRole('link');
        await expect(nextPostAnchor).toBeVisible();

        // Playwright's getAttribute returns the exact string in the DOM, which might be relative.
        // The firstPostUrl we got earlier was likely relative (e.g. /insights/foo/).
        // So checking containment or exact match should work.
        await expect(nextPostAnchor).toHaveAttribute('href', firstPostUrl);

        // 3. Check the oldest post (last in the list, should have NO "Previous post")
        await page.goto('/insights/');
        const lastPostLink = page.locator('.insights-feed article .content').last().locator('a').first();
        const lastPostUrl = await lastPostLink.getAttribute('href');

        if (!lastPostUrl) throw new Error('Could not find oldest post URL');

        await lastPostLink.click();
        await expect(page).toHaveURL(lastPostUrl);

        // Check for "Next post" link (should be visible for the oldest post)
        await expect(page.getByText('Next post:')).toBeVisible();

        // Check for "Previous post" link (should NOT be visible for the oldest post)
        await expect(page.getByText('Previous post:')).not.toBeVisible();
    });
});
