import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
    test('shows the blog home page', async ({ page }) => {
        await page.goto('/experimental/blog/');
        await expect(page).toHaveTitle(/DORA Blog/);
        await expect(
            page.getByRole('heading', { name: 'DORA Blog', level: 1 }),
        ).toBeVisible();
    });

    test('lists articles', async ({ page }) => {
        await page.goto('/experimental/blog/');
        await expect(page.locator('.blog-list')).toBeVisible();
        const articles = page.locator('.blog-list article');
        await expect(articles.first()).toBeVisible();
        expect(await articles.count()).toBeGreaterThan(0);
    });

    test('lists articles in date order', async ({ page }) => {
        await page.goto('/experimental/blog/');
        const dates = await page
            .locator('.blog-list article p > small:first-child')
            .allTextContents();
        const sortedDates = [...dates].sort(
            (a, b) => new Date(b).getTime() - new Date(a).getTime(),
        );
        expect(dates).toEqual(sortedDates);
    });

    test('filters by tag', async ({ page }) => {
        await page.goto('/experimental/blog/');
        // Find an article with tags and click one
        const tagLink = page.locator('.blog-list article .tags a').first();
        const tagName = await tagLink.innerText();
        await tagLink.click();

        await expect(page).toHaveTitle(new RegExp(tagName.replace('#', ''), 'i'));
        await expect(
            page.getByRole('heading', { name: `DORA Blog: ${tagName.replace('#', '')}`, level: 1 }),
        ).toBeVisible();
        // Ensure we are on a tag page
        expect(page.url()).toContain(`/experimental/blog/tags/${tagName.replace('#', '').toLowerCase()}/`);
    });

    test('shows navigation links and footer tags', async ({ page }) => {
        // 1. Check "Posted in" and "Previous post" on the newest post (Builder Mindset)
        await page.goto('/experimental/blog/builder-mindset/');
        await expect(page).toHaveTitle(/Understanding builder intent/);

        // Check for "Posted in:" section at the bottom
        const footerTags = page.locator('.footer-tags');
        await expect(footerTags).toBeVisible();
        await expect(footerTags.getByText('Posted in:')).toBeVisible();
        await expect(footerTags.getByRole('link', { name: '#AI' })).toBeVisible();

        // Check for Previous Post link
        await expect(page.getByText('Previous post:')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Choosing measurement frameworks' })).toBeVisible();

        // Check for Next Post link (should NOT exist as it is the newest)
        await expect(page.getByText('Next post:')).not.toBeVisible();

        // 2. Check "Next post" on the oldest post (Trust in AI)
        await page.goto('/experimental/blog/trust-in-ai/');
        await expect(page).toHaveTitle(/Trust in AI/);

        // Check for Next Post link
        await expect(page.getByText('Next post:')).toBeVisible();
        await expect(page.getByRole('link', { name: 'How gen AI affects the value of development work' })).toBeVisible();

        // 3. Check "Previous post" on 'concerns-beyond-accuracy-of-ai-output'
        // Previous post is 'adopt-gen-ai' which has a different title and headline
        await page.goto('/experimental/blog/concerns-beyond-accuracy-of-ai-output/');
        await expect(page).toHaveTitle(/Concerns beyond the accuracy/);

        await expect(page.getByText('Previous post:')).toBeVisible();
        // Should use headline: "Helping developers adopt generative AI..."
        // NOT title: "Adopt generative AI"
        await expect(page.getByRole('link', { name: 'Helping developers adopt generative AI: Four practical strategies for organizations' })).toBeVisible();
    });
});
